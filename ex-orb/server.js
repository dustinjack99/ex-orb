const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const http = require("http");
// const mongoose = require('mongoose');
// const router = require('./Backend/routes/routes-api');
const router = require("express").Router();
const PORT = process.env.PORT || 7777;
const server = http.createServer(app);
const path = require("path");

// Serve Static assests if in production
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('Frontend/client/build')); // change this if your dir structure is different
//   app.get('*', (req, res) => {
//     res.sendFile(
//       path.resolve(__dirname, 'Frontend', 'client', 'build', 'index.html')
//     );
//   });
// }

require("dotenv").config();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ type: ["application/json"] }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use('/', router);

// app.use('/api/test');

router.get("/");

// FOR PRODUCTION WE NEED THE PRODUCTION DB UNCOMMENTED AND THE DEV DB COMMENTED
// ********************************************************************************

// THIS IS THE DEV DB
// const mongo =
// 'mongodb://mongo:27017/ex-orb';

// THIS IS THE AZURE / DOCKER DEV DB
// const mongo = 'mongodb://tee-time_teetimedb_1:27017/tee-time_web_1';

// ********************************************************************************

// MONGOOSE CONNECTION
// mongoose.connect(mongo, {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
//   useFindAndModify: false,
// });

//Function that gets Planet Data and writes it to DB
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist/ex-orb/index.html"));
  // axios
  //   .get(
  //     'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=exoplanets&select=pl_hostname,pl_name,pl_pnum,pl_orbper,pl_bmasse,pl_rade,st_glon,st_glat,st_metratio,pl_edelink,pl_pelink&format=json'
  //   )
  //   .then((res) => {
  //     console.log(res.data);
  //     fs.writeFile(
  //       './apps/ex-orb/Backend/planetdb.json',
  //       JSON.parse(res.data),
  //       (err) => console.log(err)
  //     );
  //   })
  //   .catch((err) => console.log(err));
});

// FOR PRODUCTION WE NEED THE FOLLOWING UNCOMMENTED

// *******************************************************************************

// app.use(express.static(path.join(__dirname, 'Frontend/client/build')));

// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'Frontend/client/build', 'index.html'));
// });

// ********************************************************************************

server.listen(PORT, () =>
  console.log(`Welcome to port ${PORT}! You are going to rock your day!`)
);
