import { createMachine } from "xstate";

export const machine = createMachine(
  {
    id: "variant 1",
    initial: "Idle",
    states: {
      Idle: {
        after: {
          1000: {
            target: "Yellow_before_green",
          },
        },
      },
      Red: {
        after: {
          1000: {
            target: "Yellow_before_green",
          },
        },
      },
      Yellow_before_red: {
        after: {
          500: {
            target: "Red",
          },
        },
      },
      Green: {
        after: {
          1000: {
            target: "Yellow_before_red",
          },
        },
      },
      Yellow_before_green: {
        after: {
          500: {
            target: "Green",
          },
        },
      },
    },
  },
);
