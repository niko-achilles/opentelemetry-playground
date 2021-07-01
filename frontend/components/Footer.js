import Link from "next/link";

export default function Footer() {
  return (
    <footer className="max-w-2xl mx-auto w-full mb-8">
      <hr className="w-full border-1 border-gray-200 mb-8" />
      <div className="flex flex-col items-center">
        <div className="flex mb-2 space-x-2 text-sm text-gray-500">
          <div>Created with love ♥ by </div>
          <Link href="https://github.com/niko-achilles/otlp-logzio-fullstack">
            Niko Achilles Kokkinos
          </Link>
          <div>{` • `}</div>
          <Link href="/">Stories - Niko Achilles Kokkinos</Link>
        </div>
      </div>
    </footer>
  );
}
