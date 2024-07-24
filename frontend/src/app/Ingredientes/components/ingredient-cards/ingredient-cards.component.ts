import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IngredientesApiService } from '../../services/ingredientes-api.service';
import { DecimalPipe, NgForOf, CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { DeleteIngredientDialog } from '../delete-ingredient-dialog/delete-ingredient-dialog.component';
import { EditIngredientDialogComponent } from '../edit-ingredient-dialog/edit-ingredient-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PaginatorComponent } from '../../../public/components/paginator/paginator.component';

@Component({
  selector: 'app-ingredient-cards',
  standalone: true,
  imports: [
    DecimalPipe,
    NgForOf,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    PaginatorComponent
  ],
  templateUrl: './ingredient-cards.component.html',
  styleUrls: ['./ingredient-cards.component.css']
})
export class IngredientCardsComponent implements OnInit, OnChanges {
  @Input() ingredientes: any[] = [];
  @Input() currentPage: number = 1;
  @Output() ingredientEdited = new EventEmitter<any>();
  @Output() ingredientDeleted = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<number>();

  public itemsPerPage: number = 10;
  public paginatedIngredientes: any[] = [];

  constructor(private service: IngredientesApiService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.applyPagination();
  }

  ngOnChanges(): void {
    this.applyPagination();
  }

  applyPagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedIngredientes = this.ingredientes.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.pageChange.emit(page);
    this.applyPagination();
  }

  getBackgroundImage(imgPath: any): string { 
    if (typeof imgPath !== 'string') {
      console.error('imgPath is not a string:', imgPath);
      return '';
    }

    // Detectar si está ejecutándose en localhost o en otra IP
    const hostname = window.location.hostname;
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';

    // Ajustar la URL de la imagen según el caso
    const imageUrl = isLocalhost
      ? `http://localhost:3000/api/${imgPath}`
      : `http://${hostname}:3000/api/${imgPath}`;

    return `url(${imageUrl})`;
  }

  openEditIngredientDialog(ingrediente: any): void {
    const dialogRef = this.dialog.open(EditIngredientDialogComponent, {
      data: { ingredient: ingrediente }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.ingredientes.findIndex(i => i._id === result._id);
        if (index !== -1) {
          this.ingredientes[index] = result;
        }
        this.ingredientEdited.emit(result);
      }
    });
  }

  openDeleteIngredientDialog(ingrediente: any): void {
    const dialogRef = this.dialog.open(DeleteIngredientDialog, {
      width: '250px',
      data: ingrediente
    });

    dialogRef.componentInstance.ingredientDeleted.subscribe((id: string) => {
      this.ingredientes = this.ingredientes.filter(i => i._id !== id);
      this.ingredientDeleted.emit(id);
      this.applyPagination();
    });
  }
}
