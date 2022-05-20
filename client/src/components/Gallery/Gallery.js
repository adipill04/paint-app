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

    // function deleteImage(id) {
    // // eslint-disable-next-line no-restricted-globals
    // const confirmDelete = confirm(
    //     "Are you sure you want to delete this image?"
    // );

    // if (!confirmDelete) return;
    // const updatedImages = JSON.parse(localStorage.getItem("paintyImages"));

    // // find index of id
    // const indexToDelete = updatedImages.findIndex((elem) => elem.id === id);

    // // delete elem at that index
    // updatedImages.splice(indexToDelete, 1);

    // // update storage
    // localStorage.setItem("paintyImages", JSON.stringify(updatedImages));

    // setImages(updatedImages);
    // }

    let imageElements = (
    <p className="text-light">Your saved drawings will appear here</p>
    );
    if (drawings.userDrawings) {
    imageElements = drawings.userDrawings.reverse().map((image, index) => (
        <GalleryDrawing
        src={image.src}
        alt={image.name}
        name={image.name}
        id={image.id}
        key={index}
        createdAt={image.createdAt}
        // deleteImage={deleteImage}
        />
    ));
    }
    return <Row>{imageElements}</Row>;
}
