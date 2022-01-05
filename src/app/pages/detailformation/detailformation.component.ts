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
  id: string
  public list: []
  lengthList: number
  public listlien: []
  userId: string
  userdata: User
  mescours: any;
  constructor(private userservice: LearningDbService, private storageService: LocalstorageService, private router: Router, private route: ActivatedRoute, private formationservice: FormationDbService) { }

  ngOnInit(): void {
    this.i = this.route.snapshot.params.id;
    //this.myformation(this.i)
    this.formationservice.getOneformation(this.i).subscribe((data: any) => {
      this.detailsformation = data;
      //this.list = data.listVideo
      console.log(this.detailsformation);

    });
  }

  //test si cet formation est acheté ou non
  myformation(id: string) {
    this.userId = this.storageService.getUseId()
    this.userservice.getprofil(this.userId).subscribe((data: any) => {
      this.userdata = data;
      console.log(this.userdata.cours[0]);
      for (let i = 0; i < this.userdata.cours.length; i++) {
        this.id = this.userdata.cours[0]._id
        this.mescours.push(this.id)
        //console.log(this.userdata.cours[i])

      }
      this.userdata.cours.forEach(element => {
        console.log(element);

        this.mescours.push(element);

      });

      console.log(this.mescours);
    });
    for (let item of this.mescours) {
      console.log(item);
      //if (this.i == item._id) { console.log("hello"); }


    }

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

