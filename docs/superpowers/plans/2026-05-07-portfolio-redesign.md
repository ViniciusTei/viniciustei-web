# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Full rewrite of `index.html` and `tailwind.config.js`/`styles.css` to apply the Portfolio Elite (dark) + Aetheric Precision (light) design systems with an animated 3D sphere hero.

**Architecture:** CSS custom properties on `:root` and `.dark` drive both color themes; Tailwind reads them as semantic tokens (`bg-background`, `text-on-surface`, etc.). All sections live in one `index.html`; the existing `lib/translation.js` and `lib/theme.js` are preserved untouched.

**Tech Stack:** Tailwind CSS v3 (PostCSS), vanilla JS, Google Fonts (Epilogue/Manrope/Space Grotesk), FontAwesome.

---

## File Map

| Action | Path |
|---|---|
| Modify | `tailwind.config.js` |
| Modify | `styles.css` |
| Full rewrite | `index.html` |
| Unchanged | `lib/translation.js`, `lib/theme.js`, `assets/`, `postcss.config.js`, `package.json` |

---

## Task 1: Update tailwind.config.js and styles.css

**Files:**
- Modify: `tailwind.config.js`
- Modify: `styles.css`

- [ ] **Step 1: Replace `tailwind.config.js` with the new config**

  Write the full file at `/home/vinicius.teixiera/Documentos/viniciustei-web/tailwind.config.js`:

  ```js
  const colors = require("tailwindcss/colors")
  /** @type {import('tailwindcss').Config} */
  module.exports = {
    content: ["./**/*.html"],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          ...colors,
          // Semantic tokens — CSS vars swap values for dark/light in styles.css
          'background':        'var(--color-background)',
          'surface':           'var(--color-surface)',
          'surface-low':       'var(--color-surface-low)',
          'surface-high':      'var(--color-surface-high)',
          'on-surface':        'var(--color-on-surface)',
          'on-surface-variant':'var(--color-on-surface-variant)',
          'accent':            '#00ff7f',
          'accent-text':       'var(--color-accent-text)',
          'outline':           'var(--color-outline)',
          'outline-variant':   'var(--color-outline-variant)',
        },
        fontFamily: {
          display: ['Epilogue', 'sans-serif'],
          body:    ['Manrope', 'sans-serif'],
          label:   ['"Space Grotesk"', 'sans-serif'],
        },
        keyframes: {
          enter: {
            '0%':   { transform: 'translateY(300px)' },
            '100%': { transform: 'translateY(0)' },
          },
          leave: {
            '0%':   { transform: 'translateY(0)' },
            '100%': { transform: 'translateY(300px)' },
          },
        },
        animation: {
          enter: 'enter 1s ease-in',
          leave: 'leave 1s ease-out',
        },
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
    ],
  }
  ```

