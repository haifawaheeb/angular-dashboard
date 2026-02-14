import { Component } from '@angular/core';
import {ArrayDataSource} from '@angular/cdk/collections';
import {FlatTreeControl} from '@angular/cdk/tree';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatIconModule } from '@angular/material/icon';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  isExpanded?: boolean;
}

const TREE_DATA: ExampleFlatNode[] = [
  {name: 'الروضة', expandable: true, level: 0},
  {name: 'قران كريم', expandable: false, level: 1},
  {name: 'لغة عربية', expandable: false, level: 1},
  {name: 'رياضيات', expandable: false, level: 1},
  {name: 'علوم', expandable: false, level: 1},
  {name: 'الصف الاول', expandable: true, level: 0},
  {name: 'قران كريم', expandable: false, level: 1},
  {name: 'لغة عربية', expandable: false, level: 1},
  {name: 'رياضيات', expandable: false, level: 1},
  {name: 'علوم', expandable: false, level: 1},
  {name: 'الصف الثالث', expandable: true, level: 0},
  {name: 'قران كريم', expandable: false, level: 1},
  {name: 'لغة عربية', expandable: false, level: 1},
  {name: 'رياضيات', expandable: false, level: 1},
  {name: 'علوم', expandable: false, level: 1},
  {name: 'اجتماعيات', expandable: false, level: 1},
  {name: 'لغة انجليزية', expandable: false, level: 1},
  {name: 'الصف الرابع', expandable: true, level: 0},
  {name: 'قران كريم', expandable: false, level: 1},
  {name: 'لغة عربية', expandable: false, level: 1},
  {name: 'رياضيات', expandable: false, level: 1},
  {name: 'علوم', expandable: false, level: 1},
  {name: 'اجتماعيات', expandable: false, level: 1},
  {name: 'لغة انجليزية', expandable: false, level: 1},
  {name: 'الصف الخامس', expandable: true, level: 0},
  {name: 'قران كريم', expandable: false, level: 1},
  {name: 'لغة عربية', expandable: false, level: 1},
  {name: 'رياضيات', expandable: false, level: 1},
  {name: 'علوم', expandable: false, level: 1},
  {name: 'اجتماعيات', expandable: false, level: 1},
  {name: 'لغة انجليزية', expandable: false, level: 1},
  {name: 'الصف السادس', expandable: true, level: 0},
  {name: 'قران كريم', expandable: false, level: 1},
  {name: 'لغة عربية', expandable: false, level: 1},
  {name: 'رياضيات', expandable: false, level: 1},
  {name: 'علوم', expandable: false, level: 1},
  {name: 'اجتماعيات', expandable: false, level: 1},
  {name: 'لغة انجليزية', expandable: false, level: 1},
];
@Component({
  selector: 'app-class-room',
  standalone: true,
  imports: [CdkTreeModule,MatIconModule,TextFieldModule,MatInputModule,MatFormFieldModule],
  templateUrl: './class-room.component.html',
  styleUrl: './class-room.component.scss'
})
export class ClassRoomComponent {
treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level,
    node => node.expandable,
  );
  dataSource = new ArrayDataSource(TREE_DATA);

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  getParentNode(node: ExampleFlatNode) {
    const nodeIndex = TREE_DATA.indexOf(node);
    for (let i = nodeIndex - 1; i >= 0; i--) {
      if (TREE_DATA[i].level === node.level - 1) {
        return TREE_DATA[i];
      }
    }
    return null;
  }

  shouldRender(node: ExampleFlatNode) {
    let parent = this.getParentNode(node);
    while (parent) {
      if (!parent.isExpanded) {
        return false;
      }
      parent = this.getParentNode(parent);
    }
    return true;
  }

onVideoSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length) {
    const videoFile = input.files[0];
    console.log('Video selected:', videoFile);
  }
}}

