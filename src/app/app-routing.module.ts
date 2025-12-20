import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FullComponent } from './layouts/full/full.component';
import { RouteGuardService } from './services/route-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MaterialRoutes } from './materials/materials.routing';
import { CategoryComponent } from './materials/dialog/category/category.component';

const routes: Routes = [
  { path: '', component: HomeComponent },

  // {
  //   path: 'cafe',
  //   component: FullComponent,
  //   children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},

      { path: 'dashboard',
        component:FullComponent,
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(m => m.DashboardModule), 
        canActivate: [RouteGuardService],
        data: { expectedRole: ['admin', 'user'] },
      },
        
      
      
      {
        path: '',
        component: FullComponent,
        loadChildren: () =>
          import('./materials/materials.module').then(m => m.MaterialComponentsModule),
        canActivate: [RouteGuardService],
        data: { expectedRole: ['admin', 'user'] },
      },

       { path: '**', component: HomeComponent },
    ]
  

 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

