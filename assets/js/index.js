//adding swan picture in background
function addingSwan() {
  let swan = document.createElement('div')
  swan.style = `
  height: 70vh;
  width: 100%;
  background-image: url("https://images.unsplash.com/photo-1477132394330-d2376dc4c091?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2372&q=80");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  opacity: 1;
  display: block;
  z-index: -1;
  position: relative;
  
  `
  document.body.appendChild(swan)
}

//envoking swan image function
addingSwan()

