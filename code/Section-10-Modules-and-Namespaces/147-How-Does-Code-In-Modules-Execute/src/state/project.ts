import { Project, ProjectStatus } from "../models/project.js";

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
export class ProjectStateManager extends State<Project> {
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
    this.updateListeners();
  }

  public moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find(project => project.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listener of this.listeners) {
      listener(this.projects.slice()); // pass a copy of projects
    }
  }
}

console.log('RUNNING...');

export const projectStateManager = ProjectStateManager.getInstance();
