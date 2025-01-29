import { Navigate, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../contexts/authContext"; 
import { handleError } from "../utils/errorHandler";

const Gallery = () => {

  let { drawingId } = useParams(); 
  const { logout } = useAuth();
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true);
  const [drawing, setDrawing] = useState(null);

  useEffect(() => {
    getDrawings();
    setLoading(false);
}, []);

function getDrawings() {
    axios.get(`http://localhost:1337/api/drawing/${drawingId}`, {
        headers: {
            "x-access-token": localStorage.getItem('paint-app-access-token')
        }
        }).then(response => {
            const { drawing } = response.data;
            setDrawing(drawing);

        }).catch((error) => {
            handleError();
    });
};

  return (loading? <div>LOADING...</div> :
      <>
         {drawing ? 
         <img
          alt={drawing.name}
          src={drawing.src}
          key={drawing.id}
          // width="100%"
          // height="100%"
          name={drawing.name}
         /> : <div>DRAWING NOT FOUND!</div>}
      </>
  );
}

export default Gallery;
