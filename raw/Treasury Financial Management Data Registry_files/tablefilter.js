/*====================================================
	- HTML Table Filter Generator v1.8.1
	- By Max Guglielmi
	- tablefilter.free.fr
	- please do not change this comment
	- don't forget to give some credit... 
	it's always good for the author
	- Special credit to Cedric Wartel, 
	cnx.claude@free.fr, Florent Hirchy, Vary Peter,
	Anthony Maes, Nuovella Williams
	for active contribution and inspiration
=====================================================*/


function setFilterGrid(id)
/*====================================================
	- Sets filters grid bar
	- Calls TF Constructor and generates grid bar
	- Params:
			- id: table id (string)
			- refRow (optional): row index (number)
			- config (optional): configuration 
			object (literal object)
=====================================================*/
{
	if( arguments.length==0 ) return;
	eval( 'tf_'+id+' = new TF(arguments[0],arguments[1],arguments[2])' );
	eval( 'tf_'+id+'.AddGrid();' );
}

/*===BEGIN removable section===========================
	- Unobtrusive grid bar generation using 
	'filterable' class
	- If you don't use this technique you can remove
	safely this section
/*=====================================================*/
tf_addEvent(window, "load", initFilterGrid);

function initFilterGrid()
{
	if (!document.getElementsByTagName) return;
	var tbls = tf_Tag(document,'table'), config;
	for (var i=0; i<tbls.length; i++)
	{
		var cTbl = tbls[i], cTblId = cTbl.getAttribute('id');
		if( tf_hasClass(cTbl,'filterable') && cTblId )
		{
			if( tf_isObject(cTblId+'_config') )
				config = eval(cTblId+'_config');
			else
				config = undefined;
			setFilterGrid( cTblId,config );
		}
	}// for i
}
/*===END removable section===========================*/

var TF = function( id )
/*====================================================
	- TF object constructor
	- Params:
			- id: table id (string)
			- refRow (optional): row index (number)
			- config (optional): configuration 
			object (literal object)
=====================================================*/
{
	if( arguments.length==0 ) return;
	
	this.id = id;
	this.tbl = tf_Id(id);
	this.startRow = undefined;
	this.refRow = null;
	this.fObj = null;
	this.nbFilterableRows = null;
	this.nbRows = null;
	this.nbCells = null;
	this.hasGrid = false;
	
	if(this.tbl != null && this.tbl.nodeName.tf_LCase() == "table" && this.GetRowsNb() )
    {
		if(arguments.length>1)
        {
            for(var i=0; i<arguments.length; i++)
            {
                var argtype = typeof arguments[i];
               
                switch(argtype.tf_LCase())
                {
                    case "number":
                        this.startRow = arguments[i];
                    break;
                    case "object":
                        this.fObj = arguments[i];
                    break;
                }//switch                           
            }//for
        }//if
		
		var f = this.fObj;
		
		// filters' grid properties
		this.fltGrid = 				f!=undefined && f.grid==false ? false : true; //enables/disables filter grid
		this.filtersRowIndex =		f!=undefined && f.filters_row_index!=undefined //defines in which row filters grid bar is generated
										? f.filters_row_index>1 ? 1 : f.filters_row_index : 0;
		this.fltCellTag =			f!=undefined && f.filters_cell_tag!=undefined //defines tag of the cells containing filters (td/th)
										? (f.filters_cell_tag!='th' ? 'td' : 'th') : 'td';		
		this.fltIds = 				[]; //stores filters ids
		this.searchArgs =			null; //stores filters values
		this.tblData =				[]; //stores table data
		this.validRowsIndex =		null; //stores valid rows indexes (rows visible upon filtering)
		this.fltGridEl =			null; //stores filters row element
		this.isFirstLoad =			true; //is first load boolean 
		this.infDiv =				null; //container div for paging elements, reset btn etc.
		this.lDiv =					null; //div for rows counter
		this.rDiv =					null; //div for reset button and results per page select
		this.mDiv =					null; //div for paging elements
		this.contDiv =				null; //table container div for fixed headers (IE only)
		this.infDivCssClass =		f!=undefined && f.inf_div_css_class!=undefined	//defines css class for div containing
										? f.inf_div_css_class : "inf";				//paging elements, rows counter etc.
		this.lDivCssClass =			f!=undefined && f.left_div_css_class!=undefined	//defines css class for left div 
										? f.left_div_css_class : "ldiv";
		this.rDivCssClass =			f!=undefined && f.right_div_css_class!=undefined //defines css class for right div 
										? f.right_div_css_class : "rdiv";
		this.mDivCssClass =			f!=undefined && f.middle_div_css_class!=undefined //defines css class for mid div 
										? f.middle_div_css_class : "mdiv";
		this.contDivCssClass =		f!=undefined && f.content_div_css_class!=undefined 
										? f.content_div_css_class : "cont";	//table container div css class
		
		/*** filters' grid appearance ***/
		this.fltsRowCssClass =		f!=undefined && f.flts_row_css_class!=undefined //defines css class for filters row
										? f.flts_row_css_class : "fltrow";		
		this.alternateBgs =			f!=undefined && f.alternate_rows ? true : false; //enables/disbles rows alternating bg colors
		this.hasColWidth =			f!=undefined && f.col_width ? true : false; //defines widths of columns
		this.colWidth =				f!=undefined && this.hasColWidth ? f.col_width : null;
		this.fixedHeaders =			f!=undefined && f.fixed_headers ? true : false; //enables/disables fixed headers
		this.tBodyH = 				f!=undefined && f.tbody_height ? f.tbody_height : 200; //tbody height if fixed headers enabled
		this.fltCssClass =			f!=undefined && f.flt_css_class!=undefined //defines css class for filters
										? f.flt_css_class : "flt";
		this.fltSmallCssClass =		f!=undefined && f.flt_small_css_class!=undefined //defines css class for filters
										? f.flt_small_css_class : "flt_s";
		this.isStartBgAlternate =	true;
		this.rowBgEvenCssClass =	'even'; //defines css class for even rows
		this.rowBgOddCssClass =		'odd'; //defines css class for odd rows
		
		/*** filters' grid behaviours ***/
		this.enterKey =				f!=undefined && f.enter_key==false ? false : true; //enables/disables enter key
		this.isModFilterFn = 		f!=undefined && f.mod_filter_fn ? true : false; //enables/disables alternative fn call		
		this.modFilterFn =			this.isModFilterFn ? f.mod_filter_fn : null;// used by tf_DetectKey fn
		this.onBeforeFilter =		f!=undefined && (f.on_before_filter!=undefined && //calls function before filtering starts
									 (typeof f.on_before_filter).tf_LCase() == 'function')
									? f.on_before_filter : null;
		this.onAfterFilter =		f!=undefined && (f.on_after_filter!=undefined && //calls function after filtering
									 (typeof f.on_after_filter).tf_LCase() == 'function')
									? f.on_after_filter : null;								
		this.matchCase =			f!=undefined && f.match_case ? true : false; //enables/disables case sensitivity
		this.exactMatch =			f!=undefined && f.exact_match ? true : false; //enables/disbles exact match for search
		this.refreshFilters =		f!=undefined && f.refresh_filters ? true : false; //refreshes drop-down lists upon validation
		this.activeFlt =			null; //stores active filter element
		this.activeFilterId =		null; //id of active filter
		this.hasColOperation =		f!=undefined && f.col_operation ? true : false; //enables/disbles column operation(sum,mean)
		this.colOperation =			null;
		this.hasVisibleRows = 		f!=undefined && f.rows_always_visible ? true : false; //enables always visible rows
		this.visibleRows =			this.hasVisibleRows ? f.rows_always_visible : [];//array containing always visible rows
		this.searchType =			f!=undefined && f.search_type!=undefined //defines search type: include or exclude
										? f.search_type : 'include';
		this.isExternalFlt =		f!=undefined && f.external_flt_grid ? true : false; //enables/disables external filters generation
		this.externalFltTgtIds =	f!=undefined && f.external_flt_grid_ids!=undefined //array containing ids of external elements containing filters
										? f.external_flt_grid_ids : null;
		this.externalFltEls =		[]; //stores filters elements if isExternalFlt is true		
		
		/*** selects customisation and behaviours ***/
		this.displayAllText =		f!=undefined && f.display_all_text!=undefined ? f.display_all_text : ""; //defines 1st option text
		this.onSlcChange = 			f!=undefined && f.on_change==false ? false : true; //enables/disables onChange event on combo-box 
		this.sortSlc =				f!=undefined && f.sort_select ? true : false; //enables/disables select options sorting
		this.isSortNumAsc =			f!=undefined && f.sort_num_asc ? true : false; //enables/disables ascending numeric options sorting
		this.sortNumAsc =			this.isSortNumAsc ? f.sort_num_asc : null;
		this.isSortNumDesc =		f!=undefined && f.sort_num_desc ? true : false; //enables/disables descending numeric options sorting
		this.sortNumDesc =			this.isSortNumDesc ? f.sort_num_desc : null;
		this.slcFillingMethod =		f!=undefined && f.slc_filling_method!=undefined //sets select filling method: 'innerHTML' or 
										? f.slc_filling_method : 'createElement';	//'createElement'
		
		/*** rows counter ***/
		this.rowsCounter = 			f!=undefined && f.rows_counter ? true : false; //show/hides rows counter
		this.rowsCounterTgtId =		f!=undefined && f.rows_counter_target_id!=undefined //id of container element
										? f.rows_counter_target_id : null;	
		this.rowsCounterSpan =		null; //element containing tot nb rows label
		this.rowsCounterText =		f!=undefined && f.rows_counter_text!=undefined
										? f.rows_counter_text : "Displayed rows: "; //defines rows counter text
		this.totRowsCssClass =		f!=undefined && f.tot_rows_css_class!=undefined //defines css class rows counter
										? f.tot_rows_css_class : "tot";		
		
		/*** loader ***/
		this.loader =				f!=undefined && f.loader ? true : false; //enables/disables loader
		this.loaderTgtId =			f!=undefined && f.loader_target_id!=undefined //id of container element
										? f.loader_target_id : null;
		this.loaderDiv =			null; //div containing loader
		this.loaderText =			f!=undefined && f.loader_text!=undefined ? f.loader_text : "Loading..."; //defines loader text
		this.loaderHtml =			f!=undefined && f.loader_html!=undefined ? f.loader_html : null; //defines loader innerHtml
		this.loaderCssClass = 		f!=undefined && f.loader_css_class!=undefined //defines css class for loader div
										? f.loader_css_class : "loader";		
		
		/*** validation - reset buttons/links ***/
		this.displayBtn =			f!=undefined && f.btn ? true : false; //show/hides filter's validation button
		this.btnText =				f!=undefined && f.btn_text!=undefined ? f.btn_text : "go"; //defines validation button text
		this.btnCssClass =			f!=undefined && f.btn_css_class!=undefined //defines css class for validation button
										? f.btn_css_class : "btnflt";
		this.btnReset = 			f!=undefined && f.btn_reset ? true : false; //show/hides reset link
		this.btnResetTgtId =		f!=undefined && f.btn_reset_target_id!=undefined //id of container element
										? f.btn_reset_target_id : null;
		this.btnResetEl =			null; //reset button element
		this.btnResetText =			f!=undefined && f.btn_reset_text!=undefined ? f.btn_reset_text : "Reset"; //defines reset text
		this.btnResetHtml = 		f!=undefined && f.btn_reset_html!=undefined ? f.btn_reset_html : null; //defines reset button innerHtml
		this.btnResetCssClass =		f!=undefined && f.btn_reset_css_class!=undefined //defines css class for reset button
										? f.btn_reset_css_class :'reset';
		
		/*** paging ***/
		this.paging =				f!=undefined && f.paging ? true : false; //enables/disables table paging
		this.pagingTgtId =			f!=undefined && f.paging_target_id!=undefined //id of container element
										? f.paging_target_id : null;		
		this.pagingLength =			f!=undefined && f.paging_length!=undefined ? f.paging_length : 10; //defines table paging length
		this.hasResultsPerPage =	f!=undefined && f.results_per_page ? true : false; //enables/disables results per page drop-down
		this.resultsPerPageTgtId =	f!=undefined && f.results_per_page_target_id!=undefined //id of container element
										? f.results_per_page_target_id : null;	
		this.resultsPerPage =		null; //stores results per page text and values			
		this.pagingSlc =			null; //stores paging select element
		this.isPagingRemoved =		false; //indicates if paging elements were previously removed
		this.pgSlcCssClass =		f!=undefined && f.paging_slc_css_class!=undefined
										? f.paging_slc_css_class :'pgSlc'; //css class for paging select element
		this.resultsPerPageSlc =	null; //results per page select element
		this.resultsSlcCssClass =	f!=undefined && f.results_slc_css_class!=undefined
										? f.results_slc_css_class :'rspg'; //defines css class for results per page select
		this.resultsSpanCssClass =	f!=undefined && f.results_span_css_class!=undefined
										? f.results_span_css_class :'rspgSpan'; //css class for label preceding results per page select
		this.nbVisibleRows	=		0; //nb visible rows
		this.nbHiddenRows =			0; //nb hidden rows
		this.startPagingRow =		0; //1st row index of current page
		this.nbPages = 				0; //total nb of pages
		this.currentPageNb =		1; //current page nb
		this.btnNextPageText = 		f!=undefined && f.btn_next_page_text!=undefined
										? f.btn_next_page_text : ">"; //defines next page button text
		this.btnPrevPageText =		f!=undefined && f.btn_prev_page_text!=undefined
										? f.btn_prev_page_text : "<"; //defines previous page button text
		this.btnLastPageText =		f!=undefined && f.btn_last_page_text!=undefined
										? f.btn_last_page_text : ">|"; //defines last page button text
		this.btnFirstPageText =		f!=undefined && f.btn_first_page_text!=undefined
										? f.btn_first_page_text : "|<" ; //defines first page button text
		this.btnNextPageHtml =		f!=undefined && f.btn_next_page_html!=undefined
										? f.btn_next_page_html : null; //defines next page button html
		this.btnPrevPageHtml =		f!=undefined && f.btn_prev_page_html!=undefined
										? f.btn_prev_page_html : null; //defines previous page button html
		this.btnFirstPageHtml =		f!=undefined && f.btn_first_page_html!=undefined
										? f.btn_first_page_html : null; //defines last page button html
		this.btnLastPageHtml =		f!=undefined && f.btn_last_page_html!=undefined
										? f.btn_last_page_html : null; //defines previous page button html
		this.btnPageCssClass =		f!=undefined && f.paging_btn_css_class!=undefined
										? f.paging_btn_css_class :'pgInp'; //css class for paging buttons (previous,next,etc.)
		this.nbPgSpanCssClass = 	f!=undefined && f.nb_pages_css_class!=undefined
										? f.nb_pages_css_class :'nbpg'; //css class for span containing tot nb of pages
		this.hasPagingBtns =		f!=undefined && f.paging_btns==false ? false : true; //enables/disables paging buttons
		this.pagingBtnEvents =		null; //stores paging buttons events
		
		/*** onkeyup event ***/
		this.onKeyUp =				f!=undefined && f.on_keyup ? true : false; //enables/disables onkeyup event, table is filtered when user stops typing
		this.onKeyUpDelay =			f!=undefined && f.on_keyup_delay!=undefined ? f.on_keyup_delay : 900; //onkeyup delay timer (msecs)
		this.isUserTyping = 		null; //
		this.onKeyUpTimer = 		undefined;		
		
		/*** keyword highlighting ***/
		this.highlightKeywords = 	f!=undefined && f.highlight_keywords ? true : false; //enables/disables keyword highlighting
		this.highlightCssClass =	f!=undefined && f.highlight_css_class!=undefined //defines css class for highlighting
										? f.highlight_css_class : "keyword";	
		
		/*** ids prefixes ***/
		this.prfxFlt =				'flt'; //filters (inputs - selects)
		this.prfxValButton =		'btn'; //validation button
		this.prfxInfDiv =			'inf_'; //container div for paging elements, rows counter etc.
		this.prfxLDiv =				'ldiv_'; //left div
		this.prfxRDiv =				'rdiv_'; //right div
		this.prfxMDiv =				'mdiv_'; //middle div
		this.prfxContentDiv =		'cont_'; //table container if fixed headers enabled
		this.prfxSlcPages =			'slcPages_'; //pages select
		this.prfxSlcResults = 		'slcResults_'; //results per page select
		this.prfxSlcResultsTxt =	'slcResultsTxt_'; //label preciding results per page select	
		this.prfxBtnNextSpan =		'btnNextSpan_'; //span containing next page button
		this.prfxBtnPrevSpan =		'btnPrevSpan_'; //span containing previous page button
		this.prfxBtnLastSpan =		'btnLastSpan_'; //span containing last page button
		this.prfxBtnFirstSpan =		'btnFirstSpan_'; //span containing first page button
		this.prfxBtnNext =			'btnNext_'; //next button
		this.prfxBtnPrev =			'btnPrev_'; //previous button
		this.prfxBtnLast =			'btnLast_'; //last button
		this.prfxBtnFirst =			'btnFirst_'; //first button
		this.prfxPgSpan =			'pgspan_'; //span for tot nb pages
		this.prfxPgBeforeSpan =		'pgbeforespan_'; //span preceding pages select (contains 'Page')
		this.prfxPgAfterSpan =		'pgafterspan_'; //span following pages select (contains ' of ')
		this.prfxTotRows =			'totrows_span_'; //nb displayed rows label
		this.prfxTotRowsTxt =		'totRowsTextSpan_'; //label preceding nb rows
		this.prfxResetSpan =		'resetspan_'; //span containing reset button
		this.prfxLoader =			'load_'; //loader div
		this.prfxCookieFltsValues =	'tf_flts_'; //cookie storing filter values
		this.prfxCookiePageNb =		'tf_pgnb_'; //cookie storing page nb
		this.prfxCookiePageLeng = 	'tf_pglen_';				
		
		/*** cookies ***/
		this.rememberGridValues =	f!=undefined && f.remember_grid_values ? true : false; //remembers filters values on page load
		this.fltsValuesCookie =		this.prfxCookieFltsValues + this.id; //cookie storing filter values
		this.rememberPageNb =		this.paging && f!=undefined && f.remember_page_number
										? true : false; //remembers page nb on page load	
		this.pgNbCookie =			this.prfxCookiePageNb + this.id; //cookie storing page nb
		this.rememberPageLen =		this.paging && f!=undefined && f.remember_page_length
										? true : false; //remembers page length on page load
		this.pgLenCookie =			this.prfxCookiePageLeng + this.id; //cookie storing page length
		this.cookieDuration =		100000; //cookie duration
		
		/*** import external script (deprecated: backward compatibility) ***/
		this.hasBindScript =		f!=undefined && f.bind_script ? true : false; //imports external script
		this.bindScript =			null;
		
    }//if tbl!=null		
}

