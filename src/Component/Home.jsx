import React, { useState, useEffect } from 'react'
import "./Home.css"
import { FiSun, FiMoon } from "react-icons/fi"

import {
  FaPaperPlane,
  FaEnvelope,
  FaLinkedinIn,
  FaGithub,
  FaWhatsapp,
  FaXmark,
  FaHouse,
  FaUser,
  FaBriefcase,
  FaCode,  
  FaBars,
  FaX
} from "react-icons/fa6"


const Home = () => {

  const [tapped, setTapped] = useState(false);
  const [touch, setTouch] = useState(false);
  const [tap, setTap] = useState(false);
  const [active, setActive] = useState("");

  // POPUP STATE
  const [isOpen, setIsOpen] = useState(false);

  const closePopup = () => setIsOpen(false);

  // THEME STATE
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || "dark";
    } catch {
      return "dark";
    }
  });

  // THEME EFFECT
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  // POPUP ESCAPE KEY AND SCROLL LOCK
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closePopup();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // CONTACT LINKS
  const contacts = [
    {
      name: "Email",
      icon: <FaEnvelope />,
      link: "mailto:gospelessien29@gmail.com",
      className: "email",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn />,
      link: "https://www.linkedin.com/in/yourusername",
      className: "linkedin",
    },    
    {
      name: "WhatsApp",
      icon: <FaWhatsapp />,
      link: "https://wa.me/2347056795523",
      className: "whatsapp",
    },
  ];

   const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div>
      <div>

        {/* NAVIGATION */}
        <div className='vicl'>

          <div>
            <h1>Gospel</h1>
          </div>

              <div className="mobile-menu">

      {/* Hamburger Icon */}
      <button className="menu-icon" onClick={toggleMenu}>
        {menuOpen ? <FaX/> : <FaBars />}
      </button>

      {/* Navigation Links */}
      <div className={`mobile-nav ${menuOpen ? "active" : ""}`}>        
        <a href="#work" onClick={closeMenu}>Work</a>
        <a href="#services" onClick={closeMenu}>Services</a>
        <a href="#process" onClick={closeMenu}>Process</a>

      </div>

    </div>

          
          <div className='def'>

            <a
              href="#work"
              className={active === "work" ? "nav_link nav_link--active" : "nav_link"}
              onClick={() => setActive("work")}
            >
              Work
            </a>

            <a
              href="#services"
              className={active === "services" ? "nav_link nav_link--active" : "nav_link"}
              onClick={() => setActive("services")}
            >
              Services
            </a>

            <a
              href="#process"
              className={active === "process" ? "nav_link nav_link--active" : "nav_link"}
              onClick={() => setActive("process")}
            >
              Process
            </a>

          </div>

          {/* THEME BUTTON */}
          <button
            type='button'
            className='theme-btn'
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >

            {theme === "dark" ? (
              <FiSun className='vv'/>
            ) : (
              <FiMoon className='vv'/>
            )}

          </button>

        </div>

        <div className="gl"></div>

        {/* WORK SECTION */}
        <div className='nnn' id='work'>

          <div>

            <h2>
              I BUILD SCALABLE WEBSITES, WITH MIND-BLOWING FEATURES
            </h2>

            <p>
              Have an idea or an existing site that needs work?,
              <br />
              Let's talk about it and turn it into Something your customers will love.
            </p>

            {/* GET IN TOUCH BUTTON */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
            >
              Get in touch
            </button>

          </div>

        </div>

        {/* =========================
             CONTACT POPUP
        ========================= */}

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

              {/* TOP CLOSE BUTTON */}
              <button
                type="button"
                className="contact-top-close"
                onClick={closePopup}
                aria-label="Close popup"
              >
                <FaXmark />
              </button>

              {/* TELEGRAM ICON */}
              <div className="contact-icon-wrapper">

                <div className="contact-icon-circle">
                  <FaPaperPlane />
                </div>

              </div>

              {/* HEADING */}
              <h2 id="contact-title">
                Get in Touch
              </h2>

              <p className="contact-description">
                Let's talk about your ideas, projects,
                <br />
                or how I can help you.
              </p>

              <div className="contact-underline"></div>

              {/* SOCIAL LINKS */}
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

                    <span
                      className={`contact-social-icon ${contact.className}`}
                    >
                      {contact.icon}
                    </span>

                    <span className="contact-social-name">
                      {contact.name}
                    </span>

                  </a>

                ))}

              </div>

              {/* BOTTOM CLOSE BUTTON */}
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
        <div className='pw'></div>

        <div className='rt' id='services'>

          <div className="gig">
            <h2>SERVICES</h2>
            <h5>WHAT I CAN BUILD FOR YOU</h5>
          </div>

          <div className='qpo'>

            <div className='flow'>
              <h2>Business websites</h2>
              <p>
                Fast, mobile first sites that explain what you do and make it easy for people to contact you.
              </p>
            </div>

            <div className='flow'>
              <h2>Web Applications</h2>
              <p>
                Dashboards, portals and custom tools with sign-in, data and the feautures your team needs.
              </p>
            </div>

            <div className='flow'>
              <h2>Online Stores</h2>
              <p>
                Product pages, cart and secure checkout, built so customers can buy without friction.
              </p>
            </div>

          </div>

        </div>

        <div className='pw'></div>

        {/* PROCESS SECTION */}
        <div className='volo' id='process'>

          <div>
            <h4>PROCESS</h4>
            <h2>How we'll work together</h2>
          </div>

          <div className='dd'>

            <div
              className={tapped ? "box box--green" : "box"}
              onClick={() => setTapped(!tapped)}
            >
              <h3>Discover</h3>
              <p>
                we talk through your goals audience and what success looks like.
              </p>
            </div>

            <div
              className={tap ? "box box--green" : "box"}
              onClick={() => setTap(!tap)}
            >
              <h3>Build</h3>
              <p>
                Clean, fast code with regular previews so there are no suprises.
              </p>
            </div>

            <div
              className={touch ? "box box--green" : "box"}
              onClick={() => setTouch(!touch)}
            >
              <h3>Launch</h3>
              <p>
                Testing, going live, and support once the site is out in the world.
              </p>
            </div>

          </div>

        </div>

        <div className='pw'></div>

        {/* CONTACT SECTION */}
        <div className='fort'>

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

            <h5>
              or message me on whatsapp (07056795523)
            </h5>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Home