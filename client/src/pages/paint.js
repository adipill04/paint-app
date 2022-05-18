import { useState } from 'react';
import Canvas
 from '../components/Canvas/Canvas';
import ActionsBar from '../components/ActionsBar/ActionsBar'
export default function Paint() {
    const brushSizes = [4, 12, 30, 50];
    // tools state
    const [currentTool, setTool] = useState("Brush Tool")
    const [currentBrushColor, setBrushColor] = useState("#000000");
    const [currentBrushSize, setBrushSize] = useState(brushSizes[0]);

    function eraseCanvas () {
        const canvas = document.getElementById("canvas");
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);

        // context.fillStyle = "#ffffff";
        // context.fillRect(0, 0, canvasAbsoluteWidth, canvasAbsoluteHeight);
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
      };

    return (
        <>
        <ActionsBar
        eraseCanvas={eraseCanvas}
        saveCanvas={saveCanvas}
        />
        <Canvas
        currentTool={currentTool}
        currentBrushSize={currentBrushSize}
        currentBrushColor={currentBrushColor}
        />
      </>
    )
}