TF.prototype.AddGrid = function()
/*====================================================
	- adds row with filtering grid bar and sets grid 
	behaviours and layout
=====================================================*/
{
	if(this.hasGrid) return;

	this.startRow==undefined ? this.refRow=2 : this.refRow=(this.startRow+1);
	try{ this.nbCells = this.GetCellsNb(this.refRow) }
	catch(e){ this.nbCells = this.GetCellsNb(0) }

	var _this = this;
	var f = this.fObj==undefined ? {} : this.fObj;
	var n = this.nbCells, inpclass;
	
	if(this.loader)
	{ 
		this.SetLoader();
		this.ShowLoader("");
	}

	if(this.hasResultsPerPage)
	{ 
		this.resultsPerPage = f["results_per_page"]!=undefined   
			? f["results_per_page"] : this.resultsPerPage;
		if(this.resultsPerPage.length<2)
			this.hasResultsPerPage = false;
		else
			this.pagingLength = this.resultsPerPage[1][0];
	}
	
	if(!this.fltGrid)
	{ 
		this.refRow = (this.refRow-1);
		this.nbFilterableRows = this.GetRowsNb();
		this.nbVisibleRows = this.nbFilterableRows;
	} else {
		if(this.isFirstLoad)
		{
			var fltrow;
			var thead = tf_Tag(this.tbl,'thead');
			if( thead.length>0 )
				fltrow = thead[0].insertRow(this.filtersRowIndex);
			else
				fltrow = this.tbl.insertRow(this.filtersRowIndex);
			
			if(this.fixedHeaders) this.SetFixedHeaders();

			fltrow.className = this.fltsRowCssClass;
			if( this.isExternalFlt ) fltrow.style.display = 'none';		
			this.nbFilterableRows = this.GetRowsNb();
			this.nbVisibleRows = this.nbFilterableRows;
			this.nbRows = this.tbl.rows.length;
			
			for(var i=0; i<n; i++)// this loop adds filters
			{
				var fltcell = tf_CreateElm(this.fltCellTag);
				fltrow.appendChild( fltcell );
				inpclass = (i==n-1 && this.displayBtn) ? this.fltSmallCssClass : this.fltCssClass;
				if( this["col"+i]!=undefined ) 
				{
					f["col_"+i] = 
						(this["col"+i].tf_LCase()!='none' && this["col"+i].tf_LCase()!='select') 
						? undefined : this["col"+i];
				}
				if(f["col_"+i]==undefined || f["col_"+i].tf_LCase()=="none")
				{
					var inptype;
					(f["col_"+i]==undefined) ? inptype="text" : inptype="hidden";//show/hide input	
					var inp = tf_CreateElm( "input",["id",this.prfxFlt+i+"_"+this.id],["type",inptype] );					
					inp.className = inpclass;// for ie<=6
					inp.onfocus = function(){ 
						_this.activeFilterId=this.getAttribute('id');
						_this.activeFlt = tf_Id(_this.activeFilterId); 
					};
					
					if( this.isExternalFlt && this.externalFltTgtIds && tf_Id(this.externalFltTgtIds[i]) )
					{//filter is appended in desired element
						tf_Id( this.externalFltTgtIds[i] ).appendChild(inp);
						this.externalFltEls.push(inp);
					} else {
						fltcell.appendChild(inp);
					}
					
					this.fltIds.push(this.prfxFlt+i+"_"+this.id);
					
					if(this.enterKey) inp.onkeypress = _DetectKey;
					if(this.onKeyUp){ 
						inp.onkeydown = _OnKeyDown;
						inp.onkeyup = _OnKeyUp;
						inp.onblur = _OnBlur;
					}
				}
				else if(f["col_"+i].tf_LCase()=="select")
				{						
					var slc = tf_CreateElm( "select",["id",this.prfxFlt+i+"_"+this.id] );
					slc.className = inpclass;// for ie<=6				
					slc.onfocus = function(){ 
						_this.activeFilterId = this.getAttribute('id');
						_this.activeFlt = tf_Id(_this.activeFilterId);
					};
					
					if( this.isExternalFlt && this.externalFltTgtIds && tf_Id(this.externalFltTgtIds[i]) )
					{//filter is appended in desired element
						tf_Id( this.externalFltTgtIds[i] ).appendChild(slc);
						this.externalFltEls.push(slc);
					} else {
						fltcell.appendChild(slc);
					}
					
					this.fltIds.push(this.prfxFlt+i+"_"+this.id);
					
					(this.refreshFilters) ? this.PopulateSelect(i,true) : this.PopulateSelect(i);
	
					if(this.enterKey) slc.onkeypress = _DetectKey;
					if(this.onSlcChange) 
					{
						(!this.isModFilterFn) 
							? slc.onchange = function(){ if(_this.onSlcChange) _this.Filter(); }  
							: slc.onchange = f["mod_filter_fn"];
					} 
				}// else if select
				
				if(i==n-1 && this.displayBtn)// this adds validation button
				{
					var btn = tf_CreateElm( "input",["id",this.prfxValButton+i+"_"+this.id],
											["type","button"], ["value",this.btnText] );
					btn.className = this.btnCssClass;
					
					if( this.isExternalFlt && this.externalFltTgtIds && tf_Id(this.externalFltTgtIds[i]) ) 
					//filter is appended in desired element
						tf_Id( this.externalFltTgtIds[i] ).appendChild(btn);
					else
						fltcell.appendChild(btn);
					
					(!this.isModFilterFn) 
						? btn.onclick = function(){ _this.Filter(); } : btn.onclick = f["mod_filter_fn"];					
				}//if
				
			}// for i
		} else {
			this.__resetGrid();
		}//if isFirstLoad
		
	}//if this.fltGrid
	
	/* Filter behaviours */
	if(this.fixedHeaders && !this.isFirstLoad) this.SetFixedHeaders();
	if(this.rowsCounter) this.SetRowsCounter();
	if(this.paging)	this.SetPaging();
	if(this.hasResultsPerPage && this.paging)
		this.SetResultsPerPage();
	if(this.btnReset) this.SetResetBtn();
	
	if(this.hasColWidth) this.SetColWidths();
	
	if(this.rememberGridValues) this.ResetGridValues(this.fltsValuesCookie);
	if(this.rememberPageNb) this.ResetPage( this.pgNbCookie );
	if(this.rememberPageLen) this.ResetPageLength( this.pgLenCookie );
	
	if( this.alternateBgs && this.isStartBgAlternate )
		this.SetAlternateRows(); //1st time only if no paging and rememberGridValues
	
	if(this.hasColOperation && this.fltGrid)
	{
		this.colOperation = f.col_operation;
		this.SetColOperation();
	}
		
	if(this.hasBindScript)
	{
		this.bindScript = f.bind_script;
		if(	this.bindScript!=undefined &&
			this.bindScript["target_fn"]!=undefined )
		{//calls a fn if defined  
			this.bindScript["target_fn"].call(null,id);
		}
	}//if bindScript
	/* */
	
	this.isFirstLoad = false;
	this.hasGrid = true;
	this.ShowLoader('none');	
	
	function _DetectKey(e)
	/*====================================================
		- common fn that detects return key for a given
		element (onkeypress attribute on input)
	=====================================================*/
	{
		var evt=(e)?e:(window.event)?window.event:null;
		if(evt)
		{
			var key=(evt.charCode)?evt.charCode:
				((evt.keyCode)?evt.keyCode:((evt.which)?evt.which:0));
			if(key=="13")
			{
				(_this.isModFilterFn) ? _this.modFilterFn.call() : _this.Filter();
			} else { 
				_this.isUserTyping = true;
				window.clearInterval(_this.onKeyUpTimer);
				_this.onKeyUpTimer = undefined; 
			}
		}//if evt	
	}
	
	function _OnKeyUp(e)
	/*====================================================
		- onkeyup event for text filters 
		onKeyUp property)
	=====================================================*/
	{
		var evt=(e)?e:(window.event)?window.event:null;
		var key=(evt.charCode)?evt.charCode:
				((evt.keyCode)?evt.keyCode:((evt.which)?evt.which:0));
		_this.isUserTyping = false;
		
		if( key!=13 && key!=9 && key!=27 && key!=38 && key!=40 )
		{
			function filter()
			{
				window.clearInterval(_this.onKeyUpTimer);
				_this.onKeyUpTimer = undefined;
				if( !_this.isUserTyping )
				{	
					(_this.isModFilterFn) ? _this.modFilterFn.call() : _this.Filter();
					_this.isUserTyping = null;			
				}
				
			}
			if(_this.onKeyUpTimer==undefined)
				_this.onKeyUpTimer = window.setInterval( filter, _this.onKeyUpDelay );
		} else { 
			window.clearInterval(_this.onKeyUpTimer); 
			_this.onKeyUpTimer = undefined; 
		}
	}// _OnKeyup
	
	function _OnKeyDown(e)
	/*====================================================
		- onkeydown event for text filters 
		(onKeyUp property)
	=====================================================*/
	{
		_this.isUserTyping = true;
	}
	
	function _OnBlur(e)
	/*====================================================
		- onblur event for text filters (onKeyUp property)
	=====================================================*/
	{
		_this.isUserTyping = false; 
		clearInterval(_this.onKeyUpTimer); 
	}
	
}// AddGrid

