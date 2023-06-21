import {useTranslation} from "./Language";
import {ReactComponent as ArrowUp} from "../images/svg/arrow-up.svg"
import {ReactComponent as ArrowDown} from "../images/svg/arrow-down.svg"
import {useEffect, useState} from "react";

export enum SortingState {
    NAME_ASC = "NAME_ASC",
    NAME_DESC = "NAME_DESC",
    LOWER_PRICE_ASC = "LOWER_PRICE_ASC",
    LOWER_PRICE_DESC = "LOWER_PRICE_DESC"
}

export const Sorting = (props: any) => {
    const {translate} = useTranslation()
    const sortingOrders = new Map()
    sortingOrders.set(SortingState.NAME_ASC, {title: "Name", icon: <ArrowUp/>})
    sortingOrders.set(SortingState.NAME_DESC, {title: "Name", icon: <ArrowDown/>})
    sortingOrders.set(SortingState.LOWER_PRICE_ASC, {title: "Price", icon: <ArrowUp/>})
    sortingOrders.set(SortingState.LOWER_PRICE_DESC, {title: "Price", icon: <ArrowDown/>})

    const [selectedSortingOrder, setSelectedSortingOrder] = useState(SortingState.NAME_ASC);
    const [sortingIsVisible, setSortingIsVisible] = useState(false);

    useEffect(() => {
        const closeSorting = (event: any) => {
            if (!document.querySelector('.sorting-wrapper')?.contains(event.target)) {
                setSortingIsVisible(false)
            }
        }
        if (sortingIsVisible) {
            document.body.addEventListener("click", closeSorting)
        } else {
            document.body.removeEventListener("click", closeSorting)
        }
    }, [sortingIsVisible])

    return (
        <div className={"sorting-wrapper"}>
            <div className="sorting-title">
                {translate("Sort by")}
            </div>
            <div className="sorting-button" onClick={() => setSortingIsVisible(!sortingIsVisible)}>
                {translate(sortingOrders.get(selectedSortingOrder).title)}
                {sortingOrders.get(selectedSortingOrder).icon}
                <div className={`sorting-order-list ${sortingIsVisible ? "visible" : ""}`}>
                    {Array.from(sortingOrders.keys()).map((value: any, index) =>
                        <div key={index} className={"sorting-order-item"} onClick={() => {
                            setSelectedSortingOrder(value)
                            props.setSorting(value)
                        }}>
                            {translate(sortingOrders.get(value).title)}
                            {sortingOrders.get(value).icon}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}