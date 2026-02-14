import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StageService } from '../../../services/academictages.service';

@Component({
  selector: 'app-academic-stages',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule ],
  templateUrl: './academic-stages.component.html',
  styleUrls: ['./academic-stages.component.scss']
})
export class AcademicStagesComponent implements OnInit {
filteredStages: any[] = [];
editStage(stage: any) {}
deleteStage(id: string) {}
saveStage() {}

    academictages: any[] = [];
    Filteredacademictages: any[] = [];

    search: string = '';

    isDialogOpen = false;
    dialogTitle = 'إضافة مرحلة';

    form!: FormGroup;


    selectedRoles: string[] = [];

    constructor(
      private fb: FormBuilder,
      private api: StageService
    ) {}

    ngOnInit(): void {
      this.initForm();
      this.loadstages();
    }

    initForm() {
      this.form = this.fb.group({
       name_ar: ['', Validators.required],
       name_en: [''],
       stage_index_order: [0],
      });
    }


    loadstages() {
      this.api.getAll().subscribe(res => {
        this.academictages = res;
        this.Filteredacademictages = [...this.academictages];
      });
    }

    applyFilter() {
      const A = this.search.toLowerCase();
      this.Filteredacademictages = this.academictages.filter(Aca =>
        Aca.name_ar?.toLowerCase().includes(A) ||
        Aca.name_en?.toLowerCase().includes(A) ||
        Aca.order_index?.includes(A)
      );
    }


    openDialog() {
      this.isDialogOpen = true;
      this.dialogTitle = 'إضافة مرحلة ';

      this.form.reset({ is_active: true });
      this.selectedRoles = [];
      this.form.patchValue({stage_index_order: 0 });

    }

    closeDialog() {
      this.isDialogOpen = false;
    }


    toggleRole(role: string, event: any) {
      if (event.target.checked) {
        if (!this.selectedRoles.includes(role)) {
          this.selectedRoles.push(role);
        }
      } else {
        this.selectedRoles = this.selectedRoles.filter(r => r !== role);
      }
    }

    editAcademicstage(Acad: any) {
      this.isDialogOpen = true;
      this.dialogTitle = 'تعديل مرحلة';

      this.form.patchValue({
             name_ar: Acad.name_ar,
             name_en: Acad.name_en,
             stage_index_order: Acad.stage_index_order

      });

      this.selectedRoles = [...Acad.roles];
    }


    saveAcademicstage() {
      if (!this.form.valid) {
        alert('يرجى تعبئة الحقول المطلوبة');
        return;
      }

      const newData = {
        ...this.form.value,
        roles: [...this.selectedRoles]
      };

      this.api.create(newData).subscribe(() => {
        this.loadstages();
        this.closeDialog();
      });
    }


    deleteAcademicstage(id: string) {
      this.api.delete(id.toString()).subscribe(() => {
        this.loadstages();
      });
    }

  }
