import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './full-name.pipe';

import { HighlightedDirective } from './highlighted.directive';



@NgModule({
  declarations: [
    FullNamePipe,

    HighlightedDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[FullNamePipe,HighlightedDirective],
})
export class SharedModule { }
