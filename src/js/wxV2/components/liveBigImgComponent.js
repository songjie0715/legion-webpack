/**
 * Created by janey on 2017/5/27.
 */

define(['vue'], function (Vue) {
    return Vue.extend({
        data(){
            return {
            }
        },
        props: {
            book: Object,
            page: Number,
            index: Number
        },
        template: `<a v-cloak @click="directTo()" v-bind:class="'collect-data-point public-mod-list-book type'+ book.type" 
                    data-collect-id="WX-FE-CHANNEL_LIVE_FEED"
                    :data-collect-data="getString(index, book.shortId)"
                    :href="book.action == '1' ? book.url + '&site=weixin' : '/wx/book/' + book.bookId + '/' + book.chapterId ">
                    <dl class="list-dl-mod tuijian-dl-mod" v-show="book.type == '1'">
                        <dd>
                            <p class="text">{{book.title}}</p>
                            <p class="bookOther">
                                <em class="ribbon" v-show="book.hotWord != ''">{{book.hotWord}}</em>
                                <span class="bookTags" v-show="book.tags.length != 0"><i>{{book.tags[0]}}</i></span>
                                <span class="pv" v-show="book.count != 0"><b></b>{{book.count}}</span>
                            </p>
                        </dd>
                        <dt><img :src="book.images ? book.images[0] : '' " /></dt>
                    </dl>
                    <div v-show="book.type == '3'">
                        <h2>{{book.title}}</h2>
                        <div class="picCont" ref="bigimg">
                            <p class="picBg" :style="'background:url('+ book.images[0] +') center top no-repeat; background-size:cover;'"></p>
                        </div>
                        <p class="bookOther">
                            <em class="ribbon" v-show="book.hotWord != ''">{{book.hotWord}}</em>
                            <span class="bookTags" v-show="book.tags.length != 0"><i>{{book.tags[0]}}</i></span>
                            <span class="pv" v-show="book.count != 0"><b></b>{{book.count}}</span>
                        </p>
                    </div>
                    <div v-show="book.type == '2'">
                        <dl class="list-dl-mod tuijian-dl-mod">
                           <dd>
                               <h2>{{book.title}}</h2>
                               <p class="derictText">{{book.content}}</p>
                           </dd>
                           <dt><img :src="book.images ? book.images[0] : '' " /></dt>
                       </dl>
                       <p class="bookOther">
                           <em class="ribbon" v-show="book.hotWord != ''">{{book.hotWord}}</em>
                           <span class="bookTags" v-show="book.tags.length != 0"><i>{{book.tags[0]}}</i></span>
                           <span class="pv" v-show="book.count != 0"><b></b>{{book.count}}</span>
                       </p>
                    </div>
                    <div v-show="book.type == '4'">
                        <h2>{{book.title}}</h2>
                        <p class="bookOther">
                            <em class="ribbon" v-show="book.hotWord != ''">{{book.hotWord}}</em>
                            <span class="bookTags" v-show="book.tags.length != 0"><i>{{book.tags[0]}}</i></span>
                            <span class="pv" v-show="book.count != 0"><b></b>{{book.count}}</span>
                        </p>
                    </div>
                </a>
                `,
        mounted(){

        },
        methods: {
            directTo: function(){
                history.pushState({
                    scrollY: window.scrollY,
                    page: this.page
                },'');
            },
            getString(seatid, liveid){
                return '[{"seatid": "'+seatid+'"},{"liveid": "'+ liveid +'"}]';
            }
        }
    })
});