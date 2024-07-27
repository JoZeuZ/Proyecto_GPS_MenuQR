import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  @Input() options: string[] = [];
  @Input() placeholder: string = 'Filtrar';
  @Output() filterChange = new EventEmitter<string[]>();
  selectedValues: string[] = [];
  showOptions = false;

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  onSelectionChange() {
    this.filterChange.emit(this.selectedValues);
  }
}
