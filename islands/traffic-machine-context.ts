import { effect, useSignal } from "@preact/signals";
// @deno-types='npm:xstate'
import { AnyActorLogic, createActor, SnapshotFrom } from "xstate";
import { machine } from "../machines/street-move.machine.ts";

export const MachineContext = createMachineContextWithSignals(machine);

export function createMachineContextWithSignals<TLogic extends AnyActorLogic>(
  machine: TLogic,
) {
  const actor = createActor(machine);
  const subscribers: Array<(s: SnapshotFrom<TLogic>) => void> = [];

  effect(() => {
    const subscription = actor.subscribe((s) => {
      subscribers.forEach((subscriber) => subscriber(s));
      console.log(subscribers.length);
    });

    return () => subscription.unsubscribe();
  });

  return {
    actor,
    useSelector(cb: (s: SnapshotFrom<TLogic>) => void) {
      const selection = useSignal(cb(actor.getSnapshot()));
      subscribers.push((s) => {
        selection.value = cb(s);
      });
    },
  };
}
