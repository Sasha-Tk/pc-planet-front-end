import {ItemCard} from "../components/ItemCard";
import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../App";
import {useParams} from "react-router-dom";
import {default as Axios} from "axios";

export const Favorites = () => {
    const {user} = useContext(AppContext);
    const {categoryName} = useParams();
    const [favoriteItems, setFavoriteItems] = useState([])

    useEffect(() => {
        Axios.get(`http://192.168.0.107:8080/api/v1/users/${user.id}/favorites`, {
            headers: {
                Authorization: user.token
            }
        }).then(value => {
            setFavoriteItems(value.data)
        })
    }, [])

    return (
        <div className="content">
            <div className="favorite-items">
                {
                    favoriteItems.map((value: any, index: number) =>
                        <ItemCard
                            key={index}
                            itemName={value.componentName}
                            itemLink={`/component/${value.componentType.toLowerCase().replace("_","-")}/${value.id}`}
                            imageURL={value.imageURL}
                            price={value.lowerPrice}
                            categoryName={categoryName}
                            id={value.id}
                            sku={value.sku}
                            component={value}
                        />
                    )
                }
            </div>
        </div>
    )
}