// @deno-types="npm:xstate"
import { assign, raise, setup } from "xstate";
import { context, settings } from "./configuration.ts";

export const machine = setup(settings).createMachine(
  {
    context,
    type: "parallel",
    states: {
      car: {
        initial: "move",
        states: {
          move: {
            after: {
              "2001": [
                {
                  target: "stop",
                  guard: "is-car-traffic-green FALSE",
                },
                {
                  target: "extra-stop",
                  guard: "is-pedestrian-on-zebra",
                },
                {
                  target: "cross zebra",
                },
              ],
            },
          },
          stop: {
            on: {
              CAR_TRAFFIC_GREEN: [
                {
                  target: "extra-stop",
                  guard: "is-pedestrian-on-zebra",
                },
                {
                  target: "cross zebra",
                },
              ],
            },
          },
          "extra-stop": {
            after: {
              "300": [
                {
                  target: "stop",
                  guard: "is-car-traffic-green FALSE",
                },
                {
                  target: "extra-stop",
                  guard: "is-pedestrian-on-zebra",
                },
                {
                  target: "cross zebra",
                  actions: [
                    assign(({ context: { count_cars_on_zebra } }) => ({
                      count_cars_on_zebra: ++count_cars_on_zebra,
                    })),
                  ],
                },
              ],
            },
          },
          "cross zebra": {
            after: {
              "213": {
                target: "move",
                actions: [
                  assign(({ context: { count_cars_on_zebra } }) => ({
                    count_cars_on_zebra: count_cars_on_zebra === 0
                      ? 0
                      : --count_cars_on_zebra,
                  })),
                ],
              },
            },
          },
        },
      },
      pedestrian: {
        initial: "walk",
        states: {
          walk: {
            after: {
              "7013": [
                {
                  target: "stop",
                  guard: "is-car-traffic-green",
                },
                {
                  target: "extra-stop",
                  guard: "is-car-on-zebra",
                },
                {
                  target: "cross zebra",
                },
              ],
            },
          },
          stop: {
            on: {
              CAR_TRAFFIC_RED: [
                {
                  target: "cross zebra",
                  guard: "is-car-on-zebra FALSE",
                },
                {
                  target: "extra-stop",
                },
              ],
            },
          },
          "extra-stop": {
            after: {
              "500": [
                {
                  target: "stop",
                  guard: "is-car-traffic-green",
                },
                {
                  target: "extra-stop",
                  guard: "is-car-on-zebra FALSE",
                },
                {
                  target: "cross zebra",
                  actions: [
                    assign(({ context: { count_pedestrians_on_zebra } }) => ({
                      count_pedestrians_on_zebra: ++count_pedestrians_on_zebra,
                    })),
                  ],
                },
              ],
            },
          },
          "cross zebra": {
            after: {
              "1023": {
                target: "walk",
                actions: [
                  assign(({ context: { count_pedestrians_on_zebra } }) => ({
                    count_pedestrians_on_zebra: count_pedestrians_on_zebra === 0
                      ? 0
                      : --count_pedestrians_on_zebra,
                  })),
                ],
              },
            },
          },
        },
      },
      "car-traffic": {
        initial: "green",
        states: {
          green: {
            entry: [
              assign({ traffic_light: "green" }),
              raise({ type: "CAR_TRAFFIC_GREEN" }) as any,
            ],
            after: {
              "3000": {
                target: "yellow",
                actions: [],
              },
            },
          },
          yellow: {
            entry: [
              assign({ traffic_light: "yellow" }),
            ],
            after: {
              "1000": [
                {
                  target: "red",
                  guard: "is-prev-green",
                  actions: assign({
                    prev_traffic_light: "red",
                  }),
                },
                {
                  target: "green",
                  actions: assign({
                    prev_traffic_light: "green",
                  }),
                },
              ],
            },
          },
          red: {
            entry: [
              raise({ type: "CAR_TRAFFIC_RED" }) as any,
              assign({ traffic_light: "red" }),
            ],
            after: {
              "2000": {
                target: "yellow",
              },
            },
          },
        },
      },
    },
  },
);
