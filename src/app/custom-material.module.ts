import { NgModule } from '@angular/core';
import {MatListModule, MatButtonModule, MatCheckboxModule, MatIconModule, MatMenuModule, MatSelectModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  imports: [MatInputModule, MatButtonModule, MatCheckboxModule, MatListModule, MatIconModule, MatMenuModule, MatSelectModule],
  exports: [MatInputModule, MatButtonModule, MatCheckboxModule, MatListModule, MatIconModule, MatMenuModule, MatSelectModule],
})
export class CustomMaterialModule { }
