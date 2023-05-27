import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import {ItemCard} from "../components/ItemCard";
import React, {useContext, useEffect, useState} from "react";
import {Filter} from "../components/Filter";
import {cardsInfo} from "./Components";
import {Pagination} from "../components/Pagination";
import {default as Axios} from "axios";
import {AppContext} from "../App";
import {Skeleton} from "@mui/material";
import {ItemCardSkeleton} from "../components/ItemCardSkeleton";
import {FilterSkeleton} from "../components/FilterSkeleton";

export interface FilterItemType {
    id: number,
    filterItemName: string,
    filterEdgeValue: number | undefined,
    filterItemState: boolean | number
}

interface FilterType {
    filterTitle: string,
    filterType: string,
    availableFilters: FilterItemType[]
}

export const ComponentList = (props: any) => {
    const {categoryNameFromServer, currentFiltersToApply, getComponentServerName} = useContext(AppContext);
    const {categoryName, page} = useParams();
    const {user} = useContext(AppContext)
    const [filters, setFilters] = useState<FilterType[]>([]);
    const [currentItems, setCurrentItems] = useState([])
    const [pageNumber, setPageNumber] = useState(page === undefined ? 1 : Number(page));
    const [maxPageNumber, setMaxPageNumber] = useState(1);
    const [itemsAreLoading, setItemsAreLoading] = useState(true);
    const [filtersAreLoading, setFiltersAreLoading] = useState(true);


    useEffect(() => {
        Axios.get(`http://192.168.0.107:8080/api/v1/components/${categoryName}/filters`, {
            headers: {
                Authorization: user ? "Bearer " + user.token : ""
            }
        })
            .then(value => {
                if (categoryName) {
                    let filtersFromDB = value.data.filters
                    filtersFromDB.forEach((filter: any) => {
                        const currentFilterToApply = currentFiltersToApply[getComponentServerName(categoryName)]?.filter((filterToApply: any) => filterToApply.filterName === filter.filterName);
                        if (currentFilterToApply?.length > 0) {
                            if (!filter.availableFilters.includes(currentFilterToApply[0].availableFilters[0])) {
                                filter.availableFilters.push(currentFilterToApply[0].availableFilters[0])
                            }
                        }
                    })
                    filtersFromDB = filtersFromDB.map((filter: any) => {
                        return {
                            filterTitle: filter.filterName,
                            filterType: filter.filterType,
                            availableFilters: filter.availableFilters.map((filterItemValue: any, id: number) => {
                                const currentFilterToApply = currentFiltersToApply[getComponentServerName(categoryName)]?.filter((filterToApply: any) => filterToApply.filterName === filter.filterName);
                                if (filter.filterType === "range") {
                                    if (currentFilterToApply?.length > 0) {
                                        // console.log(currentFilterToApply[0].availableFilters)
                                        return {
                                            id: id,
                                            filterItemName: Math.round(filterItemValue),
                                            filterEdgeValue: Math.round(filterItemValue),
                                            filterItemState: Math.round(currentFilterToApply[0].availableFilters[id])
                                        }
                                    }

                                    return {
                                        id: id,
                                        filterItemName: Math.round(filterItemValue),
                                        filterEdgeValue: Math.round(filterItemValue),
                                        filterItemState: Math.round(filterItemValue)
                                    }
                                }
                                if (currentFilterToApply?.length > 0) {
                                    return {
                                        id: id,
                                        filterItemName: filterItemValue,
                                        filterItemState: currentFilterToApply[0].availableFilters[0] === filterItemValue
                                    };
                                }
                                return {
                                    id: id,
                                    filterItemName: filterItemValue,
                                    filterItemState: false
                                };
                            })
                        };
                    });
                    setFilters(filtersFromDB)
                    setFiltersAreLoading(false)
                }
            })
    }, []);

    useEffect(() => {
        setItemsAreLoading(true)
        if (filters.length === 0) {
            return
        }
        Axios.post(`http://localhost:8080/api/v1/components/${categoryName}`, handleFilterChanges(filters), {
            params: {page: pageNumber},
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(value => {
            setItemsAreLoading(false)
            setCurrentItems(value.data['componentList'])
            setMaxPageNumber(value.data['pageCount'])
        })
        window.scrollTo(0, 0)
    }, [filters, pageNumber]);

    const handleFilterChanges = (filters: FilterType[]) => {
        const filterObject: any = {}
        filters.forEach((filter: FilterType) => {
            const selectedFilters = filter.availableFilters.filter(value => value.filterItemState || value.filterItemState===0).map((value) => {
                if (filter.filterType === "range") {
                    return value.filterItemState
                }
                return value.filterItemName
            })
            if (selectedFilters.length > 0) {
                filterObject[filter.filterTitle] = selectedFilters
                // console.log(selectedFilters);
            }
        })
        // console.log(filterObject)
        return filterObject
    }


    const changeFilters = (filterTitle: string, currentID: number, newValue: any) => {
        const changedFilter = [...filters];
        filters.forEach((filter) => {
            if (filter.filterTitle === filterTitle) {
                filter.availableFilters.forEach(value => {
                    if (value.id === currentID) {
                        value.filterItemState = filter.filterType === "range" ? Number(newValue) : newValue;
                    }
                })
            }
        })
        // console.log(changedFilter)
        setFilters(changedFilter);
        setPageNumber(1)
    }
    const cancelFilters = () => {
        const changedFilter = [...filters];
        changedFilter.forEach((filter) => {
            filter.availableFilters.forEach(value => {
                if (filter.filterType === "range") {
                    value.filterItemState = Number(value.filterEdgeValue)
                } else {
                    value.filterItemState = false;
                }
            })
        })
        setFilters(changedFilter)
        setPageNumber(1)
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
                    {filters.map((filter, i) =>
                        filter.availableFilters.map((currentFilter, j) =>
                            currentFilter.filterItemState && filter.filterType !== "range" &&
                            <div key={`${i}${j}`} className="filter-button">
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
                        {filtersAreLoading ? Array(5).fill(0).map((_,i) => <FilterSkeleton key={i}/>) :
                            filters.map((value, key) =>
                                <Filter
                                    key={key}
                                    filter={value}
                                    changeFilters={changeFilters}
                                />
                            )}
                    </div>
                    <div className="items-wrapper">
                        <div className="items">
                            {
                                itemsAreLoading ? Array(20).fill(0).map((_,i) => <ItemCardSkeleton key={i}/>) :
                                    currentItems.map((value: any, index: number) =>
                                        <ItemCard
                                            key={index}
                                            itemName={value.componentName}
                                            imageURL={value.imageURL}
                                            price={value.lowerPrice}
                                            categoryName={categoryName}
                                            id={value.id}
                                            sku={value.sku}
                                        />
                                    )
                            }
                        </div>
                        {maxPageNumber > 1 && <Pagination
                            pageNumber={pageNumber}
                            setPageNumber={setPageNumber}
                            location={`/components/${categoryName}`}
                            maxPageNumber={maxPageNumber}
                        />}
                    </div>
                </div>
            </div>

        </div>
    )
}