//Advice API I created for Gary's assignment 3. API fetches data from a public random advice API and with a click event of the button displays it on the page

//HERES MY UPGRADED FUNCTUALITY API!!!
//creating div
function writeAdviceToPageContainter() {
  let adviceContainer = document.createElement('div')
  adviceContainer.id = 'adviceImage'
  document.body.appendChild(adviceContainer)
}
//envoking div creation
writeAdviceToPageContainter()

//creating function to create div and display advice on page
function writeAdviceToPage(text) {
  let locateadviceDiv = document.querySelector('#adviceImage')
  let adviceDiv = document.createElement('div')
  adviceDiv.id = 'adviceDisplay'
  adviceDiv.style = `
    color: white;
    display: block;
    text-align: center;
    margin-left: 1em;
    margin-right: 1em;
    position: relative;
    font-size: 25px;
    top: 13em;
    left: 8em;
    max-height: 30px;
    min-height: 30px;
    max-width: 30vw;
    z-index:1;
    `
  adviceDiv.textContent = text
  locateadviceDiv.appendChild(adviceDiv)
}

//function to update advice on the page
function updateAdviceDisplay (text) {
  let adviceDiv = document.querySelector('#adviceDisplay')  
  adviceDiv.textContent = text
}

//fetching API
const url = 'https://api.adviceslip.com/advice'

//function to display loading while advice is being fetched
writeAdviceToPage('Loading...')

//fetching API function
fetch(url)
  .then(response => {return response.json()
  .then(results =>{
    if(results === "Not Found") {
        throw "uh oh"
      } 
      else {
  const keys = Object.keys(results)
  console.log(results)
  keys.forEach( function(x) {
    const values = results[x]
    updateAdviceDisplay(values.advice)
    })
  }  
})
})

//catching all errors
.catch(err => {
  updateAdviceDisplay("Owl be back with more advice shortly!")
  console.log(err)
   })

//creating and styling button
const locateButton = document.querySelector("#adviceImage")
const createButton = document.createElement('button')
locateButton.appendChild(createButton)
createButton.textContent = 'Get Advice'
createButton.id = 'adviceButton'
createButton.style = `
color: black;
display: block;
font-size: 130%;
border: 2px solid black;
background: -webkit-linear-gradient(#f5ac0f, #690909);
border-radius: 10px;
width: 150px;
text-align: center;
padding: .5em;
margin-left: 25%;
z-index:1;
margin-top: 10em;
`

//adding click event to make button work
const generateAdvice = document.querySelector('#adviceImage')
generateAdvice.addEventListener('click', function() {
fetch(url)
  .then(response => {return response.json()
  .then(results =>{
  const keys = Object.keys(results)
  keys.forEach( function(x) {
    const values = results[x]
    updateAdviceDisplay(values.advice)
    })
  })
})
})

//adding swan picture in background
function addingSwan() {
  let swan = document.createElement('div')
  swan.style = `
  height: 100vh;
  min-width: 100%;
  background-image: url("/img/puffin.jpeg");
  background-repeat: no-repeat;
  background-position: right;
  background-size: contain;
  background-color: black;
  opacity: 1;
  display: block;
  z-index: -1;
  position: relative;
  bottom: 33em;
  `
  document.body.appendChild(swan)
}

//envoking3 swan image function
addingSwan()