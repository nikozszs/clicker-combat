const $circle = document.querySelector('#circle')
const $score = document.querySelector('#score')

function start() {
    setScore(getScore())
    setImage()
}

function setScore(score) {
    localStorage.setItem('score', score)
    $score.textContent = score
}

function setImage() {
    if (getScore() >= 30) {
        $circle.setAttribute('src', './images/lizzard.png')
    }
}

function getScore() {
    return Number(localStorage.getItem('score')) ?? 0
}

function addOne() {
    setScore(getScore() + 1)
    setImage()
}

$circle.addEventListener('click', (evt) => {
    const rect = $circle.getBoundingClientRect()
    const offsetX = evt.clientX - rect.left - rect.width / 2
    const offsetY = evt.clientY - rect.top - rect.height / 2
    const DEG = 40
    const axisX = (offsetY / rect.height) * DEG
    const axisY = (offsetX / rect.width) * -DEG

    $circle.style.setProperty('--axisX', `${axisX}deg`)
    $circle.style.setProperty('--axisY', `${axisY}deg`)

    setTimeout(() => {
        $circle.style.setProperty('--axisX', `0deg`)
        $circle.style.setProperty('--axisY', `0deg`)
    }, 400)

    const plusOne = document.createElement('div')
    plusOne.classList.add('plus-one')
    plusOne.textContent = '+1'
    plusOne.style.left = `${evt.clientX - rect.left}px`
    plusOne.style.top = `${evt.clientY - rect.top}px`

    $circle.parentElement.appendChild(plusOne)

    addOne()

    setTimeout(() => {
        plusOne.remove()
    }, 2100)
})

start()