import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from '../../services/snackbar.service';
import { ProductComponent } from '../dialog/product/product.component';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { globalConstraint } from '../../../shared/globalConstrain';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-manage-product',
  standalone: false,
  templateUrl: './manage-product.component.html',
  styleUrl: './manage-product.component.css'
})
export class ManageProductComponent implements OnInit {
  displayedColumns: string[] = ['productName', 'categoryName', 'description', 'price', 'edit'];
  dataSource: any;
  responseMessage: any;

  constructor(private productService: ProductService,
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
    this.productService.getProducts().subscribe({
      next: (response: any) => {
        console.log(response)
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(response);
      }, error: (error: any) => {
        this.ngxService.stop();
        console.log(error);

        if (error.error?.message) {
          this.responseMessage = error.error?.message;
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

  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add',
    }

    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(ProductComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddProducts.subscribe({
      next: () => {
        this.tableData();
      }
    })
  };



  handleEditAction(values: any) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data: values
    }

    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(ProductComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close()
    });
    const sub = dialogRef.componentInstance.onEditProducts.subscribe({
      next: (response: any) => {
        this.tableData();
      }
    })

  }


  handleDeleteAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'delete' + values.name + 'product'
    }
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitSatusChange.subscribe({
      next: (response: any) => {
        this.ngxService.start();
        this.deleteProduct(values.id);
        dialogRef.close();
      }
    })


  }

  deleteProduct(id: any) {
    this.productService.delete(id).subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.tableData();
        this.responseMessage = response?.message;
        this.snackbarService.openSnackBar(this.responseMessage, 'Success');
      },
      error: (error: any) => {
        this.ngxService.stop();
        console.log(error);
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


  onChange(status: any, id: any) {
    var data = {
      status: status.toString(),
      id: id
    }
    this.productService.updateStatus(data).subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.responseMessage = response?.message;
        this.snackbarService.openSnackBar(this.responseMessage, 'Success')
      }, error: (error: any) => {

      }
    })
  }
}
