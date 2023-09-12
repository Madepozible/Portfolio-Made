let words = document.querySelectorAll(".word");

words.forEach((word)=>{
    let letters = word.textContent.split("");
    word.textContent="";
    letters.forEach((letter)=>{
        let span = document.createElement("span");
        span.textContent = letter;
        word.append(span)
    })
});

let currentWordIndex = 0;
let maxWordIndex = words.length -1;
words[currentWordIndex].style.opacity = "1"

let changeText =()=>{
    let currentWord = words[currentWordIndex];
    let nextWord = currentWordIndex === maxWordIndex ? words[0] :  words[currentWordIndex + 1];

    Array.from(currentWord.children).forEach((letter,i)=>{
        setTimeout(()=>{
            letter.className = "letter out";
        },i * 80);
    })
    nextWord.style.opacity="1";
    Array.from(nextWord.children).forEach((letter,i)=>{
        letter.className = "letter behind";
        setTimeout(() => {
             letter.className = "letter in"
        }, 340 + i * 80);
    });
    currentWordIndex = currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

changeText();
setInterval(changeText,3000);




// Project part
const buttons = document.querySelectorAll('.btn');
const boxes = document.querySelectorAll('.box');
const searchBox = document.querySelector('#Search');

//Seaech product my textbox
 searchBox.addEventListener("keyup", (e)=>{
    searchText=e.target.value.tolowerCase().trim();

    box.forEach((box)=>{
        const data = box.dataset.item;
        if(data.includes(searchText)){
            box.style.display = 'block';
        } else {
            box.style.display = 'none'
        }
    })

    buttons.forEach((button)=>{
        button.classList.remove('btn-clicked');
     });
    
     buttons[0].classList.add('btn-clicked');
 });

buttons.forEach((button)=>{
    button.addEventListener('click', (e)=>{
        e.preventDefault();
        setActiveBtn(e);
        const btnfilter = e.target.dataset.filter;

        boxes.forEach((box => {
            if (btnfilter == 'all') {
                box.style.display = 'block'
            } else {
                const boxfilter = box.dataset.item;
                if(btnfilter == boxfilter) {
                    box.style.display = 'block';
                } else {
                    box.style.display = 'none'
                }
            }
        }))
    })
})

function setActiveBtn(e){
    buttons.forEach((button)=>{
        button.classList.remove('btn-clicked')
    })
    e.target.classList.add('btn-clicked')
}



(() =>{

    const openNavMenu = document.querySelector(".open-nav-menu");
  const  closeNavMenu = document.querySelector(".close-nav-menu");
  const  navMenu = document.querySelector(".nav-menu");
  menuOverlay =  document.querySelector(".menu-overlay"),
  mediaSize = 991;

    openNavMenu.addEventListener("click", toggleNav);
    closeNavMenu.addEventListener("click", toggleNav);
       // close the navMenu by clicking outiside
    menuOverlay.addEventListener("click", toggleNav);

    function toggleNav() {
       navMenu.classList.toggle("open");
       menuOverlay.classList.toggle("active");
       document.body.classList.toggle("hidden-scrolling");
    }

      navMenu.addEventListener("click", (event) =>{
         
           if(event.target.hasAttribute("data-toggle") && 
           window.innerWidth <= mediaSize){
               //prevent default anchor click behavior
           event.preventDefault();    
               const menuItemHasChildren = event.target.parentElement;
                //if menuItemHasChildren is already expanded, collapse if
    if(menuItemHasChildren.classList.contains("active")){
        collapseSubMenu();
    }
        else {
               // collapse existing expanded menuItemHasChildren
               if(navMenu.querySelector(".menu-item-has-children.active")){
                   collapseSubMenu();
               }
               //expand new menuItemHasChildren
               menuItemHasChildren.classList.add("active");
               const subMenu = menuItemHasChildren.querySelector(".sub-menu");
               subMenu.style.maxHeight = subMenu.scrollHeight + "px"
             }
           }
           

      });


           function collapseSubMenu() {
                 navMenu.querySelector(".menu-item-has-children.active .sub-menu")
                 .removeAttribute("style");
                 navMenu.querySelector(".menu-item-has-children.active")
                 .classList.remove("active");
           }
            function resizeFix(){
                //if navMenu is open, close it
                if(navMenu.classList.contains("open")){
                   toggleNav();
                }
                  //if menuItemHasChildren is expanded, collapse it
                  if(navMenu.querySelector(".menu-item-has-children.active")){
                   collapseSubMenu();
               }

            }

           window.addEventListener("resize", function(){
               if(this.innerWidth > mediaSize){
                   resizeFix();
               }
           })
})();