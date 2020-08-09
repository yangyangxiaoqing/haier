define([], function() {
    return {
        init:function(){
            this.carrender();
            this.selectall();
            this.calculate();
        },
        carrender:function(){
            if ($.cookie('cookiegid') && $.cookie('cookienum')) { //cookie存在
                // console.log(111);
                arrgid = $.cookie('cookiegid').split(','); //[1,3,5]
                arrnum = $.cookie('cookienum').split(','); //[10,140,50]
                // console.log(arrgid,arrnum);
                for (let i = 0; i < arrgid.length; i++) {
                    rendercart(arrgid[i], arrnum[i]);
                }

            } 
            function rendercart(gid, num) { 
                $.ajax({
                    url: 'http://localhost/Haier/php/goods.php',
                    dataType: 'json',
                }).then(function(data) {
                    for (let value of data) {
                        if (value.gid == gid) {
                            // console.log(gid);
                           let strhtml = `
                            <div class="goods-item goods-item-sele">
                            <div class="goods-info">
                                <div class="cell b-checkbox">
                                    <div class="cart-checkbox">
                                        <input cookie="${gid}" type="checkbox" name="" class="select" value="" />
                                        <span class="line-circle"></span>
                                    </div>
                                </div>
                                <div class="cell b-goods">
                                    <div class="goods-name">
                                        <div class="goods-pic">
                                            <a href=""><img src="${value.url}" alt="" /></a>
                                        </div>
                                        <div class="goods-msg">
                                            <div class="goods-d-info">
                                                <a href="">${value.title}</a>
                                            </div>
                                            <div class="goods-ex">
                                                <span class="promise"></span>
                                                <span class="promise">
                                                    <i></i><a href="">购买京东服务</a>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="cell b-props">
                                    <div class="prop-text">${value.price}</div>
                                </div>
                                <div class="cell b-num">
                                </div>
                                <div class="cell b-price">
                                    <strong>${(value.price*num).toFixed(2)}</strong>
                                </div>
                                <div class="cell b-quantity">
                                    <div class="quantity-form">
                                        <a class="quantity-down" href="javascript:void(0)">-</a>
                                        <input type="text" cookie="${gid}" value="${num}" />
                                        <a class="quantity-add" href="javascript:void(0)">+</a>
                                    </div>
                                    <div class="quantity-text">有货</div>
                                </div>
                            </div>
                        </div>
                            `;
                            // console.log(strhtml)
                            $('.item-list').append(strhtml);
                        }

                    }
                });
            }
        },

        selectall:function(){
            setTimeout(function(){
                const $all = $('.allsel');
                const $inputs = $('.item-list').find('.select'); 
                // console.log($all,$inputs)
                //全选按钮选中，其他按钮都选中
                $all.on('click', function() {
                    $inputs.prop('checked', $(this).prop('checked'));
                    count();
                });
                //如果按钮的选中元素的长度等于总的按钮的长度，则全选按钮选中
                $inputs.on('click', function() {
                    if ($inputs.length === $('input:checked').not('.allsel').size()) {
                        $all.prop('checked', true);
                    } else {
                        $all.prop('checked', false);
                    }
                    count();
                });

                function count(){
                    let $aggregate=[];
                    let $totality=[];
                    $('input:checked').not('.allsel').parents('.goods-info').find('.b-price strong').each(function() { $aggregate.push($(this).text()) });
                    $('input:checked').not('.allsel').parents('.goods-info').find('.quantity-form input').each(function() { $totality.push($(this).val()) });
                    // console.log($totality);
                    let num=0;
                    for(let i=0;i<$aggregate.length;i++){
                        num += Number($aggregate[i]);
                        // console.log($aggregate[i])
                    }
                    let $goodsnum=0;
                    for(let i=0;i<$totality.length;i++){
                        $goodsnum += Number($totality[i]);
                        // console.log($aggregate[i])
                    }

                    $('.amount-sum em').html($goodsnum);  
                    $('.text .price').html(num.toFixed(2));
                }
            },200);

            // //全选按钮之外的其他input选中，全选选中。
            // //inputs:除了全选按钮之外长度   等于   除了全选按钮之外选中的长度
        },

        calculate:function(){
            setTimeout(function(){    
                //点击加号，商品数量增加
                $('.quantity-add').on('click',function(){
                    let $value= $(this).parents('.goods-info').find('.quantity-form input').val();
                    $value++;
                    if($value>9999){
                        $value=9999;
                    }
                    $(this).parents('.goods-info').find('.quantity-form input').val($value);
                    arrgid = $.cookie('cookiegid').split(','); //[1,3,5]
                    arrnum = $.cookie('cookienum').split(','); //[10,140,50]
                    for(let i = 0; i < arrgid.length; i++){
                        if(arrgid[i]==$(this).parents('.goods-info').find('.quantity-form input').attr('cookie')){
                            arrnum[i]=$value;
                        }
                    }

                    // console.log(arrgid)
                    $.cookie('cookiegid', arrgid.toString(),{ expires: 7, path: '/' });
                    $.cookie('cookienum', arrnum.toString(),{ expires: 7, path: '/' });
                    

                    let $price=parseInt($(this).parents('.goods-info').find('.prop-text').text());
                    // console.log($price)
                    $(this).parents('.goods-info').find('.b-price strong').html(($price*$value).toFixed(2));

                    count();

                });
                //点击减号，商品数量减少
                $('.quantity-down').on('click',function(){
                    let $value= $(this).parents('.goods-item').find('.quantity-form input').val();
                    $value--;
                    if($value<0){
                        $value=0;
                    }
                    $(this).parents('.goods-item').find('.quantity-form input').val($value);
                    arrgid = $.cookie('cookiegid').split(','); 
                    arrnum = $.cookie('cookienum').split(','); 
                    for(let i = 0; i < arrgid.length; i++){
                        if(arrgid[i]==$(this).parents('.goods-info').find('.quantity-form input').attr('cookie')){
                            arrnum[i]=$value;
                        }
                    }
                    $.cookie('cookiegid', arrgid.toString(),{ expires: 7, path: '/' });
                    $.cookie('cookienum', arrnum.toString(),{ expires: 7, path: '/' });

                    let $price=parseInt($('.prop-text').text());
                    $(this).parents('.goods-info').find('.b-price strong').html(($price*$value).toFixed(2));

                    count();
                })
                //改变中间输入框的值
                $('.quantity-form input').on('blur',function(){
                    let $value= $(this).val();
                    // console.log($value);
                    let reg=/^\d{0,4}$/;
                    if(!reg.test($value)){
                        $value=1;
                    }
                    $(this).val($value);
                    arrgid = $.cookie('cookiegid').split(','); 
                    arrnum = $.cookie('cookienum').split(','); 
                    // console.log($(this).attr('cookie'))
                    for(let i = 0; i < arrgid.length; i++){
                        if(arrgid[i]==$(this).attr('cookie')){
                            arrnum[i]=$value;
                        }
                    }
                    $.cookie('cookiegid', arrgid.toString(),{ expires: 7, path: '/' });
                    $.cookie('cookienum', arrnum.toString(),{ expires: 7, path: '/' });
                })

                //删除选中商品
                $('.operation a').on('click',function(){
                    // console.log($('input:checked').not('.allsel').parents('.goods-info').find('.cart-checkbox input').attr('cookie'));
                    let $delnum=[];
                    $('input:checked').not('.allsel').parents('.goods-info').find('.cart-checkbox input').each(function(){
                        // $delnum.push($(this).attr('cookie'));
                        arrgid = $.cookie('cookiegid').split(','); 
                        arrnum = $.cookie('cookienum').split(','); 
                        
                        for(let i = 0; i < arrgid.length; i++){
                            if(arrgid[i]==$(this).attr('cookie')){
                                arrgid.splice(i,1);
                                arrnum.splice(i,1);
                            }
                        }
                        $.cookie('cookiegid', arrgid.toString(),{ expires: 7, path: '/' });
                        $.cookie('cookienum', arrnum.toString(),{ expires: 7, path: '/' });
                        location.href="http://localhost/Haier/src/carlist.html";
                    })

                    


                    // $('.cart-checkbox input').attr('cookie')
                })
                function count(){
                    let $aggregate=[];
                    let $totality=[];
                    $('input:checked').not('.allsel').parents('.goods-info').find('.b-price strong').each(function() { $aggregate.push($(this).text()) });
                    $('input:checked').not('.allsel').parents('.goods-info').find('.quantity-form input').each(function() { $totality.push($(this).val()) });
                    console.log($totality);
                    let num=0;
                    for(let i=0;i<$aggregate.length;i++){
                        num += Number($aggregate[i]);
                        // console.log($aggregate[i])
                    }
                    let $goodsnum=0;
                    for(let i=0;i<$totality.length;i++){
                        $goodsnum += Number($totality[i]);
                        // console.log($aggregate[i])
                    }

                    $('.amount-sum em').html($goodsnum);  
                    $('.text .price').html(num.toFixed(2));
                }
            },200)
        },

        
    }
});