define(['jquery','jquery.lazyload','jquery.pagination'], function($,lazy,page) {
    return {
        init:function(){
            // this.array_default = []; //排序前的li数组
            var array = []; //排序中的数组
            var prev = null;
            var next = null;

            var index=0;

            this.render();
            this.page();
            // this.rank();
            this.skip();
        },

        //渲染
        render: function() { 
            let inner= decodeURI(location.search.substring(1).split('=')[1]);
            $.ajax({
                url: 'http://localhost/Haier/php/goodslist.php',
                data:{
                    inner:inner,
                },
                dataType: 'json',
            }).done(function(data){
                $('.index a')[1].append(inner);
                $('.head span').append(inner);
                // console.log(data.length);
                $('.head p').append('共'+data.length+'件产品');
                let str='';
                $.each(data, function(index, value) {
                    str+=`<li>
                            <a href="detail.html?sid=${value.gid}">
                                <img class="lazy" data-original="${value.url}" width="229" height="229"/>
                            </a>
                            <span>${value.title}</span>
                            <i>${value.subtitle}</i>
                            <span><i>参考价:</i><strong>￥${value.price}</strong></span>
                            <em>家电商在售</em>
                        </li>`
                });
                $('.list ul').html(str);

                //懒加载
                $(function() {
                    $("img.lazy").lazyload({ effect: "fadeIn" });
                });
            });


            // array_default = []; //排序前的li数组-默认排序的数组
            // array = []; //排序中的数组
            // prev = null;
            // next = null;

            // //4.将页面的li元素加载到两个数组中
            // $('.list ul li').each(function(index, element) {
            //     array[index] = $(this); //[li,li,li,li......]
            //     array_default[index] = $(this); //[li,li,li,li......]
            // });
        },

        //分页
        page:function(){
            $('.page').pagination({
                pageCount: 2, //总的页数
                jump: true, //是否开启跳转到指定的页数，布尔值。
                // coping: true, //是否开启首页和尾页，布尔值。
                prevContent: '上一页',
                nextContent: '下一页',
                // homePage: '首页',
                // endPage: '尾页',
                callback: function(api) {
                    let inner= decodeURI(location.search.substring(1).split('=')[1]);
                    console.log(api.getCurrent()); //获取当前的页码
                    $.ajax({
                        url: 'http://localhost/Haier/php/goodslist.php',
                        data: { //将获取的页码给后端
                            inner:inner,
                            page: api.getCurrent()
                        },
                        dataType: 'json'
                    }).done(function(data) { //根据传递的页码，后端返回相应的数据，进行渲染。
                        let $str = '';
                        $.each(data, function(index, value) {
                            $str+= `<li>
                                        <a href="detail.html?sid=${value.gid}">
                                            <img class="lazy" data-original="${value.url}" width="229" height="229"/>
                                        </a>
                                        <span>${value.title}</span>
                                        <i>${value.subtitle}</i>
                                        <span><i>参考价:</i><strong>￥${value.price}</strong></span>
                                        <em>家电商在售</em>
                                    </li>`;
                        });
                        $('.list ul').html($str);
                        //渲染结束。

                        // array_default = []; //排序前的li数组
                        // array = []; //排序中的数组
                        // prev = null;
                        // next = null;
        
                        // //将页面的li元素加载到两个数组中
                        // $('.list ul li').each(function(index, element) {
                        //     array[index] = $(this);
                        //     array_default[index] = $(this);
                        // });
                    })
                }
            });
        },

        //排序
        rank:function(){
            // let index=0;
            // console.log(index);
            // $('.fliter ul li').eq(3).on('click',function(){
            //     index++;
            //     if(index>2){
            //         index=0;
            //     }
            //     if(index===0){

            //     }else if(index===1){

            //     }else{

            //     }
                

            // })

            function Default(){

            }
            // $('button').eq(0).on('click', function() {
            //     $.each(array_default, function(index, value) { //value就是li标签
            //         $('.list ul').append(value);
            //     });
            //     return;
            // });
            // //升序排序 - array数组
            // $('button').eq(1).on('click', function() {
            //     for (let i = 0; i < array.length - 1; i++) {
            //         for (let j = 0; j < array.length - i - 1; j++) {
            //             //取出array的价格，price进行排序
            //             prev = parseFloat(array[j].find('.price').html().substring(1));
            //             next = parseFloat(array[j + 1].find('.price').html().substring(1));
            //             //通过价格的判断，改变的是li的位置。
            //             if (prev > next) {
            //                 let temp = array[j];
            //                 array[j] = array[j + 1];
            //                 array[j + 1] = temp;
            //             }
            //         }
            //     }
        
            //     //换完li位置，进行渲染。
            //     $.each(array, function(index, value) {
            //         console.log(value); //n.fn.init [li, context: li]
            //         $('.list ul').append(value);
            //     });
            // });
        
        },

    }
});