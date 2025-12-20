import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../../services/category.service';
import { SnackbarService } from '../../../services/snackbar.service';
import { globalConstraint } from '../../../../shared/globalConstrain';

@Component({
  selector: 'app-category',
  standalone: false,
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit{
  onAddCategory = new  EventEmitter();
  onEditCategory = new EventEmitter();
  onDeleteCategory = new EventEmitter();
  CategoryForm:any = FormGroup; 
  dialogAction:any = "Add";
  action:any = "Add";
  responseMessage:any;



  constructor(@Inject(MAT_DIALOG_DATA)
 public dialogData:any,
private formBuilder:FormBuilder,
private categoryService:CategoryService,
public dialogRef:MatDialogRef<CategoryComponent>,
private snackbarService:SnackbarService){}
   


ngOnInit(): void {
     this.CategoryForm = this.formBuilder.group({
      name:['',[Validators.required]]
     });

     if(this.dialogData.action === 'Edit'){
      this.dialogAction = "Edit";
      this.action = "Update";
      this.CategoryForm.patchValue(this.dialogData.data);
     }
   }



   handleSubmit(){
    if(this.dialogAction === "Edit"){
      this.edit()
    }
    else{ 
       this.add()
    }
   }


   add(){
    var formData = this.CategoryForm.value;
    var data = {
      name:formData.name
    }
    this.categoryService.add(data).subscribe({
      next: (response: any) => {
        this.dialogRef.close();
        this.onAddCategory.emit();
        this.responseMessage = response.message;
        this.snackbarService.openSnackBar(this.responseMessage,"sucess");   
      }, error:(error) =>{
        this.dialogRef.close();
        if(error.error?.message){
          this.responseMessage = error.error?.message
        }
        else{
          this.responseMessage = globalConstraint.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, globalConstraint.error)
      }
    })
   }



   edit(){
    var formData = this.CategoryForm.value;
    var data = {
      id: this.dialogData.data.id,
      name:formData.name,
      
    }  
    this.categoryService.update(data).subscribe({
      next: (response: any) => {
        this.dialogRef.close();
        this.onEditCategory.emit();
        this.dialogRef.close();
        this.responseMessage = response.message;
        this.snackbarService.openSnackBar(this.responseMessage,"sucess");   
      }, error:(error) =>{
        if(error.error?.message){
          this.responseMessage = error.error?.message
        }
        else{
          this.responseMessage = globalConstraint.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, globalConstraint.error)
      }
    })
   }


   delete(){}

   closeDialog() {
  this.dialogRef.close();
}

}
