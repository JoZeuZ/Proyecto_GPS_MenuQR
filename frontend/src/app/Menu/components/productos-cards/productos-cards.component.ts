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
  styleUrls: ['./productos-cards.component.css']  // Corregido `styleUrl` a `styleUrls`
})
export class ProductosCardsComponent implements OnInit, OnChanges {
  @Input() productos: any[] = [];
  @Input() currentPage: number = 1;
  @Output() productoEdited = new EventEmitter<any>();
  @Output() productoDeleted = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<number>();

  public itemsPerPage: number = 10;
  public paginatedProductos: any[] = [];

  constructor(private service: ProductosApiService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.applyPagination();
  }

  ngOnChanges(): void {
    this.applyPagination();
  }

  applyPagination() {
    if (!Array.isArray(this.productos)) {
      this.productos = [];
    }

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProductos = this.productos.slice(startIndex, endIndex);
  }

  isLast(ingrediente: any, ingredientes: any[]): boolean {
    return ingredientes.indexOf(ingrediente) === ingredientes.length - 1;
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

    const hostname = window.location.hostname;
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';

    const imageUrl = isLocalhost
      ? `http://localhost:3000/api/${imgPath}`
      : `http://${hostname}:3000/api/${imgPath}`;

    return `url(${imageUrl})`;
  }

  openEditDialog(producto: any): void {
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
}
