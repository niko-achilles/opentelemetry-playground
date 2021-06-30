import "../css/tailwind.css";
import { MDXProvider } from "@mdx-js/react";
import Components from "../components/MDX/Components";
import React from "react";

import tracer from "../lib/tracer";
tracer("Nextjs APP");

function MyApp({ Component, pageProps }) {
  return (
    <MDXProvider components={Components}>
      <Component {...pageProps} />
    </MDXProvider>
  );
}

export default MyApp;
