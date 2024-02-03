import { Button } from "../components/Button.tsx";
import { TrafficContext } from "./traffic-machine-context.ts";

export default function Traffic() {
  console.log("render!");
  const {
    actor,
    signalizeSelector,
  } = TrafficContext;
  const x = signalizeSelector((snapshot) => {
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
