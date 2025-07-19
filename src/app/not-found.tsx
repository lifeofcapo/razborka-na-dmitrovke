import Link from "next/link";
import ImageComponent from "@/components/elements/ImageComponent";

export default function NotFound() {
  return (
    <div className="not-found-container">
      <ImageComponent src="/images/not-found.png" alt="404" width={550} height={550} fill={false} />
      <p className="not-found-text">Упс! Такой страницы не существует.</p>
      <p className="not-found-text">Возможно она была перенесена или удалена.</p>
      <Link href="/" className="read-more">Вернуться на главную</Link>
    </div>
  );
}