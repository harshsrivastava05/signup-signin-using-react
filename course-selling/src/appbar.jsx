import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";


function Appbar() {
    const navigate = useNavigate()

    const [useremail, setuseremail] = useState(null)
    useEffect(() => {

        axios.get("http://localhost:3000/admin/me", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((res) => {
            const data = res.data;
            const name = data.username;
            setuseremail(name);
        })
    }
        , []);


    if (useremail) {
        return <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 4
        }}>
            <div>
                <Typography variant={"h6"}>
                    <Link to="/admin/addcourse" style={{ textDecoration: "none", color: "inherit" }}>
                        Coursera
                    </Link>
                </Typography>
            </div>

            <div style={{ display: "flex" }}>

                <div
                    style={{
                        paddingTop: 2,
                        paddingRight: 4,
                        fontSize: "24px"
                    }}>
                    <Link to="/admin/course" style={{ textDecoration: "none", color: "inherit" }}>
                        {useremail}
                    </Link>

                </div>

                <div style={{
                    marginLeft: 6,
                    marginRight: 6
                }}>
                    <Button
                        variant={"contained"}
                        onClick={() => {
                            navigate("/admin/addcourse")
                        }}
                    >add course</Button>
                </div>

                <div style={{
                    marginLeft: 6,
                    marginRight: 6
                }}>
                    <Button
                        variant={"contained"}
                        onClick={() => {
                            navigate("/admin/course")
                        }}
                    >Your Courses</Button>
                </div>

                <div style={{ marginLeft: 6 }}>
                    <Button
                        variant={"contained"}
                        onClick={() => {
                            localStorage.setItem("token", null);
                            window.location = "/admin/signin"
                        }}
                    >log out</Button>
                </div>
            </div>
        </div>
    }

    return <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 4
    }}>
        <div>
            <Typography variant={"h6"}>
                <Link to="/admin/addcourse" style={{ textDecoration: "none", color: "inherit" }}>
                    Coursera
                </Link>
            </Typography>
        </div>

        <div style={{ display: "flex" }}>
            <div style={{ marginRight: 10 }}>
                <Button
                    variant={"contained"}
                    onClick={() => {
                        navigate("/admin/signup")
                    }}
                >Signup</Button>
            </div>
            <div style={{ marginRight: 10 }}>
                <Button
                    variant={"contained"}
                    onClick={() => {
                        navigate("/admin/signin")
                    }}
                >Signin</Button>
            </div>

        </div>
    </div>
}

export default Appbar;
