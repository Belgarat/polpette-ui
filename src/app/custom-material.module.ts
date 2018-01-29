import { NgModule } from '@angular/core';
import { MatListModule, MatButtonModule, MatCheckboxModule, MatIconModule, MatMenuModule, MatSelectModule, MatExpansionModule,
        MatTabsModule, MatTableModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [MatInputModule, MatButtonModule, MatCheckboxModule, MatListModule, 
    MatIconModule, MatMenuModule, MatSelectModule, MatExpansionModule, MatTabsModule, MatTableModule],
  exports: [MatInputModule, MatButtonModule, MatCheckboxModule, MatListModule, 
    MatIconModule, MatMenuModule, MatSelectModule, MatExpansionModule, MatTabsModule, MatTableModule], 
})
export class CustomMaterialModule { }
