import './css/index.css';
import * as React from "react";
import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Homepage from "./js/Homepage";
import Game from "./js/Game";
import Scoreboard from "./js/Scoreboard";
import GameOver from "./js/GameOver";
import Instructions from "./js/Instructions"
import 'primeicons/primeicons.css';
import 'react-bootstrap';
import 'bootstrap';



const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage />,
    },
    {
        path: "/game",
        element: <Game />,
    },
    {
        path: "/scoreboard",
        element: <Scoreboard />,
    },
    {
        path: "/gameover",
        element: <GameOver />,
    },
    {
        path: "/instructions",
        element: <Instructions />
    },
]);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);
