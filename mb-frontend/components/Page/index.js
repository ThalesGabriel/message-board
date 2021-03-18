import { Box } from "@material-ui/core";
import Appbar from "./Appbar";
import Copyright from "./Copyright";

export default function Page(props) {
    return (
        <Box style={{display: "flex", flexDirection: 'column', height: '100vh'}}>
            <Appbar/>
            <Box style={{padding: 20}}>
                {props.children}
            </Box>
            <Copyright style={{marginTop: 'auto'}}/>
        </Box>
    )
}