import { Button } from "@mui/material";
import React from "react";
import {useState} from 'react';

export default function Demo(){
    const [count, setCount] = useState(0);

    function handleClick(){
        setCount(count+1);
    }

    return(
        <>
        <Button onClick={handleClick}>Click me!</Button>
        </>
    )
}