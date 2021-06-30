import Head from "next/head";
import NextLink from "next/link";
import Footer from "./Footer";

export default function Container(props) {
  const { children, ...customMeta } = props;

  const meta = {
    title: "title",
    description: "Description",
    type: "website",
    ...customMeta,
  };

  return (
    <div className="bg-white">
      <Head>
        <title>{meta.title}</title>
        <meta content={meta.description} name="description" />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      <nav className="sticky-nav flex justify-between items-center max-w-4xl w-full p-8 my-0 md:my-8 mx-auto bg-white bg-opacity-60">
        <NextLink href="/">
          <a className="p-1 sm:p-4 text-gray-900">
            <svg height="32px" width="32px" viewBox="0 0 256 256">
              <path d="M203.313,128c0,3.534-2.865,6-6.4,6H74.878l47.141,45.956c2.538,2.463,2.597,6.616,0.138,9.149  c-1.256,1.295-2.925,1.995-4.594,1.995c-1.606,0-3.216-0.576-4.456-1.782l-58.466-56.737c-1.244-1.206-1.943-2.855-1.943-4.587  s0.699-3.385,1.943-4.591l58.466-56.743c2.528-2.459,6.584-2.401,9.05,0.139c2.459,2.534,2.4,6.789-0.138,9.251L74.878,122h122.034  C200.447,122,203.313,124.466,203.313,128z M256,128C256,57.422,198.578,0,128,0S0,57.422,0,128s57.422,128,128,128  S256,198.578,256,128z M243.2,128c0,63.521-51.679,115.2-115.2,115.2S12.8,191.521,12.8,128S64.479,12.8,128,12.8  S243.2,64.479,243.2,128z" />
            </svg>
          </a>
        </NextLink>
      </nav>

      <main className="flex flex-col justify-center bg-white px-8">
        {children}
        <Footer />
      </main>
    </div>
  );
}
