import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';

@Component({
  selector: 'app-dialog-passmatch',
  templateUrl: './dialog-passmatch.component.html'
})
export class DialogPassmatchComponent implements OnInit {

  constructor(private  dialogRef:  MatDialogRef<DialogPassmatchComponent>, @Inject(MAT_DIALOG_DATA) public  data:  any) { }

  ngOnInit(): void {
  }

  public close() {
      this.dialogRef.close();
  }

}
