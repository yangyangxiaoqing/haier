define(['jquery'], function($) {
    return {
        init:function(){
            this.register();
        },
        register:function(){
            let $userflag = false;
            let $agreeflag=false;

            let reg = /^1[35789]\d{9}$/
            //获取用户手机号码传给后端。
            $('.tel').on('blur', function() {
                // console.log($(this).val())
                if($(this).val()){
                    if (reg.test($(this).val())){
                        $.ajax({
                            type: 'post',
                            url: 'http://localhost/Haier/php/register.php',
                            data: {
                                tel:$(this).val(),//将表单的值传给后端。
                            }
                        }).then(function(data) {
                            if (!data) { //可以注册
                                $('.reminder').html('');
                                $userflag = true;
                            } else { //手机号被注册
                                $('.reminder').html('× 手机号已经被注册');
                                $userflag = false;
                            }
                        });
                    }else{
                        $('.reminder').html('× 手机号码格式不正确');
                        $userflag = false;
                    }
                }else{
                    //手机号没有填写
                    $('.reminder').html('× 这里还没填呢');
                    $userflag = false;
                }
            });

            $('.agree').on('click',function(){
                if($('.agree').prop('checked')){
                    $agreeflag=true;
                    $('.btn').css("background","#38beff");
                }else{
                    $agreeflag=false;
                    $('.btn').css("background","#c6cacb");
                }
            });
            //2.点击注册按钮讲数据传给后端，添加数据库
            $('.btn').on('click',function(){
                if($userflag&&$agreeflag){
                    $.ajax({
                        type: 'post',
                        url: 'http://localhost/Haier/php/register.php',
                        data: {
                            submit:1,
                            tel: $('.tel').val(),//将表单的值传给后端。
                            pass:$('.pass').val(),
                        }
                    }).then(function(data) {
                        if (!data) { 
                            
                        }
                    });
                    location.href="http://localhost/Haier/src/login.html";
                }
            });
        },
        
    }
});