let height = 0;

function rescale () {
    var nav_bar = document.getElementById("nav_bar");
    
    let vh = window.innerHeight;
    let top_nav_height = document.getElementById("top_nav").offsetHeight;
    let main_height = document.getElementById("main").offsetHeight;
    let header_height = document.getElementById("header").offsetHeight;
    let original_height = vh - header_height - top_nav_height;
    
    let scrolled = Number(window.scrollY.toFixed());
    
    if (scrolled > main_height - original_height) {
        height = header_height + main_height - scrolled;
        nav_bar.style.height = height + "px";
    }
    else if (scrolled < header_height) {
        height = original_height + scrolled;
        nav_bar.style.height = height + "px";
    }
    else {
        height = vh - top_nav_height;
        nav_bar.style.height = height + "px";
    }
}

addEventListener("load", (event) => {rescale()});
addEventListener("resize", (event) => {rescale()});
addEventListener("scroll", (event) => {rescale()});