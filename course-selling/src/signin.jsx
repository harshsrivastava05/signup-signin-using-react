import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import axios from 'axios';




function Signin() {
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")

    return (
        <div>

            <div style={{
                paddingTop: 150,
                marginBottom: 4,
                display: "flex",
                justifyContent: "center"
            }}>
                <Typography variant='h5'>welcome back! sign in below</Typography>
            </div>

            <div style={{
                display: "flex",
                justifyContent: "center"
            }}>

                <Card variant="outlined" style={{
                    width: 400,
                    padding: "22px",
                    borderRadius: "7px",
                }}>

                    <TextField
                        fullWidth
                        onChange={(e) => {
                            setusername(e.target.value)
                        }}
                        label="username"
                        variant="outlined" />

                    <br /><br />




                    <TextField
                        fullWidth
                        onChange={(e) => {
                            setpassword(e.target.value)
                        }}
                        label="password"
                        variant="outlined"
                        type="password" />

                    <br /><br />



                    <Button
                        size='large'
                        onClick={async () => {
                            const res = await axios.post("http://localhost:3000/admin/signin", {
                                username: username,
                                password: password
                            })
                            const data = res.data;
                            localStorage.setItem("token", data.token);
                            window.location = "/admin/course";
                        }
                        }
                        variant="contained">
                        sign in
                    </Button>

                </Card>

            </div>
        </div>
    )
}

export default Signin;
