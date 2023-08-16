import { Card, CardContent, Typography} from "@mui/material";
import React from "react";
import './AccessError.css';
// import { useNavigate } from "react-router-dom";

export default function AccessError(){

    // var navigate = useNavigate();
    return(
        <div className="AccessError">
            <Card elevation={24}>

                <CardContent>
                    <img className="center"  src="./error-sign.jpg" alt="">                                  
                    
                    </img>
            <Typography variant='h1'>
                <h1>ERROR IN ACCESSING THE PAGE <br/>  </h1>
                </Typography>
                <Typography variant="h2">
          <p>  SOMETHING WRONG HAPPENED WHILE ACCESSING THE PAGE </p>
            </Typography>
            </CardContent>
            </Card>

            {/* <Button onClick={(e)=>navigate("/login")}>
                GO TO LOGIN
            </Button> */}
        </div>
    );
};