import {useForm} from "@mantine/form";
import {Question, QuizFormValues} from "../../../types/QuizFormValues";

export const useQuestionForm = () => {
    const form = useForm<Question>({
        initialValues: {
            answers:[{text:'', isCorrect:false},{text:'', isCorrect:false},{text:'', isCorrect:false},{text:'', isCorrect:false}],
            text:''

        },

        validate: {
            text :(value) => {
                if(value.length<3){
                    return "Question must be at least 3 characters long"
                }
            },

            answers: (values)=>{
                if(values.length<4){
                    return "Question must contain 4 answers"
                }
            }

        },
    });
    return form;
}