import {
  ConsoleSpanExporter,
  SimpleSpanProcessor,
  BatchSpanProcessor,
} from "@opentelemetry/tracing";
import { WebTracerProvider } from "@opentelemetry/web";

// not using context manager at the moment, because of the warning
// "@opentelemetry/auto-instrumentations-web > @opentelemetry/instrumentation-user-interaction@0.22.0"
// has unmet peer dependency "zone.js@0.11.4"
// import { ZoneContextManager } from "@opentelemetry/context-zone";
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

  const provider = new WebTracerProvider({ resource });

  provider.addSpanProcessor(
    new BatchSpanProcessor(new CollectorTraceExporter())
  );

  provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));

  provider.register({
    // contextManager: new ZoneContextManager(),
    propagator: new B3Propagator(),
  });

  const instrumentations = getWebAutoInstrumentations({
    "@opentelemetry/instrumentation-xml-http-request": {
      ignoreUrls: [],
      propagateTraceHeaderCorsUrls: ["http://localhost:3000"],
      clearTimingResources: true,
    },
  });

  registerInstrumentations({
    instrumentations,
    tracerProvider: provider,
  });
};

export default useOpentelemetry;
