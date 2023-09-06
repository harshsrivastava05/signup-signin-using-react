import { Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from "@mui/material/Button";
import axios from 'axios';
import { flexbox } from "@mui/system";

function Courses() {

    const [courses, setcourses] = useState([]);

    useEffect( () => {
        
            axios.get("http://localhost:3000/admin/course",{
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            }).then((res)=>{
                console.log(res.data.allcourses);
            setcourses(res.data.allcourses);
            })
                  
    }, []);

    return (<div>

        <Typography variant="h5"  style={{ 
            textDecoration: 'underline',
            margin: 8,
            textAlign: "center"

           }}>
            Your present courses
            </Typography>
        <div style={{ display: "flex", flexWrap: "wrap" , justifyContent: "center" }}>
            {courses.map((course) => (
                <Course key={course._id} course={course} />
                ))}
        </div>
                </div>
    );
}

function Course(props) {
    return (
        <Card 
            style={{
                display: "flex",
                flexDirection: "column",
                width: 300,
                margin: 10,
                padding: 5,
                minHeight: 200,
                overflow: "hidden"
            }}>
                <div >
                <CardMedia
                sx={{ height: 150 }}
                image={props.course.imageLink}
            />
                </div>
           
            <CardContent style={{ textAlign: "center" }}>
               
                <Typography gutterBottom variant="h5" component="div">
                    {props.course.title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    {props.course.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button 
                onClick={()=>{
                    window.location =`/admin/course/${props.course._id}`;
                }} 
                 variant={"contained"} size="medium">Update</Button>
                 

            </CardActions>
        </Card>
    );
}


export default Courses;
