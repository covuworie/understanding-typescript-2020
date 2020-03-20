/// <reference path="base-component.ts" />
/// <reference path="../decorators/autobind.ts" />
/// <reference path="../util/validation.ts" />
/// <reference path="../state/project.ts" />

namespace App {
  // ProjectInput Class
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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
}
