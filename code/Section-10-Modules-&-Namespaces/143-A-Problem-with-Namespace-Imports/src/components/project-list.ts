/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../state/project.ts" />
/// <reference path="../models/project.ts" />
/// <reference path="../models/drag-drop.ts" />

namespace App {
  // ProjectList Class
  export class ProjectList extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget {
    private projects: Project[] = [];

    public constructor(private type: "active" | "finished") {
      super("project-list", "app", false, `${type}-projects`);

      this.configure();
      this.renderProjectListContent();
    }

    @autobind
    public dragOverListener(event: DragEvent) {
      if (event.dataTransfer?.types[0] === "text/plain") {
        event.preventDefault(); // the default is to not allow dropping
        const listElement = this.element.querySelector("ul")!;
        listElement.classList.add("droppable");
      }
    }

    @autobind
    public dropListener(event: DragEvent) {
      const projectId = event.dataTransfer!.getData("text/plain");
      projectStateManager.moveProject(
        projectId,
        this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
      );
    }

    @autobind
    public dragLeaveListener(_: DragEvent) {
      const listElement = this.element.querySelector("ul")!;
      listElement.classList.remove("droppable");
    }

    public configure() {
      this.element.addEventListener("dragover", this.dragOverListener);
      this.element.addEventListener("dragleave", this.dragLeaveListener);
      this.element.addEventListener("drop", this.dropListener);

      projectStateManager.addListener((projects: Project[]) => {
        const relevantProjects = projects.filter(project => {
          if (this.type === "active") {
            return project.status === ProjectStatus.Active;
          }
          return project.status === ProjectStatus.Finished;
        });
        this.projects = relevantProjects;
        // seems a bit weird to me rendering projects in an add listener method!
        this.renderProjects();
      });
    }

    public renderProjectListContent() {
      const listId = `${this.type}-projects-list`;
      this.element.querySelector("ul")!.id = listId;
      this.element.querySelector("h2")!.textContent =
        this.type.toUpperCase() + " PROJECTS";
    }

    private renderProjects() {
      const listElement = document.querySelector(
        `#${this.type}-projects-list`
      ) as HTMLUListElement;
      listElement.innerHTML = ""; // clear the list of rendered projects
      // re-render the projects
      for (const projectItem of this.projects) {
        new ProjectItem(this.element.querySelector("ul")!.id, projectItem);
      }
    }
  }
}
