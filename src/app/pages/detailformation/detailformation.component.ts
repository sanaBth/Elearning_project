import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'app/model/user';
import { FormationDbService } from 'app/service/formation-db.service';
import { LearningDbService } from 'app/service/learning-db.service';
import { LocalstorageService } from 'app/service/localstorage.service';

@Component({
  selector: 'app-detailformation',
  templateUrl: './detailformation.component.html',
  styleUrls: ['./detailformation.component.css']
})
export class DetailformationComponent implements OnInit {
  i: string;
  detailsformation: []
  detailVideo: []
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
  role: User
  constructor(private userservice: LearningDbService, private storageService: LocalstorageService, private router: Router, private route: ActivatedRoute, private formationservice: FormationDbService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.i = params.get("id")

    });
    this.myformation(this.i)
    this.role = JSON.parse(localStorage.getItem('role') || 'null')
  }

  //test si cet formation est acheté ou non
  myformation(idf: string) {
    this.userId = this.storageService.getUseId()
    this.userservice.getprofil(this.userId).subscribe((data: any) => {
      this.listcours = data.cours
      for (let i = 0; i < this.listcours.length; i++) {
        this.mescours.push(this.listcours[i]._id)
      }
      if (this.mescours.filter(item => item == idf).length != 0) {
        this.formationservice.getOneformation(this.i).subscribe((data: any) => {
          this.detailsformation = data;
        });
      } else {
        this.formationservice.getOneformationwv(this.i).subscribe((data: any) => {
          this.detailsformation = data;
        });
      }

    });

  }
  delvideo(id: string) {
    console.log(id);
    this.formationservice.delvideo(id);
    return this.formationservice.getOneformation(this.i).subscribe((data: any) => {
      this.detailsformation = data;
      //this.list = data.listVideo
      console.log(this.detailsformation);

    });
  }
  upvideo(id: string) {
    this.router.navigate(['/addvideo', id]);
  }
}

