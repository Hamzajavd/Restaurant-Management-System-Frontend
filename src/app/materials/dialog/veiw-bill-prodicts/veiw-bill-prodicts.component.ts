import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-veiw-bill-prodicts',
  standalone: false,
  templateUrl: './veiw-bill-prodicts.component.html',
  styleUrl: './veiw-bill-prodicts.component.css'
})
export class VeiwBillProdictsComponent implements OnInit{
  
  displayedColumns:string[] = ['name', 'category', 'price', 'quantity','total'];
  dataSource:any;
  data:any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
public dialogRef: MatDialogRef<VeiwBillProdictsComponent>){}

  ngOnInit() {
    this.data = this.dialogData.data;

  let details = this.dialogData.data.productDetails;
  if (typeof details === 'string') {
    details = JSON.parse(details);
  }

  this.dataSource = Array.isArray(details) ? details : [details];
}
}