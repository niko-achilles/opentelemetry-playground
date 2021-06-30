"use strict";
const keys = require("../keys");
const { NodeTracerProvider } = require("@opentelemetry/node");
const { BatchSpanProcessor } = require("@opentelemetry/tracing");

const { registerInstrumentations } = require("@opentelemetry/instrumentation");
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node");

const { CollectorTraceExporter } = require("@opentelemetry/exporter-collector");

const { Resource } = require("@opentelemetry/resources");
const { ResourceAttributes } = require("@opentelemetry/semantic-conventions");

// Note functionally required but gives some insight what happens behind the scenes
const { diag, DiagConsoleLogger, DiagLogLevel } = require("@opentelemetry/api");
diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

module.exports = (name) => {
  const resource = new Resource({
    [ResourceAttributes.SERVICE_NAME]: name,
  });

  const provider = new NodeTracerProvider({ resource });

  registerInstrumentations({
    tracerProvider: provider,
    instrumentations: [
      // Express instrumentation expects HTTP layer to be instrumented
      // HttpInstrumentation,
      // ExpressInstrumentation,
      getNodeAutoInstrumentations(),
    ],
  });

  // const url = `http://${keys.collectorHost}:${keys.collectorPort}`;

  const exporter = new CollectorTraceExporter({
    url: `http://${keys.collectorHost}:${keys.collectorPort}/v1/trace`, // url is optional and can be omitted - default is http://localhost:55681/v1/trace
  });

  provider.addSpanProcessor(new BatchSpanProcessor(exporter));

  // Initialize the OpenTelemetry APIs to use the NodeTracerProvider bindings
  provider.register();
};
