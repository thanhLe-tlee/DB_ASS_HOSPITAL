const accountInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.querySelector("button[type='submit']");

// Thêm sự kiện click để xử lý khi người dùng nhấn nút
loginButton.addEventListener("click", function (e) {
  // Ngăn chặn hành động mặc định của form (submit làm reload trang)
  e.preventDefault();

  // Lấy giá trị người dùng nhập
  const username = accountInput.value;
  const password = passwordInput.value;

  // Kiểm tra thông tin đăng nhập
  if (username == "default" && password == "123") {
    // If correct, navigate to the home page
    window.location.href = "../homePage/homePage.html";
  } else {
    // Nếu sai, hiển thị thông báo lỗi
    alert("Invalid username or password. Please try again.");
  }
});
