import React, {createContext, useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';

import {Components} from "./components/Components";
import {Navigation} from "./components/Navigation";
import {Build} from "./components/Build";
import {SignUpSignInWindow} from "./components/SignUpSignInWindow";

export const AppContext = createContext<any>(null);

function App() {
    const [darkThemeActive, setDarkThemeActive] = useState(true);
    // setInterval(() => {
    //     setDarkThemeActive(prevState => !prevState);
    // }, 1000)
    const [registrationWindowActive, setRegistrationWindowActive] = useState(false);
    useEffect(() => {
        document.getElementsByTagName("html")[0].style.background =
            darkThemeActive ? "var(--html-bg-dark-theme)" : "var(--html-bg-light-theme)";
        document.body.id = darkThemeActive ? 'dark-theme' : 'light-theme'
    }, [darkThemeActive])

    return (
        <div className="App">
            <AppContext.Provider
                value={{darkThemeActive, setDarkThemeActive, registrationWindowActive, setRegistrationWindowActive}}>
                <BrowserRouter>
                    <Navigation/>

                    <Routes>
                        <Route path={'/components'} element={<Components/>}/>
                        <Route path={'/create-build'} element={<Build/>}/>
                    </Routes>
                </BrowserRouter>
            </AppContext.Provider>

        </div>
    );
}

export default App;
