//adding owl picture in background
function addingOwl() {
  let owl = document.createElement('div')
  owl.id = 'owlImage'
  owl.style = `
  height: 80vh;
  max-width: 100vw;
  background-image: url("https://images.unsplash.com/photo-1542464183-972b09697498?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80");
  background-repeat: no-repeat;
  background-position: center;
  display: block;
  z-index: -1;
  `
  document.body.appendChild(owl)
}

//envoking swan image function
addingOwl()


