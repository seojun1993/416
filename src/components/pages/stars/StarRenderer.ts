export class StarRenderer {
  public readonly ctx: CanvasRenderingContext2D | null;
  constructor(public readonly canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext("2d");
  }
}
