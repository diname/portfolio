import React, { useState, useEffect } from 'react'
import {
  Moon,
  Sun,
  Globe,
  Download,
  Mail,
  Github,
  Linkedin,
  ExternalLink
} from 'lucide-react'
import { Button } from './components/ui/button'
import { Card, CardContent } from './components/ui/card'
import { Badge } from './components/ui/badge'
import ScrollToTop from './components/ScrollToTop'
import AnimatedSection from './components/AnimatedSection'
import profilePicture from './assets/profile_picture.jpeg'
import './App.css'

// Translations
const translations = {
  pt: {
    nav: {
      about: 'Sobre',
      experience: 'Experiência',
      skills: 'Habilidades',
      projects: 'Projetos',
      contact: 'Contato'
    },
    hero: {
      title: 'Lucas Medina',
      subtitle: 'Desenvolvedor FullStack',
      description: 'Criando soluções inovadoras e eficientes com tecnologia',
      cta: 'Entre em contato'
    },
    about: {
      title: 'Sobre',
      content: `Meu objetivo é aplicar minha paixão e habilidades tecnológicas para criar soluções inovadoras e eficientes. Com um sólido background em desenvolvimento de software, estou determinado a contribuir para o sucesso de uma equipe de programadores e a enfrentar desafios complexos com perseverança.

Minha experiência abrange diversas linguagens de programação, incluindo JavaScript, Python bem como tecnologias como Vue.js, React, Node.js, e frameworks front-end e back-end. Tenho conhecimento em desenvolvimento de aplicativos web e aplicativos móveis.

Além disso, estou familiarizado com ambientes de nuvem como Azure e AWS, e domino práticas de controle de versão com Git. Minhas habilidades em banco de dados e otimização me permitem criar soluções robustas e escaláveis.

Sou um programador dedicado, sagaz, e perspicaz, sempre em busca de maneiras de melhorar o código e a experiência do usuário. Estou comprometido em aprender continuamente, permanecer atualizado com as tendências tecnológicas e compartilhar meu conhecimento com a equipe, onde possa contribuir com meu entusiasmo pela tecnologia e meu desejo de alcançar resultados excepcionais.`
    },
    experience: {
      title: 'Experiência',
      current: 'atual',
      jobs: [
        {
          company: 'Qualicorp',
          position: 'Analista Desenvolvedor Fullstack',
          period: 'Mar 2024 – atual',
          description:
            'Projetar, desenvolver e manter aplicações web usando Vue.js e Node.js. Refatoração com boas práticas de Clean Architecture, testes funcionais e unitários, modelagem com Neo4j e CI/CD com Docker.',
          technologies: [
            'Vue.js',
            'Node.js',
            'TypeScript',
            'Neo4j',
            'SQL Server',
            'Docker',
            'Git'
          ]
        },
        {
          company: 'Talent Group',
          position: 'Analista de desenvolvimento de software PL',
          period: 'Fev 2022 – Set 2023',
          description:
            'Desenvolvimento de APIs RESTful com foco em performance, otimização de queries, manutenção em sistemas legados e controle transacional.',
          technologies: ['Node.js', 'SQL Server', 'Oracle', 'Neo4j', 'Git']
        }
      ]
    },
    skills: {
      title: 'Habilidades',
      categories: {
        languages: 'Linguagens',
        frontend: 'Frontend',
        backend: 'Backend',
        databases: 'Bancos de Dados',
        cloud: 'Cloud & DevOps',
        others: 'Outros'
      }
    },
    projects: {
      title: 'Projetos',
      viewCode: 'Ver Código',
      viewLive: 'Ver Demo',
      items: [
        {
          title: 'BarberShop Pro',
          description:
            'Sistema completo de agendamento para barbearias com busca por localização, autenticação de usuários e interface mobile-first.',
          image: 'project-barbershop.png',
          technologies: ['Next.js', 'TypeScript', 'Prisma', 'TailwindCSS'],
          github: 'https://github.com/diname/fullstackweek-barber',
          live: null
        },
        {
          title: 'Surreal Sabor',
          description:
            'Landing page com painel administrativo para empresa de comida caseira, incluindo catálogo de produtos e sistema de autenticação.',
          image: 'project-restaurant.jpg',
          technologies: ['Node.js', 'React', 'SQLite', 'JWT'],
          github: 'https://github.com/diname/api-surreal-sabor',
          live: null
        },
        {
          title: 'Giro SP API',
          description:
            'API robusta para controle de pedidos e logística com gerenciamento de estoque, rastreamento de entregas e relatórios gerenciais.',
          image: 'project-api.png',
          technologies: ['Node.js', 'Prisma', 'Express', 'JavaScript'],
          github: 'https://github.com/diname/api-girosp',
          live: null
        },
        {
          title: 'DinaPizza API',
          description:
            'API completa para sistema de delivery de pizzaria com TypeScript, gerenciamento de cardápio e integração com pagamentos.',
          image: 'project-pizza.jpg',
          technologies: ['TypeScript', 'Node.js', 'Prisma', 'Express'],
          github: 'https://github.com/diname/dinaPizza-api',
          live: null
        }
      ]
    },
    contact: {
      title: 'Entre em contato',
      description: 'Interessado em trabalhar juntos? Vamos conversar!',
      downloadCV: 'Baixar Currículo',
      phone: 'Telefone',
      email: 'Email'
    }
  },
  en: {
    nav: {
      about: 'About',
      experience: 'Experience',
      skills: 'Skills',
      projects: 'Projects',
      contact: 'Contact'
    },
    hero: {
      title: 'Lucas Medina',
      subtitle: 'FullStack Developer',
      description:
        'Creating innovative and efficient solutions with technology',
      cta: 'Get in touch'
    },
    about: {
      title: 'About',
      content: `My goal is to apply my passion and technological skills to create innovative and efficient solutions. With a solid background in software development, I am determined to contribute to the success of a programming team and face complex challenges with perseverance.

My experience spans various programming languages, including JavaScript and Python, as well as technologies like Vue.js, React, Node.js, and front-end and back-end frameworks. I have knowledge in web application and mobile application development.

Additionally, I am familiar with cloud environments like Azure and AWS, and I master version control practices with Git. My database and optimization skills allow me to create robust and scalable solutions.

I am a dedicated, insightful, and perceptive programmer, always looking for ways to improve code and user experience. I am committed to continuous learning, staying updated with technological trends, and sharing my knowledge with the team, where I can contribute with my enthusiasm for technology and my desire to achieve exceptional results.`
    },
    experience: {
      title: 'Experience',
      current: 'present',
      jobs: [
        {
          company: 'Qualicorp',
          position: 'Fullstack Developer Analyst',
          period: 'Mar 2024 – present',
          description:
            'Design, develop and maintain web applications using Vue.js and Node.js. Refactoring with Clean Architecture best practices, functional and unit testing, Neo4j modeling and CI/CD with Docker.',
          technologies: [
            'Vue.js',
            'Node.js',
            'TypeScript',
            'Neo4j',
            'SQL Server',
            'Docker',
            'Git'
          ]
        },
        {
          company: 'Talent Group',
          position: 'Software Development Analyst PL',
          period: 'Feb 2022 – Sep 2023',
          description:
            'Development of RESTful APIs focused on performance, query optimization, legacy system maintenance and transactional control.',
          technologies: ['Node.js', 'SQL Server', 'Oracle', 'Neo4j', 'Git']
        }
      ]
    },
    skills: {
      title: 'Skills',
      categories: {
        languages: 'Languages',
        frontend: 'Frontend',
        backend: 'Backend',
        databases: 'Databases',
        cloud: 'Cloud & DevOps',
        others: 'Others'
      }
    },
    projects: {
      title: 'Projects',
      viewCode: 'View Code',
      viewLive: 'View Demo',
      items: [
        {
          title: 'BarberShop Pro',
          description:
            'Complete barbershop booking system with location search, user authentication and mobile-first interface.',
          image: 'project-barbershop.png',
          technologies: ['Next.js', 'TypeScript', 'Prisma', 'TailwindCSS'],
          github: 'https://github.com/diname/fullstackweek-barber',
          live: null
        },
        {
          title: 'Surreal Sabor',
          description:
            'Landing page with administrative panel for homemade food company, including product catalog and authentication system.',
          image: 'project-restaurant.jpg',
          technologies: ['Node.js', 'React', 'SQLite', 'JWT'],
          github: 'https://github.com/diname/api-surreal-sabor',
          live: null
        },
        {
          title: 'Giro SP API',
          description:
            'Robust API for order control and logistics with inventory management, delivery tracking and management reports.',
          image: 'project-api.png',
          technologies: ['Node.js', 'Prisma', 'Express', 'JavaScript'],
          github: 'https://github.com/diname/api-girosp',
          live: null
        },
        {
          title: 'DinaPizza API',
          description:
            'Complete API for pizza delivery system with TypeScript, menu management and payment integration.',
          image: 'project-pizza.jpg',
          technologies: ['TypeScript', 'Node.js', 'Prisma', 'Express'],
          github: 'https://github.com/diname/dinaPizza-api',
          live: null
        }
      ]
    },
    contact: {
      title: 'Get in touch',
      description: "Interested in working together? Let's talk!",
      downloadCV: 'Download Resume',
      phone: 'Phone',
      email: 'Email'
    }
  }
}

