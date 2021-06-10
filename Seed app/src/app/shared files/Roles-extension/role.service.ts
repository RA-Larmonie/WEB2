import { Injectable } from '@angular/core';
import {Roles} from './roles';
import {RolesList} from './mock-roles';
import {Observable, of} from 'rxjs';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private dbPath = '/roles';
  rolesRef: AngularFireList<Roles> = null;

  constructor(private db: AngularFireDatabase) {
    this.rolesRef = db.list(this.dbPath);
  }
  createRole(customer: Roles): void {
    this.rolesRef.push(customer);
  }

  updateRole(key: string, value: any): Promise<void> {
    return this.rolesRef.update(key, value);
  }

  deleteRole(key: string): Promise<void> {
    return this.rolesRef.remove(key);
  }

  getRolesList(): AngularFireList<Roles> {
    return this.rolesRef;
  }

  deleteAll(): Promise<void> {
    return this.rolesRef.remove();
  }
}

