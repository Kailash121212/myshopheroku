import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
export default function Error() {
    var navigate = useNavigate()
    useEffect(() => {
        navigate("/")
    }, [])
    return (
        <>
            <h1>404!! page not found</h1>
        </>
    )
}
