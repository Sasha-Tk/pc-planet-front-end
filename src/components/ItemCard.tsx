import {Link, useParams} from "react-router-dom";
import {ReactComponent as LightPlusIcon} from "../images/svg/light-add-item-to-build-icon.svg";
import {ReactComponent as LightCheckIcon} from "../images/svg/light-check-icon.svg";
import {ReactComponent as LightLiked} from "../images/svg/light-heart-icon-liked.svg";
import {ReactComponent as LightNotLiked} from "../images/svg/light-heart-icon-non-liked.svg";
import {ReactComponent as DarkLiked} from "../images/svg/dark-heart-icon-liked.svg";
import {ReactComponent as DarkNotLiked} from "../images/svg/dark-heart-icon-non-liked.svg";
import {Skeleton} from '@mui/material';
import 'react-loading-skeleton/dist/skeleton.css'
import {LazyLoadImage,} from "react-lazy-load-image-component";

import React, {useContext, useEffect, useRef, useState} from "react";
import {AppContext} from "../App";
import {ConfirmationWindow} from "./ConfirmationWindow";
import axios from "axios";

export const ItemCard = (props: any) => {
    const {darkThemeActive, currentBuild, setCurrentBuild, setRegistrationWindowActive, user, getComponentServerName, favorites, setFavorites} = useContext(AppContext);
    const {categoryName} = useParams();
    const [itemLiked, setItemLiked] = useState(
        favorites.filter((favorite: any) => favorite.id === props.id).length > 0
    );
    const [itemAddedToBuild, setItemAddedToBuild] = useState(categoryName !== undefined ? currentBuild[getComponentServerName(categoryName)]?.sku === props.sku : false);
    const [deletingItemFromBuildMessage, setDeletingItemFromBuildMessage] = useState(false);
    const [replacingItemFromBuildMessage, setReplacingItemFromBuildMessage] = useState(false);
    // const [image, setImage] = useState(null);
    const image = useRef<HTMLImageElement>(null);
    const deleteItemFromBuild = () => {
        if (categoryName) {
            currentBuild[getComponentServerName(categoryName)] = null
            setCurrentBuild({...currentBuild})
            setItemAddedToBuild(false)
        }
    }

    useEffect(() => {
        setItemAddedToBuild(categoryName !== undefined ? currentBuild[getComponentServerName(categoryName)]?.sku === props.sku : false)
    }, [currentBuild])

    const replaceItemFromBuild = () => {
        if (categoryName) {
            currentBuild[getComponentServerName(categoryName)] = props.component
            setItemAddedToBuild(true)
            setCurrentBuild({...currentBuild})
        }
    }
    useEffect(() => {
        setItemLiked(favorites.filter((favorite: any) => favorite.id === props.id).length > 0)
    }, [favorites]);


    const handleAddingToBuild = () => {
        if (categoryName !== undefined) {
            if (!itemAddedToBuild) {
                if (currentBuild[getComponentServerName(categoryName)]) {
                    setReplacingItemFromBuildMessage(true)
                } else {
                    currentBuild[getComponentServerName(categoryName)] = props.component
                    setItemAddedToBuild(true)
                    setCurrentBuild({...currentBuild})
                }
            } else {
                setDeletingItemFromBuildMessage(true)
            }
        }
    }

    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="item-card">
            <Link to={props.itemLink}>
                <div className="item-pic-wrapper">
                    <div className="item-pic-holder">
                        <LazyLoadImage
                            className={`item-pic ${isLoading ? "loading" : ""}`}
                            src={props.imageURL}
                            afterLoad={() => setIsLoading(false)}
                        />
                        {isLoading && <Skeleton variant={"rounded"} animation={"wave"} width={260} height={224}/>}
                    </div>
                </div>
            </Link>
            <Link to={props.itemLink}>
                <p className="item-card-title">{props.itemName}</p>
            </Link>
            <div className="item-card-info">
                <div className="item-card-activity">
                    {categoryName &&
                        <div className="item-card-add-to-build"
                             onClick={() => {
                                 handleAddingToBuild()
                             }}>
                            {itemAddedToBuild ? (darkThemeActive && <LightCheckIcon/>) || <LightCheckIcon/> :
                                (darkThemeActive && <LightPlusIcon/>) || < LightPlusIcon/>}
                        </div>}
                    <div className="item-card-like" onClick={() => {
                        if (!user) {
                            setRegistrationWindowActive(true)
                        } else {
                            if (!itemLiked) {
                                axios.post(`http://192.168.0.107:8080/api/v1/users/${user.id}/favorites/${props.id}`, {
                                    headers: {
                                        Authorization: user.token
                                    }
                                }).then(value => {
                                    setFavorites(value.data)
                                })
                            } else {
                                axios.delete(`http://192.168.0.107:8080/api/v1/users/${user.id}/favorites/${props.id}`, {
                                    headers: {
                                        Authorization: user.token
                                    }
                                }).then(value => {
                                    setFavorites(value.data)
                                })
                            }
                        }
                    }}>
                        {itemLiked ? (darkThemeActive && <DarkLiked/>) || <LightLiked/> :
                            (darkThemeActive && <DarkNotLiked/>) || < LightNotLiked/>}
                    </div>
                </div>
                <p className="item-card-price">
                    {props.price} ₴
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
            <ConfirmationWindow
                message={"Are you sure you want to"}
                action={"replace item from build"}
                visibility={replacingItemFromBuildMessage}
                setVisibility={setReplacingItemFromBuildMessage}
                confirmationFunction={replaceItemFromBuild}
                rejectionFunction={() => {
                }}
            />
        </div>
    )
}