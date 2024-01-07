import {Navigate, RouteObject, useRoutes} from "react-router-dom";
import {Layout} from "../components/Layout";
import {QuizList} from "./quiz/QuizList";
import {ErrorPage} from "./error/ErrorPage";
import QuizForm from "./quiz/QuizForm";
import LoginForm from "./authorization/LoginForm";
import RegisterForm from "./authorization/RegisterForm";
import Quiz from "./quiz/Quiz";
import {useIsLogged} from "../hooks/useIsLogged";
import QuizResults from "./quiz/QuizResults";

const publicRoutes:RouteObject[]=[
    {
        path:'/',
        element:<Layout></Layout>,
        children:[
            {
                path:'/',
                element:<QuizList></QuizList>
            },
            {
                path:'/login',
                element:<LoginForm></LoginForm>
            },
            {
                path:'/register',
                element:<RegisterForm></RegisterForm>
            },
            {
                path: '*',
                element: <Navigate to ='/login' replace/>
            }
        ]
    }
]

const privateRoutes: RouteObject[] = [
    {
        path:"/",
        element: <Layout/>,
        children:[
            {
                path:'/',
                element: <QuizList/>
            },
            {
                path: '/quiz/new',
                element: <QuizForm/>
            },
            {
                path: '/quiz/:id',
                element: <Quiz/>
            },
            {
              path:'/quiz/:id/results',
              element:<QuizResults></QuizResults>
            },
            {
                path: '/login',
                element: <LoginForm/>
            },
            {
                path: '/register',
                element: <RegisterForm/>
            },
            {
                path: '*',
                element: <ErrorPage/>
            }
        ]
    }
]

export const Routing = () => {
    const isLogged = useIsLogged();
    const routes = isLogged ? privateRoutes:publicRoutes;
    return useRoutes(routes);
}