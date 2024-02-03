import { createSignalMachineContext } from "./create-signal-machine-context.ts";
import { machine } from "../machines/traffic-lights.machine.ts";

export const TrafficContext = createSignalMachineContext(machine);
