import {QuizCategories} from "./QuizCategories";

export type QuizFormValues = {
    id?:string;
    title: string;
    description:string;
    category: QuizCategories;
    questions: {question:string, answers:{answer:string, isCorrect: boolean}[]}[];

}

