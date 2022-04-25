import React from "react"
import { Route, Routes, Link } from "react-router-dom"
import SinglePage from "./SinglePage"

const About = () => {
    return (
        <div>
            <ul>
                <li>
                    <Link to={"about-app"}>About App</Link>
                </li>
                <li>
                    <Link to={"about-me"}>About Author</Link>
                </li>
            </ul>
            <Routes>
                <Route path=":slug" element={
                    <SinglePage />
                }></Route>
            </Routes>
        </div>
    )
}
export default About