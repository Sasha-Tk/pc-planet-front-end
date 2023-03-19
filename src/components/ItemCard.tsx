import {Link} from "react-router-dom";
import {ReactComponent as LightPlusIcon} from "../images/svg/light-add-item-to-build-icon.svg";
import {ReactComponent as LightCheckIcon} from "../images/svg/light-check-icon.svg";
import {ReactComponent as LightLiked} from "../images/svg/light-heart-icon-liked.svg";
import {ReactComponent as LightNotLiked} from "../images/svg/light-heart-icon-non-liked.svg";
import {ReactComponent as DarkPlusIcon} from "../images/svg/dark-add-item-to-build-icon.svg";
import {ReactComponent as DarkCheckIcon} from "../images/svg/dark-check-icon.svg";
import {ReactComponent as DarkLiked} from "../images/svg/dark-heart-icon-liked.svg";
import {ReactComponent as DarkNotLiked} from "../images/svg/dark-heart-icon-non-liked.svg";
import {useContext, useState} from "react";
import {AppContext} from "../App";

export const ItemCard = (props: any) => {
    const [itemLiked, setItemLiked] = useState(false);
    const [itemAddedToFavorites, setItemAddedToFavorites] = useState(false);
    const {darkThemeActive} = useContext(AppContext);

    return (
        <div className="item-card">
            <Link to={props.itemLink}>
                <div className="item-pic-wrapper">
                    <div className="item-pic-holder">
                        <img className={"item-pic"} src={require("../images/item-pic.png")} alt={"item-pic"}/>
                    </div>
                </div>
            </Link>
            <Link to={props.itemLink}>
                <p className="item-card-title">{props.itemName}</p>
            </Link>
            <div className="item-card-info">
                <div className="item-card-activity">
                    <div className="item-card-add-to-build"
                         onClick={() => setItemAddedToFavorites(!itemAddedToFavorites)}>
                        {itemAddedToFavorites ? (darkThemeActive && <LightCheckIcon/>) || <LightCheckIcon/> :
                            (darkThemeActive && <LightPlusIcon/>) || < LightPlusIcon/>}
                    </div>
                    <div className="item-card-like" onClick={() => setItemLiked(!itemLiked)}>
                        {itemLiked ? (darkThemeActive && <DarkLiked/>) || <LightLiked/> :
                            (darkThemeActive && <DarkNotLiked/>) || < LightNotLiked/>}
                    </div>
                </div>
                <p className="item-card-price">
                    16357$
                </p>
            </div>
        </div>

    )
}