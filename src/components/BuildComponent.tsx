import Tooltip from '@mui/material/Tooltip';
import {ReactComponent as LeftArrow} from "../images/svg/left-arrow-icon.svg";
import {ReactComponent as RightArrow} from "../images/svg/right-arrow-icon.svg";
import {ReactComponent as Delete} from "../images/svg/delete-icon.svg";
import {ReactComponent as QuestionMark} from "../images/svg/question-mark.svg";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AppContext} from "../App";
import {default as Axios} from "axios";


export const BuildComponent = (props: any) => {
    const {currentBuild, setCurrentBuild, setCurrentFiltersToApply, getComponentServerName} = useContext(AppContext)
    const {severalItems, title, component, compatibilityCheckResult} = props
    const navigation = useNavigate()
    // const [state, setState] = useState(initState);
    return (
        <div className={`build-item-wrapper ${compatibilityCheckResult?.length > 0 ? "non-compatible" : ""}`}>
            <div className="build-item-header">
                {<div className={`build-item-message ${compatibilityCheckResult?.length > 0 ? "visible" : ""}`}>
                    <Tooltip title={<h1 style={{fontSize: 18, fontWeight: 400}}>{compatibilityCheckResult?.join("\n")}</h1>}>
                        <div>
                            <QuestionMark/>
                        </div>
                    </Tooltip>
                </div>}
                {currentBuild[component] && <div className={`build-item-arrows ${severalItems ? "visible" : ""}`}>
                    <div className="build-item-arrow"><LeftArrow/></div>
                    <div className="build-item-arrow"><RightArrow/></div>
                </div>}
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
                    <div className="build-item-pic-holder">
                        <img className={`item-pic ${component}`} src={currentBuild[component]?.imageURL} alt={""}/>
                    </div>
                    :
                    <div
                        className="build-item-plus-sign"
                        onClick={() => {
                            let currentBuildForServer: any = {}
                            Object.keys(currentBuild).forEach(value => {
                                if (currentBuild[value]) {
                                    currentBuildForServer[getComponentServerName(value)] = currentBuild[value].sku
                                }
                            })
                            Axios.post(`http://localhost:8080/api/v1/builds/filters`, currentBuildForServer, {
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                            }).then(value => {
                                setCurrentFiltersToApply(value.data.filters)
                                // console.log(value.data)
                                navigation(`/components/${component}?compatibility-filters=true`)
                            })
                            // axios.post()
                        }}
                    >
                        <span className="build-item-plus-line"></span>
                        <span className="build-item-plus-line"></span>
                    </div>
                }
            </div>
            <div className={"build-item-title " + (currentBuild[component] ? "item-selected" : "")}>
                <p>{currentBuild[component] ? currentBuild[component].name : title}</p>
            </div>
        </div>
    )
}