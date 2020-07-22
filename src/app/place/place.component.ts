import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {
  u_country = '';
  u_state = '';
  u_city = '';

  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    let id = this.activatedRoute.parent.parent.params['value']['id'];
    this.authService.getProfileforAbout(id).subscribe(res => {
      this.u_country =  res.data.country
      this.u_state =  res.data.state
      this.u_city =  res.data.city
    })
  }

  ngOnInit(): void {
  }

}