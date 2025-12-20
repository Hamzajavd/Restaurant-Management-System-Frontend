import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../../services/snackbar.service';
import { UserService } from '../../services/user.service';
import { globalConstraint } from '../../../shared/globalConstrain';
import { response } from 'express';

@Component({
  selector: 'app-change-password',
  standalone: false,
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  
  changePasswordForm!: FormGroup;
  responseMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService,
    public dialogRef: MatDialogRef<ChangePasswordComponent>
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: [null, Validators.required],
      newPassword: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    });
  }

  validateSubmit(){
    if(this.changePasswordForm.controls['newPassword'].value != this.changePasswordForm.controls['confirmPassword'].value){
      return true;
      }
      
  else{
   return false;
  }
}
  

  handleChangePasswordSubmit(){
    this.ngxService.start();
    const  formData =  this.changePasswordForm.value;
    const data = {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword
    }

    this.userService.changePassword(data).subscribe({
      next:(response:any) =>{
        this.ngxService.stop();
        this.responseMessage = response?.message;
        this.dialogRef.close();
        this.snackbarService.openSnackBar(this.responseMessage,"Success");  
      }, 
      error: (error)=>{
        console.log(error);
        this.ngxService.stop();
        if(error.error?.message){
          this.responseMessage = error.error?.message;
        }
        else{
          this.responseMessage = globalConstraint.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, globalConstraint.error)
       }
    })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