TF.prototype.RemoveGrid = function()
/*====================================================
	- removes a filter grid
=====================================================*/
{
	if( this.fltGrid && this.hasGrid )
	{
		var row = this.tbl.rows;
		
		this.ClearFilters();
		this.RemovePaging();
		this.RemoveRowsCounter();
		this.RemoveResetBtn();
		this.RemoveResultsPerPage();
		this.RemoveExternalFlts();
		this.RemoveFixedHeaders();
		this.RemoveTopDiv();
		this.UnhighlightAll();
		
		for(var j=this.refRow; j<this.nbRows; j++)
		{//this loop shows all rows and removes validRow attribute			
			row[j].style.display = "";
			try
			{ 
				if( row[j].hasAttribute("validRow") ) 
					row[j].removeAttribute("validRow");
			} //ie<=6 doesn't support hasAttribute method
			catch(e){
				for( var x = 0; x < row[j].attributes.length; x++ ) 
				{
					if( row[j].attributes[x].nodeName.tf_LCase()=="validrow" ) 
						row[j].removeAttribute("validRow");
				}//for x
			}//catch(e)
			
			//removes alterning colors
			tf_removeClass(row[j],this.rowBgEvenCssClass);
			tf_removeClass(row[j],this.rowBgOddCssClass);
			
		}//for j

		if(this.fltGrid)
		{
			this.fltGridEl = row[this.filtersRowIndex];			
			this.tbl.deleteRow(this.filtersRowIndex);
		}
		this.activeFlt = null;
		this.isStartBgAlternate = true;
		this.hasGrid = false;

	}//if this.fltGrid
}

TF.prototype.SetTopDiv = function()
/*====================================================
	- Generates div above table where paging,
	reset button, rows counter label etc. are placed
=====================================================*/
{
	if( this.infDiv!=null ) return;

	/*** container div ***/
	var infdiv = tf_CreateElm( "div",["id",this.prfxInfDiv+this.id] );
	infdiv.className = this.infDivCssClass;// setAttribute method doesn't seem to work on ie<=6
	if(this.fixedHeaders && this.contDiv)
		this.contDiv.parentNode.insertBefore(infdiv, this.contDiv);
	else
		this.tbl.parentNode.insertBefore(infdiv, this.tbl);
	this.infDiv = tf_Id( this.prfxInfDiv+this.id );
	
	/*** left div containing rows # displayer ***/
	var ldiv = tf_CreateElm( "div",["id",this.prfxLDiv+this.id] );
	ldiv.className = this.lDivCssClass;/*"ldiv"*/;
	infdiv.appendChild(ldiv);
	this.lDiv = tf_Id( this.prfxLDiv+this.id );		
	
	/*** 	right div containing reset button 
			+ nb results per page select 	***/	
	var rdiv = tf_CreateElm( "div",["id",this.prfxRDiv+this.id] );
	rdiv.className = this.rDivCssClass/*"rdiv"*/;
	infdiv.appendChild(rdiv);
	this.rDiv = tf_Id( this.prfxRDiv+this.id );
	
	/*** mid div containing paging elements ***/
	var mdiv = tf_CreateElm( "div",["id",this.prfxMDiv+this.id] );
	mdiv.className = this.mDivCssClass/*"mdiv"*/;						
	infdiv.appendChild(mdiv);
	this.mDiv = tf_Id( this.prfxMDiv+this.id );
}

TF.prototype.RemoveTopDiv = function()
/*====================================================
	- Removes div above table where paging,
	reset button, rows counter label etc. are placed
=====================================================*/
{
	if( this.infDiv==null ) return;
	this.infDiv.parentNode.removeChild( this.infDiv );
	this.infDiv = null;
}

TF.prototype.SetFixedHeaders = function()
/*====================================================
	- CSS solution making headers fixed
=====================================================*/
{
	if((!this.hasGrid && !this.isFirstLoad) || !this.fixedHeaders) return;
	if(this.contDiv) return;	
	var thead = tf_Tag(this.tbl,'thead');
	if( thead.length==0 ) return;
	var tbody = tf_Tag(this.tbl,'tbody');	
	if( tbody[0].clientHeight!=0 ) 
	{//firefox returns tbody height
		//previous values
		this.prevTBodyH = tbody[0].clientHeight;
		this.prevTBodyOverflow = tbody[0].style.overflow;
		this.prevTBodyOverflowX = tbody[0].style.overflowX;
		
		tbody[0].style.height = this.tBodyH+'px';
		tbody[0].style.overflow = 'auto';
		tbody[0].style.overflowX = 'hidden';
		
	} else { //IE returns 0
		// cont div is added to emulate fixed headers behaviour
		var contDiv = tf_CreateElm( "div",["id",this.prfxContentDiv+this.id] );
		contDiv.className = this.contDivCssClass;
		this.tbl.parentNode.insertBefore(contDiv, this.tbl);
		contDiv.appendChild(this.tbl);
		this.contDiv = tf_Id(this.prfxContentDiv+this.id);
		//prevents headers moving during window scroll (IE)
		this.contDiv.style.position = 'relative';
		
		var theadH = 0;
		var theadTr = tf_Tag(thead[0],'tr');	
		for(var i=0; i<theadTr.length; i++)
		{//css below emulates fixed headers on IE<=6
			theadTr[i].style.cssText += 'position:relative; ' +
										'top:expression(offsetParent.scrollTop);';
			theadH += parseInt(theadTr[i].clientHeight);
		}
		
		this.contDiv.style.height = (this.tBodyH+theadH)+'px';
		
		var tfoot = tf_Tag(this.tbl,'tfoot');
		if( tfoot.length==0 ) return;
		
		var tfootTr = tf_Tag(tfoot[0],'tr');
			
		for(var j=0; j<tfootTr.length; j++)//css below emulates fixed footer on IE<=6
			tfootTr[j].style.cssText += 'position:relative; overflow-x: hidden; ' +
										'top: expression(parentNode.parentNode.offsetHeight >= ' +
	  									'offsetParent.offsetHeight ? 0 - parentNode.parentNode.offsetHeight + '+ 
										'offsetParent.offsetHeight + offsetParent.scrollTop : 0);';		
	}	
}

TF.prototype.RemoveFixedHeaders = function()
/*====================================================
	- Removes fixed headers
=====================================================*/
{
	if(!this.hasGrid || !this.fixedHeaders ) return;
	if( this.contDiv )//IE additional div
	{
		this.contDiv.parentNode.insertBefore(this.tbl, this.contDiv);
		this.contDiv.parentNode.removeChild( this.contDiv );
		this.contDiv = null;
		var thead = tf_Tag(this.tbl,'thead');
		if( thead.length==0 ) return;
		var theadTr = tf_Tag(thead[0],'tr');
		if( theadTr.length==0 ) return;
		for(var i=0; i<theadTr.length; i++)
			theadTr[i].style.cssText = '';
		var tfoot = tf_Tag(this.tbl,'tfoot');
		if( tfoot.length==0 ) return;		
		var tfootTr = tf_Tag(tfoot[0],'tr');	
		for(var j=0; j<tfootTr.length; j++)
		{
			tfootTr[j].style.position = 'relative';
			tfootTr[j].style.top = '';
			tfootTr[j].style.overeflowX = '';
		}
	} else {
		var tbody = tf_Tag(this.tbl,'tbody');
		if( tbody.length==0 ) return;
		tbody[0].style.height = this.prevTBodyH+'px';
		tbody[0].style.overflow = this.prevTBodyOverflow;
		tbody[0].style.overflowX = this.prevTBodyOverflowX;
	}
		
}

