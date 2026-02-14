import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

export interface DalilGridColumn {
  field: string;
  title: string;
  type?: 'string' | 'number' | 'date' | 'boolean' | 'translate';
  width?: number;
  sortable?: boolean;
  sum?: boolean;
}

@Component({
  selector: 'dalil-grid',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './dalil-grid.component.html',
  styleUrls: ['./dalil-grid.component.scss']
})
export class DalilGridComponent implements OnInit, OnDestroy {

  @Input() title = '';
  @Input() columns: DalilGridColumn[] = [];
  @Input() data: any[] = [];

  // إعدادات الصفحات
  @Input() pageSizeOptions: number[] = [10, 25, 50];
  pageEvent: PageEvent = { length: 0, pageIndex: 0, pageSize: 10 };

  dataSource = new MatTableDataSource<any>([]);
  displayedColumnFields: string[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>(this.data || []);
    this.pageEvent.length = this.data?.length || 0;
    this.displayedColumnFields = this.columns.map(c => c.field);
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnDestroy(): void {
    // ممكن لاحقاً نحفظ إعدادات الأعمدة في LocalStorage مثلاً
  }

  onPageChange(event: PageEvent) {
    this.pageEvent = event;
  }

  getSum(column: DalilGridColumn): number {
    if (!column.sum) return 0;
    return (this.data || []).reduce((sum, row) => {
      const v = Number(row[column.field] || 0);
      return sum + (isNaN(v) ? 0 : v);
    }, 0);
  }
}
