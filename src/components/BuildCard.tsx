import React, {useContext, useEffect, useState} from "react";
import {BuildCardComponent} from "./BuildCardComponent";
import {ReactComponent as DeleteIcon} from "../images/svg/delete-icon.svg";
import {ReactComponent as EditIcon} from "../images/svg/edit-icon.svg";
import {ReactComponent as WarningIcon} from "../images/svg/warning-icon.svg";
import axios from "axios";
import {AppContext} from "../App";
import {useNavigate} from "react-router-dom";
import {ConfirmationWindow} from "./ConfirmationWindow";
import Tooltip from "@mui/material/Tooltip";
import {useTranslation} from "./Language";

export const BuildCard = (props: any) => {
    const {user, setCurrentBuild} = useContext(AppContext)
    const [deletingBuildMessageVisibility, setDeletingBuildMessageVisibility] = useState(false)
    const [componentsCompatible, setComponentsCompatible] = useState<any>(true);
    const [checkResult, setCheckResult] = useState<any>()
    const {translate} = useTranslation()
    const navigation = useNavigate()

    const buildMapper = (build: any) => {
        let currentBuildForServer: any = {}
        Object.keys(build).forEach(value => {
            if (build[value]) {
                if (value === "id") {
                    currentBuildForServer.id = build.id
                } else {
                    currentBuildForServer[value] = build[value].sku
                }
            }
        })
        return currentBuildForServer
    }

    useEffect(() => {
        axios.post(`http://192.168.0.107:8080/api/v1/builds/compatibility-checker`, buildMapper(props.build), {
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(value => {
            setCheckResult(value.data)
            Object.keys(value.data).forEach(key => {
                if (value.data[key].length > 0) {
                    setComponentsCompatible(false)
                }
            })
            console.log(props.build.id, value.data)
        })
    }, [props.builds])

    const deletingBuild = () => {
        axios.delete(`http://192.168.0.107:8080/api/v1/users/${user.id}/builds/${props.build.id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(value => {
            props.setBuilds(value.data)
        })
    }
    return (
        <div className="build-card">
            <div className="build-card-components-list">
                <BuildCardComponent id={props.build.id} compatibilityCheckResult={checkResult?.motherboard} component={props.build.motherboard} componentType="Motherboard"/>
                <BuildCardComponent id={props.build.id} compatibilityCheckResult={checkResult?.cpu} component={props.build.cpu} componentType="CPU"/>
                <BuildCardComponent id={props.build.id} compatibilityCheckResult={checkResult?.gpu} component={props.build.gpu} componentType="GPU"/>
                <BuildCardComponent id={props.build.id} compatibilityCheckResult={checkResult?.ram} component={props.build.ram} componentType="RAM"/>
                <BuildCardComponent id={props.build.id} compatibilityCheckResult={checkResult?.psu} component={props.build.psu} componentType="PSU"/>
                <BuildCardComponent id={props.build.id} compatibilityCheckResult={checkResult?.computerCase} component={props.build.computerCase} componentType="Case"/>
                <BuildCardComponent id={props.build.id} compatibilityCheckResult={checkResult?.ssd} component={props.build.ssd} componentType="SSD"/>
                <BuildCardComponent id={props.build.id} compatibilityCheckResult={checkResult?.hdd} component={props.build.hdd} componentType="HDD"/>
                <BuildCardComponent id={props.build.id} compatibilityCheckResult={checkResult?.cpuFan} component={props.build.cpuFan} componentType="Cpu Fan"/>
                <BuildCardComponent id={props.build.id} compatibilityCheckResult={checkResult?.caseFan} component={props.build.caseFan} componentType="Case Fan"/>
            </div>
            <div className="build-card-info">
                <div className="build-card-info-header">
                    {!componentsCompatible &&
                        <div
                            className="build-card-info-header-warning"
                            onMouseEnter={() => {
                                const nonCompatibleComponents = document.querySelectorAll(".build-card-component.non-compatible.id-" + props.build.id)
                                nonCompatibleComponents.forEach(value => value.classList.add("visible"))
                            }}
                            onMouseLeave={() => {
                                const nonCompatibleComponents = document.querySelectorAll(".build-card-component.non-compatible.id-" + props.build.id)
                                nonCompatibleComponents.forEach(value => value.classList.remove("visible"))
                            }}
                        >
                            <Tooltip
                                placement={"bottom"}
                                arrow
                                title={<div style={{fontSize: 18, fontWeight: 400, whiteSpace: "pre-wrap"}}>{translate("Components are not compatible")}</div>}
                            >
                                <div>
                                    <WarningIcon/>
                                </div>
                            </Tooltip>
                        </div>}
                    <div className="build-card-info-header-edit" onClick={() => {
                        setCurrentBuild(props.build)
                        navigation("/create-build")
                    }}>
                        <EditIcon/>
                    </div>
                    <div className="build-card-info-header-delete" onClick={() => {
                        setDeletingBuildMessageVisibility(true)
                    }}>
                        <DeleteIcon/>
                    </div>
                </div>
                <div className="build-card-price">
                    {props.build.totalLowerPrice} ₴
                </div>
                {/*.build-card-info-*/}
                <ConfirmationWindow
                    message={"Are you sure you want to"}
                    action={"delete build"}
                    visibility={deletingBuildMessageVisibility}
                    setVisibility={setDeletingBuildMessageVisibility}
                    confirmationFunction={deletingBuild}
                    rejectionFunction={() => {
                    }}
                />
            </div>
        </div>
    )
}