TF.prototype.SetPaging = function()
/*====================================================
	- Generates paging elements:
		- pages drop-down list
		- previous, next, first, last buttons
=====================================================*/
{
	if(!this.hasGrid && !this.isFirstLoad) return;
	if(!this.paging || (!this.isPagingRemoved && !this.isFirstLoad)) return;
	var _this = this;
	var start_row = this.refRow;
	var nrows = this.nbRows;
	this.nbPages = Math.ceil( (nrows-start_row)/this.pagingLength );//calculates page nb
	
	// Paging drop-down list
	var slcPages = tf_CreateElm( "select", ["id",this.prfxSlcPages+this.id] );
	slcPages.className = this.pgSlcCssClass;
	slcPages.onchange = function(){ 
		_this.ChangePage(); 
		this.blur();
		if(this.parentNode) this.parentNode.focus(); 
	}
	
	var btnNextSpan, btnPrevSpan, btnLastSpan, btnFirstSpan;// btns containers
	btnNextSpan = tf_CreateElm("span",["id",this.prfxBtnNextSpan+this.id]);
	btnPrevSpan = tf_CreateElm("span",["id",this.prfxBtnPrevSpan+this.id]);
	btnLastSpan = tf_CreateElm("span",["id",this.prfxBtnLastSpan+this.id]);
	btnFirstSpan = tf_CreateElm("span",["id",this.prfxBtnFirstSpan+this.id]);
	
	if(this.hasPagingBtns)
	{
		if(this.btnNextPageHtml==null)
		{// Next button
			var btn_next = tf_CreateElm( "input",["id",this.prfxBtnNext+this.id],
				["type","button"],["value",this.btnNextPageText],["title","Next"] );
			btn_next.className = this.btnPageCssClass;
			btn_next.onclick = function(){ btnFn.next(); }
			btnNextSpan.appendChild(btn_next);
		} else {
			btnNextSpan.innerHTML = this.btnNextPageHtml;
			btnNextSpan.onclick = function(){ btnFn.next(); };
		}
		
		if(this.btnPrevPageHtml==null)
		{// Previous button
			var btn_prev = tf_CreateElm( "input",["id",this.prfxBtnPrev+this.id],
				["type","button"],["value",this.btnPrevPageText],["title","Previous"] );
			btn_prev.className = this.btnPageCssClass;
			btn_prev.onclick = function(){ btnFn.prev(); }
			btnPrevSpan.appendChild(btn_prev);
		} else { 
			btnPrevSpan.innerHTML = this.btnPrevPageHtml;
			btnPrevSpan.onclick = function(){ btnFn.prev(); };
		}
		
		if(this.btnLastPageHtml==null)
		{// Last button
			var btn_last = tf_CreateElm( "input",["id",this.prfxBtnLast+this.id],
				["type","button"],["value",this.btnLastPageText],["title","Last"] );
			btn_last.className = this.btnPageCssClass;
			btn_last.onclick = function(){ btnFn.last(); }
			btnLastSpan.appendChild(btn_last);
		} else { 
			btnLastSpan.innerHTML = this.btnLastPageHtml;
			btnLastSpan.onclick = function(){ btnFn.last(); };
		}
		
		if(this.btnFirstPageHtml==null)
		{// First button
			var btn_first = tf_CreateElm( "input",["id",this.prfxBtnFirst+this.id],
				["type","button"],["value",this.btnFirstPageText],["title","First"] );
			btn_first.className = this.btnPageCssClass;
			btn_first.onclick = function(){ btnFn.first(); }
			btnFirstSpan.appendChild(btn_first);
		} else { 
			btnFirstSpan.innerHTML = this.btnFirstPageHtml;
			btnFirstSpan.onclick = function(){ btnFn.first(); };
		}			
	}//if this.hasPagingBtns
	
	// paging elements (buttons+drop-down list) are added to defined element
	if(this.pagingTgtId==null) this.SetTopDiv();
	var targetEl = ( this.pagingTgtId==null ) ? this.mDiv : tf_Id( this.pagingTgtId );
	
	/***	if paging previously removed this prevents IE memory leak with removeChild 
			used in RemovePaging method. For more info refer to
			http://forums.microsoft.com/MSDN/ShowPost.aspx?PostID=2840253&SiteID=1	***/
	if ( targetEl.innerHTML!='' ) targetEl.innerHTML = '';
	/*** ***/
	
	targetEl.appendChild(btnPrevSpan);
	targetEl.appendChild(btnFirstSpan);
	
	var pgBeforeSpan = tf_CreateElm( "span",["id",this.prfxPgBeforeSpan+this.id] );
	pgBeforeSpan.appendChild( tf_CreateText(" Page ") );
	pgBeforeSpan.className = this.nbPgSpanCssClass;
	targetEl.appendChild(pgBeforeSpan);
	targetEl.appendChild(slcPages);
	var pgAfterSpan = tf_CreateElm( "span",["id",this.prfxPgAfterSpan+this.id] );
	pgAfterSpan.appendChild( tf_CreateText(" of ") );
	pgAfterSpan.className = this.nbPgSpanCssClass;
	targetEl.appendChild(pgAfterSpan)
	var pgspan = tf_CreateElm( "span",["id",this.prfxPgSpan+this.id] );
	pgspan.className = this.nbPgSpanCssClass;
	pgspan.appendChild( tf_CreateText(" "+this.nbPages+" ") );
	targetEl.appendChild(pgspan);
	targetEl.appendChild(btnLastSpan);
	targetEl.appendChild(btnNextSpan);

	this.pagingSlc = tf_Id(this.prfxSlcPages+this.id); //to be easily re-used	
	
	var btnFn = {// onclick event for paging buttons
		slc: _this.pagingSlc,
		slcIndex: function(){ return this.slc.options.selectedIndex },
		nbOpts: function(){ return parseInt(this.slc.options.length)-1 },
		next: function(){
			var nextIndex = this.slcIndex()<this.nbOpts() ? this.slcIndex()+1 : 0;
			_this.ChangePage( nextIndex );
		},
		prev: function(){
			var prevIndex = this.slcIndex()>0 ? this.slcIndex()-1 : this.nbOpts();
			_this.ChangePage( prevIndex );
		},
		last: function(){
			_this.ChangePage( this.nbOpts() );
		},
		first: function(){
			_this.ChangePage( 0 );
		}
	};
	
	// if this.rememberGridValues==true this.SetPagingInfo() is called
	// in ResetGridValues() method
	if( !this.rememberGridValues || this.isPagingRemoved )
		this.SetPagingInfo();
		
	this.pagingBtnEvents = btnFn;
	this.isPagingRemoved = false;
}

TF.prototype.RemovePaging = function()
/*====================================================
	- Removes paging elements
=====================================================*/
{
	if(!this.hasGrid) return;
	if( this.pagingSlc==null ) return;
	var btnNextSpan, btnPrevSpan, btnLastSpan, btnFirstSpan;// btns containers
	var pgBeforeSpan, pgAfterSpan, pgspan;
	btnNextSpan = tf_Id(this.prfxBtnNextSpan+this.id);
	btnPrevSpan = tf_Id(this.prfxBtnPrevSpan+this.id);
	btnLastSpan = tf_Id(this.prfxBtnLastSpan+this.id);
	btnFirstSpan = tf_Id(this.prfxBtnFirstSpan+this.id);
	pgBeforeSpan = tf_Id(this.prfxPgBeforeSpan+this.id);//span containing 'Page' text
	pgAfterSpan = tf_Id(this.prfxPgAfterSpan+this.id);//span containing 'of' text
	pgspan = tf_Id(this.prfxPgSpan+this.id);//span containing nb of pages
	
	this.pagingSlc.parentNode.removeChild(this.pagingSlc);
	
	if( btnNextSpan!=null )
		btnNextSpan.parentNode.removeChild( btnNextSpan );

	if( btnPrevSpan!=null )
		btnPrevSpan.parentNode.removeChild( btnPrevSpan );

	if( btnLastSpan!=null )
		btnLastSpan.parentNode.removeChild( btnLastSpan );

	if( btnFirstSpan!=null )
		btnFirstSpan.parentNode.removeChild( btnFirstSpan );

	if( pgBeforeSpan!=null )
		pgBeforeSpan.parentNode.removeChild( pgBeforeSpan );

	if( pgAfterSpan!=null )
		pgAfterSpan.parentNode.removeChild( pgAfterSpan );

	if( pgspan!=null )
		pgspan.parentNode.removeChild( pgspan );	
	
	this.pagingBtnEvents = null;	
	this.pagingSlc = null;
	this.isPagingRemoved = true;
}

TF.prototype.SetRowsCounter = function()
/*====================================================
	- Generates rows counter label
=====================================================*/
{
	if(!this.hasGrid && !this.isFirstLoad) return;
	if( this.rowsCounterSpan!=null ) return;
	var countSpan = tf_CreateElm( "span",["id",this.prfxTotRows+this.id] ); // tot # of rows label
	countSpan.className = this.totRowsCssClass;
	var countText = tf_CreateElm( "span",["id",this.prfxTotRowsTxt+this.id] );
	countText.className = this.totRowsCssClass;
	countText.appendChild( tf_CreateText(this.rowsCounterText) );
	
	// counter is added to defined element
	if(this.rowsCounterTgtId==null) this.SetTopDiv();
	var targetEl = ( this.rowsCounterTgtId==null ) ? this.lDiv : tf_Id( this.rowsCounterTgtId );
	
	targetEl.appendChild(countText);
	targetEl.appendChild(countSpan);
	this.rowsCounterSpan = tf_Id( this.prfxTotRows+this.id );
	this.RefreshNbRows();	
}

TF.prototype.RemoveRowsCounter = function()
/*====================================================
	- Removes rows counter label
=====================================================*/
{
	if(!this.hasGrid) return;
	if( this.rowsCounterSpan==null ) return;
	var countText, countSpan;
	countText = tf_Id(this.prfxTotRowsTxt+this.id);
	countSpan = tf_Id(this.prfxTotRows+this.id); 
	if( countText!=null )
		countText.parentNode.removeChild( countText );
	if( countSpan!=null )
		countSpan.parentNode.removeChild( countSpan );
	this.rowsCounterSpan = null;
}

TF.prototype.SetResultsPerPage = function()
/*====================================================
	- Generates results per page select + label
=====================================================*/
{
	if(!this.hasGrid && !this.isFirstLoad) return;
	if( this.resultsPerPageSlc!=null || this.resultsPerPage==null ) return;
	var _this = this;
	var slcR = tf_CreateElm( "select",["id",this.prfxSlcResults+this.id] );
	slcR.className = this.resultsSlcCssClass;
	var slcRText = this.resultsPerPage[0], slcROpts = this.resultsPerPage[1];
	var slcRSpan = tf_CreateElm( "span",["id",this.prfxSlcResultsTxt+this.id] );
	slcRSpan.className = this.resultsSpanCssClass;
	
	// results per page select is added to defined element
	if(this.resultsPerPageTgtId==null) this.SetTopDiv();
	var targetEl = ( this.resultsPerPageTgtId==null ) ? this.rDiv : tf_Id( this.resultsPerPageTgtId );
	slcRSpan.appendChild(tf_CreateText(slcRText));
	targetEl.appendChild(slcRSpan);
	targetEl.appendChild(slcR);
	
	this.resultsPerPageSlc = tf_Id(this.prfxSlcResults+this.id);
	
	for(var r=0; r<slcROpts.length; r++)
	{
		var currOpt = new Option(slcROpts[r],slcROpts[r],false,false);
		this.resultsPerPageSlc.options[r] = currOpt;
	}
	slcR.onchange = function(){ 
		_this.ChangeResultsPerPage(); 
		this.blur();
		if(_this.parentNode) this.parentNode.focus(); 
	}
}

TF.prototype.RemoveResultsPerPage = function()
/*====================================================
	- Removes results per page select + label
=====================================================*/
{
	if(!this.hasGrid) return;
	if( this.resultsPerPageSlc==null || this.resultsPerPage==null ) return;
	var slcR, slcRSpan;
	slcR = tf_Id( this.prfxSlcResults+this.id );
	slcRSpan = tf_Id( this.prfxSlcResultsTxt+this.id );
	if( slcR!=null )
		slcR.parentNode.removeChild( slcR );
	if( slcRSpan!=null )
		slcRSpan.parentNode.removeChild( slcRSpan );
	this.resultsPerPageSlc = null;
}

TF.prototype.SetResetBtn = function()
/*====================================================
	- Generates reset button
=====================================================*/
{
	if(!this.hasGrid && !this.isFirstLoad) return;
	if( this.btnResetEl!=null ) return;
	var _this = this;
	var resetspan = tf_CreateElm("span",["id",this.prfxResetSpan+this.id]);
	
	// reset button is added to defined element
	if(this.btnResetTgtId==null) this.SetTopDiv();
	var targetEl = ( this.btnResetTgtId==null ) ? this.rDiv : tf_Id( this.btnResetTgtId );
	targetEl.appendChild(resetspan);
		
	if(this.btnResetHtml==null)
	{	
		var fltreset = tf_CreateElm( "a", ["href","javascript:void(0);"] );
		fltreset.className = this.btnResetCssClass;
		fltreset.appendChild(tf_CreateText(this.btnResetText));
		resetspan.appendChild(fltreset);
		fltreset.onclick = function(){ _this.ClearFilters(); _this.Filter(); };
	} else {
		resetspan.innerHTML = this.btnResetHtml;
		var resetEl = resetspan.firstChild;
		resetEl.onclick = function(){ _this.ClearFilters(); _this.Filter(); };
	}
	this.btnResetEl = tf_Id(this.prfxResetSpan+this.id).firstChild;	
}

