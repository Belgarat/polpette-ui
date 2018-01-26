import { NgModule } from '@angular/core';
import {MatListModule, MatButtonModule, MatCheckboxModule, MatIconModule, MatMenuModule, MatSelectModule, MatPanelModule, MatExpansionModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  imports: [MatInputModule, MatButtonModule, MatCheckboxModule, MatListModule, MatIconModule, MatMenuModule, MatSelectModule, MatExpansionModule],
  exports: [MatInputModule, MatButtonModule, MatCheckboxModule, MatListModule, MatIconModule, MatMenuModule, MatSelectModule, MatExpansionModule],
})
export class CustomMaterialModule { }
