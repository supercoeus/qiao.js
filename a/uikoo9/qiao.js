    exports.local = function(key, value){
    	if(typeof value == 'undefined'){
    		return $.cookie(key);
    	}else if(value == null){
    		$.cookie(key, value, {path:'/', expires: -1});
    	}else{
    		$.cookie(key, value, {path:'/', expires:1});
    	}
    };
    
    exports.tip = function(func){
		exports.on('.ng-stock-title .tip', 'click', function(){
			var $this = $(this);
			if(!$this.hasClass('tip-active')){
				$this.parent().parent().find('.tip-active').removeClass('tip-active');
				$this.addClass('tip-active');
				
				if(func) func($this.text());
			}
		});
	};
	
	exports.iscroll = {};
	exports.iscroll.v;
	exports.iscroll.init = function(func){
		document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
		exports.iscroll.v = new IScroll('#wrapper', {click: true});
		exports.iscroll.v.on('scrollStart', function(){if(this.directionY == -1 && this.y == 0) $('.ng-pulldown').show();});
		exports.iscroll.v.on('scrollEnd', function(){if(this.y == 0) $('.ng-pulldown').slideUp(function(){if(func) func();});});
	};
	exports.iscroll.height = function(flag){
		if(exports.iscroll.v){
			var documentH = $(document).height();
			var headerH = $('header').height();
			var footerH = $('footer').height();
			if($('footer').is(':hidden')){
				$('#wrapper').height(documentH - headerH);
			}else{
				$('#wrapper').height(documentH - headerH - footerH);
			}
			
			exports.iscroll.v.refresh();
		}
	};
    

/**
 * 封装amazeui相关方法
 */
qiao.am = {};
qiao.am.loading = function(type, msg){
	if(type == 'open'){
		var $modal = $('#amloading'); 
		if($modal.length == 0){
			var ss = [];
			ss.push('<div class="am-modal am-modal-loading am-modal-no-btn" tabindex="-1" id="amloading">');
			ss.push('<div class="am-modal-dialog">');
			ss.push('<div class="am-modal-hd">' + (msg || '数据加载中...') + '</div>');
			ss.push('<div class="am-modal-bd"><span class="am-icon-spinner am-icon-spin"></span></div>');
			ss.push('</div>');
			ss.push('</div>');
			
			$('body').append(ss.join(''));
			$('#amloading').modal(); 
			qiao.on('#amloading', 'closed.modal.amui', function(){$('#amloading').remove();});
		} 
	}
	if(type == 'close'){
		var $modal = $('#amloading'); 
		if($modal.length > 0) $modal.modal('close'); 
	}
};
qiao.am.alert = function(msg, ok){
	var ss = [];
	ss.push('<div class="am-modal am-modal-alert" tabindex="-1" id="amalert">');
		ss.push('<div class="am-modal-dialog">');
			ss.push('<div class="am-modal-bd">' + (msg || '提示') + '</div>');
			ss.push('<div class="am-modal-footer">');
				ss.push('<span class="am-modal-btn alertok">确定</span>');
			ss.push('</div>');
		ss.push('</div>');
	ss.push('</div>');
	
	var str = ss.join('');
	$('body').append(str);
	
	var $modal = $('#amalert'); 
	$modal.modal();
	
	// bind
	qiao.on('span.alertok', 'click', function(){
		if(ok) ok();
		$modal.modal('close');
	});
	qiao.on('#amalert', 'closed.modal.amui', function(){
		$modal.remove();
	});
};
qiao.am.confirm = function(msg, ok, cancel){
	var mytitle = '提示';
	var mymsg = '提示';
	if(typeof msg == 'string'){
		mymsg = msg;
	}else{
		mymsg = msg.msg;
		mytitle = msg.title;
	}
	
	var ss = [];
	ss.push('<div class="am-modal am-modal-confirm" tabindex="-1" id="amconfirm">');
		ss.push('<div class="am-modal-dialog">');
			ss.push('<div class="am-modal-hd">' + mytitle + '</div>');
			ss.push('<div class="am-modal-bd">' + mymsg + '</div>');
			ss.push('<div class="am-modal-footer">');
				ss.push('<span class="am-modal-btn" data-am-modal-cancel>取消</span>');
				ss.push('<span class="am-modal-btn" data-am-modal-confirm>确定</span>');
			ss.push('</div>');
		ss.push('</div>');
	ss.push('</div>');
	
	var str = ss.join('');
	$('body').append(str);
	
	var $modal = $('#amconfirm'); 
	$modal.modal({
		relatedTarget: this,
        onConfirm: ok,
        onCancel: cancel
	});
	
	// bind
	qiao.on('#amconfirm', 'closed.modal.amui', function(){
		$modal.remove();
	});
};
qiao.am.modal = function(options){
	if(!options || !options.content) return;
	
	var ss = [];
	ss.push('<div class="am-modal am-modal-no-btn" tabindex="-1" id="ammodal">');
		ss.push('<div class="am-modal-dialog">');
			if(options.title) ss.push('<div class="am-modal-hd">提示</div>');
			ss.push('<div class="am-modal-bd">' + options.content + '</div>');
		ss.push('</div>');
	ss.push('</div>');
	$('body').append(ss.join(''));
	
	var $modal = $('#ammodal'); 
	$modal.modal();
	
	// bind
	qiao.on('#ammodal', 'closed.modal.amui', function(){$modal.remove();});
};

