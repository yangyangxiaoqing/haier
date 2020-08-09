define([], function() {
    return {
        init:function(){
            this.vary();
            this.zoom();
            this.goodscar();
        },

        vary:function(){
            let $gid=location.search.substring(1).split('=')[1];
            $.ajax({
                url: 'http://localhost/Haier/php/detail.php',
                data:{
                    gid:$gid,
                },
                dataType: 'json',
            }).done(function(data){
                // console.log(data);
                $('.top a')[1].append(data.class);
                $('.top span').append(data.subtitle)
                // $('.wrap #spic #smallpic').src=data.url;

                // console.log($('#smallpic'))
                $('#smallpic').prop("src",data.url);
                $("#bpic").prop("src",data.url);
                $('.goodsinfo-word h2').append(data.title) ;
                $('.goodsinfo-word h5').append(data.subtitle);
                $('.goodsinfo-word .price span').append(data.price);
                // $('#bpic').src = taobaoobj.url;
                let listurl = data.piclisturl;
                // console.log(listurl.split(','));
                let picarr = listurl.split(',');
                let strhtml = '';
                for (let value of picarr) {
                    strhtml += `<li><img src="${value}"></li>`;
                }
                $('#list ul').append(strhtml);
            });
        },

        zoom:function(){
            //小列表鼠标滑过图片显示
            $('#list ul').on('mouseover','img',function(){//鼠标悬浮在不同的产品小图片时外加黑色边框并且主图将其显示出来
                // $('#list ul li').css({"border":"1px solid #fff"});
                $(this).css({"border":"1px solid #000"});
                //this获取的是当前鼠标移入的元素，设置黑色边框
                var imgsrc=$(this).attr("src");
                //获取当前鼠标移入元素的src属性值将其赋值给主图元素
                $("#smallpic").attr("src",imgsrc);
                $("#bpic").attr("src",imgsrc);
                //将鼠标选中的图传给放大图元素的src属性
            });
            $('#list ul').on('mouseout','img',function(){
                $(this).css({"border":"none"});
            });
            

            
            $('#ulist #left').on('click',function(){
                let $left=parseInt($('#ulist ul').css("left"));
                $left-=62;
                if($left/-62>$('#list ul li').length-5){
                    $left+=62;
                }
                $('#ulist ul').css("left",$left);
            })
            $('#ulist #right').on('click',function(){
                let $left=parseInt($('#ulist ul').css("left"));
                $left+=62;
                if($left>0){
                    $left=0;
                }
                $('#ulist ul').css("left",$left);
            })


            $('#smallpic').on('mouseover',function(ev){
                $('#sf').css("visibility","visible");
                $('#bf').css("visibility","visible");

                //定义小放的宽高
                $('#sf').css("width",$('#smallpic').width() * $('#bf').width()/$('#bpic').width());
                $('#sf').css("height",$('#smallpic').height() * $('#bf').height()/$('#bpic').height());

                //定义小图与大图的比例
                let $ratio = $('#bpic').width() / $('#smallpic').width();

                $('#smallpic').on('mousemove',function(ev){
                    //获取小放div的位置
                    let leftposition=ev.pageX-$('#sf').width()/2-2-$('.wrap').offset().left;
                    let topposition=ev.pageY-$('#sf').height()/2-2-$('.wrap').offset().top;
                    
                    //控制范围
                    if (leftposition < 0) {
                        leftposition = 0;
                    } else if (leftposition >= $('#smallpic').width() - $('#sf').width()) {
                        leftposition = $('#smallpic').width() - $('#sf').width() - 2;
                    }

                    if (topposition < 0) {
                        topposition = 0;
                    }else if (topposition >= $('#smallpic').height()-$('#sf').height()) {
                        topposition = $('#smallpic').height() - $('#sf').height() - 2;
                    }

                    //小放大镜偏移位置
                    $('#sf').css("left",leftposition);
                    $('#sf').css("top",topposition);

                    //大图按照比例进行移动,移动方向是反向的
                    $('#bpic').css("left",-$ratio*leftposition);
                    $('#bpic').css("top",-$ratio*topposition);

                });
                // ev.stopPropagation();
            });

            $('#smallpic').on('mouseout',function(){
                $('#sf').css("visibility","hidden");
                $('#bf').css("visibility","hidden");
            });
        },

        //购物车
        goodscar:function(){
            // $.cookie("username","admin");
            let $gid=location.search.substring(1).split('=')[1];
            let arrgid = []; //存储商品的sid
            let arrnum = []; //商品的数量
            // //获取cookie值的数组
            function cookietoarray() {

            //     // $.cookie("username","admin");

                if ( $.cookie("cookiegid") && $.cookie("cookienum") ){ //cookie存在
                    arrgid = $.cookie('cookiegid').split(',');
                    arrnum = $.cookie('cookienum').split(',');
                } else {
                    arrgid = [];
                    arrnum = [];
                }
            }
            
            $('.buy').on('click',function(){
                cookietoarray();
                if(arrgid.indexOf($gid)===-1){
                    arrgid.push($gid);
                    arrnum.push(parseInt($('.count').val()));
                    // console.log($('.count').val());
                    // console.log(arrnum);
                    $.cookie('cookiegid', arrgid.toString(),{ expires: 7, path: '/' });
                    $.cookie('cookienum', arrnum.toString(),{ expires: 7, path: '/' });
                }else{
                    let num = arrgid.indexOf($gid); //当前sid在数组中的位置。
                    arrnum[num] = parseInt(arrnum[num]) + parseInt($('.count').val()); 
                    //获取sid对应的数量+新加的值，再赋值给对应的位置
        
                    //重新添加cookie
                    $.cookie('cookienum', arrnum.toString(),{ expires: 7, path: '/' });
                }
            })
            
        }
       
    }
});