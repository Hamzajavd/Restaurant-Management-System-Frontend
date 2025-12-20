import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { globalConstraint } from '../../shared/globalConstrain';
import { Router } from '@angular/router';
import { response } from 'express';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  standalone: false,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data: any;
  responseMessage: string = '';

  constructor(
    private userService: UserService,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService,
    private router:Router

  ) {}

  ngOnInit(): void {
    console.log("Dashboard Loaded → Fetching Details...");
    this.fetchDetails();
  }

  fetchDetails() {
    this.ngxService.start();
    this.userService.getDetails().subscribe({
      next: (response: any) => {
        console.log('API Response:', response);
        this.data = response;
        this.ngxService.stop();
      },
      error: (error: any) => {
        console.error('API Error:', error);
        this.ngxService.stop();
        this.responseMessage =
          error.error?.message || globalConstraint.genericError;
        this.snackbarService.openSnackBar(
          this.responseMessage,
          globalConstraint.error
        );
      },
    });
  }

  categoryAction() {
 if(localStorage.getItem('token') != null){
      this.userService.checkToken().subscribe({
      next: (response:any) =>{
        this.router.navigate(['/category']);
      },
    error: (error:any)=>{
      console.log(error);
      },
complete: () => {}
      })
    }

}


productAction(){
  if(localStorage.getItem('token') != null){
   this.userService.checkToken().subscribe({
    next: (response) =>{
      this.router.navigate(['/product'])
    },
    error: (error:any) =>{
      console.log(error)
    }
   })
  }
}


billAction(){
  if(localStorage.getItem('token') != null){
   this.userService.checkToken().subscribe({
    next: (response) =>{
      this.router.navigate(['/bill'])
    },
    error: (error:any) =>{
      console.log(error)
    }
   })
  }
}
}
