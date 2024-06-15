import { MatButtonModule } from '@angular/material/button';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserCardsComponent } from '../user-cards/user-cards.component';
import { AddUserDialog } from '../add-user-dialog/add-user-dialog.component';
import { UsersApiService } from '../../services/users-api.service';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    UserCardsComponent,
    AddUserDialog,
    MatButtonModule
  ],
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  users: any[] = [];
  isSaveButtonEnabled: boolean = false;
  editedUsers: { [key: string]: any } = {}; // Para rastrear usuarios editados

  constructor(private userService: UsersApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe((users: any[]) => {
      this.users = users;
    });
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialog);

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.userService.createUser(result).subscribe(
          (newUser: any) => {
            console.log('Usuario creado:', newUser);
            this.fetchUsers();
          },
          (error: any) => {
            console.error('Error al crear el usuario:', error);
          }
        );
      }
    });
  }

  searchUser(searchTerm: string): void {
    if (searchTerm) {
      this.userService.getUsers().subscribe((users: any[]) => {
        this.users = users.filter(user => user.name.includes(searchTerm));
      });
    } else {
      this.fetchUsers();
    }
  }

  addUser(): void {
    this.openAddUserDialog();
  }

  onUserEdited(user: any): void {
    if (!user || !user._id || typeof user._id !== 'string' || !user.username || !user.email) {
      console.error('Datos de usuario inválidos recibidos:', user);
      return;
    }
  
    console.log('Usuario editado:', user);
  
    const sanitizedData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      password: user.password, 
      roles: Array.isArray(user.roles) ? user.roles.map((role: any) => typeof role === 'string' ? role : role.name) : [],
    };
    
    this.userService.updateUser(sanitizedData._id, sanitizedData).subscribe(
      updatedUser => {
        this.fetchUsers(); 
      },
      error => {
        console.error('Error al actualizar el usuario en la API:', error);
      }
    );
  }
  

  onUserDeleted(userId: string): void {
    this.userService.deleteUser(userId).subscribe(
      () => {
        console.log('Usuario eliminado');
        this.fetchUsers();
      },
      (error: any) => {
        console.error('Error al eliminar el usuario:', error);
      }
    );
  }

  saveChanges(): void {
    console.log('Guardar cambios');
    const updates = Object.values(this.editedUsers);

    // Realizar las actualizaciones en la API
    updates.forEach(user => {
      this.userService.updateUser(user._id, user).subscribe(
        updatedUser => {
          console.log('Usuario actualizado en la API:', updatedUser);
          this.fetchUsers();
        },
        error => {
          console.error('Error al actualizar el usuario en la API:', error);
        }
      );
    });

    this.editedUsers = {};
    this.isSaveButtonEnabled = false;
  }
}
