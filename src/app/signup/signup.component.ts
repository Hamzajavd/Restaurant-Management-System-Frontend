import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { globalConstraint } from '../../shared/globalConstrain';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  signupForm: any = FormGroup;
  responseMessage: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackBarService: SnackbarService,
    private dialogref: MatDialogRef<SignupComponent>,
    private ngxService: NgxUiLoaderService) { }


  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(globalConstraint.nameRegex)]],
      email: [null, [Validators.required, Validators.pattern(globalConstraint.emailRegex)]],
      contactNumber: [null, [Validators.required, Validators.pattern(globalConstraint.contactNumberRegex)]],
      password: [null, [Validators.required]],
    })
  }

  handleSubmit() {
    this.ngxService.start();
    var formData = this.signupForm.value;
    let data = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      password: formData.password
    }

    this.userService.signup(data).subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.dialogref.close();
        this.responseMessage = response?.message;
        this.snackBarService.openSnackBar('Saved successfully!', 'success');
        this.snackBarService.openSnackBar(this.responseMessage, globalConstraint.error);
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = globalConstraint.genericError;
        }
        this.snackBarService.openSnackBar(this.responseMessage, globalConstraint.error);
      },
      complete: () => {
        // optional, only if you need to run code after observable finishes
      }
    })
  }
}
