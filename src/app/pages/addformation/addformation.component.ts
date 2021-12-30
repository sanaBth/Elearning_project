import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Formation } from 'app/model/formation';
import { FormationDbService } from 'app/service/formation-db.service';
import { ToastService } from 'app/service/toast.service';

@Component({
  selector: 'app-addformation',
  templateUrl: './addformation.component.html',
  styleUrls: ['./addformation.component.css']
})
export class AddformationComponent implements OnInit {
  img: any
  id: string;
  actionPage: String = 'Ajouter formation';
  currentformation: any;
  postForm: FormGroup;
  formation: Formation
  newformation: Formation
  arrayForm: Formation = new Formation('', '', '', '', '', '', null, null, [])
  videos: any[]
  constructor(private router: Router, private route: ActivatedRoute
    , private formationService: FormationDbService, public toastService: ToastService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    if (this.id) {
      this.actionPage = 'Modifier formation';
      this.formationService.getOneformation(this.id).subscribe((data: any) => {
        this.arrayForm = data;
        this.postForm.patchValue(this.arrayForm);
        //this.list = data.listVideo
        console.log(this.arrayForm.imagef);
        
      });
    }

    this.postForm = new FormGroup
      ({
        nom: new FormControl(this.arrayForm.nom, Validators.required),
        dure: new FormControl(this.arrayForm.dure, Validators.required),
        nomformateur: new FormControl(this.arrayForm.nomformateur, Validators.required),
        description: new FormControl(this.arrayForm.description, Validators.required),
        prix: new FormControl(this.arrayForm.prix, Validators.required),

      })
  }
  selectFile(e: any) {

    this.img = e.target.files[0]
    console.log(this.img);
  }
  selectVideos(e: any) {
    this.videos = e.target.files
  }



  newFormation() {

    let formData = new FormData()
    formData.append('nom', this.postForm.controls.nom.value)
    formData.append('image', this.img)
    formData.append('description', this.postForm.controls.description.value)
    formData.append('dure', this.postForm.controls.dure.value)
    formData.append('nomformateur', this.postForm.controls.nomformateur.value)
    formData.append('prix', this.postForm.controls.prix.value)
    console.log(formData)
    if (this.actionPage == 'Ajouter formation') {
      this.formationService.addFormation(formData).subscribe(
        (res) => {
          console.log(res);
          this.toastService.show('Votre formation a été ajouté avec succé!', { classname: 'bg-success text-light', delay: 2000 });

          this.router.navigate(['/formation']);
        },
        (err) => {
          console.log(err);
          //notification error

        }
      );
    }
    else {
      this.formationService.upformation(formData, this.id).subscribe((data: any) => {
        this.newformation = data;
        console.log(this.newformation);
      });
      this.toastService.show('Votre formation a été modifié avec succé!', { classname: 'bg-success text-light', delay: 2000 });

      this.router.navigate(['/formation']);

    }
  }
}