/**
 * 扩展一些js默认的方法
 * 1.string.contains
 * 2.string.startWith
 * 3.string.endWith
 * 4.string.inArray
 */
String.prototype.contains = function(s){
	return this.indexOf(s) != -1;
};
String.prototype.startWith=function(s){  
    return this.indexOf(s) == 0;
};
String.prototype.endWith=function(s){
	if(this.length == 0){
		return false;
	}else{
		return this.indexOf(s) == this.length - 1;
	}
};
String.prototype.inArray = function(array){
	if(this && array){
		for(var i=0; i<array.length; i++){
			if(this == array[i]){
				return true;
			}
		}
	}
	
	return false;
};

uikoo9.to = function(url){
	if(url){
		window.location.href = url;
	}else{
		alert('need url');
	}
};


/**
 * 对bootstrap的封装
 * 1.alert
 * 2.confirm
 * 3.dialog
 * 4.msg
 * 5.tooltip
 * 6.popover
 * 7.bstree
 * 8.scrollspy
 * 9.initimg
 * 10.bsdate
 * 11.bstro
 */
qiao.bs 	= {};
qiao.bs.modaloptions = {
	url 	: '',
	fade	: 'fade',
	close	: true,
	title	: 'title',
	head	: true,
	foot	: true,
	btn		: false,
	okbtn	: '确定',
	qubtn	: '取消',
	msg		: 'msg',
	big		: false,
	show	: false,
	remote	: false,
	backdrop: 'static',
	keyboard: true,
	style	: '',
	mstyle	: ''
};
qiao.bs.modalstr = function(opt){
	var start = '<div class="modal '+opt.fade+'" id="bsmodal" tabindex="-1" role="dialog" aria-labelledby="bsmodaltitle" aria-hidden="true" style="position:fixed;top:20px;'+opt.style+'">';
	if(opt.big){
		start += '<div class="modal-dialog modal-lg" style="'+opt.mstyle+'"><div class="modal-content">';
	}else{
		start += '<div class="modal-dialog" style="'+opt.mstyle+'"><div class="modal-content">';
	}
	var end = '</div></div></div>';
	
	var head = '';
	if(opt.head){
		head += '<div class="modal-header">';
		if(opt.close){
			head += '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>';
		}
		head += '<h3 class="modal-title" id="bsmodaltitle">'+opt.title+'</h3></div>';
	}
	
	var body = '<div class="modal-body"><p><h4>'+opt.msg+'</h4></p></div>';
	
	var foot = '';
	if(opt.foot){
		foot += '<div class="modal-footer"><button type="button" class="btn btn-primary bsok">'+opt.okbtn+'</button>';
		if(opt.btn){
			foot += '<button type="button" class="btn btn-default bscancel">'+opt.qubtn+'</button>';
		}
		foot += '</div>';
	}
	
	return start + head + body + foot + end;
};
qiao.bs.alert = function(options, func){
	// options
	var opt = $.extend({}, qiao.bs.modaloptions);
	
	opt.title = '提示';
	if(typeof options == 'string'){
		opt.msg = options;
	}else{
		$.extend(opt, options);
	}
	
	// add
	$('body').append(qiao.bs.modalstr(opt));
	
	// init
	var $modal = $('#bsmodal'); 
	$modal.modal(opt);
	
	// bind
	qiao.on('button.bsok', 'click', function(){
		if(func) func();
		$modal.modal('hide');
	});
	qiao.on('#bsmodal', 'hidden.bs.modal', function(){
		$modal.remove();
	});
	
	// show
	$modal.modal('show');
};
qiao.bs.confirm = function(options, ok, cancel){
	// options
	var opt = $.extend({}, qiao.bs.modaloptions);

	opt.title = '确认操作';
	if(typeof options == 'string'){
		opt.msg = options;
	}else{
		$.extend(opt, options);
	}
	opt.btn = true;
	
	// append
	$('body').append(qiao.bs.modalstr(opt));
	
	// init
	var $modal = $('#bsmodal'); 
	$modal.modal(opt);
	
	// bind
	qiao.on('button.bsok', 'click', function(){
		if(ok) ok();
		$modal.modal('hide');
	});
	qiao.on('button.bscancel', 'click', function(){
		if(cancel) cancel();
		$modal.modal('hide');
	});
	qiao.on('#bsmodal', 'hidden.bs.modal', function(){
		$modal.remove();
	});
	
	// show
	$modal.modal('show');
};
qiao.bs.dialog = function(options, func){
	// options
	var opt = $.extend({}, qiao.bs.modaloptions, options);
	opt.big = true;
	
	// append
	$('body').append(qiao.bs.modalstr(opt));
	
	// ajax page
	var html = qiao.ajax({url:options.url, dataType:'html'});
	$('#bsmodal div.modal-body').empty().append(html);
	
	// init
	var $modal = $('#bsmodal'); 
	$modal.modal(opt);
	
	// bind
	qiao.on('button.bsok', 'click', function(){
		var flag = true;
		if(func){
			flag = func();
		}
		
		if(flag){
			$modal.modal('hide');
		}
	});
	qiao.on('#bsmodal', 'hidden.bs.modal', function(){
		$modal.remove();
	});
	
	// show
	$modal.modal('show');
};
qiao.bs.msgoptions = {
	msg  : 'msg',
	type : 'info',
	time : 2000,
	position : 'top',
};
qiao.bs.msgstr = function(msg, type, position){
	return '<div class="alert alert-'+type+' alert-dismissible" role="alert" style="display:none;position:fixed;' + position + ':0;left:0;width:100%;z-index:2001;margin:0;text-align:center;" id="bsalert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>'+msg+'</div>';
};
qiao.bs.msg = function(options){
	var opt = $.extend({},qiao.bs.msgoptions);
	
	if(typeof options == 'string'){
		opt.msg = options;
	}else{
		$.extend(opt, options);
	}
	
	$('body').prepend(qiao.bs.msgstr(opt.msg, opt.type , opt.position));
	$('#bsalert').slideDown();
	setTimeout(function(){
		$('#bsalert').slideUp(function(){
			$('#bsalert').remove();
		});
	},opt.time);
};
qiao.bs.popoptions = {
	animation 	: true,
	container 	: 'body',
	content		: 'content',
	html		: true,
	placement	: 'bottom',
	title		: '',
	trigger		: 'hover'//click | hover | focus | manual.
};
$.fn.bstip = function(options){
	var opt = $.extend({}, qiao.bs.popoptions);
	if(typeof options == 'string'){
		opt.title = options;
	}else{
		$.extend(opt, options);
	}
	
	$(this).data(opt).tooltip();
};
$.fn.bspop = function(options){
	var opt = $.extend({}, qiao.bs.popoptions);
	if(typeof options == 'string'){
		opt.content = options;
	}else{
		$.extend(opt, options);
	}
	
	$(this).popover(opt);
};
qiao.bs.tree = {};
qiao.bs.tree.options = {
	url 	: '/ucenter/menu',
	height 	: '600px',
	open	: true,
	edit	: false,
	checkbox: false,
	showurl	: true
};
$.fn.bstree = function(options){
	var opt = $.extend({}, qiao.bs.tree.options);
	if(options){
		if(typeof options == 'string'){
			opt.url = options;
		}else{
			$.extend(opt, options);
		}
	}
	
	var res = '加载失败！';
	var json = qiao.ajax(opt.url + '/tree');
	if(json && json.object){
		var tree = json.object;
		
		var start = '<div class="panel panel-info"><div class="panel-body" ';
		if(opt.height != 'auto') 
			start += 'style="height:600px;overflow-y:auto;"';
			start += '><ul class="nav nav-list sidenav" id="treeul" data="url:' + opt.url +';">';
		var children = qiao.bs.tree.sub(tree, opt);
		var end = '</ul></div></div>';
		res = start + children + end;
	}
	
	$(this).empty().append(res);
	qiao.bs.tree.init();
};
qiao.bs.tree.sub = function(tree, opt){
	var res = '';
	if(tree){
		var res = 
			'<li>' + 
				'<a href="javascript:void(0);" data="id:' + tree.id + ';url:' + tree.url + ';">' + 
					'<span class="glyphicon glyphicon-minus"></span>';
		if(opt.checkbox){
			res += '<input type="checkbox" class="treecheckbox" ';
			if(tree.checked){
				res += 'checked';
			}
			res += '/>';
		}
			res += tree.text;
		if(opt.showurl){
			res += '(' + tree.url + ')';
		}
		if(opt.edit)
			res += 
				'&nbsp;&nbsp;<span class="label label-primary bstreeadd">添加子菜单</span>' + 
				'&nbsp;&nbsp;<span class="label label-primary bstreeedit">修改</span>' + 
				'&nbsp;&nbsp;<span class="label label-danger  bstreedel">删除</span>';
			res += '</a>';
		var children = tree.children;
		if(children && children.length > 0){
				res += '<ul style="padding-left:20px;" id="treeid_' + tree.id + '" class="nav collapse ';
			if(opt.open) 
				res += 'in';
				res += '">';
			for(var i=0; i<children.length; i++){
				res += qiao.bs.tree.sub(children[i], opt);
			}
				res += '</ul>';
		}
		res += '</li>';
	}
	
	return res;
};
qiao.bs.tree.init = function(){
	qiao.on('#treeul .glyphicon-minus', 'click', function(){
		if($(this).parent().next().length > 0){
			$('#treeid_' + $(this).parents('a').qdata().id).collapse('hide');
			$(this).removeClass('glyphicon-minus').addClass('glyphicon-plus');
		}
	});
	qiao.on('#treeul .glyphicon-plus', 'click', function(){
		if($(this).parent().next().length > 0){
			$('#treeid_' + $(this).parents('a').qdata().id).collapse('show');
			$(this).removeClass('glyphicon-plus').addClass('glyphicon-minus');
		}
	});
	qiao.on('input.treecheckbox', 'change', function(){
		// 检测子级的
		var subFlag = $(this).prop('checked');
		$(this).parent().next().find('input.treecheckbox').each(function(){
			$(this).prop('checked', subFlag);
		});
		
		// 检测父辈的
		var parentFlag = true;
		var $ul = $(this).parent().parent().parent(); 
		$ul.children().each(function(){
			var checked = $(this).children().children('input').prop('checked');
			if(!checked) parentFlag = false;
		});
		$ul.prev().children('input').prop('checked', parentFlag);
	});
	
	qiao.bs.tree.url = $('#treeul').qdata().url;
	if(qiao.bs.tree.url){
		qiao.on('.bstreeadd', 'click', qiao.bs.tree.addp);
		qiao.on('.bstreedel', 'click', qiao.bs.tree.del);
		qiao.on('.bstreeedit', 'click', qiao.bs.tree.editp);
	}
};
qiao.bs.tree.addp = function(){
	qiao.bs.dialog({
		url 	: qiao.bs.tree.url + '/add/' + $(this).parent().qdata().id,
		title 	: '添加子菜单',
		okbtn 	: '保存'
	}, qiao.bs.tree.add);
};
qiao.bs.tree.add = function(){
	var res = qiao.ajax({url:qiao.bs.tree.url + '/save',data:$('#bsmodal').find('form').qser()});
	qiao.bs.msg(res);

	if(res && res.type == 'success'){
		qiao.crud.url = qiao.bs.tree.url;
		qiao.crud.reset();
		return true;
	}else{
		return false;
	}
};
qiao.bs.tree.del = function(){
	var res = qiao.ajax({url:qiao.bs.tree.url + '/del/' + $(this).parent().qdata().id});
	qiao.bs.msg(res);
	
	if(res && res.type == 'success'){
		qiao.crud.url = qiao.bs.tree.url;
		qiao.crud.reset();
	}
};
qiao.bs.tree.editp = function(){
	qiao.bs.dialog({
		url 	: qiao.bs.tree.url + '/savep?id=' + $(this).parent().qdata().id,
		title 	: '修改菜单',
		okbtn 	: '保存'
	}, qiao.bs.tree.edit);
};
qiao.bs.tree.edit = function(){
	qiao.crud.url = qiao.bs.tree.url;
	return qiao.crud.save();
};
qiao.bs.spy = function(target,body){
	var $body = 'body';
	var $target = '.scrolldiv';
	
	if(body) $body = body;
	if(target) $target = target;
	
	$($body).scrollspy({target:$target});
};
qiao.bs.initimg = function(){
	$('img').each(function(){
		var clazz = $(this).attr('class');
		if(clazz){
			if(clazz.indexOf('img-responsive') == -1) $(this).addClass('img-responsive');
		}else{
			$(this).addClass('img-responsive');
		}
	});
};
qiao.bs.bsdateoptions = {
	autoclose: true,
	language : 'zh-CN',
	format: 'yyyy-mm-dd'
};
qiao.bs.bsdate = function(selector, options){
	if(selector){
		var $element = $(selector);
		if($element.length > 0){
			var opt = $.extend({}, qiao.bs.bsdateoptions, options);
			$element.each(function(){
				$(this).datepicker(opt);
			});
		}
	}
};
qiao.bs.bstrooptions = {
	width 	: '500px',
	html 	: 'true',
	nbtext	: '下一步',
	place 	: 'bottom',
	title 	: '网站使用引导',
	content : 'content'
};
qiao.bs.bstroinit = function(selector, options, step){
	if(selector){
		var $element = $(selector);
		if($element.length > 0){
			var opt = $.extend({}, qiao.bs.bstrooptions, options);
			if(typeof options == 'string'){
				opt.content = options;
			}else{
				$.extend(opt, options);
			}
			
			$element.each(function(){
				$(this).attr({
					'data-bootstro-width'			: opt.width, 
					'data-bootstro-title' 			: opt.title, 
					'data-bootstro-html'			: opt.html,
					'data-bootstro-content'			: opt.content, 
					'data-bootstro-placement'		: opt.place,
					'data-bootstro-nextButtonText'	: opt.nbtext,
					'data-bootstro-step'			: step
				}).addClass('bootstro');
			});
		}
	}
};
qiao.bs.bstroopts = {
	prevButtonText : '上一步',
	finishButton : '<button class="btn btn-lg btn-success bootstro-finish-btn"><i class="icon-ok"></i>完成</button>',
	stopOnBackdropClick : false,
	stopOnEsc : false
};
qiao.bs.bstro = function(bss, options){
	if(bss && bss.length > 0){
		for(var i=0; i<bss.length; i++){
			qiao.bs.bstroinit(bss[i][0], bss[i][1], i);
		}
		
		var opt = $.extend({}, qiao.bs.bstroopts);
		if(options){
			if(options.hasOwnProperty('pbtn')){
				opt.prevButtonText = options.pbtn;
			}
			if(options.hasOwnProperty('obtn')){
				if(options.obtn == ''){
					opt.finishButton = '';
				}else{
					opt.finishButton = '<button class="btn btn-mini btn-success bootstro-finish-btn"><i class="icon-ok"></i>'+options.obtn+'</button>';
				}
			}
			if(options.hasOwnProperty('stop')){
				opt.stopOnBackdropClick = options.stop;
				opt.stopOnEsc = options.stop;
			}
			if(options.hasOwnProperty('exit')){
				opt.onExit = options.exit;
			}
		}
		
		bootstro.start('.bootstro', opt);
	}
};
qiao.bs.search = function(selector, options){
	if(!selector || !options || !options.url || !options.make || !options.back) return;
	
	var $this = $(selector);
	var zIndex = options.zIndex || 900;
	var bgColor = options.bgColor || '#fff';
	
	var $table = $('<table class="table table-bordered table-hover" style="position:absolute;display:none;margin-top:10px;width:95%;z-index:' + zIndex + ';background-color:' + bgColor + ';"></table>');
	$this.after($table);
	
	var tid,xhr;
	qiao.on(selector, 'keyup', function(){
		if(tid) clearTimeout(tid);
		if(xhr) xhr.abort();
		tid = setTimeout(function(){
			var code = $this.val();
			if(code){
				xhr = $.ajax({
					url: base + options.url + '?code=' + code,
					type:'get',
					dataType:'json'
				}).done(function(json){
					if(json && json.type == 'success'){
						var codes = json.object;
						if(codes && codes.length > 0){
							$table.empty();
							$.each(codes, function(i, item){
								if(item) $table.append('<tr class="qsearchtr" style="cursor:pointer;" data-id="' + item.id + '"><td>' + options.make(item) + '</td></tr>');
							});
						}
					}
					
					$table.show();
				});
			}
		}, 500);
	});
	
	qiao.on('tr.qsearchtr', 'click', function(){
		options.back($(this).data('id'));
		
		$this.val($(this).find('td').text());
		$table.hide();
	});
};

