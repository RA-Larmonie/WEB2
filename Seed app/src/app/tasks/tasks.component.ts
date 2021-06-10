import { Component, OnInit } from '@angular/core';
import { Task } from '../shared files/Tasks-extension/task';
import { TaskService } from '../shared files/Tasks-extension/task.service';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import { DepartmentService } from '../shared files/Departments-extension/department.service';
import { Department } from '../shared files/Departments-extension/Department';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit {
  get searchTerm(): string {
    return this._searchText;
  }
  set searchTerm(value) {
    this._searchText = value;
    this.filterTask = this.filteredTasks(value);
  }


  constructor(private taskService: TaskService, private departmentService: DepartmentService) { }
  departments: Department[];
  form: FormGroup;
  tasks: Task[];
  selectedTask: Task;
  filterTask: Task[];
  private _searchText: string;

  ngOnInit(): void {
    this.getTaskList();
    this.GetAllDepartments();
    this.getDepNamesUnique();
    this.form = new FormGroup({
      description: new FormControl('', [Validators.required, Validators.minLength(4)]),
      deadline: new FormControl('', Validators.required),
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      departmentName: new FormControl(0, Validators.required),
      departmentEmployees: new FormControl(0, Validators.required)
    });
  }

  filteredTasks(searchString: string) {
    return  this.tasks.filter(task =>
      task.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  GetAllDepartments(): void {
    this.departmentService.getDepartmentList().subscribe(
      data => {
        this.departments = data.map(e => {
          return {
            key: e.payload.doc.id,
            ...e.payload.doc.data() as Department
          };
        });
      });
  }

  getTaskList() {
    this.taskService.getTasks().subscribe(
      data => {
        this.filterTask = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data() as Task
          };
        });
      });

    this.taskService.getTasks().subscribe(
      data => {
        this.tasks = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data() as Task
          };
        });
      });
  }

  onSelect(task: Task): void {
    this.selectedTask = task;
  }

  editTask(editedT_name: string, editedT_description: string, editedT_date: string, editedT_department: string, editedT_employee: string) {
    if (!editedT_name || !editedT_description || !editedT_date) {
      return;
    }
    const editTask: Task = {name: editedT_name, description: editedT_description, deadline: editedT_date,
      departmentName: editedT_department, employeesName: editedT_employee};
    //   firestore
    this.taskService.updateTask(this.selectedTask, editTask);
  }

  addTask(taskName: string, taskDescription: string, taskDeadline: string, taskDepartmentName: string, taskEmployeeName: string) {
    if (!taskName || !taskDescription || !taskDeadline) {
      return;
    }

    const newTask: Task = {name: taskName, description: taskDescription, deadline: taskDeadline,
      departmentName: taskDepartmentName, employeesName: taskEmployeeName};
    this.taskService.addTask(newTask);
  }

  getDepNamesUnique() {
    // this.depNames = this.taskService.getUniqueDepName();
  }

  removeTask(task: string): void {
    this.taskService.deleteTask(task);
    }
}
