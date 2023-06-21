import {Link, NavLink, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {ReactComponent as LightPlusIcon} from "../images/svg/light-add-item-to-build-icon.svg";
import {ReactComponent as LightCheckIcon} from "../images/svg/light-check-icon.svg";
import {ReactComponent as LightLiked} from "../images/svg/light-heart-icon-liked.svg";
import {ReactComponent as LightNotLiked} from "../images/svg/light-heart-icon-non-liked.svg";
import {ReactComponent as DarkLiked} from "../images/svg/dark-heart-icon-liked.svg";
import {ReactComponent as DarkNotLiked} from "../images/svg/dark-heart-icon-non-liked.svg";
import {CharacteristicLine} from "../components/CharacteristicLine";
import axios, {default as Axios} from "axios";
import {cardsInfo} from "./Components";
import {AppContext} from "../App";
import {useTranslation} from "../components/Language";
import Tooltip from "@mui/material/Tooltip";
import {ConfirmationWindow} from "../components/ConfirmationWindow";

export const Component = (props: any) => {
    const {darkThemeActive, favorites, setFavorites, currentBuild, user, setRegistrationWindowActive, getComponentServerName, setCurrentBuild} = useContext(AppContext)
    const {categoryName, id} = useParams();
    const [componentInfo, setComponentInfo] = useState<any>(null);
    const [characteristics, setCharacteristics] = useState<any>(null);
    const [offers, setOffers] = useState<any>([]);
    const [deletingItemFromBuildMessage, setDeletingItemFromBuildMessage] = useState(false);
    const [itemLiked, setItemLiked] = useState(false)
    const [itemAddedToBuild, setItemAddedToBuild] = useState(false);
    const {translate} = useTranslation()
    useEffect(() => {
        Axios.get(`http://192.168.0.107:8080/api/v1/components/${categoryName}/${id}`, {}).then(value => {
            console.log(value.data)
            setComponentInfo(value.data)
            Axios.get(`http://192.168.0.107:8080/api/v1/components/${id}/offers`).then(value => setOffers(value.data))
        })
    }, [categoryName, id])

    const handleAddingToBuild = () => {
        if (categoryName !== undefined) {
            if (!itemAddedToBuild) {
                currentBuild[getComponentServerName(categoryName)] = componentInfo
                setItemAddedToBuild(true)
                setCurrentBuild({...currentBuild})
            } else {
                setDeletingItemFromBuildMessage(true)
            }
        }
    }

    useEffect(() => {
        if (componentInfo && categoryName) {
            let characteristicsFromComponentInfo = {...componentInfo}
            delete characteristicsFromComponentInfo.imageURL
            delete characteristicsFromComponentInfo.componentName
            delete characteristicsFromComponentInfo.sku
            delete characteristicsFromComponentInfo.lowerPrice
            delete characteristicsFromComponentInfo.id
            if (characteristicsFromComponentInfo.size) {
                characteristicsFromComponentInfo.size = [characteristicsFromComponentInfo.size.join(" x ")]
            }
            setCharacteristics(characteristicsFromComponentInfo)
            setItemLiked(favorites.filter((favorite: any) => favorite.sku === componentInfo?.sku).length > 0)
            setItemAddedToBuild(currentBuild[getComponentServerName(categoryName)]?.sku === componentInfo?.sku)
        }
    }, [componentInfo, favorites, currentBuild]);

    return (
        <div className="content">
            <div className="component">
                <div className="page-ref-and-filter-buttons">
                    <div className="current-page-ref">
                        <Link to={"/components"}>
                            <div className="prev-page">
                                {translate("Components")}
                            </div>
                        </Link>
                        <div className="page-splitter">
                            <span className="circle"></span>
                        </div>
                        <Link to={`/components/${categoryName}`}>
                            <div className="current-page">
                                {translate(cardsInfo.filter(cardInfo => cardInfo.cardName === categoryName)[0].cardTitle)}
                            </div>
                        </Link>
                        <div className="page-splitter">
                            <span className="circle"></span>
                        </div>
                        <Tooltip arrow
                                 title={<div style={{fontSize: 18, fontWeight: 400, whiteSpace: "pre-wrap"}}>{componentInfo?.sku}</div>}>
                            <div className={"component-name"}>
                                {componentInfo?.componentName}
                            </div>
                        </Tooltip>
                    </div>
                </div>
                <div className="component-info">
                    <div className="component-info-main">
                        <div className="component-image-part">
                            <div className="component-image-wrapper">
                                <img className="component-image" src={componentInfo?.imageURL} alt=""/>
                            </div>
                        </div>
                        <div className="component-characteristics-part">
                            <div className="component-price-and-buttons">
                                <div className="component-price">
                                    {offers.length > 0 ? (offers.length > 1 ? offers[0].price + " " + translate("UAH") + " - " + offers[offers.length - 1].price : offers[0].price) : componentInfo?.lowerPrice} {translate("UAH")}
                                </div>
                                <div className="component-buttons">
                                    <div onClick={() => {
                                        handleAddingToBuild()
                                    }}>
                                        {itemAddedToBuild ? <LightCheckIcon/> : < LightPlusIcon/>}
                                    </div>
                                    <div onClick={() => {
                                        if (!user) {
                                            setRegistrationWindowActive(true)
                                        } else {
                                            if (!itemLiked) {
                                                axios.post(`http://192.168.0.107:8080/api/v1/users/${user.id}/favorites/${id}`, {
                                                    headers: {
                                                        Authorization: user.token
                                                    }
                                                }).then(value => {
                                                    setFavorites(value.data)
                                                })
                                            } else {
                                                axios.delete(`http://192.168.0.107:8080/api/v1/users/${user.id}/favorites/${id}`, {
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
                            </div>
                            <div className="component-information">
                                <div className="characteristics-table">
                                    {
                                        characteristics && Object.keys(characteristics).map((value, index) =>
                                            <CharacteristicLine key={index} title={value} value={characteristics[value]}/>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="component-info-shops">
                        <div className="component-info-shops-title">
                            {translate("Where to buy: ") + (offers.length === 0 ? translate("item not available") : "")}
                        </div>
                        <div className="shops-list">
                            {offers.map((value: any, index: number) =>
                                <NavLink key={index} to={value.href} target={"_blank"}>
                                    <div className="shop-card">
                                        <div className="shop-card-image-wrapper">
                                            {value.store.name === "Rozetka" ?
                                                <img className="shop-card-image" src={require("../images/rozetka.png")} alt=""/>
                                                :
                                                <img className="shop-card-image" src={require("../images/zhuk-logo.png")} alt=""/>
                                            }
                                        </div>
                                        <div className="shop-card-price">
                                            {value.price} ₴
                                        </div>
                                    </div>
                                </NavLink>
                            )}
                        </div>
                    </div>
                    <ConfirmationWindow
                        message={"Are you sure you want to"}
                        action={"delete item from build"}
                        visibility={deletingItemFromBuildMessage}
                        setVisibility={setDeletingItemFromBuildMessage}
                        confirmationFunction={() => {
                            currentBuild[getComponentServerName(categoryName)] = null
                            setItemAddedToBuild(false)
                        }}
                        rejectionFunction={() => {
                        }}
                    />
                </div>
            </div>
        </div>
    )
}