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
                    <img className="center"  src="./error-sign.jpg" alt="">                                  
                    
                    </img>
            <Typography variant='h1'>
                <h1>ERROR IN ACCESSING THE PAGE <br/>  </h1>
                </Typography>
                <Typography variant="h2">
          <p>  YOU ARE NOT ALLOWED TO ACCESS THIS PAGE PLEASE </p>
            </Typography>
            </CardContent>
            </Card>

            <Button onClick={(e)=>navigate("/login")}>
                GO TO LOGIN
            </Button>
        </div>
    );
};