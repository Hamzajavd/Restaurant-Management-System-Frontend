import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionDirective } from './accordions/accordion.directive';
import { AccordionanchorDirective } from './accordions/accordionanchor.directive';
import { AccordionlinkDirective } from './accordions/accordionlink.directive';
import { MenuItems } from './menu-items';



@NgModule({
  declarations: [
    AccordionDirective,
    AccordionanchorDirective,
    AccordionlinkDirective
  ],
  imports: [
    CommonModule
  ],
  providers: [MenuItems]
})
export class SharedModule { }
