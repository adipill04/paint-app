import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const Gallery = (props) => {

  let { drawing } = useParams(); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (loading? <div>LOADING...</div> :
      <>
        <div>GALLERY</div>
         {drawing ?<div>DRAWING: {drawing}</div> : null}
      </>
  );
}

export default Gallery;