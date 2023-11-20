const Heading = ({text,styles,fontWeight, className,fontSize,color,onClick}) => {
    return ( <div onClick={onClick} className={className} style={{ ...styles,fontWeight:fontWeight??600,fontSize:fontSize??25,lineHeight:1,color:color??"#000000"}} dangerouslySetInnerHTML={{ __html:text }}></div> );
}
 
export default Heading;