import "../../styles/components/GalleryDrawing.scss";

export default function GalleryDrawing (props) {

  function shareImage () {
    props.shareImage(props.id, props.type)
  }

  function deleteImage () {
    props.deleteImage(props.id)
  }

  return (
    <div 
      className="col-12 col-md-6 col-lg-4 mb-3 position-relative"
    >
      <div className="name-pill">
        Name: {props.name}
      </div>
      <span>id: {props.id}</span>
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
        shareImage={props.shareImage ?
          shareImage : 
          undefined
        }
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
      {props.shareImage ?
        <button className="btn btn-primary" onClick={props.shareImage}>
          Share
        </button> : null
      }
      {props.deleteImage ?
        <button className="btn btn-danger ms-1" onClick={props.deleteImage}>
          Delete
        </button> : null
      }
    </div>
  )
}