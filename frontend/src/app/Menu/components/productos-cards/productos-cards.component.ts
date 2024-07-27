import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductosApiService } from '../../service/productos-api.service';
import { DecimalPipe, NgForOf, CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { PaginatorComponent } from '../../../public/components/paginator/paginator.component';
import { EditProductosDialogComponent } from '../edit-productos-dialog/edit-productos-dialog.component';
import { DeleteProductosDialogComponent } from '../delete-productos-dialog/delete-productos-dialog.component';


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
  styleUrl: './productos-cards.component.css'
})
export class ProductosCardsComponent {
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

  openEditDialog(producto: any): void {
    const dialogRef = this.dialog.open(EditProductosDialogComponent, {
      width: '400px',
      data: producto
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productoEdited.emit(result);
      }
    });
  }

  openDeleteDialog(producto: any): void {
    const dialogRef = this.dialog.open(DeleteProductosDialogComponent, {
      width: '400px',
      data: producto
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productoDeleted.emit(result);
      }
    });
  }

}
