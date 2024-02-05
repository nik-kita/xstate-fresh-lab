import { MachineContext } from "./traffic-machine-context.ts";

export default function Car() {
  const { useSelector } = MachineContext;
  const car = useSelector((s) => {
    return s.value.car;
  });
  return (
    <div
      class={car.value === "move"
        ? "bg-green-500"
        : car.value === "stop"
        ? "bg-red-500"
        : "bg-blue-600"}
    >
      {car.value}
    </div>
  );
}