// Skills data
const skillsData = {
  languages: ['JavaScript', 'TypeScript', 'Python'],
  frontend: ['Vue.js', 'React.js', 'HTML', 'CSS', 'Tailwind CSS'],
  backend: ['Node.js', 'Express', 'NestJS'],
  databases: ['SQL Server', 'MySQL', 'Neo4j', 'PostgreSQL', 'MongoDB'],
  cloud: [
    'AWS',
    'Azure',
    'Git',
    'Docker',
    'CI/CD',
    'Kubernetes',
    'Terraform',
    'Observabilidade'
  ],
  others: ['Clean Architecture', 'Unit Testing', 'REST APIs']
}

function App() {
  const [darkMode, setDarkMode] = useState(true)
  const [language, setLanguage] = useState('pt')
  const [activeSection, setActiveSection] = useState('about')

  const t = translations[language]

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'experience', 'skills', 'projects', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setActiveSection(sectionId)
    }
  }

  const toggleLanguage = () => {
    setLanguage(language === 'pt' ? 'en' : 'pt')
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">Lucas Medina</h1>

          <div className="flex items-center gap-4">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              {language === 'pt' ? '🇧🇷' : '🇺🇸'}
            </Button>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="fixed left-0 top-0 h-full w-64 bg-card border-r border-border pt-20 px-6 hidden lg:block">
          <div className="space-y-6">
            {/* Profile */}
            <div className="text-center">
              <img
                src={profilePicture}
                alt="Lucas Medina"
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
              <h2 className="text-lg font-semibold">{t.hero.title}</h2>
              <p className="text-muted-foreground text-sm">{t.hero.subtitle}</p>
            </div>

            {/* Navigation Links */}
            <div className="space-y-2">
              {['about', 'experience', 'skills', 'projects', 'contact'].map(
                (section) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      activeSection === section
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-accent hover:text-accent-foreground'
                    }`}
                  >
                    {t.nav[section]}
                  </button>
                )
              )}
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4 pt-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  window.open('https://github.com/diname', '_blank')
                }
              >
                <Github className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  window.open(
                    'https://www.linkedin.com/in/lucasrmedina/',
                    '_blank'
                  )
                }
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  window.open('mailto:lucasmedinarmc@gmail.com', '_blank')
                }
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 lg:ml-64 pt-20">
          <div className="container mx-auto px-6 py-8 max-w-4xl">
            {/* Hero Section */}
            <AnimatedSection>
              <section id="hero" className="mb-20">
                <div className="text-center lg:text-left">
                  <h1 className="text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    {t.hero.title}
                  </h1>
                  <h2 className="text-xl lg:text-2xl text-muted-foreground mb-6">
                    {t.hero.subtitle}
                  </h2>
                  <p className="text-lg mb-8 max-w-2xl">{t.hero.description}</p>
                  <Button onClick={() => scrollToSection('contact')} size="lg">
                    {t.hero.cta}
                  </Button>
                </div>
              </section>
            </AnimatedSection>

            {/* About Section */}
            <AnimatedSection delay={100}>
              <section id="about" className="mb-20">
                <h2 className="text-3xl font-bold mb-8">{t.about.title}</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="prose prose-lg max-w-none dark:prose-invert">
                      {t.about.content.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>
            </AnimatedSection>

            {/* Experience Section */}
            <AnimatedSection delay={200}>
              <section id="experience" className="mb-20">
                <h2 className="text-3xl font-bold mb-8">
                  {t.experience.title}
                </h2>
                <div className="space-y-6">
                  {t.experience.jobs.map((job, index) => (
                    <AnimatedSection key={index} delay={index * 100}>
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                            <div>
                              <h3 className="text-xl font-semibold text-primary">
                                {job.position}
                              </h3>
                              <h4 className="text-lg font-medium">
                                {job.company}
                              </h4>
                            </div>
                            <Badge variant="secondary" className="mt-2 lg:mt-0">
                              {job.period}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-4 leading-relaxed">
                            {job.description}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {job.technologies.map((tech, techIndex) => (
                              <Badge key={techIndex} variant="outline">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </AnimatedSection>
                  ))}
                </div>
              </section>
            </AnimatedSection>

            {/* Skills Section */}
            <AnimatedSection delay={300}>
              <section id="skills" className="mb-20">
                <h2 className="text-3xl font-bold mb-8">{t.skills.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(skillsData).map(
                    ([category, skills], index) => (
                      <AnimatedSection key={category} delay={index * 100}>
                        <Card>
                          <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-4 text-primary">
                              {t.skills.categories[category]}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {skills.map((skill, skillIndex) => (
                                <Badge key={skillIndex} variant="secondary">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </AnimatedSection>
                    )
                  )}
                </div>
              </section>
            </AnimatedSection>

            {/* Projects Section */}
            <AnimatedSection delay={400}>
              <section id="projects" className="mb-20">
                <h2 className="text-3xl font-bold mb-8">{t.projects.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {t.projects.items.map((project, index) => (
                    <AnimatedSection key={index} delay={index * 100}>
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={`/src/assets/${project.image}`}
                            alt={project.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold mb-3 text-primary">
                            {project.title}
                          </h3>
                          <p className="text-muted-foreground mb-4 leading-relaxed">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.technologies.map((tech, techIndex) => (
                              <Badge key={techIndex} variant="secondary">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center gap-2"
                              onClick={() =>
                                window.open(project.github, '_blank')
                              }
                            >
                              <Github className="h-4 w-4" />
                              {t.projects.viewCode}
                            </Button>
                            {project.live && (
                              <Button
                                size="sm"
                                className="flex items-center gap-2"
                                onClick={() =>
                                  window.open(project.live, '_blank')
                                }
                              >
                                <ExternalLink className="h-4 w-4" />
                                {t.projects.viewLive}
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </AnimatedSection>
                  ))}
                </div>
              </section>
            </AnimatedSection>

            {/* Contact Section */}
            <AnimatedSection delay={500}>
              <section id="contact" className="mb-20">
                <h2 className="text-3xl font-bold mb-8">{t.contact.title}</h2>
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-lg mb-8 text-muted-foreground">
                      {t.contact.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                      <Button
                        size="lg"
                        className="flex items-center gap-2"
                        onClick={() =>
                          window.open(
                            'mailto:lucasmedinarmc@gmail.com',
                            '_blank'
                          )
                        }
                      >
                        <Mail className="h-4 w-4" />
                        {t.contact.email}
                      </Button>

                      <Button
                        variant="outline"
                        size="lg"
                        className="flex items-center gap-2"
                        onClick={() =>
                          window.open('https://github.com/diname', '_blank')
                        }
                      >
                        <Github className="h-4 w-4" />
                        GitHub
                      </Button>

                      <Button
                        variant="outline"
                        size="lg"
                        className="flex items-center gap-2"
                        onClick={() =>
                          window.open(
                            'https://www.linkedin.com/in/lucasrmedina/',
                            '_blank'
                          )
                        }
                      >
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </Button>

                      <Button
                        variant="outline"
                        size="lg"
                        className="flex items-center gap-2"
                        onClick={() =>
                          window.open('tel:+5511952301201', '_blank')
                        }
                      >
                        <Mail className="h-4 w-4" />
                        {t.contact.phone}
                      </Button>
                    </div>

                    <div className="pt-6 border-t border-border">
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                          variant="secondary"
                          className="flex items-center gap-2"
                        >
                          <Download className="h-4 w-4" />
                          {t.contact.downloadCV} (PT-BR)
                        </Button>
                        <Button
                          variant="secondary"
                          className="flex items-center gap-2"
                        >
                          <Download className="h-4 w-4" />
                          {t.contact.downloadCV} (EN-US)
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground mt-4">
                        📱 (11) 9 5230-1201 | ✉️ lucasmedinarmc@gmail.com
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </AnimatedSection>
          </div>
        </main>
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTop />

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border lg:hidden">
        <div className="flex justify-around py-2">
          {['about', 'experience', 'skills', 'projects', 'contact'].map(
            (section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`px-3 py-2 text-xs rounded-lg transition-colors ${
                  activeSection === section
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {t.nav[section]}
              </button>
            )
          )}
        </div>
      </nav>
    </div>
  )
}

export default App
