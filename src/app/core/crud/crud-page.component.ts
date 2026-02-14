import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrudField } from '../../core/crud/crud.config';
import { CrudService } from '../../core/crud/crud.service';
import { CrudDialogComponent } from '../../core/crud/crud-dialog.component';

@Component({
  selector: 'crud-page',
  standalone: true,
  imports: [CommonModule, CrudDialogComponent],
  templateUrl: './crud-page.component.html',
  styleUrls: ['./crud-page.component.scss']
})
export class CrudPageComponent {

  @Input() title = '';
  @Input() endpoint = '';
  @Input() fields: CrudField[] = [];

  data: any[] = [];
  search = '';
  isDialogOpen = false;
  editModel: any = {};

  constructor(private api: CrudService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.api.list(this.endpoint).subscribe(res => this.data = res);
  }

  openAdd() {
    this.editModel = {};
    this.isDialogOpen = true;
  }

  openEdit(row: any) {
    this.editModel = { ...row };
    this.isDialogOpen = true;
  }

  delete(id: any) {
    this.api.delete(this.endpoint, id).subscribe(() => this.load());
  }

  save(data: any) {
    if (this.editModel.id) {
      this.api.update(this.endpoint, this.editModel.id, data)
        .subscribe(() => {
          this.isDialogOpen = false;
          this.load();
        });

    } else {
      this.api.create(this.endpoint, data)
        .subscribe(() => {
          this.isDialogOpen = false;
          this.load();
        });
    }
  }
}
