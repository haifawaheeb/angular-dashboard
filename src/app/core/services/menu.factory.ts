import { Injectable } from '@angular/core';
import { MenuGroup, MenuItem, MenuNode } from '../models/menu.models';
import { NodeType, Role } from '../models/Adminenums';


@Injectable({ providedIn: 'root' })
export class MenuFactory {
fromJson(json: any): MenuNode {
const base = {
id: json.id,
label: json.label,
icon: json.icon,
order: json.order ?? 0,
badge: json.badge,
rolesAllowed: json.rolesAllowed as Role[] | undefined,
expanded: !!json.expanded,
} as any;


if (json.type === NodeType.Item) {
return new MenuItem(base.id, base.label, json.route, base.icon, base.order, base.badge, base.rolesAllowed);
}


const children = Array.isArray(json.children) ? json.children.map((c: any) => this.fromJson(c)) : [];
const grp = new MenuGroup(base.id, base.label, children, base.icon, base.order, base.badge, base.rolesAllowed);
grp.expanded = base.expanded;
return grp;
}


fromList(list: any[]): MenuNode[] { return list.map(j => this.fromJson(j)); }
}

