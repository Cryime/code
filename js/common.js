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
    window.location.assign("./login.html");
  });

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // console.log(config.headers.Authorization);
    config.headers.Authorization = localStorage.getItem("token");
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    console.log(response.data);
    return response.data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.response.request.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      window.location.assign("./login.html");
    }
    return Promise.reject(error);
  }
);
