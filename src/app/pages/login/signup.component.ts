import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LearningDbService } from 'app/service/learning-db.service';
import { LocalstorageService } from 'app/service/localstorage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

//import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userForm:FormGroup  
  controls:any
    test : Date = new Date();
    
      constructor(private authService:  LearningDbService,
        private router: Router,
       
        private loginservice :LocalstorageService) { 
         
        }

    ngOnInit() {  
      this.userForm = new FormGroup
      ({
        email: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        password: new FormControl('',[Validators.required]),
      });
      //console.log(this.userForm.controls);
      this.controls = this.userForm.controls
      }
    public login()
  {
   console.log(this.userForm.value);
      this.authService.login(this.userForm.value).subscribe(
        (res)=>{
          console.log(res);
          this.loginservice.setUseconnected(res.user );
          console.log(this.loginservice.lengthPanier());
          if (this.loginservice.lengthPanier() == 0)
          {
            this.router.navigate(['/home']);
          }
          else{ 
            this.router.navigate(['/panier']);
         }
         
        },
        (err)=>{console.log(err.error.msg);
        //notification error
      }
      );
  }
}
