import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { loginurl } from '../../appconfig';
@Component({
  selector: 'ngx-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goToHome() {
    this.router.navigate([loginurl])
  }

}
