import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'app-toolbar-component',
  standalone: true,
  imports: [
    MatToolbar
  ],
  templateUrl: './toolbar-component.component.html',
  styleUrl: './toolbar-component.component.css'
})
export class ToolbarComponentComponent {

}
