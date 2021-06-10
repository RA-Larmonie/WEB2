import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from './Task';
import { DepartmentService } from '../Departments-extension/department.service';
import { AngularFirestore } from '@angular/fire/firestore';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {map} from 'rxjs/operators';
import {Department} from '../Departments-extension/Department';
import {FormControl, FormGroup, Validators} from '@angular/forms';
// import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks: Task[];

  constructor(private fs: AngularFirestore, private depService: DepartmentService) {
  }

  getTasks() {
    return this.fs.collection('/task').snapshotChanges();
  }

  addTask(task: Task) {
    return this.fs.collection('/task').add(task);
  }

  deleteTask(taskID: string) {
    this.fs.doc('/task/' + taskID).delete();
  }

  updateTask(task: Task, value: any) {
    return this.fs.collection('/task/').doc(task.id).set(value);
  }

  numberOfTask(): number {
    this.getTasks().subscribe(
      data => {
        this.tasks = data.map(e => {
          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data() as Task
          };
        });
      });
    return this.tasks.length;
  }

  /*
  getUniqueDepName() {
    let uniqueItems = Array.from(new Set(this.depService.GetDepartmentNames()));
    return uniqueItems;
  }

// was added in task service
  GetDepartmentNames() {
    let dep: Department[];
    this.getDepartments().subscribe(departments => dep = departments);
    let names: string[];

    for (var i = 0; i < dep.length; i++) {
      names[i] = dep[i].department_name;
    }
    return names;
  }
   */
}
