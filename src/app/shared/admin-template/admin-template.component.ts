import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-admin-template',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTableModule
  ],
  templateUrl: './admin-template.component.html',
  styleUrls: ['./admin-template.component.scss']
})
export class AdminTemplateComponent {

  @Input() title: string = "";
  @Input() data: any[] = [];
  @Input() columns: any[] = [];

  @Output() new = new EventEmitter<void>();
  @Output() refresh = new EventEmitter<void>();
  @Output() print = new EventEmitter<void>();
  @Output() search = new EventEmitter<string>();
  @Output() editItem = new EventEmitter<any>();
  @Output() deleteItem = new EventEmitter<string>();

  searchText: string = "";

  get columnKeys() {
    return this.columns.map(c => c.key).concat("actions");
  }

  onSearch() {
    this.search.emit(this.searchText);
  }
}
