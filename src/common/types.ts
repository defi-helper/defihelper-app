export type Unwrap<T> = T extends Promise<infer U>
  ? U
  : T extends (...args: unknown[]) => Promise<infer U>
  ? U
  : T extends (...args: unknown[]) => infer U
  ? U
  : T
