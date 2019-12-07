$('#modifyForm').on('submit', function () {
    var formData = $(this).serialize()
    $.ajax({
        url: '/users/password',
        type: 'PUT',
        data: formData,
        succsee: function (data) {
            location.href = "admin/login.html"
        }
    })
    return false
})