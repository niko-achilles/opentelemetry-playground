const tracer = require("./libs/tracer")();

const keys = require("./keys");

const express = require("express");

const cors = require("cors");

const { Pool } = require("pg");

const openTelemetryAPI = require("@opentelemetry/api");

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

  const currentSpan = openTelemetryAPI.trace.getSpan(
    openTelemetryAPI.context.active()
  );

  currentSpan.setAttribute("story-Id", id);

  const view = await pgClient.query(
    `SELECT views from STORY_VIEWS WHERE id=$1`,
    [id]
  );

  currentSpan.setAttribute("views", view?.rows[0]?.views || "none :-|");

  res.send(JSON.stringify({ views: view?.rows[0]?.views }));
});

app.post("/views/:id", async (req, res) => {
  const id = req.params.id;

  const registerViewsSpan = tracer.startSpan("register - view by story id", {
    kind: openTelemetryAPI.SpanKind.CLIENT,
  });

  const response = await openTelemetryAPI.context.with(
    openTelemetryAPI.trace.setSpan(
      openTelemetryAPI.context.active(),
      registerViewsSpan
    ),
    async () => await registerView(id)
  );

  res.send(JSON.stringify({ views: response.rows[0].views }));
});

const registerView = async (id) => {
  const currentSpan = openTelemetryAPI.trace.getSpan(
    openTelemetryAPI.context.active()
  );

  let result;
  const currentView = await pgClient.query(
    `SELECT views from STORY_VIEWS WHERE id=$1`,
    [id]
  );
  if (currentView.rowCount > 0) {
    const { views } = currentView.rows[0];
    const value = views + 1;
    result = await pgClient.query(
      `UPDATE STORY_VIEWS SET views=$1 WHERE id=$2 RETURNING views`,
      [value, id]
    );
  } else {
    result = await pgClient.query(
      `INSERT INTO STORY_VIEWS(id, views) VALUES($1, $2) RETURNING views`,
      [id, 1]
    );
  }

  currentSpan.setAttribute("story-Id", id);
  currentSpan.setAttribute("story-views", currentView?.rows[0]?.views);

  currentSpan.setStatus({ code: openTelemetryAPI.SpanStatusCode.OK });
  currentSpan.end();

  return result;
};

app.listen(5000, (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
  // eslint-disable-next-line no-console
  console.log("Story Views API is listening...");
});
