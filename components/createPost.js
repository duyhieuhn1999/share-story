

 const style = `
 #create-post{
     width:60%;
     margin: auto;
     margin-top: 20px;
     text-align: right;
   }
   #create-post textarea{
       width:100%;
       boder:1px solid #dbdbdb;
       border-radius: 10px;
       outline: none;
   }
   .post{
       background-color: #1976D1;
       color: #fff;
       padding : 10px 15px;
      

   }


 `
import {getItemLocalStorage} from '../utils.js'
 class CreatePost extends HTMLElement {
    constructor() {
        super();
        this._shadowDom = this.attachShadow({mode :'open'})
    }
    connectedCallback(){
        this._shadowDom.innerHTML =`
        <style> 
        ${style} 
        </style>
        <form id="create-post">
        <textarea name="content" rows="4"> </textarea>
        <button class="post">Post</button>
        </form> 
        `
        const postForm = this._shadowDom.getElementById('create-post')
        postForm.addEventListener('submit', (e) =>{
            e.preventDefault()
            const content = postForm.content.value 
            if(content.trim() === ''){
                alert('Vui lòng điền nội dung bài viết')
            }
            const user = getItemLocalStorage('currentUser')
            const data = {
                createdBy:user.id ,
                createdAt: new Date().toISOString() ,
                content: content,
                comments: [],
                authorName: user.fullName ,
                isShow: true ,
            }
            firebase.firestore().collection('posts').add(data)
            postForm.content.value= ''
        })
    }
}
window.customElements.define('create-post' , CreatePost)