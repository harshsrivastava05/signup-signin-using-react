import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import { useNavigate } from "react-router-dom";



function CourseId() {
    let { courseId } = useParams();
    const [course, setCourse] = useState({
        title: "",
        description: "",
        price: 0,
        imageLink: "",
        published: false
    });

    const [title, settitle] = useState("");
    const [description, setdescription] = useState("");
    const [price, setprice] = useState("");
    const [imageLink, setimagelink] = useState("");
    const [published, setPublished] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(`http://localhost:3000/admin/course/${courseId}`, {
                headers: {
                    "content-type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            const data = res.data;
            console.log(data.Course);
            setCourse(data.Course);
            settitle(data.Course.title); 
            setdescription(data.Course.description);
            setprice(data.Course.price);
            setimagelink(data.Course.imageLink);
            setPublished(data.Course.published);
        };
        fetchData();

    }, [courseId])


    return (

        <div>
             <div style={{
            marginTop:"10px",
            height: "50vh",
            width: "100vw",
            borderRadius:"30px",
            background: "rgb(2,0,36)",
            background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,9,111,1) 35%, rgba(6,188,224,1) 100%)"
        }}>

            <div style={{
                paddingTop: 70,
                marginBottom: 4,
                display: "flex",
                justifyContent: "center",
                color:"antiquewhite"
            }}>
                <Typography variant='h5'>Update your course</Typography>
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
                        variant="outlined"
                        value={title}
                        placeholder={course.title}
                    />

                    <br /><br />

                    <TextField
                        fullWidth
                        onChange={(e) => {
                            setdescription(e.target.value)
                        }}
                        label="Description"
                        variant="outlined"
                        value={description}
                        placeholder={course.description}
                    />

                    <br /><br />

                    <TextField
                        fullWidth
                        onChange={(e) => {
                            setprice(e.target.value)
                        }}
                        label="Enter the price"
                        variant="outlined"
                        value={price}
                        placeholder={String(course.price)}
                    />

                    <br /><br />

                    <TextField
                        fullWidth
                        onChange={(e) => {
                            setimagelink(e.target.value)
                        }}
                        label="Course image link"
                        variant="outlined"
                        value={imageLink}
                        placeholder={course.imageLink}
                    />



                    <div
                        style={{
                            marginTop: 13
                        }}>
                        <FormControlLabel control={
                            <Checkbox
                                checked={course.published}
                                onChange={(e) => {
                                    setPublished(e.target.checked);
                                }}
                            />}
                            label="publish the course" />
                    </div>

                    <br />
                    <div style={{
                        display: "flex",
                        justifyContent: "space-around"
                    }}>
                        <Button
                            size='large'
                            onClick={async () => {
                                const res = await axios.put(`http://localhost:3000/admin/course/${courseId}`,{
                                    title: title,
                                        description: description,
                                        price: price,
                                        imageLink: imageLink,
                                        published: published
                                },{
                                    headers: {
                                        "content-type": "application/json",
                                        "Authorization": "Bearer " + localStorage.getItem("token")
                                    }
                                });
                                const data = res.data;
                                alert("course updated succesfuly!!");

                            }
                            }
                            variant="contained">
                            Update course
                        </Button>
                        <Button
                            variant={"contained"}
                            onClick={() => {
                                // window.location = "/admin/course"
                                navigate("/admin/course");
                            }}
                        >Go back</Button>
                    </div>
                    <br /><br />


                </Card>
            </div>
</div>
        </div>



    );

}

export default CourseId;
