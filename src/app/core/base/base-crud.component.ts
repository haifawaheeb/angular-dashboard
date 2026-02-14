import { FormGroup } from "@angular/forms";
export abstract class BaseCrudComponent<T> {

  form!: FormGroup;
  data: T[] = [];

  abstract getFormDefaults(): any;
  abstract getId(item: T): string;

  // -------------------------------
  // 💛 التعميم الحقيقي هنا
  // -------------------------------

  onAdd(): void {
    this.form.reset(this.getFormDefaults());
  }

  onSave(): void {
    const item = this.form.value;
    console.log("Saving item:", item);

    // مثال حفظ (يمكن تغييره لاحقاً)
    if (!item.id) {
      // إنشاء جديد
      item.id = crypto.randomUUID();
      this.data.push(item);
    } else {
      // تعديل
      const i = this.data.findIndex(d => this.getId(d) === item.id);
      this.data[i] = item;
    }
  }

  onDelete(id: string): void {
    console.log("Deleting item:", id);
    this.data = this.data.filter(item => this.getId(item) !== id);
  }

}
