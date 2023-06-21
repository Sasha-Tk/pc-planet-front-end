import {Link} from "react-router-dom";

export const SearchResultItem = (props: any) => {
    return (
        <Link to={props.link}>
            <div className="search-result-item" onMouseDown={(event) => {
                event.preventDefault();
                (document.querySelector('.search-panel .input') as HTMLInputElement).focus()
            }}>
                {props.children}
            </div>
        </Link>
    )
}