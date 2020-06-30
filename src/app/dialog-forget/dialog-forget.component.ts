import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dialog-forget',
  templateUrl: './dialog-forget.component.html'
})
export class DialogForgetComponent implements OnInit {

  constructor(private  dialogRef:  MatDialogRef<DialogForgetComponent>, @Inject(MAT_DIALOG_DATA) public  data:  any, public router: Router) { }

  ngOnInit(): void {
  }

  public close() {
      this.dialogRef.close();
  }

}
