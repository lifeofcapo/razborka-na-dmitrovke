import Link from "next/link";
import styles from "./blog.module.css";

async function getAllPosts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/posts`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Ошибка загрузки: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Ошибка при загрузке новостей:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getAllPosts();

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return "";
    }
  };

  return (
    <div className="container">
      <h1>Новости и акции</h1>

      {posts.length === 0 ? (
        <p className={styles.noPosts}>Новости временно недоступны</p>
      ) : (
        <div className={styles.postsGrid}>
          {posts.map((post) => (
            <article key={post.id} className={styles.postCard}>
              <Link
                href={`/blog/${encodeURIComponent(post.slug)}`}
                className={styles.postLink}
              >
                {post.image && (
                  <div className={styles.imageWrapper}>
                    <img
                      src={
                        post.image.startsWith("/")
                          ? post.image
                          : `/${post.image}`
                      }
                      alt={post.title}
                      className={styles.postImage}
                      loading="lazy"
                    />
                  </div>
                )}
                <div className={styles.postContent}>
                  <time className={styles.postDate}>
                    {formatDate(post.createdAt)}
                  </time>
                  <h2 className={styles.postTitle}>{post.title}</h2>
                  <p className={styles.postExcerpt}>{post.excerpt}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
