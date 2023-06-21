import React, {ChangeEvent, useEffect, useState} from "react";
import {ReactComponent as SearchIcon} from "../images/svg/search-icon.svg";
import {useNavigate} from "react-router-dom";
import data from "../test-data/data.json"
import {SearchResultItem} from "./SearchResultItem";
import axios from "axios";
import {useTranslation} from "./Language";

export const NavSearchPanel = () => {
    const [inputIsVisible, setInputVisibility] = useState(false);
    const [searchingValue, setSearchingValue] = useState("");
    const [filteredData, setFilteredData] = useState<any>([]);
    const {translate} = useTranslation()
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchingValue(event.target.value.trim());
        if (event.target.value.length > 0) {
            axios.get(
                `http://192.168.0.107:8080/api/v1/components/search/${event.target.value.trim()}`
            ).then(value => {
                setFilteredData(value.data)
            })
        }
        // setFilteredData(data.filter(element => element["item-name"].toLowerCase().includes(event.target.value.toLowerCase())));
    }

    const navigation = useNavigate();
    useEffect(() => {
        const input = document.querySelector('.search-panel .input') as HTMLInputElement;
        const searchTitle = document.querySelector('.search-title-text') as HTMLInputElement;
        const searchIcon = document.querySelector('.search-icon') as HTMLElement;
        const searchTitleContainer = document.querySelector('.search-title') as HTMLElement;
        input.addEventListener('focusout', () => {
            setInputVisibility(false);
            searchTitle.style.opacity = "1";
            searchTitle.style.cursor = "pointer";
            searchIcon.style.pointerEvents = "none"
            searchTitleContainer.style.pointerEvents = "auto";
        });
        input.addEventListener('focusin', () => {
            setInputVisibility(true);
            searchTitle.style.opacity = "0";
            searchTitle.style.cursor = "text";
            searchIcon.style.pointerEvents = "auto"
            searchTitleContainer.style.pointerEvents = "none";
        })
    }, [])


    const handleSearchIconClick = (event: any) => {
        event.preventDefault();

        const input = document.querySelector('.search-panel .input') as HTMLInputElement;
        input.value = "";
        setSearchingValue("");
    }

    const toggleFocus = () => {
        const input = document.querySelector('.search-panel .input') as HTMLInputElement;
        const searchTitle = document.querySelector('.search-title-text') as HTMLInputElement;
        const searchTitleContainer = document.querySelector('.search-title') as HTMLElement;
        if (!inputIsVisible) {
            setInputVisibility(true);
            searchTitle.style.opacity = "0";
            searchTitle.style.cursor = "text";
            searchTitleContainer.style.pointerEvents = "none";
            input.focus();
        } else {
            input.blur();
        }
    }
    const getComponentTypeByServerComponentType = (componentType: string) => {
        return componentType.toLowerCase().replace("_", "-")
    }

    return (
        <div className="search-panel">
            <input className={"input " + (searchingValue.length !== 0 ? "result-visible" : "")}
                   onKeyDown={(event) => {
                       if (event.key === 'Enter' && searchingValue !== "") {
                           navigation("/search/");
                           (event.target as HTMLInputElement).blur();
                       } else if (event.key === 'Escape') {
                           (event.target as HTMLInputElement).blur();
                       }
                   }}
                   onChange={handleInputChange}
            />
            <div className="search-title" onClick={toggleFocus}>
                <p className="search-title-text">{translate("Search")}</p>
                <div className={"search-icon"} onMouseDown={handleSearchIconClick}>
                    {!inputIsVisible || searchingValue.length === 0 ?
                        <SearchIcon/> :
                        <div className={"delete-search-value-icon"}>
                            <span id={"delete-search-value-button-first-line"}></span>
                            <span id={"delete-search-value-button-second-line"}></span>
                        </div>}
                </div>
            </div>
            {inputIsVisible && searchingValue.length !== 0 && <div className="search-result-wrapper">
                <div className="search-result-content">
                    {filteredData.length > 0 ?
                        filteredData.map((value: any, key: any) =>
                            <SearchResultItem
                                key={key}
                                link={`/component/${getComponentTypeByServerComponentType(value["componentType"])}/${value["id"]}`}
                            >
                                {value["componentName"]}
                            </SearchResultItem>
                        ).slice(0, 5)
                        : <div className={"no-data-found"}>{translate("No items found")}</div>}
                </div>
            </div>}
        </div>)
}