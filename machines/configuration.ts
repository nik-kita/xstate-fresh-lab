import { assign } from "xstate";
import { StreetMachineCtx, TrafficLight } from "../types.ts";

export const types = {} as {
  context: StreetMachineCtx;
  events:
    | { type: "CAR_TRAFFIC_RED" }
    | { type: "CAR_TRAFFIC_GREEN" };
};
export const context = {
  count_cars_on_zebra: 0,
  count_pedestrians_on_zebra: 0,
  current_car_traffic_light: "green",
  prev_car_traffic_light: "yellow",
} satisfies StreetMachineCtx;
export const settings = {
  types: {} as {
    context: StreetMachineCtx;
  },
  actions: {
    "car-on-zebra": ({ context }) => {
      assign(
        {
          count_cars_on_zebra: context.count_cars_on_zebra + 1,
        } satisfies Partial<StreetMachineCtx>,
      );
    },
    "car-leaves-zebra": ({ context }) => {
      assign(
        {
          count_cars_on_zebra: context.count_cars_on_zebra === 0
            ? 0
            : context.count_cars_on_zebra - 1,
        } satisfies Partial<StreetMachineCtx>,
      );
    },
    "pedestrian-on-zebra": ({ context }) => {
      assign(
        {
          count_pedestrians_on_zebra: context.count_pedestrians_on_zebra + 1,
        } satisfies Partial<StreetMachineCtx>,
      );
    },
    "pedestrian-leaves-zebra": ({ context }) => {
      assign(
        {
          count_pedestrians_on_zebra: context.count_pedestrians_on_zebra === 0
            ? 0
            : context.count_pedestrians_on_zebra - 1,
        } satisfies Partial<StreetMachineCtx>,
      );
    },
    "update-color": ({ context }) => {
      const { prev_car_traffic_light, current_car_traffic_light } = context;
      let curr: TrafficLight;

      switch (current_car_traffic_light) {
        case "yellow":
          curr = prev_car_traffic_light === "green" ? "red" : "green";
          break;
        default:
          curr = "yellow";
      }

      assign({
        prev_car_traffic_light: current_car_traffic_light,
        current_car_traffic_light: curr,
      });
    },
  },
  actors: {},
  guards: {
    "is-car-on-zebra": ({ context }) => {
      return context.count_cars_on_zebra > 0;
    },
    "is-car-traffic-green": ({ context }) => {
      return context.current_car_traffic_light === "green";
    },
    "is-pedestrian-on-zebra": ({ context }) => {
      return context.count_pedestrians_on_zebra > 0;
    },
    "is-car-on-zebra FALSE": ({ context }) => {
      return context.count_cars_on_zebra === 0;
    },
    "is-car-traffic-green FALSE": ({ context }) => {
      return context.current_car_traffic_light !== "green";
    },
    "is-prev-green": ({ context }) => {
      return context.prev_car_traffic_light === "green";
    },
  },
  delays: {},
} as const;
