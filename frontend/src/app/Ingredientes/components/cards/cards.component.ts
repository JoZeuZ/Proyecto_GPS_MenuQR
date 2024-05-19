import { Component, OnInit } from '@angular/core';
import { IngredientesApiService } from '../../services/ingredientes-api.service';
import { DecimalPipe, NgForOf, CommonModule } from "@angular/common";
import { MatCard, MatCardAvatar, MatCardContent, MatCardHeader, MatCardModule } from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [
    DecimalPipe,
    NgForOf,
    CommonModule,
    MatCard,
    MatCardAvatar,
    MatCardContent,
    MatCardHeader,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'] 
})
export class CardsComponent implements OnInit {
      
  public ingredientes: any [] = [];

  constructor(private service: IngredientesApiService) { }
  
  ngOnInit(): void {
    this.getIngredientes();
  }

  getIngredientes() {
    this.service.getIngredientes().subscribe((response: any) => {
      // Verifica si la respuesta es exitosa y si contiene datos
      if (response.state === 'Success' && Array.isArray(response.data)) {
        // Asigna directamente el array de ingredientes a this.ingredientes
        this.ingredientes = response.data[1];

        this.ingredientes.forEach(ingrediente => {
          // console.log(ingrediente.img);
        });
      } else {
        console.error('Error en la respuesta del servicio:', response);
      }
    });
  }

  
}
