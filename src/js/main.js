;(function(){

const burger = document.querySelector('.humburger');
const fullMenu = document.querySelector('.fullscreen-menu');
const close = document.querySelector('.fullscreen-menu__close');
const body = document.querySelector('body');
const active = document.querySelector('active')
const menuLink = document.querySelectorAll('.menu--vertical .menu__link');
const memberInfo = document.querySelectorAll('.member__info')
const memberDecor = document.querySelectorAll('.member__info-decor-symbol')
const memberD = document.querySelectorAll('.member__info-decor-symbol')
const memberDesc = document.querySelectorAll('.member__desc')
const memberDescActive = document.querySelectorAll('.member__desc--active')
const member = document.querySelectorAll('.member')
const memberDescContent = document.querySelector('.member__desc-content')
const memberDeskText = document.querySelectorAll('.member__desc-text')
const mobileActive = document.querySelector('.team__list--version--mobile')

let windDesc = 'close'


//humburger menu

burger.addEventListener("click", e => {
    e.preventDefault();
    fullMenu.classList.add('active');
});

close.addEventListener("click", e => {
    e.preventDefault();
    fullMenu.classList.remove('active');
    
});

menuLink.forEach(item => {
    item.addEventListener('click', e => {
        e.preventDefault();
        fullMenu.classList.remove('active');
    })
})

//модальное окно секции КОМАНДА

for(let item of member) {

    item.addEventListener('click', e => {
        const currenItemHeight = getComputedStyle(item.lastElementChild).height;
        const flag = parseInt(currenItemHeight);
        const triangle =item.firstElementChild.nextElementSibling.lastElementChild.lastElementChild
        const fixHeight = getComputedStyle(memberDescContent).height
        
        
        for(let svgItem of memberDecor) {
            svgItem.style.transform = 'rotate(0deg)'
        }

        for(let desc of memberDesc) {
            desc.style.height = `${0}px`
        }
        if(flag == 0 ) {
            item.lastElementChild.style.height = fixHeight
            triangle.style.transform = 'rotate(180deg)'
            
            if(getComputedStyle(mobileActive).display != 'none') {
                const triangleTablets = item.firstChild.nextElementSibling.lastElementChild.firstElementChild
                triangleTablets.style.transform = 'rotate(180deg)'
                
            }
            
            for(let elem of memberDeskText) {
                elem.style.transform = 'rotate(0deg)'
            }
            
        }else  {
            item.lastElementChild.style.height = `${0}px`
        }
    })
}




//слайдеры

const prevArrow = document.querySelector('#prev')
const nextArrow = document.querySelector('#next')
const productsList = document.querySelector("#products");
const computedStyles = window.getComputedStyle(productsList);
const products = document.querySelectorAll('.product')
const product = document.querySelector('.product')
const productWidth = getComputedStyle(product).width

let position = 0;
const step = 100;
const numberProducts = step*products.length

nextArrow.addEventListener("click", e => {
    e.preventDefault();
    
    if(position <numberProducts - step){
        position = position + step
        console.log(position)
        console.log(numberProducts)
        productsList.style.right = `${position}%`;
    }
  })

  prevArrow.addEventListener("click", e => {
    e.preventDefault();
    
    console.log(position)
    if(position>0) {
        position = position - step
        productsList.style.right = `${position}%`;
    }
    

    
  })

})()

 







 







