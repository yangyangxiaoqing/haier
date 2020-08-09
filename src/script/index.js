define(['jquery'], function($) {
    return {
        init:function(){
            this.lunbo();
            this.menu();
            this.jump();
        },
        //轮播图
        lunbo: function() {
            // console.log('我是首页的内容');
            const $images = $('.header');
            const $piclist = $('.header ul li'); //8张图
            const $btnlist = $('.header ol li'); //8个圈
            const $left = $('.header .leftbtn');
            const $right = $('.header .rightbtn');
            let index = 0; //存储索引。
            let timer = null;
            let autotimer = null;
        
            //图片切换
            $btnlist.on('mouseover', function() {
                index = $(this).index(); //当前的索引
                timer = setTimeout(function() {
                    tabswitch();
                }, 300);
            });
        
            $btnlist.on('mouseout', function() {
                clearTimeout(timer);
            });
        
            //左右箭头
            $right.on('click', function() {
                index++;
                if (index > $btnlist.length - 1) {
                    index = 0;
                }
                tabswitch();
            });
        
            $left.on('click', function() {
                index--;
                if (index < 0) {
                    index = $btnlist.length - 1;
                }
                tabswitch();
            });
        
            //自动轮播。
            autotimer = setInterval(function() {
                $right.click();
            }, 3000);
        
            //鼠标移入baidu盒子，停止定时器，移出继续
            $images.hover(function() {
                clearTimeout(autotimer);
            }, function() {
                autotimer = setInterval(function() {
                    $right.click();
                }, 3000);
            });
        
            function tabswitch() {
                $btnlist.eq(index).addClass('active').siblings('ol li').removeClass('active');
                $piclist.eq(index).stop(true).animate({ opacity: 1 }).siblings('ul li').stop(true).animate({ opacity: 0 });
            }
        },

        //下拉菜单,未完
        menu:function(){
            const $lists=$('.nav ul li');
            const $outmenu=$('.nav ul div.menu1,.nav ul div.detail');
            const $alists = $('.nav ul .detail .dleft a'); 
            const $menuitem = $('.nav ul .dright .item'); 
            const $rightmenu=$('.nav ul .dright');

            $lists.on('mouseover',function(){
                $outmenu.eq($(this).index()).show().siblings('.menu1,detail').hide();
            });
            $alists.on('mouseover', function() {
                $rightmenu.show();
                $(this).addClass('active').siblings('a').removeClass('active');
                $menuitem.eq($(this).index()).show().siblings('.item').hide();
            });
            $menuitem.on('mouseout',function(){
                $rightmenu.hide();
            })
            $rightmenu.on('mouseover',function(){
                $rightmenu.show();
            })
            $rightmenu.on('mouseout',function(){
                $rightmenu.hide();
            })
            $lists.on('mouseout',function(){
                $outmenu.hide();
            });
        },

        // 下拉菜单跳转到列表页面
        jump: function(){
            const $btn=$('.dright .item div em');
            // console.log($btn);
            $btn.on('click',function(){
                //获取当前点击的元素的内容
                const inner=$(this).text();
                $btn.on('click',function(){
                    location.href=`http://localhost/Haier/src/list.html?inner=${inner}`;
                })
            });
        },
    

    }
});