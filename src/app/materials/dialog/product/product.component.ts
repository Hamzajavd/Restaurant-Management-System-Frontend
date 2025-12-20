import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../../services/category.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { globalConstraint } from '../../../../shared/globalConstrain';

@Component({
  selector: 'app-product',
  standalone: false,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  onAddProducts = new EventEmitter();
  onEditProducts = new EventEmitter();
  productForm:any = FormGroup;
  dialogAction = "Add";
  action:any = "Add";
  responsemessage: any;
  categories: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    public dialogRef: MatDialogRef<ProductComponent>,
    private categoryService: CategoryService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['',[Validators.required, Validators.pattern(globalConstraint.nameRegex)]],
      categoryId: ['', [Validators.required]],
      description: [''],
      price: ['', Validators.required],
    });

    if (this.dialogData.action === 'Edit') {
      this.dialogAction = "Edit";
      this.action = 'Update';
      this.productForm.patchValue(this.dialogData.data);
      
    }

    this.getCategorys();
  }

  getCategorys() {
    this.categoryService.getCategorys().subscribe({
      next: (response: any) => {
        this.categories = response;
      },
      error: (error: any) => {  
        if(error.error?.message){
          this.responsemessage = error.error?.message
        }
        else{
          this.responsemessage = globalConstraint.genericError
        }

        this.snackbarService.openSnackBar(this.responsemessage,globalConstraint.error)
      }
    });
  }

  handleSubmit() {
    if (this.dialogAction === 'Edit') {
      this.edit();
    } else {
      this.add();
    }
  }

  add() {
    const formData = this.productForm.value;
    const data = {
      name: formData.name,
      categoryId: Number(formData.categoryId),
      description: formData.description,
      price: Number(formData.price),
    };

    this.productService.add(data).subscribe({
      next: (response: any) => {
        this.dialogRef.close();
        this.onAddProducts.emit();
        this.responsemessage = response.message || 'Product added successfully';
        this.snackbarService.openSnackBar(this.responsemessage, "success");
      },
      error: (error) => {
        this.dialogRef.close();
        this.responsemessage = error.error?.message || globalConstraint.genericError;
        this.snackbarService.openSnackBar(this.responsemessage, globalConstraint.error);
      }
    });
  }

  edit() {
    const formData = this.productForm.value;
    const data = {
      id: this.dialogData.data.id,
      name: formData.name,
      categoryId: formData.categoryId,
      price: formData.price,
      description: formData.description,
    };

    this.productService.update(data).subscribe({
      next: (response: any) => {
        this.dialogRef.close();
        this.onEditProducts.emit();
        this.responsemessage = response.message || 'Product updated successfully';
        this.snackbarService.openSnackBar(this.responsemessage, "success");
      },
      error: (error) => {
        this.dialogRef.close();
        this.responsemessage = error.error?.message || globalConstraint.genericError;
        this.snackbarService.openSnackBar(this.responsemessage, globalConstraint.error);
      }
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