TF.prototype.RemoveResetBtn = function()
/*====================================================
	- Removes reset button
=====================================================*/
{
	if(!this.hasGrid) return;
	if( this.btnResetEl==null ) return;
	var resetspan = tf_Id(this.prfxResetSpan+this.id);
	if( resetspan!=null )
		resetspan.parentNode.removeChild( resetspan );
	this.btnResetEl = null;	
}

TF.prototype.PopulateSelect = function(cellIndex,isRefreshed)
/*====================================================
	- populates select
	- adds only 1 occurence of a value
=====================================================*/
{
	var slcId = this.prfxFlt+cellIndex+"_"+this.id;
	if( tf_Id(slcId)==null ) return;
	var _this = this;
	var row = this.tbl.rows;
	var OptArray = [], slcInnerHtml = '', opt0;

	for(var k=this.refRow; k<this.nbRows; k++)
	{
		// always visible rows don't need to appear on selects as always valid
		if( this.hasVisibleRows && this.visibleRows.tf_Has(k) && !this.paging ) 
			continue;
			
		var cell = tf_GetChildElms(row[k]).childNodes;
		var nchilds = cell.length;
		
		if(nchilds == this.nbCells)
		{// checks if row has exact cell #
			
			for(var j=0; j<nchilds; j++)// this loop retrieves cell data
			{
				if((cellIndex==j && !isRefreshed) || (cellIndex==j && isRefreshed && row[k].style.display == ""))
				{
					var cell_data = tf_GetCellText(cell[j]);
					var cell_string = cell_data.tf_MatchCase(this.matchCase).tf_Trim();//Vary Peter's patch
					// checks if celldata is already in array
					var isMatched = false;				
					isMatched = OptArray.tf_Has(cell_string,this.matchCase);
					
					if(!isMatched)
						OptArray.push(cell_data);					
				}//if cellIndex==j
			}//for j
		}//if
	}//for k
	
	if(this.sortSlc) OptArray.sort();
	
	if(this.sortNumAsc && this.sortNumAsc.tf_Has(cellIndex))
	{//asc sort
		try{ OptArray.sort( tf_NumSortAsc ); } 
		catch(e) { OptArray.sort(); }//in case there are alphanumeric values
	}
	if(this.sortNumDesc && this.sortNumDesc.tf_Has(cellIndex))
	{//desc sort
		try{ OptArray.sort( tf_NumSortDesc ); }
		catch(e){ OptArray.sort(); }//in case there are alphanumeric values
	}
	
	AddOpts();//populates drop-down
	
	function AddOpt0()
	{// adds 1st option
		if( _this.slcFillingMethod.tf_LCase() == 'innerhtml' )
			slcInnerHtml += '<option value="" selected="selected">'+_this.displayAllText+'</option>';
		else {
			opt0 = tf_CreateElm("option",["value",""],["selected",""]);
			opt0.appendChild( tf_CreateText(_this.displayAllText) );
			tf_Id(slcId).appendChild(opt0);
		}
	}
	
	function AddOpts()
	{// populates select
		tf_Id(slcId).innerHTML = '';
		AddOpt0();
		for(var y=0; y<OptArray.length; y++)
		{
			if( _this.slcFillingMethod.tf_LCase() == 'innerhtml' )
				slcInnerHtml += '<option value="'+OptArray[y]+'">'+OptArray[y]+'</option>';
			else {
				var opt = tf_CreateElm("option",["value",OptArray[y]]);
				opt.appendChild( tf_CreateText(OptArray[y]) );
				tf_Id(slcId).appendChild(opt);
			}
		}// for y
	}// fn AddOpt
	
	if( this.slcFillingMethod.tf_LCase() == 'innerhtml' )
		tf_Id(slcId).innerHTML = slcInnerHtml;
}

TF.prototype.Filter = function()
/*====================================================
	- Filtering fn
	- retrieves data from each td in every single tr
	and compares to search string for current
	column
	- tr is hidden if all search strings are not 
	found
=====================================================*/
{
	if( !this.fltGrid || (!this.hasGrid && !this.isFirstLoad) ) return;
	this.ShowLoader("");
	//invokes eventual onbefore method
	if(this.onBeforeFilter) this.onBeforeFilter.call();
	var row = this.tbl.rows;	
	f = this.fObj!=undefined ? this.fObj : [];
	var hiddenrows = 0;
	this.validRowsIndex = [];

	// removes keyword highlighting
	this.UnhighlightAll();
	
	// search args re-init
	this.searchArgs = this.GetFiltersValue(); 

	for(var k=this.refRow; k<this.nbRows; k++)
	{			
		/*** if table already filtered some rows are not visible ***/
		if(row[k].style.display == "none") row[k].style.display = "";
				
		var cell = tf_GetChildElms(row[k]).childNodes;
		var nchilds = cell.length;

		if(nchilds == this.nbCells)// checks if row has exact cell #
		{
			var cell_value = [];
			var occurence = [];
			var hasSearchArg = false;
			var isRowValid = (this.searchType=='include') ? true : false;
				
			for(var j=0; j<nchilds; j++)
			{// this loop retrieves cell data
				var cell_data = tf_GetCellText(cell[j]).tf_MatchCase(this.matchCase);
				cell_value.push(cell_data);

				if(this.searchArgs[j]!="")
				{
					var num_cell_data = parseFloat(cell_data);
					var re_le = new RegExp('<='), re_ge = new RegExp('>=');
					var re_l = new RegExp('<'), re_g = new RegExp('>');
					// first checks if there is any operator (<,>,<=,>=)
					if(re_le.test(this.searchArgs[j]) && !isNaN(num_cell_data))
						occurence[j] = num_cell_data <= parseFloat(this.searchArgs[j].replace(re_le,"")) ?  true : false;
					
					else if(re_ge.test(this.searchArgs[j]) && !isNaN(num_cell_data))
						occurence[j] = num_cell_data >= parseFloat(this.searchArgs[j].replace(re_ge,"")) ? true : false;
					
					else if(re_l.test(this.searchArgs[j]) && !isNaN(num_cell_data))
						occurence[j] = num_cell_data < parseFloat(this.searchArgs[j].replace(re_l,"")) ? true : false;
										
					else if(re_g.test(this.searchArgs[j]) && !isNaN(num_cell_data))
						occurence[j] = num_cell_data > parseFloat(this.searchArgs[j].replace(re_g,"")) ? true : false;					
					
					else 
					{						
						// Improved by Cedric Wartel (cwl)
						// automatic exact match for selects and special characters are now filtered
						var regexp;
						//(this.matchCase) ? modifier = "g" : modifier = "gi";
						modifier = (this.matchCase) ? 'g' : 'gi';
						if(this.exactMatch || f["col_"+j]=="select")//Vary Peter's patch
							regexp = new RegExp('(^\\s*)'+tf_RegexpEscape(this.searchArgs[j])+'(\\s*$)', modifier);							
						else 
							regexp = new RegExp(tf_RegexpEscape(this.searchArgs[j]), modifier);
						occurence[j] = regexp.test(cell_data);
						
						// keyword highlighting
						if( this.highlightKeywords && occurence[j] )
							tf_HighlightWord( cell[j],this.searchArgs[j],this.highlightCssClass );
					}
					
					if(!occurence[j]) isRowValid = (this.searchType=='include') ? false : true;
					hasSearchArg = true;
				}//if this.searchArgs
			}//for j
			
		}//if row has exact cell #
		
		if(!isRowValid && hasSearchArg)
		{
			this.SetRowValidation(k,false);
			// always visible rows need to be counted as valid
			if( this.hasVisibleRows && this.visibleRows.tf_Has(k) && !this.paging)
				this.validRowsIndex.push(k);
			else
				hiddenrows++;
		} else {
			this.SetRowValidation(k,true);
			this.validRowsIndex.push(k);
		}
		
	}// for k
	
	//this.nbVisibleRows = parseInt( this.nbFilterableRows )-hiddenrows;
	this.nbVisibleRows = this.validRowsIndex.length;
	this.nbHiddenRows = hiddenrows;
	this.isStartBgAlternate = false;
	if( this.rememberGridValues ) this.RememberFiltersValue(this.fltsValuesCookie);
	if( !this.paging ) this.ApplyFilterProps();//applies filter props after filtering process
	if( this.paging )
	{ 
		this.startPagingRow=0; 
		this.SetPagingInfo(this.validRowsIndex); 
	}//starts paging process
	//invokes eventual onafter function
	if(this.onAfterFilter) this.onAfterFilter.call();		
}

TF.prototype.SetPagingInfo = function( validRows )
/*====================================================
	- calculates page # according to valid rows
	- refreshes paging select according to page #
	- Calls GroupByPage method
=====================================================*/
{
	var row = this.tbl.rows;
	var mdiv = ( this.pagingTgtId==null ) ? this.mDiv : tf_Id( this.pagingTgtId );
	var pgspan = tf_Id(this.prfxPgSpan+this.id);

	if( validRows!=undefined ) this.validRowsIndex = validRows;//stores valid rows index
	else 
	{
		this.validRowsIndex = [];//re-sets valid rows index

		for(var j=this.refRow; j<this.nbRows; j++)//counts rows to be grouped 
		{
			var isRowValid = row[j].getAttribute("validRow");
			if(isRowValid=="true" || isRowValid==null )
					this.validRowsIndex.push(j);
		}//for j
	}

	//var npg = Math.ceil( nrows/this.pagingLength );//calculates page nb
	this.nbPages = Math.ceil( this.validRowsIndex.length/this.pagingLength );//calculates nb of pages
	pgspan.innerHTML = this.nbPages; //refresh page nb span 
	this.pagingSlc.innerHTML = "";//select clearing shortcut
	
	if( this.nbPages>0 )
	{
		mdiv.style.visibility = "visible";
		for(var z=0; z<this.nbPages; z++)
		{
			var currOpt = new Option((z+1),z*this.pagingLength,false,false);
			this.pagingSlc.options[z] = currOpt;
		}
	} else {/*** if no results paging select and buttons are hidden ***/
		mdiv.style.visibility = "hidden";
	}
	this.GroupByPage( this.validRowsIndex );
}

TF.prototype.GroupByPage = function( validRows )
/*====================================================
	- Displays current page rows
=====================================================*/
{
	var row = this.tbl.rows;
	var paging_end_row = parseInt( this.startPagingRow ) + parseInt( this.pagingLength );
	
	if( validRows!=undefined ) this.validRowsIndex = validRows;//stores valid rows index

	for(h=0; h<this.validRowsIndex.length; h++)
	{//this loop shows valid rows of current page
		if( h>=this.startPagingRow && h<paging_end_row )
			row[ this.validRowsIndex[h] ].style.display = "";
		else row[ this.validRowsIndex[h] ].style.display = "none";
	}
	
	this.nbVisibleRows = this.validRowsIndex.length;
	this.isStartBgAlternate = false;
	this.ApplyFilterProps();//re-applies filter behaviours after filtering process
}

TF.prototype.ApplyFilterProps = function()
/*====================================================
	- checks methods that should be called
	after filtering and/or paging process
=====================================================*/
{
	if( this.activeFlt && this.activeFlt.nodeName.tf_LCase()=='select' )
	{// blurs active filter (IE)
		this.activeFlt.blur(); 
		if(this.activeFlt.parentNode) this.activeFlt.parentNode.focus(); 
	}
	
	if( this.visibleRows ) this.SetVisibleRows();//shows rows always visible
	if( this.colOperation ) this.SetColOperation();//makes operation on a col
	if( this.refreshFilters ) this.RefreshFiltersGrid();//re-populates drop-down filters
	if( this.rowsCounter ) this.RefreshNbRows( parseInt(this.nbVisibleRows) );//refreshes rows counter
	if( this.alternateBgs ) this.SetAlternateRows();//alterning row colors
	
	this.ShowLoader("none");
}

TF.prototype.RefreshNbRows = function(p)
/*====================================================
	- Shows total number of filtered rows
=====================================================*/
{
	if(this.rowsCounterSpan == null) return;
	var totTxt;
	if(!this.paging)
	{
		if(p!=undefined && p!='') totTxt=p;
		else totTxt = (this.nbFilterableRows - this.nbHiddenRows);
	} else {
		var paging_start_row = parseInt(this.startPagingRow)+((this.nbVisibleRows>0) ? 1 : 0);//paging start row
		var paging_end_row = (paging_start_row+this.pagingLength)-1 <= this.nbVisibleRows 
			? (paging_start_row+this.pagingLength)-1 : this.nbVisibleRows;
		totTxt = paging_start_row+"-"+paging_end_row+" / "+this.nbVisibleRows;
	} 
	this.rowsCounterSpan.innerHTML = totTxt;
}

