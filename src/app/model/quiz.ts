export class Quiz
{
    id:number=0;
    quizzTitle:string;
    questions :[Question]
    answered:boolean=false
    constructor(questions :[Question],quizzTitle : string,answered:boolean=false)
    {

        this.id=this.id++;
        this.questions=questions;
        this.quizzTitle=quizzTitle;
        this.answered=answered
    }
   
}

export class Question 
{
    textQuestion:string;
    indexOfBonneReponse : number; 
    suggestions : [string];
    indexOfUserReponse : number
    
}