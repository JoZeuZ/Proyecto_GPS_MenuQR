import { MatButtonModule } from '@angular/material/button';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IngredientesApiService } from '../../services/ingredientes-api.service';
import { IngredientCardsComponent } from '../ingredient-cards/ingredient-cards.component';
import { AddIngredientDialog } from '../add-ingredient-dialog/add-ingredient-dialog.component';
import { EditIngredientDialogComponent } from '../edit-ingredient-dialog/edit-ingredient-dialog.component';
import { SearchFilterComponent } from '../../../public/components/search-filter/search-filter.component';
import { FilterComponent } from '../../../public/components/filter/filter.component';
import { PaginatorComponent } from '../../../public/components/paginator/paginator.component';

@Component({
  selector: 'app-ingredient-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    IngredientCardsComponent,
    AddIngredientDialog,
    MatButtonModule,
    SearchFilterComponent,
    FilterComponent,
    PaginatorComponent
  ],
  templateUrl: './ingredient-page.component.html',
  styleUrls: ['./ingredient-page.component.css']
})
export class IngredientPageComponent implements OnInit {
  ingredientes: any[] = [];
  filteredIngredientes: any[] = [];
  public currentPage: number = 1;
  public itemsPerPage: number = 10;
  public searchTerm: string = '';
  public selectedFilters: string[] = [];
  public availabilityOptions: string[] = ['Disponible', 'No Disponible'];
  public totalFilteredItems: number = 0;

  constructor(
    private service: IngredientesApiService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getIngredientes();
  }

  getIngredientes(): void {
    this.service.getIngredientes().subscribe((response: any) => {
      if (response.state === 'Success' && Array.isArray(response.data)) {
        this.ingredientes = response.data[1];
        this.applyFilters();
      } else {
        console.error('Error en la respuesta del servicio:', response);
      }
    });
  }

  onSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.currentPage = 1;
    this.applyFilters();
  }

  onFilterChange(selectedOptions: string[]): void {
    this.selectedFilters = selectedOptions;
    this.currentPage = 1;
    this.applyFilters();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.applyFilters(); 
  }

  openAddIngredientDialog(): void {
    const dialogRef = this.dialog.open(AddIngredientDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.addIngrediente(result).subscribe(
          (newIngredient: any) => {
            this.getIngredientes();
            this.showNotification('Ingrediente creado');
          },
          (error: any) => {
            console.error('Error al crear el ingrediente:', error);
          }
        );
      }
    });
  }

  openEditIngredientDialog(ingrediente: any): void {
    const dialogRef = this.dialog.open(EditIngredientDialogComponent, {
      data: { ingredient: ingrediente }
    });

    dialogRef.afterClosed().subscribe((updatedIngredient: any) => {
      if (updatedIngredient) {
        this.onIngredientEdited(updatedIngredient);
      }
    });
  }

  onIngredientEdited(updatedIngredient: any): void {
    const index = this.ingredientes.findIndex(i => i._id === updatedIngredient._id);
    if (index !== -1) {
      this.ingredientes[index] = updatedIngredient;
      this.applyFilters();
    }
    this.showNotification('Ingrediente actualizado');
  }

  onIngredientDeleted(id: string): void {
    this.ingredientes = this.ingredientes.filter(ingrediente => ingrediente._id !== id);
    this.applyFilters();
    this.showNotification('Ingrediente eliminado');
  }

  applyFilters(): void {
    this.filteredIngredientes = this.ingredientes.filter(ingrediente => {
      const matchesSearch = ingrediente.nombre && ingrediente.nombre.toLowerCase().startsWith(this.searchTerm.toLowerCase());
      const disponibilidad = ingrediente.disponible ? 'Disponible' : 'No Disponible';
      const matchesFilter = this.selectedFilters.length === 0 || this.selectedFilters.includes(disponibilidad);
      return matchesSearch && matchesFilter;
    });
    this.totalFilteredItems = this.filteredIngredientes.length; 
  }

  showNotification(message: string): void {
    this.snackBar.open(message, 'X', {
      duration: 5000,
      horizontalPosition: 'left',
      panelClass: ['custom-snackbar']
    });
  }
}
