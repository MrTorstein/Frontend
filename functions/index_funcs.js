let first = true;
let inactive_sign = ">";

function DropdownMenu() {
    document.getElementById("myDropdown").classList.toggle("show");
    
    var button = document.getElementById("dropdown-menu-button");
    if (first) {
        inactive_sign = button.innerHTML;
        first = false;
    }
    if (button.innerHTML == inactive_sign) {
        button.innerHTML = "v";
    }
    else {
        button.innerHTML = inactive_sign;
        button.blur();
    }
}


window.onclick = function(event) {
    if (!event.target.matches(".dropbutton")) {
        document.getElementById("dropdown-menu-button").innerHTML = inactive_sign;
        
        var dropdowns = document.getElementsByClassName("dropdown-menu-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("show")) {
                openDropdown.classList.remove("show");
            }
        }
    }
}