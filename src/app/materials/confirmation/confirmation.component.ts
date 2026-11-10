import { Component, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  standalone: false,
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent {
  onEmitSatusChange = new EventEmitter();
  details: any = {};
  constructor(@Inject(MAT_DIALOG_DATA)
  public dialogData: any,
    public dialogRef: MatDialogRef<ConfirmationComponent>) {

  }

  ngOnInit(): void {
    if (this.dialogData) {
      this.details = this.dialogData;
    }
  }

  handleChangeAction() {
    this.onEmitSatusChange.emit();
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
