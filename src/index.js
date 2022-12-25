import "./styles/index.scss"
import img1 from "../public/imgs/1.jpg"

const $card1 = document.createElement("div")
$card1.classList.add("col", "card")

$card1.innerHTML = `
  <img class="card-img" src=${img1} alt="1.jpg">
  <div class="card-body">
    <p class="card-text">Image imported by <code>index.js</code></p>
  </div>
`

document.querySelector(".container > .row").append($card1)
