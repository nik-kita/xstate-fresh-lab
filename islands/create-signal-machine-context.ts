import { effect, Signal, signal, useSignal } from "@preact/signals";
import {
  Actor,
  ActorOptions,
  AnyActorLogic,
  createActor,
  SnapshotFrom,
} from "xstate";

export function createSignalMachineContext<TLogic extends AnyActorLogic>(
  machine: TLogic,
  options?: ActorOptions<TLogic>,
): {
  signalizeSelector: <T>(
    selector: (snapshot: SnapshotFrom<TLogic>) => T,
  ) => Signal<T>;
  actor: Actor<TLogic>;
} {
  const actor = signal(createActor(machine, options));
  const subscribers = signal<
    Set<(snapshot: SnapshotFrom<TLogic>) => unknown>
  >(
    new Set(),
  );

  effect(() => {
    const subscription = actor.peek().subscribe((s) => {
      for (const cb of subscribers.peek()) cb(s);
    });
    actor.peek().start();

    return () => {
      subscription.unsubscribe();
    };
  });

  return {
    signalizeSelector<T>(cb: (s: SnapshotFrom<TLogic>) => T) {
      const signalization = useSignal(cb(actor.peek().getSnapshot()));
      const _cb = (s: SnapshotFrom<TLogic>) => {
        const currentValue = cb(s);
        signalization.value = currentValue;
      };
      subscribers.peek().add(_cb);

      return signalization;
    },
    actor: actor.peek(),
  };
}
