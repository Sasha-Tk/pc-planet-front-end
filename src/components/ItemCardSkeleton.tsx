import {Skeleton} from "@mui/material";
import React from "react";

export const ItemCardSkeleton = () => {
    return (
        <div className="item-card">
            <div className="item-pic-wrapper">
                <Skeleton variant={"rounded"} animation={"wave"} width={260} height={224}/>
            </div>
            <Skeleton variant={"rounded"} animation={"wave"} width={260} height={45}/>
            <div style={{marginBottom: "20px"}}>
                <Skeleton variant={"rounded"} animation={"wave"} width={260} height={45}/>
            </div>
        </div>
    )
}