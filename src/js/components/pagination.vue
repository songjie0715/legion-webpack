<template>
    <nav aria-label="Page navigation">
        <ul class="pagination" :class="[size ? 'pagination-'+size : '']">
            <li class="page-item" v-if="prevText" :class="{disabled: isPrevDisabled}">
                <a class="page-link" href="#" @click.prevent="prev" v-html="prevText"></a>
            </li>
            <template v-for="item in list">
                <li class="page-item" v-if="item.type == ITEM_TYPE.PAGE" :class="{active: index == item.index}">
                    <a class="page-link" href="#" @click.prevent="select(item.index)" v-text="item.index+1"></a>
                </li>
                <li class="page-item page-item-ellipsis" v-else-if="item.type == ITEM_TYPE.ELLIPSIS">
                    <a class="page-link" href="#" @click.prevent="enterPage(item)" v-show="!item.open">
                        <span v-html="ellipseText"></span>
                    </a>
                    <input type="number"
                       :min="1"
                       :max="pages"
                       :ref="item.name"
                       v-model="item.value"
                       v-show="item.open"
                       @blur="inputBlur(item)"
                       class="form-control"
                       @keyup.enter="inputEnter(item)" style="width: 60px;">
                </li>
            </template>
            <li class="page-item" v-if="nextText" :class="{disabled: isNextDisabled}">
                <a class="page-link" href="#" @click.prevent="next" v-html="nextText"></a>
            </li>
        </ul>
    </nav>
</template>

<script>
    import _ from 'lodash';
    import {delay} from 'helper.js';

    const ITEM_TYPE = {
        PAGE: 0,
        ELLIPSIS: 1
    };

    export default {
        name: 'Pagination',
        props: {
            total: Number,
            perPage: {
                type: Number,
                default: 1
            },
            currentPage: {
                type: Number,
                default: 0
            },
            prevText: {
                type: String,
                default: '&laquo;'
            },
            nextText: {
                type: String,
                default: '&raquo;'
            },
            edges: {
                type: Number,
                default: 1
            },
            //min 3
            displayedPages: {
                type: Number,
                default: 5
            },
            useStartEdge: {
                type: Boolean,
                default: true
            },
            useEndEdge: {
                type: Boolean,
                default: true
            },
            ellipseText: {
                type: String,
                default: '&hellip;'
            },
            size: String
        },
        computed: {
            ITEM_TYPE(){
                return ITEM_TYPE
            },
            isPrevDisabled(){
                return this.index == 0;
            },
            isNextDisabled(){
                return this.index == this.pages -1;
            },
            interval(){
                return {
                    start: Math.ceil(this.index > this.halfDisplayed ? Math.max(Math.min(this.index - this.halfDisplayed, (this.pages - this.displayedPages)), 0) : 0),
                    end: Math.ceil(this.index > this.halfDisplayed ? Math.min(this.index + this.halfDisplayed, this.pages) : Math.min(this.displayedPages, this.pages))
                };
            },
            halfDisplayed(){
                return this.displayedPages / 2;
            },
            pages(){
                return Math.ceil(this.total / this.perPage);
            },
            list(){
                let results = [];
                let pages = this.pages;
                let edges = this.edges;
                let {start, end} = this.interval;

                //start edges
                if(start > 0 && edges > 0 ) {
                    if(this.useStartEdge){
                        let end = Math.min(edges, start);
                        results = results.concat(_.range(0, end).map(d=>{
                            return {
                                type: ITEM_TYPE.PAGE,
                                index: d
                            }
                        }));
                    }
                    if(edges < start && (start - edges != 1)) {
                        results.push({
                            open: false,
                            name: 'before',
                            value: results[results.length-1].index + 2,
                            index: results[results.length-1].index + 2,
                            type: ITEM_TYPE.ELLIPSIS
                        })
                    } else if(start - edges == 1){
                        results.push(edges);
                    }
                }

                //interval link
                results = results.concat(_.range(start, end).map(d=>{
                    return {
                        type: ITEM_TYPE.PAGE,
                        index: d
                    }
                }));

                //end edges
                if(end < pages && edges > 0){
                    if(pages - edges > end && (pages - edges - end != 1)) {
                        results.push({
                            open: false,
                            name: 'end',
                            value: results[results.length-1].index + 2,
                            index: results[results.length-1].index + 2,
                            type: ITEM_TYPE.ELLIPSIS
                        })
                    } else if (pages - edges - end == 1){
                        results.push({
                            type: ITEM_TYPE.PAGE,
                            index: end
                        })
                    }
                    if(this.useEndEdge){
                        let begin = Math.max(pages-edges, end);
                        results = results.concat(_.range(begin, pages).map(d=>{
                            return {
                                type: ITEM_TYPE.PAGE,
                                index: d
                            }
                        }));
                    }
                }

                this.items = results;

                return results;
            }
        },
        data(){
            return {
                index: this.currentPage-1,
                items: []
            }
        },
        mounted(){
            this.$emit('select', this.index);
        },
        methods: {
            select(index){
                if(index != this.index){
                    this.index = index;
                    this.$emit('select', index+1);
                }
            },
            prev(){
                this.select(this.index-1);
            },
            next(){
                this.select(this.index+1);
            },
            enterPage(item){
                item.open=true;
                delay(()=>{
                    this.$refs[item.name][0].focus();
                });
            },
            inputBlur(item){
                if(item.value != item.index){
                    this.inputEnter(item);
                } else {
                    item.open = false;
                }
            },
            inputEnter(item){
                item.open = false;
                this.select(item.value-1);
            }
        }
    }
</script>