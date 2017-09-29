/**
 * Created by janey on 2017/7/27.
 */

import Vue from "vue";
import core from "../core/core";

var bookId = window['bookId'];
var isAsc = window['isAsc'];
var flag = window['flag'];
var pageSize= window['pageSize'];
var currentPage = window['currentPage'];//当前页数
var totalPage = window['totalPage'];//总页数
var isFree= window['isFree'];
var booklp= window['booklp'];
var chapterSelect= window['chapterSelect'];
var userId = window['userId'];

export default new Vue({
    el: '#app',
    data: {
        isAsc: isAsc
    },
    mounted(){
        var winHeight=$(window).height();
        $('.wrapper').height(winHeight);
        this.chapterLoad(currentPage,pageSize,isAsc);
    },
    methods: {
        chapterLoad:function(currentPage,pageSize,isAsc){
            var chapterHtml='';
            $.ajax({
                type: "GET",
                url: core.website_DOMAIN + '/ajax/book/'+bookId+'/catalogs?page='+ currentPage +'&pageSize='+ pageSize +'&isAsc='+isAsc,
                success:function(CatalogVO){
                    var seltxt='';
                    $('.beforesend').hide();
                    currentPage = currentPage-1;
                    $('.clist_select')
                        .find('option')
                        .filter(function() {
                            return this.value == currentPage;
                        })
                        .prop('selected', true);
                    seltxt = $(".clist_select").children("option").eq(currentPage).text();
                    $(".selectbox-div").html(seltxt);

                    for(var i=0;i<CatalogVO.catalogs.length;i++){
                        // console.log(CatalogVO.catalogs[i]);
                        if(CatalogVO.catalogs[i].vol){
                            chapterHtml +='<h2>'+CatalogVO.catalogs[i].volume.name+'</h2>';
                        }else{
                            if(CatalogVO.catalogs[i].chapter.free){
                                isFree='<span class="free">免费</span>';
                            }else{
                                isFree='';
                            }
                            if(CatalogVO.catalogs[i].chapter.id == booklp){
                                chapterHtml +='<li class="on collect-data-point" data-collect-id="WX-BCL-CONTENTS-MENU-CHAPTER" data-collect-data=\'[{"bookid":"'+bookId+'"},{"chid":"'+CatalogVO.catalogs[i].chapter.id+'"}]\'><a href="'+website_DOMAIN + '/book/'+bookId+'/'+CatalogVO.catalogs[i].chapter.id+'">'+CatalogVO.catalogs[i].chapter.name+'<p class="chapter-tag">'+isFree+'</p></a></li>';
                            }else{
                                chapterHtml +='<li class="collect-data-point" data-collect-id="WX-BCL-CONTENTS-MENU-CHAPTER" data-collect-data=\'[{"bookid":"'+bookId+'"},{"chid":"'+CatalogVO.catalogs[i].chapter.id+'"}]\'><a href="'+website_DOMAIN + '/book/'+bookId+'/'+CatalogVO.catalogs[i].chapter.id+'">'+CatalogVO.catalogs[i].chapter.name+'<p class="chapter-tag">'+isFree+'</p></a></li>';
                            }
                        }
                    }
                    $('.wrapper').scrollTop(0);
                    $('#chapterUl').html(chapterHtml);
                    $("body").attr({"currentPage":currentPage,"totalPage":totalPage});
                    if(parseInt($("body").attr("currentPage"))==(parseInt($("body").attr("totalPage"))-1)){
                        $('.mod-r ul li:eq(2)').css('background','#ddd');
                    }else{
                        $('.mod-r ul li:eq(2)').css('background','#fafafa');
                    }
                },
                error:function(){}
            });

        },
        chapterPrev:function(){
            if(parseInt($("body").attr("currentPage"))==0){
                location.href=website_DOMAIN + "/book/"+bookId;
                return false;
            }
            $('#chapterUl').html('');
            $('.beforesend').show();
            currentPage--;
            this.chapterLoad(currentPage,pageSize,isAsc);
        },
        chapterNext:function(){
            if(parseInt($("body").attr("currentPage"))==(parseInt($("body").attr("totalPage"))-1)){
                return false;
            }
            $('#chapterUl').html('');
            $('.beforesend').show();

            currentPage++;
            this.chapterLoad(currentPage,pageSize,isAsc);
        },
        selectChange(e){
            var selectVal=$(e.target).val();
            currentPage = selectVal;
            currentPage++;
            this.chapterLoad(currentPage,pageSize,isAsc);
            sendMessage(userId ,"WX-BCL-SELECT-CHAPTER",[{"bookid":bookId}]);
        },
        changeSort(e){

            isAsc = !isAsc;
            location.href=website_DOMAIN + '/book/'+bookId+'/catalogs?isAsc='+ isAsc;
            sendMessage(userId, "WX-BCL-SORT",[{"bookid":bookId}]);
            e.stopPropagation();
            e.preventDefault();
        }
    }
})

