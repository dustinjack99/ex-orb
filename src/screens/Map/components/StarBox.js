import React, { useState } from "react";
import { gsap } from "gsap";
const dismissBtn = () => {
  const starBox = document.querySelector(".starBox");
  starBox.style.display = "none";
};

const open = () => {
  setTimeout(() => {
    const star = document.querySelector(".star");
    const planets = document.querySelectorAll(".planets");
    const starBox = document.querySelector(".starBox");
    const starBBoxX = `${star.getBBox().x + star.getBBox().width / 2}`;
    const starBBoxY = `${star.getBBox().y + star.getBBox().height / 2}`;

    // gsap.fromTo(starBox, 2, {!ui}, {ui})

    planets.forEach((planet) => {
      gsap.to(planet, {
        duration: Math.max(+planet.getAttribute("orbit"), 10),
        rotation: 360,
        svgOrigin: starBBoxX + " " + starBBoxY,
        repeat: -1,
        ease: Linear.easeNone,
      });
    });
  }, 10);
};
const readPlanet = (event) => {
  const planetStats = document.querySelector(".planetStats");
  const pMass = event[0].path[0].getAttribute("mass");
  const pName = event[0].path[0].getAttribute("name");
  const pOrb = event[0].path[0].getAttribute("orbit");
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  p1.style.color = "whitesmoke";
  p1.style.textAlign = "center";
  p2.style.color = "whitesmoke";
  p2.style.textAlign = "center";
  planetStats.innerHTML = "";

  if (pMass) {
    p1.textContent = ` ${pName}'s Orbit: ${pOrb} (Earth Days)`;
    p2.textContent = ` ${pName}'s Mass: ${pMass} (# of Earths)`;
    planetStats.appendChild(p1);
    planetStats.appendChild(p2);
  } else {
    p1.textContent = ` ${pName}'s Orbit: ${pOrb} (Earth Days)`;
    planetStats.appendChild(p1);
  }
};

const zoomIn = () => {
  const starBox = document.querySelector(".starBox");
  const z = JSON.parse(starBox.getAttribute("zoomBox"));

  gsap.fromTo(
    this.svg.nativeElement,
    { attr: { viewBox: this.area } },
    {
      attr: {
        viewBox: `${z.x} ${z.y} ${z.width} ${z.height}`,
      },
    },
    2
  );

  gsap.fromTo(
    document.querySelectorAll(".stars"),
    { attr: { r: "0.5%" } },
    { attr: { r: "1.5%" } },
    2
  );
};

const zoomOut = () => {
  const starBox = document.querySelector(".starBox");
  const z = JSON.parse(starBox.getAttribute("zoomBox"));

  gsap.fromTo(
    this.svg.nativeElement,
    {
      attr: {
        viewBox: `${z.x} ${z.y} ${z.width} ${z.height}`,
      },
    },
    { attr: { viewBox: this.area } },
    2
  );

  gsap.fromTo(
    document.querySelectorAll(".stars"),
    { attr: { r: "1.5%" } },
    { attr: { r: "0.5%" } },
    2
  );
};

const StarBox = ({ currentSystem }) => {
  const [opened, setOpened] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  return (
    <div className="starBox" id="starBox">
      <div className="header">
        {opened ? <p>{currentSystem[0].pl_hostname}</p> : <p>Exos in Orbit</p>}
      </div>
      <div>
        {opened ? (
          <svg className="starOrbits" height="200px">
            <circle className="star" cx="50%" cy="50%" r="8%" fill="blue" />
            {currentSystem.map((planet, i) => {
              return (
                <circle
                  className="planets"
                  Tooltip={planet.pl_name}
                  Tooltip={planet.pl_name}
                  cx={`${(40 / currentSystem.length) * (i + 1) + "%"}`}
                  cy={`${(40 / currentSystem.length) * (i + 1) + "%"}`}
                  name={planet.pl_name}
                  orbit={planet.pl_orbper}
                  mass={planet.pl_bmasse}
                  r="4%"
                  fill="red"
                  onClick={(e) => readPlanet(e)}
                />
              );
            })}
          </svg>
        ) : (
          <ul className="starStats">
            {currentSystem.map((planet) => {
              <li className="planetList">{planet.pl_name} Planets</li>;
            })}
          </ul>
        )}
        {opened ?? <div className="planetStats"></div>}
      </div>
      <div className="planetButtons">
        <icon>zoom_out_map</icon>
        {zoomed ? (
          <button
            className="zoomBtn"
            onClick={() => {
              zoomOut();
              setZoomed(false);
            }}
          >
            Zoom Out
          </button>
        ) : (
          <button
            className="zoomBtn"
            onClick={() => {
              zoomIn();
              setZoomed(true);
            }}
          >
            Zoom In
          </button>
        )}
        {opened ? (
          <button className="openBtn" onClick={() => setOpened(false)}>
            Back
          </button>
        ) : (
          <button
            className="openBtn"
            onClick={() => {
              open();
              setOpened(true);
            }}
          >
            Open
          </button>
        )}
        <icon className="closeIcon" onClick={() => dismissBtn()}>
          close
        </icon>
      </div>
    </div>
  );
};

export default StarBox;
