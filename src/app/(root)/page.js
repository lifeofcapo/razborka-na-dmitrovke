import Link from 'next/link';
import '../dashboard.css';
import SearchForm from '@/components/DashboardSearchForm';
import ImageComponent from '@/components/elements/ImageComponent';
import { categories } from './data/Products';
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

  const popularCategories = categories.filter(category => 
  ['engine', 'brake-pads', 'optics', 'electrical', 'cooling', 'transmission'].includes(category.id)
);


  return (
    <main className="home-page">
      {/* Герой секция с поиском */}
    <section className="hero-section">
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Найдите нужную <span className="hero-title-accent">автозапчасть</span> быстро
          </h1>
          <p className="hero-subtitle">
            Более 100 000 запчастей в наличии в Москве!
          </p>
        </div>
        <div className="hero-main">
          <div className="hero-left">
            <SearchForm/>
          </div>
          <div className="hero-image-container">
            <div className="hero-image-placeholder">
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
      <section className="brands-section">
        <div className="container">
          <h2 className="section-title">Выберите марку автомобиля</h2>
          <div className="brands-grid">
            {carBrands.map((brand, index) => (
              <Link 
                href={`/catalog?brand=${brand.toLowerCase().replace(/\s+/g, '-')}`} 
                key={index}
                className="brand-card"
              >
                <span className="brand-name">{brand}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Секция популярных категорий */}
      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Популярные категории</h2>
          <div className="categories-grid">
            {popularCategories.map((category, index) => (
              <Link
                href={`/catalog?category=${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                key={index}
                className="category-card"
              >
                <div className="category-info">
                  <h3 className="category-title">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

            {/* Дополнительная секция - Преимущества */}
      <section className="benefits-section">
        <div className="container">
          <h2 className="section-title">Почему выбирают нас</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🚚</div>
              <h3 className="benefit-title">Быстрая доставка</h3>
              <p className="benefit-description">По всей России от 1 дня</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">✅</div>
              <h3 className="benefit-title">Гарантия качества</h3>
              <p className="benefit-description">Только проверенные поставщики</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">💰</div>
              <h3 className="benefit-title">Лучшие цены</h3>
              <p className="benefit-description">Дешевле, чем у конкурентов</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🛠️</div>
              <h3 className="benefit-title">Профессиональная консультация</h3>
              <p className="benefit-description">Поможем с выбором</p>
            </div>
          </div>
        </div>
      </section>

      {/* Секция новостей */}
      <section className="news-section">
        <div className="container">
          <h2 className="section-title">Новости и акции</h2>
          <div className="news-grid">
            {news.map((item, index) => (
              <div key={index} className="news-card">
                <div className="news-image">
                  Изображение новости
                </div>
                <div className="news-content">
                  <span className="news-date">{item.date}</span>
                  <h3 className="news-title">{item.title}</h3>
                  <p className="news-excerpt">{item.excerpt}</p>
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