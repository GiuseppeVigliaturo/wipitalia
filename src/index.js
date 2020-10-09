import "./scss/style.scss"
let postUrl = "https://jsonplaceholder.typicode.com/posts/";   
const containerCards = document.getElementById("cards-holder");
const Remover = document.getElementById("remover");
const closeX = document.getElementsByClassName("close");
const hamburger_menu = document.getElementsByClassName("hamburger-menu");
const hamburger_button = document.getElementsByClassName("hamburgerbutton");
console.log(hamburger_menu);
console.log(hamburger_button);
const post = document.querySelectorAll('[data-sku]');
let init = {
         method: 'GET'
     }

     //funzioni
hamburger_button[0].addEventListener("click", () => {
hamburger_menu[0].classList.add("active");
})
closeX[0].addEventListener("click",  () => {
  hamburger_menu[0].classList.remove("active");
})

//al click su remove card elimino tutte le card presenti 
Remover.addEventListener("click", (e) =>  {
  e.preventDefault;
  
 while (containerCards.hasChildNodes()) {
    containerCards.removeChild(containerCards.childNodes[0]);
    const postParents = document.querySelectorAll(`[data-sku]`);
    postParents.forEach((post) => post.classList.remove("clicked"));
  }
})

     //fetch ritorna una promise
 async function getPosts(id) {
      const callPost = await fetch(postUrl + id, init)
        .then((result) => result.json())
        .catch((err) => {
          console.log(err);
        });
      return callPost;
    } 


    class Card{

      constructor(id,title,body){
        this.id= id;
        this.title= title;
        this.body = body;
      }


        createCardHTML() {
    
        return ` <div id=${this.id}>
              <div class="card-content">
                <div class="content">
                <div class="post"> <h3>Post: ${this.id}</h3> </div>
                  <div class="title"> <h1>${this.title}</h1> </div>
                  <div class="body"> <h2>${this.body} </h2> </div>
                </div>
              </div>
            </div>`
      }

    }

//funzione principale
function getPost() {
  post.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      let attribute = e.target.attributes[1].value;
      //let cliccato = getElementById

      

      if (e.target.classList.contains("clicked")) {
        alert("HAI GIA' CLICCATO ELIMINA L'ELEMENTO PRIMA DI CLICCARE NUOVAMENTE");
      } else {
        e.target.classList.add("clicked");

        let res = getPosts(+attribute);
        res.then((result) => {
          //destrutturo i dati che ricevo
          //console.log(result);
          var {id,title,body} = result;

          const postParent = document.querySelectorAll(`[data-sku="${id}"]`);
          var myCard = new Card(id,title,body);

          var card = document.createElement("div");
          card.classList.add("card");
          card.id = id;
          card.innerHTML= myCard.createCardHTML();
          var button = document.createElement("button");
          button.classList.add("delete");
          button.textContent = "REMOVE";
          card.appendChild(button);
          
          /**
           * al click sul bottone remove elimino la card
           * e tolgo la classe clicked dai post cosi da poterci
           * ricliccare nuovamente una volta cancellato,
           * N.B. il messaggio già cliccato avviene solo se si clicca sullo 
           * stesso link la lista nel dropdown e a schermo intero sono staccate
           * quindi la classe clicked viene si eliminata da entrambi ma assegnata solo
           * a link specifico e non al suo corrispondente nel dropdown, questo non dovrebbe
           * dare problemi nell'utilizzo se si utilizza solo da mobile o solo da pc
           */
          button.addEventListener("click", (e) => {

                    let cardDeleted = document.getElementById(id);
                    cardDeleted.remove();
                    e.target.remove();
                    console.log("il post è",postParent);
                   postParent.forEach(elem => elem.classList.remove("clicked"))
                })
          containerCards.appendChild(card);
        });
      }
    });
  });
}



document.addEventListener("load", getPost());