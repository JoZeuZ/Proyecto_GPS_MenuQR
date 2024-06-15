import { Component, OnInit } from '@angular/core';
import { IngredientesApiService } from '../../services/ingredientes-api.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { IngredientCardsComponent } from '../ingredient-cards/ingredient-cards.component';
import { AddIngredientDialog } from '../add-ingredient-dialog/add-ingredient-dialog.component';

@Component({
  selector: 'app-ingredient-page',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    IngredientCardsComponent 
  ],
  templateUrl: './ingredient-page.component.html',
  styleUrls: ['./ingredient-page.component.css']
})
export class IngredientPageComponent implements OnInit {
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

  onIngredientEdited(ingrediente: any) {
    this.editedIngredientes[ingrediente._id] = ingrediente;
    this.isSaveButtonEnabled = true;
  }  

  onIngredientDeleted(id: string) {
    this.ingredientes = this.ingredientes.filter(ingrediente => ingrediente._id !== id);
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

  openAddIngredientDialog() {

    const dialogRef = this.dialog.open(AddIngredientDialog, {
      width: '600px', // Ajusta el tamaño según sea necesario
      maxHeight: '90vh' // Evita el desplazamiento vertical
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result instanceof FormData) {
          this.service.addIngrediente(result).subscribe(
            (response: any) => {
              console.log('Ingrediente agregado:', response);
              this.getIngredientes();
            },
            (error: any) => {
              console.error('Error al agregar el ingrediente:', error);
            }
          );
        } else {
          this.service.addIngrediente(result).subscribe(
            (response: any) => {
              console.log('Ingrediente agregado:', response);
              this.getIngredientes();
            },
            (error: any) => {
              console.error('Error al agregar el ingrediente:', error);
            }
          );
        }
      }
    });
  }
}
