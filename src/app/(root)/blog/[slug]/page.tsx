import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "../blog.module.css";
import prisma from "@/lib/prisma";

export async function generateStaticParams() {
  const posts = await prisma.post.findMany({
    where: { published: true },
  });
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage(props) {
  const params = await props.params;
  const slug = params?.slug;

  if (!slug) notFound();

  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) notFound();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className={styles.container}>
      <article className={styles.article}>
        {post.image && (
          <div className={styles.imageContainer}>
            <Image
              src={post.image.startsWith("/") ? post.image : `/${post.image}`}
              alt={post.title}
              width={800}
              height={450}
              className={styles.image}
              priority
            />
          </div>
        )}

        <header className={styles.header}>
          <h1>{post.title}</h1>
          <time>{formatDate(post.publishedAt || post.createdAt)}</time>
        </header>

        <div dangerouslySetInnerHTML={{ __html: post.content }} />

        <footer>
          <Link href="/blog">← Вернуться ко всем новостям</Link>
        </footer>
      </article>
    </div>
  );
}
