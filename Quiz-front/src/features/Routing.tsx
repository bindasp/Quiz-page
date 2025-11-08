import { Navigate, RouteObject, useRoutes } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { QuizList } from './quiz/QuizList';
import { ErrorPage } from './error/ErrorPage';
import QuizForm from './quiz/QuizForm';
import LoginForm from './authorization/LoginForm';
import RegisterForm from './authorization/RegisterForm';
import Quiz from './quiz/Quiz';
import { useIsLogged } from '../hooks/useIsLogged';
import { MyQuizzes } from './quiz/MyQuizzes';
import { MyAttempts } from './quiz/MyAttempts';
import EditQuiz from './quiz/EditQuiz';
import { Admin } from './quiz/Admin';
import { useIsAdmin } from '../hooks/useIsAdmin';

const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Layout></Layout>,
    children: [
      {
        path: '/',
        element: <QuizList></QuizList>,
      },
      {
        path: '/quiz/:id',
        element: <Quiz />,
      },
      {
        path: '/login',
        element: <LoginForm></LoginForm>,
      },
      {
        path: '/register',
        element: <RegisterForm></RegisterForm>,
      },
      {
        path: '/quiz/new',
        element: <LoginForm></LoginForm>,
      },
      {
        path: '*',
        element: <Navigate to="/login" replace />,
      },
    ],
  },
];

const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <QuizList />,
      },
      {
        path: '/quiz/new',
        element: <QuizForm />,
      },
      {
        path: '/quiz/:id',
        element: <Quiz />,
      },
      {
        path: '/login',
        element: <LoginForm />,
      },
      {
        path: '/register',
        element: <RegisterForm />,
      },
      {
        path: '/quizzes',
        element: <MyQuizzes></MyQuizzes>,
      },
      {
        path: '/attempts',
        element: <MyAttempts></MyAttempts>,
      },
      {
        path: '/quiz/:id/edit',
        element: <EditQuiz></EditQuiz>,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
];

const adminRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <QuizList />,
      },
      {
        path: '/quiz/new',
        element: <QuizForm />,
      },
      {
        path: '/quiz/:id',
        element: <Quiz />,
      },
      {
        path: '/login',
        element: <LoginForm />,
      },
      {
        path: '/register',
        element: <RegisterForm />,
      },
      {
        path: '/quizzes',
        element: <MyQuizzes></MyQuizzes>,
      },
      {
        path: '/attempts',
        element: <MyAttempts></MyAttempts>,
      },
      {
        path: '/quiz/:id/edit',
        element: <EditQuiz></EditQuiz>,
      },
      {
        path: '/admin',
        element: <Admin></Admin>,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
];

export const Routing = () => {
  const isLogged = useIsLogged();
  const isAdmin = useIsAdmin();

  let routes;

  if (isLogged == true && isAdmin == true) {
    routes = adminRoutes;
  } 
  else if (isLogged == true && isAdmin == false) {
    routes = privateRoutes;
  }
  else if (isLogged == true && isAdmin == undefined) {
    routes = privateRoutes;
  }
  else {
    routes = publicRoutes;
  }

  console.log(routes);
  return useRoutes(routes);
};
