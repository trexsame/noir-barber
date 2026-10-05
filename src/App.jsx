import { useEffect, useState } from 'react'
import './App.css'

const now = new Date()
const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
const currentYear = now.getFullYear()

const services = [
  { name: 'Классическая стрижка', detail: 'Продуманная форма и безупречная укладка.', price: '€35', time: '45 МИН' },
  { name: 'Фейд', detail: 'Плавный переход и точная проработка деталей.', price: '€40', time: '50 МИН' },
  { name: 'Оформление бороды', detail: 'Аккуратная форма, мягкие линии и уход.', price: '€25', time: '30 МИН' },
  { name: 'Стрижка + борода', detail: 'Цельный образ — от макушки до контура бороды.', price: '€55', time: '70 МИН' },
  { name: 'Премиальный уход', detail: 'Стрижка, горячее полотенце и опасное бритьё.', price: '€70', time: '90 МИН' },
]

const barbers = [
  {
    name: 'Лука Моретти',
    role: 'МАСТЕР-БАРБЕР',
    specialty: 'Классические стрижки · Работа ножницами',
    image: 'photo-1621605815971-fbc98d665033',
    alt: 'Барбер тщательно прорабатывает стрижку клиента',
  },
  {
    name: 'Джамал Хассан',
    role: 'СТАРШИЙ БАРБЕР',
    specialty: 'Фейд · Современные текстуры',
    image: 'photo-1599351431202-1e0f0137899a',
    alt: 'Барбер работает над стрижкой клиента',
  },
  {
    name: 'Тео Виссер',
    role: 'БАРБЕР И МАСТЕР ПО БОРОДЕ',
    specialty: 'Моделирование бороды · Бритьё с горячим полотенцем',
    image: 'photo-1622286342621-4bd786c2447c',
    alt: 'Крупный план работы барбера',
  },
]

const gallery = [
  { image: 'photo-1503951914875-452162b0f3f1', alt: 'Атмосферный интерьер барбершопа', shape: 'gallery-tall' },
  { image: 'photo-1599351431202-1e0f0137899a', alt: 'Барбер делает клиенту новую стрижку', shape: '' },
  { image: 'photo-1512690459411-b9245aed614b', alt: 'Деталь классического барбер-кресла', shape: '' },
  { image: 'photo-1621607512214-68297480165e', alt: 'Точная работа над стрижкой', shape: 'gallery-wide' },
]

const imageUrl = (id, width = 1000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

function Arrow({ diagonal = false }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" className="arrow-icon">
      {diagonal ? (
        <path d="M5 15 15 5M6 5h9v9" />
      ) : (
        <path d="M3 10h13m-5-5 5 5-5 5" />
      )}
    </svg>
  )
}

function Wordmark({ footer = false }) {
  return (
    <a className={`wordmark${footer ? ' wordmark-footer' : ''}`} href="#home" aria-label="На главную — NOIR BARBER">
      <span className="wordmark-icon" aria-hidden="true">N</span>
      <span className="wordmark-type">NOIR <span>BARBER</span></span>
    </a>
  )
}

