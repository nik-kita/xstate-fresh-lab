import { IS_BROWSER } from "$fresh/runtime.ts";
import { ComponentChildren } from "preact";
import { MachineContext } from "./traffic-machine-context.ts";

export default function UiWrapper(
  { children }: { children: ComponentChildren },
) {
  if (!IS_BROWSER) {
    return <></>;
  }

  const { start } = MachineContext;

  start();
  return (
    <>
      {children}
    </>
  );
}
