let theme = sessionStorage.getItem('theme') ? sessionStorage.getItem('theme') : 'light'

if (theme) {
  document.querySelector('html').classList.add(theme)
}

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('input').forEach((item) => {

    if (item.value === '') {
      item.value = sessionStorage.getItem(item.name, item.value);
    }
    if (item.type !== 'radio'){
      item.addEventListener('input', () => {
        sessionStorage.setItem(item.name, item.value);
      })
    }
  })
  document.querySelectorAll('.select--current').forEach((item) => {
    const selectText = sessionStorage.getItem(item.id, item.innerText)
    if (selectText) {
      item.innerText = selectText
    }
  })
});

const buttonApply = document.getElementById('button-apply')
const buttonCancel = document.getElementById('button-cancel')
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

buttonCancel.addEventListener('click', function (e) {
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

let init = function () {
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
    document.addEventListener("click", (e) => {
      const withinBoundaries = e.composedPath().includes(this)
      if (!withinBoundaries) {
        this.parentElement.classList.remove('is-active')
      }
    })
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

init();