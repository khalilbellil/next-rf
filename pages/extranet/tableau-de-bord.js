import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/client'

export default function tableauDeBord() {
    const [ session, loading ] = useSession()
    return <>
        {!session && <>
            Not signed in <br/>
            <button onClick={signIn}>Sign in</button>
        </>}
        {session && <>
            Hello {session.user.name}, your are signed in as {session.user.email} <br/>
            <button onClick={signOut}>Sign out</button>
        </>}
    </>
}
