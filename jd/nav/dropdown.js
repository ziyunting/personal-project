
(function () {
    function Dropdown(options) {

        this.wrap = options.wrap;
        this.title = options.title || '';
        this.menuList = options.menuList || [];
        this.direction = options.direction || 'y';
        this.width = options.width;
        this.createDom();
        this.initStyle();
        this.bindEvent();
    }

    Dropdown.prototype.createDom = function () {
        $(this.wrap).append($('<a class="dropdown-btn" href="#">' + this.title + '</a>' ));
        var dopDownDiv = $('<div class="my-dropdown"></div>')
        for (var i = 0; i < this.menuList.length; i++) {
            var menu = this.menuList[i];
            var dl = $('<dl></dl>');
            if (menu.title) {
                $('<dt>' + menu.title + '</dt>').appendTo(dl);
            }
            menu.items.forEach(function(item) {
                $('<dd>' + item.name + '</dd>').appendTo(dl);
            });
            dopDownDiv.append(dl);
        }
        dopDownDiv.appendTo($(this.wrap));
    }
    Dropdown.prototype.initStyle = function () {
        var width = this.width;
        $(this.wrap).css('position', 'relative').find('.my-dropdown').css({
            position: 'absolute',
            backgroundColor: '#fff',
            border: '1px solid #eee',
            paddingLeft: 10,
            display: 'none'
        }).find('dl').css({
            width: (width + 10) * 2,
            overflow: 'hidden',
            borderBottom: '1px solid #eee'
        }).find('dd').css({
           width: width,
           float: 'left',
           textAlign: 'left',
           cursor: 'pointer',
           whiteSpace: 'nowrap'
        });
        $('.my-dropdown dl', $(this.wrap)).find('dt').css({
            textAlign: 'left',
            fontWeight: 700,
            color: '#666'
        });
        if (this.direction == 'x') {
            $('.my-dropdown', $(this.wrap)).css({
                width: 1190,
                right: -84,
            });
            var self = this;
            $('.my-dropdown > dl', $(this.wrap)).each(function(i) {
                $(this).css({
                    width: self.menuList[i].width,
                    float: 'left',
                    borderRight: '1px solid #eee',
                    margin: 10
                }).find('dd').css({
                    width: self.menuList[i].itemWidth
                })
            })

        }
    }
    Dropdown.prototype.bindEvent = function() {
        $('.dropdown-btn').hover(function() {
           $(this).css({
               color: 'red'
           })
        }, function() {
            $(this).css({
                color: '#999'
            })
        });
        $(this.wrap).hover(function() {
            $(this).find('.dropdown-btn').css({
                backgroundColor: '#fff',
                borderColor: '#eee',
                borderBottomColor: '#fff',
            });
            $('.my-dropdown', $(this)).show();
        }, function() {
            $(this).find('.dropdown-btn').css({
                backgroundColor: 'transparent',
                borderColor: 'transparent',
                borderBottomColor: 'transparent',
                color: '#999',
                fontWeight: 'normal'
            });
            $('.my-dropdown', $(this)).hide();
        });
        $('.my-dropdown > dl > dd').hover(function() {
            $(this).css({
                color: 'red'
            })
        }, function() {
            $(this).css({
                color: '#999'
            })
        })
    }
    $.fn.extend({
        addDropdown: function(options) {
            options.wrap = this || $('body');
            new Dropdown(options);
            return this;
        }
    });
} ())