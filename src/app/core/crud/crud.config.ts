export type FieldType = 'string' | 'number' | 'email' | 'select' | 'boolean' | 'date';

export interface CrudField {
  name: string;          // اسم الحقل داخل الـ Backend
  label: string;         // الاسم الظاهر للمستخدم
  type: FieldType;       // نوع الحقل (نص – رقم – قائمة – Boolean)
  required?: boolean;
  options?: { value: any; label: string }[]; // لو Select
}
