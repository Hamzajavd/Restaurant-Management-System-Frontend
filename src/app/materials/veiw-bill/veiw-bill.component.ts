
import { Component, OnInit } from '@angular/core';
import { BillService } from '../../services/bill.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SnackbarService } from '../../services/snackbar.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { globalConstraint } from '../../../shared/globalConstrain';
import { filter } from 'rxjs';
import { ConfirmationComponent } from '../confirmation/confirmation.component';
import { response } from 'express';
import { saveAs } from 'file-saver';
import { __values } from 'tslib';
import { DialogConfig } from '@angular/cdk/dialog';
import { VeiwBillProdictsComponent } from '../dialog/veiw-bill-prodicts/veiw-bill-prodicts.component';

@Component({
  selector: 'app-veiw-bill',
  standalone: false,
  templateUrl: './veiw-bill.component.html',
  styleUrl: './veiw-bill.component.css'
})
export class VeiwBillComponent implements OnInit {

  displayedColumns:string[] = ['name', 'email', 'contactNumber', 'paymentMethod', 'total', 'view'];
  dataSource:any;
  responseMessage:any;
  

  constructor(private billService:BillService,
    private ngxService:NgxUiLoaderService,
    private dialog:MatDialog,
    private snackbarService:SnackbarService,
    private router:Router,){}

 ngOnInit(): void {

   this.ngxService.start();
    this.tableData()
   
 }

 tableData(){
    this.billService.getBills().subscribe({
      next:(response:any)=>{
        this.ngxService.stop()
        this.dataSource = new MatTableDataSource(response);
      }, error:(error:any)=>{
        this.ngxService.stop();
        if(error.error?.message){
          this.responseMessage = error.error?.message;
        }
        else{
          this.responseMessage = globalConstraint.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, globalConstraint.error);
      }
    })
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

 handleVeiwAction(values: any) {
   console.log("Selected Row Values = ", values); 
  const dialogConfig = new MatDialogConfig();
  dialogConfig.data ={
    data:values
  };
  // dialogConfig.width = '800px';
  const dialogRef = this.dialog.open(VeiwBillProdictsComponent, dialogConfig);
  this.router.events.subscribe(()=>{
  dialogRef.close()
  })

  }



  downloadReportAction(values:any){
    this.ngxService.start();
    const data ={
      name: values.name,
      email:values.email,
      uuid:values.uuid,
      contactNumber: values.contactNumber,
      paymentMethod: values.paymentMethod,
      totalAmount:values.total,
      productDetails:values.productDetails
    }
     this.billService.getPDF(data).subscribe({
      next:(response:any)=>{
        saveAs(response,values.uuid+ '.pdf');
        this.ngxService.stop();
      }
     })
  }

  handleDeleteAction(values:any){
    console.log(values.id)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data={
      message: 'delete '+ values.name +' bill'
    };

    const dialogRef = this.dialog.open(ConfirmationComponent,dialogConfig);
    const sub = dialogRef.componentInstance.onEmitSatusChange.subscribe({
      next:(response:any)=>{
        this.ngxService.start();
        console.log(values.id)
        console.log("Row values:", values);
        this.deleteProduct(values.id);
        dialogRef.close();
      }
    })
  }

  deleteProduct(id:any){
    this.billService.delete(id).subscribe({
      next:(response:any)=>{
        this.ngxService.stop();
        this.tableData();
        this.responseMessage = response?.message;
        this.snackbarService.openSnackBar(this.responseMessage,'success');
      }, error: (error:any)=>{
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
}
