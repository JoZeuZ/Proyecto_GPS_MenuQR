import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DecimalPipe, NgForOf, CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { PaginatorComponent } from '../../../public/components/paginator/paginator.component';
import { EditProductosDialogComponent } from '../edit-productos-dialog/edit-productos-dialog.component';
import { DeleteProductosDialogComponent } from '../delete-productos-dialog/delete-productos-dialog.component';
import { ProductosApiService } from '../../service/productos-api.service';
import { CartService } from '../../../Cart/services/cart.service';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { LoginService } from '../../../auth/services/login.service';
import { environment } from '../../../../../environment';

@Component({
  selector: 'app-productos-cards',
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
  templateUrl: './productos-cards.component.html',
  styleUrls: ['./productos-cards.component.css']  
})
export class ProductosCardsComponent implements OnInit, OnChanges {
  @Input() productos: any[] = [];
  @Input() currentPage: number = 1;
  @Output() productoEdited = new EventEmitter<any>();
  @Output() productoDeleted = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<number>();

  public itemsPerPage: number = 10;
  public paginatedProductos: any[] = [];
  roles : string[] = [];
  isAuthenticated: boolean = false;

  constructor(
    private service: ProductosApiService,
    private dialog: MatDialog,
    private cartService: CartService,
    private cookieService: CookieService,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
    this.applyPagination();
    this.roles = this.getUserRole();
    this.isAuthenticated = this.loginService.isAuthenticated();
    this.loginService.getAuthState().subscribe(authState => {
      this.isAuthenticated = authState;
    });
  }

  ngOnChanges(): void {
    this.applyPagination();
  }

  applyPagination() {
    if (!Array.isArray(this.productos)) {
      this.productos = [];
    }

    const filteredProductos = this.filterProductos(this.productos);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProductos = filteredProductos.slice(startIndex, endIndex);
  }

  filterProductos(productos: any[]): any[] {
    return productos.filter(producto => {
      return producto.ingredientes.every((ingrediente: any) => ingrediente.disponible);
    });
  }

  isLast(ingrediente: any, ingredientes: any[]): boolean {
    return ingredientes.indexOf(ingrediente) === ingredientes.length - 1;
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.pageChange.emit(page);
    this.applyPagination();
  }

  getImageUrl(imgPath: string): string {
    if (!imgPath) {
        return '';
    }
    return `${environment.apiUrl}/uploads/productos/${imgPath.split('/').pop()}`;
  }

  openEditProductosDialog(producto: any): void {
    const dialogRef = this.dialog.open(EditProductosDialogComponent, {
      width: '400px',
      data: { producto: producto }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productoEdited.emit(result);
      }
    });
  }

  openDeleteDialog(producto: any): void {
    const dialogRef = this.dialog.open(DeleteProductosDialogComponent, {
      width: '250px',
      data: producto
    });

    dialogRef.componentInstance.productoDeleted.subscribe((id: string) => {
      this.productos = this.productos.filter(p => p._id !== id);
      this.productoDeleted.emit(id);
      this.applyPagination();
    });
  }

  addToCart(producto: any) {
    const productToCart = {
      productoId: producto._id, // Usamos el _id del producto
      nombre: producto.nombre, // Añadimos el nombre del producto
      img: this.getImageUrl(producto.img), // Añadimos la URL de la imagen del producto
      cantidad: 1, // Puedes ajustar la cantidad según tu lógica
      precio: producto.precio // Añadimos el precio del producto
    };
  
    console.log('Adding to cart', productToCart);
    this.cartService.addToCart(productToCart);
  }

  getUserRole(): string[] {
    const token = this.cookieService.get('awa');
    if (!token) {
      return [];
    }
    const decodedToken: any = jwtDecode(token);
    return decodedToken.roles ? decodedToken.roles.map((role: any) => role.name) : [];
  }

  isAdmin(): boolean {
    return this.roles.includes('Administrador');
  }
}


