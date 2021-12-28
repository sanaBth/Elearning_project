import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LearningDbService } from 'app/service/learning-db.service';
import { LocalstorageService } from 'app/service/localstorage.service';
import { ConfirmedValidator } from '../passwordmuch';
enum TokenStatus {
  Validating,
  Valid,
  Invalid
}

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  TokenStatus = TokenStatus;
  tokenStatus = TokenStatus.Validating;
  
  loading = false;
  valid : boolean;
  id : string;
  token : string;
  resetform: FormGroup;
  controls:any 
  constructor(private route: ActivatedRoute,private _authService:  LearningDbService,  private _localstorage :LocalstorageService) { }


  ngOnInit(): void {
    this.token = this.route.snapshot.params.token;
   this.id = this.route.snapshot.params.id;
    const tokenStored =this._localstorage.gettoken();
    console.log({token:this.token,tokenStored});
     
    if (this.token == tokenStored)
    {
      this.valid=true;
    }
    else
    {
      this.valid=false;
    }
    console.log(tokenStored);

    this.resetform = new FormGroup
    ({
      password: new FormControl('',[Validators.required,Validators.minLength(6)]),
      confirmPassword:new FormControl ('', Validators.required),
    } , this.passwordConfirming)
  this.controls = this.resetform.controls
  
  }

  passwordConfirming(c: AbstractControl): any{
    if (c.get('password')?.value !== c.get('confirmpassword')?.value) {
        return {invalid: true};
    }
}
  // custom validator to check that two fields match
  checkIfMatchingPasswords(controlName: string, matchingControlName: string) {
      return (formGroup: FormGroup) => {
          const control = formGroup.controls[controlName];
          const matchingControl = formGroup.controls[matchingControlName];
  
          if (matchingControl.errors && !matchingControl.errors.mustMatch) {
              // return if another validator has already found an error on the matchingControl
              return;
          }
  
          // set error on matchingControl if validation fails
          if (control.value !== matchingControl.value) {
              matchingControl.setErrors({ mustMatch: true });
          } else {
              matchingControl.setErrors(null);
          }
      }
  }

  onSubmit() {
   if (this.valid==true)
   {
     this._authService.resetpassword(this.id,this.token,this.resetform.controls.password.value).subscribe(
      (res)=>{
        console.log(res);
       

      //this.toastr.success('Bienvenue');
      },
      (err)=>{console.log(err);
      //notification error
    
    }
    );
   }
   // 
  }
}
