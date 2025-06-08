export default function About() {
  return (
    <div className="about-page">
      <div className="container">
        <h1>О нас</h1>
        <div className="about-content">
          <section className="about-section">
            <h2>Наша компания</h2>
            <p>
              Мы команда профессионалов, стремящихся создавать инновационные 
              решения и предоставлять качественные услуги нашим клиентам.
            </p>
          </section>
          
          <section className="about-section">
            <h2>Наша миссия</h2>
            <p>
              Наша миссия заключается в том, чтобы помочь бизнесу достигать 
              новых высот через современные технологии и персонализированный подход.
            </p>
          </section>
          
          <section className="about-section">
            <h2>Наши ценности</h2>
            <ul>
              <li>Качество и профессионализм</li>
              <li>Инновации и развитие</li>
              <li>Клиентоориентированность</li>
              <li>Честность и прозрачность</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}