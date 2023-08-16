import { Card, CardContent, Typography, Button} from "@mui/material";
import React from "react";
import './AccessDenied.css';
import { useNavigate } from "react-router-dom";

export default function AccessDenied(){

    var navigate = useNavigate();
    return(
        <div className="AccessDenied">
            <Card elevation={24}>

                <CardContent>
                    <img className="center"  src="./assess-denied.jpg" alt="">                                  
                    
                    </img>
            <Typography variant='h1'>
                <h1>ACCESS DENIED<br/>  </h1>
                </Typography>
                <Typography variant="h2">
          <p>  YOU ARE SUPPOSED TO LOGIN BEFORE YOU CAN ACCESS THIS PAGE!! </p>
            </Typography>
            </CardContent>
            </Card>
            <br/>
            <Button className="button" variant="contained" onClick={(e)=>navigate("/login")}>
                GO TO LOGIN
            </Button>
        </div>
    );
};