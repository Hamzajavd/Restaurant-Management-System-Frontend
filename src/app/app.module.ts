import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../shared/material.module';
import { MaterialComponentsModule } from './materials/materials.module';
import { HomeComponent } from './home/home.component';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { SharedModule } from '../shared/shared.module';
import { FullComponent } from './layouts/full/full.component';
import { AppSidebarComponent } from './layouts/sidebar/sidebar.component';
import { AppHeaderComponent } from './layouts/header/header.component';
import { MatIconModule } from '@angular/material/icon';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http'; 
import {NgxUiLoaderModule, NgxUiLoaderConfig,SPINNER,PB_DIRECTION} from 'ngx-ui-loader';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { TokenInterceptorInterceptor } from './services/token-interceptor.interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './materials/change-password/change-password.component';







const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  text: "loading...",
  textColor: "#FFFFFF",
  textPosition: "center-center",
  pbColor: "red",
  bgsColor: "red",
  fgsColor: 'red',
  fgsType: SPINNER.threeStrings,
  fgsSize: 100,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 5,
}

@NgModule({
  declarations: [
    
    AppHeaderComponent,
    AppSidebarComponent,
    HomeComponent,
    AppComponent,
    SignupComponent,
    BestSellerComponent,
    FullComponent,
    ForgotPasswordComponent,
    LoginComponent,
    ChangePasswordComponent,

   

  ],
  imports: [
    MatSlideToggleModule,
    CommonModule,
     MatDialogModule,
    MatButtonModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    FlexModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MaterialComponentsModule,
],
  providers: [
     provideHttpClient(), 
      { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorInterceptor, multi:true }],
  bootstrap: [AppComponent,
    
  ]
})
export class AppModule { }
