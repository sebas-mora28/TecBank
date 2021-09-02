import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private showAddItem : boolean = false;
  private showEditItem : boolean = false;
  private add = new Subject<any>();
  private edit = new Subject<any>();

  constructor() { }

  toggleAddItem(): void {
    this.showAddItem = !this.showAddItem;
    this.add.next(this.showAddItem);
  }

  onToggleAdd(): Observable<any> {
    return this.add.asObservable();
  }

  onToggleEdit(): Observable<any> {
    return this.edit.asObservable();
  }

  toggleEditItem(): void {
    this.showAddItem = true;
    this.add.next(this.showAddItem);
    this.showEditItem = true;
    this.edit.next(this.showEditItem);
  }

  cancelEdit(){
    this.showAddItem = false;
    this.add.next(this.showAddItem);
    this.showEditItem = false;
    this.edit.next(this.showEditItem);

  }

}
