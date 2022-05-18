import { useState, useEffect } from 'react';
import Canvas
 from '../components/Canvas/Canvas';
import ActionsBar from '../components/ActionsBar/ActionsBar'
export default function Paint() {
  //timer
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    let timer = null;
    if(isActive){
      timer = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  });
    const brushSizes = [4, 12, 30, 50];
    // tools state
    const [currentTool, setTool] = useState("Brush Tool")
    const [currentBrushColor, setBrushColor] = useState("#000000");
    const [currentBrushSize, setBrushSize] = useState(brushSizes[0]);

    function eraseCanvas () {
        setIsActive(false);
        setSeconds(0);
        const canvas = document.getElementById("canvas");
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    function saveCanvas (drawingTitle) {
        const canvas = document.getElementById("canvas");
    
        let imageName
        if (!drawingTitle) {
          imageName = prompt("Assign a name to this image before saving it", "NewDrawing");
          if (!imageName)
            return
        } else {
          imageName = drawingTitle
          setIsActive(false);
        }
        
        const dataURL = canvas.toDataURL();
    
        // check for stored images
        const galleryImages = JSON.parse(localStorage.getItem("paintyImages"));
    
        const imgID = galleryImages
          ? galleryImages[galleryImages.length - 1].id + 1
          : 0;
    
        // build image object
        const imgObject = {
          id: imgID,
          src: dataURL,
          name: imageName,
        };
    
        if (galleryImages) {
          // add to array and store it back
          galleryImages.push(imgObject);
          localStorage.setItem("paintyImages", JSON.stringify(galleryImages));
        } else {
          // create an array
          let arr = [];
          arr.push(imgObject);
          localStorage.setItem("paintyImages", JSON.stringify(arr));
        }
        // After saving the painting reset the timer and clear the canvas
        setSeconds(0);
        eraseCanvas();
      };

    return (
        <>
        <ActionsBar
        eraseCanvas={eraseCanvas}
        saveCanvas={saveCanvas}
        />
        <Canvas
        timerStarted={isActive}
        startTimer={setIsActive}
        currentTool={currentTool}
        currentBrushSize={currentBrushSize}
        currentBrushColor={currentBrushColor}
        />
      </>
    )
}