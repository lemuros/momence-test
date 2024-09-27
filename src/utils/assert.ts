export function assert(
  condition: boolean,
  message?: string
): asserts condition {
  const msg = message ? `Assertion Failed: ${message}` : "Assertion Failed";
  if (!condition) {
    throw new Error(msg);
  }
}
