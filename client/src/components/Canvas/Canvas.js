import React, { useState, useEffect, useRef } from "react";
import BrushCursor from "../BrushCursor/BrushCursor.js";
import useEventListener from "../../hooks/useEventListener";
import { Container, Row, Col } from "react-bootstrap";

// import "./DrawingBoard.css";

export default function Canvas(props) {
  useEventListener("mousemove", handleMouseMove);
  useEventListener("mousedown", handleMouseDown);
  useEventListener("mouseup", handleMouseUp);
  useEventListener("resize", handleWindowResize);
  // TODO: handle touch events
  useEventListener("onTouchStart", (e) => console.log("Touch start!"));
  useEventListener("onTouchMove", (e) => console.log("Touch drag!"));
  useEventListener("onTouchEnd", (e) => console.log("Touch end!"));

  const canvasRef = useRef();
  const [ctx, setCtx] = useState(0);

  // initialize canvas
  useEffect(() => {
    setupCanvas();
  }, []);

  function setupCanvas() {
    const canvas = canvasRef.current;

    canvas.style.backgroundColor = "white";
    canvas.width = canvasAbsoluteWidth;
    canvas.height = canvasAbsoluteHeight;
    canvas.style.width = "90%";
    canvas.style.height = "auto";

    const newCTX = canvas.getContext("2d");

    newCTX.fillStyle = "#ffffff";
    newCTX.fillRect(0, 0, canvasAbsoluteWidth, canvasAbsoluteHeight);

    setCtx(newCTX);
    calculcateCanvasRelativeSize();
  }
  const [mousePressed, setMousePressed] = useState(false);
  let [canvasHovered, setCanvasHovered] = useState(true);

  const [cursorX, setCursorX] = useState(0);
  const [cursorY, setCursorY] = useState(0);

  const [canvasRelativeX, setCanvasRelativeX] = useState(0);
  const [canvasRelativeY, setCanvasRelativeY] = useState(0);

  const [canvasAbsoluteWidth] = useState(800);
  const [canvasAbsoluteHeight] = useState(600);

  const [canvasRelativeWidth, setCanvasRelativeWidth] = useState(0);
  const [canvasRelativeHeight, setCanvasRelativeHeight] = useState(0);
  
  const startedDrawing = props.startedDrawing;
  const setStartedDrawing = props.setStartedDrawing;
  const startTimer = props.startTimer;
  useEffect(() => {
    if (mousePressed === true && startedDrawing === false) {
      // console.log("The timer started");
      setStartedDrawing(true);
      startTimer();
      const canvas = canvasRef.current;
      var video = document.querySelector("video");

      var videoStream = canvas.captureStream(30);
      var mediaRecorder = new MediaRecorder(videoStream);

      var chunks = [];
      mediaRecorder.ondataavailable = function(e) {
        chunks.push(e.data);
      };

      mediaRecorder.onstop = function(e) {
        var blob = new Blob(chunks, { 'type' : 'video/mp4' });
        chunks = [];
        var videoURL = URL.createObjectURL(blob);
        video.src = videoURL;
      };
      mediaRecorder.ondataavailable = function(e) {
        chunks.push(e.data);
      };

      mediaRecorder.start();
      // setInterval(draw, 300);
      setTimeout(function (){ mediaRecorder.stop(); }, 5000);
          }
  }, [mousePressed, startTimer, startedDrawing, setStartedDrawing]);

  function handleMouseMove(e) {
    const rect = canvasRef.current.getBoundingClientRect();

    setCursorX(e.clientX + window.pageXOffset);
    setCursorY(e.clientY + window.pageYOffset);

    const canvasAbsoluteX = e.clientX - rect.left;
    const canvasAbsoluteY = e.clientY - rect.top;
    const canvasRelativeX =
      (canvasAbsoluteX * canvasAbsoluteWidth) / canvasRelativeWidth;
    const canvasRelativeY =
      (canvasAbsoluteY * canvasAbsoluteHeight) / canvasRelativeHeight;
    setCanvasRelativeX(canvasRelativeX);
    setCanvasRelativeY(canvasRelativeY);

    // line below draws
    if (mousePressed) {
      if (props.currentTool) {
        drawPath();
      }
    }
  }

  function handleMouseDown() {
    setMousePressed(true);
    // this line allows for single dots by 1-click
    drawPath();
  }

  function handleMouseUp() {
    setMousePressed(false);
    ctx.beginPath();
  }

  function drawPath(e) {
    ctx.lineWidth = props.currentBrushSize;
    ctx.lineCap = "round";
    ctx.strokeStyle = props.currentBrushColor;

    ctx.lineTo(canvasRelativeX, canvasRelativeY);
    ctx.stroke();
    ctx.moveTo(canvasRelativeX, canvasRelativeY);
  }

  function handleMouseEnterCanvas() {
    setCanvasHovered(true);
    if (mousePressed) {
      handleMouseDown();
    }
  }

  function handleMouseLeaveCanvas() {
    setCanvasHovered(false);
  }

  function handleWindowResize() {
    calculcateCanvasRelativeSize();
  }

  function calculcateCanvasRelativeSize() {
    const canvasRect = canvasRef.current.getBoundingClientRect();
    setCanvasRelativeWidth(canvasRect.width);
    setCanvasRelativeHeight(canvasRect.height);
  }

  return (
    <Container fluid="sm">
      <Row>
        <Col>
          <canvas
            id="canvas"
            ref={canvasRef}
            className="no-cursor my-3"
            onMouseEnter={handleMouseEnterCanvas}
            onMouseLeave={handleMouseLeaveCanvas}
          />
        </Col>
      </Row>

      <BrushCursor
        hideBrush={!canvasHovered}
        size={props.currentBrushSize}
        color={props.currentBrushColor}
        currentTool={props.currentTool}
        x={cursorX}
        y={cursorY}
      />
      <video autoplay controls></video>
    </Container>
  );
}
