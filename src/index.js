import React from "react"
import ReactDOM from "react-dom"
import { HashRouter, Routes, Route } from "react-router-dom"
// component file
import TodoContainer from "./functionBased/components/TodoContainer"

//stylesheet
import "./functionBased/App.css"

ReactDOM.render(
    <React.StrictMode>
        <HashRouter>
            <Routes>
                <Route path="*" element={<TodoContainer />}></Route>
            </Routes>
        </HashRouter>
    </React.StrictMode>,
    document.getElementById("root")
)