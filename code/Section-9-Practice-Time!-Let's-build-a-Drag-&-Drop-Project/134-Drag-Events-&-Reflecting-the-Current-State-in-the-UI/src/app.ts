// Drag & Drop Interfaces
interface Draggable {
  dragStartListener(event: DragEvent): void;
  dragEndListener(event: DragEvent): void;
}

interface DragTarget {
  dragOverListener(event: DragEvent): void;
  dropListener(event: DragEvent): void;
  dragLeaveListener(event: DragEvent): void;
}

// Project Type
enum ProjectStatus {
  Active,
  Finished
}

class Project {
  public constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

// Project State Management

// We use generic type here instead of Project as in a big application we may have many different types of state we need to hold (e.g. user state, project state etc.)
type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  public addListener(listener: Listener<T>) {
    this.listeners.push(listener);
  }
}

// Singleton to manage the state of projects
class ProjectStateManager extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectStateManager;

  private constructor() {
    super();
  }

  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectStateManager();
    return this.instance;
  }

  public addProject(
    title: string,
    description: string,
    numberOfPeople: number
  ) {
    const project = new Project(
      Math.random().toString(),
      title,
      description,
      numberOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(project);
    for (const listener of this.listeners) {
      listener(this.projects.slice()); // pass a copy of projects
    }
  }
}

const projectStateManager = ProjectStateManager.getInstance();

// Validation
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(input: Validatable) {
  let isValid = true;
  if (input.required) {
    isValid = isValid && input.value.toString().trim().length !== 0;
  }
  if (input.minLength != null && typeof input.value === "string") {
    isValid = isValid && input.value.length >= input.minLength;
  }
  if (input.maxLength != null && typeof input.value === "string") {
    isValid = isValid && input.value.length <= input.maxLength;
  }
  if (input.min != null && typeof input.value === "number") {
    isValid = isValid && input.value >= input.min;
  }
  if (input.max != null && typeof input.value === "number") {
    isValid = isValid && input.value <= input.max;
  }
  return isValid;
}

// autobind decorator
function autobind(
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFunction = originalMethod.bind(this);
      return boundFunction;
    }
  };
  return adjustedDescriptor;
}

// Component Base Class
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  private templateElement: HTMLTemplateElement;
  private hostElement: T;
  protected element: U;

  public constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    this.templateElement = document.querySelector(
      "#" + templateId
    ) as HTMLTemplateElement;
    this.hostElement = document.querySelector("#" + hostElementId) as T;

    const importNode = document.importNode(this.templateElement.content, true);
    this.element = importNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }

    this.renderProjectList(insertAtStart);
  }

  private renderProjectList(insertAtStart: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtStart ? "afterbegin" : "beforeend",
      this.element
    );
  }

  public abstract configure(): void;
  public abstract renderProjectListContent(): void;
}

// ProjectItem Class
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>
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
    console.log(event);
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
    this.element.querySelector("h3")!.textContent = this.persons + " assigned";
    this.element.querySelector("p")!.textContent = this.project.description;
  }
}

// ProjectList Class
class ProjectList extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget {
  private projects: Project[] = [];

  public constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);

    this.configure();
    this.renderProjectListContent();
  }

  @autobind
  public dragOverListener(_: DragEvent) {
    const listElement = this.element.querySelector("ul")!;
    listElement.classList.add("droppable");
  }

  public dropListener(_: DragEvent) {}

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

// ProjectInput Class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  private titleInputElement: HTMLInputElement;
  private descriptionInputElement: HTMLInputElement;
  private peopleInputElement: HTMLInputElement;

  public constructor() {
    super("project-input", "app", true, "user-input");
    this.titleInputElement = this.element.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector(
      "#people"
    ) as HTMLInputElement;
    this.configure();
  }

  public configure() {
    this.element.addEventListener("submit", this.submitListener);
  }

  public renderProjectListContent() {}

  private getInputs(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidator: Validatable = {
      value: enteredTitle,
      required: true
    };
    const descriptionValidator: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5
    };
    const peopleValidator: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
      max: 5
    };

    if (
      !validate(titleValidator) ||
      !validate(descriptionValidator) ||
      !validate(peopleValidator)
    ) {
      alert("Invalid input, please try again");
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private clearInputs() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @autobind
  private submitListener(event: Event) {
    event.preventDefault();
    const userInput = this.getInputs();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      projectStateManager.addProject(title, description, people);
      this.clearInputs();
    }
  }
}

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList("active");
const finishedProjectList = new ProjectList("finished");
