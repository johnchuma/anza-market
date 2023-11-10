const Heading = ({text,styles,fontWeight, className,fontSize,color}) => {
    return ( <div  className={className} style={{ ...styles,fontWeight:fontWeight??600,fontSize:fontSize??25,color:color??"#000000"}} dangerouslySetInnerHTML={{ __html:text }}></div> );
}
 
export default Heading;