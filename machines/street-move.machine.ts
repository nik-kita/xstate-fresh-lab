// @deno-types="npm:xstate"
import { setup } from "xstate";
import { context, settings, types } from "./configuration.ts";

export const machine = setup(settings).createMachine(
  {
    id: "variant 2 3",
    types,
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
                  target: "car.stop",
                  guard: "is-car-traffic-green FALSE",
                },
                {
                  target: "car.extra-stop",
                  guard: "is-pedestrian-on-zebra",
                },
                {
                  target: "car.cross zebra",
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
                  target: "car.stop",
                  guard: "is-car-traffic-green FALSE",
                },
                {
                  target: "car.extra-stop",
                  guard: "is-pedestrian-on-zebra",
                },
                {
                  target: "car.cross zebra",
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
                target: "car.move",
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
                  target: "pedestrian.stop",
                  guard: "is-car-traffic-green",
                },
                {
                  target: "pedestrian.extra stop",
                  guard: "is-car-on-zebra",
                },
                {
                  target: "pedestrian.cross zebra",
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
                  target: "extra stop",
                },
              ],
            },
          },
          "extra stop": {
            after: {
              "500": [
                {
                  target: "pedestrian.stop",
                  guard: "is-car-traffic-green",
                },
                {
                  target: "pedestrian.extra stop",
                  guard: "is-car-on-zebra FALSE",
                },
                {
                  target: "pedestrian.cross zebra",
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
                target: "pedestrian.walk",
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
              type: "update-color",
            },
            after: {
              "3000": {
                target: "car-traffic.yellow",
                actions: [],
              },
            },
          },
          yellow: {
            entry: {
              type: "update-color",
            },
            after: {
              "500": [
                {
                  target: "car-traffic.red",
                  guard: "is-prev-green",
                },
                {
                  target: "car-traffic.green",
                },
              ],
            },
          },
          red: {
            entry: {
              type: "update-color",
            },
            after: {
              "500": {
                target: "car-traffic.yellow",
              },
            },
          },
        },
      },
    },
  },
);
