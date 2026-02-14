
export interface UserFormModel {
  id?: string;
  full_name: string;
  full_name_ar: string;
  email: string;
  phone: string;
  national_id: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export type UserFieldType = 'string' | 'boolean';


export interface UserFieldConfig {
  name: keyof UserFormModel;
  label: string;
  type: UserFieldType;
  required?: boolean;
}

export const USER_FORM_FIELDS: UserFieldConfig[] = [
  { name: 'full_name',    label: 'الاسم الكامل',        type: 'string',  required: true },
  { name: 'full_name_ar', label: 'الاسم الكامل (عربي)', type: 'string' },
  { name: 'email',        label: 'البريد الإلكتروني',   type: 'string' },
  { name: 'phone',        label: 'رقم الجوال',          type: 'string' },
  { name: 'national_id',  label: 'رقم الهوية',          type: 'string' },
  { name: 'is_active',    label: 'فعال',                type: 'boolean' },
];
