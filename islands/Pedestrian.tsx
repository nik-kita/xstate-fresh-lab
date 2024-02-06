import { MachineContext } from "./traffic-machine-context.ts";

export default function Pedestrian() {
  const { useSelector } = MachineContext;
  const pedestrian = useSelector((s) => {
    return s.value.pedestrian;
  });
  return (
    <div
      class={pedestrian.value === "walk"
        ? "bg-gray-500"
        : pedestrian.value === "stop"
        ? "bg-red-500"
        : pedestrian.value === "extra-stop"
        ? "bg-orange-400"
        : "bg-blue-600"}
    >
      <h1>Mr. Pedestrian</h1>
      {pedestrian.value}
    </div>
  );
}
