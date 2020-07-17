import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog} from  '@angular/material/dialog';
import { PostModalComponent } from '../post-modal/post-modal.component';
declare var jQuery: any;

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  constructor(
    public  dialog:  MatDialog
  ) { }

  ngOnInit(): void {
    (function ($) {
      $(document).ready(function(){
        $('.owl-carousel').owlCarousel({
      		nav:true,
      		items:1,
          autoWidth: true
      	});

        $('.comment_sec').on('click',function(){
    			$('.comments_container').toggle();
    		});
      });
    })(jQuery);
  }

  openDialog(): void {
    this.dialog.open(PostModalComponent, {
      width: '550px',
    });
  }

}
