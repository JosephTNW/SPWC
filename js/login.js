function isChecked(checkbox, sub1) {
    var button = document.getElementById(sub1);

    if (checkbox.checked === true) {
        button.disabled = "";
    } else {
        button.disabled = "disabled";
    }
}