import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IngredientesApiService } from '../../services/ingredientes-api.service';
import { DecimalPipe, NgForOf, CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { AddIngredientDialog } from '../add-ingredient-dialog/add-ingredient-dialog.component';
import { DeleteIngredientDialog } from '../delete-ingredient-dialog/delete-ingredient-dialog.component';
import { EditImageDialogComponent } from '../edit-image-dialog/edit-image-dialog.component';
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
    MatSlideToggleModule,
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
  @Output() ingredientSaveChanges = new EventEmitter<void>();

  public editedIngredientes: any = {};
  public isSaveButtonEnabled: boolean = false;

  constructor(private service: IngredientesApiService, private dialog: MatDialog) { }

  getBackgroundImage(imgPath: any): string {
    if (typeof imgPath !== 'string') {
      console.error('imgPath is not a string:', imgPath);
      return '';
    }

    let imageUrl: string;

    if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
      imageUrl = imgPath;
    } else if (imgPath.startsWith('uploads/')) {
      imageUrl = `http://localhost:3000/api/${imgPath}`;
    } else {
      imageUrl = `http://localhost:3000/api${imgPath}`;
    }

    return `url(${imageUrl})`;
  }

  openEditImageDialog(ingrediente: any): void {
    const dialogRef = this.dialog.open(EditImageDialogComponent, {
      width: '250px',
      data: { img: ingrediente.img } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        ingrediente.img = result;
        this.editedIngredientes[ingrediente._id] = ingrediente;
        this.isSaveButtonEnabled = true;
        this.ingredientEdited.emit(this.editedIngredientes);
      }
    });
  }

  toggleDisponibilidad(ingrediente: any, event: any) {
    ingrediente.disponible = event.checked;
    this.editedIngredientes[ingrediente._id] = ingrediente;
    this.isSaveButtonEnabled = true;
    this.ingredientEdited.emit(this.editedIngredientes);
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

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Ingrediente eliminado');
      } else {
        console.log('Eliminación cancelada');
      }
    });
  }



  

  enableEditing(ingrediente: any, field: string) {
    ingrediente[`editing${field}`] = true;
  }

  saveChanges() {
    const updates = Object.values(this.editedIngredientes);
    updates.forEach((ingrediente: any) => {
      this.service.updateIngrediente(ingrediente._id, ingrediente).subscribe(
        (response: any) => {
          console.log('Ingrediente actualizado:', response);
        },
        (error: any) => {
          console.error('Error al actualizar el ingrediente:', error);
        }
      );
    });
    this.editedIngredientes = {};
    this.isSaveButtonEnabled = false;
    this.ingredientSaveChanges.emit();
  }




  


}