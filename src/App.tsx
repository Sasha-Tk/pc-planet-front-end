import React, {createContext, useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css';

import {Components} from "./pages/Components";
import {Navigation} from "./components/Navigation";
import {Build} from "./pages/Build";
import {Search} from "./pages/Search";
import {ComponentList} from "./pages/ComponentList";
import {Language} from "./components/Language";

export const AppContext = createContext<any>(null);

function App() {
    const themeFromStorage = localStorage.getItem("darkThemeActive")
    const [darkThemeActive, setDarkThemeActive] = useState(themeFromStorage !== null ? JSON.parse(themeFromStorage) : false);
    const userFromStorage = localStorage.getItem("userInfo")
    const [user, setUser] = useState(userFromStorage !== null ? JSON.parse(userFromStorage) : null);
    const buildFromStorage = localStorage.getItem("currentBuild");
    const [currentBuild, setCurrentBuild] = useState(
        buildFromStorage !== null ?
            JSON.parse(buildFromStorage)
            : {
                motherboard: null,
                cpu: null,
                gpu: null,
                ram: null,
                psu: null,
                case: null,
            })
    const [currentFiltersToApply, setCurrentFiltersToApply] = useState({
        motherboard: [],
        cpu: [],
        gpu: [],
        ram: [],
        psu: [],
        case: [],
    });

    const getComponentServerName = (name: any) => {
        const map: any = {
            motherboard: "motherboard",
            cpu: "cpu",
            gpu: "gpu",
            ram: "ram",
            psu: "psu",
            case: "computerCase",
        }
        return map[name]
    }

    // useEffect(() => {
    //     console.log(currentFiltersToApply)
    // }, [currentFiltersToApply]);


    useEffect(() => {
        localStorage.setItem("userInfo", JSON.stringify(user))
    }, [user])
    useEffect(() => {
        localStorage.setItem("darkThemeActive", JSON.stringify(darkThemeActive))
    }, [darkThemeActive])

    const [registrationWindowActive, setRegistrationWindowActive] = useState(false);
    //TODO: FIX THEME VISUAL BLINKING WHILE RELOADING PAGE
    useEffect(() => {
        document.getElementsByTagName("html")[0].style.background =
            darkThemeActive ? "var(--html-bg-dark-theme)" : "var(--html-bg-light-theme)";
        document.body.id = darkThemeActive ? 'dark-theme' : 'light-theme'
    }, [darkThemeActive])

    return (
        <div className="App">
            <AppContext.Provider
                value={{
                    darkThemeActive,
                    setDarkThemeActive,
                    registrationWindowActive,
                    setRegistrationWindowActive,
                    user,
                    setUser,
                    currentBuild,
                    setCurrentBuild,
                    currentFiltersToApply,
                    setCurrentFiltersToApply,
                    getComponentServerName
                }}>
                <Language>
                        <BrowserRouter>
                            <Navigation/>
                            <Routes>
                                <Route path={'/components'} element={<Components/>}/>
                                <Route path={'/create-build'} element={<Build/>}/>
                                <Route path={'/search/:search'} element={<Search/>}/>
                                <Route path={'/components/:categoryName/:page?'} element={<ComponentList/>}/>
                            </Routes>
                        </BrowserRouter>
                </Language>
            </AppContext.Provider>
        </div>
    );
}

export default App;
