import {useEffect, useRef, useState} from "react";
import {FilterItemType} from "../pages/ComponentList";
import {useTranslation} from "./Language";

export const Filter = (props: any) => {
    const {translate} = useTranslation()
    const minValueTitle = useRef<any>()
    const maxValueTitle = useRef<any>()
    let timer: any;

    const [filteredAvailableFilters, setFilteredAvailableFilters] =
        useState<FilterItemType[]>([]);

    useEffect(() => {
        setFilteredAvailableFilters(props.filter.availableFilters)
        handleRangeFilterChange()
    }, [props.filter.availableFilters]);

    // useEffect(()=>{
    //     const minInput: any = document.getElementById(props.filter.filterTitle + "-min-value")
    //     const maxInput: any = document.getElementById(props.filter.filterTitle + "-max-value")
    //     console.log("aboba")
    //     if (minInput&&maxInput){
    //         minInput.value = minValueTitle.current?.value
    //         maxInput.value = maxValueTitle.current?.value
    //     }
    // },[minValueTitle.current, maxValueTitle.current])

    useEffect(() => {
        if (props.filter.filterType === "range") {
            const maxInput: any = document.getElementById(props.filter.filterTitle + "-max-value")
            const minInput: any = document.getElementById(props.filter.filterTitle + "-min-value")
            maxInput.value = maxValueTitle.current.value
            minInput.value = minValueTitle.current.value
            handleRangeFilterChange()
        }
    }, [props.filter.availableFilters[0]?.filterItemState, props.filter.availableFilters[1]?.filterItemState])

    const handleRangeFilterChange = () => {
        const progress = document.getElementById(props.filter.filterTitle + "-progress")
        if (progress !== null) {
            const minInput: any = document.getElementById(props.filter.filterTitle + "-min-value")
            const maxInput: any = document.getElementById(props.filter.filterTitle + "-max-value")
            const currentMinValue = minInput.value
            const currentMaxValue = maxInput.value
            const minValue = props.filter.availableFilters[0]?.filterEdgeValue
            const maxValue = props.filter.availableFilters[1]?.filterEdgeValue


            const leftPercentage = (maxValue - currentMinValue) / (maxValue - minValue) * 100
            const rightPercentage = (maxValue - currentMaxValue) / (maxValue - minValue) * 100
            progress.style.left = (100 - leftPercentage) + "%"
            progress.style.right = (rightPercentage) + "%"
            minValueTitle.current.value = currentMinValue
            maxValueTitle.current.value = currentMaxValue
        }
    }

    return (<div className="filter">
        <div className="filter-title">{translate(props.filter.filterTitle)}</div>
        {props.filter.availableFilters.length > 5 && < div className="filter-search">
            <input className="input" onChange={(event) => {
                const searchingValue = event.target.value.trim();
                if (searchingValue === "") {
                    setFilteredAvailableFilters(props.filter.availableFilters);
                } else {
                    setFilteredAvailableFilters(props.filter.availableFilters.filter((filter: any) =>
                        String(filter.filterItemName).toLowerCase().includes(searchingValue.toLowerCase())))
                }
            }}/>
        </div>}
        {props.filter.filterType === "range" ?
            <div className="filter-range-items">
                <div className="range-input-values">
                    <input
                        ref={minValueTitle}
                        className={"input"}
                        readOnly={true}
                        value={props.filter.availableFilters[0]?.filterItemState}
                        onChange={() => {

                        }}
                    />
                    <input
                        ref={maxValueTitle}
                        className={"input"}
                        readOnly={true}
                        value={props.filter.availableFilters[1]?.filterItemState}
                        onChange={() => {

                        }}
                    />
                </div>
                <div className="range-input">
                    <input
                        id={props.filter.filterTitle + "-min-value"}
                        className={"range-input-slider"}
                        type={"range"}
                        defaultValue={props.filter.availableFilters[0]?.filterItemState}
                        // value={props.filter.availableFilters[0].filterItemState}
                        min={props.filter.availableFilters[0]?.filterEdgeValue}
                        max={props.filter.availableFilters[1]?.filterEdgeValue}
                        onInput={(event: any) => {
                            const minInput: any = minValueTitle.current
                            minInput.value = event.target.value
                            handleRangeFilterChange()
                            clearTimeout(timer)
                            timer = setTimeout(() => {
                                props.changeFilters(props.filter.filterTitle, 0, event.target.value)
                            }, 500)
                        }}
                    />
                    <input
                        id={props.filter.filterTitle + "-max-value"}
                        className={"range-input-slider"}
                        type={"range"}
                        defaultValue={props.filter.availableFilters[1]?.filterItemState}
                        // value={props.filter.availableFilters[1].filterItemState}
                        min={props.filter.availableFilters[0]?.filterEdgeValue}
                        max={props.filter.availableFilters[1]?.filterEdgeValue}
                        onInput={(event: any) => {
                            const maxInput: any = maxValueTitle.current
                            maxInput.value = event.target.value
                            handleRangeFilterChange()
                            clearTimeout(timer)
                            timer = setTimeout(() => {
                                props.changeFilters(props.filter.filterTitle, 1, event.target.value)
                            }, 500)
                        }}
                    />
                    <div id={props.filter.filterTitle + "-progress"} className="progress"></div>
                </div>
            </div>
            :
            <div className="filter-items">
                {filteredAvailableFilters.length > 0 ? filteredAvailableFilters.map((value, key) =>
                    <div className="available-filter-item" key={key}
                         onClick={() => props.changeFilters(props.filter.filterTitle, value.id, !value.filterItemState)}>
                        <input className="checkbox" type="checkbox" readOnly={true} checked={Boolean(value.filterItemState)}/>
                        <div>{value.filterItemName}</div>
                    </div>
                ) : <div className="filter-not-found">Filter not found</div>}
            </div>}
    </div>)
}
