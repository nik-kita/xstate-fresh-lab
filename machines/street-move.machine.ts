import { createMachine } from "xstate";
import { StreetMachineCtx, TrafficLight } from "../types.ts";

export const machine = createMachine(
  {
    id: "variant 2",
    context: {
      count_cars_on_zebra: 0,
      count_pedestrians_on_zebra: 0,
      current_car_traffic_light: "green",
      prev_car_traffic_light: "yellow",
    } satisfies StreetMachineCtx,
    states: {
      car: {
        initial: "move",
        states: {
          move: {
            after: {
              "2001": {
                target: "#variant 2.car.stop",
                guard: "is-car-traffic-green FALSE",
                actions: [],
              },
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
                  target: "#variant 2.car.stop",
                  guard: "is-car-traffic-green FALSE",
                  actions: [],
                },
                {
                  target: "#variant 2.car.extra-stop",
                  guard: "is-pedestrian-on-zebra",
                  actions: [],
                },
                {
                  target: "#variant 2.car.cross zebra",
                  actions: [
                    {
                      type: "car-ion-zebra",
                    },
                  ],
                },
              ],
            },
          },
          "cross zebra": {
            after: {
              "213": {
                target: "#variant 2.car.move",
                actions: [
                  {
                    type: "car leaves zebra",
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
                  target: "#variant 2.pedestrian.stop",
                  guard: "is-car-traffic-green",
                  actions: [],
                },
                {
                  target: "#variant 2.pedestrian.extra stop",
                  guard: "is-car-on-zebra",
                  actions: [],
                },
                {
                  target: "#variant 2.pedestrian.cross zebra",
                  actions: [],
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
                  target: "#variant 2.pedestrian.stop",
                  guard: "is-car-traffic-green",
                  actions: [],
                },
                {
                  target: "#variant 2.pedestrian.extra stop",
                  guard: "is-car-on-zebra false",
                  actions: [],
                },
                {
                  target: "#variant 2.pedestrian.cross zebra",
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
                target: "#variant 2.pedestrian.walk",
                actions: [
                  {
                    type: "pedestrian leaves zebra",
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
              type: "car-traffic-become-green",
            },
            after: {
              "3000": {
                target: "#variant 2.car-traffic.yellow",
                actions: [],
              },
            },
          },
          yellow: {
            entry: {
              type: "car-traffic-become-yellow",
            },
            after: {
              "500": [
                {
                  target: "#variant 2.car-traffic.red",
                  guard: "is-prev-green",
                  actions: [],
                },
                {
                  target: "#variant 2.car-traffic.green",
                  actions: [],
                },
              ],
            },
          },
          red: {
            entry: {
              type: "car-traffic-become-red",
            },
            after: {
              "500": {
                target: "#variant 2.car-traffic.yellow",
                actions: [],
              },
            },
          },
        },
      },
    },
    type: "parallel",
    types: {
      events: {} as
        | { type: "CAR_TRAFFIC_RED" }
        | { type: "CAR_TRAFFIC_GREEN" },
    },
  },
);
