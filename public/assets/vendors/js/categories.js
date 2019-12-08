//增加分类
$('#classify').on('submit', function () {
    var formData = $(this).serialize()
    $.ajax({
        url: '/categories',
        type: 'post',
        data: formData,
        success: function () {
            location.reload()
        }
    })
    return false
})

//分类列表展示
$.ajax({
    url: '/categories',
    type: 'get',
    success: function (data) {
        var html = template('classifyTpl', {
            data: data
        })
        $('#classifytmp').html(html)

    }
})

//分类修改渲染
$('#classifytmp').on('click', '.edit', function () {
    var id = $(this).attr('id')
    $.ajax({
        type: 'get',
        url: '/categories/' + id,
        success: function (response) {
            var html = template('categoryTpl', response)
            $('#formBox').html(html)
        }
    })
})

//修改数据
$('#formBox').on('submit', '#modifybox', function () {
    var formDate=$(this).serialize();
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formDate,
        success: function (response) {
            location.reload()
        },
        error: function (err) {
            alert('修改分类失败')
        }
    })
    return false
})

//删除
$('#classifytmp').on('click','.delete',function(){
    if(confirm('确定删除吗')){
        var id = $(this).attr('id')
        console.log(id);
        $.ajax({
            url:'/categories/'+id,
            type:'DELETE',
            success:function(){
                location.reload()
            }
        })
    }else{
        return
    }
})