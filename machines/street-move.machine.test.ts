// @deno-types="npm:xstate"
import { createActor } from "xstate";
import { machine } from "./street-move.machine.ts";
import { delay } from "$std/async/delay.ts";

Deno.test({ name: "Street move machine" }, async () => {
  const actor = createActor(machine);

  actor.subscribe((s) => {
    console.log(s);
  });

  actor.start();

  await delay(3000);

  actor.stop();
});
