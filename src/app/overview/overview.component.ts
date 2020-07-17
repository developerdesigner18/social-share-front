import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  name = '';
  u_designation = '';
  u_state = '';
  u_country = '';
  u_city = '';

  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute

  ) {
    let id = this.activatedRoute.parent.parent.params['value']['id'];
    this.authService.getProfileforAbout(id).subscribe(res => {
      this.u_designation =  res.data.designation
      this.u_country =  res.data.country
      this.u_state =  res.data.state
      this.u_city =  res.data.city
    })
  }

  ngOnInit(): void {
  }
}
