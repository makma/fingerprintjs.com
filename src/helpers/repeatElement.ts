export const repeatElement = (length, fn) => Array.from({ length }, (_, i) => fn(i))
