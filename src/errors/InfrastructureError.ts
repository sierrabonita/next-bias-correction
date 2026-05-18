export class InfrastructureError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "InfrastructureError";
  }
}
