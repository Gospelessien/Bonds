import React, { useState, useEffect, useRef } from 'react'
import "./Home.css"

import { FiSun, FiMoon } from "react-icons/fi"
import { SiMongodb, SiJavascript } from "react-icons/si"

import {
  FaPaperPlane,
  FaEnvelope,
  FaLinkedinIn,
  FaWhatsapp,
  FaXmark,
  FaCode,
  FaBars,
  FaGlobe,
  FaCartShopping,
  FaMobile,
  FaBolt,
  FaSearchengin,
  FaPalette,
  FaCircleCheck
} from "react-icons/fa6"


const CountUp = ({ end, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setStarted(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) observer.observe(ref.current)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return

    let startTime = null
    let animationFrame

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp

      const progress = Math.min(
        (timestamp - startTime) / duration,
        1
      )

      const eased = 1 - Math.pow(1 - progress, 3)

      setCount(Math.floor(eased * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [started, end, duration])

  return (
    <span ref={ref} className="count-number">
      {count}{suffix}
    </span>
  )
}


// ==============================
// TYPEWRITER ANIMATION
// ==============================

const TypeWriter = ({ texts, speed = 35, delay = 1500 }) => {
  const [displayedText, setDisplayedText] = useState("")
  const [started, setStarted] = useState(false)
  const [paragraphIndex, setParagraphIndex] = useState(0)

  const ref = useRef(null)

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setStarted(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if (ref.current) observer.observe(ref.current)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started || !texts.length) return

    let index = 0
    let nextParagraphTimeout

    setDisplayedText("")

    const currentText = texts[paragraphIndex]

    const interval = setInterval(() => {
      index++

      setDisplayedText(currentText.slice(0, index))

      if (index >= currentText.length) {
        clearInterval(interval)

        nextParagraphTimeout = setTimeout(() => {
          setParagraphIndex(prev =>
            (prev + 1) % texts.length
          )
        }, delay)
      }
    }, speed)

    return () => {
      clearInterval(interval)
      clearTimeout(nextParagraphTimeout)
    }
  }, [started, paragraphIndex, texts, speed, delay])

  return (
    <p ref={ref} className="typewriter-text"
        style={{ color: "#00ff00" }}
    >
      {displayedText}

      <span className="typing-cursor"></span>
    </p>
  )
}


