import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Video } from 'app/model/video';
import { FormationDbService } from 'app/service/formation-db.service';
import { ToastService } from 'app/service/toast.service';

@Component({
  selector: 'app-addvideo',
  templateUrl: './addvideo.component.html',
  styleUrls: ['./addvideo.component.css']
})
export class AddvideoComponent implements OnInit {
  video: any
  id: string
  actionPage: String = 'Ajouter vidéo';
  formation: any;
  progress: number = 0;
  arrayForm: Video = new Video('', '', '', '');
  newformation: Video;
  postForm: FormGroup;
  constructor(public toastService: ToastService, private route: ActivatedRoute, private router: Router, private formationservice: FormationDbService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    if (this.id) {
      this.actionPage = 'Modifier vidéo ';
      this.formationservice.getOnevideo(this.id).subscribe((data: any) => {
        this.arrayForm = data;
        this.postForm.patchValue(this.arrayForm);
        //this.list = data.listVideo
        console.log(this.arrayForm);
      });
    }

    //liste des formations
    this.formationservice.getFormations().subscribe((data: any) => {
      this.formation = data;
      /// let id = this.formation._id;
      console.log(this.formation);
    });

    this.postForm = new FormGroup
      ({
        name: new FormControl(this.arrayForm.name, Validators.required),
        dure: new FormControl(this.arrayForm.dure, Validators.required),
        description: new FormControl(this.arrayForm.description, Validators.required),
        lienVideo: new FormControl(this.arrayForm.link, Validators.required),
      })

  }

  selectFile(e: any) {
    this.video = e.target.files[0]
    console.log(this.video);
  }

  selectId(e: any) {
    this.id = e.target.value;
    console.log(this.id);
  }
  newVideo() {
    let formData = new FormData()
    formData.append('name', this.postForm.controls.name.value)
    formData.append('video', this.video)
    formData.append('description', this.postForm.controls.description.value)
    formData.append('dure', this.postForm.controls.dure.value)
    console.log(formData)
    console.log(this.id)
    if (this.actionPage == 'Ajouter vidéo') {
      this.formationservice.addVideo(formData, this.id).subscribe(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              console.log('Request has been made!');
              break;
            case HttpEventType.ResponseHeader:
              console.log('Response header has been received!');
              break;
            case HttpEventType.UploadProgress:
              this.progress = Math.round(event.loaded / event.total * 100);
              console.log(`Uploaded! ${this.progress}%`);
              break;
            case HttpEventType.Response:
              console.log('User successfully created!', event.body);
              setTimeout(() => {
                this.progress = 0;
              }, 1500);

          }
          this.toastService.show('Votre vidéo a été ajoutée avec succé!', { classname: 'bg-success text-white font-weight-bold px-2 py-1', delay: 3000 });

          this.router.navigate(['/home']);
        },
        (err) => {
          console.log(err);
          //notification error
        });
    }
    else {
      this.formationservice.upvideo(formData, this.id).subscribe((data: any) => {
        this.newformation = data;
        console.log(this.newformation);
      });
      this.toastService.show('Votre vidéo a été modifiée avec succé!', { classname: 'bg-success text-white font-weight-bold px-2 py-1', delay: 3000 });

      this.router.navigate(['/home']);

    }
  }
}
