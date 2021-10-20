try{(function ($) {
	'use strict';

	/**
	 * All of the code for your public-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */

	 $(document).ready(function () {

		$('.es_subscription_form').each(function(){
			// For the forms which are hidden on page load, we need to use AJAX to handle their submission.
			if ( $(this).is(':hidden') ) {
				$(this).on('submit', function(e){
					e.preventDefault();
					var form = $(this);
					handleBindFunction(form);
				});
			}
		});

	});

	function prepareFormData(form, formData) {
		var list_ids = [];
		var is_multiple_lists = false;
		jQuery.each((form.serializeArray() || {}), function (i, field) {
			// Collect all list ids
			if(field.name === 'esfpx_lists[]') {
				list_ids.push(field.value);
				is_multiple_lists = true;
			} else {
				formData[field.name] = field.value;
			}
		});

		if(is_multiple_lists) {
			formData['esfpx_lists[]'] = list_ids;
		}


		return formData;
	}

	function handleResponse(response, form) {

		var status = response.status;

		var message_class = 'success';
		if(status === 'ERROR') {
			message_class = 'error';
		}

		var responseText = response['message_text'];
		var messageContainer = $(form).next('.es_subscription_message');
		messageContainer.attr('class', 'es_subscription_message ' + message_class);
		messageContainer.html(responseText);
		var esSuccessEvent = { 
								detail: { 
											es_response : message_class, 
											msg: responseText
										}, 
								bubbles: true, 
								cancelable: true 
							} ;

		jQuery(form).trigger('es_response', [ esSuccessEvent ]);
	}

	function handleBindFunction(form, is_ig){
		var is_ig = is_ig || false;
		var formData = {};
		formData = prepareFormData(form, formData);
		formData['es'] = 'subscribe';
		formData['action'] = 'es_add_subscriber';
		var actionUrl = es_data.es_ajax_url;
		jQuery(form).find('#spinner-image').show();
		$.ajax({
			type: 'POST',
			url: actionUrl,
			data: formData,
			dataType: 'json',
			success: function (response) {
				if(!is_ig){
					if( response && typeof response.status !== 'undefined' && response.status === "SUCCESS" ) {
						jQuery(form).slideUp('slow');
						jQuery(form).hide();
					} else {
						jQuery(form).find('#spinner-image').hide();
					}
				}
				jQuery(window).trigger('es.send_response', [jQuery(form) , response]);
				handleResponse(response, form);
			},
			error: function (err) {
				jQuery(form).find('#spinner-image').hide();
				console.log(err, 'error');
			},
		});


		return false;
	}
	
	// Compatibility of ES with IG
	jQuery( window ).on( "init.icegram", function(e, ig) {
		if(typeof ig !== 'undefined' && typeof ig.messages !== 'undefined' ) {
			jQuery('.icegram .es_shortcode_form, .icegram form[data-source="ig-es"]').each(function(i, v){
				jQuery(v).bind('submit', function (e) {
					e.preventDefault();
					var form = $(this);
					handleBindFunction(form, true);
				});
			});
		}
	});
	
})(jQuery)}catch(e){console.log(e)}try{!function(t,e,i){function n(t,i){var n=e(t);n.data(r,this),this._container=n,this.data=[],this.fields=[],this._editingRow=null,this._sortField=null,this._sortOrder=o,this._firstDisplayingPage=1,this._init(i),this.render()}var r="JSGrid",a="JSGridItem",s="JSGridEditRow",o="asc",l=function(t,i){return e.isFunction(t)?t.apply(i,e.makeArray(arguments).slice(2)):t},d=function(t){var i=e.Deferred();return t&&t.then?t.then(function(){i.resolve.apply(i,arguments)},function(){i.reject.apply(i,arguments)}):i.resolve(t),i.promise()},u={loadData:e.noop,insertItem:e.noop,updateItem:e.noop,deleteItem:e.noop};n.prototype={width:"auto",height:"auto",updateOnResize:!0,rowClass:e.noop,rowRenderer:null,rowClick:function(t){this.editing&&this.editItem(e(t.event.target).closest("tr"))},rowDoubleClick:e.noop,noDataContent:"Not found",noDataRowClass:"jsgrid-nodata-row",heading:!0,headerRowRenderer:null,headerRowClass:"jsgrid-header-row",headerCellClass:"jsgrid-header-cell",filtering:!1,filterRowRenderer:null,filterRowClass:"jsgrid-filter-row",inserting:!1,insertRowRenderer:null,insertRowClass:"jsgrid-insert-row",editing:!1,editRowRenderer:null,editRowClass:"jsgrid-edit-row",confirmDeleting:!0,deleteConfirm:"Are you sure?",selecting:!0,selectedRowClass:"jsgrid-selected-row",oddRowClass:"jsgrid-row",evenRowClass:"jsgrid-alt-row",cellClass:"jsgrid-cell",sorting:!1,sortableClass:"jsgrid-header-sortable",sortAscClass:"jsgrid-header-sort jsgrid-header-sort-asc",sortDescClass:"jsgrid-header-sort jsgrid-header-sort-desc",paging:!1,pagerContainer:null,pageIndex:1,pageSize:20,pageButtonCount:15,pagerFormat:"Pages: {first} {prev} {pages} {next} {last} &nbsp;&nbsp; {pageIndex} of {pageCount}",pagePrevText:"Prev",pageNextText:"Next",pageFirstText:"First",pageLastText:"Last",pageNavigatorNextText:"...",pageNavigatorPrevText:"...",pagerContainerClass:"jsgrid-pager-container",pagerClass:"jsgrid-pager",pagerNavButtonClass:"jsgrid-pager-nav-button",pagerNavButtonInactiveClass:"jsgrid-pager-nav-inactive-button",pageClass:"jsgrid-pager-page",currentPageClass:"jsgrid-pager-current-page",customLoading:!1,pageLoading:!1,autoload:!1,controller:u,loadIndication:!0,loadIndicationDelay:500,loadMessage:"Please, wait...",loadShading:!0,invalidMessage:"Invalid data entered!",invalidNotify:function(i){var n=e.map(i.errors,function(t){return t.message||null});t.alert([this.invalidMessage].concat(n).join("\n"))},onInit:e.noop,onRefreshing:e.noop,onRefreshed:e.noop,onPageChanged:e.noop,onItemDeleting:e.noop,onItemDeleted:e.noop,onItemInserting:e.noop,onItemInserted:e.noop,onItemEditing:e.noop,onItemUpdating:e.noop,onItemUpdated:e.noop,onItemInvalid:e.noop,onDataLoading:e.noop,onDataLoaded:e.noop,onOptionChanging:e.noop,onOptionChanged:e.noop,onError:e.noop,invalidClass:"jsgrid-invalid",containerClass:"jsgrid",tableClass:"jsgrid-table",gridHeaderClass:"jsgrid-grid-header",gridBodyClass:"jsgrid-grid-body",_init:function(t){e.extend(this,t),this._initLoadStrategy(),this._initController(),this._initFields(),this._attachWindowLoadResize(),this._attachWindowResizeCallback(),this._callEventHandler(this.onInit)},loadStrategy:function(){return this.pageLoading?new jsGrid.loadStrategies.PageLoadingStrategy(this):new jsGrid.loadStrategies.DirectLoadingStrategy(this)},_initLoadStrategy:function(){this._loadStrategy=l(this.loadStrategy,this)},_initController:function(){this._controller=e.extend({},u,l(this.controller,this))},renderTemplate:function(t,e,n){args=[];for(var r in n)args.push(n[r]);return args.unshift(t,e),(t=l.apply(null,args))===i||null===t?"":t},loadIndicator:function(t){return new jsGrid.LoadIndicator(t)},validation:function(t){return jsGrid.Validation&&new jsGrid.Validation(t)},_initFields:function(){var t=this;t.fields=e.map(t.fields,function(i){return e.isPlainObject(i)&&(i=new(i.type&&jsGrid.fields[i.type]||jsGrid.Field)(i)),i._grid=t,i})},_attachWindowLoadResize:function(){e(t).on("load",e.proxy(this._refreshSize,this))},_attachWindowResizeCallback:function(){this.updateOnResize&&e(t).on("resize",e.proxy(this._refreshSize,this))},_detachWindowResizeCallback:function(){e(t).off("resize",this._refreshSize)},option:function(t,e){var i,n;return 1===arguments.length?this[t]:(i={option:t,oldValue:this[t],newValue:e},this._callEventHandler(this.onOptionChanging,i),this._handleOptionChange(i.option,i.newValue),n={option:i.option,value:i.newValue},void this._callEventHandler(this.onOptionChanged,n))},fieldOption:function(t,e,i){return t=this._normalizeField(t),2===arguments.length?t[e]:(t[e]=i,void this._renderGrid())},_handleOptionChange:function(t,e){switch(this[t]=e,t){case"width":case"height":this._refreshSize();break;case"rowClass":case"rowRenderer":case"rowClick":case"rowDoubleClick":case"noDataRowClass":case"noDataContent":case"selecting":case"selectedRowClass":case"oddRowClass":case"evenRowClass":this._refreshContent();break;case"pageButtonCount":case"pagerFormat":case"pagePrevText":case"pageNextText":case"pageFirstText":case"pageLastText":case"pageNavigatorNextText":case"pageNavigatorPrevText":case"pagerClass":case"pagerNavButtonClass":case"pageClass":case"currentPageClass":case"pagerRenderer":this._refreshPager();break;case"fields":this._initFields(),this.render();break;case"data":case"editing":case"heading":case"filtering":case"inserting":case"paging":this.refresh();break;case"loadStrategy":case"pageLoading":this._initLoadStrategy(),this.search();break;case"pageIndex":this.openPage(e);break;case"pageSize":this.refresh(),this.search();break;case"editRowRenderer":case"editRowClass":this.cancelEdit();break;case"updateOnResize":this._detachWindowResizeCallback(),this._attachWindowResizeCallback();break;case"invalidNotify":case"invalidMessage":break;default:this.render()}},destroy:function(){this._detachWindowResizeCallback(),this._clear(),this._container.removeData(r)},render:function(){return this._renderGrid(),this.autoload?this.loadData():e.Deferred().resolve().promise()},_renderGrid:function(){this._clear(),this._container.addClass(this.containerClass).css("position","relative").append(this._createHeader()).append(this._createBody()),this._pagerContainer=this._createPagerContainer(),this._loadIndicator=this._createLoadIndicator(),this._validation=this._createValidation(),this.refresh()},_createLoadIndicator:function(){return l(this.loadIndicator,this,{message:this.loadMessage,shading:this.loadShading,container:this._container})},_createValidation:function(){return l(this.validation,this)},_clear:function(){this.cancelEdit(),clearTimeout(this._loadingTimer),this._pagerContainer&&this._pagerContainer.empty(),this._container.empty().css({position:"",width:"",height:""})},_createHeader:function(){var t=this._headerRow=this._createHeaderRow(),i=this._filterRow=this._createFilterRow(),n=this._insertRow=this._createInsertRow(),r=this._headerGrid=e("<table>").addClass(this.tableClass).append(t).append(i).append(n);return this._header=e("<div>").addClass(this.gridHeaderClass).addClass(this._scrollBarWidth()?"jsgrid-header-scrollbar":"").append(r)},_createBody:function(){var t=this._content=e("<tbody>"),i=this._bodyGrid=e("<table>").addClass(this.tableClass).append(t);return this._body=e("<div>").addClass(this.gridBodyClass).append(i).on("scroll",e.proxy(function(t){this._header.scrollLeft(t.target.scrollLeft)},this))},_createPagerContainer:function(){var t=this.pagerContainer||e("<div>").appendTo(this._container);return e(t).addClass(this.pagerContainerClass)},_eachField:function(t){var i=this;e.each(this.fields,function(e,n){n.visible&&t.call(i,n,e)})},_createHeaderRow:function(){if(e.isFunction(this.headerRowRenderer))return e(this.renderTemplate(this.headerRowRenderer,this));var t=e("<tr>").addClass(this.headerRowClass);return this._eachField(function(i,n){var r=this._prepareCell("<th>",i,"headercss",this.headerCellClass).append(this.renderTemplate(i.headerTemplate,i)).appendTo(t);this.sorting&&i.sorting&&r.addClass(this.sortableClass).on("click",e.proxy(function(){this.sort(n)},this))}),t},_prepareCell:function(t,i,n,r){return e(t).css("width",i.width).addClass(r||this.cellClass).addClass(n&&i[n]||i.css).addClass(i.align?"jsgrid-align-"+i.align:"")},_createFilterRow:function(){if(e.isFunction(this.filterRowRenderer))return e(this.renderTemplate(this.filterRowRenderer,this));var t=e("<tr>").addClass(this.filterRowClass);return this._eachField(function(e){this._prepareCell("<td>",e,"filtercss").append(this.renderTemplate(e.filterTemplate,e)).appendTo(t)}),t},_createInsertRow:function(){if(e.isFunction(this.insertRowRenderer))return e(this.renderTemplate(this.insertRowRenderer,this));var t=e("<tr>").addClass(this.insertRowClass);return this._eachField(function(e){this._prepareCell("<td>",e,"insertcss").append(this.renderTemplate(e.insertTemplate,e)).appendTo(t)}),t},_callEventHandler:function(t,i){return t.call(this,e.extend(i,{grid:this})),i},reset:function(){return this._resetSorting(),this._resetPager(),this._loadStrategy.reset()},_resetPager:function(){this._firstDisplayingPage=1,this._setPage(1)},_resetSorting:function(){this._sortField=null,this._sortOrder=o,this._clearSortingCss()},refresh:function(){this._callEventHandler(this.onRefreshing),this.cancelEdit(),this._refreshHeading(),this._refreshFiltering(),this._refreshInserting(),this._refreshContent(),this._refreshPager(),this._refreshSize(),this._callEventHandler(this.onRefreshed)},_refreshHeading:function(){this._headerRow.toggle(this.heading)},_refreshFiltering:function(){this._filterRow.toggle(this.filtering)},_refreshInserting:function(){this._insertRow.toggle(this.inserting)},_refreshContent:function(){var t=this._content;if(t.empty(),!this.data.length)return t.append(this._createNoDataRow()),this;for(var e=this._loadStrategy.firstDisplayIndex(),i=this._loadStrategy.lastDisplayIndex(),n=e;i>n;n++){var r=this.data[n];t.append(this._createRow(r,n))}},_createNoDataRow:function(){var t=0;return this._eachField(function(){t++}),e("<tr>").addClass(this.noDataRowClass).append(e("<td>").addClass(this.cellClass).attr("colspan",t).append(this.renderTemplate(this.noDataContent,this)))},_createRow:function(t,i){var n;return e.isFunction(this.rowRenderer)?n=this.renderTemplate(this.rowRenderer,this,{item:t,itemIndex:i}):(n=e("<tr>"),this._renderCells(n,t)),n.addClass(this._getRowClasses(t,i)).data(a,t).on("click",e.proxy(function(e){this.rowClick({item:t,itemIndex:i,event:e})},this)).on("dblclick",e.proxy(function(e){this.rowDoubleClick({item:t,itemIndex:i,event:e})},this)),this.selecting&&this._attachRowHover(n),n},_getRowClasses:function(t,e){var i=[];return i.push((e+1)%2?this.oddRowClass:this.evenRowClass),i.push(l(this.rowClass,this,t,e)),i.join(" ")},_attachRowHover:function(t){var i=this.selectedRowClass;t.hover(function(){e(this).addClass(i)},function(){e(this).removeClass(i)})},_renderCells:function(t,e){return this._eachField(function(i){t.append(this._createCell(e,i))}),this},_createCell:function(t,i){var n,r=this._getItemFieldValue(t,i),a={value:r,item:t};return n=e.isFunction(i.cellRenderer)?this.renderTemplate(i.cellRenderer,i,a):e("<td>").append(this.renderTemplate(i.itemTemplate||r,i,a)),this._prepareCell(n,i)},_getItemFieldValue:function(t,e){for(var i=e.name.split("."),n=t[i.shift()];n&&i.length;)n=n[i.shift()];return n},_setItemFieldValue:function(t,e,i){for(var n=e.name.split("."),r=t,a=n[0];r&&n.length;)t=r,a=n.shift(),r=t[a];if(!r)for(;n.length;)t=t[a]={},a=n.shift();t[a]=i},sort:function(t,i){return e.isPlainObject(t)&&(i=t.order,t=t.field),this._clearSortingCss(),this._setSortingParams(t,i),this._setSortingCss(),this._loadStrategy.sort()},_clearSortingCss:function(){this._headerRow.find("th").removeClass(this.sortAscClass).removeClass(this.sortDescClass)},_setSortingParams:function(t,e){t=this._normalizeField(t),e=e||(this._sortField===t?this._reversedSortOrder(this._sortOrder):o),this._sortField=t,this._sortOrder=e},_normalizeField:function(t){return e.isNumeric(t)?this.fields[t]:"string"==typeof t?e.grep(this.fields,function(e){return e.name===t})[0]:t},_reversedSortOrder:function(t){return t===o?"desc":o},_setSortingCss:function(){var t=this._visibleFieldIndex(this._sortField);this._headerRow.find("th").eq(t).addClass(this._sortOrder===o?this.sortAscClass:this.sortDescClass)},_visibleFieldIndex:function(t){return e.inArray(t,e.grep(this.fields,function(t){return t.visible}))},_sortData:function(){var t=this._sortFactor(),e=this._sortField;e&&this.data.sort(function(i,n){return t*e.sortingFunc(i[e.name],n[e.name])})},_sortFactor:function(){return this._sortOrder===o?1:-1},_itemsCount:function(){return this._loadStrategy.itemsCount()},_pagesCount:function(){var t=this._itemsCount(),e=this.pageSize;return Math.floor(t/e)+(t%e?1:0)},_refreshPager:function(){var t=this._pagerContainer;t.empty(),this.paging&&t.append(this._createPager());var e=this.paging&&this._pagesCount()>1;t.toggle(e)},_createPager:function(){var t;return(t=e.isFunction(this.pagerRenderer)?e(this.pagerRenderer({pageIndex:this.pageIndex,pageCount:this._pagesCount()})):e("<div>").append(this._createPagerByFormat())).addClass(this.pagerClass),t},_createPagerByFormat:function(){var t=this.pageIndex,i=this._pagesCount(),n=this._itemsCount(),r=this.pagerFormat.split(" ");return e.map(r,e.proxy(function(r){var a=r;return"{pages}"===r?a=this._createPages():"{first}"===r?a=this._createPagerNavButton(this.pageFirstText,1,t>1):"{prev}"===r?a=this._createPagerNavButton(this.pagePrevText,t-1,t>1):"{next}"===r?a=this._createPagerNavButton(this.pageNextText,t+1,i>t):"{last}"===r?a=this._createPagerNavButton(this.pageLastText,i,i>t):"{pageIndex}"===r?a=t:"{pageCount}"===r?a=i:"{itemCount}"===r&&(a=n),e.isArray(a)?a.concat([" "]):[a," "]},this))},_createPages:function(){var t=this._pagesCount(),e=this.pageButtonCount,i=this._firstDisplayingPage,n=[];i>1&&n.push(this._createPagerPageNavButton(this.pageNavigatorPrevText,this.showPrevPages));for(var r=0,a=i;e>r&&t>=a;r++,a++)n.push(a===this.pageIndex?this._createPagerCurrentPage():this._createPagerPage(a));return t>i+e-1&&n.push(this._createPagerPageNavButton(this.pageNavigatorNextText,this.showNextPages)),n},_createPagerNavButton:function(t,i,n){return this._createPagerButton(t,this.pagerNavButtonClass+(n?"":" "+this.pagerNavButtonInactiveClass),n?function(){this.openPage(i)}:e.noop)},_createPagerPageNavButton:function(t,e){return this._createPagerButton(t,this.pagerNavButtonClass,e)},_createPagerPage:function(t){return this._createPagerButton(t,this.pageClass,function(){this.openPage(t)})},_createPagerButton:function(t,i,n){var r=e("<a>").attr("href","javascript:void(0);").html(t).on("click",e.proxy(n,this));return e("<span>").addClass(i).append(r)},_createPagerCurrentPage:function(){return e("<span>").addClass(this.pageClass).addClass(this.currentPageClass).text(this.pageIndex)},_refreshSize:function(){this._refreshHeight(),this._refreshWidth()},_refreshWidth:function(){var t="auto"===this.width?this._getAutoWidth():this.width;this._container.width(t)},_getAutoWidth:function(){var t=this._headerGrid,e=this._header;t.width("auto");var i=t.outerWidth(),n=e.outerWidth()-e.innerWidth();return t.width(""),i+n},_scrollBarWidth:function(){var t;return function(){if(t===i){var n=e("<div style='width:50px;height:50px;overflow:hidden;position:absolute;top:-10000px;left:-10000px;'></div>"),r=e("<div style='height:100px;'></div>");n.append(r).appendTo("body");var a=r.innerWidth();n.css("overflow-y","auto");var s=r.innerWidth();n.remove(),t=a-s}return t}}(),_refreshHeight:function(){var t,e=this._container,i=this._pagerContainer,n=this.height;e.height(n),"auto"!==n&&(n=e.height(),t=this._header.outerHeight(!0),i.parents(e).length&&(t+=i.outerHeight(!0)),this._body.outerHeight(n-t))},showPrevPages:function(){var t=this._firstDisplayingPage,e=this.pageButtonCount;this._firstDisplayingPage=t>e?t-e:1,this._refreshPager()},showNextPages:function(){var t=this._firstDisplayingPage,e=this.pageButtonCount,i=this._pagesCount();this._firstDisplayingPage=t+2*e>i?i-e+1:t+e,this._refreshPager()},openPage:function(t){1>t||t>this._pagesCount()||(this._setPage(t),this._loadStrategy.openPage(t))},_setPage:function(t){var e=this._firstDisplayingPage,i=this.pageButtonCount;this.pageIndex=t,e>t&&(this._firstDisplayingPage=t),t>e+i-1&&(this._firstDisplayingPage=t-i+1),this._callEventHandler(this.onPageChanged,{pageIndex:t})},_controllerCall:function(t,i,n,r){if(n)return e.Deferred().reject().promise();this._showLoading();var a=this._controller;if(!a||!a[t])throw Error("controller has no method '"+t+"'");return d(a[t](i)).done(e.proxy(r,this)).fail(e.proxy(this._errorHandler,this)).always(e.proxy(this._hideLoading,this))},_errorHandler:function(){this._callEventHandler(this.onError,{args:e.makeArray(arguments)})},_showLoading:function(){this.loadIndication&&(clearTimeout(this._loadingTimer),this._loadingTimer=setTimeout(e.proxy(function(){this._loadIndicator.show()},this),this.loadIndicationDelay))},_hideLoading:function(){this.loadIndication&&(clearTimeout(this._loadingTimer),this._loadIndicator.hide())},search:function(t){return this._resetSorting(),this._resetPager(),this.loadData(t)},loadData:function(t){t=t||(this.filtering?this.getFilter():{}),e.extend(t,this._loadStrategy.loadParams(),this._sortingParams());var i=this._callEventHandler(this.onDataLoading,{filter:t});return this._controllerCall("loadData",t,i.cancel,function(t){t&&(this._loadStrategy.finishLoad(t),this._callEventHandler(this.onDataLoaded,{data:t}))})},getFilter:function(){var t={};return this._eachField(function(e){e.filtering&&this._setItemFieldValue(t,e,e.filterValue())}),t},_sortingParams:function(){return this.sorting&&this._sortField?{sortField:this._sortField.name,sortOrder:this._sortOrder}:{}},getSorting:function(){var t=this._sortingParams();return{field:t.sortField,order:t.sortOrder}},clearFilter:function(){var t=this._createFilterRow();return this._filterRow.replaceWith(t),this._filterRow=t,this.search()},insertItem:function(t){var i=t||this._getValidatedInsertItem();if(!i)return e.Deferred().reject().promise();var n=this._callEventHandler(this.onItemInserting,{item:i});return this._controllerCall("insertItem",i,n.cancel,function(t){t=t||i,this._loadStrategy.finishInsert(t),this._callEventHandler(this.onItemInserted,{item:t})})},_getValidatedInsertItem:function(){var t=this._getInsertItem();return this._validateItem(t,this._insertRow)?t:null},_getInsertItem:function(){var t={};return this._eachField(function(e){e.inserting&&this._setItemFieldValue(t,e,e.insertValue())}),t},_validateItem:function(t,i){var n=[],r={item:t,itemIndex:this._rowIndex(i),row:i};if(this._eachField(function(a){if(a.validate&&(i!==this._insertRow||a.inserting)&&(i!==this._getEditRow()||a.editing)){var s=this._getItemFieldValue(t,a),o=this._validation.validate(e.extend({value:s,rules:a.validate},r));this._setCellValidity(i.children().eq(this._visibleFieldIndex(a)),o),o.length&&n.push.apply(n,e.map(o,function(t){return{field:a,message:t}}))}}),!n.length)return!0;var a=e.extend({errors:n},r);return this._callEventHandler(this.onItemInvalid,a),this.invalidNotify(a),!1},_setCellValidity:function(t,e){t.toggleClass(this.invalidClass,!!e.length).attr("title",e.join("\n"))},clearInsert:function(){var t=this._createInsertRow();this._insertRow.replaceWith(t),this._insertRow=t,this.refresh()},editItem:function(t){var e=this.rowByItem(t);e.length&&this._editRow(e)},rowByItem:function(t){return t.jquery||t.nodeType?e(t):this._content.find("tr").filter(function(){return e.data(this,a)===t})},_editRow:function(t){if(this.editing){var e=t.data(a);if(!this._callEventHandler(this.onItemEditing,{row:t,item:e,itemIndex:this._itemIndex(e)}).cancel){this._editingRow&&this.cancelEdit();var i=this._createEditRow(e);this._editingRow=t,t.hide(),i.insertBefore(t),t.data(s,i)}}},_createEditRow:function(t){if(e.isFunction(this.editRowRenderer))return e(this.renderTemplate(this.editRowRenderer,this,{item:t,itemIndex:this._itemIndex(t)}));var i=e("<tr>").addClass(this.editRowClass);return this._eachField(function(e){var n=this._getItemFieldValue(t,e);this._prepareCell("<td>",e,"editcss").append(this.renderTemplate(e.editTemplate||"",e,{value:n,item:t})).appendTo(i)}),i},updateItem:function(t,e){1===arguments.length&&(e=t);var i=t?this.rowByItem(t):this._editingRow;return(e=e||this._getValidatedEditedItem())?this._updateRow(i,e):void 0},_getValidatedEditedItem:function(){var t=this._getEditedItem();return this._validateItem(t,this._getEditRow())?t:null},_updateRow:function(t,i){var n=t.data(a),r=this._itemIndex(n),s=e.extend(!0,{},n,i),o=this._callEventHandler(this.onItemUpdating,{row:t,item:s,itemIndex:r,previousItem:n});return this._controllerCall("updateItem",s,o.cancel,function(a){var o=e.extend(!0,{},n);s=a||e.extend(!0,n,i);var l=this._finishUpdate(t,s,r);this._callEventHandler(this.onItemUpdated,{row:l,item:s,itemIndex:r,previousItem:o})})},_rowIndex:function(t){return this._content.children().index(e(t))},_itemIndex:function(t){return e.inArray(t,this.data)},_finishUpdate:function(t,e,i){this.cancelEdit(),this.data[i]=e;var n=this._createRow(e,i);return t.replaceWith(n),n},_getEditedItem:function(){var t={};return this._eachField(function(e){e.editing&&this._setItemFieldValue(t,e,e.editValue())}),t},cancelEdit:function(){this._editingRow&&(this._getEditRow().remove(),this._editingRow.show(),this._editingRow=null)},_getEditRow:function(){return this._editingRow&&this._editingRow.data(s)},deleteItem:function(e){var i=this.rowByItem(e);if(i.length&&(!this.confirmDeleting||t.confirm(l(this.deleteConfirm,this,i.data(a)))))return this._deleteRow(i)},_deleteRow:function(t){var e=t.data(a),i=this._itemIndex(e),n=this._callEventHandler(this.onItemDeleting,{row:t,item:e,itemIndex:i});return this._controllerCall("deleteItem",e,n.cancel,function(){this._loadStrategy.finishDelete(e,i),this._callEventHandler(this.onItemDeleted,{row:t,item:e,itemIndex:i})})}},e.fn.jsGrid=function(t){var a=e.makeArray(arguments).slice(1),s=this;return this.each(function(){var o,l=e(this),d=l.data(r);if(d)if("string"==typeof t){if((o=d[t].apply(d,a))!==i&&o!==d)return s=o,!1}else d._detachWindowResizeCallback(),d._init(t),d.render();else new n(l,t)}),s};var h={},c={},f=function(t,i){e.each(i,function(i,n){return e.isPlainObject(n)?void f(t[i]||t[i[0].toUpperCase()+i.slice(1)],n):void(t.hasOwnProperty(i)?t[i]=n:t.prototype[i]=n)})};t.jsGrid={Grid:n,fields:h,setDefaults:function(t){var i;e.isPlainObject(t)?i=n.prototype:(i=h[t].prototype,t=arguments[1]||{}),e.extend(i,t)},locales:c,locale:function(t){var i=e.isPlainObject(t)?t:c[t];if(!i)throw Error("unknown locale "+t);f(jsGrid,i)},version:"1.5.3"}}(window,jQuery),function(t,e){function i(t){this._init(t)}i.prototype={container:"body",message:"Loading...",shading:!0,zIndex:1e3,shaderClass:"jsgrid-load-shader",loadPanelClass:"jsgrid-load-panel",_init:function(t){e.extend(!0,this,t),this._initContainer(),this._initShader(),this._initLoadPanel()},_initContainer:function(){this._container=e(this.container)},_initShader:function(){this.shading&&(this._shader=e("<div>").addClass(this.shaderClass).hide().css({position:"absolute",top:0,right:0,bottom:0,left:0,zIndex:this.zIndex}).appendTo(this._container))},_initLoadPanel:function(){this._loadPanel=e("<div>").addClass(this.loadPanelClass).text(this.message).hide().css({position:"absolute",top:"50%",left:"50%",zIndex:this.zIndex}).appendTo(this._container)},show:function(){var t=this._loadPanel.show(),e=t.outerWidth(),i=t.outerHeight();t.css({marginTop:-i/2,marginLeft:-e/2}),this._shader.show()},hide:function(){this._loadPanel.hide(),this._shader.hide()}},t.LoadIndicator=i}(jsGrid,jQuery),function(t,e){function i(t){this._grid=t}function n(t){this._grid=t,this._itemsCount=0}i.prototype={firstDisplayIndex:function(){var t=this._grid;return t.option("paging")?(t.option("pageIndex")-1)*t.option("pageSize"):0},lastDisplayIndex:function(){var t=this._grid,e=t.option("data").length;return t.option("paging")?Math.min(t.option("pageIndex")*t.option("pageSize"),e):e},itemsCount:function(){return this._grid.option("data").length},openPage:function(){this._grid.refresh()},loadParams:function(){return{}},sort:function(){return this._grid._sortData(),this._grid.refresh(),e.Deferred().resolve().promise()},reset:function(){return this._grid.refresh(),e.Deferred().resolve().promise()},finishLoad:function(t){this._grid.option("data",t)},finishInsert:function(t){var e=this._grid;e.option("data").push(t),e.refresh()},finishDelete:function(t,e){var i=this._grid;i.option("data").splice(e,1),i.reset()}},n.prototype={firstDisplayIndex:function(){return 0},lastDisplayIndex:function(){return this._grid.option("data").length},itemsCount:function(){return this._itemsCount},openPage:function(){this._grid.loadData()},loadParams:function(){var t=this._grid;return{pageIndex:t.option("pageIndex"),pageSize:t.option("pageSize")}},reset:function(){return this._grid.loadData()},sort:function(){return this._grid.loadData()},finishLoad:function(t){this._itemsCount=t.itemsCount,this._grid.option("data",t.data)},finishInsert:function(){this._grid.search()},finishDelete:function(){this._grid.search()}},t.loadStrategies={DirectLoadingStrategy:i,PageLoadingStrategy:n}}(jsGrid,jQuery),function(t){var e=function(t){return void 0!==t&&null!==t},i={string:function(t,i){return e(t)||e(i)?e(t)?e(i)?(""+t).localeCompare(""+i):1:-1:0},number:function(t,e){return t-e},date:function(t,e){return t-e},numberAsString:function(t,e){return parseFloat(t)-parseFloat(e)}};jsGrid.sortStrategies=i}(0,jQuery),function(t,e,i){function n(t){this._init(t)}n.prototype={_init:function(t){e.extend(!0,this,t)},validate:function(t){var i=[];return e.each(this._normalizeRules(t.rules),function(n,r){if(!r.validator(t.value,t.item,r.param)){var a=e.isFunction(r.message)?r.message(t.value,t.item):r.message;i.push(a)}}),i},_normalizeRules:function(t){return e.isArray(t)||(t=[t]),e.map(t,e.proxy(function(t){return this._normalizeRule(t)},this))},_normalizeRule:function(t){if("string"==typeof t&&(t={validator:t}),e.isFunction(t)&&(t={validator:t}),!e.isPlainObject(t))throw Error("wrong validation config specified");return t=e.extend({},t),e.isFunction(t.validator)?t:this._applyNamedValidator(t,t.validator)},_applyNamedValidator:function(t,i){delete t.validator;var n=r[i];if(!n)throw Error('unknown validator "'+i+'"');return e.isFunction(n)&&(n={validator:n}),e.extend({},n,t)}},t.Validation=n;var r={required:{message:"Field is required",validator:function(t){return void 0!==t&&null!==t&&""!==t}},rangeLength:{message:"Field value length is out of the defined range",validator:function(t,e,i){return t.length>=i[0]&&t.length<=i[1]}},minLength:{message:"Field value is too short",validator:function(t,e,i){return t.length>=i}},maxLength:{message:"Field value is too long",validator:function(t,e,i){return t.length<=i}},pattern:{message:"Field value is not matching the defined pattern",validator:function(t,e,i){return"string"==typeof i&&(i=new RegExp("^(?:"+i+")$")),i.test(t)}},range:{message:"Field value is out of the defined range",validator:function(t,e,i){return t>=i[0]&&t<=i[1]}},min:{message:"Field value is too small",validator:function(t,e,i){return t>=i}},max:{message:"Field value is too large",validator:function(t,e,i){return i>=t}}};t.validators=r}(jsGrid,jQuery),function(t,e,i){function n(t){e.extend(!0,this,t),this.sortingFunc=this._getSortingFunc()}n.prototype={name:"",title:null,css:"",align:"",width:100,visible:!0,filtering:!0,inserting:!0,editing:!0,sorting:!0,sorter:"string",headerTemplate:function(){return void 0===this.title||null===this.title?this.name:this.title},itemTemplate:function(t){return t},filterTemplate:function(){return""},insertTemplate:function(){return""},editTemplate:function(t,e){return this._value=t,this.itemTemplate(t,e)},filterValue:function(){return""},insertValue:function(){return""},editValue:function(){return this._value},_getSortingFunc:function(){var i=this.sorter;if(e.isFunction(i))return i;if("string"==typeof i)return t.sortStrategies[i];throw Error('wrong sorter for the field "'+this.name+'"!')}},t.Field=n}(jsGrid,jQuery),function(t,e){function i(t){n.call(this,t)}var n=t.Field;i.prototype=new n({autosearch:!0,readOnly:!1,filterTemplate:function(){if(!this.filtering)return"";var t=this._grid,e=this.filterControl=this._createTextBox();return this.autosearch&&e.on("keypress",function(e){13===e.which&&(t.search(),e.preventDefault())}),e},insertTemplate:function(){return this.inserting?this.insertControl=this._createTextBox():""},editTemplate:function(t){if(!this.editing)return this.itemTemplate.apply(this,arguments);var e=this.editControl=this._createTextBox();return e.val(t),e},filterValue:function(){return this.filterControl.val()},insertValue:function(){return this.insertControl.val()},editValue:function(){return this.editControl.val()},_createTextBox:function(){return e("<input>").attr("type","text").prop("readonly",!!this.readOnly)}}),t.fields.text=t.TextField=i}(jsGrid,jQuery),function(t,e,i){function n(t){r.call(this,t)}var r=t.TextField;n.prototype=new r({sorter:"number",align:"right",readOnly:!1,filterValue:function(){return this.filterControl.val()?parseInt(this.filterControl.val()||0,10):i},insertValue:function(){return this.insertControl.val()?parseInt(this.insertControl.val()||0,10):i},editValue:function(){return this.editControl.val()?parseInt(this.editControl.val()||0,10):i},_createTextBox:function(){return e("<input>").attr("type","number").prop("readonly",!!this.readOnly)}}),t.fields.number=t.NumberField=n}(jsGrid,jQuery),function(t,e){function i(t){n.call(this,t)}var n=t.TextField;i.prototype=new n({insertTemplate:function(){return this.inserting?this.insertControl=this._createTextArea():""},editTemplate:function(t){if(!this.editing)return this.itemTemplate.apply(this,arguments);var e=this.editControl=this._createTextArea();return e.val(t),e},_createTextArea:function(){return e("<textarea>").prop("readonly",!!this.readOnly)}}),t.fields.textarea=t.TextAreaField=i}(jsGrid,jQuery),function(t,e,i){function n(t){if(this.items=[],this.selectedIndex=-1,this.valueField="",this.textField="",t.valueField&&t.items.length){var e=t.items[0][t.valueField];this.valueType=typeof e===a?a:s}this.sorter=this.valueType,r.call(this,t)}var r=t.NumberField,a="number",s="string";n.prototype=new r({align:"center",valueType:a,itemTemplate:function(t){var n,r=this.items,a=this.valueField,s=this.textField;n=a?e.grep(r,function(e){return e[a]===t})[0]||{}:r[t];var o=s?n[s]:n;return o===i||null===o?"":o},filterTemplate:function(){if(!this.filtering)return"";var t=this._grid,e=this.filterControl=this._createSelect();return this.autosearch&&e.on("change",function(){t.search()}),e},insertTemplate:function(){return this.inserting?this.insertControl=this._createSelect():""},editTemplate:function(t){if(!this.editing)return this.itemTemplate.apply(this,arguments);var e=this.editControl=this._createSelect();return t!==i&&e.val(t),e},filterValue:function(){var t=this.filterControl.val();return this.valueType===a?parseInt(t||0,10):t},insertValue:function(){var t=this.insertControl.val();return this.valueType===a?parseInt(t||0,10):t},editValue:function(){var t=this.editControl.val();return this.valueType===a?parseInt(t||0,10):t},_createSelect:function(){var t=e("<select>"),i=this.valueField,n=this.textField,r=this.selectedIndex;return e.each(this.items,function(a,s){var o=i?s[i]:a,l=n?s[n]:s;e("<option>").attr("value",o).text(l).appendTo(t).prop("selected",r===a)}),t.prop("disabled",!!this.readOnly),t}}),t.fields.select=t.SelectField=n}(jsGrid,jQuery),function(t,e,i){function n(t){r.call(this,t)}var r=t.Field;n.prototype=new r({sorter:"number",align:"center",autosearch:!0,itemTemplate:function(t){return this._createCheckbox().prop({checked:t,disabled:!0})},filterTemplate:function(){if(!this.filtering)return"";var t=this._grid,i=this.filterControl=this._createCheckbox();return i.prop({readOnly:!0,indeterminate:!0}),i.on("click",function(){var t=e(this);t.prop("readOnly")?t.prop({checked:!1,readOnly:!1}):t.prop("checked")||t.prop({readOnly:!0,indeterminate:!0})}),this.autosearch&&i.on("click",function(){t.search()}),i},insertTemplate:function(){return this.inserting?this.insertControl=this._createCheckbox():""},editTemplate:function(t){if(!this.editing)return this.itemTemplate.apply(this,arguments);var e=this.editControl=this._createCheckbox();return e.prop("checked",t),e},filterValue:function(){return this.filterControl.get(0).indeterminate?void 0:this.filterControl.is(":checked")},insertValue:function(){return this.insertControl.is(":checked")},editValue:function(){return this.editControl.is(":checked")},_createCheckbox:function(){return e("<input>").attr("type","checkbox")}}),t.fields.checkbox=t.CheckboxField=n}(jsGrid,jQuery),function(t,e){function i(t){n.call(this,t),this._configInitialized=!1}var n=t.Field;i.prototype=new n({css:"jsgrid-control-field",align:"center",width:50,filtering:!1,inserting:!1,editing:!1,sorting:!1,buttonClass:"jsgrid-button",modeButtonClass:"jsgrid-mode-button",modeOnButtonClass:"jsgrid-mode-on-button",searchModeButtonClass:"jsgrid-search-mode-button",insertModeButtonClass:"jsgrid-insert-mode-button",editButtonClass:"jsgrid-edit-button",deleteButtonClass:"jsgrid-delete-button",searchButtonClass:"jsgrid-search-button",clearFilterButtonClass:"jsgrid-clear-filter-button",insertButtonClass:"jsgrid-insert-button",updateButtonClass:"jsgrid-update-button",cancelEditButtonClass:"jsgrid-cancel-edit-button",searchModeButtonTooltip:"Switch to searching",insertModeButtonTooltip:"Switch to inserting",editButtonTooltip:"Edit",deleteButtonTooltip:"Delete",searchButtonTooltip:"Search",clearFilterButtonTooltip:"Clear filter",insertButtonTooltip:"Insert",updateButtonTooltip:"Update",cancelEditButtonTooltip:"Cancel edit",editButton:!0,deleteButton:!0,clearFilterButton:!0,modeSwitchButton:!0,_initConfig:function(){this._hasFiltering=this._grid.filtering,this._hasInserting=this._grid.inserting,this._hasInserting&&this.modeSwitchButton&&(this._grid.inserting=!1),this._configInitialized=!0},headerTemplate:function(){this._configInitialized||this._initConfig();var t=this._hasFiltering,e=this._hasInserting;return this.modeSwitchButton&&(t||e)?t&&!e?this._createFilterSwitchButton():e&&!t?this._createInsertSwitchButton():this._createModeSwitchButton():""},itemTemplate:function(t,i){var n=e([]);return this.editButton&&(n=n.add(this._createEditButton(i))),this.deleteButton&&(n=n.add(this._createDeleteButton(i))),n},filterTemplate:function(){var t=this._createSearchButton();return this.clearFilterButton?t.add(this._createClearFilterButton()):t},insertTemplate:function(){return this._createInsertButton()},editTemplate:function(){return this._createUpdateButton().add(this._createCancelEditButton())},_createFilterSwitchButton:function(){return this._createOnOffSwitchButton("filtering",this.searchModeButtonClass,!0)},_createInsertSwitchButton:function(){return this._createOnOffSwitchButton("inserting",this.insertModeButtonClass,!1)},_createOnOffSwitchButton:function(t,i,n){var r=n,a=e.proxy(function(){s.toggleClass(this.modeOnButtonClass,r)},this),s=this._createGridButton(this.modeButtonClass+" "+i,"",function(e){r=!r,e.option(t,r),a()});return a(),s},_createModeSwitchButton:function(){var t=!1,i=e.proxy(function(){n.attr("title",t?this.searchModeButtonTooltip:this.insertModeButtonTooltip).toggleClass(this.insertModeButtonClass,!t).toggleClass(this.searchModeButtonClass,t)},this),n=this._createGridButton(this.modeButtonClass,"",function(e){t=!t,e.option("inserting",t),e.option("filtering",!t),i()});return i(),n},_createEditButton:function(t){return this._createGridButton(this.editButtonClass,this.editButtonTooltip,function(e,i){e.editItem(t),i.stopPropagation()})},_createDeleteButton:function(t){return this._createGridButton(this.deleteButtonClass,this.deleteButtonTooltip,function(e,i){e.deleteItem(t),i.stopPropagation()})},_createSearchButton:function(){return this._createGridButton(this.searchButtonClass,this.searchButtonTooltip,function(t){t.search()})},_createClearFilterButton:function(){return this._createGridButton(this.clearFilterButtonClass,this.clearFilterButtonTooltip,function(t){t.clearFilter()})},_createInsertButton:function(){return this._createGridButton(this.insertButtonClass,this.insertButtonTooltip,function(t){t.insertItem().done(function(){t.clearInsert()})})},_createUpdateButton:function(){return this._createGridButton(this.updateButtonClass,this.updateButtonTooltip,function(t,e){t.updateItem(),e.stopPropagation()})},_createCancelEditButton:function(){return this._createGridButton(this.cancelEditButtonClass,this.cancelEditButtonTooltip,function(t,e){t.cancelEdit(),e.stopPropagation()})},_createGridButton:function(t,i,n){var r=this._grid;return e("<input>").addClass(this.buttonClass).addClass(t).attr({type:"button",title:i}).on("click",function(t){n(r,t)})},editValue:function(){return""}}),t.fields.control=t.ControlField=i}(jsGrid,jQuery),function(t,e){"function"==typeof define&&define.amd?define(e):"object"==typeof module&&module.exports?module.exports=e():t.numeral=e()}(this,function(){function t(t,e){this._input=t,this._value=e}var e,i,n={},r={},a={currentLocale:"en",zeroFormat:null,nullFormat:null,defaultFormat:"0,0",scalePercentBy100:!0},s={currentLocale:a.currentLocale,zeroFormat:a.zeroFormat,nullFormat:a.nullFormat,defaultFormat:a.defaultFormat,scalePercentBy100:a.scalePercentBy100};return e=function(r){var a,o,l,d;if(e.isNumeral(r))a=r.value();else if(0===r||void 0===r)a=0;else if(null===r||i.isNaN(r))a=null;else if("string"==typeof r)if(s.zeroFormat&&r===s.zeroFormat)a=0;else if(s.nullFormat&&r===s.nullFormat||!r.replace(/[^0-9]+/g,"").length)a=null;else{for(o in n)if((d="function"==typeof n[o].regexps.unformat?n[o].regexps.unformat():n[o].regexps.unformat)&&r.match(d)){l=n[o].unformat;break}a=(l=l||e._.stringToNumber)(r)}else a=Number(r)||null;return new t(r,a)},e.version="2.0.6",e.isNumeral=function(e){return e instanceof t},e._=i={numberToFormat:function(t,i,n){var a,s,o,l,d,u,h,c=r[e.options.currentLocale],f=!1,g=!1,p=0,_="",m=1e12,v="",C=!1;if(t=t||0,s=Math.abs(t),e._.includes(i,"(")?(f=!0,i=i.replace(/[\(|\)]/g,"")):(e._.includes(i,"+")||e._.includes(i,"-"))&&(d=e._.includes(i,"+")?i.indexOf("+"):0>t?i.indexOf("-"):-1,i=i.replace(/[\+|\-]/g,"")),e._.includes(i,"a")&&(a=i.match(/a(k|m|b|t)?/),a=!!a&&a[1],e._.includes(i," a")&&(_=" "),i=i.replace(new RegExp(_+"a[kmbt]?"),""),s>=m&&!a||"t"===a?(_+=c.abbreviations.trillion,t/=m):m>s&&s>=1e9&&!a||"b"===a?(_+=c.abbreviations.billion,t/=1e9):1e9>s&&s>=1e6&&!a||"m"===a?(_+=c.abbreviations.million,t/=1e6):(1e6>s&&s>=1e3&&!a||"k"===a)&&(_+=c.abbreviations.thousand,t/=1e3)),e._.includes(i,"[.]")&&(g=!0,i=i.replace("[.]",".")),o=t.toString().split(".")[0],l=i.split(".")[1],u=i.indexOf(","),p=(i.split(".")[0].split(",")[0].match(/0/g)||[]).length,l?(e._.includes(l,"[")?(l=l.replace("]",""),l=l.split("["),v=e._.toFixed(t,l[0].length+l[1].length,n,l[1].length)):v=e._.toFixed(t,l.length,n),o=v.split(".")[0],v=e._.includes(v,".")?c.delimiters.decimal+v.split(".")[1]:"",g&&0===Number(v.slice(1))&&(v="")):o=e._.toFixed(t,0,n),_&&!a&&Number(o)>=1e3&&_!==c.abbreviations.trillion)switch(o=String(Number(o)/1e3),_){case c.abbreviations.thousand:_=c.abbreviations.million;break;case c.abbreviations.million:_=c.abbreviations.billion;break;case c.abbreviations.billion:_=c.abbreviations.trillion}if(e._.includes(o,"-")&&(o=o.slice(1),C=!0),o.length<p)for(var w=p-o.length;w>0;w--)o="0"+o;return u>-1&&(o=o.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1"+c.delimiters.thousands)),0===i.indexOf(".")&&(o=""),h=o+v+(_||""),f?h=(f&&C?"(":"")+h+(f&&C?")":""):d>=0?h=0===d?(C?"-":"+")+h:h+(C?"-":"+"):C&&(h="-"+h),h},stringToNumber:function(t){var e,i,n,a=r[s.currentLocale],o=t,l={thousand:3,million:6,billion:9,trillion:12};if(s.zeroFormat&&t===s.zeroFormat)i=0;else if(s.nullFormat&&t===s.nullFormat||!t.replace(/[^0-9]+/g,"").length)i=null;else{i=1,"."!==a.delimiters.decimal&&(t=t.replace(/\./g,"").replace(a.delimiters.decimal,"."));for(e in l)if(n=new RegExp("[^a-zA-Z]"+a.abbreviations[e]+"(?:\\)|(\\"+a.currency.symbol+")?(?:\\))?)?$"),o.match(n)){i*=Math.pow(10,l[e]);break}i*=(t.split("-").length+Math.min(t.split("(").length-1,t.split(")").length-1))%2?1:-1,t=t.replace(/[^0-9\.]+/g,""),i*=Number(t)}return i},isNaN:function(t){return"number"==typeof t&&isNaN(t)},includes:function(t,e){return-1!==t.indexOf(e)},insert:function(t,e,i){return t.slice(0,i)+e+t.slice(i)},reduce:function(t,e){if(null===this)throw new TypeError("Array.prototype.reduce called on null or undefined");if("function"!=typeof e)throw new TypeError(e+" is not a function");var i,n=Object(t),r=n.length>>>0,a=0;if(3===arguments.length)i=arguments[2];else{for(;r>a&&!(a in n);)a++;if(a>=r)throw new TypeError("Reduce of empty array with no initial value");i=n[a++]}for(;r>a;a++)a in n&&(i=e(i,n[a],a,n));return i},multiplier:function(t){var e=t.toString().split(".");return e.length<2?1:Math.pow(10,e[1].length)},correctionFactor:function(){return Array.prototype.slice.call(arguments).reduce(function(t,e){var n=i.multiplier(e);return t>n?t:n},1)},toFixed:function(t,e,i,n){var r,a,s,o,l=t.toString().split("."),d=e-(n||0);return r=2===l.length?Math.min(Math.max(l[1].length,d),e):d,s=Math.pow(10,r),o=(i(t+"e+"+r)/s).toFixed(r),n>e-r&&(a=new RegExp("\\.?0{1,"+(n-(e-r))+"}$"),o=o.replace(a,"")),o}},e.options=s,e.formats=n,e.locales=r,e.locale=function(t){return t&&(s.currentLocale=t.toLowerCase()),s.currentLocale},e.localeData=function(t){if(!t)return r[s.currentLocale];if(t=t.toLowerCase(),!r[t])throw new Error("Unknown locale : "+t);return r[t]},e.reset=function(){for(var t in a)s[t]=a[t]},e.zeroFormat=function(t){s.zeroFormat="string"==typeof t?t:null},e.nullFormat=function(t){s.nullFormat="string"==typeof t?t:null},e.defaultFormat=function(t){s.defaultFormat="string"==typeof t?t:"0.0"},e.register=function(t,e,i){if(e=e.toLowerCase(),this[t+"s"][e])throw new TypeError(e+" "+t+" already registered.");return this[t+"s"][e]=i,i},e.validate=function(t,i){var n,r,a,s,o,l,d,u;if("string"!=typeof t&&(t+="",console.warn&&console.warn("Numeral.js: Value is not string. It has been co-erced to: ",t)),(t=t.trim()).match(/^\d+$/))return!0;if(""===t)return!1;try{d=e.localeData(i)}catch(t){d=e.localeData(e.locale())}return a=d.currency.symbol,o=d.abbreviations,n=d.delimiters.decimal,r="."===d.delimiters.thousands?"\\.":d.delimiters.thousands,(null===(u=t.match(/^[^\d]+/))||(t=t.substr(1),u[0]===a))&&!(null!==(u=t.match(/[^\d]+$/))&&(t=t.slice(0,-1),u[0]!==o.thousand&&u[0]!==o.million&&u[0]!==o.billion&&u[0]!==o.trillion)||(l=new RegExp(r+"{2}"),t.match(/[^\d.,]/g)||(s=t.split(n)).length>2||(s.length<2?!s[0].match(/^\d+.*\d$/)||s[0].match(l):1===s[0].length?!s[0].match(/^\d+$/)||s[0].match(l)||!s[1].match(/^\d+$/):!s[0].match(/^\d+.*\d$/)||s[0].match(l)||!s[1].match(/^\d+$/))))},e.fn=t.prototype={clone:function(){return e(this)},format:function(t,i){var r,a,o,l=this._value,d=t||s.defaultFormat;if(i=i||Math.round,0===l&&null!==s.zeroFormat)a=s.zeroFormat;else if(null===l&&null!==s.nullFormat)a=s.nullFormat;else{for(r in n)if(d.match(n[r].regexps.format)){o=n[r].format;break}a=(o=o||e._.numberToFormat)(l,d,i)}return a},value:function(){return this._value},input:function(){return this._input},set:function(t){return this._value=Number(t),this},add:function(t){var e=i.correctionFactor.call(null,this._value,t);return this._value=i.reduce([this._value,t],function(t,i,n,r){return t+Math.round(e*i)},0)/e,this},subtract:function(t){var e=i.correctionFactor.call(null,this._value,t);return this._value=i.reduce([t],function(t,i,n,r){return t-Math.round(e*i)},Math.round(this._value*e))/e,this},multiply:function(t){return this._value=i.reduce([this._value,t],function(t,e,n,r){var a=i.correctionFactor(t,e);return Math.round(t*a)*Math.round(e*a)/Math.round(a*a)},1),this},divide:function(t){return this._value=i.reduce([this._value,t],function(t,e,n,r){var a=i.correctionFactor(t,e);return Math.round(t*a)/Math.round(e*a)}),this},difference:function(t){return Math.abs(e(this._value).subtract(t).value())}},e.register("locale","en",{delimiters:{thousands:",",decimal:"."},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(t){var e=t%10;return 1==~~(t%100/10)?"th":1===e?"st":2===e?"nd":3===e?"rd":"th"},currency:{symbol:"$"}}),e.register("format","bps",{regexps:{format:/(BPS)/,unformat:/(BPS)/},format:function(t,i,n){var r,a=e._.includes(i," BPS")?" ":"";return t*=1e4,i=i.replace(/\s?BPS/,""),r=e._.numberToFormat(t,i,n),e._.includes(r,")")?((r=r.split("")).splice(-1,0,a+"BPS"),r=r.join("")):r=r+a+"BPS",r},unformat:function(t){return+(1e-4*e._.stringToNumber(t)).toFixed(15)}}),function(){var t={base:1e3,suffixes:["B","KB","MB","GB","TB","PB","EB","ZB","YB"]},i={base:1024,suffixes:["B","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"]},n=t.suffixes.concat(i.suffixes.filter(function(e){return t.suffixes.indexOf(e)<0})).join("|");n="("+n.replace("B","B(?!PS)")+")",e.register("format","bytes",{regexps:{format:/([0\s]i?b)/,unformat:new RegExp(n)},format:function(n,r,a){var s,o,l,d=e._.includes(r,"ib")?i:t,u=e._.includes(r," b")||e._.includes(r," ib")?" ":"";for(r=r.replace(/\s?i?b/,""),s=0;s<=d.suffixes.length;s++)if(o=Math.pow(d.base,s),l=Math.pow(d.base,s+1),null===n||0===n||n>=o&&l>n){u+=d.suffixes[s],o>0&&(n/=o);break}return e._.numberToFormat(n,r,a)+u},unformat:function(n){var r,a,s=e._.stringToNumber(n);if(s){for(r=t.suffixes.length-1;r>=0;r--){if(e._.includes(n,t.suffixes[r])){a=Math.pow(t.base,r);break}if(e._.includes(n,i.suffixes[r])){a=Math.pow(i.base,r);break}}s*=a||1}return s}})}(),e.register("format","currency",{regexps:{format:/(\$)/},format:function(t,i,n){var r,a,s=e.locales[e.options.currentLocale],o={before:i.match(/^([\+|\-|\(|\s|\$]*)/)[0],after:i.match(/([\+|\-|\)|\s|\$]*)$/)[0]};for(i=i.replace(/\s?\$\s?/,""),r=e._.numberToFormat(t,i,n),t>=0?(o.before=o.before.replace(/[\-\(]/,""),o.after=o.after.replace(/[\-\)]/,"")):0>t&&!e._.includes(o.before,"-")&&!e._.includes(o.before,"(")&&(o.before="-"+o.before),a=0;a<o.before.length;a++)switch(o.before[a]){case"$":r=e._.insert(r,s.currency.symbol,a);break;case" ":r=e._.insert(r," ",a+s.currency.symbol.length-1)}for(a=o.after.length-1;a>=0;a--)switch(o.after[a]){case"$":r=a===o.after.length-1?r+s.currency.symbol:e._.insert(r,s.currency.symbol,-(o.after.length-(1+a)));break;case" ":r=a===o.after.length-1?r+" ":e._.insert(r," ",-(o.after.length-(1+a)+s.currency.symbol.length-1))}return r}}),e.register("format","exponential",{regexps:{format:/(e\+|e-)/,unformat:/(e\+|e-)/},format:function(t,i,n){var r=("number"!=typeof t||e._.isNaN(t)?"0e+0":t.toExponential()).split("e");return i=i.replace(/e[\+|\-]{1}0/,""),e._.numberToFormat(Number(r[0]),i,n)+"e"+r[1]},unformat:function(t){var i=e._.includes(t,"e+")?t.split("e+"):t.split("e-"),n=Number(i[0]),r=Number(i[1]);return r=e._.includes(t,"e-")?r*=-1:r,e._.reduce([n,Math.pow(10,r)],function(t,i,n,r){var a=e._.correctionFactor(t,i);return t*a*(i*a)/(a*a)},1)}}),e.register("format","ordinal",{regexps:{format:/(o)/},format:function(t,i,n){var r=e.locales[e.options.currentLocale],a=e._.includes(i," o")?" ":"";return i=i.replace(/\s?o/,""),a+=r.ordinal(t),e._.numberToFormat(t,i,n)+a}}),e.register("format","percentage",{regexps:{format:/(%)/,unformat:/(%)/},format:function(t,i,n){var r,a=e._.includes(i," %")?" ":"";return e.options.scalePercentBy100&&(t*=100),i=i.replace(/\s?\%/,""),r=e._.numberToFormat(t,i,n),e._.includes(r,")")?((r=r.split("")).splice(-1,0,a+"%"),r=r.join("")):r=r+a+"%",r},unformat:function(t){var i=e._.stringToNumber(t);return e.options.scalePercentBy100?.01*i:i}}),e.register("format","time",{regexps:{format:/(:)/,unformat:/(:)/},format:function(t,e,i){var n=Math.floor(t/60/60),r=Math.floor((t-60*n*60)/60),a=Math.round(t-60*n*60-60*r);return n+":"+(10>r?"0"+r:r)+":"+(10>a?"0"+a:a)},unformat:function(t){var e=t.split(":"),i=0;return 3===e.length?(i+=60*Number(e[0])*60,i+=60*Number(e[1]),i+=Number(e[2])):2===e.length&&(i+=60*Number(e[0]),i+=Number(e[1])),Number(i)}}),e}),function(){"use strict";function t(t){jsGrid.NumberField.call(this,t)}function e(t){jsGrid.TextField.call(this,t)}t.prototype=new jsGrid.NumberField({itemTemplate:function(t){var e=numeral(t).format(this.format||"0,0.00");return this.currency_symbol&&this.currency_symbol.length>0&&(e=e.replace(/\$/g,this.currency_symbol)),e}}),e.prototype=new jsGrid.TextField({itemTemplate:function(t){var e,i,n=new RegExp(/(^\[.*\])(\(.*\)$)/);if(n.test(t)){var r=n.exec(t);e=(e=r[1]).substring(1,e.length-1),i=(i=r[2]).substring(1,i.length-1)}else e=i=t;return"<a href='"+i+"'>"+e+"</a>"}}),jsGrid.fields.number=t,jsGrid.fields.link=e}(),function(t){"use strict";window.wpt=window.wpt||{},window.wpt.createTable=function(e){e.width||delete e.width,e.height||delete e.height,e.controller={loadData:function(i){i=i||{};var n=e._ctrl_url.replace(/&amp;/gi,"&");return t.ajax({type:"GET",url:n,data:i})}},e.onRefreshed=function(){"function"==typeof t.fancybox&&t("#"+e._id_div+" [data-fancybox]").fancybox()},t("#"+e._id_div).jsGrid(e)}}(jQuery)}catch(e){console.log(e)}try{jQuery( function() {
	jQuery( ":input" )
		.on( "focus", function() {
			var input      = jQuery(this);
			var inputID    = input.attr("id") || "(no input ID)";
			var inputName  = input.attr("name") || "(no input name)";
			var inputClass = input.attr("class") || "(no input class)";

			var form      = jQuery(this.form);
			var formID    = form.attr("id") || "(no form ID)";
			var formName  = form.attr("name") || "(no form name)";
			var formClass = form.attr("class") || "(no form class)";

			window[ gtm4wp_datalayer_name ].push({
				'event'    : 'gtm4wp.formElementEnter',

				'inputID'   : inputID,
				'inputName' : inputName,
				'inputClass': inputClass,

				'formID'   : formID,
				'formName' : formName,
				'formClass': formClass
			});
		})

		.on( "blur", function() {
			var input      = jQuery(this);
			var inputID    = input.attr("id") || "(no input ID)";
			var inputName  = input.attr("name") || "(no input name)";
			var inputClass = input.attr("class") || "(no input class)";

			var form      = jQuery(this.form);
			var formID    = form.attr("id") || "(no form ID)";
			var formName  = form.attr("name") || "(no form name)";
			var formClass = form.attr("class") || "(no form class)";

			window[ gtm4wp_datalayer_name ].push({
				'event'    : 'gtm4wp.formElementLeave',

				'inputID'   : inputID,
				'inputName' : inputName,
				'inputClass': inputClass,

				'formID'   : formID,
				'formName' : formName,
				'formClass': formClass
			});
		});
})}catch(e){console.log(e)}try{jQuery(function ($) {

        function createCookie(name, value, days) {
            var expires;

            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toGMTString();
            } else {
                expires = "";
            }
            document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
        }

        function readCookie(name) {
            var nameEQ = encodeURIComponent(name) + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ')
                    c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0)
                    return decodeURIComponent(c.substring(nameEQ.length, c.length));
            }
            return null;
        }

        if(readCookie('wpwp_subscribe_popup_hide') !== 'true'){
            setTimeout(function() {
                $('.wpwp-background-pop-up-email').fadeIn('slow')
            }, 30*1000);
        }

      $('body').on('click touchstart','.wpwp-pop-up-js-close-email',function (event) {
        createCookie('wpwp_subscribe_popup_hide', 'true', 30);
          $('.wpwp-background-pop-up-email').hide();
      });

  ajaxMailChimpFormPopUp($('#subscribe-form-pop-up'), $('#subscribe-result-pop-up'))

  function ajaxMailChimpFormPopUp ($form, $resultElement) {
    $form.submit(function (e) {
      e.preventDefault()
      if (!isValidEmailPopUp($form)) {
        var error = 'A valid email address must be provided.'
        $resultElement.html(error)
        $resultElement.css('color', 'red')
      } else {
        $resultElement.css('color', 'black')
        $resultElement.html('Subscribing...')
        submitSubscribeFormPopUp($('#subscribe-form-pop-up'), $('#subscribe-result-pop-up'));
      }
    })
  }

  function validateEmailPopUp (email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
  }

  // Validate the email address in the form
  function isValidEmailPopUp ($form) {
    // If email is empty, show error message.
    // contains just one @
    var email = $form.find('input[type=\'email\']').val()
    if (!email || !email.length) {
      return false
    } else if (!validateEmailPopUp(email)) {
      return false
    }
    return true
  }

  function submitSubscribeFormPopUp ($form, $resultElement) {
    $.ajax({
      type: 'GET',
      url: $form.attr('action'),
      data: $form.serialize(),
      cache: false,
      dataType: 'jsonp',
      jsonp: 'c',
      contentType: 'application/json; charset=utf-8',
      error: function (error) {
      },
      success: function (data) {
        if (data.result !== 'success') {
          var message = data.msg || 'Sorry. Unable to subscribe. Please try again later.'
          $resultElement.css('color', 'red')
          if (data.msg && data.msg.indexOf('already subscribed') >= 0) {
            message = 'You\'re already subscribed. Thank you.'
            $resultElement.css('color', 'black')
          }
          $resultElement.html(message)
        } else {
			createCookie('wpwp_subscribe_popup_hide', 'true', 365);
          	$('.wpwp-background-pop-up-email').hide();
          	$('.wpwp-background-pop-up-done').show();
        }
      }
    })
  }

      $('body').on('click','.wpwp-pop-up-js-close-done',function (event) {
        event.preventDefault();
        $('.wpwp-background-pop-up-done').hide();
      })
	  
	 $('.wpwp-subscribe-form').submit(function (e) {
        var $this = $(this),
		$resultElement = $('.subscribe-result-field');
        $.ajax({
            type: "GET", 
            url: $this.attr('action'),
            data: $this.serialize(),
            dataType: 'json',
			jsonp: 'c',
            contentType: "application/json; charset=utf-8",
			beforeSend: function (error) {
				 if (!isValidEmailPopUp($this)) {
					var error = 'A valid email address must be provided.'
					$resultElement.html(error)
					$resultElement.css('color', 'red')
					return false
				} else {
					$resultElement.css('color', 'black')
					$resultElement.html('Subscribing...')
				}
			},
            error: function (error) {
               var error = 'Could not connect to the registration server.'
					$resultElement.html(error)
					$resultElement.css('color', 'red')
            },
			success: function (data) {
				if (data.result !== 'success') {
					var message = data.msg || 'Sorry. Unable to subscribe. Please try again later.'
					$resultElement.css('color', 'red')
					if (data.msg && data.msg.indexOf('already subscribed') >= 0) {
						message = 'You\'re already subscribed. Thank you.'
						$resultElement.css('color', 'black')
					}
				} else {
					createCookie('wpwp_subscribe_popup_hide', 'true', 365);
					$('.wpwp-background-pop-up-email').hide();
					message = 'Great, we have added you to our mailing list.'
				}
				$resultElement.html(message)
			}
        });
        return false;
    });
	
	$('.wp-block-image img').css( 'maxWidth', $('article.post' ).width() );
	$('.wp-block-image img').each( function(){						
			$(this).addClass('size-full aligncenter');							
		});
	
})}catch(e){console.log(e)}