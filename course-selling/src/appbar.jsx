import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


function Appbar() {
    return (
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding:"4px"
        }}>
            <div>
                <Typography variant='h5'>coursera</Typography>
            </div>
            <div style={{
                display: "flex",
            }}>
                <div style={{
                    marginRight: 10
                }}>

                    <Button 
                    onClick={()=>{
                        window.location = "/signup"
                    }}
                    variant='outlined'>
                        sign up
                    </Button>
                </div>
                <div>
                    <Button 
                    onClick = {()=> {
                        window.location = "/signin"
                    }}
                    variant='outlined'>
                        sign in
                    </Button>
                </div>
            </div>

        </div>
    )
}

export default Appbar;