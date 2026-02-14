export interface FieldDefinition {
  key: string;         // اسم العمود
  label: string;       // عنوان الحقل
  type: string;        // text, number, select, date...
  required?: boolean;
}

export interface PageDefinition {
  title: string;                   // عنوان الصفحة
  tableColumns: FieldDefinition[]; // أعمدة الجدول
  dialogFields: FieldDefinition[]; // حقول الديلوج
}
