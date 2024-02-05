import { ComponentChildren } from "preact";
import { MachineContext } from "./traffic-machine-context.ts";

export default function UiWrapper(
  { children }: { children: ComponentChildren },
) {
  const { start } = MachineContext;

  start();
  return (
    <div>
      {children}
    </div>
  );
}
