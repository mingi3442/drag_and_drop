import React, { useEffect, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useSpring, animated } from "react-spring";
import { useDrag } from "react-use-gesture";
function App() {
  function getCurrentDimension() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const logoLocation = useSpring({ x: 0, y: 0 });
  const linkTextLocation = useSpring<{ x: number; y: number }>({ x: 0, y: 0 });
  const bindLogoLocation = useDrag((params) => {
    logoLocation.x.set(params.offset[0]);
    logoLocation.y.set(params.offset[1]);
  });
  const bindLinkTextLocation = useDrag((params) => {
    console.log(params);
    linkTextLocation.x.set(params.movement[0]);
    linkTextLocation.y.set(params.movement[1]);
  });
  // console.log(screenSize);
  // useEffect(() => {
  //   const updateDimension = () => {
  //     setScreenSize(getCurrentDimension());
  //   };
  //   window.addEventListener("resize", updateDimension);

  //   return () => {
  //     window.removeEventListener("resize", updateDimension);
  //   };
  // }, [screenSize]);
  return (
    <div className="App">
      <header className="App-header">
        <animated.div
          {...bindLogoLocation()}
          style={{
            x: logoLocation.x,
            y: logoLocation.y,
          }}
        >
          <img src={logo} className="App-logo" alt="logo" />
        </animated.div>
        {/* <animated.p {...bindLinkTextLocation()} style={{ position: "absolute", left: linkTextLocation.x, top: linkTextLocation.y }}>
          Edit <code>src/App.tsx</code> and save to reload.
        </animated.p> */}
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        <TestComponent></TestComponent>
      </header>
    </div>
  );
}

const TestComponent = () => {
  const linkTextLocation = useSpring<{ x: number; y: number }>({ x: 0, y: 0 });
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    console.log("width", ref.current ? ref.current.offsetWidth! : 0);
  }, [ref]);
  const bindLinkTextLocation = useDrag((params) => {
    console.log(params);
    linkTextLocation.x.set(params.offset[0]);
    linkTextLocation.y.set(params.offset[1]);
  });
  return (
    <animated.p {...bindLinkTextLocation()} ref={ref} style={{ position: "absolute", x: linkTextLocation.x, y: linkTextLocation.y }}>
      TEST Component
    </animated.p>
  );
};

export default App;