TF.prototype.ChangePage = function( index )
/*====================================================
	- Changes page
	- Param:
		- index: option index of paging select 
		(numeric value)
=====================================================*/
{
	if( !this.paging ) return;
	if( index==undefined ) index = this.pagingSlc.options.selectedIndex;
	if( index>=0 && index<=(this.nbPages-1) )
	{
		this.ShowLoader("");
		this.pagingSlc.options[index].selected = true;
		this.currentPageNb = (index+1);
		if( this.rememberPageNb ) this.RememberPageNb( this.pgNbCookie );
		this.startPagingRow = this.pagingSlc.value;
		this.GroupByPage();
	}
}

TF.prototype.ChangeResultsPerPage = function()
/*====================================================
	- calculates rows to be displayed in a page
	- method called by nb results per page select
=====================================================*/
{
	if( !this.fltGrid ) return;
	this.ShowLoader("");
	var slcR = this.resultsPerPageSlc;
	var slcPagesSelIndex = this.pagingSlc.selectedIndex;
	this.pagingLength = parseInt(slcR.options[slcR.selectedIndex].text);
	this.startPagingRow = this.pagingLength*slcPagesSelIndex;
	if( !isNaN(this.pagingLength) )
	{
		if( this.startPagingRow>=this.nbFilterableRows )
			this.startPagingRow = (this.nbFilterableRows-this.pagingLength);
		this.SetPagingInfo();
		var slcIndex = (this.pagingSlc.options.length-1<=slcPagesSelIndex ) 
						? (this.pagingSlc.options.length-1) : slcPagesSelIndex;
		this.pagingSlc.options[slcIndex].selected = true;
		if( this.rememberPageLen ) this.RememberPageLength( this.pgLenCookie );
	}//if isNaN
}

TF.prototype.GetColValues = function(colindex,num,exclude)
/*====================================================
	- returns an array containing cell values of
	a column
	- needs following args:
		- column index (number)
		- a boolean set to true if we want only 
		numbers to be returned
		- array containing rows index to be excluded
		from returned values
=====================================================*/
{
	if( !this.fltGrid ) return;
	var row = this.tbl.rows;
	var colValues = [];

	for(var i=this.refRow; i<this.nbRows; i++)//iterates rows
	{
		var isExludedRow = false;
		if(exclude!=undefined && (typeof exclude).tf_LCase()=="object")
		{ // checks if current row index appears in exclude array
			isExludedRow = exclude.tf_Has(i); //boolean
		}
		var cell = tf_GetChildElms(row[i]).childNodes;
		var nchilds = cell.length;
		
		if(nchilds == this.nbCells && !isExludedRow)
		{// checks if row has exact cell # and is not excluded
			for(var j=0; j<nchilds; j++)// this loop retrieves cell data
			{
				if(j==colindex && row[i].style.display=="" )
				{
					var cell_data = tf_GetCellText( cell[j] ).tf_LCase();
					(num) ? colValues.push( parseFloat(cell_data) ) : colValues.push( cell_data );
				}//if j==k
			}//for j
		}//if nchilds == this.nbCells
	}//for i
	return colValues;	
}

TF.prototype.GetFilterValue = function(index)
/*====================================================
	- Returns value of a specified filter
	- Params:
		- index: filter column index (numeric value)
=====================================================*/
{
	if( !this.fltGrid ) return;
	var fltValue;
	for(var i=0; i<this.fltIds.length; i++)
		if( i==index ) fltValue = tf_Id(this.fltIds[i]).value;
	return fltValue;
}

TF.prototype.GetFiltersValue = function()
/*====================================================
	- Returns the value of every single filter
=====================================================*/
{
	if( !this.fltGrid ) return;
	var searchArgs = [];
	for(var i=0; i<this.fltIds.length; i++)
		searchArgs.push(
			this.GetFilterValue(i).tf_MatchCase(this.matchCase).tf_Trim() 
		);
	return searchArgs;
}

TF.prototype.GetFiltersByType = function(type,bool)
/*====================================================
	- returns an array containing ids of filters of a 
	specified type (inputs or selects)
	- Note that hidden filters are also returned
	- Needs folllowing args:
		- filter type string ("input" or "select")
		- optional boolean: if set true method
		returns column indexes otherwise filters ids
=====================================================*/
{
	if( !this.fltGrid ) return;
	var arr = [];
	for(var i=0; i<this.fltIds.length; i++)
	{
		var curFlt =  tf_Id(this.fltIds[i]);
		var fltType = curFlt.nodeName.tf_LCase();
		if(fltType == type.tf_LCase())
		{
			var a = (bool) ? i : curFlt.getAttribute("id");
			arr.push(a);
		}
	}// for i
	return arr;
}

TF.prototype.GetCellsNb = function( rowIndex )
/*====================================================
	- returns number of cells in a row
	- if rowIndex param is passed returns number of 
	cells of specified row (number)
=====================================================*/
{
	var tr = (rowIndex == undefined) ? this.tbl.rows[0] : this.tbl.rows[rowIndex];
	var n = tf_GetChildElms(tr);
	return n.childNodes.length;
}

TF.prototype.GetRowsNb = function()
/*====================================================
	- returns total nb of filterable rows starting 
	from reference row if defined
=====================================================*/
{
	var s = this.refRow==undefined ? 0 : this.refRow;
	var ntrs = this.tbl.rows.length;
	return parseInt(ntrs-s);
}

TF.prototype.GetTableData = function()
/*====================================================
	- returns an array containing table data:
	[rowindex,[value1,value2,value3...]]
=====================================================*/
{
	var row = this.tbl.rows;
	for(var k=this.refRow; k<this.nbRows; k++)
	{
		var rowData, cellData;
		rowData = [k,[]];
		
		var cell = tf_GetChildElms(row[k]).childNodes;
		var nchilds = cell.length;
		for(var j=0; j<nchilds; j++)
		{// this loop retrieves cell data
			var cell_data = tf_GetCellText(cell[j]);
			rowData[1].push( cell_data );
		}
		this.tblData.push( rowData )
	}
	return this.tblData;
}

TF.prototype.GetRowDisplay = function(row)
{
	if( !this.fltGrid && typeof row.tf_LCase!='object' ) return;
	return row.style.display;
}

TF.prototype.SetRowValidation = function( rowIndex,isValid )
/*====================================================
	- Validates/unvalidates row by setting 'validRow' 
	attribute and shows/hides row
	- Params:
		- rowIndex: index of the row (number)
		- isValid: boolean
=====================================================*/
{
	if( !this.fltGrid ) return;
	var row = this.tbl.rows[rowIndex];
	if( !row || (typeof isValid).tf_LCase()!='boolean' ) return;

	// always visible rows are valid
	if( this.hasVisibleRows && this.visibleRows.tf_Has(rowIndex) && !this.paging )
		isValid = true;
	
	var displayFlag = (isValid) ? '' : 'none';
	var validFlag = (isValid) ? 'true' : 'false';
	
	row.style.display = displayFlag;
	if( this.paging ) 
		row.setAttribute("validRow",validFlag);
}

TF.prototype.SetFilterValue = function(index,searcharg)
/*====================================================
	- Inserts value in a specified filter
	- Params:
		- index: filter column index (numeric value)
		- searcharg: search string
=====================================================*/
{
	if( !this.fltGrid ) return;
	if( tf_Id(this.fltIds[index]) )
		tf_Id(this.fltIds[index]).value = searcharg;
}

TF.prototype.SetColWidths = function()
/*====================================================
	- sets widths of columns
=====================================================*/
{
	if( !this.fltGrid || !this.hasColWidth ) return;
	var _this = this;
	setWidths( this.tbl.rows[0] );
	
	function setWidths( row )
	{
		if( !_this && (_this.nbCells!=_this.colWidth.length) ) return;
		if( _this.nbCells==row.cells.length )
			for(var k=0; k<_this.nbCells; k++)
				row.cells[k].style.width = _this.colWidth[k];
	
	}
}

TF.prototype.SetVisibleRows = function()
/*====================================================
	- makes a row always visible
	- Note this works only if paging is false
=====================================================*/
{
	if( this.hasGrid && this.hasVisibleRows && !this.paging )
	{
		for(var i=0; i<this.visibleRows.length; i++)
		{
			if(this.visibleRows[i]<=this.nbRows)//row index cannot be > nrows
				this.SetRowValidation(this.visibleRows[i],true);
		}//for i
	}//if hasGrid
}

TF.prototype.SetAlternateRows = function()
/*====================================================
	- alternates row colors for better readability
=====================================================*/
{
	if( !this.hasGrid && !this.isFirstLoad ) return;
	var row = this.tbl.rows;
	var beginIndex = (this.validRowsIndex==null) ? this.refRow : 0; //1st index
	var indexLen = (this.validRowsIndex==null) // nb indexes
		? (this.nbFilterableRows+beginIndex) : this.validRowsIndex.length;

	for(var j=beginIndex; j<indexLen; j++)//alternates bg color
	{
		var rIndex = (this.validRowsIndex==null) ? j : this.validRowsIndex[j];
		tf_removeClass(row[rIndex],this.rowBgEvenCssClass);
		tf_removeClass(row[rIndex],this.rowBgOddCssClass);
		tf_addClass(row[rIndex],(j%2 == 0) ? this.rowBgEvenCssClass : this.rowBgOddCssClass);
	}
}

TF.prototype.RemoveAlternateRows = function()
/*====================================================
	- removes alternate row colors
=====================================================*/
{
	if(!this.hasGrid) return;
	var row = this.tbl.rows;
	for(var i=this.refRow; i<this.nbRows; i++)
	{
		tf_removeClass(row[i],this.rowBgEvenCssClass);
		tf_removeClass(row[i],this.rowBgOddCssClass);
	}
	this.isStartBgAlternate = true;
}

