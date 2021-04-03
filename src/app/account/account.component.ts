import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { ThemeComponent } from '../theme/theme.component';
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AccountComponent implements OnInit {
  id: any;

  @ViewChild('nameText') nameTextElement: any;
  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    public formBuilder: FormBuilder,
    public toastr: ToastrService
  ) {
    $(".hide_theme").css("display", "none");
  }
  ngOnInit(): void {
  }


}
