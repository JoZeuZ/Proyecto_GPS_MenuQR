import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';

@Component({
  selector: 'app-user-cards',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './user-cards.component.html',
  styleUrls: ['./user-cards.component.css']
})
export class UserCardsComponent implements OnInit {
  @Input() users: any[] = [];
  @Output() userEdited = new EventEmitter<any>();
  @Output() userDeleted = new EventEmitter<string>();

  constructor(private dialog: MatDialog) {}

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
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: { user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userEdited.emit(result);
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
