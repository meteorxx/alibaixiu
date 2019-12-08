
function serializeObj(form) {
    var arr = form.serializeArray()
    var obj = {};
    arr.forEach((item) => {
        obj[item.name] = item.value
    });
    return obj
}
//添加
$('#userform').on('submit', function () {
    var obj = serializeObj($(this))
    var id = obj.id
    //添加修改表单的表单提交事件
    if (obj.id) {
        $.ajax({
            type: 'PUT',
            url: '/users/' + id,
            data: obj,
            success: function (data) {
                location.reload()
            },
            error: function (err) {
                alert('用户修改提交失败')
            }
        })
    } else {
        //添加
        $.ajax({
            type: 'POST',
            url: '/users',
            data: obj,
            success: function (data) {
                location.reload()
            },
            error: function (err) {
                alert('用户添加失败')
            }
        })
    }
    return false
})

//处理头像上传功能
$('#avatar').on('change', function () {
    var formData = new FormData()
    formData.append('avatar', this.files[0])
    $.ajax({
        type: 'POST',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            $('#preview').attr('src', response[0].avatar)
            $('#hiddenAvatar').val(response[0].avatar)
        }
    })
})

//列表
$.ajax({
    type: 'GET',
    url: '/users',
    success: function (response) {
        var html = template('userTpl', {
            data: response
        })
        $('#userBox').html(html)
    }
})

//表单渲染
$('#userBox').on('click', '.edit', function () {
    var id = $(this).attr('id')
    $.ajax({
        type: 'PUT',
        url: '/users/' + id,
        success: function (data) {
            // console.log(data);
            var html = template('modifyTpl', data)
            $('#userform').html(html)
        }
    })
})

//单个删除
$('#userBox').on('click', '.delete', function () {
    if (confirm('你确定要删除吗？')) {
        var id = $(this).attr('id')
        $.ajax({
            type: 'DELETE',
            url: '/users/' + id,
            success: function (data) {
                location.reload()
            }
        })
    } else {
        return
    }
})

//全选按钮选中时，单选按钮也选中
$('#selectAll').on('change', function () {
    var status = $(this).prop('checked')
    if (status) {
        $('#batcheDelete').show()
    } else {
        $('#batcheDelete').hide()
    }
    //find找所有的子级
    $('#userBox').find('input').prop('checked', status)
})

//单选按钮选中时，全选按钮也选中
$('#userBox').on('change', '.userStatus', function () {
    if ($('#userBox').find('input').length === $('#userBox').find('input:checked').length) {
        $('#selectAll').prop('checked', true)
    } else {
        $('#selectAll').prop('checked', false)
    }

    if ($('#userBox').find('input:checked').length > 0) {
        $('#batcheDelete').show()
    } else {
        $('#batcheDelete').hide()
    }
})

//批量删除事件
$('#batcheDelete').on('click', function () {
    var ids = []
    var checkeduser = $('#userBox').find('input').filter(':checked')
    checkeduser.each(function (index, element) {   
        ids.push($(element).attr('id'))
    })
    if (confirm('你确定要批量删除吗？')) {
        $.ajax({
            type: 'DELETE',
            url: '/users/' + ids.join('-'),
            success: function (data) {
                location.reload()
            }
        })
    } else {
        return
    }
})


