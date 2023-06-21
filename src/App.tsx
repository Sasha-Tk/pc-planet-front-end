import React, {createContext, useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom'
import './App.css';

import {Components} from "./pages/Components";
import {Navigation} from "./components/Navigation";
import {Build} from "./pages/Build";
import {Search} from "./pages/Search";
import {ComponentList} from "./pages/ComponentList";
import {Language} from "./components/Language";
import {Component} from "./pages/Component";
import {MyBuilds} from "./pages/MyBuilds";
import {Favorites} from "./pages/Favorites";
import {default as Axios} from "axios";

export const AppContext = createContext<any>(null);

function App() {
    const themeFromStorage = localStorage.getItem("darkThemeActive")
    const [darkThemeActive, setDarkThemeActive] = useState(themeFromStorage !== null ? JSON.parse(themeFromStorage) : false);
    const userFromStorage = localStorage.getItem("userInfo")
    const [user, setUser] = useState(userFromStorage !== null ? JSON.parse(userFromStorage) : null);
    const buildFromStorage = localStorage.getItem("currentBuild");
    const [favorites, setFavorites] = useState([]);
    const [currentBuild, setCurrentBuild] = useState(
        buildFromStorage !== null ?
            JSON.parse(buildFromStorage)
            : {})

    useEffect(() => {
        localStorage.setItem("currentBuild", JSON.stringify(currentBuild))
    }, [currentBuild])
    const [currentFiltersToApply, setCurrentFiltersToApply] = useState({
        motherboard: [],
        cpu: [],
        gpu: [],
        ram: [],
        psu: [],
        case: [],
        ssd: [],
        hdd: [],
        cpuFan: [],
        caseFan: []
    });

    const getComponentServerName = (name: any) => {
        const map: any = {
            motherboard: "motherboard",
            cpu: "cpu",
            gpu: "gpu",
            ram: "ram",
            psu: "psu",
            case: "computerCase",
            ssd: "ssd",
            hdd: "hdd",
            "cpu-fan": "cpuFan",
            "case-fan": "caseFan"
        }
        return map[name]
    }


    useEffect(() => {
        localStorage.setItem("userInfo", JSON.stringify(user))
        if (user) {
            Axios.get(`http://192.168.0.107:8080/api/v1/users/${user?.id}/favorites`, {
                headers: {
                    Authorization: user?.token
                }
            }).then(value => {
                setFavorites(value.data)
            })
        }
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
                    getComponentServerName,
                    favorites,
                    setFavorites
                }}>
                <Language>
                    <BrowserRouter>
                        <Navigation/>
                        <Routes>
                            <Route path={'/*'} element={<Components/>}/>
                            <Route path={'/components'} element={<Components/>}/>
                            <Route path={'/favorites'} element={<Favorites/>}/>
                            <Route path={'/create-build'} element={<Build/>}/>
                            <Route path={'/my-builds'} element={<MyBuilds/>}/>
                            <Route path={'/search/:search'} element={<Search/>}/>
                            <Route path={'/components/:categoryName/:page?'} element={<ComponentList/>}/>
                            <Route path={'/component/:categoryName/:id'} element={<Component/>}/>
                        </Routes>
                    </BrowserRouter>
                </Language>
            </AppContext.Provider>
        </div>
    );
}

export default App;
