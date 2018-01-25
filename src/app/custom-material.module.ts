import { NgModule } from '@angular/core';
import {MatListModule, MatButtonModule, MatCheckboxModule, MatIconModule, MatMenuModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  imports: [MatInputModule, MatButtonModule, MatCheckboxModule, MatListModule, MatIconModule, MatMenuModule],
  exports: [MatInputModule, MatButtonModule, MatCheckboxModule, MatListModule, MatIconModule, MatMenuModule],
})
export class CustomMaterialModule { }
