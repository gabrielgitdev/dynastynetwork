/* abre e fecha o menu quando clicar no icone*/
const nav = document.querySelector('#header nav')
const toggle = document.querySelectorAll('nav .toggle')

for (const element of toggle) {
  element.addEventListener('click', function () {
    nav.classList.toggle('show')
  })
}

/* quando clicar em um item do menu, fechar o menu */
const links = document.querySelectorAll('nav ul li a')

for (const link of links) {
  link.addEventListener('click', function () {
    nav.classList.remove('show')
  })
  window.addEventListener('resize', function () {
    if (nav.classList.contains('show')) {
      nav.classList.remove('show')
    }
  })
}

/* Menu ativo conforme a ceção visível na página */
const sections = document.querySelectorAll('main section[id]')
function activateMenuAtCurrentSection() {
  const checkpoint = window.pageYOffset + (window.innerHeight / 8) * 4

  for (const section of sections) {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute('id')

    const checkpointStart = checkpoint >= sectionTop
    const checkpointEnd = checkpoint <= sectionTop + sectionHeight

    if (checkpointStart && checkpointEnd) {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.add('active')
    } else {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.remove('active')
    }
  }
}

/* mudar o header da página quando eu der o scroll e fazer o sombreamento*/

const header = document.querySelector('#header')
const navHeight = header.offsetHeight

function changeHeaderWhenScroll() {
  if (window.scrollY >= navHeight) {
    //scroll é maior que a altura do header
    header.classList.add('scroll')
  } else {
    //menor que a altura do heafer
    header.classList.remove('scroll')
  }
}

//Botão dark mode js
const html = document.querySelector('html')
const checkbox = document.querySelector('input[name=theme]')

const getStyle = (element, style) =>
  window.getComputedStyle(element).getPropertyValue(style)

const initialColors = {
  background: getStyle(html, '--background'),
  bgHeader: getStyle(html, '--bg-header'),
  baseColortext: getStyle(html, '--base-colortext'),
  baseCard: getStyle(html, '--base-card'),
  backgroundcontact: getStyle(html, '--backgroundcontact')
}

const darkMode = {
  background: '#191919',
  bgHeader: '#00000060',
  baseColortext: '#FFFFFF',
  baseCard: '#232323',
  backgroundcontact: '#232323'
}

const transformKey = key => '--' + key.replace(/([A-Z])/, '-$1').toLowerCase()

const changeColors = colors => {
  Object.keys(colors).map(key =>
    html.style.setProperty(transformKey(key), colors[key])
  )
}

checkbox.addEventListener('change', ({ target }) => {
  target.checked ? changeColors(darkMode) : changeColors(initialColors)
})

//score botton
const pegarT = document.querySelector('#header blockquote label')
const themeMode = document.querySelector('#header blockquote .alterado')

pegarT.addEventListener('click', function () {
  if (themeMode.classList.contains('light')) {
    themeMode.classList.remove('light')
    themeMode.innerText = 'Dark'
    themeMode.classList.add('dark')
  } else {
    themeMode.classList.remove('dark')
    themeMode.innerText = 'Light'
    themeMode.classList.add('light')
  }
})

/*Comentarios SWIPE*/

const swiper = new Swiper('.swiper-container', {
  slidesPerView: 1,
  pagination: {
    el: '.swiper-pagination'
  },
  mousewheel: true,
  keyboard: true,
  breakpoints: {
    820: {
      slidesPerView: 3,
      setWrapperSize: true
    }
  }
})

/*SCROLLREVEAL: Mostrar elementos quando for scroll na página pela api puxando no index */
const scrollReveal = ScrollReveal({
  origin: 'top',
  distance: '30px',
  duration: 700,
  reset: true
})

scrollReveal.reveal(
  `#home .text, #home .image,
  #services header, #services .card,
  #ceos header, #ceos .imagemargen,
  #comentarios header, #comentarios .comentarios,
  #about .image, #about .text,
  #contact .text, #contact .links,
  footer .brand, footer .social
`,
  { interval: 100 }
)
/*Botão voltar para o topo */

const backToTopButton = document.querySelector('.back-to-top')
function backToTop() {
  if (window.scrollY >= 560) {
    backToTopButton.classList.add('show')
  } else {
    backToTopButton.classList.remove('show')
  }
}

/*When Scroll = lógica do scroll adaptada em uma unica fuction */
window.addEventListener('scroll', function () {
  changeHeaderWhenScroll()
  backToTop()
  activateMenuAtCurrentSection()
})
