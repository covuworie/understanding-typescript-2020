export enum ProjectStatus {
  Active,
  Finished
}

export class Project {
  public constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}
