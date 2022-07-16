import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Homepage from "./Homepage";
import SolarSystemContainer from "./SolarSystemContainer";
import QuizContainer from "./QuizContainer";
import Header from "../components/header/header"

const MainContainer = () => {

    const [planets, setPlanets] = useState([
        { name: 'mercury' },
        { name: 'venus' },
        { name: 'earth' },
        { name: 'mars' },
        { name: 'jupiter' },
        { name: 'saturn' },
        { name: 'uranus' },
        { name: 'neptune' }
    ])


    const [planetObjects, setPlanetObjects] = useState([]);

    const frenchAPI = 'https://api.le-systeme-solaire.net/rest/bodies/'


    const getFrenchPlanets = async () => {
        const promises = planets.map(planet => fetch(frenchAPI + planet.name).then(res => res.json()));
        const newPlanets = await Promise.all(promises);
        setPlanetObjects(newPlanets);
    }

    useEffect(() => {
        getFrenchPlanets()
    }, [])


    return (
        <>
            <Router>
                <Header />
                <Routes>
                    <Route
                        path="/"
                        element={<Homepage />}
                    />
                    <Route
                        path="/explore"
                        element={<SolarSystemContainer planets={planetObjects} />}
                    />
                    <Route
                        path="/quizzes"
                        element={<QuizContainer planets={planetObjects} />}
                    />
                </Routes>
            </Router>
            <h1>Main Container</h1>

        </>
    )
}

export default MainContainer;