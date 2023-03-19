import {useState} from "react";
import {FilterItemType} from "../pages/ComponentList";

export const Filter = (props: any) => {

    const [filteredAvailableFilters, setFilteredAvailableFilters] =
        useState<FilterItemType[]>(props.filter.availableFilters);


    return (<div className="filter">
        <div className="filter-title">{props.filter.filterTitle}</div>
        <div className="filter-search">
            <input className="input" onChange={(event) => {
                const searchingValue = event.target.value.trim();
                if (searchingValue === "") {
                    setFilteredAvailableFilters(props.filter.availableFilters);
                } else {
                    setFilteredAvailableFilters(props.filter.availableFilters.filter((filter: any) =>
                        filter.filterItemName.toLowerCase().includes(searchingValue.toLowerCase())))
                }
            }
            }/>
        </div>
        <div className="filter-items">
            {filteredAvailableFilters.length > 0 ? filteredAvailableFilters.map((value, key) =>
                <div className="available-filter-item" key={key}
                     onClick={() => props.changeFilters(props.filter.filterTitle, value.id, !value.filterItemState)}>
                    <input className="checkbox" type="checkbox" readOnly={true} checked={value.filterItemState}/>
                    <div>{value.filterItemName}</div>
                </div>
            ) : <div className="filter-not-found">Filter not found</div>}
        </div>
    </div>)
}
