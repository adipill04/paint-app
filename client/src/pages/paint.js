import { useState, useEffect } from 'react';
import Canvas from '../components/Canvas/Canvas.js';
import ActionsBar from '../components/ActionsBar/ActionsBar';
import useCounter from '../hooks/useCounter';
import axios from 'axios';
import PaintTools from '../components/PaintTools/PaintTools.js';

export default function Paint() {
  const [startedDrawing, setStartedDrawing] = useState(false);
  //timer
  const {seconds, start, clear } = useCounter();
  const brushSizes = [4, 12, 30, 50];
  // tools state
  const [currentTool, setTool] = useState("Brush Tool")
  const [currentBrushColor, setBrushColor] = useState("#000000");
  const [currentBrushSize, setBrushSize] = useState(brushSizes[0]);
  const [drawingType, setDrawingType] = useState("private");

  function changeTool (tool) {
    if (tool === "Brush Tool") {
      setTool(tool);
      setBrushSize(brushSizes[1]);
    }

    if (tool === "Eraser Tool") {
      setTool(tool);
      setBrushColor("#ffffff");
      setBrushSize(brushSizes[3])
    }

    if (tool === "Paint Bucket Tool") {
      setTool(tool);
      setBrushSize(brushSizes[0]); // ???? <--- not really needed ??
    }
  };

  function eraseCanvas () {
      clear();
      setStartedDrawing(false);
      const canvas = document.getElementById("canvas");
      const context = canvas.getContext('2d');
      context.clearRect(0, 0, canvas.width, canvas.height);
  }
    
  function saveCanvas (drawingType) {
      const canvas = document.getElementById("canvas");
      let imageName = prompt("Assign a name to this image before saving it", "NewDrawing");
      if (!imageName) return;
      
      const dataURL = canvas.toDataURL();

      uploadDrawing(imageName, drawingType, seconds, dataURL);
      // After saving the painting reset the timer and clear the canvas
      clear();
      eraseCanvas();
      setStartedDrawing(false);
    };

    function uploadDrawing(name, type, drawTime, imgData) {
      const reqBody = {
        name,
        type,
        img: imgData,
        drawTime
      }
      console.log("getting access token: ", localStorage.getItem('paint-app-access-token'));
      console.log("request body: ", reqBody);
      axios.post('http://localhost:1337/api/uploadDrawing', reqBody,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': localStorage.getItem('paint-app-access-token')
          }
      }).then(response => {
            const data = response.data;
            if(data) {
                console.log("Image upload successful!");
            } else {
                console.log("Image upload failed");
            }
        }).catch((error) => {
            console.log("ERROR: "+error);
        });
    }

  return (
    <>
      <ActionsBar
      eraseCanvas={eraseCanvas}
      saveCanvas={saveCanvas}
      />
      <PaintTools
        selectedColor={currentBrushColor}
        currentTool={currentTool}
        currentBrushSize={currentBrushSize}
        selectBrushSize={setBrushSize}
        selectBrushColor={setBrushColor}
        changeTool={changeTool}
      />
      <Canvas
      startTimer={start}
      startedDrawing={startedDrawing}
      setStartedDrawing={setStartedDrawing}
      currentTool={currentTool}
      currentBrushSize={currentBrushSize}
      currentBrushColor={currentBrushColor}
      />
    </>
  )
}