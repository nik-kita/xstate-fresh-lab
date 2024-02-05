// @deno-types="npm:xstate"
import { createActor } from "xstate";
import { machine } from "./street-move.machine.ts";
import { delay } from "$std/async/delay.ts";

Deno.test("Street move machine", () => {
  const actor = createActor(machine);

  actor.subscribe((s) => {
  });

  actor.start();

  delay(4000);

  actor.stop();
});
