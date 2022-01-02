import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Quiz } from 'app/model/quiz';
import { QuizstorageService } from 'app/service/quizstorage.service';
import { ToastService } from 'app/service/toast.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private quizservice: QuizstorageService,
    public toastService: ToastService
  ) { }
  postForm: FormGroup;


  ngOnInit(): void {
    this.postForm = new FormGroup
      ({
        titreQuizz: new FormControl('', Validators.required),
        questions: new FormArray([new FormGroup({
          textQuestion: new FormControl('', Validators.required),
          indexOfBonneReponse: new FormControl(null),
          suggestions: new FormArray([new FormControl('', Validators.required)])
        })]),
      })
  }
  questionError(i: number) {
    const question = this.questions().at(i).get('textQuestion');
    //console.log(question);  
    return question?.touched && question?.hasError('required');

  }
  errorSugg(i: number, j: number) {
    const sugg = this.suggestions(i).at(j);
    //console.log(sugg);
    return sugg?.touched && sugg?.hasError('required');
  }
  suggestions(Qindex: number) {
    return this.questions().at(Qindex).get('suggestions') as FormArray;
  }
  questions() {
    return this.postForm.get('questions') as FormArray;
  }
  oneQuestion(i: number) {
    return this.questions().at(i) as FormGroup;
  }

  addQuestion() {
    this.questions().push(new FormGroup({
      textQuestion: new FormControl(''),
      indexOfBonneReponse: new FormControl(null),
      suggestions: new FormArray([])
    }))
  }
  removeSuggestion(i: number, j: number) {
    this.suggestions(i).removeAt(j);
  }
  addSuggestion(i: number) {
    this.suggestions(i).push(new FormControl(''))
  }
  correctResponse(i: number, j: number) {
    const sugg = this.suggestions(i).at(j);
    if (!sugg?.hasError('required')) {
      this.oneQuestion(i).patchValue({ indexOfBonneReponse: j })
    }
    else {
      this.toastService.show('Veuillez remplir ce champs', { classname: 'bg-warning text-white font-weight-bold px-2 py-1', delay: 2000 });

    }
  }
  verifyChecked(i: number, j: number) {
    const bonneReponseIndex = this.questions().at(i).get('indexOfBonneReponse');
    if (bonneReponseIndex?.value == null) {
      return true;
    }
    else
      if (bonneReponseIndex?.value == j) {
        return false;
      }
      else {
        return true
      }
  }

  verifierCheckedReponse() {
    const lengQuestion = this.questions().length;
    for (let i = 0; i < lengQuestion; i++) {
      const indexOf = this.oneQuestion(i).get('indexOfBonneReponse');
      // console.log(indexOf);
      if (indexOf?.value == null) {

        return i;
      }

    }
    return -1;

  }
  newElement() {
    const verif = this.verifierCheckedReponse()
    console.log(verif);
    if (verif == -1) {
      const quiz = new Quiz(this.postForm.controls.questions.value, this.postForm.controls.titreQuizz.value)

      this.quizservice.storeOnLocalStorage(quiz);
      this.toastService.show('Quizz ajoutée avec succé!', { classname: 'bg-success text-white font-weight-bold px-2 py-1', delay: 3000 });


    }
    else {
      this.toastService.show(`Veuillez cocher la reponse correcte du question N ${verif + 1}`, { classname: 'bg-danger text-white font-weight-bold px-2 py-1', delay: 2000 });


    }
  }
}
function question(question: any, arg1: FormControl) {
  throw new Error('Function not implemented.');

}
