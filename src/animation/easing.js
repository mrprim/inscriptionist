export const linear = (t, d, l) => t / d

export const easeInQuad = (t, d, l) => (t /= d) * t

export const easeOutQuad = (t, d, l) => -1 * (t /= d) * (t - 2)

export const easeInOutQuad = (t, d, l) => {
  if ((t /= d / 2) < 1) return 1 / 2 * t * t
  return -1 / 2 * ((--t) * (t - 2) - 1)
}
