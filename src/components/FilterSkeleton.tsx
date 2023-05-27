import {Skeleton} from "@mui/material";
import React from "react";

export const FilterSkeleton = () => {
    return (
        <div className="filter">
            <Skeleton variant={"rounded"} animation={"wave"} width={300} height={45}/>
            <Skeleton variant={"rounded"} animation={"wave"} width={300} height={260} />
        </div>
    )
}