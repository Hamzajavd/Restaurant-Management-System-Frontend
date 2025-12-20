import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { globalConstraint } from '../../shared/globalConstrain';
import { MatDialogRef } from '@angular/material/dialog';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: any = FormGroup;
  responseMessage: any;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    public dialogRef: MatDialogRef<LoginComponent>,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(globalConstraint.emailRegex)]],
      password: [null, [Validators.required]]
    })
  }

  handleSubmit() {
    this.ngxService.start();
    const formData = this.loginForm.value;
    let data = {
      email: formData.email,
      password: formData.password
    }
    this.userService.login(data).subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.router.navigate(['/dashboard']);

        localStorage.setItem('token', response.token);


        const decoded: any = jwtDecode(response.token);
        localStorage.setItem('role', decoded.role);
      },
      error: (error) => {
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        }
        else {
          this.responseMessage = globalConstraint.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, globalConstraint.error);
      },

      complete: () => { }

    })
  }

}
