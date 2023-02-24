import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { Pencil, ThreeDotsVertical, Trash, CheckLg, XLg, Plus } from 'ng-bootstrap-icons/icons';

const icons = {
  Pencil,
  ThreeDotsVertical,
  Trash,
  CheckLg,
  XLg,
  Plus
}

@NgModule({
  declarations: [],
  imports: [
    BootstrapIconsModule.pick(icons),
  ],
  exports: [
    BootstrapIconsModule
  ]
})
export class IconsModule { }
