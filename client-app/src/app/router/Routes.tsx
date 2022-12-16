import { createBrowserRouter, RouteObject } from "react-router-dom";
import ActivityDasboard from "../../features/activities/dasboard/ActivityDasboard";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityForm from "../../features/activities/form/ActivityForm";
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
        ]
    }
];

export const router = createBrowserRouter(routes);