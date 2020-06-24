import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';

@Component({
  selector: 'app-dialog-error',
  templateUrl: './dialog-error.component.html'
})
export class DialogErrorComponent implements OnInit {

  constructor(private  dialogRef:  MatDialogRef<DialogErrorComponent>, @Inject(MAT_DIALOG_DATA) public  data:  any) { }

  ngOnInit(): void {
  }

  public close() {
      this.dialogRef.close();
  }

}
