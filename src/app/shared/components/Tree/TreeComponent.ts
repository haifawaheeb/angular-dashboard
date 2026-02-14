import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
  MatTreeModule
} from '@angular/material/tree';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export interface DataNode {
  item: string;
  Id?: number;
  selected?: boolean;
  disabled?: boolean;
  children?: DataNode[];
}

export class DataFlatNode {
  item ! : string;
  Id?: number;
  level !: number;
  expandable !: boolean;
  selected: boolean = false;
  disabled?: boolean;
}

@Component({
  selector: 'tree',
  standalone: true,
  templateUrl: './treecomponent.html',
  styleUrls: ['./treecomponent.css'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTreeModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
  ]
})
export class AmanTreeComponent implements OnInit, OnDestroy {

  @Input() TREE_DATA: DataNode[] = [];

  dataChange = new BehaviorSubject<DataNode[]>([]);
  checklistSelection = new SelectionModel<DataFlatNode>(true);

  treeControl: FlatTreeControl<DataFlatNode>;
  treeFlattener: MatTreeFlattener<DataNode, DataFlatNode>;
  dataSource: MatTreeFlatDataSource<DataNode, DataFlatNode>;

  flatNodeMap = new Map<DataFlatNode, DataNode>();
  nestedNodeMap = new Map<DataNode, DataFlatNode>();

  constructor() {

    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren
    );

    this.treeControl = new FlatTreeControl<DataFlatNode>(
      this.getLevel,
      this.isExpandable
    );

    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );
  }

  ngOnInit(): void {
    this.dataSource.data = this.TREE_DATA;
    this.dataChange.next(this.TREE_DATA);
  }

  ngOnDestroy(): void {}

  /* TREE METHODS */

  getLevel = (node: DataFlatNode) => node.level;

  isExpandable = (node: DataFlatNode) => node.expandable;

  getChildren = (node: DataNode): DataNode[] => node.children || [];

  hasChild = (_: number, node: DataFlatNode) => node.expandable;

  transformer = (node: DataNode, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode =
      existingNode && existingNode.Id === node.Id
        ? existingNode
        : new DataFlatNode();

    flatNode.item = node.item;
    flatNode.Id = node.Id;
    flatNode.level = level;
    flatNode.selected = node.selected || false;
    flatNode.disabled = node.disabled;
    flatNode.expandable = !!node.children?.length;

    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);

    if (flatNode.selected) {
      this.checklistSelection.select(flatNode);
    }

    return flatNode;
  };

  descendantsAllSelected(node: DataFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    return descendants.every(child => this.checklistSelection.isSelected(child));
  }

  descendantsPartiallySelected(node: DataFlatNode): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child =>
      this.checklistSelection.isSelected(child)
    );
    return result && !this.descendantsAllSelected(node);
  }

  todoItemSelectionToggle(node: DataFlatNode): void {
    this.checklistSelection.toggle(node);

    const descendants = this.treeControl.getDescendants(node);
    if (this.checklistSelection.isSelected(node)) {
      this.checklistSelection.select(...descendants);
    } else {
      this.checklistSelection.deselect(...descendants);
    }

    this.updateParentSelection(node);
  }

  todoLeafItemSelectionToggle(node: DataFlatNode): void {
    this.checklistSelection.toggle(node);
    this.updateParentSelection(node);
  }

  updateParentSelection(node: DataFlatNode): void {
    let parent = this.getParentNode(node);
    while (parent) {
      this.checkRootNodeSelection(parent);
      parent = this.getParentNode(parent);
    }
  }

  checkRootNodeSelection(node: DataFlatNode): void {
    const descendants = this.treeControl.getDescendants(node);
    const allSelected = descendants.every(child =>
      this.checklistSelection.isSelected(child)
    );
    if (allSelected) {
      this.checklistSelection.select(node);
    } else {
      this.checklistSelection.deselect(node);
    }
  }

  getParentNode(node: DataFlatNode): DataFlatNode | null {
    const nodeIndex = this.treeControl.dataNodes.indexOf(node);
    for (let i = nodeIndex - 1; i >= 0; i--) {
      if (this.treeControl.dataNodes[i].level < node.level) {
        return this.treeControl.dataNodes[i];
      }
    }
    return null;
  }
}
