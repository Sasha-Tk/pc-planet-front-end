import {NavLink, useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";

//TODO: use lib react-pagination instead this
export const Pagination = (props: any) => {

    const navigation = useNavigate()
    let {location, maxPageNumber} = props
    const url = useLocation()
    let {pageNumber, setPageNumber} = props

    const changePageNumber = (delta: number) => {
        if (pageNumber + delta >= 1 && pageNumber + delta <= maxPageNumber) {
            setPageNumber(pageNumber + delta)
        }
    }
    useEffect(() => {
        changeLocation(pageNumber)
    }, [pageNumber])

    const changeLocation = (pageNumber: number) => {
        navigation(`${location}${pageNumber !== 1 ? '/' + pageNumber : ""}${url.search}`)
        window.scrollTo(0, 0)
    }

    let buttons: number[]
    let buttonsNames: string[]
    if (maxPageNumber > 7) {
        buttons = Array(7).fill(1).map((value, i) =>
            pageNumber < 5 ? i + 1 : pageNumber > maxPageNumber - 3 ? maxPageNumber - (5 - i) - 1 : pageNumber - 3 + i
        )
        buttons[buttons.length - 1] = maxPageNumber
        buttons[0] = 1

        buttonsNames = Array(...buttons)
        pageNumber > 4 && (buttonsNames[1] = "...")
        pageNumber < maxPageNumber - 3 && (buttonsNames[5] = "...")

    } else {
        buttons = Array(maxPageNumber).fill(1).map((_, i) => i + 1)
        buttonsNames = Array(...buttons)
    }


    return (
        <div className="pagination-buttons-wrapper">
            <div className="pagination-buttons-list">
                <div className="pagination-button" onClick={() => changePageNumber(-1)}>{'<'}</div>
                {buttonsNames.map((value, i) =>
                    <NavLink key={i} to={`${location}${buttons[i] !== 1 ? '/' + buttons[i] : ""}${url.search}`}>
                        <div
                            className={`pagination-button ${pageNumber === buttons[i] ? "selected-item" : ""}`}
                            onClick={() => {
                                setPageNumber(buttons[i])
                            }}>
                            {value}
                        </div>
                    </NavLink>
                )}
                <div className="pagination-button" onClick={() => changePageNumber(1)}>{'>'}</div>
            </div>
        </div>
    )
}