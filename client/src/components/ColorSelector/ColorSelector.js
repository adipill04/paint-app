import "../../styles/components/ColorSquare.scss";
export default function ColorSelector(props) {
  const colors = [
    "#ff2e2e",
    "#ff6200",
    "#ffe600",
    "#1aff00",
    "#19752d",
    "#0048ff",
    "#00fffb",
    "#9e4505",
    "#9d00bd",
    "#ff80f0",
    "#ffffff",
    "#bdbdbd",
    "#616161",
    "#000000"
  ];

  function selectBrushColor(color) {
    props.selectBrushColor(color);
  }

  return (
    <div>
      <ColorGrid colors={colors} selectBrushColor={selectBrushColor} />
    </div>
  );
}

const ColorGrid = (props) => {
  const colorsArray1 = props.colors.slice(0, 7);
  const colorsArray2 = props.colors.slice(7, 14);

  const colorsRow1 = colorsArray1.map((color, index) => {
    return (
      <ColorSquare
        color={color}
        onClick={() => {
          props.selectBrushColor(color);
        }}
        key={index}
      />
    );
  });

  const colorsRow2 = colorsArray2.map((color, index) => {
    return (
      <ColorSquare
        color={color}
        onClick={() => {
          props.selectBrushColor(color);
        }}
        key={index}
      />
    );
  });

  return (
    <div>
      <div className="d-flex">{colorsRow1}</div>
      <div className="d-flex">{colorsRow2}</div>
    </div>
  );
}

const ColorSquare = (props) => {
  const style = {
    backgroundColor: props.color,
  };
  return (
    <div
      style={style}
      key={props.index}
      className="color-square d-inline-block"
      onClick={props.onClick}
    />
  );
}


