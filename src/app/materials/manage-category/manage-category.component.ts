import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { globalConstraint } from '../../../shared/globalConstrain';
import { elementAt, find } from 'rxjs';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { CategoryComponent } from '../dialog/category/category.component';
import { response } from 'express';

@Component({
  selector: 'app-manage-category',
  standalone: false,
  templateUrl: './manage-category.component.html',
  styleUrl: './manage-category.component.css'
})
export class ManageCategoryComponent implements OnInit {
  displayColumn: string[] = ['name', 'edit', 'delete']
  dataSource: any;
  responseMessage: any;

  constructor(private categoryService: CategoryService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router,
    
    
  ) { }


  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData() {
    this.categoryService.getCategorys().subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(response);
      }, error: (error) => {
        this.ngxService.stop();
        console.log(error)

        
        if (error.error?.message) {
          this.responseMessage = error.error?.message
        }
        else {
          this.responseMessage = globalConstraint.genericError
        }
        this.snackbarService.openSnackBar(this.responseMessage, globalConstraint.error);
      }
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  handleAddAction(){
    const dialogConfig = new MatDialogConfig();
   dialogConfig.data ={
    action: 'add'
   }

   dialogConfig.width = '550px';
   const dialogRef = this.dialog.open(CategoryComponent, dialogConfig);
   this.router.events.subscribe(() => {
    dialogRef.close();
   });
   const sub = dialogRef.componentInstance.onAddCategory.subscribe({next:(response:any) => {
    this.tableData();
   }})
  }

  handleEditAction(values:any){
       const dialogConfig = new MatDialogConfig();
   dialogConfig.data ={
    action: 'Edit',
    data: values
   }

   dialogConfig.width = '550px';
   const dialogRef = this.dialog.open(CategoryComponent, dialogConfig);
   this.router.events.subscribe(() => {
    dialogRef.close();
   });
   const sub = dialogRef.componentInstance.onEditCategory.subscribe({next:(response:any) => {
    this.tableData();
   }})
  }

  handlDeleteAction(data:any){
    this.categoryService.delete(data.id).subscribe({
      next:(response:any) =>{
        this.dataSource.data = this.dataSource.data.filter(
        (item: any) => item.id !== data.id
      );
        this.responseMessage = response?.message;
        this.snackbarService.openSnackBar(this.responseMessage, "Sucessfully Delete")
      }, error: (error)=>{
        console.log(error);
        if(error.error?.message){
          this.responseMessage = error.error?.message;
        }
        else{
          // this.responseMessage = globalConstraint.genericError;
          console.error('Delete failed:', error);
        }
        this.snackbarService.openSnackBar(this.responseMessage, globalConstraint.error)
       }
    });
  }


 
 }  
