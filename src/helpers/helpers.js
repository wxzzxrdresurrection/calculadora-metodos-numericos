export function round(value, precision = 0) {
    const multiplier = Math.pow(10, precision || 0);
    value = (Math.round(value * multiplier) / multiplier).toString();
    return value
  }