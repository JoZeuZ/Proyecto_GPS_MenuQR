import { MatButtonModule } from '@angular/material/button';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserCardsComponent } from '../user-cards/user-cards.component';
import { AddUserDialog } from '../add-user-dialog/add-user-dialog.component';
import { UsersApiService } from '../../services/users-api.service';
import { SearchFilterComponent } from '../../../public/components/search-filter/search-filter.component';
import { FilterComponent } from '../../../public/components/filter/filter.component';
import { PaginatorComponent } from '../../../public/components/paginator/paginator.component';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    UserCardsComponent,
    AddUserDialog,
    MatButtonModule,
    SearchFilterComponent,
    FilterComponent,
    PaginatorComponent
  ],
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  users: any[] = [];
  filteredUsers: any[] = [];
  isSaveButtonEnabled: boolean = false;
  editedUsers: { [key: string]: any } = {};
  roles: string[] = ['Administrador', 'Mesero'];
  public currentPage: number = 1;
  public itemsPerPage: number = 10;
  public searchTerm: string = '';
  public selectedFilters: string[] = [];

  constructor(
    private userService: UsersApiService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe((users: any[]) => {
      this.users = users;
      this.applyFilters();
    });
  }

  onSearch(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.currentPage = 1;
    this.applyFilters();
  }

  onFilterChange(selectedRoles: string[]) {
    this.selectedFilters = selectedRoles;
    this.currentPage = 1;
    this.applyFilters();
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(AddUserDialog);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.userService.createUser(result).subscribe(
          (newUser: any) => {
            this.fetchUsers();
            this.showNotification('Usuario creado');
          },
          (error: any) => {
            console.error('Error al crear el usuario:', error);
            this.dialog.open(AddUserDialog, {
              data: result,
            });
          }
        );
      }
    });
  }

  onUserEdited(user: any): void {
    if (!user || !user._id || typeof user._id !== 'string' || !user.username || !user.email) {
      console.error('Datos de usuario inválidos recibidos:', user);
      return;
    }

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
        this.showNotification('Usuario actualizado');
      },
      error => {
        console.error('Error al actualizar el usuario en la API:', error);
      }
    );
  }

  onUserDeleted(userId: string): void {
    this.userService.deleteUser(userId).subscribe(
      () => {
        this.fetchUsers();
        this.showNotification('Usuario eliminado');
      },
      (error: any) => {
        console.error('Error al eliminar el usuario:', error);
      }
    );
  }

  applyFilters() {
    this.filteredUsers = this.users.filter(user => {
      const matchesSearch = user.username && user.username.toLowerCase().startsWith(this.searchTerm.toLowerCase());
      const matchesFilter = this.selectedFilters.length === 0 || this.selectedFilters.some(role => {
        const userRoles = user.roles.map((r: any) => typeof r === 'string' ? r : r.name);
        const roleMatch = userRoles.includes(role);
        return roleMatch;
      });
      return matchesSearch && matchesFilter;
    });
  }

  saveChanges(): void {
    const updates = Object.values(this.editedUsers);

    updates.forEach(user => {
      this.userService.updateUser(user._id, user).subscribe(
        updatedUser => {
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

  addUser(): void {
    this.openAddUserDialog();
  }

  showNotification(message: string) {
    this.snackBar.open(message, 'X', {
      duration: 5000,
      horizontalPosition: 'left',
      panelClass: ['custom-snackbar']
    });
  }
}
