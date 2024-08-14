export function easeInOutExpo(x: number): number {
  return x === 0
    ? 0
    : x === 1
      ? 1
      : x < 0.5
        ? Math.pow(2, 20 * x - 10) / 2
        : (2 - Math.pow(2, -20 * x + 10)) / 2;
}

export function easeInExpo(x: number): number {
  return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
}

export function easeOutExpo(x: number): number {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

export function easeOutQuint(x: number): number {
  return 1 - Math.pow(1 - x, 5);
}

export function easeInQuint(x: number): number {
  return x * x * x * x * x;
}

export function easeInOutQuint(x: number): number {
  return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
}

export function easeInOutCirc(x: number): number {
  return x < 0.5
    ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
    : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
}

export function easeInOutQuad(x: number): number {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

export const fade = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: easeOutExpo,
    },
  },
};

export const staggerFadeContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: easeOutExpo,
      staggerChildren: 0.15,
    },
  },
};

export const staggerFadeItem = {
  initial: { y: 20, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      ease: easeOutExpo,
    },
  },
};
