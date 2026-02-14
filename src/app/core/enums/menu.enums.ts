
export enum MenuTypeEnum {
  GROUP = 'GROUP',
  ITEM = 'ITEM'
}

export enum MenuIdEnum {

  // ROOT GROUPS
  School_Administration = 'School_Administration',
  Reports = 'Reports',
  Management_System = 'Management_System',
  Settings = 'Settings',
  // OtherPages = 'OtherPages',

  // School Administration children
  CLASSROOMS = 'CLASSROOMS',
  SUBJECTS = 'SUBJECTS',
  SignMedia = 'SignMedia',
  timetable_slots = 'timetable_slots',
  attendance_records = 'attendance_records',
  GARADES = 'GARADES',
  ACADEMIC_STAGES = 'ACADEMIC_STAGES',
  STUDENT = 'STUDENT',
  LESSONS = 'LESSONS',
  COURSES = 'COURSES',
  CLASS_ROOM = 'CLASS_ROOM',
  VIDEOS = 'VIDEOS',
  HOME = 'HOME',
  AuthCredentials = 'AuthCredentials',
  Teacher = 'Teacher',
  TeacherAssignments='TeacherAssignments',
  lessons_session='lessons_session',


  // Management system children
  USERS = 'USERS',
  ROLES = 'ROLES',
  PROFILES = 'PROFILES',
  PYMENTS = 'PYMENTS',
  ADMIN_ROLE = 'ADMIN_ROLE',
  RECORDS_PROCEDURES = 'RECORDS_PROCEDURES',
  ASSESSMENT_POINTS_GRADES = 'ASSESSMENT_POINTS_GRADES',
  RECORDS = 'RECORDS',
  DASHBORD = 'DASHBORD',
  ADMIN_DASHBORD = 'ADMIN_DASHBORD',
  certificate = 'certificate',

  // Settings
  TOOLS_BACKUP = 'TOOLS_BACKUP',
  BACKUP = 'BACKUP'

}
export enum MenuLabelEnum {

  // ROOT GROUPS
  School_Administration = 'بيانات المدرسة',
  Reports = 'التقارير والمتابعة',
  Management_System = 'الإدارة',
  Settings = 'الإعدادات',

  // School Administration
  CLASSROOMS = 'الشعب الدراسية',
  SUBJECTS = 'المواد',
  SignMedia = 'فيديو الإشارة',
  timetable_slots = 'الجدول الزمني',
  attendance_records = 'سجل الحضور',
  GARADES = 'الدرجات',
  ACADEMIC_STAGES = 'المراحل الدراسية',
  STUDENT = 'الطلاب',
  LESSONS = 'الدروس',
  COURSES = 'الدورات',
  CLASS_ROOM = 'الفصول',
  VIDEOS = 'الفيديوهات',
  HOME = 'الصفحة الرئيسية',
  AuthCredentials = 'بيانات المصادقة',
  Teacher = 'المعلمين',
  TeacherAssignments='ارتباطات المعلمين',
  lessons_session='جلسات الدروس',
  // Management
  USERS = 'المستخدمون',
  ROLES = 'المستخدمون والصلاحيات',
  PROFILES = 'الملفات الشخصية',
  PYMENTS = 'المدفوعات',
  ADMIN_ROLE = 'صلاحيات الإدارة',
  RECORDS_PROCEDURES = 'السجلات والإجراءات',
  ASSESSMENT_POINTS_GRADES = 'نقاط التقييم والدرجات',
  RECORDS = 'السجلات',
  DASHBORD = 'لوحة التحكم',
  ADMIN_DASHBORD = 'لوحة الإدارة',
  certificate = 'الشهادات',

  // Settings
  TOOLS_BACKUP = 'النسخ الاحتياطي والاستعادة',
  BACKUP = 'النسخ الاحتياطي',
  // Other Pages

}
export enum MenuIconEnum {

  // ROOT GROUPS
  School_Administration = '🏫',
  Reports = '📑',
  Management_System = '🛠️',
  Settings = '⚙️',

  // School Administration
  CLASSROOMS = '🏫',
  SUBJECTS = '📚',
  SignMedia = '✋🎥',
  timetable_slots = '🕒',
  attendance_records = '📅',
  GARADES = '🎓',
  ACADEMIC_STAGES = '🧭',
  STUDENT = '👨‍🎓',
  LESSONS = '🎬',
  COURSES = '📝',
  CLASS_ROOM = '🏠',
  VIDEOS = '🎞️',
  HOME = '🏠',
  Teacher = '👥',
  TeacherAssignments='🧑‍🏫',

  // Management
  USERS = '👥',
  ROLES = '🛂',
  PROFILES = '🧑‍💼',
  PYMENTS = '💳',
  ADMIN_ROLE = '🔐',
  RECORDS_PROCEDURES = '📁',
  ASSESSMENT_POINTS_GRADES = '📘',
  RECORDS = '📂',
  DASHBORD = '📊',
  ADMIN_DASHBORD = '🧭',
  certificate = '📜',

  // Settings
  TOOLS_BACKUP = '💾',
  BACKUP = '🔄',
  // Other Pages


}

export enum MenuRouteEnum {

  // SYSTEM
  ROLES = '/roles',
  MESSAGES_ALERTS_SETTINGS = '/settings',
  TOOLS_BACKUP = '/backup',

  // REPORTS
  RECORDS_PROCEDURES = '/records',
  ASSESSMENT_POINTS_GRADES = '/garades',

  // SCHOOL DATA
  ACADEMIC_STAGES = '/academic-stages',
  USERS = '/users',

  // ADMIN CHILDREN
  STUDENT = '/student',
  LESSONS = '/lessons',
  COURSES = '/courses',
  CLASS_ROOM = '/class-room',
  HOME = '/home',
  DASHBORD = '/dashboard',
  ADMIN_DASHBORD = '/admin-dashbord',
  ADMIN_ROLE = '/admin-role',
  Teachers = '/teacher',
  TeacherAssignments='/teacher-assignments',
  lessons_session='/lesson-sessions',
  PROFILES = '/profiles',
  PYMENTS = '/pyments',
  VIDEOS = '/videos',
  HEADER = '/header',
  // TOP_MENU = '/top-menu',
  GARADES = '/garades',
  RECORDS = '/records',
  SETTINGS = '/settings',
  BACKUP = '/backup',
  CLASSROOMS = '/classrooms',
  SUBJECTS = '/subjects',
  SignMedia = '/sign-media',
  timetable_slots = '/timetable_slots ',
  attendance_records = '/attendance_records',
  AuthCredentials = '/auth-credentials',
  certificate = '/certificate',

}



export enum MenuHierarchyEnum {

  School_Administration_Children =
  'CLASSROOMS|GARADES|ACADEMIC_STAGES|SUBJECTS|COURSES|LESSONS|SignMedia|timetable_slots|attendance_records|STUDENT|VIDEOS|HOME|Teacher|AuthCredentials|TeacherAssignments|lessons_session',

  Management_System_Children =
  'USERS|ROLES|PROFILES|PYMENTS|ADMIN_ROLE|RECORDS_PROCEDURES|ASSESSMENT_POINTS_GRADES|RECORDS|DASHBORD|ADMIN_DASHBORD|auth-credentials',

  Settings_Children =
  'TOOLS_BACKUP|BACKUP|certificate',


}

