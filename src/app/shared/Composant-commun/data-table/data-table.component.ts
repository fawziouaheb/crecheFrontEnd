import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent {
  @Input() data: any[] = [];
  @Input() columns: string[] = [];
  @Input() keys: string[] = [];

  @Output() view = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() accept = new EventEmitter<any>();

  getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => {
      if (!acc) return '';
      // Gestion des tableaux (e.g. parents[0].email)
      const arrayMatch = part.match(/(\w+)\[(\d+)\]/);
      if (arrayMatch) {
        const prop = arrayMatch[1];
        const index = parseInt(arrayMatch[2], 10);
        return acc[prop]?.[index];
      }
      return acc[part];
    }, obj);
  }

  onView(row: any) {
    this.view.emit(row);
  }

  onDelete(row: any) {
    this.delete.emit(row);
  }

  onAccept(row: any) {
    this.accept.emit(row);
  }
}
