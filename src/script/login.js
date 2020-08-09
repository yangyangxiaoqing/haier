define(['sha1'], function(sha1) {
    return {
        init:function(){
            this.login();
        },
        login: function() {

            $('.mainbox form input').eq(2).on('click',function(){
                if($('.mainbox form input').eq(2).prop('checked')){
                    $('.mainbox form input').eq(4).css("background","#38beff");
                    // $("p").css("background-color");
                }else{
                    $('.mainbox form input').eq(4).css("background","#c6cacb");
                }
            }); 
            $('.mainbox form input').eq(4).on('click',function(){
                // 获取当前用户输入的密码
                let $telphone=$('.mainbox form input').eq(0).val();
                let $password=$('.mainbox form input').eq(1).val();
                $.ajax({
                    url: 'http://localhost/Haier/php/login.php',
                    type:"post",
                    data:{
                        telphone:$telphone,
                        password:hex_sha1($password),
                    },
                    // dataType: 'json',
                }).done(function(data){
                    //如果帐号密码正确，返回1，如果正好密码错误返回的是空
                    if(data){
                        if($('.mainbox form input').eq(2).prop('checked')){
                            location.href="http://localhost/Haier/src/index.html";
                        }
                    }else{
                        $('.fail').show();
                    }
                });
                if($('.checklog').prop('checked')){
                    // console.log($telphone)
                    $.cookie('usertel',$telphone,{expires:14,path:'/'});
                    $.cookie('userpass',$password,{expires:14,path:'/'});
                }else{
                    $.cookie('usertel', $telphone,{ expires:-1});
                    $.cookie('userpass', $password,{ expires:-1});
                }
                
                
            });

            $('.register').on('click',function(){
                location.href="http://localhost/Haier/src/register.html";
            })

        }
    }
});