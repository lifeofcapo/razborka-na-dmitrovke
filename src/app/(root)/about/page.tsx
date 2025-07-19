import styles from './About.module.css';

export default function AboutContent() {
  return (
    <div className={styles.aboutPage}>
      <div className="container">
        <div className={styles.aboutHero}>
          <h1 className={styles.sectionTitle}>
            <span className={styles.gradientText}>О нашем автосервисе</span>
          </h1>
        </div>

        <div className={styles.aboutContent}>
          <section className={`${styles.aboutCard} ${styles.missionCard}`}>
            <div className={styles.cardContent}>
              <div className={styles.cardIcon}>🚗</div>
              <h2 className={styles.cardTitle}>Наша миссия</h2>
              <p className={styles.cardText}>
                Мы делаем ремонт автомобилей доступным, предоставляя 
                качественные запчасти по честным ценам. Ваш автомобиль 
                заслуживает лучшего - и мы знаем, где это взять.
              </p>
            </div>
            <div className={styles.cardImage}>
              <div className={styles.imagePlaceholder}></div>
            </div>
          </section>
          <section className={`${styles.aboutCard} ${styles.featuresCard}`}>
            <h2 className={styles.sectionTitle}>Почему выбирают нас</h2>
            <div className={styles.featuresGrid}>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>🔧</div>
                <h3>Оригинальные запчасти</h3>
                <p>Только проверенные поставщики и гарантия качества</p>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>🚚</div>
                <h3>Быстрая доставка</h3>
                <p>Получите заказ уже на следующий день в любом регионе</p>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>💎</div>
                <h3>10 лет опыта</h3>
                <p>Мы знаем всё о запчастях для любых марок автомобилей</p>
              </div>
              <div className={styles.featureItem}>
                <div className={styles.featureIcon}>📱</div>
                <h3>Удобный сервис</h3>
                <p>Заказ в несколько кликов и персональный менеджер</p>
              </div>
            </div>
          </section>
          <section className={`${styles.aboutCard} ${styles.teamCard}`}>
            <h2 className={styles.sectionTitle}>Наша команда</h2>
            <p className={styles.teamDescription}>
              За нашими успехами стоят настоящие профессионалы - механики с 
              многолетним опытом, консультанты-автолюбители и сертифицированные 
              специалисты по подбору запчастей.
            </p>
            <div className={styles.teamStats}>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>15+</div>
                <div className={styles.statLabel}>Специалистов</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>100 000+</div>
                <div className={styles.statLabel}>Автозапчастей</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statNumber}>24/7</div>
                <div className={styles.statLabel}>Поддержка</div>
              </div>
            </div>
          </section>
          <section className={`${styles.aboutCard} ${styles.valuesCard}`}>
            <h2 className={styles.sectionTitle}>Наши ценности</h2>
            <div className={styles.valuesList}>
              <div className={styles.valueItem}>
                <h3>Качество</h3>
                <p>Мы тщательно проверяем каждую деталь перед отправкой</p>
              </div>
              <div className={styles.valueItem}>
                <h3>Честность</h3>
                <p>Прозрачные цены без скрытых наценок</p>
              </div>
              <div className={styles.valueItem}>
                <h3>Ответственность</h3>
                <p>Гарантия на все запчасти и возврат при браке</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}