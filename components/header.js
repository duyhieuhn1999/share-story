const style = ` 
 *{
    margin: 0;
    padding: 0;
}
.container{
    background-color: #1976D2;
    display: flex;
    height: 64px;
    justify-content: space-between;
    align-items: center;
    padding: 0 10%;
}
.logo{
    display: flex;
    align-items: center;
}
.branch{
    font-size: 1.8rem;
    color: #ffffff;
    margin-left: 20px ;
    font-weight: 600;
}
.user-info i{
    font-size: 1.8rem;
    color: #ffffff;
}
.btn{
background-color: transparent;
    border:   none;
    margin-left: 20px;
    cursor: pointer;
}
`;
import { redirect } from "../index.js";
import { removeItemFromLocalStorage } from "../utils.js";
class StoryHeader extends HTMLElement {
  constructor() {
    super();
    this._shadowDom = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this._shadowDom.innerHTML = ` 
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap" rel="stylesheet">
      
        <style>
        ${style}
        </style>
        <div class="container">
        <div class="logo">
            <img src="../img/tex-symbol.png" width="40px" height="40px" alt="">
            <div class="branch">Share Story</div>
        </div>
        <div class="user-info">
            <div class="avatar"><i class="fa fa-user-circle-o" aria-hidden="true"></i></div>
            <button class="btn" id="logout-btn"><i class="fa fa-sign-out" aria-hidden="true"></i></button>
        </div>
    </div>
        `;
    this._shadowDom.getElementById("logout-btn").addEventListener("click", () => {
        // xóa currentUser trong localstorage
        removeItemFromLocalStorage('currentUser')
        redirect('login')
      });
  }
}
window.customElements.define("story-header", StoryHeader);
