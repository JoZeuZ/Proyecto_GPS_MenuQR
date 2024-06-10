import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { UsersApiService } from '../../services/users-api.service';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';


@Component({
  selector: 'app-user-cards',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './user-cards.component.html',
  styleUrls: ['./user-cards.component.css']
})
export class UserCardsComponent implements OnInit {
  @Input() users: any[] = [];
  @Output() userEdited = new EventEmitter<any>();
  @Output() userDeleted = new EventEmitter<string>();

  constructor(private userService: UsersApiService, private dialog: MatDialog) {}

  ngOnInit(): void {}


  getUserRoles(user: any): string {
    if (Array.isArray(user.roles)) {
      return user.roles.map((role: any) => typeof role === 'string' ? role : role.name || role).join(', ');
    } else if (typeof user.roles === 'string') {
      return user.roles;
    } else {
      return '';
    }
  }
  
  openEditUserDialog(user: any): void {
    console.log('Usuario para editar:', user);
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: { user }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const sanitizedData = {
          _id: result._id,
          username: result.username,
          email: result.email,
          roles: result.roles.map((role: any) => typeof role === 'string' ? role : role.name || role),
        };
        console.log('Datos sanitizados enviados para actualizar usuario:', sanitizedData);
        this.userService.updateUser(result._id, sanitizedData).subscribe(
          updatedUser => {
            console.log('Usuario actualizado:', updatedUser);
            this.userEdited.emit(updatedUser);
          },
          error => {
            console.error('Error al actualizar el usuario:', error);
          }
        );
      }
    });
  }
    

  openDeleteUserDialog(user: any): void {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '250px',
      data: user
    });

    dialogRef.componentInstance.userDeleted.subscribe((id: string) => {
      this.users = this.users.filter(u => u._id !== id);
      this.userDeleted.emit(id);
    });
  }
  
  
  

}
