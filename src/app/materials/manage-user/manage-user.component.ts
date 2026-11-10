import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { UserService } from '../../services/user.service';
import { SnackbarService } from '../../services/snackbar.service';
import { MatTableDataSource } from '@angular/material/table';
import { globalConstraint } from '../../../shared/globalConstrain';
import { response } from 'express';

@Component({
  selector: 'app-manage-user',
  standalone: false,
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.css'
})
export class ManageUserComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'contactNumber', 'status'];
  dataSource: any;
  responseMessage: any;

  constructor(private ngxService: NgxUiLoaderService,
    private userService: UserService,
    private snackbarService: SnackbarService

  ) { }


  ngOnInit(): void {
    this.ngxService.start();
    this.tableData()
  }


  tableData() {
    this.userService.getUsers().subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(response);
      }, error: (error: any) => {
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        }
        else {
          this.responseMessage = globalConstraint.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, globalConstraint.error);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleChangeAction(status: any, id: any) {
    this.ngxService.start();

    const data = {
      status: status.toString(),
      id: id
    };

    this.userService.update(data).subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.responseMessage = response?.message || "Updated successfully";
        this.snackbarService.openSnackBar(this.responseMessage, "success");
      },
      error: (error: any) => {
        this.ngxService.stop();
        this.responseMessage =
          error.error?.message || globalConstraint.genericError;

        this.snackbarService.openSnackBar(this.responseMessage, globalConstraint.error);
      }
    });
  }

}
