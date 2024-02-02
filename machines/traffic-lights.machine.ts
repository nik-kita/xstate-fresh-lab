import { createMachine } from "xstate";

export const machine = createMachine(
  {
    id: "variant 1",
    initial: "Idle",
    states: {
      Idle: {
        on: {
          RED: {
            target: "Red",
          },
          TO_RED: {
            target: "Yellow_before_red",
          },
          GREEN: {
            target: "Green",
          },
          TO_GREEN: {
            target: "Yellow_before_green",
          },
        },
      },
      Red: {
        on: {
          NEXT: {
            target: "Yellow_before_green",
          },
        },
      },
      Yellow_before_red: {
        on: {
          NEXT: {
            target: "Red",
          },
        },
      },
      Green: {
        on: {
          NEXT: {
            target: "Yellow_before_red",
          },
        },
      },
      Yellow_before_green: {
        on: {
          NEXT: {
            target: "Green",
          },
        },
      },
    },
    types: {
      events: {} as
        | { type: "" }
        | { type: "RED" }
        | { type: "NEXT" }
        | { type: "GREEN" }
        | { type: "TO_RED" }
        | { type: "TO_GREEN" },
    },
  },
  {
    actions: {},
    actors: {},
    guards: {},
    delays: {},
  },
);
