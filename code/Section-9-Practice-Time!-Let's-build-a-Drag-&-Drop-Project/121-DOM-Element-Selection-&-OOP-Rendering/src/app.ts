class ProjectInput {
  private templateElement: HTMLTemplateElement;
  private hostElement: HTMLDivElement;
  private formElement: HTMLFormElement;

  public constructor() {
    this.templateElement = document.querySelector(
      "#project-input"
    ) as HTMLTemplateElement;
    this.hostElement = document.querySelector("#app") as HTMLDivElement;

    const importNode = document.importNode(this.templateElement.content, true);
    this.formElement = importNode.firstElementChild as HTMLFormElement;
    this.renderForm();
  }

  private renderForm() {
    this.hostElement.insertAdjacentElement("afterbegin", this.formElement);
  }
}

const projectInput = new ProjectInput();
