interface StarArgs {
  width: number;

  height: number;
}
export class Star {
  public width: number;
  public height: number;
  constructor(options: StarArgs) {
    const { width, height } = options;
    this.width = width;
    this.height = height;
  }
}
