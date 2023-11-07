import { cubicBezier } from 'framer-motion';

export const SPRING_TRANSITION = {
  type: 'spring',
  stiffness: 300,
  damping: 20,
  mass: 1,
} as const;

export const cubicBezierEasing = {
  MAIN: cubicBezier(0.85, 0, 0.15, 1),
  UNICORN: cubicBezier(0.68, -1, 0.2, 1.6),
};
