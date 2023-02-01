// 上面这个代码处理过度动画（默认加上不用管）
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.body.classList.add("sidenav-pinned");
    document.body.classList.add("ready");
  }, 200);
});

// 每个页面都会导入该js 统一的设置写这里即可
axios.defaults.baseURL = "http://ajax-api.itheima.net";

// 轻提示
const myToast = new bootstrap.Toast(document.querySelector("#myToast"), {
  delay: 2000,
});
function tips(msg) {
  document.querySelector("#myToast .toast-body").innerHTML = msg;
  myToast.show();
}

const userame = localStorage.getItem("username");
const nameSpan = document.querySelector("#navbar-main  .font-weight-bold");
// if (nameSpan) {
//   nameSpan.innerHTML = username;
// }
nameSpan && (nameSpan.innerHTML = userame);

const logOut = document.querySelector("#logout");

logOut &&
  logOut.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.assign("./login.html")
  });

  
