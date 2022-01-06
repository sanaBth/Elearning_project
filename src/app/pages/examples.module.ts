import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';


import { LandingComponent } from './landing/landing.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './login/signup.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { FormationComponent } from './formation/formation.component';
import { HeaderNotTransparentComponent } from './header-not-transparent/header-not-transparent.component';
import { AddformationComponent } from './addformation/addformation.component';
import { AddvideoComponent } from './addvideo/addvideo.component';
import { DetailformationComponent } from './detailformation/detailformation.component';
import { PipePipe } from '../pipe/pipe.pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PagesnotfoundComponent } from './pagesnotfound/pagesnotfound.component';
import { PanierComponent } from './panier/panier.component';
import { ListeCommandeComponent } from './liste-commande/liste-commande.component';
import { QuizComponent } from './quiz/quiz.component';
import { ProfiluserComponent } from './profiluser/profiluser.component';
import { HomeComponent } from './home/home.component';
import { UserlistComponent } from './userlist/userlist.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
        RouterModule,
        Ng2SearchPipeModule,
        
    // ToastrModule added
  
    ],
    declarations: [
        LandingComponent,
        SignupComponent,
        ProfileComponent,
        RegisterComponent,
        HeaderComponent,
        ForgotPasswordComponent,
        ResetpasswordComponent,
        FormationComponent,
        HeaderNotTransparentComponent,
        AddformationComponent,
        AddvideoComponent,
        DetailformationComponent,
        PipePipe,
        PagesnotfoundComponent,
        PanierComponent,
        ListeCommandeComponent,
        QuizComponent,
        ProfiluserComponent,
        HomeComponent,
        UserlistComponent,
        
        
    ]
})
export class ExamplesModule { }
