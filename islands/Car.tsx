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
        : car.value === "extra-stop"
        ? "bg-yellow-400"
        : "bg-blue-600"}
    >
      <h1>The Car</h1>
      {car.value}
    </div>
  );
}
