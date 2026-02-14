import { NodeType, Role } from './Adminenums';

export interface IMenuNodeBase {
  id: string;
  label: string;
  icon?: string;
  order?: number;
  badge?: string | number;
  rolesAllowed?: Role[];
}

export abstract class MenuNode implements IMenuNodeBase {
  type: NodeType = NodeType.Group;
  expanded?: boolean; // حالة الفتح UI

  constructor(
    public id: string,
    public label: string,
    public icon?: string,
    public order: number = 0,
    public badge?: string | number,
    public rolesAllowed: Role[] = []
  ) {}

  isAllowed(userRoles: Role[] | undefined): boolean {
    if (!this.rolesAllowed || this.rolesAllowed.length === 0) return true;
    if (!userRoles || userRoles.length === 0) return false;
    return this.rolesAllowed.some(r => userRoles.includes(r));
  }
}

export class MenuItem extends MenuNode {
  override type: NodeType = NodeType.Item;
  constructor(
    id: string,
    label: string,
    public route: string,
    icon?: string,
    order: number = 0,
    badge?: string | number,
    rolesAllowed: Role[] = []
  ) {
    super(id, label, icon, order, badge, rolesAllowed);
  }
}

export class MenuGroup extends MenuNode {
  override type: NodeType = NodeType.Group;
  public children: MenuNode[] = [];

  constructor(
    id: string,
    label: string,
    children: MenuNode[] = [],
    icon?: string,
    order: number = 0,
    badge?: string | number,
    rolesAllowed: Role[] = []
  ) {
    super(id, label, icon, order, badge, rolesAllowed);
    this.children = children;
  }
}

// ✅ دالة تساعد على التحقق إن كان العنصر مجموعة
export function isGroup(node: MenuNode): node is MenuGroup {
  return node.type === NodeType.Group;
}
