import { Session } from '../models/session.model';
import { Student } from '../models/student.model';
import { Attendance } from '../models/attendance.model';


// 🟦 الحصص
export const sessionsList_MOCK: Session[] = [
  {
    id: 'f5093d47-fcda-4ea7-9fc2-821d19f946a0',
    subject: 'لغة الإشارة',
    day: 'الأحد',
    from: '8:00',
    to: '9:00'
  }
];

// 🟩 الطلاب
export const student_MOCK: Student[] = [
  { id: 'b7a2cfa0-657b-46b0-9ceb-a73dbf27ea5b', full_name: 'أحمد علي' },
  { id: 'd6802048-e873-4628-8314-2dad52a44325', full_name: 'سارة محمد' },
  { id: '37f9f328-1236-4756-aad3-d4a0ba3a2dd6', full_name: 'خالد حسين' }
];

// 🟧 حالات الحضور
export const attendance_MOCK: Attendance[] = [
  { key: 'present', label: 'حاضر' },
  { key: 'absent', label: 'غائب' },
  { key: 'late', label: 'متأخر' }
];
