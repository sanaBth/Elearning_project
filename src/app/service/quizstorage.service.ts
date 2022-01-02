import { Injectable } from '@angular/core';
import { Quiz } from 'app/model/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizstorageService {
  constructor() { }
  public questions: Quiz[] = []
  public storeOnLocalStorage(quiz: Quiz): void {
    // get array of tasks from local storage
    this.questions = JSON.parse(localStorage.getItem('Quiz') || '[]');
    // push new task to array
    this.questions.push(quiz);
    // insert updated array to local storage
    localStorage.setItem('Quiz', JSON.stringify(this.questions));

  }
  getQuiz(): Quiz[] {

    return JSON.parse(localStorage.getItem('Quiz') || '[]');

  }
}
