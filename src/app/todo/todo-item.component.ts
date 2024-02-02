import { Component, Input } from '@angular/core';
import { RemoveIcon } from './remove-icon';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [RemoveIcon],
  template: `
    <div
      (mouseenter)="setHover(true)"
      (mouseleave)="setHover(false)"
      class="example-box"
      cdkDrag
    >
      <p>{{ task }}</p>
      <button
        (click)="removeTask()"
        [hidden]="!onHover"
        class="text-red-500 hover:text-red-800 "
      >
        <remove-icon title="Remove Task" />
      </button>
    </div>
  `,
  styles: `
    .example-box {
        padding: 20px 10px;
        border-bottom: solid 1px #ccc;
        color: rgba(0, 0, 0, 0.87);
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        cursor: move;
        background: white;
        font-size: 14px;
    }
  `,
})
export class TodoItemComponent {
  @Input({ required: true }) task!: string;
  @Input({ required: true }) container!: string;
  onHover = false;

  setHover(state: boolean) {
    this.onHover = state;
  }

  removeTask() {
    if (confirm(`Are you sure you want to remove this task: ${this.task}?`)) {
      // Remove the task
      if (this.container == 'todo') {
        let todoArr: string[] = JSON.parse(
          String(localStorage.getItem('todo'))
        );

        // Update the Todo array
        localStorage.setItem(
          'todo',
          JSON.stringify(todoArr.filter((data) => data !== this.task))
        );
      } else {
        let doneArr: string[] = JSON.parse(
          String(localStorage.getItem('done'))
        );

        // Update the Done array
        localStorage.setItem(
          'done',
          JSON.stringify(doneArr.filter((data) => data !== this.task))
        );
      }
    }
  }
}
