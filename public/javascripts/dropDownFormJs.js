function filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    div = document.getElementById("myDropdown");
    a = div.getElementsByTagName("a");
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

var test = document.getElementsByClassName("option");
var textPosition;
var choosenId;
for (var i = 0; i < test.length; i++) {
    test[i].addEventListener(
        "click",
        (function1 = (event) => {
            textPosition = event.target.innerText;
            document.getElementById(choosenId).innerText = textPosition;
            if (choosenId == "choosen") {
                document.getElementById("myDropdown").classList.toggle("show");
            } else if (choosenId == "choosen1") {
                document.getElementById("myDropdown1").classList.toggle("show");
            } else {
                document.getElementById("myDropdown2").classList.toggle("show");
            }
        })
    );
}

var dropdownSearchButton = document.getElementsByClassName("dropbtn");

for (var i = 0; i < dropdownSearchButton.length; i++) {
    dropdownSearchButton[i].addEventListener(
        "click",
        (function1 = (event) => {
            choosenId = event.target.firstChild.nextSibling.id.toString();

            if (choosenId == "choosen") {
                document.getElementById("myDropdown").classList.toggle("show");
            } else if (choosenId == "choosen1") {
                document.getElementById("myDropdown1").classList.toggle("show");
            } else {
                document.getElementById("myDropdown2").classList.toggle("show");
            }
        })
    );
}