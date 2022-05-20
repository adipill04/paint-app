import ColorSelector from "../ColorSelector/ColorSelector.js";
import ColorPreview from "../ColorPreview/ColorPreview.js";
import ToolSelector from "../ToolSelector/ToolSelector.js";
import BrushSizeSelector from "../BrushSizeSelector/BrushSizeSelector.js";

import "../../styles/components/PaintTools.scss";
import { Row } from "react-bootstrap";

export default function PaintTools(props) {
  function selectBrushSize(size) {
    props.selectBrushSize(size);
  }

  function selectBrushColor(color) {
    props.selectBrushColor(color);
  }

  return (
    <Row className="toolbar-container mt-2">
      <div className="col-3 col-sm-1">
        <ColorPreview selectedColor={props.selectedColor} />
      </div>
      <div className="col-9 col-sm-4">
        <ColorSelector selectBrushColor={selectBrushColor} />
      </div>
      <div className="col-12 col-sm-3">
        <ToolSelector
          changeTool={props.changeTool}
          currentTool={props.currentTool}
        />
      </div>
      <div className="col-12 col-sm-4">
        <BrushSizeSelector
          currentBrushSize={props.currentBrushSize}
          selectBrushSize={selectBrushSize}
        />
      </div>
    </Row>
  );
}
