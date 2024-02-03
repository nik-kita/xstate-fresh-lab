import { TrafficContext } from "./traffic-machine-context.ts";

export default function Traffic() {
  const {
    signalizeSelector,
  } = TrafficContext;
  const trafficState = signalizeSelector((snapshot) => {
    return snapshot.value;
  });

  return (
    <div class={"flex gap-4 bg-black p-2 rounded-sm"}>
      <div
        class={`border-2 rounded-full h-10 w-10 ${
          trafficState.value === "Red" ? "bg-red-600" : "bg-red-950"
        }`}
      >
      </div>
      <div
        class={`border-2 rounded-full h-10 w-10 ${
          trafficState.value !== "Red" && trafficState.peek() !== "Green"
            ? "bg-yellow-400"
            : "bg-yellow-900"
        }`}
      >
      </div>
      <div
        class={`border-2 rounded-full h-10 w-10 ${
          trafficState.value === "Green" ? "bg-green-500" : "bg-green-950"
        }`}
      >
      </div>
    </div>
  );
}