- [ ] **Step 2: Replace `styles.css` with CSS custom properties for both themes**

  Write the full file at `/home/vinicius.teixiera/Documentos/viniciustei-web/styles.css`:

  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  :root {
    /* Light mode — Aetheric Precision */
    --color-background:         #f7f9fb;
    --color-surface:            #eceef0;
    --color-surface-low:        #f2f4f6;
    --color-surface-high:       #e6e8ea;
    --color-on-surface:         #191c1e;
    --color-on-surface-variant: #3b4b3c;
    --color-accent-text:        #006d33;
    --color-outline:            #6a7b6b;
    --color-outline-variant:    #b9cbb8;
  }

  .dark {
    /* Dark mode — Portfolio Elite */
    --color-background:         #000000;
    --color-surface:            #131313;
    --color-surface-low:        #1b1b1b;
    --color-surface-high:       #2a2a2a;
    --color-on-surface:         #e2e2e2;
    --color-on-surface-variant: #b9cbb8;
    --color-accent-text:        #00ff7f;
    --color-outline:            #849584;
    --color-outline-variant:    #3b4b3c;
  }

  html {
    scroll-behavior: smooth;
  }
  ```

- [ ] **Step 3: Run the build and confirm no errors**

  ```bash
  cd /home/vinicius.teixiera/Documentos/viniciustei-web
  npm run tailwind:build
  ```

  Expected: exits 0, `dist/styles.css` is written. No "unknown utility" warnings.

- [ ] **Step 4: Commit**

  ```bash
  git add tailwind.config.js styles.css
  git commit -m "feat: add Portfolio Elite + Aetheric Precision design tokens and fonts"
  ```

---

## Task 2: Full rewrite of index.html

**Files:**
- Full rewrite: `index.html`

> Read the current `index.html` first to understand the i18n keys and links being preserved, then write the new file in full.

- [ ] **Step 1: Read the current index.html to confirm i18n keys and external links**

  Read `/home/vinicius.teixiera/Documentos/viniciustei-web/index.html`.

  Keys to preserve (all used in the new file):
  - `header.nav.home`, `header.nav.skills`, `header.nav.projects`, `header.nav.experience`, `header.nav.contact`
  - `main.home.text`
  - `main.skills.title`, `main.skills.additionalInfo.0` through `.3`
  - `main.projects.title`, `main.projects.description`, `main.projects.projectsList.0.description`, `main.projects.projectsList.1.name`, `main.projects.projectsList.1.description`
  - `main.experience.title`, `main.experience.experienceList.0.position`, `main.experience.experienceList.0.description`, `main.experience.experienceList.1.position`, `main.experience.experienceList.1.description`
  - `main.contact.description`

- [ ] **Step 2: Write the complete new index.html**

  Write the full file at `/home/vinicius.teixiera/Documentos/viniciustei-web/index.html`:

  ```html
  <!DOCTYPE html>
  <html lang="pt-br">

  <head>
    <title>ViniciusTei</title>
    <meta name="title" content="ViniciusTei" />
    <meta name="description" content="This is my website portfolio. It should be a place for me to introduce myself and showcase some of my projects." />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://viniciustei.com.br/" />
    <meta property="og:title" content="ViniciusTei" />
    <meta property="og:description" content="This is my website portfolio. It should be a place for me to introduce myself and showcase some of my projects." />
    <meta property="og:image" content="https://viniciustei.com.br/assets/Vinicius.png" />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://viniciustei.com.br/" />
    <meta property="twitter:title" content="ViniciusTei" />
    <meta property="twitter:description" content="This is my website portfolio. It should be a place for me to introduce myself and showcase some of my projects." />
    <meta property="twitter:image" content="https://viniciustei.com.br/assets/Vinicius.png" />
    <meta name="keywords" content="website,portfolio,fullstack,frontend,backend,developer">
    <meta name="robots" content="">
    <meta name="revisit-after" content="1 day">
    <meta name="language" content="Portuguese">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="https://viniciustei.com.br/assets/favicon.ico">
    <link rel="apple-touch-icon" sizes="180x180" href="https://viniciustei.com.br/assets/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="https://viniciustei.com.br/assets/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="https://viniciustei.com.br/assets/favicon-16x16.png">
    <link rel="manifest" href="https://viniciustei.com.br/assets/site.webmanifest">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Epilogue:wght@400;600;700;800&family=Manrope:wght@400&family=Space+Grotesk:wght@600&display=swap" rel="stylesheet">
    <link href="dist/styles.css" rel="stylesheet">
    <script src="https://kit.fontawesome.com/a8336dacef.js" crossorigin="anonymous"></script>
  </head>

  <body class="bg-background text-on-surface min-h-[100dvh]">

    <!-- Scroll progress bar -->
    <div id="scroll-progress" class="fixed top-0 left-0 h-0.5 bg-accent z-[100]" style="width:0%"></div>

    <!-- Navigation -->
    <header class="fixed top-0.5 left-0 right-0 z-50 flex h-14 items-center px-8 backdrop-blur-md bg-white/80 dark:bg-black/50 border-b border-black/10 dark:border-white/10">
      <a href="#" class="flex items-center gap-2">
        <img src="assets/favicon-32x32.png" alt="VT" width="20" height="20" class="rounded">
        <span class="font-label text-sm uppercase tracking-widest text-on-surface">VT</span>
      </a>

      <nav class="hidden md:flex flex-1 items-center justify-center gap-8">
        <a data-i18n-key="header.nav.home" href="#home" class="nav-link relative font-label text-xs uppercase tracking-widest text-on-surface-variant hover:text-on-surface pb-1 transition-colors">Home</a>
        <a data-i18n-key="header.nav.skills" href="#skills" class="nav-link relative font-label text-xs uppercase tracking-widest text-on-surface-variant hover:text-on-surface pb-1 transition-colors">Skills</a>
        <a data-i18n-key="header.nav.projects" href="#projects" class="nav-link relative font-label text-xs uppercase tracking-widest text-on-surface-variant hover:text-on-surface pb-1 transition-colors">Projects</a>
        <a data-i18n-key="header.nav.experience" href="#experience" class="nav-link relative font-label text-xs uppercase tracking-widest text-on-surface-variant hover:text-on-surface pb-1 transition-colors">Experience</a>
        <a data-i18n-key="header.nav.contact" href="#contact" class="nav-link relative font-label text-xs uppercase tracking-widest text-on-surface-variant hover:text-on-surface pb-1 transition-colors">Contact</a>
      </nav>

      <div class="ml-auto flex gap-2">
        <button id="theme-toggle-light-icon" class="hidden p-1 text-on-surface-variant hover:text-on-surface transition-colors">
          <i class="fa-regular fa-sun"></i>
        </button>
        <button id="theme-toggle-dark-icon" class="hidden p-1 text-on-surface-variant hover:text-on-surface transition-colors">
          <i class="fa-regular fa-moon"></i>
        </button>
      </div>
    </header>

    <main>

      <!-- ═══════════════════════════════ HERO ═══════════════════════════════ -->
      <section id="home" class="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-background">
        <canvas id="hero-sphere" class="absolute inset-0 w-full h-full pointer-events-none"></canvas>
        <div class="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto pt-14">
          <span class="font-label text-xs uppercase tracking-[0.15em] text-accent-text mb-6">Fullstack Developer</span>
          <h1 class="font-display text-6xl md:text-8xl font-black tracking-tight text-on-surface leading-[1.1] mb-6">
            Vinicius Teixeira
          </h1>
          <p data-i18n-key="main.home.text" class="font-body text-lg text-on-surface-variant max-w-xl mb-10 leading-relaxed">
            I'm a fullstack developer looking to grow in my career and be part of major transformations. My mission is to build all sort of applications that make a difference.
          </p>
          <div class="flex flex-wrap gap-4 justify-center mb-10">
            <a href="#projects" class="font-label text-sm uppercase tracking-widest bg-accent text-black px-8 py-3 rounded hover:brightness-110 transition-all">View Work</a>
            <a href="#contact" class="font-label text-sm uppercase tracking-widest border border-outline text-on-surface px-8 py-3 rounded hover:border-on-surface transition-all">Get In Touch</a>
          </div>
          <div class="flex gap-6 text-2xl text-on-surface-variant">
            <a href="https://github.com/viniciustei" target="_blank" aria-label="Link para o github" class="hover:text-accent-text transition-colors">
              <i class="fa-brands fa-square-github"></i>
            </a>
            <a href="https://linkedin.com/in/viniciustei" target="_blank" aria-label="Link para o linkedin" class="hover:text-accent-text transition-colors">
              <i class="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════ SKILLS ══════════════════════════════ -->
      <section id="skills" class="py-32 bg-background">
        <div class="max-w-screen-xl mx-auto px-8 md:px-16">
          <div class="mb-16">
            <span class="font-label text-xs uppercase tracking-[0.15em] text-accent-text">Personal Stack</span>
            <h2 data-i18n-key="main.skills.title" class="font-display text-5xl font-bold text-on-surface mt-3 tracking-tight">
              Core Expertise
            </h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <!-- Frontend -->
            <div class="bg-surface border border-black/10 dark:border-white/10 rounded-lg p-8">
              <div class="text-accent-text text-2xl mb-4"><i class="fa-brands fa-html5"></i></div>
              <h3 class="font-display text-xl font-semibold text-on-surface mb-4">Frontend</h3>
              <div class="flex flex-wrap gap-2">
                <span class="font-label text-[11px] uppercase tracking-widest text-accent-text bg-surface-high px-3 py-1 rounded">HTML/CSS/JS</span>
                <span class="font-label text-[11px] uppercase tracking-widest text-accent-text bg-surface-high px-3 py-1 rounded">React</span>
                <span class="font-label text-[11px] uppercase tracking-widest text-accent-text bg-surface-high px-3 py-1 rounded">Angular</span>
              </div>
            </div>
            <!-- Backend -->
            <div class="bg-surface border border-black/10 dark:border-white/10 rounded-lg p-8">
              <div class="text-accent-text text-2xl mb-4"><i class="fa-brands fa-python"></i></div>
              <h3 class="font-display text-xl font-semibold text-on-surface mb-4">Backend</h3>
              <div class="flex flex-wrap gap-2">
                <span class="font-label text-[11px] uppercase tracking-widest text-accent-text bg-surface-high px-3 py-1 rounded">Python</span>
                <span class="font-label text-[11px] uppercase tracking-widest text-accent-text bg-surface-high px-3 py-1 rounded">Java</span>
                <span class="font-label text-[11px] uppercase tracking-widest text-accent-text bg-surface-high px-3 py-1 rounded">TypeScript</span>
                <span class="font-label text-[11px] uppercase tracking-widest text-accent-text bg-surface-high px-3 py-1 rounded">Node.js</span>
                <span class="font-label text-[11px] uppercase tracking-widest text-accent-text bg-surface-high px-3 py-1 rounded">Go</span>
              </div>
            </div>
            <!-- Infrastructure -->
            <div class="bg-surface border border-black/10 dark:border-white/10 rounded-lg p-8">
              <div class="text-accent-text text-2xl mb-4"><i class="fa-solid fa-cloud"></i></div>
              <h3 class="font-display text-xl font-semibold text-on-surface mb-4">Infrastructure</h3>
              <div class="flex flex-wrap gap-2">
                <span class="font-label text-[11px] uppercase tracking-widest text-accent-text bg-surface-high px-3 py-1 rounded">AWS</span>
                <span class="font-label text-[11px] uppercase tracking-widest text-accent-text bg-surface-high px-3 py-1 rounded">GCP</span>
                <span class="font-label text-[11px] uppercase tracking-widest text-accent-text bg-surface-high px-3 py-1 rounded">Azure</span>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            <p data-i18n-key="main.skills.additionalInfo.0" class="font-body text-sm text-on-surface-variant leading-relaxed">Proficient in building responsive and visually appealing styles for web applications.</p>
            <p data-i18n-key="main.skills.additionalInfo.1" class="font-body text-sm text-on-surface-variant leading-relaxed">Strong understanding of programming and web fundamentals, like algorithms and data structures and web protocols.</p>
            <p data-i18n-key="main.skills.additionalInfo.2" class="font-body text-sm text-on-surface-variant leading-relaxed">Experience in building dynamic and interactive user interfaces using web frameworks like React.Js and Angular.</p>
            <p data-i18n-key="main.skills.additionalInfo.3" class="font-body text-sm text-on-surface-variant leading-relaxed">Knowledge of server-side JavaScript and building scalable backend applications using Node.js or other languages like Go.</p>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════ PROJECTS ═════════════════════════════ -->
      <section id="projects" class="py-32 bg-surface-low">
        <div class="max-w-screen-xl mx-auto px-8 md:px-16">
          <div class="flex items-start justify-between mb-16 gap-8 flex-wrap">
            <div>
              <span class="font-label text-xs uppercase tracking-[0.15em] text-accent-text">Portfolio</span>
              <h2 data-i18n-key="main.projects.title" class="font-display text-5xl font-bold text-on-surface mt-3 tracking-tight">Selected Works</h2>
            </div>
            <p data-i18n-key="main.projects.description" class="font-body text-base text-on-surface-variant max-w-xs leading-relaxed self-end">
              Check out some of the projects I've worked on.
            </p>
          </div>

          <!-- Project grid: featured wide (col-span-2) + narrower card.
               To add a project: copy one <article> block and update name, description, link, image src. -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Featured: Abat Caverna -->
            <article class="md:col-span-2 group bg-surface border border-black/10 dark:border-white/10 rounded-lg overflow-hidden flex flex-col">
              <div class="relative h-64 md:h-80 bg-surface-high flex items-center justify-center">
                <img src="" alt="Abat Caverna" class="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity">
                <span class="font-label text-[11px] uppercase tracking-widest text-outline">No preview</span>
              </div>
              <div class="p-8 flex flex-col gap-3 flex-1">
                <span class="font-label text-[11px] uppercase tracking-widest text-outline">Web Application</span>
                <h3 class="font-display text-2xl font-semibold text-on-surface">
                  <a href="http://abatcaverna.com" target="_blank">Abat Caverna</a>
                </h3>
                <p data-i18n-key="main.projects.projectsList.0.description" class="font-body text-sm text-on-surface-variant leading-relaxed flex-1">
                  Home site for the University's Student Fraternity I lived in. It consists of a landing page to introduce the house, a marketplace to sell fraternity items, and an internal dashboard to manage the house and its members.
                </p>
                <a href="http://abatcaverna.com" target="_blank" class="font-label text-xs uppercase tracking-widest text-accent-text hover:brightness-110 transition-all mt-2">View Project →</a>
              </div>
            </article>

            <!-- Rock, Paper and Scissors -->
            <article class="group bg-surface border border-black/10 dark:border-white/10 rounded-lg overflow-hidden flex flex-col">
              <div class="relative h-64 bg-surface-high flex items-center justify-center">
                <img src="" alt="Rock Paper Scissors" class="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity">
                <span class="font-label text-[11px] uppercase tracking-widest text-outline">No preview</span>
              </div>
              <div class="p-8 flex flex-col gap-3 flex-1">
                <span class="font-label text-[11px] uppercase tracking-widest text-outline">Game / Websockets</span>
                <h3 class="font-display text-2xl font-semibold text-on-surface">
                  <a href="https://rockpaperscissors.viniciustei.com.br" target="_blank">
                    <span data-i18n-key="main.projects.projectsList.1.name">Rock, Paper and Scissors</span>
                  </a>
                </h3>
                <p data-i18n-key="main.projects.projectsList.1.description" class="font-body text-sm text-on-surface-variant leading-relaxed flex-1">
                  This is the solution for a frontend mentor challenge. However, instead of solely focusing on the frontend, I challenged myself to build a Go web service for a multiplayer experience of the game. Utilizing websockets for real-time communication between players.
                </p>
                <a href="https://rockpaperscissors.viniciustei.com.br" target="_blank" class="font-label text-xs uppercase tracking-widest text-accent-text hover:brightness-110 transition-all mt-2">View Project →</a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════ EXPERIENCE ═══════════════════════════ -->
      <section id="experience" class="py-32 bg-background">
        <div class="max-w-screen-xl mx-auto px-8 md:px-16">
          <div class="mb-16">
            <span class="font-label text-xs uppercase tracking-[0.15em] text-accent-text">Career Path</span>
            <h2 data-i18n-key="main.experience.title" class="font-display text-5xl font-bold text-on-surface mt-3 tracking-tight">Experience</h2>
          </div>

          <!-- To add an entry: copy one grid row below and update date, position, description. -->
          <div class="space-y-12 max-w-4xl">
            <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-12 items-start">
              <div><span class="font-label text-xs uppercase tracking-widest text-outline">2021 — Present</span></div>
              <div>
                <h3 data-i18n-key="main.experience.experienceList.1.position" class="font-display text-xl font-semibold text-on-surface mb-3">Software Developer</h3>
                <p data-i18n-key="main.experience.experienceList.1.description" class="font-body text-sm text-on-surface-variant leading-relaxed">
                  With over five years of experience in software development, I have evolved from a specialized frontend developer to a versatile full-stack engineer. My comprehensive skill set allows me to contribute effectively to every stage of the software development process, resulting in robust and efficient products. I ensure that the software I build is not only functional but also scalable and accessible.
                </p>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-12 items-start">
              <div><span class="font-label text-xs uppercase tracking-widest text-outline">2018 — 2023</span></div>
              <div>
                <h3 data-i18n-key="main.experience.experienceList.0.position" class="font-display text-xl font-semibold text-on-surface mb-3">College</h3>
                <p data-i18n-key="main.experience.experienceList.0.description" class="font-body text-sm text-on-surface-variant leading-relaxed">
                  I graduated in Computer Science from the Federal University of Viçosa in 2023. Throughout my studies, I gained a deep understanding of various aspects of computer science, including programming, algorithms, and software development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════ CONTACT ══════════════════════════════ -->
      <section id="contact" class="py-32 bg-surface border-t border-black/10 dark:border-white/10">
        <div class="max-w-screen-xl mx-auto px-8 md:px-16 text-center">
          <span class="font-label text-xs uppercase tracking-[0.15em] text-accent-text">Available for Collaboration</span>
          <h2 class="font-display text-5xl md:text-6xl font-bold text-on-surface mt-3 mb-4 tracking-tight leading-tight">
            Let's build something<br>extraordinary.
          </h2>
          <p data-i18n-key="main.contact.description" class="font-body text-base text-on-surface-variant mb-12 max-w-md mx-auto">
            Here is how you can contact me.
          </p>
          <div class="flex flex-wrap gap-6 justify-center">
            <a href="mailto:viniciustprates@gmail.com"
               class="flex items-center gap-3 bg-surface-high border border-black/10 dark:border-white/10 rounded-lg px-8 py-4 text-on-surface hover:border-accent/50 transition-colors">
              <i class="fa-regular fa-envelope text-accent-text"></i>
              <span class="font-label text-sm uppercase tracking-widest">Send a Message</span>
            </a>
            <a href="https://wa.me/5531995339124?text=Oi%20vim%20pelo%20website"
               class="flex items-center gap-3 bg-surface-high border border-black/10 dark:border-white/10 rounded-lg px-8 py-4 text-on-surface hover:border-accent/50 transition-colors">
              <i class="fa-brands fa-whatsapp text-accent-text"></i>
              <span class="font-label text-sm uppercase tracking-widest">Start a Chat</span>
            </a>
          </div>
        </div>
      </section>

    </main>

    <!-- Footer -->
    <footer class="py-6 border-t border-black/10 dark:border-white/10 bg-background">
      <div class="max-w-screen-xl mx-auto px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <img src="assets/favicon-32x32.png" alt="VT logo" width="20" height="20">
          <a href="https://github.com/ViniciusTei/viniciustei-web" target="_blank"
             class="font-label text-xs uppercase tracking-widest text-on-surface-variant hover:text-on-surface transition-colors">
            ViniciusTei
          </a>
        </div>
        <span class="font-body text-xs text-outline">© 2026 Vinicius Teixeira. Digital Craftsmanship.</span>
        <div class="flex gap-4 text-on-surface-variant">
          <a href="https://github.com/viniciustei" target="_blank" aria-label="GitHub" class="hover:text-accent-text transition-colors"><i class="fa-brands fa-github"></i></a>
          <a href="https://linkedin.com/in/viniciustei" target="_blank" aria-label="LinkedIn" class="hover:text-accent-text transition-colors"><i class="fa-brands fa-linkedin"></i></a>
          <a href="mailto:viniciustprates@gmail.com" aria-label="Email" class="hover:text-accent-text transition-colors"><i class="fa-regular fa-envelope"></i></a>
        </div>
      </div>
    </footer>

    <!-- Sphere canvas animation -->
    <script>
    (function () {
      var canvas = document.getElementById('hero-sphere');
      if (!canvas) return;
      var ctx = canvas.getContext('2d');
      var angle = 0;

      function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      resize();
      window.addEventListener('resize', resize);

      function isDark() { return document.documentElement.classList.contains('dark'); }

      function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var cx = canvas.width / 2;
        var cy = canvas.height / 2;
        var R = Math.min(canvas.width, canvas.height) * 0.32;
        var opacity = isDark() ? 0.55 : 0.28;
        var color = isDark() ? '0,255,127' : '0,109,51';
        var SEGS = 18;

        ctx.shadowBlur = isDark() ? 10 : 0;
        ctx.shadowColor = 'rgba(0,255,127,0.5)';

        for (var i = 0; i <= SEGS; i++) {
          var phi = (i / SEGS) * Math.PI - Math.PI / 2;
          var ringR = R * Math.cos(phi);
          var vy = R * Math.sin(phi);
          ctx.beginPath();
          for (var j = 0; j <= 120; j++) {
            var theta = (j / 120) * 2 * Math.PI + angle;
            var px = cx + ringR * Math.cos(theta);
            var py = cy - vy;
            if (j === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
          }
          ctx.strokeStyle = 'rgba(' + color + ',' + opacity + ')';
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }

        for (var j2 = 0; j2 < SEGS; j2++) {
          var theta2 = (j2 / SEGS) * 2 * Math.PI + angle;
          ctx.beginPath();
          for (var i2 = 0; i2 <= 60; i2++) {
            var phi2 = (i2 / 60) * Math.PI - Math.PI / 2;
            var px2 = cx + R * Math.cos(phi2) * Math.cos(theta2);
            var py2 = cy - R * Math.sin(phi2);
            if (i2 === 0) ctx.moveTo(px2, py2); else ctx.lineTo(px2, py2);
          }
          ctx.strokeStyle = 'rgba(' + color + ',' + opacity + ')';
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }

        angle += 0.003;
        requestAnimationFrame(draw);
      }
      draw();
    })();
    </script>

    <!-- Scroll progress bar -->
    <script>
    (function () {
      var bar = document.getElementById('scroll-progress');
      window.addEventListener('scroll', function () {
        var scrollTop = window.scrollY || document.documentElement.scrollTop;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + '%';
      }, { passive: true });
    })();
    </script>

    <!-- Active nav dot indicator -->
    <script>
    (function () {
      var links = document.querySelectorAll('.nav-link');
      var sectionIds = ['home', 'skills', 'projects', 'experience', 'contact'];

      function setActive(id) {
        links.forEach(function (link) {
          var dot = link.querySelector('.nav-dot');
          if (dot) dot.remove();
          link.classList.remove('text-on-surface');
          link.classList.add('text-on-surface-variant');
        });
        var active = document.querySelector('.nav-link[href="#' + id + '"]');
        if (!active) return;
        active.classList.remove('text-on-surface-variant');
        active.classList.add('text-on-surface');
        var dot = document.createElement('span');
        dot.className = 'nav-dot absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent';
        active.appendChild(dot);
      }

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      }, { threshold: 0.4 });

      sectionIds.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    })();
    </script>

    <script src="lib/translation.js"></script>
    <script src="lib/theme.js"></script>

  </body>
  </html>
  ```

- [ ] **Step 3: Run the build and verify no Tailwind errors**

  ```bash
  cd /home/vinicius.teixiera/Documentos/viniciustei-web
  npm run tailwind:build
  ```

  Expected: exits 0, `dist/styles.css` written. Verify that `dist/styles.css` contains `font-family` rules for Epilogue, and classes like `.bg-background`, `.text-on-surface`, `.bg-accent`.

  ```bash
  grep -c "background" dist/styles.css
  ```

  Expected: non-zero count.

- [ ] **Step 4: Commit**

  ```bash
  git add index.html
  git commit -m "feat: redesign portfolio with Portfolio Elite / Aetheric Precision themes"
  ```

---

## Task 3: Build verification and smoke test

**Files:**
- Read: `dist/styles.css`
- Read: `index.html`

- [ ] **Step 1: Confirm the final build is clean**

  ```bash
  cd /home/vinicius.teixiera/Documentos/viniciustei-web
  npm run tailwind:build 2>&1
  ```

  Expected: process exits 0, no "warn" or "error" lines about unknown utilities.

- [ ] **Step 2: Verify all i18n keys are present in index.html**

  ```bash
  grep -c 'data-i18n-key' index.html
  ```

  Expected: 17 or more (one per key listed in Task 2, Step 1).

- [ ] **Step 3: Verify all section ids are present**

  ```bash
  grep -E 'id="(home|skills|projects|experience|contact)"' index.html
  ```

  Expected: 5 matches.

- [ ] **Step 4: Verify sphere canvas id is present**

  ```bash
  grep 'id="hero-sphere"' index.html
  ```

  Expected: 1 match.

- [ ] **Step 5: Verify scroll progress bar is present**

  ```bash
  grep 'id="scroll-progress"' index.html
  ```

  Expected: 1 match.

- [ ] **Step 6: Verify lib scripts are still linked**

  ```bash
  grep -E 'lib/(translation|theme)\.js' index.html
  ```

  Expected: 2 matches.

- [ ] **Step 7: Commit the final build artifact**

  ```bash
  git add dist/styles.css
  git commit -m "build: compile production CSS for portfolio redesign"
  ```
