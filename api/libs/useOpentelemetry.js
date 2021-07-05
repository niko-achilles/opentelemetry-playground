"use strict";

const keys = require("../keys");
const { NodeTracerProvider } = require("@opentelemetry/node");
const { BatchSpanProcessor } = require("@opentelemetry/tracing");

const { registerInstrumentations } = require("@opentelemetry/instrumentation");

const {
  ExpressInstrumentation,
} = require("@opentelemetry/instrumentation-express");
const { HttpInstrumentation } = require("@opentelemetry/instrumentation-http");
const { PgInstrumentation } = require("@opentelemetry/instrumentation-pg");

const { CollectorTraceExporter } = require("@opentelemetry/exporter-collector");

const { Resource } = require("@opentelemetry/resources");
const { ResourceAttributes } = require("@opentelemetry/semantic-conventions");

const resource = new Resource({
  [ResourceAttributes.SERVICE_NAME]: keys.appName,
});

const provider = new NodeTracerProvider({ resource });

registerInstrumentations({
  tracerProvider: provider,
  instrumentations: [
    new PgInstrumentation(),
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
  ],
});

const exporter = new CollectorTraceExporter({
  url: `http://${keys.collectorHost}:${keys.collectorPort}/v1/traces`,
});

provider.addSpanProcessor(new BatchSpanProcessor(exporter));

provider.register();
