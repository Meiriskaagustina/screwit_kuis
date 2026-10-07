declare module 'canvas-confetti' {
  export interface Options {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    ticks?: number;
    origin?: {
      x?: number;
      y?: number;
    };
    colors?: string[];
    shapes?: Array<'square' | 'circle' | 'star'>;
    scalar?: number;
    zIndex?: number;
    disableForReducedMotion?: boolean;
  }

  export interface GlobalOptions {
    resize?: boolean;
    useWorker?: boolean;
    disableForReducedMotion?: boolean;
  }

  export interface ConfettiFunction {
    (options?: Options): Promise<null> | null;
    reset: () => void;
    create: (
      canvas: HTMLCanvasElement,
      globalOptions?: GlobalOptions
    ) => ConfettiFunction;
  }

  const confetti: ConfettiFunction;
  export default confetti;
}
