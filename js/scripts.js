let theme = sessionStorage.getItem('theme') ? sessionStorage.getItem('theme') : 'light'

if (theme) {
    document.querySelector('html').classList.add(theme)
}

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('input').forEach((item) => {
        if (item.value === '') item.value = sessionStorage.getItem(item.name, item.value);
        item.addEventListener('input', () => {
            sessionStorage.setItem(item.name, item.value);
        })
    })
    document.querySelectorAll('.select--current').forEach((item) => {
        console.log(item.id)
        if (sessionStorage.getItem(item.id, item.innerText)){
            item.innerText = sessionStorage.getItem(item.id, item.innerText)
        }
    })
});

const buttonApply = document.querySelector('.form--button-apply')
const buttonReset = document.querySelector('.form--button-reset')
const radioThemes = [...document.querySelector('.radio-themes').getElementsByTagName('INPUT')]

radioThemes.forEach((item) => {
    if (item.value === theme) {
        item.checked = true
    }
})

buttonApply.addEventListener('click', function (e) {
    e.preventDefault()
    document.documentElement.classList.remove('light', 'dark')
    radioThemes.forEach((item) => {
        if (item.checked) {
            document.documentElement.classList.add(item.value)
            sessionStorage.setItem('theme', item.value)
        }
    })
})

buttonReset.addEventListener('click', function (e) {
    sessionStorage.clear()
    theme = 'light'
    document.documentElement.classList.remove('light', 'dark')
    sessionStorage.setItem('theme', theme)
    document.documentElement.classList.add(theme)
    radioThemes.forEach((item) => {
        if (item.value === theme) {
            item.checked = true
        }
    })
})

let select = function () {
    let selectHeader = document.querySelectorAll('.form--select-header')
    let selectItem = document.querySelectorAll('.select--item')

    selectHeader.forEach((item) => {
        item.addEventListener('click', selectToggle)
    })
    selectItem.forEach((item) => {
        item.addEventListener('click', selectChoose)
    })

    function selectToggle() {
        this.parentElement.classList.toggle('is-active')
    }

    function selectChoose() {
        let select = this.closest('.form--select')
        let currentText = select.querySelector('.select--current')
        let text = this.innerText
        currentText.innerText = text
        sessionStorage.setItem(currentText.id, text);
        select.classList.remove('is-active')
    }
}

select();