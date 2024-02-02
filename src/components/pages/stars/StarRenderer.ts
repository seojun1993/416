export class StarRenderer {
  public readonly ctx: CanvasRenderingContext2D | null;
  public stars = [];
  constructor(public readonly canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d");
  }
}

interface StarArgs {
  width: number;
  height: number;
  label: string;
}

class Star {
  public width: number;
  public height: number;
  public label: string;

  constructor(options: StarArgs) {
    const { width, height, label } = options;
    this.width = width;
    this.height = height;
    this.label = label;
  }
}
