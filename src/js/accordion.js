
;(function(){
const mesureWidth = item => {

    let reqItemWidth = 0;

    const screenWidth = $(".accordion").width();
    const container = item.closest(".accordion__items");
    const titlesBlocks = container.find(".accordion__item-title");
    const titlesBlock = titlesBlocks.width()
    const titlesWidth = titlesBlocks.width()*titlesBlocks.length;


    const textContainer = item.find(".accordion__item--desc--content");
    const paddingLeft = parseInt(textContainer.css("padding-left"));
    const paddingRight = parseInt(textContainer.css("padding-right"));
    const maxWidth = screenWidth - titlesWidth



    //const isTablets = window.matchMedia("(max-width:768px)").matches;
    

   if(maxWidth<524) {


        reqItemWidth = screenWidth - titlesWidth;
        console.log("isTablets")


    } else {
        reqItemWidth = 524;
        
        }

    return  {
        
    
        
        container: reqItemWidth,
        textContainer: reqItemWidth - paddingLeft -paddingRight
    
    }



    
}

const closeEveryItemContainer = container => {
    const items = container.find(".accordion__item")
    const content = container.find(".accordion__item--desc")
    

    items.removeClass("active")
    content.width(0);
    
    
    
}

const openItem = item => {
    const hiddenContent = item.find(".accordion__item--desc");
    const reqWidth = mesureWidth(item);
    const textBlock = item.find(".accordion__item--desc--content");
    const isMobile = window.matchMedia("(max-width:480px)").matches;
    
   

    if(isMobile) {
        
        const accordionWidth = $(".accordion").width();

        const DescPaddingLeft = parseInt(textBlock.css("padding-left"));
        const DescPaddingRight = parseInt(textBlock.css("padding-right"));
        const accordionItemWidth = $(".accordion__item").width();
        const mobileDescWidth = accordionWidth - DescPaddingLeft - DescPaddingRight - accordionItemWidth;

        
        hiddenContent.width(reqWidth.container);
        textBlock.width(mobileDescWidth);
        item.addClass("active");

    }else {

        hiddenContent.width(reqWidth.container);
        textBlock.width(reqWidth.textContainer);
        item.addClass("active");


    }
    




}

$(".accordion__item").on("click", e => {

    //const isMobile = window.matchMedia("(max-width:768px)").matches;
   
    
    const $this = $(e.currentTarget);
    const item = $this.closest(".accordion__item")
    const itemOpened = item.hasClass("active")
    const container = $this.closest(".accordion__items")

    //const items = container.find(".accordion__item")
    

    if (itemOpened) {
        closeEveryItemContainer(container)
        
    } else {
        closeEveryItemContainer(container)
        openItem(item);
    }

    

   
});






/*

const accordionItem = document.querySelectorAll(".accordion__item")
for(let item of accordionItem) {
       
    
    item.addEventListener('click', e => {

        
        const descWidth = getComputedStyle(item.lastElementChild).width
        const currentdescWidth = parseInt(descWidth);

        console.log(currentdescWidth)
        if(currentdescWidth == 0) {
            for(let element of accordionItem) {
                element.classList.remove("active");
            }
            item.classList.add("active")

        }else{
            
            item.classList.remove("active");
            
        }

    })
}

*/

})()