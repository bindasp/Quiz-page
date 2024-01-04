export type QuizFormValues = {
    id?:number;
    title:string;
    description:string;
    questions:Question[];

}

export type Question = {
    text:string;
    answers:{text:string, isCorrect:boolean}[];
    /*@TODO Dodać tablicę z poprawnymi odpowiedziami*/
    //@TODO  Użytkownik - formularz: Login, Email, Hasło,
    //@TODO  Użytkownik - dane: id - uuid, Login, isAdmin
    //@TODO dodać kategorie do quizu

}