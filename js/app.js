$(function(){

	var App = function(){
		// 当前屏幕位置
		this.screenIndex = 0;
		// 屏数
		this.screenCount = 2;

		// 搜索页
		this.searchGrid = $('#search-grid');

		// 分页控件
		this.pageControl = $('#page-control');
		// Dock控件
		this.dock = $('#app-dock');
		this.keyboard = $('#keyboard');

		this.scrollDirection = 0;

		this.scroller = null;

		this.bindEvent();
	};

	App.prototype = {
		bindEvent : function() {
			var self = this;

			this.scroller = new iScroll('app-grids-scroll-wrapper',{
				hScroll : true,
				hScrollbar : false,
				vScroll : false,
				vScrollbar : false,
				snap : true,
				onScrollMove : function(e){
					if(this.x > 5 - self.screenIndex * 320){
						self.scrollDirection = -1;
					} else if(this.x < -self.screenIndex * 320 - 5){
						self.scrollDirection = 1;
						if(self.screenIndex === 0){
							self.keyboard.removeClass('show');
						}
					}
				},
				onBeforeScrollEnd : function(){
					if(self.scrollDirection === -1 && self.screenIndex > 0){
						self.screenIndex -= 1;
					} else if(self.scrollDirection === 1 && self.screenIndex < self.screenCount - 1){
						self.screenIndex += 1;
					}
					if(self.screenIndex === 0){
						self.keyboard.addClass('show');
						self.searchGrid.addClass('show-search');
						self.dock.addClass('show-search');
						self.pageControl.addClass('show-search');
						this.options.bounce = false;
					} else {
						self.searchGrid.removeClass('show-search');
						self.dock.removeClass('show-search');
						self.pageControl.removeClass('show-search');
						this.options.bounce = true;
					}
				},
				onScrollEnd : function(){
					if(self.screenIndex === 0){
						self.keyboard.addClass('show');
						self.searchGrid.addClass('show-search');
						self.dock.addClass('show-search');
						self.pageControl.addClass('show-search');
						this.options.bounce = false;
					} else {
						self.searchGrid.removeClass('show-search');
						self.dock.removeClass('show-search');
						self.pageControl.removeClass('show-search');
						this.options.bounce = true;
					}
				}
			});
	
			this.appMouseDownTimeout = null;

			$('.app').on('mousedown',function(e){
				window.clearTimeout(self.appMouseDownTimeout);
				if(!$('.app').hasClass('rotating')){
					self.appMouseDownTimeout = window.setTimeout(function(){
						$('.app').each(function(){
							$(this).addClass('rotating');
							$(this).addClass('rotating' + Math.ceil(Math.random() * 10 % 4));
						})
					},600);
				}
			});
			$('.app').on('mouseup',function(){
				if(!$('.app').hasClass('rotating')){
					window.clearTimeout(self.appMouseDownTimeout);
				}
			});

			$('#home button').on('click',function(){
				if($('.app').hasClass('rotating')){
					$('.app').removeClass('rotating');
				}
			});
		}
	};

	
	new App();
});