import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


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


    useEffect(() => {
        fetch(`http://localhost:3000/admin/course/${courseId}`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((res) => {
            res.json().then((data) => {
                console.log(data.Course);
                setCourse(data.Course);
                settitle(data.Course.title); // Set initial values for text fields
                setdescription(data.Course.description);
                setprice(data.Course.price);
                setimagelink(data.Course.imageLink);
                setPublished(data.Course.published);
            })
        })
    }, [courseId])


    return (

        <div>

            <div style={{
                paddingTop: 150,
                marginBottom: 4,
                display: "flex",
                justifyContent: "center"
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
                        display:"flex",
                        justifyContent:"space-around"
                    }}> 
                    <Button
                        size='large'
                        onClick={() => {

                            fetch(`http://localhost:3000/admin/course/${courseId}`, {
                                method: "PUT",
                                body: JSON.stringify({
                                    title: title,
                                    description: description,
                                    price: price,
                                    imageLink: imageLink,
                                    published: published
                                }),
                                headers: {
                                    "content-type": "application/json",
                                    "Authorization": "Bearer " + localStorage.getItem("token")
                                }


                            }).then((res) => {
                                res.json().then((data) => {
                                    console.log(data)
                                    alert("course updated succesfuly!!")
                                })
                            })

                        }
                    }
                        variant="contained">
                        Update course
                    </Button>
                    <Button
                        variant={"contained"}
                        onClick={() => {
                            window.location ="/admin/course"
                        }}
                    >Go back</Button>
                    </div>
                    <br /><br />


                </Card>
            </div>

        </div>



    );

}

export default CourseId;