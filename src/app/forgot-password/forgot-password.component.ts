import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { globalConstraint } from '../../shared/globalConstrain';


@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
styleUrls: ['./forgot-password.component.css']
})

export class ForgotPasswordComponent {

  forgotPasswordForm!: FormGroup;
  responseMessage : any;


  constructor(private formBuilder:FormBuilder,
    private userServices: UserService,
    private dialogRef: MatDialogRef<ForgotPasswordComponent>,
    private ngxService:NgxUiLoaderService,
    private snackBarService: SnackbarService,
  ){}

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: [null, [Validators.required,Validators.pattern(globalConstraint.emailRegex)]]
    });
  }

  handleSubmit(){
    this.ngxService.start();
    let formData = this.forgotPasswordForm.value;
    let data = {
      email: formData.email
    }
    this.userServices.forgotPassword(data).subscribe({
      next: (response: any)=>{
      this.ngxService.stop();
      this.responseMessage = response?.message;
      this.dialogRef.close();
      this.snackBarService.openSnackBar(this.responseMessage, ""); 
    },
    error: (error) => {
        this.ngxService.stop()
        if(error.error?.message){
          this.responseMessage = error.error?.message;
        }
        else{
          this.responseMessage = globalConstraint.genericError;
        }
        this.snackBarService.openSnackBar(this.responseMessage,globalConstraint.error);
    },
    complete: () => {
    
      }
  })
  }
  
}
