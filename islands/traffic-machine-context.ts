import { effect, signal, useSignal } from "@preact/signals";
// @deno-types='npm:xstate'
import { AnyActorLogic, createActor, SnapshotFrom } from "xstate";
import { machine } from "../machines/street-move.machine.ts";

export const MachineContext = createMachineContextWithSignals(machine);

export function createMachineContextWithSignals<TLogic extends AnyActorLogic>(
  machine: TLogic,
) {
  const actor = createActor(machine);
  const subscribers: Array<(s: SnapshotFrom<TLogic>) => void> = [];
  const toggle = signal<"start" | "stop" | null>(null);

  effect(() => {
    const subscription = actor.subscribe((s) => {
      subscribers.forEach((subscriber) => subscriber(s));
    });

    if (toggle.value === "start") {
      actor.start();
    } else if (toggle.value === "stop") {
      actor.stop();
    }

    return () => subscription.unsubscribe();
  });

  return {
    actor,
    useSelector<T>(cb: (s: SnapshotFrom<TLogic>) => T) {
      const selection = useSignal(cb(actor.getSnapshot()));
      subscribers.push((s) => {
        selection.value = cb(s);
      });

      return selection;
    },
    start: () => toggle.value = "start",
    stop: () => toggle.value = "stop",
  };
}
