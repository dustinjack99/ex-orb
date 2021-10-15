import { getIndexes, getPlanets, getX, getY, dimensions } from "./map.service";
import { gsap, Linear } from "gsap";
import * as _ from "lodash";
//Pipe to filter repeated star systems

class FilterPipe {
  uniqBy = (arr, predicate) => {
    const cb =
      typeof predicate === "function" ? predicate : (o) => o[predicate];
    return [
      ...arr
        .reduce((map, item) => {
          const key = item === null || item === undefined ? item : cb(item);
          map.has(key) || map.set(key, item);
          return map;
        }, new Map())
        .values(),
    ];
  };

  transform = (val) => {
    if (val !== undefined && val !== null) {
      return uniqBy(val, "pl_hostname");
    }
    return val;
  };
}
export class MapComponent {
  area = `0 0 ${dimensions.width} ${dimensions.height}`;
  currentSystem;
  dimensions;
  dragPosition = { x: 0, y: 0 };
  getIndexes;
  getPlanets;
  getX;
  getY;
  img = "../../assets/milky.jpg";
  loader;
  loading = true;
  mapStars$ = new Array();
  // planetColors = {
  // "[Fe/H]": "slategray", 2843 total
  // "[M/H]": "red", 58 total
  // "[m/H]": "blue", 20 total
  // null: "black", 1355 total
  // }
  constructor(mapService) {
    this.dimensions = dimensions;
    this.getIndexes = getIndexes;
    this.getPlanets = getPlanets;
    this.getX = getX;
    this.getY = getY;
  }

  close() {
    this.opened = false;
  }

  dismissBtn() {
    const starBox = document.querySelector(".starBox");
    starBox.style.display = "none";
  }

  loadListen() {
    let loader;
    loader = setInterval(() => {
      if (this.svg.nativeElement.children.length < 2) {
        this.loading = true;
      } else {
        this.loading = false;
        this._container.nativeElement.style.display = "flex";
        this._container.nativeElement.style.justifyContent = "center";
        this._container.nativeElement.style.border = "1px solid blue";
        this._container.nativeElement.style.borderRadius = "5px";
        this._container.nativeElement.style.padding = "30px 0px 30px 0px";
        gsap.fromTo(this.container, 1.5, { opacity: 0 }, { opacity: 1 });
        clearInterval(loader);
      }
    }, 10);
  }

  open() {
    this.opened = true;

    const ui = this.opened;

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
  }

  printPlanets(planets, event) {
    const starBox = document.querySelector(".starBox");
    const { layerX } = event[0];
    const { layerY } = event[0];

    if (this.opened) {
      this.open();
    }

    this.currentSystem = planets;

    const starBounds = {
      x: `${event[0].path[0].getBBox().x}`,
      y: `${event[0].path[0].getBBox().y}`,
      width: `${event[0].path[0].getBBox().width}`,
      height: `${event[0].path[0].getBBox().height}`,
    };

    gsap.fromTo(starBox, { opacity: 0 }, { opacity: 1 }, 0.5);

    this.dragPosition = { x: layerX + 20, y: layerY - 90 };
    if (this.dragPosition.y < 0) {
      this.dragPosition.y = 0;
    }
    if (this.dragPosition.y + 150 > event[0].view.innerHeight) {
      this.dragPosition.y = layerY - 150;
    }
    if (this.dragPosition.x + 300 > event[0].view.innerWidth) {
      this.dragPosition.x = layerX - 320;
    }

    starBox.setAttribute("zoomBox", JSON.stringify(starBounds));
    starBox.style.display = "flex";
  }

  readPlanet(event) {
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
  }

  zoomIn() {
    this.zoomed = true;
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
  }

  zoomOut() {
    this.zoomed = false;
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
  }

  ngOnInit() {
    this.loadListen();

    // Service Mapping Stars and Planets onto Star Map
    // this.mapService.all().subscribe((response) => {
    //   this.mapStars$ = response;
    // });

    this.mapService.offline().subscribe((response) => {
      let res = JSON.parse(response);
      this.mapStars$ = res;
    });
  }
}
