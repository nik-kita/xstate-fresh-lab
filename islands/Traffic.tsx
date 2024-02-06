import { MachineContext } from "./traffic-machine-context.ts";

export default function Traffic() {
  const { useSelector } = MachineContext;
  const traffic = useSelector((s) => {
    return s.value["car-traffic"];
  });
  const jData = useSelector((s) => {
    return s.toJSON();
  });

  return (
    <>
      <pre>
{JSON.stringify(jData, null, 2)}
      </pre>
      <div class={"flex flex-col gap-6 bg-black p-4 rounded-2xl"}>
        <div
          class={`border-2 rounded-full h-[100px] w-[100px] ${
            traffic.value === "red" ? "bg-red-600" : "bg-red-950"
          }`}
        >
        </div>
        {traffic.value !== "red" && traffic.value !== "green"
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
            traffic.value === "green" ? "bg-green-500" : "bg-green-950"
          }`}
        >
        </div>
      </div>
    </>
  );
}
