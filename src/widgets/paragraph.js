const Paragraph = ({text,styles,fontWeight, className,fontSize,color,onClick}) => {
    return ( <div onClick={onClick} className={className} style={{ ...styles,fontWeight:fontWeight??400,fontSize:fontSize??15,color:color??"#000000"}} dangerouslySetInnerHTML={{ __html:text }}></div> );
}
 
export default Paragraph;