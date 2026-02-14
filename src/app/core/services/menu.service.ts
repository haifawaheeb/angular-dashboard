import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuFactory } from './menu.factory';
import { MenuGroup, MenuItem, MenuNode } from '../models/menu.models';
import { Role } from '../models/Adminenums';
import { AuthService } from '../auth/auth.service';
import { MenuIdEnum, MenuLabelEnum, MenuTypeEnum,MenuRouteEnum } from '../enums/menu.enums';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private _nodes$ = new BehaviorSubject<MenuNode[]>([]);
  nodes$ = this._nodes$.asObservable();

  constructor(private factory: MenuFactory, private auth: AuthService) {
 const seed = [
  {
    id: MenuIdEnum.School_Administration,
    label: MenuLabelEnum.School_Administration,
    type: MenuTypeEnum.GROUP,
    icon: 'settings',
    children: [
      {
        id: MenuIdEnum.CLASSROOMS,
        label: MenuLabelEnum.CLASSROOMS,
        type: MenuTypeEnum.ITEM,
        route: MenuRouteEnum.CLASSROOMS,
        icon: 'group'
      },
      {
        id: MenuIdEnum.SUBJECTS,
        label: MenuLabelEnum.SUBJECTS,
        type: MenuTypeEnum.ITEM,
        route: MenuRouteEnum.SUBJECTS,
        icon: 'SUBJECTS'
      },
      {
        id: MenuIdEnum.SignMedia,
        label: MenuLabelEnum.SignMedia,
        type: MenuTypeEnum.ITEM,
        route: MenuRouteEnum.SignMedia,
        icon: 'SignMedia'
      },
      {
        id: MenuIdEnum.Teacher,
        label: MenuLabelEnum.Teacher,
        type: MenuTypeEnum.ITEM,
        route: MenuRouteEnum.Teachers,
        icon: 'Teachers'
      },
      {
        id: MenuIdEnum.TeacherAssignments,
        label: MenuLabelEnum.TeacherAssignments,
        type: MenuTypeEnum.ITEM,
        route: MenuRouteEnum.TeacherAssignments,
        icon: 'Teachers'
      },
      {
        id: MenuIdEnum.timetable_slots,
        label: MenuLabelEnum.timetable_slots,
        type: MenuTypeEnum.ITEM,
        route: MenuRouteEnum.timetable_slots,
        icon: 'timetable_slots'
      },
      {
        id: MenuIdEnum.attendance_records,
        label: MenuLabelEnum.attendance_records,
        type: MenuTypeEnum.ITEM,
        route: MenuRouteEnum.attendance_records,
        icon: 'attendance_records'
      },
      {
        id: MenuIdEnum.GARADES,
        label: MenuLabelEnum.GARADES,
        type: MenuTypeEnum.ITEM,
        route: MenuRouteEnum.GARADES,
        icon: 'GARADES'
      },
      {
        id: MenuIdEnum.ACADEMIC_STAGES,
        label: MenuLabelEnum.ACADEMIC_STAGES,
        type: MenuTypeEnum.ITEM,
        route: MenuRouteEnum.ACADEMIC_STAGES,
        icon: 'ACADEMIC_STAGES'
      },
      {
        id: MenuIdEnum.STUDENT,
        label: MenuLabelEnum.STUDENT,
        type: MenuTypeEnum.ITEM,
        route: MenuRouteEnum.STUDENT,
        icon: 'STUDENT'
      },
      {
        id: MenuIdEnum.LESSONS,
        label: MenuLabelEnum.LESSONS,
        type: MenuTypeEnum.ITEM,
        route: MenuRouteEnum.LESSONS,
        icon: 'LESSONS'
      },
      {
        id: MenuIdEnum.COURSES,
        label: MenuLabelEnum.COURSES,
        type: MenuTypeEnum.ITEM,
        route: MenuRouteEnum.COURSES,
        icon: 'COURSES'
      },
      {
        id: MenuIdEnum.CLASS_ROOM,
        label: MenuLabelEnum.CLASS_ROOM,
        type: MenuTypeEnum.ITEM,
        route: MenuRouteEnum.CLASS_ROOM,
        icon: 'CLASS_ROOM'
      },
      {
        id: MenuIdEnum.VIDEOS,
        label: MenuLabelEnum.VIDEOS,
        type: MenuTypeEnum.ITEM,
        route: MenuRouteEnum.VIDEOS,
        icon: 'VIDEOS'
      },
      { id: MenuIdEnum.HOME,
        label: MenuLabelEnum.HOME,
        type: MenuTypeEnum.ITEM,
        route: MenuRouteEnum.HOME,
        icon: 'HOME'
  },
      { id: MenuIdEnum.lessons_session,
        label: MenuLabelEnum.lessons_session,
        type: MenuTypeEnum.ITEM,
        route: MenuRouteEnum.lessons_session,
        icon: 'HOME'
  }

    ]
  },
  {
    id: MenuIdEnum.Management_System,
    label: MenuLabelEnum.Management_System,
    type: MenuTypeEnum.GROUP,
    icon: 'Management_System',
    children: [
      {
        id: MenuIdEnum.USERS,
        label: MenuLabelEnum.USERS,
        type: MenuTypeEnum.ITEM,
        route: MenuRouteEnum.USERS,
        icon: 'USERS'
      },
      {
        id: MenuIdEnum.ROLES,
        label: MenuLabelEnum.ROLES,
        type: MenuTypeEnum.ITEM,
        route: MenuRouteEnum.ROLES,
        icon: 'USERS_PERMISSIONS'
      },
      {
        id: MenuIdEnum.PROFILES,
        label: MenuLabelEnum.PROFILES,
        type: MenuTypeEnum.ITEM,
        route: MenuRouteEnum.PROFILES,
        icon: 'PROFILES'
      },
      {
        id: MenuIdEnum.PYMENTS,
        label: MenuLabelEnum.PYMENTS,
        type: MenuTypeEnum.ITEM,
        route: MenuRouteEnum.PYMENTS,
        icon: 'PYMENTS'
      },
      {
        id: MenuIdEnum.ADMIN_ROLE,
        label: MenuLabelEnum.ADMIN_ROLE,
        type: MenuTypeEnum.ITEM,
        route: MenuRouteEnum.ADMIN_ROLE,
        icon: 'ADMIN_ROLE'
      },
      {
        id: MenuIdEnum.RECORDS_PROCEDURES,
        label: MenuLabelEnum.RECORDS_PROCEDURES,
        type: MenuTypeEnum.ITEM,
        route: MenuRouteEnum.RECORDS_PROCEDURES,
        icon: 'RECORDS_PROCEDURES'
      },
      {
        id: MenuIdEnum.ASSESSMENT_POINTS_GRADES,
        label: MenuLabelEnum.ASSESSMENT_POINTS_GRADES,
        type: MenuTypeEnum.ITEM,
        route: MenuRouteEnum.ASSESSMENT_POINTS_GRADES,
        icon: 'ASSESSMENT_POINTS_GRADES'
      },
      {
        id: MenuIdEnum.RECORDS,
        label: MenuLabelEnum.RECORDS,
        type: MenuTypeEnum.ITEM,
        route: MenuRouteEnum.RECORDS,
        icon: 'RECORDS'
      },
      {
        id: MenuIdEnum.DASHBORD,
        label: MenuLabelEnum.DASHBORD,
        type: MenuTypeEnum.ITEM,
        route: MenuRouteEnum.DASHBORD,
        icon: 'DASHBORD'
      },
      {
        id: MenuIdEnum.ADMIN_DASHBORD,
        label: MenuLabelEnum.ADMIN_DASHBORD,
        type: MenuTypeEnum.ITEM,
        route: MenuRouteEnum.ADMIN_DASHBORD,
        icon: 'ADMIN_DASHBORD'
      },{
        id: MenuIdEnum.AuthCredentials,
        label: MenuLabelEnum.AuthCredentials,
        type: MenuTypeEnum.ITEM,
        route: MenuRouteEnum.AuthCredentials,
        icon: 'AuthCredentials'
      }
    ]
  },
  {
    id: MenuIdEnum.Settings,
    label: MenuLabelEnum.Settings,
    type: MenuTypeEnum.GROUP,
    icon: 'Settings',
    children: [
      {
        id: MenuIdEnum.TOOLS_BACKUP,
        label: MenuLabelEnum.TOOLS_BACKUP,
        type: MenuTypeEnum.ITEM,
        route: MenuRouteEnum.TOOLS_BACKUP,
        icon: 'TOOLS_BACKUP'
      },
      {
        id: MenuIdEnum.BACKUP,
        label: MenuLabelEnum.BACKUP,
        type: MenuTypeEnum.ITEM,
        route: MenuRouteEnum.BACKUP,
        icon: 'BACKUP'
      },
      {
        id: MenuIdEnum.certificate,
        label: MenuLabelEnum.certificate,
        type: MenuTypeEnum.ITEM,
        route: MenuRouteEnum.certificate,
        icon: 'certificate'
      }
    ]
  },
   {
    id: MenuIdEnum.Reports,
    label: MenuLabelEnum.Reports,
    type: MenuTypeEnum.GROUP,
    icon: 'Reports',
    children: [
      {
        id: MenuIdEnum.CLASS_ROOM,
        label: MenuLabelEnum.CLASS_ROOM,
        type: MenuTypeEnum.ITEM,
        route: MenuRouteEnum.CLASS_ROOM,
        icon: 'class'
      },
      {
        id: MenuIdEnum.COURSES,
        label: MenuLabelEnum.COURSES,
        type: MenuTypeEnum.ITEM,
        route: MenuRouteEnum.COURSES,
        icon: 'person'
      },

    ]
  }
];

    const nodes = this.factory.fromList(seed as any[]);
    this._nodes$.next(nodes.sort((a, b) => (a.order ?? 0) - (b.order ?? 0)));
  }

  get current(): MenuNode[] {
    return this._nodes$.value;
  }

  set(nodes: MenuNode[]) {
    this._nodes$.next(nodes);
  }

  // ✅ فتح عنصر وإغلاق الباقي ضمن نفس المستوى (سلوك أكورديون)
  toggleExclusive(targetId: string) {
    const walk = (nodes: MenuNode[]): MenuNode[] => nodes.map(n => {
      if ((n as MenuGroup).children) {
        const grp = n as MenuGroup;
        if (grp.id === targetId) grp.expanded = !grp.expanded; // قلب الهدف
        // أغلق بقية الإخوة على نفس المستوى
        if (grp.id === targetId) {
          nodes
            .filter(x => x !== grp && (x as any).children)
            .forEach(x => (x as MenuGroup).expanded = false);
        }
        grp.children = walk(grp.children);
        return grp;
      }
      return n;
    });
    this.set(walk(this.current.slice()));
  }

  // ✅ إغلاق جميع القوائم المفتوحة
  collapseAll() {
    const dfs = (nodes: MenuNode[]) => nodes.forEach(n => {
      if ((n as any).children) {
        (n as MenuGroup).expanded = false;
        dfs((n as MenuGroup).children);
      }
    });
    dfs(this.current);
    this.set(this.current.slice());
  }

}
