import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  modalRef: BsModalRef;
  today: Date = new Date();
  private users: User[];

  name: string;
  family: string;
  itemNum: number;
  birthday: Date = null;
  editingIndex: number = null;

  constructor(private modalService: BsModalService) {
    this.users = [
      new User('Ali', 'Delshad'),
      new User('Hamid', 'Sadeghi'),
      new User('Amir', 'Olfat'),
      new User('Keyvan', 'Nasr'),
    ];
  }

  ngOnInit(): void {}

  get Users() {
    return this.users;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  delete(index: number) {
    this.users.splice(index, 1);
  }

  setEditUser(index: number): void {
    this.editingIndex = index;
    this.name = this.users[index].Name;
    this.family = this.users[index].Family;
    this.itemNum = this.users[index].ItemNum;
    this.birthday = this.convertLocalDateToDate(this.users[index].Birthday);
  }

  editUser(): void {
    this.modalRef.hide();
    this.users[this.editingIndex] = new User(
      this.name,
      this.family,
      this.itemNum,
      this.convertDateToLocalDate(this.birthday)
    );
    this.editingIndex = undefined;
    this.name = '';
    this.family = '';
    this.birthday = null;
    this.itemNum = null;
  }

  addUser(): void {
    this.modalRef.hide();
    this.editingIndex = undefined;
    this.users.push(
      new User(
        this.name,
        this.family,
        this.itemNum,
        this.convertDateToLocalDate(this.birthday)
      )
    );
    this.name = '';
    this.family = '';
    this.birthday = null;
    this.itemNum = null;
  }

  cancel() {
    this.modalRef.hide();
    this.editingIndex = undefined;
    this.name = '';
    this.family = '';
    this.birthday = null;
    this.itemNum = null;
  }

  convertDateToLocalDate(date: Date): LocalDate {
    if (date === null || date === undefined) {
      return null;
    }
    return {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    };
  }

  convertLocalDateToDate(localDate: LocalDate): Date {
    if (localDate === null || localDate === undefined) {
      return null;
    }
    return new Date(localDate.year, localDate.month, localDate.day);
  }
}

export class User {
  private name: string;
  private family: string;
  private itemNum: number;
  private birthday: LocalDate;

  constructor(
    name: string,
    family: string,
    itemNum?: number,
    birthday?: LocalDate
  ) {
    this.name = name;
    this.family = family;
    this.itemNum = itemNum;
    this.birthday = birthday;
  }

  get Name(): string {
    return this.name;
  }

  get Family(): string {
    return this.family;
  }

  get ItemNum(): number {
    return this.itemNum;
  }

  get Birthday(): LocalDate {
    return this.birthday;
  }
}

export interface LocalDate {
  day: number;
  month: number;
  year: number;
}
