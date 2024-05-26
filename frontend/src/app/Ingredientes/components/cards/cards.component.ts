import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IngredientesApiService } from '../../services/ingredientes-api.service';
import { DecimalPipe, NgForOf, CommonModule } from "@angular/common";
import { MatCard, MatCardAvatar, MatCardHeader, MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { AddIngredientDialog } from '../add-ingredient-dialog/add-ingredient-dialog.component';
import { DeleteIngredientDialog } from '../delete-ingredient-dialog/delete-ingredient-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [
    DecimalPipe,
    NgForOf,
    CommonModule,
    MatCard,
    MatCardAvatar,
    MatCardHeader,
    MatCardModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule
  ],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  public ingredientes: any[] = [];
  public editedIngredientes: any = {};
  public isSaveButtonEnabled: boolean = false;

  constructor(private service: IngredientesApiService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getIngredientes();
  }

  getIngredientes() {
    this.service.getIngredientes().subscribe((response: any) => {
      if (response.state === 'Success' && Array.isArray(response.data)) {
        this.ingredientes = response.data[1];
      } else {
        console.error('Error en la respuesta del servicio:', response);
      }
    });
  }

  toggleDisponibilidad(ingrediente: any, event: any) {
    ingrediente.disponible = event.checked;
    this.editedIngredientes[ingrediente._id] = ingrediente;
    this.isSaveButtonEnabled = true;
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
  }

  getBackgroundImage(imgPath: string): string {
    if (imgPath.startsWith('/')) {
      imgPath = imgPath.substring(1);
    }
    return `url(http://localhost:3000/api/${imgPath})`;
  }

  openAddIngredientDialog() {
    const dialogRef = this.dialog.open(AddIngredientDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result instanceof FormData) {
          this.service.addIngrediente(result).subscribe(
            (response: any) => {
              console.log('Ingrediente agregado:', response);
              this.getIngredientes(); // Refrescar la lista de ingredientes
            },
            (error: any) => {
              console.error('Error al agregar el ingrediente:', error);
            }
          );
        } else {
          // Manejo de datos sin imagen, si es necesario
          this.service.addIngrediente(result).subscribe(
            (response: any) => {
              console.log('Ingrediente agregado:', response);
              this.getIngredientes(); // Refrescar la lista de ingredientes
            },
            (error: any) => {
              console.error('Error al agregar el ingrediente:', error);
            }
          );
        }
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
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Ingrediente eliminado');
      } else {
        console.log('Eliminación cancelada');
      }
    });
  }

}