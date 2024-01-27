let form = document.querySelector("form");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    let form = e.target;
    for (let key of form) {
        if (!form[key.name].value) {
            console.log("Xatolik bor");
            form[key.name].style.borderColor = "red";
            document.querySelector(".alert").style.opacity = 1;
        } else if (e.target.firstName.value && e.target.email.value && e.target.userName.value && e.target.password.value) {
            console.log("To'gri");
            form[key.name].style.borderColor = "#EBEBEB";
            document.querySelector(".alert").style.opacity = 0;
            let userdata = {
                firstName: e.target.firstName.value,
                email: e.target.email.value,
                userName: e.target.userName.value,
                password: e.target.password.value,
            }
            window.localStorage.setItem("userData", JSON.stringify(userdata))
            window.location.href = "/index.html";
            form.reset();
        }
    }
})


// if (e.target.firstName.value && e.target.email.value && e.target.userName.value && e.target.password.value) {
//     console.log("Muvaffaqiyatli o'tdingiz.");
//     let userdata = {
//         firstName: e.target.firstName.value,
//         email: e.target.email.value,
//         userName: e.target.userName.value,
//         password: e.target.password.value,
//     }
//     window.localStorage.setItem("userData", JSON.stringify(userdata))
//     form.reset();

// } else {
//     console.log("Bo'sh joylarni to'ldir!");
// }