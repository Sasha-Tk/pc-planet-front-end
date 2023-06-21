import Tooltip from '@mui/material/Tooltip';
import {ReactComponent as LeftArrow} from "../images/svg/left-arrow-icon.svg";
import {ReactComponent as RightArrow} from "../images/svg/right-arrow-icon.svg";
import {ReactComponent as Delete} from "../images/svg/delete-icon.svg";
import {ReactComponent as QuestionMark} from "../images/svg/question-mark.svg";
import {NavLink, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AppContext} from "../App";
import {default as Axios} from "axios";
import {useTranslation} from "./Language";


export const BuildComponent = (props: any) => {
    const {currentBuild, setCurrentBuild, setCurrentFiltersToApply} = useContext(AppContext)
    const {severalItems, title, component, compatibilityCheckResult, componentLink} = props
    const navigation = useNavigate()
    const {language, translate} = useTranslation()
    return (
        <div className={`build-item-wrapper ${compatibilityCheckResult?.length > 0 ? "non-compatible" : ""}`}>
            <div className="build-item-header">
                {<div className={`build-item-message ${compatibilityCheckResult?.length > 0 ? "visible" : ""}`}>
                    <Tooltip arrow title={<h1 style={{fontSize: 18, fontWeight: 400, whiteSpace: "pre-wrap"}}>{compatibilityCheckResult?.map((v: any) => translate(v))?.join("\n")}</h1>}>
                        <div>
                            <QuestionMark/>
                        </div>
                    </Tooltip>
                </div>}
                {/*{currentBuild[component] && <div className={`build-item-arrows ${severalItems ? "visible" : ""}`}>*/}
                {/*    <div className="build-item-arrow"><LeftArrow/></div>*/}
                {/*    <div className="build-item-arrow"><RightArrow/></div>*/}
                {/*</div>}*/}
                {currentBuild[component] &&
                    <div className="build-item-delete"
                         onClick={() => {
                             currentBuild[component] = null
                             setCurrentBuild({...currentBuild})
                         }}>
                        <Delete/>
                    </div>}
            </div>
            <div className={"build-item-content-wrapper"}>
                {currentBuild[component] ?
                    <NavLink to={`/component/${componentLink}/${currentBuild[component]?.id}`}>
                        <div className="build-item-pic-holder">
                            <img className={`item-pic ${component}`} src={currentBuild[component]?.imageURL} alt={""}/>
                        </div>
                    </NavLink>
                    :
                    <div
                        className="build-item-plus-sign"
                        onClick={() => {
                            let currentBuildForServer: any = {}
                            Object.keys(currentBuild).forEach(value => {
                                if (currentBuild[value]) {
                                    currentBuildForServer[value] = currentBuild[value].sku
                                }
                            })
                            Axios.post(`http://192.168.0.107:8080/api/v1/builds/compatibility-checker/filters`, currentBuildForServer, {
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                            }).then(value => {
                                setCurrentFiltersToApply(value.data.filters)
                                navigation(`/components/${componentLink}?compatibility-filters=true`)
                            })
                        }}
                    >
                        <span className="build-item-plus-line"></span>
                        <span className="build-item-plus-line"></span>
                    </div>
                }
            </div>
            <div className={`build-item-title ${language} ` + (currentBuild[component] ? "item-selected" : "")}>
                <p>{currentBuild[component] ? currentBuild[component].componentName : translate(title)}</p>
            </div>
        </div>
    )
}