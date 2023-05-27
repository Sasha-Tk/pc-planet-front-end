import {Link, useParams} from "react-router-dom";
import {ReactComponent as LightPlusIcon} from "../images/svg/light-add-item-to-build-icon.svg";
import {ReactComponent as LightCheckIcon} from "../images/svg/light-check-icon.svg";
import {ReactComponent as LightLiked} from "../images/svg/light-heart-icon-liked.svg";
import {ReactComponent as LightNotLiked} from "../images/svg/light-heart-icon-non-liked.svg";
import {ReactComponent as DarkLiked} from "../images/svg/dark-heart-icon-liked.svg";
import {ReactComponent as DarkNotLiked} from "../images/svg/dark-heart-icon-non-liked.svg";
import {Skeleton} from '@mui/material';
import 'react-loading-skeleton/dist/skeleton.css'
import {LazyLoadComponent, LazyLoadImage,} from "react-lazy-load-image-component";

import React, {useContext, useEffect, useRef, useState} from "react";
import {AppContext} from "../App";
import {ConfirmationWindow} from "./ConfirmationWindow";

export const ItemCard = (props: any) => {
    const {darkThemeActive, currentBuild, setCurrentBuild, setRegistrationWindowActive, user} = useContext(AppContext);
    const {categoryName} = useParams();
    const [itemLiked, setItemLiked] = useState(false);
    const [itemAddedToBuild, setItemAddedToBuild] = useState(categoryName !== undefined ? currentBuild[categoryName]?.sku === props.sku : false);

    const [deletingItemFromBuildMessage, setDeletingItemFromBuildMessage] = useState(false);
    // const [image, setImage] = useState(null);
    const image = useRef<HTMLImageElement>(null);
    const deleteItemFromBuild = () => {
        if (categoryName) {
            currentBuild[categoryName] = null
            setCurrentBuild({...currentBuild})
            setItemAddedToBuild(false)
        }
    }


    const handleAddingToBuild = () => {
        if (!user) {
            setRegistrationWindowActive(true)
            return
        }
        if (categoryName !== undefined) {
            if (!itemAddedToBuild) {
                currentBuild[categoryName] = {
                    id: props.id,
                    sku: props.sku,
                    name: props.itemName,
                    imageURL: props.imageURL
                }
                setItemAddedToBuild(true)
                setCurrentBuild({...currentBuild})
            } else {
                setDeletingItemFromBuildMessage(true)
            }

        }
    }
    const [isLoading, setIsLoading] = useState(true);
    // useEffect(() => {
    //     console.log(props.itemName, "loaded")
    // }, [isLoading])
    // // const {src, isLoading} = useImage({srcList:props.imageURL})
    // new Image().onload
    return (
        <div className="item-card">
            <Link to={props.itemLink}>
                <div className="item-pic-wrapper">
                    <div className="item-pic-holder">
                        <LazyLoadImage
                            className={`item-pic ${categoryName} ${isLoading ? "loading" : ""}`}
                            src={props.imageURL}
                            afterLoad={() => setIsLoading(false)}
                        />
                        {isLoading&&<Skeleton variant={"rounded"} animation={"wave"} width={260} height={224}/>}
                    </div>
                </div>
            </Link>
            <Link to={props.itemLink}>
                <p className="item-card-title">{props.itemName}</p>
            </Link>
            <div className="item-card-info">
                <div className="item-card-activity">
                    <div className="item-card-add-to-build"
                         onClick={() => {
                             handleAddingToBuild()
                         }}>
                        {itemAddedToBuild ? (darkThemeActive && <LightCheckIcon/>) || <LightCheckIcon/> :
                            (darkThemeActive && <LightPlusIcon/>) || < LightPlusIcon/>}
                    </div>
                    <div className="item-card-like" onClick={() => {
                        if (!user) {
                            setRegistrationWindowActive(true)
                        } else {
                            setItemLiked(!itemLiked)
                        }
                    }}>
                        {itemLiked ? (darkThemeActive && <DarkLiked/>) || <LightLiked/> :
                            (darkThemeActive && <DarkNotLiked/>) || < LightNotLiked/>}
                    </div>
                </div>
                <p className="item-card-price">
                    {props.price}
                </p>
            </div>
            <ConfirmationWindow
                message={"Are you sure you want to"}
                action={"delete item from build"}
                visibility={deletingItemFromBuildMessage}
                setVisibility={setDeletingItemFromBuildMessage}
                confirmationFunction={deleteItemFromBuild}
                rejectionFunction={() => {
                }}
            />
        </div>
    )
}