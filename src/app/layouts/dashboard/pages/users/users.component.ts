import { Component } from '@angular/core';

import { User } from './models';



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  displayedColumns: string[] = ['id', 'fullName', 'email','role','course','actions'];
  dataSource: User [] = [
  { id: 1,
    firstName: "Gera",
    lastName: "Linares",
    email:"gera@email.com",
    password: "123123",
    role:"ADMIN",
    course:"Angular"
  },
  { id: 2,
    firstName: "Pepe",
    lastName: "Meme",
    email:"pepe@email.com",
    password: "123123",
    role:"ADMIN",
    course:"Angular"
  }
  ]



  onDelete(user: User) {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (confirmDelete) {
      console.log('Eliminar usuario:', user);
      this.dataSource = this.dataSource.filter(u => u.id !== user.id);
    }
  }
  onUserSubmitted(ev: User) : void {
    this.dataSource = [...this.dataSource, {...ev, id: new Date().getTime()}];

  }
}
