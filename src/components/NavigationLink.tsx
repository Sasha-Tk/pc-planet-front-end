import {NavLink} from "react-router-dom";
import React from "react";

export const NavigationLink = (props: any) => {
    return (
        <NavLink to={props.link} className={props => props.isActive ? 'link active-link' : 'link'}>
            {props.children}
        </NavLink>
    )
}