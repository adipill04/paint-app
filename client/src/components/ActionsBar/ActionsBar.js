import { Button } from "react-bootstrap";
export default function ActionsBar(props) {

    function eraseCanvas() {
      props.eraseCanvas();
    };
  
    function saveCanvas() {
      props.saveCanvas();
    }
  
    return (
      <div>
        <EraseCanvasButton eraseCanvas={eraseCanvas} />
        <SaveCanvasButton saveCanvas={saveCanvas}/>
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
  