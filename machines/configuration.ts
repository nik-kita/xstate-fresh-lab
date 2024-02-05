// @deno-types="npm:xstate"
import { assign } from "xstate";
import { StreetMachineCtx } from "../types.ts";

export const types = {} as {
  context: StreetMachineCtx;
  events:
    | { type: "CAR_TRAFFIC_RED" }
    | { type: "CAR_TRAFFIC_GREEN" };
};
export const context = {
  count_cars_on_zebra: 0,
  count_pedestrians_on_zebra: 0,
  traffic_light: "green",
  prev_traffic_light: "red",
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
    "green-color"() {
        assign({
          traffic_light: "green",
        });
    },
    "yellow-color"() {
      assign({
        traffic_light: "yellow",
      });
    },
    "red-color"() {
      assign({
        traffic_light: "red",
      });
    },
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
