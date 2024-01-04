import {QuizCategories} from "./QuizCategories";

export type QuizFormValues = {
    id?:number;
    title:string;
    description:string;
    category: QuizCategories;
    questions: {question:string, correctAnswers:string[], incorrectAnswers:string[]}[];

}

    //@TODO  Użytkownik - formularz: Login, Email, Hasło,
    //@TODO  Użytkownik - dane: id - uuid, Login, isAdmin
    //@TODO dodać kategorie do quizu
