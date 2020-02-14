export interface LogInfo {
  msg?: string;
  [other: string]: unknown;
}

export interface LogFn {
  (details: LogInfo): void;
}
