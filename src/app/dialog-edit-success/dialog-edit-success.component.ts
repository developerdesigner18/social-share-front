import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-success',
  templateUrl: './dialog-edit-success.component.html'
})
export class DialogEditSuccessComponent implements OnInit {

  constructor(private  dialogRef:  MatDialogRef<DialogEditSuccessComponent>, @Inject(MAT_DIALOG_DATA) public  data:  any) { }

  ngOnInit(): void {
  }

}