const Home = () => {
  const [tapped, setTapped] = useState(false)
  const [touch, setTouch] = useState(false)
  const [tap, setTap] = useState(false)
  const [active, setActive] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || "dark"
    } catch {
      return "dark"
    }
  })

  const closePopup = () => setIsOpen(false)

  const toggleMenu = () => {
    setMenuOpen(prev => !prev)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)

    try {
      localStorage.setItem("theme", theme)
    } catch {}
  }, [theme])

  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (event) => {
      if (event.key === "Escape") closePopup()
    }

    document.addEventListener("keydown", handleEscape)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const contacts = [
    {
      name: "Email",
      icon: <FaEnvelope />,
      link: "mailto:gospelessien29@gmail.com",
      className: "email"
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn />,
      link: "https://www.linkedin.com/in/yourusername",
      className: "linkedin"
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp />,
      link: "https://wa.me/2347056795523",
      className: "whatsapp"
    }
  ]

  return (
    <div>
      <div>

        {/* NAVIGATION */}

        <div className="vicl">

          <div className="lkq">
            <div className="dotp">
              <h2>G</h2>
            </div>

            <div className="vb">
              <h2>GO<span>SYX</span></h2>
            </div>
          </div>

          {/* MOBILE MENU */}

          <div className="mobile-menu">

            <button
              className="menu-icon"
              onClick={toggleMenu}
              type="button"
            >
              {menuOpen ? <FaXmark /> : <FaBars />}
            </button>

            <div className={`mobile-nav ${menuOpen ? "active" : ""}`}>
              <a href="#work" onClick={closeMenu}>Work</a>
              <a href="#services" onClick={closeMenu}>Services</a>
              <a href="#process" onClick={closeMenu}>Process</a>
              <a href="#why" onClick={closeMenu}>Why Us</a>
              <a href="#about" onClick={closeMenu}>About</a>
              <a href="#skill" onClick={closeMenu}>Our Skill</a>
            </div>

          </div>

          {/* DESKTOP NAVIGATION */}

          <div className="def">
            {[
              ["work", "Work"],
              ["services", "Services"],
              ["process", "Process"],
              ["why", "Why Us"],
              ["about", "About"],
              ["skill", "Our Skill"]
            ].map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                className={
                  active === id
                    ? "nav_link nav_link--active"
                    : "nav_link"
                }
                onClick={() => setActive(id)}
              >
                {label}
              </a>
            ))}
          </div>

          {/* THEME BUTTON */}

          <button
            type="button"
            className="theme-btn"
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
          >
            {theme === "dark"
              ? <FiSun className="vv" />
              : <FiMoon className="vv" />
            }
          </button>
            
        </div>

        <div className="gl"></div>

        {/* WORK SECTION */}

        <div className="nnn" id="work">

          <div>
            <h2>
              I BUILD SCALABLE WEBSITES, WITH MIND-BLOWING FEATURES
            </h2>

            <p>
              Have an idea or an existing site that needs work?,
              <br />
              Let's talk about it and turn it into Something your customers will love.
            </p>

            <button
              type="button"
              onClick={() => setIsOpen(true)}
            >
              Get in touch
            </button>
          </div>

          <section className="animated-section">

            <div className="animated-description">
              <TypeWriter
                texts={[
                  "I am a passionate full-stack developer focused on building modern, responsive and high-performance web applications using the latest technologies.",

                  "I specialize in creating seamless digital experiences, developing powerful frontend interfaces and building reliable backend systems that bring ideas to life.",

                  "My goal is to transform complex ideas into innovative digital solutions through clean code, creative thinking and scalable technologies."
                ]}
                speed={35}
                delay={1500}
                
              />
            </div>

            <div className="stats-container">

              <div className="stat-box">
                <h2><CountUp end={100} suffix="+" /></h2>
                <p>Projects Completed</p>
              </div>

              <div className="stat-box">
                <h2><CountUp end={100} suffix="%" /></h2>
                <p>Client Satisfaction</p>
              </div>

              <div className="stat-box">
                <h2><CountUp end={24} suffix="/7" /></h2>
                <p>Support</p>
              </div>

            </div>
          </section>

        </div>

        {/* CONTACT POPUP */}

        {isOpen && (
          <div
            className="contact-overlay"
            onClick={closePopup}
          >
            <div
              className="contact-popup"
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-title"
              onClick={(e) => e.stopPropagation()}
            >

              <button
                type="button"
                className="contact-top-close"
                onClick={closePopup}
                aria-label="Close popup"
              >
                <FaXmark />
              </button>

              <div className="contact-icon-wrapper">
                <div className="contact-icon-circle">
                  <FaPaperPlane />
                </div>
              </div>

              <h2 id="contact-title">Get in Touch</h2>

              <p className="contact-description">
                Let's talk about your ideas, projects,
                <br />
                or how I can help you.
              </p>

              <div className="contact-underline"></div>

              <div className="contact-socials">
                {contacts.map((contact) => (
                  <a
                    key={contact.name}
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-link"
                    aria-label={contact.name}
                  >
                    <span className={`contact-social-icon ${contact.className}`}>
                      {contact.icon}
                    </span>

                    <span className="contact-social-name">
                      {contact.name}
                    </span>
                  </a>
                ))}
              </div>

              <button
                type="button"
                className="contact-bottom-close"
                onClick={closePopup}
              >
                <FaXmark />
                <span>Close</span>
              </button>

            </div>
          </div>
        )}

        {/* SERVICES SECTION */}

        <div className="pw"></div>

        <div className="rt" id="services">

          <div className="gig">
            <h2>OUR SERVICES</h2>
            <h4>What We Build</h4>
          </div>

          <div className="qpo">

            <div className="flow">
              <div><FaGlobe /></div>
              <h2>Business websites</h2>
              <p>
                Fast, mobile first sites that explain what you do and make it easy for people to contact you.
              </p>
            </div>

            <div className="flow">
              <div><FaCode /></div>
              <h2>Web Applications</h2>
              <p>
                Dashboards, portals and custom tools with sign-in, data and the features your team needs.
              </p>
            </div>

            <div className="flow">
              <div><FaCartShopping /></div>
              <h2>Online Stores</h2>
              <p>
                Product pages, cart and secure checkout, built so customers can buy without friction.
              </p>
            </div>

          </div>
        </div>

        <div className="pw"></div>

        {/* PROCESS SECTION */}

        <div className="volo" id="process">

          <div>
            <h2>PROCESS</h2>
            <h4>How we'll work together</h4>
          </div>

          <div className="dd">

            <div
              className={tapped ? "box box--green" : "box"}
              onClick={() => setTapped(!tapped)}
            >
              <h3>Discover</h3>
              <p>We talk through your goals, audience and what success looks like.</p>
            </div>

            <div
              className={tap ? "box box--green" : "box"}
              onClick={() => setTap(!tap)}
            >
              <h3>Build</h3>
              <p>Clean, fast code with regular previews so there are no surprises.</p>
            </div>

            <div
              className={touch ? "box box--green" : "box"}
              onClick={() => setTouch(!touch)}
            >
              <h3>Launch</h3>
              <p>Testing, going live, and support once the site is out in the world.</p>
            </div>

          </div>
        </div>

        <div className="pw"></div>

        {/* CONTACT SECTION */}

        <div className="fort">

          <div>
            <h2>Let's build something together</h2>
            <h5>
              Tell me about your project and I'll build it for you in hours.
            </h5>
          </div>

          <div>
            <div className="jh">
              <h4>gospelessien29@gmail.com</h4>
            </div>

            <h5>or message me on WhatsApp (07056795523)</h5>
          </div>

        </div>

        <div className="pw"></div>

        {/* TECHNICAL STACK */}

        <div className="we">

          <div className="fgh">
            <h2>EXPERTISE</h2>
            <h2>
              <span className="lopq">Our</span> Technical
              <span className="lopq"> Stack</span>
            </h2>
          </div>

          <div id="skill">
            <div className="grt">

              <div className="clark">
                <div className="fofo"><FaCode /></div>
                <h2>HTML5 & CSS3</h2>
                <p>Building structured, responsive and visually appealing web interfaces with modern HTML and CSS.</p>
              </div>

              <div className="clark">
                <div className="fofo"><SiMongodb /></div>
                <h2>MongoDB</h2>
                <p>Designing and managing databases with efficient data storage, retrieval and organization using MongoDB.</p>
              </div>

              <div className="clark">
                <div className="fofo"><SiJavascript /></div>
                <h2>Javascript (ES6+)</h2>
                <p>Writing dynamic, interactive and functional web applications using modern Javascript.</p>
              </div>

              <div className="clark">
                <div className="fofo"><FaMobile /></div>
                <h2>Mobile-First Design</h2>
                <p>Creating responsive websites that deliver seamless experiences across mobile, tablet and desktop devices.</p>
              </div>

            </div>
          </div>

          <div className="pw"></div>

          {/* WHY CHOOSE US */}

          <div className="ncs" id="why">
            <div>

              <div>
                <h4><span className="lopq">WHY CHOOSE US?</span></h4>
                <h2>
                  GOSYX <span className="lopq">Solutions Got You Covered</span>
                </h2>
                <p>
                  We don't just build websites,
                  <span className="lopq"> we build growth engines for your business.</span>
                </p>
              </div>

              <div className="kfa">

                <div className="sss">
                  <div className="ppp"><FaBolt /></div>
                  <div>
                    <h2>Fast Delivery</h2>
                    <p>Your website delivered on the exact time, swift and no excuses...</p>
                  </div>
                </div>

                <div className="sss">
                  <div className="ppp"><FaPalette /></div>
                  <div>
                    <h2>Modern Designs</h2>
                    <p>Cutting-edge aesthetics that set you apart from the competition.</p>
                  </div>
                </div>

                <div className="sss">
                  <div className="ppp"><FaMobile /></div>
                  <div>
                    <h2>Mobile Optimized</h2>
                    <p>Perfect experience on every device, phones, tablets and desktops.</p>
                  </div>
                </div>

                <div className="sss">
                  <div className="ppp"><FaSearchengin /></div>
                  <div>
                    <h2>SEO Ready</h2>
                    <p>Built for search engines so customers can find you easily and fast.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="pw"></div>

          {/* ABOUT SECTION */}

          <div className="dort" id="about">

            <div>
              <div>
                <h3><span className="lopq">ABOUT US</span></h3>
                <h2>Empowering Nigerian Businesses to</h2>
                <h3><span className="lopq">DOMINATE THE ONLINE SPACE</span></h3>
              </div>

              <div>
                <p>
                  GOSYX is a digital agency based in Rivers State, Nigeria.
                  We help brands, startups and entrepreneurs build powerful
                  online presence through visually stunning and high-performance
                  websites. Our mission is simple: make your business impossible
                  to be ignored online.
                </p>
              </div>
            </div>

            <div className="llp">

              <div className="xzz">
                <div><FaCircleCheck /></div>
                <div><h3>Expert team of designers & developers</h3></div>
              </div>

              <div className="xzz">
                <div><FaCircleCheck /></div>
                <div><h3>Trusted by businesses across Nigeria</h3></div>
              </div>

              <div className="xzz">
                <div><FaCircleCheck /></div>
                <div><h3>Modern, Scalable & Secure web Solutions</h3></div>
              </div>

              <div className="xzz">
                <div><FaCircleCheck /></div>
                <div><h3>Dedicated support from start to launch</h3></div>
              </div>

            </div>
          </div>

          <div className="pw"></div>

          {/* FOOTER */}

          <div className="lkn">

            <div className="queen">
              <div className="lkq">
                <div className="dotp"><h2>G</h2></div>
                <div className="vb">
                  <h2>GO<span>SYX</span></h2>
                </div>
              </div>
            </div>

            <div>
              <p>
                Web Design & Development Agency specializing in creating modern,
                responsive, and high performing websites for business and individuals.
              </p>
            </div>

            <div className="ghu">

              <div className="wui">
                <div><h2>Quick Links</h2></div>
                <div>
                  <li><a href="#services">Services</a></li>
                  <li><a href="#about">About</a></li>
                  <li><a href="#work">Contact</a></li>
                </div>
              </div>

              <div className="wui">
                <div><h2>Services</h2></div>
                <div>
                  <li>Business Websites</li>
                  <li>E-commerce</li>
                  <li>Landing page</li>
                  <li>Website Redesign</li>
                </div>
              </div>

              <div className="wui">
                <div><h2>Contact</h2></div>
                <div>
                  <li>07056795523</li>
                  <li>gospelessien29@gmail.com</li>
                </div>
              </div>

            </div>

          </div>

          <div className="pw"></div>

          <div className="decx">
            <p>&copy; 2026 GOSYX. All rights reserved.</p>
          </div>

        </div>

      </div>
    </div>
  )
}

export default Home