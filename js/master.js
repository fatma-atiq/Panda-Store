//check if there is local storage color option
let mainColors= localStorage.getItem("color_option");
console.log(mainColors);
if (mainColors !== null){
    // console.log('is not empty');
    document.documentElement.style.setProperty('--main-color',localStorage.getItem("color_option"));
    //remove active from children from all list item
    document.querySelectorAll(".color-list li").forEach(element =>{
        element.classList.remove("active");

        //add active class on element with data color ==local storage item
        if(element.dataset.color === mainColors){
            //add active claa
            element.classList.add('active');

        }
    });
}


// random background option
let backgroundOption=true;
//variable to control the background interval
let backgroundInterval;

//check if there is local storage random background 
let backgroundLocalItem = localStorage.getItem("background_option");

if (backgroundLocalItem !== null){
    if(backgroundLocalItem === 'true'){
        backgroundOption = true;
    }else{
        backgroundOption = false;
    }

    //remove active class from all span
    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove("active");
    });

    if(backgroundLocalItem === 'true'){
        document.querySelector(".random-backgrounds .yes").classList.add("active");

    }else{
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }
}

//togle span on class icon////////////////////////////////////////
document.querySelector(".toggle-setting .fa-gear").onclick=function(){
    this.classList.toggle("fa-spin");
    document.querySelector(".setting-box").classList.toggle("open");
}
/////////////////////////////////////////////////////////////////////



//switch color//////////////////////////
const colorli=document.querySelectorAll(".color-list li");
colorli.forEach(li=>{
    li.addEventListener("click",(e)=>{
        document.documentElement.style.setProperty('--main-color',e.target.dataset.color);
        //set color in local storage
        localStorage.setItem("color_option",e.target.dataset.color);
        handelActive(e);
    });
});


//switch background//////////////////////////
const randomBackgroundElement=document.querySelectorAll(".random-backgrounds span");
//loop on all spans 
randomBackgroundElement.forEach(span=>{
    //click on every span
    span.addEventListener("click",(e)=>{

        handelActive(e);

        if(e.target.dataset.background==='yes'){
            backgroundOption=true;
            randomizeImgs();
            localStorage.setItem("background_option",true);
           // console.log(backgroundOption);
        }else{
            backgroundOption=false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option",false);
           // console.log(backgroundOption);
        }
    });
});

//select landing page element////////////////////////////////////////// 
let landingpage = document.querySelector(".landing-page");

//get array of image
let imagesArry = ["1.jpg","p1.jpg","p3.jpg","p4.jpg","p5.jpg"];



//function to randomise img
function randomizeImgs(){
    if(backgroundOption===true){
        backgroundInterval= setInterval(()=>{
    
            //get randomnumber
                let randomNumber = Math.floor(Math.random()* imagesArry.length);
            
            //change packground image url
                landingpage.style.backgroundImage= 'url("img/'+imagesArry[randomNumber] +'")';
            
            },1000)
    }
}
randomizeImgs()
//////////////////////////////////////////////////////////////////////////////


///select our skills selector////////////////////////////////////////////

let ourSkills = document.querySelector(".skills");

window.onscroll = function (){
    let skillsOffsetTop = ourSkills.offsetTop;
    //skills outer height
    let skillsOuterHeight = ourSkills.offsetHeight;
    //window height
    let windowHeight = this.innerHeight;
    //window scrollTop
    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }
};
//////////////////////////////////////////////////////////////////////////////

///create popup with the image//////////////////////////////////////

let ourGallary = document.querySelectorAll(".gallary img");

ourGallary.forEach(img =>{
    img.addEventListener('click',(e)=>{
        //create overlay element
        let overlay = document.createElement("div");
        //add class to overlay
        overlay.className = 'popup-overlay';
        //append overlay to yhe body
        document.body.appendChild(overlay);
        //create the popup box
        let popupBox = document.createElement("div");
        //add class to the popup box
        popupBox.className = 'popup-Box';

        if(img.alt !== null){
            //create heading
            let imgHeading = document.createElement("h3");
            //create text for heading
            let imgText = document.createTextNode(img.alt);

            imgHeading.appendChild(imgText);

            popupBox.appendChild(imgHeading);
        } 


        //create the image
        let popupImage = document.createElement("img");
        //set image source
        popupImage.src = img.src;
        //add image to the popup box
        popupBox.appendChild(popupImage);
        //append popup box to the body
        document.body.appendChild(popupBox);

        //create close span 
        let closeButton = document.createElement("span");
        let closeButtonText = document.createTextNode("X");
        closeButton.appendChild(closeButtonText);
        closeButton.className = 'close-button';
        popupBox.appendChild(closeButton);

       
    });
});

//close popup

document.addEventListener("click",function(e){
    if(e.target.className == 'close-button'){
        e.target.parentElement.remove();
        document.querySelector(".popup-overlay").remove();
    }
})
//////////////////////////////////////////////////////////////////////

//select all Bullets//////////////////////////
const allBullets = document.querySelectorAll(".nav-bullets  .bullet");
//select all linls///////////////
const alllinks = document.querySelectorAll(".links  a");
function scrollToLinls(elements){
    elements.forEach(ele =>{
        ele.addEventListener("click",(e) =>{
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}
scrollToLinls(allBullets);
scrollToLinls(alllinks);
/////////////////////////////////////////////////////////////////////////////////////////

// Handel active function //////////////////////////////////////////
function handelActive(ev){
    //remove active from children span
    ev.target.parentElement.querySelectorAll(".active").forEach(element =>{
        element.classList.remove("active");
    });
    //add active class on self
    ev.target.classList.add("active");
}
///////////////////////////////////////////////////////////////////
/////show the bullet or hide////
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletNav = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets-option");

//add to local storage 

if (bulletLocalItem  !== null ){
    bulletsSpan.forEach(span =>{
        span.classList.remove("active");
    });
    if (bulletLocalItem === 'block'){
        bulletNav.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add("active");
    }else{
        bulletNav.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

//show the bullet or hide

bulletsSpan.forEach(span =>{
    span.addEventListener("click",(e)=>{
        if (span.dataset.display === 'show'){
            bulletNav.style.display = 'block';
            localStorage.setItem("bullets-option", 'block');
        }else {
            bulletNav.style.display = 'none';
            localStorage.setItem("bullets-option", 'none');
        }
        handelActive(e);
    });
});
////////////////////////////////////////////////////////////////

//rest options button//////////////////////
document.querySelector(".rest-options").onclick = function(){
    //localStorage.clear();
    localStorage.removeItem("bullets-option");
    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    window.location.reload();
};
/////////////////////////////////////////////////////////////////////

//togell menu/////////////////
let toggleBtn = document.querySelector(".toggle-menu");
let toggleLinks = document.querySelector(".links");
toggleBtn.onclick = function (e){
    e.stopPropagation();
    this.classList.toggle("menu-active");
    toggleLinks.classList.toggle("open");
};

///click anywhere 
document.addEventListener("click",(e)=>{
    if (e.target !== toggleBtn && e.target !== toggleLinks){
        if(toggleLinks.classList.contains("open")){
            toggleBtn.classList.toggle("menu-active");
            toggleLinks.classList.toggle("open");
        }

    }
});

toggleLinks.onclick= function (e){
    e.stopPropagation();
}