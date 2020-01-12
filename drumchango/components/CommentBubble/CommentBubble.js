(async () => {
  const res = await fetch('components/CommentBubble/CommentBubble.html');
  const textTemplate = await res.text();

  // Parse and select the template tag here instead 
  // of adding it using innerHTML to avoid repeated parsing
  // and searching whenever a new instance of the component is added.
  const HTMLTemplate = new DOMParser().parseFromString(textTemplate, 'text/html')
                           .querySelector('template');

  class CommentBubble extends HTMLElement {
    constructor() {
      // If you define a constructor, always call super() first as it is required by the CE spec.
      super();
    }

    // Called when element is inserted in DOM
    connectedCallback() {
      const templete = document.importNode(HTMLTemplate.content, true);
      const imgSrc = this.getAttribute('imgSrc');
      const msg = this.getAttribute('msg');

      this.appendChild(templete);
      this.querySelector('.profile_s').style.backgroundImage =  "url(" + imgSrc + ")";
      this.querySelector('#msg_content').innerHTML = msg;


      const comment_action = this.querySelector("#comment_action");  
      const replyInput = this.querySelector("#input_reply");
      const replyList = this.querySelector("#list_replies");
      const more_action = this.querySelector("#more_function");




      this.querySelector("#ic_reply").addEventListener("click",function(){
        // comment_action.classList.add("hide");
        replyInput.classList.remove("hide");
        replyList.classList.remove("hide");
      });
      this.querySelector("#ic_show_replies").addEventListener("click",function(){
        comment_action.classList.add("hide");
        replyInput.classList.remove("hide");
        replyList.classList.remove("hide");
      });
      this.querySelector("#ic_more").addEventListener("click",function(){
        more_action.classList.toggle("hide");
      });
    }
  }

  customElements.define('comment-bubble', CommentBubble);

})();
