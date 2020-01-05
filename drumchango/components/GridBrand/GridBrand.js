(async () => {
  const res = await fetch('components/GridBrand/GridBrand.html');
  const textTemplate = await res.text();
  const brandList = [
                          {
                           id: "b1",
                           title: "브랜드명"
                          },
                          {
                           id: "b2",
                           title: "브랜드명"
                          },
                          {
                           id: "b3",
                           title: "브랜드명"
                          },
                          {
                           id: "b4",
                           title: "브랜드명"
                          },
                          {
                           id: "b5",
                           title: "브랜드명"
                          },
                          {
                           id: "b6",
                           title: "브랜드명"
                          },
                          {
                           id: "b7",
                           title: "브랜드명"
                          },
                          {
                           id: "b8",
                           title: "브랜드명"
                          },
                          {
                           id: "b10",
                           title: "브랜드명"
                          },
                          {
                           id: "b11",
                           title: "브랜드명"
                          },
                          {
                           id: "b12",
                           title: "브랜드명"
                          },
                          {
                           id: "b13",
                           title: "브랜드명"
                          },
                          {
                           id: "b14",
                           title: "브랜드명"
                          },
                          {
                           id: "b15",
                           title: "브랜드명"
                          },
                          {
                           id: "b16",
                           title: "브랜드명"
                          },
                          {
                           id: "b17",
                           title: "브랜드명"
                          },
                          {
                           id: "b18",
                           title: "브랜드명"
                          },
                          {
                           id: "b19",
                           title: "브랜드명"
                          }
                        ];

  const allBrandObj = [];
  const selectedBrandObj = [];
  // Parse and select the template tag here instead 
  // of adding it using innerHTML to avoid repeated parsing
  // and searching whenever a new instance of the component is added.
  const HTMLTemplate = new DOMParser().parseFromString(textTemplate, 'text/html')
                           .querySelector('template');

  class GridBrand extends HTMLElement {
    constructor() {
      // If you define a constructor, always call super() first as it is required by the CE spec.
      super();
    }

    // Called when element is inserted in DOM
    connectedCallback() {
      const templete = document.importNode(HTMLTemplate.content, true);
      this.appendChild(templete);
      addBrandList();
    }
  }

  customElements.define('grid-brand', GridBrand);

  function addBrandList(){

    $.map(brandList, function(item, i) {
         $("#GridBrand").append("<div class='artist_5_fix brand" + i + "'><div id='"
                                + item.id + "' class='profile_m border_black50 margin_b_1x'>"
                                + "</div>"
                                + "<p class='caption black600 w400'>"
                                + item.title 
                                + "</p></div>");

         $(".brand" + i).on("click",function(){
            if(!selectedBrandObj.includes(item)){
              selectedBrandObj.push(item);
              $("#selectedBrand").append("<div class='artist_5_fix selected_brand brand" + i + "'><div id='"
                                + item.id + "' class='profile_s border_black50 margin_b_1x'>"
                                + "</div>"
                                + "<p class='caption black600 w400'>"
                                + item.title 
                                + "</p></div>");

              $(".selected_brand").on("click",function(){
                this.remove();
              })
            }
            

          
         });  
      });
  }

})();
