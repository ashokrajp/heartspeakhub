import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
  type: any;
  title: any;
  desc: any;
  private sub: Subscription = new Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('type');
    console.log(this.type);
    
    this.sub = this.route.data.subscribe( param => {
      if(param['type']) {
        this.type = param['type'];
      }
      if(param['title']) {
        this.title = param['title'];
      }
      if(param['desc']) {
        this.desc = param['desc']
      }
    });

    switch(this.type) {
      case '404':
        if (!this.title) {
          this.title = 'Page Not Found'
        }
        if (!this.desc) {
          this.desc = 'Oopps!! The page you were looking for doesn\'t exist.'
        }
        break;
      case '500':
        if (!this.title) {
          this.title = 'Internal server error'
        }
        if (!this.desc) {
          this.desc = 'Oopps!! There wan an error. Please try agin later.'
        }
        break;
      default:
          this.type = 'Ooops..';
        if (!this.title) {
          this.title = 'Something went wrong';
        }
        if (!this.desc) {
          this.desc = 'Looks like something went wrong.<br>' + 'We\'re working on it';
        }
    }
  }

	ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
