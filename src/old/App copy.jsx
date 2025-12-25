import { useEffect, useRef, useState } from "react";
import "./App.css";
import {
  Arc,
  Arrow,
  Circle,
  Rect,
  Layer,
  Stage,
  Text,
  RegularPolygon,
  Transformer,
} from "react-konva";
import {
  LineIcon,
  ArrowIcon,
  CircleIcon,
  TriangleIcon,
  RectangleIcon,
  PolygonIcon,
} from "./components/ShapeIcons";

function App() {
  // const stageWidth = 800;
  // const stageHeight = 800;

  const [stageWidth, setStageWidth] = useState(800);
  const [stageHeight, setStageHeight] = useState(800);

  const [position, setPosition] = useState({
    x: stageWidth / 2,
    y: stageHeight / 2,
  });

  const [message, setMessage] = useState(`x: ${position.x}, y: ${position.y}`);

  const polyRef = useRef();
  const transformerRef = useRef();

  const currentResolution = `${stageWidth}x${stageHeight}`;

  const RESOLUTIONS = [
    "800x600",
    "800x800",
    "1024x768",
    "1024x1024",
    "1152x864",
    "1280x720",
    "1280x768",
    "1280x800",
    "1280x1024",
  ];

  return (
    <div>
      <div className="title">KonvaJS Practicals</div>
      <div className="header-container">
        <div className="coordinates">{message}</div>
        <div className="dimensions-input">
          <select
            value={currentResolution}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "custom") return;

              const [w, h] = value.split("x").map(Number);
              setStageWidth(w);
              setStageHeight(h);
            }}
          >
            {RESOLUTIONS.map((res) => (
              <option key={res} value={res}>
                {res.replace("x", " × ")}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="canvas">
        <div className="utils-menu" style={{ height: stageHeight - 40 }}>
          <LineIcon size={32} onClick={() => console.log("button pressed")} />
          <ArrowIcon size={32} />
          <CircleIcon size={32} />
          <TriangleIcon size={32} />
          <RectangleIcon size={32} />
          <PolygonIcon sides={5} size={32} />
          <PolygonIcon sides={6} size={32} />
          <PolygonIcon sides={7} size={32} />
          <PolygonIcon sides={8} size={32} />
          <PolygonIcon sides={9} size={32} />
          <PolygonIcon sides={10} size={32} />
        </div>
        <div className="stage">
          <Stage
            width={stageWidth}
            height={stageHeight}
            onMouseDown={(e) => {
              if (e.target === e.target.getStage()) {
                transformerRef.current.nodes([]);
                transformerRef.current.getLayer().batchDraw();
              }
            }}
          >
            <Layer>
              {/* <Arc
              x={100}
              y={100}
              innerRadius={40}
              outerRadius={70}
              angle={60}
              fill={"yellow"}
              stroke={"white"}
              strokeWidth={4}
            /> */}
              {/* <Arrow
              x={200}
              y={100}
              points={[100, 0, 100, 100]}
              pointerLength={20}
              pointerWidth={20}
              angle={60}
              fill={"white"}
              stroke={"white"}
              strokeWidth={4}
            /> */}
              {/* <Circle
              x={500}
              y={150}
              radius={80}
              fill={"red"}
              stroke={"yellow"}
            /> */}
              {/* <Rect
              x={650}
              y={100}
              sides={4}
              width={100}
              height={100}
              fill={"white"}
              stroke={"pink"}
            /> */}
              {/* <Text x={100} y={100} text={message} fontSize={20} fill={"white"} /> */}
              <RegularPolygon
                ref={polyRef}
                onClick={(e) => {
                  transformerRef.current.nodes([polyRef.current]);
                }}
                x={position.x}
                y={position.y}
                sides={10}
                radius={80}
                fill={"orange"}
                stroke={"white"}
                draggable
                onMouseEnter={(e) => {
                  document.body.style.cursor = "pointer";
                }}
                onMouseLeave={(e) => {
                  document.body.style.cursor = "default";
                }}
                onDragMove={(e) =>
                  setMessage(
                    `x: ${Math.round(e.target.x())}, y: ${Math.round(
                      e.target.y()
                    )}`
                  )
                }
                onDragEnd={(e) => {
                  setPosition({
                    x: e.target.x(),
                    y: e.target.y(),
                  });
                }}
                dragBoundFunc={(pos) => {
                  const node = polyRef.current;
                  if (!node) return pos;
                  const bbox = node.getClientRect({ skipTransform: false });
                  const centerToLeft = node.x() - bbox.x;
                  const centerToTop = node.y() - bbox.y;
                  const minX = centerToLeft;
                  const maxX = stageWidth - (bbox.width - centerToLeft);
                  const minY = centerToTop;
                  const maxY = stageHeight - (bbox.height - centerToTop);
                  const x = Math.max(minX, Math.min(maxX, pos.x));
                  const y = Math.max(minY, Math.min(maxY, pos.y));
                  return { x, y };
                }}
              />
              <Transformer
                ref={transformerRef}
                rotateEnabled={true}
                boundBoxFunc={(oldBox, newBox) => {
                  if (
                    newBox.x < 0 ||
                    newBox.y < 0 ||
                    newBox.x + newBox.width > stageWidth ||
                    newBox.y + newBox.height > stageHeight
                  ) {
                    return oldBox;
                  }
                  return newBox;
                }}
              />
            </Layer>
          </Stage>
        </div>
      </div>
    </div>
  );
}

export default App;
