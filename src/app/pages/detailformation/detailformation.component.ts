import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'app/model/user';
import { Formation } from 'app/model/formation';

import { FormationDbService } from 'app/service/formation-db.service';
import { LearningDbService } from 'app/service/learning-db.service';
import { LocalstorageService } from 'app/service/localstorage.service';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-detailformation',
  templateUrl: './detailformation.component.html',
  styleUrls: ['./detailformation.component.css']
})
export class DetailformationComponent implements OnInit {
  i: string;
  environment = environment;
  detailsformation: Formation
  detailVideo: any
  listVideo: []
  nom: string
  id: any
  public list: []
  lengthList: number
  public listlien: []
  userId: string
  userdata: User[]
  mescours: any[] = []
  listcours: any
  array: string
  idcours: string[]
  ok: boolean
  role: boolean
  userconnected: User
  constructor(private userservice: LearningDbService, private storageService: LocalstorageService, private router: Router, private route: ActivatedRoute, private formationservice: FormationDbService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.i = params.get("id")

    });

    this.role = JSON.parse(localStorage.getItem('role') || 'null')
    this.myformation(this.i)
    this.userconnected = JSON.parse(localStorage.getItem('userconnected') || 'null')
  }

  //test si cet formation est acheté ou non
  myformation(idf: string) {
    this.userId = this.storageService.getUseId()
    if (this.userId) {
      if (this.role) {

        this.ok = true;
        this.formationservice.getOneformation(this.i).subscribe((data: any) => {
          this.detailsformation = data;
        });
      } else {

        this.userservice.getprofil(this.userId).subscribe((data: any) => {
          this.listcours = data.cours
          for (let i = 0; i < this.listcours.length; i++) {
            this.mescours.push(this.listcours[i]._id)
          }
          if (this.mescours.filter(item => item == idf).length != 0) {
            this.ok = true;
            this.formationservice.getOneformation(this.i).subscribe((data: any) => {
              this.detailsformation = data;
            });
          } else {
            this.ok = false;
            this.formationservice.getOneformationwv(this.i).subscribe((data: any) => {
              this.detailsformation = data;
            });
          }

        });
      }

    } else {
      this.ok = false;
      this.formationservice.getOneformationwv(this.i).subscribe((data: any) => {
        this.detailsformation = data;
      });
    }


  }
  delvideo(id: string) {
    this.formationservice.delvideo(id);
    return this.formationservice.getOneformation(this.i).subscribe((data: any) => {
      this.detailsformation = data;

    });
  }
  upvideo(id: string) {
    this.router.navigate(['/addvideo', id]);
  }
}

