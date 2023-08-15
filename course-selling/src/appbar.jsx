import {Typography} from "@mui/material";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

function Appbar() {
    const navigate = useNavigate()
    return <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 4
    }}>
        <div>
            <Typography variant={"h6"}>Coursera</Typography>
        </div>

        <div style={{display: "flex"}}>
            <div style={{marginRight: 10}}>
                <Button
                    variant={"contained"}
                    onClick={() => {
                        navigate("/admin/signup")
                    }}
                >Signup</Button>
            </div>
            <div>
                <Button
                    variant={"contained"}
                    onClick={() => {
                        navigate("/admin/signin")
                    }}
                >Signin</Button>
            </div>
            <div style={{marginLeft : 10}}>
                <Button
                    variant={"contained"}
                    onClick={() => {
                        navigate("/admin/addcourse")
                    }}
                >add course</Button>
            </div>
        </div>
    </div>
}

export default Appbar;
