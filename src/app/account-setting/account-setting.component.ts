import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.css'],
  encapsulation: ViewEncapsulation.None
})
  
export class AccountSettingComponent implements OnInit {
  profileForm: FormGroup;
  id: any
  datas: any = [];
  name: any;
  name_shows: boolean = true;
  edit_name: boolean = false;

  @ViewChild('nameText') nameTextElement: any;
  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    public formBuilder: FormBuilder,
    public toastr: ToastrService
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
      this.authService.getProfileforAbout(this.id).subscribe(res => {
        this.datas = res.data;
        this.name = res.data.name
      })
    
      this.profileForm = this.formBuilder.group({
        userId: window.location.href.split('/')[4],
        name: [this.nameTextElement]
      })
    
  }
  
  
  edit_names() {
    this.edit_name = true;
    this.name_shows = false;
  }

  save_names(name) {
    this.authService.profileUpdate(name).subscribe((res) => {
      if (!res.result) {
       //  this.dialog.open(DialogEditSuccessComponent, {
       //    width: '400px'
       //  })
        this.toastr.success("Your profile has been saved successfully.")
      }
    })
  }

  cancel_names() { 
    this.edit_name = false;
    this.name_shows = true;
  }


  ngOnInit(): void {
  }

}
