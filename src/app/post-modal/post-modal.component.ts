import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from  '@angular/material/dialog';
import { ActivatedRoute} from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-post-modal',
  templateUrl: './post-modal.component.html',
  styleUrls: ['./post-modal.component.css']
})
export class PostModalComponent implements OnInit {
  name = '';
  parentRouteId: any = '';

  constructor(
    private  dialogRef:  MatDialogRef<PostModalComponent>,
    @Inject(MAT_DIALOG_DATA) public  data:  any,
    public authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    // console.log("-=-=-=-=-=-Route params")
    // console.log(this.activatedRoute.parent.params)
    // console.log("-=-=-=-=-=-Route params")
    // let id = this.activatedRoute.parent.params['id'];
    // this.authService.getProfileforAbout(id).subscribe(res => {
    //   this.name =  res.data.name
    // })
  }

  ngOnInit(): void {
  }

  public close() {
      this.dialogRef.close();
  }
}
