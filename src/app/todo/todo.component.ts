import { Component, ViewChild } from '@angular/core';
import {
  CdkDragDrop,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormsModule, NgModel } from '@angular/forms';
import { RemoveIcon } from './remove-icon';
import { TodoItemComponent } from './todo-item.component';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [
    FormsModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    RemoveIcon,
    TodoItemComponent,
  ],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  todo: string[] = JSON.parse(String(localStorage.getItem('todo')));
  done: string[] = JSON.parse(String(localStorage.getItem('done')));
  @ViewChild('taskModel') taskModel!: NgModel;
  task: string = '';
  todoHoverState: boolean[] = [];
  doneHoverState: boolean[] = [];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Check if in todo container
      if (event.previousContainer.id == 'cdk-drop-list-1') {
        this.markAsTodo(event.container.data, event.currentIndex);
      } else {
        this.markAsDone(event.container.data, event.currentIndex);
      }
    }
  }

  addTask() {
    let todoArr: string[] = JSON.parse(String(localStorage.getItem('todo')));
    // console.log('Before Push', todoArr);
    todoArr.push(this.task);
    this.task = '';
    // console.log('After Push', todoArr);

    localStorage.setItem('todo', JSON.stringify(todoArr));
    this.todo = JSON.parse(String(localStorage.getItem('todo')));
    this.taskModel.control.markAsPristine();
  }

  markAsTodo(tasks: string[], currentIndex: number) {
    let doneArr: string[] = JSON.parse(String(localStorage.getItem('done')));
    let todoArr: string[] = JSON.parse(String(localStorage.getItem('todo')));

    todoArr.push(tasks[currentIndex]);
    let filteredDoneArr = doneArr.filter(
      (data) => data !== tasks[currentIndex]
    );

    localStorage.setItem('todo', JSON.stringify(todoArr));
    localStorage.setItem('done', JSON.stringify(filteredDoneArr));
  }

  markAsDone(tasks: string[], currentIndex: number) {
    let doneArr: string[] = JSON.parse(String(localStorage.getItem('done')));
    let todoArr: string[] = JSON.parse(String(localStorage.getItem('todo')));

    doneArr.push(tasks[currentIndex]);
    let filteredTodoArr = todoArr.filter(
      (data) => data !== tasks[currentIndex]
    );

    localStorage.setItem('todo', JSON.stringify(filteredTodoArr));
    localStorage.setItem('done', JSON.stringify(doneArr));
  }

  setHover(state: boolean, index: number, container: string) {
    if (container == 'todo') {
      this.todoHoverState[index] = state;
    } else {
      this.doneHoverState[index] = state;
    }
  }

  removeTask(task: string, container: string, index: number) {
    if (confirm(`Are you sure you want to remove this task: ${task}?`)) {
      if (container == 'todo') {
        let todoArr: string[] = JSON.parse(
          String(localStorage.getItem('todo'))
        );

        // Update the Todo array
        localStorage.setItem(
          'todo',
          JSON.stringify(todoArr.filter((data) => data !== task))
        );
        this.todo = JSON.parse(String(localStorage.getItem('todo')));

        this.todoHoverState.splice(index, 1);
      } else {
        let doneArr: string[] = JSON.parse(
          String(localStorage.getItem('done'))
        );

        // Update the Done array
        localStorage.setItem(
          'done',
          JSON.stringify(doneArr.filter((data) => data !== task))
        );
        this.done = JSON.parse(String(localStorage.getItem('done')));

        this.doneHoverState.splice(index, 1);
      }
    }
  }
}
