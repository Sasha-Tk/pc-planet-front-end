import React, {useState} from 'react';
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom'
import './App.css';

import {Components} from "./components/Components";
import {Navigation} from "./components/Navigation";
import {ModalWindow} from "./components/ModalWindow";
import {Build} from "./components/Build";


function App() {

    const [darkThemeActive, setDarkThemeActive] = useState(false);

    return (
        <div className="App">
            <BrowserRouter>
                <Navigation/>
                <Routes>
                    <Route path={'/components'} element={<Components/>}/>
                    <Route path={'/create-build'} element={<Build/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
