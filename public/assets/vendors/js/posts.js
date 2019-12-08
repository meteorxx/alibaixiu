//获取文章列表
$.ajax({
    url: '/posts',
    type: 'get',
    success: function (response) {
        var html = template('postsTpl', { data: response })
        $('#postsBox').html(html)
        var page = template('pageTpl', response)
        $('#page').html(page)
    }
})

//处理日期
    function formateDate(date) {
        date = new Date(date);
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    }

//分页
function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page
        },
        success: function (response) {
            var html = template('postsTpl', { data: response });
            $('#postsBox').html(html);
            var page = template('pageTpl', response);
            $('#page').html(page)
        }
    });
}

// 向服务器端发送请求 索要分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        var html = template('categoryTpl', { data: response });
        $('#categoryBox').html(html);
    }
})

// 当用户进行文章列表筛选的时候
$('#filterForm').on('submit', function () {
    var formData = $(this).serialize();
    $.ajax({
        type: 'get',
        url: '/posts',
        data: formData,
        success: function (response) {
            var html = template('postsTpl', { data: response });
            $('#postsBox').html(html);
            var page = template('pageTpl', response);
            $('#page').html(page);
        }
    });
    return false;
});

//删除
$('#postsBox').on('click', '.delete', function () {
    if (confirm('确定删除吗？')) {
        var id = $(this).attr('data-id')
        $.ajax({
            type: 'DELETE',
            url: '/posts/' + id,
            success: function (res) {
                location.reload()
            }
        })
    }
})