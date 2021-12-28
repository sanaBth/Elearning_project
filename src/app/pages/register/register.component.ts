import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LearningDbService } from 'app/service/learning-db.service';
import { LocalstorageService } from 'app/service/localstorage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userForm:FormGroup;
  test : Date = new Date();
  controls:any  
  constructor(private _authService:  LearningDbService,
    private router: Router) { }

ngOnInit() {  
  this.userForm = new FormGroup
    ({
      email: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('',Validators.required),
      username: new FormControl('',Validators.required),
    })
    this.controls = this.userForm.controls
  }
  public saveUser()
  { 
    
   this._authService.register(this.userForm.value).subscribe((res) => {
    if (res) {
   //  this.signupForm.reset()
      this.router.navigate(['/login']);
    }
  })
  }

}
