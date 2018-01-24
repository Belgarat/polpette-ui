import { NgModule } from '@angular/core';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  imports: [MatInputModule, MatButtonModule, MatCheckboxModule],
  exports: [MatInputModule, MatButtonModule, MatCheckboxModule],
})
export class CustomMaterialModule { }
