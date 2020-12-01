const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data)

const $description = window.document.getElementById('$description')
const $calories = window.document.getElementById('$calories')
const $carbs = window.document.getElementById('$carbs')
const $proteins = window.document.getElementById('$proteins')
const $submit = window.document.getElementById('$submitButton')

let list = []

// Resolve attrs
const resolveAttrs = (object = {}) => {
  const keys = Object.keys(object)
  const attrs = []

  for (let i = 0; i < keys.length; i++) {
    let attr = keys[i]
    attrs.push(`${attr}="${object[attr]}"`)
  }

  const markupAttrs = attrs.join('')

  return markupAttrs
}

// Create tags
const markup = tag => attrs => content => `<${tag} ${resolveAttrs(attrs)}>${content}</${tag}>`
markup('tr')({class: "table-row"})('Hello there :D')


// Validate Inputs
const verifyInputValue = (input) => {

  input.addEventListener('keypress', (ev) => {
    input.classList.remove('is-invalid')
  })

  if(input.value.length === 0 || !input.value ){
    input.classList.add('is-invalid')
    return false
  }

  return true
} 

const validateInputs = () => {
  if(verifyInputValue($description) && verifyInputValue($calories) && verifyInputValue($carbs) && verifyInputValue($proteins)) {
    return true
  } else {
    return false
  }

}


// Add item to list
const addItemToList = (list) => {
  const item = {
    description: String($description.value), 
    calories: parseInt($calories.value), 
    proteins: parseInt($proteins.value), 
    carbs: parseInt($carbs.value), 
  }
 
  list.push(item)

  $description.value = ''
  $calories.value = ''
  $carbs.value = ''
  $proteins.value = ''

  return true
}

$submit.addEventListener('click', (ev) => {
  if(validateInputs()) {
    console.log('All is okey :D')
    addItemToList(list)
    console.log(list)
  } else {
    console.log('Something went wrong D:')
  }
})
