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
    top: 6em;
    max-height: 30px;
    min-height: 30px;
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
color: white;
display: block;
font-size: 130%;
border: 2px solid black;
background: -webkit-linear-gradient(#cf1b6c, #9404f3);
border-radius: 10px;
width: 150px;
text-align: center;
margin: auto;
padding: .5em;
position: relative;
top: 2em;
z-index:1;
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
  height: 90vh;
  max-width: 100%;
  background-image: url("https://images.unsplash.com/photo-1477132394330-d2376dc4c091?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2372&q=80");
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.7;
  backgound-size: contain;
  display: block;
  z-index: -1;
  `
  document.body.appendChild(swan)
}

//envoking swan image function
addingSwan()