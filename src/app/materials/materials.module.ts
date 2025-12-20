import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './materials.routing';
import { MaterialModule } from '../../shared/material.module';

import { ConfirmationComponent } from './confirmation/confirmation.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { CategoryComponent } from './dialog/category/category.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ProductComponent } from './dialog/product/product.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { VeiwBillProdictsComponent } from './dialog/veiw-bill-prodicts/veiw-bill-prodicts.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { VeiwBillComponent } from './veiw-bill/veiw-bill.component';


@NgModule({
  imports: [
    MatIcon,
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],
  providers: [],
  declarations: [
    VeiwBillProdictsComponent,
    ConfirmationComponent,
    ManageCategoryComponent,
    CategoryComponent,
    ManageProductComponent,
    ProductComponent,
    ManageOrderComponent,
    ManageUserComponent,
    VeiwBillComponent,
        
  ]
})
export class MaterialComponentsModule {}

