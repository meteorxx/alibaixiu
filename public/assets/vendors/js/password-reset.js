$('#modifyForm').on('submit', function () {
    var formData = $(this).serialize()
    $.ajax({
        url: '/users/password',
        type: 'PUT',
        data: formData,
        success: function (data) {
            location.href = "/admin/login.html"
        }
    })
    return false
})