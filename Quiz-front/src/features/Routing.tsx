import {RouteObject, useRoutes} from "react-router-dom";
import {Layout} from "../components/Layout";
import {QuizList} from "./quiz/QuizList";
import {ErrorPage} from "./error/ErrorPage";
import QuizForm from "./quiz/QuizForm";
import LoginForm from "./authorization/LoginForm";
import RegisterForm from "./authorization/RegisterForm";
import Quiz from "./quiz/Quiz";

const routes: RouteObject[] = [
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
    return useRoutes(routes);
}