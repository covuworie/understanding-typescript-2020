/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../models/project.ts" />
/// <reference path="../models/drag-drop.ts" />

namespace App {
  // ProjectItem Class
  export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable {
    private project: Project;

    public get persons() {
      if (this.project.people == 1) {
        return "1 person";
      }
      return `${this.project.people} people`;
    }

    public constructor(hostElementId: string, project: Project) {
      super("single-project", hostElementId, false, project.id);
      this.project = project;

      this.configure();
      this.renderProjectListContent();
    }

    @autobind
    public dragStartListener(event: DragEvent) {
      // We only transfer the id to save memory. This is sufficient to retrieve the object data when we drop it.
      event.dataTransfer!.setData("text/plain", this.project.id);
      event.dataTransfer!.effectAllowed = "move";
    }

    public dragEndListener(_: DragEvent) {
      console.log("DragEnd");
    }

    public configure() {
      this.element.addEventListener("dragstart", this.dragStartListener);
      this.element.addEventListener("dragend", this.dragEndListener);
    }

    public renderProjectListContent() {
      this.element.querySelector("h2")!.textContent = this.project.title;
      this.element.querySelector("h3")!.textContent =
        this.persons + " assigned";
      this.element.querySelector("p")!.textContent = this.project.description;
    }
  }
}
