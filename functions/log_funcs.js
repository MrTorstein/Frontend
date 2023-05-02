function search() {
    var searchbar = document.getElementById("textbar");
    let input = searchbar.value;
    searchbar.value = "";
    
    var saveData = (function () {
        var a = document.createElement("a");
        document.body.appendChild(a);
        a.style = "display: none";
        return function (data, fileName) {
            var json = JSON.stringify(data),
                blob = new Blob([json], {type: "octet/stream"}),
                url = window.URL.createObjectURL(blob);
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        };
    }());
    
    fileName = "data.json";
    
    saveData(input, fileName);

}

function submit() {
    var searchbar = document.getElementById("textbar");
    let input = searchbar.value;
    searchbar.value = "";
    document.write(input + "Hello World!");
}