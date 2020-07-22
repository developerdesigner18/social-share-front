import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dialog-email-error',
  templateUrl: './dialog-email-error.component.html'
})
export class DialogEmailErrorComponent implements OnInit {

  constructor(private  dialogRef:  MatDialogRef<DialogEmailErrorComponent>, @Inject(MAT_DIALOG_DATA) public  data:  any, public router: Router) { }

  ngOnInit(): void {
  }

  public close() {
      this.router.navigate(['']);
      this.dialogRef.close();
  }

}
