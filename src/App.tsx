import * as React from "react";
import logo from "./logo.svg";
import "./App.css";
// import { useSpring, animated } from "react-spring";
// import { useDrag } from "react-use-gesture";
import Draggable, { DraggableData } from "react-draggable";
import { styled } from "styled-components";
function App() {
  // 현재 스크린 사이즈
  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  // useEffect(() => {
  //   const updateDimension = () => {
  //     setScreenSize(getCurrentDimension());
  //   };
  //   window.addEventListener("resize", updateDimension);

  //   return () => {
  //     window.removeEventListener("resize", updateDimension);
  //   };
  // }, [screenSize]);
  // const containerRef = useRef<HTMLHeadingElement>(null);
  const draggableBoxRef = React.useRef<HTMLHeadingElement>(null);

  const onClickBoxInformation = () => {
    console.log("width : ", draggableBoxRef.current?.offsetWidth);
    console.log("height : ", draggableBoxRef.current?.offsetHeight);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <TestComponent currentRef={draggableBoxRef} />
        <button onClick={onClickBoxInformation}>BOX Information </button>
      </header>
    </div>
  );
}

const TestComponent = ({ currentRef }: { currentRef: React.RefObject<HTMLHeadingElement> }) => {
  // const TestComponent = ({ func, boundRef }: { func: Dispatch<SetStateAction<any[]>>; boundRef?: React.RefObject<HTMLHeadingElement> }) => {
  const [position, setPosition] = React.useState({ x: 0, y: 0 }); // box의 포지션 값
  // 업데이트 되는 값을 set 해줌
  const trackPos = (data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
  };

  return (
    <Draggable nodeRef={currentRef} onDrag={(e, data) => trackPos(data)} bounds={"parent"}>
      <TestBox ref={currentRef}>
        <div>BOX</div>
        <div>
          x: {position.x.toFixed(0)}, y: {position.y.toFixed(0)}
        </div>
      </TestBox>
    </Draggable>
  );
};

const TestBox = styled.div`
  position: absolute;
  cursor: move;
  color: black;
  width: 40vw;
  height: 10vh;
  border-radius: 5px;
  padding: 1em;
  margin: auto;
  user-select: none;
  background: lightgrey;
`;

export default App;
