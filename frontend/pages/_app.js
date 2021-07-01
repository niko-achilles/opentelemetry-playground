import "../css/tailwind.css";
import { MDXProvider } from "@mdx-js/react";
import Components from "../components/MDX/Components";
import React from "react";

import useOpenTelementry from "../lib/useOpentemetry";

function MyApp({ Component, pageProps }) {
  useOpenTelementry("NEXTJS APP");
  return (
    <MDXProvider components={Components}>
      <Component {...pageProps} />
    </MDXProvider>
  );
}

export default MyApp;
