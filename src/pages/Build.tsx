import React, {useContext, useEffect, useState} from "react";
import {BuildComponent} from "../components/BuildComponent";
import {AppContext} from "../App";
import axios from "axios";


export const Build = () => {
    const {currentBuild, setCurrentBuild, getComponentServerName} = useContext(AppContext)
    const [checkResult, setCheckResult] = useState<any>();
    useEffect(() => {
        let currentBuildForServer: any = {}
        console.log(currentBuild)
        Object.keys(currentBuild).forEach(value => {
            if (currentBuild[value]) {
                currentBuildForServer[getComponentServerName(value)] = currentBuild[value].sku
            }
        })
        console.log(currentBuildForServer)
        axios.post(`http://localhost:8080/api/v1/builds/compatibility`, currentBuildForServer, {
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(value => {
            setCheckResult(value.data)
        })
    }, [currentBuild])
    return (
        <div className={"content"}>
            <div className="builds">
                <div className="current-build">
                    <BuildComponent compatibilityCheckResult={checkResult?.motherboard} component={"motherboard"} title={"Motherboard"} severalItems={false}/>
                    <BuildComponent compatibilityCheckResult={checkResult?.cpu} component={"cpu"} title={"CPU"} severalItems={false}/>
                    <BuildComponent compatibilityCheckResult={checkResult?.gpu} component={"gpu"} title={"GPU"} severalItems={false}/>
                    <BuildComponent compatibilityCheckResult={checkResult?.ram} component={"ram"} title={"RAM"} severalItems={false}/>
                    <BuildComponent compatibilityCheckResult={checkResult?.psu} component={"psu"} title={"PSU"} severalItems={false}/>
                    <BuildComponent compatibilityCheckResult={checkResult?.computerCase} component={"case"} title={"Case"} severalItems={false}/>
                    <BuildComponent compatibilityCheckResult={checkResult?.ssd} component={"ssd"} title={"SSD"} severalItems={true}/>
                    <BuildComponent compatibilityCheckResult={checkResult?.hdd} component={"hdd"} title={"HDD"} severalItems={true}/>
                    <BuildComponent compatibilityCheckResult={checkResult?.cpuFan} component={"cpu-fan"} title={"CPU Fan"} severalItems={false}/>
                    <BuildComponent compatibilityCheckResult={checkResult?.caseFan} component={"case-fan"} title={"Case Fan"} severalItems={true}/>
                </div>
                <div className="current-build-buttons-wrapper">
                    <div
                        className="current-build-button"
                        onClick={() => {
                            localStorage.setItem("currentBuild", JSON.stringify(currentBuild))
                        }}
                    >
                        Save
                    </div>
                    <div
                        className="current-build-button"
                        onClick={() => {
                            localStorage.removeItem("currentBuild")
                            setCurrentBuild({

                            })
                        }}>
                        Reset
                    </div>
                </div>
            </div>
        </div>
    )
}