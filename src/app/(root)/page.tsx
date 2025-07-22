import Link from "next/link";
import styles from "./Dashboard.module.css";
import SearchForm from "@/components/modals/DashboardSearchForm";
import ImageComponent from "@/components/elements/ImageComponent";
import { carBrands } from "../../data/CarParts";

export default function Home() {
  // Пример новостей
  const news = [
    {
      title: "Новые поступления запчастей для BMW",
      date: "15 мая 2024",
      excerpt:
        "В нашем каталоге появились новые оригинальные запчасти для BMW серий 3, 5 и 7.",
    },
    {
      title: "Скидки на масла до 30%",
      date: "10 мая 2024",
      excerpt:
        "Только до конца месяца специальные предложения на моторные и трансмиссионные масла.",
    },
    {
      title: "Расширение ассортимента шин",
      date: "5 мая 2024",
      excerpt:
        "Теперь в наличии шины всех сезонов от ведущих мировых производителей.",
    },
  ];
  const filteredBrands = carBrands.filter(
    (brand) => brand !== "Не имеет значения"
  );

  const popularCategories = [
    {
      id: "engine",
      name: "Двигатель",
      type: "vertical",
      image: "/images/categories/engine.jpg",
      alt: "Двигатель",
    },
    {
      id: "brake-pads",
      name: "Шины и диски",
      type: "horizontal",
      image: "/images/categories/wheel.jpg",
      alt: "Шины и диски",
    },
    {
      id: "optics",
      name: "Оптика",
      type: "horizontal",
      image: "/images/categories/optics.jpg",
      alt: "Оптика",
    },
    {
      id: "body-exterior",
      name: "Детали кузова",
      type: "vertical",
      image: "/images/categories/exterior.jpg",
      alt: "Детали кузова",
    },
    {
      id: "transmission",
      name: "Трансмиссия",
      type: "horizontal",
      image: "/images/categories/transmission.jpg",
      alt: "Трансмиссия автомобиля",
    },
    {
      id: "electrical",
      name: "Электрооснащение",
      type: "horizontal",
      image: "/images/categories/electricial.jpg",
      alt: "Электрооснащение",
    },
  ];

  return (
    <main className="home-page">
      <section className="hero-section">
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Найдите нужную{" "}
              <span className={styles.heroTitleAccent}>автозапчасть</span>{" "}
              быстро
            </h1>
            <p className={styles.heroSubtitle}>
              Более 100 000 запчастей в наличии в Москве!
            </p>
          </div>
          <div className={styles.heroMain}>
            <div className={styles.heroLeft}>
              <SearchForm />
            </div>
            <div className={styles.heroImageContainer}>
              <div className={styles.heroImagePlaceholder}>
                <ImageComponent
                  src="/images/main-image.jpg"
                  alt="Автозапчасти"
                  objectFit="cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Секция с марками автомобилей */}
      <section className={styles.brandsSection}>
        <div className="container">
          <h2 className="sectionTitle">Выберите марку автомобиля</h2>
          <div className={styles.brandsGrid}>
            {filteredBrands.map((brand, index) => (
              <Link
                href={`/catalog?brand=${brand
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                key={index}
                className={styles.brandCard}
              >
                <span className={styles.brandName}>{brand}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.categoriesSection}>
        <div className="container">
          <h2 className="sectionTitle">Популярные категории</h2>
          <p className="sectionSubtitle">
            Все запчасти, представленные в каталоге, есть в наличии на складе
          </p>
          <div className={styles.categoriesGrid}>
            {popularCategories.map((category, index) => (
              <Link
                href={`/catalog?category=${category.id
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                key={category.id}
                className={`${styles.categoryCard} ${
                  category.type === "vertical"
                    ? styles.verticalCard
                    : styles.horizontalCard
                }`}
              >
                <div className={styles.categoryImageContainer}>
                  <ImageComponent
                    src={category.image}
                    alt={category.alt}
                    className={styles.categoryImage}
                    objectFit="cover"
                    priority={index < 4}
                  />
                </div>
                <div className={styles.categoryInfo}>
                  <h3 className={styles.categoryTitle}>{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.benefitsSection}>
        <div className="container">
          <h2 className="sectionTitle">Почему выбирают нас</h2>
          <Link href={"/catalog"}>
            <div className={styles.benefitsGrid}>
              <div className={styles.benefitCard}>
                <div className={styles.benefitContent}>
                  <div className={styles.benefitHeader}>
                    <div className={styles.benefitTextContent}>
                      <h3 className={styles.benefitTitle}>
                        Огромный ассортимент
                      </h3>
                      <p className={styles.benefitDescription}>
                        На выбор более 100 000 автозапчастей
                      </p>
                    </div>
                    <div
                      className={`${styles.benefitIconCustom} ${styles.iconFire}`}
                    >
                      <ImageComponent
                        src="/images/advantages/fire.png"
                        alt="Fire icon"
                        fill={false}
                        width={178}
                        height={178}
                        objectFit="contain"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitContent}>
                  <div className={styles.benefitHeader}>
                    <div className={styles.benefitTextContent}>
                      <h3 className={styles.benefitTitle}>Гарантия качества</h3>
                      <p className={styles.benefitDescription}>
                        Только проверенные поставщики и оригинальные запчасти
                      </p>
                    </div>
                    <div
                      className={`${styles.benefitIconCustom} ${styles.iconCheckmark}`}
                    >
                      <ImageComponent
                        src="/images/advantages/checkmark.png"
                        alt="Checkmark icon"
                        fill={false}
                        width={198}
                        height={198}
                        objectFit="contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.benefitCard}>
                <div className={styles.benefitContent}>
                  <div className={styles.benefitHeader}>
                    <div className={styles.benefitTextContent}>
                      <h3 className={styles.benefitTitle}>Лучшие цены</h3>
                      <p className={styles.benefitDescription}>
                        Конкурентные цены и выгодные предложения для клиентов
                      </p>
                    </div>
                    <div
                      className={`${styles.benefitIconCustom} ${styles.iconPrice}`}
                    >
                      <ImageComponent
                        src="/images/advantages/price.png"
                        alt="Price icon"
                        fill={false}
                        width={168}
                        height={168}
                        objectFit="contain"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.benefitCard}>
                <div className={styles.benefitContent}>
                  <div className={styles.benefitHeader}>
                    <div className={styles.benefitTextContent}>
                      <h3 className={styles.benefitTitle}>
                        Профессиональная консультация
                      </h3>
                      <p className={styles.benefitDescription}>
                        Наши эксперты помогут с выбором и дадут рекомендации
                      </p>
                    </div>
                    <div
                      className={`${styles.benefitIconCustom} ${styles.iconTool}`}
                    >
                      <ImageComponent
                        src="/images/advantages/tool.png"
                        alt="Tool icon"
                        fill={false}
                        width={168}
                        height={188}
                        objectFit="contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      <section className={styles.newsSection}>
        <div className="container">
          <h2 className="sectionTitle">Новости и акции</h2>
          <div className={styles.newsGrid}>
            {news.map((item, index) => (
              <div key={index} className={styles.newsCard}>
                <Link href={`/blog`}>
                  <div className={styles.newsImage}>Изображение новости</div>
                  <div className={styles.newsContent}>
                    <span className={styles.newsDate}>{item.date}</span>
                    <h3 className={styles.newsTitle}>{item.title}</h3>
                    <p className={styles.newsExcerpt}>{item.excerpt}</p>
                    <button className="read-more">Читать далее</button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
