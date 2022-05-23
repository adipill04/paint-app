import { useState } from "react";
import "../../styles/components/GalleryDrawing.scss";

export default function GalleryDrawing (props) {

  function shareImage () {
  }

  function deleteImage () {
    props.deleteImage(props.id)
  }

  return (
    <div 
      className="col-12 col-md-6 col-lg-4 mb-3 position-relative"
    >
      <div className="name-pill">
        {props.name}
      </div>

      <img
        alt={props.name}
        src={props.src} 
        key={props.id}
        width="100%"
      />
      <div className="name-pill">
        created at: {props.createdAt}
      </div>
      
      <ButtonGroup
        shareImage={shareImage}
        deleteImage={props.deleteImage ?
          deleteImage : 
          undefined
        }
      />
    </div>
  )
}

function ButtonGroup (props) {
  return (
    <div>
      <button className="btn btn-primary">
        Share
      </button>
      <button className="btn btn-danger ms-1" onClick={props.deleteImage}>
        Delete
      </button>
    </div>
  )
}