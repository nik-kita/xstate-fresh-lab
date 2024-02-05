// @deno-types="npm:xstate"
import { assign, setup } from "xstate";
import { context, settings } from "./configuration.ts";

export const machine = setup(settings).createMachine(
  {
    id: "variant 2 3",
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
                    {
                      type: "car-on-zebra",
                    },
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
                  {
                    type: "car-leaves-zebra",
                  },
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
                    {
                      type: "pedestrian-on-zebra",
                    },
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
                  {
                    type: "pedestrian-leaves-zebra",
                  },
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
            entry: {
              type: "green-color",
            },
            after: {
              "3000": {
                target: "yellow",
                actions: [],
              },
            },
          },
          yellow: {
            entry: {
              type: "yellow-color",
            },
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
            entry: {
              type: "red-color",
            },
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
