import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'app/model/user';
import { LearningDbService } from 'app/service/learning-db.service';
import { LocalstorageService } from 'app/service/localstorage.service';

@Component({
  selector: 'app-profiluser',
  templateUrl: './profiluser.component.html',
  styleUrls: ['./profiluser.component.css']
})
export class ProfiluserComponent implements OnInit {
  userId: string
  userdata: User
  constructor(private userservice: LearningDbService,
    private storageService: LocalstorageService, private router: Router) { }

  ngOnInit(): void {
    this.userId = this.storageService.getUseId();
    this.userservice.getprofil(this.userId).subscribe((data: any) => {
      this.userdata = data;

    });

  }
  detailpage(id: string) {
    this.router.navigate(['/formation', id]);
  }
}
