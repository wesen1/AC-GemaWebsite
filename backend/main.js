/**
 * @author wesen
 * @copyright 2020 wesen <wesen-ac@web.de>
 */

const express = require("express");
const MapsRouter = require(__dirname + "/src/routes/MapsRouter.js");
const MapScoresRouter = require(__dirname + "/src/routes/MapScoresRouter.js");
const UsersRouter = require(__dirname + "/src/routes/UsersRouter.js");

let app = express();

app.use("/maps", (new MapsRouter()).generateRouter());
app.use("/map-scores", (new MapScoresRouter()).generateRouter());
app.use("/users", (new UsersRouter()).generateRouter());

app.listen(12345);