function SectionIntro({ number, eyebrow, title, description, light = false }) {
  return (
    <div className={`section-intro${light ? ' section-intro-light' : ''}`}>
      <div className="section-kicker"><span>{number}</span><i />{eyebrow}</div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const links = [
    ['Главная', '#home'],
    ['Услуги', '#services'],
    ['Барберы', '#barbers'],
    ['Галерея', '#gallery'],
    ['Контакты', '#location'],
  ]

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  return (
    <header className="site-header">
      <div className="header-inner">
        <Wordmark />
        <button
          className={`menu-toggle${menuOpen ? ' menu-toggle-open' : ''}`}
          type="button"
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span /><span />
        </button>
        <nav id="primary-navigation" className={`primary-nav${menuOpen ? ' nav-open' : ''}`} aria-label="Основная навигация">
          {links.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <a className="button button-small button-gold nav-booking" href="#booking" onClick={() => setMenuOpen(false)}>
            Записаться <Arrow diagonal />
          </a>
        </nav>
        <a className="button button-small button-gold header-booking" href="#booking">Записаться <Arrow diagonal /></a>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-heading">
      <div className="hero-image-wrap">
        <img
          className="hero-image"
          src={imageUrl('photo-1503951914875-452162b0f3f1', 1800)}
          alt="Атмосферный интерьер современного барбершопа"
          fetchPriority="high"
        />
        <span className="hero-image-label">АМСТЕРДАМ · С 2016 ГОДА</span>
      </div>
      <div className="hero-copy">
        <div className="eyebrow"><span className="status-dot" /> АМСТЕРДАМ · ОТКРЫТО СЕГОДНЯ</div>
        <h1 id="hero-heading">Ваш стиль.<br /><em>Ваш образ.</em></h1>
        <p>Стрижки премиум-класса, классический уход<br className="desktop-break" /> и современный стиль.</p>
        <div className="hero-actions">
          <a className="button button-gold" href="#booking">Записаться на приём <Arrow diagonal /></a>
          <a className="text-link" href="#services">Посмотреть услуги <Arrow /></a>
        </div>
        <div className="hero-footnote"><span>01</span><span className="footnote-line" /> СТИЛЬ В ДЕТАЛЯХ</div>
      </div>
      <a className="hero-scroll" href="#about" aria-label="Перейти к разделу о барбершопе"><span /> ОТКРОЙТЕ NOIR</a>
    </section>
  )
}

function Marquee() {
  return (
    <div className="marquee" aria-label="Стрижка. Стиль. Уверенность.">
      <div className="marquee-track" aria-hidden="true">
        {Array.from({ length: 4 }, (_, index) => (
          <span key={index}>СТРИЖКА <i>✳</i> СТИЛЬ <i>✳</i> УВЕРЕННОСТЬ <i>✳</i></span>
        ))}
      </div>
    </div>
  )
}

function Services() {
  return (
    <section className="services section-pad" id="services">
      <div className="content-width">
        <div className="services-header">
          <SectionIntro
            number="01"
            eyebrow="УСЛУГИ"
            title={<>Безупречный уход.<br /><em>Без компромиссов.</em></>}
            description="Внимание к деталям и мастерство без спешки. Выберите то, что подходит именно вам."
          />
          <p className="services-aside">Каждый визит начинается с беседы и проходит в вашем ритме. Напиток — за наш счёт.</p>
        </div>
        <div className="service-list">
          {services.map((service, index) => (
            <a className="service-row" href="#booking" key={service.name} aria-label={`Записаться: ${service.name}, ${service.price}`}>
              <span className="service-index">0{index + 1}</span>
              <span className="service-info">
                <span className="service-name">{service.name}</span>
                <span className="service-detail">{service.detail}</span>
              </span>
              <span className="service-time">{service.time}</span>
              <span className="service-price">{service.price}</span>
              <span className="service-arrow"><Arrow diagonal /></span>
            </a>
          ))}
        </div>
        <p className="service-note">Не уверены, что выбрать? <a href="#booking">Подберём вместе <Arrow /></a></p>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="about section-pad" id="about">
      <div className="content-width about-grid">
        <div className="about-image-wrap">
          <img
            src={imageUrl('photo-1596728325488-58c87691e9af', 1100)}
            alt="Барбер тщательно бреет клиента опасной бритвой"
            loading="lazy"
          />
          <div className="about-image-stamp"><span>СТАНДАРТ<br />NOIR<br />BARBER</span><i>✳</i></div>
          <span className="image-caption">ХОРОШАЯ СТРИЖКА — ЭТО БОЛЬШЕ, ЧЕМ СТРИЖКА.</span>
        </div>
        <div className="about-copy">
          <SectionIntro number="02" eyebrow="О БАРБЕРШОПЕ" title={<>Ваше место.<br /><em>Ваш стиль.</em></>} />
          <p className="about-lead">Барбершоп по соседству — с особым вниманием к каждому гостю.</p>
          <p className="about-body">В самом сердце Амстердама NOIR — место, где можно ненадолго замедлиться, устроиться поудобнее и выйти обновлённым, оставаясь собой. Здесь уважение к классическим техникам сочетается с современным взглядом на стиль и вниманием к каждой детали.</p>
          <p className="about-body">Мы не торопим и не стрижём по шаблону. Только мастерство, тёплый приём и образ, который по-настоящему вам подходит.</p>
          <div className="about-signoff"><span className="signature">До встречи в кресле.</span><span>КОМАНДА NOIR BARBER</span></div>
        </div>
      </div>
    </section>
  )
}

function Barbers() {
  return (
    <section className="barbers section-pad" id="barbers">
      <div className="content-width">
        <div className="barbers-header">
          <SectionIntro number="03" eyebrow="БАРБЕРЫ" title={<>Ваш мастер.<br /><em>Ваш человек.</em></>} description="У каждого свой почерк. Всех объединяет одно — внимание к деталям." light />
          <a className="text-link text-link-light" href="#booking">Выбрать мастера <Arrow /></a>
        </div>
        <div className="barber-grid">
          {barbers.map((barber, index) => (
            <article className="barber-card" key={barber.name}>
              <a className="barber-image" href="#booking" aria-label={`Записаться к мастеру: ${barber.name}`}>
                <img src={imageUrl(barber.image, 900)} alt={barber.alt} loading="lazy" />
                <span className="barber-number">0{index + 1}</span>
                <span className="barber-link"><Arrow diagonal /></span>
              </a>
              <div className="barber-meta">
                <div><span className="barber-role">{barber.role}</span><h3>{barber.name}</h3></div>
                <p>{barber.specialty}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Gallery() {
  const [activeImage, setActiveImage] = useState(null)

  useEffect(() => {
    if (!activeImage) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setActiveImage(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeImage])

  return (
    <section className="gallery section-pad" id="gallery">
      <div className="content-width">
        <div className="gallery-header">
          <SectionIntro number="04" eyebrow="ГАЛЕРЕЯ" title={<>Наше дело.<br /><em>Наша атмосфера.</em></>} />
          <p>Почувствуйте атмосферу NOIR и взгляните на нашу работу.</p>
        </div>
        <div className="gallery-grid">
          {gallery.map((item, index) => (
            <button
              className={`gallery-item ${item.shape}`}
              type="button"
              key={item.image}
              onClick={() => setActiveImage(item)}
              aria-label={`Открыть фотографию: ${item.alt}`}
            >
              <img src={imageUrl(item.image, 1200)} alt={item.alt} loading="lazy" />
              <span className="gallery-zoom"><Arrow diagonal /></span>
              <span className="gallery-index">NOIR / 0{index + 1}</span>
            </button>
          ))}
        </div>
      </div>
      {activeImage && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Фотография из галереи" onClick={() => setActiveImage(null)}>
          <button className="lightbox-close" type="button" onClick={() => setActiveImage(null)} aria-label="Закрыть фотографию">×</button>
          <img src={imageUrl(activeImage.image, 1800)} alt={activeImage.alt} onClick={(event) => event.stopPropagation()} />
          <p>{activeImage.alt}</p>
        </div>
      )}
    </section>
  )
}

function Booking() {
  const [submitted, setSubmitted] = useState(false)
  const [service, setService] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="booking section-pad" id="booking">
      <div className="content-width booking-grid">
        <div className="booking-copy">
          <SectionIntro number="05" eyebrow="ЗАПИСЬ" title={<>Ваше кресло<br /><em>уже ждёт.</em></>} description="Оставьте свои данные — и мы подготовим для вас удобное время. Будем рады видеть вас в NOIR." light />
          <div className="booking-note"><span className="status-dot" /> ЗАХОДИТЕ БЕЗ ЗАПИСИ, ЕСЛИ ЕСТЬ СВОБОДНОЕ КРЕСЛО</div>
        </div>
        <div className="booking-form-wrap">
          {submitted ? (
            <div className="booking-success" role="status" aria-live="polite">
              <span className="success-mark">✓</span>
              <p className="form-kicker">ЗАЯВКА ОТПРАВЛЕНА</p>
              <h3>До встречи<br /><em>в NOIR.</em></h3>
              <p>Спасибо, что выбрали NOIR BARBER. Мы свяжемся с вами для подтверждения записи.</p>
              <button className="text-link text-link-light" type="button" onClick={() => setSubmitted(false)}>Записаться ещё раз <Arrow /></button>
            </div>
          ) : (
            <form className="booking-form" onSubmit={handleSubmit}>
              <p className="form-kicker">ЗАПИСЬ НА ПРИЁМ</p>
              <div className="form-row">
                <label>Имя<input name="name" type="text" placeholder="Как к вам обращаться" autoComplete="name" required /></label>
                <label>Телефон<input name="phone" type="tel" placeholder="+31 6 1234 5678" autoComplete="tel" required /></label>
              </div>
              <label>Услуга
                <select name="service" value={service} onChange={(event) => setService(event.target.value)} required>
                  <option value="" disabled>Выберите услугу</option>
                  {services.map((item) => <option key={item.name} value={item.name}>{item.name} · {item.price}</option>)}
                </select>
              </label>
              <div className="form-row">
                <label>Желаемая дата<input name="date" type="date" min={today} required /></label>
                <label>Желаемое время
                  <select name="time" defaultValue="" required>
                    <option value="" disabled>Выберите время</option>
                    {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'].map((time) => <option key={time}>{time}</option>)}
                  </select>
                </label>
              </div>
              <button className="button button-gold form-submit" type="submit">Записаться <Arrow diagonal /></button>
              <p className="form-disclaimer">Оплата не требуется. Мы подтвердим запись по телефону.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Location() {
  return (
    <section className="location section-pad" id="location">
      <div className="content-width location-grid">
        <div className="location-copy">
          <SectionIntro number="06" eyebrow="АМСТЕРДАМ" title={<>Мы рядом,<br /><em>в центре города.</em></>} />
          <address>
            <span className="location-label">БУДЕМ РАДЫ ВАС ВИДЕТЬ</span>
            <p>Принсенграхт, 263<br />1016 GV, Амстердам</p>
            <a className="text-link" href="https://maps.google.com/?q=Prinsengracht+263,+Amsterdam" target="_blank" rel="noreferrer">Построить маршрут <Arrow diagonal /></a>
          </address>
        </div>
        <div className="location-details">
          <div className="location-image">
            <img src={imageUrl('photo-1521590832167-7bcbfaa6381f', 1200)} alt="Уютный интерьер барбершопа" loading="lazy" />
            <span>В САМОМ СЕРДЦЕ АМСТЕРДАМА</span>
          </div>
          <div className="hours">
            <h3>Часы работы</h3>
            <div><span>Пн–Пт</span><span>09:00–20:00</span></div>
            <div><span>Сб</span><span>10:00–18:00</span></div>
            <div><span>Вс</span><span>10:00–16:00</span></div>
            <p><span className="status-dot" /> ОТКРЫТО СЕГОДНЯ</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function FinalCta() {
  return (
    <section className="final-cta">
      <img src={imageUrl('photo-1622286342621-4bd786c2447c', 1800)} alt="" loading="lazy" />
      <div className="final-cta-content">
        <p>ВАШ НОВЫЙ ОБРАЗ НАЧИНАЕТСЯ ЗДЕСЬ</p>
        <h2>Готовы к<br /><em>новому образу?</em></h2>
        <a className="button button-gold" href="#booking">Забронировать визит <Arrow diagonal /></a>
      </div>
      <span className="final-cta-aside">NOIR BARBER · АМСТЕРДАМ</span>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="content-width">
        <div className="footer-main">
          <div className="footer-brand">
            <Wordmark footer />
            <p>Стиль в деталях.<br />В самом сердце Амстердама.</p>
          </div>
          <div className="footer-col"><span>АМСТЕРДАМ</span><p>Принсенграхт, 263<br />1016 GV, Амстердам</p><a href="https://maps.google.com/?q=Prinsengracht+263,+Amsterdam" target="_blank" rel="noreferrer">Построить маршрут <Arrow diagonal /></a></div>
          <div className="footer-col"><span>КОНТАКТЫ</span><a href="https://instagram.com" target="_blank" rel="noreferrer">Инстаграм <Arrow diagonal /></a><a href="tel:+31205550146">+31 20 555 0146</a><a href="mailto:hello@noirbarber.nl">hello@noirbarber.nl</a></div>
          <div className="footer-col"><span>ЧАСЫ РАБОТЫ</span><p>Пн–Пт&nbsp;&nbsp; 09:00–20:00<br />Сб&nbsp;&nbsp; 10:00–18:00<br />Вс&nbsp;&nbsp; 10:00–16:00</p></div>
        </div>
        <div className="footer-bottom"><span>© {currentYear} NOIR BARBER. ВСЕ ПРАВА ЗАЩИЩЕНЫ.</span><a href="#home">НАВЕРХ ↑</a><span>СОЗДАНО С ВНИМАНИЕМ В АМСТЕРДАМЕ</span></div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <About />
        <Barbers />
        <Gallery />
        <Booking />
        <Location />
        <FinalCta />
      </main>
      <Footer />
    </>
  )
}

export default App
