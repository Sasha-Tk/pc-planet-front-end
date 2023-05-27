import {Link} from "react-router-dom";
import {Skeleton} from "@mui/material";
import React, {useState} from "react";
import {LazyLoadImage} from "react-lazy-load-image-component";

interface Props {
    cardName: string;
    cardTitle: string;
    picWidth: number;
}

export const CategoryItem = (props: Props) => {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <Link to={`/components/${props.cardName}`}>
            <div className="category-item">
                <div className="category-item-pic-holder">
                    <LazyLoadImage
                        className={`category-item-pic ${isLoading ? "loading" : ""}`}
                        src={`http://localhost:8080/api/v1/content/${props.cardName}-pic.png`}
                        afterLoad={() => setIsLoading(false)}
                        width={props.picWidth}
                    />
                    {/*<img className={`category-item-pic ${isLoading ? "loading" : ""}`} src={require(`http://localhost:8080/api/v1/content/${props.cardName}-pic.png`)}*/}
                    {/*     alt={props.cardName} width={props.picWidth}/>*/}
                    {isLoading &&
                        <div style={{marginTop: "20px"}}>
                            <Skeleton variant={"rounded"} animation={"wave"} width={260} height={260}/>
                        </div>
                    }
                </div>
                <p className={"category-item-title"}>{props.cardTitle}</p>
            </div>
        </Link>
    );
}