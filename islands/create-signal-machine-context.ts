import { effect, Signal, signal, useSignal } from "@preact/signals";
import { genLogger } from "../utils/gen-logger.ts";
import {
  Actor,
  ActorOptions,
  AnyActorLogic,
  createActor,
  SnapshotFrom,
} from "xstate";

const log = genLogger({
  level: "debug",
  name: "createSignalMachineContext",
  margin_left: 20,
});

let _id = 0;

export function createSignalMachineContext<TLogic extends AnyActorLogic>(
  machine: TLogic,
  options?: ActorOptions<TLogic>,
): {
  signalizeSelector: <T>(
    selector: (snapshot: SnapshotFrom<TLogic>) => T,
  ) => Signal<T>;
  actor: Actor<TLogic>;
  [Symbol.dispose]: () => void;
} {
  log();
  const actor = signal(createActor(machine, options));
  const subscribers = signal<
    Set<(snapshot: SnapshotFrom<TLogic>) => unknown>
  >(
    new Set(),
  );
  const cleaner = signal(
    new Map<
      number,
      ((snapshot: SnapshotFrom<TLogic>) => void)[]
    >(),
  );
  effect(() => {
    log("useSignalEffect()");
    const subscription = actor.peek().subscribe((s) => {
      log("cb inside actor.subscribe", s);
      for (const cb of subscribers.peek()) cb(s);
    });
    actor.peek().start();

    return () => {
      subscription.unsubscribe();
    };
  });
  const id = ++_id;
  const result = {
    signalizeSelector<T>(cb: (s: SnapshotFrom<TLogic>) => T) {
      const signalization = useSignal(cb(actor.peek().getSnapshot()));
      const _cb = (s: SnapshotFrom<TLogic>) => {
        signalization.value = cb(s);
      };
      subscribers.peek().add(_cb);
      const _cleaner = cleaner.peek();
      const prev = _cleaner.get(id);
      if (prev) {
        prev.push(_cb);
      } else {
        _cleaner.set(id, [_cb]);
      }
      return signalization;
    },
    actor: actor.peek(),
    [Symbol.dispose]() {
      log("dispose!");
      cleaner.peek().get(id)?.forEach((cb) => {
        subscribers.peek().delete(cb);
      });
    },
  };

  return result;
}
