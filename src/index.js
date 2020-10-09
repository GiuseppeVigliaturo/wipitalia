let postUrl = "https://jsonplaceholder.typicode.com/posts/";   
const containerCards = document.getElementById("cards-holder");
const Remover = document.getElementById("remover");
const closeX = document.getElementsByClassName("close");
const hamburger_menu = document.getElementsByClassName("hamburger-menu");
const hamburger_button = document.getElementsByClassName("hamburgerbutton");
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
    
        return ` <div class="card" id=${this.id}>
              <div class="card-content">
                <div class="content">
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

      

      if (e.target.classList.contains("clicked")) {
        alert("già cliccato");
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
          card.innerHTML= myCard.createCardHTML();
          var button = document.createElement("button");
          button.classList.add("delete");
          button.textContent = "REMOVE";
          card.appendChild(button);

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