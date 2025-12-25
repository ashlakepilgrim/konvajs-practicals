import { useEffect, useRef, useState, createRef } from "react";
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

  const shapeRefs = useRef({});

  const [canvasShapes, setCanvasShapes] = useState([]);

  const updateShape = (id, newAttrs) => {
    setCanvasShapes((prev) => 
      prev.map((shape) => shape.id === id ? { ...shape, ...newAttrs } : shape)
    )
  }

  const addCircle = () => {
    const id = `circle-${canvasShapes.length}`;

    const newCircle = {
      id,
      type: "circle",
      x: position.x,
      y: position.y,
      radius: 80,
      draggable: true,
    }

    shapeRefs.current[id] = createRef();

    setCanvasShapes([...canvasShapes, newCircle]);
  }

  const addRectangle = () => {
    const id = `rect-${canvasShapes.length}`;

    const width = 100;
    const height = 50;

    const newRect = {
      id,
      type: "rectangle",
      x: position.x - width / 2,
      y: position.y - height / 2,
      width,
      height,
      draggable: true,
      fill: "white",
      stroke: "pink",
    };

    shapeRefs.current[id] = createRef();

    setCanvasShapes([...canvasShapes, newRect]);
  };

  useEffect(() => console.log(shapeRefs), [shapeRefs]);
  useEffect(() => console.log(canvasShapes), [canvasShapes]);

  const [showTerminal, setShowTerminal] = useState(false);

  return (
    <div>
      <div className="title">KonvaJS Practicals</div>
      <div className="header-container">
        <div className="coordinates">{message}</div>
        <div className="dimensions-input">
          <div className="show-terminal" onClick={() => setShowTerminal(prev => !prev)}>Show Terminal</div>
          <select
            value={currentResolution}
            onChange={(e) => {
              const value = e.target.value;

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
          <ArrowIcon size={32} onClick={() => console.log("button pressed")} />
          <CircleIcon size={32} onClick={addCircle} />
          <TriangleIcon size={32} onClick={() => console.log("button pressed")} />
          <RectangleIcon size={32} onClick={addRectangle} />
          <PolygonIcon sides={5} size={32} onClick={() => console.log("button pressed")} />
          <PolygonIcon sides={6} size={32} onClick={() => console.log("button pressed")} />
          <PolygonIcon sides={7} size={32} onClick={() => console.log("button pressed")} />
          <PolygonIcon sides={8} size={32} onClick={() => console.log("button pressed")} />
          <PolygonIcon sides={9} size={32} onClick={() => console.log("button pressed")} />
          <PolygonIcon sides={10} size={32} onClick={() => console.log("button pressed")} />
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
              {/* <RegularPolygon
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
              /> */}
              {canvasShapes.map((shape) => {

                if (shape.type === "circle") {
                  return (
                    <Circle 
                      key={shape.id}
                      ref={shapeRefs.current[shape.id]}
                      x={shape.x}
                      y={shape.y}
                      radius={shape.radius}
                      draggable={shape.draggable}
                      fill={"yellow"}
                      stroke={"orange"}
                      strokeWidth={2}
                      onMouseEnter={() => {document.body.style.cusror = "pointer"}}
                      onMouseLeave={() => {document.body.style.cursor = "default"}}
                      dragBoundFunc={(pos) => {
                        const node = shapeRefs.current[shape.id].current;
                        if (!node) return pos;
                        const bbox = node.getClientRect({
                          skipTransform: false,
                        });
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
                      onDragEnd={(e) => {
                        updateShape(shape.id, {
                          x: e.target.x(),
                          y: e.target.y()
                        })
                      }}
                      onClick={() =>
                        transformerRef.current.nodes([
                          shapeRefs.current[shape.id].current,
                        ])
                      }
                      onTransformEnd={(e) => {
                        const node = e.target;
                        const scaleX = node.scaleX();

                        node.scaleX(1);
                        node.scaleY(1);

                        updateShape(shape.id, {
                          x: node.x(),
                          y: node.y(),
                          radius: Math.max(5, node.radius() * scaleX),
                        });
                      }}
                    />
                  );
                }

                if (shape.type === "rectangle") {
                  return (
                    <Rect
                      key={shape.id}
                      ref={shapeRefs.current[shape.id]}
                      x={shape.x}
                      y={shape.y}
                      width={shape.width}
                      height={shape.height}
                      fill={shape.fill}
                      stroke={shape.stroke}
                      draggable={shape.draggable}
                      onMouseEnter={() =>
                        (document.body.style.cursor = "pointer")
                      }
                      onMouseLeave={() =>
                        (document.body.style.cursor = "default")
                      }
                      dragBoundFunc={(pos) => {
                        const node = shapeRefs.current[shape.id].current;
                        if (!node) return pos;
                        const bbox = node.getClientRect({
                          skipTransform: false,
                        });
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
                      onDragEnd={(e) => {
                        updateShape(shape.id, {
                          x: e.target.x(),
                          y: e.target.y()
                        })
                      }}
                      onTransformEnd={(e) => {
                        const node = e.target;
                        const scaleX = node.scaleX();
                        const scaleY = node.scaleY();

                        node.scaleX(1);
                        node.scaleY(1);

                        updateShape(shape.id, {
                          x: node.x(),
                          y: node.y(),
                          // rotation: node.rotation(),
                          width: Math.max(5, node.width() * scaleX),
                          height: Math.max(5, node.height() * scaleY),
                        });
                      }}
                      onClick={() =>
                        transformerRef.current.nodes([
                          shapeRefs.current[shape.id].current,
                        ])
                      }
                    />
                  );
                }
              })}
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
        {showTerminal && (<div className="terminal" style={{ height: stageHeight - 40 }}>
          <pre>{JSON.stringify(canvasShapes, null, 2)}</pre>
        </div>)}
      </div>
    </div>
  );
}

export default App;
