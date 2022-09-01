let theme = document.querySelector(".theme");
let themeImg = theme.querySelector("img");
let themeBool = false;

theme.addEventListener("click", themeFn);

function themeFn() {
    theme.classList.toggle("theme-switch");

    if (!themeBool) {
        themeImg.style.transform = "rotate(180deg)";
    } else themeImg.style.transform = "rotate(-180deg)";
    themeBool = !themeBool;

    document.body.classList.toggle("theme-switch-body");
    document.querySelector("main").classList.toggle("theme-switch-main");
    document.querySelector(".output").classList.toggle("theme-switch-output");
    document.querySelectorAll("button").forEach(button => {
        button.classList.toggle("theme-switch-button");
    });
    document.querySelector(".plus").classList.toggle("theme-switch-plus");

    localStorage.setItem('theme', themeBool);
    console.log(localStorage.getItem('theme'));   
}