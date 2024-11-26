layui.use(['form','layer','jquery'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer
        $ = layui.jquery;

    //ログインボタン押下
    form.on("submit(login)",function(data){
        var btn = $(this);
        //ボタン非活性にする
        btn.text("ログイン中...").attr("disabled","disabled").addClass("layui-disabled");
        $.post("/login/login",data.field,function (rs) {

            btn.text("ログイン").attr("disabled",false).removeClass("layui-disabled");
            layer.msg(rs.msg);
            if(rs.code != 200){
                layer.msg(rs.msg);
            }else{
                layer.msg(rs.msg);
                location.href="/sys/index";
            }
        });
        return false;
    })

    $(".loginBody .input-item").click(function(e){
        e.stopPropagation();
        $(this).addClass("layui-input-focus").find(".layui-input").focus();
    })
    $(".loginBody .layui-form-item .layui-input").focus(function(){
        $(this).parent().addClass("layui-input-focus");
    })
    $(".loginBody .layui-form-item .layui-input").blur(function(){
        $(this).parent().removeClass("layui-input-focus");
        if($(this).val() != ''){
            $(this).parent().addClass("layui-input-active");
        }else{
            $(this).parent().removeClass("layui-input-active");
        }
    })
})
