import {Link} from "react-router-dom";
import {ProfileModalWindow} from "./ProfileModalWindow";
import React from "react";

export const NavigationLinks = (props:any)=>{
    return(
        <div className="navigation-links">
            <Link to={'/components'}>
                <div className={'link'}>Components</div>
            </Link>
            <Link to={'/create-build'}>
                <div className={'link'}>Create build</div>
            </Link>
            <Link to={'/guides'}>
                <div className={'link'}>Guides</div>
            </Link>
            <div className="drop-down">
                <div className={'modal-window-button skip-class'}
                     onClick={() => props.setProfileWindowVisible(!props.profileWindowVisible)}>
                    Profile
                </div>
                <div className="drop-down-menu">
                    <ProfileModalWindow/>
                </div>
            </div>
        </div>
    )
}