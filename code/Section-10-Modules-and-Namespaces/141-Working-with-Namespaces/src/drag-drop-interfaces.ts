namespace App {
  // Drag & Drop Interfaces
  export interface Draggable {
    dragStartListener(event: DragEvent): void;
    dragEndListener(event: DragEvent): void;
  }

  export interface DragTarget {
    dragOverListener(event: DragEvent): void;
    dropListener(event: DragEvent): void;
    dragLeaveListener(event: DragEvent): void;
  }
}
