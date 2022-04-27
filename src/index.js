import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter, Routes, Route } from "react-router-dom"
// component file
import TodoContainer from "./functionBased/components/TodoContainer"

//stylesheet
import "./functionBased/App.css"

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="*" element={<TodoContainer />}></Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
)