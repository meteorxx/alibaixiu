
$('#logout').on('click', function () {
  var isConfirm = confirm('确定退出吗')
  if (isConfirm == true) {
    $.ajax({
      type: 'POST',
      url: '/logout',
      success: function () {
        location.href = '/admin/login.html'
      },
      error: function () {
        alert('退出失败')
      }
    })
  }
})
