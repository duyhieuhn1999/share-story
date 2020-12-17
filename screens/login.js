const style = ` 
.login-container {
    width:100vw;
    height:100vh;
    background: url('https://ict-imgs.vgcloud.vn/2020/11/10/08/ca-4-mau-iphone-12-se-duoc-ban-chinh-hang-tu-ngay-27-11.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    justify-content: flex-end;
}
#login-form{
    width:30%;
    background: #fff;
    height:100vh;
    padding: 0px 20px;
}
h1{
    text-align: center;
    color: #333;
}
button {
    background: #1565C0;
    color: #fff;
    padding: 10px 15px;
    border-radius: 5px;


`;
import { redirect } from "../index.js";
import { getDataFromDocs, saveToLocalStorage } from "../utils.js";
class loginScreen extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: "open" });
  }
  connectedCallback() {
    this._shadowRoot.innerHTML = ` 
        <style>
        ${style}
        </style>
        <div class="login-container">
            <form id="login-form">
                <h1>CI Project </h1>
               
                <input-wrapper id="email" type="text" placeholder="Email"></input-wrapper> 
                <input-wrapper  id="password" type="password" placeholder="Password"></input-wrapper> 
               
                <button>login</button>
                <a id="redirect">Don't you have  account ? Login</a>
            </form>
        </div>
        `;

    const loginForm = this._shadowRoot.getElementById("login-form");
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const email = this._shadowRoot.getElementById("email").value;
      const password = this._shadowRoot.getElementById("password").value;

      let isValid = true;

      if (email.trim() === "") {
        isValid = false;

        this.setError("email", "Please input email");
      }
      if (password.trim() === "") {
        isValid = false;

        this.setError("password", "Please input password");
      }

      if (!isValid) {
        return;
      }
      const user = await firebase
        .firestore()
        .collection("users")
        .where("email", "==", email)
        .where("password", "==", CryptoJS.MD5(password).toString())
        .get();

      if (user.empty) {
        alert("sai email/ password");
      } else {
        saveToLocalStorage('currentUser', getDataFromDocs(user)[0])
        redirect('story')
      
        
      }
    });
    this._shadowRoot.getElementById("redirect").addEventListener("click", () => {
      redirect("register");
    });
  }
  setError(id, message) {
    this._shadowRoot.getElementById(id).setAttribute("error", message);
  }
 
  
}
window.customElements.define("login-screen", loginScreen);
