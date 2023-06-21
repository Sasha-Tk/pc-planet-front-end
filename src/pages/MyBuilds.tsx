import {BuildCard} from "../components/BuildCard";
import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../App";
import axios from "axios";

export const MyBuilds = () => {
    const {user} = useContext(AppContext)
    const [builds, setBuilds] = useState([]);
    useEffect(() => {
        axios.get(`http://192.168.0.107:8080/api/v1/users/${user.id}/builds`, {
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(value => {
            setBuilds(value.data)
        })
    }, [user])

    return (
        <div className="content">
            <div className="builds-list">
                {builds.map((value, index) => <BuildCard key={index} build={value} builds={builds} setBuilds={setBuilds}/>)}
            </div>
        </div>
    )
}