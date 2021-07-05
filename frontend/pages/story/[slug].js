import { getFiles, getFileBySlug } from "../../lib/mdx";

import React from "react";
import { MDXRemote } from "next-mdx-remote";

import StoryLayout from "../../layouts/StoryLayout";

import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
  () => import("../../lib/useOpentelemetry"),
  { ssr: false }
);

export default function StoryPage({ mdxSource, frontMatter }) {
  return (
    <>
      <DynamicComponentWithNoSSR />
      <StoryLayout frontMatter={frontMatter}>
        <MDXRemote {...mdxSource} />
      </StoryLayout>
    </>
  );
}

export async function getStaticPaths() {
  const stories = await getFiles("stories");

  return {
    paths: stories.map((s) => ({
      params: {
        slug: s.replace(/\.mdx/, ""),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const story = await getFileBySlug("stories", params.slug);

  return { props: { ...story } };
}
