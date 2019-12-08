//所属分类显示文件名称
$.ajax({
    url: '/categories',
    type: 'get',
    success: function (response) {
        var html = template('postTpl', { data: response })
        $('#category').html(html)
    }
})

//文章封面上传
$('#feature').on('change', function () {
    //获取管理员选择的文件
    var file = this.files[0]
    //创建formData对象，实现文件上传
    var formData = new FormData()
    formData.append('cover', file)
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            $('#thumbnail').val(response[0].cover)
        }
    })
})

$('#addForm').on('submit', function () {
    var formData = $(this).serialize()
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function () {
            location.href = "/admin/posts.html"
        }
    })
    return false
})

//编辑：获取所有文章页面某个文章的id
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&')
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=')
        if (tmp[0] == name) {
            return tmp[1]
        }
    }
    return -1
}


var id = getUrlParams('id');
// 根据id渲染到页面
if (id != -1) {
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function (response) {
            $.ajax({
                url: '/categories',
                type: 'get',
                success: function (categories) {
                    response.categories = categories;
                    var html = template('modifyTpl', response);
                    $('#parentBox').html(html);
                }
            })

        }
    })
}

//将修改内容提交到数据库
$('#parentBox').on('submit','#modifyForm',function(){
    var formData = $(this).serialize()
    var id = $(this).attr('data-id')
    $.ajax({
        type:'PUT',
        url:'/posts/' +id,
        data:formData,
        success:function(){
            location.href="/admin/posts.html"
        }
    })
    return false
})

