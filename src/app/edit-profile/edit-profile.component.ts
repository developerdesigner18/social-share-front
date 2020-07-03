import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';
// import { UserProfileComponent } from '../user-profile/user-profile.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html'
})
export class EditProfileComponent implements OnInit {
  // post_user: string;
  // dialogValue: string;
  // @Input() post_user: string;
   // @Input() childMessage: string;
  // @ViewChild(UserProfileComponent) profile;

  // user_p: string;

  constructor(
    private  dialogRef:  MatDialogRef<EditProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public  data:  any
    // public profile: UserProfileComponent
  ) {
    // console.log('User profile call', this.profile.post_user);
    // this.dialogValue = this.profile.PostValue();
  }

  ngOnInit(): void {
    // this.post_user = this.profile.PostValue();
    // console.log('Post are profile', this.post_user);

  }


  close() {
    this.dialogRef.close();
  }

}
