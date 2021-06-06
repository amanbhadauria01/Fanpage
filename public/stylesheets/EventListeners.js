let buttons=documment.querySelectorAll(".lbutton");
console.log(buttons[0]);
buttons[0].addEventListener("click",()=>{
    buttons[0].classList.add(".unselected");
    buttons[1].classList.remove(".unselected");
});