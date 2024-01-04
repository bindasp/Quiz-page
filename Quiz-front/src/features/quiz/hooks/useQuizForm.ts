import {useForm} from "@mantine/form";
import {QuizFormValues} from "../../../types/QuizFormValues";
import {QuizCategories} from "../../../types/QuizCategories";

export const useQuizForm = () => {
    const form = useForm<QuizFormValues>({
        initialValues: {
            title:"",
            description:"",
            questions: [{question:"", correctAnswers:[], incorrectAnswers:[]}],
            category: QuizCategories.brak,

        },

        validate: {
            title :(value) => {
                if(value.length<3){
                    return "title must be at least 3 characters long"
                }
            },
            questions : (questions)=> {
                if(!questions ||  questions.length<1){
                    return "At least one question is required"
                }
            },

        },
    });
    return form;
}