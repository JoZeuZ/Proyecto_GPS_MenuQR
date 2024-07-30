import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductosApiService } from '../../service/productos-api.service';
import { AgregarProductoComponent } from '../add-productos-dialog/add-productos-dialog.component';
import { DeleteProductosDialogComponent } from '../delete-productos-dialog/delete-productos-dialog.component';
import { ProductosCardsComponent } from '../productos-cards/productos-cards.component';
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { CallWaiterComponent } from '../../../Llamada/waiter-call-button/waiter-call-button.component';

@Component({
  selector: 'app-productos-page',
  standalone: true,
  imports: [ 
    ProductosCardsComponent,
    AgregarProductoComponent,
    DeleteProductosDialogComponent,
    MatButtonModule,
    MatIconModule,
    CallWaiterComponent
  ],
  templateUrl: './productos-page.component.html',
  styleUrls: ['./productos-page.component.css']
})
export class ProductosFormComponent implements OnInit {
  productos: any[] = [];
  filteredProductos: any[] = [];
  public currentPage: number = 1;
  public itemsPerPage: number = 10;
  public searchTerm: string = '';
  public selectedFilters: string[] = [];
  public totalFilteredItems: number = 0;

  constructor(
    private service: ProductosApiService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(): void {
    this.service.getProductos().subscribe((response: any) => {
      if (response.state === 'Success' && Array.isArray(response.data)) {
        this.productos = response.data[1];
        if (!Array.isArray(this.productos)) {
          this.productos = [];
        }
        this.applyFilters();
      } else {
        console.error('Error en la respuesta del servicio:', response);
        this.productos = [];
      }
    });
  }

  applyFilters(): void {
    if (!Array.isArray(this.productos)) {
      this.productos = [];
    }

    this.filteredProductos = this.productos.filter((producto) => {
      let matchesSearch = true;
      let matchesFilters = true;

      if (this.searchTerm) {
        const searchTerm = this.searchTerm.toLowerCase();
        matchesSearch = producto.nombre.toLowerCase().includes(searchTerm);
      }

      if (this.selectedFilters.length > 0) {
        matchesFilters = this.selectedFilters.includes(producto.disponibilidad);
      }

      return matchesSearch && matchesFilters;
    });

    this.totalFilteredItems = this.filteredProductos.length;
  }

  onSearchChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.applyFilters();
  }

  onFilterChange(selectedFilters: string[]): void {
    this.selectedFilters = selectedFilters;
    this.applyFilters();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
  }

  onAddProducto(): void {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

  openAddProductoDialog(): void {
    const dialogRef = this.dialog.open(AgregarProductoComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProductos();
      }
    });
  }

  onProductoEdited(updatedProducto: any): void {
    const index = this.productos.findIndex(p => p._id === updatedProducto._id);
    if (index !== -1) {
      this.productos[index] = updatedProducto;
      this.applyFilters();
    }
  }

  onIngredientDeleted(id: string): void {
    this.productos = this.productos.filter(productos => productos._id !== id);
    this.applyFilters();
    alert('Producto eliminado');
  }

  navigateToAddReview(): void {
    this.router.navigate(['/reviews']);
  }
}
