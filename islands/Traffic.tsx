import { TrafficContext } from "./traffic-machine-context.ts";

export default function Traffic() {
  console.log("render!");
  const {
    actor,
    signalizeSelector,
  } = TrafficContext;
  const trafficState = signalizeSelector((snapshot) => {
    return snapshot.value;
  });

  return (
    <div>
      Traffic
      <pre>{trafficState}</pre>
    </div>
  );
}
