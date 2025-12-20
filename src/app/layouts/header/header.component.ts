import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmationComponent } from '../../materials/confirmation/confirmation.component';
import { ChangePasswordComponent } from '../../materials/change-password/change-password.component';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class AppHeaderComponent {
  role: any;
  constructor(private router: Router,
    private dialog: MatDialog) {

  }


  logout(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'logout'
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitSatusChange.subscribe((user) =>{
      dialogRef.close();
      localStorage.clear();
      this.router.navigate(['/'])
    })
  }

  changePassword(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "550px";
    this.dialog.open(ChangePasswordComponent, dialogConfig )
  }
}
