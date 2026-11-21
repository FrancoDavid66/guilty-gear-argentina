export const sinMovimiento =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Curva "golpe": entra rápido y frena seco
export const golpe = [0.16, 1, 0.3, 1]
