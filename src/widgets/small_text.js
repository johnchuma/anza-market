import { mutedColor } from "../utils/colors";

const SmallText = ({text,styles,fontWeight, className,fontSize,color}) => {
    return ( <div  className={className} style={{ ...styles,fontWeight:fontWeight??400,fontSize:fontSize??14,color:color??mutedColor}} dangerouslySetInnerHTML={{ __html:text }}></div> );
}
 
export default SmallText;