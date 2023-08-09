import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useScrollTrigger } from '@mui/material';
import { useState } from 'react';


function Addcourse() {
    const[title,settitle] = useState("")
    const[Description,setdescription] = useState("")

    return (
        <div>

            <div style={{
                paddingTop: 150,
                marginBottom: 4,
                display: "flex",
                justifyContent: "center"
            }}>
                <Typography variant='h5'>Create a new course</Typography>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                <Card
                    variant='outlined'
                    style={{
                        width: 400,
                        padding: "22px",
                        borderRadius: "7px",
                    }}
                >

                    <TextField
                        fullWidth
                        onChange={(e) => {
                            settitle(e.target.value)
                        }}
                        label="title"
                        variant="outlined" />

                    <br /><br />

                    <TextField
                        fullWidth
                        onChange={(e) => {
                            setdescription(e.target.value)
                        }}
                        label="Description"
                        variant="outlined" />

                    <br /><br />

                    <Button
                        size='large'
                        onClick={() => {
                            fetch("http://localhost:3000/admin/courses", {
                                method: "POST",
                                body: JSON.stringify({
                                   title : title,
                                   Description: Description,
                                   imageLink: "",
                                   published: true
                                }),
                                headers: {
                                    "content-type": "application/json",
                                    "Authorization": "Bearer " + localStorage.getItem("token")
                                }
                            }).then((res)=>{
                                res.json().then((data)=>{
                                    localStorage.setItem("token", data.token);
                                })
                            })
                        }}
                        variant="contained">
                        add course
                    </Button>
                </Card>
            </div>

        </div>

    )

}

export default Addcourse;
