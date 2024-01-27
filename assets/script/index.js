let form = document.querySelector("form");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    let form = e.target;
    for (let key of form) {
        if (!form[key.name].value) {
            // console.log("Xatolik bor");
            form[key.name].style.borderColor = "red";
            document.querySelector(".alert").style.opacity = 1;
        } else if (e.target.userName.value && e.target.password.value) {
            // console.log("To'gri");
            form[key.name].style.borderColor = "#EBEBEB";
            document.querySelector(".alert").style.opacity = 0;
            let data = window.localStorage.getItem("userData")
            let ObjData = JSON.parse(data);
            if (ObjData.userName === e.target.userName.value && ObjData.password === e.target.password.value) {
                // console.log("To'gri 2");
                window.location.href = "/Pages/Main/index.html";
                form.reset();
            } else {
                document.querySelector(".alert").style.opacity = 1;
                document.querySelector(".alert").innerHTML = "Ma'lumotlar xato kiritilgan!"
            }
        }
    }
})