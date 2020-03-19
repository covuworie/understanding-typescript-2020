
enum ProjectStatus {
  Active,
  Finished
}

// Project Type
class Project {
  public constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

type Listener = (projects: Project[]) => void;

// Project State Management
// Singleton to manage the state of projects
class ProjectStateManager {
  private listeners: Listener[] = [];
  private projects: Project[] = [];
  private static instance: ProjectStateManager;

  private constructor() {}

  public static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectStateManager();
    return this.instance;
  }

  public addListener(listener: Listener) {
    this.listeners.push(listener);
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

// ProjectList Class
class ProjectList {
  private templateElement: HTMLTemplateElement;
  private hostElement: HTMLDivElement;
  private sectionElement: HTMLElement;
  private projects: Project[] = [];

  public constructor(private type: "active" | "finished") {
    this.templateElement = document.querySelector(
      "#project-list"
    ) as HTMLTemplateElement;
    this.hostElement = document.querySelector("#app") as HTMLDivElement;

    const importNode = document.importNode(this.templateElement.content, true);
    this.sectionElement = importNode.firstElementChild as HTMLElement;
    this.sectionElement.id = `${this.type}-projects`;

    projectStateManager.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter(project => {
        if (this.type === 'active') {
          return project.status === ProjectStatus.Active;
        }
        return project.status === ProjectStatus.Finished;
      });
      this.projects = relevantProjects;
      // seems a bit weird to me rendering projects in an add listener method!
      this.renderProjects();
    });

    this.renderProjectList();
    this.renderProjectListContent();
  }

  private renderProjects() {
    const listElement = document.querySelector(
      `#${this.type}-projects-list`
    ) as HTMLUListElement;
    listElement.innerHTML= '';  // clear the list of rendered projects
    // re-render the projects
    for (const project of this.projects) {
      const listItem = document.createElement("li");
      listItem.textContent = project.title;
      listElement.appendChild(listItem);
    }
  }

  private renderProjectListContent() {
    const listId = `${this.type}-projects-list`;
    this.sectionElement.querySelector("ul")!.id = listId;
    this.sectionElement.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }

  private renderProjectList() {
    this.hostElement.insertAdjacentElement("beforeend", this.sectionElement);
  }
}

// ProjectInput Class
class ProjectInput {
  private templateElement: HTMLTemplateElement;
  private hostElement: HTMLDivElement;
  private formElement: HTMLFormElement;

  private titleInputElement: HTMLInputElement;
  private descriptionInputElement: HTMLInputElement;
  private peopleInputElement: HTMLInputElement;

  public constructor() {
    this.templateElement = document.querySelector(
      "#project-input"
    ) as HTMLTemplateElement;
    this.hostElement = document.querySelector("#app") as HTMLDivElement;

    const importNode = document.importNode(this.templateElement.content, true);
    this.formElement = importNode.firstElementChild as HTMLFormElement;
    this.formElement.id = "user-input";

    this.titleInputElement = this.formElement.querySelector(
      "#title"
    ) as HTMLInputElement;
    this.descriptionInputElement = this.formElement.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.peopleInputElement = this.formElement.querySelector(
      "#people"
    ) as HTMLInputElement;

    this.attachFormListener();
    this.renderForm();
  }

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

  private attachFormListener() {
    this.formElement.addEventListener("submit", this.submitListener);
  }

  private renderForm() {
    this.hostElement.insertAdjacentElement("afterbegin", this.formElement);
  }
}

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList("active");
const finishedProjectList = new ProjectList("finished");
