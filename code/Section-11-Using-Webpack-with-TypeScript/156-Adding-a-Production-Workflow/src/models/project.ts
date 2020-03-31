// To get this to work at runtime we have to change the tsconfig.json to set the
// "outFile" to a single file and change the module to "amd". Then we have to referenc
// the outfile in the index.html.

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
