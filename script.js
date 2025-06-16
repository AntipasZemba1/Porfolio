'use strict';

  // Data for projects
  const projects = [
    {
      id: 'vbauto',
      title: 'VB-Auto Center',
      shortDesc: 'App that calculates the total amount due for purchasing a vehicle with options and taxes... more',
      details: 'Developed an application that calculates the total amount due for purchasing a vehicle. The app allows users to input the base price, trade-in allowance, and select optional features like sound system, leather interior, computer navigation, and exterior finishes with varying costs. It automatically computes accessory and finish prices, adds sales tax, subtracts trade-in value, and displays the final amount due. The app also includes clear and exit controls for user convenience.',
      tech: ['vbnet'],
      languages: ['Visual Basic .NET'],
      link: 'https://github.com/AntipasZemba1/VB-Auto'
    },
    {
      id: 'drivingquiz',
      title: 'Driving License Quiz (Tkinter for GUI)',
      shortDesc: 'An interactive, multilingual desktop quiz application. Designed to help users prepare for driving license test... more',
      details: 'Created an interactive command-line quiz to help users prepare for their driving license test. The quiz supports English and French languages and covers key topics like traffic lights, road signs, speed limits, and emergency procedures. Features include timed multiple-choice questions, randomized question order, real-time feedback, score tracking, and pass/fail evaluation. The app also enforces an age restriction (16+), ensuring realistic user experience.',
      tech: ['python'],
      languages: ['Python (CLI and Tkinter)'],
      link: 'https://github.com/AntipasZemba1/DriverLicenseQuiz'
    },
    {
      id: 'golfathon',
      title: 'Golfathon Data Analysis (SQL Queries)',
      shortDesc: 'SQL queries to analyze fundraising data for charity golf event with insights and reports... more',
      details: 'Developed a series of SQL queries to analyze fundraising data for a charity golf event. Used aggregate functions, GROUP BY, and HAVING clauses to extract insights such as the number of events held, sponsor counts and pledges by year, total collections, top-performing golfers, and highest/lowest sponsor contributions. Also identified teams with the most pledges and calculated corporate sponsorship totals, demonstrating strong skills in data aggregation and reporting.',
      tech: ['mssql'],
      languages: ['MSSQL Server'],
      link: 'https://github.com/AntipasZemba1/Golfathon'
    },
    {
      id: 'todolist',
      title: 'ToDo List Application',
      shortDesc: 'Simple command-line ToDo list app demonstrating CRUD operations and user interaction...more',
      details: 'Built a simple command-line ToDo List app that lets users add tasks, view all tasks, mark tasks as complete, delete tasks, and exit the program. This project demonstrates basic CRUD operations and user interaction via a clean and intuitive interface.',
      tech: ['python'],
      languages: ['Python (CLI)'],
      link: 'https://github.com/AntipasZemba1/ToDoList'
    },
    {
      id: 'Phone Plan Calculator',
      title: 'Mobile Plan Calculator – VB.NET',
      shortDesc: 'Interactive desktop application built using Windows Forms and VB.NET. Allows users to select a talk plan, phone type, and add-on features... more',
      details: 'Welcome to the Mobile Plan Calculator – a Windows Forms application developed in VB.NET. This tool enables users to estimate their monthly mobile phone bill based on selected plans, devices, and optional services. Built as part of a .NET learning project, it demonstrates form design, control handling, and basic business logic implementation.',
      tech: ['vbnet'],
      languages: ['Visual Basic .NET'],
      link: 'https://github.com/AntipasZemba1/Cell-Phone-Plan'
    },
    {
      id: 'Customer Order System',
      title: 'SQL Database Project',
      shortDesc: 'This project is a comprehensive SQL-based relational database modeling a customer order system... more',
      details: 'This project is a comprehensive SQL-based relational database modeling a customer order system. It includes table creation, referential integrity enforcement, data insertion, and several example queries using explicit joins.',
      tech: ['mssql'],
      languages: ['MSSQL Server'],
      link: 'https://github.com/AntipasZemba1/SQL-Database-Project'
    }
  ];

  // Elements
  const projectsGrid = document.querySelector('.projects-grid');
  const filterButtons = document.querySelectorAll('.filter-button');
  const modal = document.querySelector('.modal');
  const modalTitle = modal.querySelector('#modal-title');
  const modalDesc = modal.querySelector('#modal-desc');
  const modalTechTags = modal.querySelector('.modal-tech-tags');
  const modalLink = modal.querySelector('#modal-link');
  const modalClose = modal.querySelector('.modal-close');

  // Render project cards filtered by tech
  function renderProjects(filter = 'all') {
    projectsGrid.innerHTML = '';
    const filtered = filter === 'all' ? projects : projects.filter(p => p.tech.includes(filter));
    filtered.forEach(proj => {
      const card = document.createElement('article');
      card.className = 'project-card';
      card.tabIndex = 0;
      card.setAttribute('role', 'listitem');
      card.setAttribute('aria-label', proj.title + ' project. Click for details.');
      card.dataset.id = proj.id;
      card.innerHTML = `
        <h3>${proj.title}</h3>
        <p>${proj.shortDesc}</p>
        <div class="tech-tags">${proj.languages.map(lang => `<span class="tech-tag">${lang}</span>`).join('')}</div>
      `;
      projectsGrid.appendChild(card);
    });
  }

  // Handle filter button click
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
      const filter = btn.dataset.filter;
      renderProjects(filter);
    });
  });

  // Modal open
  function openModal(id) {
    const proj = projects.find(p => p.id === id);
    if (!proj) return;
    modalTitle.textContent = proj.title;
    modalDesc.textContent = proj.details;
    modalTechTags.innerHTML = proj.tech.map(t => `<span class="modal-tech-tag">${t.toUpperCase()}</span>`).join('');
    modalLink.textContent = proj.link;
    modalLink.href = proj.link;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    modal.focus();
    document.body.style.overflow = 'hidden';
  }
  // Modal close
  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Open modal on project click or keypress
  projectsGrid.addEventListener('click', e => {
    const card = e.target.closest('.project-card');
    if (card) openModal(card.dataset.id);
  });
  projectsGrid.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('.project-card');
      if (card) {
        e.preventDefault();
        openModal(card.dataset.id);
      }
    }
  });

  // Intersection Observer for fade in sections and hero
  const sections = document.querySelectorAll('section, #hero h1, #hero p');
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('section').forEach(section => observer.observe(section));
  observer.observe(document.querySelector('#hero h1'));
  observer.observe(document.querySelector('#hero p'));

  // Fixed header background on scroll
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if(window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Nav link smooth scroll & active highlight
  const navLinks = document.querySelectorAll('nav a.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if(target) {
        target.focus({preventScroll:true});
        target.scrollIntoView({behavior: 'smooth', block: 'start'});
      }
    });
  });
  window.addEventListener('scroll', () => {
    let fromTop = window.scrollY + 80;
    navLinks.forEach(link => {
      const section = document.querySelector(link.getAttribute('href'));
      if(section.offsetTop <= fromTop && (section.offsetTop + section.offsetHeight) > fromTop) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });

  // Theme toggle with localStorage
  const themeToggle = document.getElementById('theme-toggle');
  function applyTheme(theme) {
    if(theme === 'light') {
      document.body.classList.add('light');
      themeToggle.textContent = '🌚🌙';
      themeToggle.setAttribute('aria-pressed', 'true');
    } else {
      document.body.classList.remove('light');
      themeToggle.textContent = '🌞☀️';
      themeToggle.setAttribute('aria-pressed', 'false');
    }
  }
  themeToggle.addEventListener('click', () => {
    if(document.body.classList.contains('light')) {
      localStorage.setItem('theme', 'dark');
      applyTheme('dark');
    } else {
      localStorage.setItem('theme', 'light');
      applyTheme('light');
    }
  });
  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);

  // Contact form submission (dummy)
  const form = document.getElementById('contact-form');
  const formResponse = document.getElementById('form-response');
  form.addEventListener('submit', e => {
    e.preventDefault();
    formResponse.textContent = 'Thank you for your message! I will get back to you soon.';
    form.reset();
  });

  // Initial render
  renderProjects();
