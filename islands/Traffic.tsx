import { useEffect } from "preact/hooks";
import { MachineContext } from "./traffic-machine-context.ts";

export default function Traffic() {
  const { actor, useSelector } = MachineContext;
  const jTraffic = useSelector((s) => JSON.stringify(s.toJSON(), null, 2));

  useEffect(() => {
    actor.start();

    return () => actor.stop();
  }, []);

  return (
    <div>
      <pre>{jTraffic}</pre>
    </div>
  );
}
