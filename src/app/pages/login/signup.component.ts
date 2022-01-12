import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LearningDbService } from 'app/service/learning-db.service';
import { LocalstorageService } from 'app/service/localstorage.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'app/service/toast.service';

//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  userForm: FormGroup
  controls: any
  test: Date = new Date();

  constructor(private authService: LearningDbService,
    private router: Router,
    public toastService: ToastService,
    private loginservice: LocalstorageService) {

  }

  ngOnInit() {
    this.userForm = new FormGroup
      ({
        email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        password: new FormControl('', [Validators.required]),
      });
    this.controls = this.userForm.controls
  }
  public login() {

    this.authService.login(this.userForm.value).subscribe(
      (res) => {

        this.loginservice.setUseconnected(res.user);
        if (this.loginservice.lengthPanier() == 0) {
          this.router.navigate(['/home']);
        }
        else {
          this.router.navigate(['/panier']);
        }

      },
      (err) => {
        this.toastService.show(err.error.msg, { classname: 'bg-warning text-white font-weight-bold px-2 py-1', delay: 4000 });
      }
    );
  }
}
