let buttons=document.querySelectorAll(".lbutton");

buttons[0].addEventListener("click",(event)=>{
    event.preventDefault();
    buttons[0].classList.add("unselected");
    buttons[1].classList.remove("unselected");
    buttons[3].classList.add("unselected");
    buttons[2].classList.remove("unselected");
    //console.log(123);
    //console.log(buttons[0].value);
})

buttons[1].addEventListener("click",(event)=>{
    event.preventDefault();
    buttons[1].classList.add("unselected");
    buttons[0].classList.remove("unselected");
    buttons[2].classList.remove("unselected");
    buttons[3].classList.add("unselected");
    //console.log(123);
    //console.log(buttons[0].value);
})

buttons[2].addEventListener("click",(event)=>{
    event.preventDefault();
    buttons[2].classList.add("unselected");
    buttons[3].classList.remove("unselected");
    buttons[1].classList.add("unselected");
    buttons[0].classList.remove("unselected");
    //console.log(123);
    //console.log(buttons[0].value);
})

buttons[3].addEventListener("click",(event)=>{
    event.preventDefault();
    buttons[3].classList.add("unselected");
    buttons[2].classList.remove("unselected");
    buttons[1].classList.add("unselected");
    buttons[0].classList.remove("unselected");
    //console.log(123);
    //console.log(buttons[0].value);
})
// console.log(123);
// buttons[0].addEventListener("click",()=>{
//     buttons[0].classList.add(".unselected");
//     buttons[1].classList.remove(".unselected");
// });
// function init()
// {
//     console.log("123");
// }

// exports.init=()=>{
//      console.log("Clicked");
//  }
// init();
 //module.exports=init;
//console.log("Clicked");

