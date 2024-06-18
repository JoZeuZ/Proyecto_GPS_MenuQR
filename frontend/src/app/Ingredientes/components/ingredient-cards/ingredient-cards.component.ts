import { Component, Input, Output, EventEmitter } from '@angular/core';
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
    MatDialogModule
  ],
  templateUrl: './ingredient-cards.component.html',
  styleUrls: ['./ingredient-cards.component.css']
})
export class IngredientCardsComponent {
  @Input() ingredientes: any[] = [];
  @Output() ingredientEdited = new EventEmitter<any>();
  @Output() ingredientDeleted = new EventEmitter<any>();

  constructor(private service: IngredientesApiService, private dialog: MatDialog) { }

  getBackgroundImage(imgPath: any): string {
    if (typeof imgPath !== 'string') {
      console.error('imgPath is not a string:', imgPath);
      return '';
    }

    let imageUrl: string;

    imageUrl = `http://localhost:3000/api/${imgPath}`;

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
    });

  }
}
