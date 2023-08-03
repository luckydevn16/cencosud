// NAVIGATION
const scrollToElem = (elem) => {
    document.querySelector(elem).scrollIntoView({behavior:"smooth"})
}

// CURRENT YEAR
document.querySelector('#currentYear').innerHTML = new Date().getFullYear();

// MOBILE MENU
let menuUnderlay = document.querySelector('.menu-underlay');
let menuOpenImg = document.querySelector('.menu-open-img');
let menuCloseImg = document.querySelector('.menu-close-img');
let menuMobile = document.querySelector('.navigation.mobile');

const menuOpening = () => {
    menuMobile.style.right = '0';
    menuUnderlay.classList.add('active');
}

const menuClosing = () => {
    menuMobile.style.right = '-100%';
    menuUnderlay.classList.remove('active');
}

menuOpenImg.addEventListener('click', () => {
    menuOpening();
})
menuCloseImg.addEventListener('click', () => {
    menuClosing();
})
menuUnderlay.addEventListener('click', () => {
    menuClosing();
})

// ANIMATION ON SCROLL
let animatedItems = document.querySelectorAll('.animated');

if (animatedItems.length) {
    function fadeInOnScroll() {
        for (i = 0; i < animatedItems.length; i++) {
            let animatedItem = animatedItems[i];
            let animatedItemHeight = animatedItem.offsetHeight;
            let animatedItemOffset = offset(animatedItem).top;
            let animationStart = 2;

            let animatedItemPoint = window.innerHeight - animatedItemHeight / animationStart;

            if (animatedItemHeight > window.innerHeight) {
                animatedItemPoint = window.innerHeight - window.innerHeight / animationStart;
            }

            if ((pageYOffset > animatedItemOffset - animatedItemPoint) && pageYOffset < (animatedItemOffset + animatedItemHeight)) {
                animatedItem.classList.add('fade-in');
            }
        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
}

window.addEventListener('scroll', fadeInOnScroll);

// PERCENT COUNTDOWN
(function(){
    let counter = document.querySelectorAll('.counter');
    let limit = 0;
    window.addEventListener('scroll', function(){  
      if( limit == counter.length ){ return; }
      for(let i = 0; i < counter.length; i++){
        let pos = counter[i].getBoundingClientRect().top;
        let win = window.innerHeight - 60;
        if( pos < win && counter[i].dataset.stop === "0" ){
          counter[i].dataset.stop = 1;
          let x = 0;
          limit++;
          let int = setInterval(function(){
            x = x + Math.ceil( counter[i].dataset.to / 50 ); 
            counter[i].innerText = x;
            if( x > counter[i].dataset.to ){
              counter[i].innerText = counter[i].dataset.to;
              clearInterval(int);
            }
          }, 60);
        }
      }
    });
})();

// Form Submission
let nameValue = document.querySelector('.name');
let lastnameValue = document.querySelector('.lastname');
let emailValue = document.querySelector('.email');
let phoneValue = document.querySelector('.phone');
let requiredFields = document.querySelectorAll('.required-fields');

const formSubmission = () => {
    if (nameValue.value != '' && lastnameValue.value != '' && emailValue.value != '' && phoneValue.value != '') {
        window.location.href = 'thankyou.html';
    } else {
        requiredFields.forEach((e) => {
            e.classList.add('visible');
        })
    }
}

const inputFields = document.querySelectorAll('.name, .lastname, .email, .phone');
for (let inputItem of inputFields) {
    inputItem.addEventListener('focus', function() {
        requiredFields.forEach((e) => {
            if (e.classList.contains('visible')) {
                e.classList.remove('visible');
            }
        })
    });
}

