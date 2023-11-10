const Heading2 = ({text,styles,fontWeight, className,fontSize,color,onClick}) => {
    return ( <div onClick={onClick}  className={className} style={{ ...styles,fontWeight:fontWeight??600,fontSize:fontSize??20,color:color??"#000000"}} dangerouslySetInnerHTML={{ __html:text }}></div> );
}
 
export default Heading2;