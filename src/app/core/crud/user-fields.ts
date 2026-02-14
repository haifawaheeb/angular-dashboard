import { CrudField } from '../../core/crud/crud.config';

export const USER_FIELDS: CrudField[] = [
  { name: 'full_name', label: 'الاسم كامل', type: 'string', required: true },
  { name: 'full_name_ar', label: 'الاسم العربي', type: 'string' },
  { name: 'email', label: 'الإيميل', type: 'email', required: true },
  { name: 'phone', label: 'الهاتف', type: 'string' },
  { name: 'national_id', label: 'الرقم الوطني', type: 'string' },
  { name: 'is_active', label: 'نشط', type: 'boolean' }
];
