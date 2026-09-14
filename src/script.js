
/** @type {HTMLLinkElement} */
const $icon = document.querySelector('link[rel="icon"]')

/** @type {HTMLImageElement} */
const $logo = document.querySelector('header img')

/** @type {HTMLVideoElement} */
const $video = document.querySelector('video')

/** @type {HTMLAnchorElement} */
const $credits = document.querySelector('.credits')

function randomLogo(){

    const logoIndex = (Math.floor(Math.random() * 319) + 1)
        .toString().padStart(3, '0')
    
    $icon.href = `icons/icon_${logoIndex}.png`    
    $logo.src = `logos/logo_${logoIndex}.svg`

}
randomLogo()
setInterval(randomLogo, 1e3)

const credits = [
    { time: 54.1, id: 'the-matrix', title: 'Matrix (1999)' },
    { time: 51.3, id: 'lady-bird', title: 'Lady Bird (2017)' },
    { time: 48.5, id: 'poor-things-2023', title: 'Pobres Criaturas (2023)' },
    { time: 44.14, id: 'ratatouille', title: 'Ratatui (2007)' },
    { time: 40.71, id: 'ponyo', title: 'Ponyo à Beira-Mar (2008)' },
    { time: 36.71, id: 'pearl-2022', title: 'Pearl (2022)' },
    { time: 33.5, id: 'midsommar', title: 'Midsommar: O Ritual (2019)' },
    { time: 27, id: 'the-substance', title: 'A Substância (2024)' },
    { time: 23, id: 'the-truman-show', title: 'The Truman Show: A Vida em Directo (1998)' },
    { time: 17.92, id: 'barbie', title: 'Barbie (2023)' },
    { time: 13.3, id: 'parasite-2019', title: 'Parasitas (2019)' },
    { time: 8.94, id: 'everything-everywhere-all-at-once', title: 'Tudo em Todo o Lado ao Mesmo Tempo (2022)' },
    { time: 6.5, id: 'amelie', title: 'O Fabuloso Destino de Amélie (2001)' },
    { time: 2.6, id: 'superbad', title: 'Super Baldas (2007)' },
    { time: 0, id: 'the-devil-wears-prada', title: 'O Diabo Veste Prada (2006)' },
]

$video.addEventListener('timeupdate', ()=>{
    const credit = credits.find(c=>$video.currentTime > c.time)
    $credits.href = `https://letterboxd.com/film/${credit.id}/`
    $credits.textContent = credit.title
})