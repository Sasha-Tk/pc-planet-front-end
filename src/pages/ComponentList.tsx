import {Link, useParams} from "react-router-dom";
import {ItemCard} from "../components/ItemCard";
import {useState} from "react";
import {Filter} from "../components/Filter";
import {cardsInfo} from "./Components";


export interface FilterItemType {
    id: number,
    filterItemName: string,
    filterItemState: boolean
}

interface FilterType {
    filterTitle: string,
    availableFilters: FilterItemType[]
}

export const ComponentList = (props: any) => {
    const {categoryName} = useParams();

    const [filters, setFilters] = useState<FilterType[]>([
        {
            filterTitle: "Vendors",
            availableFilters: [
                {
                    id: 0,
                    filterItemName: "Asus ABC",
                    filterItemState: false
                },
                {
                    id: 1,
                    filterItemName: "Msi",
                    filterItemState: false
                },
                {
                    id: 2,
                    filterItemName: "Asus",
                    filterItemState: false
                },
                {
                    id: 3,
                    filterItemName: "Msi",
                    filterItemState: false
                },
                {
                    id: 4,
                    filterItemName: "Asus",
                    filterItemState: false
                },
                {
                    id: 5,
                    filterItemName: "Msi",
                    filterItemState: false
                },
                {
                    id: 6,
                    filterItemName: "Asus",
                    filterItemState: false
                },
                {
                    id: 7,
                    filterItemName: "Msi",
                    filterItemState: false
                },
                {
                    id: 8,
                    filterItemName: "Asus",
                    filterItemState: false
                },
                {
                    id: 9,
                    filterItemName: "Msi",
                    filterItemState: false
                },
                {
                    id: 10,
                    filterItemName: "Asus",
                    filterItemState: false
                },
                {
                    id: 11,
                    filterItemName: "Msi",
                    filterItemState: false
                },
                {
                    id: 12,
                    filterItemName: "Asus",
                    filterItemState: false
                },
                {
                    id: 13,
                    filterItemName: "Msi",
                    filterItemState: false
                },
                {
                    id: 14,
                    filterItemName: "Asus",
                    filterItemState: false
                },
                {
                    id: 15,
                    filterItemName: "Msi",
                    filterItemState: false
                }
            ]
        },
        {
            filterTitle: "GPU",
            availableFilters: [
                {
                    id: 0,
                    filterItemName: "Asus",
                    filterItemState: false
                },
                {
                    id: 1,
                    filterItemName: "Msi",
                    filterItemState: false
                },
                {
                    id: 2,
                    filterItemName: "Asus",
                    filterItemState: false
                },
                {
                    id: 3,
                    filterItemName: "Msi",
                    filterItemState: false
                },
                {
                    id: 4,
                    filterItemName: "Asus",
                    filterItemState: false
                },
                {
                    id: 5,
                    filterItemName: "Msi",
                    filterItemState: false
                },
                {
                    id: 6,
                    filterItemName: "Asus",
                    filterItemState: false
                },
                {
                    id: 7,
                    filterItemName: "Msi",
                    filterItemState: false
                },
                {
                    id: 8,
                    filterItemName: "Asus",
                    filterItemState: false
                },
                {
                    id: 9,
                    filterItemName: "Msi",
                    filterItemState: false
                },
                {
                    id: 10,
                    filterItemName: "Asus",
                    filterItemState: false
                },
                {
                    id: 11,
                    filterItemName: "Msi",
                    filterItemState: false
                },
                {
                    id: 12,
                    filterItemName: "Asus",
                    filterItemState: false
                },
                {
                    id: 13,
                    filterItemName: "Msi",
                    filterItemState: false
                },
                {
                    id: 14,
                    filterItemName: "Asus",
                    filterItemState: false
                },
                {
                    id: 15,
                    filterItemName: "Msi",
                    filterItemState: false
                }
            ]
        },
        {
            filterTitle: "filter3",
            availableFilters: [
                {
                    id: 0,
                    filterItemName: "name",
                    filterItemState: false
                },
                {
                    id: 1,
                    filterItemName: "name",
                    filterItemState: false
                }
            ]
        },
        {
            filterTitle: "filter4",
            availableFilters: [
                {
                    id: 0,
                    filterItemName: "name",
                    filterItemState: false
                },
                {
                    id: 1,
                    filterItemName: "name",
                    filterItemState: false
                }
            ]
        }
    ]);


    const changeFilters = (filterTitle: string, currentID: number, newValue: boolean) => {
        const changedFilter = [...filters];
        changedFilter.forEach((value) => {
            if (value.filterTitle === filterTitle) {
                value.availableFilters.forEach(value => {
                    if (value.id === currentID) {
                        value.filterItemState = newValue;
                    }
                })
            }
        })
        setFilters(changedFilter);
    }
    const cancelFilters = () => {
        const changedFilter = [...filters];
        filters.forEach((value) => {
            value.availableFilters.forEach(value => {
                value.filterItemState = false;
            })
        })
    }
    return (
        <div className="content">
            <div className="component-list">
                <div className="page-ref-and-filter-buttons">
                    <div className="current-page-ref">
                        <Link to={"/components"}>
                            <div className="prev-page">
                                Components
                            </div>
                        </Link>
                        <div className="page-splitter">
                            <span className="circle"></span>
                        </div>
                        <Link to={`/components/${categoryName}`}>
                            <div className="current-page" onClick={cancelFilters}>
                                {cardsInfo.filter(cardInfo => cardInfo.cardName === categoryName)[0].cardTitle}
                            </div>
                        </Link>
                    </div>
                    {filters.map(filter => filter.availableFilters.map(currentFilter =>
                        currentFilter.filterItemState &&
                        <div className="filter-button">
                            {currentFilter.filterItemName}
                            <div className="close-filter-button"
                                 onClick={() => changeFilters(filter.filterTitle, currentFilter.id, false)}>
                                <span id="close-filter-button-first-line"></span>
                                <span id="close-filter-button-second-line"></span>
                            </div>
                        </div>))}
                </div>


                <div className="filter-and-items-wrapper">
                    <div className="filters">
                        {filters.map((value, key) =>
                            <Filter
                                key={key}
                                filter={value}
                                changeFilters={changeFilters}
                            />
                        )}
                    </div>
                    <div className="items">
                        <ItemCard itemName={"Asus RTX 3060 Dual OC"}>

                        </ItemCard>

                        <ItemCard itemName={"Asus RTX 3060 Dual OC White Asus RTX 3060 Dual OC"}>

                        </ItemCard>

                        <ItemCard itemName={"Asus RTX 3060 Dual OC White"}>

                        </ItemCard>

                        <ItemCard itemName={"Asus RTX 3060 Dual OC"}>

                        </ItemCard>

                        <ItemCard itemName={"Asus RTX 3060 Dual OC White Asus RTX 3060 Dual OC"}>

                        </ItemCard>

                        <ItemCard itemName={"Asus RTX 3060 Dual OC White"}>

                        </ItemCard>

                        <ItemCard itemName={"Asus RTX 3060 Dual OC"}>

                        </ItemCard>

                        <ItemCard itemName={"Asus RTX 3060 Dual OC White Asus RTX 3060 Dual OC"}>

                        </ItemCard>

                        <ItemCard itemName={"Asus RTX 3060 Dual OC White"}>

                        </ItemCard>

                        <ItemCard itemName={"Asus RTX 3060 Dual OC"}>

                        </ItemCard>

                        <ItemCard itemName={"Asus RTX 3060 Dual OC White Asus RTX 3060 Dual OC"}>

                        </ItemCard>

                        <ItemCard itemName={"Asus RTX 3060 Dual OC White"}>

                        </ItemCard>

                        <ItemCard itemName={"Asus RTX 3060 Dual OC"}>

                        </ItemCard>

                        <ItemCard itemName={"Asus RTX 3060 Dual OC White Asus RTX 3060 Dual OC"}>

                        </ItemCard>

                        <ItemCard itemName={"Asus RTX 3060 Dual OC White"}>

                        </ItemCard>

                        <ItemCard itemName={"Asus RTX 3060 Dual OC"}>

                        </ItemCard>

                        <ItemCard itemName={"Asus RTX 3060 Dual OC White Asus RTX 3060 Dual OC"}>

                        </ItemCard>

                        <ItemCard itemName={"Asus RTX 3060 Dual OC White"}>

                        </ItemCard>
                    </div>
                </div>
            </div>
        </div>
    )
}