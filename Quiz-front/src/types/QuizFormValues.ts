import {QuizCategories} from "./QuizCategories";

export type QuizFormValues = {
    id?:string;
    title: string;
    description:string;
    category: string[];
    questions: {question:string, answers:{answer:string, isCorrect: boolean}[]}[];
    //@TODO zamienić kategorie na tablice stringów
}

