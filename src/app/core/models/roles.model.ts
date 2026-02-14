export type GradeValue =
  | '' | 'kindergarten'
  | 'grade1' | 'grade2' | 'grade3'
  | 'grade4' | 'grade5' | 'grade6';

export type RolePermission =
  | 'admin'
  | 'teacher'
  | 'student1'
  | 'student2'
  | 'student3'
  | 'student4'
  | 'student5'
  | 'student6';

export interface RolesFormModel {
  username: string;
  email: string;
  whatsapp: string;
  group: string;
  password: string;
  confirmPassword: string;
  loginCoordinates: string;
  address: string;
  grade: GradeValue;
  permission: RolePermission[];
  editAllPermissions: boolean;
}

