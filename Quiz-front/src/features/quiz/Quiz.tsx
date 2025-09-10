import {
  Button,
  Checkbox,
  Paper,
  Radio,
  Stack,
  Text,
  Title,
  Textarea,
  Group,
} from '@mantine/core';
import { useLocation, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import '../styles/Quiz.css';
import { getQuizById } from '../../fetchFunctions/getFunctions';
import {
  saveQuizAttempt,
  saveMultipleQuizAnswers,
  saveQuizFeedback,
} from '../../fetchFunctions/postFunctions';

interface categoryData {
  id: number;
  name: string;
  description: string;
}

interface quizData {
  id?: string;
  title: string;
  description: string;
  category: categoryData[];
  questions: {
    question: string;
    question_number: number;
    answers: {
      answer: string;
      isCorrect: boolean;
      answer_number: number;
    }[];
  }[];
}

const shuffleArray = (
  array: { answer: string; isCorrect: boolean; answer_number: number }[],
): { answer: string; isCorrect: boolean; answer_number: number }[] => {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};
const Quiz = () => {
  const { id } = useParams();
  const [quizData, setQuizData] = useState<quizData | null>(null);
  const [showAnswers, setShowAnswers] = useState<boolean>(false);
  const [points, setPoints] = useState<number>(0);
  const [selected, setSelected] = useState<number[][]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<number[][]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState<boolean>(false);
  const [feedbackComment, setFeedbackComment] = useState<string>('');
  const [feedbackRating, setFeedbackRating] = useState<number>(0);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);
  const location = useLocation();
  const quizItem = location.state?.quizItem;
  useEffect(() => {
    // Set start time when quiz is loaded
    setStartTime(new Date());
    fetchData().then();
  }, [id]);
  const fetchData = async () => {
    const quiz = await getQuizById(id);
    if (quiz) {
      const data: quizData = quiz;
      const shuffledData = data.questions.map((question) => ({
        ...question,
        answers: shuffleArray(question.answers),
      }));
      setQuizData({ ...data, questions: shuffledData });
      initializeSelectedAnswers(data.questions);
      initializeCorrectAnswers(shuffledData);
    } else {
      console.error('Błąd podczas pobierania quizu');
    }
  };
  const handleCheckboxChange = (questionIndex: number, answerIndex: number) => {
    setSelected((prevSelected) => {
      const newSelected = [...prevSelected];

      newSelected[questionIndex][answerIndex] = 1;

      return newSelected;
    });
  };
  console.log(quizData);
  const handleRadioChange = (questionIndex: number, answerIndex: number) => {
    setSelected((prevSelected) => {
      const newSelected = [...prevSelected];
      for (let i = 0; i < newSelected[questionIndex].length; i++) {
        if (i == answerIndex) {
          newSelected[questionIndex][answerIndex] = 1;
        } else {
          newSelected[questionIndex][i] = 0;
        }
      }

      return newSelected;
    });
  };

  const initializeSelectedAnswers = (data: quizData['questions']) => {
    const initialSelected: number[][] = [];
    for (let i = 0; i < data.length; i++) {
      const questionAnswers: number[] = Array(data[i].answers.length).fill(0);
      initialSelected.push(questionAnswers);
    }
    setSelected(initialSelected);
  };

  const initializeCorrectAnswers = (data: quizData['questions']) => {
    const newCorrect: number[][] = [];

    for (let i = 0; i < data.length; i++) {
      newCorrect[i] = [];
      for (let j = 0; j < data[i].answers.length; j++) {
        if (data[i].answers[j].isCorrect) {
          newCorrect[i][j] = 1;
        } else {
          newCorrect[i][j] = 0;
        }
      }
    }
    setCorrectAnswers(newCorrect);
  };

  const calculatePoints = (
    userAnswers: number[][],
    correctAnswers: number[][],
  ) => {
    let totalPoints = 0;

    if (userAnswers && correctAnswers) {
      for (let i = 0; i < userAnswers.length; i++) {
        let questionPoints = 0;
        const correctCount = correctAnswers[i].reduce(
          (acc, current) => acc + current,
          0,
        );
        const incorrectCount = correctAnswers[i].length - correctCount;
        let correctSelected = 0;
        let incorrectSelected = 0;
        for (let j = 0; j < userAnswers[i].length; j++) {
          if (
            userAnswers[i][j] == correctAnswers[i][j] &&
            correctAnswers[i][j] == 1
          ) {
            correctSelected++;
          }
          if (
            userAnswers[i][j] != correctAnswers[i][j] &&
            userAnswers[i][j] == 1
          ) {
            incorrectSelected++;
          }
        }

        questionPoints += correctSelected / correctCount;
        questionPoints -= incorrectSelected / incorrectCount;
        if (questionPoints < 0) questionPoints = 0;
        totalPoints += questionPoints;
      }
    }
    return totalPoints;
  };

  const handleSubmit = () => {
    if (selected && correctAnswers) {
      const newPoints = calculatePoints(selected, correctAnswers);
      setPoints(newPoints);
      setShowAnswers(true);
      setShowFeedbackForm(true);

      // Capture completion time
      const completionTime = new Date();

      // Save quiz attempt to database with start and completion times
      saveQuizAttempt(id, startTime || undefined, completionTime)
        .then((response) => {
          console.log('Quiz attempt saved successfully', response);

          // Prepare answers array for saving
          const answers: { question_number: number; answer_number: number }[] =
            [];

          // Loop through all selected answers
          for (
            let questionIndex = 0;
            questionIndex < selected.length;
            questionIndex++
          ) {
            for (
              let answerIndex = 0;
              answerIndex < selected[questionIndex].length;
              answerIndex++
            ) {
              // If this answer is selected (value is 1)
              if (selected[questionIndex][answerIndex] === 1 && quizData) {
                answers.push({
                  question_number:
                    quizData.questions[questionIndex].question_number,
                  answer_number:
                    quizData.questions[questionIndex].answers[answerIndex]
                      .answer_number,
                });
              }
            }
          }
          console.log('Odpowiedzi');
          console.log(answers);

          if (answers.length > 0) {
            console.log(id);
            saveMultipleQuizAnswers(id, answers)
              .then((response) => {
                console.log('Quiz answers saved successfully', response);
              })
              .catch((error) => {
                console.error('Error saving quiz answers', error);
              });
          }
        })
        .catch((error) => {
          console.error('Error saving quiz attempt', error);
        });
    }
  };

  const handleFeedbackSubmit = () => {
    if (feedbackRating === 0) {
      alert('Proszę ocenić quiz przed wysłaniem opinii');
      return;
    }

    saveQuizFeedback(id, feedbackComment, feedbackRating)
      .then((response) => {
        console.log('Quiz feedback saved successfully', response);
        setFeedbackSubmitted(true);
      })
      .catch((error) => {
        console.error('Error saving quiz feedback', error);
      });
  };
  return (
    <div>
      <Stack>
        <Title m={'auto'}>{quizItem.title}</Title>
        <Text display={!showAnswers ? 'none' : ''} ta={'center'}>
          Twój wynik to: {points}/{quizData?.questions.length}
        </Text>
        {quizData?.questions.map((item, questionIndex) => (
          <Paper
            withBorder={true}
            shadow="xs"
            style={{
              width: '60%',
              marginBottom: '20px',
              margin: 'auto',
              padding: '16px',
            }}
            key={item.question}
          >
            <p>{item.question}</p>
            {correctAnswers[questionIndex].reduce(
              (acc, current) => acc + current,
              0,
            ) > 1 ? (
              <div>
                {item.answers.map((answer, index) => (
                  <div>
                    <Checkbox
                      label={answer.answer}
                      className={
                        showAnswers
                          ? answer.isCorrect
                            ? 'correct'
                            : 'incorrect'
                          : ''
                      }
                      color={
                        showAnswers ? (answer.isCorrect ? 'lime' : 'red') : ''
                      }
                      onChange={() =>
                        handleCheckboxChange(questionIndex, index)
                      }
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <Radio.Group>
                  <Stack>
                    {item.answers.map((answer, index) => (
                      <Radio
                        value={answer.answer}
                        label={answer.answer}
                        onChange={() => handleRadioChange(questionIndex, index)}
                        color={
                          showAnswers ? (answer.isCorrect ? 'lime' : 'red') : ''
                        }
                      />
                    ))}
                  </Stack>
                </Radio.Group>
              </div>
            )}
            {showAnswers ? (
              <div className={'correct-answers'}>
                Poprawne odpowiedzi:{' '}
                {item.answers
                  .filter((answer) => answer.isCorrect)
                  .map((answer) => answer.answer)
                  .join(', ')}
              </div>
            ) : (
              <div></div>
            )}
          </Paper>
        ))}

        <Button
          display={showAnswers ? 'none' : ''}
          style={{ width: '60%', margin: 'auto' }}
          onClick={handleSubmit}
        >
          Zatwierdź odpowiedzi
        </Button>

        {showFeedbackForm && !feedbackSubmitted && (
          <Paper
            withBorder={true}
            shadow="xs"
            style={{
              width: '60%',
              marginBottom: '20px',
              margin: 'auto',
              padding: '16px',
              marginTop: '20px',
            }}
          >
            <Title order={3} ta="center" mb={15}>
              Oceń quiz
            </Title>
            <Text mb={10}>Twoja ocena:</Text>
            <Group justify="center" mb={15}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginRight: 10,
                }}
              >
                <Text mb={5}>1</Text>
                <Checkbox
                  checked={feedbackRating === 1}
                  onChange={() => setFeedbackRating(1)}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginRight: 10,
                }}
              >
                <Text mb={5}>2</Text>
                <Checkbox
                  checked={feedbackRating === 2}
                  onChange={() => setFeedbackRating(2)}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginRight: 10,
                }}
              >
                <Text mb={5}>3</Text>
                <Checkbox
                  checked={feedbackRating === 3}
                  onChange={() => setFeedbackRating(3)}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  marginRight: 10,
                }}
              >
                <Text mb={5}>4</Text>
                <Checkbox
                  checked={feedbackRating === 4}
                  onChange={() => setFeedbackRating(4)}
                />
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Text mb={5}>5</Text>
                <Checkbox
                  checked={feedbackRating === 5}
                  onChange={() => setFeedbackRating(5)}
                />
              </div>
            </Group>
            <Textarea
              placeholder="Twój komentarz (opcjonalnie)"
              value={feedbackComment}
              onChange={(e) => setFeedbackComment(e.currentTarget.value)}
              minRows={3}
              mb={15}
            />
            <Button onClick={handleFeedbackSubmit} style={{ width: '100%' }}>
              Wyślij opinię
            </Button>
          </Paper>
        )}

        {feedbackSubmitted && (
          <Paper
            withBorder={true}
            shadow="xs"
            style={{
              width: '60%',
              marginBottom: '20px',
              margin: 'auto',
              padding: '16px',
              marginTop: '20px',
            }}
          >
            <Text ta="center" size="lg" fw={500} color="green">
              Dziękujemy za Twoją opinię!
            </Text>
          </Paper>
        )}
      </Stack>
    </div>
  );
};
export default Quiz;
