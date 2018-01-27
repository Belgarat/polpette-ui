import { NgModule } from '@angular/core';
import { MatListModule, MatButtonModule, MatCheckboxModule, MatIconModule, MatMenuModule, MatSelectModule, MatExpansionModule,
        MatTabsModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  imports: [MatInputModule, MatButtonModule, MatCheckboxModule, MatListModule, 
    MatIconModule, MatMenuModule, MatSelectModule, MatExpansionModule, MatTabsModule],
  exports: [MatInputModule, MatButtonModule, MatCheckboxModule, MatListModule, 
    MatIconModule, MatMenuModule, MatSelectModule, MatExpansionModule, MatTabsModule],
})
export class CustomMaterialModule { }
