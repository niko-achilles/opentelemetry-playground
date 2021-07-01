import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
  BatchSpanProcessor,
} from "@opentelemetry/tracing";
import { WebTracerProvider } from "@opentelemetry/web";
import { ZoneContextManager } from "@opentelemetry/context-zone";
import { CollectorTraceExporter } from "@opentelemetry/exporter-collector";
import { B3Propagator } from "@opentelemetry/propagator-b3";
import { getWebAutoInstrumentations } from "@opentelemetry/auto-instrumentations-web";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { Resource } from "@opentelemetry/resources";
import { ResourceAttributes } from "@opentelemetry/semantic-conventions";

const useOpentelemetry = (name) => {
  const resource = new Resource({
    [ResourceAttributes.SERVICE_NAME]: name,
  });

  const providerWithZone = new WebTracerProvider({ resource });

  providerWithZone.addSpanProcessor(
    new BatchSpanProcessor(new CollectorTraceExporter())
  );

  providerWithZone.addSpanProcessor(
    new SimpleSpanProcessor(new ConsoleSpanExporter())
  );

  providerWithZone.register({
    contextManager: new ZoneContextManager(),
    propagator: new B3Propagator(),
  });
  const instrumentations = getWebAutoInstrumentations({
    "@opentelemetry/instrumentation-xml-http-request": {
      ignoreUrls: [/localhost/],
      propagateTraceHeaderCorsUrls: ["http://localhost:8090"],
    },
  });

  registerInstrumentations({
    instrumentations,
    tracerProvider: providerWithZone,
  });
};

export default useOpentelemetry;
