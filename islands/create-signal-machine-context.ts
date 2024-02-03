import { effect, Signal, useSignal } from "@preact/signals";
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
  console.log("createSignalMachineContext");
  const actor = createActor(machine, options);
  const subscribers = new Set<(snapshot: SnapshotFrom<TLogic>) => unknown>();

  effect(() => {
    const subscription = actor.subscribe((s) => {
      for (const cb of subscribers) cb(s);
    });
    actor.start();

    return () => {
      subscription.unsubscribe();
    };
  });

  return {
    signalizeSelector<T>(cb: (s: SnapshotFrom<TLogic>) => T) {
      const signalization = useSignal(cb(actor.getSnapshot()));
      const _cb = (s: SnapshotFrom<TLogic>) => {
        const currentValue = cb(s);
        signalization.value = currentValue;
      };
      subscribers.add(_cb);

      return signalization;
    },
    actor,
  };
}
