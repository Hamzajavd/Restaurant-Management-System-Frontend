import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { SnackbarService } from '../../services/snackbar.service';
import { BillService } from '../../services/bill.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { globalConstraint } from '../../../shared/globalConstrain';
import { ProductService } from '../../services/product.service';
import { response } from 'express';
import {saveAs} from "file-saver";

@Component({
  selector: 'app-manage-order',
  standalone: false,
  templateUrl: './manage-order.component.html',
  styleUrl: './manage-order.component.css'
})
export class ManageOrderComponent implements OnInit {

  displayedColumns: string[] = ['name', 'category', 'quantity', 'total', 'edit'];
  dataSource: any = [];
  manageOrderForm: any = FormGroup;
  categorys: any = [];
  products: any = [];
  price: any;
  totalAmount: number = 0;
  responseMessage: any;
  


  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private snackbarService: SnackbarService,
    private billService: BillService,
    private productService: ProductService,
    private ngxService: NgxUiLoaderService) {

  }

  ngOnInit(): void {
    this.ngxService.start();
    this.getCategorys();
    this.manageOrderForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(globalConstraint.nameRegex)]],
      email: ['', [Validators.required, Validators.pattern(globalConstraint.emailRegex)]],
      contactNumber: ['', [Validators.required, Validators.pattern(globalConstraint.contactNumberRegex)]],
      paymentMethod: ['', [Validators.required]],
      product: ['', [Validators.required]],
      category: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      price: ['', [Validators.required]],
      total: [0, [Validators.required]]
    })
  }

  getCategorys() {
    this.categoryService.getCategorys().subscribe({
      next: (response: any) => {
        this.ngxService.stop();
        this.categorys = response;
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


  getProductsByCategory(value: any) {
    this.productService.getProductsByCategory(value.id).subscribe({
      next: (response: any) => {
        this.products = response;
        this.manageOrderForm.controls['price'].setValue('');
        this.manageOrderForm.controls['quantity'].setValue('');
        this.manageOrderForm.controls['total'].setValue('');
      }, error: (error: any) => {
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message
        }
        else {
          this.responseMessage = globalConstraint.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, globalConstraint.error);
      }
    })
  }


  getProductDetails(value:any) {
    this.productService.getById(value.id).subscribe({
  next: (response: any) => {
    this.ngxService.stop(); // stop loader
    this.price = Number(response.price) || 0; // ensure number
    this.manageOrderForm.controls['price'].setValue(this.price);
    this.manageOrderForm.controls['quantity'].setValue(1);
    this.manageOrderForm.controls['total'].setValue(this.price * 1);
  },
  error: (error: any) => {
    this.ngxService.stop();
    this.responseMessage = error.error?.message || globalConstraint.genericError;
    this.snackbarService.openSnackBar(this.responseMessage, globalConstraint.error);
  }
});

  }

setQuantity() {
  let qty = Number(this.manageOrderForm.controls['quantity'].value) || 1;
  const price = Number(this.manageOrderForm.controls['price'].value) || 0;

  if (qty > 0) {

    this.manageOrderForm.controls['total'].setValue(qty * price);
  } else {
   
    qty = 1;
    this.manageOrderForm.controls['quantity'].setValue(qty);
    this.manageOrderForm.controls['total'].setValue(qty * price);
  }
}
  validateProductAdd() {
    if (this.manageOrderForm.constrols['total'].value === 0 || this.manageOrderForm.controls('total').value === null || this.manageOrderForm.controls['quantity'].value <= 0)
      return true;
    else
      return false
  }

  ValidateSubmit() {
    if (this.totalAmount === 0 ||
      this.manageOrderForm.controls['name'].value == null ||
      this.manageOrderForm.controls['email'].value == null ||
      this.manageOrderForm.controls['contactNumber'].value == null ||
      this.manageOrderForm.controls['paymentMethod'].value == null ||
      !(this.manageOrderForm.controls['contactNumber'].valid ||
        !(this.manageOrderForm.controls['email'].valid)))
      return true;
    else
      return false;
  }



  add() {
    const formData = this.manageOrderForm.value;
    const productName = this.dataSource.find((e: { id: number; }) => e.id == formData.product.id);
    if (productName === undefined) {
      this.totalAmount = this.totalAmount + formData.total;
      this.dataSource.push({ id: formData.product.id, name: formData.product.name, category: formData.category.name, quantity: formData.quantity, price: formData.price, total: formData.total });
       this.dataSource = [...this.dataSource];
       this.snackbarService.openSnackBar(globalConstraint.productAdded, 'Success');
    }
    else {
    this.snackbarService.openSnackBar(globalConstraint.productExistError, globalConstraint.error);
    }
  }

  handleDeleteAction(value:any, element:any){
    this.totalAmount = this.totalAmount - element.total;
    this.dataSource.splice(value,1);
    this.dataSource = [...this.dataSource];
  }

  submitAction() {
  const formData = this.manageOrderForm.value;

  const data = {
    name: formData.name,
    email: formData.email,
    contactNumber: formData.contactNumber,
    paymentMethod: formData.paymentMethod,
    totalAmount: this.totalAmount,
    productDetails: JSON.stringify(this.dataSource)
  };

  this.billService.generateReport(data).subscribe({
    next: (response: any) => {

        console.log("UUID FROM BACKEND = ", response);

      this.downloadFile(response.uuid);  

      this.manageOrderForm.reset();
      this.dataSource = [];
      this.totalAmount = 0;
    },
    error: (error: any) => {
      this.ngxService.stop();
      this.responseMessage = error.error?.message ?? globalConstraint.genericError;
      this.snackbarService.openSnackBar(this.responseMessage, globalConstraint.error);
    }
  });
}


  downloadFile(fileName:any){
     const data = {
       uuid:fileName 
     } 
     this.billService.getPDF(data).subscribe({
      next:(response:any)=>{
        saveAs(response,fileName+ '.pdf');
        this.ngxService.stop()
      }
     }) 
  }
}
