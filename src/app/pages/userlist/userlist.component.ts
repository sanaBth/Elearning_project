import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/model/user';
import { LearningDbService } from 'app/service/learning-db.service';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  listusers: User[];

  constructor(private authservice: LearningDbService, private router: Router) { }

  ngOnInit(): void {
    this.getusers();
  }

  getusers() {

    return this.authservice.getusers().subscribe((data: any) => {
      this.listusers = data;

    });

  }
  changerole(id: string) {

    this.authservice.updateUser(id).subscribe((data: any) => {

    });
    this.onRefresh();
  }
  onRefresh() {
    this.router.routeReuseStrategy.shouldReuseRoute = function () { return false }
    const currentUrl = this.router.url + '?'
    return this.router.navigateByUrl(currentUrl).then(() => {
      this.router.navigated = false
      this.router.navigate([this.router.url])
    })
  }
}
