export function genLogger(options: {
  level?: "log" | "debug" | "warn" | "error";
  name?: string;
  margin_left?: number;
  margin_symbol?: string;
} = {}) {
  const {
    level = "log",
    name = "",
    margin_left = 0,
    margin_symbol = ".",
  } = options;

  return (...args: unknown[]) => {
    console[level](`${name}${margin_symbol.repeat(margin_left)}`, ...args);
  };
}
