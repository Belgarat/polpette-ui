import { NgModule } from '@angular/core';
import {MatListModule, MatButtonModule, MatCheckboxModule, MatIconModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  imports: [MatInputModule, MatButtonModule, MatCheckboxModule, MatListModule, MatIconModule],
  exports: [MatInputModule, MatButtonModule, MatCheckboxModule, MatListModule, MatIconModule],
})
export class CustomMaterialModule { }
