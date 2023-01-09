import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import ActivityDasboard from "../../features/activities/dasboard/ActivityDasboard";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityForm from "../../features/activities/form/ActivityForm";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import TestErrors from "../../features/errors/TestError";
import LoginForm from "../../features/users/LoginForm";
import App from "../layout/App";

export const routes: RouteObject[] = [
    {
        path:'/',
        element:<App />,
        children:[
            {path: 'activities', element: <ActivityDasboard /> },
            {path: 'activities/:id', element: <ActivityDetails /> },
            {path: 'createActivity', element: <ActivityForm key='create'/> },
            {path: 'manage/:id', element: <ActivityForm key='manage'/> },
            {path: 'login', element: <LoginForm/> },
            {path: 'errors', element: <TestErrors/> },
            {path: 'not-found', element: <NotFound/> },
            {path: '*', element: <Navigate replace to='/not-found'/> },
            {path: 'server-error', element: <ServerError/> },
        ]
    }
];

export const router = createBrowserRouter(routes);