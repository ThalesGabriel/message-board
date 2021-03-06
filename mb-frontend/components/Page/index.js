import { Box, useTheme } from "@material-ui/core";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getCookieFromBrowser } from "../../utils/cookie";
import Appbar from "./Appbar";
import Copyright from "./Copyright";

export default function Page(props) {
    const router = useRouter()
    const theme = useTheme()
    useEffect(() => {
        // console.log('token', JSON.parse(getCookieFromBrowser("AUTHORIZATION_TOKEN")))
        if(!getCookieFromBrowser("AUTHORIZATION_TOKEN")) router.push('/')
    }, [])

    if(!getCookieFromBrowser("AUTHORIZATION_TOKEN")) return null

    return (
        <Box style={{display: "flex", flexDirection: 'column', height: '100vh'}}>
            <Appbar/>
            <Box style={{padding: 20}}>
                {props.children}
            </Box>
            <Box style={{padding: 20, backgroundColor: theme.palette.primary.main, marginTop: 'auto'}}>
                <Copyright/>
            </Box>
        </Box>
    )
}