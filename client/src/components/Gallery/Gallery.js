import React, { useEffect, useState } from "react";
import GalleryDrawing from "../GalleryDrawing/GalleryDrawing.js";
import { Row } from "react-bootstrap";
import axios from "axios";

export default function DrawingBoard() {
    const [drawings, setDrawings] = useState({
        userDrawings: null,
        otherDrawings: null
    });

    useEffect(() => {
        getDrawings();
    }, []);

    function getDrawings() {
        axios.get('http://localhost:1337/api/getDrawings', {
            headers: {
                "x-access-token": localStorage.getItem('paint-app-access-token')
            }
            }).then(response => {
                console.log(response);
                const { userDrawings, otherDrawings} = response.data;
                setDrawings({ userDrawings, otherDrawings});
            }).catch((error) => {
            console.log("ERROR: "+error);
        });
    };

    function shareImage(id, type="private") {
        const userShareEmail = prompt("Enter user email to share with");
        if(userShareEmail) console.log(userShareEmail);
        axios.post("http://localhost:1337/api/shareDrawing/", {
            userShareEmail: userShareEmail,
            drawingId: id
        }).catch((error) => {
            console.log("ERROR: "+error);
        });
    }

    function deleteImage(id) {
    // eslint-disable-next-line no-restricted-globals
    const confirmDelete = confirm(
        "Are you sure you want to delete this image?"
    );

    if (!confirmDelete) return;
    console.log("Deleting image with id: ", id);
    axios.delete(`http://localhost:1337/api/deleteDrawing/${id}`, {
        headers: {
            'x-access-token': localStorage.getItem('paint-app-access-token')
        }
    }).then(() => {
        const updatedUserDrawings = drawings.userDrawings.filter(item => item.id !== id)
        setDrawings({...drawings, userDrawings: updatedUserDrawings});
    }).catch((error) => {
        console.log("ERROR: "+error);
    });
    }

    let userDrawingImgElements = (
    <p className="text-light">Your saved drawings will appear here</p>
    );
    if (drawings.userDrawings) {
        userDrawingImgElements = drawings.userDrawings.reverse().map((image, index) => (
            <GalleryDrawing
            src={image.src}
            alt={image.name}
            name={image.name}
            id={image.id}
            key={image.id}
            createdAt={image.createdAt}
            shareImage={shareImage}
            deleteImage={deleteImage}
            />
        ));
    }
    let otherDrawingImgElements = (
        <p className="text-light">Public drawings and drawings that are shared with you will appear here!</p>
        );
    if (drawings.otherDrawings) {
        otherDrawingImgElements = drawings.otherDrawings.reverse().map((image, index) => (
            <GalleryDrawing
            src={image.src}
            alt={image.name}
            name={image.name}
            id={image.id}
            key={image.id}
            createdAt={image.createdAt}
            />
        ));
    }
    return (
    <div>
        <h2>YOUR DRAWINGS</h2>
        <Row>{userDrawingImgElements}</Row>
        <h2>PUBLIC & SHARED DRAWINGS</h2>
        <Row>{otherDrawingImgElements}</Row>
    </div>
    );
}
