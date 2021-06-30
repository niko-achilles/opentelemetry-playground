/* eslint-disable no-console */
require("./libs/tracer")("story-views-api");

const keys = require("./keys");

const express = require("express");

const cors = require("cors");

const { Pool } = require("pg");

const openTelemetryAPI = require("@opentelemetry/api");

const tracer = openTelemetryAPI.trace.getTracer("storyViewsApi", "1.0");
console.log("tracer", tracer);

const app = express();
app.use(cors());

const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});

app.get("/", (req, res) => {
  res.send("Hi");
});

app.get("/views/:id", async (req, res) => {
  const id = req.params.id;

  const view = await pgClient.query(
    `SELECT views from STORY_VIEWS WHERE id=$1`,
    [id]
  );

  console.log(`Fetching view with id:${id} and value: ${view?.rows[0]}`);
  console.log(JSON.stringify({ views: view?.rows[0]?.views }));
  res.send(JSON.stringify({ views: view?.rows[0]?.views }));
});

app.post("/views/:id", async (req, res) => {
  const id = req.params.id;

  const registerViewsSpan = tracer.startSpan("get-view-by-id", {
    kind: openTelemetryAPI.SpanKind.CLIENT,
  });

  let response;

  const currentView = await openTelemetryAPI.context.with(
    openTelemetryAPI.trace.setSpan(
      openTelemetryAPI.context.active(),
      registerViewsSpan
    ),
    () => {
      return pgClient.query(`SELECT views from STORY_VIEWS WHERE id=$1`, [id]);
    }
  );

  if (currentView.rowCount > 0) {
    const { views } = currentView.rows[0];
    const value = views + 1;
    response = await pgClient.query(
      `UPDATE STORY_VIEWS SET views=$1 WHERE id=$2 RETURNING views`,
      [value, id]
    );
  } else {
    response = await pgClient.query(
      `INSERT INTO STORY_VIEWS(id, views) VALUES($1, $2) RETURNING views`,
      [id, 1]
    );
  }

  console.log(`Registered view with id:${id} and value: ${response.rows[0]}`);
  console.log(JSON.stringify({ views: response.rows[0].views }));

  registerViewsSpan.setStatus(openTelemetryAPI.SpanStatusCode.OK);
  registerViewsSpan.end();

  res.send(JSON.stringify({ views: response.rows[0].views }));
});

app.listen(5000, (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Listening");
});
