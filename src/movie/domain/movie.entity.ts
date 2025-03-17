export class MovieEntity {
  constructor(
    public readonly year: string,
    public readonly title: string,
    public readonly studios: string,
    public readonly producers: string,
    public readonly winner: string,
  ) {
  }

  public isWinner(): boolean {
    return this.winner === 'yes';
  }
}