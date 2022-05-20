import { BsBrush, BsEraser } from 'react-icons/bs';
import { Button } from 'react-bootstrap';

export default function Toolbar(props) {
  const tools = [
    {
      name: "Brush Tool",
      icon: <BsBrush/>,
    },
    {
      name: "Eraser Tool",
      icon: <BsEraser/>,
    }
  ];

  const toolButtons = tools.map((tool, index) => {
    return (
      <ToolButton
        active={props.currentTool === tool.name}
        icon={tool.icon}
        name={tool.name}
        key={index}
        changeTool={props.changeTool}
      />
    );
  });
  return <div> {toolButtons} </div>;
}

const ToolButton = (props) => {
  let activeStyle;
  if (props.active) {
    activeStyle = {
      border: "2px solid black",
      color: "black",
      backgroundColor: "#ebab34",
    };
  }
  return (
    <Button variant="light"
      style={activeStyle}
      onClick={() => props.changeTool(props.name)}
    >
      {props.icon}
    </Button>
  );
}
