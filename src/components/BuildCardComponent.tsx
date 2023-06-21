import {ReactComponent as CpuChipIcon} from "../images/svg/cpu-chip-icon.svg";
import {useTranslation} from "./Language";

export const BuildCardComponent = (props: any) => {
    const {translate} = useTranslation()
    return (
        <div className={`build-card-component-wrapper `}>
            <div className={`build-card-component id-${props.id} ${props.component === null ? "background" : ""} ${props.compatibilityCheckResult?.length > 0 ? "non-compatible" : ""}`}>
                {!props.component ?
                    <CpuChipIcon/> :
                    <img className={"build-card-component-image"} src={props.component.imageURL} alt=""/>
                }
            </div>
            <p>{translate(props.componentType)}</p>
        </div>
    )
}