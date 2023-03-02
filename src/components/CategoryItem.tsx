import {Link} from "react-router-dom";
import {useEffect} from "react";

interface Props {
    cardName: string;
    cardTitle: string;
    picWidth: number;
}

export const CategoryItem = (props: Props) => {


    return (
        <div className="category-item">
            <Link to={'/components/' + props.cardName}>
                <div className="category-item-pic-holder">
                    <img className={"category-item-pic"} src={require(`../images/${props.cardName}-pic.png`)}
                         alt={props.cardName} width={props.picWidth}/>
                </div>
                <p className={"category-item-title"}>{props.cardTitle}</p>
            </Link>
        </div>
    );
}