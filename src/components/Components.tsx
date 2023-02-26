import {CategoryItem} from "./CategoryItem";
import React from "react";
import {Link} from "react-router-dom";

export const Components = () => {

    const cardsInfo = [
        {
            cardName: "motherboard",
            cardTitle: "Motherboard",
            picWidth: 190
        },
        {
            cardName: "cpu",
            cardTitle: "CPU",
            picWidth: 190
        },
        {
            cardName: "gpu",
            cardTitle: "GPU",
            picWidth: 270
        },
        {
            cardName: "ram",
            cardTitle: "RAM",
            picWidth: 200
        },
        {
            cardName: "psu",
            cardTitle: "PSU",
            picWidth: 235
        },
        {
            cardName: "case",
            cardTitle: "CASE",
            picWidth: 235
        },
        {
            cardName: "ssd",
            cardTitle: "SSD",
            picWidth: 248
        },
        {
            cardName: "hdd",
            cardTitle: "HDD",
            picWidth: 220
        },
        {
            cardName: "cpu-fan",
            cardTitle: "CPU Fan",
            picWidth: 220
        },
        {
            cardName: "case-fan",
            cardTitle: "Case fan",
            picWidth: 220
        }]

    return (
        <div className={"content"}>
            <div className={"categories"}>
                {cardsInfo.map((cardInfo: any, key) =>
                    <Link key={key} to={'/components/' + cardInfo.cardName}>
                        <CategoryItem
                                      cardName={cardInfo.cardName}
                                      cardTitle={cardInfo.cardTitle}
                                      picWidth={cardInfo.picWidth}
                        />
                    </Link>
                )}
            </div>
        </div>)
}