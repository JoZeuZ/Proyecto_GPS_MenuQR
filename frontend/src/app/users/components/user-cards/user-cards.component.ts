import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { EditUserDialogComponent } from '../edit-user-dialog/edit-user-dialog.component';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
import { PaginatorComponent } from '../../../public/components/paginator/paginator.component';

@Component({
  selector: 'app-user-cards',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    PaginatorComponent
  ],
  templateUrl: './user-cards.component.html',
  styleUrls: ['./user-cards.component.css']
})
export class UserCardsComponent implements OnInit, OnChanges {
  @Input() users: any[] = [];
  @Input() currentPage: number = 1;
  @Output() userEdited = new EventEmitter<any>();
  @Output() userDeleted = new EventEmitter<string>();
  @Output() pageChange = new EventEmitter<number>();

  public itemsPerPage: number = 10;
  public paginatedUsers: any[] = [];

  constructor(
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.applyPagination();
  }

  ngOnChanges(): void {
    this.applyPagination();
  }

  applyPagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = this.users.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.pageChange.emit(page);
    this.applyPagination();
  }

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
      data: { user: { ...user } }
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
      this.applyPagination();
    });
  }
}