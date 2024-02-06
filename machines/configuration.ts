export type StreetMachineCtx = {
  traffic_light: "green" | "red" | "yellow";
  prev_traffic_light: "green" | "red" | "yellow";
  count_cars_on_zebra: number;
  count_pedestrians_on_zebra: number;
};

export const types = {} as {
  context: StreetMachineCtx;
  events:
    | { type: "CAR_TRAFFIC_RED" }
    | { type: "CAR_TRAFFIC_GREEN" };
};
export const context: StreetMachineCtx = {
  count_cars_on_zebra: 0,
  count_pedestrians_on_zebra: 0,
  traffic_light: "green",
  prev_traffic_light: "yellow",
};
export const settings = {
  id: "variant 2 3",
  types: {} as {
    context: StreetMachineCtx;
  },
  actors: {},
  guards: {
    "is-car-on-zebra": ({ context }) => {
      return context.count_cars_on_zebra > 0;
    },
    "is-car-traffic-green": ({ context }) => {
      return context.traffic_light === "green";
    },
    "is-pedestrian-on-zebra": ({ context }) => {
      return context.count_pedestrians_on_zebra > 0;
    },
    "is-car-on-zebra FALSE": ({ context }) => {
      return context.count_cars_on_zebra === 0;
    },
    "is-car-traffic-green FALSE": ({ context }) => {
      return context.traffic_light !== "green";
    },
    "is-prev-green": ({ context }) => {
      return context.prev_traffic_light === "green";
    },
  },
  delays: {},
} as const;
