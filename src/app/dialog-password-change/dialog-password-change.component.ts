import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dialog-password-change',
  templateUrl: './dialog-password-change.component.html'
})
export class DialogPasswordChangeComponent implements OnInit {

  constructor(private  dialogRef:  MatDialogRef<DialogPasswordChangeComponent>, @Inject(MAT_DIALOG_DATA) public  data:  any, public router: Router) { }

  ngOnInit(): void {
  }

  public close() {
      this.dialogRef.close();
  }

}
