import Link from 'next/link';
import styles from './Dashboard.module.css';
import SearchForm from '@/components/DashboardSearchForm';
import ImageComponent from '@/components/elements/ImageComponent';
import { carBrands } from './data/CarParts';

export default function Home() {
  // Пример новостей
  const news = [
    {
      title: 'Новые поступления запчастей для BMW',
      date: '15 мая 2024',
      excerpt: 'В нашем каталоге появились новые оригинальные запчасти для BMW серий 3, 5 и 7.',
    },
    {
      title: 'Скидки на масла до 30%',
      date: '10 мая 2024',
      excerpt: 'Только до конца месяца специальные предложения на моторные и трансмиссионные масла.',
    },
    {
      title: 'Расширение ассортимента шин',
      date: '5 мая 2024',
      excerpt: 'Теперь в наличии шины всех сезонов от ведущих мировых производителей.',
    },
  ];
  const filteredBrands = carBrands.filter(brand => brand !== "Не имеет значения");

  const popularCategories = [
    { 
      id: 'engine', 
      name: 'Двигатель',  
      type: 'vertical', 
      image: '/images/categories/engine.jpg', 
      alt: 'Трансмиссия автомобиля'
    },
    { 
      id: 'brake-pads', 
      name: 'Шины и диски', 
      type: 'horizontal',
      image: '/images/categories/wheel.jpg',
      alt: 'Трансмиссия автомобиля'
    },
    { 
      id: 'optics', 
      name: 'Оптика', 
      type: 'horizontal',
      image: '/images/categories/optics.jpg',
      alt: 'Трансмиссия автомобиля'
    },
    { 
      id: 'body-exterior', 
      name: 'Детали кузова', 
      type: 'vertical',
      image: '/images/categories/exterior.jpg', 
      alt: 'Трансмиссия автомобиля'
    },
    { 
      id: 'transmission', 
      name: 'Трансмиссия', 
      type: 'horizontal',
      image: '/images/categories/transmission.jpg', 
      alt: 'Трансмиссия автомобиля'
    },
    { 
      id: 'electrical', 
      name: 'Электрооснащение', 
      type: 'horizontal',
      image: '/images/categories/electricial.jpg',
      alt: 'Трансмиссия автомобиля'
    },
  ];

    return (
    <main className="home-page">
      <section className="hero-section">
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              Найдите нужную <span className={styles.heroTitleAccent}>автозапчасть</span> быстро
            </h1>
            <p className={styles.heroSubtitle}>
              Более 100 000 запчастей в наличии в Москве!
            </p>
          </div>
          <div className={styles.heroMain}>
            <div className={styles.heroLeft}>
              <SearchForm/>
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
          <h2 className={styles.sectionTitle}>Выберите марку автомобиля</h2>
          <div className={styles.brandsGrid}>
            {filteredBrands.map((brand, index) => (
              <Link 
                href={`/catalog?brand=${brand.toLowerCase().replace(/\s+/g, '-')}`} 
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
        <h2 className={styles.sectionTitle}>Популярные категории</h2>
        <p className={styles.sectionSubtitle}>
          Все запчасти, представленные в каталоге, есть в наличии на складе и могут быть отправлены в кратчайшие сроки.
        </p>
        <div className={styles.categoriesGrid}>
          {popularCategories.map((category, index) => (
            <Link
              href={`/catalog?category=${category.id.toLowerCase().replace(/\s+/g, '-')}`}
              key={category.id}
              className={`${styles.categoryCard} ${category.type === 'vertical' ? styles.verticalCard : styles.horizontalCard}`}
            >
              <div className={styles.categoryImageContainer}>
                <ImageComponent
                  src={category.image}
                  alt={category.alt}
                  className={styles.categoryImage}
                  objectFit="cover"
                  priority={index < 4} // Приоритет для первых 4 изображений
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

      {/* Дополнительная секция - Преимущества */}
      <section className={styles.benefitsSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Почему выбирают нас</h2>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitsCard}>
              <div className={styles.benefitIcon}>✅</div>
              <h3 className={styles.benefitTitle}>Гарантия качества</h3>
              <p className={styles.benefitDescription}>Только проверенные поставщики</p>
            </div>
            <div className={styles.benefitsCard}>
              <div className={styles.benefitIcon}>💰</div>
              <h3 className={styles.benefitTitle}>Лучшие цены</h3>
              <p className={styles.benefitDescription}>Дешевле, чем у конкурентов</p>
            </div>
            <div className={styles.benefitsCard}>
              <div className={styles.benefitIcon}>🛠️</div>
              <h3 className={styles.benefitTitle}>Профессиональная консультация</h3>
              <p className={styles.benefitDescription}>Поможем с выбором</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.newsSection}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Новости и акции</h2>
          <div className={styles.newsGrid}>
            {news.map((item, index) => (
              <div key={index} className={styles.newsCard}>
                <div className={styles.newsImage}>
                  Изображение новости
                </div>
                <div className={styles.newsContent}>
                  <span className={styles.newsDate}>{item.date}</span>
                  <h3 className={styles.newsTitle}>{item.title}</h3>
                  <p className={styles.newsExcerpt}>{item.excerpt}</p>
                  <button className="read-more">
                    Читать далее
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}