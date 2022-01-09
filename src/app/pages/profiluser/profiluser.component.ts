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
  coursdata: [] = []
  tableauvide: boolean = true
  constructor(private userservice: LearningDbService,
    private storageService: LocalstorageService, private router: Router) { }

  ngOnInit(): void {
    this.userId = this.storageService.getUseId();
    this.userservice.getprofil(this.userId).subscribe((data: any) => {
      this.userdata = data;
    });

  }
  //afficher div profil vide
  /* getProfil() {

    this.userservice.getprofil(this.userId).subscribe((data: any) => {
      this.userdata = data;
      this.coursdata = data.cours;
      if (this.coursdata.length == 0) {
        console.log("tabeauvide");
        return this.tableauvide;
      }

    });
  } */
  detailpage(id: string) {
    this.router.navigate(['/formation', id]);
  }
}
