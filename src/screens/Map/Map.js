import React, { useEffect, useState, useRef } from "react";
import StarBox from "./components/StarBox";
import { gsap } from "gsap";
import { all, getIndexes, getPlanets, getX, getY, printPlanets } from "./utilities/mapFunctions";
import "./map.css";

const Map = () => {
  const [currentSystem, setCurrentSystem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [stars, setStars] = useState([]);
  const allStars = useRef(null);
  const starBx = useRef(null);
  const svgRef = useRef(null);
  const area = `0 0 ${dimensions.width} ${dimensions.height}`;

  useEffect(() => {
    const loadListen = (setLoading) => {
      let loader;
      const container = document.querySelector(".container");
      loader = setInterval(() => {
        setLoading(false);
        container.style.display = "flex";
        container.style.justifyContent = "center";
        container.style.border = "1px solid blue";
        container.style.borderRadius = "5px";
        container.style.padding = "30px 0px 30px 0px";
        gsap.fromTo(container, { opacity: 0 }, { opacity: 1 }, 0.5);
        clearInterval(loader);
      }, 10);
    };
    if (loading) {
      all().then((data) => {
        setStars(data);
        loadListen(setLoading);
      });
    }
  }, [loading]);

  return (
    <>
      {loading === true ? (
        <div className="spinner">
          <h2>Loading the Milky Way...</h2>
        </div>
      ) : (
        <div className="container">
          <svg
            ref={svgRef}
            height={dimensions.height}
            width={dimensions.width}
            viewBox={area}
            className="svg"
            id="svg"
            fill="red"
            preserveAspectRatio="xMidYMin slice"
            style={{ width: "90%", height: "70%", overflow: "visible" }}
          >
            <image
              id="svgImg"
              className="svgImg"
              preserveAspectRatio="none"
              href="../../assets/milky-min.jpg"
              width={dimensions.width}
              height={dimensions.height}
            ></image>
            {stars.map((star, i) => {
              return (
                <circle
                  key={star.pl_hostname + i}
                  cx={getX(star.st_elat, dimensions)}
                  cy={getY(star.st_elon, dimensions)}
                  className="stars"
                  id="star"
                  r="0.5%"
                  ref={allStars}
                  name={star.pl_hostname}
                  onClick={(e) => {
                    e.preventDefault();
                    printPlanets(
                      getPlanets(stars, getIndexes(stars, star.pl_hostname)),
                      e,
                      setCurrentSystem,
                      dragPosition,
                      setDragPosition,
                      starBx.current
                    );
                  }}
                />
              );
            })}
          </svg>
          {currentSystem.length > 0 && (
            <StarBox
              area={area}
              currentSystem={currentSystem}
              stars={allStars.current}
              starBx={starBx}
              svg={svg ? svgRef.current : null}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Map;
