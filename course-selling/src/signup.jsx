import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';




function Signup() {
    return (
        <div>

            <div style={{
                paddingTop: 150,
                marginBottom: 4,
                display: "flex",
                justifyContent: "center"
            }}>
                <Typography variant='h5'>welcome to coursera! Sign up below</Typography>
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
                        id="username"
                        label="username"
                        variant="outlined" />

                    <br /><br />

                    <TextField
                        fullWidth
                        id="email"
                        label="email"
                        variant="outlined" />

                    <br /><br />

                    <TextField
                        fullWidth={true}
                        id="password"
                        label="password"
                        variant="outlined"
                        type="password" />

                    <br /><br />

                    <TextField
                        fullWidth
                        id="confirmpassword"
                        label="confirm password"
                        variant="outlined"
                        type="password" />

                    <br /><br />

                    <Button
                        size='large'
                        onClick={() => {
                            let username = document.getElementById("username").value;
                            let email = document.getElementById("email").value;
                            let password = document.getElementById("password").value;
                            let confirmpassword = document.getElementById("confirmpassword").value;
                            fetch("http://localhost:3000/admin/signup", {
                                method: "POST",
                                body: JSON.stringify({
                                    username,
                                    email,
                                    password,
                                    confirmpassword
                                }),
                                headers: {
                                    "content-type": "application/json"
                                }
                            })

                        }}
                        variant="contained">sign up</Button>

                </Card>

            </div>
        </div>
    )
}

export default Signup;