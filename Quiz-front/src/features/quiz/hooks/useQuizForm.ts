import {useForm} from "@mantine/form";
import {QuizFormValues} from "../../../types/QuizFormValues";

export const useQuizForm = () => {
    const form = useForm<QuizFormValues>({
        initialValues: {
            title:"",
            description:"",
            questions: []

        },

        validate: {
            title :(value) => {
                if(value.length<3){
                    return "title must be at least 3 characters long"
                }
            },
            questions : (questions)=> {
                if(questions.length<1){
                    return "At least one question is required"
                }
            },

        },
    });
    return form;
}