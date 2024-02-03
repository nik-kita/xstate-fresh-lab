import { TrafficContext } from "./traffic-machine-context.ts";

export default function Traffic() {
  const {
    signalizeSelector,
  } = TrafficContext;
  const trafficState = signalizeSelector((snapshot) => {
    return snapshot.value;
  });

  return (
    <div class={"flex flex-col gap-6 bg-black p-4 rounded-2xl"}>
      <div
        class={`border-2 rounded-full h-[100px] w-[100px] ${
          trafficState.value === "Red" ? "bg-red-600" : "bg-red-950"
        }`}
      >
      </div>
      {trafficState.value !== "Red" && trafficState.value !== "Green"
        ? (
          <img
            class="rounded-full bg-yellow-600"
            src="/logo.svg"
            width="100px"
            height="100px"
            alt="the Fresh logo: a sliced lemon dripping with juice"
          />
        )
        : (
          <div
            class={"border-2 rounded-full h-[100px] w-[100px] bg-yellow-600"}
          >
          </div>
        )}

      <div
        class={`border-2 rounded-full h-[100px] w-[100px] ${
          trafficState.value === "Green" ? "bg-green-500" : "bg-green-950"
        }`}
      >
      </div>
    </div>
  );
}
