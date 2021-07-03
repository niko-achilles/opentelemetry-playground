"use strict";

const { NodeTracerProvider } = require("@opentelemetry/node");
const { BatchSpanProcessor } = require("@opentelemetry/tracing");

const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");

const { CollectorTraceExporter } = require("@opentelemetry/exporter-collector");

const { Resource } = require("@opentelemetry/resources");
const { ResourceAttributes } = require("@opentelemetry/semantic-conventions");
const { trace } = require("@opentelemetry/api");

// Logger gives some insight what happens behind the scenes
// const { diag, DiagConsoleLogger, DiagLogLevel } = require("@opentelemetry/api");
// diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

module.exports = (name = "", collectorHost, collectorPort) => {
  const resource = new Resource({
    [ResourceAttributes.SERVICE_NAME]: name,
  });

  const provider = new NodeTracerProvider({ resource });

  registerInstrumentations({
    tracerProvider: provider,
    instrumentations: [getNodeAutoInstrumentations()],
  });

  const exporter = new CollectorTraceExporter({
    url: `http://${collectorHost}:${collectorPort}/v1/trace`,
  });

  provider.addSpanProcessor(new BatchSpanProcessor(exporter));

  provider.register();

  return trace.getTracer(name);
};
