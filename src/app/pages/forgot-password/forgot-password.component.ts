import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LearningDbService } from 'app/service/learning-db.service';
import { LocalstorageService } from 'app/service/localstorage.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  resetform: FormGroup;
  controls: any
  constructor(private _authService: LearningDbService, private _localstorage: LocalstorageService) { }

  ngOnInit(): void {
    this.resetform = new FormGroup
      ({
        email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      })
    this.controls = this.resetform.controls
  }
  onSubmit() {
    this._authService.forgotPassword(this.resetform.value).subscribe(
      (res: any) => {
        this._localstorage.settoken(res.token);
        this._localstorage.setuserId(res.token);
      },
      (err) => {
        console.log(err);
      }
    );;
  }
}
