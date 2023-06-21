import React, {useContext, useEffect, useState} from "react";
import {BuildComponent} from "../components/BuildComponent";
import {AppContext} from "../App";
import axios from "axios";
import {useTranslation} from "../components/Language";


export const Build = () => {
    const {currentBuild, setCurrentBuild, user} = useContext(AppContext)
    const [checkResult, setCheckResult] = useState<any>();
    const {translate} = useTranslation()
    const [buildPrice, setBuildPrice] = useState(0);
    const buildMapper = (build: any) => {
        let currentBuildForServer: any = {}
        let currentBuildPrice = 0
        console.log(build)
        Object.keys(build).forEach(value => {
            if (build[value]) {
                if (value === "id") {
                    currentBuildForServer.id = build.id
                } else {
                    if (value !== "totalLowerPrice") {
                        currentBuildPrice += build[value].lowerPrice
                    }
                    currentBuildForServer[value] = build[value].sku
                }
            }
        })
        setBuildPrice(currentBuildPrice)
        return currentBuildForServer
    }

    useEffect(() => {
        console.log(currentBuild)
        axios.post(`http://192.168.0.107:8080/api/v1/builds/compatibility-checker`, buildMapper(currentBuild), {
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(value => {
            setCheckResult(value.data)
        })
    }, [currentBuild])

    return (
        <div className="content">
            <div className="builds">
                <div className="current-build">
                    <BuildComponent compatibilityCheckResult={checkResult?.motherboard} componentLink={"motherboard"} component={"motherboard"} title={"Motherboard"}
                                    severalItems={false}/>
                    <BuildComponent compatibilityCheckResult={checkResult?.cpu} componentLink={"cpu"} component={"cpu"} title={"CPU"} severalItems={false}/>
                    <BuildComponent compatibilityCheckResult={checkResult?.gpu} componentLink={"gpu"} component={"gpu"} title={"GPU"} severalItems={false}/>
                    <BuildComponent compatibilityCheckResult={checkResult?.ram} componentLink={"ram"} component={"ram"} title={"RAM"} severalItems={false}/>
                    <BuildComponent compatibilityCheckResult={checkResult?.psu} componentLink={"psu"} component={"psu"} title={"PSU"} severalItems={false}/>
                    <BuildComponent compatibilityCheckResult={checkResult?.computerCase} componentLink={"case"} component={"computerCase"} title={"Case"} severalItems={false}/>
                    <BuildComponent compatibilityCheckResult={checkResult?.ssd} componentLink={"ssd"} component={"ssd"} title={"SSD"} severalItems={true}/>
                    <BuildComponent compatibilityCheckResult={checkResult?.hdd} componentLink={"hdd"} component={"hdd"} title={"HDD"} severalItems={true}/>
                    <BuildComponent compatibilityCheckResult={checkResult?.cpuFan} componentLink={"cpu-fan"} component={"cpuFan"} title={"CPU Fan"} severalItems={false}/>
                    <BuildComponent compatibilityCheckResult={checkResult?.caseFan} componentLink={"case-fan"} component={"caseFan"} title={"Case Fan"} severalItems={true}/>
                </div>
                <div className="current-build-buttons-wrapper">
                    <div className="build-price">
                        {translate("Price")}: {buildPrice} {translate("UAH")}
                    </div>
                    {user && <div
                        className="current-build-button"
                        onClick={() => {
                            if (user) {
                                if (currentBuild.id) {
                                    axios.patch(`http://192.168.0.107:8080/api/v1/users/${user.id}/builds`, buildMapper(currentBuild), {
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                    }).then(value => {
                                        setCurrentBuild(value.data)
                                    })
                                } else {
                                    axios.post(`http://192.168.0.107:8080/api/v1/users/${user.id}/builds`, buildMapper(currentBuild), {
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                    })
                                }
                            }
                            localStorage.setItem("currentBuild", JSON.stringify(currentBuild))
                        }}
                    >
                        {translate("Save")}
                    </div>}
                    <div
                        className="current-build-button"
                        onClick={() => {
                            localStorage.removeItem("currentBuild")
                            setCurrentBuild({})
                        }}>
                        {translate("Reset")}
                    </div>
                </div>
            </div>
        </div>
    )
}