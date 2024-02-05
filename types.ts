export type TrafficLight = "green" | "yellow" | "red";

export type StreetMachineCtx = {
  traffic_light: TrafficLight;
  prev_traffic_light: TrafficLight;
  count_cars_on_zebra: number;
  count_pedestrians_on_zebra: number;
};
