import 'bootstrap/dist/css/bootstrap.css'
import 'react-vis/dist/style.css';
import {useRouter} from "next/router";
import React, {CSSProperties} from "react";
import Link from "next/link";

export default ({Component, pageProps}) => {
    const router = useRouter();

    return (
        <div style={{display: "flex"}}>
            <div style={styles.sidebar}>
                <MyLink router={router} href="/autopilot">Autopilot</MyLink>
                <MyLink router={router} href="/compass">Compass</MyLink>
                <MyLink router={router} href="/logs">Logs</MyLink>
            </div>
            <div style={styles.main}>
                <Component {...pageProps} />
            </div>
        </div>
    )
}

const MyLink = ({href, router, children}) => {
    const isActive = () => router.pathname === href;

    return (
        <Link href={href}>
        <span style={{paddingTop: 15, paddingBottom: 15, fontSize: '20px', color: isActive() ? 'red' : 'black'}}>
            {children}
        </span>
        </Link>
    )}

const styles = {
    sidebar: {
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 5,
        paddingRight: 10,
        borderRight: '1px solid red'
    } as CSSProperties,
    main: {
        padding: 10,
        width: '100%'
    } as CSSProperties
}