TF.prototype.SetColOperation = function()
/*====================================================
	- Calculates values of a column
	- params are stored in 'colOperation' table's
	attribute
		- colOperation["id"] contains ids of elements 
		showing result (array)
		- colOperation["col"] contains index of 
		columns (array)
		- colOperation["operation"] contains operation
		type (array, values: sum, mean)
		- colOperation["write_method"] array defines 
		which method to use for displaying the 
		result (innerHTML, setValue, createTextNode).
		Note that innerHTML is the default value.
		- colOperation["tot_row_index"] defines in 
		which row results are displayed (integers array)
		
	- changes made by nuovella: 
	(1) optimized the routine (now it will only 
	process each column once),
	(2) added calculations for the median, lower and 
	upper quartile.
=====================================================*/
{
	if( !this.isFirstLoad && !this.hasGrid ) return;
	var labelId = this.colOperation["id"];
	var colIndex = this.colOperation["col"];
	var operation = this.colOperation["operation"];
	var outputType = this.colOperation["write_method"];
	var totRowIndex = this.colOperation["tot_row_index"];
	var excludeRow = this.colOperation["exclude_row"];
	var decimalPrecision = this.colOperation["decimal_precision"]!=undefined
							? this.colOperation["decimal_precision"] : 2;
	
	//nuovella: determine unique list of columns to operate on
	var ucolIndex =[]; 
	var ucolMax=0;
	
	ucolIndex[ucolMax]=colIndex[0];
	
	for(var i=1; i<colIndex.length; i++)
	{
		saved=0;
		//see if colIndex[i] is already in the list of unique indexes
		for(var j=0; j<=ucolMax; j++ )
		{
			if (ucolIndex[j]==colIndex[i])
				saved=1;
		}
		if (saved==0)
		{//if not saved then, save the index;
			ucolMax++;
			ucolIndex[ucolMax]=colIndex[i];
		}
	}// for i
	
	if( (typeof labelId).tf_LCase()=="object" 
		&& (typeof colIndex).tf_LCase()=="object" 
		&& (typeof operation).tf_LCase()=="object" )
	{
		var row = this.tbl.rows;
		var colvalues = [];
		
		for(var ucol=0; ucol<=ucolMax; ucol++)
		{
			//this retrieves col values 
			//use ucolIndex because we only want to pass through this loop once for each column
			//get the values in this unique column
			colvalues.push( this.GetColValues(ucolIndex[ucol],true,excludeRow) );

		   //next: calculate all operations for this column
		   var result, nbvalues=0,  temp;
		   var meanValue=0, sumValue=0, minValue=null, maxValue=null, q1Value=null, medValue=null, q3Value=null;
		   var meanFlag=0, sumFlag=0, minFlag=0, maxFlag=0, q1Flag=0, medFlag=0, q3Flag=0;
		   var theList=[];
		   var opsThisCol=[], decThisCol=[], labThisCol=[], oTypeThisCol=[];
		   var mThisCol=-1;
			
			for(var i=0; i<colIndex.length; i++)
			{
			     if (colIndex[i]==ucolIndex[ucol])
				 {
				    mThisCol++;
				    opsThisCol[mThisCol]=operation[i].tf_LCase();
				    decThisCol[mThisCol]=decimalPrecision[i];
				    labThisCol[mThisCol]=labelId[i]; 
				    oTypeThisCol = (outputType != undefined && (typeof outputType).tf_LCase()=="object") 
										? outputType[i] : null;
					
			        switch( opsThisCol[mThisCol] )
					{			
				        case "mean":
					        meanFlag=1;
				        break;
				        case "sum":
					        sumFlag=1;
				        break;
				        case "min":
					        minFlag=1;
				        break;
				        case "max":
					        maxFlag=1;
				        break;
				        case "median":
					        medFlag=1;	
					        break;
				        case "q1":
					        q1Flag=1;
				        break;
				        case "q3":
					        q3Flag=1;
				        break;
			        }
			    }		
			}
			
			for(var j=0; j<colvalues[ucol].length; j++ )
			{
				if ((q1Flag==1)||(q3Flag==1) || (medFlag==1))
				{//sort the list for calculation of median and quartiles
					if (j<colvalues[ucol].length -1)
					{
						for(k=j+1;k<colvalues[ucol].length; k++) {
			  
							if( eval(colvalues[ucol][k]) < eval(colvalues[ucol][j]))
							{
								temp = colvalues[ucol][j];            
								colvalues[ucol][j] = colvalues[ucol][k];              
								colvalues[ucol][k] = temp;            
							}
						}
					}
				}
				var cvalue = colvalues[ucol][j];
									theList[j]=parseFloat( cvalue );

				if( !isNaN(cvalue) )
				{	
					nbvalues++;
					if ((sumFlag==1)|| (meanFlag==1)) sumValue += parseFloat( cvalue );
					if (minFlag==1) 
					{
						if (minValue==null)
						{
							minValue = parseFloat( cvalue );
						}
						else minValue= parseFloat( cvalue )<minValue? parseFloat( cvalue ): minValue;
					}
					if (maxFlag==1) {
						if (maxValue==null)
						{maxValue = parseFloat( cvalue );}
					else {maxValue= parseFloat( cvalue )>maxValue? parseFloat( cvalue ): maxValue;}
					}
				}
			}//for j
			if (meanFlag==1) meanValue = sumValue/nbvalues;
			if (medFlag==1)
			{
					var aux = 0;
					if(nbvalues%2 == 1) 
					{
						aux = Math.floor(nbvalues/2);
						medValue = theList[aux];   
					}
				else medValue = (theList[nbvalues/2]+theList[((nbvalues/2)-1)])/2;
			}
			if (q1Flag==1)
			{	
				var posa=0.0;
				posa = Math.floor(nbvalues/4);
				if (4*posa == nbvalues) {q1Value = (theList[posa-1] + theList[posa])/2;}
				else {q1Value = theList[posa];}
			}
			if (q3Flag==1)
			{
				var posa=0.0;
				var posb=0.0;
				posa = Math.floor(nbvalues/4);
				if (4*posa == nbvalues)
				{
					posb = 3*posa;
					q3Value = (theList[posb] + theList[posb-1])/2;  
				}
				else
					q3Value = theList[nbvalues-posa-1];
			}
			
			for(var i=0; i<=mThisCol; i++ )
			{
			   switch( opsThisCol[i] )
			   {			
					case "mean":
						result=meanValue;
					break;
					case "sum":
						result=sumValue;
					break;
					case "min":
						result=minValue;
					break;
					case "max":
						result=maxValue;
					break;
					case "median":
						result=medValue;	
						break;
					case "q1":
						result=q1Value;
					break;
					case "q3":
						result=q3Value;
					break;
			  }		
				
			var precision = decThisCol[i]!=undefined && !isNaN( decThisCol[i] )
								? decThisCol[i] : 2;
			
			if(outputType != undefined && (typeof outputType).tf_LCase()=="object" && result)
			{//if outputType is defined
				result = result.toFixed( precision );
				if( tf_Id( labThisCol[i] )!=undefined )
				{
					switch( oTypeThisCol.tf_LCase() )
					{
						case "innerhtml":							
							if (isNaN(result) || !isFinite(result) || (nbvalues==0)) 
							    tf_Id( labThisCol[i] ).innerHTML = ".";
							else
							    tf_Id( labThisCol[i] ).innerHTML = result;
						break;
						case "setvalue":
							tf_Id( labThisCol[i] ).value = result;
						break;
						case "createtextnode":
							var oldnode = tf_Id( labThisCol[i] ).firstChild;
							var txtnode = tf_CreateText( result );
							tf_Id( labThisCol[i] ).replaceChild( txtnode,oldnode );
						break;
					}//switch
				}
			} else {
				try
				{      
					if (isNaN(result) || !isFinite(result) || (nbvalues==0)) 
						tf_Id( labThisCol[i] ).innerHTML = ".";
					else
						 tf_Id( labThisCol[i] ).innerHTML = result.toFixed( precision );
				} catch(e){ }//catch
			}//else
		 }//for i
		//eventual row(s) with result are always visible
		if(totRowIndex!=undefined) row[totRowIndex[ucol]].style.display = '';
		}//for ucol
	}//if typeof
}

TF.prototype.SetPage = function( cmd )
/*====================================================
	- If paging set true shows page according to
	param value (string or number):
		- strings: "next","previous","last","first" or
		- number: page number
=====================================================*/
{
	if( this.hasGrid && this.paging )
	{
		var btnEvt = this.pagingBtnEvents, cmdtype = typeof cmd;
		if(cmdtype=='string')
		{
			switch(cmd.tf_LCase())
			{
				case "next":
					btnEvt.next();
				break;
				case "previous":
					btnEvt.prev();
				break;
				case "last":
					btnEvt.last();
				break;
				case "first":
					btnEvt.first();
				break;
				default:
					btnEvt.next();
				break;
			}//switch
		}
		if(cmdtype=='number') this.ChangePage( (cmd-1) );
	}// this.hasGrid 
}


TF.prototype.RefreshFiltersGrid = function()
/*====================================================
	- retrieves select filters
	- calls method repopulating filters
=====================================================*/
{
	var slcIndex = this.GetFiltersByType( 'select',true );
	if( this.activeFilterId!=null )//for paging
	{
		var activeFlt = this.activeFilterId.split("_")[0];
		activeFlt = activeFlt.split(this.prfxFlt)[1];
		
		for(var i=0; i<slcIndex.length; i++)
		{
			var curSlc = tf_Id(this.prfxFlt+slcIndex[i]+"_"+this.id);
			var slcSelectedValue = curSlc.options[curSlc.selectedIndex].text;
			if(activeFlt!=slcIndex[i] || slcSelectedValue==this.displayAllText )
			{
				curSlc.innerHTML = "";
				this.PopulateSelect(slcIndex[i],true);
			}
		}// for i
	}
}

TF.prototype.RememberFiltersValue = function( name )
/*==============================================
	- stores filters' values in a cookie
	when Filter() method is called
	- Params:
		- name: cookie name (string)
	- credits to Florent Hirchy
===============================================*/
{
	var flt_values = [];
	for(var i=0; i<this.fltIds.length; i++)
	{//creates an array with filters' values
		value = this.GetFilterValue(i);
		if (value == '') value = " ";
		flt_values.push(value);
	}
	flt_values.push(this.fltIds.length); //adds array size
	tf_WriteCookie(name,flt_values,this.cookieDuration); //writes cookie  
}

TF.prototype.RememberPageNb = function( name )
/*==============================================
	- stores page number value in a cookie
	when ChangePage method is called
	- Params:
		- name: cookie name (string)
===============================================*/
{
	tf_WriteCookie(name,this.currentPageNb,this.cookieDuration); //writes cookie  
}

TF.prototype.RememberPageLength = function( name )
/*==============================================
	- stores page length value in a cookie
	when ChangePageLength method is called
	- Params:
		- name: cookie name (string)
===============================================*/
{
	tf_WriteCookie(name,this.resultsPerPageSlc.selectedIndex,this.cookieDuration); //writes cookie
}

TF.prototype.ResetGridValues = function( name )
/*==============================================
	- re-sets filters' values when page is 
	re-loaded
	- Params:
		- name: cookie name (string)
	- credits to Florent Hirchy
===============================================*/
{
	var flts = tf_ReadCookie(name); //reads the cookie
	var reg = new RegExp(",","g");	
	var flts_values = flts.split(reg); //creates an array with filters' values
	var hasStoredValues = false;
	this.ClearFilters(); //clears grid

	if(flts_values[(flts_values.length-1)] == this.fltIds.length)
	{//if the number of columns is the same as before page reload
		for(var i=0; i<(flts_values.length - 1); i++)
		{
			if (flts_values[i]!=" ")
			{
				this.SetFilterValue(i,flts_values[i]);
				hasStoredValues = true;
			}
		}//end for
	}//end if
	if(hasStoredValues) this.Filter();
	if(!hasStoredValues && this.paging) this.SetPagingInfo();
}

TF.prototype.ResetPage = function( name )
/*==============================================
	- re-sets page nb at page re-load
	- Params:
		- name: cookie name (string)
===============================================*/
{
	var pgnb = tf_ReadCookie(name); //reads the cookie
	if( pgnb!='' ) this.ChangePage( (pgnb-1) );
}

TF.prototype.ResetPageLength = function( name )
/*==============================================
	- re-sets page length at page re-load
	- Params:
		- name: cookie name (string)
===============================================*/
{
	if(!this.paging) return;
	var pglenIndex = tf_ReadCookie(name); //reads the cookie
	if( pglenIndex!='' )
	{
		this.resultsPerPageSlc.options[pglenIndex].selected = true;
		this.ChangeResultsPerPage();
	}
}

TF.prototype.SetLoader = function()
/*====================================================
	- generates loader div
=====================================================*/
{
	if( this.loaderDiv!=null ) return;
	var containerDiv = tf_CreateElm( "div",["id",this.prfxLoader+this.id] );
	containerDiv.className = this.loaderCssClass;// for ie<=6
	containerDiv.style.display = "none";
	var targetEl = (this.loaderTgtId==null) ? this.tbl.parentNode : tf_Id( this.loaderTgtId );
	if(this.loaderTgtId==null) targetEl.insertBefore(containerDiv, this.tbl);
	else targetEl.appendChild( containerDiv );
	this.loaderDiv = tf_Id(this.prfxLoader+this.id);
	if(this.loaderHtml==null) 
		this.loaderDiv.appendChild( tf_CreateText(this.loaderText) );
	else this.loaderDiv.innerHTML = this.loaderHtml;
}

TF.prototype.ShowLoader = function( p )
/*====================================================
	- displays/hides loader div
=====================================================*/
{
	if(!this.loader) return;
	var loaderDiv = this.loaderDiv;
	function displayLoader(){ loaderDiv.style.display = p; }
	var t = (p=="none") ? 200 : 10;
	setTimeout(displayLoader,t);
}

TF.prototype.ClearFilters = function()
/*====================================================
	- clears grid filters
=====================================================*/
{
	if( !this.fltGrid ) return;
	for(var i=0; i<this.fltIds.length; i++)
		this.SetFilterValue(i,'');
}

TF.prototype.UnhighlightAll = function()
/*====================================================
	- removes keyword highlighting
=====================================================*/
{
	if( this.highlightKeywords && this.searchArgs!=null )
		for(var y=0; y<this.searchArgs.length; y++)
			tf_UnhighlightWord( this.tbl,this.searchArgs[y],this.highlightCssClass );
}

