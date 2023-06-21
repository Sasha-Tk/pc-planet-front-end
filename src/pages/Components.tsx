import {CategoryItem} from "../components/CategoryItem";
import React from "react";
import {useTranslation} from "../components/Language";

export const cardsInfo = [
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
        cardName: "ram",
        cardTitle: "RAM",
        picWidth: 200
    },
    {
        cardName: "gpu",
        cardTitle: "GPU",
        picWidth: 270
    },
    {
        cardName: "psu",
        cardTitle: "PSU",
        picWidth: 235
    },
    {
        cardName: "case",
        cardTitle: "Case",
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
        picWidth: 160
    },
    {
        cardName: "cpu-fan",
        cardTitle: "CPU Fan",
        picWidth: 220
    },
    {
        cardName: "case-fan",
        cardTitle: "Case Fan",
        picWidth: 220
    }]

export const Components = () => {
    const {translate} = useTranslation()
    return (
        <div className={"content"}>
            <div className={"categories"}>
                {cardsInfo.map((cardInfo: any, key) =>
                    <CategoryItem
                        key={key}
                        cardName={cardInfo.cardName}
                        cardTitle={translate(cardInfo.cardTitle)}
                        picWidth={cardInfo.picWidth}
                    />
                )}
            </div>
        </div>)
}