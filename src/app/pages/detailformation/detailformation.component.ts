import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormationDbService } from 'app/service/formation-db.service';

@Component({
  selector: 'app-detailformation',
  templateUrl: './detailformation.component.html',
  styleUrls: ['./detailformation.component.css']
})
export class DetailformationComponent implements OnInit {
  i : string ;
  detailsformation : []
  detailVideo: []
  listVideo: []
  nom : string
  id : string
  public list:[]
  lengthList:number
  public listlien : []
  constructor(private router: Router,private route: ActivatedRoute,private formationservice :FormationDbService) { }

  ngOnInit(): void {
    this.i = this.route.snapshot.params.id;
    console.log(this.i);
    this.formationservice.getOneformation(this.i).subscribe((data:any) => {
      this.detailsformation = data;
      //this.list = data.listVideo
    console.log(this.detailsformation);
      
    });
  }
  delvideo(id:string)
  {
    console.log(id);
   this.formationservice.delvideo(id);
   return  this.formationservice.getOneformation(this.i).subscribe((data:any) => {
    this.detailsformation = data;
    //this.list = data.listVideo
  console.log(this.detailsformation);
    
  });
  }
  upvideo(id:string)
  {
   this.router.navigate(['/addvideo',id]);
  }
}