TF.prototype.__resetGrid = function()
/*====================================================
	- Only used by AddGrid() method
	- Resets filtering grid bar if previously removed
=====================================================*/
{
	if( this.isFirstLoad ) return;
	
	// grid was removed, grid row element is stored in this.fltGridEl property
	this.tbl.rows[this.filtersRowIndex].parentNode.insertBefore( 
		this.fltGridEl,
		this.tbl.rows[this.filtersRowIndex]
	);
	
	if( this.isExternalFlt )
	{// filters are appended in external placeholders elements
		for(var ct=0; ct<this.externalFltTgtIds.length; ct++ )
			if( tf_Id(this.externalFltTgtIds[ct]) )
				tf_Id(this.externalFltTgtIds[ct]).appendChild(this.externalFltEls[ct]);
	}
	
	this.nbFilterableRows = this.GetRowsNb();
	this.nbVisibleRows = this.nbFilterableRows;
	this.nbRows = this.tbl.rows.length;
	
	/*** 	ie bug turn-around, filters need to be re-generated
			since row is empty; insertBefore method doesn't seem to work properly 
			with previously generated DOM nodes modified by innerHTML 	***/
	if( this.tbl.rows[this.filtersRowIndex].innerHTML=='' )
	{
		this.tbl.deleteRow(this.filtersRowIndex);
		this.RemoveGrid();
		this.RemoveExternalFlts();
		this.fltIds = [];
		this.isFirstLoad = true;
		this.AddGrid();
		
	}
	
	this.hasGrid = true;
}

TF.prototype.RemoveExternalFlts = function()
/*====================================================
	- removes external filters
=====================================================*/
{
	if( !this.isExternalFlt && !this.externalFltTgtIds ) return;
	for(var ct=0; ct<this.externalFltTgtIds.length; ct++ )
		if( tf_Id(this.externalFltTgtIds[ct]) )
			tf_Id(this.externalFltTgtIds[ct]).innerHTML = '';
}


/*====================================================
	- Additional public methods for developers
=====================================================*/

TF.prototype.HasGrid = function()
/*====================================================
	- checks if table has a filter grid
	- returns a boolean
=====================================================*/
{
	return this.hasGrid;
}

TF.prototype.GetFiltersId = function()
/*====================================================
	- returns an array containing filters ids
	- Note that hidden filters are also returned
=====================================================*/
{
	if( !this.hasGrid ) return;
	return this.fltIds;
}

TF.prototype.GetValidRowsIndex = function()
/*====================================================
	- returns an array containing valid rows indexes 
	(valid rows upon filtering)
=====================================================*/
{
	if( !this.hasGrid ) return;
	return this.validRowsIndex;
}

TF.prototype.GetStartRowIndex = function()
/*====================================================
	- Returns the index of the row from which will 
	start the filtering process (1st filterable row)
=====================================================*/
{
	if( !this.hasGrid ) return;
	return this.refRow;
}

TF.prototype.GetLastRowIndex = function()
/*====================================================
	- Returns the index of the last row
=====================================================*/
{
	if( !this.hasGrid ) return;
	return this.nbRows;
}

TF.prototype.AddPaging = function(filterTable)
/*====================================================
	- Adds paging feature if filter grid bar is 
	already set
	- Param(s):
		- execFilter: if true table is filtered 
		(boolean)
=====================================================*/
{
	if( !this.hasGrid || this.paging ) return;
	this.paging = true; 
	this.isPagingRemoved = true; 
	this.SetPaging();
	if(filterTable) this.Filter();
}
/* --- */

/*====================================================
	- General utility fns below
=====================================================*/

function tf_GetChildElms(n)
/*====================================================
	- checks passed node is a ELEMENT_NODE nodeType=1
	- removes TEXT_NODE nodeType=3  
=====================================================*/
{
	if(n!=undefined && n.nodeType == 1)
	{
		var enfants = n.childNodes;
		for(var i=0; i<enfants.length; i++)
		{
			var child = enfants[i];
			if(child.nodeType == 3) n.removeChild(child);
		}
		return n;	
	}
}

function tf_GetCellText(n)
/*====================================================
	- returns text + text of child nodes of a cell
=====================================================*/
{
	var s = "";
	var enfants = n.childNodes;
	for(var i=0; i<enfants.length; i++)
	{
		var child = enfants[i];
		if(child.nodeType == 3) s+= child.data;
		else s+= tf_GetCellText(child);
	}
	return s;
}

function tf_isObject(varname)
/*====================================================
	- checks if var exists and is an object
	- returns a boolean
=====================================================*/
{
	var isO = false;
	if( window[varname] && (typeof window[varname]).tf_LCase()=='object' )
		isO = true;
	return isO;
}

function tf_Id(id)
/*====================================================
	- this is just a getElementById shortcut
=====================================================*/
{
	return document.getElementById( id );
}

function tf_Tag(o,tagname)
/*====================================================
	- this is just a getElementsByTagName shortcut
=====================================================*/
{
	return o.getElementsByTagName( tagname );
}

function tf_RegexpEscape(s)
/*====================================================
	- escapes special characters [\^$.|?*+() 
	for regexp
	- Many thanks to Cedric Wartel for this fn
=====================================================*/
{
	// traite les caracteres speciaux [\^$.|?*+()
	//remplace le carctere c par \c
	function escape(e)
	{
		a = new RegExp('\\'+e,'g');
		s = s.replace(a,'\\'+e);
	}

	chars = new Array('\\','[','^','$','.','|','?','*','+','(',')');
	//for(e in chars) escape(chars[e]); // compatibility issue with prototype
	for(var e=0; e<chars.length; e++) escape(chars[e]);
	return s;
}

function tf_CreateElm(elm)
/*====================================================
	- returns an html element with its attributes
	- accepts the following params:
		- a string defining the html element 
		to create
		- an undetermined # of arrays containing the
		couple "attribute name","value" ["id","myId"]
=====================================================*/
{
	var el = document.createElement( elm );		
	if(arguments.length>1)
	{
		for(var i=0; i<arguments.length; i++)
		{
			var argtype = typeof arguments[i];
			switch( argtype.tf_LCase() )
			{
				case "object":
					if( arguments[i].length==2 )
					{							
						el.setAttribute( arguments[i][0],arguments[i][1] );
					}//if array length==2
				break;
			}//switch
		}//for i
	}//if args
	return el;	
}

function tf_CreateText(node)
/*====================================================
	- this is just a document.createTextNode shortcut
=====================================================*/
{
	return document.createTextNode( node );
}

function tf_HighlightWord( node,word,cssClass )
/*====================================================
	- highlights keyword found in passed node
	- accepts the following params:
		- node
		- word to search
		- css class name for highlighting
=====================================================*/
{
	// Iterate into this nodes childNodes
	if(node.hasChildNodes) 
		for( var i=0; i<node.childNodes.length; i++ )
			tf_HighlightWord(node.childNodes[i],word,cssClass);

	// And do this node itself
	if(node.nodeType == 3) 
	{ // text node
		var tempNodeVal = node.nodeValue.tf_LCase();
		var tempWordVal = word.tf_LCase();
		if(tempNodeVal.indexOf(tempWordVal) != -1) 
		{
			var pn = node.parentNode;
			if(pn.className != cssClass) 
			{
				// word has not already been highlighted!
				var nv = node.nodeValue;
				var ni = tempNodeVal.indexOf(tempWordVal);
				// Create a load of replacement nodes
				var before = tf_CreateText(nv.substr(0,ni));
				var docWordVal = nv.substr(ni,word.length);
				var after = tf_CreateText(nv.substr(ni+word.length));
				var hiwordtext = tf_CreateText(docWordVal);
				var hiword = tf_CreateElm("span");
				hiword.className = cssClass;
				hiword.appendChild(hiwordtext);
				pn.insertBefore(before,node);
				pn.insertBefore(hiword,node);
				pn.insertBefore(after,node);
				pn.removeChild(node);
			}
		}
	}// if node.nodeType == 3
}

function tf_UnhighlightWord( node,word,cssClass )
/*====================================================
	- removes highlights found in passed node
	- accepts the following params:
		- node
		- word to search
		- css class name for highlighting
=====================================================*/
{
	// Iterate into this nodes childNodes
	if(node.hasChildNodes)
		for( var i=0; i<node.childNodes.length; i++ )
			tf_UnhighlightWord(node.childNodes[i],word,cssClass);

	// And do this node itself
	if(node.nodeType == 3) 
	{ // text node
		var tempNodeVal = node.nodeValue.tf_LCase();
		var tempWordVal = word.tf_LCase();
		if(tempNodeVal.indexOf(tempWordVal) != -1)
		{
			var pn = node.parentNode;
			if(pn.className == cssClass)
			{
				var prevSib = pn.previousSibling;
				var nextSib = pn.nextSibling;
				nextSib.nodeValue = prevSib.nodeValue + node.nodeValue + nextSib.nodeValue;
				prevSib.nodeValue = '';
				node.nodeValue = '';
			}
		}
	}// if node.nodeType == 3
}

function tf_addEvent(obj,event_name,func_name)
{
	if (obj.attachEvent)
		obj.attachEvent("on"+event_name, func_name);
	else if(obj.addEventListener)
		obj.addEventListener(event_name,func_name,true);
	else
		obj["on"+event_name] = func_name;
}

function tf_removeEvent(obj,event_name,func_name)
{
	if (obj.detachEvent)
		obj.detachEvent("on"+event_name,func_name);
	else if(obj.removeEventListener)
		obj.removeEventListener(event_name,func_name,true);
	else
		obj["on"+event_name] = null;
}

function tf_NumSortAsc(a, b){ return (a-b); }

function tf_NumSortDesc(a, b){ return (b-a); }

String.prototype.tf_MatchCase = function (mc) 
{
	if (!mc) return this.tf_LCase();
	else return this.toString();
}

String.prototype.tf_Trim = function()
{//optimised by Anthony Maes
	return this.replace(/(^[\s\xA0]*)|([\s\xA0]*$)/g,'');
}

String.prototype.tf_LCase = function()
{
	return this.toLowerCase();
}

String.prototype.tf_UCase = function()
{
	return this.toUpperCase();
}

Array.prototype.tf_Has = function(s,mc) 
{
	//return this.indexOf(s) >= 0;
	var sCase = (mc==undefined) ? false : mc;
	for (i=0; i<this.length; i++)
		if (this[i].toString().tf_MatchCase(sCase)==s) return true;
	return false;
}

function tf_hasClass(elm,cl) 
{
	return elm.className.match(new RegExp('(\\s|^)'+cl+'(\\s|$)'));
}

function tf_addClass(elm,cl) 
{
	if (!tf_hasClass(elm,cl))
		elm.className += " "+cl;
}

function tf_removeClass(elm,cl) 
{
	if ( !tf_hasClass(elm,cl) ) return;
	var reg = new RegExp('(\\s|^)'+cl+'(\\s|$)');
	elm.className = elm.className.replace(reg,' ');
}

function tf_ImportScript(scriptName,scriptPath)
{
	var isImported = false; 
	var scripts = tf_Tag(document,"script");

	for (var i=0; i<scripts.length; i++)
	{
		if(scripts[i].src.match(scriptPath))
		{ 
			isImported = true;	
			break;
		}
	}

	if( !isImported )//imports script if not available
	{
		var head = tf_Tag(document,"head")[0];
		var extScript = tf_CreateElm(	"script",
									["id",scriptName],
									["type","text/javascript"],
									["src",scriptPath]	);
		head.appendChild(extScript);
	}
}//fn tf_ImportScript

function tf_WriteCookie(name, value, hours)
{
	var expire = "";
	if(hours != null)
	{
		expire = new Date((new Date()).getTime() + hours * 3600000);
		expire = "; expires=" + expire.toGMTString();
	}
	document.cookie = name + "=" + escape(value) + expire;
}

function tf_ReadCookie(name)
{
	var cookieValue = "";
	var search = name + "=";
	if(document.cookie.length > 0)
	{ 
		offset = document.cookie.indexOf(search);
		if (offset != -1)
		{ 
			offset += search.length;
			end = document.cookie.indexOf(";", offset);
			if (end == -1) end = document.cookie.length;
			cookieValue = unescape(document.cookie.substring(offset, end))
		}
	}
	return cookieValue;
}

function tf_RemoveCookie(name)
{
	tf_WriteCookie(name,"",-1);
}
/* --- */

/*====================================================
	- fns ensuring backward compatibility
=====================================================*/
function grabEBI(id){ return tf_Id( id ); }
function grabTag(obj,tagname){ return tf_Tag(obj,tagname); }
/* --- */
