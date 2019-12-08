$.ajax({
    url: '/comments',
    type: 'GET',
    success: function (res) {
        var html = template('commentsTpl', res)
        $('#commentsBox').html(html)
        var page = template('pageTpl', res)
        $('#pageBox').html(page)
    }
})
//处理时间
function formateDate(date) {
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
}
//日期分页
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

//评论审批及驳回
$('#commentsBox').on('click', '.status', function () {
    var status = $(this).attr('data-status')
    var id = $(this).attr('data-id')
    $.ajax({
        url: '/comments/' + id,
        type: 'PUT',
        data: {
            state: status == '0' ? '1' : '0'
        },
        success: function () {
            location.reload()
        }
    })
    return false
})

//评论删除
$('#commentsBox').on('click', '.delete', function () {
    var id = $(this).attr('data-id')
    $.ajax({
        url:'/comments/' + id,
        type:'DELETE',
        success:function(){
            location.reload()
        }
    })
})