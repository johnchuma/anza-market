import { Spinner, Stack } from "react-bootstrap";

const Loader = () => {
    return (  <Stack direction="horizontal" className="d-flex justify-content-center">
    <Spinner/>
    </Stack>);
}
 
export default Loader;