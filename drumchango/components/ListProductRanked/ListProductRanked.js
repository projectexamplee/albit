(async () => {
  const res = await fetch('components/ListProductRanked/ListProductRanked.html');
  const textTemplate = await res.text();

  // Parse and select the template tag here instead 
  // of adding it using innerHTML to avoid repeated parsing
  // and searching whenever a new instance of the component is added.
  const HTMLTemplate = new DOMParser().parseFromString(textTemplate, 'text/html')
                           .querySelector('template');

  class ListProductRanked extends HTMLElement {
    constructor() {
      // If you define a constructor, always call super() first as it is required by the CE spec.
      super();
    }

    // Called when element is inserted in DOM
    connectedCallback() {
      const templete = document.importNode(HTMLTemplate.content, true);
      const imgSrc = this.getAttribute('imgSrc');
      let isCart = false;
      const img_cart_off = "img/ic/ic_cart_off.svg";
      const img_cart_on = "img/ic/ic_cart_on.svg"
      this.appendChild(templete);
      this.querySelector('.thumb_img_small').style.backgroundImage =  "url(" + imgSrc + ")";
      const toast = this.querySelector(".toast");
      // const shadowRoot = this.attachShadow({ mode: 'open' });

      // // Clone the template and the cloned node to the shadowDOM's root.
      // const instance = HTMLTemplate.content.cloneNode(true);
      // shadowRoot.appendChild(instance);

      // Select the template and clone it. Finally attach the cloned node to the shadowDOM's root.
      // Current document needs to be defined to get DOM access to imported HTML
      this.querySelector('.add_cart').addEventListener("click", function(){
        isCart = !isCart;
        if(isCart){
          this.classList.add('primary600_bg');
          this.querySelector('#img_cart').setAttribute("src",img_cart_on);
          $(".fill").addClass("fill_on");
          setTimeout(function(){ 
              $(".fill").removeClass("fill_on");
              toast.classList.add("toast_show")
           }, 400);
          setTimeout(function(){ 
              toast.classList.remove("toast_show")
           }, 1500);
        }
        else{
          this.classList.remove('primary600_bg');
          this.querySelector('#img_cart').setAttribute("src",img_cart_off);
        }
      });
    }
  }

  customElements.define('list-prd-ranked', ListProductRanked);

})();
