import { parseISO, format } from "date-fns";

import Container from "../components/Container";

import ViewCounter from "../components/ViewCounter";

export default function StoryLayout({ children, frontMatter }) {
  return (
    <Container
      title={`${frontMatter.title} – Niko Achilles Kokkinos`}
      description={frontMatter.summary}
      date={new Date(frontMatter.publishedAt).toISOString()}
      type="article"
    >
      <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16  w-full">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-gray-900">
          {frontMatter.title}
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mt-2">
          <div className="flex items-center">
            <p className="text-sm text-gray-700 ml-2">
              {frontMatter.by}
              {"Niko Achilles Kokkinos / "}
              {format(parseISO(frontMatter.publishedAt), "MMMM dd, yyyy")}
            </p>
          </div>
          <p className="text-sm text-gray-500 min-w-32 mt-2 md:mt-0">
            {frontMatter.readingTime.text}
            {` • `}
            <ViewCounter slug={frontMatter.slug} />
          </p>
        </div>
        <div className="prose max-w-none w-full">{children}</div>
      </article>
    </Container>
  );
}