/**
 * crud相关方法
 * 1.crud
 * 2.index
 */
qiao.crud = {};
qiao.crud.url = '';
qiao.crud.init = function(){
	// menu click
	qiao.on('.menus', 'click', function(){
		var url = $(this).qdata().url;
		if(url){
			qiao.crud.url = url;
			qiao.crud.reset();
		}
	});
	qiao.crud.bindcrud();
	qiao.crud.bindpage();
};
qiao.crud.bindcrud = function(){
	qiao.on('.allcheck','change', function(){$('.onecheck').prop('checked',$(this).prop('checked'));});
	qiao.on('.addBtn', 'click', function(){qiao.crud.savep('添加')});
	qiao.on('.editbtn','click', function(){qiao.crud.savep('修改',$(this).parents('tr').qdata().id)});
	qiao.on('.queBtn', 'click', function(){qiao.crud.savep('查询')});
	qiao.on('.relBtn', 'click', function(){qiao.crud.reset();});
	qiao.on('.delBtn', 'click', function(){qiao.crud.del();});
	qiao.on('.delbtn', 'click', function(){qiao.crud.del($(this).parents('tr').qdata().id);});
};
qiao.crud.listopt = {pageNumber:1,pageSize:10};
qiao.crud.list = function(data){
	var opt = {url : qiao.crud.url + '/index'};
	if(data) $.extend(qiao.crud.listopt, data);
	opt.data = qiao.crud.listopt;
	
	qiao.html(opt);
};
qiao.crud.reset = function(){
	qiao.crud.listopt = {pageNumber:1,pageSize:10};
	qiao.crud.list();
};
qiao.crud.savep = function(title, id){
	if(title == '查询'){
		qiao.bs.dialog({title:title,url:qiao.crud.url + '/savep'}, function(){
			qiao.crud.list($('#bsmodal').find('form').qser());
			return true;
		});
	}else{
		var url = id ? (qiao.crud.url + '/savep?id=' + id) : (qiao.crud.url + '/savep');
		qiao.bs.dialog({title:title,url:url}, function(){
			return qiao.crud.save();
		});
	}
};
qiao.crud.save = function(){
	var res = qiao.ajax({url:qiao.crud.url+'/save',data:$('#bsmodal').find('form').qser()});
	qiao.bs.msg(res);

	if(res && res.type == 'success'){
		qiao.crud.list();
		return true;
	}else{
		return false;
	}
};
qiao.crud.del = function(id){
	var ids = [];
	
	if(id){
		ids.push(id);
	}else{
		$('.onecheck:checked').each(function(){ids.push($(this).parents('tr').qdata().id);});
	}
	
	if(!ids.length){
		qiao.bs.alert('请选择要删除的记录！');
	}else{
		qiao.bs.confirm('确认要删除所选记录吗（若有子记录也会同时删除）？',function(){
			var res = qiao.ajax({url:qiao.crud.url+'/del',data:{ids:ids.join(',')}});
			qiao.bs.msg(res);
			qiao.crud.list();
		});
	}
};
qiao.crud.bindpage = function(){
	qiao.on('.crudfirst', 'click', function(){
		if(!$(this).parent().hasClass('disabled')){
			qiao.crud.reset();
		}
	});
	qiao.on('.crudprev', 'click', function(){
		if(!$(this).parent().hasClass('disabled')){
			qiao.crud.list({pageNumber:qiao.crud.listopt.pageNumber - 1});
		}
	});
	qiao.on('.crudnext', 'click', function(){
		if(!$(this).parent().hasClass('disabled')){
			qiao.crud.list({pageNumber:qiao.crud.listopt.pageNumber + 1});
		}
	});
	qiao.on('.crudlast', 'click', function(){
		if(!$(this).parent().hasClass('disabled')){
			qiao.crud.list({pageNumber:$(this).qdata().page});
		}
	});
	qiao.on('.cruda', 'click', function(){
		if(!$(this).parent().hasClass('disabled')){
			qiao.crud.list({pageNumber:parseInt($(this).text())});
		}
	});
	qiao.on('.pagesize', 'change', function(){
		var value = $(this).val();
		if(value){
			qiao.crud.listopt.pageSize = value;
		}
		
		qiao.crud.list({pageSize:value});
	});
};

