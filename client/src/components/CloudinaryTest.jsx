import React, { useState }from "react";
import axios from "axios";

const CloudinaryTest = () => {

    const [file, setFile] = useState("");
    const [image, setImage] = useState("");

    function previewFile(file){
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            console.log(image);
            setImage(reader.result);
    };
}

    const changeHandler = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        previewFile(selectedFile);
    }

    const submitHandler = async(e) => {
        e.preventDefault();
        const result = await axios.post("http://localhost:8000/api/fileUpload", {}, {
        image: image});
        try{
            console.log(result.data);
        }
        catch(err){
            console.log(err);
        }
    }


    return (
        <>
        <form onSubmit={e => submitHandler(e)}>
            <label htmlFor="fileInput">Upload Photo:</label>
            <input type="file" id="fileInput" onChange={changeHandler} 
            required
            accept="img/png, img/jpeg, img/jpg"/> 
            <button className="button button-warning">submit</button>
        </form>
        <img src={image} alt="preview of uploaded image" />
        </>
    );
}


export default CloudinaryTest;