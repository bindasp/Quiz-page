import { useForm } from '@mantine/form';
import { QuizFormValues } from '../../../types/QuizFormValues';

export const useQuizForm = () => {
  const form = useForm<QuizFormValues>({
    initialValues: {
      title: '',
      description: '',
      questions: [
        { question: '', answers: [{ answer: '', isCorrect: false }] },
      ],
      category: ['brak'],
    },

    validate: {
      title: (value) => {
        if (value.length < 3) {
          return 'Tytuł musi zawierać conajmniej 3 znaki';
        }
      },
      questions: (questions) => {
        if (!questions || questions.length < 1) {
          return 'Quiz musi zawierać conajmniej jedno pytanie';
        }
      },
    },
  });
  return form;
};
