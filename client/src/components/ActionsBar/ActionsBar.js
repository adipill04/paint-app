import { Button, Form } from "react-bootstrap";
import { useState } from "react";

export default function ActionsBar(props) {
  const [drawingType, setDrawingType] = useState('public');
    function eraseCanvas() {
      props.eraseCanvas();
    };
  
    function saveCanvas(drawingType) {
      props.saveCanvas(drawingType);
    }
  
    return (
      <div>
        <EraseCanvasButton eraseCanvas={eraseCanvas} />
        <SaveCanvasButton saveCanvas={() => saveCanvas(drawingType)}/>
        <div>
        <Form>
          <Form.Check
          inline
          label="Public Drawing"
          name="drawingType"
          type="radio"
          id="public"
          checked={drawingType === 'public'}
          onClick={() => setDrawingType('public')}
        />
          <Form.Check 
            inline
            label="Private Drawing"
            name="drawingType"
            type="radio"
            id="private"
            checked={drawingType === 'private'}
            onClick={() => setDrawingType('private')}
          />
        </Form>
        </div>
      </div>
    );
  }
  
  function EraseCanvasButton(props) {
    return (
      <Button variant="danger" onClick={props.eraseCanvas}>ERASE</Button>
    );
  }
  
  function SaveCanvasButton(props) {
    return (
      <Button variant="primary" onClick={props.saveCanvas}>SAVE</Button>
    );
  }
  