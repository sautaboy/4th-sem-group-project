const developers = [
    {
        name: 'joshna',
        images:
            [
                "/images/Developers Photos/joshna1.webp"
            ]
    },
    {
        name: 'aavash',
        images:
            [
                "/images/Developers Photos/aavash1.jpg", "/images/Developers Photos/aavash2.jpg", "/images/Developers Photos/aavash3.jpg", "/images/Developers Photos/aavash4.jpg", "/images/Developers Photos/aavash5.jpg"
            ]
    },
    {
        name: 'karub',
        images:
            [
                "/images/Developers Photos/karub1.jpg"
            ]
    },
    {
        name: 'dipanshu',
        images:
            [
                "/images/Developers Photos/dipanshu1.jpg",
                "/images/Developers Photos/dipanshu2.jpg"
            ]
    },

    {
        name: 'ashok',
        images:
            [
                "/images/Developers Photos/ashok1.jpeg",
                "/images/Developers Photos/ashok2.jpg",
                "/images/Developers Photos/ashok3.jpeg",
                "/images/Developers Photos/ashok4.jpg"
            ]
    }
];
const joshnaImage = document.querySelector(".joshna-image")
const aavashImage = document.querySelector(".aavash-image")
const karubImage = document.querySelector(".karub-image")
const dipanshuImage = document.querySelector(".dipanshu-image")
const ashokImage = document.querySelector(".ashok-image")

let randomNumberForJoshna = () => Math.floor(Math.random() * developers[0].images.length)
let randomNumberForAavash = () => Math.floor(Math.random() * developers[1].images.length)
let randomNumberForKarub = () => Math.floor(Math.random() * developers[2].images.length)
let randomNumberForDipanshu = () => Math.floor(Math.random() * developers[3].images.length)
let randomNumberForAshok = () => Math.floor(Math.random() * developers[4].images.length)

// joshna
joshnaImage.setAttribute("src", developers[0].images[randomNumberForJoshna()])
setInterval(() => {
    joshnaImage.setAttribute("src", developers[0].images[randomNumberForJoshna()])
}, 10000)

// aavash
aavashImage.setAttribute("src", developers[1].images[randomNumberForAavash()])
setInterval(() => {
    aavashImage.setAttribute("src", developers[1].images[randomNumberForAavash()])
}, 10000)


// karub
karubImage.setAttribute("src", developers[2].images[randomNumberForKarub()])
setInterval(() => {
    karubImage.setAttribute("src", developers[2].images[randomNumberForKarub()])
}, 10000)


// dipanshu
dipanshuImage.setAttribute("src", developers[3].images[randomNumberForDipanshu()])
setInterval(() => {
    dipanshuImage.setAttribute("src", developers[3].images[randomNumberForDipanshu()])
}, 10000)

// ashok
ashokImage.setAttribute("src", developers[4].images[randomNumberForAshok()])
setInterval(() => {
    ashokImage.setAttribute("src", developers[4].images[randomNumberForAshok()])
}, 10000)