/**
 * 业务相关代码
 * 1.用户注册
 * 2.用户登录
 * 3.修改密码
 * 4.角色管理
 */
qiao.reg = {};
qiao.reg.init = function(){
	qiao.on('.regbtn', 'click', qiao.reg.reg);
};
qiao.reg.reg = function(){
	var $form = $('.regform');
	var $h5 = $form.find('h5');
	
	var res = qiao.ajax({
		url : '/reg/reg',
		data : $form.qser()
	});
	
	if(res){
		$h5.text(res.msg);
	}else{
		$h5.text('ajax fail');
	}
};
qiao.login = {};
qiao.login.init = function(options){
	qiao.on('.loginbtn', 'click', qiao.login.login);
	qiao.on('.loginform', 'keydown', function(e){if(e.keyCode == 13) qiao.login.login();});
};
qiao.login.show = function(){
	qiao.bs.dialog({
		url 	: '/login',
		title 	: '登录',
		head	: false,
		foot	: false,
		backdrop: true,
		mstyle	: 'width:300px;margin:40px auto;'
	});
};
qiao.login.login = function(){
	var $form = $('.loginform');
	var $h5 = $form.find('h5');
	
	var res = qiao.ajax({
		url : '/login/login',
		data : $form.qser()
	});
	
	if(res){
		if(res.type == 'success'){
			$h5.text('登录成功，正在跳转。。。');
			if(res.msg == '/'){
				location.reload(true);
			}else{
				qiao.to(base + res.msg);
			}
		}else{
			$h5.text(res.msg);
		}
	}else{
		$h5.text('ajax fail');
	}
};
qiao.modifyNickname = {};
qiao.modifyNickname.init = function(){
	qiao.on('.modifyNickname', 'click', qiao.modifyNickname.modifyNicknamep);
};
qiao.modifyNickname.modifyNicknamep = function(){
	qiao.bs.dialog({
		url : '/login/modifyNicknamep',
		title : '修改昵称',
		okbtn : '修改'
	}, qiao.modifyNickname.modifyNickname);
};
qiao.modifyNickname.modifyNickname = function(){
	var newname = $.trim($('input[name="newname"]').val());
	if(!newname){
		qiao.bs.msg({msg:'请输入新昵称！',type:'danger'});
		return false;
	}else{
		var res = qiao.ajax({url:'/login/modifyNickname',data:{nickname:newname}});
		qiao.bs.msg(res);
		if(res && res.type == 'success'){
			setTimeout(function(){
				qiao.to(base + '/login/logout');
			}, 1000);
		}
		return false;
	}
};
qiao.modifypwd = {};
qiao.modifypwd.init = function(){
	qiao.on('.modifyPwd', 'click', qiao.modifypwd.modifypwdp);
};
qiao.modifypwd.modifypwdp = function(){
	qiao.bs.dialog({
		url : '/login/modifyPwdp',
		title : '修改密码',
		okbtn : '修改'
	}, qiao.modifypwd.modifypwd);
};
qiao.modifypwd.modifypwd = function(){
	var newpwd = $.trim($('input[name="newpwd"]').val());
	if(!newpwd){
		qiao.bs.msg({msg:'请输入新密码！',type:'danger'});
		return false;
	}else{
		var res = qiao.ajax({url:'/login/modifyPwd',data:{password:newpwd}});
		qiao.bs.msg(res);
		if(res && res.type == 'success'){
			setTimeout(function(){
				qiao.to(base + '/login/logout');
			}, 1000);
		}
		return false;
	}
};
qiao.role = {};
qiao.role.init = function(){
	qiao.on('.roleadduserbtn',	'click', qiao.role.setuser);
	qiao.on('.roleaddurlbtn', 	'click', qiao.role.seturl);
	qiao.on('.mytr',			'click', function(){$(this).toggleClass('info');});
};
qiao.role.setuser = function(){
	var id = $(this).parents('tr').qdata().id;
	qiao.bs.dialog({
		url : '/ucenter/role/setUser/' + id,
		title : '设置用户',
		okbtn : '关闭'
	});
};
qiao.role.addUser = function(){
	var ids = [];
	$('tr.outtr').each(function(){if($(this).hasClass('info')) ids.push($(this).attr('data'));});
	
	var res = qiao.ajax({url:'/ucenter/role/addUser',data:{userids:ids.join(','),roleid:$('input[name="roleid"]').val()}});
	if(res && res.type == 'success'){
		$('tr.outtr').each(function(){if($(this).hasClass('info')) $(this).removeClass('outtr').addClass('intr').prependTo('table.intable');});
	}else{
		qiao.bs.msg(res);
	}
};
qiao.role.removeUser = function(){
	var ids = [];
	$('tr.intr').each(function(){if($(this).hasClass('info')) ids.push($(this).attr('data'));});
	
	var res = qiao.ajax({url:'/ucenter/role/removeUser',data:{rlids:ids.join(','),roleid:$('input[name="roleid"]').val()}});
	if(res && res.type == 'success'){
		$('tr.intr').each(function(){if($(this).hasClass('info')) $(this).removeClass('intr').addClass('outtr').prependTo('table.outtable');});
	}else{
		qiao.bs.msg(res);
	}
};
qiao.role.seturl = function(){
	var id = $(this).parents('tr').qdata().id;
	qiao.bs.dialog({
		url : '/ucenter/role/setUrl/' + id,
		title : '设置Url',
		okbtn : '保存'
	}, qiao.role.addUrl);
};
qiao.role.addUrl = function(){
	var ids = [];
	$('#treeul input:checked').each(function(){ids.push($(this).parent().qdata().id);});
	var res = qiao.ajax({url:'/ucenter/role/saveUrl',data:{ids:ids.join(','),roleid:$('input[name="roleid"]').val()}});
	
	if(res && res.type == 'success'){
		return true;
	}else{
		qiao.bs.msg(res);
		return false;
	}
};
qiao.role.removeUrl = function(){
	var urls = [];
	$('tr.intr').each(function(){if($(this).hasClass('info')) urls.push($(this).attr('data'));});
	
	var res = qiao.ajax({url:'/ucenter/role/removeUrl',data:{urls:urls.join(','),roleid:$('input[name="roleid"]').val()}});
	if(res && res.type == 'success'){
		$('tr.intr').each(function(){if($(this).hasClass('info')) $(this).removeClass('intr').addClass('outtr').prependTo('table.outtable');});
	}else{
		qiao.bs.msg(res);
	}
};