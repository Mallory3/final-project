//adding swan picture in background
function addingSwan() {
  let swan = document.createElement('div')
  swan.style = `
  height: 90vh;
  max-width: 100%;
  background-image: url("/img/puffin.jpeg");
  background-repeat: no-repeat;
  background-position: right;
  background-size: contain;
  opacity: 1;
  display: block;
  z-index: -1;
  position: relative;
  bottom: 16em;
  `
  document.body.appendChild(swan)
}

//envoking swan image function
addingSwan()

