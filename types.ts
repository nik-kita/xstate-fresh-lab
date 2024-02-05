export type TrafficLight = "green" | "yellow" | "red";

export type StreetMachineCtx = {
  current_car_traffic_light: TrafficLight;
  prev_car_traffic_light: TrafficLight;
  count_cars_on_zebra: number;
  count_pedestrians_on_zebra: number;
};
