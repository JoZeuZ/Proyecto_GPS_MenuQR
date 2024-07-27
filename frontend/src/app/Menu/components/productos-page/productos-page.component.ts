import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosApiService } from '../../service/productos-api.service';
import { ProductosCardsComponent } from '../productos-cards/productos-cards.component';



@Component({
  selector: 'app-productos-page',
  standalone: true,
  imports: [ 
    ProductosCardsComponent
  ],
  templateUrl: './productos-page.component.html',
  styleUrl: './productos-page.component.css'
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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(): void {
    this.service.getProductos().subscribe((response: any) => {
      if (response.state === 'Success' && Array.isArray(response.data)) {
        this.productos = response.data[1];
        this.applyFilters();
      } else {
        console.error('Error en la respuesta del servicio:', response);
      }
    });
  }

  applyFilters(): void {
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
}
