import { genLogger } from "../utils/gen-logger.ts";
import { TrafficContext } from "./traffic-machine-context.ts";
import { Button } from "../components/Button.tsx";

const _log = genLogger({ name: "Traffic", margin_left: 10 });

export default function Traffic() {
  _log("render!");
  const {
    actor,
    signalizeSelector,
  } = TrafficContext;
  const x = signalizeSelector((snapshot) => {
    _log("cb in signalizeSelector");
    return snapshot.value;
  });
  return (
    <div>
      Traffic
      <pre>{x}</pre>
      <Button
        onClick={() => {
          if (x.peek() === "Idle") {
            actor.send({ type: "GREEN" });
          } else {
            actor.send({ type: "NEXT" });
          }
        }}
      >
        click me!
      </Button>
    </div>
  );
}
