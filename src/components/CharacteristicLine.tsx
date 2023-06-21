import React from "react";
import {useTranslation} from "./Language";

export const CharacteristicLine = (props: any) => {
    const {translate} = useTranslation()
    return (
        <div className="characteristics-table-row">
            <div className="characteristics-table-header">
                <div>{translate(props.title)}</div>
            </div>
            <div className="characteristics-table-value">
                {props.value.map((value: any, index:number) =>
                    <div key={index}>
                        {translate(value)}
                    </div>)
                }
            </div>
        </div>
    )
}