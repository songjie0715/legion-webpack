/**
 * Created by janey on 2017/1/10.
 */

// response

(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            docEl.style.fontSize = 20 * (clientWidth / 375) + 'px';
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);


// lode more

$(window).on('scroll', function(){
    // 如果滚动条滑到页面底部, 加载更多数据
    if( window.innerHeight + window.scrollY == $(document).height()){
        loadMore();
    }
});


// Dialog

var Dialog = function(opt){
    this.el = opt.el;
    this.scrollTop = opt.scrollTop;
    var self = this;
    this._init = function(){
        var $closed = $(self.el).find('.closed');
        $closed.click(function(){
            self.hide();
        });
        $(this.el).click(function(e){
            e.stopPropagation();
        });
    }
};

var shadow;

Dialog.prototype.show = function(t,type){
    this._init();
    this.pos(t);
    var self = this;
    if( !shadow ){
        shadow = new Shadow();
        shadow.show();
    } else {
      shadow.show();
      if( type ){
          $(shadow.el).off('click');
      }
    }
    // shadow.show();
    $(this.el).show();

    if(!type){
        $(shadow.el).click(function(){
            self.hide();
            $(shadow.el).hide();
        })
    }

};

Dialog.prototype.hide = function(){
    $(this.el).hide();
    shadow.hide();
};

Dialog.prototype.pos = function(t){
    var scrollTop = t,
        windowHeight = $(window).height(),
        DialogHeight = $(this.el).height();

    $(this.el).css({
        top: windowHeight/2 + scrollTop - (DialogHeight/2)
    })
};

Dialog.prototype.render = function(text){
    $(this.el).find('p').html(text);
};



// 遮罩
var Shadow = function(){
    this.el = $('<div class="shadow"></div>');
    this._init = function(){
        $('body').append(this.el);
    }

};

Shadow.prototype.show = function(){
    this._init();
    this.pos();
    this.el.show();
};

Shadow.prototype.hide = function(){
    this.el.hide();
};

Shadow.prototype.pos = function(){
    var dh = $(document).height();
    this.el.height(dh);
};




