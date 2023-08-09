import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useState } from 'react';




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
                        onClick={() => {

                            fetch("http://localhost:3000/admin/signin", {
                                method: "POST",
                                body: JSON.stringify({
                                    username: username,
                                    password: password
                                }),
                                headers: {
                                    "content-type": "application/json"
                                }
                            }).then((res) => {
                                res.json().then((data) => {
                                    console.log(data)
                                })
                            })
                        }}
                        variant="contained">
                        sign in
                    </Button>

                </Card>

            </div>
        </div>
    )
}

export default Signin;
