import {CategoryItem} from "./CategoryItem";
import React, {useEffect} from "react";
import {Link} from "react-router-dom";

export const Components = () => {
    useEffect(() => {
        const categoryItems = Array.from(document.getElementsByClassName("category-item"));
        const addClasses = (event: Event) => {
            categoryItems
                .filter(el => !el.contains(event.target as Node))
                .forEach(el => el.classList.add("category-item-not-selected"));
        }
        const removeClasses = ()=>{
            categoryItems
                .forEach(el => el.classList.remove("category-item-not-selected"));
        }
        categoryItems.forEach(value => {
                value.addEventListener('mouseover', addClasses);
                value.addEventListener('mouseleave', removeClasses);
            }
        )
        return ()=>{
            categoryItems.forEach(value => {
                    value.removeEventListener('mouseover', addClasses);
                    value.removeEventListener('mouseleave', removeClasses);
                }
            )
        }
    })

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
                    <CategoryItem
                        key={key}
                        cardName={cardInfo.cardName}
                        cardTitle={cardInfo.cardTitle}
                        picWidth={cardInfo.picWidth}
                    />
                )}
            </div>
        </div>)
}