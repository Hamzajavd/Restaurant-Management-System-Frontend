
import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignupComponent } from '../signup/signup.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {


constructor(private dialog:MatDialog,
  private router:Router,
  private userService:UserService
){}

     ngOnInit(): void{
      if(localStorage.getItem('token') != null){
      this.userService.checkToken().subscribe({
      next: (response:any) =>{
        this.router.navigate(['/dashboard']);
      },
    error: (error:any)=>{
      console.log(error);
      },
complete: () => {}

})
  }
}
       
     signupAction(){
     const dialogConfig = new MatDialogConfig();
     dialogConfig.width = '550px';
     this.dialog.open(SignupComponent, dialogConfig);
     }

     forgotPasswordAction(){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = "550px";
      this.dialog.open(ForgotPasswordComponent,dialogConfig);
     }

     loginAction(){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '550px';
      this.dialog.open(LoginComponent, dialogConfig)
     }
}
