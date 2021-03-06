/*! DataTables 1.10.19
 * Â©2008-2018 SpryMedia Ltd - datatables.net/license
 */

/**
 * @summary     DataTables
 * @description Paginate, search and order HTML tables
 * @version     1.10.19
 * @file        jquery.dataTables.js
 * @author      SpryMedia Ltd
 * @contact     www.datatables.net
 * @copyright   Copyright 2008-2018 SpryMedia Ltd.
 *
 * This source file is free software, available under the following license:
 *   MIT license - http://datatables.net/license
 *
 * This source file is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
 *
 * For details please refer to: http://www.datatables.net
 */

/*jslint evil: true, undef: true, browser: true */
/*globals $,require,jQuery,define,_selector_run,_selector_opts,_selector_first,_selector_row_indexes,_ext,_Api,_api_register,_api_registerPlural,_re_new_lines,_re_html,_re_formatted_numeric,_re_escape_regex,_empty,_intVal,_numToDecimal,_isNumber,_isHtml,_htmlNumeric,_pluck,_pluck_order,_range,_stripHtml,_unique,_fnBuildAjax,_fnAjaxUpdate,_fnAjaxParameters,_fnAjaxUpdateDraw,_fnAjaxDataSrc,_fnAddColumn,_fnColumnOptions,_fnAdjustColumnSizing,_fnVisibleToColumnIndex,_fnColumnIndexToVisible,_fnVisbleColumns,_fnGetColumns,_fnColumnTypes,_fnApplyColumnDefs,_fnHungarianMap,_fnCamelToHungarian,_fnLanguageCompat,_fnBrowserDetect,_fnAddData,_fnAddTr,_fnNodeToDataIndex,_fnNodeToColumnIndex,_fnGetCellData,_fnSetCellData,_fnSplitObjNotation,_fnGetObjectDataFn,_fnSetObjectDataFn,_fnGetDataMaster,_fnClearTable,_fnDeleteIndex,_fnInvalidate,_fnGetRowElements,_fnCreateTr,_fnBuildHead,_fnDrawHead,_fnDraw,_fnReDraw,_fnAddOptionsHtml,_fnDetectHeader,_fnGetUniqueThs,_fnFeatureHtmlFilter,_fnFilterComplete,_fnFilterCustom,_fnFilterColumn,_fnFilter,_fnFilterCreateSearch,_fnEscapeRegex,_fnFilterData,_fnFeatureHtmlInfo,_fnUpdateInfo,_fnInfoMacros,_fnInitialise,_fnInitComplete,_fnLengthChange,_fnFeatureHtmlLength,_fnFeatureHtmlPaginate,_fnPageChange,_fnFeatureHtmlProcessing,_fnProcessingDisplay,_fnFeatureHtmlTable,_fnScrollDraw,_fnApplyToChildren,_fnCalculateColumnWidths,_fnThrottle,_fnConvertToWidth,_fnGetWidestNode,_fnGetMaxLenString,_fnStringToCss,_fnSortFlatten,_fnSort,_fnSortAria,_fnSortListener,_fnSortAttachListener,_fnSortingClasses,_fnSortData,_fnSaveState,_fnLoadState,_fnSettingsFromNode,_fnLog,_fnMap,_fnBindAction,_fnCallbackReg,_fnCallbackFire,_fnLengthOverflow,_fnRenderer,_fnDataSource,_fnRowAttributes*/

(function( factory ) {
	"use strict";

	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				// CommonJS environments without a window global must pass a
				// root. This will give an error otherwise
				root = window;
			}

			if ( ! $ ) {
				$ = typeof window !== 'undefined' ? // jQuery's factory checks for a global window
					require('jquery') :
					require('jquery')( root );
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}
(function( $, window, document, undefined ) {
	"use strict";

	/**
	 * DataTables is a plug-in for the jQuery Javascript library. It is a highly
	 * flexible tool, based upon the foundations of progressive enhancement,
	 * which will add advanced interaction controls to any HTML table. For a
	 * full list of features please refer to
	 * [DataTables.net](href="http://datatables.net).
	 *
	 * Note that the `DataTable` object is not a global variable but is aliased
	 * to `jQuery.fn.DataTable` and `jQuery.fn.dataTable` through which it may
	 * be  accessed.
	 *
	 *  @class
	 *  @param {object} [init={}] Configuration object for DataTables. Options
	 *    are defined by {@link DataTable.defaults}
	 *  @requires jQuery 1.7+
	 *
	 *  @example
	 *    // Basic initialisation
	 *    $(document).ready( function {
	 *      $('#example').dataTable();
	 *    } );
	 *
	 *  @example
	 *    // Initialisation with configuration options - in this case, disable
	 *    // pagination and sorting.
	 *    $(document).ready( function {
	 *      $('#example').dataTable( {
	 *        "paginate": false,
	 *        "sort": false
	 *      } );
	 *    } );
	 */
	var DataTable = function ( options )
	{
		/**
		 * Perform a jQuery selector action on the table's TR elements (from the tbody) and
		 * return the resulting jQuery object.
		 *  @param {string|node|jQuery} sSelector jQuery selector or node collection to act on
		 *  @param {object} [oOpts] Optional parameters for modifying the rows to be included
		 *  @param {string} [oOpts.filter=none] Select TR elements that meet the current filter
		 *    criterion ("applied") or all TR elements (i.e. no filter).
		 *  @param {string} [oOpts.order=current] Order of the TR elements in the processed array.
		 *    Can be either 'current', whereby the current sorting of the table is used, or
		 *    'original' whereby the original order the data was read into the table is used.
		 *  @param {string} [oOpts.page=all] Limit the selection to the currently displayed page
		 *    ("current") or not ("all"). If 'current' is given, then order is assumed to be
		 *    'current' and filter is 'applied', regardless of what they might be given as.
		 *  @returns {object} jQuery object, filtered by the given selector.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Highlight every second row
		 *      oTable.$('tr:odd').css('backgroundColor', 'blue');
		 *    } );
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Filter to rows with 'Webkit' in them, add a background colour and then
		 *      // remove the filter, thus highlighting the 'Webkit' rows only.
		 *      oTable.fnFilter('Webkit');
		 *      oTable.$('tr', {"search": "applied"}).css('backgroundColor', 'blue');
		 *      oTable.fnFilter('');
		 *    } );
		 */
		this.$ = function ( sSelector, oOpts )
		{
			return this.api(true).$( sSelector, oOpts );
		};


		/**
		 * Almost identical to $ in operation, but in this case returns the data for the matched
		 * rows - as such, the jQuery selector used should match TR row nodes or TD/TH cell nodes
		 * rather than any descendants, so the data can be obtained for the row/cell. If matching
		 * rows are found, the data returned is the original data array/object that was used to
		 * create the row (or a generated array if from a DOM source).
		 *
		 * This method is often useful in-combination with $ where both functions are given the
		 * same parameters and the array indexes will match identically.
		 *  @param {string|node|jQuery} sSelector jQuery selector or node collection to act on
		 *  @param {object} [oOpts] Optional parameters for modifying the rows to be included
		 *  @param {string} [oOpts.filter=none] Select elements that meet the current filter
		 *    criterion ("applied") or all elements (i.e. no filter).
		 *  @param {string} [oOpts.order=current] Order of the data in the processed array.
		 *    Can be either 'current', whereby the current sorting of the table is used, or
		 *    'original' whereby the original order the data was read into the table is used.
		 *  @param {string} [oOpts.page=all] Limit the selection to the currently displayed page
		 *    ("current") or not ("all"). If 'current' is given, then order is assumed to be
		 *    'current' and filter is 'applied', regardless of what they might be given as.
		 *  @returns {array} Data for the matched elements. If any elements, as a result of the
		 *    selector, were not TR, TD or TH elements in the DataTable, they will have a null
		 *    entry in the array.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Get the data from the first row in the table
		 *      var data = oTable._('tr:first');
		 *
		 *      // Do something useful with the data
		 *      alert( "First cell is: "+data[0] );
		 *    } );
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Filter to 'Webkit' and get all data for
		 *      oTable.fnFilter('Webkit');
		 *      var data = oTable._('tr', {"search": "applied"});
		 *
		 *      // Do something with the data
		 *      alert( data.length+" rows matched the search" );
		 *    } );
		 */
		this._ = function ( sSelector, oOpts )
		{
			return this.api(true).rows( sSelector, oOpts ).data();
		};


		/**
		 * Create a DataTables Api instance, with the currently selected tables for
		 * the Api's context.
		 * @param {boolean} [traditional=false] Set the API instance's context to be
		 *   only the table referred to by the `DataTable.ext.iApiIndex` option, as was
		 *   used in the API presented by DataTables 1.9- (i.e. the traditional mode),
		 *   or if all tables captured in the jQuery object should be used.
		 * @return {DataTables.Api}
		 */
		this.api = function ( traditional )
		{
			return traditional ?
				new _Api(
					_fnSettingsFromNode( this[ _ext.iApiIndex ] )
				) :
				new _Api( this );
		};


		/**
		 * Add a single new row or multiple rows of data to the table. Please note
		 * that this is suitable for client-side processing only - if you are using
		 * server-side processing (i.e. "bServerSide": true), then to add data, you
		 * must add it to the data source, i.e. the server-side, through an Ajax call.
		 *  @param {array|object} data The data to be added to the table. This can be:
		 *    <ul>
		 *      <li>1D array of data - add a single row with the data provided</li>
		 *      <li>2D array of arrays - add multiple rows in a single call</li>
		 *      <li>object - data object when using <i>mData</i></li>
		 *      <li>array of objects - multiple data objects when using <i>mData</i></li>
		 *    </ul>
		 *  @param {bool} [redraw=true] redraw the table or not
		 *  @returns {array} An array of integers, representing the list of indexes in
		 *    <i>aoData</i> ({@link DataTable.models.oSettings}) that have been added to
		 *    the table.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    // Global var for counter
		 *    var giCount = 2;
		 *
		 *    $(document).ready(function() {
		 *      $('#example').dataTable();
		 *    } );
		 *
		 *    function fnClickAddRow() {
		 *      $('#example').dataTable().fnAddData( [
		 *        giCount+".1",
		 *        giCount+".2",
		 *        giCount+".3",
		 *        giCount+".4" ]
		 *      );
		 *
		 *      giCount++;
		 *    }
		 */
		this.fnAddData = function( data, redraw )
		{
			var api = this.api( true );

			/* Check if we want to add multiple rows or not */
			var rows = $.isArray(data) && ( $.isArray(data[0]) || $.isPlainObject(data[0]) ) ?
				api.rows.add( data ) :
				api.row.add( data );

			if ( redraw === undefined || redraw ) {
				api.draw();
			}

			return rows.flatten().toArray();
		};


		/**
		 * This function will make DataTables recalculate the column sizes, based on the data
		 * contained in the table and the sizes applied to the columns (in the DOM, CSS or
		 * through the sWidth parameter). This can be useful when the width of the table's
		 * parent element changes (for example a window resize).
		 *  @param {boolean} [bRedraw=true] Redraw the table or not, you will typically want to
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable( {
		 *        "sScrollY": "200px",
		 *        "bPaginate": false
		 *      } );
		 *
		 *      $(window).on('resize', function () {
		 *        oTable.fnAdjustColumnSizing();
		 *      } );
		 *    } );
		 */
		this.fnAdjustColumnSizing = function ( bRedraw )
		{
			var api = this.api( true ).columns.adjust();
			var settings = api.settings()[0];
			var scroll = settings.oScroll;

			if ( bRedraw === undefined || bRedraw ) {
				api.draw( false );
			}
			else if ( scroll.sX !== "" || scroll.sY !== "" ) {
				/* If not redrawing, but scrolling, we want to apply the new column sizes anyway */
				_fnScrollDraw( settings );
			}
		};


		/**
		 * Quickly and simply clear a table
		 *  @param {bool} [bRedraw=true] redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Immediately 'nuke' the current rows (perhaps waiting for an Ajax callback...)
		 *      oTable.fnClearTable();
		 *    } );
		 */
		this.fnClearTable = function( bRedraw )
		{
			var api = this.api( true ).clear();

			if ( bRedraw === undefined || bRedraw ) {
				api.draw();
			}
		};


		/**
		 * The exact opposite of 'opening' a row, this function will close any rows which
		 * are currently 'open'.
		 *  @param {node} nTr the table row to 'close'
		 *  @returns {int} 0 on success, or 1 if failed (can't find the row)
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnClose = function( nTr )
		{
			this.api( true ).row( nTr ).child.hide();
		};


		/**
		 * Remove a row for the table
		 *  @param {mixed} target The index of the row from aoData to be deleted, or
		 *    the TR element you want to delete
		 *  @param {function|null} [callBack] Callback function
		 *  @param {bool} [redraw=true] Redraw the table or not
		 *  @returns {array} The row that was deleted
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Immediately remove the first row
		 *      oTable.fnDeleteRow( 0 );
		 *    } );
		 */
		this.fnDeleteRow = function( target, callback, redraw )
		{
			var api = this.api( true );
			var rows = api.rows( target );
			var settings = rows.settings()[0];
			var data = settings.aoData[ rows[0][0] ];

			rows.remove();

			if ( callback ) {
				callback.call( this, settings, data );
			}

			if ( redraw === undefined || redraw ) {
				api.draw();
			}

			return data;
		};


		/**
		 * Restore the table to it's original state in the DOM by removing all of DataTables
		 * enhancements, alterations to the DOM structure of the table and event listeners.
		 *  @param {boolean} [remove=false] Completely remove the table from the DOM
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      // This example is fairly pointless in reality, but shows how fnDestroy can be used
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnDestroy();
		 *    } );
		 */
		this.fnDestroy = function ( remove )
		{
			this.api( true ).destroy( remove );
		};


		/**
		 * Redraw the table
		 *  @param {bool} [complete=true] Re-filter and resort (if enabled) the table before the draw.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Re-draw the table - you wouldn't want to do it here, but it's an example :-)
		 *      oTable.fnDraw();
		 *    } );
		 */
		this.fnDraw = function( complete )
		{
			// Note that this isn't an exact match to the old call to _fnDraw - it takes
			// into account the new data, but can hold position.
			this.api( true ).draw( complete );
		};


		/**
		 * Filter the input based on data
		 *  @param {string} sInput String to filter the table on
		 *  @param {int|null} [iColumn] Column to limit filtering to
		 *  @param {bool} [bRegex=false] Treat as regular expression or not
		 *  @param {bool} [bSmart=true] Perform smart filtering or not
		 *  @param {bool} [bShowGlobal=true] Show the input global filter in it's input box(es)
		 *  @param {bool} [bCaseInsensitive=true] Do case-insensitive matching (true) or not (false)
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sometime later - filter...
		 *      oTable.fnFilter( 'test string' );
		 *    } );
		 */
		this.fnFilter = function( sInput, iColumn, bRegex, bSmart, bShowGlobal, bCaseInsensitive )
		{
			var api = this.api( true );

			if ( iColumn === null || iColumn === undefined ) {
				api.search( sInput, bRegex, bSmart, bCaseInsensitive );
			}
			else {
				api.column( iColumn ).search( sInput, bRegex, bSmart, bCaseInsensitive );
			}

			api.draw();
		};


		/**
		 * Get the data for the whole table, an individual row or an individual cell based on the
		 * provided parameters.
		 *  @param {int|node} [src] A TR row node, TD/TH cell node or an integer. If given as
		 *    a TR node then the data source for the whole row will be returned. If given as a
		 *    TD/TH cell node then iCol will be automatically calculated and the data for the
		 *    cell returned. If given as an integer, then this is treated as the aoData internal
		 *    data index for the row (see fnGetPosition) and the data for that row used.
		 *  @param {int} [col] Optional column index that you want the data of.
		 *  @returns {array|object|string} If mRow is undefined, then the data for all rows is
		 *    returned. If mRow is defined, just data for that row, and is iCol is
		 *    defined, only data for the designated cell is returned.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    // Row data
		 *    $(document).ready(function() {
		 *      oTable = $('#example').dataTable();
		 *
		 *      oTable.$('tr').click( function () {
		 *        var data = oTable.fnGetData( this );
		 *        // ... do something with the array / object of data for the row
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Individual cell data
		 *    $(document).ready(function() {
		 *      oTable = $('#example').dataTable();
		 *
		 *      oTable.$('td').click( function () {
		 *        var sData = oTable.fnGetData( this );
		 *        alert( 'The cell clicked on had the value of '+sData );
		 *      } );
		 *    } );
		 */
		this.fnGetData = function( src, col )
		{
			var api = this.api( true );

			if ( src !== undefined ) {
				var type = src.nodeName ? src.nodeName.toLowerCase() : '';

				return col !== undefined || type == 'td' || type == 'th' ?
					api.cell( src, col ).data() :
					api.row( src ).data() || null;
			}

			return api.data().toArray();
		};


		/**
		 * Get an array of the TR nodes that are used in the table's body. Note that you will
		 * typically want to use the '$' API method in preference to this as it is more
		 * flexible.
		 *  @param {int} [iRow] Optional row index for the TR element you want
		 *  @returns {array|node} If iRow is undefined, returns an array of all TR elements
		 *    in the table's body, or iRow is defined, just the TR element requested.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Get the nodes from the table
		 *      var nNodes = oTable.fnGetNodes( );
		 *    } );
		 */
		this.fnGetNodes = function( iRow )
		{
			var api = this.api( true );

			return iRow !== undefined ?
				api.row( iRow ).node() :
				api.rows().nodes().flatten().toArray();
		};


		/**
		 * Get the array indexes of a particular cell from it's DOM element
		 * and column index including hidden columns
		 *  @param {node} node this can either be a TR, TD or TH in the table's body
		 *  @returns {int} If nNode is given as a TR, then a single index is returned, or
		 *    if given as a cell, an array of [row index, column index (visible),
		 *    column index (all)] is given.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      $('#example tbody td').click( function () {
		 *        // Get the position of the current data from the node
		 *        var aPos = oTable.fnGetPosition( this );
		 *
		 *        // Get the data array for this row
		 *        var aData = oTable.fnGetData( aPos[0] );
		 *
		 *        // Update the data array and return the value
		 *        aData[ aPos[1] ] = 'clicked';
		 *        this.innerHTML = 'clicked';
		 *      } );
		 *
		 *      // Init DataTables
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnGetPosition = function( node )
		{
			var api = this.api( true );
			var nodeName = node.nodeName.toUpperCase();

			if ( nodeName == 'TR' ) {
				return api.row( node ).index();
			}
			else if ( nodeName == 'TD' || nodeName == 'TH' ) {
				var cell = api.cell( node ).index();

				return [
					cell.row,
					cell.columnVisible,
					cell.column
				];
			}
			return null;
		};


		/**
		 * Check to see if a row is 'open' or not.
		 *  @param {node} nTr the table row to check
		 *  @returns {boolean} true if the row is currently open, false otherwise
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnIsOpen = function( nTr )
		{
			return this.api( true ).row( nTr ).child.isShown();
		};


		/**
		 * This function will place a new row directly after a row which is currently
		 * on display on the page, with the HTML contents that is passed into the
		 * function. This can be used, for example, to ask for confirmation that a
		 * particular record should be deleted.
		 *  @param {node} nTr The table row to 'open'
		 *  @param {string|node|jQuery} mHtml The HTML to put into the row
		 *  @param {string} sClass Class to give the new TD cell
		 *  @returns {node} The row opened. Note that if the table row passed in as the
		 *    first parameter, is not found in the table, this method will silently
		 *    return.
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable;
		 *
		 *      // 'open' an information row when a row is clicked on
		 *      $('#example tbody tr').click( function () {
		 *        if ( oTable.fnIsOpen(this) ) {
		 *          oTable.fnClose( this );
		 *        } else {
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" );
		 *        }
		 *      } );
		 *
		 *      oTable = $('#example').dataTable();
		 *    } );
		 */
		this.fnOpen = function( nTr, mHtml, sClass )
		{
			return this.api( true )
				.row( nTr )
				.child( mHtml, sClass )
				.show()
				.child()[0];
		};


		/**
		 * Change the pagination - provides the internal logic for pagination in a simple API
		 * function. With this function you can have a DataTables table go to the next,
		 * previous, first or last pages.
		 *  @param {string|int} mAction Paging action to take: "first", "previous", "next" or "last"
		 *    or page number to jump to (integer), note that page 0 is the first page.
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnPageChange( 'next' );
		 *    } );
		 */
		this.fnPageChange = function ( mAction, bRedraw )
		{
			var api = this.api( true ).page( mAction );

			if ( bRedraw === undefined || bRedraw ) {
				api.draw(false);
			}
		};


		/**
		 * Show a particular column
		 *  @param {int} iCol The column whose display should be changed
		 *  @param {bool} bShow Show (true) or hide (false) the column
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Hide the second column after initialisation
		 *      oTable.fnSetColumnVis( 1, false );
		 *    } );
		 */
		this.fnSetColumnVis = function ( iCol, bShow, bRedraw )
		{
			var api = this.api( true ).column( iCol ).visible( bShow );

			if ( bRedraw === undefined || bRedraw ) {
				api.columns.adjust().draw();
			}
		};


		/**
		 * Get the settings for a particular table for external manipulation
		 *  @returns {object} DataTables settings object. See
		 *    {@link DataTable.models.oSettings}
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      var oSettings = oTable.fnSettings();
		 *
		 *      // Show an example parameter from the settings
		 *      alert( oSettings._iDisplayStart );
		 *    } );
		 */
		this.fnSettings = function()
		{
			return _fnSettingsFromNode( this[_ext.iApiIndex] );
		};


		/**
		 * Sort the table by a particular column
		 *  @param {int} iCol the data index to sort on. Note that this will not match the
		 *    'display index' if you have hidden data entries
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sort immediately with columns 0 and 1
		 *      oTable.fnSort( [ [0,'asc'], [1,'asc'] ] );
		 *    } );
		 */
		this.fnSort = function( aaSort )
		{
			this.api( true ).order( aaSort ).draw();
		};


		/**
		 * Attach a sort listener to an element for a given column
		 *  @param {node} nNode the element to attach the sort listener to
		 *  @param {int} iColumn the column that a click on this node will sort on
		 *  @param {function} [fnCallback] callback function when sort is run
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *
		 *      // Sort on column 1, when 'sorter' is clicked on
		 *      oTable.fnSortListener( document.getElementById('sorter'), 1 );
		 *    } );
		 */
		this.fnSortListener = function( nNode, iColumn, fnCallback )
		{
			this.api( true ).order.listener( nNode, iColumn, fnCallback );
		};


		/**
		 * Update a table cell or row - this method will accept either a single value to
		 * update the cell with, an array of values with one element for each column or
		 * an object in the same format as the original data source. The function is
		 * self-referencing in order to make the multi column updates easier.
		 *  @param {object|array|string} mData Data to update the cell/row with
		 *  @param {node|int} mRow TR element you want to update or the aoData index
		 *  @param {int} [iColumn] The column to update, give as null or undefined to
		 *    update a whole row.
		 *  @param {bool} [bRedraw=true] Redraw the table or not
		 *  @param {bool} [bAction=true] Perform pre-draw actions or not
		 *  @returns {int} 0 on success, 1 on error
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      oTable.fnUpdate( 'Example update', 0, 0 ); // Single cell
		 *      oTable.fnUpdate( ['a', 'b', 'c', 'd', 'e'], $('tbody tr')[0] ); // Row
		 *    } );
		 */
		this.fnUpdate = function( mData, mRow, iColumn, bRedraw, bAction )
		{
			var api = this.api( true );

			if ( iColumn === undefined || iColumn === null ) {
				api.row( mRow ).data( mData );
			}
			else {
				api.cell( mRow, iColumn ).data( mData );
			}

			if ( bAction === undefined || bAction ) {
				api.columns.adjust();
			}

			if ( bRedraw === undefined || bRedraw ) {
				api.draw();
			}
			return 0;
		};


		/**
		 * Provide a common method for plug-ins to check the version of DataTables being used, in order
		 * to ensure compatibility.
		 *  @param {string} sVersion Version string to check for, in the format "X.Y.Z". Note that the
		 *    formats "X" and "X.Y" are also acceptable.
		 *  @returns {boolean} true if this version of DataTables is greater or equal to the required
		 *    version, or false if this version of DataTales is not suitable
		 *  @method
		 *  @dtopt API
		 *  @deprecated Since v1.10
		 *
		 *  @example
		 *    $(document).ready(function() {
		 *      var oTable = $('#example').dataTable();
		 *      alert( oTable.fnVersionCheck( '1.9.0' ) );
		 *    } );
		 */
		this.fnVersionCheck = _ext.fnVersionCheck;


		var _that = this;
		var emptyInit = options === undefined;
		var len = this.length;

		if ( emptyInit ) {
			options = {};
		}

		this.oApi = this.internal = _ext.internal;

		// Extend with old style plug-in API methods
		for ( var fn in DataTable.ext.internal ) {
			if ( fn ) {
				this[fn] = _fnExternApiFunc(fn);
			}
		}

		this.each(function() {
			// For each initialisation we want to give it a clean initialisation
			// object that can be bashed around
			var o = {};
			var oInit = len > 1 ? // optimisation for single table case
				_fnExtend( o, options, true ) :
				options;

			/*global oInit,_that,emptyInit*/
			var i=0, iLen, j, jLen, k, kLen;
			var sId = this.getAttribute( 'id' );
			var bInitHandedOff = false;
			var defaults = DataTable.defaults;
			var $this = $(this);


			/* Sanity check */
			if ( this.nodeName.toLowerCase() != 'table' )
			{
				_fnLog( null, 0, 'Non-table node initialisation ('+this.nodeName+')', 2 );
				return;
			}

			/* Backwards compatibility for the defaults */
			_fnCompatOpts( defaults );
			_fnCompatCols( defaults.column );

			/* Convert the camel-case defaults to Hungarian */
			_fnCamelToHungarian( defaults, defaults, true );
			_fnCamelToHungarian( defaults.column, defaults.column, true );

			/* Setting up the initialisation object */
			_fnCamelToHungarian( defaults, $.extend( oInit, $this.data() ) );



			/* Check to see if we are re-initialising a table */
			var allSettings = DataTable.settings;
			for ( i=0, iLen=allSettings.length ; i<iLen ; i++ )
			{
				var s = allSettings[i];

				/* Base check on table node */
				if (
					s.nTable == this ||
					(s.nTHead && s.nTHead.parentNode == this) ||
					(s.nTFoot && s.nTFoot.parentNode == this)
				) {
					var bRetrieve = oInit.bRetrieve !== undefined ? oInit.bRetrieve : defaults.bRetrieve;
					var bDestroy = oInit.bDestroy !== undefined ? oInit.bDestroy : defaults.bDestroy;

					if ( emptyInit || bRetrieve )
					{
						return s.oInstance;
					}
					else if ( bDestroy )
					{
						s.oInstance.fnDestroy();
						break;
					}
					else
					{
						_fnLog( s, 0, 'Cannot reinitialise DataTable', 3 );
						return;
					}
				}

				/* If the element we are initialising has the same ID as a table which was previously
				 * initialised, but the table nodes don't match (from before) then we destroy the old
				 * instance by simply deleting it. This is under the assumption that the table has been
				 * destroyed by other methods. Anyone using non-id selectors will need to do this manually
				 */
				if ( s.sTableId == this.id )
				{
					allSettings.splice( i, 1 );
					break;
				}
			}

			/* Ensure the table has an ID - required for accessibility */
			if ( sId === null || sId === "" )
			{
				sId = "DataTables_Table_"+(DataTable.ext._unique++);
				this.id = sId;
			}

			/* Create the settings object for this table and set some of the default parameters */
			var oSettings = $.extend( true, {}, DataTable.models.oSettings, {
				"sDestroyWidth": $this[0].style.width,
				"sInstance":     sId,
				"sTableId":      sId
			} );
			oSettings.nTable = this;
			oSettings.oApi   = _that.internal;
			oSettings.oInit  = oInit;

			allSettings.push( oSettings );

			// Need to add the instance after the instance after the settings object has been added
			// to the settings array, so we can self reference the table instance if more than one
			oSettings.oInstance = (_that.length===1) ? _that : $this.dataTable();

			// Backwards compatibility, before we apply all the defaults
			_fnCompatOpts( oInit );
			_fnLanguageCompat( oInit.oLanguage );

			// If the length menu is given, but the init display length is not, use the length menu
			if ( oInit.aLengthMenu && ! oInit.iDisplayLength )
			{
				oInit.iDisplayLength = $.isArray( oInit.aLengthMenu[0] ) ?
					oInit.aLengthMenu[0][0] : oInit.aLengthMenu[0];
			}

			// Apply the defaults and init options to make a single init object will all
			// options defined from defaults and instance options.
			oInit = _fnExtend( $.extend( true, {}, defaults ), oInit );


			// Map the initialisation options onto the settings object
			_fnMap( oSettings.oFeatures, oInit, [
				"bPaginate",
				"bLengthChange",
				"bFilter",
				"bSort",
				"bSortMulti",
				"bInfo",
				"bProcessing",
				"bAutoWidth",
				"bSortClasses",
				"bServerSide",
				"bDeferRender"
			] );
			_fnMap( oSettings, oInit, [
				"asStripeClasses",
				"ajax",
				"fnServerData",
				"fnFormatNumber",
				"sServerMethod",
				"aaSorting",
				"aaSortingFixed",
				"aLengthMenu",
				"sPaginationType",
				"sAjaxSource",
				"sAjaxDataProp",
				"iStateDuration",
				"sDom",
				"bSortCellsTop",
				"iTabIndex",
				"fnStateLoadCallback",
				"fnStateSaveCallback",
				"renderer",
				"searchDelay",
				"rowId",
				[ "iCookieDuration", "iStateDuration" ], // backwards compat
				[ "oSearch", "oPreviousSearch" ],
				[ "aoSearchCols", "aoPreSearchCols" ],
				[ "iDisplayLength", "_iDisplayLength" ]
			] );
			_fnMap( oSettings.oScroll, oInit, [
				[ "sScrollX", "sX" ],
				[ "sScrollXInner", "sXInner" ],
				[ "sScrollY", "sY" ],
				[ "bScrollCollapse", "bCollapse" ]
			] );
			_fnMap( oSettings.oLanguage, oInit, "fnInfoCallback" );

			/* Callback functions which are array driven */
			_fnCallbackReg( oSettings, 'aoDrawCallback',       oInit.fnDrawCallback,      'user' );
			_fnCallbackReg( oSettings, 'aoServerParams',       oInit.fnServerParams,      'user' );
			_fnCallbackReg( oSettings, 'aoStateSaveParams',    oInit.fnStateSaveParams,   'user' );
			_fnCallbackReg( oSettings, 'aoStateLoadParams',    oInit.fnStateLoadParams,   'user' );
			_fnCallbackReg( oSettings, 'aoStateLoaded',        oInit.fnStateLoaded,       'user' );
			_fnCallbackReg( oSettings, 'aoRowCallback',        oInit.fnRowCallback,       'user' );
			_fnCallbackReg( oSettings, 'aoRowCreatedCallback', oInit.fnCreatedRow,        'user' );
			_fnCallbackReg( oSettings, 'aoHeaderCallback',     oInit.fnHeaderCallback,    'user' );
			_fnCallbackReg( oSettings, 'aoFooterCallback',     oInit.fnFooterCallback,    'user' );
			_fnCallbackReg( oSettings, 'aoInitComplete',       oInit.fnInitComplete,      'user' );
			_fnCallbackReg( oSettings, 'aoPreDrawCallback',    oInit.fnPreDrawCallback,   'user' );

			oSettings.rowIdFn = _fnGetObjectDataFn( oInit.rowId );

			/* Browser support detection */
			_fnBrowserDetect( oSettings );

			var oClasses = oSettings.oClasses;

			$.extend( oClasses, DataTable.ext.classes, oInit.oClasses );
			$this.addClass( oClasses.sTable );


			if ( oSettings.iInitDisplayStart === undefined )
			{
				/* Display start point, taking into account the save saving */
				oSettings.iInitDisplayStart = oInit.iDisplayStart;
				oSettings._iDisplayStart = oInit.iDisplayStart;
			}

			if ( oInit.iDeferLoading !== null )
			{
				oSettings.bDeferLoading = true;
				var tmp = $.isArray( oInit.iDeferLoading );
				oSettings._iRecordsDisplay = tmp ? oInit.iDeferLoading[0] : oInit.iDeferLoading;
				oSettings._iRecordsTotal = tmp ? oInit.iDeferLoading[1] : oInit.iDeferLoading;
			}

			/* Language definitions */
			var oLanguage = oSettings.oLanguage;
			$.extend( true, oLanguage, oInit.oLanguage );

			if ( oLanguage.sUrl )
			{
				/* Get the language definitions from a file - because this Ajax call makes the language
				 * get async to the remainder of this function we use bInitHandedOff to indicate that
				 * _fnInitialise will be fired by the returned Ajax handler, rather than the constructor
				 */
				$.ajax( {
					dataType: 'json',
					url: oLanguage.sUrl,
					success: function ( json ) {
						_fnLanguageCompat( json );
						_fnCamelToHungarian( defaults.oLanguage, json );
						$.extend( true, oLanguage, json );
						_fnInitialise( oSettings );
					},
					error: function () {
						// Error occurred loading language file, continue on as best we can
						_fnInitialise( oSettings );
					}
				} );
				bInitHandedOff = true;
			}

			/*
			 * Stripes
			 */
			if ( oInit.asStripeClasses === null )
			{
				oSettings.asStripeClasses =[
					oClasses.sStripeOdd,
					oClasses.sStripeEven
				];
			}

			/* Remove row stripe classes if they are already on the table row */
			var stripeClasses = oSettings.asStripeClasses;
			var rowOne = $this.children('tbody').find('tr').eq(0);
			if ( $.inArray( true, $.map( stripeClasses, function(el, i) {
				return rowOne.hasClass(el);
			} ) ) !== -1 ) {
				$('tbody tr', this).removeClass( stripeClasses.join(' ') );
				oSettings.asDestroyStripes = stripeClasses.slice();
			}

			/*
			 * Columns
			 * See if we should load columns automatically or use defined ones
			 */
			var anThs = [];
			var aoColumnsInit;
			var nThead = this.getElementsByTagName('thead');
			if ( nThead.length !== 0 )
			{
				_fnDetectHeader( oSettings.aoHeader, nThead[0] );
				anThs = _fnGetUniqueThs( oSettings );
			}

			/* If not given a column array, generate one with nulls */
			if ( oInit.aoColumns === null )
			{
				aoColumnsInit = [];
				for ( i=0, iLen=anThs.length ; i<iLen ; i++ )
				{
					aoColumnsInit.push( null );
				}
			}
			else
			{
				aoColumnsInit = oInit.aoColumns;
			}

			/* Add the columns */
			for ( i=0, iLen=aoColumnsInit.length ; i<iLen ; i++ )
			{
				_fnAddColumn( oSettings, anThs ? anThs[i] : null );
			}

			/* Apply the column definitions */
			_fnApplyColumnDefs( oSettings, oInit.aoColumnDefs, aoColumnsInit, function (iCol, oDef) {
				_fnColumnOptions( oSettings, iCol, oDef );
			} );

			/* HTML5 attribute detection - build an mData object automatically if the
			 * attributes are found
			 */
			if ( rowOne.length ) {
				var a = function ( cell, name ) {
					return cell.getAttribute( 'data-'+name ) !== null ? name : null;
				};

				$( rowOne[0] ).children('th, td').each( function (i, cell) {
					var col = oSettings.aoColumns[i];

					if ( col.mData === i ) {
						var sort = a( cell, 'sort' ) || a( cell, 'order' );
						var filter = a( cell, 'filter' ) || a( cell, 'search' );

						if ( sort !== null || filter !== null ) {
							col.mData = {
								_:      i+'.display',
								sort:   sort !== null   ? i+'.@data-'+sort   : undefined,
								type:   sort !== null   ? i+'.@data-'+sort   : undefined,
								filter: filter !== null ? i+'.@data-'+filter : undefined
							};

							_fnColumnOptions( oSettings, i );
						}
					}
				} );
			}

			var features = oSettings.oFeatures;
			var loadedInit = function () {
				/*
				 * Sorting
				 * @todo For modularisation (1.11) this needs to do into a sort start up handler
				 */

				// If aaSorting is not defined, then we use the first indicator in asSorting
				// in case that has been altered, so the default sort reflects that option
				if ( oInit.aaSorting === undefined ) {
					var sorting = oSettings.aaSorting;
					for ( i=0, iLen=sorting.length ; i<iLen ; i++ ) {
						sorting[i][1] = oSettings.aoColumns[ i ].asSorting[0];
					}
				}

				/* Do a first pass on the sorting classes (allows any size changes to be taken into
				 * account, and also will apply sorting disabled classes if disabled
				 */
				_fnSortingClasses( oSettings );

				if ( features.bSort ) {
					_fnCallbackReg( oSettings, 'aoDrawCallback', function () {
						if ( oSettings.bSorted ) {
							var aSort = _fnSortFlatten( oSettings );
							var sortedColumns = {};

							$.each( aSort, function (i, val) {
								sortedColumns[ val.src ] = val.dir;
							} );

							_fnCallbackFire( oSettings, null, 'order', [oSettings, aSort, sortedColumns] );
							_fnSortAria( oSettings );
						}
					} );
				}

				_fnCallbackReg( oSettings, 'aoDrawCallback', function () {
					if ( oSettings.bSorted || _fnDataSource( oSettings ) === 'ssp' || features.bDeferRender ) {
						_fnSortingClasses( oSettings );
					}
				}, 'sc' );


				/*
				 * Final init
				 * Cache the header, body and footer as required, creating them if needed
				 */

				// Work around for Webkit bug 83867 - store the caption-side before removing from doc
				var captions = $this.children('caption').each( function () {
					this._captionSide = $(this).css('caption-side');
				} );

				var thead = $this.children('thead');
				if ( thead.length === 0 ) {
					thead = $('<thead/>').appendTo($this);
				}
				oSettings.nTHead = thead[0];

				var tbody = $this.children('tbody');
				if ( tbody.length === 0 ) {
					tbody = $('<tbody/>').appendTo($this);
				}
				oSettings.nTBody = tbody[0];

				var tfoot = $this.children('tfoot');
				if ( tfoot.length === 0 && captions.length > 0 && (oSettings.oScroll.sX !== "" || oSettings.oScroll.sY !== "") ) {
					// If we are a scrolling table, and no footer has been given, then we need to create
					// a tfoot element for the caption element to be appended to
					tfoot = $('<tfoot/>').appendTo($this);
				}

				if ( tfoot.length === 0 || tfoot.children().length === 0 ) {
					$this.addClass( oClasses.sNoFooter );
				}
				else if ( tfoot.length > 0 ) {
					oSettings.nTFoot = tfoot[0];
					_fnDetectHeader( oSettings.aoFooter, oSettings.nTFoot );
				}

				/* Check if there is data passing into the constructor */
				if ( oInit.aaData ) {
					for ( i=0 ; i<oInit.aaData.length ; i++ ) {
						_fnAddData( oSettings, oInit.aaData[ i ] );
					}
				}
				else if ( oSettings.bDeferLoading || _fnDataSource( oSettings ) == 'dom' ) {
					/* Grab the data from the page - only do this when deferred loading or no Ajax
					 * source since there is no point in reading the DOM data if we are then going
					 * to replace it with Ajax data
					 */
					_fnAddTr( oSettings, $(oSettings.nTBody).children('tr') );
				}

				/* Copy the data index array */
				oSettings.aiDisplay = oSettings.aiDisplayMaster.slice();

				/* Initialisation complete - table can be drawn */
				oSettings.bInitialised = true;

				/* Check if we need to initialise the table (it might not have been handed off to the
				 * language processor)
				 */
				if ( bInitHandedOff === false ) {
					_fnInitialise( oSettings );
				}
			};

			/* Must be done after everything which can be overridden by the state saving! */
			if ( oInit.bStateSave )
			{
				features.bStateSave = true;
				_fnCallbackReg( oSettings, 'aoDrawCallback', _fnSaveState, 'state_save' );
				_fnLoadState( oSettings, oInit, loadedInit );
			}
			else {
				loadedInit();
			}

		} );
		_that = null;
		return this;
	};


	/*
	 * It is useful to have variables which are scoped locally so only the
	 * DataTables functions can access them and they don't leak into global space.
	 * At the same time these functions are often useful over multiple files in the
	 * core and API, so we list, or at least document, all variables which are used
	 * by DataTables as private variables here. This also ensures that there is no
	 * clashing of variable names and that they can easily referenced for reuse.
	 */


	// Defined else where
	//  _selector_run
	//  _selector_opts
	//  _selector_first
	//  _selector_row_indexes

	var _ext; // DataTable.ext
	var _Api; // DataTable.Api
	var _api_register; // DataTable.Api.register
	var _api_registerPlural; // DataTable.Api.registerPlural

	var _re_dic = {};
	var _re_new_lines = /[\r\n]/g;
	var _re_html = /<.*?>/g;

	// This is not strict ISO8601 - Date.parse() is quite lax, although
	// implementations differ between browsers.
	var _re_date = /^\d{2,4}[\.\/\-]\d{1,2}[\.\/\-]\d{1,2}([T ]{1}\d{1,2}[:\.]\d{2}([\.:]\d{2})?)?$/;

	// Escape regular expression special characters
	var _re_escape_regex = new RegExp( '(\\' + [ '/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\', '$', '^', '-' ].join('|\\') + ')', 'g' );

	// http://en.wikipedia.org/wiki/Foreign_exchange_market
	// - \u20BD - Russian ruble.
	// - \u20a9 - South Korean Won
	// - \u20BA - Turkish Lira
	// - \u20B9 - Indian Rupee
	// - R - Brazil (R$) and South Africa
	// - fr - Swiss Franc
	// - kr - Swedish krona, Norwegian krone and Danish krone
	// - \u2009 is thin space and \u202F is narrow no-break space, both used in many
	// - Éƒ - Bitcoin
	// - Îž - Ethereum
	//   standards as thousands separators.
	var _re_formatted_numeric = /[',$Â£â‚¬Â¥%\u2009\u202F\u20BD\u20a9\u20BArfkÉƒÎž]/gi;


	var _empty = function ( d ) {
		return !d || d === true || d === '-' ? true : false;
	};


	var _intVal = function ( s ) {
		var integer = parseInt( s, 10 );
		return !isNaN(integer) && isFinite(s) ? integer : null;
	};

	// Convert from a formatted number with characters other than `.` as the
	// decimal place, to a Javascript number
	var _numToDecimal = function ( num, decimalPoint ) {
		// Cache created regular expressions for speed as this function is called often
		if ( ! _re_dic[ decimalPoint ] ) {
			_re_dic[ decimalPoint ] = new RegExp( _fnEscapeRegex( decimalPoint ), 'g' );
		}
		return typeof num === 'string' && decimalPoint !== '.' ?
			num.replace( /\./g, '' ).replace( _re_dic[ decimalPoint ], '.' ) :
			num;
	};


	var _isNumber = function ( d, decimalPoint, formatted ) {
		var strType = typeof d === 'string';

		// If empty return immediately so there must be a number if it is a
		// formatted string (this stops the string "k", or "kr", etc being detected
		// as a formatted number for currency
		if ( _empty( d ) ) {
			return true;
		}

		if ( decimalPoint && strType ) {
			d = _numToDecimal( d, decimalPoint );
		}

		if ( formatted && strType ) {
			d = d.replace( _re_formatted_numeric, '' );
		}

		return !isNaN( parseFloat(d) ) && isFinite( d );
	};


	// A string without HTML in it can be considered to be HTML still
	var _isHtml = function ( d ) {
		return _empty( d ) || typeof d === 'string';
	};


	var _htmlNumeric = function ( d, decimalPoint, formatted ) {
		if ( _empty( d ) ) {
			return true;
		}

		var html = _isHtml( d );
		return ! html ?
			null :
			_isNumber( _stripHtml( d ), decimalPoint, formatted ) ?
				true :
				null;
	};


	var _pluck = function ( a, prop, prop2 ) {
		var out = [];
		var i=0, ien=a.length;

		// Could have the test in the loop for slightly smaller code, but speed
		// is essential here
		if ( prop2 !== undefined ) {
			for ( ; i<ien ; i++ ) {
				if ( a[i] && a[i][ prop ] ) {
					out.push( a[i][ prop ][ prop2 ] );
				}
			}
		}
		else {
			for ( ; i<ien ; i++ ) {
				if ( a[i] ) {
					out.push( a[i][ prop ] );
				}
			}
		}

		return out;
	};


	// Basically the same as _pluck, but rather than looping over `a` we use `order`
	// as the indexes to pick from `a`
	var _pluck_order = function ( a, order, prop, prop2 )
	{
		var out = [];
		var i=0, ien=order.length;

		// Could have the test in the loop for slightly smaller code, but speed
		// is essential here
		if ( prop2 !== undefined ) {
			for ( ; i<ien ; i++ ) {
				if ( a[ order[i] ][ prop ] ) {
					out.push( a[ order[i] ][ prop ][ prop2 ] );
				}
			}
		}
		else {
			for ( ; i<ien ; i++ ) {
				out.push( a[ order[i] ][ prop ] );
			}
		}

		return out;
	};


	var _range = function ( len, start )
	{
		var out = [];
		var end;

		if ( start === undefined ) {
			start = 0;
			end = len;
		}
		else {
			end = start;
			start = len;
		}

		for ( var i=start ; i<end ; i++ ) {
			out.push( i );
		}

		return out;
	};


	var _removeEmpty = function ( a )
	{
		var out = [];

		for ( var i=0, ien=a.length ; i<ien ; i++ ) {
			if ( a[i] ) { // careful - will remove all falsy values!
				out.push( a[i] );
			}
		}

		return out;
	};


	var _stripHtml = function ( d ) {
		return d.replace( _re_html, '' );
	};


	/**
	 * Determine if all values in the array are unique. This means we can short
	 * cut the _unique method at the cost of a single loop. A sorted array is used
	 * to easily check the values.
	 *
	 * @param  {array} src Source array
	 * @return {boolean} true if all unique, false otherwise
	 * @ignore
	 */
	var _areAllUnique = function ( src ) {
		if ( src.length < 2 ) {
			return true;
		}

		var sorted = src.slice().sort();
		var last = sorted[0];

		for ( var i=1, ien=sorted.length ; i<ien ; i++ ) {
			if ( sorted[i] === last ) {
				return false;
			}

			last = sorted[i];
		}

		return true;
	};


	/**
	 * Find the unique elements in a source array.
	 *
	 * @param  {array} src Source array
	 * @return {array} Array of unique items
	 * @ignore
	 */
	var _unique = function ( src )
	{
		if ( _areAllUnique( src ) ) {
			return src.slice();
		}

		// A faster unique method is to use object keys to identify used values,
		// but this doesn't work with arrays or objects, which we must also
		// consider. See jsperf.com/compare-array-unique-versions/4 for more
		// information.
		var
			out = [],
			val,
			i, ien=src.length,
			j, k=0;

		again: for ( i=0 ; i<ien ; i++ ) {
			val = src[i];

			for ( j=0 ; j<k ; j++ ) {
				if ( out[j] === val ) {
					continue again;
				}
			}

			out.push( val );
			k++;
		}

		return out;
	};


	/**
	 * DataTables utility methods
	 *
	 * This namespace provides helper methods that DataTables uses internally to
	 * create a DataTable, but which are not exclusively used only for DataTables.
	 * These methods can be used by extension authors to save the duplication of
	 * code.
	 *
	 *  @namespace
	 */
	DataTable.util = {
		/**
		 * Throttle the calls to a function. Arguments and context are maintained
		 * for the throttled function.
		 *
		 * @param {function} fn Function to be called
		 * @param {integer} freq Call frequency in mS
		 * @return {function} Wrapped function
		 */
		throttle: function ( fn, freq ) {
			var
				frequency = freq !== undefined ? freq : 200,
				last,
				timer;

			return function () {
				var
					that = this,
					now  = +new Date(),
					args = arguments;

				if ( last && now < last + frequency ) {
					clearTimeout( timer );

					timer = setTimeout( function () {
						last = undefined;
						fn.apply( that, args );
					}, frequency );
				}
				else {
					last = now;
					fn.apply( that, args );
				}
			};
		},


		/**
		 * Escape a string such that it can be used in a regular expression
		 *
		 *  @param {string} val string to escape
		 *  @returns {string} escaped string
		 */
		escapeRegex: function ( val ) {
			return val.replace( _re_escape_regex, '\\$1' );
		}
	};



	/**
	 * Create a mapping object that allows camel case parameters to be looked up
	 * for their Hungarian counterparts. The mapping is stored in a private
	 * parameter called `_hungarianMap` which can be accessed on the source object.
	 *  @param {object} o
	 *  @memberof DataTable#oApi
	 */
	function _fnHungarianMap ( o )
	{
		var
			hungarian = 'a aa ai ao as b fn i m o s ',
			match,
			newKey,
			map = {};

		$.each( o, function (key, val) {
			match = key.match(/^([^A-Z]+?)([A-Z])/);

			if ( match && hungarian.indexOf(match[1]+' ') !== -1 )
			{
				newKey = key.replace( match[0], match[2].toLowerCase() );
				map[ newKey ] = key;

				if ( match[1] === 'o' )
				{
					_fnHungarianMap( o[key] );
				}
			}
		} );

		o._hungarianMap = map;
	}


	/**
	 * Convert from camel case parameters to Hungarian, based on a Hungarian map
	 * created by _fnHungarianMap.
	 *  @param {object} src The model object which holds all parameters that can be
	 *    mapped.
	 *  @param {object} user The object to convert from camel case to Hungarian.
	 *  @param {boolean} force When set to `true`, properties which already have a
	 *    Hungarian value in the `user` object will be overwritten. Otherwise they
	 *    won't be.
	 *  @memberof DataTable#oApi
	 */
	function _fnCamelToHungarian ( src, user, force )
	{
		if ( ! src._hungarianMap ) {
			_fnHungarianMap( src );
		}

		var hungarianKey;

		$.each( user, function (key, val) {
			hungarianKey = src._hungarianMap[ key ];

			if ( hungarianKey !== undefined && (force || user[hungarianKey] === undefined) )
			{
				// For objects, we need to buzz down into the object to copy parameters
				if ( hungarianKey.charAt(0) === 'o' )
				{
					// Copy the camelCase options over to the hungarian
					if ( ! user[ hungarianKey ] ) {
						user[ hungarianKey ] = {};
					}
					$.extend( true, user[hungarianKey], user[key] );

					_fnCamelToHungarian( src[hungarianKey], user[hungarianKey], force );
				}
				else {
					user[hungarianKey] = user[ key ];
				}
			}
		} );
	}


	/**
	 * Language compatibility - when certain options are given, and others aren't, we
	 * need to duplicate the values over, in order to provide backwards compatibility
	 * with older language files.
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnLanguageCompat( lang )
	{
		// Note the use of the Hungarian notation for the parameters in this method as
		// this is called after the mapping of camelCase to Hungarian
		var defaults = DataTable.defaults.oLanguage;

		// Default mapping
		var defaultDecimal = defaults.sDecimal;
		if ( defaultDecimal ) {
			_addNumericSort( defaultDecimal );
		}

		if ( lang ) {
			var zeroRecords = lang.sZeroRecords;

			// Backwards compatibility - if there is no sEmptyTable given, then use the same as
			// sZeroRecords - assuming that is given.
			if ( ! lang.sEmptyTable && zeroRecords &&
				defaults.sEmptyTable === "No data available in table" )
			{
				_fnMap( lang, lang, 'sZeroRecords', 'sEmptyTable' );
			}

			// Likewise with loading records
			if ( ! lang.sLoadingRecords && zeroRecords &&
				defaults.sLoadingRecords === "Loading..." )
			{
				_fnMap( lang, lang, 'sZeroRecords', 'sLoadingRecords' );
			}

			// Old parameter name of the thousands separator mapped onto the new
			if ( lang.sInfoThousands ) {
				lang.sThousands = lang.sInfoThousands;
			}

			var decimal = lang.sDecimal;
			if ( decimal && defaultDecimal !== decimal ) {
				_addNumericSort( decimal );
			}
		}
	}


	/**
	 * Map one parameter onto another
	 *  @param {object} o Object to map
	 *  @param {*} knew The new parameter name
	 *  @param {*} old The old parameter name
	 */
	var _fnCompatMap = function ( o, knew, old ) {
		if ( o[ knew ] !== undefined ) {
			o[ old ] = o[ knew ];
		}
	};


	/**
	 * Provide backwards compatibility for the main DT options. Note that the new
	 * options are mapped onto the old parameters, so this is an external interface
	 * change only.
	 *  @param {object} init Object to map
	 */
	function _fnCompatOpts ( init )
	{
		_fnCompatMap( init, 'ordering',      'bSort' );
		_fnCompatMap( init, 'orderMulti',    'bSortMulti' );
		_fnCompatMap( init, 'orderClasses',  'bSortClasses' );
		_fnCompatMap( init, 'orderCellsTop', 'bSortCellsTop' );
		_fnCompatMap( init, 'order',         'aaSorting' );
		_fnCompatMap( init, 'orderFixed',    'aaSortingFixed' );
		_fnCompatMap( init, 'paging',        'bPaginate' );
		_fnCompatMap( init, 'pagingType',    'sPaginationType' );
		_fnCompatMap( init, 'pageLength',    'iDisplayLength' );
		_fnCompatMap( init, 'searching',     'bFilter' );

		// Boolean initialisation of x-scrolling
		if ( typeof init.sScrollX === 'boolean' ) {
			init.sScrollX = init.sScrollX ? '100%' : '';
		}
		if ( typeof init.scrollX === 'boolean' ) {
			init.scrollX = init.scrollX ? '100%' : '';
		}

		// Column search objects are in an array, so it needs to be converted
		// element by element
		var searchCols = init.aoSearchCols;

		if ( searchCols ) {
			for ( var i=0, ien=searchCols.length ; i<ien ; i++ ) {
				if ( searchCols[i] ) {
					_fnCamelToHungarian( DataTable.models.oSearch, searchCols[i] );
				}
			}
		}
	}


	/**
	 * Provide backwards compatibility for column options. Note that the new options
	 * are mapped onto the old parameters, so this is an external interface change
	 * only.
	 *  @param {object} init Object to map
	 */
	function _fnCompatCols ( init )
	{
		_fnCompatMap( init, 'orderable',     'bSortable' );
		_fnCompatMap( init, 'orderData',     'aDataSort' );
		_fnCompatMap( init, 'orderSequence', 'asSorting' );
		_fnCompatMap( init, 'orderDataType', 'sortDataType' );

		// orderData can be given as an integer
		var dataSort = init.aDataSort;
		if ( typeof dataSort === 'number' && ! $.isArray( dataSort ) ) {
			init.aDataSort = [ dataSort ];
		}
	}


	/**
	 * Browser feature detection for capabilities, quirks
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnBrowserDetect( settings )
	{
		// We don't need to do this every time DataTables is constructed, the values
		// calculated are specific to the browser and OS configuration which we
		// don't expect to change between initialisations
		if ( ! DataTable.__browser ) {
			var browser = {};
			DataTable.__browser = browser;

			// Scrolling feature / quirks detection
			var n = $('<div/>')
				.css( {
					position: 'fixed',
					top: 0,
					left: $(window).scrollLeft()*-1, // allow for scrolling
					height: 1,
					width: 1,
					overflow: 'hidden'
				} )
				.append(
					$('<div/>')
						.css( {
							position: 'absolute',
							top: 1,
							left: 1,
							width: 100,
							overflow: 'scroll'
						} )
						.append(
							$('<div/>')
								.css( {
									width: '100%',
									height: 10
								} )
						)
				)
				.appendTo( 'body' );

			var outer = n.children();
			var inner = outer.children();

			// Numbers below, in order, are:
			// inner.offsetWidth, inner.clientWidth, outer.offsetWidth, outer.clientWidth
			//
			// IE6 XP:                           100 100 100  83
			// IE7 Vista:                        100 100 100  83
			// IE 8+ Windows:                     83  83 100  83
			// Evergreen Windows:                 83  83 100  83
			// Evergreen Mac with scrollbars:     85  85 100  85
			// Evergreen Mac without scrollbars: 100 100 100 100

			// Get scrollbar width
			browser.barWidth = outer[0].offsetWidth - outer[0].clientWidth;

			// IE6/7 will oversize a width 100% element inside a scrolling element, to
			// include the width of the scrollbar, while other browsers ensure the inner
			// element is contained without forcing scrolling
			browser.bScrollOversize = inner[0].offsetWidth === 100 && outer[0].clientWidth !== 100;

			// In rtl text layout, some browsers (most, but not all) will place the
			// scrollbar on the left, rather than the right.
			browser.bScrollbarLeft = Math.round( inner.offset().left ) !== 1;

			// IE8- don't provide height and width for getBoundingClientRect
			browser.bBounding = n[0].getBoundingClientRect().width ? true : false;

			n.remove();
		}

		$.extend( settings.oBrowser, DataTable.__browser );
		settings.oScroll.iBarWidth = DataTable.__browser.barWidth;
	}


	/**
	 * Array.prototype reduce[Right] method, used for browsers which don't support
	 * JS 1.6. Done this way to reduce code size, since we iterate either way
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnReduce ( that, fn, init, start, end, inc )
	{
		var
			i = start,
			value,
			isSet = false;

		if ( init !== undefined ) {
			value = init;
			isSet = true;
		}

		while ( i !== end ) {
			if ( ! that.hasOwnProperty(i) ) {
				continue;
			}

			value = isSet ?
				fn( value, that[i], i, that ) :
				that[i];

			isSet = true;
			i += inc;
		}

		return value;
	}

	/**
	 * Add a column to the list used for the table with default values
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} nTh The th element for this column
	 *  @memberof DataTable#oApi
	 */
	function _fnAddColumn( oSettings, nTh )
	{
		// Add column to aoColumns array
		var oDefaults = DataTable.defaults.column;
		var iCol = oSettings.aoColumns.length;
		var oCol = $.extend( {}, DataTable.models.oColumn, oDefaults, {
			"nTh": nTh ? nTh : document.createElement('th'),
			"sTitle":    oDefaults.sTitle    ? oDefaults.sTitle    : nTh ? nTh.innerHTML : '',
			"aDataSort": oDefaults.aDataSort ? oDefaults.aDataSort : [iCol],
			"mData": oDefaults.mData ? oDefaults.mData : iCol,
			idx: iCol
		} );
		oSettings.aoColumns.push( oCol );

		// Add search object for column specific search. Note that the `searchCols[ iCol ]`
		// passed into extend can be undefined. This allows the user to give a default
		// with only some of the parameters defined, and also not give a default
		var searchCols = oSettings.aoPreSearchCols;
		searchCols[ iCol ] = $.extend( {}, DataTable.models.oSearch, searchCols[ iCol ] );

		// Use the default column options function to initialise classes etc
		_fnColumnOptions( oSettings, iCol, $(nTh).data() );
	}


	/**
	 * Apply options for a column
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iCol column index to consider
	 *  @param {object} oOptions object with sType, bVisible and bSearchable etc
	 *  @memberof DataTable#oApi
	 */
	function _fnColumnOptions( oSettings, iCol, oOptions )
	{
		var oCol = oSettings.aoColumns[ iCol ];
		var oClasses = oSettings.oClasses;
		var th = $(oCol.nTh);

		// Try to get width information from the DOM. We can't get it from CSS
		// as we'd need to parse the CSS stylesheet. `width` option can override
		if ( ! oCol.sWidthOrig ) {
			// Width attribute
			oCol.sWidthOrig = th.attr('width') || null;

			// Style attribute
			var t = (th.attr('style') || '').match(/width:\s*(\d+[pxem%]+)/);
			if ( t ) {
				oCol.sWidthOrig = t[1];
			}
		}

		/* User specified column options */
		if ( oOptions !== undefined && oOptions !== null )
		{
			// Backwards compatibility
			_fnCompatCols( oOptions );

			// Map camel case parameters to their Hungarian counterparts
			_fnCamelToHungarian( DataTable.defaults.column, oOptions );

			/* Backwards compatibility for mDataProp */
			if ( oOptions.mDataProp !== undefined && !oOptions.mData )
			{
				oOptions.mData = oOptions.mDataProp;
			}

			if ( oOptions.sType )
			{
				oCol._sManualType = oOptions.sType;
			}

			// `class` is a reserved word in Javascript, so we need to provide
			// the ability to use a valid name for the camel case input
			if ( oOptions.className && ! oOptions.sClass )
			{
				oOptions.sClass = oOptions.className;
			}
			if ( oOptions.sClass ) {
				th.addClass( oOptions.sClass );
			}

			$.extend( oCol, oOptions );
			_fnMap( oCol, oOptions, "sWidth", "sWidthOrig" );

			/* iDataSort to be applied (backwards compatibility), but aDataSort will take
			 * priority if defined
			 */
			if ( oOptions.iDataSort !== undefined )
			{
				oCol.aDataSort = [ oOptions.iDataSort ];
			}
			_fnMap( oCol, oOptions, "aDataSort" );
		}

		/* Cache the data get and set functions for speed */
		var mDataSrc = oCol.mData;
		var mData = _fnGetObjectDataFn( mDataSrc );
		var mRender = oCol.mRender ? _fnGetObjectDataFn( oCol.mRender ) : null;

		var attrTest = function( src ) {
			return typeof src === 'string' && src.indexOf('@') !== -1;
		};
		oCol._bAttrSrc = $.isPlainObject( mDataSrc ) && (
			attrTest(mDataSrc.sort) || attrTest(mDataSrc.type) || attrTest(mDataSrc.filter)
		);
		oCol._setter = null;

		oCol.fnGetData = function (rowData, type, meta) {
			var innerData = mData( rowData, type, undefined, meta );

			return mRender && type ?
				mRender( innerData, type, rowData, meta ) :
				innerData;
		};
		oCol.fnSetData = function ( rowData, val, meta ) {
			return _fnSetObjectDataFn( mDataSrc )( rowData, val, meta );
		};

		// Indicate if DataTables should read DOM data as an object or array
		// Used in _fnGetRowElements
		if ( typeof mDataSrc !== 'number' ) {
			oSettings._rowReadObject = true;
		}

		/* Feature sorting overrides column specific when off */
		if ( !oSettings.oFeatures.bSort )
		{
			oCol.bSortable = false;
			th.addClass( oClasses.sSortableNone ); // Have to add class here as order event isn't called
		}

		/* Check that the class assignment is correct for sorting */
		var bAsc = $.inArray('asc', oCol.asSorting) !== -1;
		var bDesc = $.inArray('desc', oCol.asSorting) !== -1;
		if ( !oCol.bSortable || (!bAsc && !bDesc) )
		{
			oCol.sSortingClass = oClasses.sSortableNone;
			oCol.sSortingClassJUI = "";
		}
		else if ( bAsc && !bDesc )
		{
			oCol.sSortingClass = oClasses.sSortableAsc;
			oCol.sSortingClassJUI = oClasses.sSortJUIAscAllowed;
		}
		else if ( !bAsc && bDesc )
		{
			oCol.sSortingClass = oClasses.sSortableDesc;
			oCol.sSortingClassJUI = oClasses.sSortJUIDescAllowed;
		}
		else
		{
			oCol.sSortingClass = oClasses.sSortable;
			oCol.sSortingClassJUI = oClasses.sSortJUI;
		}
	}


	/**
	 * Adjust the table column widths for new data. Note: you would probably want to
	 * do a redraw after calling this function!
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnAdjustColumnSizing ( settings )
	{
		/* Not interested in doing column width calculation if auto-width is disabled */
		if ( settings.oFeatures.bAutoWidth !== false )
		{
			var columns = settings.aoColumns;

			_fnCalculateColumnWidths( settings );
			for ( var i=0 , iLen=columns.length ; i<iLen ; i++ )
			{
				columns[i].nTh.style.width = columns[i].sWidth;
			}
		}

		var scroll = settings.oScroll;
		if ( scroll.sY !== '' || scroll.sX !== '')
		{
			_fnScrollDraw( settings );
		}

		_fnCallbackFire( settings, null, 'column-sizing', [settings] );
	}


	/**
	 * Covert the index of a visible column to the index in the data array (take account
	 * of hidden columns)
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iMatch Visible column index to lookup
	 *  @returns {int} i the data index
	 *  @memberof DataTable#oApi
	 */
	function _fnVisibleToColumnIndex( oSettings, iMatch )
	{
		var aiVis = _fnGetColumns( oSettings, 'bVisible' );

		return typeof aiVis[iMatch] === 'number' ?
			aiVis[iMatch] :
			null;
	}


	/**
	 * Covert the index of an index in the data array and convert it to the visible
	 *   column index (take account of hidden columns)
	 *  @param {int} iMatch Column index to lookup
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {int} i the data index
	 *  @memberof DataTable#oApi
	 */
	function _fnColumnIndexToVisible( oSettings, iMatch )
	{
		var aiVis = _fnGetColumns( oSettings, 'bVisible' );
		var iPos = $.inArray( iMatch, aiVis );

		return iPos !== -1 ? iPos : null;
	}


	/**
	 * Get the number of visible columns
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {int} i the number of visible columns
	 *  @memberof DataTable#oApi
	 */
	function _fnVisbleColumns( oSettings )
	{
		var vis = 0;

		// No reduce in IE8, use a loop for now
		$.each( oSettings.aoColumns, function ( i, col ) {
			if ( col.bVisible && $(col.nTh).css('display') !== 'none' ) {
				vis++;
			}
		} );

		return vis;
	}


	/**
	 * Get an array of column indexes that match a given property
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sParam Parameter in aoColumns to look for - typically
	 *    bVisible or bSearchable
	 *  @returns {array} Array of indexes with matched properties
	 *  @memberof DataTable#oApi
	 */
	function _fnGetColumns( oSettings, sParam )
	{
		var a = [];

		$.map( oSettings.aoColumns, function(val, i) {
			if ( val[sParam] ) {
				a.push( i );
			}
		} );

		return a;
	}


	/**
	 * Calculate the 'type' of a column
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnColumnTypes ( settings )
	{
		var columns = settings.aoColumns;
		var data = settings.aoData;
		var types = DataTable.ext.type.detect;
		var i, ien, j, jen, k, ken;
		var col, cell, detectedType, cache;

		// For each column, spin over the
		for ( i=0, ien=columns.length ; i<ien ; i++ ) {
			col = columns[i];
			cache = [];

			if ( ! col.sType && col._sManualType ) {
				col.sType = col._sManualType;
			}
			else if ( ! col.sType ) {
				for ( j=0, jen=types.length ; j<jen ; j++ ) {
					for ( k=0, ken=data.length ; k<ken ; k++ ) {
						// Use a cache array so we only need to get the type data
						// from the formatter once (when using multiple detectors)
						if ( cache[k] === undefined ) {
							cache[k] = _fnGetCellData( settings, k, i, 'type' );
						}

						detectedType = types[j]( cache[k], settings );

						// If null, then this type can't apply to this column, so
						// rather than testing all cells, break out. There is an
						// exception for the last type which is `html`. We need to
						// scan all rows since it is possible to mix string and HTML
						// types
						if ( ! detectedType && j !== types.length-1 ) {
							break;
						}

						// Only a single match is needed for html type since it is
						// bottom of the pile and very similar to string
						if ( detectedType === 'html' ) {
							break;
						}
					}

					// Type is valid for all data points in the column - use this
					// type
					if ( detectedType ) {
						col.sType = detectedType;
						break;
					}
				}

				// Fall back - if no type was detected, always use string
				if ( ! col.sType ) {
					col.sType = 'string';
				}
			}
		}
	}


	/**
	 * Take the column definitions and static columns arrays and calculate how
	 * they relate to column indexes. The callback function will then apply the
	 * definition found for a column to a suitable configuration object.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {array} aoColDefs The aoColumnDefs array that is to be applied
	 *  @param {array} aoCols The aoColumns array that defines columns individually
	 *  @param {function} fn Callback function - takes two parameters, the calculated
	 *    column index and the definition for that column.
	 *  @memberof DataTable#oApi
	 */
	function _fnApplyColumnDefs( oSettings, aoColDefs, aoCols, fn )
	{
		var i, iLen, j, jLen, k, kLen, def;
		var columns = oSettings.aoColumns;

		// Column definitions with aTargets
		if ( aoColDefs )
		{
			/* Loop over the definitions array - loop in reverse so first instance has priority */
			for ( i=aoColDefs.length-1 ; i>=0 ; i-- )
			{
				def = aoColDefs[i];

				/* Each definition can target multiple columns, as it is an array */
				var aTargets = def.targets !== undefined ?
					def.targets :
					def.aTargets;

				if ( ! $.isArray( aTargets ) )
				{
					aTargets = [ aTargets ];
				}

				for ( j=0, jLen=aTargets.length ; j<jLen ; j++ )
				{
					if ( typeof aTargets[j] === 'number' && aTargets[j] >= 0 )
					{
						/* Add columns that we don't yet know about */
						while( columns.length <= aTargets[j] )
						{
							_fnAddColumn( oSettings );
						}

						/* Integer, basic index */
						fn( aTargets[j], def );
					}
					else if ( typeof aTargets[j] === 'number' && aTargets[j] < 0 )
					{
						/* Negative integer, right to left column counting */
						fn( columns.length+aTargets[j], def );
					}
					else if ( typeof aTargets[j] === 'string' )
					{
						/* Class name matching on TH element */
						for ( k=0, kLen=columns.length ; k<kLen ; k++ )
						{
							if ( aTargets[j] == "_all" ||
							     $(columns[k].nTh).hasClass( aTargets[j] ) )
							{
								fn( k, def );
							}
						}
					}
				}
			}
		}

		// Statically defined columns array
		if ( aoCols )
		{
			for ( i=0, iLen=aoCols.length ; i<iLen ; i++ )
			{
				fn( i, aoCols[i] );
			}
		}
	}

	/**
	 * Add a data array to the table, creating DOM node etc. This is the parallel to
	 * _fnGatherData, but for adding rows from a Javascript source, rather than a
	 * DOM source.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {array} aData data array to be added
	 *  @param {node} [nTr] TR element to add to the table - optional. If not given,
	 *    DataTables will create a row automatically
	 *  @param {array} [anTds] Array of TD|TH elements for the row - must be given
	 *    if nTr is.
	 *  @returns {int} >=0 if successful (index of new aoData entry), -1 if failed
	 *  @memberof DataTable#oApi
	 */
	function _fnAddData ( oSettings, aDataIn, nTr, anTds )
	{
		/* Create the object for storing information about this new row */
		var iRow = oSettings.aoData.length;
		var oData = $.extend( true, {}, DataTable.models.oRow, {
			src: nTr ? 'dom' : 'data',
			idx: iRow
		} );

		oData._aData = aDataIn;
		oSettings.aoData.push( oData );

		/* Create the cells */
		var nTd, sThisType;
		var columns = oSettings.aoColumns;

		// Invalidate the column types as the new data needs to be revalidated
		for ( var i=0, iLen=columns.length ; i<iLen ; i++ )
		{
			columns[i].sType = null;
		}

		/* Add to the display array */
		oSettings.aiDisplayMaster.push( iRow );

		var id = oSettings.rowIdFn( aDataIn );
		if ( id !== undefined ) {
			oSettings.aIds[ id ] = oData;
		}

		/* Create the DOM information, or register it if already present */
		if ( nTr || ! oSettings.oFeatures.bDeferRender )
		{
			_fnCreateTr( oSettings, iRow, nTr, anTds );
		}

		return iRow;
	}


	/**
	 * Add one or more TR elements to the table. Generally we'd expect to
	 * use this for reading data from a DOM sourced table, but it could be
	 * used for an TR element. Note that if a TR is given, it is used (i.e.
	 * it is not cloned).
	 *  @param {object} settings dataTables settings object
	 *  @param {array|node|jQuery} trs The TR element(s) to add to the table
	 *  @returns {array} Array of indexes for the added rows
	 *  @memberof DataTable#oApi
	 */
	function _fnAddTr( settings, trs )
	{
		var row;

		// Allow an individual node to be passed in
		if ( ! (trs instanceof $) ) {
			trs = $(trs);
		}

		return trs.map( function (i, el) {
			row = _fnGetRowElements( settings, el );
			return _fnAddData( settings, row.data, el, row.cells );
		} );
	}


	/**
	 * Take a TR element and convert it to an index in aoData
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} n the TR element to find
	 *  @returns {int} index if the node is found, null if not
	 *  @memberof DataTable#oApi
	 */
	function _fnNodeToDataIndex( oSettings, n )
	{
		return (n._DT_RowIndex!==undefined) ? n._DT_RowIndex : null;
	}


	/**
	 * Take a TD element and convert it into a column data index (not the visible index)
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iRow The row number the TD/TH can be found in
	 *  @param {node} n The TD/TH element to find
	 *  @returns {int} index if the node is found, -1 if not
	 *  @memberof DataTable#oApi
	 */
	function _fnNodeToColumnIndex( oSettings, iRow, n )
	{
		return $.inArray( n, oSettings.aoData[ iRow ].anCells );
	}


	/**
	 * Get the data for a given cell from the internal cache, taking into account data mapping
	 *  @param {object} settings dataTables settings object
	 *  @param {int} rowIdx aoData row id
	 *  @param {int} colIdx Column index
	 *  @param {string} type data get type ('display', 'type' 'filter' 'sort')
	 *  @returns {*} Cell data
	 *  @memberof DataTable#oApi
	 */
	function _fnGetCellData( settings, rowIdx, colIdx, type )
	{
		var draw           = settings.iDraw;
		var col            = settings.aoColumns[colIdx];
		var rowData        = settings.aoData[rowIdx]._aData;
		var defaultContent = col.sDefaultContent;
		var cellData       = col.fnGetData( rowData, type, {
			settings: settings,
			row:      rowIdx,
			col:      colIdx
		} );

		if ( cellData === undefined ) {
			if ( settings.iDrawError != draw && defaultContent === null ) {
				_fnLog( settings, 0, "Requested unknown parameter "+
					(typeof col.mData=='function' ? '{function}' : "'"+col.mData+"'")+
					" for row "+rowIdx+", column "+colIdx, 4 );
				settings.iDrawError = draw;
			}
			return defaultContent;
		}

		// When the data source is null and a specific data type is requested (i.e.
		// not the original data), we can use default column data
		if ( (cellData === rowData || cellData === null) && defaultContent !== null && type !== undefined ) {
			cellData = defaultContent;
		}
		else if ( typeof cellData === 'function' ) {
			// If the data source is a function, then we run it and use the return,
			// executing in the scope of the data object (for instances)
			return cellData.call( rowData );
		}

		if ( cellData === null && type == 'display' ) {
			return '';
		}
		return cellData;
	}


	/**
	 * Set the value for a specific cell, into the internal data cache
	 *  @param {object} settings dataTables settings object
	 *  @param {int} rowIdx aoData row id
	 *  @param {int} colIdx Column index
	 *  @param {*} val Value to set
	 *  @memberof DataTable#oApi
	 */
	function _fnSetCellData( settings, rowIdx, colIdx, val )
	{
		var col     = settings.aoColumns[colIdx];
		var rowData = settings.aoData[rowIdx]._aData;

		col.fnSetData( rowData, val, {
			settings: settings,
			row:      rowIdx,
			col:      colIdx
		}  );
	}


	// Private variable that is used to match action syntax in the data property object
	var __reArray = /\[.*?\]$/;
	var __reFn = /\(\)$/;

	/**
	 * Split string on periods, taking into account escaped periods
	 * @param  {string} str String to split
	 * @return {array} Split string
	 */
	function _fnSplitObjNotation( str )
	{
		return $.map( str.match(/(\\.|[^\.])+/g) || [''], function ( s ) {
			return s.replace(/\\\./g, '.');
		} );
	}


	/**
	 * Return a function that can be used to get data from a source object, taking
	 * into account the ability to use nested objects as a source
	 *  @param {string|int|function} mSource The data source for the object
	 *  @returns {function} Data get function
	 *  @memberof DataTable#oApi
	 */
	function _fnGetObjectDataFn( mSource )
	{
		if ( $.isPlainObject( mSource ) )
		{
			/* Build an object of get functions, and wrap them in a single call */
			var o = {};
			$.each( mSource, function (key, val) {
				if ( val ) {
					o[key] = _fnGetObjectDataFn( val );
				}
			} );

			return function (data, type, row, meta) {
				var t = o[type] || o._;
				return t !== undefined ?
					t(data, type, row, meta) :
					data;
			};
		}
		else if ( mSource === null )
		{
			/* Give an empty string for rendering / sorting etc */
			return function (data) { // type, row and meta also passed, but not used
				return data;
			};
		}
		else if ( typeof mSource === 'function' )
		{
			return function (data, type, row, meta) {
				return mSource( data, type, row, meta );
			};
		}
		else if ( typeof mSource === 'string' && (mSource.indexOf('.') !== -1 ||
			      mSource.indexOf('[') !== -1 || mSource.indexOf('(') !== -1) )
		{
			/* If there is a . in the source string then the data source is in a
			 * nested object so we loop over the data for each level to get the next
			 * level down. On each loop we test for undefined, and if found immediately
			 * return. This allows entire objects to be missing and sDefaultContent to
			 * be used if defined, rather than throwing an error
			 */
			var fetchData = function (data, type, src) {
				var arrayNotation, funcNotation, out, innerSrc;

				if ( src !== "" )
				{
					var a = _fnSplitObjNotation( src );

					for ( var i=0, iLen=a.length ; i<iLen ; i++ )
					{
						// Check if we are dealing with special notation
						arrayNotation = a[i].match(__reArray);
						funcNotation = a[i].match(__reFn);

						if ( arrayNotation )
						{
							// Array notation
							a[i] = a[i].replace(__reArray, '');

							// Condition allows simply [] to be passed in
							if ( a[i] !== "" ) {
								data = data[ a[i] ];
							}
							out = [];

							// Get the remainder of the nested object to get
							a.splice( 0, i+1 );
							innerSrc = a.join('.');

							// Traverse each entry in the array getting the properties requested
							if ( $.isArray( data ) ) {
								for ( var j=0, jLen=data.length ; j<jLen ; j++ ) {
									out.push( fetchData( data[j], type, innerSrc ) );
								}
							}

							// If a string is given in between the array notation indicators, that
							// is used to join the strings together, otherwise an array is returned
							var join = arrayNotation[0].substring(1, arrayNotation[0].length-1);
							data = (join==="") ? out : out.join(join);

							// The inner call to fetchData has already traversed through the remainder
							// of the source requested, so we exit from the loop
							break;
						}
						else if ( funcNotation )
						{
							// Function call
							a[i] = a[i].replace(__reFn, '');
							data = data[ a[i] ]();
							continue;
						}

						if ( data === null || data[ a[i] ] === undefined )
						{
							return undefined;
						}
						data = data[ a[i] ];
					}
				}

				return data;
			};

			return function (data, type) { // row and meta also passed, but not used
				return fetchData( data, type, mSource );
			};
		}
		else
		{
			/* Array or flat object mapping */
			return function (data, type) { // row and meta also passed, but not used
				return data[mSource];
			};
		}
	}


	/**
	 * Return a function that can be used to set data from a source object, taking
	 * into account the ability to use nested objects as a source
	 *  @param {string|int|function} mSource The data source for the object
	 *  @returns {function} Data set function
	 *  @memberof DataTable#oApi
	 */
	function _fnSetObjectDataFn( mSource )
	{
		if ( $.isPlainObject( mSource ) )
		{
			/* Unlike get, only the underscore (global) option is used for for
			 * setting data since we don't know the type here. This is why an object
			 * option is not documented for `mData` (which is read/write), but it is
			 * for `mRender` which is read only.
			 */
			return _fnSetObjectDataFn( mSource._ );
		}
		else if ( mSource === null )
		{
			/* Nothing to do when the data source is null */
			return function () {};
		}
		else if ( typeof mSource === 'function' )
		{
			return function (data, val, meta) {
				mSource( data, 'set', val, meta );
			};
		}
		else if ( typeof mSource === 'string' && (mSource.indexOf('.') !== -1 ||
			      mSource.indexOf('[') !== -1 || mSource.indexOf('(') !== -1) )
		{
			/* Like the get, we need to get data from a nested object */
			var setData = function (data, val, src) {
				var a = _fnSplitObjNotation( src ), b;
				var aLast = a[a.length-1];
				var arrayNotation, funcNotation, o, innerSrc;

				for ( var i=0, iLen=a.length-1 ; i<iLen ; i++ )
				{
					// Check if we are dealing with an array notation request
					arrayNotation = a[i].match(__reArray);
					funcNotation = a[i].match(__reFn);

					if ( arrayNotation )
					{
						a[i] = a[i].replace(__reArray, '');
						data[ a[i] ] = [];

						// Get the remainder of the nested object to set so we can recurse
						b = a.slice();
						b.splice( 0, i+1 );
						innerSrc = b.join('.');

						// Traverse each entry in the array setting the properties requested
						if ( $.isArray( val ) )
						{
							for ( var j=0, jLen=val.length ; j<jLen ; j++ )
							{
								o = {};
								setData( o, val[j], innerSrc );
								data[ a[i] ].push( o );
							}
						}
						else
						{
							// We've been asked to save data to an array, but it
							// isn't array data to be saved. Best that can be done
							// is to just save the value.
							data[ a[i] ] = val;
						}

						// The inner call to setData has already traversed through the remainder
						// of the source and has set the data, thus we can exit here
						return;
					}
					else if ( funcNotation )
					{
						// Function call
						a[i] = a[i].replace(__reFn, '');
						data = data[ a[i] ]( val );
					}

					// If the nested object doesn't currently exist - since we are
					// trying to set the value - create it
					if ( data[ a[i] ] === null || data[ a[i] ] === undefined )
					{
						data[ a[i] ] = {};
					}
					data = data[ a[i] ];
				}

				// Last item in the input - i.e, the actual set
				if ( aLast.match(__reFn ) )
				{
					// Function call
					data = data[ aLast.replace(__reFn, '') ]( val );
				}
				else
				{
					// If array notation is used, we just want to strip it and use the property name
					// and assign the value. If it isn't used, then we get the result we want anyway
					data[ aLast.replace(__reArray, '') ] = val;
				}
			};

			return function (data, val) { // meta is also passed in, but not used
				return setData( data, val, mSource );
			};
		}
		else
		{
			/* Array or flat object mapping */
			return function (data, val) { // meta is also passed in, but not used
				data[mSource] = val;
			};
		}
	}


	/**
	 * Return an array with the full table data
	 *  @param {object} oSettings dataTables settings object
	 *  @returns array {array} aData Master data array
	 *  @memberof DataTable#oApi
	 */
	function _fnGetDataMaster ( settings )
	{
		return _pluck( settings.aoData, '_aData' );
	}


	/**
	 * Nuke the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnClearTable( settings )
	{
		settings.aoData.length = 0;
		settings.aiDisplayMaster.length = 0;
		settings.aiDisplay.length = 0;
		settings.aIds = {};
	}


	 /**
	 * Take an array of integers (index array) and remove a target integer (value - not
	 * the key!)
	 *  @param {array} a Index array to target
	 *  @param {int} iTarget value to find
	 *  @memberof DataTable#oApi
	 */
	function _fnDeleteIndex( a, iTarget, splice )
	{
		var iTargetIndex = -1;

		for ( var i=0, iLen=a.length ; i<iLen ; i++ )
		{
			if ( a[i] == iTarget )
			{
				iTargetIndex = i;
			}
			else if ( a[i] > iTarget )
			{
				a[i]--;
			}
		}

		if ( iTargetIndex != -1 && splice === undefined )
		{
			a.splice( iTargetIndex, 1 );
		}
	}


	/**
	 * Mark cached data as invalid such that a re-read of the data will occur when
	 * the cached data is next requested. Also update from the data source object.
	 *
	 * @param {object} settings DataTables settings object
	 * @param {int}    rowIdx   Row index to invalidate
	 * @param {string} [src]    Source to invalidate from: undefined, 'auto', 'dom'
	 *     or 'data'
	 * @param {int}    [colIdx] Column index to invalidate. If undefined the whole
	 *     row will be invalidated
	 * @memberof DataTable#oApi
	 *
	 * @todo For the modularisation of v1.11 this will need to become a callback, so
	 *   the sort and filter methods can subscribe to it. That will required
	 *   initialisation options for sorting, which is why it is not already baked in
	 */
	function _fnInvalidate( settings, rowIdx, src, colIdx )
	{
		var row = settings.aoData[ rowIdx ];
		var i, ien;
		var cellWrite = function ( cell, col ) {
			// This is very frustrating, but in IE if you just write directly
			// to innerHTML, and elements that are overwritten are GC'ed,
			// even if there is a reference to them elsewhere
			while ( cell.childNodes.length ) {
				cell.removeChild( cell.firstChild );
			}

			cell.innerHTML = _fnGetCellData( settings, rowIdx, col, 'display' );
		};

		// Are we reading last data from DOM or the data object?
		if ( src === 'dom' || ((! src || src === 'auto') && row.src === 'dom') ) {
			// Read the data from the DOM
			row._aData = _fnGetRowElements(
					settings, row, colIdx, colIdx === undefined ? undefined : row._aData
				)
				.data;
		}
		else {
			// Reading from data object, update the DOM
			var cells = row.anCells;

			if ( cells ) {
				if ( colIdx !== undefined ) {
					cellWrite( cells[colIdx], colIdx );
				}
				else {
					for ( i=0, ien=cells.length ; i<ien ; i++ ) {
						cellWrite( cells[i], i );
					}
				}
			}
		}

		// For both row and cell invalidation, the cached data for sorting and
		// filtering is nulled out
		row._aSortData = null;
		row._aFilterData = null;

		// Invalidate the type for a specific column (if given) or all columns since
		// the data might have changed
		var cols = settings.aoColumns;
		if ( colIdx !== undefined ) {
			cols[ colIdx ].sType = null;
		}
		else {
			for ( i=0, ien=cols.length ; i<ien ; i++ ) {
				cols[i].sType = null;
			}

			// Update DataTables special `DT_*` attributes for the row
			_fnRowAttributes( settings, row );
		}
	}


	/**
	 * Build a data source object from an HTML row, reading the contents of the
	 * cells that are in the row.
	 *
	 * @param {object} settings DataTables settings object
	 * @param {node|object} TR element from which to read data or existing row
	 *   object from which to re-read the data from the cells
	 * @param {int} [colIdx] Optional column index
	 * @param {array|object} [d] Data source object. If `colIdx` is given then this
	 *   parameter should also be given and will be used to write the data into.
	 *   Only the column in question will be written
	 * @returns {object} Object with two parameters: `data` the data read, in
	 *   document order, and `cells` and array of nodes (they can be useful to the
	 *   caller, so rather than needing a second traversal to get them, just return
	 *   them from here).
	 * @memberof DataTable#oApi
	 */
	function _fnGetRowElements( settings, row, colIdx, d )
	{
		var
			tds = [],
			td = row.firstChild,
			name, col, o, i=0, contents,
			columns = settings.aoColumns,
			objectRead = settings._rowReadObject;

		// Allow the data object to be passed in, or construct
		d = d !== undefined ?
			d :
			objectRead ?
				{} :
				[];

		var attr = function ( str, td  ) {
			if ( typeof str === 'string' ) {
				var idx = str.indexOf('@');

				if ( idx !== -1 ) {
					var attr = str.substring( idx+1 );
					var setter = _fnSetObjectDataFn( str );
					setter( d, td.getAttribute( attr ) );
				}
			}
		};

		// Read data from a cell and store into the data object
		var cellProcess = function ( cell ) {
			if ( colIdx === undefined || colIdx === i ) {
				col = columns[i];
				contents = $.trim(cell.innerHTML);

				if ( col && col._bAttrSrc ) {
					var setter = _fnSetObjectDataFn( col.mData._ );
					setter( d, contents );

					attr( col.mData.sort, cell );
					attr( col.mData.type, cell );
					attr( col.mData.filter, cell );
				}
				else {
					// Depending on the `data` option for the columns the data can
					// be read to either an object or an array.
					if ( objectRead ) {
						if ( ! col._setter ) {
							// Cache the setter function
							col._setter = _fnSetObjectDataFn( col.mData );
						}
						col._setter( d, contents );
					}
					else {
						d[i] = contents;
					}
				}
			}

			i++;
		};

		if ( td ) {
			// `tr` element was passed in
			while ( td ) {
				name = td.nodeName.toUpperCase();

				if ( name == "TD" || name == "TH" ) {
					cellProcess( td );
					tds.push( td );
				}

				td = td.nextSibling;
			}
		}
		else {
			// Existing row object passed in
			tds = row.anCells;

			for ( var j=0, jen=tds.length ; j<jen ; j++ ) {
				cellProcess( tds[j] );
			}
		}

		// Read the ID from the DOM if present
		var rowNode = row.firstChild ? row : row.nTr;

		if ( rowNode ) {
			var id = rowNode.getAttribute( 'id' );

			if ( id ) {
				_fnSetObjectDataFn( settings.rowId )( d, id );
			}
		}

		return {
			data: d,
			cells: tds
		};
	}
	/**
	 * Create a new TR element (and it's TD children) for a row
	 *  @param {object} oSettings dataTables settings object
	 *  @param {int} iRow Row to consider
	 *  @param {node} [nTrIn] TR element to add to the table - optional. If not given,
	 *    DataTables will create a row automatically
	 *  @param {array} [anTds] Array of TD|TH elements for the row - must be given
	 *    if nTr is.
	 *  @memberof DataTable#oApi
	 */
	function _fnCreateTr ( oSettings, iRow, nTrIn, anTds )
	{
		var
			row = oSettings.aoData[iRow],
			rowData = row._aData,
			cells = [],
			nTr, nTd, oCol,
			i, iLen;

		if ( row.nTr === null )
		{
			nTr = nTrIn || document.createElement('tr');

			row.nTr = nTr;
			row.anCells = cells;

			/* Use a private property on the node to allow reserve mapping from the node
			 * to the aoData array for fast look up
			 */
			nTr._DT_RowIndex = iRow;

			/* Special parameters can be given by the data source to be used on the row */
			_fnRowAttributes( oSettings, row );

			/* Process each column */
			for ( i=0, iLen=oSettings.aoColumns.length ; i<iLen ; i++ )
			{
				oCol = oSettings.aoColumns[i];

				nTd = nTrIn ? anTds[i] : document.createElement( oCol.sCellType );
				nTd._DT_CellIndex = {
					row: iRow,
					column: i
				};

				cells.push( nTd );

				// Need to create the HTML if new, or if a rendering function is defined
				if ( (!nTrIn || oCol.mRender || oCol.mData !== i) &&
					 (!$.isPlainObject(oCol.mData) || oCol.mData._ !== i+'.display')
				) {
					nTd.innerHTML = _fnGetCellData( oSettings, iRow, i, 'display' );
				}

				/* Add user defined class */
				if ( oCol.sClass )
				{
					nTd.className += ' '+oCol.sClass;
				}

				// Visibility - add or remove as required
				if ( oCol.bVisible && ! nTrIn )
				{
					nTr.appendChild( nTd );
				}
				else if ( ! oCol.bVisible && nTrIn )
				{
					nTd.parentNode.removeChild( nTd );
				}

				if ( oCol.fnCreatedCell )
				{
					oCol.fnCreatedCell.call( oSettings.oInstance,
						nTd, _fnGetCellData( oSettings, iRow, i ), rowData, iRow, i
					);
				}
			}

			_fnCallbackFire( oSettings, 'aoRowCreatedCallback', null, [nTr, rowData, iRow, cells] );
		}

		// Remove once webkit bug 131819 and Chromium bug 365619 have been resolved
		// and deployed
		row.nTr.setAttribute( 'role', 'row' );
	}


	/**
	 * Add attributes to a row based on the special `DT_*` parameters in a data
	 * source object.
	 *  @param {object} settings DataTables settings object
	 *  @param {object} DataTables row object for the row to be modified
	 *  @memberof DataTable#oApi
	 */
	function _fnRowAttributes( settings, row )
	{
		var tr = row.nTr;
		var data = row._aData;

		if ( tr ) {
			var id = settings.rowIdFn( data );

			if ( id ) {
				tr.id = id;
			}

			if ( data.DT_RowClass ) {
				// Remove any classes added by DT_RowClass before
				var a = data.DT_RowClass.split(' ');
				row.__rowc = row.__rowc ?
					_unique( row.__rowc.concat( a ) ) :
					a;

				$(tr)
					.removeClass( row.__rowc.join(' ') )
					.addClass( data.DT_RowClass );
			}

			if ( data.DT_RowAttr ) {
				$(tr).attr( data.DT_RowAttr );
			}

			if ( data.DT_RowData ) {
				$(tr).data( data.DT_RowData );
			}
		}
	}


	/**
	 * Create the HTML header for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnBuildHead( oSettings )
	{
		var i, ien, cell, row, column;
		var thead = oSettings.nTHead;
		var tfoot = oSettings.nTFoot;
		var createHeader = $('th, td', thead).length === 0;
		var classes = oSettings.oClasses;
		var columns = oSettings.aoColumns;

		if ( createHeader ) {
			row = $('<tr/>').appendTo( thead );
		}

		for ( i=0, ien=columns.length ; i<ien ; i++ ) {
			column = columns[i];
			cell = $( column.nTh ).addClass( column.sClass );

			if ( createHeader ) {
				cell.appendTo( row );
			}

			// 1.11 move into sorting
			if ( oSettings.oFeatures.bSort ) {
				cell.addClass( column.sSortingClass );

				if ( column.bSortable !== false ) {
					cell
						.attr( 'tabindex', oSettings.iTabIndex )
						.attr( 'aria-controls', oSettings.sTableId );

					_fnSortAttachListener( oSettings, column.nTh, i );
				}
			}

			if ( column.sTitle != cell[0].innerHTML ) {
				cell.html( column.sTitle );
			}

			_fnRenderer( oSettings, 'header' )(
				oSettings, cell, column, classes
			);
		}

		if ( createHeader ) {
			_fnDetectHeader( oSettings.aoHeader, thead );
		}

		/* ARIA role for the rows */
	 	$(thead).find('>tr').attr('role', 'row');

		/* Deal with the footer - add classes if required */
		$(thead).find('>tr>th, >tr>td').addClass( classes.sHeaderTH );
		$(tfoot).find('>tr>th, >tr>td').addClass( classes.sFooterTH );

		// Cache the footer cells. Note that we only take the cells from the first
		// row in the footer. If there is more than one row the user wants to
		// interact with, they need to use the table().foot() method. Note also this
		// allows cells to be used for multiple columns using colspan
		if ( tfoot !== null ) {
			var cells = oSettings.aoFooter[0];

			for ( i=0, ien=cells.length ; i<ien ; i++ ) {
				column = columns[i];
				column.nTf = cells[i].cell;

				if ( column.sClass ) {
					$(column.nTf).addClass( column.sClass );
				}
			}
		}
	}


	/**
	 * Draw the header (or footer) element based on the column visibility states. The
	 * methodology here is to use the layout array from _fnDetectHeader, modified for
	 * the instantaneous column visibility, to construct the new layout. The grid is
	 * traversed over cell at a time in a rows x columns grid fashion, although each
	 * cell insert can cover multiple elements in the grid - which is tracks using the
	 * aApplied array. Cell inserts in the grid will only occur where there isn't
	 * already a cell in that position.
	 *  @param {object} oSettings dataTables settings object
	 *  @param array {objects} aoSource Layout array from _fnDetectHeader
	 *  @param {boolean} [bIncludeHidden=false] If true then include the hidden columns in the calc,
	 *  @memberof DataTable#oApi
	 */
	function _fnDrawHead( oSettings, aoSource, bIncludeHidden )
	{
		var i, iLen, j, jLen, k, kLen, n, nLocalTr;
		var aoLocal = [];
		var aApplied = [];
		var iColumns = oSettings.aoColumns.length;
		var iRowspan, iColspan;

		if ( ! aoSource )
		{
			return;
		}

		if (  bIncludeHidden === undefined )
		{
			bIncludeHidden = false;
		}

		/* Make a copy of the master layout array, but without the visible columns in it */
		for ( i=0, iLen=aoSource.length ; i<iLen ; i++ )
		{
			aoLocal[i] = aoSource[i].slice();
			aoLocal[i].nTr = aoSource[i].nTr;

			/* Remove any columns which are currently hidden */
			for ( j=iColumns-1 ; j>=0 ; j-- )
			{
				if ( !oSettings.aoColumns[j].bVisible && !bIncludeHidden )
				{
					aoLocal[i].splice( j, 1 );
				}
			}

			/* Prep the applied array - it needs an element for each row */
			aApplied.push( [] );
		}

		for ( i=0, iLen=aoLocal.length ; i<iLen ; i++ )
		{
			nLocalTr = aoLocal[i].nTr;

			/* All cells are going to be replaced, so empty out the row */
			if ( nLocalTr )
			{
				while( (n = nLocalTr.firstChild) )
				{
					nLocalTr.removeChild( n );
				}
			}

			for ( j=0, jLen=aoLocal[i].length ; j<jLen ; j++ )
			{
				iRowspan = 1;
				iColspan = 1;

				/* Check to see if there is already a cell (row/colspan) covering our target
				 * insert point. If there is, then there is nothing to do.
				 */
				if ( aApplied[i][j] === undefined )
				{
					nLocalTr.appendChild( aoLocal[i][j].cell );
					aApplied[i][j] = 1;

					/* Expand the cell to cover as many rows as needed */
					while ( aoLocal[i+iRowspan] !== undefined &&
					        aoLocal[i][j].cell == aoLocal[i+iRowspan][j].cell )
					{
						aApplied[i+iRowspan][j] = 1;
						iRowspan++;
					}

					/* Expand the cell to cover as many columns as needed */
					while ( aoLocal[i][j+iColspan] !== undefined &&
					        aoLocal[i][j].cell == aoLocal[i][j+iColspan].cell )
					{
						/* Must update the applied array over the rows for the columns */
						for ( k=0 ; k<iRowspan ; k++ )
						{
							aApplied[i+k][j+iColspan] = 1;
						}
						iColspan++;
					}

					/* Do the actual expansion in the DOM */
					$(aoLocal[i][j].cell)
						.attr('rowspan', iRowspan)
						.attr('colspan', iColspan);
				}
			}
		}
	}


	/**
	 * Insert the required TR nodes into the table for display
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnDraw( oSettings )
	{
		/* Provide a pre-callback function which can be used to cancel the draw is false is returned */
		var aPreDraw = _fnCallbackFire( oSettings, 'aoPreDrawCallback', 'preDraw', [oSettings] );
		if ( $.inArray( false, aPreDraw ) !== -1 )
		{
			_fnProcessingDisplay( oSettings, false );
			return;
		}

		var i, iLen, n;
		var anRows = [];
		var iRowCount = 0;
		var asStripeClasses = oSettings.asStripeClasses;
		var iStripes = asStripeClasses.length;
		var iOpenRows = oSettings.aoOpenRows.length;
		var oLang = oSettings.oLanguage;
		var iInitDisplayStart = oSettings.iInitDisplayStart;
		var bServerSide = _fnDataSource( oSettings ) == 'ssp';
		var aiDisplay = oSettings.aiDisplay;

		oSettings.bDrawing = true;

		/* Check and see if we have an initial draw position from state saving */
		if ( iInitDisplayStart !== undefined && iInitDisplayStart !== -1 )
		{
			oSettings._iDisplayStart = bServerSide ?
				iInitDisplayStart :
				iInitDisplayStart >= oSettings.fnRecordsDisplay() ?
					0 :
					iInitDisplayStart;

			oSettings.iInitDisplayStart = -1;
		}

		var iDisplayStart = oSettings._iDisplayStart;
		var iDisplayEnd = oSettings.fnDisplayEnd();

		/* Server-side processing draw intercept */
		if ( oSettings.bDeferLoading )
		{
			oSettings.bDeferLoading = false;
			oSettings.iDraw++;
			_fnProcessingDisplay( oSettings, false );
		}
		else if ( !bServerSide )
		{
			oSettings.iDraw++;
		}
		else if ( !oSettings.bDestroying && !_fnAjaxUpdate( oSettings ) )
		{
			return;
		}

		if ( aiDisplay.length !== 0 )
		{
			var iStart = bServerSide ? 0 : iDisplayStart;
			var iEnd = bServerSide ? oSettings.aoData.length : iDisplayEnd;

			for ( var j=iStart ; j<iEnd ; j++ )
			{
				var iDataIndex = aiDisplay[j];
				var aoData = oSettings.aoData[ iDataIndex ];
				if ( aoData.nTr === null )
				{
					_fnCreateTr( oSettings, iDataIndex );
				}

				var nRow = aoData.nTr;

				/* Remove the old striping classes and then add the new one */
				if ( iStripes !== 0 )
				{
					var sStripe = asStripeClasses[ iRowCount % iStripes ];
					if ( aoData._sRowStripe != sStripe )
					{
						$(nRow).removeClass( aoData._sRowStripe ).addClass( sStripe );
						aoData._sRowStripe = sStripe;
					}
				}

				// Row callback functions - might want to manipulate the row
				// iRowCount and j are not currently documented. Are they at all
				// useful?
				_fnCallbackFire( oSettings, 'aoRowCallback', null,
					[nRow, aoData._aData, iRowCount, j, iDataIndex] );

				anRows.push( nRow );
				iRowCount++;
			}
		}
		else
		{
			/* Table is empty - create a row with an empty message in it */
			var sZero = oLang.sZeroRecords;
			if ( oSettings.iDraw == 1 &&  _fnDataSource( oSettings ) == 'ajax' )
			{
				sZero = oLang.sLoadingRecords;
			}
			else if ( oLang.sEmptyTable && oSettings.fnRecordsTotal() === 0 )
			{
				sZero = oLang.sEmptyTable;
			}

			anRows[ 0 ] = $( '<tr/>', { 'class': iStripes ? asStripeClasses[0] : '' } )
				.append( $('<td />', {
					'valign':  'top',
					'colSpan': _fnVisbleColumns( oSettings ),
					'class':   oSettings.oClasses.sRowEmpty
				} ).html( sZero ) )[0];
		}

		/* Header and footer callbacks */
		_fnCallbackFire( oSettings, 'aoHeaderCallback', 'header', [ $(oSettings.nTHead).children('tr')[0],
			_fnGetDataMaster( oSettings ), iDisplayStart, iDisplayEnd, aiDisplay ] );

		_fnCallbackFire( oSettings, 'aoFooterCallback', 'footer', [ $(oSettings.nTFoot).children('tr')[0],
			_fnGetDataMaster( oSettings ), iDisplayStart, iDisplayEnd, aiDisplay ] );

		var body = $(oSettings.nTBody);

		body.children().detach();
		body.append( $(anRows) );

		/* Call all required callback functions for the end of a draw */
		_fnCallbackFire( oSettings, 'aoDrawCallback', 'draw', [oSettings] );

		/* Draw is complete, sorting and filtering must be as well */
		oSettings.bSorted = false;
		oSettings.bFiltered = false;
		oSettings.bDrawing = false;
	}


	/**
	 * Redraw the table - taking account of the various features which are enabled
	 *  @param {object} oSettings dataTables settings object
	 *  @param {boolean} [holdPosition] Keep the current paging position. By default
	 *    the paging is reset to the first page
	 *  @memberof DataTable#oApi
	 */
	function _fnReDraw( settings, holdPosition )
	{
		var
			features = settings.oFeatures,
			sort     = features.bSort,
			filter   = features.bFilter;

		if ( sort ) {
			_fnSort( settings );
		}

		if ( filter ) {
			_fnFilterComplete( settings, settings.oPreviousSearch );
		}
		else {
			// No filtering, so we want to just use the display master
			settings.aiDisplay = settings.aiDisplayMaster.slice();
		}

		if ( holdPosition !== true ) {
			settings._iDisplayStart = 0;
		}

		// Let any modules know about the draw hold position state (used by
		// scrolling internally)
		settings._drawHold = holdPosition;

		_fnDraw( settings );

		settings._drawHold = false;
	}


	/**
	 * Add the options to the page HTML for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnAddOptionsHtml ( oSettings )
	{
		var classes = oSettings.oClasses;
		var table = $(oSettings.nTable);
		var holding = $('<div/>').insertBefore( table ); // Holding element for speed
		var features = oSettings.oFeatures;

		// All DataTables are wrapped in a div
		var insert = $('<div/>', {
			id:      oSettings.sTableId+'_wrapper',
			'class': classes.sWrapper + (oSettings.nTFoot ? '' : ' '+classes.sNoFooter)
		} );

		oSettings.nHolding = holding[0];
		oSettings.nTableWrapper = insert[0];
		oSettings.nTableReinsertBefore = oSettings.nTable.nextSibling;

		/* Loop over the user set positioning and place the elements as needed */
		var aDom = oSettings.sDom.split('');
		var featureNode, cOption, nNewNode, cNext, sAttr, j;
		for ( var i=0 ; i<aDom.length ; i++ )
		{
			featureNode = null;
			cOption = aDom[i];

			if ( cOption == '<' )
			{
				/* New container div */
				nNewNode = $('<div/>')[0];

				/* Check to see if we should append an id and/or a class name to the container */
				cNext = aDom[i+1];
				if ( cNext == "'" || cNext == '"' )
				{
					sAttr = "";
					j = 2;
					while ( aDom[i+j] != cNext )
					{
						sAttr += aDom[i+j];
						j++;
					}

					/* Replace jQuery UI constants @todo depreciated */
					if ( sAttr == "H" )
					{
						sAttr = classes.sJUIHeader;
					}
					else if ( sAttr == "F" )
					{
						sAttr = classes.sJUIFooter;
					}

					/* The attribute can be in the format of "#id.class", "#id" or "class" This logic
					 * breaks the string into parts and applies them as needed
					 */
					if ( sAttr.indexOf('.') != -1 )
					{
						var aSplit = sAttr.split('.');
						nNewNode.id = aSplit[0].substr(1, aSplit[0].length-1);
						nNewNode.className = aSplit[1];
					}
					else if ( sAttr.charAt(0) == "#" )
					{
						nNewNode.id = sAttr.substr(1, sAttr.length-1);
					}
					else
					{
						nNewNode.className = sAttr;
					}

					i += j; /* Move along the position array */
				}

				insert.append( nNewNode );
				insert = $(nNewNode);
			}
			else if ( cOption == '>' )
			{
				/* End container div */
				insert = insert.parent();
			}
			// @todo Move options into their own plugins?
			else if ( cOption == 'l' && features.bPaginate && features.bLengthChange )
			{
				/* Length */
				featureNode = _fnFeatureHtmlLength( oSettings );
			}
			else if ( cOption == 'f' && features.bFilter )
			{
				/* Filter */
				featureNode = _fnFeatureHtmlFilter( oSettings );
			}
			else if ( cOption == 'r' && features.bProcessing )
			{
				/* pRocessing */
				featureNode = _fnFeatureHtmlProcessing( oSettings );
			}
			else if ( cOption == 't' )
			{
				/* Table */
				featureNode = _fnFeatureHtmlTable( oSettings );
			}
			else if ( cOption ==  'i' && features.bInfo )
			{
				/* Info */
				featureNode = _fnFeatureHtmlInfo( oSettings );
			}
			else if ( cOption == 'p' && features.bPaginate )
			{
				/* Pagination */
				featureNode = _fnFeatureHtmlPaginate( oSettings );
			}
			else if ( DataTable.ext.feature.length !== 0 )
			{
				/* Plug-in features */
				var aoFeatures = DataTable.ext.feature;
				for ( var k=0, kLen=aoFeatures.length ; k<kLen ; k++ )
				{
					if ( cOption == aoFeatures[k].cFeature )
					{
						featureNode = aoFeatures[k].fnInit( oSettings );
						break;
					}
				}
			}

			/* Add to the 2D features array */
			if ( featureNode )
			{
				var aanFeatures = oSettings.aanFeatures;

				if ( ! aanFeatures[cOption] )
				{
					aanFeatures[cOption] = [];
				}

				aanFeatures[cOption].push( featureNode );
				insert.append( featureNode );
			}
		}

		/* Built our DOM structure - replace the holding div with what we want */
		holding.replaceWith( insert );
		oSettings.nHolding = null;
	}


	/**
	 * Use the DOM source to create up an array of header cells. The idea here is to
	 * create a layout grid (array) of rows x columns, which contains a reference
	 * to the cell that that point in the grid (regardless of col/rowspan), such that
	 * any column / row could be removed and the new grid constructed
	 *  @param array {object} aLayout Array to store the calculated layout in
	 *  @param {node} nThead The header/footer element for the table
	 *  @memberof DataTable#oApi
	 */
	function _fnDetectHeader ( aLayout, nThead )
	{
		var nTrs = $(nThead).children('tr');
		var nTr, nCell;
		var i, k, l, iLen, jLen, iColShifted, iColumn, iColspan, iRowspan;
		var bUnique;
		var fnShiftCol = function ( a, i, j ) {
			var k = a[i];
	                while ( k[j] ) {
				j++;
			}
			return j;
		};

		aLayout.splice( 0, aLayout.length );

		/* We know how many rows there are in the layout - so prep it */
		for ( i=0, iLen=nTrs.length ; i<iLen ; i++ )
		{
			aLayout.push( [] );
		}

		/* Calculate a layout array */
		for ( i=0, iLen=nTrs.length ; i<iLen ; i++ )
		{
			nTr = nTrs[i];
			iColumn = 0;

			/* For every cell in the row... */
			nCell = nTr.firstChild;
			while ( nCell ) {
				if ( nCell.nodeName.toUpperCase() == "TD" ||
				     nCell.nodeName.toUpperCase() == "TH" )
				{
					/* Get the col and rowspan attributes from the DOM and sanitise them */
					iColspan = nCell.getAttribute('colspan') * 1;
					iRowspan = nCell.getAttribute('rowspan') * 1;
					iColspan = (!iColspan || iColspan===0 || iColspan===1) ? 1 : iColspan;
					iRowspan = (!iRowspan || iRowspan===0 || iRowspan===1) ? 1 : iRowspan;

					/* There might be colspan cells already in this row, so shift our target
					 * accordingly
					 */
					iColShifted = fnShiftCol( aLayout, i, iColumn );

					/* Cache calculation for unique columns */
					bUnique = iColspan === 1 ? true : false;

					/* If there is col / rowspan, copy the information into the layout grid */
					for ( l=0 ; l<iColspan ; l++ )
					{
						for ( k=0 ; k<iRowspan ; k++ )
						{
							aLayout[i+k][iColShifted+l] = {
								"cell": nCell,
								"unique": bUnique
							};
							aLayout[i+k].nTr = nTr;
						}
					}
				}
				nCell = nCell.nextSibling;
			}
		}
	}


	/**
	 * Get an array of unique th elements, one for each column
	 *  @param {object} oSettings dataTables settings object
	 *  @param {node} nHeader automatically detect the layout from this node - optional
	 *  @param {array} aLayout thead/tfoot layout from _fnDetectHeader - optional
	 *  @returns array {node} aReturn list of unique th's
	 *  @memberof DataTable#oApi
	 */
	function _fnGetUniqueThs ( oSettings, nHeader, aLayout )
	{
		var aReturn = [];
		if ( !aLayout )
		{
			aLayout = oSettings.aoHeader;
			if ( nHeader )
			{
				aLayout = [];
				_fnDetectHeader( aLayout, nHeader );
			}
		}

		for ( var i=0, iLen=aLayout.length ; i<iLen ; i++ )
		{
			for ( var j=0, jLen=aLayout[i].length ; j<jLen ; j++ )
			{
				if ( aLayout[i][j].unique &&
					 (!aReturn[j] || !oSettings.bSortCellsTop) )
				{
					aReturn[j] = aLayout[i][j].cell;
				}
			}
		}

		return aReturn;
	}

	/**
	 * Create an Ajax call based on the table's settings, taking into account that
	 * parameters can have multiple forms, and backwards compatibility.
	 *
	 * @param {object} oSettings dataTables settings object
	 * @param {array} data Data to send to the server, required by
	 *     DataTables - may be augmented by developer callbacks
	 * @param {function} fn Callback function to run when data is obtained
	 */
	function _fnBuildAjax( oSettings, data, fn )
	{
		// Compatibility with 1.9-, allow fnServerData and event to manipulate
		_fnCallbackFire( oSettings, 'aoServerParams', 'serverParams', [data] );

		// Convert to object based for 1.10+ if using the old array scheme which can
		// come from server-side processing or serverParams
		if ( data && $.isArray(data) ) {
			var tmp = {};
			var rbracket = /(.*?)\[\]$/;

			$.each( data, function (key, val) {
				var match = val.name.match(rbracket);

				if ( match ) {
					// Support for arrays
					var name = match[0];

					if ( ! tmp[ name ] ) {
						tmp[ name ] = [];
					}
					tmp[ name ].push( val.value );
				}
				else {
					tmp[val.name] = val.value;
				}
			} );
			data = tmp;
		}

		var ajaxData;
		var ajax = oSettings.ajax;
		var instance = oSettings.oInstance;
		var callback = function ( json ) {
			_fnCallbackFire( oSettings, null, 'xhr', [oSettings, json, oSettings.jqXHR] );
			fn( json );
		};

		if ( $.isPlainObject( ajax ) && ajax.data )
		{
			ajaxData = ajax.data;

			var newData = typeof ajaxData === 'function' ?
				ajaxData( data, oSettings ) :  // fn can manipulate data or return
				ajaxData;                      // an object object or array to merge

			// If the function returned something, use that alone
			data = typeof ajaxData === 'function' && newData ?
				newData :
				$.extend( true, data, newData );

			// Remove the data property as we've resolved it already and don't want
			// jQuery to do it again (it is restored at the end of the function)
			delete ajax.data;
		}

		var baseAjax = {
			"data": data,
			"success": function (json) {
				var error = json.error || json.sError;
				if ( error ) {
					_fnLog( oSettings, 0, error );
				}

				oSettings.json = json;
				callback( json );
			},
			"dataType": "json",
			"cache": false,
			"type": oSettings.sServerMethod,
			"error": function (xhr, error, thrown) {
				var ret = _fnCallbackFire( oSettings, null, 'xhr', [oSettings, null, oSettings.jqXHR] );

				if ( $.inArray( true, ret ) === -1 ) {
					if ( error == "parsererror" ) {
						_fnLog( oSettings, 0, 'Invalid JSON response', 1 );
					}
					else if ( xhr.readyState === 4 ) {
						_fnLog( oSettings, 0, 'Ajax error', 7 );
					}
				}

				_fnProcessingDisplay( oSettings, false );
			}
		};

		// Store the data submitted for the API
		oSettings.oAjaxData = data;

		// Allow plug-ins and external processes to modify the data
		_fnCallbackFire( oSettings, null, 'preXhr', [oSettings, data] );

		if ( oSettings.fnServerData )
		{
			// DataTables 1.9- compatibility
			oSettings.fnServerData.call( instance,
				oSettings.sAjaxSource,
				$.map( data, function (val, key) { // Need to convert back to 1.9 trad format
					return { name: key, value: val };
				} ),
				callback,
				oSettings
			);
		}
		else if ( oSettings.sAjaxSource || typeof ajax === 'string' )
		{
			// DataTables 1.9- compatibility
			oSettings.jqXHR = $.ajax( $.extend( baseAjax, {
				url: ajax || oSettings.sAjaxSource
			} ) );
		}
		else if ( typeof ajax === 'function' )
		{
			// Is a function - let the caller define what needs to be done
			oSettings.jqXHR = ajax.call( instance, data, callback, oSettings );
		}
		else
		{
			// Object to extend the base settings
			oSettings.jqXHR = $.ajax( $.extend( baseAjax, ajax ) );

			// Restore for next time around
			ajax.data = ajaxData;
		}
	}


	/**
	 * Update the table using an Ajax call
	 *  @param {object} settings dataTables settings object
	 *  @returns {boolean} Block the table drawing or not
	 *  @memberof DataTable#oApi
	 */
	function _fnAjaxUpdate( settings )
	{
		if ( settings.bAjaxDataGet ) {
			settings.iDraw++;
			_fnProcessingDisplay( settings, true );

			_fnBuildAjax(
				settings,
				_fnAjaxParameters( settings ),
				function(json) {
					_fnAjaxUpdateDraw( settings, json );
				}
			);

			return false;
		}
		return true;
	}


	/**
	 * Build up the parameters in an object needed for a server-side processing
	 * request. Note that this is basically done twice, is different ways - a modern
	 * method which is used by default in DataTables 1.10 which uses objects and
	 * arrays, or the 1.9- method with is name / value pairs. 1.9 method is used if
	 * the sAjaxSource option is used in the initialisation, or the legacyAjax
	 * option is set.
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {bool} block the table drawing or not
	 *  @memberof DataTable#oApi
	 */
	function _fnAjaxParameters( settings )
	{
		var
			columns = settings.aoColumns,
			columnCount = columns.length,
			features = settings.oFeatures,
			preSearch = settings.oPreviousSearch,
			preColSearch = settings.aoPreSearchCols,
			i, data = [], dataProp, column, columnSearch,
			sort = _fnSortFlatten( settings ),
			displayStart = settings._iDisplayStart,
			displayLength = features.bPaginate !== false ?
				settings._iDisplayLength :
				-1;

		var param = function ( name, value ) {
			data.push( { 'name': name, 'value': value } );
		};

		// DataTables 1.9- compatible method
		param( 'sEcho',          settings.iDraw );
		param( 'iColumns',       columnCount );
		param( 'sColumns',       _pluck( columns, 'sName' ).join(',') );
		param( 'iDisplayStart',  displayStart );
		param( 'iDisplayLength', displayLength );

		// DataTables 1.10+ method
		var d = {
			draw:    settings.iDraw,
			columns: [],
			order:   [],
			start:   displayStart,
			length:  displayLength,
			search:  {
				value: preSearch.sSearch,
				regex: preSearch.bRegex
			}
		};

		for ( i=0 ; i<columnCount ; i++ ) {
			column = columns[i];
			columnSearch = preColSearch[i];
			dataProp = typeof column.mData=="function" ? 'function' : column.mData ;

			d.columns.push( {
				data:       dataProp,
				name:       column.sName,
				searchable: column.bSearchable,
				orderable:  column.bSortable,
				search:     {
					value: columnSearch.sSearch,
					regex: columnSearch.bRegex
				}
			} );

			param( "mDataProp_"+i, dataProp );

			if ( features.bFilter ) {
				param( 'sSearch_'+i,     columnSearch.sSearch );
				param( 'bRegex_'+i,      columnSearch.bRegex );
				param( 'bSearchable_'+i, column.bSearchable );
			}

			if ( features.bSort ) {
				param( 'bSortable_'+i, column.bSortable );
			}
		}

		if ( features.bFilter ) {
			param( 'sSearch', preSearch.sSearch );
			param( 'bRegex', preSearch.bRegex );
		}

		if ( features.bSort ) {
			$.each( sort, function ( i, val ) {
				d.order.push( { column: val.col, dir: val.dir } );

				param( 'iSortCol_'+i, val.col );
				param( 'sSortDir_'+i, val.dir );
			} );

			param( 'iSortingCols', sort.length );
		}

		// If the legacy.ajax parameter is null, then we automatically decide which
		// form to use, based on sAjaxSource
		var legacy = DataTable.ext.legacy.ajax;
		if ( legacy === null ) {
			return settings.sAjaxSource ? data : d;
		}

		// Otherwise, if legacy has been specified then we use that to decide on the
		// form
		return legacy ? data : d;
	}


	/**
	 * Data the data from the server (nuking the old) and redraw the table
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} json json data return from the server.
	 *  @param {string} json.sEcho Tracking flag for DataTables to match requests
	 *  @param {int} json.iTotalRecords Number of records in the data set, not accounting for filtering
	 *  @param {int} json.iTotalDisplayRecords Number of records in the data set, accounting for filtering
	 *  @param {array} json.aaData The data to display on this page
	 *  @param {string} [json.sColumns] Column ordering (sName, comma separated)
	 *  @memberof DataTable#oApi
	 */
	function _fnAjaxUpdateDraw ( settings, json )
	{
		// v1.10 uses camelCase variables, while 1.9 uses Hungarian notation.
		// Support both
		var compat = function ( old, modern ) {
			return json[old] !== undefined ? json[old] : json[modern];
		};

		var data = _fnAjaxDataSrc( settings, json );
		var draw            = compat( 'sEcho',                'draw' );
		var recordsTotal    = compat( 'iTotalRecords',        'recordsTotal' );
		var recordsFiltered = compat( 'iTotalDisplayRecords', 'recordsFiltered' );

		if ( draw ) {
			// Protect against out of sequence returns
			if ( draw*1 < settings.iDraw ) {
				return;
			}
			settings.iDraw = draw * 1;
		}

		_fnClearTable( settings );
		settings._iRecordsTotal   = parseInt(recordsTotal, 10);
		settings._iRecordsDisplay = parseInt(recordsFiltered, 10);

		for ( var i=0, ien=data.length ; i<ien ; i++ ) {
			_fnAddData( settings, data[i] );
		}
		settings.aiDisplay = settings.aiDisplayMaster.slice();

		settings.bAjaxDataGet = false;
		_fnDraw( settings );

		if ( ! settings._bInitComplete ) {
			_fnInitComplete( settings, json );
		}

		settings.bAjaxDataGet = true;
		_fnProcessingDisplay( settings, false );
	}


	/**
	 * Get the data from the JSON data source to use for drawing a table. Using
	 * `_fnGetObjectDataFn` allows the data to be sourced from a property of the
	 * source object, or from a processing function.
	 *  @param {object} oSettings dataTables settings object
	 *  @param  {object} json Data source object / array from the server
	 *  @return {array} Array of data to use
	 */
	function _fnAjaxDataSrc ( oSettings, json )
	{
		var dataSrc = $.isPlainObject( oSettings.ajax ) && oSettings.ajax.dataSrc !== undefined ?
			oSettings.ajax.dataSrc :
			oSettings.sAjaxDataProp; // Compatibility with 1.9-.

		// Compatibility with 1.9-. In order to read from aaData, check if the
		// default has been changed, if not, check for aaData
		if ( dataSrc === 'data' ) {
			return json.aaData || json[dataSrc];
		}

		return dataSrc !== "" ?
			_fnGetObjectDataFn( dataSrc )( json ) :
			json;
	}

	/**
	 * Generate the node required for filtering text
	 *  @returns {node} Filter control element
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlFilter ( settings )
	{
		var classes = settings.oClasses;
		var tableId = settings.sTableId;
		var language = settings.oLanguage;
		var previousSearch = settings.oPreviousSearch;
		var features = settings.aanFeatures;
		var input = '<input type="search" class="'+classes.sFilterInput+'"/>';

		var str = language.sSearch;
		str = str.match(/_INPUT_/) ?
			str.replace('_INPUT_', input) :
			str+input;

		var filter = $('<div/>', {
				'id': ! features.f ? tableId+'_filter' : null,
				'class': classes.sFilter
			} )
			.append( $('<label/>' ).append( str ) );

		var searchFn = function() {
			/* Update all other filter input elements for the new display */
			var n = features.f;
			var val = !this.value ? "" : this.value; // mental IE8 fix :-(

			/* Now do the filter */
			if ( val != previousSearch.sSearch ) {
				_fnFilterComplete( settings, {
					"sSearch": val,
					"bRegex": previousSearch.bRegex,
					"bSmart": previousSearch.bSmart ,
					"bCaseInsensitive": previousSearch.bCaseInsensitive
				} );

				// Need to redraw, without resorting
				settings._iDisplayStart = 0;
				_fnDraw( settings );
			}
		};

		var searchDelay = settings.searchDelay !== null ?
			settings.searchDelay :
			_fnDataSource( settings ) === 'ssp' ?
				400 :
				0;

		var jqFilter = $('input', filter)
			.val( previousSearch.sSearch )
			.attr( 'placeholder', language.sSearchPlaceholder )
			.on(
				'keyup.DT search.DT input.DT paste.DT cut.DT',
				searchDelay ?
					_fnThrottle( searchFn, searchDelay ) :
					searchFn
			)
			.on( 'keypress.DT', function(e) {
				/* Prevent form submission */
				if ( e.keyCode == 13 ) {
					return false;
				}
			} )
			.attr('aria-controls', tableId);

		// Update the input elements whenever the table is filtered
		$(settings.nTable).on( 'search.dt.DT', function ( ev, s ) {
			if ( settings === s ) {
				// IE9 throws an 'unknown error' if document.activeElement is used
				// inside an iframe or frame...
				try {
					if ( jqFilter[0] !== document.activeElement ) {
						jqFilter.val( previousSearch.sSearch );
					}
				}
				catch ( e ) {}
			}
		} );

		return filter[0];
	}


	/**
	 * Filter the table using both the global filter and column based filtering
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} oSearch search information
	 *  @param {int} [iForce] force a research of the master array (1) or not (undefined or 0)
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterComplete ( oSettings, oInput, iForce )
	{
		var oPrevSearch = oSettings.oPreviousSearch;
		var aoPrevSearch = oSettings.aoPreSearchCols;
		var fnSaveFilter = function ( oFilter ) {
			/* Save the filtering values */
			oPrevSearch.sSearch = oFilter.sSearch;
			oPrevSearch.bRegex = oFilter.bRegex;
			oPrevSearch.bSmart = oFilter.bSmart;
			oPrevSearch.bCaseInsensitive = oFilter.bCaseInsensitive;
		};
		var fnRegex = function ( o ) {
			// Backwards compatibility with the bEscapeRegex option
			return o.bEscapeRegex !== undefined ? !o.bEscapeRegex : o.bRegex;
		};

		// Resolve any column types that are unknown due to addition or invalidation
		// @todo As per sort - can this be moved into an event handler?
		_fnColumnTypes( oSettings );

		/* In server-side processing all filtering is done by the server, so no point hanging around here */
		if ( _fnDataSource( oSettings ) != 'ssp' )
		{
			/* Global filter */
			_fnFilter( oSettings, oInput.sSearch, iForce, fnRegex(oInput), oInput.bSmart, oInput.bCaseInsensitive );
			fnSaveFilter( oInput );

			/* Now do the individual column filter */
			for ( var i=0 ; i<aoPrevSearch.length ; i++ )
			{
				_fnFilterColumn( oSettings, aoPrevSearch[i].sSearch, i, fnRegex(aoPrevSearch[i]),
					aoPrevSearch[i].bSmart, aoPrevSearch[i].bCaseInsensitive );
			}

			/* Custom filtering */
			_fnFilterCustom( oSettings );
		}
		else
		{
			fnSaveFilter( oInput );
		}

		/* Tell the draw function we have been filtering */
		oSettings.bFiltered = true;
		_fnCallbackFire( oSettings, null, 'search', [oSettings] );
	}


	/**
	 * Apply custom filtering functions
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterCustom( settings )
	{
		var filters = DataTable.ext.search;
		var displayRows = settings.aiDisplay;
		var row, rowIdx;

		for ( var i=0, ien=filters.length ; i<ien ; i++ ) {
			var rows = [];

			// Loop over each row and see if it should be included
			for ( var j=0, jen=displayRows.length ; j<jen ; j++ ) {
				rowIdx = displayRows[ j ];
				row = settings.aoData[ rowIdx ];

				if ( filters[i]( settings, row._aFilterData, rowIdx, row._aData, j ) ) {
					rows.push( rowIdx );
				}
			}

			// So the array reference doesn't break set the results into the
			// existing array
			displayRows.length = 0;
			$.merge( displayRows, rows );
		}
	}


	/**
	 * Filter the table on a per-column basis
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sInput string to filter on
	 *  @param {int} iColumn column to filter
	 *  @param {bool} bRegex treat search string as a regular expression or not
	 *  @param {bool} bSmart use smart filtering or not
	 *  @param {bool} bCaseInsensitive Do case insenstive matching or not
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterColumn ( settings, searchStr, colIdx, regex, smart, caseInsensitive )
	{
		if ( searchStr === '' ) {
			return;
		}

		var data;
		var out = [];
		var display = settings.aiDisplay;
		var rpSearch = _fnFilterCreateSearch( searchStr, regex, smart, caseInsensitive );

		for ( var i=0 ; i<display.length ; i++ ) {
			data = settings.aoData[ display[i] ]._aFilterData[ colIdx ];

			if ( rpSearch.test( data ) ) {
				out.push( display[i] );
			}
		}

		settings.aiDisplay = out;
	}


	/**
	 * Filter the data table based on user input and draw the table
	 *  @param {object} settings dataTables settings object
	 *  @param {string} input string to filter on
	 *  @param {int} force optional - force a research of the master array (1) or not (undefined or 0)
	 *  @param {bool} regex treat as a regular expression or not
	 *  @param {bool} smart perform smart filtering or not
	 *  @param {bool} caseInsensitive Do case insenstive matching or not
	 *  @memberof DataTable#oApi
	 */
	function _fnFilter( settings, input, force, regex, smart, caseInsensitive )
	{
		var rpSearch = _fnFilterCreateSearch( input, regex, smart, caseInsensitive );
		var prevSearch = settings.oPreviousSearch.sSearch;
		var displayMaster = settings.aiDisplayMaster;
		var display, invalidated, i;
		var filtered = [];

		// Need to take account of custom filtering functions - always filter
		if ( DataTable.ext.search.length !== 0 ) {
			force = true;
		}

		// Check if any of the rows were invalidated
		invalidated = _fnFilterData( settings );

		// If the input is blank - we just want the full data set
		if ( input.length <= 0 ) {
			settings.aiDisplay = displayMaster.slice();
		}
		else {
			// New search - start from the master array
			if ( invalidated ||
				 force ||
				 prevSearch.length > input.length ||
				 input.indexOf(prevSearch) !== 0 ||
				 settings.bSorted // On resort, the display master needs to be
				                  // re-filtered since indexes will have changed
			) {
				settings.aiDisplay = displayMaster.slice();
			}

			// Search the display array
			display = settings.aiDisplay;

			for ( i=0 ; i<display.length ; i++ ) {
				if ( rpSearch.test( settings.aoData[ display[i] ]._sFilterRow ) ) {
					filtered.push( display[i] );
				}
			}

			settings.aiDisplay = filtered;
		}
	}


	/**
	 * Build a regular expression object suitable for searching a table
	 *  @param {string} sSearch string to search for
	 *  @param {bool} bRegex treat as a regular expression or not
	 *  @param {bool} bSmart perform smart filtering or not
	 *  @param {bool} bCaseInsensitive Do case insensitive matching or not
	 *  @returns {RegExp} constructed object
	 *  @memberof DataTable#oApi
	 */
	function _fnFilterCreateSearch( search, regex, smart, caseInsensitive )
	{
		search = regex ?
			search :
			_fnEscapeRegex( search );

		if ( smart ) {
			/* For smart filtering we want to allow the search to work regardless of
			 * word order. We also want double quoted text to be preserved, so word
			 * order is important - a la google. So this is what we want to
			 * generate:
			 *
			 * ^(?=.*?\bone\b)(?=.*?\btwo three\b)(?=.*?\bfour\b).*$
			 */
			var a = $.map( search.match( /"[^"]+"|[^ ]+/g ) || [''], function ( word ) {
				if ( word.charAt(0) === '"' ) {
					var m = word.match( /^"(.*)"$/ );
					word = m ? m[1] : word;
				}

				return word.replace('"', '');
			} );

			search = '^(?=.*?'+a.join( ')(?=.*?' )+').*$';
		}

		return new RegExp( search, caseInsensitive ? 'i' : '' );
	}


	/**
	 * Escape a string such that it can be used in a regular expression
	 *  @param {string} sVal string to escape
	 *  @returns {string} escaped string
	 *  @memberof DataTable#oApi
	 */
	var _fnEscapeRegex = DataTable.util.escapeRegex;

	var __filter_div = $('<div>')[0];
	var __filter_div_textContent = __filter_div.textContent !== undefined;

	// Update the filtering data for each row if needed (by invalidation or first run)
	function _fnFilterData ( settings )
	{
		var columns = settings.aoColumns;
		var column;
		var i, j, ien, jen, filterData, cellData, row;
		var fomatters = DataTable.ext.type.search;
		var wasInvalidated = false;

		for ( i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
			row = settings.aoData[i];

			if ( ! row._aFilterData ) {
				filterData = [];

				for ( j=0, jen=columns.length ; j<jen ; j++ ) {
					column = columns[j];

					if ( column.bSearchable ) {
						cellData = _fnGetCellData( settings, i, j, 'filter' );

						if ( fomatters[ column.sType ] ) {
							cellData = fomatters[ column.sType ]( cellData );
						}

						// Search in DataTables 1.10 is string based. In 1.11 this
						// should be altered to also allow strict type checking.
						if ( cellData === null ) {
							cellData = '';
						}

						if ( typeof cellData !== 'string' && cellData.toString ) {
							cellData = cellData.toString();
						}
					}
					else {
						cellData = '';
					}

					// If it looks like there is an HTML entity in the string,
					// attempt to decode it so sorting works as expected. Note that
					// we could use a single line of jQuery to do this, but the DOM
					// method used here is much faster http://jsperf.com/html-decode
					if ( cellData.indexOf && cellData.indexOf('&') !== -1 ) {
						__filter_div.innerHTML = cellData;
						cellData = __filter_div_textContent ?
							__filter_div.textContent :
							__filter_div.innerText;
					}

					if ( cellData.replace ) {
						cellData = cellData.replace(/[\r\n]/g, '');
					}

					filterData.push( cellData );
				}

				row._aFilterData = filterData;
				row._sFilterRow = filterData.join('  ');
				wasInvalidated = true;
			}
		}

		return wasInvalidated;
	}


	/**
	 * Convert from the internal Hungarian notation to camelCase for external
	 * interaction
	 *  @param {object} obj Object to convert
	 *  @returns {object} Inverted object
	 *  @memberof DataTable#oApi
	 */
	function _fnSearchToCamel ( obj )
	{
		return {
			search:          obj.sSearch,
			smart:           obj.bSmart,
			regex:           obj.bRegex,
			caseInsensitive: obj.bCaseInsensitive
		};
	}



	/**
	 * Convert from camelCase notation to the internal Hungarian. We could use the
	 * Hungarian convert function here, but this is cleaner
	 *  @param {object} obj Object to convert
	 *  @returns {object} Inverted object
	 *  @memberof DataTable#oApi
	 */
	function _fnSearchToHung ( obj )
	{
		return {
			sSearch:          obj.search,
			bSmart:           obj.smart,
			bRegex:           obj.regex,
			bCaseInsensitive: obj.caseInsensitive
		};
	}

	/**
	 * Generate the node required for the info display
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {node} Information element
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlInfo ( settings )
	{
		var
			tid = settings.sTableId,
			nodes = settings.aanFeatures.i,
			n = $('<div/>', {
				'class': settings.oClasses.sInfo,
				'id': ! nodes ? tid+'_info' : null
			} );

		if ( ! nodes ) {
			// Update display on each draw
			settings.aoDrawCallback.push( {
				"fn": _fnUpdateInfo,
				"sName": "information"
			} );

			n
				.attr( 'role', 'status' )
				.attr( 'aria-live', 'polite' );

			// Table is described by our info div
			$(settings.nTable).attr( 'aria-describedby', tid+'_info' );
		}

		return n[0];
	}


	/**
	 * Update the information elements in the display
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnUpdateInfo ( settings )
	{
		/* Show information about the table */
		var nodes = settings.aanFeatures.i;
		if ( nodes.length === 0 ) {
			return;
		}

		var
			lang  = settings.oLanguage,
			start = settings._iDisplayStart+1,
			end   = settings.fnDisplayEnd(),
			max   = settings.fnRecordsTotal(),
			total = settings.fnRecordsDisplay(),
			out   = total ?
				lang.sInfo :
				lang.sInfoEmpty;

		if ( total !== max ) {
			/* Record set after filtering */
			out += ' ' + lang.sInfoFiltered;
		}

		// Convert the macros
		out += lang.sInfoPostFix;
		out = _fnInfoMacros( settings, out );

		var callback = lang.fnInfoCallback;
		if ( callback !== null ) {
			out = callback.call( settings.oInstance,
				settings, start, end, max, total, out
			);
		}

		$(nodes).html( out );
	}


	function _fnInfoMacros ( settings, str )
	{
		// When infinite scrolling, we are always starting at 1. _iDisplayStart is used only
		// internally
		var
			formatter  = settings.fnFormatNumber,
			start      = settings._iDisplayStart+1,
			len        = settings._iDisplayLength,
			vis        = settings.fnRecordsDisplay(),
			all        = len === -1;

		return str.
			replace(/_START_/g, formatter.call( settings, start ) ).
			replace(/_END_/g,   formatter.call( settings, settings.fnDisplayEnd() ) ).
			replace(/_MAX_/g,   formatter.call( settings, settings.fnRecordsTotal() ) ).
			replace(/_TOTAL_/g, formatter.call( settings, vis ) ).
			replace(/_PAGE_/g,  formatter.call( settings, all ? 1 : Math.ceil( start / len ) ) ).
			replace(/_PAGES_/g, formatter.call( settings, all ? 1 : Math.ceil( vis / len ) ) );
	}



	/**
	 * Draw the table for the first time, adding all required features
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnInitialise ( settings )
	{
		var i, iLen, iAjaxStart=settings.iInitDisplayStart;
		var columns = settings.aoColumns, column;
		var features = settings.oFeatures;
		var deferLoading = settings.bDeferLoading; // value modified by the draw

		/* Ensure that the table data is fully initialised */
		if ( ! settings.bInitialised ) {
			setTimeout( function(){ _fnInitialise( settings ); }, 200 );
			return;
		}

		/* Show the display HTML options */
		_fnAddOptionsHtml( settings );

		/* Build and draw the header / footer for the table */
		_fnBuildHead( settings );
		_fnDrawHead( settings, settings.aoHeader );
		_fnDrawHead( settings, settings.aoFooter );

		/* Okay to show that something is going on now */
		_fnProcessingDisplay( settings, true );

		/* Calculate sizes for columns */
		if ( features.bAutoWidth ) {
			_fnCalculateColumnWidths( settings );
		}

		for ( i=0, iLen=columns.length ; i<iLen ; i++ ) {
			column = columns[i];

			if ( column.sWidth ) {
				column.nTh.style.width = _fnStringToCss( column.sWidth );
			}
		}

		_fnCallbackFire( settings, null, 'preInit', [settings] );

		// If there is default sorting required - let's do it. The sort function
		// will do the drawing for us. Otherwise we draw the table regardless of the
		// Ajax source - this allows the table to look initialised for Ajax sourcing
		// data (show 'loading' message possibly)
		_fnReDraw( settings );

		// Server-side processing init complete is done by _fnAjaxUpdateDraw
		var dataSrc = _fnDataSource( settings );
		if ( dataSrc != 'ssp' || deferLoading ) {
			// if there is an ajax source load the data
			if ( dataSrc == 'ajax' ) {
				_fnBuildAjax( settings, [], function(json) {
					var aData = _fnAjaxDataSrc( settings, json );

					// Got the data - add it to the table
					for ( i=0 ; i<aData.length ; i++ ) {
						_fnAddData( settings, aData[i] );
					}

					// Reset the init display for cookie saving. We've already done
					// a filter, and therefore cleared it before. So we need to make
					// it appear 'fresh'
					settings.iInitDisplayStart = iAjaxStart;

					_fnReDraw( settings );

					_fnProcessingDisplay( settings, false );
					_fnInitComplete( settings, json );
				}, settings );
			}
			else {
				_fnProcessingDisplay( settings, false );
				_fnInitComplete( settings );
			}
		}
	}


	/**
	 * Draw the table for the first time, adding all required features
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} [json] JSON from the server that completed the table, if using Ajax source
	 *    with client-side processing (optional)
	 *  @memberof DataTable#oApi
	 */
	function _fnInitComplete ( settings, json )
	{
		settings._bInitComplete = true;

		// When data was added after the initialisation (data or Ajax) we need to
		// calculate the column sizing
		if ( json || settings.oInit.aaData ) {
			_fnAdjustColumnSizing( settings );
		}

		_fnCallbackFire( settings, null, 'plugin-init', [settings, json] );
		_fnCallbackFire( settings, 'aoInitComplete', 'init', [settings, json] );
	}


	function _fnLengthChange ( settings, val )
	{
		var len = parseInt( val, 10 );
		settings._iDisplayLength = len;

		_fnLengthOverflow( settings );

		// Fire length change event
		_fnCallbackFire( settings, null, 'length', [settings, len] );
	}


	/**
	 * Generate the node required for user display length changing
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Display length feature node
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlLength ( settings )
	{
		var
			classes  = settings.oClasses,
			tableId  = settings.sTableId,
			menu     = settings.aLengthMenu,
			d2       = $.isArray( menu[0] ),
			lengths  = d2 ? menu[0] : menu,
			language = d2 ? menu[1] : menu;

		var select = $('<select/>', {
			'name':          tableId+'_length',
			'aria-controls': tableId,
			'class':         classes.sLengthSelect
		} );

		for ( var i=0, ien=lengths.length ; i<ien ; i++ ) {
			select[0][ i ] = new Option(
				typeof language[i] === 'number' ?
					settings.fnFormatNumber( language[i] ) :
					language[i],
				lengths[i]
			);
		}

		var div = $('<div><label/></div>').addClass( classes.sLength );
		if ( ! settings.aanFeatures.l ) {
			div[0].id = tableId+'_length';
		}

		div.children().append(
			settings.oLanguage.sLengthMenu.replace( '_MENU_', select[0].outerHTML )
		);

		// Can't use `select` variable as user might provide their own and the
		// reference is broken by the use of outerHTML
		$('select', div)
			.val( settings._iDisplayLength )
			.on( 'change.DT', function(e) {
				_fnLengthChange( settings, $(this).val() );
				_fnDraw( settings );
			} );

		// Update node value whenever anything changes the table's length
		$(settings.nTable).on( 'length.dt.DT', function (e, s, len) {
			if ( settings === s ) {
				$('select', div).val( len );
			}
		} );

		return div[0];
	}



	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Note that most of the paging logic is done in
	 * DataTable.ext.pager
	 */

	/**
	 * Generate the node required for default pagination
	 *  @param {object} oSettings dataTables settings object
	 *  @returns {node} Pagination feature node
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlPaginate ( settings )
	{
		var
			type   = settings.sPaginationType,
			plugin = DataTable.ext.pager[ type ],
			modern = typeof plugin === 'function',
			redraw = function( settings ) {
				_fnDraw( settings );
			},
			node = $('<div/>').addClass( settings.oClasses.sPaging + type )[0],
			features = settings.aanFeatures;

		if ( ! modern ) {
			plugin.fnInit( settings, node, redraw );
		}

		/* Add a draw callback for the pagination on first instance, to update the paging display */
		if ( ! features.p )
		{
			node.id = settings.sTableId+'_paginate';

			settings.aoDrawCallback.push( {
				"fn": function( settings ) {
					if ( modern ) {
						var
							start      = settings._iDisplayStart,
							len        = settings._iDisplayLength,
							visRecords = settings.fnRecordsDisplay(),
							all        = len === -1,
							page = all ? 0 : Math.ceil( start / len ),
							pages = all ? 1 : Math.ceil( visRecords / len ),
							buttons = plugin(page, pages),
							i, ien;

						for ( i=0, ien=features.p.length ; i<ien ; i++ ) {
							_fnRenderer( settings, 'pageButton' )(
								settings, features.p[i], i, buttons, page, pages
							);
						}
					}
					else {
						plugin.fnUpdate( settings, redraw );
					}
				},
				"sName": "pagination"
			} );
		}

		return node;
	}


	/**
	 * Alter the display settings to change the page
	 *  @param {object} settings DataTables settings object
	 *  @param {string|int} action Paging action to take: "first", "previous",
	 *    "next" or "last" or page number to jump to (integer)
	 *  @param [bool] redraw Automatically draw the update or not
	 *  @returns {bool} true page has changed, false - no change
	 *  @memberof DataTable#oApi
	 */
	function _fnPageChange ( settings, action, redraw )
	{
		var
			start     = settings._iDisplayStart,
			len       = settings._iDisplayLength,
			records   = settings.fnRecordsDisplay();

		if ( records === 0 || len === -1 )
		{
			start = 0;
		}
		else if ( typeof action === "number" )
		{
			start = action * len;

			if ( start > records )
			{
				start = 0;
			}
		}
		else if ( action == "first" )
		{
			start = 0;
		}
		else if ( action == "previous" )
		{
			start = len >= 0 ?
				start - len :
				0;

			if ( start < 0 )
			{
			  start = 0;
			}
		}
		else if ( action == "next" )
		{
			if ( start + len < records )
			{
				start += len;
			}
		}
		else if ( action == "last" )
		{
			start = Math.floor( (records-1) / len) * len;
		}
		else
		{
			_fnLog( settings, 0, "Unknown paging action: "+action, 5 );
		}

		var changed = settings._iDisplayStart !== start;
		settings._iDisplayStart = start;

		if ( changed ) {
			_fnCallbackFire( settings, null, 'page', [settings] );

			if ( redraw ) {
				_fnDraw( settings );
			}
		}

		return changed;
	}



	/**
	 * Generate the node required for the processing node
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Processing element
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlProcessing ( settings )
	{
		return $('<div/>', {
				'id': ! settings.aanFeatures.r ? settings.sTableId+'_processing' : null,
				'class': settings.oClasses.sProcessing
			} )
			.html( settings.oLanguage.sProcessing )
			.insertBefore( settings.nTable )[0];
	}


	/**
	 * Display or hide the processing indicator
	 *  @param {object} settings dataTables settings object
	 *  @param {bool} show Show the processing indicator (true) or not (false)
	 *  @memberof DataTable#oApi
	 */
	function _fnProcessingDisplay ( settings, show )
	{
		if ( settings.oFeatures.bProcessing ) {
			$(settings.aanFeatures.r).css( 'display', show ? 'block' : 'none' );
		}

		_fnCallbackFire( settings, null, 'processing', [settings, show] );
	}

	/**
	 * Add any control elements for the table - specifically scrolling
	 *  @param {object} settings dataTables settings object
	 *  @returns {node} Node to add to the DOM
	 *  @memberof DataTable#oApi
	 */
	function _fnFeatureHtmlTable ( settings )
	{
		var table = $(settings.nTable);

		// Add the ARIA grid role to the table
		table.attr( 'role', 'grid' );

		// Scrolling from here on in
		var scroll = settings.oScroll;

		if ( scroll.sX === '' && scroll.sY === '' ) {
			return settings.nTable;
		}

		var scrollX = scroll.sX;
		var scrollY = scroll.sY;
		var classes = settings.oClasses;
		var caption = table.children('caption');
		var captionSide = caption.length ? caption[0]._captionSide : null;
		var headerClone = $( table[0].cloneNode(false) );
		var footerClone = $( table[0].cloneNode(false) );
		var footer = table.children('tfoot');
		var _div = '<div/>';
		var size = function ( s ) {
			return !s ? null : _fnStringToCss( s );
		};

		if ( ! footer.length ) {
			footer = null;
		}

		/*
		 * The HTML structure that we want to generate in this function is:
		 *  div - scroller
		 *    div - scroll head
		 *      div - scroll head inner
		 *        table - scroll head table
		 *          thead - thead
		 *    div - scroll body
		 *      table - table (master table)
		 *        thead - thead clone for sizing
		 *        tbody - tbody
		 *    div - scroll foot
		 *      div - scroll foot inner
		 *        table - scroll foot table
		 *          tfoot - tfoot
		 */
		var scroller = $( _div, { 'class': classes.sScrollWrapper } )
			.append(
				$(_div, { 'class': classes.sScrollHead } )
					.css( {
						overflow: 'hidden',
						position: 'relative',
						border: 0,
						width: scrollX ? size(scrollX) : '100%'
					} )
					.append(
						$(_div, { 'class': classes.sScrollHeadInner } )
							.css( {
								'box-sizing': 'content-box',
								width: scroll.sXInner || '100%'
							} )
							.append(
								headerClone
									.removeAttr('id')
									.css( 'margin-left', 0 )
									.append( captionSide === 'top' ? caption : null )
									.append(
										table.children('thead')
									)
							)
					)
			)
			.append(
				$(_div, { 'class': classes.sScrollBody } )
					.css( {
						position: 'relative',
						overflow: 'auto',
						width: size( scrollX )
					} )
					.append( table )
			);

		if ( footer ) {
			scroller.append(
				$(_div, { 'class': classes.sScrollFoot } )
					.css( {
						overflow: 'hidden',
						border: 0,
						width: scrollX ? size(scrollX) : '100%'
					} )
					.append(
						$(_div, { 'class': classes.sScrollFootInner } )
							.append(
								footerClone
									.removeAttr('id')
									.css( 'margin-left', 0 )
									.append( captionSide === 'bottom' ? caption : null )
									.append(
										table.children('tfoot')
									)
							)
					)
			);
		}

		var children = scroller.children();
		var scrollHead = children[0];
		var scrollBody = children[1];
		var scrollFoot = footer ? children[2] : null;

		// When the body is scrolled, then we also want to scroll the headers
		if ( scrollX ) {
			$(scrollBody).on( 'scroll.DT', function (e) {
				var scrollLeft = this.scrollLeft;

				scrollHead.scrollLeft = scrollLeft;

				if ( footer ) {
					scrollFoot.scrollLeft = scrollLeft;
				}
			} );
		}

		$(scrollBody).css(
			scrollY && scroll.bCollapse ? 'max-height' : 'height',
			scrollY
		);

		settings.nScrollHead = scrollHead;
		settings.nScrollBody = scrollBody;
		settings.nScrollFoot = scrollFoot;

		// On redraw - align columns
		settings.aoDrawCallback.push( {
			"fn": _fnScrollDraw,
			"sName": "scrolling"
		} );

		return scroller[0];
	}



	/**
	 * Update the header, footer and body tables for resizing - i.e. column
	 * alignment.
	 *
	 * Welcome to the most horrible function DataTables. The process that this
	 * function follows is basically:
	 *   1. Re-create the table inside the scrolling div
	 *   2. Take live measurements from the DOM
	 *   3. Apply the measurements to align the columns
	 *   4. Clean up
	 *
	 *  @param {object} settings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnScrollDraw ( settings )
	{
		// Given that this is such a monster function, a lot of variables are use
		// to try and keep the minimised size as small as possible
		var
			scroll         = settings.oScroll,
			scrollX        = scroll.sX,
			scrollXInner   = scroll.sXInner,
			scrollY        = scroll.sY,
			barWidth       = scroll.iBarWidth,
			divHeader      = $(settings.nScrollHead),
			divHeaderStyle = divHeader[0].style,
			divHeaderInner = divHeader.children('div'),
			divHeaderInnerStyle = divHeaderInner[0].style,
			divHeaderTable = divHeaderInner.children('table'),
			divBodyEl      = settings.nScrollBody,
			divBody        = $(divBodyEl),
			divBodyStyle   = divBodyEl.style,
			divFooter      = $(settings.nScrollFoot),
			divFooterInner = divFooter.children('div'),
			divFooterTable = divFooterInner.children('table'),
			header         = $(settings.nTHead),
			table          = $(settings.nTable),
			tableEl        = table[0],
			tableStyle     = tableEl.style,
			footer         = settings.nTFoot ? $(settings.nTFoot) : null,
			browser        = settings.oBrowser,
			ie67           = browser.bScrollOversize,
			dtHeaderCells  = _pluck( settings.aoColumns, 'nTh' ),
			headerTrgEls, footerTrgEls,
			headerSrcEls, footerSrcEls,
			headerCopy, footerCopy,
			headerWidths=[], footerWidths=[],
			headerContent=[], footerContent=[],
			idx, correction, sanityWidth,
			zeroOut = function(nSizer) {
				var style = nSizer.style;
				style.paddingTop = "0";
				style.paddingBottom = "0";
				style.borderTopWidth = "0";
				style.borderBottomWidth = "0";
				style.height = 0;
			};

		// If the scrollbar visibility has changed from the last draw, we need to
		// adjust the column sizes as the table width will have changed to account
		// for the scrollbar
		var scrollBarVis = divBodyEl.scrollHeight > divBodyEl.clientHeight;

		if ( settings.scrollBarVis !== scrollBarVis && settings.scrollBarVis !== undefined ) {
			settings.scrollBarVis = scrollBarVis;
			_fnAdjustColumnSizing( settings );
			return; // adjust column sizing will call this function again
		}
		else {
			settings.scrollBarVis = scrollBarVis;
		}

		/*
		 * 1. Re-create the table inside the scrolling div
		 */

		// Remove the old minimised thead and tfoot elements in the inner table
		table.children('thead, tfoot').remove();

		if ( footer ) {
			footerCopy = footer.clone().prependTo( table );
			footerTrgEls = footer.find('tr'); // the original tfoot is in its own table and must be sized
			footerSrcEls = footerCopy.find('tr');
		}

		// Clone the current header and footer elements and then place it into the inner table
		headerCopy = header.clone().prependTo( table );
		headerTrgEls = header.find('tr'); // original header is in its own table
		headerSrcEls = headerCopy.find('tr');
		headerCopy.find('th, td').removeAttr('tabindex');


		/*
		 * 2. Take live measurements from the DOM - do not alter the DOM itself!
		 */

		// Remove old sizing and apply the calculated column widths
		// Get the unique column headers in the newly created (cloned) header. We want to apply the
		// calculated sizes to this header
		if ( ! scrollX )
		{
			divBodyStyle.width = '100%';
			divHeader[0].style.width = '100%';
		}

		$.each( _fnGetUniqueThs( settings, headerCopy ), function ( i, el ) {
			idx = _fnVisibleToColumnIndex( settings, i );
			el.style.width = settings.aoColumns[idx].sWidth;
		} );

		if ( footer ) {
			_fnApplyToChildren( function(n) {
				n.style.width = "";
			}, footerSrcEls );
		}

		// Size the table as a whole
		sanityWidth = table.outerWidth();
		if ( scrollX === "" ) {
			// No x scrolling
			tableStyle.width = "100%";

			// IE7 will make the width of the table when 100% include the scrollbar
			// - which is shouldn't. When there is a scrollbar we need to take this
			// into account.
			if ( ie67 && (table.find('tbody').height() > divBodyEl.offsetHeight ||
				divBody.css('overflow-y') == "scroll")
			) {
				tableStyle.width = _fnStringToCss( table.outerWidth() - barWidth);
			}

			// Recalculate the sanity width
			sanityWidth = table.outerWidth();
		}
		else if ( scrollXInner !== "" ) {
			// legacy x scroll inner has been given - use it
			tableStyle.width = _fnStringToCss(scrollXInner);

			// Recalculate the sanity width
			sanityWidth = table.outerWidth();
		}

		// Hidden header should have zero height, so remove padding and borders. Then
		// set the width based on the real headers

		// Apply all styles in one pass
		_fnApplyToChildren( zeroOut, headerSrcEls );

		// Read all widths in next pass
		_fnApplyToChildren( function(nSizer) {
			headerContent.push( nSizer.innerHTML );
			headerWidths.push( _fnStringToCss( $(nSizer).css('width') ) );
		}, headerSrcEls );

		// Apply all widths in final pass
		_fnApplyToChildren( function(nToSize, i) {
			// Only apply widths to the DataTables detected header cells - this
			// prevents complex headers from having contradictory sizes applied
			if ( $.inArray( nToSize, dtHeaderCells ) !== -1 ) {
				nToSize.style.width = headerWidths[i];
			}
		}, headerTrgEls );

		$(headerSrcEls).height(0);

		/* Same again with the footer if we have one */
		if ( footer )
		{
			_fnApplyToChildren( zeroOut, footerSrcEls );

			_fnApplyToChildren( function(nSizer) {
				footerContent.push( nSizer.innerHTML );
				footerWidths.push( _fnStringToCss( $(nSizer).css('width') ) );
			}, footerSrcEls );

			_fnApplyToChildren( function(nToSize, i) {
				nToSize.style.width = footerWidths[i];
			}, footerTrgEls );

			$(footerSrcEls).height(0);
		}


		/*
		 * 3. Apply the measurements
		 */

		// "Hide" the header and footer that we used for the sizing. We need to keep
		// the content of the cell so that the width applied to the header and body
		// both match, but we want to hide it completely. We want to also fix their
		// width to what they currently are
		_fnApplyToChildren( function(nSizer, i) {
			nSizer.innerHTML = '<div class="dataTables_sizing">'+headerContent[i]+'</div>';
			nSizer.childNodes[0].style.height = "0";
			nSizer.childNodes[0].style.overflow = "hidden";
			nSizer.style.width = headerWidths[i];
		}, headerSrcEls );

		if ( footer )
		{
			_fnApplyToChildren( function(nSizer, i) {
				nSizer.innerHTML = '<div class="dataTables_sizing">'+footerContent[i]+'</div>';
				nSizer.childNodes[0].style.height = "0";
				nSizer.childNodes[0].style.overflow = "hidden";
				nSizer.style.width = footerWidths[i];
			}, footerSrcEls );
		}

		// Sanity check that the table is of a sensible width. If not then we are going to get
		// misalignment - try to prevent this by not allowing the table to shrink below its min width
		if ( table.outerWidth() < sanityWidth )
		{
			// The min width depends upon if we have a vertical scrollbar visible or not */
			correction = ((divBodyEl.scrollHeight > divBodyEl.offsetHeight ||
				divBody.css('overflow-y') == "scroll")) ?
					sanityWidth+barWidth :
					sanityWidth;

			// IE6/7 are a law unto themselves...
			if ( ie67 && (divBodyEl.scrollHeight >
				divBodyEl.offsetHeight || divBody.css('overflow-y') == "scroll")
			) {
				tableStyle.width = _fnStringToCss( correction-barWidth );
			}

			// And give the user a warning that we've stopped the table getting too small
			if ( scrollX === "" || scrollXInner !== "" ) {
				_fnLog( settings, 1, 'Possible column misalignment', 6 );
			}
		}
		else
		{
			correction = '100%';
		}

		// Apply to the container elements
		divBodyStyle.width = _fnStringToCss( correction );
		divHeaderStyle.width = _fnStringToCss( correction );

		if ( footer ) {
			settings.nScrollFoot.style.width = _fnStringToCss( correction );
		}


		/*
		 * 4. Clean up
		 */
		if ( ! scrollY ) {
			/* IE7< puts a vertical scrollbar in place (when it shouldn't be) due to subtracting
			 * the scrollbar height from the visible display, rather than adding it on. We need to
			 * set the height in order to sort this. Don't want to do it in any other browsers.
			 */
			if ( ie67 ) {
				divBodyStyle.height = _fnStringToCss( tableEl.offsetHeight+barWidth );
			}
		}

		/* Finally set the width's of the header and footer tables */
		var iOuterWidth = table.outerWidth();
		divHeaderTable[0].style.width = _fnStringToCss( iOuterWidth );
		divHeaderInnerStyle.width = _fnStringToCss( iOuterWidth );

		// Figure out if there are scrollbar present - if so then we need a the header and footer to
		// provide a bit more space to allow "overflow" scrolling (i.e. past the scrollbar)
		var bScrolling = table.height() > divBodyEl.clientHeight || divBody.css('overflow-y') == "scroll";
		var padding = 'padding' + (browser.bScrollbarLeft ? 'Left' : 'Right' );
		divHeaderInnerStyle[ padding ] = bScrolling ? barWidth+"px" : "0px";

		if ( footer ) {
			divFooterTable[0].style.width = _fnStringToCss( iOuterWidth );
			divFooterInner[0].style.width = _fnStringToCss( iOuterWidth );
			divFooterInner[0].style[padding] = bScrolling ? barWidth+"px" : "0px";
		}

		// Correct DOM ordering for colgroup - comes before the thead
		table.children('colgroup').insertBefore( table.children('thead') );

		/* Adjust the position of the header in case we loose the y-scrollbar */
		divBody.scroll();

		// If sorting or filtering has occurred, jump the scrolling back to the top
		// only if we aren't holding the position
		if ( (settings.bSorted || settings.bFiltered) && ! settings._drawHold ) {
			divBodyEl.scrollTop = 0;
		}
	}



	/**
	 * Apply a given function to the display child nodes of an element array (typically
	 * TD children of TR rows
	 *  @param {function} fn Method to apply to the objects
	 *  @param array {nodes} an1 List of elements to look through for display children
	 *  @param array {nodes} an2 Another list (identical structure to the first) - optional
	 *  @memberof DataTable#oApi
	 */
	function _fnApplyToChildren( fn, an1, an2 )
	{
		var index=0, i=0, iLen=an1.length;
		var nNode1, nNode2;

		while ( i < iLen ) {
			nNode1 = an1[i].firstChild;
			nNode2 = an2 ? an2[i].firstChild : null;

			while ( nNode1 ) {
				if ( nNode1.nodeType === 1 ) {
					if ( an2 ) {
						fn( nNode1, nNode2, index );
					}
					else {
						fn( nNode1, index );
					}

					index++;
				}

				nNode1 = nNode1.nextSibling;
				nNode2 = an2 ? nNode2.nextSibling : null;
			}

			i++;
		}
	}



	var __re_html_remove = /<.*?>/g;


	/**
	 * Calculate the width of columns for the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnCalculateColumnWidths ( oSettings )
	{
		var
			table = oSettings.nTable,
			columns = oSettings.aoColumns,
			scroll = oSettings.oScroll,
			scrollY = scroll.sY,
			scrollX = scroll.sX,
			scrollXInner = scroll.sXInner,
			columnCount = columns.length,
			visibleColumns = _fnGetColumns( oSettings, 'bVisible' ),
			headerCells = $('th', oSettings.nTHead),
			tableWidthAttr = table.getAttribute('width'), // from DOM element
			tableContainer = table.parentNode,
			userInputs = false,
			i, column, columnIdx, width, outerWidth,
			browser = oSettings.oBrowser,
			ie67 = browser.bScrollOversize;

		var styleWidth = table.style.width;
		if ( styleWidth && styleWidth.indexOf('%') !== -1 ) {
			tableWidthAttr = styleWidth;
		}

		/* Convert any user input sizes into pixel sizes */
		for ( i=0 ; i<visibleColumns.length ; i++ ) {
			column = columns[ visibleColumns[i] ];

			if ( column.sWidth !== null ) {
				column.sWidth = _fnConvertToWidth( column.sWidthOrig, tableContainer );

				userInputs = true;
			}
		}

		/* If the number of columns in the DOM equals the number that we have to
		 * process in DataTables, then we can use the offsets that are created by
		 * the web- browser. No custom sizes can be set in order for this to happen,
		 * nor scrolling used
		 */
		if ( ie67 || ! userInputs && ! scrollX && ! scrollY &&
		     columnCount == _fnVisbleColumns( oSettings ) &&
		     columnCount == headerCells.length
		) {
			for ( i=0 ; i<columnCount ; i++ ) {
				var colIdx = _fnVisibleToColumnIndex( oSettings, i );

				if ( colIdx !== null ) {
					columns[ colIdx ].sWidth = _fnStringToCss( headerCells.eq(i).width() );
				}
			}
		}
		else
		{
			// Otherwise construct a single row, worst case, table with the widest
			// node in the data, assign any user defined widths, then insert it into
			// the DOM and allow the browser to do all the hard work of calculating
			// table widths
			var tmpTable = $(table).clone() // don't use cloneNode - IE8 will remove events on the main table
				.css( 'visibility', 'hidden' )
				.removeAttr( 'id' );

			// Clean up the table body
			tmpTable.find('tbody tr').remove();
			var tr = $('<tr/>').appendTo( tmpTable.find('tbody') );

			// Clone the table header and footer - we can't use the header / footer
			// from the cloned table, since if scrolling is active, the table's
			// real header and footer are contained in different table tags
			tmpTable.find('thead, tfoot').remove();
			tmpTable
				.append( $(oSettings.nTHead).clone() )
				.append( $(oSettings.nTFoot).clone() );

			// Remove any assigned widths from the footer (from scrolling)
			tmpTable.find('tfoot th, tfoot td').css('width', '');

			// Apply custom sizing to the cloned header
			headerCells = _fnGetUniqueThs( oSettings, tmpTable.find('thead')[0] );

			for ( i=0 ; i<visibleColumns.length ; i++ ) {
				column = columns[ visibleColumns[i] ];

				headerCells[i].style.width = column.sWidthOrig !== null && column.sWidthOrig !== '' ?
					_fnStringToCss( column.sWidthOrig ) :
					'';

				// For scrollX we need to force the column width otherwise the
				// browser will collapse it. If this width is smaller than the
				// width the column requires, then it will have no effect
				if ( column.sWidthOrig && scrollX ) {
					$( headerCells[i] ).append( $('<div/>').css( {
						width: column.sWidthOrig,
						margin: 0,
						padding: 0,
						border: 0,
						height: 1
					} ) );
				}
			}

			// Find the widest cell for each column and put it into the table
			if ( oSettings.aoData.length ) {
				for ( i=0 ; i<visibleColumns.length ; i++ ) {
					columnIdx = visibleColumns[i];
					column = columns[ columnIdx ];

					$( _fnGetWidestNode( oSettings, columnIdx ) )
						.clone( false )
						.append( column.sContentPadding )
						.appendTo( tr );
				}
			}

			// Tidy the temporary table - remove name attributes so there aren't
			// duplicated in the dom (radio elements for example)
			$('[name]', tmpTable).removeAttr('name');

			// Table has been built, attach to the document so we can work with it.
			// A holding element is used, positioned at the top of the container
			// with minimal height, so it has no effect on if the container scrolls
			// or not. Otherwise it might trigger scrolling when it actually isn't
			// needed
			var holder = $('<div/>').css( scrollX || scrollY ?
					{
						position: 'absolute',
						top: 0,
						left: 0,
						height: 1,
						right: 0,
						overflow: 'hidden'
					} :
					{}
				)
				.append( tmpTable )
				.appendTo( tableContainer );

			// When scrolling (X or Y) we want to set the width of the table as
			// appropriate. However, when not scrolling leave the table width as it
			// is. This results in slightly different, but I think correct behaviour
			if ( scrollX && scrollXInner ) {
				tmpTable.width( scrollXInner );
			}
			else if ( scrollX ) {
				tmpTable.css( 'width', 'auto' );
				tmpTable.removeAttr('width');

				// If there is no width attribute or style, then allow the table to
				// collapse
				if ( tmpTable.width() < tableContainer.clientWidth && tableWidthAttr ) {
					tmpTable.width( tableContainer.clientWidth );
				}
			}
			else if ( scrollY ) {
				tmpTable.width( tableContainer.clientWidth );
			}
			else if ( tableWidthAttr ) {
				tmpTable.width( tableWidthAttr );
			}

			// Get the width of each column in the constructed table - we need to
			// know the inner width (so it can be assigned to the other table's
			// cells) and the outer width so we can calculate the full width of the
			// table. This is safe since DataTables requires a unique cell for each
			// column, but if ever a header can span multiple columns, this will
			// need to be modified.
			var total = 0;
			for ( i=0 ; i<visibleColumns.length ; i++ ) {
				var cell = $(headerCells[i]);
				var border = cell.outerWidth() - cell.width();

				// Use getBounding... where possible (not IE8-) because it can give
				// sub-pixel accuracy, which we then want to round up!
				var bounding = browser.bBounding ?
					Math.ceil( headerCells[i].getBoundingClientRect().width ) :
					cell.outerWidth();

				// Total is tracked to remove any sub-pixel errors as the outerWidth
				// of the table might not equal the total given here (IE!).
				total += bounding;

				// Width for each column to use
				columns[ visibleColumns[i] ].sWidth = _fnStringToCss( bounding - border );
			}

			table.style.width = _fnStringToCss( total );

			// Finished with the table - ditch it
			holder.remove();
		}

		// If there is a width attr, we want to attach an event listener which
		// allows the table sizing to automatically adjust when the window is
		// resized. Use the width attr rather than CSS, since we can't know if the
		// CSS is a relative value or absolute - DOM read is always px.
		if ( tableWidthAttr ) {
			table.style.width = _fnStringToCss( tableWidthAttr );
		}

		if ( (tableWidthAttr || scrollX) && ! oSettings._reszEvt ) {
			var bindResize = function () {
				$(window).on('resize.DT-'+oSettings.sInstance, _fnThrottle( function () {
					_fnAdjustColumnSizing( oSettings );
				} ) );
			};

			// IE6/7 will crash if we bind a resize event handler on page load.
			// To be removed in 1.11 which drops IE6/7 support
			if ( ie67 ) {
				setTimeout( bindResize, 1000 );
			}
			else {
				bindResize();
			}

			oSettings._reszEvt = true;
		}
	}


	/**
	 * Throttle the calls to a function. Arguments and context are maintained for
	 * the throttled function
	 *  @param {function} fn Function to be called
	 *  @param {int} [freq=200] call frequency in mS
	 *  @returns {function} wrapped function
	 *  @memberof DataTable#oApi
	 */
	var _fnThrottle = DataTable.util.throttle;


	/**
	 * Convert a CSS unit width to pixels (e.g. 2em)
	 *  @param {string} width width to be converted
	 *  @param {node} parent parent to get the with for (required for relative widths) - optional
	 *  @returns {int} width in pixels
	 *  @memberof DataTable#oApi
	 */
	function _fnConvertToWidth ( width, parent )
	{
		if ( ! width ) {
			return 0;
		}

		var n = $('<div/>')
			.css( 'width', _fnStringToCss( width ) )
			.appendTo( parent || document.body );

		var val = n[0].offsetWidth;
		n.remove();

		return val;
	}


	/**
	 * Get the widest node
	 *  @param {object} settings dataTables settings object
	 *  @param {int} colIdx column of interest
	 *  @returns {node} widest table node
	 *  @memberof DataTable#oApi
	 */
	function _fnGetWidestNode( settings, colIdx )
	{
		var idx = _fnGetMaxLenString( settings, colIdx );
		if ( idx < 0 ) {
			return null;
		}

		var data = settings.aoData[ idx ];
		return ! data.nTr ? // Might not have been created when deferred rendering
			$('<td/>').html( _fnGetCellData( settings, idx, colIdx, 'display' ) )[0] :
			data.anCells[ colIdx ];
	}


	/**
	 * Get the maximum strlen for each data column
	 *  @param {object} settings dataTables settings object
	 *  @param {int} colIdx column of interest
	 *  @returns {string} max string length for each column
	 *  @memberof DataTable#oApi
	 */
	function _fnGetMaxLenString( settings, colIdx )
	{
		var s, max=-1, maxIdx = -1;

		for ( var i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
			s = _fnGetCellData( settings, i, colIdx, 'display' )+'';
			s = s.replace( __re_html_remove, '' );
			s = s.replace( /&nbsp;/g, ' ' );

			if ( s.length > max ) {
				max = s.length;
				maxIdx = i;
			}
		}

		return maxIdx;
	}


	/**
	 * Append a CSS unit (only if required) to a string
	 *  @param {string} value to css-ify
	 *  @returns {string} value with css unit
	 *  @memberof DataTable#oApi
	 */
	function _fnStringToCss( s )
	{
		if ( s === null ) {
			return '0px';
		}

		if ( typeof s == 'number' ) {
			return s < 0 ?
				'0px' :
				s+'px';
		}

		// Check it has a unit character already
		return s.match(/\d$/) ?
			s+'px' :
			s;
	}



	function _fnSortFlatten ( settings )
	{
		var
			i, iLen, k, kLen,
			aSort = [],
			aiOrig = [],
			aoColumns = settings.aoColumns,
			aDataSort, iCol, sType, srcCol,
			fixed = settings.aaSortingFixed,
			fixedObj = $.isPlainObject( fixed ),
			nestedSort = [],
			add = function ( a ) {
				if ( a.length && ! $.isArray( a[0] ) ) {
					// 1D array
					nestedSort.push( a );
				}
				else {
					// 2D array
					$.merge( nestedSort, a );
				}
			};

		// Build the sort array, with pre-fix and post-fix options if they have been
		// specified
		if ( $.isArray( fixed ) ) {
			add( fixed );
		}

		if ( fixedObj && fixed.pre ) {
			add( fixed.pre );
		}

		add( settings.aaSorting );

		if (fixedObj && fixed.post ) {
			add( fixed.post );
		}

		for ( i=0 ; i<nestedSort.length ; i++ )
		{
			srcCol = nestedSort[i][0];
			aDataSort = aoColumns[ srcCol ].aDataSort;

			for ( k=0, kLen=aDataSort.length ; k<kLen ; k++ )
			{
				iCol = aDataSort[k];
				sType = aoColumns[ iCol ].sType || 'string';

				if ( nestedSort[i]._idx === undefined ) {
					nestedSort[i]._idx = $.inArray( nestedSort[i][1], aoColumns[iCol].asSorting );
				}

				aSort.push( {
					src:       srcCol,
					col:       iCol,
					dir:       nestedSort[i][1],
					index:     nestedSort[i]._idx,
					type:      sType,
					formatter: DataTable.ext.type.order[ sType+"-pre" ]
				} );
			}
		}

		return aSort;
	}

	/**
	 * Change the order of the table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 *  @todo This really needs split up!
	 */
	function _fnSort ( oSettings )
	{
		var
			i, ien, iLen, j, jLen, k, kLen,
			sDataType, nTh,
			aiOrig = [],
			oExtSort = DataTable.ext.type.order,
			aoData = oSettings.aoData,
			aoColumns = oSettings.aoColumns,
			aDataSort, data, iCol, sType, oSort,
			formatters = 0,
			sortCol,
			displayMaster = oSettings.aiDisplayMaster,
			aSort;

		// Resolve any column types that are unknown due to addition or invalidation
		// @todo Can this be moved into a 'data-ready' handler which is called when
		//   data is going to be used in the table?
		_fnColumnTypes( oSettings );

		aSort = _fnSortFlatten( oSettings );

		for ( i=0, ien=aSort.length ; i<ien ; i++ ) {
			sortCol = aSort[i];

			// Track if we can use the fast sort algorithm
			if ( sortCol.formatter ) {
				formatters++;
			}

			// Load the data needed for the sort, for each cell
			_fnSortData( oSettings, sortCol.col );
		}

		/* No sorting required if server-side or no sorting array */
		if ( _fnDataSource( oSettings ) != 'ssp' && aSort.length !== 0 )
		{
			// Create a value - key array of the current row positions such that we can use their
			// current position during the sort, if values match, in order to perform stable sorting
			for ( i=0, iLen=displayMaster.length ; i<iLen ; i++ ) {
				aiOrig[ displayMaster[i] ] = i;
			}

			/* Do the sort - here we want multi-column sorting based on a given data source (column)
			 * and sorting function (from oSort) in a certain direction. It's reasonably complex to
			 * follow on it's own, but this is what we want (example two column sorting):
			 *  fnLocalSorting = function(a,b){
			 *    var iTest;
			 *    iTest = oSort['string-asc']('data11', 'data12');
			 *      if (iTest !== 0)
			 *        return iTest;
			 *    iTest = oSort['numeric-desc']('data21', 'data22');
			 *    if (iTest !== 0)
			 *      return iTest;
			 *    return oSort['numeric-asc']( aiOrig[a], aiOrig[b] );
			 *  }
			 * Basically we have a test for each sorting column, if the data in that column is equal,
			 * test the next column. If all columns match, then we use a numeric sort on the row
			 * positions in the original data array to provide a stable sort.
			 *
			 * Note - I know it seems excessive to have two sorting methods, but the first is around
			 * 15% faster, so the second is only maintained for backwards compatibility with sorting
			 * methods which do not have a pre-sort formatting function.
			 */
			if ( formatters === aSort.length ) {
				// All sort types have formatting functions
				displayMaster.sort( function ( a, b ) {
					var
						x, y, k, test, sort,
						len=aSort.length,
						dataA = aoData[a]._aSortData,
						dataB = aoData[b]._aSortData;

					for ( k=0 ; k<len ; k++ ) {
						sort = aSort[k];

						x = dataA[ sort.col ];
						y = dataB[ sort.col ];

						test = x<y ? -1 : x>y ? 1 : 0;
						if ( test !== 0 ) {
							return sort.dir === 'asc' ? test : -test;
						}
					}

					x = aiOrig[a];
					y = aiOrig[b];
					return x<y ? -1 : x>y ? 1 : 0;
				} );
			}
			else {
				// Depreciated - remove in 1.11 (providing a plug-in option)
				// Not all sort types have formatting methods, so we have to call their sorting
				// methods.
				displayMaster.sort( function ( a, b ) {
					var
						x, y, k, l, test, sort, fn,
						len=aSort.length,
						dataA = aoData[a]._aSortData,
						dataB = aoData[b]._aSortData;

					for ( k=0 ; k<len ; k++ ) {
						sort = aSort[k];

						x = dataA[ sort.col ];
						y = dataB[ sort.col ];

						fn = oExtSort[ sort.type+"-"+sort.dir ] || oExtSort[ "string-"+sort.dir ];
						test = fn( x, y );
						if ( test !== 0 ) {
							return test;
						}
					}

					x = aiOrig[a];
					y = aiOrig[b];
					return x<y ? -1 : x>y ? 1 : 0;
				} );
			}
		}

		/* Tell the draw function that we have sorted the data */
		oSettings.bSorted = true;
	}


	function _fnSortAria ( settings )
	{
		var label;
		var nextSort;
		var columns = settings.aoColumns;
		var aSort = _fnSortFlatten( settings );
		var oAria = settings.oLanguage.oAria;

		// ARIA attributes - need to loop all columns, to update all (removing old
		// attributes as needed)
		for ( var i=0, iLen=columns.length ; i<iLen ; i++ )
		{
			var col = columns[i];
			var asSorting = col.asSorting;
			var sTitle = col.sTitle.replace( /<.*?>/g, "" );
			var th = col.nTh;

			// IE7 is throwing an error when setting these properties with jQuery's
			// attr() and removeAttr() methods...
			th.removeAttribute('aria-sort');

			/* In ARIA only the first sorting column can be marked as sorting - no multi-sort option */
			if ( col.bSortable ) {
				if ( aSort.length > 0 && aSort[0].col == i ) {
					th.setAttribute('aria-sort', aSort[0].dir=="asc" ? "ascending" : "descending" );
					nextSort = asSorting[ aSort[0].index+1 ] || asSorting[0];
				}
				else {
					nextSort = asSorting[0];
				}

				label = sTitle + ( nextSort === "asc" ?
					oAria.sSortAscending :
					oAria.sSortDescending
				);
			}
			else {
				label = sTitle;
			}

			th.setAttribute('aria-label', label);
		}
	}


	/**
	 * Function to run on user sort request
	 *  @param {object} settings dataTables settings object
	 *  @param {node} attachTo node to attach the handler to
	 *  @param {int} colIdx column sorting index
	 *  @param {boolean} [append=false] Append the requested sort to the existing
	 *    sort if true (i.e. multi-column sort)
	 *  @param {function} [callback] callback function
	 *  @memberof DataTable#oApi
	 */
	function _fnSortListener ( settings, colIdx, append, callback )
	{
		var col = settings.aoColumns[ colIdx ];
		var sorting = settings.aaSorting;
		var asSorting = col.asSorting;
		var nextSortIdx;
		var next = function ( a, overflow ) {
			var idx = a._idx;
			if ( idx === undefined ) {
				idx = $.inArray( a[1], asSorting );
			}

			return idx+1 < asSorting.length ?
				idx+1 :
				overflow ?
					null :
					0;
		};

		// Convert to 2D array if needed
		if ( typeof sorting[0] === 'number' ) {
			sorting = settings.aaSorting = [ sorting ];
		}

		// If appending the sort then we are multi-column sorting
		if ( append && settings.oFeatures.bSortMulti ) {
			// Are we already doing some kind of sort on this column?
			var sortIdx = $.inArray( colIdx, _pluck(sorting, '0') );

			if ( sortIdx !== -1 ) {
				// Yes, modify the sort
				nextSortIdx = next( sorting[sortIdx], true );

				if ( nextSortIdx === null && sorting.length === 1 ) {
					nextSortIdx = 0; // can't remove sorting completely
				}

				if ( nextSortIdx === null ) {
					sorting.splice( sortIdx, 1 );
				}
				else {
					sorting[sortIdx][1] = asSorting[ nextSortIdx ];
					sorting[sortIdx]._idx = nextSortIdx;
				}
			}
			else {
				// No sort on this column yet
				sorting.push( [ colIdx, asSorting[0], 0 ] );
				sorting[sorting.length-1]._idx = 0;
			}
		}
		else if ( sorting.length && sorting[0][0] == colIdx ) {
			// Single column - already sorting on this column, modify the sort
			nextSortIdx = next( sorting[0] );

			sorting.length = 1;
			sorting[0][1] = asSorting[ nextSortIdx ];
			sorting[0]._idx = nextSortIdx;
		}
		else {
			// Single column - sort only on this column
			sorting.length = 0;
			sorting.push( [ colIdx, asSorting[0] ] );
			sorting[0]._idx = 0;
		}

		// Run the sort by calling a full redraw
		_fnReDraw( settings );

		// callback used for async user interaction
		if ( typeof callback == 'function' ) {
			callback( settings );
		}
	}


	/**
	 * Attach a sort handler (click) to a node
	 *  @param {object} settings dataTables settings object
	 *  @param {node} attachTo node to attach the handler to
	 *  @param {int} colIdx column sorting index
	 *  @param {function} [callback] callback function
	 *  @memberof DataTable#oApi
	 */
	function _fnSortAttachListener ( settings, attachTo, colIdx, callback )
	{
		var col = settings.aoColumns[ colIdx ];

		_fnBindAction( attachTo, {}, function (e) {
			/* If the column is not sortable - don't to anything */
			if ( col.bSortable === false ) {
				return;
			}

			// If processing is enabled use a timeout to allow the processing
			// display to be shown - otherwise to it synchronously
			if ( settings.oFeatures.bProcessing ) {
				_fnProcessingDisplay( settings, true );

				setTimeout( function() {
					_fnSortListener( settings, colIdx, e.shiftKey, callback );

					// In server-side processing, the draw callback will remove the
					// processing display
					if ( _fnDataSource( settings ) !== 'ssp' ) {
						_fnProcessingDisplay( settings, false );
					}
				}, 0 );
			}
			else {
				_fnSortListener( settings, colIdx, e.shiftKey, callback );
			}
		} );
	}


	/**
	 * Set the sorting classes on table's body, Note: it is safe to call this function
	 * when bSort and bSortClasses are false
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnSortingClasses( settings )
	{
		var oldSort = settings.aLastSort;
		var sortClass = settings.oClasses.sSortColumn;
		var sort = _fnSortFlatten( settings );
		var features = settings.oFeatures;
		var i, ien, colIdx;

		if ( features.bSort && features.bSortClasses ) {
			// Remove old sorting classes
			for ( i=0, ien=oldSort.length ; i<ien ; i++ ) {
				colIdx = oldSort[i].src;

				// Remove column sorting
				$( _pluck( settings.aoData, 'anCells', colIdx ) )
					.removeClass( sortClass + (i<2 ? i+1 : 3) );
			}

			// Add new column sorting
			for ( i=0, ien=sort.length ; i<ien ; i++ ) {
				colIdx = sort[i].src;

				$( _pluck( settings.aoData, 'anCells', colIdx ) )
					.addClass( sortClass + (i<2 ? i+1 : 3) );
			}
		}

		settings.aLastSort = sort;
	}


	// Get the data to sort a column, be it from cache, fresh (populating the
	// cache), or from a sort formatter
	function _fnSortData( settings, idx )
	{
		// Custom sorting function - provided by the sort data type
		var column = settings.aoColumns[ idx ];
		var customSort = DataTable.ext.order[ column.sSortDataType ];
		var customData;

		if ( customSort ) {
			customData = customSort.call( settings.oInstance, settings, idx,
				_fnColumnIndexToVisible( settings, idx )
			);
		}

		// Use / populate cache
		var row, cellData;
		var formatter = DataTable.ext.type.order[ column.sType+"-pre" ];

		for ( var i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
			row = settings.aoData[i];

			if ( ! row._aSortData ) {
				row._aSortData = [];
			}

			if ( ! row._aSortData[idx] || customSort ) {
				cellData = customSort ?
					customData[i] : // If there was a custom sort function, use data from there
					_fnGetCellData( settings, i, idx, 'sort' );

				row._aSortData[ idx ] = formatter ?
					formatter( cellData ) :
					cellData;
			}
		}
	}



	/**
	 * Save the state of a table
	 *  @param {object} oSettings dataTables settings object
	 *  @memberof DataTable#oApi
	 */
	function _fnSaveState ( settings )
	{
		if ( !settings.oFeatures.bStateSave || settings.bDestroying )
		{
			return;
		}

		/* Store the interesting variables */
		var state = {
			time:    +new Date(),
			start:   settings._iDisplayStart,
			length:  settings._iDisplayLength,
			order:   $.extend( true, [], settings.aaSorting ),
			search:  _fnSearchToCamel( settings.oPreviousSearch ),
			columns: $.map( settings.aoColumns, function ( col, i ) {
				return {
					visible: col.bVisible,
					search: _fnSearchToCamel( settings.aoPreSearchCols[i] )
				};
			} )
		};

		_fnCallbackFire( settings, "aoStateSaveParams", 'stateSaveParams', [settings, state] );

		settings.oSavedState = state;
		settings.fnStateSaveCallback.call( settings.oInstance, settings, state );
	}


	/**
	 * Attempt to load a saved table state
	 *  @param {object} oSettings dataTables settings object
	 *  @param {object} oInit DataTables init object so we can override settings
	 *  @param {function} callback Callback to execute when the state has been loaded
	 *  @memberof DataTable#oApi
	 */
	function _fnLoadState ( settings, oInit, callback )
	{
		var i, ien;
		var columns = settings.aoColumns;
		var loaded = function ( s ) {
			if ( ! s || ! s.time ) {
				callback();
				return;
			}

			// Allow custom and plug-in manipulation functions to alter the saved data set and
			// cancelling of loading by returning false
			var abStateLoad = _fnCallbackFire( settings, 'aoStateLoadParams', 'stateLoadParams', [settings, s] );
			if ( $.inArray( false, abStateLoad ) !== -1 ) {
				callback();
				return;
			}

			// Reject old data
			var duration = settings.iStateDuration;
			if ( duration > 0 && s.time < +new Date() - (duration*1000) ) {
				callback();
				return;
			}

			// Number of columns have changed - all bets are off, no restore of settings
			if ( s.columns && columns.length !== s.columns.length ) {
				callback();
				return;
			}

			// Store the saved state so it might be accessed at any time
			settings.oLoadedState = $.extend( true, {}, s );

			// Restore key features - todo - for 1.11 this needs to be done by
			// subscribed events
			if ( s.start !== undefined ) {
				settings._iDisplayStart    = s.start;
				settings.iInitDisplayStart = s.start;
			}
			if ( s.length !== undefined ) {
				settings._iDisplayLength   = s.length;
			}

			// Order
			if ( s.order !== undefined ) {
				settings.aaSorting = [];
				$.each( s.order, function ( i, col ) {
					settings.aaSorting.push( col[0] >= columns.length ?
						[ 0, col[1] ] :
						col
					);
				} );
			}

			// Search
			if ( s.search !== undefined ) {
				$.extend( settings.oPreviousSearch, _fnSearchToHung( s.search ) );
			}

			// Columns
			//
			if ( s.columns ) {
				for ( i=0, ien=s.columns.length ; i<ien ; i++ ) {
					var col = s.columns[i];

					// Visibility
					if ( col.visible !== undefined ) {
						columns[i].bVisible = col.visible;
					}

					// Search
					if ( col.search !== undefined ) {
						$.extend( settings.aoPreSearchCols[i], _fnSearchToHung( col.search ) );
					}
				}
			}

			_fnCallbackFire( settings, 'aoStateLoaded', 'stateLoaded', [settings, s] );
			callback();
		}

		if ( ! settings.oFeatures.bStateSave ) {
			callback();
			return;
		}

		var state = settings.fnStateLoadCallback.call( settings.oInstance, settings, loaded );

		if ( state !== undefined ) {
			loaded( state );
		}
		// otherwise, wait for the loaded callback to be executed
	}


	/**
	 * Return the settings object for a particular table
	 *  @param {node} table table we are using as a dataTable
	 *  @returns {object} Settings object - or null if not found
	 *  @memberof DataTable#oApi
	 */
	function _fnSettingsFromNode ( table )
	{
		var settings = DataTable.settings;
		var idx = $.inArray( table, _pluck( settings, 'nTable' ) );

		return idx !== -1 ?
			settings[ idx ] :
			null;
	}


	/**
	 * Log an error message
	 *  @param {object} settings dataTables settings object
	 *  @param {int} level log error messages, or display them to the user
	 *  @param {string} msg error message
	 *  @param {int} tn Technical note id to get more information about the error.
	 *  @memberof DataTable#oApi
	 */
	function _fnLog( settings, level, msg, tn )
	{
		msg = 'DataTables warning: '+
			(settings ? 'table id='+settings.sTableId+' - ' : '')+msg;

		if ( tn ) {
			msg += '. For more information about this error, please see '+
			'http://datatables.net/tn/'+tn;
		}

		if ( ! level  ) {
			// Backwards compatibility pre 1.10
			var ext = DataTable.ext;
			var type = ext.sErrMode || ext.errMode;

			if ( settings ) {
				_fnCallbackFire( settings, null, 'error', [ settings, tn, msg ] );
			}

			if ( type == 'alert' ) {
				alert( msg );
			}
			else if ( type == 'throw' ) {
				throw new Error(msg);
			}
			else if ( typeof type == 'function' ) {
				type( settings, tn, msg );
			}
		}
		else if ( window.console && console.log ) {
			console.log( msg );
		}
	}


	/**
	 * See if a property is defined on one object, if so assign it to the other object
	 *  @param {object} ret target object
	 *  @param {object} src source object
	 *  @param {string} name property
	 *  @param {string} [mappedName] name to map too - optional, name used if not given
	 *  @memberof DataTable#oApi
	 */
	function _fnMap( ret, src, name, mappedName )
	{
		if ( $.isArray( name ) ) {
			$.each( name, function (i, val) {
				if ( $.isArray( val ) ) {
					_fnMap( ret, src, val[0], val[1] );
				}
				else {
					_fnMap( ret, src, val );
				}
			} );

			return;
		}

		if ( mappedName === undefined ) {
			mappedName = name;
		}

		if ( src[name] !== undefined ) {
			ret[mappedName] = src[name];
		}
	}


	/**
	 * Extend objects - very similar to jQuery.extend, but deep copy objects, and
	 * shallow copy arrays. The reason we need to do this, is that we don't want to
	 * deep copy array init values (such as aaSorting) since the dev wouldn't be
	 * able to override them, but we do want to deep copy arrays.
	 *  @param {object} out Object to extend
	 *  @param {object} extender Object from which the properties will be applied to
	 *      out
	 *  @param {boolean} breakRefs If true, then arrays will be sliced to take an
	 *      independent copy with the exception of the `data` or `aaData` parameters
	 *      if they are present. This is so you can pass in a collection to
	 *      DataTables and have that used as your data source without breaking the
	 *      references
	 *  @returns {object} out Reference, just for convenience - out === the return.
	 *  @memberof DataTable#oApi
	 *  @todo This doesn't take account of arrays inside the deep copied objects.
	 */
	function _fnExtend( out, extender, breakRefs )
	{
		var val;

		for ( var prop in extender ) {
			if ( extender.hasOwnProperty(prop) ) {
				val = extender[prop];

				if ( $.isPlainObject( val ) ) {
					if ( ! $.isPlainObject( out[prop] ) ) {
						out[prop] = {};
					}
					$.extend( true, out[prop], val );
				}
				else if ( breakRefs && prop !== 'data' && prop !== 'aaData' && $.isArray(val) ) {
					out[prop] = val.slice();
				}
				else {
					out[prop] = val;
				}
			}
		}

		return out;
	}


	/**
	 * Bind an event handers to allow a click or return key to activate the callback.
	 * This is good for accessibility since a return on the keyboard will have the
	 * same effect as a click, if the element has focus.
	 *  @param {element} n Element to bind the action to
	 *  @param {object} oData Data object to pass to the triggered function
	 *  @param {function} fn Callback function for when the event is triggered
	 *  @memberof DataTable#oApi
	 */
	function _fnBindAction( n, oData, fn )
	{
		$(n)
			.on( 'click.DT', oData, function (e) {
					$(n).blur(); // Remove focus outline for mouse users
					fn(e);
				} )
			.on( 'keypress.DT', oData, function (e){
					if ( e.which === 13 ) {
						e.preventDefault();
						fn(e);
					}
				} )
			.on( 'selectstart.DT', function () {
					/* Take the brutal approach to cancelling text selection */
					return false;
				} );
	}


	/**
	 * Register a callback function. Easily allows a callback function to be added to
	 * an array store of callback functions that can then all be called together.
	 *  @param {object} oSettings dataTables settings object
	 *  @param {string} sStore Name of the array storage for the callbacks in oSettings
	 *  @param {function} fn Function to be called back
	 *  @param {string} sName Identifying name for the callback (i.e. a label)
	 *  @memberof DataTable#oApi
	 */
	function _fnCallbackReg( oSettings, sStore, fn, sName )
	{
		if ( fn )
		{
			oSettings[sStore].push( {
				"fn": fn,
				"sName": sName
			} );
		}
	}


	/**
	 * Fire callback functions and trigger events. Note that the loop over the
	 * callback array store is done backwards! Further note that you do not want to
	 * fire off triggers in time sensitive applications (for example cell creation)
	 * as its slow.
	 *  @param {object} settings dataTables settings object
	 *  @param {string} callbackArr Name of the array storage for the callbacks in
	 *      oSettings
	 *  @param {string} eventName Name of the jQuery custom event to trigger. If
	 *      null no trigger is fired
	 *  @param {array} args Array of arguments to pass to the callback function /
	 *      trigger
	 *  @memberof DataTable#oApi
	 */
	function _fnCallbackFire( settings, callbackArr, eventName, args )
	{
		var ret = [];

		if ( callbackArr ) {
			ret = $.map( settings[callbackArr].slice().reverse(), function (val, i) {
				return val.fn.apply( settings.oInstance, args );
			} );
		}

		if ( eventName !== null ) {
			var e = $.Event( eventName+'.dt' );

			$(settings.nTable).trigger( e, args );

			ret.push( e.result );
		}

		return ret;
	}


	function _fnLengthOverflow ( settings )
	{
		var
			start = settings._iDisplayStart,
			end = settings.fnDisplayEnd(),
			len = settings._iDisplayLength;

		/* If we have space to show extra rows (backing up from the end point - then do so */
		if ( start >= end )
		{
			start = end - len;
		}

		// Keep the start record on the current page
		start -= (start % len);

		if ( len === -1 || start < 0 )
		{
			start = 0;
		}

		settings._iDisplayStart = start;
	}


	function _fnRenderer( settings, type )
	{
		var renderer = settings.renderer;
		var host = DataTable.ext.renderer[type];

		if ( $.isPlainObject( renderer ) && renderer[type] ) {
			// Specific renderer for this type. If available use it, otherwise use
			// the default.
			return host[renderer[type]] || host._;
		}
		else if ( typeof renderer === 'string' ) {
			// Common renderer - if there is one available for this type use it,
			// otherwise use the default
			return host[renderer] || host._;
		}

		// Use the default
		return host._;
	}


	/**
	 * Detect the data source being used for the table. Used to simplify the code
	 * a little (ajax) and to make it compress a little smaller.
	 *
	 *  @param {object} settings dataTables settings object
	 *  @returns {string} Data source
	 *  @memberof DataTable#oApi
	 */
	function _fnDataSource ( settings )
	{
		if ( settings.oFeatures.bServerSide ) {
			return 'ssp';
		}
		else if ( settings.ajax || settings.sAjaxSource ) {
			return 'ajax';
		}
		return 'dom';
	}




	/**
	 * Computed structure of the DataTables API, defined by the options passed to
	 * `DataTable.Api.register()` when building the API.
	 *
	 * The structure is built in order to speed creation and extension of the Api
	 * objects since the extensions are effectively pre-parsed.
	 *
	 * The array is an array of objects with the following structure, where this
	 * base array represents the Api prototype base:
	 *
	 *     [
	 *       {
	 *         name:      'data'                -- string   - Property name
	 *         val:       function () {},       -- function - Api method (or undefined if just an object
	 *         methodExt: [ ... ],              -- array    - Array of Api object definitions to extend the method result
	 *         propExt:   [ ... ]               -- array    - Array of Api object definitions to extend the property
	 *       },
	 *       {
	 *         name:     'row'
	 *         val:       {},
	 *         methodExt: [ ... ],
	 *         propExt:   [
	 *           {
	 *             name:      'data'
	 *             val:       function () {},
	 *             methodExt: [ ... ],
	 *             propExt:   [ ... ]
	 *           },
	 *           ...
	 *         ]
	 *       }
	 *     ]
	 *
	 * @type {Array}
	 * @ignore
	 */
	var __apiStruct = [];


	/**
	 * `Array.prototype` reference.
	 *
	 * @type object
	 * @ignore
	 */
	var __arrayProto = Array.prototype;


	/**
	 * Abstraction for `context` parameter of the `Api` constructor to allow it to
	 * take several different forms for ease of use.
	 *
	 * Each of the input parameter types will be converted to a DataTables settings
	 * object where possible.
	 *
	 * @param  {string|node|jQuery|object} mixed DataTable identifier. Can be one
	 *   of:
	 *
	 *   * `string` - jQuery selector. Any DataTables' matching the given selector
	 *     with be found and used.
	 *   * `node` - `TABLE` node which has already been formed into a DataTable.
	 *   * `jQuery` - A jQuery object of `TABLE` nodes.
	 *   * `object` - DataTables settings object
	 *   * `DataTables.Api` - API instance
	 * @return {array|null} Matching DataTables settings objects. `null` or
	 *   `undefined` is returned if no matching DataTable is found.
	 * @ignore
	 */
	var _toSettings = function ( mixed )
	{
		var idx, jq;
		var settings = DataTable.settings;
		var tables = $.map( settings, function (el, i) {
			return el.nTable;
		} );

		if ( ! mixed ) {
			return [];
		}
		else if ( mixed.nTable && mixed.oApi ) {
			// DataTables settings object
			return [ mixed ];
		}
		else if ( mixed.nodeName && mixed.nodeName.toLowerCase() === 'table' ) {
			// Table node
			idx = $.inArray( mixed, tables );
			return idx !== -1 ? [ settings[idx] ] : null;
		}
		else if ( mixed && typeof mixed.settings === 'function' ) {
			return mixed.settings().toArray();
		}
		else if ( typeof mixed === 'string' ) {
			// jQuery selector
			jq = $(mixed);
		}
		else if ( mixed instanceof $ ) {
			// jQuery object (also DataTables instance)
			jq = mixed;
		}

		if ( jq ) {
			return jq.map( function(i) {
				idx = $.inArray( this, tables );
				return idx !== -1 ? settings[idx] : null;
			} ).toArray();
		}
	};


	/**
	 * DataTables API class - used to control and interface with  one or more
	 * DataTables enhanced tables.
	 *
	 * The API class is heavily based on jQuery, presenting a chainable interface
	 * that you can use to interact with tables. Each instance of the API class has
	 * a "context" - i.e. the tables that it will operate on. This could be a single
	 * table, all tables on a page or a sub-set thereof.
	 *
	 * Additionally the API is designed to allow you to easily work with the data in
	 * the tables, retrieving and manipulating it as required. This is done by
	 * presenting the API class as an array like interface. The contents of the
	 * array depend upon the actions requested by each method (for example
	 * `rows().nodes()` will return an array of nodes, while `rows().data()` will
	 * return an array of objects or arrays depending upon your table's
	 * configuration). The API object has a number of array like methods (`push`,
	 * `pop`, `reverse` etc) as well as additional helper methods (`each`, `pluck`,
	 * `unique` etc) to assist your working with the data held in a table.
	 *
	 * Most methods (those which return an Api instance) are chainable, which means
	 * the return from a method call also has all of the methods available that the
	 * top level object had. For example, these two calls are equivalent:
	 *
	 *     // Not chained
	 *     api.row.add( {...} );
	 *     api.draw();
	 *
	 *     // Chained
	 *     api.row.add( {...} ).draw();
	 *
	 * @class DataTable.Api
	 * @param {array|object|string|jQuery} context DataTable identifier. This is
	 *   used to define which DataTables enhanced tables this API will operate on.
	 *   Can be one of:
	 *
	 *   * `string` - jQuery selector. Any DataTables' matching the given selector
	 *     with be found and used.
	 *   * `node` - `TABLE` node which has already been formed into a DataTable.
	 *   * `jQuery` - A jQuery object of `TABLE` nodes.
	 *   * `object` - DataTables settings object
	 * @param {array} [data] Data to initialise the Api instance with.
	 *
	 * @example
	 *   // Direct initialisation during DataTables construction
	 *   var api = $('#example').DataTable();
	 *
	 * @example
	 *   // Initialisation using a DataTables jQuery object
	 *   var api = $('#example').dataTable().api();
	 *
	 * @example
	 *   // Initialisation as a constructor
	 *   var api = new $.fn.DataTable.Api( 'table.dataTable' );
	 */
	_Api = function ( context, data )
	{
		if ( ! (this instanceof _Api) ) {
			return new _Api( context, data );
		}

		var settings = [];
		var ctxSettings = function ( o ) {
			var a = _toSettings( o );
			if ( a ) {
				settings = settings.concat( a );
			}
		};

		if ( $.isArray( context ) ) {
			for ( var i=0, ien=context.length ; i<ien ; i++ ) {
				ctxSettings( context[i] );
			}
		}
		else {
			ctxSettings( context );
		}

		// Remove duplicates
		this.context = _unique( settings );

		// Initial data
		if ( data ) {
			$.merge( this, data );
		}

		// selector
		this.selector = {
			rows: null,
			cols: null,
			opts: null
		};

		_Api.extend( this, this, __apiStruct );
	};

	DataTable.Api = _Api;

	// Don't destroy the existing prototype, just extend it. Required for jQuery 2's
	// isPlainObject.
	$.extend( _Api.prototype, {
		any: function ()
		{
			return this.count() !== 0;
		},


		concat:  __arrayProto.concat,


		context: [], // array of table settings objects


		count: function ()
		{
			return this.flatten().length;
		},


		each: function ( fn )
		{
			for ( var i=0, ien=this.length ; i<ien; i++ ) {
				fn.call( this, this[i], i, this );
			}

			return this;
		},


		eq: function ( idx )
		{
			var ctx = this.context;

			return ctx.length > idx ?
				new _Api( ctx[idx], this[idx] ) :
				null;
		},


		filter: function ( fn )
		{
			var a = [];

			if ( __arrayProto.filter ) {
				a = __arrayProto.filter.call( this, fn, this );
			}
			else {
				// Compatibility for browsers without EMCA-252-5 (JS 1.6)
				for ( var i=0, ien=this.length ; i<ien ; i++ ) {
					if ( fn.call( this, this[i], i, this ) ) {
						a.push( this[i] );
					}
				}
			}

			return new _Api( this.context, a );
		},


		flatten: function ()
		{
			var a = [];
			return new _Api( this.context, a.concat.apply( a, this.toArray() ) );
		},


		join:    __arrayProto.join,


		indexOf: __arrayProto.indexOf || function (obj, start)
		{
			for ( var i=(start || 0), ien=this.length ; i<ien ; i++ ) {
				if ( this[i] === obj ) {
					return i;
				}
			}
			return -1;
		},

		iterator: function ( flatten, type, fn, alwaysNew ) {
			var
				a = [], ret,
				i, ien, j, jen,
				context = this.context,
				rows, items, item,
				selector = this.selector;

			// Argument shifting
			if ( typeof flatten === 'string' ) {
				alwaysNew = fn;
				fn = type;
				type = flatten;
				flatten = false;
			}

			for ( i=0, ien=context.length ; i<ien ; i++ ) {
				var apiInst = new _Api( context[i] );

				if ( type === 'table' ) {
					ret = fn.call( apiInst, context[i], i );

					if ( ret !== undefined ) {
						a.push( ret );
					}
				}
				else if ( type === 'columns' || type === 'rows' ) {
					// this has same length as context - one entry for each table
					ret = fn.call( apiInst, context[i], this[i], i );

					if ( ret !== undefined ) {
						a.push( ret );
					}
				}
				else if ( type === 'column' || type === 'column-rows' || type === 'row' || type === 'cell' ) {
					// columns and rows share the same structure.
					// 'this' is an array of column indexes for each context
					items = this[i];

					if ( type === 'column-rows' ) {
						rows = _selector_row_indexes( context[i], selector.opts );
					}

					for ( j=0, jen=items.length ; j<jen ; j++ ) {
						item = items[j];

						if ( type === 'cell' ) {
							ret = fn.call( apiInst, context[i], item.row, item.column, i, j );
						}
						else {
							ret = fn.call( apiInst, context[i], item, i, j, rows );
						}

						if ( ret !== undefined ) {
							a.push( ret );
						}
					}
				}
			}

			if ( a.length || alwaysNew ) {
				var api = new _Api( context, flatten ? a.concat.apply( [], a ) : a );
				var apiSelector = api.selector;
				apiSelector.rows = selector.rows;
				apiSelector.cols = selector.cols;
				apiSelector.opts = selector.opts;
				return api;
			}
			return this;
		},


		lastIndexOf: __arrayProto.lastIndexOf || function (obj, start)
		{
			// Bit cheeky...
			return this.indexOf.apply( this.toArray.reverse(), arguments );
		},


		length:  0,


		map: function ( fn )
		{
			var a = [];

			if ( __arrayProto.map ) {
				a = __arrayProto.map.call( this, fn, this );
			}
			else {
				// Compatibility for browsers without EMCA-252-5 (JS 1.6)
				for ( var i=0, ien=this.length ; i<ien ; i++ ) {
					a.push( fn.call( this, this[i], i ) );
				}
			}

			return new _Api( this.context, a );
		},


		pluck: function ( prop )
		{
			return this.map( function ( el ) {
				return el[ prop ];
			} );
		},

		pop:     __arrayProto.pop,


		push:    __arrayProto.push,


		// Does not return an API instance
		reduce: __arrayProto.reduce || function ( fn, init )
		{
			return _fnReduce( this, fn, init, 0, this.length, 1 );
		},


		reduceRight: __arrayProto.reduceRight || function ( fn, init )
		{
			return _fnReduce( this, fn, init, this.length-1, -1, -1 );
		},


		reverse: __arrayProto.reverse,


		// Object with rows, columns and opts
		selector: null,


		shift:   __arrayProto.shift,


		slice: function () {
			return new _Api( this.context, this );
		},


		sort:    __arrayProto.sort, // ? name - order?


		splice:  __arrayProto.splice,


		toArray: function ()
		{
			return __arrayProto.slice.call( this );
		},


		to$: function ()
		{
			return $( this );
		},


		toJQuery: function ()
		{
			return $( this );
		},


		unique: function ()
		{
			return new _Api( this.context, _unique(this) );
		},


		unshift: __arrayProto.unshift
	} );


	_Api.extend = function ( scope, obj, ext )
	{
		// Only extend API instances and static properties of the API
		if ( ! ext.length || ! obj || ( ! (obj instanceof _Api) && ! obj.__dt_wrapper ) ) {
			return;
		}

		var
			i, ien,
			j, jen,
			struct, inner,
			methodScoping = function ( scope, fn, struc ) {
				return function () {
					var ret = fn.apply( scope, arguments );

					// Method extension
					_Api.extend( ret, ret, struc.methodExt );
					return ret;
				};
			};

		for ( i=0, ien=ext.length ; i<ien ; i++ ) {
			struct = ext[i];

			// Value
			obj[ struct.name ] = typeof struct.val === 'function' ?
				methodScoping( scope, struct.val, struct ) :
				$.isPlainObject( struct.val ) ?
					{} :
					struct.val;

			obj[ struct.name ].__dt_wrapper = true;

			// Property extension
			_Api.extend( scope, obj[ struct.name ], struct.propExt );
		}
	};


	// @todo - Is there need for an augment function?
	// _Api.augment = function ( inst, name )
	// {
	// 	// Find src object in the structure from the name
	// 	var parts = name.split('.');

	// 	_Api.extend( inst, obj );
	// };


	//     [
	//       {
	//         name:      'data'                -- string   - Property name
	//         val:       function () {},       -- function - Api method (or undefined if just an object
	//         methodExt: [ ... ],              -- array    - Array of Api object definitions to extend the method result
	//         propExt:   [ ... ]               -- array    - Array of Api object definitions to extend the property
	//       },
	//       {
	//         name:     'row'
	//         val:       {},
	//         methodExt: [ ... ],
	//         propExt:   [
	//           {
	//             name:      'data'
	//             val:       function () {},
	//             methodExt: [ ... ],
	//             propExt:   [ ... ]
	//           },
	//           ...
	//         ]
	//       }
	//     ]

	_Api.register = _api_register = function ( name, val )
	{
		if ( $.isArray( name ) ) {
			for ( var j=0, jen=name.length ; j<jen ; j++ ) {
				_Api.register( name[j], val );
			}
			return;
		}

		var
			i, ien,
			heir = name.split('.'),
			struct = __apiStruct,
			key, method;

		var find = function ( src, name ) {
			for ( var i=0, ien=src.length ; i<ien ; i++ ) {
				if ( src[i].name === name ) {
					return src[i];
				}
			}
			return null;
		};

		for ( i=0, ien=heir.length ; i<ien ; i++ ) {
			method = heir[i].indexOf('()') !== -1;
			key = method ?
				heir[i].replace('()', '') :
				heir[i];

			var src = find( struct, key );
			if ( ! src ) {
				src = {
					name:      key,
					val:       {},
					methodExt: [],
					propExt:   []
				};
				struct.push( src );
			}

			if ( i === ien-1 ) {
				src.val = val;
			}
			else {
				struct = method ?
					src.methodExt :
					src.propExt;
			}
		}
	};


	_Api.registerPlural = _api_registerPlural = function ( pluralName, singularName, val ) {
		_Api.register( pluralName, val );

		_Api.register( singularName, function () {
			var ret = val.apply( this, arguments );

			if ( ret === this ) {
				// Returned item is the API instance that was passed in, return it
				return this;
			}
			else if ( ret instanceof _Api ) {
				// New API instance returned, want the value from the first item
				// in the returned array for the singular result.
				return ret.length ?
					$.isArray( ret[0] ) ?
						new _Api( ret.context, ret[0] ) : // Array results are 'enhanced'
						ret[0] :
					undefined;
			}

			// Non-API return - just fire it back
			return ret;
		} );
	};


	/**
	 * Selector for HTML tables. Apply the given selector to the give array of
	 * DataTables settings objects.
	 *
	 * @param {string|integer} [selector] jQuery selector string or integer
	 * @param  {array} Array of DataTables settings objects to be filtered
	 * @return {array}
	 * @ignore
	 */
	var __table_selector = function ( selector, a )
	{
		// Integer is used to pick out a table by index
		if ( typeof selector === 'number' ) {
			return [ a[ selector ] ];
		}

		// Perform a jQuery selector on the table nodes
		var nodes = $.map( a, function (el, i) {
			return el.nTable;
		} );

		return $(nodes)
			.filter( selector )
			.map( function (i) {
				// Need to translate back from the table node to the settings
				var idx = $.inArray( this, nodes );
				return a[ idx ];
			} )
			.toArray();
	};



	/**
	 * Context selector for the API's context (i.e. the tables the API instance
	 * refers to.
	 *
	 * @name    DataTable.Api#tables
	 * @param {string|integer} [selector] Selector to pick which tables the iterator
	 *   should operate on. If not given, all tables in the current context are
	 *   used. This can be given as a jQuery selector (for example `':gt(0)'`) to
	 *   select multiple tables or as an integer to select a single table.
	 * @returns {DataTable.Api} Returns a new API instance if a selector is given.
	 */
	_api_register( 'tables()', function ( selector ) {
		// A new instance is created if there was a selector specified
		return selector ?
			new _Api( __table_selector( selector, this.context ) ) :
			this;
	} );


	_api_register( 'table()', function ( selector ) {
		var tables = this.tables( selector );
		var ctx = tables.context;

		// Truncate to the first matched table
		return ctx.length ?
			new _Api( ctx[0] ) :
			tables;
	} );


	_api_registerPlural( 'tables().nodes()', 'table().node()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTable;
		}, 1 );
	} );


	_api_registerPlural( 'tables().body()', 'table().body()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTBody;
		}, 1 );
	} );


	_api_registerPlural( 'tables().header()', 'table().header()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTHead;
		}, 1 );
	} );


	_api_registerPlural( 'tables().footer()', 'table().footer()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTFoot;
		}, 1 );
	} );


	_api_registerPlural( 'tables().containers()', 'table().container()' , function () {
		return this.iterator( 'table', function ( ctx ) {
			return ctx.nTableWrapper;
		}, 1 );
	} );



	/**
	 * Redraw the tables in the current context.
	 */
	_api_register( 'draw()', function ( paging ) {
		return this.iterator( 'table', function ( settings ) {
			if ( paging === 'page' ) {
				_fnDraw( settings );
			}
			else {
				if ( typeof paging === 'string' ) {
					paging = paging === 'full-hold' ?
						false :
						true;
				}

				_fnReDraw( settings, paging===false );
			}
		} );
	} );



	/**
	 * Get the current page index.
	 *
	 * @return {integer} Current page index (zero based)
	 *//**
	 * Set the current page.
	 *
	 * Note that if you attempt to show a page which does not exist, DataTables will
	 * not throw an error, but rather reset the paging.
	 *
	 * @param {integer|string} action The paging action to take. This can be one of:
	 *  * `integer` - The page index to jump to
	 *  * `string` - An action to take:
	 *    * `first` - Jump to first page.
	 *    * `next` - Jump to the next page
	 *    * `previous` - Jump to previous page
	 *    * `last` - Jump to the last page.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'page()', function ( action ) {
		if ( action === undefined ) {
			return this.page.info().page; // not an expensive call
		}

		// else, have an action to take on all tables
		return this.iterator( 'table', function ( settings ) {
			_fnPageChange( settings, action );
		} );
	} );


	/**
	 * Paging information for the first table in the current context.
	 *
	 * If you require paging information for another table, use the `table()` method
	 * with a suitable selector.
	 *
	 * @return {object} Object with the following properties set:
	 *  * `page` - Current page index (zero based - i.e. the first page is `0`)
	 *  * `pages` - Total number of pages
	 *  * `start` - Display index for the first record shown on the current page
	 *  * `end` - Display index for the last record shown on the current page
	 *  * `length` - Display length (number of records). Note that generally `start
	 *    + length = end`, but this is not always true, for example if there are
	 *    only 2 records to show on the final page, with a length of 10.
	 *  * `recordsTotal` - Full data set length
	 *  * `recordsDisplay` - Data set length once the current filtering criterion
	 *    are applied.
	 */
	_api_register( 'page.info()', function ( action ) {
		if ( this.context.length === 0 ) {
			return undefined;
		}

		var
			settings   = this.context[0],
			start      = settings._iDisplayStart,
			len        = settings.oFeatures.bPaginate ? settings._iDisplayLength : -1,
			visRecords = settings.fnRecordsDisplay(),
			all        = len === -1;

		return {
			"page":           all ? 0 : Math.floor( start / len ),
			"pages":          all ? 1 : Math.ceil( visRecords / len ),
			"start":          start,
			"end":            settings.fnDisplayEnd(),
			"length":         len,
			"recordsTotal":   settings.fnRecordsTotal(),
			"recordsDisplay": visRecords,
			"serverSide":     _fnDataSource( settings ) === 'ssp'
		};
	} );


	/**
	 * Get the current page length.
	 *
	 * @return {integer} Current page length. Note `-1` indicates that all records
	 *   are to be shown.
	 *//**
	 * Set the current page length.
	 *
	 * @param {integer} Page length to set. Use `-1` to show all records.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'page.len()', function ( len ) {
		// Note that we can't call this function 'length()' because `length`
		// is a Javascript property of functions which defines how many arguments
		// the function expects.
		if ( len === undefined ) {
			return this.context.length !== 0 ?
				this.context[0]._iDisplayLength :
				undefined;
		}

		// else, set the page length
		return this.iterator( 'table', function ( settings ) {
			_fnLengthChange( settings, len );
		} );
	} );



	var __reload = function ( settings, holdPosition, callback ) {
		// Use the draw event to trigger a callback
		if ( callback ) {
			var api = new _Api( settings );

			api.one( 'draw', function () {
				callback( api.ajax.json() );
			} );
		}

		if ( _fnDataSource( settings ) == 'ssp' ) {
			_fnReDraw( settings, holdPosition );
		}
		else {
			_fnProcessingDisplay( settings, true );

			// Cancel an existing request
			var xhr = settings.jqXHR;
			if ( xhr && xhr.readyState !== 4 ) {
				xhr.abort();
			}

			// Trigger xhr
			_fnBuildAjax( settings, [], function( json ) {
				_fnClearTable( settings );

				var data = _fnAjaxDataSrc( settings, json );
				for ( var i=0, ien=data.length ; i<ien ; i++ ) {
					_fnAddData( settings, data[i] );
				}

				_fnReDraw( settings, holdPosition );
				_fnProcessingDisplay( settings, false );
			} );
		}
	};


	/**
	 * Get the JSON response from the last Ajax request that DataTables made to the
	 * server. Note that this returns the JSON from the first table in the current
	 * context.
	 *
	 * @return {object} JSON received from the server.
	 */
	_api_register( 'ajax.json()', function () {
		var ctx = this.context;

		if ( ctx.length > 0 ) {
			return ctx[0].json;
		}

		// else return undefined;
	} );


	/**
	 * Get the data submitted in the last Ajax request
	 */
	_api_register( 'ajax.params()', function () {
		var ctx = this.context;

		if ( ctx.length > 0 ) {
			return ctx[0].oAjaxData;
		}

		// else return undefined;
	} );


	/**
	 * Reload tables from the Ajax data source. Note that this function will
	 * automatically re-draw the table when the remote data has been loaded.
	 *
	 * @param {boolean} [reset=true] Reset (default) or hold the current paging
	 *   position. A full re-sort and re-filter is performed when this method is
	 *   called, which is why the pagination reset is the default action.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'ajax.reload()', function ( callback, resetPaging ) {
		return this.iterator( 'table', function (settings) {
			__reload( settings, resetPaging===false, callback );
		} );
	} );


	/**
	 * Get the current Ajax URL. Note that this returns the URL from the first
	 * table in the current context.
	 *
	 * @return {string} Current Ajax source URL
	 *//**
	 * Set the Ajax URL. Note that this will set the URL for all tables in the
	 * current context.
	 *
	 * @param {string} url URL to set.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'ajax.url()', function ( url ) {
		var ctx = this.context;

		if ( url === undefined ) {
			// get
			if ( ctx.length === 0 ) {
				return undefined;
			}
			ctx = ctx[0];

			return ctx.ajax ?
				$.isPlainObject( ctx.ajax ) ?
					ctx.ajax.url :
					ctx.ajax :
				ctx.sAjaxSource;
		}

		// set
		return this.iterator( 'table', function ( settings ) {
			if ( $.isPlainObject( settings.ajax ) ) {
				settings.ajax.url = url;
			}
			else {
				settings.ajax = url;
			}
			// No need to consider sAjaxSource here since DataTables gives priority
			// to `ajax` over `sAjaxSource`. So setting `ajax` here, renders any
			// value of `sAjaxSource` redundant.
		} );
	} );


	/**
	 * Load data from the newly set Ajax URL. Note that this method is only
	 * available when `ajax.url()` is used to set a URL. Additionally, this method
	 * has the same effect as calling `ajax.reload()` but is provided for
	 * convenience when setting a new URL. Like `ajax.reload()` it will
	 * automatically redraw the table once the remote data has been loaded.
	 *
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'ajax.url().load()', function ( callback, resetPaging ) {
		// Same as a reload, but makes sense to present it for easy access after a
		// url change
		return this.iterator( 'table', function ( ctx ) {
			__reload( ctx, resetPaging===false, callback );
		} );
	} );




	var _selector_run = function ( type, selector, selectFn, settings, opts )
	{
		var
			out = [], res,
			a, i, ien, j, jen,
			selectorType = typeof selector;

		// Can't just check for isArray here, as an API or jQuery instance might be
		// given with their array like look
		if ( ! selector || selectorType === 'string' || selectorType === 'function' || selector.length === undefined ) {
			selector = [ selector ];
		}

		for ( i=0, ien=selector.length ; i<ien ; i++ ) {
			// Only split on simple strings - complex expressions will be jQuery selectors
			a = selector[i] && selector[i].split && ! selector[i].match(/[\[\(:]/) ?
				selector[i].split(',') :
				[ selector[i] ];

			for ( j=0, jen=a.length ; j<jen ; j++ ) {
				res = selectFn( typeof a[j] === 'string' ? $.trim(a[j]) : a[j] );

				if ( res && res.length ) {
					out = out.concat( res );
				}
			}
		}

		// selector extensions
		var ext = _ext.selector[ type ];
		if ( ext.length ) {
			for ( i=0, ien=ext.length ; i<ien ; i++ ) {
				out = ext[i]( settings, opts, out );
			}
		}

		return _unique( out );
	};


	var _selector_opts = function ( opts )
	{
		if ( ! opts ) {
			opts = {};
		}

		// Backwards compatibility for 1.9- which used the terminology filter rather
		// than search
		if ( opts.filter && opts.search === undefined ) {
			opts.search = opts.filter;
		}

		return $.extend( {
			search: 'none',
			order: 'current',
			page: 'all'
		}, opts );
	};


	var _selector_first = function ( inst )
	{
		// Reduce the API instance to the first item found
		for ( var i=0, ien=inst.length ; i<ien ; i++ ) {
			if ( inst[i].length > 0 ) {
				// Assign the first element to the first item in the instance
				// and truncate the instance and context
				inst[0] = inst[i];
				inst[0].length = 1;
				inst.length = 1;
				inst.context = [ inst.context[i] ];

				return inst;
			}
		}

		// Not found - return an empty instance
		inst.length = 0;
		return inst;
	};


	var _selector_row_indexes = function ( settings, opts )
	{
		var
			i, ien, tmp, a=[],
			displayFiltered = settings.aiDisplay,
			displayMaster = settings.aiDisplayMaster;

		var
			search = opts.search,  // none, applied, removed
			order  = opts.order,   // applied, current, index (original - compatibility with 1.9)
			page   = opts.page;    // all, current

		if ( _fnDataSource( settings ) == 'ssp' ) {
			// In server-side processing mode, most options are irrelevant since
			// rows not shown don't exist and the index order is the applied order
			// Removed is a special case - for consistency just return an empty
			// array
			return search === 'removed' ?
				[] :
				_range( 0, displayMaster.length );
		}
		else if ( page == 'current' ) {
			// Current page implies that order=current and fitler=applied, since it is
			// fairly senseless otherwise, regardless of what order and search actually
			// are
			for ( i=settings._iDisplayStart, ien=settings.fnDisplayEnd() ; i<ien ; i++ ) {
				a.push( displayFiltered[i] );
			}
		}
		else if ( order == 'current' || order == 'applied' ) {
			if ( search == 'none') {
				a = displayMaster.slice();
			}
			else if ( search == 'applied' ) {
				a = displayFiltered.slice();
			}
			else if ( search == 'removed' ) {
				// O(n+m) solution by creating a hash map
				var displayFilteredMap = {};

				for ( var i=0, ien=displayFiltered.length ; i<ien ; i++ ) {
					displayFilteredMap[displayFiltered[i]] = null;
				}

				a = $.map( displayMaster, function (el) {
					return ! displayFilteredMap.hasOwnProperty(el) ?
						el :
						null;
				} );
			}
		}
		else if ( order == 'index' || order == 'original' ) {
			for ( i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
				if ( search == 'none' ) {
					a.push( i );
				}
				else { // applied | removed
					tmp = $.inArray( i, displayFiltered );

					if ((tmp === -1 && search == 'removed') ||
						(tmp >= 0   && search == 'applied') )
					{
						a.push( i );
					}
				}
			}
		}

		return a;
	};


	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Rows
	 *
	 * {}          - no selector - use all available rows
	 * {integer}   - row aoData index
	 * {node}      - TR node
	 * {string}    - jQuery selector to apply to the TR elements
	 * {array}     - jQuery array of nodes, or simply an array of TR nodes
	 *
	 */
	var __row_selector = function ( settings, selector, opts )
	{
		var rows;
		var run = function ( sel ) {
			var selInt = _intVal( sel );
			var i, ien;
			var aoData = settings.aoData;

			// Short cut - selector is a number and no options provided (default is
			// all records, so no need to check if the index is in there, since it
			// must be - dev error if the index doesn't exist).
			if ( selInt !== null && ! opts ) {
				return [ selInt ];
			}

			if ( ! rows ) {
				rows = _selector_row_indexes( settings, opts );
			}

			if ( selInt !== null && $.inArray( selInt, rows ) !== -1 ) {
				// Selector - integer
				return [ selInt ];
			}
			else if ( sel === null || sel === undefined || sel === '' ) {
				// Selector - none
				return rows;
			}

			// Selector - function
			if ( typeof sel === 'function' ) {
				return $.map( rows, function (idx) {
					var row = aoData[ idx ];
					return sel( idx, row._aData, row.nTr ) ? idx : null;
				} );
			}

			// Selector - node
			if ( sel.nodeName ) {
				var rowIdx = sel._DT_RowIndex;  // Property added by DT for fast lookup
				var cellIdx = sel._DT_CellIndex;

				if ( rowIdx !== undefined ) {
					// Make sure that the row is actually still present in the table
					return aoData[ rowIdx ] && aoData[ rowIdx ].nTr === sel ?
						[ rowIdx ] :
						[];
				}
				else if ( cellIdx ) {
					return aoData[ cellIdx.row ] && aoData[ cellIdx.row ].nTr === sel ?
						[ cellIdx.row ] :
						[];
				}
				else {
					var host = $(sel).closest('*[data-dt-row]');
					return host.length ?
						[ host.data('dt-row') ] :
						[];
				}
			}

			// ID selector. Want to always be able to select rows by id, regardless
			// of if the tr element has been created or not, so can't rely upon
			// jQuery here - hence a custom implementation. This does not match
			// Sizzle's fast selector or HTML4 - in HTML5 the ID can be anything,
			// but to select it using a CSS selector engine (like Sizzle or
			// querySelect) it would need to need to be escaped for some characters.
			// DataTables simplifies this for row selectors since you can select
			// only a row. A # indicates an id any anything that follows is the id -
			// unescaped.
			if ( typeof sel === 'string' && sel.charAt(0) === '#' ) {
				// get row index from id
				var rowObj = settings.aIds[ sel.replace( /^#/, '' ) ];
				if ( rowObj !== undefined ) {
					return [ rowObj.idx ];
				}

				// need to fall through to jQuery in case there is DOM id that
				// matches
			}

			// Get nodes in the order from the `rows` array with null values removed
			var nodes = _removeEmpty(
				_pluck_order( settings.aoData, rows, 'nTr' )
			);

			// Selector - jQuery selector string, array of nodes or jQuery object/
			// As jQuery's .filter() allows jQuery objects to be passed in filter,
			// it also allows arrays, so this will cope with all three options
			return $(nodes)
				.filter( sel )
				.map( function () {
					return this._DT_RowIndex;
				} )
				.toArray();
		};

		return _selector_run( 'row', selector, run, settings, opts );
	};


	_api_register( 'rows()', function ( selector, opts ) {
		// argument shifting
		if ( selector === undefined ) {
			selector = '';
		}
		else if ( $.isPlainObject( selector ) ) {
			opts = selector;
			selector = '';
		}

		opts = _selector_opts( opts );

		var inst = this.iterator( 'table', function ( settings ) {
			return __row_selector( settings, selector, opts );
		}, 1 );

		// Want argument shifting here and in __row_selector?
		inst.selector.rows = selector;
		inst.selector.opts = opts;

		return inst;
	} );

	_api_register( 'rows().nodes()', function () {
		return this.iterator( 'row', function ( settings, row ) {
			return settings.aoData[ row ].nTr || undefined;
		}, 1 );
	} );

	_api_register( 'rows().data()', function () {
		return this.iterator( true, 'rows', function ( settings, rows ) {
			return _pluck_order( settings.aoData, rows, '_aData' );
		}, 1 );
	} );

	_api_registerPlural( 'rows().cache()', 'row().cache()', function ( type ) {
		return this.iterator( 'row', function ( settings, row ) {
			var r = settings.aoData[ row ];
			return type === 'search' ? r._aFilterData : r._aSortData;
		}, 1 );
	} );

	_api_registerPlural( 'rows().invalidate()', 'row().invalidate()', function ( src ) {
		return this.iterator( 'row', function ( settings, row ) {
			_fnInvalidate( settings, row, src );
		} );
	} );

	_api_registerPlural( 'rows().indexes()', 'row().index()', function () {
		return this.iterator( 'row', function ( settings, row ) {
			return row;
		}, 1 );
	} );

	_api_registerPlural( 'rows().ids()', 'row().id()', function ( hash ) {
		var a = [];
		var context = this.context;

		// `iterator` will drop undefined values, but in this case we want them
		for ( var i=0, ien=context.length ; i<ien ; i++ ) {
			for ( var j=0, jen=this[i].length ; j<jen ; j++ ) {
				var id = context[i].rowIdFn( context[i].aoData[ this[i][j] ]._aData );
				a.push( (hash === true ? '#' : '' )+ id );
			}
		}

		return new _Api( context, a );
	} );

	_api_registerPlural( 'rows().remove()', 'row().remove()', function () {
		var that = this;

		this.iterator( 'row', function ( settings, row, thatIdx ) {
			var data = settings.aoData;
			var rowData = data[ row ];
			var i, ien, j, jen;
			var loopRow, loopCells;

			data.splice( row, 1 );

			// Update the cached indexes
			for ( i=0, ien=data.length ; i<ien ; i++ ) {
				loopRow = data[i];
				loopCells = loopRow.anCells;

				// Rows
				if ( loopRow.nTr !== null ) {
					loopRow.nTr._DT_RowIndex = i;
				}

				// Cells
				if ( loopCells !== null ) {
					for ( j=0, jen=loopCells.length ; j<jen ; j++ ) {
						loopCells[j]._DT_CellIndex.row = i;
					}
				}
			}

			// Delete from the display arrays
			_fnDeleteIndex( settings.aiDisplayMaster, row );
			_fnDeleteIndex( settings.aiDisplay, row );
			_fnDeleteIndex( that[ thatIdx ], row, false ); // maintain local indexes

			// For server-side processing tables - subtract the deleted row from the count
			if ( settings._iRecordsDisplay > 0 ) {
				settings._iRecordsDisplay--;
			}

			// Check for an 'overflow' they case for displaying the table
			_fnLengthOverflow( settings );

			// Remove the row's ID reference if there is one
			var id = settings.rowIdFn( rowData._aData );
			if ( id !== undefined ) {
				delete settings.aIds[ id ];
			}
		} );

		this.iterator( 'table', function ( settings ) {
			for ( var i=0, ien=settings.aoData.length ; i<ien ; i++ ) {
				settings.aoData[i].idx = i;
			}
		} );

		return this;
	} );


	_api_register( 'rows.add()', function ( rows ) {
		var newRows = this.iterator( 'table', function ( settings ) {
				var row, i, ien;
				var out = [];

				for ( i=0, ien=rows.length ; i<ien ; i++ ) {
					row = rows[i];

					if ( row.nodeName && row.nodeName.toUpperCase() === 'TR' ) {
						out.push( _fnAddTr( settings, row )[0] );
					}
					else {
						out.push( _fnAddData( settings, row ) );
					}
				}

				return out;
			}, 1 );

		// Return an Api.rows() extended instance, so rows().nodes() etc can be used
		var modRows = this.rows( -1 );
		modRows.pop();
		$.merge( modRows, newRows );

		return modRows;
	} );





	/**
	 *
	 */
	_api_register( 'row()', function ( selector, opts ) {
		return _selector_first( this.rows( selector, opts ) );
	} );


	_api_register( 'row().data()', function ( data ) {
		var ctx = this.context;

		if ( data === undefined ) {
			// Get
			return ctx.length && this.length ?
				ctx[0].aoData[ this[0] ]._aData :
				undefined;
		}

		// Set
		var row = ctx[0].aoData[ this[0] ];
		row._aData = data;

		// If the DOM has an id, and the data source is an array
		if ( $.isArray( data ) && row.nTr.id ) {
			_fnSetObjectDataFn( ctx[0].rowId )( data, row.nTr.id );
		}

		// Automatically invalidate
		_fnInvalidate( ctx[0], this[0], 'data' );

		return this;
	} );


	_api_register( 'row().node()', function () {
		var ctx = this.context;

		return ctx.length && this.length ?
			ctx[0].aoData[ this[0] ].nTr || null :
			null;
	} );


	_api_register( 'row.add()', function ( row ) {
		// Allow a jQuery object to be passed in - only a single row is added from
		// it though - the first element in the set
		if ( row instanceof $ && row.length ) {
			row = row[0];
		}

		var rows = this.iterator( 'table', function ( settings ) {
			if ( row.nodeName && row.nodeName.toUpperCase() === 'TR' ) {
				return _fnAddTr( settings, row )[0];
			}
			return _fnAddData( settings, row );
		} );

		// Return an Api.rows() extended instance, with the newly added row selected
		return this.row( rows[0] );
	} );



	var __details_add = function ( ctx, row, data, klass )
	{
		// Convert to array of TR elements
		var rows = [];
		var addRow = function ( r, k ) {
			// Recursion to allow for arrays of jQuery objects
			if ( $.isArray( r ) || r instanceof $ ) {
				for ( var i=0, ien=r.length ; i<ien ; i++ ) {
					addRow( r[i], k );
				}
				return;
			}

			// If we get a TR element, then just add it directly - up to the dev
			// to add the correct number of columns etc
			if ( r.nodeName && r.nodeName.toLowerCase() === 'tr' ) {
				rows.push( r );
			}
			else {
				// Otherwise create a row with a wrapper
				var created = $('<tr><td/></tr>').addClass( k );
				$('td', created)
					.addClass( k )
					.html( r )
					[0].colSpan = _fnVisbleColumns( ctx );

				rows.push( created[0] );
			}
		};

		addRow( data, klass );

		if ( row._details ) {
			row._details.detach();
		}

		row._details = $(rows);

		// If the children were already shown, that state should be retained
		if ( row._detailsShow ) {
			row._details.insertAfter( row.nTr );
		}
	};


	var __details_remove = function ( api, idx )
	{
		var ctx = api.context;

		if ( ctx.length ) {
			var row = ctx[0].aoData[ idx !== undefined ? idx : api[0] ];

			if ( row && row._details ) {
				row._details.remove();

				row._detailsShow = undefined;
				row._details = undefined;
			}
		}
	};


	var __details_display = function ( api, show ) {
		var ctx = api.context;

		if ( ctx.length && api.length ) {
			var row = ctx[0].aoData[ api[0] ];

			if ( row._details ) {
				row._detailsShow = show;

				if ( show ) {
					row._details.insertAfter( row.nTr );
				}
				else {
					row._details.detach();
				}

				__details_events( ctx[0] );
			}
		}
	};


	var __details_events = function ( settings )
	{
		var api = new _Api( settings );
		var namespace = '.dt.DT_details';
		var drawEvent = 'draw'+namespace;
		var colvisEvent = 'column-visibility'+namespace;
		var destroyEvent = 'destroy'+namespace;
		var data = settings.aoData;

		api.off( drawEvent +' '+ colvisEvent +' '+ destroyEvent );

		if ( _pluck( data, '_details' ).length > 0 ) {
			// On each draw, insert the required elements into the document
			api.on( drawEvent, function ( e, ctx ) {
				if ( settings !== ctx ) {
					return;
				}

				api.rows( {page:'current'} ).eq(0).each( function (idx) {
					// Internal data grab
					var row = data[ idx ];

					if ( row._detailsShow ) {
						row._details.insertAfter( row.nTr );
					}
				} );
			} );

			// Column visibility change - update the colspan
			api.on( colvisEvent, function ( e, ctx, idx, vis ) {
				if ( settings !== ctx ) {
					return;
				}

				// Update the colspan for the details rows (note, only if it already has
				// a colspan)
				var row, visible = _fnVisbleColumns( ctx );

				for ( var i=0, ien=data.length ; i<ien ; i++ ) {
					row = data[i];

					if ( row._details ) {
						row._details.children('td[colspan]').attr('colspan', visible );
					}
				}
			} );

			// Table destroyed - nuke any child rows
			api.on( destroyEvent, function ( e, ctx ) {
				if ( settings !== ctx ) {
					return;
				}

				for ( var i=0, ien=data.length ; i<ien ; i++ ) {
					if ( data[i]._details ) {
						__details_remove( api, i );
					}
				}
			} );
		}
	};

	// Strings for the method names to help minification
	var _emp = '';
	var _child_obj = _emp+'row().child';
	var _child_mth = _child_obj+'()';

	// data can be:
	//  tr
	//  string
	//  jQuery or array of any of the above
	_api_register( _child_mth, function ( data, klass ) {
		var ctx = this.context;

		if ( data === undefined ) {
			// get
			return ctx.length && this.length ?
				ctx[0].aoData[ this[0] ]._details :
				undefined;
		}
		else if ( data === true ) {
			// show
			this.child.show();
		}
		else if ( data === false ) {
			// remove
			__details_remove( this );
		}
		else if ( ctx.length && this.length ) {
			// set
			__details_add( ctx[0], ctx[0].aoData[ this[0] ], data, klass );
		}

		return this;
	} );


	_api_register( [
		_child_obj+'.show()',
		_child_mth+'.show()' // only when `child()` was called with parameters (without
	], function ( show ) {   // it returns an object and this method is not executed)
		__details_display( this, true );
		return this;
	} );


	_api_register( [
		_child_obj+'.hide()',
		_child_mth+'.hide()' // only when `child()` was called with parameters (without
	], function () {         // it returns an object and this method is not executed)
		__details_display( this, false );
		return this;
	} );


	_api_register( [
		_child_obj+'.remove()',
		_child_mth+'.remove()' // only when `child()` was called with parameters (without
	], function () {           // it returns an object and this method is not executed)
		__details_remove( this );
		return this;
	} );


	_api_register( _child_obj+'.isShown()', function () {
		var ctx = this.context;

		if ( ctx.length && this.length ) {
			// _detailsShown as false or undefined will fall through to return false
			return ctx[0].aoData[ this[0] ]._detailsShow || false;
		}
		return false;
	} );



	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
	 * Columns
	 *
	 * {integer}           - column index (>=0 count from left, <0 count from right)
	 * "{integer}:visIdx"  - visible column index (i.e. translate to column index)  (>=0 count from left, <0 count from right)
	 * "{integer}:visible" - alias for {integer}:visIdx  (>=0 count from left, <0 count from right)
	 * "{string}:name"     - column name
	 * "{string}"          - jQuery selector on column header nodes
	 *
	 */

	// can be an array of these items, comma separated list, or an array of comma
	// separated lists

	var __re_column_selector = /^([^:]+):(name|visIdx|visible)$/;


	// r1 and r2 are redundant - but it means that the parameters match for the
	// iterator callback in columns().data()
	var __columnData = function ( settings, column, r1, r2, rows ) {
		var a = [];
		for ( var row=0, ien=rows.length ; row<ien ; row++ ) {
			a.push( _fnGetCellData( settings, rows[row], column ) );
		}
		return a;
	};


	var __column_selector = function ( settings, selector, opts )
	{
		var
			columns = settings.aoColumns,
			names = _pluck( columns, 'sName' ),
			nodes = _pluck( columns, 'nTh' );

		var run = function ( s ) {
			var selInt = _intVal( s );

			// Selector - all
			if ( s === '' ) {
				return _range( columns.length );
			}

			// Selector - index
			if ( selInt !== null ) {
				return [ selInt >= 0 ?
					selInt : // Count from left
					columns.length + selInt // Count from right (+ because its a negative value)
				];
			}

			// Selector = function
			if ( typeof s === 'function' ) {
				var rows = _selector_row_indexes( settings, opts );

				return $.map( columns, function (col, idx) {
					return s(
							idx,
							__columnData( settings, idx, 0, 0, rows ),
							nodes[ idx ]
						) ? idx : null;
				} );
			}

			// jQuery or string selector
			var match = typeof s === 'string' ?
				s.match( __re_column_selector ) :
				'';

			if ( match ) {
				switch( match[2] ) {
					case 'visIdx':
					case 'visible':
						var idx = parseInt( match[1], 10 );
						// Visible index given, convert to column index
						if ( idx < 0 ) {
							// Counting from the right
							var visColumns = $.map( columns, function (col,i) {
								return col.bVisible ? i : null;
							} );
							return [ visColumns[ visColumns.length + idx ] ];
						}
						// Counting from the left
						return [ _fnVisibleToColumnIndex( settings, idx ) ];

					case 'name':
						// match by name. `names` is column index complete and in order
						return $.map( names, function (name, i) {
							return name === match[1] ? i : null;
						} );

					default:
						return [];
				}
			}

			// Cell in the table body
			if ( s.nodeName && s._DT_CellIndex ) {
				return [ s._DT_CellIndex.column ];
			}

			// jQuery selector on the TH elements for the columns
			var jqResult = $( nodes )
				.filter( s )
				.map( function () {
					return $.inArray( this, nodes ); // `nodes` is column index complete and in order
				} )
				.toArray();

			if ( jqResult.length || ! s.nodeName ) {
				return jqResult;
			}

			// Otherwise a node which might have a `dt-column` data attribute, or be
			// a child or such an element
			var host = $(s).closest('*[data-dt-column]');
			return host.length ?
				[ host.data('dt-column') ] :
				[];
		};

		return _selector_run( 'column', selector, run, settings, opts );
	};


	var __setColumnVis = function ( settings, column, vis ) {
		var
			cols = settings.aoColumns,
			col  = cols[ column ],
			data = settings.aoData,
			row, cells, i, ien, tr;

		// Get
		if ( vis === undefined ) {
			return col.bVisible;
		}

		// Set
		// No change
		if ( col.bVisible === vis ) {
			return;
		}

		if ( vis ) {
			// Insert column
			// Need to decide if we should use appendChild or insertBefore
			var insertBefore = $.inArray( true, _pluck(cols, 'bVisible'), column+1 );

			for ( i=0, ien=data.length ; i<ien ; i++ ) {
				tr = data[i].nTr;
				cells = data[i].anCells;

				if ( tr ) {
					// insertBefore can act like appendChild if 2nd arg is null
					tr.insertBefore( cells[ column ], cells[ insertBefore ] || null );
				}
			}
		}
		else {
			// Remove column
			$( _pluck( settings.aoData, 'anCells', column ) ).detach();
		}

		// Common actions
		col.bVisible = vis;
		_fnDrawHead( settings, settings.aoHeader );
		_fnDrawHead( settings, settings.aoFooter );

		// Update colspan for no records display. Child rows and extensions will use their own
		// listeners to do this - only need to update the empty table item here
		if ( ! settings.aiDisplay.length ) {
			$(settings.nTBody).find('td[colspan]').attr('colspan', _fnVisbleColumns(settings));
		}

		_fnSaveState( settings );
	};


	_api_register( 'columns()', function ( selector, opts ) {
		// argument shifting
		if ( selector === undefined ) {
			selector = '';
		}
		else if ( $.isPlainObject( selector ) ) {
			opts = selector;
			selector = '';
		}

		opts = _selector_opts( opts );

		var inst = this.iterator( 'table', function ( settings ) {
			return __column_selector( settings, selector, opts );
		}, 1 );

		// Want argument shifting here and in _row_selector?
		inst.selector.cols = selector;
		inst.selector.opts = opts;

		return inst;
	} );

	_api_registerPlural( 'columns().header()', 'column().header()', function ( selector, opts ) {
		return this.iterator( 'column', function ( settings, column ) {
			return settings.aoColumns[column].nTh;
		}, 1 );
	} );

	_api_registerPlural( 'columns().footer()', 'column().footer()', function ( selector, opts ) {
		return this.iterator( 'column', function ( settings, column ) {
			return settings.aoColumns[column].nTf;
		}, 1 );
	} );

	_api_registerPlural( 'columns().data()', 'column().data()', function () {
		return this.iterator( 'column-rows', __columnData, 1 );
	} );

	_api_registerPlural( 'columns().dataSrc()', 'column().dataSrc()', function () {
		return this.iterator( 'column', function ( settings, column ) {
			return settings.aoColumns[column].mData;
		}, 1 );
	} );

	_api_registerPlural( 'columns().cache()', 'column().cache()', function ( type ) {
		return this.iterator( 'column-rows', function ( settings, column, i, j, rows ) {
			return _pluck_order( settings.aoData, rows,
				type === 'search' ? '_aFilterData' : '_aSortData', column
			);
		}, 1 );
	} );

	_api_registerPlural( 'columns().nodes()', 'column().nodes()', function () {
		return this.iterator( 'column-rows', function ( settings, column, i, j, rows ) {
			return _pluck_order( settings.aoData, rows, 'anCells', column ) ;
		}, 1 );
	} );

	_api_registerPlural( 'columns().visible()', 'column().visible()', function ( vis, calc ) {
		var ret = this.iterator( 'column', function ( settings, column ) {
			if ( vis === undefined ) {
				return settings.aoColumns[ column ].bVisible;
			} // else
			__setColumnVis( settings, column, vis );
		} );

		// Group the column visibility changes
		if ( vis !== undefined ) {
			// Second loop once the first is done for events
			this.iterator( 'column', function ( settings, column ) {
				_fnCallbackFire( settings, null, 'column-visibility', [settings, column, vis, calc] );
			} );

			if ( calc === undefined || calc ) {
				this.columns.adjust();
			}
		}

		return ret;
	} );

	_api_registerPlural( 'columns().indexes()', 'column().index()', function ( type ) {
		return this.iterator( 'column', function ( settings, column ) {
			return type === 'visible' ?
				_fnColumnIndexToVisible( settings, column ) :
				column;
		}, 1 );
	} );

	_api_register( 'columns.adjust()', function () {
		return this.iterator( 'table', function ( settings ) {
			_fnAdjustColumnSizing( settings );
		}, 1 );
	} );

	_api_register( 'column.index()', function ( type, idx ) {
		if ( this.context.length !== 0 ) {
			var ctx = this.context[0];

			if ( type === 'fromVisible' || type === 'toData' ) {
				return _fnVisibleToColumnIndex( ctx, idx );
			}
			else if ( type === 'fromData' || type === 'toVisible' ) {
				return _fnColumnIndexToVisible( ctx, idx );
			}
		}
	} );

	_api_register( 'column()', function ( selector, opts ) {
		return _selector_first( this.columns( selector, opts ) );
	} );



	var __cell_selector = function ( settings, selector, opts )
	{
		var data = settings.aoData;
		var rows = _selector_row_indexes( settings, opts );
		var cells = _removeEmpty( _pluck_order( data, rows, 'anCells' ) );
		var allCells = $( [].concat.apply([], cells) );
		var row;
		var columns = settings.aoColumns.length;
		var a, i, ien, j, o, host;

		var run = function ( s ) {
			var fnSelector = typeof s === 'function';

			if ( s === null || s === undefined || fnSelector ) {
				// All cells and function selectors
				a = [];

				for ( i=0, ien=rows.length ; i<ien ; i++ ) {
					row = rows[i];

					for ( j=0 ; j<columns ; j++ ) {
						o = {
							row: row,
							column: j
						};

						if ( fnSelector ) {
							// Selector - function
							host = data[ row ];

							if ( s( o, _fnGetCellData(settings, row, j), host.anCells ? host.anCells[j] : null ) ) {
								a.push( o );
							}
						}
						else {
							// Selector - all
							a.push( o );
						}
					}
				}

				return a;
			}

			// Selector - index
			if ( $.isPlainObject( s ) ) {
				// Valid cell index and its in the array of selectable rows
				return s.column !== undefined && s.row !== undefined && $.inArray( s.row, rows ) !== -1 ?
					[s] :
					[];
			}

			// Selector - jQuery filtered cells
			var jqResult = allCells
				.filter( s )
				.map( function (i, el) {
					return { // use a new object, in case someone changes the values
						row:    el._DT_CellIndex.row,
						column: el._DT_CellIndex.column
	 				};
				} )
				.toArray();

			if ( jqResult.length || ! s.nodeName ) {
				return jqResult;
			}

			// Otherwise the selector is a node, and there is one last option - the
			// element might be a child of an element which has dt-row and dt-column
			// data attributes
			host = $(s).closest('*[data-dt-row]');
			return host.length ?
				[ {
					row: host.data('dt-row'),
					column: host.data('dt-column')
				} ] :
				[];
		};

		return _selector_run( 'cell', selector, run, settings, opts );
	};




	_api_register( 'cells()', function ( rowSelector, columnSelector, opts ) {
		// Argument shifting
		if ( $.isPlainObject( rowSelector ) ) {
			// Indexes
			if ( rowSelector.row === undefined ) {
				// Selector options in first parameter
				opts = rowSelector;
				rowSelector = null;
			}
			else {
				// Cell index objects in first parameter
				opts = columnSelector;
				columnSelector = null;
			}
		}
		if ( $.isPlainObject( columnSelector ) ) {
			opts = columnSelector;
			columnSelector = null;
		}

		// Cell selector
		if ( columnSelector === null || columnSelector === undefined ) {
			return this.iterator( 'table', function ( settings ) {
				return __cell_selector( settings, rowSelector, _selector_opts( opts ) );
			} );
		}

		// Row + column selector
		var columns = this.columns( columnSelector );
		var rows = this.rows( rowSelector );
		var a, i, ien, j, jen;

		this.iterator( 'table', function ( settings, idx ) {
			a = [];

			for ( i=0, ien=rows[idx].length ; i<ien ; i++ ) {
				for ( j=0, jen=columns[idx].length ; j<jen ; j++ ) {
					a.push( {
						row:    rows[idx][i],
						column: columns[idx][j]
					} );
				}
			}
		}, 1 );

	    // Now pass through the cell selector for options
	    var cells = this.cells( a, opts );

		$.extend( cells.selector, {
			cols: columnSelector,
			rows: rowSelector,
			opts: opts
		} );

		return cells;
	} );


	_api_registerPlural( 'cells().nodes()', 'cell().node()', function () {
		return this.iterator( 'cell', function ( settings, row, column ) {
			var data = settings.aoData[ row ];

			return data && data.anCells ?
				data.anCells[ column ] :
				undefined;
		}, 1 );
	} );


	_api_register( 'cells().data()', function () {
		return this.iterator( 'cell', function ( settings, row, column ) {
			return _fnGetCellData( settings, row, column );
		}, 1 );
	} );


	_api_registerPlural( 'cells().cache()', 'cell().cache()', function ( type ) {
		type = type === 'search' ? '_aFilterData' : '_aSortData';

		return this.iterator( 'cell', function ( settings, row, column ) {
			return settings.aoData[ row ][ type ][ column ];
		}, 1 );
	} );


	_api_registerPlural( 'cells().render()', 'cell().render()', function ( type ) {
		return this.iterator( 'cell', function ( settings, row, column ) {
			return _fnGetCellData( settings, row, column, type );
		}, 1 );
	} );


	_api_registerPlural( 'cells().indexes()', 'cell().index()', function () {
		return this.iterator( 'cell', function ( settings, row, column ) {
			return {
				row: row,
				column: column,
				columnVisible: _fnColumnIndexToVisible( settings, column )
			};
		}, 1 );
	} );


	_api_registerPlural( 'cells().invalidate()', 'cell().invalidate()', function ( src ) {
		return this.iterator( 'cell', function ( settings, row, column ) {
			_fnInvalidate( settings, row, src, column );
		} );
	} );



	_api_register( 'cell()', function ( rowSelector, columnSelector, opts ) {
		return _selector_first( this.cells( rowSelector, columnSelector, opts ) );
	} );


	_api_register( 'cell().data()', function ( data ) {
		var ctx = this.context;
		var cell = this[0];

		if ( data === undefined ) {
			// Get
			return ctx.length && cell.length ?
				_fnGetCellData( ctx[0], cell[0].row, cell[0].column ) :
				undefined;
		}

		// Set
		_fnSetCellData( ctx[0], cell[0].row, cell[0].column, data );
		_fnInvalidate( ctx[0], cell[0].row, 'data', cell[0].column );

		return this;
	} );



	/**
	 * Get current ordering (sorting) that has been applied to the table.
	 *
	 * @returns {array} 2D array containing the sorting information for the first
	 *   table in the current context. Each element in the parent array represents
	 *   a column being sorted upon (i.e. multi-sorting with two columns would have
	 *   2 inner arrays). The inner arrays may have 2 or 3 elements. The first is
	 *   the column index that the sorting condition applies to, the second is the
	 *   direction of the sort (`desc` or `asc`) and, optionally, the third is the
	 *   index of the sorting order from the `column.sorting` initialisation array.
	 *//**
	 * Set the ordering for the table.
	 *
	 * @param {integer} order Column index to sort upon.
	 * @param {string} direction Direction of the sort to be applied (`asc` or `desc`)
	 * @returns {DataTables.Api} this
	 *//**
	 * Set the ordering for the table.
	 *
	 * @param {array} order 1D array of sorting information to be applied.
	 * @param {array} [...] Optional additional sorting conditions
	 * @returns {DataTables.Api} this
	 *//**
	 * Set the ordering for the table.
	 *
	 * @param {array} order 2D array of sorting information to be applied.
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'order()', function ( order, dir ) {
		var ctx = this.context;

		if ( order === undefined ) {
			// get
			return ctx.length !== 0 ?
				ctx[0].aaSorting :
				undefined;
		}

		// set
		if ( typeof order === 'number' ) {
			// Simple column / direction passed in
			order = [ [ order, dir ] ];
		}
		else if ( order.length && ! $.isArray( order[0] ) ) {
			// Arguments passed in (list of 1D arrays)
			order = Array.prototype.slice.call( arguments );
		}
		// otherwise a 2D array was passed in

		return this.iterator( 'table', function ( settings ) {
			settings.aaSorting = order.slice();
		} );
	} );


	/**
	 * Attach a sort listener to an element for a given column
	 *
	 * @param {node|jQuery|string} node Identifier for the element(s) to attach the
	 *   listener to. This can take the form of a single DOM node, a jQuery
	 *   collection of nodes or a jQuery selector which will identify the node(s).
	 * @param {integer} column the column that a click on this node will sort on
	 * @param {function} [callback] callback function when sort is run
	 * @returns {DataTables.Api} this
	 */
	_api_register( 'order.listener()', function ( node, column, callback ) {
		return this.iterator( 'table', function ( settings ) {
			_fnSortAttachListener( settings, node, column, callback );
		} );
	} );


	_api_register( 'order.fixed()', function ( set ) {
		if ( ! set ) {
			var ctx = this.context;
			var fixed = ctx.length ?
				ctx[0].aaSortingFixed :
				undefined;

			return $.isArray( fixed ) ?
				{ pre: fixed } :
				fixed;
		}

		return this.iterator( 'table', function ( settings ) {
			settings.aaSortingFixed = $.extend( true, {}, set );
		} );
	} );


	// Order by the selected column(s)
	_api_register( [
		'columns().order()',
		'column().order()'
	], function ( dir ) {
		var that = this;

		return this.iterator( 'table', function ( settings, i ) {
			var sort = [];

			$.each( that[i], function (j, col) {
				sort.push( [ col, dir ] );
			} );

			settings.aaSorting = sort;
		} );
	} );



	_api_register( 'search()', function ( input, regex, smart, caseInsen ) {
		var ctx = this.context;

		if ( input === undefined ) {
			// get
			return ctx.length !== 0 ?
				ctx[0].oPreviousSearch.sSearch :
				undefined;
		}

		// set
		return this.iterator( 'table', function ( settings ) {
			if ( ! settings.oFeatures.bFilter ) {
				return;
			}

			_fnFilterComplete( settings, $.extend( {}, settings.oPreviousSearch, {
				"sSearch": input+"",
				"bRegex":  regex === null ? false : regex,
				"bSmart":  smart === null ? true  : smart,
				"bCaseInsensitive": caseInsen === null ? true : caseInsen
			} ), 1 );
		} );
	} );


	_api_registerPlural(
		'columns().search()',
		'column().search()',
		function ( input, regex, smart, caseInsen ) {
			return this.iterator( 'column', function ( settings, column ) {
				var preSearch = settings.aoPreSearchCols;

				if ( input === undefined ) {
					// get
					return preSearch[ column ].sSearch;
				}

				// set
				if ( ! settings.oFeatures.bFilter ) {
					return;
				}

				$.extend( preSearch[ column ], {
					"sSearch": input+"",
					"bRegex":  regex === null ? false : regex,
					"bSmart":  smart === null ? true  : smart,
					"bCaseInsensitive": caseInsen === null ? true : caseInsen
				} );

				_fnFilterComplete( settings, settings.oPreviousSearch, 1 );
			} );
		}
	);

	/*
	 * State API methods
	 */

	_api_register( 'state()', function () {
		return this.context.length ?
			this.context[0].oSavedState :
			null;
	} );


	_api_register( 'state.clear()', function () {
		return this.iterator( 'table', function ( settings ) {
			// Save an empty object
			settings.fnStateSaveCallback.call( settings.oInstance, settings, {} );
		} );
	} );


	_api_register( 'state.loaded()', function () {
		return this.context.length ?
			this.context[0].oLoadedState :
			null;
	} );


	_api_register( 'state.save()', function () {
		return this.iterator( 'table', function ( settings ) {
			_fnSaveState( settings );
		} );
	} );



	/**
	 * Provide a common method for plug-ins to check the version of DataTables being
	 * used, in order to ensure compatibility.
	 *
	 *  @param {string} version Version string to check for, in the format "X.Y.Z".
	 *    Note that the formats "X" and "X.Y" are also acceptable.
	 *  @returns {boolean} true if this version of DataTables is greater or equal to
	 *    the required version, or false if this version of DataTales is not
	 *    suitable
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    alert( $.fn.dataTable.versionCheck( '1.9.0' ) );
	 */
	DataTable.versionCheck = DataTable.fnVersionCheck = function( version )
	{
		var aThis = DataTable.version.split('.');
		var aThat = version.split('.');
		var iThis, iThat;

		for ( var i=0, iLen=aThat.length ; i<iLen ; i++ ) {
			iThis = parseInt( aThis[i], 10 ) || 0;
			iThat = parseInt( aThat[i], 10 ) || 0;

			// Parts are the same, keep comparing
			if (iThis === iThat) {
				continue;
			}

			// Parts are different, return immediately
			return iThis > iThat;
		}

		return true;
	};


	/**
	 * Check if a `<table>` node is a DataTable table already or not.
	 *
	 *  @param {node|jquery|string} table Table node, jQuery object or jQuery
	 *      selector for the table to test. Note that if more than more than one
	 *      table is passed on, only the first will be checked
	 *  @returns {boolean} true the table given is a DataTable, or false otherwise
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    if ( ! $.fn.DataTable.isDataTable( '#example' ) ) {
	 *      $('#example').dataTable();
	 *    }
	 */
	DataTable.isDataTable = DataTable.fnIsDataTable = function ( table )
	{
		var t = $(table).get(0);
		var is = false;

		if ( table instanceof DataTable.Api ) {
			return true;
		}

		$.each( DataTable.settings, function (i, o) {
			var head = o.nScrollHead ? $('table', o.nScrollHead)[0] : null;
			var foot = o.nScrollFoot ? $('table', o.nScrollFoot)[0] : null;

			if ( o.nTable === t || head === t || foot === t ) {
				is = true;
			}
		} );

		return is;
	};


	/**
	 * Get all DataTable tables that have been initialised - optionally you can
	 * select to get only currently visible tables.
	 *
	 *  @param {boolean} [visible=false] Flag to indicate if you want all (default)
	 *    or visible tables only.
	 *  @returns {array} Array of `table` nodes (not DataTable instances) which are
	 *    DataTables
	 *  @static
	 *  @dtopt API-Static
	 *
	 *  @example
	 *    $.each( $.fn.dataTable.tables(true), function () {
	 *      $(table).DataTable().columns.adjust();
	 *    } );
	 */
	DataTable.tables = DataTable.fnTables = function ( visible )
	{
		var api = false;

		if ( $.isPlainObject( visible ) ) {
			api = visible.api;
			visible = visible.visible;
		}

		var a = $.map( DataTable.settings, function (o) {
			if ( !visible || (visible && $(o.nTable).is(':visible')) ) {
				return o.nTable;
			}
		} );

		return api ?
			new _Api( a ) :
			a;
	};


	/**
	 * Convert from camel case parameters to Hungarian notation. This is made public
	 * for the extensions to provide the same ability as DataTables core to accept
	 * either the 1.9 style Hungarian notation, or the 1.10+ style camelCase
	 * parameters.
	 *
	 *  @param {object} src The model object which holds all parameters that can be
	 *    mapped.
	 *  @param {object} user The object to convert from camel case to Hungarian.
	 *  @param {boolean} force When set to `true`, properties which already have a
	 *    Hungarian value in the `user` object will be overwritten. Otherwise they
	 *    won't be.
	 */
	DataTable.camelToHungarian = _fnCamelToHungarian;



	/**
	 *
	 */
	_api_register( '$()', function ( selector, opts ) {
		var
			rows   = this.rows( opts ).nodes(), // Get all rows
			jqRows = $(rows);

		return $( [].concat(
			jqRows.filter( selector ).toArray(),
			jqRows.find( selector ).toArray()
		) );
	} );


	// jQuery functions to operate on the tables
	$.each( [ 'on', 'one', 'off' ], function (i, key) {
		_api_register( key+'()', function ( /* event, handler */ ) {
			var args = Array.prototype.slice.call(arguments);

			// Add the `dt` namespace automatically if it isn't already present
			args[0] = $.map( args[0].split( /\s/ ), function ( e ) {
				return ! e.match(/\.dt\b/) ?
					e+'.dt' :
					e;
				} ).join( ' ' );

			var inst = $( this.tables().nodes() );
			inst[key].apply( inst, args );
			return this;
		} );
	} );


	_api_register( 'clear()', function () {
		return this.iterator( 'table', function ( settings ) {
			_fnClearTable( settings );
		} );
	} );


	_api_register( 'settings()', function () {
		return new _Api( this.context, this.context );
	} );


	_api_register( 'init()', function () {
		var ctx = this.context;
		return ctx.length ? ctx[0].oInit : null;
	} );


	_api_register( 'data()', function () {
		return this.iterator( 'table', function ( settings ) {
			return _pluck( settings.aoData, '_aData' );
		} ).flatten();
	} );


	_api_register( 'destroy()', function ( remove ) {
		remove = remove || false;

		return this.iterator( 'table', function ( settings ) {
			var orig      = settings.nTableWrapper.parentNode;
			var classes   = settings.oClasses;
			var table     = settings.nTable;
			var tbody     = settings.nTBody;
			var thead     = settings.nTHead;
			var tfoot     = settings.nTFoot;
			var jqTable   = $(table);
			var jqTbody   = $(tbody);
			var jqWrapper = $(settings.nTableWrapper);
			var rows      = $.map( settings.aoData, function (r) { return r.nTr; } );
			var i, ien;

			// Flag to note that the table is currently being destroyed - no action
			// should be taken
			settings.bDestroying = true;

			// Fire off the destroy callbacks for plug-ins etc
			_fnCallbackFire( settings, "aoDestroyCallback", "destroy", [settings] );

			// If not being removed from the document, make all columns visible
			if ( ! remove ) {
				new _Api( settings ).columns().visible( true );
			}

			// Blitz all `DT` namespaced events (these are internal events, the
			// lowercase, `dt` events are user subscribed and they are responsible
			// for removing them
			jqWrapper.off('.DT').find(':not(tbody *)').off('.DT');
			$(window).off('.DT-'+settings.sInstance);

			// When scrolling we had to break the table up - restore it
			if ( table != thead.parentNode ) {
				jqTable.children('thead').detach();
				jqTable.append( thead );
			}

			if ( tfoot && table != tfoot.parentNode ) {
				jqTable.children('tfoot').detach();
				jqTable.append( tfoot );
			}

			settings.aaSorting = [];
			settings.aaSortingFixed = [];
			_fnSortingClasses( settings );

			$( rows ).removeClass( settings.asStripeClasses.join(' ') );

			$('th, td', thead).removeClass( classes.sSortable+' '+
				classes.sSortableAsc+' '+classes.sSortableDesc+' '+classes.sSortableNone
			);

			// Add the TR elements back into the table in their original order
			jqTbody.children().detach();
			jqTbody.append( rows );

			// Remove the DataTables generated nodes, events and classes
			var removedMethod = remove ? 'remove' : 'detach';
			jqTable[ removedMethod ]();
			jqWrapper[ removedMethod ]();

			// If we need to reattach the table to the document
			if ( ! remove && orig ) {
				// insertBefore acts like appendChild if !arg[1]
				orig.insertBefore( table, settings.nTableReinsertBefore );

				// Restore the width of the original table - was read from the style property,
				// so we can restore directly to that
				jqTable
					.css( 'width', settings.sDestroyWidth )
					.removeClass( classes.sTable );

				// If the were originally stripe classes - then we add them back here.
				// Note this is not fool proof (for example if not all rows had stripe
				// classes - but it's a good effort without getting carried away
				ien = settings.asDestroyStripes.length;

				if ( ien ) {
					jqTbody.children().each( function (i) {
						$(this).addClass( settings.asDestroyStripes[i % ien] );
					} );
				}
			}

			/* Remove the settings object from the settings array */
			var idx = $.inArray( settings, DataTable.settings );
			if ( idx !== -1 ) {
				DataTable.settings.splice( idx, 1 );
			}
		} );
	} );


	// Add the `every()` method for rows, columns and cells in a compact form
	$.each( [ 'column', 'row', 'cell' ], function ( i, type ) {
		_api_register( type+'s().every()', function ( fn ) {
			var opts = this.selector.opts;
			var api = this;

			return this.iterator( type, function ( settings, arg1, arg2, arg3, arg4 ) {
				// Rows and columns:
				//  arg1 - index
				//  arg2 - table counter
				//  arg3 - loop counter
				//  arg4 - undefined
				// Cells:
				//  arg1 - row index
				//  arg2 - column index
				//  arg3 - table counter
				//  arg4 - loop counter
				fn.call(
					api[ type ](
						arg1,
						type==='cell' ? arg2 : opts,
						type==='cell' ? opts : undefined
					),
					arg1, arg2, arg3, arg4
				);
			} );
		} );
	} );


	// i18n method for extensions to be able to use the language object from the
	// DataTable
	_api_register( 'i18n()', function ( token, def, plural ) {
		var ctx = this.context[0];
		var resolved = _fnGetObjectDataFn( token )( ctx.oLanguage );

		if ( resolved === undefined ) {
			resolved = def;
		}

		if ( plural !== undefined && $.isPlainObject( resolved ) ) {
			resolved = resolved[ plural ] !== undefined ?
				resolved[ plural ] :
				resolved._;
		}

		return resolved.replace( '%d', plural ); // nb: plural might be undefined,
	} );
	/**
	 * Version string for plug-ins to check compatibility. Allowed format is
	 * `a.b.c-d` where: a:int, b:int, c:int, d:string(dev|beta|alpha). `d` is used
	 * only for non-release builds. See http://semver.org/ for more information.
	 *  @member
	 *  @type string
	 *  @default Version number
	 */
	DataTable.version = "1.10.19";

	/**
	 * Private data store, containing all of the settings objects that are
	 * created for the tables on a given page.
	 *
	 * Note that the `DataTable.settings` object is aliased to
	 * `jQuery.fn.dataTableExt` through which it may be accessed and
	 * manipulated, or `jQuery.fn.dataTable.settings`.
	 *  @member
	 *  @type array
	 *  @default []
	 *  @private
	 */
	DataTable.settings = [];

	/**
	 * Object models container, for the various models that DataTables has
	 * available to it. These models define the objects that are used to hold
	 * the active state and configuration of the table.
	 *  @namespace
	 */
	DataTable.models = {};



	/**
	 * Template object for the way in which DataTables holds information about
	 * search information for the global filter and individual column filters.
	 *  @namespace
	 */
	DataTable.models.oSearch = {
		/**
		 * Flag to indicate if the filtering should be case insensitive or not
		 *  @type boolean
		 *  @default true
		 */
		"bCaseInsensitive": true,

		/**
		 * Applied search term
		 *  @type string
		 *  @default <i>Empty string</i>
		 */
		"sSearch": "",

		/**
		 * Flag to indicate if the search term should be interpreted as a
		 * regular expression (true) or not (false) and therefore and special
		 * regex characters escaped.
		 *  @type boolean
		 *  @default false
		 */
		"bRegex": false,

		/**
		 * Flag to indicate if DataTables is to use its smart filtering or not.
		 *  @type boolean
		 *  @default true
		 */
		"bSmart": true
	};




	/**
	 * Template object for the way in which DataTables holds information about
	 * each individual row. This is the object format used for the settings
	 * aoData array.
	 *  @namespace
	 */
	DataTable.models.oRow = {
		/**
		 * TR element for the row
		 *  @type node
		 *  @default null
		 */
		"nTr": null,

		/**
		 * Array of TD elements for each row. This is null until the row has been
		 * created.
		 *  @type array nodes
		 *  @default []
		 */
		"anCells": null,

		/**
		 * Data object from the original data source for the row. This is either
		 * an array if using the traditional form of DataTables, or an object if
		 * using mData options. The exact type will depend on the passed in
		 * data from the data source, or will be an array if using DOM a data
		 * source.
		 *  @type array|object
		 *  @default []
		 */
		"_aData": [],

		/**
		 * Sorting data cache - this array is ostensibly the same length as the
		 * number of columns (although each index is generated only as it is
		 * needed), and holds the data that is used for sorting each column in the
		 * row. We do this cache generation at the start of the sort in order that
		 * the formatting of the sort data need be done only once for each cell
		 * per sort. This array should not be read from or written to by anything
		 * other than the master sorting methods.
		 *  @type array
		 *  @default null
		 *  @private
		 */
		"_aSortData": null,

		/**
		 * Per cell filtering data cache. As per the sort data cache, used to
		 * increase the performance of the filtering in DataTables
		 *  @type array
		 *  @default null
		 *  @private
		 */
		"_aFilterData": null,

		/**
		 * Filtering data cache. This is the same as the cell filtering cache, but
		 * in this case a string rather than an array. This is easily computed with
		 * a join on `_aFilterData`, but is provided as a cache so the join isn't
		 * needed on every search (memory traded for performance)
		 *  @type array
		 *  @default null
		 *  @private
		 */
		"_sFilterRow": null,

		/**
		 * Cache of the class name that DataTables has applied to the row, so we
		 * can quickly look at this variable rather than needing to do a DOM check
		 * on className for the nTr property.
		 *  @type string
		 *  @default <i>Empty string</i>
		 *  @private
		 */
		"_sRowStripe": "",

		/**
		 * Denote if the original data source was from the DOM, or the data source
		 * object. This is used for invalidating data, so DataTables can
		 * automatically read data from the original source, unless uninstructed
		 * otherwise.
		 *  @type string
		 *  @default null
		 *  @private
		 */
		"src": null,

		/**
		 * Index in the aoData array. This saves an indexOf lookup when we have the
		 * object, but want to know the index
		 *  @type integer
		 *  @default -1
		 *  @private
		 */
		"idx": -1
	};


	/**
	 * Template object for the column information object in DataTables. This object
	 * is held in the settings aoColumns array and contains all the information that
	 * DataTables needs about each individual column.
	 *
	 * Note that this object is related to {@link DataTable.defaults.column}
	 * but this one is the internal data store for DataTables's cache of columns.
	 * It should NOT be manipulated outside of DataTables. Any configuration should
	 * be done through the initialisation options.
	 *  @namespace
	 */
	DataTable.models.oColumn = {
		/**
		 * Column index. This could be worked out on-the-fly with $.inArray, but it
		 * is faster to just hold it as a variable
		 *  @type integer
		 *  @default null
		 */
		"idx": null,

		/**
		 * A list of the columns that sorting should occur on when this column
		 * is sorted. That this property is an array allows multi-column sorting
		 * to be defined for a column (for example first name / last name columns
		 * would benefit from this). The values are integers pointing to the
		 * columns to be sorted on (typically it will be a single integer pointing
		 * at itself, but that doesn't need to be the case).
		 *  @type array
		 */
		"aDataSort": null,

		/**
		 * Define the sorting directions that are applied to the column, in sequence
		 * as the column is repeatedly sorted upon - i.e. the first value is used
		 * as the sorting direction when the column if first sorted (clicked on).
		 * Sort it again (click again) and it will move on to the next index.
		 * Repeat until loop.
		 *  @type array
		 */
		"asSorting": null,

		/**
		 * Flag to indicate if the column is searchable, and thus should be included
		 * in the filtering or not.
		 *  @type boolean
		 */
		"bSearchable": null,

		/**
		 * Flag to indicate if the column is sortable or not.
		 *  @type boolean
		 */
		"bSortable": null,

		/**
		 * Flag to indicate if the column is currently visible in the table or not
		 *  @type boolean
		 */
		"bVisible": null,

		/**
		 * Store for manual type assignment using the `column.type` option. This
		 * is held in store so we can manipulate the column's `sType` property.
		 *  @type string
		 *  @default null
		 *  @private
		 */
		"_sManualType": null,

		/**
		 * Flag to indicate if HTML5 data attributes should be used as the data
		 * source for filtering or sorting. True is either are.
		 *  @type boolean
		 *  @default false
		 *  @private
		 */
		"_bAttrSrc": false,

		/**
		 * Developer definable function that is called whenever a cell is created (Ajax source,
		 * etc) or processed for input (DOM source). This can be used as a compliment to mRender
		 * allowing you to modify the DOM element (add background colour for example) when the
		 * element is available.
		 *  @type function
		 *  @param {element} nTd The TD node that has been created
		 *  @param {*} sData The Data for the cell
		 *  @param {array|object} oData The data for the whole row
		 *  @param {int} iRow The row index for the aoData data store
		 *  @default null
		 */
		"fnCreatedCell": null,

		/**
		 * Function to get data from a cell in a column. You should <b>never</b>
		 * access data directly through _aData internally in DataTables - always use
		 * the method attached to this property. It allows mData to function as
		 * required. This function is automatically assigned by the column
		 * initialisation method
		 *  @type function
		 *  @param {array|object} oData The data array/object for the array
		 *    (i.e. aoData[]._aData)
		 *  @param {string} sSpecific The specific data type you want to get -
		 *    'display', 'type' 'filter' 'sort'
		 *  @returns {*} The data for the cell from the given row's data
		 *  @default null
		 */
		"fnGetData": null,

		/**
		 * Function to set data for a cell in the column. You should <b>never</b>
		 * set the data directly to _aData internally in DataTables - always use
		 * this method. It allows mData to function as required. This function
		 * is automatically assigned by the column initialisation method
		 *  @type function
		 *  @param {array|object} oData The data array/object for the array
		 *    (i.e. aoData[]._aData)
		 *  @param {*} sValue Value to set
		 *  @default null
		 */
		"fnSetData": null,

		/**
		 * Property to read the value for the cells in the column from the data
		 * source array / object. If null, then the default content is used, if a
		 * function is given then the return from the function is used.
		 *  @type function|int|string|null
		 *  @default null
		 */
		"mData": null,

		/**
		 * Partner property to mData which is used (only when defined) to get
		 * the data - i.e. it is basically the same as mData, but without the
		 * 'set' option, and also the data fed to it is the result from mData.
		 * This is the rendering method to match the data method of mData.
		 *  @type function|int|string|null
		 *  @default null
		 */
		"mRender": null,

		/**
		 * Unique header TH/TD element for this column - this is what the sorting
		 * listener is attached to (if sorting is enabled.)
		 *  @type node
		 *  @default null
		 */
		"nTh": null,

		/**
		 * Unique footer TH/TD element for this column (if there is one). Not used
		 * in DataTables as such, but can be used for plug-ins to reference the
		 * footer for each column.
		 *  @type node
		 *  @default null
		 */
		"nTf": null,

		/**
		 * The class to apply to all TD elements in the table's TBODY for the column
		 *  @type string
		 *  @default null
		 */
		"sClass": null,

		/**
		 * When DataTables calculates the column widths to assign to each column,
		 * it finds the longest string in each column and then constructs a
		 * temporary table and reads the widths from that. The problem with this
		 * is that "mmm" is much wider then "iiii", but the latter is a longer
		 * string - thus the calculation can go wrong (doing it properly and putting
		 * it into an DOM object and measuring that is horribly(!) slow). Thus as
		 * a "work around" we provide this option. It will append its value to the
		 * text that is found to be the longest string for the column - i.e. padding.
		 *  @type string
		 */
		"sContentPadding": null,

		/**
		 * Allows a default value to be given for a column's data, and will be used
		 * whenever a null data source is encountered (this can be because mData
		 * is set to null, or because the data source itself is null).
		 *  @type string
		 *  @default null
		 */
		"sDefaultContent": null,

		/**
		 * Name for the column, allowing reference to the column by name as well as
		 * by index (needs a lookup to work by name).
		 *  @type string
		 */
		"sName": null,

		/**
		 * Custom sorting data type - defines which of the available plug-ins in
		 * afnSortData the custom sorting will use - if any is defined.
		 *  @type string
		 *  @default std
		 */
		"sSortDataType": 'std',

		/**
		 * Class to be applied to the header element when sorting on this column
		 *  @type string
		 *  @default null
		 */
		"sSortingClass": null,

		/**
		 * Class to be applied to the header element when sorting on this column -
		 * when jQuery UI theming is used.
		 *  @type string
		 *  @default null
		 */
		"sSortingClassJUI": null,

		/**
		 * Title of the column - what is seen in the TH element (nTh).
		 *  @type string
		 */
		"sTitle": null,

		/**
		 * Column sorting and filtering type
		 *  @type string
		 *  @default null
		 */
		"sType": null,

		/**
		 * Width of the column
		 *  @type string
		 *  @default null
		 */
		"sWidth": null,

		/**
		 * Width of the column when it was first "encountered"
		 *  @type string
		 *  @default null
		 */
		"sWidthOrig": null
	};


	/*
	 * Developer note: The properties of the object below are given in Hungarian
	 * notation, that was used as the interface for DataTables prior to v1.10, however
	 * from v1.10 onwards the primary interface is camel case. In order to avoid
	 * breaking backwards compatibility utterly with this change, the Hungarian
	 * version is still, internally the primary interface, but is is not documented
	 * - hence the @name tags in each doc comment. This allows a Javascript function
	 * to create a map from Hungarian notation to camel case (going the other direction
	 * would require each property to be listed, which would at around 3K to the size
	 * of DataTables, while this method is about a 0.5K hit.
	 *
	 * Ultimately this does pave the way for Hungarian notation to be dropped
	 * completely, but that is a massive amount of work and will break current
	 * installs (therefore is on-hold until v2).
	 */

	/**
	 * Initialisation options that can be given to DataTables at initialisation
	 * time.
	 *  @namespace
	 */
	DataTable.defaults = {
		/**
		 * An array of data to use for the table, passed in at initialisation which
		 * will be used in preference to any data which is already in the DOM. This is
		 * particularly useful for constructing tables purely in Javascript, for
		 * example with a custom Ajax call.
		 *  @type array
		 *  @default null
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.data
		 *
		 *  @example
		 *    // Using a 2D array data source
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "data": [
		 *          ['Trident', 'Internet Explorer 4.0', 'Win 95+', 4, 'X'],
		 *          ['Trident', 'Internet Explorer 5.0', 'Win 95+', 5, 'C'],
		 *        ],
		 *        "columns": [
		 *          { "title": "Engine" },
		 *          { "title": "Browser" },
		 *          { "title": "Platform" },
		 *          { "title": "Version" },
		 *          { "title": "Grade" }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using an array of objects as a data source (`data`)
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "data": [
		 *          {
		 *            "engine":   "Trident",
		 *            "browser":  "Internet Explorer 4.0",
		 *            "platform": "Win 95+",
		 *            "version":  4,
		 *            "grade":    "X"
		 *          },
		 *          {
		 *            "engine":   "Trident",
		 *            "browser":  "Internet Explorer 5.0",
		 *            "platform": "Win 95+",
		 *            "version":  5,
		 *            "grade":    "C"
		 *          }
		 *        ],
		 *        "columns": [
		 *          { "title": "Engine",   "data": "engine" },
		 *          { "title": "Browser",  "data": "browser" },
		 *          { "title": "Platform", "data": "platform" },
		 *          { "title": "Version",  "data": "version" },
		 *          { "title": "Grade",    "data": "grade" }
		 *        ]
		 *      } );
		 *    } );
		 */
		"aaData": null,


		/**
		 * If ordering is enabled, then DataTables will perform a first pass sort on
		 * initialisation. You can define which column(s) the sort is performed
		 * upon, and the sorting direction, with this variable. The `sorting` array
		 * should contain an array for each column to be sorted initially containing
		 * the column's index and a direction string ('asc' or 'desc').
		 *  @type array
		 *  @default [[0,'asc']]
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.order
		 *
		 *  @example
		 *    // Sort by 3rd column first, and then 4th column
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "order": [[2,'asc'], [3,'desc']]
		 *      } );
		 *    } );
		 *
		 *    // No initial sorting
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "order": []
		 *      } );
		 *    } );
		 */
		"aaSorting": [[0,'asc']],


		/**
		 * This parameter is basically identical to the `sorting` parameter, but
		 * cannot be overridden by user interaction with the table. What this means
		 * is that you could have a column (visible or hidden) which the sorting
		 * will always be forced on first - any sorting after that (from the user)
		 * will then be performed as required. This can be useful for grouping rows
		 * together.
		 *  @type array
		 *  @default null
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.orderFixed
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "orderFixed": [[0,'asc']]
		 *      } );
		 *    } )
		 */
		"aaSortingFixed": [],


		/**
		 * DataTables can be instructed to load data to display in the table from a
		 * Ajax source. This option defines how that Ajax call is made and where to.
		 *
		 * The `ajax` property has three different modes of operation, depending on
		 * how it is defined. These are:
		 *
		 * * `string` - Set the URL from where the data should be loaded from.
		 * * `object` - Define properties for `jQuery.ajax`.
		 * * `function` - Custom data get function
		 *
		 * `string`
		 * --------
		 *
		 * As a string, the `ajax` property simply defines the URL from which
		 * DataTables will load data.
		 *
		 * `object`
		 * --------
		 *
		 * As an object, the parameters in the object are passed to
		 * [jQuery.ajax](http://api.jquery.com/jQuery.ajax/) allowing fine control
		 * of the Ajax request. DataTables has a number of default parameters which
		 * you can override using this option. Please refer to the jQuery
		 * documentation for a full description of the options available, although
		 * the following parameters provide additional options in DataTables or
		 * require special consideration:
		 *
		 * * `data` - As with jQuery, `data` can be provided as an object, but it
		 *   can also be used as a function to manipulate the data DataTables sends
		 *   to the server. The function takes a single parameter, an object of
		 *   parameters with the values that DataTables has readied for sending. An
		 *   object may be returned which will be merged into the DataTables
		 *   defaults, or you can add the items to the object that was passed in and
		 *   not return anything from the function. This supersedes `fnServerParams`
		 *   from DataTables 1.9-.
		 *
		 * * `dataSrc` - By default DataTables will look for the property `data` (or
		 *   `aaData` for compatibility with DataTables 1.9-) when obtaining data
		 *   from an Ajax source or for server-side processing - this parameter
		 *   allows that property to be changed. You can use Javascript dotted
		 *   object notation to get a data source for multiple levels of nesting, or
		 *   it my be used as a function. As a function it takes a single parameter,
		 *   the JSON returned from the server, which can be manipulated as
		 *   required, with the returned value being that used by DataTables as the
		 *   data source for the table. This supersedes `sAjaxDataProp` from
		 *   DataTables 1.9-.
		 *
		 * * `success` - Should not be overridden it is used internally in
		 *   DataTables. To manipulate / transform the data returned by the server
		 *   use `ajax.dataSrc`, or use `ajax` as a function (see below).
		 *
		 * `function`
		 * ----------
		 *
		 * As a function, making the Ajax call is left up to yourself allowing
		 * complete control of the Ajax request. Indeed, if desired, a method other
		 * than Ajax could be used to obtain the required data, such as Web storage
		 * or an AIR database.
		 *
		 * The function is given four parameters and no return is required. The
		 * parameters are:
		 *
		 * 1. _object_ - Data to send to the server
		 * 2. _function_ - Callback function that must be executed when the required
		 *    data has been obtained. That data should be passed into the callback
		 *    as the only parameter
		 * 3. _object_ - DataTables settings object for the table
		 *
		 * Note that this supersedes `fnServerData` from DataTables 1.9-.
		 *
		 *  @type string|object|function
		 *  @default null
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.ajax
		 *  @since 1.10.0
		 *
		 * @example
		 *   // Get JSON data from a file via Ajax.
		 *   // Note DataTables expects data in the form `{ data: [ ...data... ] }` by default).
		 *   $('#example').dataTable( {
		 *     "ajax": "data.json"
		 *   } );
		 *
		 * @example
		 *   // Get JSON data from a file via Ajax, using `dataSrc` to change
		 *   // `data` to `tableData` (i.e. `{ tableData: [ ...data... ] }`)
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "dataSrc": "tableData"
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Get JSON data from a file via Ajax, using `dataSrc` to read data
		 *   // from a plain array rather than an array in an object
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "dataSrc": ""
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Manipulate the data returned from the server - add a link to data
		 *   // (note this can, should, be done using `render` for the column - this
		 *   // is just a simple example of how the data can be manipulated).
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "dataSrc": function ( json ) {
		 *         for ( var i=0, ien=json.length ; i<ien ; i++ ) {
		 *           json[i][0] = '<a href="/message/'+json[i][0]+'>View message</a>';
		 *         }
		 *         return json;
		 *       }
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Add data to the request
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "data": function ( d ) {
		 *         return {
		 *           "extra_search": $('#extra').val()
		 *         };
		 *       }
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Send request as POST
		 *   $('#example').dataTable( {
		 *     "ajax": {
		 *       "url": "data.json",
		 *       "type": "POST"
		 *     }
		 *   } );
		 *
		 * @example
		 *   // Get the data from localStorage (could interface with a form for
		 *   // adding, editing and removing rows).
		 *   $('#example').dataTable( {
		 *     "ajax": function (data, callback, settings) {
		 *       callback(
		 *         JSON.parse( localStorage.getItem('dataTablesData') )
		 *       );
		 *     }
		 *   } );
		 */
		"ajax": null,


		/**
		 * This parameter allows you to readily specify the entries in the length drop
		 * down menu that DataTables shows when pagination is enabled. It can be
		 * either a 1D array of options which will be used for both the displayed
		 * option and the value, or a 2D array which will use the array in the first
		 * position as the value, and the array in the second position as the
		 * displayed options (useful for language strings such as 'All').
		 *
		 * Note that the `pageLength` property will be automatically set to the
		 * first value given in this array, unless `pageLength` is also provided.
		 *  @type array
		 *  @default [ 10, 25, 50, 100 ]
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.lengthMenu
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]]
		 *      } );
		 *    } );
		 */
		"aLengthMenu": [ 10, 25, 50, 100 ],


		/**
		 * The `columns` option in the initialisation parameter allows you to define
		 * details about the way individual columns behave. For a full list of
		 * column options that can be set, please see
		 * {@link DataTable.defaults.column}. Note that if you use `columns` to
		 * define your columns, you must have an entry in the array for every single
		 * column that you have in your table (these can be null if you don't which
		 * to specify any options).
		 *  @member
		 *
		 *  @name DataTable.defaults.column
		 */
		"aoColumns": null,

		/**
		 * Very similar to `columns`, `columnDefs` allows you to target a specific
		 * column, multiple columns, or all columns, using the `targets` property of
		 * each object in the array. This allows great flexibility when creating
		 * tables, as the `columnDefs` arrays can be of any length, targeting the
		 * columns you specifically want. `columnDefs` may use any of the column
		 * options available: {@link DataTable.defaults.column}, but it _must_
		 * have `targets` defined in each object in the array. Values in the `targets`
		 * array may be:
		 *   <ul>
		 *     <li>a string - class name will be matched on the TH for the column</li>
		 *     <li>0 or a positive integer - column index counting from the left</li>
		 *     <li>a negative integer - column index counting from the right</li>
		 *     <li>the string "_all" - all columns (i.e. assign a default)</li>
		 *   </ul>
		 *  @member
		 *
		 *  @name DataTable.defaults.columnDefs
		 */
		"aoColumnDefs": null,


		/**
		 * Basically the same as `search`, this parameter defines the individual column
		 * filtering state at initialisation time. The array must be of the same size
		 * as the number of columns, and each element be an object with the parameters
		 * `search` and `escapeRegex` (the latter is optional). 'null' is also
		 * accepted and the default will be used.
		 *  @type array
		 *  @default []
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.searchCols
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "searchCols": [
		 *          null,
		 *          { "search": "My filter" },
		 *          null,
		 *          { "search": "^[0-9]", "escapeRegex": false }
		 *        ]
		 *      } );
		 *    } )
		 */
		"aoSearchCols": [],


		/**
		 * An array of CSS classes that should be applied to displayed rows. This
		 * array may be of any length, and DataTables will apply each class
		 * sequentially, looping when required.
		 *  @type array
		 *  @default null <i>Will take the values determined by the `oClasses.stripe*`
		 *    options</i>
		 *
		 *  @dtopt Option
		 *  @name DataTable.defaults.stripeClasses
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stripeClasses": [ 'strip1', 'strip2', 'strip3' ]
		 *      } );
		 *    } )
		 */
		"asStripeClasses": null,


		/**
		 * Enable or disable automatic column width calculation. This can be disabled
		 * as an optimisation (it takes some time to calculate the widths) if the
		 * tables widths are passed in using `columns`.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.autoWidth
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "autoWidth": false
		 *      } );
		 *    } );
		 */
		"bAutoWidth": true,


		/**
		 * Deferred rendering can provide DataTables with a huge speed boost when you
		 * are using an Ajax or JS data source for the table. This option, when set to
		 * true, will cause DataTables to defer the creation of the table elements for
		 * each row until they are needed for a draw - saving a significant amount of
		 * time.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.deferRender
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajax": "sources/arrays.txt",
		 *        "deferRender": true
		 *      } );
		 *    } );
		 */
		"bDeferRender": false,


		/**
		 * Replace a DataTable which matches the given selector and replace it with
		 * one which has the properties of the new initialisation object passed. If no
		 * table matches the selector, then the new DataTable will be constructed as
		 * per normal.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.destroy
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "srollY": "200px",
		 *        "paginate": false
		 *      } );
		 *
		 *      // Some time later....
		 *      $('#example').dataTable( {
		 *        "filter": false,
		 *        "destroy": true
		 *      } );
		 *    } );
		 */
		"bDestroy": false,


		/**
		 * Enable or disable filtering of data. Filtering in DataTables is "smart" in
		 * that it allows the end user to input multiple words (space separated) and
		 * will match a row containing those words, even if not in the order that was
		 * specified (this allow matching across multiple columns). Note that if you
		 * wish to use filtering in DataTables this must remain 'true' - to remove the
		 * default filtering input box and retain filtering abilities, please use
		 * {@link DataTable.defaults.dom}.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.searching
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "searching": false
		 *      } );
		 *    } );
		 */
		"bFilter": true,


		/**
		 * Enable or disable the table information display. This shows information
		 * about the data that is currently visible on the page, including information
		 * about filtered data if that action is being performed.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.info
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "info": false
		 *      } );
		 *    } );
		 */
		"bInfo": true,


		/**
		 * Allows the end user to select the size of a formatted page from a select
		 * menu (sizes are 10, 25, 50 and 100). Requires pagination (`paginate`).
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.lengthChange
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "lengthChange": false
		 *      } );
		 *    } );
		 */
		"bLengthChange": true,


		/**
		 * Enable or disable pagination.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.paging
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "paging": false
		 *      } );
		 *    } );
		 */
		"bPaginate": true,


		/**
		 * Enable or disable the display of a 'processing' indicator when the table is
		 * being processed (e.g. a sort). This is particularly useful for tables with
		 * large amounts of data where it can take a noticeable amount of time to sort
		 * the entries.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.processing
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "processing": true
		 *      } );
		 *    } );
		 */
		"bProcessing": false,


		/**
		 * Retrieve the DataTables object for the given selector. Note that if the
		 * table has already been initialised, this parameter will cause DataTables
		 * to simply return the object that has already been set up - it will not take
		 * account of any changes you might have made to the initialisation object
		 * passed to DataTables (setting this parameter to true is an acknowledgement
		 * that you understand this). `destroy` can be used to reinitialise a table if
		 * you need.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.retrieve
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      initTable();
		 *      tableActions();
		 *    } );
		 *
		 *    function initTable ()
		 *    {
		 *      return $('#example').dataTable( {
		 *        "scrollY": "200px",
		 *        "paginate": false,
		 *        "retrieve": true
		 *      } );
		 *    }
		 *
		 *    function tableActions ()
		 *    {
		 *      var table = initTable();
		 *      // perform API operations with oTable
		 *    }
		 */
		"bRetrieve": false,


		/**
		 * When vertical (y) scrolling is enabled, DataTables will force the height of
		 * the table's viewport to the given height at all times (useful for layout).
		 * However, this can look odd when filtering data down to a small data set,
		 * and the footer is left "floating" further down. This parameter (when
		 * enabled) will cause DataTables to collapse the table's viewport down when
		 * the result set will fit within the given Y height.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.scrollCollapse
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollY": "200",
		 *        "scrollCollapse": true
		 *      } );
		 *    } );
		 */
		"bScrollCollapse": false,


		/**
		 * Configure DataTables to use server-side processing. Note that the
		 * `ajax` parameter must also be given in order to give DataTables a
		 * source to obtain the required data for each draw.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverSide
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "serverSide": true,
		 *        "ajax": "xhr.php"
		 *      } );
		 *    } );
		 */
		"bServerSide": false,


		/**
		 * Enable or disable sorting of columns. Sorting of individual columns can be
		 * disabled by the `sortable` option for each column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.ordering
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "ordering": false
		 *      } );
		 *    } );
		 */
		"bSort": true,


		/**
		 * Enable or display DataTables' ability to sort multiple columns at the
		 * same time (activated by shift-click by the user).
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.orderMulti
		 *
		 *  @example
		 *    // Disable multiple column sorting ability
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "orderMulti": false
		 *      } );
		 *    } );
		 */
		"bSortMulti": true,


		/**
		 * Allows control over whether DataTables should use the top (true) unique
		 * cell that is found for a single column, or the bottom (false - default).
		 * This is useful when using complex headers.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.orderCellsTop
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "orderCellsTop": true
		 *      } );
		 *    } );
		 */
		"bSortCellsTop": false,


		/**
		 * Enable or disable the addition of the classes `sorting\_1`, `sorting\_2` and
		 * `sorting\_3` to the columns which are currently being sorted on. This is
		 * presented as a feature switch as it can increase processing time (while
		 * classes are removed and added) so for large data sets you might want to
		 * turn this off.
		 *  @type boolean
		 *  @default true
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.orderClasses
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "orderClasses": false
		 *      } );
		 *    } );
		 */
		"bSortClasses": true,


		/**
		 * Enable or disable state saving. When enabled HTML5 `localStorage` will be
		 * used to save table display information such as pagination information,
		 * display length, filtering and sorting. As such when the end user reloads
		 * the page the display display will match what thy had previously set up.
		 *
		 * Due to the use of `localStorage` the default state saving is not supported
		 * in IE6 or 7. If state saving is required in those browsers, use
		 * `stateSaveCallback` to provide a storage solution such as cookies.
		 *  @type boolean
		 *  @default false
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.stateSave
		 *
		 *  @example
		 *    $(document).ready( function () {
		 *      $('#example').dataTable( {
		 *        "stateSave": true
		 *      } );
		 *    } );
		 */
		"bStateSave": false,


		/**
		 * This function is called when a TR element is created (and all TD child
		 * elements have been inserted), or registered if using a DOM source, allowing
		 * manipulation of the TR element (adding classes etc).
		 *  @type function
		 *  @param {node} row "TR" element for the current row
		 *  @param {array} data Raw data array for this row
		 *  @param {int} dataIndex The index of this row in the internal aoData array
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.createdRow
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "createdRow": function( row, data, dataIndex ) {
		 *          // Bold the grade for all 'A' grade browsers
		 *          if ( data[4] == "A" )
		 *          {
		 *            $('td:eq(4)', row).html( '<b>A</b>' );
		 *          }
		 *        }
		 *      } );
		 *    } );
		 */
		"fnCreatedRow": null,


		/**
		 * This function is called on every 'draw' event, and allows you to
		 * dynamically modify any aspect you want about the created DOM.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.drawCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "drawCallback": function( settings ) {
		 *          alert( 'DataTables has redrawn the table' );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnDrawCallback": null,


		/**
		 * Identical to fnHeaderCallback() but for the table footer this function
		 * allows you to modify the table footer on every 'draw' event.
		 *  @type function
		 *  @param {node} foot "TR" element for the footer
		 *  @param {array} data Full table data (as derived from the original HTML)
		 *  @param {int} start Index for the current display starting point in the
		 *    display array
		 *  @param {int} end Index for the current display ending point in the
		 *    display array
		 *  @param {array int} display Index array to translate the visual position
		 *    to the full data array
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.footerCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "footerCallback": function( tfoot, data, start, end, display ) {
		 *          tfoot.getElementsByTagName('th')[0].innerHTML = "Starting index is "+start;
		 *        }
		 *      } );
		 *    } )
		 */
		"fnFooterCallback": null,


		/**
		 * When rendering large numbers in the information element for the table
		 * (i.e. "Showing 1 to 10 of 57 entries") DataTables will render large numbers
		 * to have a comma separator for the 'thousands' units (e.g. 1 million is
		 * rendered as "1,000,000") to help readability for the end user. This
		 * function will override the default method DataTables uses.
		 *  @type function
		 *  @member
		 *  @param {int} toFormat number to be formatted
		 *  @returns {string} formatted string for DataTables to show the number
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.formatNumber
		 *
		 *  @example
		 *    // Format a number using a single quote for the separator (note that
		 *    // this can also be done with the language.thousands option)
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "formatNumber": function ( toFormat ) {
		 *          return toFormat.toString().replace(
		 *            /\B(?=(\d{3})+(?!\d))/g, "'"
		 *          );
		 *        };
		 *      } );
		 *    } );
		 */
		"fnFormatNumber": function ( toFormat ) {
			return toFormat.toString().replace(
				/\B(?=(\d{3})+(?!\d))/g,
				this.oLanguage.sThousands
			);
		},


		/**
		 * This function is called on every 'draw' event, and allows you to
		 * dynamically modify the header row. This can be used to calculate and
		 * display useful information about the table.
		 *  @type function
		 *  @param {node} head "TR" element for the header
		 *  @param {array} data Full table data (as derived from the original HTML)
		 *  @param {int} start Index for the current display starting point in the
		 *    display array
		 *  @param {int} end Index for the current display ending point in the
		 *    display array
		 *  @param {array int} display Index array to translate the visual position
		 *    to the full data array
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.headerCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "fheaderCallback": function( head, data, start, end, display ) {
		 *          head.getElementsByTagName('th')[0].innerHTML = "Displaying "+(end-start)+" records";
		 *        }
		 *      } );
		 *    } )
		 */
		"fnHeaderCallback": null,


		/**
		 * The information element can be used to convey information about the current
		 * state of the table. Although the internationalisation options presented by
		 * DataTables are quite capable of dealing with most customisations, there may
		 * be times where you wish to customise the string further. This callback
		 * allows you to do exactly that.
		 *  @type function
		 *  @param {object} oSettings DataTables settings object
		 *  @param {int} start Starting position in data for the draw
		 *  @param {int} end End position in data for the draw
		 *  @param {int} max Total number of rows in the table (regardless of
		 *    filtering)
		 *  @param {int} total Total number of rows in the data set, after filtering
		 *  @param {string} pre The string that DataTables has formatted using it's
		 *    own rules
		 *  @returns {string} The string to be displayed in the information element.
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.infoCallback
		 *
		 *  @example
		 *    $('#example').dataTable( {
		 *      "infoCallback": function( settings, start, end, max, total, pre ) {
		 *        return start +" to "+ end;
		 *      }
		 *    } );
		 */
		"fnInfoCallback": null,


		/**
		 * Called when the table has been initialised. Normally DataTables will
		 * initialise sequentially and there will be no need for this function,
		 * however, this does not hold true when using external language information
		 * since that is obtained using an async XHR call.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} json The JSON object request from the server - only
		 *    present if client-side Ajax sourced data is used
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.initComplete
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "initComplete": function(settings, json) {
		 *          alert( 'DataTables has finished its initialisation.' );
		 *        }
		 *      } );
		 *    } )
		 */
		"fnInitComplete": null,


		/**
		 * Called at the very start of each table draw and can be used to cancel the
		 * draw by returning false, any other return (including undefined) results in
		 * the full draw occurring).
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @returns {boolean} False will cancel the draw, anything else (including no
		 *    return) will allow it to complete.
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.preDrawCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "preDrawCallback": function( settings ) {
		 *          if ( $('#test').val() == 1 ) {
		 *            return false;
		 *          }
		 *        }
		 *      } );
		 *    } );
		 */
		"fnPreDrawCallback": null,


		/**
		 * This function allows you to 'post process' each row after it have been
		 * generated for each table draw, but before it is rendered on screen. This
		 * function might be used for setting the row class name etc.
		 *  @type function
		 *  @param {node} row "TR" element for the current row
		 *  @param {array} data Raw data array for this row
		 *  @param {int} displayIndex The display index for the current table draw
		 *  @param {int} displayIndexFull The index of the data in the full list of
		 *    rows (after filtering)
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.rowCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "rowCallback": function( row, data, displayIndex, displayIndexFull ) {
		 *          // Bold the grade for all 'A' grade browsers
		 *          if ( data[4] == "A" ) {
		 *            $('td:eq(4)', row).html( '<b>A</b>' );
		 *          }
		 *        }
		 *      } );
		 *    } );
		 */
		"fnRowCallback": null,


		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * This parameter allows you to override the default function which obtains
		 * the data from the server so something more suitable for your application.
		 * For example you could use POST data, or pull information from a Gears or
		 * AIR database.
		 *  @type function
		 *  @member
		 *  @param {string} source HTTP source to obtain the data from (`ajax`)
		 *  @param {array} data A key/value pair object containing the data to send
		 *    to the server
		 *  @param {function} callback to be called on completion of the data get
		 *    process that will draw the data on the page.
		 *  @param {object} settings DataTables settings object
		 *
		 *  @dtopt Callbacks
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverData
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"fnServerData": null,


		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 *  It is often useful to send extra data to the server when making an Ajax
		 * request - for example custom filtering information, and this callback
		 * function makes it trivial to send extra information to the server. The
		 * passed in parameter is the data set that has been constructed by
		 * DataTables, and you can add to this or modify it as you require.
		 *  @type function
		 *  @param {array} data Data array (array of objects which are name/value
		 *    pairs) that has been constructed by DataTables and will be sent to the
		 *    server. In the case of Ajax sourced data with server-side processing
		 *    this will be an empty array, for server-side processing there will be a
		 *    significant number of parameters!
		 *  @returns {undefined} Ensure that you modify the data array passed in,
		 *    as this is passed by reference.
		 *
		 *  @dtopt Callbacks
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverParams
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"fnServerParams": null,


		/**
		 * Load the table state. With this function you can define from where, and how, the
		 * state of a table is loaded. By default DataTables will load from `localStorage`
		 * but you might wish to use a server-side database or cookies.
		 *  @type function
		 *  @member
		 *  @param {object} settings DataTables settings object
		 *  @param {object} callback Callback that can be executed when done. It
		 *    should be passed the loaded state object.
		 *  @return {object} The DataTables state object to be loaded
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateLoadCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoadCallback": function (settings, callback) {
		 *          $.ajax( {
		 *            "url": "/state_load",
		 *            "dataType": "json",
		 *            "success": function (json) {
		 *              callback( json );
		 *            }
		 *          } );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateLoadCallback": function ( settings ) {
			try {
				return JSON.parse(
					(settings.iStateDuration === -1 ? sessionStorage : localStorage).getItem(
						'DataTables_'+settings.sInstance+'_'+location.pathname
					)
				);
			} catch (e) {}
		},


		/**
		 * Callback which allows modification of the saved state prior to loading that state.
		 * This callback is called when the table is loading state from the stored data, but
		 * prior to the settings object being modified by the saved state. Note that for
		 * plug-in authors, you should use the `stateLoadParams` event to load parameters for
		 * a plug-in.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object that is to be loaded
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateLoadParams
		 *
		 *  @example
		 *    // Remove a saved filter, so filtering is never loaded
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoadParams": function (settings, data) {
		 *          data.oSearch.sSearch = "";
		 *        }
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Disallow state loading by returning false
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoadParams": function (settings, data) {
		 *          return false;
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateLoadParams": null,


		/**
		 * Callback that is called when the state has been loaded from the state saving method
		 * and the DataTables settings object has been modified as a result of the loaded state.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object that was loaded
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateLoaded
		 *
		 *  @example
		 *    // Show an alert with the filtering value that was saved
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateLoaded": function (settings, data) {
		 *          alert( 'Saved filter was: '+data.oSearch.sSearch );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateLoaded": null,


		/**
		 * Save the table state. This function allows you to define where and how the state
		 * information for the table is stored By default DataTables will use `localStorage`
		 * but you might wish to use a server-side database or cookies.
		 *  @type function
		 *  @member
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object to be saved
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateSaveCallback
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateSaveCallback": function (settings, data) {
		 *          // Send an Ajax request to the server with the state object
		 *          $.ajax( {
		 *            "url": "/state_save",
		 *            "data": data,
		 *            "dataType": "json",
		 *            "method": "POST"
		 *            "success": function () {}
		 *          } );
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateSaveCallback": function ( settings, data ) {
			try {
				(settings.iStateDuration === -1 ? sessionStorage : localStorage).setItem(
					'DataTables_'+settings.sInstance+'_'+location.pathname,
					JSON.stringify( data )
				);
			} catch (e) {}
		},


		/**
		 * Callback which allows modification of the state to be saved. Called when the table
		 * has changed state a new state save is required. This method allows modification of
		 * the state saving object prior to actually doing the save, including addition or
		 * other state properties or modification. Note that for plug-in authors, you should
		 * use the `stateSaveParams` event to save parameters for a plug-in.
		 *  @type function
		 *  @param {object} settings DataTables settings object
		 *  @param {object} data The state object to be saved
		 *
		 *  @dtopt Callbacks
		 *  @name DataTable.defaults.stateSaveParams
		 *
		 *  @example
		 *    // Remove a saved filter, so filtering is never saved
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateSave": true,
		 *        "stateSaveParams": function (settings, data) {
		 *          data.oSearch.sSearch = "";
		 *        }
		 *      } );
		 *    } );
		 */
		"fnStateSaveParams": null,


		/**
		 * Duration for which the saved state information is considered valid. After this period
		 * has elapsed the state will be returned to the default.
		 * Value is given in seconds.
		 *  @type int
		 *  @default 7200 <i>(2 hours)</i>
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.stateDuration
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "stateDuration": 60*60*24; // 1 day
		 *      } );
		 *    } )
		 */
		"iStateDuration": 7200,


		/**
		 * When enabled DataTables will not make a request to the server for the first
		 * page draw - rather it will use the data already on the page (no sorting etc
		 * will be applied to it), thus saving on an XHR at load time. `deferLoading`
		 * is used to indicate that deferred loading is required, but it is also used
		 * to tell DataTables how many records there are in the full table (allowing
		 * the information element and pagination to be displayed correctly). In the case
		 * where a filtering is applied to the table on initial load, this can be
		 * indicated by giving the parameter as an array, where the first element is
		 * the number of records available after filtering and the second element is the
		 * number of records without filtering (allowing the table information element
		 * to be shown correctly).
		 *  @type int | array
		 *  @default null
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.deferLoading
		 *
		 *  @example
		 *    // 57 records available in the table, no filtering applied
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "serverSide": true,
		 *        "ajax": "scripts/server_processing.php",
		 *        "deferLoading": 57
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // 57 records after filtering, 100 without filtering (an initial filter applied)
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "serverSide": true,
		 *        "ajax": "scripts/server_processing.php",
		 *        "deferLoading": [ 57, 100 ],
		 *        "search": {
		 *          "search": "my_filter"
		 *        }
		 *      } );
		 *    } );
		 */
		"iDeferLoading": null,


		/**
		 * Number of rows to display on a single page when using pagination. If
		 * feature enabled (`lengthChange`) then the end user will be able to override
		 * this to a custom setting using a pop-up menu.
		 *  @type int
		 *  @default 10
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.pageLength
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "pageLength": 50
		 *      } );
		 *    } )
		 */
		"iDisplayLength": 10,


		/**
		 * Define the starting point for data display when using DataTables with
		 * pagination. Note that this parameter is the number of records, rather than
		 * the page number, so if you have 10 records per page and want to start on
		 * the third page, it should be "20".
		 *  @type int
		 *  @default 0
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.displayStart
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "displayStart": 20
		 *      } );
		 *    } )
		 */
		"iDisplayStart": 0,


		/**
		 * By default DataTables allows keyboard navigation of the table (sorting, paging,
		 * and filtering) by adding a `tabindex` attribute to the required elements. This
		 * allows you to tab through the controls and press the enter key to activate them.
		 * The tabindex is default 0, meaning that the tab follows the flow of the document.
		 * You can overrule this using this parameter if you wish. Use a value of -1 to
		 * disable built-in keyboard navigation.
		 *  @type int
		 *  @default 0
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.tabIndex
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "tabIndex": 1
		 *      } );
		 *    } );
		 */
		"iTabIndex": 0,


		/**
		 * Classes that DataTables assigns to the various components and features
		 * that it adds to the HTML table. This allows classes to be configured
		 * during initialisation in addition to through the static
		 * {@link DataTable.ext.oStdClasses} object).
		 *  @namespace
		 *  @name DataTable.defaults.classes
		 */
		"oClasses": {},


		/**
		 * All strings that DataTables uses in the user interface that it creates
		 * are defined in this object, allowing you to modified them individually or
		 * completely replace them all as required.
		 *  @namespace
		 *  @name DataTable.defaults.language
		 */
		"oLanguage": {
			/**
			 * Strings that are used for WAI-ARIA labels and controls only (these are not
			 * actually visible on the page, but will be read by screenreaders, and thus
			 * must be internationalised as well).
			 *  @namespace
			 *  @name DataTable.defaults.language.aria
			 */
			"oAria": {
				/**
				 * ARIA label that is added to the table headers when the column may be
				 * sorted ascending by activing the column (click or return when focused).
				 * Note that the column header is prefixed to this string.
				 *  @type string
				 *  @default : activate to sort column ascending
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.aria.sortAscending
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "aria": {
				 *            "sortAscending": " - click/return to sort ascending"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sSortAscending": ": activate to sort column ascending",

				/**
				 * ARIA label that is added to the table headers when the column may be
				 * sorted descending by activing the column (click or return when focused).
				 * Note that the column header is prefixed to this string.
				 *  @type string
				 *  @default : activate to sort column ascending
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.aria.sortDescending
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "aria": {
				 *            "sortDescending": " - click/return to sort descending"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sSortDescending": ": activate to sort column descending"
			},

			/**
			 * Pagination string used by DataTables for the built-in pagination
			 * control types.
			 *  @namespace
			 *  @name DataTable.defaults.language.paginate
			 */
			"oPaginate": {
				/**
				 * Text to use when using the 'full_numbers' type of pagination for the
				 * button to take the user to the first page.
				 *  @type string
				 *  @default First
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.first
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "first": "First page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sFirst": "First",


				/**
				 * Text to use when using the 'full_numbers' type of pagination for the
				 * button to take the user to the last page.
				 *  @type string
				 *  @default Last
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.last
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "last": "Last page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sLast": "Last",


				/**
				 * Text to use for the 'next' pagination button (to take the user to the
				 * next page).
				 *  @type string
				 *  @default Next
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.next
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "next": "Next page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sNext": "Next",


				/**
				 * Text to use for the 'previous' pagination button (to take the user to
				 * the previous page).
				 *  @type string
				 *  @default Previous
				 *
				 *  @dtopt Language
				 *  @name DataTable.defaults.language.paginate.previous
				 *
				 *  @example
				 *    $(document).ready( function() {
				 *      $('#example').dataTable( {
				 *        "language": {
				 *          "paginate": {
				 *            "previous": "Previous page"
				 *          }
				 *        }
				 *      } );
				 *    } );
				 */
				"sPrevious": "Previous"
			},

			/**
			 * This string is shown in preference to `zeroRecords` when the table is
			 * empty of data (regardless of filtering). Note that this is an optional
			 * parameter - if it is not given, the value of `zeroRecords` will be used
			 * instead (either the default or given value).
			 *  @type string
			 *  @default No data available in table
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.emptyTable
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "emptyTable": "No data available in table"
			 *        }
			 *      } );
			 *    } );
			 */
			"sEmptyTable": "No data available in table",


			/**
			 * This string gives information to the end user about the information
			 * that is current on display on the page. The following tokens can be
			 * used in the string and will be dynamically replaced as the table
			 * display updates. This tokens can be placed anywhere in the string, or
			 * removed as needed by the language requires:
			 *
			 * * `\_START\_` - Display index of the first record on the current page
			 * * `\_END\_` - Display index of the last record on the current page
			 * * `\_TOTAL\_` - Number of records in the table after filtering
			 * * `\_MAX\_` - Number of records in the table without filtering
			 * * `\_PAGE\_` - Current page number
			 * * `\_PAGES\_` - Total number of pages of data in the table
			 *
			 *  @type string
			 *  @default Showing _START_ to _END_ of _TOTAL_ entries
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.info
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "info": "Showing page _PAGE_ of _PAGES_"
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfo": "Showing _START_ to _END_ of _TOTAL_ entries",


			/**
			 * Display information string for when the table is empty. Typically the
			 * format of this string should match `info`.
			 *  @type string
			 *  @default Showing 0 to 0 of 0 entries
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.infoEmpty
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "infoEmpty": "No entries to show"
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfoEmpty": "Showing 0 to 0 of 0 entries",


			/**
			 * When a user filters the information in a table, this string is appended
			 * to the information (`info`) to give an idea of how strong the filtering
			 * is. The variable _MAX_ is dynamically updated.
			 *  @type string
			 *  @default (filtered from _MAX_ total entries)
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.infoFiltered
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "infoFiltered": " - filtering from _MAX_ records"
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfoFiltered": "(filtered from _MAX_ total entries)",


			/**
			 * If can be useful to append extra information to the info string at times,
			 * and this variable does exactly that. This information will be appended to
			 * the `info` (`infoEmpty` and `infoFiltered` in whatever combination they are
			 * being used) at all times.
			 *  @type string
			 *  @default <i>Empty string</i>
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.infoPostFix
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "infoPostFix": "All records shown are derived from real information."
			 *        }
			 *      } );
			 *    } );
			 */
			"sInfoPostFix": "",


			/**
			 * This decimal place operator is a little different from the other
			 * language options since DataTables doesn't output floating point
			 * numbers, so it won't ever use this for display of a number. Rather,
			 * what this parameter does is modify the sort methods of the table so
			 * that numbers which are in a format which has a character other than
			 * a period (`.`) as a decimal place will be sorted numerically.
			 *
			 * Note that numbers with different decimal places cannot be shown in
			 * the same table and still be sortable, the table must be consistent.
			 * However, multiple different tables on the page can use different
			 * decimal place characters.
			 *  @type string
			 *  @default
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.decimal
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "decimal": ","
			 *          "thousands": "."
			 *        }
			 *      } );
			 *    } );
			 */
			"sDecimal": "",


			/**
			 * DataTables has a build in number formatter (`formatNumber`) which is
			 * used to format large numbers that are used in the table information.
			 * By default a comma is used, but this can be trivially changed to any
			 * character you wish with this parameter.
			 *  @type string
			 *  @default ,
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.thousands
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "thousands": "'"
			 *        }
			 *      } );
			 *    } );
			 */
			"sThousands": ",",


			/**
			 * Detail the action that will be taken when the drop down menu for the
			 * pagination length option is changed. The '_MENU_' variable is replaced
			 * with a default select list of 10, 25, 50 and 100, and can be replaced
			 * with a custom select box if required.
			 *  @type string
			 *  @default Show _MENU_ entries
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.lengthMenu
			 *
			 *  @example
			 *    // Language change only
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "lengthMenu": "Display _MENU_ records"
			 *        }
			 *      } );
			 *    } );
			 *
			 *  @example
			 *    // Language and options change
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "lengthMenu": 'Display <select>'+
			 *            '<option value="10">10</option>'+
			 *            '<option value="20">20</option>'+
			 *            '<option value="30">30</option>'+
			 *            '<option value="40">40</option>'+
			 *            '<option value="50">50</option>'+
			 *            '<option value="-1">All</option>'+
			 *            '</select> records'
			 *        }
			 *      } );
			 *    } );
			 */
			"sLengthMenu": "Show _MENU_ entries",


			/**
			 * When using Ajax sourced data and during the first draw when DataTables is
			 * gathering the data, this message is shown in an empty row in the table to
			 * indicate to the end user the the data is being loaded. Note that this
			 * parameter is not used when loading data by server-side processing, just
			 * Ajax sourced data with client-side processing.
			 *  @type string
			 *  @default Loading...
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.loadingRecords
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "loadingRecords": "Please wait - loading..."
			 *        }
			 *      } );
			 *    } );
			 */
			"sLoadingRecords": "Loading...",


			/**
			 * Text which is displayed when the table is processing a user action
			 * (usually a sort command or similar).
			 *  @type string
			 *  @default Processing...
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.processing
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "processing": "DataTables is currently busy"
			 *        }
			 *      } );
			 *    } );
			 */
			"sProcessing": "Processing...",


			/**
			 * Details the actions that will be taken when the user types into the
			 * filtering input text box. The variable "_INPUT_", if used in the string,
			 * is replaced with the HTML text box for the filtering input allowing
			 * control over where it appears in the string. If "_INPUT_" is not given
			 * then the input box is appended to the string automatically.
			 *  @type string
			 *  @default Search:
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.search
			 *
			 *  @example
			 *    // Input text box will be appended at the end automatically
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "search": "Filter records:"
			 *        }
			 *      } );
			 *    } );
			 *
			 *  @example
			 *    // Specify where the filter should appear
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "search": "Apply filter _INPUT_ to table"
			 *        }
			 *      } );
			 *    } );
			 */
			"sSearch": "Search:",


			/**
			 * Assign a `placeholder` attribute to the search `input` element
			 *  @type string
			 *  @default
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.searchPlaceholder
			 */
			"sSearchPlaceholder": "",


			/**
			 * All of the language information can be stored in a file on the
			 * server-side, which DataTables will look up if this parameter is passed.
			 * It must store the URL of the language file, which is in a JSON format,
			 * and the object has the same properties as the oLanguage object in the
			 * initialiser object (i.e. the above parameters). Please refer to one of
			 * the example language files to see how this works in action.
			 *  @type string
			 *  @default <i>Empty string - i.e. disabled</i>
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.url
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "url": "http://www.sprymedia.co.uk/dataTables/lang.txt"
			 *        }
			 *      } );
			 *    } );
			 */
			"sUrl": "",


			/**
			 * Text shown inside the table records when the is no information to be
			 * displayed after filtering. `emptyTable` is shown when there is simply no
			 * information in the table at all (regardless of filtering).
			 *  @type string
			 *  @default No matching records found
			 *
			 *  @dtopt Language
			 *  @name DataTable.defaults.language.zeroRecords
			 *
			 *  @example
			 *    $(document).ready( function() {
			 *      $('#example').dataTable( {
			 *        "language": {
			 *          "zeroRecords": "No records to display"
			 *        }
			 *      } );
			 *    } );
			 */
			"sZeroRecords": "No matching records found"
		},


		/**
		 * This parameter allows you to have define the global filtering state at
		 * initialisation time. As an object the `search` parameter must be
		 * defined, but all other parameters are optional. When `regex` is true,
		 * the search string will be treated as a regular expression, when false
		 * (default) it will be treated as a straight string. When `smart`
		 * DataTables will use it's smart filtering methods (to word match at
		 * any point in the data), when false this will not be done.
		 *  @namespace
		 *  @extends DataTable.models.oSearch
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.search
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "search": {"search": "Initial search"}
		 *      } );
		 *    } )
		 */
		"oSearch": $.extend( {}, DataTable.models.oSearch ),


		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * By default DataTables will look for the property `data` (or `aaData` for
		 * compatibility with DataTables 1.9-) when obtaining data from an Ajax
		 * source or for server-side processing - this parameter allows that
		 * property to be changed. You can use Javascript dotted object notation to
		 * get a data source for multiple levels of nesting.
		 *  @type string
		 *  @default data
		 *
		 *  @dtopt Options
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.ajaxDataProp
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"sAjaxDataProp": "data",


		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * You can instruct DataTables to load data from an external
		 * source using this parameter (use aData if you want to pass data in you
		 * already have). Simply provide a url a JSON object can be obtained from.
		 *  @type string
		 *  @default null
		 *
		 *  @dtopt Options
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.ajaxSource
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"sAjaxSource": null,


		/**
		 * This initialisation variable allows you to specify exactly where in the
		 * DOM you want DataTables to inject the various controls it adds to the page
		 * (for example you might want the pagination controls at the top of the
		 * table). DIV elements (with or without a custom class) can also be added to
		 * aid styling. The follow syntax is used:
		 *   <ul>
		 *     <li>The following options are allowed:
		 *       <ul>
		 *         <li>'l' - Length changing</li>
		 *         <li>'f' - Filtering input</li>
		 *         <li>'t' - The table!</li>
		 *         <li>'i' - Information</li>
		 *         <li>'p' - Pagination</li>
		 *         <li>'r' - pRocessing</li>
		 *       </ul>
		 *     </li>
		 *     <li>The following constants are allowed:
		 *       <ul>
		 *         <li>'H' - jQueryUI theme "header" classes ('fg-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix')</li>
		 *         <li>'F' - jQueryUI theme "footer" classes ('fg-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix')</li>
		 *       </ul>
		 *     </li>
		 *     <li>The following syntax is expected:
		 *       <ul>
		 *         <li>'&lt;' and '&gt;' - div elements</li>
		 *         <li>'&lt;"class" and '&gt;' - div with a class</li>
		 *         <li>'&lt;"#id" and '&gt;' - div with an ID</li>
		 *       </ul>
		 *     </li>
		 *     <li>Examples:
		 *       <ul>
		 *         <li>'&lt;"wrapper"flipt&gt;'</li>
		 *         <li>'&lt;lf&lt;t&gt;ip&gt;'</li>
		 *       </ul>
		 *     </li>
		 *   </ul>
		 *  @type string
		 *  @default lfrtip <i>(when `jQueryUI` is false)</i> <b>or</b>
		 *    <"H"lfr>t<"F"ip> <i>(when `jQueryUI` is true)</i>
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.dom
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "dom": '&lt;"top"i&gt;rt&lt;"bottom"flp&gt;&lt;"clear"&gt;'
		 *      } );
		 *    } );
		 */
		"sDom": "lfrtip",


		/**
		 * Search delay option. This will throttle full table searches that use the
		 * DataTables provided search input element (it does not effect calls to
		 * `dt-api search()`, providing a delay before the search is made.
		 *  @type integer
		 *  @default 0
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.searchDelay
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "searchDelay": 200
		 *      } );
		 *    } )
		 */
		"searchDelay": null,


		/**
		 * DataTables features six different built-in options for the buttons to
		 * display for pagination control:
		 *
		 * * `numbers` - Page number buttons only
		 * * `simple` - 'Previous' and 'Next' buttons only
		 * * 'simple_numbers` - 'Previous' and 'Next' buttons, plus page numbers
		 * * `full` - 'First', 'Previous', 'Next' and 'Last' buttons
		 * * `full_numbers` - 'First', 'Previous', 'Next' and 'Last' buttons, plus page numbers
		 * * `first_last_numbers` - 'First' and 'Last' buttons, plus page numbers
		 *
		 * Further methods can be added using {@link DataTable.ext.oPagination}.
		 *  @type string
		 *  @default simple_numbers
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.pagingType
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "pagingType": "full_numbers"
		 *      } );
		 *    } )
		 */
		"sPaginationType": "simple_numbers",


		/**
		 * Enable horizontal scrolling. When a table is too wide to fit into a
		 * certain layout, or you have a large number of columns in the table, you
		 * can enable x-scrolling to show the table in a viewport, which can be
		 * scrolled. This property can be `true` which will allow the table to
		 * scroll horizontally when needed, or any CSS unit, or a number (in which
		 * case it will be treated as a pixel measurement). Setting as simply `true`
		 * is recommended.
		 *  @type boolean|string
		 *  @default <i>blank string - i.e. disabled</i>
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.scrollX
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollX": true,
		 *        "scrollCollapse": true
		 *      } );
		 *    } );
		 */
		"sScrollX": "",


		/**
		 * This property can be used to force a DataTable to use more width than it
		 * might otherwise do when x-scrolling is enabled. For example if you have a
		 * table which requires to be well spaced, this parameter is useful for
		 * "over-sizing" the table, and thus forcing scrolling. This property can by
		 * any CSS unit, or a number (in which case it will be treated as a pixel
		 * measurement).
		 *  @type string
		 *  @default <i>blank string - i.e. disabled</i>
		 *
		 *  @dtopt Options
		 *  @name DataTable.defaults.scrollXInner
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollX": "100%",
		 *        "scrollXInner": "110%"
		 *      } );
		 *    } );
		 */
		"sScrollXInner": "",


		/**
		 * Enable vertical scrolling. Vertical scrolling will constrain the DataTable
		 * to the given height, and enable scrolling for any data which overflows the
		 * current viewport. This can be used as an alternative to paging to display
		 * a lot of data in a small area (although paging and scrolling can both be
		 * enabled at the same time). This property can be any CSS unit, or a number
		 * (in which case it will be treated as a pixel measurement).
		 *  @type string
		 *  @default <i>blank string - i.e. disabled</i>
		 *
		 *  @dtopt Features
		 *  @name DataTable.defaults.scrollY
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "scrollY": "200px",
		 *        "paginate": false
		 *      } );
		 *    } );
		 */
		"sScrollY": "",


		/**
		 * __Deprecated__ The functionality provided by this parameter has now been
		 * superseded by that provided through `ajax`, which should be used instead.
		 *
		 * Set the HTTP method that is used to make the Ajax call for server-side
		 * processing or Ajax sourced data.
		 *  @type string
		 *  @default GET
		 *
		 *  @dtopt Options
		 *  @dtopt Server-side
		 *  @name DataTable.defaults.serverMethod
		 *
		 *  @deprecated 1.10. Please use `ajax` for this functionality now.
		 */
		"sServerMethod": "GET",


		/**
		 * DataTables makes use of renderers when displaying HTML elements for
		 * a table. These renderers can be added or modified by plug-ins to
		 * generate suitable mark-up for a site. For example the Bootstrap
		 * integration plug-in for DataTables uses a paging button renderer to
		 * display pagination buttons in the mark-up required by Bootstrap.
		 *
		 * For further information about the renderers available see
		 * DataTable.ext.renderer
		 *  @type string|object
		 *  @default null
		 *
		 *  @name DataTable.defaults.renderer
		 *
		 */
		"renderer": null,


		/**
		 * Set the data property name that DataTables should use to get a row's id
		 * to set as the `id` property in the node.
		 *  @type string
		 *  @default DT_RowId
		 *
		 *  @name DataTable.defaults.rowId
		 */
		"rowId": "DT_RowId"
	};

	_fnHungarianMap( DataTable.defaults );



	/*
	 * Developer note - See note in model.defaults.js about the use of Hungarian
	 * notation and camel case.
	 */

	/**
	 * Column options that can be given to DataTables at initialisation time.
	 *  @namespace
	 */
	DataTable.defaults.column = {
		/**
		 * Define which column(s) an order will occur on for this column. This
		 * allows a column's ordering to take multiple columns into account when
		 * doing a sort or use the data from a different column. For example first
		 * name / last name columns make sense to do a multi-column sort over the
		 * two columns.
		 *  @type array|int
		 *  @default null <i>Takes the value of the column index automatically</i>
		 *
		 *  @name DataTable.defaults.column.orderData
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderData": [ 0, 1 ], "targets": [ 0 ] },
		 *          { "orderData": [ 1, 0 ], "targets": [ 1 ] },
		 *          { "orderData": 2, "targets": [ 2 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "orderData": [ 0, 1 ] },
		 *          { "orderData": [ 1, 0 ] },
		 *          { "orderData": 2 },
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"aDataSort": null,
		"iDataSort": -1,


		/**
		 * You can control the default ordering direction, and even alter the
		 * behaviour of the sort handler (i.e. only allow ascending ordering etc)
		 * using this parameter.
		 *  @type array
		 *  @default [ 'asc', 'desc' ]
		 *
		 *  @name DataTable.defaults.column.orderSequence
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderSequence": [ "asc" ], "targets": [ 1 ] },
		 *          { "orderSequence": [ "desc", "asc", "asc" ], "targets": [ 2 ] },
		 *          { "orderSequence": [ "desc" ], "targets": [ 3 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          { "orderSequence": [ "asc" ] },
		 *          { "orderSequence": [ "desc", "asc", "asc" ] },
		 *          { "orderSequence": [ "desc" ] },
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"asSorting": [ 'asc', 'desc' ],


		/**
		 * Enable or disable filtering on the data in this column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @name DataTable.defaults.column.searchable
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "searchable": false, "targets": [ 0 ] }
		 *        ] } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "searchable": false },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ] } );
		 *    } );
		 */
		"bSearchable": true,


		/**
		 * Enable or disable ordering on this column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @name DataTable.defaults.column.orderable
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderable": false, "targets": [ 0 ] }
		 *        ] } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "orderable": false },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ] } );
		 *    } );
		 */
		"bSortable": true,


		/**
		 * Enable or disable the display of this column.
		 *  @type boolean
		 *  @default true
		 *
		 *  @name DataTable.defaults.column.visible
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "visible": false, "targets": [ 0 ] }
		 *        ] } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "visible": false },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ] } );
		 *    } );
		 */
		"bVisible": true,


		/**
		 * Developer definable function that is called whenever a cell is created (Ajax source,
		 * etc) or processed for input (DOM source). This can be used as a compliment to mRender
		 * allowing you to modify the DOM element (add background colour for example) when the
		 * element is available.
		 *  @type function
		 *  @param {element} td The TD node that has been created
		 *  @param {*} cellData The Data for the cell
		 *  @param {array|object} rowData The data for the whole row
		 *  @param {int} row The row index for the aoData data store
		 *  @param {int} col The column index for aoColumns
		 *
		 *  @name DataTable.defaults.column.createdCell
		 *  @dtopt Columns
		 *
		 *  @example
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [3],
		 *          "createdCell": function (td, cellData, rowData, row, col) {
		 *            if ( cellData == "1.7" ) {
		 *              $(td).css('color', 'blue')
		 *            }
		 *          }
		 *        } ]
		 *      });
		 *    } );
		 */
		"fnCreatedCell": null,


		/**
		 * This parameter has been replaced by `data` in DataTables to ensure naming
		 * consistency. `dataProp` can still be used, as there is backwards
		 * compatibility in DataTables for this option, but it is strongly
		 * recommended that you use `data` in preference to `dataProp`.
		 *  @name DataTable.defaults.column.dataProp
		 */


		/**
		 * This property can be used to read data from any data source property,
		 * including deeply nested objects / properties. `data` can be given in a
		 * number of different ways which effect its behaviour:
		 *
		 * * `integer` - treated as an array index for the data source. This is the
		 *   default that DataTables uses (incrementally increased for each column).
		 * * `string` - read an object property from the data source. There are
		 *   three 'special' options that can be used in the string to alter how
		 *   DataTables reads the data from the source object:
		 *    * `.` - Dotted Javascript notation. Just as you use a `.` in
		 *      Javascript to read from nested objects, so to can the options
		 *      specified in `data`. For example: `browser.version` or
		 *      `browser.name`. If your object parameter name contains a period, use
		 *      `\\` to escape it - i.e. `first\\.name`.
		 *    * `[]` - Array notation. DataTables can automatically combine data
		 *      from and array source, joining the data with the characters provided
		 *      between the two brackets. For example: `name[, ]` would provide a
		 *      comma-space separated list from the source array. If no characters
		 *      are provided between the brackets, the original array source is
		 *      returned.
		 *    * `()` - Function notation. Adding `()` to the end of a parameter will
		 *      execute a function of the name given. For example: `browser()` for a
		 *      simple function on the data source, `browser.version()` for a
		 *      function in a nested property or even `browser().version` to get an
		 *      object property if the function called returns an object. Note that
		 *      function notation is recommended for use in `render` rather than
		 *      `data` as it is much simpler to use as a renderer.
		 * * `null` - use the original data source for the row rather than plucking
		 *   data directly from it. This action has effects on two other
		 *   initialisation options:
		 *    * `defaultContent` - When null is given as the `data` option and
		 *      `defaultContent` is specified for the column, the value defined by
		 *      `defaultContent` will be used for the cell.
		 *    * `render` - When null is used for the `data` option and the `render`
		 *      option is specified for the column, the whole data source for the
		 *      row is used for the renderer.
		 * * `function` - the function given will be executed whenever DataTables
		 *   needs to set or get the data for a cell in the column. The function
		 *   takes three parameters:
		 *    * Parameters:
		 *      * `{array|object}` The data source for the row
		 *      * `{string}` The type call data requested - this will be 'set' when
		 *        setting data or 'filter', 'display', 'type', 'sort' or undefined
		 *        when gathering data. Note that when `undefined` is given for the
		 *        type DataTables expects to get the raw data for the object back<
		 *      * `{*}` Data to set when the second parameter is 'set'.
		 *    * Return:
		 *      * The return value from the function is not required when 'set' is
		 *        the type of call, but otherwise the return is what will be used
		 *        for the data requested.
		 *
		 * Note that `data` is a getter and setter option. If you just require
		 * formatting of data for output, you will likely want to use `render` which
		 * is simply a getter and thus simpler to use.
		 *
		 * Note that prior to DataTables 1.9.2 `data` was called `mDataProp`. The
		 * name change reflects the flexibility of this property and is consistent
		 * with the naming of mRender. If 'mDataProp' is given, then it will still
		 * be used by DataTables, as it automatically maps the old name to the new
		 * if required.
		 *
		 *  @type string|int|function|null
		 *  @default null <i>Use automatically calculated column index</i>
		 *
		 *  @name DataTable.defaults.column.data
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Read table data from objects
		 *    // JSON structure for each row:
		 *    //   {
		 *    //      "engine": {value},
		 *    //      "browser": {value},
		 *    //      "platform": {value},
		 *    //      "version": {value},
		 *    //      "grade": {value}
		 *    //   }
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajaxSource": "sources/objects.txt",
		 *        "columns": [
		 *          { "data": "engine" },
		 *          { "data": "browser" },
		 *          { "data": "platform" },
		 *          { "data": "version" },
		 *          { "data": "grade" }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Read information from deeply nested objects
		 *    // JSON structure for each row:
		 *    //   {
		 *    //      "engine": {value},
		 *    //      "browser": {value},
		 *    //      "platform": {
		 *    //         "inner": {value}
		 *    //      },
		 *    //      "details": [
		 *    //         {value}, {value}
		 *    //      ]
		 *    //   }
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajaxSource": "sources/deep.txt",
		 *        "columns": [
		 *          { "data": "engine" },
		 *          { "data": "browser" },
		 *          { "data": "platform.inner" },
		 *          { "data": "details.0" },
		 *          { "data": "details.1" }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `data` as a function to provide different information for
		 *    // sorting, filtering and display. In this case, currency (price)
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": function ( source, type, val ) {
		 *            if (type === 'set') {
		 *              source.price = val;
		 *              // Store the computed dislay and filter values for efficiency
		 *              source.price_display = val=="" ? "" : "$"+numberFormat(val);
		 *              source.price_filter  = val=="" ? "" : "$"+numberFormat(val)+" "+val;
		 *              return;
		 *            }
		 *            else if (type === 'display') {
		 *              return source.price_display;
		 *            }
		 *            else if (type === 'filter') {
		 *              return source.price_filter;
		 *            }
		 *            // 'sort', 'type' and undefined all just use the integer
		 *            return source.price;
		 *          }
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using default content
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": null,
		 *          "defaultContent": "Click to edit"
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using array notation - outputting a list from an array
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": "name[, ]"
		 *        } ]
		 *      } );
		 *    } );
		 *
		 */
		"mData": null,


		/**
		 * This property is the rendering partner to `data` and it is suggested that
		 * when you want to manipulate data for display (including filtering,
		 * sorting etc) without altering the underlying data for the table, use this
		 * property. `render` can be considered to be the the read only companion to
		 * `data` which is read / write (then as such more complex). Like `data`
		 * this option can be given in a number of different ways to effect its
		 * behaviour:
		 *
		 * * `integer` - treated as an array index for the data source. This is the
		 *   default that DataTables uses (incrementally increased for each column).
		 * * `string` - read an object property from the data source. There are
		 *   three 'special' options that can be used in the string to alter how
		 *   DataTables reads the data from the source object:
		 *    * `.` - Dotted Javascript notation. Just as you use a `.` in
		 *      Javascript to read from nested objects, so to can the options
		 *      specified in `data`. For example: `browser.version` or
		 *      `browser.name`. If your object parameter name contains a period, use
		 *      `\\` to escape it - i.e. `first\\.name`.
		 *    * `[]` - Array notation. DataTables can automatically combine data
		 *      from and array source, joining the data with the characters provided
		 *      between the two brackets. For example: `name[, ]` would provide a
		 *      comma-space separated list from the source array. If no characters
		 *      are provided between the brackets, the original array source is
		 *      returned.
		 *    * `()` - Function notation. Adding `()` to the end of a parameter will
		 *      execute a function of the name given. For example: `browser()` for a
		 *      simple function on the data source, `browser.version()` for a
		 *      function in a nested property or even `browser().version` to get an
		 *      object property if the function called returns an object.
		 * * `object` - use different data for the different data types requested by
		 *   DataTables ('filter', 'display', 'type' or 'sort'). The property names
		 *   of the object is the data type the property refers to and the value can
		 *   defined using an integer, string or function using the same rules as
		 *   `render` normally does. Note that an `_` option _must_ be specified.
		 *   This is the default value to use if you haven't specified a value for
		 *   the data type requested by DataTables.
		 * * `function` - the function given will be executed whenever DataTables
		 *   needs to set or get the data for a cell in the column. The function
		 *   takes three parameters:
		 *    * Parameters:
		 *      * {array|object} The data source for the row (based on `data`)
		 *      * {string} The type call data requested - this will be 'filter',
		 *        'display', 'type' or 'sort'.
		 *      * {array|object} The full data source for the row (not based on
		 *        `data`)
		 *    * Return:
		 *      * The return value from the function is what will be used for the
		 *        data requested.
		 *
		 *  @type string|int|function|object|null
		 *  @default null Use the data source value.
		 *
		 *  @name DataTable.defaults.column.render
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Create a comma separated list from an array of objects
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "ajaxSource": "sources/deep.txt",
		 *        "columns": [
		 *          { "data": "engine" },
		 *          { "data": "browser" },
		 *          {
		 *            "data": "platform",
		 *            "render": "[, ].name"
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Execute a function to obtain data
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": null, // Use the full data source object for the renderer's source
		 *          "render": "browserName()"
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // As an object, extracting different data for the different types
		 *    // This would be used with a data source such as:
		 *    //   { "phone": 5552368, "phone_filter": "5552368 555-2368", "phone_display": "555-2368" }
		 *    // Here the `phone` integer is used for sorting and type detection, while `phone_filter`
		 *    // (which has both forms) is used for filtering for if a user inputs either format, while
		 *    // the formatted phone number is the one that is shown in the table.
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": null, // Use the full data source object for the renderer's source
		 *          "render": {
		 *            "_": "phone",
		 *            "filter": "phone_filter",
		 *            "display": "phone_display"
		 *          }
		 *        } ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Use as a function to create a link from the data source
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "data": "download_link",
		 *          "render": function ( data, type, full ) {
		 *            return '<a href="'+data+'">Download</a>';
		 *          }
		 *        } ]
		 *      } );
		 *    } );
		 */
		"mRender": null,


		/**
		 * Change the cell type created for the column - either TD cells or TH cells. This
		 * can be useful as TH cells have semantic meaning in the table body, allowing them
		 * to act as a header for a row (you may wish to add scope='row' to the TH elements).
		 *  @type string
		 *  @default td
		 *
		 *  @name DataTable.defaults.column.cellType
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Make the first column use TH cells
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [ {
		 *          "targets": [ 0 ],
		 *          "cellType": "th"
		 *        } ]
		 *      } );
		 *    } );
		 */
		"sCellType": "td",


		/**
		 * Class to give to each cell in this column.
		 *  @type string
		 *  @default <i>Empty string</i>
		 *
		 *  @name DataTable.defaults.column.class
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "class": "my_class", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "class": "my_class" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sClass": "",

		/**
		 * When DataTables calculates the column widths to assign to each column,
		 * it finds the longest string in each column and then constructs a
		 * temporary table and reads the widths from that. The problem with this
		 * is that "mmm" is much wider then "iiii", but the latter is a longer
		 * string - thus the calculation can go wrong (doing it properly and putting
		 * it into an DOM object and measuring that is horribly(!) slow). Thus as
		 * a "work around" we provide this option. It will append its value to the
		 * text that is found to be the longest string for the column - i.e. padding.
		 * Generally you shouldn't need this!
		 *  @type string
		 *  @default <i>Empty string<i>
		 *
		 *  @name DataTable.defaults.column.contentPadding
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          null,
		 *          null,
		 *          {
		 *            "contentPadding": "mmm"
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sContentPadding": "",


		/**
		 * Allows a default value to be given for a column's data, and will be used
		 * whenever a null data source is encountered (this can be because `data`
		 * is set to null, or because the data source itself is null).
		 *  @type string
		 *  @default null
		 *
		 *  @name DataTable.defaults.column.defaultContent
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          {
		 *            "data": null,
		 *            "defaultContent": "Edit",
		 *            "targets": [ -1 ]
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          null,
		 *          null,
		 *          {
		 *            "data": null,
		 *            "defaultContent": "Edit"
		 *          }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sDefaultContent": null,


		/**
		 * This parameter is only used in DataTables' server-side processing. It can
		 * be exceptionally useful to know what columns are being displayed on the
		 * client side, and to map these to database fields. When defined, the names
		 * also allow DataTables to reorder information from the server if it comes
		 * back in an unexpected order (i.e. if you switch your columns around on the
		 * client-side, your server-side code does not also need updating).
		 *  @type string
		 *  @default <i>Empty string</i>
		 *
		 *  @name DataTable.defaults.column.name
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "name": "engine", "targets": [ 0 ] },
		 *          { "name": "browser", "targets": [ 1 ] },
		 *          { "name": "platform", "targets": [ 2 ] },
		 *          { "name": "version", "targets": [ 3 ] },
		 *          { "name": "grade", "targets": [ 4 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "name": "engine" },
		 *          { "name": "browser" },
		 *          { "name": "platform" },
		 *          { "name": "version" },
		 *          { "name": "grade" }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sName": "",


		/**
		 * Defines a data source type for the ordering which can be used to read
		 * real-time information from the table (updating the internally cached
		 * version) prior to ordering. This allows ordering to occur on user
		 * editable elements such as form inputs.
		 *  @type string
		 *  @default std
		 *
		 *  @name DataTable.defaults.column.orderDataType
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "orderDataType": "dom-text", "targets": [ 2, 3 ] },
		 *          { "type": "numeric", "targets": [ 3 ] },
		 *          { "orderDataType": "dom-select", "targets": [ 4 ] },
		 *          { "orderDataType": "dom-checkbox", "targets": [ 5 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          null,
		 *          null,
		 *          { "orderDataType": "dom-text" },
		 *          { "orderDataType": "dom-text", "type": "numeric" },
		 *          { "orderDataType": "dom-select" },
		 *          { "orderDataType": "dom-checkbox" }
		 *        ]
		 *      } );
		 *    } );
		 */
		"sSortDataType": "std",


		/**
		 * The title of this column.
		 *  @type string
		 *  @default null <i>Derived from the 'TH' value for this column in the
		 *    original HTML table.</i>
		 *
		 *  @name DataTable.defaults.column.title
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "title": "My column title", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "title": "My column title" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sTitle": null,


		/**
		 * The type allows you to specify how the data for this column will be
		 * ordered. Four types (string, numeric, date and html (which will strip
		 * HTML tags before ordering)) are currently available. Note that only date
		 * formats understood by Javascript's Date() object will be accepted as type
		 * date. For example: "Mar 26, 2008 5:03 PM". May take the values: 'string',
		 * 'numeric', 'date' or 'html' (by default). Further types can be adding
		 * through plug-ins.
		 *  @type string
		 *  @default null <i>Auto-detected from raw data</i>
		 *
		 *  @name DataTable.defaults.column.type
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "type": "html", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "type": "html" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sType": null,


		/**
		 * Defining the width of the column, this parameter may take any CSS value
		 * (3em, 20px etc). DataTables applies 'smart' widths to columns which have not
		 * been given a specific width through this interface ensuring that the table
		 * remains readable.
		 *  @type string
		 *  @default null <i>Automatic</i>
		 *
		 *  @name DataTable.defaults.column.width
		 *  @dtopt Columns
		 *
		 *  @example
		 *    // Using `columnDefs`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columnDefs": [
		 *          { "width": "20%", "targets": [ 0 ] }
		 *        ]
		 *      } );
		 *    } );
		 *
		 *  @example
		 *    // Using `columns`
		 *    $(document).ready( function() {
		 *      $('#example').dataTable( {
		 *        "columns": [
		 *          { "width": "20%" },
		 *          null,
		 *          null,
		 *          null,
		 *          null
		 *        ]
		 *      } );
		 *    } );
		 */
		"sWidth": null
	};

	_fnHungarianMap( DataTable.defaults.column );



	/**
	 * DataTables settings object - this holds all the information needed for a
	 * given table, including configuration, data and current application of the
	 * table options. DataTables does not have a single instance for each DataTable
	 * with the settings attached to that instance, but rather instances of the
	 * DataTable "class" are created on-the-fly as needed (typically by a
	 * $().dataTable() call) and the settings object is then applied to that
	 * instance.
	 *
	 * Note that this object is related to {@link DataTable.defaults} but this
	 * one is the internal data store for DataTables's cache of columns. It should
	 * NOT be manipulated outside of DataTables. Any configuration should be done
	 * through the initialisation options.
	 *  @namespace
	 *  @todo Really should attach the settings object to individual instances so we
	 *    don't need to create new instances on each $().dataTable() call (if the
	 *    table already exists). It would also save passing oSettings around and
	 *    into every single function. However, this is a very significant
	 *    architecture change for DataTables and will almost certainly break
	 *    backwards compatibility with older installations. This is something that
	 *    will be done in 2.0.
	 */
	DataTable.models.oSettings = {
		/**
		 * Primary features of DataTables and their enablement state.
		 *  @namespace
		 */
		"oFeatures": {

			/**
			 * Flag to say if DataTables should automatically try to calculate the
			 * optimum table and columns widths (true) or not (false).
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bAutoWidth": null,

			/**
			 * Delay the creation of TR and TD elements until they are actually
			 * needed by a driven page draw. This can give a significant speed
			 * increase for Ajax source and Javascript source data, but makes no
			 * difference at all fro DOM and server-side processing tables.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bDeferRender": null,

			/**
			 * Enable filtering on the table or not. Note that if this is disabled
			 * then there is no filtering at all on the table, including fnFilter.
			 * To just remove the filtering input use sDom and remove the 'f' option.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bFilter": null,

			/**
			 * Table information element (the 'Showing x of y records' div) enable
			 * flag.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bInfo": null,

			/**
			 * Present a user control allowing the end user to change the page size
			 * when pagination is enabled.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bLengthChange": null,

			/**
			 * Pagination enabled or not. Note that if this is disabled then length
			 * changing must also be disabled.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bPaginate": null,

			/**
			 * Processing indicator enable flag whenever DataTables is enacting a
			 * user request - typically an Ajax request for server-side processing.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bProcessing": null,

			/**
			 * Server-side processing enabled flag - when enabled DataTables will
			 * get all data from the server for every draw - there is no filtering,
			 * sorting or paging done on the client-side.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bServerSide": null,

			/**
			 * Sorting enablement flag.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bSort": null,

			/**
			 * Multi-column sorting
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bSortMulti": null,

			/**
			 * Apply a class to the columns which are being sorted to provide a
			 * visual highlight or not. This can slow things down when enabled since
			 * there is a lot of DOM interaction.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bSortClasses": null,

			/**
			 * State saving enablement flag.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bStateSave": null
		},


		/**
		 * Scrolling settings for a table.
		 *  @namespace
		 */
		"oScroll": {
			/**
			 * When the table is shorter in height than sScrollY, collapse the
			 * table container down to the height of the table (when true).
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type boolean
			 */
			"bCollapse": null,

			/**
			 * Width of the scrollbar for the web-browser's platform. Calculated
			 * during table initialisation.
			 *  @type int
			 *  @default 0
			 */
			"iBarWidth": 0,

			/**
			 * Viewport width for horizontal scrolling. Horizontal scrolling is
			 * disabled if an empty string.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type string
			 */
			"sX": null,

			/**
			 * Width to expand the table to when using x-scrolling. Typically you
			 * should not need to use this.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type string
			 *  @deprecated
			 */
			"sXInner": null,

			/**
			 * Viewport height for vertical scrolling. Vertical scrolling is disabled
			 * if an empty string.
			 * Note that this parameter will be set by the initialisation routine. To
			 * set a default use {@link DataTable.defaults}.
			 *  @type string
			 */
			"sY": null
		},

		/**
		 * Language information for the table.
		 *  @namespace
		 *  @extends DataTable.defaults.oLanguage
		 */
		"oLanguage": {
			/**
			 * Information callback function. See
			 * {@link DataTable.defaults.fnInfoCallback}
			 *  @type function
			 *  @default null
			 */
			"fnInfoCallback": null
		},

		/**
		 * Browser support parameters
		 *  @namespace
		 */
		"oBrowser": {
			/**
			 * Indicate if the browser incorrectly calculates width:100% inside a
			 * scrolling element (IE6/7)
			 *  @type boolean
			 *  @default false
			 */
			"bScrollOversize": false,

			/**
			 * Determine if the vertical scrollbar is on the right or left of the
			 * scrolling container - needed for rtl language layout, although not
			 * all browsers move the scrollbar (Safari).
			 *  @type boolean
			 *  @default false
			 */
			"bScrollbarLeft": false,

			/**
			 * Flag for if `getBoundingClientRect` is fully supported or not
			 *  @type boolean
			 *  @default false
			 */
			"bBounding": false,

			/**
			 * Browser scrollbar width
			 *  @type integer
			 *  @default 0
			 */
			"barWidth": 0
		},


		"ajax": null,


		/**
		 * Array referencing the nodes which are used for the features. The
		 * parameters of this object match what is allowed by sDom - i.e.
		 *   <ul>
		 *     <li>'l' - Length changing</li>
		 *     <li>'f' - Filtering input</li>
		 *     <li>'t' - The table!</li>
		 *     <li>'i' - Information</li>
		 *     <li>'p' - Pagination</li>
		 *     <li>'r' - pRocessing</li>
		 *   </ul>
		 *  @type array
		 *  @default []
		 */
		"aanFeatures": [],

		/**
		 * Store data information - see {@link DataTable.models.oRow} for detailed
		 * information.
		 *  @type array
		 *  @default []
		 */
		"aoData": [],

		/**
		 * Array of indexes which are in the current display (after filtering etc)
		 *  @type array
		 *  @default []
		 */
		"aiDisplay": [],

		/**
		 * Array of indexes for display - no filtering
		 *  @type array
		 *  @default []
		 */
		"aiDisplayMaster": [],

		/**
		 * Map of row ids to data indexes
		 *  @type object
		 *  @default {}
		 */
		"aIds": {},

		/**
		 * Store information about each column that is in use
		 *  @type array
		 *  @default []
		 */
		"aoColumns": [],

		/**
		 * Store information about the table's header
		 *  @type array
		 *  @default []
		 */
		"aoHeader": [],

		/**
		 * Store information about the table's footer
		 *  @type array
		 *  @default []
		 */
		"aoFooter": [],

		/**
		 * Store the applied global search information in case we want to force a
		 * research or compare the old search to a new one.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @namespace
		 *  @extends DataTable.models.oSearch
		 */
		"oPreviousSearch": {},

		/**
		 * Store the applied search for each column - see
		 * {@link DataTable.models.oSearch} for the format that is used for the
		 * filtering information for each column.
		 *  @type array
		 *  @default []
		 */
		"aoPreSearchCols": [],

		/**
		 * Sorting that is applied to the table. Note that the inner arrays are
		 * used in the following manner:
		 * <ul>
		 *   <li>Index 0 - column number</li>
		 *   <li>Index 1 - current sorting direction</li>
		 * </ul>
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @todo These inner arrays should really be objects
		 */
		"aaSorting": null,

		/**
		 * Sorting that is always applied to the table (i.e. prefixed in front of
		 * aaSorting).
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @default []
		 */
		"aaSortingFixed": [],

		/**
		 * Classes to use for the striping of a table.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @default []
		 */
		"asStripeClasses": null,

		/**
		 * If restoring a table - we should restore its striping classes as well
		 *  @type array
		 *  @default []
		 */
		"asDestroyStripes": [],

		/**
		 * If restoring a table - we should restore its width
		 *  @type int
		 *  @default 0
		 */
		"sDestroyWidth": 0,

		/**
		 * Callback functions array for every time a row is inserted (i.e. on a draw).
		 *  @type array
		 *  @default []
		 */
		"aoRowCallback": [],

		/**
		 * Callback functions for the header on each draw.
		 *  @type array
		 *  @default []
		 */
		"aoHeaderCallback": [],

		/**
		 * Callback function for the footer on each draw.
		 *  @type array
		 *  @default []
		 */
		"aoFooterCallback": [],

		/**
		 * Array of callback functions for draw callback functions
		 *  @type array
		 *  @default []
		 */
		"aoDrawCallback": [],

		/**
		 * Array of callback functions for row created function
		 *  @type array
		 *  @default []
		 */
		"aoRowCreatedCallback": [],

		/**
		 * Callback functions for just before the table is redrawn. A return of
		 * false will be used to cancel the draw.
		 *  @type array
		 *  @default []
		 */
		"aoPreDrawCallback": [],

		/**
		 * Callback functions for when the table has been initialised.
		 *  @type array
		 *  @default []
		 */
		"aoInitComplete": [],


		/**
		 * Callbacks for modifying the settings to be stored for state saving, prior to
		 * saving state.
		 *  @type array
		 *  @default []
		 */
		"aoStateSaveParams": [],

		/**
		 * Callbacks for modifying the settings that have been stored for state saving
		 * prior to using the stored values to restore the state.
		 *  @type array
		 *  @default []
		 */
		"aoStateLoadParams": [],

		/**
		 * Callbacks for operating on the settings object once the saved state has been
		 * loaded
		 *  @type array
		 *  @default []
		 */
		"aoStateLoaded": [],

		/**
		 * Cache the table ID for quick access
		 *  @type string
		 *  @default <i>Empty string</i>
		 */
		"sTableId": "",

		/**
		 * The TABLE node for the main table
		 *  @type node
		 *  @default null
		 */
		"nTable": null,

		/**
		 * Permanent ref to the thead element
		 *  @type node
		 *  @default null
		 */
		"nTHead": null,

		/**
		 * Permanent ref to the tfoot element - if it exists
		 *  @type node
		 *  @default null
		 */
		"nTFoot": null,

		/**
		 * Permanent ref to the tbody element
		 *  @type node
		 *  @default null
		 */
		"nTBody": null,

		/**
		 * Cache the wrapper node (contains all DataTables controlled elements)
		 *  @type node
		 *  @default null
		 */
		"nTableWrapper": null,

		/**
		 * Indicate if when using server-side processing the loading of data
		 * should be deferred until the second draw.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type boolean
		 *  @default false
		 */
		"bDeferLoading": false,

		/**
		 * Indicate if all required information has been read in
		 *  @type boolean
		 *  @default false
		 */
		"bInitialised": false,

		/**
		 * Information about open rows. Each object in the array has the parameters
		 * 'nTr' and 'nParent'
		 *  @type array
		 *  @default []
		 */
		"aoOpenRows": [],

		/**
		 * Dictate the positioning of DataTables' control elements - see
		 * {@link DataTable.model.oInit.sDom}.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 *  @default null
		 */
		"sDom": null,

		/**
		 * Search delay (in mS)
		 *  @type integer
		 *  @default null
		 */
		"searchDelay": null,

		/**
		 * Which type of pagination should be used.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 *  @default two_button
		 */
		"sPaginationType": "two_button",

		/**
		 * The state duration (for `stateSave`) in seconds.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type int
		 *  @default 0
		 */
		"iStateDuration": 0,

		/**
		 * Array of callback functions for state saving. Each array element is an
		 * object with the following parameters:
		 *   <ul>
		 *     <li>function:fn - function to call. Takes two parameters, oSettings
		 *       and the JSON string to save that has been thus far created. Returns
		 *       a JSON string to be inserted into a json object
		 *       (i.e. '"param": [ 0, 1, 2]')</li>
		 *     <li>string:sName - name of callback</li>
		 *   </ul>
		 *  @type array
		 *  @default []
		 */
		"aoStateSave": [],

		/**
		 * Array of callback functions for state loading. Each array element is an
		 * object with the following parameters:
		 *   <ul>
		 *     <li>function:fn - function to call. Takes two parameters, oSettings
		 *       and the object stored. May return false to cancel state loading</li>
		 *     <li>string:sName - name of callback</li>
		 *   </ul>
		 *  @type array
		 *  @default []
		 */
		"aoStateLoad": [],

		/**
		 * State that was saved. Useful for back reference
		 *  @type object
		 *  @default null
		 */
		"oSavedState": null,

		/**
		 * State that was loaded. Useful for back reference
		 *  @type object
		 *  @default null
		 */
		"oLoadedState": null,

		/**
		 * Source url for AJAX data for the table.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 *  @default null
		 */
		"sAjaxSource": null,

		/**
		 * Property from a given object from which to read the table data from. This
		 * can be an empty string (when not server-side processing), in which case
		 * it is  assumed an an array is given directly.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 */
		"sAjaxDataProp": null,

		/**
		 * Note if draw should be blocked while getting data
		 *  @type boolean
		 *  @default true
		 */
		"bAjaxDataGet": true,

		/**
		 * The last jQuery XHR object that was used for server-side data gathering.
		 * This can be used for working with the XHR information in one of the
		 * callbacks
		 *  @type object
		 *  @default null
		 */
		"jqXHR": null,

		/**
		 * JSON returned from the server in the last Ajax request
		 *  @type object
		 *  @default undefined
		 */
		"json": undefined,

		/**
		 * Data submitted as part of the last Ajax request
		 *  @type object
		 *  @default undefined
		 */
		"oAjaxData": undefined,

		/**
		 * Function to get the server-side data.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type function
		 */
		"fnServerData": null,

		/**
		 * Functions which are called prior to sending an Ajax request so extra
		 * parameters can easily be sent to the server
		 *  @type array
		 *  @default []
		 */
		"aoServerParams": [],

		/**
		 * Send the XHR HTTP method - GET or POST (could be PUT or DELETE if
		 * required).
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type string
		 */
		"sServerMethod": null,

		/**
		 * Format numbers for display.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type function
		 */
		"fnFormatNumber": null,

		/**
		 * List of options that can be used for the user selectable length menu.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type array
		 *  @default []
		 */
		"aLengthMenu": null,

		/**
		 * Counter for the draws that the table does. Also used as a tracker for
		 * server-side processing
		 *  @type int
		 *  @default 0
		 */
		"iDraw": 0,

		/**
		 * Indicate if a redraw is being done - useful for Ajax
		 *  @type boolean
		 *  @default false
		 */
		"bDrawing": false,

		/**
		 * Draw index (iDraw) of the last error when parsing the returned data
		 *  @type int
		 *  @default -1
		 */
		"iDrawError": -1,

		/**
		 * Paging display length
		 *  @type int
		 *  @default 10
		 */
		"_iDisplayLength": 10,

		/**
		 * Paging start point - aiDisplay index
		 *  @type int
		 *  @default 0
		 */
		"_iDisplayStart": 0,

		/**
		 * Server-side processing - number of records in the result set
		 * (i.e. before filtering), Use fnRecordsTotal rather than
		 * this property to get the value of the number of records, regardless of
		 * the server-side processing setting.
		 *  @type int
		 *  @default 0
		 *  @private
		 */
		"_iRecordsTotal": 0,

		/**
		 * Server-side processing - number of records in the current display set
		 * (i.e. after filtering). Use fnRecordsDisplay rather than
		 * this property to get the value of the number of records, regardless of
		 * the server-side processing setting.
		 *  @type boolean
		 *  @default 0
		 *  @private
		 */
		"_iRecordsDisplay": 0,

		/**
		 * The classes to use for the table
		 *  @type object
		 *  @default {}
		 */
		"oClasses": {},

		/**
		 * Flag attached to the settings object so you can check in the draw
		 * callback if filtering has been done in the draw. Deprecated in favour of
		 * events.
		 *  @type boolean
		 *  @default false
		 *  @deprecated
		 */
		"bFiltered": false,

		/**
		 * Flag attached to the settings object so you can check in the draw
		 * callback if sorting has been done in the draw. Deprecated in favour of
		 * events.
		 *  @type boolean
		 *  @default false
		 *  @deprecated
		 */
		"bSorted": false,

		/**
		 * Indicate that if multiple rows are in the header and there is more than
		 * one unique cell per column, if the top one (true) or bottom one (false)
		 * should be used for sorting / title by DataTables.
		 * Note that this parameter will be set by the initialisation routine. To
		 * set a default use {@link DataTable.defaults}.
		 *  @type boolean
		 */
		"bSortCellsTop": null,

		/**
		 * Initialisation object that is used for the table
		 *  @type object
		 *  @default null
		 */
		"oInit": null,

		/**
		 * Destroy callback functions - for plug-ins to attach themselves to the
		 * destroy so they can clean up markup and events.
		 *  @type array
		 *  @default []
		 */
		"aoDestroyCallback": [],


		/**
		 * Get the number of records in the current record set, before filtering
		 *  @type function
		 */
		"fnRecordsTotal": function ()
		{
			return _fnDataSource( this ) == 'ssp' ?
				this._iRecordsTotal * 1 :
				this.aiDisplayMaster.length;
		},

		/**
		 * Get the number of records in the current record set, after filtering
		 *  @type function
		 */
		"fnRecordsDisplay": function ()
		{
			return _fnDataSource( this ) == 'ssp' ?
				this._iRecordsDisplay * 1 :
				this.aiDisplay.length;
		},

		/**
		 * Get the display end point - aiDisplay index
		 *  @type function
		 */
		"fnDisplayEnd": function ()
		{
			var
				len      = this._iDisplayLength,
				start    = this._iDisplayStart,
				calc     = start + len,
				records  = this.aiDisplay.length,
				features = this.oFeatures,
				paginate = features.bPaginate;

			if ( features.bServerSide ) {
				return paginate === false || len === -1 ?
					start + records :
					Math.min( start+len, this._iRecordsDisplay );
			}
			else {
				return ! paginate || calc>records || len===-1 ?
					records :
					calc;
			}
		},

		/**
		 * The DataTables object for this table
		 *  @type object
		 *  @default null
		 */
		"oInstance": null,

		/**
		 * Unique identifier for each instance of the DataTables object. If there
		 * is an ID on the table node, then it takes that value, otherwise an
		 * incrementing internal counter is used.
		 *  @type string
		 *  @default null
		 */
		"sInstance": null,

		/**
		 * tabindex attribute value that is added to DataTables control elements, allowing
		 * keyboard navigation of the table and its controls.
		 */
		"iTabIndex": 0,

		/**
		 * DIV container for the footer scrolling table if scrolling
		 */
		"nScrollHead": null,

		/**
		 * DIV container for the footer scrolling table if scrolling
		 */
		"nScrollFoot": null,

		/**
		 * Last applied sort
		 *  @type array
		 *  @default []
		 */
		"aLastSort": [],

		/**
		 * Stored plug-in instances
		 *  @type object
		 *  @default {}
		 */
		"oPlugins": {},

		/**
		 * Function used to get a row's id from the row's data
		 *  @type function
		 *  @default null
		 */
		"rowIdFn": null,

		/**
		 * Data location where to store a row's id
		 *  @type string
		 *  @default null
		 */
		"rowId": null
	};

	/**
	 * Extension object for DataTables that is used to provide all extension
	 * options.
	 *
	 * Note that the `DataTable.ext` object is available through
	 * `jQuery.fn.dataTable.ext` where it may be accessed and manipulated. It is
	 * also aliased to `jQuery.fn.dataTableExt` for historic reasons.
	 *  @namespace
	 *  @extends DataTable.models.ext
	 */


	/**
	 * DataTables extensions
	 *
	 * This namespace acts as a collection area for plug-ins that can be used to
	 * extend DataTables capabilities. Indeed many of the build in methods
	 * use this method to provide their own capabilities (sorting methods for
	 * example).
	 *
	 * Note that this namespace is aliased to `jQuery.fn.dataTableExt` for legacy
	 * reasons
	 *
	 *  @namespace
	 */
	DataTable.ext = _ext = {
		/**
		 * Buttons. For use with the Buttons extension for DataTables. This is
		 * defined here so other extensions can define buttons regardless of load
		 * order. It is _not_ used by DataTables core.
		 *
		 *  @type object
		 *  @default {}
		 */
		buttons: {},


		/**
		 * Element class names
		 *
		 *  @type object
		 *  @default {}
		 */
		classes: {},


		/**
		 * DataTables build type (expanded by the download builder)
		 *
		 *  @type string
		 */
		builder: "-source-",


		/**
		 * Error reporting.
		 *
		 * How should DataTables report an error. Can take the value 'alert',
		 * 'throw', 'none' or a function.
		 *
		 *  @type string|function
		 *  @default alert
		 */
		errMode: "alert",


		/**
		 * Feature plug-ins.
		 *
		 * This is an array of objects which describe the feature plug-ins that are
		 * available to DataTables. These feature plug-ins are then available for
		 * use through the `dom` initialisation option.
		 *
		 * Each feature plug-in is described by an object which must have the
		 * following properties:
		 *
		 * * `fnInit` - function that is used to initialise the plug-in,
		 * * `cFeature` - a character so the feature can be enabled by the `dom`
		 *   instillation option. This is case sensitive.
		 *
		 * The `fnInit` function has the following input parameters:
		 *
		 * 1. `{object}` DataTables settings object: see
		 *    {@link DataTable.models.oSettings}
		 *
		 * And the following return is expected:
		 *
		 * * {node|null} The element which contains your feature. Note that the
		 *   return may also be void if your plug-in does not require to inject any
		 *   DOM elements into DataTables control (`dom`) - for example this might
		 *   be useful when developing a plug-in which allows table control via
		 *   keyboard entry
		 *
		 *  @type array
		 *
		 *  @example
		 *    $.fn.dataTable.ext.features.push( {
		 *      "fnInit": function( oSettings ) {
		 *        return new TableTools( { "oDTSettings": oSettings } );
		 *      },
		 *      "cFeature": "T"
		 *    } );
		 */
		feature: [],


		/**
		 * Row searching.
		 *
		 * This method of searching is complimentary to the default type based
		 * searching, and a lot more comprehensive as it allows you complete control
		 * over the searching logic. Each element in this array is a function
		 * (parameters described below) that is called for every row in the table,
		 * and your logic decides if it should be included in the searching data set
		 * or not.
		 *
		 * Searching functions have the following input parameters:
		 *
		 * 1. `{object}` DataTables settings object: see
		 *    {@link DataTable.models.oSettings}
		 * 2. `{array|object}` Data for the row to be processed (same as the
		 *    original format that was passed in as the data source, or an array
		 *    from a DOM data source
		 * 3. `{int}` Row index ({@link DataTable.models.oSettings.aoData}), which
		 *    can be useful to retrieve the `TR` element if you need DOM interaction.
		 *
		 * And the following return is expected:
		 *
		 * * {boolean} Include the row in the searched result set (true) or not
		 *   (false)
		 *
		 * Note that as with the main search ability in DataTables, technically this
		 * is "filtering", since it is subtractive. However, for consistency in
		 * naming we call it searching here.
		 *
		 *  @type array
		 *  @default []
		 *
		 *  @example
		 *    // The following example shows custom search being applied to the
		 *    // fourth column (i.e. the data[3] index) based on two input values
		 *    // from the end-user, matching the data in a certain range.
		 *    $.fn.dataTable.ext.search.push(
		 *      function( settings, data, dataIndex ) {
		 *        var min = document.getElementById('min').value * 1;
		 *        var max = document.getElementById('max').value * 1;
		 *        var version = data[3] == "-" ? 0 : data[3]*1;
		 *
		 *        if ( min == "" && max == "" ) {
		 *          return true;
		 *        }
		 *        else if ( min == "" && version < max ) {
		 *          return true;
		 *        }
		 *        else if ( min < version && "" == max ) {
		 *          return true;
		 *        }
		 *        else if ( min < version && version < max ) {
		 *          return true;
		 *        }
		 *        return false;
		 *      }
		 *    );
		 */
		search: [],


		/**
		 * Selector extensions
		 *
		 * The `selector` option can be used to extend the options available for the
		 * selector modifier options (`selector-modifier` object data type) that
		 * each of the three built in selector types offer (row, column and cell +
		 * their plural counterparts). For example the Select extension uses this
		 * mechanism to provide an option to select only rows, columns and cells
		 * that have been marked as selected by the end user (`{selected: true}`),
		 * which can be used in conjunction with the existing built in selector
		 * options.
		 *
		 * Each property is an array to which functions can be pushed. The functions
		 * take three attributes:
		 *
		 * * Settings object for the host table
		 * * Options object (`selector-modifier` object type)
		 * * Array of selected item indexes
		 *
		 * The return is an array of the resulting item indexes after the custom
		 * selector has been applied.
		 *
		 *  @type object
		 */
		selector: {
			cell: [],
			column: [],
			row: []
		},


		/**
		 * Internal functions, exposed for used in plug-ins.
		 *
		 * Please note that you should not need to use the internal methods for
		 * anything other than a plug-in (and even then, try to avoid if possible).
		 * The internal function may change between releases.
		 *
		 *  @type object
		 *  @default {}
		 */
		internal: {},


		/**
		 * Legacy configuration options. Enable and disable legacy options that
		 * are available in DataTables.
		 *
		 *  @type object
		 */
		legacy: {
			/**
			 * Enable / disable DataTables 1.9 compatible server-side processing
			 * requests
			 *
			 *  @type boolean
			 *  @default null
			 */
			ajax: null
		},


		/**
		 * Pagination plug-in methods.
		 *
		 * Each entry in this object is a function and defines which buttons should
		 * be shown by the pagination rendering method that is used for the table:
		 * {@link DataTable.ext.renderer.pageButton}. The renderer addresses how the
		 * buttons are displayed in the document, while the functions here tell it
		 * what buttons to display. This is done by returning an array of button
		 * descriptions (what each button will do).
		 *
		 * Pagination types (the four built in options and any additional plug-in
		 * options defined here) can be used through the `paginationType`
		 * initialisation parameter.
		 *
		 * The functions defined take two parameters:
		 *
		 * 1. `{int} page` The current page index
		 * 2. `{int} pages` The number of pages in the table
		 *
		 * Each function is expected to return an array where each element of the
		 * array can be one of:
		 *
		 * * `first` - Jump to first page when activated
		 * * `last` - Jump to last page when activated
		 * * `previous` - Show previous page when activated
		 * * `next` - Show next page when activated
		 * * `{int}` - Show page of the index given
		 * * `{array}` - A nested array containing the above elements to add a
		 *   containing 'DIV' element (might be useful for styling).
		 *
		 * Note that DataTables v1.9- used this object slightly differently whereby
		 * an object with two functions would be defined for each plug-in. That
		 * ability is still supported by DataTables 1.10+ to provide backwards
		 * compatibility, but this option of use is now decremented and no longer
		 * documented in DataTables 1.10+.
		 *
		 *  @type object
		 *  @default {}
		 *
		 *  @example
		 *    // Show previous, next and current page buttons only
		 *    $.fn.dataTableExt.oPagination.current = function ( page, pages ) {
		 *      return [ 'previous', page, 'next' ];
		 *    };
		 */
		pager: {},


		renderer: {
			pageButton: {},
			header: {}
		},


		/**
		 * Ordering plug-ins - custom data source
		 *
		 * The extension options for ordering of data available here is complimentary
		 * to the default type based ordering that DataTables typically uses. It
		 * allows much greater control over the the data that is being used to
		 * order a column, but is necessarily therefore more complex.
		 *
		 * This type of ordering is useful if you want to do ordering based on data
		 * live from the DOM (for example the contents of an 'input' element) rather
		 * than just the static string that DataTables knows of.
		 *
		 * The way these plug-ins work is that you create an array of the values you
		 * wish to be ordering for the column in question and then return that
		 * array. The data in the array much be in the index order of the rows in
		 * the table (not the currently ordering order!). Which order data gathering
		 * function is run here depends on the `dt-init columns.orderDataType`
		 * parameter that is used for the column (if any).
		 *
		 * The functions defined take two parameters:
		 *
		 * 1. `{object}` DataTables settings object: see
		 *    {@link DataTable.models.oSettings}
		 * 2. `{int}` Target column index
		 *
		 * Each function is expected to return an array:
		 *
		 * * `{array}` Data for the column to be ordering upon
		 *
		 *  @type array
		 *
		 *  @example
		 *    // Ordering using `input` node values
		 *    $.fn.dataTable.ext.order['dom-text'] = function  ( settings, col )
		 *    {
		 *      return this.api().column( col, {order:'index'} ).nodes().map( function ( td, i ) {
		 *        return $('input', td).val();
		 *      } );
		 *    }
		 */
		order: {},


		/**
		 * Type based plug-ins.
		 *
		 * Each column in DataTables has a type assigned to it, either by automatic
		 * detection or by direct assignment using the `type` option for the column.
		 * The type of a column will effect how it is ordering and search (plug-ins
		 * can also make use of the column type if required).
		 *
		 * @namespace
		 */
		type: {
			/**
			 * Type detection functions.
			 *
			 * The functions defined in this object are used to automatically detect
			 * a column's type, making initialisation of DataTables super easy, even
			 * when complex data is in the table.
			 *
			 * The functions defined take two parameters:
			 *
		     *  1. `{*}` Data from the column cell to be analysed
		     *  2. `{settings}` DataTables settings object. This can be used to
		     *     perform context specific type detection - for example detection
		     *     based on language settings such as using a comma for a decimal
		     *     place. Generally speaking the options from the settings will not
		     *     be required
			 *
			 * Each function is expected to return:
			 *
			 * * `{string|null}` Data type detected, or null if unknown (and thus
			 *   pass it on to the other type detection functions.
			 *
			 *  @type array
			 *
			 *  @example
			 *    // Currency type detection plug-in:
			 *    $.fn.dataTable.ext.type.detect.push(
			 *      function ( data, settings ) {
			 *        // Check the numeric part
			 *        if ( ! data.substring(1).match(/[0-9]/) ) {
			 *          return null;
			 *        }
			 *
			 *        // Check prefixed by currency
			 *        if ( data.charAt(0) == '$' || data.charAt(0) == '&pound;' ) {
			 *          return 'currency';
			 *        }
			 *        return null;
			 *      }
			 *    );
			 */
			detect: [],


			/**
			 * Type based search formatting.
			 *
			 * The type based searching functions can be used to pre-format the
			 * data to be search on. For example, it can be used to strip HTML
			 * tags or to de-format telephone numbers for numeric only searching.
			 *
			 * Note that is a search is not defined for a column of a given type,
			 * no search formatting will be performed.
			 *
			 * Pre-processing of searching data plug-ins - When you assign the sType
			 * for a column (or have it automatically detected for you by DataTables
			 * or a type detection plug-in), you will typically be using this for
			 * custom sorting, but it can also be used to provide custom searching
			 * by allowing you to pre-processing the data and returning the data in
			 * the format that should be searched upon. This is done by adding
			 * functions this object with a parameter name which matches the sType
			 * for that target column. This is the corollary of <i>afnSortData</i>
			 * for searching data.
			 *
			 * The functions defined take a single parameter:
			 *
		     *  1. `{*}` Data from the column cell to be prepared for searching
			 *
			 * Each function is expected to return:
			 *
			 * * `{string|null}` Formatted string that will be used for the searching.
			 *
			 *  @type object
			 *  @default {}
			 *
			 *  @example
			 *    $.fn.dataTable.ext.type.search['title-numeric'] = function ( d ) {
			 *      return d.replace(/\n/g," ").replace( /<.*?>/g, "" );
			 *    }
			 */
			search: {},


			/**
			 * Type based ordering.
			 *
			 * The column type tells DataTables what ordering to apply to the table
			 * when a column is sorted upon. The order for each type that is defined,
			 * is defined by the functions available in this object.
			 *
			 * Each ordering option can be described by three properties added to
			 * this object:
			 *
			 * * `{type}-pre` - Pre-formatting function
			 * * `{type}-asc` - Ascending order function
			 * * `{type}-desc` - Descending order function
			 *
			 * All three can be used together, only `{type}-pre` or only
			 * `{type}-asc` and `{type}-desc` together. It is generally recommended
			 * that only `{type}-pre` is used, as this provides the optimal
			 * implementation in terms of speed, although the others are provided
			 * for compatibility with existing Javascript sort functions.
			 *
			 * `{type}-pre`: Functions defined take a single parameter:
			 *
		     *  1. `{*}` Data from the column cell to be prepared for ordering
			 *
			 * And return:
			 *
			 * * `{*}` Data to be sorted upon
			 *
			 * `{type}-asc` and `{type}-desc`: Functions are typical Javascript sort
			 * functions, taking two parameters:
			 *
		     *  1. `{*}` Data to compare to the second parameter
		     *  2. `{*}` Data to compare to the first parameter
			 *
			 * And returning:
			 *
			 * * `{*}` Ordering match: <0 if first parameter should be sorted lower
			 *   than the second parameter, ===0 if the two parameters are equal and
			 *   >0 if the first parameter should be sorted height than the second
			 *   parameter.
			 *
			 *  @type object
			 *  @default {}
			 *
			 *  @example
			 *    // Numeric ordering of formatted numbers with a pre-formatter
			 *    $.extend( $.fn.dataTable.ext.type.order, {
			 *      "string-pre": function(x) {
			 *        a = (a === "-" || a === "") ? 0 : a.replace( /[^\d\-\.]/g, "" );
			 *        return parseFloat( a );
			 *      }
			 *    } );
			 *
			 *  @example
			 *    // Case-sensitive string ordering, with no pre-formatting method
			 *    $.extend( $.fn.dataTable.ext.order, {
			 *      "string-case-asc": function(x,y) {
			 *        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			 *      },
			 *      "string-case-desc": function(x,y) {
			 *        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
			 *      }
			 *    } );
			 */
			order: {}
		},

		/**
		 * Unique DataTables instance counter
		 *
		 * @type int
		 * @private
		 */
		_unique: 0,


		//
		// Depreciated
		// The following properties are retained for backwards compatiblity only.
		// The should not be used in new projects and will be removed in a future
		// version
		//

		/**
		 * Version check function.
		 *  @type function
		 *  @depreciated Since 1.10
		 */
		fnVersionCheck: DataTable.fnVersionCheck,


		/**
		 * Index for what 'this' index API functions should use
		 *  @type int
		 *  @deprecated Since v1.10
		 */
		iApiIndex: 0,


		/**
		 * jQuery UI class container
		 *  @type object
		 *  @deprecated Since v1.10
		 */
		oJUIClasses: {},


		/**
		 * Software version
		 *  @type string
		 *  @deprecated Since v1.10
		 */
		sVersion: DataTable.version
	};


	//
	// Backwards compatibility. Alias to pre 1.10 Hungarian notation counter parts
	//
	$.extend( _ext, {
		afnFiltering: _ext.search,
		aTypes:       _ext.type.detect,
		ofnSearch:    _ext.type.search,
		oSort:        _ext.type.order,
		afnSortData:  _ext.order,
		aoFeatures:   _ext.feature,
		oApi:         _ext.internal,
		oStdClasses:  _ext.classes,
		oPagination:  _ext.pager
	} );


	$.extend( DataTable.ext.classes, {
		"sTable": "dataTable",
		"sNoFooter": "no-footer",

		/* Paging buttons */
		"sPageButton": "paginate_button",
		"sPageButtonActive": "current",
		"sPageButtonDisabled": "disabled",

		/* Striping classes */
		"sStripeOdd": "odd",
		"sStripeEven": "even",

		/* Empty row */
		"sRowEmpty": "dataTables_empty",

		/* Features */
		"sWrapper": "dataTables_wrapper",
		"sFilter": "dataTables_filter",
		"sInfo": "dataTables_info",
		"sPaging": "dataTables_paginate paging_", /* Note that the type is postfixed */
		"sLength": "dataTables_length",
		"sProcessing": "dataTables_processing",

		/* Sorting */
		"sSortAsc": "sorting_asc",
		"sSortDesc": "sorting_desc",
		"sSortable": "sorting", /* Sortable in both directions */
		"sSortableAsc": "sorting_asc_disabled",
		"sSortableDesc": "sorting_desc_disabled",
		"sSortableNone": "sorting_disabled",
		"sSortColumn": "sorting_", /* Note that an int is postfixed for the sorting order */

		/* Filtering */
		"sFilterInput": "",

		/* Page length */
		"sLengthSelect": "",

		/* Scrolling */
		"sScrollWrapper": "dataTables_scroll",
		"sScrollHead": "dataTables_scrollHead",
		"sScrollHeadInner": "dataTables_scrollHeadInner",
		"sScrollBody": "dataTables_scrollBody",
		"sScrollFoot": "dataTables_scrollFoot",
		"sScrollFootInner": "dataTables_scrollFootInner",

		/* Misc */
		"sHeaderTH": "",
		"sFooterTH": "",

		// Deprecated
		"sSortJUIAsc": "",
		"sSortJUIDesc": "",
		"sSortJUI": "",
		"sSortJUIAscAllowed": "",
		"sSortJUIDescAllowed": "",
		"sSortJUIWrapper": "",
		"sSortIcon": "",
		"sJUIHeader": "",
		"sJUIFooter": ""
	} );


	var extPagination = DataTable.ext.pager;

	function _numbers ( page, pages ) {
		var
			numbers = [],
			buttons = extPagination.numbers_length,
			half = Math.floor( buttons / 2 ),
			i = 1;

		if ( pages <= buttons ) {
			numbers = _range( 0, pages );
		}
		else if ( page <= half ) {
			numbers = _range( 0, buttons-2 );
			numbers.push( 'ellipsis' );
			numbers.push( pages-1 );
		}
		else if ( page >= pages - 1 - half ) {
			numbers = _range( pages-(buttons-2), pages );
			numbers.splice( 0, 0, 'ellipsis' ); // no unshift in ie6
			numbers.splice( 0, 0, 0 );
		}
		else {
			numbers = _range( page-half+2, page+half-1 );
			numbers.push( 'ellipsis' );
			numbers.push( pages-1 );
			numbers.splice( 0, 0, 'ellipsis' );
			numbers.splice( 0, 0, 0 );
		}

		numbers.DT_el = 'span';
		return numbers;
	}


	$.extend( extPagination, {
		simple: function ( page, pages ) {
			return [ 'previous', 'next' ];
		},

		full: function ( page, pages ) {
			return [  'first', 'previous', 'next', 'last' ];
		},

		numbers: function ( page, pages ) {
			return [ _numbers(page, pages) ];
		},

		simple_numbers: function ( page, pages ) {
			return [ 'previous', _numbers(page, pages), 'next' ];
		},

		full_numbers: function ( page, pages ) {
			return [ 'first', 'previous', _numbers(page, pages), 'next', 'last' ];
		},

		first_last_numbers: function (page, pages) {
	 		return ['first', _numbers(page, pages), 'last'];
	 	},

		// For testing and plug-ins to use
		_numbers: _numbers,

		// Number of number buttons (including ellipsis) to show. _Must be odd!_
		numbers_length: 7
	} );


	$.extend( true, DataTable.ext.renderer, {
		pageButton: {
			_: function ( settings, host, idx, buttons, page, pages ) {
				var classes = settings.oClasses;
				var lang = settings.oLanguage.oPaginate;
				var aria = settings.oLanguage.oAria.paginate || {};
				var btnDisplay, btnClass, counter=0;

				var attach = function( container, buttons ) {
					var i, ien, node, button;
					var clickHandler = function ( e ) {
						_fnPageChange( settings, e.data.action, true );
					};

					for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
						button = buttons[i];

						if ( $.isArray( button ) ) {
							var inner = $( '<'+(button.DT_el || 'div')+'/>' )
								.appendTo( container );
							attach( inner, button );
						}
						else {
							btnDisplay = null;
							btnClass = '';

							switch ( button ) {
								case 'ellipsis':
									container.append('<span class="ellipsis">&#x2026;</span>');
									break;

								case 'first':
									btnDisplay = lang.sFirst;
									btnClass = button + (page > 0 ?
										'' : ' '+classes.sPageButtonDisabled);
									break;

								case 'previous':
									btnDisplay = lang.sPrevious;
									btnClass = button + (page > 0 ?
										'' : ' '+classes.sPageButtonDisabled);
									break;

								case 'next':
									btnDisplay = lang.sNext;
									btnClass = button + (page < pages-1 ?
										'' : ' '+classes.sPageButtonDisabled);
									break;

								case 'last':
									btnDisplay = lang.sLast;
									btnClass = button + (page < pages-1 ?
										'' : ' '+classes.sPageButtonDisabled);
									break;

								default:
									btnDisplay = button + 1;
									btnClass = page === button ?
										classes.sPageButtonActive : '';
									break;
							}

							if ( btnDisplay !== null ) {
								node = $('<a>', {
										'class': classes.sPageButton+' '+btnClass,
										'aria-controls': settings.sTableId,
										'aria-label': aria[ button ],
										'data-dt-idx': counter,
										'tabindex': settings.iTabIndex,
										'id': idx === 0 && typeof button === 'string' ?
											settings.sTableId +'_'+ button :
											null
									} )
									.html( btnDisplay )
									.appendTo( container );

								_fnBindAction(
									node, {action: button}, clickHandler
								);

								counter++;
							}
						}
					}
				};

				// IE9 throws an 'unknown error' if document.activeElement is used
				// inside an iframe or frame. Try / catch the error. Not good for
				// accessibility, but neither are frames.
				var activeEl;

				try {
					// Because this approach is destroying and recreating the paging
					// elements, focus is lost on the select button which is bad for
					// accessibility. So we want to restore focus once the draw has
					// completed
					activeEl = $(host).find(document.activeElement).data('dt-idx');
				}
				catch (e) {}

				attach( $(host).empty(), buttons );

				if ( activeEl !== undefined ) {
					$(host).find( '[data-dt-idx='+activeEl+']' ).focus();
				}
			}
		}
	} );



	// Built in type detection. See model.ext.aTypes for information about
	// what is required from this methods.
	$.extend( DataTable.ext.type.detect, [
		// Plain numbers - first since V8 detects some plain numbers as dates
		// e.g. Date.parse('55') (but not all, e.g. Date.parse('22')...).
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _isNumber( d, decimal ) ? 'num'+decimal : null;
		},

		// Dates (only those recognised by the browser's Date.parse)
		function ( d, settings )
		{
			// V8 tries _very_ hard to make a string passed into `Date.parse()`
			// valid, so we need to use a regex to restrict date formats. Use a
			// plug-in for anything other than ISO8601 style strings
			if ( d && !(d instanceof Date) && ! _re_date.test(d) ) {
				return null;
			}
			var parsed = Date.parse(d);
			return (parsed !== null && !isNaN(parsed)) || _empty(d) ? 'date' : null;
		},

		// Formatted numbers
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _isNumber( d, decimal, true ) ? 'num-fmt'+decimal : null;
		},

		// HTML numeric
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _htmlNumeric( d, decimal ) ? 'html-num'+decimal : null;
		},

		// HTML numeric, formatted
		function ( d, settings )
		{
			var decimal = settings.oLanguage.sDecimal;
			return _htmlNumeric( d, decimal, true ) ? 'html-num-fmt'+decimal : null;
		},

		// HTML (this is strict checking - there must be html)
		function ( d, settings )
		{
			return _empty( d ) || (typeof d === 'string' && d.indexOf('<') !== -1) ?
				'html' : null;
		}
	] );



	// Filter formatting functions. See model.ext.ofnSearch for information about
	// what is required from these methods.
	//
	// Note that additional search methods are added for the html numbers and
	// html formatted numbers by `_addNumericSort()` when we know what the decimal
	// place is


	$.extend( DataTable.ext.type.search, {
		html: function ( data ) {
			return _empty(data) ?
				data :
				typeof data === 'string' ?
					data
						.replace( _re_new_lines, " " )
						.replace( _re_html, "" ) :
					'';
		},

		string: function ( data ) {
			return _empty(data) ?
				data :
				typeof data === 'string' ?
					data.replace( _re_new_lines, " " ) :
					data;
		}
	} );



	var __numericReplace = function ( d, decimalPlace, re1, re2 ) {
		if ( d !== 0 && (!d || d === '-') ) {
			return -Infinity;
		}

		// If a decimal place other than `.` is used, it needs to be given to the
		// function so we can detect it and replace with a `.` which is the only
		// decimal place Javascript recognises - it is not locale aware.
		if ( decimalPlace ) {
			d = _numToDecimal( d, decimalPlace );
		}

		if ( d.replace ) {
			if ( re1 ) {
				d = d.replace( re1, '' );
			}

			if ( re2 ) {
				d = d.replace( re2, '' );
			}
		}

		return d * 1;
	};


	// Add the numeric 'deformatting' functions for sorting and search. This is done
	// in a function to provide an easy ability for the language options to add
	// additional methods if a non-period decimal place is used.
	function _addNumericSort ( decimalPlace ) {
		$.each(
			{
				// Plain numbers
				"num": function ( d ) {
					return __numericReplace( d, decimalPlace );
				},

				// Formatted numbers
				"num-fmt": function ( d ) {
					return __numericReplace( d, decimalPlace, _re_formatted_numeric );
				},

				// HTML numeric
				"html-num": function ( d ) {
					return __numericReplace( d, decimalPlace, _re_html );
				},

				// HTML numeric, formatted
				"html-num-fmt": function ( d ) {
					return __numericReplace( d, decimalPlace, _re_html, _re_formatted_numeric );
				}
			},
			function ( key, fn ) {
				// Add the ordering method
				_ext.type.order[ key+decimalPlace+'-pre' ] = fn;

				// For HTML types add a search formatter that will strip the HTML
				if ( key.match(/^html\-/) ) {
					_ext.type.search[ key+decimalPlace ] = _ext.type.search.html;
				}
			}
		);
	}


	// Default sort methods
	$.extend( _ext.type.order, {
		// Dates
		"date-pre": function ( d ) {
			var ts = Date.parse( d );
			return isNaN(ts) ? -Infinity : ts;
		},

		// html
		"html-pre": function ( a ) {
			return _empty(a) ?
				'' :
				a.replace ?
					a.replace( /<.*?>/g, "" ).toLowerCase() :
					a+'';
		},

		// string
		"string-pre": function ( a ) {
			// This is a little complex, but faster than always calling toString,
			// http://jsperf.com/tostring-v-check
			return _empty(a) ?
				'' :
				typeof a === 'string' ?
					a.toLowerCase() :
					! a.toString ?
						'' :
						a.toString();
		},

		// string-asc and -desc are retained only for compatibility with the old
		// sort methods
		"string-asc": function ( x, y ) {
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		},

		"string-desc": function ( x, y ) {
			return ((x < y) ? 1 : ((x > y) ? -1 : 0));
		}
	} );


	// Numeric sorting types - order doesn't matter here
	_addNumericSort( '' );


	$.extend( true, DataTable.ext.renderer, {
		header: {
			_: function ( settings, cell, column, classes ) {
				// No additional mark-up required
				// Attach a sort listener to update on sort - note that using the
				// `DT` namespace will allow the event to be removed automatically
				// on destroy, while the `dt` namespaced event is the one we are
				// listening for
				$(settings.nTable).on( 'order.dt.DT', function ( e, ctx, sorting, columns ) {
					if ( settings !== ctx ) { // need to check this this is the host
						return;               // table, not a nested one
					}

					var colIdx = column.idx;

					cell
						.removeClass(
							column.sSortingClass +' '+
							classes.sSortAsc +' '+
							classes.sSortDesc
						)
						.addClass( columns[ colIdx ] == 'asc' ?
							classes.sSortAsc : columns[ colIdx ] == 'desc' ?
								classes.sSortDesc :
								column.sSortingClass
						);
				} );
			},

			jqueryui: function ( settings, cell, column, classes ) {
				$('<div/>')
					.addClass( classes.sSortJUIWrapper )
					.append( cell.contents() )
					.append( $('<span/>')
						.addClass( classes.sSortIcon+' '+column.sSortingClassJUI )
					)
					.appendTo( cell );

				// Attach a sort listener to update on sort
				$(settings.nTable).on( 'order.dt.DT', function ( e, ctx, sorting, columns ) {
					if ( settings !== ctx ) {
						return;
					}

					var colIdx = column.idx;

					cell
						.removeClass( classes.sSortAsc +" "+classes.sSortDesc )
						.addClass( columns[ colIdx ] == 'asc' ?
							classes.sSortAsc : columns[ colIdx ] == 'desc' ?
								classes.sSortDesc :
								column.sSortingClass
						);

					cell
						.find( 'span.'+classes.sSortIcon )
						.removeClass(
							classes.sSortJUIAsc +" "+
							classes.sSortJUIDesc +" "+
							classes.sSortJUI +" "+
							classes.sSortJUIAscAllowed +" "+
							classes.sSortJUIDescAllowed
						)
						.addClass( columns[ colIdx ] == 'asc' ?
							classes.sSortJUIAsc : columns[ colIdx ] == 'desc' ?
								classes.sSortJUIDesc :
								column.sSortingClassJUI
						);
				} );
			}
		}
	} );

	/*
	 * Public helper functions. These aren't used internally by DataTables, or
	 * called by any of the options passed into DataTables, but they can be used
	 * externally by developers working with DataTables. They are helper functions
	 * to make working with DataTables a little bit easier.
	 */

	var __htmlEscapeEntities = function ( d ) {
		return typeof d === 'string' ?
			d.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;') :
			d;
	};

	/**
	 * Helpers for `columns.render`.
	 *
	 * The options defined here can be used with the `columns.render` initialisation
	 * option to provide a display renderer. The following functions are defined:
	 *
	 * * `number` - Will format numeric data (defined by `columns.data`) for
	 *   display, retaining the original unformatted data for sorting and filtering.
	 *   It takes 5 parameters:
	 *   * `string` - Thousands grouping separator
	 *   * `string` - Decimal point indicator
	 *   * `integer` - Number of decimal points to show
	 *   * `string` (optional) - Prefix.
	 *   * `string` (optional) - Postfix (/suffix).
	 * * `text` - Escape HTML to help prevent XSS attacks. It has no optional
	 *   parameters.
	 *
	 * @example
	 *   // Column definition using the number renderer
	 *   {
	 *     data: "salary",
	 *     render: $.fn.dataTable.render.number( '\'', '.', 0, '$' )
	 *   }
	 *
	 * @namespace
	 */
	DataTable.render = {
		number: function ( thousands, decimal, precision, prefix, postfix ) {
			return {
				display: function ( d ) {
					if ( typeof d !== 'number' && typeof d !== 'string' ) {
						return d;
					}

					var negative = d < 0 ? '-' : '';
					var flo = parseFloat( d );

					// If NaN then there isn't much formatting that we can do - just
					// return immediately, escaping any HTML (this was supposed to
					// be a number after all)
					if ( isNaN( flo ) ) {
						return __htmlEscapeEntities( d );
					}

					flo = flo.toFixed( precision );
					d = Math.abs( flo );

					var intPart = parseInt( d, 10 );
					var floatPart = precision ?
						decimal+(d - intPart).toFixed( precision ).substring( 2 ):
						'';

					return negative + (prefix||'') +
						intPart.toString().replace(
							/\B(?=(\d{3})+(?!\d))/g, thousands
						) +
						floatPart +
						(postfix||'');
				}
			};
		},

		text: function () {
			return {
				display: __htmlEscapeEntities,
				filter: __htmlEscapeEntities
			};
		}
	};


	/*
	 * This is really a good bit rubbish this method of exposing the internal methods
	 * publicly... - To be fixed in 2.0 using methods on the prototype
	 */


	/**
	 * Create a wrapper function for exporting an internal functions to an external API.
	 *  @param {string} fn API function name
	 *  @returns {function} wrapped function
	 *  @memberof DataTable#internal
	 */
	function _fnExternApiFunc (fn)
	{
		return function() {
			var args = [_fnSettingsFromNode( this[DataTable.ext.iApiIndex] )].concat(
				Array.prototype.slice.call(arguments)
			);
			return DataTable.ext.internal[fn].apply( this, args );
		};
	}


	/**
	 * Reference to internal functions for use by plug-in developers. Note that
	 * these methods are references to internal functions and are considered to be
	 * private. If you use these methods, be aware that they are liable to change
	 * between versions.
	 *  @namespace
	 */
	$.extend( DataTable.ext.internal, {
		_fnExternApiFunc: _fnExternApiFunc,
		_fnBuildAjax: _fnBuildAjax,
		_fnAjaxUpdate: _fnAjaxUpdate,
		_fnAjaxParameters: _fnAjaxParameters,
		_fnAjaxUpdateDraw: _fnAjaxUpdateDraw,
		_fnAjaxDataSrc: _fnAjaxDataSrc,
		_fnAddColumn: _fnAddColumn,
		_fnColumnOptions: _fnColumnOptions,
		_fnAdjustColumnSizing: _fnAdjustColumnSizing,
		_fnVisibleToColumnIndex: _fnVisibleToColumnIndex,
		_fnColumnIndexToVisible: _fnColumnIndexToVisible,
		_fnVisbleColumns: _fnVisbleColumns,
		_fnGetColumns: _fnGetColumns,
		_fnColumnTypes: _fnColumnTypes,
		_fnApplyColumnDefs: _fnApplyColumnDefs,
		_fnHungarianMap: _fnHungarianMap,
		_fnCamelToHungarian: _fnCamelToHungarian,
		_fnLanguageCompat: _fnLanguageCompat,
		_fnBrowserDetect: _fnBrowserDetect,
		_fnAddData: _fnAddData,
		_fnAddTr: _fnAddTr,
		_fnNodeToDataIndex: _fnNodeToDataIndex,
		_fnNodeToColumnIndex: _fnNodeToColumnIndex,
		_fnGetCellData: _fnGetCellData,
		_fnSetCellData: _fnSetCellData,
		_fnSplitObjNotation: _fnSplitObjNotation,
		_fnGetObjectDataFn: _fnGetObjectDataFn,
		_fnSetObjectDataFn: _fnSetObjectDataFn,
		_fnGetDataMaster: _fnGetDataMaster,
		_fnClearTable: _fnClearTable,
		_fnDeleteIndex: _fnDeleteIndex,
		_fnInvalidate: _fnInvalidate,
		_fnGetRowElements: _fnGetRowElements,
		_fnCreateTr: _fnCreateTr,
		_fnBuildHead: _fnBuildHead,
		_fnDrawHead: _fnDrawHead,
		_fnDraw: _fnDraw,
		_fnReDraw: _fnReDraw,
		_fnAddOptionsHtml: _fnAddOptionsHtml,
		_fnDetectHeader: _fnDetectHeader,
		_fnGetUniqueThs: _fnGetUniqueThs,
		_fnFeatureHtmlFilter: _fnFeatureHtmlFilter,
		_fnFilterComplete: _fnFilterComplete,
		_fnFilterCustom: _fnFilterCustom,
		_fnFilterColumn: _fnFilterColumn,
		_fnFilter: _fnFilter,
		_fnFilterCreateSearch: _fnFilterCreateSearch,
		_fnEscapeRegex: _fnEscapeRegex,
		_fnFilterData: _fnFilterData,
		_fnFeatureHtmlInfo: _fnFeatureHtmlInfo,
		_fnUpdateInfo: _fnUpdateInfo,
		_fnInfoMacros: _fnInfoMacros,
		_fnInitialise: _fnInitialise,
		_fnInitComplete: _fnInitComplete,
		_fnLengthChange: _fnLengthChange,
		_fnFeatureHtmlLength: _fnFeatureHtmlLength,
		_fnFeatureHtmlPaginate: _fnFeatureHtmlPaginate,
		_fnPageChange: _fnPageChange,
		_fnFeatureHtmlProcessing: _fnFeatureHtmlProcessing,
		_fnProcessingDisplay: _fnProcessingDisplay,
		_fnFeatureHtmlTable: _fnFeatureHtmlTable,
		_fnScrollDraw: _fnScrollDraw,
		_fnApplyToChildren: _fnApplyToChildren,
		_fnCalculateColumnWidths: _fnCalculateColumnWidths,
		_fnThrottle: _fnThrottle,
		_fnConvertToWidth: _fnConvertToWidth,
		_fnGetWidestNode: _fnGetWidestNode,
		_fnGetMaxLenString: _fnGetMaxLenString,
		_fnStringToCss: _fnStringToCss,
		_fnSortFlatten: _fnSortFlatten,
		_fnSort: _fnSort,
		_fnSortAria: _fnSortAria,
		_fnSortListener: _fnSortListener,
		_fnSortAttachListener: _fnSortAttachListener,
		_fnSortingClasses: _fnSortingClasses,
		_fnSortData: _fnSortData,
		_fnSaveState: _fnSaveState,
		_fnLoadState: _fnLoadState,
		_fnSettingsFromNode: _fnSettingsFromNode,
		_fnLog: _fnLog,
		_fnMap: _fnMap,
		_fnBindAction: _fnBindAction,
		_fnCallbackReg: _fnCallbackReg,
		_fnCallbackFire: _fnCallbackFire,
		_fnLengthOverflow: _fnLengthOverflow,
		_fnRenderer: _fnRenderer,
		_fnDataSource: _fnDataSource,
		_fnRowAttributes: _fnRowAttributes,
		_fnExtend: _fnExtend,
		_fnCalculateEnd: function () {} // Used by a lot of plug-ins, but redundant
		                                // in 1.10, so this dead-end function is
		                                // added to prevent errors
	} );


	// jQuery access
	$.fn.dataTable = DataTable;

	// Provide access to the host jQuery object (circular reference)
	DataTable.$ = $;

	// Legacy aliases
	$.fn.dataTableSettings = DataTable.settings;
	$.fn.dataTableExt = DataTable.ext;

	// With a capital `D` we return a DataTables API instance rather than a
	// jQuery object
	$.fn.DataTable = function ( opts ) {
		return $(this).dataTable( opts ).api();
	};

	// All properties that are available to $.fn.dataTable should also be
	// available on $.fn.DataTable
	$.each( DataTable, function ( prop, val ) {
		$.fn.DataTable[ prop ] = val;
	} );


	// Information about events fired by DataTables - for documentation.
	/**
	 * Draw event, fired whenever the table is redrawn on the page, at the same
	 * point as fnDrawCallback. This may be useful for binding events or
	 * performing calculations when the table is altered at all.
	 *  @name DataTable#draw.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Search event, fired when the searching applied to the table (using the
	 * built-in global search, or column filters) is altered.
	 *  @name DataTable#search.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Page change event, fired when the paging of the table is altered.
	 *  @name DataTable#page.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Order event, fired when the ordering applied to the table is altered.
	 *  @name DataTable#order.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * DataTables initialisation complete event, fired when the table is fully
	 * drawn, including Ajax data loaded, if Ajax data is required.
	 *  @name DataTable#init.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The JSON object request from the server - only
	 *    present if client-side Ajax sourced data is used</li></ol>
	 */

	/**
	 * State save event, fired when the table has changed state a new state save
	 * is required. This event allows modification of the state saving object
	 * prior to actually doing the save, including addition or other state
	 * properties (for plug-ins) or modification of a DataTables core property.
	 *  @name DataTable#stateSaveParams.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The state information to be saved
	 */

	/**
	 * State load event, fired when the table is loading state from the stored
	 * data, but prior to the settings object being modified by the saved state
	 * - allowing modification of the saved state is required or loading of
	 * state for a plug-in.
	 *  @name DataTable#stateLoadParams.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The saved state information
	 */

	/**
	 * State loaded event, fired when state has been loaded from stored data and
	 * the settings object has been modified by the loaded data.
	 *  @name DataTable#stateLoaded.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {object} json The saved state information
	 */

	/**
	 * Processing event, fired when DataTables is doing some kind of processing
	 * (be it, order, searcg or anything else). It can be used to indicate to
	 * the end user that there is something happening, or that something has
	 * finished.
	 *  @name DataTable#processing.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} oSettings DataTables settings object
	 *  @param {boolean} bShow Flag for if DataTables is doing processing or not
	 */

	/**
	 * Ajax (XHR) event, fired whenever an Ajax request is completed from a
	 * request to made to the server for new data. This event is called before
	 * DataTables processed the returned data, so it can also be used to pre-
	 * process the data returned from the server, if needed.
	 *
	 * Note that this trigger is called in `fnServerData`, if you override
	 * `fnServerData` and which to use this event, you need to trigger it in you
	 * success function.
	 *  @name DataTable#xhr.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 *  @param {object} json JSON returned from the server
	 *
	 *  @example
	 *     // Use a custom property returned from the server in another DOM element
	 *     $('#table').dataTable().on('xhr.dt', function (e, settings, json) {
	 *       $('#status').html( json.status );
	 *     } );
	 *
	 *  @example
	 *     // Pre-process the data returned from the server
	 *     $('#table').dataTable().on('xhr.dt', function (e, settings, json) {
	 *       for ( var i=0, ien=json.aaData.length ; i<ien ; i++ ) {
	 *         json.aaData[i].sum = json.aaData[i].one + json.aaData[i].two;
	 *       }
	 *       // Note no return - manipulate the data directly in the JSON object.
	 *     } );
	 */

	/**
	 * Destroy event, fired when the DataTable is destroyed by calling fnDestroy
	 * or passing the bDestroy:true parameter in the initialisation object. This
	 * can be used to remove bound events, added DOM nodes, etc.
	 *  @name DataTable#destroy.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Page length change event, fired when number of records to show on each
	 * page (the length) is changed.
	 *  @name DataTable#length.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 *  @param {integer} len New length
	 */

	/**
	 * Column sizing has changed.
	 *  @name DataTable#column-sizing.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 */

	/**
	 * Column visibility has changed.
	 *  @name DataTable#column-visibility.dt
	 *  @event
	 *  @param {event} e jQuery event object
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings}
	 *  @param {int} column Column index
	 *  @param {bool} vis `false` if column now hidden, or `true` if visible
	 */

	return $.fn.dataTable;
}));

/*! DataTables Bootstrap 4 integration
 * Â©2011-2017 SpryMedia Ltd - datatables.net/license
 */

/**
 * DataTables integration for Bootstrap 4. This requires Bootstrap 4 and
 * DataTables 1.10 or newer.
 *
 * This file sets the defaults and adds options to DataTables to style its
 * controls using Bootstrap. See http://datatables.net/manual/styling/bootstrap
 * for further information.
 */
(function( factory ){
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( ['jquery', 'datatables.net'], function ( $ ) {
			return factory( $, window, document );
		} );
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = function (root, $) {
			if ( ! root ) {
				root = window;
			}

			if ( ! $ || ! $.fn.dataTable ) {
				// Require DataTables, which attaches to jQuery, including
				// jQuery if needed and have a $ property so we can access the
				// jQuery object that is used
				$ = require('datatables.net')(root, $).$;
			}

			return factory( $, root, root.document );
		};
	}
	else {
		// Browser
		factory( jQuery, window, document );
	}
}(function( $, window, document, undefined ) {
'use strict';
var DataTable = $.fn.dataTable;


/* Set the defaults for DataTables initialisation */
$.extend( true, DataTable.defaults, {
	dom:
		"<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
		"<'row'<'col-sm-12'tr>>" +
		"<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
	renderer: 'bootstrap'
} );


/* Default class modification */
$.extend( DataTable.ext.classes, {
	sWrapper:      "dataTables_wrapper dt-bootstrap4",
	sFilterInput:  "form-control form-control-sm",
	sLengthSelect: "custom-select custom-select-sm form-control form-control-sm",
	sProcessing:   "dataTables_processing card",
	sPageButton:   "paginate_button page-item"
} );


/* Bootstrap paging button renderer */
DataTable.ext.renderer.pageButton.bootstrap = function ( settings, host, idx, buttons, page, pages ) {
	var api     = new DataTable.Api( settings );
	var classes = settings.oClasses;
	var lang    = settings.oLanguage.oPaginate;
	var aria = settings.oLanguage.oAria.paginate || {};
	var btnDisplay, btnClass, counter=0;

	var attach = function( container, buttons ) {
		var i, ien, node, button;
		var clickHandler = function ( e ) {
			e.preventDefault();
			if ( !$(e.currentTarget).hasClass('disabled') && api.page() != e.data.action ) {
				api.page( e.data.action ).draw( 'page' );
			}
		};

		for ( i=0, ien=buttons.length ; i<ien ; i++ ) {
			button = buttons[i];

			if ( $.isArray( button ) ) {
				attach( container, button );
			}
			else {
				btnDisplay = '';
				btnClass = '';

				switch ( button ) {
					case 'ellipsis':
						btnDisplay = '&#x2026;';
						btnClass = 'disabled';
						break;

					case 'first':
						btnDisplay = lang.sFirst;
						btnClass = button + (page > 0 ?
							'' : ' disabled');
						break;

					case 'previous':
						btnDisplay = lang.sPrevious;
						btnClass = button + (page > 0 ?
							'' : ' disabled');
						break;

					case 'next':
						btnDisplay = lang.sNext;
						btnClass = button + (page < pages-1 ?
							'' : ' disabled');
						break;

					case 'last':
						btnDisplay = lang.sLast;
						btnClass = button + (page < pages-1 ?
							'' : ' disabled');
						break;

					default:
						btnDisplay = button + 1;
						btnClass = page === button ?
							'active' : '';
						break;
				}

				if ( btnDisplay ) {
					node = $('<li>', {
							'class': classes.sPageButton+' '+btnClass,
							'id': idx === 0 && typeof button === 'string' ?
								settings.sTableId +'_'+ button :
								null
						} )
						.append( $('<a>', {
								'href': '#',
								'aria-controls': settings.sTableId,
								'aria-label': aria[ button ],
								'data-dt-idx': counter,
								'tabindex': settings.iTabIndex,
								'class': 'page-link'
							} )
							.html( btnDisplay )
						)
						.appendTo( container );

					settings.oApi._fnBindAction(
						node, {action: button}, clickHandler
					);

					counter++;
				}
			}
		}
	};

	// IE9 throws an 'unknown error' if document.activeElement is used
	// inside an iframe or frame.
	var activeEl;

	try {
		// Because this approach is destroying and recreating the paging
		// elements, focus is lost on the select button which is bad for
		// accessibility. So we want to restore focus once the draw has
		// completed
		activeEl = $(host).find(document.activeElement).data('dt-idx');
	}
	catch (e) {}

	attach(
		$(host).empty().html('<ul class="pagination"/>').children('ul'),
		buttons
	);

	if ( activeEl !== undefined ) {
		$(host).find( '[data-dt-idx='+activeEl+']' ).focus();
	}
};


return DataTable;
}));

"use strict";
var defaults = {
	"language": {
		"paginate": {
			"first": '<i class="ki ki-double-arrow-back"></i>',
			"last": '<i class="ki ki-double-arrow-next"></i>',
			"next": '<i class="ki ki-arrow-next"></i>',
			"previous": '<i class="ki ki-arrow-back"></i>'
		}
	}
};

if (KTUtil.isRTL()) {
	defaults = {
		"language": {
			"paginate": {
				"first": '<i class="ki ki-double-arrow-next"></i>',
				"last": '<i class="ki ki-double-arrow-back"></i>',
				"next": '<i class="ki ki-arrow-back"></i>',
				"previous": '<i class="ki ki-arrow-next"></i>'
			}
		}
	}
}

$.extend(true, $.fn.dataTable.defaults, defaults);

// fix dropdown overflow inside datatable
KTApp.initAbsoluteDropdown('.dataTables_wrapper');

/*!
 AutoFill 2.3.5
 Â©2008-2020 SpryMedia Ltd - datatables.net/license
*/
(function(e){"function"===typeof define&&define.amd?define(["jquery","datatables.net"],function(g){return e(g,window,document)}):"object"===typeof exports?module.exports=function(g,i){g||(g=window);if(!i||!i.fn.dataTable)i=require("datatables.net")(g,i).$;return e(i,g,g.document)}:e(jQuery,window,document)})(function(e,g,i,r){var l=e.fn.dataTable,t=0,k=function(b,c){if(!l.versionCheck||!l.versionCheck("1.10.8"))throw"Warning: AutoFill requires DataTables 1.10.8 or greater";this.c=e.extend(!0,{},l.defaults.autoFill,
k.defaults,c);this.s={dt:new l.Api(b),namespace:".autoFill"+t++,scroll:{},scrollInterval:null,handle:{height:0,width:0},enabled:!1};this.dom={handle:e('<div class="dt-autofill-handle"/>'),select:{top:e('<div class="dt-autofill-select top"/>'),right:e('<div class="dt-autofill-select right"/>'),bottom:e('<div class="dt-autofill-select bottom"/>'),left:e('<div class="dt-autofill-select left"/>')},background:e('<div class="dt-autofill-background"/>'),list:e('<div class="dt-autofill-list">'+this.s.dt.i18n("autoFill.info",
"")+"<ul/></div>"),dtScroll:null,offsetParent:null};this._constructor()};e.extend(k.prototype,{enabled:function(){return this.s.enabled},enable:function(b){var c=this;if(!1===b)return this.disable();this.s.enabled=!0;this._focusListener();this.dom.handle.on("mousedown",function(a){c._mousedown(a);return!1});return this},disable:function(){this.s.enabled=!1;this._focusListenerRemove();return this},_constructor:function(){var b=this,c=this.s.dt,a=e("div.dataTables_scrollBody",this.s.dt.table().container());
c.settings()[0].autoFill=this;a.length&&(this.dom.dtScroll=a,"static"===a.css("position")&&a.css("position","relative"));!1!==this.c.enable&&this.enable();c.on("destroy.autoFill",function(){b._focusListenerRemove()})},_attach:function(b){var c=this.s.dt,a=c.cell(b).index(),d=this.dom.handle,f=this.s.handle;if(!a||-1===c.columns(this.c.columns).indexes().indexOf(a.column))this._detach();else{this.dom.offsetParent||(this.dom.offsetParent=e(c.table().node()).offsetParent());if(!f.height||!f.width)d.appendTo("body"),
f.height=d.outerHeight(),f.width=d.outerWidth();c=this._getPosition(b,this.dom.offsetParent);this.dom.attachedTo=b;d.css({top:c.top+b.offsetHeight-f.height,left:c.left+b.offsetWidth-f.width}).appendTo(this.dom.offsetParent)}},_actionSelector:function(b){var c=this,a=this.s.dt,d=k.actions,f=[];e.each(d,function(c,d){d.available(a,b)&&f.push(c)});if(1===f.length&&!1===this.c.alwaysAsk){var j=d[f[0]].execute(a,b);this._update(j,b)}else if(1<f.length){var h=this.dom.list.children("ul").empty();f.push("cancel");
e.each(f,function(f,j){h.append(e("<li/>").append('<div class="dt-autofill-question">'+d[j].option(a,b)+"<div>").append(e('<div class="dt-autofill-button">').append(e('<button class="'+k.classes.btn+'">'+a.i18n("autoFill.button","&gt;")+"</button>").on("click",function(){var f=d[j].execute(a,b,e(this).closest("li"));c._update(f,b);c.dom.background.remove();c.dom.list.remove()}))))});this.dom.background.appendTo("body");this.dom.list.appendTo("body");this.dom.list.css("margin-top",-1*(this.dom.list.outerHeight()/
2))}},_detach:function(){this.dom.attachedTo=null;this.dom.handle.detach()},_drawSelection:function(b){var c=this.s.dt,a=this.s.start,d=e(this.dom.start),f={row:this.c.vertical?c.rows({page:"current"}).nodes().indexOf(b.parentNode):a.row,column:this.c.horizontal?e(b).index():a.column},b=c.column.index("toData",f.column),j=c.row(":eq("+f.row+")",{page:"current"}),j=e(c.cell(j.index(),b).node());if(c.cell(j).any()&&-1!==c.columns(this.c.columns).indexes().indexOf(b)){this.s.end=f;var h,c=a.row<f.row?
d:j;h=a.row<f.row?j:d;b=a.column<f.column?d:j;d=a.column<f.column?j:d;c=this._getPosition(c.get(0)).top;b=this._getPosition(b.get(0)).left;a=this._getPosition(h.get(0)).top+h.outerHeight()-c;d=this._getPosition(d.get(0)).left+d.outerWidth()-b;f=this.dom.select;f.top.css({top:c,left:b,width:d});f.left.css({top:c,left:b,height:a});f.bottom.css({top:c+a,left:b,width:d});f.right.css({top:c,left:b+d,height:a})}},_editor:function(b){var c=this.s.dt,a=this.c.editor;if(a){for(var d={},f=[],e=a.fields(),h=
0,i=b.length;h<i;h++)for(var p=0,k=b[h].length;p<k;p++){var n=b[h][p],g=c.settings()[0].aoColumns[n.index.column],o=g.editField;if(o===r)for(var g=g.mData,q=0,l=e.length;q<l;q++){var s=a.field(e[q]);if(s.dataSrc()===g){o=s.name();break}}if(!o)throw"Could not automatically determine field data. Please see https://datatables.net/tn/11";d[o]||(d[o]={});g=c.row(n.index.row).id();d[o][g]=n.set;f.push(n.index)}a.bubble(f,!1).multiSet(d).submit()}},_emitEvent:function(b,c){this.s.dt.iterator("table",function(a){e(a.nTable).triggerHandler(b+
".dt",c)})},_focusListener:function(){var b=this,c=this.s.dt,a=this.s.namespace,d=null!==this.c.focus?this.c.focus:c.init().keys||c.settings()[0].keytable?"focus":"hover";if("focus"===d)c.on("key-focus.autoFill",function(a,c,d){b._attach(d.node())}).on("key-blur.autoFill",function(){b._detach()});else if("click"===d)e(c.table().body()).on("click"+a,"td, th",function(){b._attach(this)}),e(i.body).on("click"+a,function(a){e(a.target).parents().filter(c.table().body()).length||b._detach()});else e(c.table().body()).on("mouseenter"+
a,"td, th",function(){b._attach(this)}).on("mouseleave"+a,function(a){e(a.relatedTarget).hasClass("dt-autofill-handle")||b._detach()})},_focusListenerRemove:function(){var b=this.s.dt;b.off(".autoFill");e(b.table().body()).off(this.s.namespace);e(i.body).off(this.s.namespace)},_getPosition:function(b,c){var a=b,d,f=0,j=0;c||(c=e(e(this.s.dt.table().node())[0].offsetParent));do{var h=a.offsetTop,i=a.offsetLeft;d=e(a.offsetParent);f+=h+1*parseInt(d.css("border-top-width"));j+=i+1*parseInt(d.css("border-left-width"));
if("body"===a.nodeName.toLowerCase())break;a=d.get(0)}while(d.get(0)!==c.get(0));return{top:f,left:j}},_mousedown:function(b){var c=this,a=this.s.dt;this.dom.start=this.dom.attachedTo;this.s.start={row:a.rows({page:"current"}).nodes().indexOf(e(this.dom.start).parent()[0]),column:e(this.dom.start).index()};e(i.body).on("mousemove.autoFill",function(a){c._mousemove(a)}).on("mouseup.autoFill",function(a){c._mouseup(a)});var d=this.dom.select,a=e(a.table().node()).offsetParent();d.top.appendTo(a);d.left.appendTo(a);
d.right.appendTo(a);d.bottom.appendTo(a);this._drawSelection(this.dom.start,b);this.dom.handle.css("display","none");b=this.dom.dtScroll;this.s.scroll={windowHeight:e(g).height(),windowWidth:e(g).width(),dtTop:b?b.offset().top:null,dtLeft:b?b.offset().left:null,dtHeight:b?b.outerHeight():null,dtWidth:b?b.outerWidth():null}},_mousemove:function(b){var c=b.target.nodeName.toLowerCase();"td"!==c&&"th"!==c||(this._drawSelection(b.target,b),this._shiftScroll(b))},_mouseup:function(b){e(i.body).off(".autoFill");
var c=this,a=this.s.dt,d=this.dom.select;d.top.remove();d.left.remove();d.right.remove();d.bottom.remove();this.dom.handle.css("display","block");var d=this.s.start,f=this.s.end;if(!(d.row===f.row&&d.column===f.column)){var j=a.cell(":eq("+d.row+")",d.column+":visible",{page:"current"});if(e("div.DTE",j.node()).length){var h=a.editor();h.on("submitSuccess.dtaf close.dtaf",function(){h.off(".dtaf");setTimeout(function(){c._mouseup(b)},100)}).on("submitComplete.dtaf preSubmitCancelled.dtaf close.dtaf",
function(){h.off(".dtaf")});h.submit()}else{for(var g=this._range(d.row,f.row),d=this._range(d.column,f.column),f=[],k=a.settings()[0],l=k.aoColumns,n=a.columns(this.c.columns).indexes(),m=0;m<g.length;m++)f.push(e.map(d,function(b){var c=a.row(":eq("+g[m]+")",{page:"current"}),b=a.cell(c.index(),b+":visible"),c=b.data(),d=b.index(),f=l[d.column].editField;f!==r&&(c=k.oApi._fnGetObjectDataFn(f)(a.row(d.row).data()));if(-1!==n.indexOf(d.column))return{cell:b,data:c,label:b.data(),index:d}}));this._actionSelector(f);
clearInterval(this.s.scrollInterval);this.s.scrollInterval=null}}},_range:function(b,c){var a=[],d;if(b<=c)for(d=b;d<=c;d++)a.push(d);else for(d=b;d>=c;d--)a.push(d);return a},_shiftScroll:function(b){var c=this,a=this.s.scroll,d=!1,f=b.pageY-i.body.scrollTop,e=b.pageX-i.body.scrollLeft,h,g,k,l;65>f?h=-5:f>a.windowHeight-65&&(h=5);65>e?g=-5:e>a.windowWidth-65&&(g=5);null!==a.dtTop&&b.pageY<a.dtTop+65?k=-5:null!==a.dtTop&&b.pageY>a.dtTop+a.dtHeight-65&&(k=5);null!==a.dtLeft&&b.pageX<a.dtLeft+65?l=
-5:null!==a.dtLeft&&b.pageX>a.dtLeft+a.dtWidth-65&&(l=5);h||g||k||l?(a.windowVert=h,a.windowHoriz=g,a.dtVert=k,a.dtHoriz=l,d=!0):this.s.scrollInterval&&(clearInterval(this.s.scrollInterval),this.s.scrollInterval=null);!this.s.scrollInterval&&d&&(this.s.scrollInterval=setInterval(function(){if(a.windowVert)i.body.scrollTop=i.body.scrollTop+a.windowVert;if(a.windowHoriz)i.body.scrollLeft=i.body.scrollLeft+a.windowHoriz;if(a.dtVert||a.dtHoriz){var b=c.dom.dtScroll[0];if(a.dtVert)b.scrollTop=b.scrollTop+
a.dtVert;if(a.dtHoriz)b.scrollLeft=b.scrollLeft+a.dtHoriz}},20))},_update:function(b,c){if(!1!==b){var a=this.s.dt,d,f=a.columns(this.c.columns).indexes();this._emitEvent("preAutoFill",[a,c]);this._editor(c);if(null!==this.c.update?this.c.update:!this.c.editor){for(var e=0,h=c.length;e<h;e++)for(var g=0,i=c[e].length;g<i;g++)d=c[e][g],-1!==f.indexOf(d.index.column)&&d.cell.data(d.set);a.draw(!1)}this._emitEvent("autoFill",[a,c])}}});k.actions={increment:{available:function(b,c){var a=c[0][0].label;
return!isNaN(a-parseFloat(a))},option:function(b){return b.i18n("autoFill.increment",'Increment / decrement each cell by: <input type="number" value="1">')},execute:function(b,c,a){for(var b=1*c[0][0].data,a=1*e("input",a).val(),d=0,f=c.length;d<f;d++)for(var j=0,g=c[d].length;j<g;j++)c[d][j].set=b,b+=a}},fill:{available:function(){return!0},option:function(b,c){return b.i18n("autoFill.fill","Fill all cells with <i>"+c[0][0].label+"</i>")},execute:function(b,c){for(var a=c[0][0].data,d=0,f=c.length;d<
f;d++)for(var e=0,g=c[d].length;e<g;e++)c[d][e].set=a}},fillHorizontal:{available:function(b,c){return 1<c.length&&1<c[0].length},option:function(b){return b.i18n("autoFill.fillHorizontal","Fill cells horizontally")},execute:function(b,c){for(var a=0,d=c.length;a<d;a++)for(var f=0,e=c[a].length;f<e;f++)c[a][f].set=c[a][0].data}},fillVertical:{available:function(b,c){return 1<c.length},option:function(b){return b.i18n("autoFill.fillVertical","Fill cells vertically")},execute:function(b,c){for(var a=
0,d=c.length;a<d;a++)for(var e=0,g=c[a].length;e<g;e++)c[a][e].set=c[0][e].data}},cancel:{available:function(){return!1},option:function(b){return b.i18n("autoFill.cancel","Cancel")},execute:function(){return!1}}};k.version="2.3.5";k.defaults={alwaysAsk:!1,focus:null,columns:"",enable:!0,update:null,editor:null,vertical:!0,horizontal:!0};k.classes={btn:"btn"};var m=e.fn.dataTable.Api;m.register("autoFill()",function(){return this});m.register("autoFill().enabled()",function(){var b=this.context[0];
return b.autoFill?b.autoFill.enabled():!1});m.register("autoFill().enable()",function(b){return this.iterator("table",function(c){c.autoFill&&c.autoFill.enable(b)})});m.register("autoFill().disable()",function(){return this.iterator("table",function(b){b.autoFill&&b.autoFill.disable()})});e(i).on("preInit.dt.autofill",function(b,c){if("dt"===b.namespace){var a=c.oInit.autoFill,d=l.defaults.autoFill;if(a||d)d=e.extend({},a,d),!1!==a&&new k(c,d)}});l.AutoFill=k;return l.AutoFill=k});

/*!
 Bootstrap integration for DataTables' AutoFill
 Â©2015 SpryMedia Ltd - datatables.net/license
*/
(function(a){"function"===typeof define&&define.amd?define(["jquery","datatables.net-bs4","datatables.net-autofill"],function(b){return a(b,window,document)}):"object"===typeof exports?module.exports=function(b,c){b||(b=window);if(!c||!c.fn.dataTable)c=require("datatables.net-bs4")(b,c).$;c.fn.dataTable.AutoFill||require("datatables.net-autofill")(b,c);return a(c,b,b.document)}:a(jQuery,window,document)})(function(a){a=a.fn.dataTable;a.AutoFill.classes.btn="btn btn-primary";return a});

/*!

JSZip v3.5.0 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/master/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/master/LICENSE
*/

!function(t){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).JSZip=t()}}(function(){return function s(a,o,h){function u(r,t){if(!o[r]){if(!a[r]){var e="function"==typeof require&&require;if(!t&&e)return e(r,!0);if(l)return l(r,!0);var i=new Error("Cannot find module '"+r+"'");throw i.code="MODULE_NOT_FOUND",i}var n=o[r]={exports:{}};a[r][0].call(n.exports,function(t){var e=a[r][1][t];return u(e||t)},n,n.exports,s,a,o,h)}return o[r].exports}for(var l="function"==typeof require&&require,t=0;t<h.length;t++)u(h[t]);return u}({1:[function(t,e,r){"use strict";var c=t("./utils"),d=t("./support"),p="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";r.encode=function(t){for(var e,r,i,n,s,a,o,h=[],u=0,l=t.length,f=l,d="string"!==c.getTypeOf(t);u<t.length;)f=l-u,i=d?(e=t[u++],r=u<l?t[u++]:0,u<l?t[u++]:0):(e=t.charCodeAt(u++),r=u<l?t.charCodeAt(u++):0,u<l?t.charCodeAt(u++):0),n=e>>2,s=(3&e)<<4|r>>4,a=1<f?(15&r)<<2|i>>6:64,o=2<f?63&i:64,h.push(p.charAt(n)+p.charAt(s)+p.charAt(a)+p.charAt(o));return h.join("")},r.decode=function(t){var e,r,i,n,s,a,o=0,h=0,u="data:";if(t.substr(0,u.length)===u)throw new Error("Invalid base64 input, it looks like a data url.");var l,f=3*(t=t.replace(/[^A-Za-z0-9\+\/\=]/g,"")).length/4;if(t.charAt(t.length-1)===p.charAt(64)&&f--,t.charAt(t.length-2)===p.charAt(64)&&f--,f%1!=0)throw new Error("Invalid base64 input, bad content length.");for(l=d.uint8array?new Uint8Array(0|f):new Array(0|f);o<t.length;)e=p.indexOf(t.charAt(o++))<<2|(n=p.indexOf(t.charAt(o++)))>>4,r=(15&n)<<4|(s=p.indexOf(t.charAt(o++)))>>2,i=(3&s)<<6|(a=p.indexOf(t.charAt(o++))),l[h++]=e,64!==s&&(l[h++]=r),64!==a&&(l[h++]=i);return l}},{"./support":30,"./utils":32}],2:[function(t,e,r){"use strict";var i=t("./external"),n=t("./stream/DataWorker"),s=t("./stream/DataLengthProbe"),a=t("./stream/Crc32Probe");s=t("./stream/DataLengthProbe");function o(t,e,r,i,n){this.compressedSize=t,this.uncompressedSize=e,this.crc32=r,this.compression=i,this.compressedContent=n}o.prototype={getContentWorker:function(){var t=new n(i.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new s("data_length")),e=this;return t.on("end",function(){if(this.streamInfo.data_length!==e.uncompressedSize)throw new Error("Bug : uncompressed data size mismatch")}),t},getCompressedWorker:function(){return new n(i.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize",this.compressedSize).withStreamInfo("uncompressedSize",this.uncompressedSize).withStreamInfo("crc32",this.crc32).withStreamInfo("compression",this.compression)}},o.createWorkerFrom=function(t,e,r){return t.pipe(new a).pipe(new s("uncompressedSize")).pipe(e.compressWorker(r)).pipe(new s("compressedSize")).withStreamInfo("compression",e)},e.exports=o},{"./external":6,"./stream/Crc32Probe":25,"./stream/DataLengthProbe":26,"./stream/DataWorker":27}],3:[function(t,e,r){"use strict";var i=t("./stream/GenericWorker");r.STORE={magic:"\0\0",compressWorker:function(t){return new i("STORE compression")},uncompressWorker:function(){return new i("STORE decompression")}},r.DEFLATE=t("./flate")},{"./flate":7,"./stream/GenericWorker":28}],4:[function(t,e,r){"use strict";var i=t("./utils");var o=function(){for(var t,e=[],r=0;r<256;r++){t=r;for(var i=0;i<8;i++)t=1&t?3988292384^t>>>1:t>>>1;e[r]=t}return e}();e.exports=function(t,e){return void 0!==t&&t.length?"string"!==i.getTypeOf(t)?function(t,e,r,i){var n=o,s=i+r;t^=-1;for(var a=i;a<s;a++)t=t>>>8^n[255&(t^e[a])];return-1^t}(0|e,t,t.length,0):function(t,e,r,i){var n=o,s=i+r;t^=-1;for(var a=i;a<s;a++)t=t>>>8^n[255&(t^e.charCodeAt(a))];return-1^t}(0|e,t,t.length,0):0}},{"./utils":32}],5:[function(t,e,r){"use strict";r.base64=!1,r.binary=!1,r.dir=!1,r.createFolders=!0,r.date=null,r.compression=null,r.compressionOptions=null,r.comment=null,r.unixPermissions=null,r.dosPermissions=null},{}],6:[function(t,e,r){"use strict";var i=null;i="undefined"!=typeof Promise?Promise:t("lie"),e.exports={Promise:i}},{lie:37}],7:[function(t,e,r){"use strict";var i="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Uint32Array,n=t("pako"),s=t("./utils"),a=t("./stream/GenericWorker"),o=i?"uint8array":"array";function h(t,e){a.call(this,"FlateWorker/"+t),this._pako=null,this._pakoAction=t,this._pakoOptions=e,this.meta={}}r.magic="\b\0",s.inherits(h,a),h.prototype.processChunk=function(t){this.meta=t.meta,null===this._pako&&this._createPako(),this._pako.push(s.transformTo(o,t.data),!1)},h.prototype.flush=function(){a.prototype.flush.call(this),null===this._pako&&this._createPako(),this._pako.push([],!0)},h.prototype.cleanUp=function(){a.prototype.cleanUp.call(this),this._pako=null},h.prototype._createPako=function(){this._pako=new n[this._pakoAction]({raw:!0,level:this._pakoOptions.level||-1});var e=this;this._pako.onData=function(t){e.push({data:t,meta:e.meta})}},r.compressWorker=function(t){return new h("Deflate",t)},r.uncompressWorker=function(){return new h("Inflate",{})}},{"./stream/GenericWorker":28,"./utils":32,pako:38}],8:[function(t,e,r){"use strict";function A(t,e){var r,i="";for(r=0;r<e;r++)i+=String.fromCharCode(255&t),t>>>=8;return i}function i(t,e,r,i,n,s){var a,o,h=t.file,u=t.compression,l=s!==O.utf8encode,f=I.transformTo("string",s(h.name)),d=I.transformTo("string",O.utf8encode(h.name)),c=h.comment,p=I.transformTo("string",s(c)),m=I.transformTo("string",O.utf8encode(c)),_=d.length!==h.name.length,g=m.length!==c.length,b="",v="",y="",w=h.dir,k=h.date,x={crc32:0,compressedSize:0,uncompressedSize:0};e&&!r||(x.crc32=t.crc32,x.compressedSize=t.compressedSize,x.uncompressedSize=t.uncompressedSize);var S=0;e&&(S|=8),l||!_&&!g||(S|=2048);var z=0,C=0;w&&(z|=16),"UNIX"===n?(C=798,z|=function(t,e){var r=t;return t||(r=e?16893:33204),(65535&r)<<16}(h.unixPermissions,w)):(C=20,z|=function(t){return 63&(t||0)}(h.dosPermissions)),a=k.getUTCHours(),a<<=6,a|=k.getUTCMinutes(),a<<=5,a|=k.getUTCSeconds()/2,o=k.getUTCFullYear()-1980,o<<=4,o|=k.getUTCMonth()+1,o<<=5,o|=k.getUTCDate(),_&&(v=A(1,1)+A(B(f),4)+d,b+="up"+A(v.length,2)+v),g&&(y=A(1,1)+A(B(p),4)+m,b+="uc"+A(y.length,2)+y);var E="";return E+="\n\0",E+=A(S,2),E+=u.magic,E+=A(a,2),E+=A(o,2),E+=A(x.crc32,4),E+=A(x.compressedSize,4),E+=A(x.uncompressedSize,4),E+=A(f.length,2),E+=A(b.length,2),{fileRecord:R.LOCAL_FILE_HEADER+E+f+b,dirRecord:R.CENTRAL_FILE_HEADER+A(C,2)+E+A(p.length,2)+"\0\0\0\0"+A(z,4)+A(i,4)+f+b+p}}var I=t("../utils"),n=t("../stream/GenericWorker"),O=t("../utf8"),B=t("../crc32"),R=t("../signature");function s(t,e,r,i){n.call(this,"ZipFileWorker"),this.bytesWritten=0,this.zipComment=e,this.zipPlatform=r,this.encodeFileName=i,this.streamFiles=t,this.accumulate=!1,this.contentBuffer=[],this.dirRecords=[],this.currentSourceOffset=0,this.entriesCount=0,this.currentFile=null,this._sources=[]}I.inherits(s,n),s.prototype.push=function(t){var e=t.meta.percent||0,r=this.entriesCount,i=this._sources.length;this.accumulate?this.contentBuffer.push(t):(this.bytesWritten+=t.data.length,n.prototype.push.call(this,{data:t.data,meta:{currentFile:this.currentFile,percent:r?(e+100*(r-i-1))/r:100}}))},s.prototype.openedSource=function(t){this.currentSourceOffset=this.bytesWritten,this.currentFile=t.file.name;var e=this.streamFiles&&!t.file.dir;if(e){var r=i(t,e,!1,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);this.push({data:r.fileRecord,meta:{percent:0}})}else this.accumulate=!0},s.prototype.closedSource=function(t){this.accumulate=!1;var e=this.streamFiles&&!t.file.dir,r=i(t,e,!0,this.currentSourceOffset,this.zipPlatform,this.encodeFileName);if(this.dirRecords.push(r.dirRecord),e)this.push({data:function(t){return R.DATA_DESCRIPTOR+A(t.crc32,4)+A(t.compressedSize,4)+A(t.uncompressedSize,4)}(t),meta:{percent:100}});else for(this.push({data:r.fileRecord,meta:{percent:0}});this.contentBuffer.length;)this.push(this.contentBuffer.shift());this.currentFile=null},s.prototype.flush=function(){for(var t=this.bytesWritten,e=0;e<this.dirRecords.length;e++)this.push({data:this.dirRecords[e],meta:{percent:100}});var r=this.bytesWritten-t,i=function(t,e,r,i,n){var s=I.transformTo("string",n(i));return R.CENTRAL_DIRECTORY_END+"\0\0\0\0"+A(t,2)+A(t,2)+A(e,4)+A(r,4)+A(s.length,2)+s}(this.dirRecords.length,r,t,this.zipComment,this.encodeFileName);this.push({data:i,meta:{percent:100}})},s.prototype.prepareNextSource=function(){this.previous=this._sources.shift(),this.openedSource(this.previous.streamInfo),this.isPaused?this.previous.pause():this.previous.resume()},s.prototype.registerPrevious=function(t){this._sources.push(t);var e=this;return t.on("data",function(t){e.processChunk(t)}),t.on("end",function(){e.closedSource(e.previous.streamInfo),e._sources.length?e.prepareNextSource():e.end()}),t.on("error",function(t){e.error(t)}),this},s.prototype.resume=function(){return!!n.prototype.resume.call(this)&&(!this.previous&&this._sources.length?(this.prepareNextSource(),!0):this.previous||this._sources.length||this.generatedError?void 0:(this.end(),!0))},s.prototype.error=function(t){var e=this._sources;if(!n.prototype.error.call(this,t))return!1;for(var r=0;r<e.length;r++)try{e[r].error(t)}catch(t){}return!0},s.prototype.lock=function(){n.prototype.lock.call(this);for(var t=this._sources,e=0;e<t.length;e++)t[e].lock()},e.exports=s},{"../crc32":4,"../signature":23,"../stream/GenericWorker":28,"../utf8":31,"../utils":32}],9:[function(t,e,r){"use strict";var u=t("../compressions"),i=t("./ZipFileWorker");r.generateWorker=function(t,a,e){var o=new i(a.streamFiles,e,a.platform,a.encodeFileName),h=0;try{t.forEach(function(t,e){h++;var r=function(t,e){var r=t||e,i=u[r];if(!i)throw new Error(r+" is not a valid compression method !");return i}(e.options.compression,a.compression),i=e.options.compressionOptions||a.compressionOptions||{},n=e.dir,s=e.date;e._compressWorker(r,i).withStreamInfo("file",{name:t,dir:n,date:s,comment:e.comment||"",unixPermissions:e.unixPermissions,dosPermissions:e.dosPermissions}).pipe(o)}),o.entriesCount=h}catch(t){o.error(t)}return o}},{"../compressions":3,"./ZipFileWorker":8}],10:[function(t,e,r){"use strict";function i(){if(!(this instanceof i))return new i;if(arguments.length)throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");this.files={},this.comment=null,this.root="",this.clone=function(){var t=new i;for(var e in this)"function"!=typeof this[e]&&(t[e]=this[e]);return t}}(i.prototype=t("./object")).loadAsync=t("./load"),i.support=t("./support"),i.defaults=t("./defaults"),i.version="3.5.0",i.loadAsync=function(t,e){return(new i).loadAsync(t,e)},i.external=t("./external"),e.exports=i},{"./defaults":5,"./external":6,"./load":11,"./object":15,"./support":30}],11:[function(t,e,r){"use strict";var i=t("./utils"),n=t("./external"),o=t("./utf8"),h=(i=t("./utils"),t("./zipEntries")),s=t("./stream/Crc32Probe"),u=t("./nodejsUtils");function l(i){return new n.Promise(function(t,e){var r=i.decompressed.getContentWorker().pipe(new s);r.on("error",function(t){e(t)}).on("end",function(){r.streamInfo.crc32!==i.decompressed.crc32?e(new Error("Corrupted zip : CRC32 mismatch")):t()}).resume()})}e.exports=function(t,s){var a=this;return s=i.extend(s||{},{base64:!1,checkCRC32:!1,optimizedBinaryString:!1,createFolders:!1,decodeFileName:o.utf8decode}),u.isNode&&u.isStream(t)?n.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")):i.prepareContent("the loaded zip file",t,!0,s.optimizedBinaryString,s.base64).then(function(t){var e=new h(s);return e.load(t),e}).then(function(t){var e=[n.Promise.resolve(t)],r=t.files;if(s.checkCRC32)for(var i=0;i<r.length;i++)e.push(l(r[i]));return n.Promise.all(e)}).then(function(t){for(var e=t.shift(),r=e.files,i=0;i<r.length;i++){var n=r[i];a.file(n.fileNameStr,n.decompressed,{binary:!0,optimizedBinaryString:!0,date:n.date,dir:n.dir,comment:n.fileCommentStr.length?n.fileCommentStr:null,unixPermissions:n.unixPermissions,dosPermissions:n.dosPermissions,createFolders:s.createFolders})}return e.zipComment.length&&(a.comment=e.zipComment),a})}},{"./external":6,"./nodejsUtils":14,"./stream/Crc32Probe":25,"./utf8":31,"./utils":32,"./zipEntries":33}],12:[function(t,e,r){"use strict";var i=t("../utils"),n=t("../stream/GenericWorker");function s(t,e){n.call(this,"Nodejs stream input adapter for "+t),this._upstreamEnded=!1,this._bindStream(e)}i.inherits(s,n),s.prototype._bindStream=function(t){var e=this;(this._stream=t).pause(),t.on("data",function(t){e.push({data:t,meta:{percent:0}})}).on("error",function(t){e.isPaused?this.generatedError=t:e.error(t)}).on("end",function(){e.isPaused?e._upstreamEnded=!0:e.end()})},s.prototype.pause=function(){return!!n.prototype.pause.call(this)&&(this._stream.pause(),!0)},s.prototype.resume=function(){return!!n.prototype.resume.call(this)&&(this._upstreamEnded?this.end():this._stream.resume(),!0)},e.exports=s},{"../stream/GenericWorker":28,"../utils":32}],13:[function(t,e,r){"use strict";var n=t("readable-stream").Readable;function i(t,e,r){n.call(this,e),this._helper=t;var i=this;t.on("data",function(t,e){i.push(t)||i._helper.pause(),r&&r(e)}).on("error",function(t){i.emit("error",t)}).on("end",function(){i.push(null)})}t("../utils").inherits(i,n),i.prototype._read=function(){this._helper.resume()},e.exports=i},{"../utils":32,"readable-stream":16}],14:[function(t,e,r){"use strict";e.exports={isNode:"undefined"!=typeof Buffer,newBufferFrom:function(t,e){if(Buffer.from&&Buffer.from!==Uint8Array.from)return Buffer.from(t,e);if("number"==typeof t)throw new Error('The "data" argument must not be a number');return new Buffer(t,e)},allocBuffer:function(t){if(Buffer.alloc)return Buffer.alloc(t);var e=new Buffer(t);return e.fill(0),e},isBuffer:function(t){return Buffer.isBuffer(t)},isStream:function(t){return t&&"function"==typeof t.on&&"function"==typeof t.pause&&"function"==typeof t.resume}}},{}],15:[function(t,e,r){"use strict";function s(t,e,r){var i,n=u.getTypeOf(e),s=u.extend(r||{},f);s.date=s.date||new Date,null!==s.compression&&(s.compression=s.compression.toUpperCase()),"string"==typeof s.unixPermissions&&(s.unixPermissions=parseInt(s.unixPermissions,8)),s.unixPermissions&&16384&s.unixPermissions&&(s.dir=!0),s.dosPermissions&&16&s.dosPermissions&&(s.dir=!0),s.dir&&(t=g(t)),s.createFolders&&(i=_(t))&&b.call(this,i,!0);var a="string"===n&&!1===s.binary&&!1===s.base64;r&&void 0!==r.binary||(s.binary=!a),(e instanceof d&&0===e.uncompressedSize||s.dir||!e||0===e.length)&&(s.base64=!1,s.binary=!0,e="",s.compression="STORE",n="string");var o=null;o=e instanceof d||e instanceof l?e:p.isNode&&p.isStream(e)?new m(t,e):u.prepareContent(t,e,s.binary,s.optimizedBinaryString,s.base64);var h=new c(t,o,s);this.files[t]=h}var n=t("./utf8"),u=t("./utils"),l=t("./stream/GenericWorker"),a=t("./stream/StreamHelper"),f=t("./defaults"),d=t("./compressedObject"),c=t("./zipObject"),o=t("./generate"),p=t("./nodejsUtils"),m=t("./nodejs/NodejsStreamInputAdapter"),_=function(t){"/"===t.slice(-1)&&(t=t.substring(0,t.length-1));var e=t.lastIndexOf("/");return 0<e?t.substring(0,e):""},g=function(t){return"/"!==t.slice(-1)&&(t+="/"),t},b=function(t,e){return e=void 0!==e?e:f.createFolders,t=g(t),this.files[t]||s.call(this,t,null,{dir:!0,createFolders:e}),this.files[t]};function h(t){return"[object RegExp]"===Object.prototype.toString.call(t)}var i={load:function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},forEach:function(t){var e,r,i;for(e in this.files)this.files.hasOwnProperty(e)&&(i=this.files[e],(r=e.slice(this.root.length,e.length))&&e.slice(0,this.root.length)===this.root&&t(r,i))},filter:function(r){var i=[];return this.forEach(function(t,e){r(t,e)&&i.push(e)}),i},file:function(t,e,r){if(1!==arguments.length)return t=this.root+t,s.call(this,t,e,r),this;if(h(t)){var i=t;return this.filter(function(t,e){return!e.dir&&i.test(t)})}var n=this.files[this.root+t];return n&&!n.dir?n:null},folder:function(r){if(!r)return this;if(h(r))return this.filter(function(t,e){return e.dir&&r.test(t)});var t=this.root+r,e=b.call(this,t),i=this.clone();return i.root=e.name,i},remove:function(r){r=this.root+r;var t=this.files[r];if(t||("/"!==r.slice(-1)&&(r+="/"),t=this.files[r]),t&&!t.dir)delete this.files[r];else for(var e=this.filter(function(t,e){return e.name.slice(0,r.length)===r}),i=0;i<e.length;i++)delete this.files[e[i].name];return this},generate:function(t){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},generateInternalStream:function(t){var e,r={};try{if((r=u.extend(t||{},{streamFiles:!1,compression:"STORE",compressionOptions:null,type:"",platform:"DOS",comment:null,mimeType:"application/zip",encodeFileName:n.utf8encode})).type=r.type.toLowerCase(),r.compression=r.compression.toUpperCase(),"binarystring"===r.type&&(r.type="string"),!r.type)throw new Error("No output type specified.");u.checkSupport(r.type),"darwin"!==r.platform&&"freebsd"!==r.platform&&"linux"!==r.platform&&"sunos"!==r.platform||(r.platform="UNIX"),"win32"===r.platform&&(r.platform="DOS");var i=r.comment||this.comment||"";e=o.generateWorker(this,r,i)}catch(t){(e=new l("error")).error(t)}return new a(e,r.type||"string",r.mimeType)},generateAsync:function(t,e){return this.generateInternalStream(t).accumulate(e)},generateNodeStream:function(t,e){return(t=t||{}).type||(t.type="nodebuffer"),this.generateInternalStream(t).toNodejsStream(e)}};e.exports=i},{"./compressedObject":2,"./defaults":5,"./generate":9,"./nodejs/NodejsStreamInputAdapter":12,"./nodejsUtils":14,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31,"./utils":32,"./zipObject":35}],16:[function(t,e,r){e.exports=t("stream")},{stream:void 0}],17:[function(t,e,r){"use strict";var i=t("./DataReader");function n(t){i.call(this,t);for(var e=0;e<this.data.length;e++)t[e]=255&t[e]}t("../utils").inherits(n,i),n.prototype.byteAt=function(t){return this.data[this.zero+t]},n.prototype.lastIndexOfSignature=function(t){for(var e=t.charCodeAt(0),r=t.charCodeAt(1),i=t.charCodeAt(2),n=t.charCodeAt(3),s=this.length-4;0<=s;--s)if(this.data[s]===e&&this.data[s+1]===r&&this.data[s+2]===i&&this.data[s+3]===n)return s-this.zero;return-1},n.prototype.readAndCheckSignature=function(t){var e=t.charCodeAt(0),r=t.charCodeAt(1),i=t.charCodeAt(2),n=t.charCodeAt(3),s=this.readData(4);return e===s[0]&&r===s[1]&&i===s[2]&&n===s[3]},n.prototype.readData=function(t){if(this.checkOffset(t),0===t)return[];var e=this.data.slice(this.zero+this.index,this.zero+this.index+t);return this.index+=t,e},e.exports=n},{"../utils":32,"./DataReader":18}],18:[function(t,e,r){"use strict";var i=t("../utils");function n(t){this.data=t,this.length=t.length,this.index=0,this.zero=0}n.prototype={checkOffset:function(t){this.checkIndex(this.index+t)},checkIndex:function(t){if(this.length<this.zero+t||t<0)throw new Error("End of data reached (data length = "+this.length+", asked index = "+t+"). Corrupted zip ?")},setIndex:function(t){this.checkIndex(t),this.index=t},skip:function(t){this.setIndex(this.index+t)},byteAt:function(t){},readInt:function(t){var e,r=0;for(this.checkOffset(t),e=this.index+t-1;e>=this.index;e--)r=(r<<8)+this.byteAt(e);return this.index+=t,r},readString:function(t){return i.transformTo("string",this.readData(t))},readData:function(t){},lastIndexOfSignature:function(t){},readAndCheckSignature:function(t){},readDate:function(){var t=this.readInt(4);return new Date(Date.UTC(1980+(t>>25&127),(t>>21&15)-1,t>>16&31,t>>11&31,t>>5&63,(31&t)<<1))}},e.exports=n},{"../utils":32}],19:[function(t,e,r){"use strict";var i=t("./Uint8ArrayReader");function n(t){i.call(this,t)}t("../utils").inherits(n,i),n.prototype.readData=function(t){this.checkOffset(t);var e=this.data.slice(this.zero+this.index,this.zero+this.index+t);return this.index+=t,e},e.exports=n},{"../utils":32,"./Uint8ArrayReader":21}],20:[function(t,e,r){"use strict";var i=t("./DataReader");function n(t){i.call(this,t)}t("../utils").inherits(n,i),n.prototype.byteAt=function(t){return this.data.charCodeAt(this.zero+t)},n.prototype.lastIndexOfSignature=function(t){return this.data.lastIndexOf(t)-this.zero},n.prototype.readAndCheckSignature=function(t){return t===this.readData(4)},n.prototype.readData=function(t){this.checkOffset(t);var e=this.data.slice(this.zero+this.index,this.zero+this.index+t);return this.index+=t,e},e.exports=n},{"../utils":32,"./DataReader":18}],21:[function(t,e,r){"use strict";var i=t("./ArrayReader");function n(t){i.call(this,t)}t("../utils").inherits(n,i),n.prototype.readData=function(t){if(this.checkOffset(t),0===t)return new Uint8Array(0);var e=this.data.subarray(this.zero+this.index,this.zero+this.index+t);return this.index+=t,e},e.exports=n},{"../utils":32,"./ArrayReader":17}],22:[function(t,e,r){"use strict";var i=t("../utils"),n=t("../support"),s=t("./ArrayReader"),a=t("./StringReader"),o=t("./NodeBufferReader"),h=t("./Uint8ArrayReader");e.exports=function(t){var e=i.getTypeOf(t);return i.checkSupport(e),"string"!==e||n.uint8array?"nodebuffer"===e?new o(t):n.uint8array?new h(i.transformTo("uint8array",t)):new s(i.transformTo("array",t)):new a(t)}},{"../support":30,"../utils":32,"./ArrayReader":17,"./NodeBufferReader":19,"./StringReader":20,"./Uint8ArrayReader":21}],23:[function(t,e,r){"use strict";r.LOCAL_FILE_HEADER="PK",r.CENTRAL_FILE_HEADER="PK",r.CENTRAL_DIRECTORY_END="PK",r.ZIP64_CENTRAL_DIRECTORY_LOCATOR="PK",r.ZIP64_CENTRAL_DIRECTORY_END="PK",r.DATA_DESCRIPTOR="PK\b"},{}],24:[function(t,e,r){"use strict";var i=t("./GenericWorker"),n=t("../utils");function s(t){i.call(this,"ConvertWorker to "+t),this.destType=t}n.inherits(s,i),s.prototype.processChunk=function(t){this.push({data:n.transformTo(this.destType,t.data),meta:t.meta})},e.exports=s},{"../utils":32,"./GenericWorker":28}],25:[function(t,e,r){"use strict";var i=t("./GenericWorker"),n=t("../crc32");function s(){i.call(this,"Crc32Probe"),this.withStreamInfo("crc32",0)}t("../utils").inherits(s,i),s.prototype.processChunk=function(t){this.streamInfo.crc32=n(t.data,this.streamInfo.crc32||0),this.push(t)},e.exports=s},{"../crc32":4,"../utils":32,"./GenericWorker":28}],26:[function(t,e,r){"use strict";var i=t("../utils"),n=t("./GenericWorker");function s(t){n.call(this,"DataLengthProbe for "+t),this.propName=t,this.withStreamInfo(t,0)}i.inherits(s,n),s.prototype.processChunk=function(t){if(t){var e=this.streamInfo[this.propName]||0;this.streamInfo[this.propName]=e+t.data.length}n.prototype.processChunk.call(this,t)},e.exports=s},{"../utils":32,"./GenericWorker":28}],27:[function(t,e,r){"use strict";var i=t("../utils"),n=t("./GenericWorker");function s(t){n.call(this,"DataWorker");var e=this;this.dataIsReady=!1,this.index=0,this.max=0,this.data=null,this.type="",this._tickScheduled=!1,t.then(function(t){e.dataIsReady=!0,e.data=t,e.max=t&&t.length||0,e.type=i.getTypeOf(t),e.isPaused||e._tickAndRepeat()},function(t){e.error(t)})}i.inherits(s,n),s.prototype.cleanUp=function(){n.prototype.cleanUp.call(this),this.data=null},s.prototype.resume=function(){return!!n.prototype.resume.call(this)&&(!this._tickScheduled&&this.dataIsReady&&(this._tickScheduled=!0,i.delay(this._tickAndRepeat,[],this)),!0)},s.prototype._tickAndRepeat=function(){this._tickScheduled=!1,this.isPaused||this.isFinished||(this._tick(),this.isFinished||(i.delay(this._tickAndRepeat,[],this),this._tickScheduled=!0))},s.prototype._tick=function(){if(this.isPaused||this.isFinished)return!1;var t=null,e=Math.min(this.max,this.index+16384);if(this.index>=this.max)return this.end();switch(this.type){case"string":t=this.data.substring(this.index,e);break;case"uint8array":t=this.data.subarray(this.index,e);break;case"array":case"nodebuffer":t=this.data.slice(this.index,e)}return this.index=e,this.push({data:t,meta:{percent:this.max?this.index/this.max*100:0}})},e.exports=s},{"../utils":32,"./GenericWorker":28}],28:[function(t,e,r){"use strict";function i(t){this.name=t||"default",this.streamInfo={},this.generatedError=null,this.extraStreamInfo={},this.isPaused=!0,this.isFinished=!1,this.isLocked=!1,this._listeners={data:[],end:[],error:[]},this.previous=null}i.prototype={push:function(t){this.emit("data",t)},end:function(){if(this.isFinished)return!1;this.flush();try{this.emit("end"),this.cleanUp(),this.isFinished=!0}catch(t){this.emit("error",t)}return!0},error:function(t){return!this.isFinished&&(this.isPaused?this.generatedError=t:(this.isFinished=!0,this.emit("error",t),this.previous&&this.previous.error(t),this.cleanUp()),!0)},on:function(t,e){return this._listeners[t].push(e),this},cleanUp:function(){this.streamInfo=this.generatedError=this.extraStreamInfo=null,this._listeners=[]},emit:function(t,e){if(this._listeners[t])for(var r=0;r<this._listeners[t].length;r++)this._listeners[t][r].call(this,e)},pipe:function(t){return t.registerPrevious(this)},registerPrevious:function(t){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.streamInfo=t.streamInfo,this.mergeStreamInfo(),this.previous=t;var e=this;return t.on("data",function(t){e.processChunk(t)}),t.on("end",function(){e.end()}),t.on("error",function(t){e.error(t)}),this},pause:function(){return!this.isPaused&&!this.isFinished&&(this.isPaused=!0,this.previous&&this.previous.pause(),!0)},resume:function(){if(!this.isPaused||this.isFinished)return!1;var t=this.isPaused=!1;return this.generatedError&&(this.error(this.generatedError),t=!0),this.previous&&this.previous.resume(),!t},flush:function(){},processChunk:function(t){this.push(t)},withStreamInfo:function(t,e){return this.extraStreamInfo[t]=e,this.mergeStreamInfo(),this},mergeStreamInfo:function(){for(var t in this.extraStreamInfo)this.extraStreamInfo.hasOwnProperty(t)&&(this.streamInfo[t]=this.extraStreamInfo[t])},lock:function(){if(this.isLocked)throw new Error("The stream '"+this+"' has already been used.");this.isLocked=!0,this.previous&&this.previous.lock()},toString:function(){var t="Worker "+this.name;return this.previous?this.previous+" -> "+t:t}},e.exports=i},{}],29:[function(t,e,r){"use strict";var h=t("../utils"),n=t("./ConvertWorker"),s=t("./GenericWorker"),u=t("../base64"),i=t("../support"),a=t("../external"),o=null;if(i.nodestream)try{o=t("../nodejs/NodejsStreamOutputAdapter")}catch(t){}function l(t,o){return new a.Promise(function(e,r){var i=[],n=t._internalType,s=t._outputType,a=t._mimeType;t.on("data",function(t,e){i.push(t),o&&o(e)}).on("error",function(t){i=[],r(t)}).on("end",function(){try{var t=function(t,e,r){switch(t){case"blob":return h.newBlob(h.transformTo("arraybuffer",e),r);case"base64":return u.encode(e);default:return h.transformTo(t,e)}}(s,function(t,e){var r,i=0,n=null,s=0;for(r=0;r<e.length;r++)s+=e[r].length;switch(t){case"string":return e.join("");case"array":return Array.prototype.concat.apply([],e);case"uint8array":for(n=new Uint8Array(s),r=0;r<e.length;r++)n.set(e[r],i),i+=e[r].length;return n;case"nodebuffer":return Buffer.concat(e);default:throw new Error("concat : unsupported type '"+t+"'")}}(n,i),a);e(t)}catch(t){r(t)}i=[]}).resume()})}function f(t,e,r){var i=e;switch(e){case"blob":case"arraybuffer":i="uint8array";break;case"base64":i="string"}try{this._internalType=i,this._outputType=e,this._mimeType=r,h.checkSupport(i),this._worker=t.pipe(new n(i)),t.lock()}catch(t){this._worker=new s("error"),this._worker.error(t)}}f.prototype={accumulate:function(t){return l(this,t)},on:function(t,e){var r=this;return"data"===t?this._worker.on(t,function(t){e.call(r,t.data,t.meta)}):this._worker.on(t,function(){h.delay(e,arguments,r)}),this},resume:function(){return h.delay(this._worker.resume,[],this._worker),this},pause:function(){return this._worker.pause(),this},toNodejsStream:function(t){if(h.checkSupport("nodestream"),"nodebuffer"!==this._outputType)throw new Error(this._outputType+" is not supported by this method");return new o(this,{objectMode:"nodebuffer"!==this._outputType},t)}},e.exports=f},{"../base64":1,"../external":6,"../nodejs/NodejsStreamOutputAdapter":13,"../support":30,"../utils":32,"./ConvertWorker":24,"./GenericWorker":28}],30:[function(t,e,r){"use strict";if(r.base64=!0,r.array=!0,r.string=!0,r.arraybuffer="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof Uint8Array,r.nodebuffer="undefined"!=typeof Buffer,r.uint8array="undefined"!=typeof Uint8Array,"undefined"==typeof ArrayBuffer)r.blob=!1;else{var i=new ArrayBuffer(0);try{r.blob=0===new Blob([i],{type:"application/zip"}).size}catch(t){try{var n=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);n.append(i),r.blob=0===n.getBlob("application/zip").size}catch(t){r.blob=!1}}}try{r.nodestream=!!t("readable-stream").Readable}catch(t){r.nodestream=!1}},{"readable-stream":16}],31:[function(t,e,s){"use strict";for(var o=t("./utils"),h=t("./support"),r=t("./nodejsUtils"),i=t("./stream/GenericWorker"),u=new Array(256),n=0;n<256;n++)u[n]=252<=n?6:248<=n?5:240<=n?4:224<=n?3:192<=n?2:1;u[254]=u[254]=1;function a(){i.call(this,"utf-8 decode"),this.leftOver=null}function l(){i.call(this,"utf-8 encode")}s.utf8encode=function(t){return h.nodebuffer?r.newBufferFrom(t,"utf-8"):function(t){var e,r,i,n,s,a=t.length,o=0;for(n=0;n<a;n++)55296==(64512&(r=t.charCodeAt(n)))&&n+1<a&&56320==(64512&(i=t.charCodeAt(n+1)))&&(r=65536+(r-55296<<10)+(i-56320),n++),o+=r<128?1:r<2048?2:r<65536?3:4;for(e=h.uint8array?new Uint8Array(o):new Array(o),n=s=0;s<o;n++)55296==(64512&(r=t.charCodeAt(n)))&&n+1<a&&56320==(64512&(i=t.charCodeAt(n+1)))&&(r=65536+(r-55296<<10)+(i-56320),n++),r<128?e[s++]=r:(r<2048?e[s++]=192|r>>>6:(r<65536?e[s++]=224|r>>>12:(e[s++]=240|r>>>18,e[s++]=128|r>>>12&63),e[s++]=128|r>>>6&63),e[s++]=128|63&r);return e}(t)},s.utf8decode=function(t){return h.nodebuffer?o.transformTo("nodebuffer",t).toString("utf-8"):function(t){var e,r,i,n,s=t.length,a=new Array(2*s);for(e=r=0;e<s;)if((i=t[e++])<128)a[r++]=i;else if(4<(n=u[i]))a[r++]=65533,e+=n-1;else{for(i&=2===n?31:3===n?15:7;1<n&&e<s;)i=i<<6|63&t[e++],n--;1<n?a[r++]=65533:i<65536?a[r++]=i:(i-=65536,a[r++]=55296|i>>10&1023,a[r++]=56320|1023&i)}return a.length!==r&&(a.subarray?a=a.subarray(0,r):a.length=r),o.applyFromCharCode(a)}(t=o.transformTo(h.uint8array?"uint8array":"array",t))},o.inherits(a,i),a.prototype.processChunk=function(t){var e=o.transformTo(h.uint8array?"uint8array":"array",t.data);if(this.leftOver&&this.leftOver.length){if(h.uint8array){var r=e;(e=new Uint8Array(r.length+this.leftOver.length)).set(this.leftOver,0),e.set(r,this.leftOver.length)}else e=this.leftOver.concat(e);this.leftOver=null}var i=function(t,e){var r;for((e=e||t.length)>t.length&&(e=t.length),r=e-1;0<=r&&128==(192&t[r]);)r--;return r<0?e:0===r?e:r+u[t[r]]>e?r:e}(e),n=e;i!==e.length&&(h.uint8array?(n=e.subarray(0,i),this.leftOver=e.subarray(i,e.length)):(n=e.slice(0,i),this.leftOver=e.slice(i,e.length))),this.push({data:s.utf8decode(n),meta:t.meta})},a.prototype.flush=function(){this.leftOver&&this.leftOver.length&&(this.push({data:s.utf8decode(this.leftOver),meta:{}}),this.leftOver=null)},s.Utf8DecodeWorker=a,o.inherits(l,i),l.prototype.processChunk=function(t){this.push({data:s.utf8encode(t.data),meta:t.meta})},s.Utf8EncodeWorker=l},{"./nodejsUtils":14,"./stream/GenericWorker":28,"./support":30,"./utils":32}],32:[function(t,e,a){"use strict";var o=t("./support"),h=t("./base64"),r=t("./nodejsUtils"),i=t("set-immediate-shim"),u=t("./external");function n(t){return t}function l(t,e){for(var r=0;r<t.length;++r)e[r]=255&t.charCodeAt(r);return e}a.newBlob=function(e,r){a.checkSupport("blob");try{return new Blob([e],{type:r})}catch(t){try{var i=new(self.BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||self.MSBlobBuilder);return i.append(e),i.getBlob(r)}catch(t){throw new Error("Bug : can't construct the Blob.")}}};var s={stringifyByChunk:function(t,e,r){var i=[],n=0,s=t.length;if(s<=r)return String.fromCharCode.apply(null,t);for(;n<s;)"array"===e||"nodebuffer"===e?i.push(String.fromCharCode.apply(null,t.slice(n,Math.min(n+r,s)))):i.push(String.fromCharCode.apply(null,t.subarray(n,Math.min(n+r,s)))),n+=r;return i.join("")},stringifyByChar:function(t){for(var e="",r=0;r<t.length;r++)e+=String.fromCharCode(t[r]);return e},applyCanBeUsed:{uint8array:function(){try{return o.uint8array&&1===String.fromCharCode.apply(null,new Uint8Array(1)).length}catch(t){return!1}}(),nodebuffer:function(){try{return o.nodebuffer&&1===String.fromCharCode.apply(null,r.allocBuffer(1)).length}catch(t){return!1}}()}};function f(t){var e=65536,r=a.getTypeOf(t),i=!0;if("uint8array"===r?i=s.applyCanBeUsed.uint8array:"nodebuffer"===r&&(i=s.applyCanBeUsed.nodebuffer),i)for(;1<e;)try{return s.stringifyByChunk(t,r,e)}catch(t){e=Math.floor(e/2)}return s.stringifyByChar(t)}function d(t,e){for(var r=0;r<t.length;r++)e[r]=t[r];return e}a.applyFromCharCode=f;var c={};c.string={string:n,array:function(t){return l(t,new Array(t.length))},arraybuffer:function(t){return c.string.uint8array(t).buffer},uint8array:function(t){return l(t,new Uint8Array(t.length))},nodebuffer:function(t){return l(t,r.allocBuffer(t.length))}},c.array={string:f,array:n,arraybuffer:function(t){return new Uint8Array(t).buffer},uint8array:function(t){return new Uint8Array(t)},nodebuffer:function(t){return r.newBufferFrom(t)}},c.arraybuffer={string:function(t){return f(new Uint8Array(t))},array:function(t){return d(new Uint8Array(t),new Array(t.byteLength))},arraybuffer:n,uint8array:function(t){return new Uint8Array(t)},nodebuffer:function(t){return r.newBufferFrom(new Uint8Array(t))}},c.uint8array={string:f,array:function(t){return d(t,new Array(t.length))},arraybuffer:function(t){return t.buffer},uint8array:n,nodebuffer:function(t){return r.newBufferFrom(t)}},c.nodebuffer={string:f,array:function(t){return d(t,new Array(t.length))},arraybuffer:function(t){return c.nodebuffer.uint8array(t).buffer},uint8array:function(t){return d(t,new Uint8Array(t.length))},nodebuffer:n},a.transformTo=function(t,e){if(e=e||"",!t)return e;a.checkSupport(t);var r=a.getTypeOf(e);return c[r][t](e)},a.getTypeOf=function(t){return"string"==typeof t?"string":"[object Array]"===Object.prototype.toString.call(t)?"array":o.nodebuffer&&r.isBuffer(t)?"nodebuffer":o.uint8array&&t instanceof Uint8Array?"uint8array":o.arraybuffer&&t instanceof ArrayBuffer?"arraybuffer":void 0},a.checkSupport=function(t){if(!o[t.toLowerCase()])throw new Error(t+" is not supported by this platform")},a.MAX_VALUE_16BITS=65535,a.MAX_VALUE_32BITS=-1,a.pretty=function(t){var e,r,i="";for(r=0;r<(t||"").length;r++)i+="\\x"+((e=t.charCodeAt(r))<16?"0":"")+e.toString(16).toUpperCase();return i},a.delay=function(t,e,r){i(function(){t.apply(r||null,e||[])})},a.inherits=function(t,e){function r(){}r.prototype=e.prototype,t.prototype=new r},a.extend=function(){var t,e,r={};for(t=0;t<arguments.length;t++)for(e in arguments[t])arguments[t].hasOwnProperty(e)&&void 0===r[e]&&(r[e]=arguments[t][e]);return r},a.prepareContent=function(r,t,i,n,s){return u.Promise.resolve(t).then(function(i){return o.blob&&(i instanceof Blob||-1!==["[object File]","[object Blob]"].indexOf(Object.prototype.toString.call(i)))&&"undefined"!=typeof FileReader?new u.Promise(function(e,r){var t=new FileReader;t.onload=function(t){e(t.target.result)},t.onerror=function(t){r(t.target.error)},t.readAsArrayBuffer(i)}):i}).then(function(t){var e=a.getTypeOf(t);return e?("arraybuffer"===e?t=a.transformTo("uint8array",t):"string"===e&&(s?t=h.decode(t):i&&!0!==n&&(t=function(t){return l(t,o.uint8array?new Uint8Array(t.length):new Array(t.length))}(t))),t):u.Promise.reject(new Error("Can't read the data of '"+r+"'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"))})}},{"./base64":1,"./external":6,"./nodejsUtils":14,"./support":30,"set-immediate-shim":54}],33:[function(t,e,r){"use strict";var i=t("./reader/readerFor"),n=t("./utils"),s=t("./signature"),a=t("./zipEntry"),o=(t("./utf8"),t("./support"));function h(t){this.files=[],this.loadOptions=t}h.prototype={checkSignature:function(t){if(!this.reader.readAndCheckSignature(t)){this.reader.index-=4;var e=this.reader.readString(4);throw new Error("Corrupted zip or bug: unexpected signature ("+n.pretty(e)+", expected "+n.pretty(t)+")")}},isSignature:function(t,e){var r=this.reader.index;this.reader.setIndex(t);var i=this.reader.readString(4)===e;return this.reader.setIndex(r),i},readBlockEndOfCentral:function(){this.diskNumber=this.reader.readInt(2),this.diskWithCentralDirStart=this.reader.readInt(2),this.centralDirRecordsOnThisDisk=this.reader.readInt(2),this.centralDirRecords=this.reader.readInt(2),this.centralDirSize=this.reader.readInt(4),this.centralDirOffset=this.reader.readInt(4),this.zipCommentLength=this.reader.readInt(2);var t=this.reader.readData(this.zipCommentLength),e=o.uint8array?"uint8array":"array",r=n.transformTo(e,t);this.zipComment=this.loadOptions.decodeFileName(r)},readBlockZip64EndOfCentral:function(){this.zip64EndOfCentralSize=this.reader.readInt(8),this.reader.skip(4),this.diskNumber=this.reader.readInt(4),this.diskWithCentralDirStart=this.reader.readInt(4),this.centralDirRecordsOnThisDisk=this.reader.readInt(8),this.centralDirRecords=this.reader.readInt(8),this.centralDirSize=this.reader.readInt(8),this.centralDirOffset=this.reader.readInt(8),this.zip64ExtensibleData={};for(var t,e,r,i=this.zip64EndOfCentralSize-44;0<i;)t=this.reader.readInt(2),e=this.reader.readInt(4),r=this.reader.readData(e),this.zip64ExtensibleData[t]={id:t,length:e,value:r}},readBlockZip64EndOfCentralLocator:function(){if(this.diskWithZip64CentralDirStart=this.reader.readInt(4),this.relativeOffsetEndOfZip64CentralDir=this.reader.readInt(8),this.disksCount=this.reader.readInt(4),1<this.disksCount)throw new Error("Multi-volumes zip are not supported")},readLocalFiles:function(){var t,e;for(t=0;t<this.files.length;t++)e=this.files[t],this.reader.setIndex(e.localHeaderOffset),this.checkSignature(s.LOCAL_FILE_HEADER),e.readLocalPart(this.reader),e.handleUTF8(),e.processAttributes()},readCentralDir:function(){var t;for(this.reader.setIndex(this.centralDirOffset);this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER);)(t=new a({zip64:this.zip64},this.loadOptions)).readCentralPart(this.reader),this.files.push(t);if(this.centralDirRecords!==this.files.length&&0!==this.centralDirRecords&&0===this.files.length)throw new Error("Corrupted zip or bug: expected "+this.centralDirRecords+" records in central dir, got "+this.files.length)},readEndOfCentral:function(){var t=this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);if(t<0)throw!this.isSignature(0,s.LOCAL_FILE_HEADER)?new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html"):new Error("Corrupted zip: can't find end of central directory");this.reader.setIndex(t);var e=t;if(this.checkSignature(s.CENTRAL_DIRECTORY_END),this.readBlockEndOfCentral(),this.diskNumber===n.MAX_VALUE_16BITS||this.diskWithCentralDirStart===n.MAX_VALUE_16BITS||this.centralDirRecordsOnThisDisk===n.MAX_VALUE_16BITS||this.centralDirRecords===n.MAX_VALUE_16BITS||this.centralDirSize===n.MAX_VALUE_32BITS||this.centralDirOffset===n.MAX_VALUE_32BITS){if(this.zip64=!0,(t=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR))<0)throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");if(this.reader.setIndex(t),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR),this.readBlockZip64EndOfCentralLocator(),!this.isSignature(this.relativeOffsetEndOfZip64CentralDir,s.ZIP64_CENTRAL_DIRECTORY_END)&&(this.relativeOffsetEndOfZip64CentralDir=this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.relativeOffsetEndOfZip64CentralDir<0))throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir),this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END),this.readBlockZip64EndOfCentral()}var r=this.centralDirOffset+this.centralDirSize;this.zip64&&(r+=20,r+=12+this.zip64EndOfCentralSize);var i=e-r;if(0<i)this.isSignature(e,s.CENTRAL_FILE_HEADER)||(this.reader.zero=i);else if(i<0)throw new Error("Corrupted zip: missing "+Math.abs(i)+" bytes.")},prepareReader:function(t){this.reader=i(t)},load:function(t){this.prepareReader(t),this.readEndOfCentral(),this.readCentralDir(),this.readLocalFiles()}},e.exports=h},{"./reader/readerFor":22,"./signature":23,"./support":30,"./utf8":31,"./utils":32,"./zipEntry":34}],34:[function(t,e,r){"use strict";var i=t("./reader/readerFor"),s=t("./utils"),n=t("./compressedObject"),a=t("./crc32"),o=t("./utf8"),h=t("./compressions"),u=t("./support");function l(t,e){this.options=t,this.loadOptions=e}l.prototype={isEncrypted:function(){return 1==(1&this.bitFlag)},useUTF8:function(){return 2048==(2048&this.bitFlag)},readLocalPart:function(t){var e,r;if(t.skip(22),this.fileNameLength=t.readInt(2),r=t.readInt(2),this.fileName=t.readData(this.fileNameLength),t.skip(r),-1===this.compressedSize||-1===this.uncompressedSize)throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");if(null===(e=function(t){for(var e in h)if(h.hasOwnProperty(e)&&h[e].magic===t)return h[e];return null}(this.compressionMethod)))throw new Error("Corrupted zip : compression "+s.pretty(this.compressionMethod)+" unknown (inner file : "+s.transformTo("string",this.fileName)+")");this.decompressed=new n(this.compressedSize,this.uncompressedSize,this.crc32,e,t.readData(this.compressedSize))},readCentralPart:function(t){this.versionMadeBy=t.readInt(2),t.skip(2),this.bitFlag=t.readInt(2),this.compressionMethod=t.readString(2),this.date=t.readDate(),this.crc32=t.readInt(4),this.compressedSize=t.readInt(4),this.uncompressedSize=t.readInt(4);var e=t.readInt(2);if(this.extraFieldsLength=t.readInt(2),this.fileCommentLength=t.readInt(2),this.diskNumberStart=t.readInt(2),this.internalFileAttributes=t.readInt(2),this.externalFileAttributes=t.readInt(4),this.localHeaderOffset=t.readInt(4),this.isEncrypted())throw new Error("Encrypted zip are not supported");t.skip(e),this.readExtraFields(t),this.parseZIP64ExtraField(t),this.fileComment=t.readData(this.fileCommentLength)},processAttributes:function(){this.unixPermissions=null,this.dosPermissions=null;var t=this.versionMadeBy>>8;this.dir=!!(16&this.externalFileAttributes),0==t&&(this.dosPermissions=63&this.externalFileAttributes),3==t&&(this.unixPermissions=this.externalFileAttributes>>16&65535),this.dir||"/"!==this.fileNameStr.slice(-1)||(this.dir=!0)},parseZIP64ExtraField:function(t){if(this.extraFields[1]){var e=i(this.extraFields[1].value);this.uncompressedSize===s.MAX_VALUE_32BITS&&(this.uncompressedSize=e.readInt(8)),this.compressedSize===s.MAX_VALUE_32BITS&&(this.compressedSize=e.readInt(8)),this.localHeaderOffset===s.MAX_VALUE_32BITS&&(this.localHeaderOffset=e.readInt(8)),this.diskNumberStart===s.MAX_VALUE_32BITS&&(this.diskNumberStart=e.readInt(4))}},readExtraFields:function(t){var e,r,i,n=t.index+this.extraFieldsLength;for(this.extraFields||(this.extraFields={});t.index+4<n;)e=t.readInt(2),r=t.readInt(2),i=t.readData(r),this.extraFields[e]={id:e,length:r,value:i};t.setIndex(n)},handleUTF8:function(){var t=u.uint8array?"uint8array":"array";if(this.useUTF8())this.fileNameStr=o.utf8decode(this.fileName),this.fileCommentStr=o.utf8decode(this.fileComment);else{var e=this.findExtraFieldUnicodePath();if(null!==e)this.fileNameStr=e;else{var r=s.transformTo(t,this.fileName);this.fileNameStr=this.loadOptions.decodeFileName(r)}var i=this.findExtraFieldUnicodeComment();if(null!==i)this.fileCommentStr=i;else{var n=s.transformTo(t,this.fileComment);this.fileCommentStr=this.loadOptions.decodeFileName(n)}}},findExtraFieldUnicodePath:function(){var t=this.extraFields[28789];if(t){var e=i(t.value);return 1!==e.readInt(1)?null:a(this.fileName)!==e.readInt(4)?null:o.utf8decode(e.readData(t.length-5))}return null},findExtraFieldUnicodeComment:function(){var t=this.extraFields[25461];if(t){var e=i(t.value);return 1!==e.readInt(1)?null:a(this.fileComment)!==e.readInt(4)?null:o.utf8decode(e.readData(t.length-5))}return null}},e.exports=l},{"./compressedObject":2,"./compressions":3,"./crc32":4,"./reader/readerFor":22,"./support":30,"./utf8":31,"./utils":32}],35:[function(t,e,r){"use strict";function i(t,e,r){this.name=t,this.dir=r.dir,this.date=r.date,this.comment=r.comment,this.unixPermissions=r.unixPermissions,this.dosPermissions=r.dosPermissions,this._data=e,this._dataBinary=r.binary,this.options={compression:r.compression,compressionOptions:r.compressionOptions}}var s=t("./stream/StreamHelper"),n=t("./stream/DataWorker"),a=t("./utf8"),o=t("./compressedObject"),h=t("./stream/GenericWorker");i.prototype={internalStream:function(t){var e=null,r="string";try{if(!t)throw new Error("No output type specified.");var i="string"===(r=t.toLowerCase())||"text"===r;"binarystring"!==r&&"text"!==r||(r="string"),e=this._decompressWorker();var n=!this._dataBinary;n&&!i&&(e=e.pipe(new a.Utf8EncodeWorker)),!n&&i&&(e=e.pipe(new a.Utf8DecodeWorker))}catch(t){(e=new h("error")).error(t)}return new s(e,r,"")},async:function(t,e){return this.internalStream(t).accumulate(e)},nodeStream:function(t,e){return this.internalStream(t||"nodebuffer").toNodejsStream(e)},_compressWorker:function(t,e){if(this._data instanceof o&&this._data.compression.magic===t.magic)return this._data.getCompressedWorker();var r=this._decompressWorker();return this._dataBinary||(r=r.pipe(new a.Utf8EncodeWorker)),o.createWorkerFrom(r,t,e)},_decompressWorker:function(){return this._data instanceof o?this._data.getContentWorker():this._data instanceof h?this._data:new n(this._data)}};for(var u=["asText","asBinary","asNodeBuffer","asUint8Array","asArrayBuffer"],l=function(){throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.")},f=0;f<u.length;f++)i.prototype[u[f]]=l;e.exports=i},{"./compressedObject":2,"./stream/DataWorker":27,"./stream/GenericWorker":28,"./stream/StreamHelper":29,"./utf8":31}],36:[function(t,l,e){(function(e){"use strict";var r,i,t=e.MutationObserver||e.WebKitMutationObserver;if(t){var n=0,s=new t(u),a=e.document.createTextNode("");s.observe(a,{characterData:!0}),r=function(){a.data=n=++n%2}}else if(e.setImmediate||void 0===e.MessageChannel)r="document"in e&&"onreadystatechange"in e.document.createElement("script")?function(){var t=e.document.createElement("script");t.onreadystatechange=function(){u(),t.onreadystatechange=null,t.parentNode.removeChild(t),t=null},e.document.documentElement.appendChild(t)}:function(){setTimeout(u,0)};else{var o=new e.MessageChannel;o.port1.onmessage=u,r=function(){o.port2.postMessage(0)}}var h=[];function u(){var t,e;i=!0;for(var r=h.length;r;){for(e=h,h=[],t=-1;++t<r;)e[t]();r=h.length}i=!1}l.exports=function(t){1!==h.push(t)||i||r()}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],37:[function(t,e,r){"use strict";var n=t("immediate");function u(){}var l={},s=["REJECTED"],a=["FULFILLED"],i=["PENDING"];function o(t){if("function"!=typeof t)throw new TypeError("resolver must be a function");this.state=i,this.queue=[],this.outcome=void 0,t!==u&&c(this,t)}function h(t,e,r){this.promise=t,"function"==typeof e&&(this.onFulfilled=e,this.callFulfilled=this.otherCallFulfilled),"function"==typeof r&&(this.onRejected=r,this.callRejected=this.otherCallRejected)}function f(e,r,i){n(function(){var t;try{t=r(i)}catch(t){return l.reject(e,t)}t===e?l.reject(e,new TypeError("Cannot resolve promise with itself")):l.resolve(e,t)})}function d(t){var e=t&&t.then;if(t&&("object"==typeof t||"function"==typeof t)&&"function"==typeof e)return function(){e.apply(t,arguments)}}function c(e,t){var r=!1;function i(t){r||(r=!0,l.reject(e,t))}function n(t){r||(r=!0,l.resolve(e,t))}var s=p(function(){t(n,i)});"error"===s.status&&i(s.value)}function p(t,e){var r={};try{r.value=t(e),r.status="success"}catch(t){r.status="error",r.value=t}return r}(e.exports=o).prototype.finally=function(e){if("function"!=typeof e)return this;var r=this.constructor;return this.then(function(t){return r.resolve(e()).then(function(){return t})},function(t){return r.resolve(e()).then(function(){throw t})})},o.prototype.catch=function(t){return this.then(null,t)},o.prototype.then=function(t,e){if("function"!=typeof t&&this.state===a||"function"!=typeof e&&this.state===s)return this;var r=new this.constructor(u);this.state!==i?f(r,this.state===a?t:e,this.outcome):this.queue.push(new h(r,t,e));return r},h.prototype.callFulfilled=function(t){l.resolve(this.promise,t)},h.prototype.otherCallFulfilled=function(t){f(this.promise,this.onFulfilled,t)},h.prototype.callRejected=function(t){l.reject(this.promise,t)},h.prototype.otherCallRejected=function(t){f(this.promise,this.onRejected,t)},l.resolve=function(t,e){var r=p(d,e);if("error"===r.status)return l.reject(t,r.value);var i=r.value;if(i)c(t,i);else{t.state=a,t.outcome=e;for(var n=-1,s=t.queue.length;++n<s;)t.queue[n].callFulfilled(e)}return t},l.reject=function(t,e){t.state=s,t.outcome=e;for(var r=-1,i=t.queue.length;++r<i;)t.queue[r].callRejected(e);return t},o.resolve=function(t){if(t instanceof this)return t;return l.resolve(new this(u),t)},o.reject=function(t){var e=new this(u);return l.reject(e,t)},o.all=function(t){var r=this;if("[object Array]"!==Object.prototype.toString.call(t))return this.reject(new TypeError("must be an array"));var i=t.length,n=!1;if(!i)return this.resolve([]);var s=new Array(i),a=0,e=-1,o=new this(u);for(;++e<i;)h(t[e],e);return o;function h(t,e){r.resolve(t).then(function(t){s[e]=t,++a!==i||n||(n=!0,l.resolve(o,s))},function(t){n||(n=!0,l.reject(o,t))})}},o.race=function(t){var e=this;if("[object Array]"!==Object.prototype.toString.call(t))return this.reject(new TypeError("must be an array"));var r=t.length,i=!1;if(!r)return this.resolve([]);var n=-1,s=new this(u);for(;++n<r;)a=t[n],e.resolve(a).then(function(t){i||(i=!0,l.resolve(s,t))},function(t){i||(i=!0,l.reject(s,t))});var a;return s}},{immediate:36}],38:[function(t,e,r){"use strict";var i={};(0,t("./lib/utils/common").assign)(i,t("./lib/deflate"),t("./lib/inflate"),t("./lib/zlib/constants")),e.exports=i},{"./lib/deflate":39,"./lib/inflate":40,"./lib/utils/common":41,"./lib/zlib/constants":44}],39:[function(t,e,r){"use strict";var a=t("./zlib/deflate"),o=t("./utils/common"),h=t("./utils/strings"),n=t("./zlib/messages"),s=t("./zlib/zstream"),u=Object.prototype.toString,l=0,f=-1,d=0,c=8;function p(t){if(!(this instanceof p))return new p(t);this.options=o.assign({level:f,method:c,chunkSize:16384,windowBits:15,memLevel:8,strategy:d,to:""},t||{});var e=this.options;e.raw&&0<e.windowBits?e.windowBits=-e.windowBits:e.gzip&&0<e.windowBits&&e.windowBits<16&&(e.windowBits+=16),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new s,this.strm.avail_out=0;var r=a.deflateInit2(this.strm,e.level,e.method,e.windowBits,e.memLevel,e.strategy);if(r!==l)throw new Error(n[r]);if(e.header&&a.deflateSetHeader(this.strm,e.header),e.dictionary){var i;if(i="string"==typeof e.dictionary?h.string2buf(e.dictionary):"[object ArrayBuffer]"===u.call(e.dictionary)?new Uint8Array(e.dictionary):e.dictionary,(r=a.deflateSetDictionary(this.strm,i))!==l)throw new Error(n[r]);this._dict_set=!0}}function i(t,e){var r=new p(e);if(r.push(t,!0),r.err)throw r.msg||n[r.err];return r.result}p.prototype.push=function(t,e){var r,i,n=this.strm,s=this.options.chunkSize;if(this.ended)return!1;i=e===~~e?e:!0===e?4:0,"string"==typeof t?n.input=h.string2buf(t):"[object ArrayBuffer]"===u.call(t)?n.input=new Uint8Array(t):n.input=t,n.next_in=0,n.avail_in=n.input.length;do{if(0===n.avail_out&&(n.output=new o.Buf8(s),n.next_out=0,n.avail_out=s),1!==(r=a.deflate(n,i))&&r!==l)return this.onEnd(r),!(this.ended=!0);0!==n.avail_out&&(0!==n.avail_in||4!==i&&2!==i)||("string"===this.options.to?this.onData(h.buf2binstring(o.shrinkBuf(n.output,n.next_out))):this.onData(o.shrinkBuf(n.output,n.next_out)))}while((0<n.avail_in||0===n.avail_out)&&1!==r);return 4===i?(r=a.deflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===l):2!==i||(this.onEnd(l),!(n.avail_out=0))},p.prototype.onData=function(t){this.chunks.push(t)},p.prototype.onEnd=function(t){t===l&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=o.flattenChunks(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg},r.Deflate=p,r.deflate=i,r.deflateRaw=function(t,e){return(e=e||{}).raw=!0,i(t,e)},r.gzip=function(t,e){return(e=e||{}).gzip=!0,i(t,e)}},{"./utils/common":41,"./utils/strings":42,"./zlib/deflate":46,"./zlib/messages":51,"./zlib/zstream":53}],40:[function(t,e,r){"use strict";var d=t("./zlib/inflate"),c=t("./utils/common"),p=t("./utils/strings"),m=t("./zlib/constants"),i=t("./zlib/messages"),n=t("./zlib/zstream"),s=t("./zlib/gzheader"),_=Object.prototype.toString;function a(t){if(!(this instanceof a))return new a(t);this.options=c.assign({chunkSize:16384,windowBits:0,to:""},t||{});var e=this.options;e.raw&&0<=e.windowBits&&e.windowBits<16&&(e.windowBits=-e.windowBits,0===e.windowBits&&(e.windowBits=-15)),!(0<=e.windowBits&&e.windowBits<16)||t&&t.windowBits||(e.windowBits+=32),15<e.windowBits&&e.windowBits<48&&0==(15&e.windowBits)&&(e.windowBits|=15),this.err=0,this.msg="",this.ended=!1,this.chunks=[],this.strm=new n,this.strm.avail_out=0;var r=d.inflateInit2(this.strm,e.windowBits);if(r!==m.Z_OK)throw new Error(i[r]);this.header=new s,d.inflateGetHeader(this.strm,this.header)}function o(t,e){var r=new a(e);if(r.push(t,!0),r.err)throw r.msg||i[r.err];return r.result}a.prototype.push=function(t,e){var r,i,n,s,a,o,h=this.strm,u=this.options.chunkSize,l=this.options.dictionary,f=!1;if(this.ended)return!1;i=e===~~e?e:!0===e?m.Z_FINISH:m.Z_NO_FLUSH,"string"==typeof t?h.input=p.binstring2buf(t):"[object ArrayBuffer]"===_.call(t)?h.input=new Uint8Array(t):h.input=t,h.next_in=0,h.avail_in=h.input.length;do{if(0===h.avail_out&&(h.output=new c.Buf8(u),h.next_out=0,h.avail_out=u),(r=d.inflate(h,m.Z_NO_FLUSH))===m.Z_NEED_DICT&&l&&(o="string"==typeof l?p.string2buf(l):"[object ArrayBuffer]"===_.call(l)?new Uint8Array(l):l,r=d.inflateSetDictionary(this.strm,o)),r===m.Z_BUF_ERROR&&!0===f&&(r=m.Z_OK,f=!1),r!==m.Z_STREAM_END&&r!==m.Z_OK)return this.onEnd(r),!(this.ended=!0);h.next_out&&(0!==h.avail_out&&r!==m.Z_STREAM_END&&(0!==h.avail_in||i!==m.Z_FINISH&&i!==m.Z_SYNC_FLUSH)||("string"===this.options.to?(n=p.utf8border(h.output,h.next_out),s=h.next_out-n,a=p.buf2string(h.output,n),h.next_out=s,h.avail_out=u-s,s&&c.arraySet(h.output,h.output,n,s,0),this.onData(a)):this.onData(c.shrinkBuf(h.output,h.next_out)))),0===h.avail_in&&0===h.avail_out&&(f=!0)}while((0<h.avail_in||0===h.avail_out)&&r!==m.Z_STREAM_END);return r===m.Z_STREAM_END&&(i=m.Z_FINISH),i===m.Z_FINISH?(r=d.inflateEnd(this.strm),this.onEnd(r),this.ended=!0,r===m.Z_OK):i!==m.Z_SYNC_FLUSH||(this.onEnd(m.Z_OK),!(h.avail_out=0))},a.prototype.onData=function(t){this.chunks.push(t)},a.prototype.onEnd=function(t){t===m.Z_OK&&("string"===this.options.to?this.result=this.chunks.join(""):this.result=c.flattenChunks(this.chunks)),this.chunks=[],this.err=t,this.msg=this.strm.msg},r.Inflate=a,r.inflate=o,r.inflateRaw=function(t,e){return(e=e||{}).raw=!0,o(t,e)},r.ungzip=o},{"./utils/common":41,"./utils/strings":42,"./zlib/constants":44,"./zlib/gzheader":47,"./zlib/inflate":49,"./zlib/messages":51,"./zlib/zstream":53}],41:[function(t,e,r){"use strict";var i="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;r.assign=function(t){for(var e=Array.prototype.slice.call(arguments,1);e.length;){var r=e.shift();if(r){if("object"!=typeof r)throw new TypeError(r+"must be non-object");for(var i in r)r.hasOwnProperty(i)&&(t[i]=r[i])}}return t},r.shrinkBuf=function(t,e){return t.length===e?t:t.subarray?t.subarray(0,e):(t.length=e,t)};var n={arraySet:function(t,e,r,i,n){if(e.subarray&&t.subarray)t.set(e.subarray(r,r+i),n);else for(var s=0;s<i;s++)t[n+s]=e[r+s]},flattenChunks:function(t){var e,r,i,n,s,a;for(e=i=0,r=t.length;e<r;e++)i+=t[e].length;for(a=new Uint8Array(i),e=n=0,r=t.length;e<r;e++)s=t[e],a.set(s,n),n+=s.length;return a}},s={arraySet:function(t,e,r,i,n){for(var s=0;s<i;s++)t[n+s]=e[r+s]},flattenChunks:function(t){return[].concat.apply([],t)}};r.setTyped=function(t){t?(r.Buf8=Uint8Array,r.Buf16=Uint16Array,r.Buf32=Int32Array,r.assign(r,n)):(r.Buf8=Array,r.Buf16=Array,r.Buf32=Array,r.assign(r,s))},r.setTyped(i)},{}],42:[function(t,e,r){"use strict";var h=t("./common"),n=!0,s=!0;try{String.fromCharCode.apply(null,[0])}catch(t){n=!1}try{String.fromCharCode.apply(null,new Uint8Array(1))}catch(t){s=!1}for(var u=new h.Buf8(256),i=0;i<256;i++)u[i]=252<=i?6:248<=i?5:240<=i?4:224<=i?3:192<=i?2:1;function l(t,e){if(e<65537&&(t.subarray&&s||!t.subarray&&n))return String.fromCharCode.apply(null,h.shrinkBuf(t,e));for(var r="",i=0;i<e;i++)r+=String.fromCharCode(t[i]);return r}u[254]=u[254]=1,r.string2buf=function(t){var e,r,i,n,s,a=t.length,o=0;for(n=0;n<a;n++)55296==(64512&(r=t.charCodeAt(n)))&&n+1<a&&56320==(64512&(i=t.charCodeAt(n+1)))&&(r=65536+(r-55296<<10)+(i-56320),n++),o+=r<128?1:r<2048?2:r<65536?3:4;for(e=new h.Buf8(o),n=s=0;s<o;n++)55296==(64512&(r=t.charCodeAt(n)))&&n+1<a&&56320==(64512&(i=t.charCodeAt(n+1)))&&(r=65536+(r-55296<<10)+(i-56320),n++),r<128?e[s++]=r:(r<2048?e[s++]=192|r>>>6:(r<65536?e[s++]=224|r>>>12:(e[s++]=240|r>>>18,e[s++]=128|r>>>12&63),e[s++]=128|r>>>6&63),e[s++]=128|63&r);return e},r.buf2binstring=function(t){return l(t,t.length)},r.binstring2buf=function(t){for(var e=new h.Buf8(t.length),r=0,i=e.length;r<i;r++)e[r]=t.charCodeAt(r);return e},r.buf2string=function(t,e){var r,i,n,s,a=e||t.length,o=new Array(2*a);for(r=i=0;r<a;)if((n=t[r++])<128)o[i++]=n;else if(4<(s=u[n]))o[i++]=65533,r+=s-1;else{for(n&=2===s?31:3===s?15:7;1<s&&r<a;)n=n<<6|63&t[r++],s--;1<s?o[i++]=65533:n<65536?o[i++]=n:(n-=65536,o[i++]=55296|n>>10&1023,o[i++]=56320|1023&n)}return l(o,i)},r.utf8border=function(t,e){var r;for((e=e||t.length)>t.length&&(e=t.length),r=e-1;0<=r&&128==(192&t[r]);)r--;return r<0?e:0===r?e:r+u[t[r]]>e?r:e}},{"./common":41}],43:[function(t,e,r){"use strict";e.exports=function(t,e,r,i){for(var n=65535&t|0,s=t>>>16&65535|0,a=0;0!==r;){for(r-=a=2e3<r?2e3:r;s=s+(n=n+e[i++]|0)|0,--a;);n%=65521,s%=65521}return n|s<<16|0}},{}],44:[function(t,e,r){"use strict";e.exports={Z_NO_FLUSH:0,Z_PARTIAL_FLUSH:1,Z_SYNC_FLUSH:2,Z_FULL_FLUSH:3,Z_FINISH:4,Z_BLOCK:5,Z_TREES:6,Z_OK:0,Z_STREAM_END:1,Z_NEED_DICT:2,Z_ERRNO:-1,Z_STREAM_ERROR:-2,Z_DATA_ERROR:-3,Z_BUF_ERROR:-5,Z_NO_COMPRESSION:0,Z_BEST_SPEED:1,Z_BEST_COMPRESSION:9,Z_DEFAULT_COMPRESSION:-1,Z_FILTERED:1,Z_HUFFMAN_ONLY:2,Z_RLE:3,Z_FIXED:4,Z_DEFAULT_STRATEGY:0,Z_BINARY:0,Z_TEXT:1,Z_UNKNOWN:2,Z_DEFLATED:8}},{}],45:[function(t,e,r){"use strict";var o=function(){for(var t,e=[],r=0;r<256;r++){t=r;for(var i=0;i<8;i++)t=1&t?3988292384^t>>>1:t>>>1;e[r]=t}return e}();e.exports=function(t,e,r,i){var n=o,s=i+r;t^=-1;for(var a=i;a<s;a++)t=t>>>8^n[255&(t^e[a])];return-1^t}},{}],46:[function(t,e,r){"use strict";var h,d=t("../utils/common"),u=t("./trees"),c=t("./adler32"),p=t("./crc32"),i=t("./messages"),l=0,f=4,m=0,_=-2,g=-1,b=4,n=2,v=8,y=9,s=286,a=30,o=19,w=2*s+1,k=15,x=3,S=258,z=S+x+1,C=42,E=113,A=1,I=2,O=3,B=4;function R(t,e){return t.msg=i[e],e}function T(t){return(t<<1)-(4<t?9:0)}function D(t){for(var e=t.length;0<=--e;)t[e]=0}function F(t){var e=t.state,r=e.pending;r>t.avail_out&&(r=t.avail_out),0!==r&&(d.arraySet(t.output,e.pending_buf,e.pending_out,r,t.next_out),t.next_out+=r,e.pending_out+=r,t.total_out+=r,t.avail_out-=r,e.pending-=r,0===e.pending&&(e.pending_out=0))}function N(t,e){u._tr_flush_block(t,0<=t.block_start?t.block_start:-1,t.strstart-t.block_start,e),t.block_start=t.strstart,F(t.strm)}function U(t,e){t.pending_buf[t.pending++]=e}function P(t,e){t.pending_buf[t.pending++]=e>>>8&255,t.pending_buf[t.pending++]=255&e}function L(t,e){var r,i,n=t.max_chain_length,s=t.strstart,a=t.prev_length,o=t.nice_match,h=t.strstart>t.w_size-z?t.strstart-(t.w_size-z):0,u=t.window,l=t.w_mask,f=t.prev,d=t.strstart+S,c=u[s+a-1],p=u[s+a];t.prev_length>=t.good_match&&(n>>=2),o>t.lookahead&&(o=t.lookahead);do{if(u[(r=e)+a]===p&&u[r+a-1]===c&&u[r]===u[s]&&u[++r]===u[s+1]){s+=2,r++;do{}while(u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&u[++s]===u[++r]&&s<d);if(i=S-(d-s),s=d-S,a<i){if(t.match_start=e,o<=(a=i))break;c=u[s+a-1],p=u[s+a]}}}while((e=f[e&l])>h&&0!=--n);return a<=t.lookahead?a:t.lookahead}function j(t){var e,r,i,n,s,a,o,h,u,l,f=t.w_size;do{if(n=t.window_size-t.lookahead-t.strstart,t.strstart>=f+(f-z)){for(d.arraySet(t.window,t.window,f,f,0),t.match_start-=f,t.strstart-=f,t.block_start-=f,e=r=t.hash_size;i=t.head[--e],t.head[e]=f<=i?i-f:0,--r;);for(e=r=f;i=t.prev[--e],t.prev[e]=f<=i?i-f:0,--r;);n+=f}if(0===t.strm.avail_in)break;if(a=t.strm,o=t.window,h=t.strstart+t.lookahead,u=n,l=void 0,l=a.avail_in,u<l&&(l=u),r=0===l?0:(a.avail_in-=l,d.arraySet(o,a.input,a.next_in,l,h),1===a.state.wrap?a.adler=c(a.adler,o,l,h):2===a.state.wrap&&(a.adler=p(a.adler,o,l,h)),a.next_in+=l,a.total_in+=l,l),t.lookahead+=r,t.lookahead+t.insert>=x)for(s=t.strstart-t.insert,t.ins_h=t.window[s],t.ins_h=(t.ins_h<<t.hash_shift^t.window[s+1])&t.hash_mask;t.insert&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[s+x-1])&t.hash_mask,t.prev[s&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=s,s++,t.insert--,!(t.lookahead+t.insert<x)););}while(t.lookahead<z&&0!==t.strm.avail_in)}function Z(t,e){for(var r,i;;){if(t.lookahead<z){if(j(t),t.lookahead<z&&e===l)return A;if(0===t.lookahead)break}if(r=0,t.lookahead>=x&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+x-1])&t.hash_mask,r=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!==r&&t.strstart-r<=t.w_size-z&&(t.match_length=L(t,r)),t.match_length>=x)if(i=u._tr_tally(t,t.strstart-t.match_start,t.match_length-x),t.lookahead-=t.match_length,t.match_length<=t.max_lazy_match&&t.lookahead>=x){for(t.match_length--;t.strstart++,t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+x-1])&t.hash_mask,r=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart,0!=--t.match_length;);t.strstart++}else t.strstart+=t.match_length,t.match_length=0,t.ins_h=t.window[t.strstart],t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+1])&t.hash_mask;else i=u._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++;if(i&&(N(t,!1),0===t.strm.avail_out))return A}return t.insert=t.strstart<x-1?t.strstart:x-1,e===f?(N(t,!0),0===t.strm.avail_out?O:B):t.last_lit&&(N(t,!1),0===t.strm.avail_out)?A:I}function W(t,e){for(var r,i,n;;){if(t.lookahead<z){if(j(t),t.lookahead<z&&e===l)return A;if(0===t.lookahead)break}if(r=0,t.lookahead>=x&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+x-1])&t.hash_mask,r=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),t.prev_length=t.match_length,t.prev_match=t.match_start,t.match_length=x-1,0!==r&&t.prev_length<t.max_lazy_match&&t.strstart-r<=t.w_size-z&&(t.match_length=L(t,r),t.match_length<=5&&(1===t.strategy||t.match_length===x&&4096<t.strstart-t.match_start)&&(t.match_length=x-1)),t.prev_length>=x&&t.match_length<=t.prev_length){for(n=t.strstart+t.lookahead-x,i=u._tr_tally(t,t.strstart-1-t.prev_match,t.prev_length-x),t.lookahead-=t.prev_length-1,t.prev_length-=2;++t.strstart<=n&&(t.ins_h=(t.ins_h<<t.hash_shift^t.window[t.strstart+x-1])&t.hash_mask,r=t.prev[t.strstart&t.w_mask]=t.head[t.ins_h],t.head[t.ins_h]=t.strstart),0!=--t.prev_length;);if(t.match_available=0,t.match_length=x-1,t.strstart++,i&&(N(t,!1),0===t.strm.avail_out))return A}else if(t.match_available){if((i=u._tr_tally(t,0,t.window[t.strstart-1]))&&N(t,!1),t.strstart++,t.lookahead--,0===t.strm.avail_out)return A}else t.match_available=1,t.strstart++,t.lookahead--}return t.match_available&&(i=u._tr_tally(t,0,t.window[t.strstart-1]),t.match_available=0),t.insert=t.strstart<x-1?t.strstart:x-1,e===f?(N(t,!0),0===t.strm.avail_out?O:B):t.last_lit&&(N(t,!1),0===t.strm.avail_out)?A:I}function M(t,e,r,i,n){this.good_length=t,this.max_lazy=e,this.nice_length=r,this.max_chain=i,this.func=n}function H(){this.strm=null,this.status=0,this.pending_buf=null,this.pending_buf_size=0,this.pending_out=0,this.pending=0,this.wrap=0,this.gzhead=null,this.gzindex=0,this.method=v,this.last_flush=-1,this.w_size=0,this.w_bits=0,this.w_mask=0,this.window=null,this.window_size=0,this.prev=null,this.head=null,this.ins_h=0,this.hash_size=0,this.hash_bits=0,this.hash_mask=0,this.hash_shift=0,this.block_start=0,this.match_length=0,this.prev_match=0,this.match_available=0,this.strstart=0,this.match_start=0,this.lookahead=0,this.prev_length=0,this.max_chain_length=0,this.max_lazy_match=0,this.level=0,this.strategy=0,this.good_match=0,this.nice_match=0,this.dyn_ltree=new d.Buf16(2*w),this.dyn_dtree=new d.Buf16(2*(2*a+1)),this.bl_tree=new d.Buf16(2*(2*o+1)),D(this.dyn_ltree),D(this.dyn_dtree),D(this.bl_tree),this.l_desc=null,this.d_desc=null,this.bl_desc=null,this.bl_count=new d.Buf16(k+1),this.heap=new d.Buf16(2*s+1),D(this.heap),this.heap_len=0,this.heap_max=0,this.depth=new d.Buf16(2*s+1),D(this.depth),this.l_buf=0,this.lit_bufsize=0,this.last_lit=0,this.d_buf=0,this.opt_len=0,this.static_len=0,this.matches=0,this.insert=0,this.bi_buf=0,this.bi_valid=0}function G(t){var e;return t&&t.state?(t.total_in=t.total_out=0,t.data_type=n,(e=t.state).pending=0,e.pending_out=0,e.wrap<0&&(e.wrap=-e.wrap),e.status=e.wrap?C:E,t.adler=2===e.wrap?0:1,e.last_flush=l,u._tr_init(e),m):R(t,_)}function K(t){var e=G(t);return e===m&&function(t){t.window_size=2*t.w_size,D(t.head),t.max_lazy_match=h[t.level].max_lazy,t.good_match=h[t.level].good_length,t.nice_match=h[t.level].nice_length,t.max_chain_length=h[t.level].max_chain,t.strstart=0,t.block_start=0,t.lookahead=0,t.insert=0,t.match_length=t.prev_length=x-1,t.match_available=0,t.ins_h=0}(t.state),e}function Y(t,e,r,i,n,s){if(!t)return _;var a=1;if(e===g&&(e=6),i<0?(a=0,i=-i):15<i&&(a=2,i-=16),n<1||y<n||r!==v||i<8||15<i||e<0||9<e||s<0||b<s)return R(t,_);8===i&&(i=9);var o=new H;return(t.state=o).strm=t,o.wrap=a,o.gzhead=null,o.w_bits=i,o.w_size=1<<o.w_bits,o.w_mask=o.w_size-1,o.hash_bits=n+7,o.hash_size=1<<o.hash_bits,o.hash_mask=o.hash_size-1,o.hash_shift=~~((o.hash_bits+x-1)/x),o.window=new d.Buf8(2*o.w_size),o.head=new d.Buf16(o.hash_size),o.prev=new d.Buf16(o.w_size),o.lit_bufsize=1<<n+6,o.pending_buf_size=4*o.lit_bufsize,o.pending_buf=new d.Buf8(o.pending_buf_size),o.d_buf=1*o.lit_bufsize,o.l_buf=3*o.lit_bufsize,o.level=e,o.strategy=s,o.method=r,K(t)}h=[new M(0,0,0,0,function(t,e){var r=65535;for(r>t.pending_buf_size-5&&(r=t.pending_buf_size-5);;){if(t.lookahead<=1){if(j(t),0===t.lookahead&&e===l)return A;if(0===t.lookahead)break}t.strstart+=t.lookahead,t.lookahead=0;var i=t.block_start+r;if((0===t.strstart||t.strstart>=i)&&(t.lookahead=t.strstart-i,t.strstart=i,N(t,!1),0===t.strm.avail_out))return A;if(t.strstart-t.block_start>=t.w_size-z&&(N(t,!1),0===t.strm.avail_out))return A}return t.insert=0,e===f?(N(t,!0),0===t.strm.avail_out?O:B):(t.strstart>t.block_start&&(N(t,!1),t.strm.avail_out),A)}),new M(4,4,8,4,Z),new M(4,5,16,8,Z),new M(4,6,32,32,Z),new M(4,4,16,16,W),new M(8,16,32,32,W),new M(8,16,128,128,W),new M(8,32,128,256,W),new M(32,128,258,1024,W),new M(32,258,258,4096,W)],r.deflateInit=function(t,e){return Y(t,e,v,15,8,0)},r.deflateInit2=Y,r.deflateReset=K,r.deflateResetKeep=G,r.deflateSetHeader=function(t,e){return t&&t.state?2!==t.state.wrap?_:(t.state.gzhead=e,m):_},r.deflate=function(t,e){var r,i,n,s;if(!t||!t.state||5<e||e<0)return t?R(t,_):_;if(i=t.state,!t.output||!t.input&&0!==t.avail_in||666===i.status&&e!==f)return R(t,0===t.avail_out?-5:_);if(i.strm=t,r=i.last_flush,i.last_flush=e,i.status===C)if(2===i.wrap)t.adler=0,U(i,31),U(i,139),U(i,8),i.gzhead?(U(i,(i.gzhead.text?1:0)+(i.gzhead.hcrc?2:0)+(i.gzhead.extra?4:0)+(i.gzhead.name?8:0)+(i.gzhead.comment?16:0)),U(i,255&i.gzhead.time),U(i,i.gzhead.time>>8&255),U(i,i.gzhead.time>>16&255),U(i,i.gzhead.time>>24&255),U(i,9===i.level?2:2<=i.strategy||i.level<2?4:0),U(i,255&i.gzhead.os),i.gzhead.extra&&i.gzhead.extra.length&&(U(i,255&i.gzhead.extra.length),U(i,i.gzhead.extra.length>>8&255)),i.gzhead.hcrc&&(t.adler=p(t.adler,i.pending_buf,i.pending,0)),i.gzindex=0,i.status=69):(U(i,0),U(i,0),U(i,0),U(i,0),U(i,0),U(i,9===i.level?2:2<=i.strategy||i.level<2?4:0),U(i,3),i.status=E);else{var a=v+(i.w_bits-8<<4)<<8;a|=(2<=i.strategy||i.level<2?0:i.level<6?1:6===i.level?2:3)<<6,0!==i.strstart&&(a|=32),a+=31-a%31,i.status=E,P(i,a),0!==i.strstart&&(P(i,t.adler>>>16),P(i,65535&t.adler)),t.adler=1}if(69===i.status)if(i.gzhead.extra){for(n=i.pending;i.gzindex<(65535&i.gzhead.extra.length)&&(i.pending!==i.pending_buf_size||(i.gzhead.hcrc&&i.pending>n&&(t.adler=p(t.adler,i.pending_buf,i.pending-n,n)),F(t),n=i.pending,i.pending!==i.pending_buf_size));)U(i,255&i.gzhead.extra[i.gzindex]),i.gzindex++;i.gzhead.hcrc&&i.pending>n&&(t.adler=p(t.adler,i.pending_buf,i.pending-n,n)),i.gzindex===i.gzhead.extra.length&&(i.gzindex=0,i.status=73)}else i.status=73;if(73===i.status)if(i.gzhead.name){n=i.pending;do{if(i.pending===i.pending_buf_size&&(i.gzhead.hcrc&&i.pending>n&&(t.adler=p(t.adler,i.pending_buf,i.pending-n,n)),F(t),n=i.pending,i.pending===i.pending_buf_size)){s=1;break}s=i.gzindex<i.gzhead.name.length?255&i.gzhead.name.charCodeAt(i.gzindex++):0,U(i,s)}while(0!==s);i.gzhead.hcrc&&i.pending>n&&(t.adler=p(t.adler,i.pending_buf,i.pending-n,n)),0===s&&(i.gzindex=0,i.status=91)}else i.status=91;if(91===i.status)if(i.gzhead.comment){n=i.pending;do{if(i.pending===i.pending_buf_size&&(i.gzhead.hcrc&&i.pending>n&&(t.adler=p(t.adler,i.pending_buf,i.pending-n,n)),F(t),n=i.pending,i.pending===i.pending_buf_size)){s=1;break}s=i.gzindex<i.gzhead.comment.length?255&i.gzhead.comment.charCodeAt(i.gzindex++):0,U(i,s)}while(0!==s);i.gzhead.hcrc&&i.pending>n&&(t.adler=p(t.adler,i.pending_buf,i.pending-n,n)),0===s&&(i.status=103)}else i.status=103;if(103===i.status&&(i.gzhead.hcrc?(i.pending+2>i.pending_buf_size&&F(t),i.pending+2<=i.pending_buf_size&&(U(i,255&t.adler),U(i,t.adler>>8&255),t.adler=0,i.status=E)):i.status=E),0!==i.pending){if(F(t),0===t.avail_out)return i.last_flush=-1,m}else if(0===t.avail_in&&T(e)<=T(r)&&e!==f)return R(t,-5);if(666===i.status&&0!==t.avail_in)return R(t,-5);if(0!==t.avail_in||0!==i.lookahead||e!==l&&666!==i.status){var o=2===i.strategy?function(t,e){for(var r;;){if(0===t.lookahead&&(j(t),0===t.lookahead)){if(e===l)return A;break}if(t.match_length=0,r=u._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++,r&&(N(t,!1),0===t.strm.avail_out))return A}return t.insert=0,e===f?(N(t,!0),0===t.strm.avail_out?O:B):t.last_lit&&(N(t,!1),0===t.strm.avail_out)?A:I}(i,e):3===i.strategy?function(t,e){for(var r,i,n,s,a=t.window;;){if(t.lookahead<=S){if(j(t),t.lookahead<=S&&e===l)return A;if(0===t.lookahead)break}if(t.match_length=0,t.lookahead>=x&&0<t.strstart&&(i=a[n=t.strstart-1])===a[++n]&&i===a[++n]&&i===a[++n]){s=t.strstart+S;do{}while(i===a[++n]&&i===a[++n]&&i===a[++n]&&i===a[++n]&&i===a[++n]&&i===a[++n]&&i===a[++n]&&i===a[++n]&&n<s);t.match_length=S-(s-n),t.match_length>t.lookahead&&(t.match_length=t.lookahead)}if(t.match_length>=x?(r=u._tr_tally(t,1,t.match_length-x),t.lookahead-=t.match_length,t.strstart+=t.match_length,t.match_length=0):(r=u._tr_tally(t,0,t.window[t.strstart]),t.lookahead--,t.strstart++),r&&(N(t,!1),0===t.strm.avail_out))return A}return t.insert=0,e===f?(N(t,!0),0===t.strm.avail_out?O:B):t.last_lit&&(N(t,!1),0===t.strm.avail_out)?A:I}(i,e):h[i.level].func(i,e);if(o!==O&&o!==B||(i.status=666),o===A||o===O)return 0===t.avail_out&&(i.last_flush=-1),m;if(o===I&&(1===e?u._tr_align(i):5!==e&&(u._tr_stored_block(i,0,0,!1),3===e&&(D(i.head),0===i.lookahead&&(i.strstart=0,i.block_start=0,i.insert=0))),F(t),0===t.avail_out))return i.last_flush=-1,m}return e!==f?m:i.wrap<=0?1:(2===i.wrap?(U(i,255&t.adler),U(i,t.adler>>8&255),U(i,t.adler>>16&255),U(i,t.adler>>24&255),U(i,255&t.total_in),U(i,t.total_in>>8&255),U(i,t.total_in>>16&255),U(i,t.total_in>>24&255)):(P(i,t.adler>>>16),P(i,65535&t.adler)),F(t),0<i.wrap&&(i.wrap=-i.wrap),0!==i.pending?m:1)},r.deflateEnd=function(t){var e;return t&&t.state?(e=t.state.status)!==C&&69!==e&&73!==e&&91!==e&&103!==e&&e!==E&&666!==e?R(t,_):(t.state=null,e===E?R(t,-3):m):_},r.deflateSetDictionary=function(t,e){var r,i,n,s,a,o,h,u,l=e.length;if(!t||!t.state)return _;if(2===(s=(r=t.state).wrap)||1===s&&r.status!==C||r.lookahead)return _;for(1===s&&(t.adler=c(t.adler,e,l,0)),r.wrap=0,l>=r.w_size&&(0===s&&(D(r.head),r.strstart=0,r.block_start=0,r.insert=0),u=new d.Buf8(r.w_size),d.arraySet(u,e,l-r.w_size,r.w_size,0),e=u,l=r.w_size),a=t.avail_in,o=t.next_in,h=t.input,t.avail_in=l,t.next_in=0,t.input=e,j(r);r.lookahead>=x;){for(i=r.strstart,n=r.lookahead-(x-1);r.ins_h=(r.ins_h<<r.hash_shift^r.window[i+x-1])&r.hash_mask,r.prev[i&r.w_mask]=r.head[r.ins_h],r.head[r.ins_h]=i,i++,--n;);r.strstart=i,r.lookahead=x-1,j(r)}return r.strstart+=r.lookahead,r.block_start=r.strstart,r.insert=r.lookahead,r.lookahead=0,r.match_length=r.prev_length=x-1,r.match_available=0,t.next_in=o,t.input=h,t.avail_in=a,r.wrap=s,m},r.deflateInfo="pako deflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./messages":51,"./trees":52}],47:[function(t,e,r){"use strict";e.exports=function(){this.text=0,this.time=0,this.xflags=0,this.os=0,this.extra=null,this.extra_len=0,this.name="",this.comment="",this.hcrc=0,this.done=!1}},{}],48:[function(t,e,r){"use strict";e.exports=function(t,e){var r,i,n,s,a,o,h,u,l,f,d,c,p,m,_,g,b,v,y,w,k,x,S,z,C;r=t.state,i=t.next_in,z=t.input,n=i+(t.avail_in-5),s=t.next_out,C=t.output,a=s-(e-t.avail_out),o=s+(t.avail_out-257),h=r.dmax,u=r.wsize,l=r.whave,f=r.wnext,d=r.window,c=r.hold,p=r.bits,m=r.lencode,_=r.distcode,g=(1<<r.lenbits)-1,b=(1<<r.distbits)-1;t:do{p<15&&(c+=z[i++]<<p,p+=8,c+=z[i++]<<p,p+=8),v=m[c&g];e:for(;;){if(c>>>=y=v>>>24,p-=y,0===(y=v>>>16&255))C[s++]=65535&v;else{if(!(16&y)){if(0==(64&y)){v=m[(65535&v)+(c&(1<<y)-1)];continue e}if(32&y){r.mode=12;break t}t.msg="invalid literal/length code",r.mode=30;break t}w=65535&v,(y&=15)&&(p<y&&(c+=z[i++]<<p,p+=8),w+=c&(1<<y)-1,c>>>=y,p-=y),p<15&&(c+=z[i++]<<p,p+=8,c+=z[i++]<<p,p+=8),v=_[c&b];r:for(;;){if(c>>>=y=v>>>24,p-=y,!(16&(y=v>>>16&255))){if(0==(64&y)){v=_[(65535&v)+(c&(1<<y)-1)];continue r}t.msg="invalid distance code",r.mode=30;break t}if(k=65535&v,p<(y&=15)&&(c+=z[i++]<<p,(p+=8)<y&&(c+=z[i++]<<p,p+=8)),h<(k+=c&(1<<y)-1)){t.msg="invalid distance too far back",r.mode=30;break t}if(c>>>=y,p-=y,(y=s-a)<k){if(l<(y=k-y)&&r.sane){t.msg="invalid distance too far back",r.mode=30;break t}if(S=d,(x=0)===f){if(x+=u-y,y<w){for(w-=y;C[s++]=d[x++],--y;);x=s-k,S=C}}else if(f<y){if(x+=u+f-y,(y-=f)<w){for(w-=y;C[s++]=d[x++],--y;);if(x=0,f<w){for(w-=y=f;C[s++]=d[x++],--y;);x=s-k,S=C}}}else if(x+=f-y,y<w){for(w-=y;C[s++]=d[x++],--y;);x=s-k,S=C}for(;2<w;)C[s++]=S[x++],C[s++]=S[x++],C[s++]=S[x++],w-=3;w&&(C[s++]=S[x++],1<w&&(C[s++]=S[x++]))}else{for(x=s-k;C[s++]=C[x++],C[s++]=C[x++],C[s++]=C[x++],2<(w-=3););w&&(C[s++]=C[x++],1<w&&(C[s++]=C[x++]))}break}}break}}while(i<n&&s<o);i-=w=p>>3,c&=(1<<(p-=w<<3))-1,t.next_in=i,t.next_out=s,t.avail_in=i<n?n-i+5:5-(i-n),t.avail_out=s<o?o-s+257:257-(s-o),r.hold=c,r.bits=p}},{}],49:[function(t,e,r){"use strict";var I=t("../utils/common"),O=t("./adler32"),B=t("./crc32"),R=t("./inffast"),T=t("./inftrees"),D=1,F=2,N=0,U=-2,P=1,i=852,n=592;function L(t){return(t>>>24&255)+(t>>>8&65280)+((65280&t)<<8)+((255&t)<<24)}function s(){this.mode=0,this.last=!1,this.wrap=0,this.havedict=!1,this.flags=0,this.dmax=0,this.check=0,this.total=0,this.head=null,this.wbits=0,this.wsize=0,this.whave=0,this.wnext=0,this.window=null,this.hold=0,this.bits=0,this.length=0,this.offset=0,this.extra=0,this.lencode=null,this.distcode=null,this.lenbits=0,this.distbits=0,this.ncode=0,this.nlen=0,this.ndist=0,this.have=0,this.next=null,this.lens=new I.Buf16(320),this.work=new I.Buf16(288),this.lendyn=null,this.distdyn=null,this.sane=0,this.back=0,this.was=0}function a(t){var e;return t&&t.state?(e=t.state,t.total_in=t.total_out=e.total=0,t.msg="",e.wrap&&(t.adler=1&e.wrap),e.mode=P,e.last=0,e.havedict=0,e.dmax=32768,e.head=null,e.hold=0,e.bits=0,e.lencode=e.lendyn=new I.Buf32(i),e.distcode=e.distdyn=new I.Buf32(n),e.sane=1,e.back=-1,N):U}function o(t){var e;return t&&t.state?((e=t.state).wsize=0,e.whave=0,e.wnext=0,a(t)):U}function h(t,e){var r,i;return t&&t.state?(i=t.state,e<0?(r=0,e=-e):(r=1+(e>>4),e<48&&(e&=15)),e&&(e<8||15<e)?U:(null!==i.window&&i.wbits!==e&&(i.window=null),i.wrap=r,i.wbits=e,o(t))):U}function u(t,e){var r,i;return t?(i=new s,(t.state=i).window=null,(r=h(t,e))!==N&&(t.state=null),r):U}var l,f,d=!0;function j(t){if(d){var e;for(l=new I.Buf32(512),f=new I.Buf32(32),e=0;e<144;)t.lens[e++]=8;for(;e<256;)t.lens[e++]=9;for(;e<280;)t.lens[e++]=7;for(;e<288;)t.lens[e++]=8;for(T(D,t.lens,0,288,l,0,t.work,{bits:9}),e=0;e<32;)t.lens[e++]=5;T(F,t.lens,0,32,f,0,t.work,{bits:5}),d=!1}t.lencode=l,t.lenbits=9,t.distcode=f,t.distbits=5}function Z(t,e,r,i){var n,s=t.state;return null===s.window&&(s.wsize=1<<s.wbits,s.wnext=0,s.whave=0,s.window=new I.Buf8(s.wsize)),i>=s.wsize?(I.arraySet(s.window,e,r-s.wsize,s.wsize,0),s.wnext=0,s.whave=s.wsize):(i<(n=s.wsize-s.wnext)&&(n=i),I.arraySet(s.window,e,r-i,n,s.wnext),(i-=n)?(I.arraySet(s.window,e,r-i,i,0),s.wnext=i,s.whave=s.wsize):(s.wnext+=n,s.wnext===s.wsize&&(s.wnext=0),s.whave<s.wsize&&(s.whave+=n))),0}r.inflateReset=o,r.inflateReset2=h,r.inflateResetKeep=a,r.inflateInit=function(t){return u(t,15)},r.inflateInit2=u,r.inflate=function(t,e){var r,i,n,s,a,o,h,u,l,f,d,c,p,m,_,g,b,v,y,w,k,x,S,z,C=0,E=new I.Buf8(4),A=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];if(!t||!t.state||!t.output||!t.input&&0!==t.avail_in)return U;12===(r=t.state).mode&&(r.mode=13),a=t.next_out,n=t.output,h=t.avail_out,s=t.next_in,i=t.input,o=t.avail_in,u=r.hold,l=r.bits,f=o,d=h,x=N;t:for(;;)switch(r.mode){case P:if(0===r.wrap){r.mode=13;break}for(;l<16;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(2&r.wrap&&35615===u){E[r.check=0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0),l=u=0,r.mode=2;break}if(r.flags=0,r.head&&(r.head.done=!1),!(1&r.wrap)||(((255&u)<<8)+(u>>8))%31){t.msg="incorrect header check",r.mode=30;break}if(8!=(15&u)){t.msg="unknown compression method",r.mode=30;break}if(l-=4,k=8+(15&(u>>>=4)),0===r.wbits)r.wbits=k;else if(k>r.wbits){t.msg="invalid window size",r.mode=30;break}r.dmax=1<<k,t.adler=r.check=1,r.mode=512&u?10:12,l=u=0;break;case 2:for(;l<16;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(r.flags=u,8!=(255&r.flags)){t.msg="unknown compression method",r.mode=30;break}if(57344&r.flags){t.msg="unknown header flags set",r.mode=30;break}r.head&&(r.head.text=u>>8&1),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=3;case 3:for(;l<32;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}r.head&&(r.head.time=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,E[2]=u>>>16&255,E[3]=u>>>24&255,r.check=B(r.check,E,4,0)),l=u=0,r.mode=4;case 4:for(;l<16;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}r.head&&(r.head.xflags=255&u,r.head.os=u>>8),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0,r.mode=5;case 5:if(1024&r.flags){for(;l<16;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}r.length=u,r.head&&(r.head.extra_len=u),512&r.flags&&(E[0]=255&u,E[1]=u>>>8&255,r.check=B(r.check,E,2,0)),l=u=0}else r.head&&(r.head.extra=null);r.mode=6;case 6:if(1024&r.flags&&(o<(c=r.length)&&(c=o),c&&(r.head&&(k=r.head.extra_len-r.length,r.head.extra||(r.head.extra=new Array(r.head.extra_len)),I.arraySet(r.head.extra,i,s,c,k)),512&r.flags&&(r.check=B(r.check,i,c,s)),o-=c,s+=c,r.length-=c),r.length))break t;r.length=0,r.mode=7;case 7:if(2048&r.flags){if(0===o)break t;for(c=0;k=i[s+c++],r.head&&k&&r.length<65536&&(r.head.name+=String.fromCharCode(k)),k&&c<o;);if(512&r.flags&&(r.check=B(r.check,i,c,s)),o-=c,s+=c,k)break t}else r.head&&(r.head.name=null);r.length=0,r.mode=8;case 8:if(4096&r.flags){if(0===o)break t;for(c=0;k=i[s+c++],r.head&&k&&r.length<65536&&(r.head.comment+=String.fromCharCode(k)),k&&c<o;);if(512&r.flags&&(r.check=B(r.check,i,c,s)),o-=c,s+=c,k)break t}else r.head&&(r.head.comment=null);r.mode=9;case 9:if(512&r.flags){for(;l<16;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(u!==(65535&r.check)){t.msg="header crc mismatch",r.mode=30;break}l=u=0}r.head&&(r.head.hcrc=r.flags>>9&1,r.head.done=!0),t.adler=r.check=0,r.mode=12;break;case 10:for(;l<32;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}t.adler=r.check=L(u),l=u=0,r.mode=11;case 11:if(0===r.havedict)return t.next_out=a,t.avail_out=h,t.next_in=s,t.avail_in=o,r.hold=u,r.bits=l,2;t.adler=r.check=1,r.mode=12;case 12:if(5===e||6===e)break t;case 13:if(r.last){u>>>=7&l,l-=7&l,r.mode=27;break}for(;l<3;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}switch(r.last=1&u,l-=1,3&(u>>>=1)){case 0:r.mode=14;break;case 1:if(j(r),r.mode=20,6!==e)break;u>>>=2,l-=2;break t;case 2:r.mode=17;break;case 3:t.msg="invalid block type",r.mode=30}u>>>=2,l-=2;break;case 14:for(u>>>=7&l,l-=7&l;l<32;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if((65535&u)!=(u>>>16^65535)){t.msg="invalid stored block lengths",r.mode=30;break}if(r.length=65535&u,l=u=0,r.mode=15,6===e)break t;case 15:r.mode=16;case 16:if(c=r.length){if(o<c&&(c=o),h<c&&(c=h),0===c)break t;I.arraySet(n,i,s,c,a),o-=c,s+=c,h-=c,a+=c,r.length-=c;break}r.mode=12;break;case 17:for(;l<14;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(r.nlen=257+(31&u),u>>>=5,l-=5,r.ndist=1+(31&u),u>>>=5,l-=5,r.ncode=4+(15&u),u>>>=4,l-=4,286<r.nlen||30<r.ndist){t.msg="too many length or distance symbols",r.mode=30;break}r.have=0,r.mode=18;case 18:for(;r.have<r.ncode;){for(;l<3;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}r.lens[A[r.have++]]=7&u,u>>>=3,l-=3}for(;r.have<19;)r.lens[A[r.have++]]=0;if(r.lencode=r.lendyn,r.lenbits=7,S={bits:r.lenbits},x=T(0,r.lens,0,19,r.lencode,0,r.work,S),r.lenbits=S.bits,x){t.msg="invalid code lengths set",r.mode=30;break}r.have=0,r.mode=19;case 19:for(;r.have<r.nlen+r.ndist;){for(;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(b<16)u>>>=_,l-=_,r.lens[r.have++]=b;else{if(16===b){for(z=_+2;l<z;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(u>>>=_,l-=_,0===r.have){t.msg="invalid bit length repeat",r.mode=30;break}k=r.lens[r.have-1],c=3+(3&u),u>>>=2,l-=2}else if(17===b){for(z=_+3;l<z;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}l-=_,k=0,c=3+(7&(u>>>=_)),u>>>=3,l-=3}else{for(z=_+7;l<z;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}l-=_,k=0,c=11+(127&(u>>>=_)),u>>>=7,l-=7}if(r.have+c>r.nlen+r.ndist){t.msg="invalid bit length repeat",r.mode=30;break}for(;c--;)r.lens[r.have++]=k}}if(30===r.mode)break;if(0===r.lens[256]){t.msg="invalid code -- missing end-of-block",r.mode=30;break}if(r.lenbits=9,S={bits:r.lenbits},x=T(D,r.lens,0,r.nlen,r.lencode,0,r.work,S),r.lenbits=S.bits,x){t.msg="invalid literal/lengths set",r.mode=30;break}if(r.distbits=6,r.distcode=r.distdyn,S={bits:r.distbits},x=T(F,r.lens,r.nlen,r.ndist,r.distcode,0,r.work,S),r.distbits=S.bits,x){t.msg="invalid distances set",r.mode=30;break}if(r.mode=20,6===e)break t;case 20:r.mode=21;case 21:if(6<=o&&258<=h){t.next_out=a,t.avail_out=h,t.next_in=s,t.avail_in=o,r.hold=u,r.bits=l,R(t,d),a=t.next_out,n=t.output,h=t.avail_out,s=t.next_in,i=t.input,o=t.avail_in,u=r.hold,l=r.bits,12===r.mode&&(r.back=-1);break}for(r.back=0;g=(C=r.lencode[u&(1<<r.lenbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(g&&0==(240&g)){for(v=_,y=g,w=b;g=(C=r.lencode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}u>>>=v,l-=v,r.back+=v}if(u>>>=_,l-=_,r.back+=_,r.length=b,0===g){r.mode=26;break}if(32&g){r.back=-1,r.mode=12;break}if(64&g){t.msg="invalid literal/length code",r.mode=30;break}r.extra=15&g,r.mode=22;case 22:if(r.extra){for(z=r.extra;l<z;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}r.length+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra}r.was=r.length,r.mode=23;case 23:for(;g=(C=r.distcode[u&(1<<r.distbits)-1])>>>16&255,b=65535&C,!((_=C>>>24)<=l);){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(0==(240&g)){for(v=_,y=g,w=b;g=(C=r.distcode[w+((u&(1<<v+y)-1)>>v)])>>>16&255,b=65535&C,!(v+(_=C>>>24)<=l);){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}u>>>=v,l-=v,r.back+=v}if(u>>>=_,l-=_,r.back+=_,64&g){t.msg="invalid distance code",r.mode=30;break}r.offset=b,r.extra=15&g,r.mode=24;case 24:if(r.extra){for(z=r.extra;l<z;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}r.offset+=u&(1<<r.extra)-1,u>>>=r.extra,l-=r.extra,r.back+=r.extra}if(r.offset>r.dmax){t.msg="invalid distance too far back",r.mode=30;break}r.mode=25;case 25:if(0===h)break t;if(c=d-h,r.offset>c){if((c=r.offset-c)>r.whave&&r.sane){t.msg="invalid distance too far back",r.mode=30;break}p=c>r.wnext?(c-=r.wnext,r.wsize-c):r.wnext-c,c>r.length&&(c=r.length),m=r.window}else m=n,p=a-r.offset,c=r.length;for(h<c&&(c=h),h-=c,r.length-=c;n[a++]=m[p++],--c;);0===r.length&&(r.mode=21);break;case 26:if(0===h)break t;n[a++]=r.length,h--,r.mode=21;break;case 27:if(r.wrap){for(;l<32;){if(0===o)break t;o--,u|=i[s++]<<l,l+=8}if(d-=h,t.total_out+=d,r.total+=d,d&&(t.adler=r.check=r.flags?B(r.check,n,d,a-d):O(r.check,n,d,a-d)),d=h,(r.flags?u:L(u))!==r.check){t.msg="incorrect data check",r.mode=30;break}l=u=0}r.mode=28;case 28:if(r.wrap&&r.flags){for(;l<32;){if(0===o)break t;o--,u+=i[s++]<<l,l+=8}if(u!==(4294967295&r.total)){t.msg="incorrect length check",r.mode=30;break}l=u=0}r.mode=29;case 29:x=1;break t;case 30:x=-3;break t;case 31:return-4;case 32:default:return U}return t.next_out=a,t.avail_out=h,t.next_in=s,t.avail_in=o,r.hold=u,r.bits=l,(r.wsize||d!==t.avail_out&&r.mode<30&&(r.mode<27||4!==e))&&Z(t,t.output,t.next_out,d-t.avail_out)?(r.mode=31,-4):(f-=t.avail_in,d-=t.avail_out,t.total_in+=f,t.total_out+=d,r.total+=d,r.wrap&&d&&(t.adler=r.check=r.flags?B(r.check,n,d,t.next_out-d):O(r.check,n,d,t.next_out-d)),t.data_type=r.bits+(r.last?64:0)+(12===r.mode?128:0)+(20===r.mode||15===r.mode?256:0),(0==f&&0===d||4===e)&&x===N&&(x=-5),x)},r.inflateEnd=function(t){if(!t||!t.state)return U;var e=t.state;return e.window&&(e.window=null),t.state=null,N},r.inflateGetHeader=function(t,e){var r;return t&&t.state?0==(2&(r=t.state).wrap)?U:((r.head=e).done=!1,N):U},r.inflateSetDictionary=function(t,e){var r,i=e.length;return t&&t.state?0!==(r=t.state).wrap&&11!==r.mode?U:11===r.mode&&O(1,e,i,0)!==r.check?-3:Z(t,e,i,i)?(r.mode=31,-4):(r.havedict=1,N):U},r.inflateInfo="pako inflate (from Nodeca project)"},{"../utils/common":41,"./adler32":43,"./crc32":45,"./inffast":48,"./inftrees":50}],50:[function(t,e,r){"use strict";var D=t("../utils/common"),F=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,0,0],N=[16,16,16,16,16,16,16,16,17,17,17,17,18,18,18,18,19,19,19,19,20,20,20,20,21,21,21,21,16,72,78],U=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577,0,0],P=[16,16,16,16,17,17,18,18,19,19,20,20,21,21,22,22,23,23,24,24,25,25,26,26,27,27,28,28,29,29,64,64];e.exports=function(t,e,r,i,n,s,a,o){var h,u,l,f,d,c,p,m,_,g=o.bits,b=0,v=0,y=0,w=0,k=0,x=0,S=0,z=0,C=0,E=0,A=null,I=0,O=new D.Buf16(16),B=new D.Buf16(16),R=null,T=0;for(b=0;b<=15;b++)O[b]=0;for(v=0;v<i;v++)O[e[r+v]]++;for(k=g,w=15;1<=w&&0===O[w];w--);if(w<k&&(k=w),0===w)return n[s++]=20971520,n[s++]=20971520,o.bits=1,0;for(y=1;y<w&&0===O[y];y++);for(k<y&&(k=y),b=z=1;b<=15;b++)if(z<<=1,(z-=O[b])<0)return-1;if(0<z&&(0===t||1!==w))return-1;for(B[1]=0,b=1;b<15;b++)B[b+1]=B[b]+O[b];for(v=0;v<i;v++)0!==e[r+v]&&(a[B[e[r+v]]++]=v);if(c=0===t?(A=R=a,19):1===t?(A=F,I-=257,R=N,T-=257,256):(A=U,R=P,-1),b=y,d=s,S=v=E=0,l=-1,f=(C=1<<(x=k))-1,1===t&&852<C||2===t&&592<C)return 1;for(;;){for(p=b-S,_=a[v]<c?(m=0,a[v]):a[v]>c?(m=R[T+a[v]],A[I+a[v]]):(m=96,0),h=1<<b-S,y=u=1<<x;n[d+(E>>S)+(u-=h)]=p<<24|m<<16|_|0,0!==u;);for(h=1<<b-1;E&h;)h>>=1;if(0!==h?(E&=h-1,E+=h):E=0,v++,0==--O[b]){if(b===w)break;b=e[r+a[v]]}if(k<b&&(E&f)!==l){for(0===S&&(S=k),d+=y,z=1<<(x=b-S);x+S<w&&!((z-=O[x+S])<=0);)x++,z<<=1;if(C+=1<<x,1===t&&852<C||2===t&&592<C)return 1;n[l=E&f]=k<<24|x<<16|d-s|0}}return 0!==E&&(n[d+E]=b-S<<24|64<<16|0),o.bits=k,0}},{"../utils/common":41}],51:[function(t,e,r){"use strict";e.exports={2:"need dictionary",1:"stream end",0:"","-1":"file error","-2":"stream error","-3":"data error","-4":"insufficient memory","-5":"buffer error","-6":"incompatible version"}},{}],52:[function(t,e,r){"use strict";var n=t("../utils/common"),o=0,h=1;function i(t){for(var e=t.length;0<=--e;)t[e]=0}var s=0,a=29,u=256,l=u+1+a,f=30,d=19,_=2*l+1,g=15,c=16,p=7,m=256,b=16,v=17,y=18,w=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],k=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],x=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],S=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],z=new Array(2*(l+2));i(z);var C=new Array(2*f);i(C);var E=new Array(512);i(E);var A=new Array(256);i(A);var I=new Array(a);i(I);var O,B,R,T=new Array(f);function D(t,e,r,i,n){this.static_tree=t,this.extra_bits=e,this.extra_base=r,this.elems=i,this.max_length=n,this.has_stree=t&&t.length}function F(t,e){this.dyn_tree=t,this.max_code=0,this.stat_desc=e}function N(t){return t<256?E[t]:E[256+(t>>>7)]}function U(t,e){t.pending_buf[t.pending++]=255&e,t.pending_buf[t.pending++]=e>>>8&255}function P(t,e,r){t.bi_valid>c-r?(t.bi_buf|=e<<t.bi_valid&65535,U(t,t.bi_buf),t.bi_buf=e>>c-t.bi_valid,t.bi_valid+=r-c):(t.bi_buf|=e<<t.bi_valid&65535,t.bi_valid+=r)}function L(t,e,r){P(t,r[2*e],r[2*e+1])}function j(t,e){for(var r=0;r|=1&t,t>>>=1,r<<=1,0<--e;);return r>>>1}function Z(t,e,r){var i,n,s=new Array(g+1),a=0;for(i=1;i<=g;i++)s[i]=a=a+r[i-1]<<1;for(n=0;n<=e;n++){var o=t[2*n+1];0!==o&&(t[2*n]=j(s[o]++,o))}}function W(t){var e;for(e=0;e<l;e++)t.dyn_ltree[2*e]=0;for(e=0;e<f;e++)t.dyn_dtree[2*e]=0;for(e=0;e<d;e++)t.bl_tree[2*e]=0;t.dyn_ltree[2*m]=1,t.opt_len=t.static_len=0,t.last_lit=t.matches=0}function M(t){8<t.bi_valid?U(t,t.bi_buf):0<t.bi_valid&&(t.pending_buf[t.pending++]=t.bi_buf),t.bi_buf=0,t.bi_valid=0}function H(t,e,r,i){var n=2*e,s=2*r;return t[n]<t[s]||t[n]===t[s]&&i[e]<=i[r]}function G(t,e,r){for(var i=t.heap[r],n=r<<1;n<=t.heap_len&&(n<t.heap_len&&H(e,t.heap[n+1],t.heap[n],t.depth)&&n++,!H(e,i,t.heap[n],t.depth));)t.heap[r]=t.heap[n],r=n,n<<=1;t.heap[r]=i}function K(t,e,r){var i,n,s,a,o=0;if(0!==t.last_lit)for(;i=t.pending_buf[t.d_buf+2*o]<<8|t.pending_buf[t.d_buf+2*o+1],n=t.pending_buf[t.l_buf+o],o++,0===i?L(t,n,e):(L(t,(s=A[n])+u+1,e),0!==(a=w[s])&&P(t,n-=I[s],a),L(t,s=N(--i),r),0!==(a=k[s])&&P(t,i-=T[s],a)),o<t.last_lit;);L(t,m,e)}function Y(t,e){var r,i,n,s=e.dyn_tree,a=e.stat_desc.static_tree,o=e.stat_desc.has_stree,h=e.stat_desc.elems,u=-1;for(t.heap_len=0,t.heap_max=_,r=0;r<h;r++)0!==s[2*r]?(t.heap[++t.heap_len]=u=r,t.depth[r]=0):s[2*r+1]=0;for(;t.heap_len<2;)s[2*(n=t.heap[++t.heap_len]=u<2?++u:0)]=1,t.depth[n]=0,t.opt_len--,o&&(t.static_len-=a[2*n+1]);for(e.max_code=u,r=t.heap_len>>1;1<=r;r--)G(t,s,r);for(n=h;r=t.heap[1],t.heap[1]=t.heap[t.heap_len--],G(t,s,1),i=t.heap[1],t.heap[--t.heap_max]=r,t.heap[--t.heap_max]=i,s[2*n]=s[2*r]+s[2*i],t.depth[n]=(t.depth[r]>=t.depth[i]?t.depth[r]:t.depth[i])+1,s[2*r+1]=s[2*i+1]=n,t.heap[1]=n++,G(t,s,1),2<=t.heap_len;);t.heap[--t.heap_max]=t.heap[1],function(t,e){var r,i,n,s,a,o,h=e.dyn_tree,u=e.max_code,l=e.stat_desc.static_tree,f=e.stat_desc.has_stree,d=e.stat_desc.extra_bits,c=e.stat_desc.extra_base,p=e.stat_desc.max_length,m=0;for(s=0;s<=g;s++)t.bl_count[s]=0;for(h[2*t.heap[t.heap_max]+1]=0,r=t.heap_max+1;r<_;r++)p<(s=h[2*h[2*(i=t.heap[r])+1]+1]+1)&&(s=p,m++),h[2*i+1]=s,u<i||(t.bl_count[s]++,a=0,c<=i&&(a=d[i-c]),o=h[2*i],t.opt_len+=o*(s+a),f&&(t.static_len+=o*(l[2*i+1]+a)));if(0!==m){do{for(s=p-1;0===t.bl_count[s];)s--;t.bl_count[s]--,t.bl_count[s+1]+=2,t.bl_count[p]--,m-=2}while(0<m);for(s=p;0!==s;s--)for(i=t.bl_count[s];0!==i;)u<(n=t.heap[--r])||(h[2*n+1]!==s&&(t.opt_len+=(s-h[2*n+1])*h[2*n],h[2*n+1]=s),i--)}}(t,e),Z(s,u,t.bl_count)}function X(t,e,r){var i,n,s=-1,a=e[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),e[2*(r+1)+1]=65535,i=0;i<=r;i++)n=a,a=e[2*(i+1)+1],++o<h&&n===a||(o<u?t.bl_tree[2*n]+=o:0!==n?(n!==s&&t.bl_tree[2*n]++,t.bl_tree[2*b]++):o<=10?t.bl_tree[2*v]++:t.bl_tree[2*y]++,s=n,u=(o=0)===a?(h=138,3):n===a?(h=6,3):(h=7,4))}function V(t,e,r){var i,n,s=-1,a=e[1],o=0,h=7,u=4;for(0===a&&(h=138,u=3),i=0;i<=r;i++)if(n=a,a=e[2*(i+1)+1],!(++o<h&&n===a)){if(o<u)for(;L(t,n,t.bl_tree),0!=--o;);else 0!==n?(n!==s&&(L(t,n,t.bl_tree),o--),L(t,b,t.bl_tree),P(t,o-3,2)):o<=10?(L(t,v,t.bl_tree),P(t,o-3,3)):(L(t,y,t.bl_tree),P(t,o-11,7));s=n,u=(o=0)===a?(h=138,3):n===a?(h=6,3):(h=7,4)}}i(T);var q=!1;function J(t,e,r,i){P(t,(s<<1)+(i?1:0),3),function(t,e,r,i){M(t),i&&(U(t,r),U(t,~r)),n.arraySet(t.pending_buf,t.window,e,r,t.pending),t.pending+=r}(t,e,r,!0)}r._tr_init=function(t){q||(function(){var t,e,r,i,n,s=new Array(g+1);for(i=r=0;i<a-1;i++)for(I[i]=r,t=0;t<1<<w[i];t++)A[r++]=i;for(A[r-1]=i,i=n=0;i<16;i++)for(T[i]=n,t=0;t<1<<k[i];t++)E[n++]=i;for(n>>=7;i<f;i++)for(T[i]=n<<7,t=0;t<1<<k[i]-7;t++)E[256+n++]=i;for(e=0;e<=g;e++)s[e]=0;for(t=0;t<=143;)z[2*t+1]=8,t++,s[8]++;for(;t<=255;)z[2*t+1]=9,t++,s[9]++;for(;t<=279;)z[2*t+1]=7,t++,s[7]++;for(;t<=287;)z[2*t+1]=8,t++,s[8]++;for(Z(z,l+1,s),t=0;t<f;t++)C[2*t+1]=5,C[2*t]=j(t,5);O=new D(z,w,u+1,l,g),B=new D(C,k,0,f,g),R=new D(new Array(0),x,0,d,p)}(),q=!0),t.l_desc=new F(t.dyn_ltree,O),t.d_desc=new F(t.dyn_dtree,B),t.bl_desc=new F(t.bl_tree,R),t.bi_buf=0,t.bi_valid=0,W(t)},r._tr_stored_block=J,r._tr_flush_block=function(t,e,r,i){var n,s,a=0;0<t.level?(2===t.strm.data_type&&(t.strm.data_type=function(t){var e,r=4093624447;for(e=0;e<=31;e++,r>>>=1)if(1&r&&0!==t.dyn_ltree[2*e])return o;if(0!==t.dyn_ltree[18]||0!==t.dyn_ltree[20]||0!==t.dyn_ltree[26])return h;for(e=32;e<u;e++)if(0!==t.dyn_ltree[2*e])return h;return o}(t)),Y(t,t.l_desc),Y(t,t.d_desc),a=function(t){var e;for(X(t,t.dyn_ltree,t.l_desc.max_code),X(t,t.dyn_dtree,t.d_desc.max_code),Y(t,t.bl_desc),e=d-1;3<=e&&0===t.bl_tree[2*S[e]+1];e--);return t.opt_len+=3*(e+1)+5+5+4,e}(t),n=t.opt_len+3+7>>>3,(s=t.static_len+3+7>>>3)<=n&&(n=s)):n=s=r+5,r+4<=n&&-1!==e?J(t,e,r,i):4===t.strategy||s===n?(P(t,2+(i?1:0),3),K(t,z,C)):(P(t,4+(i?1:0),3),function(t,e,r,i){var n;for(P(t,e-257,5),P(t,r-1,5),P(t,i-4,4),n=0;n<i;n++)P(t,t.bl_tree[2*S[n]+1],3);V(t,t.dyn_ltree,e-1),V(t,t.dyn_dtree,r-1)}(t,t.l_desc.max_code+1,t.d_desc.max_code+1,a+1),K(t,t.dyn_ltree,t.dyn_dtree)),W(t),i&&M(t)},r._tr_tally=function(t,e,r){return t.pending_buf[t.d_buf+2*t.last_lit]=e>>>8&255,t.pending_buf[t.d_buf+2*t.last_lit+1]=255&e,t.pending_buf[t.l_buf+t.last_lit]=255&r,t.last_lit++,0===e?t.dyn_ltree[2*r]++:(t.matches++,e--,t.dyn_ltree[2*(A[r]+u+1)]++,t.dyn_dtree[2*N(e)]++),t.last_lit===t.lit_bufsize-1},r._tr_align=function(t){P(t,2,3),L(t,m,z),function(t){16===t.bi_valid?(U(t,t.bi_buf),t.bi_buf=0,t.bi_valid=0):8<=t.bi_valid&&(t.pending_buf[t.pending++]=255&t.bi_buf,t.bi_buf>>=8,t.bi_valid-=8)}(t)}},{"../utils/common":41}],53:[function(t,e,r){"use strict";e.exports=function(){this.input=null,this.next_in=0,this.avail_in=0,this.total_in=0,this.output=null,this.next_out=0,this.avail_out=0,this.total_out=0,this.msg="",this.state=null,this.data_type=2,this.adler=0}},{}],54:[function(t,e,r){"use strict";e.exports="function"==typeof setImmediate?setImmediate:function(){var t=[].slice.apply(arguments);t.splice(1,0,0),setTimeout.apply(null,t)}},{}]},{},[10])(10)});
/*! pdfmake v0.1.66, @license MIT, @link http://pdfmake.org */
!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var n=e();for(var r in n)("object"==typeof exports?exports:t)[r]=n[r]}}("undefined"!=typeof self?self:this,function(){return r={},i.m=n=[function(t,e,n){"use strict";function o(t){return Array.isArray(t)}t.exports={isString:function(t){return"string"==typeof t||t instanceof String},isNumber:function(t){return"number"==typeof t||t instanceof Number},isBoolean:function(t){return"boolean"==typeof t},isArray:o,isFunction:function(t){return"function"==typeof t},isObject:function(t){return null!==t&&"object"==typeof t},isNull:function(t){return null===t},isUndefined:function(t){return void 0===t},pack:function(){for(var t={},e=0,n=arguments.length;e<n;e++){var r=arguments[e];if(r)for(var i in r)r.hasOwnProperty(i)&&(t[i]=r[i])}return t},fontStringify:function(t,e){return"font"===t?"font":e},offsetVector:function(t,e,n){switch(t.type){case"ellipse":case"rect":t.x+=e,t.y+=n;break;case"line":t.x1+=e,t.x2+=e,t.y1+=n,t.y2+=n;break;case"polyline":for(var r=0,i=t.points.length;r<i;r++)t.points[r].x+=e,t.points[r].y+=n}},getNodeId:function t(e){if(e.id)return e.id;if(o(e.text))for(var n=0,r=e.text.length;n<r;n++){var i=t(e.text[n]);if(i)return i}return null}}},function(t,e,n){var c=n(3),h=n(53).f,f=n(18),d=n(24),p=n(137),g=n(200),y=n(142);t.exports=function(t,e){var n,r,i,o,a=t.target,s=t.global,l=t.stat,u=s?c:l?c[a]||p(a,{}):(c[a]||{}).prototype;if(u)for(n in e){if(i=e[n],r=t.noTargetGet?(o=h(u,n))&&o.value:u[n],!y(s?n:a+(l?".":"#")+n,t.forced)&&void 0!==r){if(typeof i==typeof r)continue;g(i,r)}(t.sham||r&&r.sham)&&f(i,"sham",!0),d(u,n,i,t)}}},function(t,e,n){var r;t.exports=(r=function(c){var n=Object.create||function(t){var e;return r.prototype=t,e=new r,r.prototype=null,e};function r(){}var t={},e=t.lib={},i=e.Base={extend:function(t){var e=n(this);return t&&e.mixIn(t),e.hasOwnProperty("init")&&this.init!==e.init||(e.init=function(){e.$super.init.apply(this,arguments)}),(e.init.prototype=e).$super=this,e},create:function(){var t=this.extend();return t.init.apply(t,arguments),t},init:function(){},mixIn:function(t){for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e]);t.hasOwnProperty("toString")&&(this.toString=t.toString)},clone:function(){return this.init.prototype.extend(this)}},h=e.WordArray=i.extend({init:function(t,e){t=this.words=t||[],this.sigBytes=null!=e?e:4*t.length},toString:function(t){return(t||a).stringify(this)},concat:function(t){var e=this.words,n=t.words,r=this.sigBytes,i=t.sigBytes;if(this.clamp(),r%4)for(var o=0;o<i;o++){var a=n[o>>>2]>>>24-o%4*8&255;e[r+o>>>2]|=a<<24-(r+o)%4*8}else for(o=0;o<i;o+=4)e[r+o>>>2]=n[o>>>2];return this.sigBytes+=i,this},clamp:function(){var t=this.words,e=this.sigBytes;t[e>>>2]&=4294967295<<32-e%4*8,t.length=c.ceil(e/4)},clone:function(){var t=i.clone.call(this);return t.words=this.words.slice(0),t},random:function(t){for(var e=[],n=0;n<t;n+=4){var r=function(e){var e=e,n=987654321,r=4294967295;return function(){var t=((n=36969*(65535&n)+(n>>16)&r)<<16)+(e=18e3*(65535&e)+(e>>16)&r)&r;return t/=4294967296,(t+=.5)*(.5<c.random()?1:-1)}}(4294967296*(i||c.random())),i=987654071*r();e.push(4294967296*r()|0)}return new h.init(e,t)}}),o=t.enc={},a=o.Hex={stringify:function(t){for(var e=t.words,n=t.sigBytes,r=[],i=0;i<n;i++){var o=e[i>>>2]>>>24-i%4*8&255;r.push((o>>>4).toString(16)),r.push((15&o).toString(16))}return r.join("")},parse:function(t){for(var e=t.length,n=[],r=0;r<e;r+=2)n[r>>>3]|=parseInt(t.substr(r,2),16)<<24-r%8*4;return new h.init(n,e/2)}},s=o.Latin1={stringify:function(t){for(var e=t.words,n=t.sigBytes,r=[],i=0;i<n;i++){var o=e[i>>>2]>>>24-i%4*8&255;r.push(String.fromCharCode(o))}return r.join("")},parse:function(t){for(var e=t.length,n=[],r=0;r<e;r++)n[r>>>2]|=(255&t.charCodeAt(r))<<24-r%4*8;return new h.init(n,e)}},l=o.Utf8={stringify:function(t){try{return decodeURIComponent(escape(s.stringify(t)))}catch(t){throw new Error("Malformed UTF-8 data")}},parse:function(t){return s.parse(unescape(encodeURIComponent(t)))}},u=e.BufferedBlockAlgorithm=i.extend({reset:function(){this._data=new h.init,this._nDataBytes=0},_append:function(t){"string"==typeof t&&(t=l.parse(t)),this._data.concat(t),this._nDataBytes+=t.sigBytes},_process:function(t){var e=this._data,n=e.words,r=e.sigBytes,i=this.blockSize,o=r/(4*i),a=(o=t?c.ceil(o):c.max((0|o)-this._minBufferSize,0))*i,s=c.min(4*a,r);if(a){for(var l=0;l<a;l+=i)this._doProcessBlock(n,l);var u=n.splice(0,a);e.sigBytes-=s}return new h.init(u,s)},clone:function(){var t=i.clone.call(this);return t._data=this._data.clone(),t},_minBufferSize:0}),f=(e.Hasher=u.extend({cfg:i.extend(),init:function(t){this.cfg=this.cfg.extend(t),this.reset()},reset:function(){u.reset.call(this),this._doReset()},update:function(t){return this._append(t),this._process(),this},finalize:function(t){return t&&this._append(t),this._doFinalize()},blockSize:16,_createHelper:function(n){return function(t,e){return new n.init(e).finalize(t)}},_createHmacHelper:function(n){return function(t,e){return new f.HMAC.init(n,e).finalize(t)}}}),t.algo={});return t}(Math),r)},function(n,t,e){(function(t){function e(t){return t&&t.Math==Math&&t}n.exports=e("object"==typeof globalThis&&globalThis)||e("object"==typeof window&&window)||e("object"==typeof self&&self)||e("object"==typeof t&&t)||Function("return this")()}).call(this,e(26))},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){"use strict";function r(t){return l(t)&&u(T,c(t))}var i,o=n(220),a=n(11),s=n(3),l=n(13),u=n(14),c=n(117),h=n(18),f=n(24),d=n(15).f,p=n(59),g=n(45),y=n(6),v=n(112),m=s.Int8Array,b=m&&m.prototype,w=s.Uint8ClampedArray,x=w&&w.prototype,S=m&&p(m),_=b&&p(b),k=Object.prototype,A=k.isPrototypeOf,C=y("toStringTag"),P=v("TYPED_ARRAY_TAG"),E=o&&!!g&&"Opera"!==c(s.opera),O=!1,T={Int8Array:1,Uint8Array:1,Uint8ClampedArray:1,Int16Array:2,Uint16Array:2,Int32Array:4,Uint32Array:4,Float32Array:4,Float64Array:8};for(i in T)s[i]||(E=!1);if((!E||"function"!=typeof S||S===Function.prototype)&&(S=function(){throw TypeError("Incorrect invocation")},E))for(i in T)s[i]&&g(s[i],S);if((!E||!_||_===k)&&(_=S.prototype,E))for(i in T)s[i]&&g(s[i].prototype,_);if(E&&p(x)!==_&&g(x,_),a&&!u(_,C))for(i in O=!0,d(_,C,{get:function(){return l(this)?this[P]:void 0}}),T)s[i]&&h(s[i],P,i);t.exports={NATIVE_ARRAY_BUFFER_VIEWS:E,TYPED_ARRAY_TAG:O&&P,aTypedArray:function(t){if(r(t))return t;throw TypeError("Target is not a typed array")},aTypedArrayConstructor:function(t){if(g){if(A.call(S,t))return t}else for(var e in T)if(u(T,i)){var n=s[e];if(n&&(t===n||A.call(n,t)))return t}throw TypeError("Target is not a typed array constructor")},exportTypedArrayMethod:function(t,e,n){if(a){if(n)for(var r in T){var i=s[r];i&&u(i.prototype,t)&&delete i.prototype[t]}_[t]&&!n||f(_,t,!n&&E&&b[t]||e)}},exportTypedArrayStaticMethod:function(t,e,n){var r,i;if(a){if(g){if(n)for(r in T)(i=s[r])&&u(i,t)&&delete i[t];if(S[t]&&!n)return;try{return f(S,t,!n&&E&&m[t]||e)}catch(t){}}for(r in T)!(i=s[r])||i[t]&&!n||f(i,t,e)}},isView:function(t){var e=c(t);return"DataView"===e||u(T,e)},isTypedArray:r,TypedArray:S,TypedArrayPrototype:_}},function(t,e,n){var r=n(3),i=n(139),o=n(14),a=n(112),s=n(143),l=n(202),u=i("wks"),c=r.Symbol,h=l?c:c&&c.withoutSetter||a;t.exports=function(t){return o(u,t)||(s&&o(c,t)?u[t]=c[t]:u[t]=h("Symbol."+t)),u[t]}},function(t,e){var n=t.exports={version:"2.6.11"};"number"==typeof __e&&(__e=n)},function(t,e,n){var r=n(37),i=Math.min;t.exports=function(t){return 0<t?i(r(t),9007199254740991):0}},function(t,e,n){var g=n(17),y=n(7),v=n(33),m=n(41),b=n(51),w="prototype",x=function(t,e,n){var r,i,o,a=t&x.F,s=t&x.G,l=t&x.S,u=t&x.P,c=t&x.B,h=t&x.W,f=s?y:y[e]||(y[e]={}),d=f[w],p=s?g:l?g[e]:(g[e]||{})[w];for(r in s&&(n=e),n)(i=!a&&p&&void 0!==p[r])&&b(f,r)||(o=i?p[r]:n[r],f[r]=s&&"function"!=typeof p[r]?n[r]:c&&i?v(o,g):h&&p[r]==o?function(r){function t(t,e,n){if(this instanceof r){switch(arguments.length){case 0:return new r;case 1:return new r(t);case 2:return new r(t,e)}return new r(t,e,n)}return r.apply(this,arguments)}return t[w]=r[w],t}(o):u&&"function"==typeof o?v(Function.call,o):o,u&&((f.virtual||(f.virtual={}))[r]=o,t&x.R&&d&&!d[r]&&m(d,r,o)))};x.F=1,x.G=2,x.S=4,x.P=8,x.B=16,x.W=32,x.U=64,x.R=128,t.exports=x},function(t,L,M){"use strict";(function(t){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
var s=M(302),o=M(303),a=M(196);function n(){return h.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function l(t,e){if(n()<e)throw new RangeError("Invalid typed array length");return h.TYPED_ARRAY_SUPPORT?(t=new Uint8Array(e)).__proto__=h.prototype:(null===t&&(t=new h(e)),t.length=e),t}function h(t,e,n){if(!(h.TYPED_ARRAY_SUPPORT||this instanceof h))return new h(t,e,n);if("number"!=typeof t)return r(this,t,e,n);if("string"==typeof e)throw new Error("If encoding is specified then the first argument must be a string");return i(this,t)}function r(t,e,n,r){if("number"==typeof e)throw new TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&e instanceof ArrayBuffer?function(t,e,n,r){if(e.byteLength,n<0||e.byteLength<n)throw new RangeError("'offset' is out of bounds");if(e.byteLength<n+(r||0))throw new RangeError("'length' is out of bounds");e=void 0===n&&void 0===r?new Uint8Array(e):void 0===r?new Uint8Array(e,n):new Uint8Array(e,n,r);h.TYPED_ARRAY_SUPPORT?(t=e).__proto__=h.prototype:t=c(t,e);return t}(t,e,n,r):"string"==typeof e?function(t,e,n){"string"==typeof n&&""!==n||(n="utf8");if(!h.isEncoding(n))throw new TypeError('"encoding" must be a valid string encoding');var r=0|d(e,n),i=(t=l(t,r)).write(e,n);i!==r&&(t=t.slice(0,i));return t}(t,e,n):function(t,e){if(h.isBuffer(e)){var n=0|f(e.length);return 0===(t=l(t,n)).length?t:(e.copy(t,0,0,n),t)}if(e){if("undefined"!=typeof ArrayBuffer&&e.buffer instanceof ArrayBuffer||"length"in e)return"number"!=typeof e.length||function(t){return t!=t}(e.length)?l(t,0):c(t,e);if("Buffer"===e.type&&a(e.data))return c(t,e.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}(t,e)}function u(t){if("number"!=typeof t)throw new TypeError('"size" argument must be a number');if(t<0)throw new RangeError('"size" argument must not be negative')}function i(t,e){if(u(e),t=l(t,e<0?0:0|f(e)),!h.TYPED_ARRAY_SUPPORT)for(var n=0;n<e;++n)t[n]=0;return t}function c(t,e){var n=e.length<0?0:0|f(e.length);t=l(t,n);for(var r=0;r<n;r+=1)t[r]=255&e[r];return t}function f(t){if(t>=n())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+n().toString(16)+" bytes");return 0|t}function d(t,e){if(h.isBuffer(t))return t.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(t)||t instanceof ArrayBuffer))return t.byteLength;"string"!=typeof t&&(t=""+t);var n=t.length;if(0===n)return 0;for(var r=!1;;)switch(e){case"ascii":case"latin1":case"binary":return n;case"utf8":case"utf-8":case void 0:return O(t).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*n;case"hex":return n>>>1;case"base64":return T(t).length;default:if(r)return O(t).length;e=(""+e).toLowerCase(),r=!0}}function e(t,e,n){var r,i,o,a=!1;if((void 0===e||e<0)&&(e=0),e>this.length)return"";if((void 0===n||n>this.length)&&(n=this.length),n<=0)return"";if((n>>>=0)<=(e>>>=0))return"";for(t=t||"utf8";;)switch(t){case"hex":return function(t,e,n){var r=t.length;(!e||e<0)&&(e=0);(!n||n<0||r<n)&&(n=r);for(var i="",o=e;o<n;++o)i+=function(t){return t<16?"0"+t.toString(16):t.toString(16)}(t[o]);return i}(this,e,n);case"utf8":case"utf-8":return b(this,e,n);case"ascii":return function(t,e,n){var r="";n=Math.min(t.length,n);for(var i=e;i<n;++i)r+=String.fromCharCode(127&t[i]);return r}(this,e,n);case"latin1":case"binary":return function(t,e,n){var r="";n=Math.min(t.length,n);for(var i=e;i<n;++i)r+=String.fromCharCode(t[i]);return r}(this,e,n);case"base64":return r=this,o=n,0===(i=e)&&o===r.length?s.fromByteArray(r):s.fromByteArray(r.slice(i,o));case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return function(t,e,n){for(var r=t.slice(e,n),i="",o=0;o<r.length;o+=2)i+=String.fromCharCode(r[o]+256*r[o+1]);return i}(this,e,n);default:if(a)throw new TypeError("Unknown encoding: "+t);t=(t+"").toLowerCase(),a=!0}}function p(t,e,n){var r=t[e];t[e]=t[n],t[n]=r}function g(t,e,n,r,i){if(0===t.length)return-1;if("string"==typeof n?(r=n,n=0):2147483647<n?n=2147483647:n<-2147483648&&(n=-2147483648),n=+n,isNaN(n)&&(n=i?0:t.length-1),n<0&&(n=t.length+n),n>=t.length){if(i)return-1;n=t.length-1}else if(n<0){if(!i)return-1;n=0}if("string"==typeof e&&(e=h.from(e,r)),h.isBuffer(e))return 0===e.length?-1:y(t,e,n,r,i);if("number"==typeof e)return e&=255,h.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(t,e,n):Uint8Array.prototype.lastIndexOf.call(t,e,n):y(t,[e],n,r,i);throw new TypeError("val must be string, number or Buffer")}function y(t,e,n,r,i){var o=1,a=t.length,s=e.length;if(void 0!==r&&("ucs2"===(r=String(r).toLowerCase())||"ucs-2"===r||"utf16le"===r||"utf-16le"===r)){if(t.length<2||e.length<2)return-1;a/=o=2,s/=2,n/=2}function l(t,e){return 1===o?t[e]:t.readUInt16BE(e*o)}if(i)for(var u=-1,c=n;c<a;c++)if(l(t,c)===l(e,-1===u?0:c-u)){if(-1===u&&(u=c),c-u+1===s)return u*o}else-1!==u&&(c-=c-u),u=-1;else for(a<n+s&&(n=a-s),c=n;0<=c;c--){for(var h=!0,f=0;f<s;f++)if(l(t,c+f)!==l(e,f)){h=!1;break}if(h)return c}return-1}function v(t,e,n,r){return I(function(t){for(var e=[],n=0;n<t.length;++n)e.push(255&t.charCodeAt(n));return e}(e),t,n,r)}function m(t,e,n,r){return I(function(t,e){for(var n,r,i,o=[],a=0;a<t.length&&!((e-=2)<0);++a)n=t.charCodeAt(a),r=n>>8,i=n%256,o.push(i),o.push(r);return o}(e,t.length-n),t,n,r)}function b(t,e,n){n=Math.min(t.length,n);for(var r=[],i=e;i<n;){var o,a,s,l,u=t[i],c=null,h=239<u?4:223<u?3:191<u?2:1;if(i+h<=n)switch(h){case 1:u<128&&(c=u);break;case 2:128==(192&(o=t[i+1]))&&127<(l=(31&u)<<6|63&o)&&(c=l);break;case 3:o=t[i+1],a=t[i+2],128==(192&o)&&128==(192&a)&&2047<(l=(15&u)<<12|(63&o)<<6|63&a)&&(l<55296||57343<l)&&(c=l);break;case 4:o=t[i+1],a=t[i+2],s=t[i+3],128==(192&o)&&128==(192&a)&&128==(192&s)&&65535<(l=(15&u)<<18|(63&o)<<12|(63&a)<<6|63&s)&&l<1114112&&(c=l)}null===c?(c=65533,h=1):65535<c&&(c-=65536,r.push(c>>>10&1023|55296),c=56320|1023&c),r.push(c),i+=h}return function(t){var e=t.length;if(e<=w)return String.fromCharCode.apply(String,t);var n="",r=0;for(;r<e;)n+=String.fromCharCode.apply(String,t.slice(r,r+=w));return n}(r)}L.Buffer=h,L.SlowBuffer=function(t){+t!=t&&(t=0);return h.alloc(+t)},L.INSPECT_MAX_BYTES=50,h.TYPED_ARRAY_SUPPORT=void 0!==t.TYPED_ARRAY_SUPPORT?t.TYPED_ARRAY_SUPPORT:function(){try{var t=new Uint8Array(1);return t.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===t.foo()&&"function"==typeof t.subarray&&0===t.subarray(1,1).byteLength}catch(t){return!1}}(),L.kMaxLength=n(),h.poolSize=8192,h._augment=function(t){return t.__proto__=h.prototype,t},h.from=function(t,e,n){return r(null,t,e,n)},h.TYPED_ARRAY_SUPPORT&&(h.prototype.__proto__=Uint8Array.prototype,h.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&h[Symbol.species]===h&&Object.defineProperty(h,Symbol.species,{value:null,configurable:!0})),h.alloc=function(t,e,n){return r=null,o=e,a=n,u(i=t),i<=0||void 0===o?l(r,i):"string"==typeof a?l(r,i).fill(o,a):l(r,i).fill(o);var r,i,o,a},h.allocUnsafe=function(t){return i(null,t)},h.allocUnsafeSlow=function(t){return i(null,t)},h.isBuffer=function(t){return!(null==t||!t._isBuffer)},h.compare=function(t,e){if(!h.isBuffer(t)||!h.isBuffer(e))throw new TypeError("Arguments must be Buffers");if(t===e)return 0;for(var n=t.length,r=e.length,i=0,o=Math.min(n,r);i<o;++i)if(t[i]!==e[i]){n=t[i],r=e[i];break}return n<r?-1:r<n?1:0},h.isEncoding=function(t){switch(String(t).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},h.concat=function(t,e){if(!a(t))throw new TypeError('"list" argument must be an Array of Buffers');if(0===t.length)return h.alloc(0);if(void 0===e)for(i=e=0;i<t.length;++i)e+=t[i].length;for(var n=h.allocUnsafe(e),r=0,i=0;i<t.length;++i){var o=t[i];if(!h.isBuffer(o))throw new TypeError('"list" argument must be an Array of Buffers');o.copy(n,r),r+=o.length}return n},h.byteLength=d,h.prototype._isBuffer=!0,h.prototype.swap16=function(){var t=this.length;if(t%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var e=0;e<t;e+=2)p(this,e,e+1);return this},h.prototype.swap32=function(){var t=this.length;if(t%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var e=0;e<t;e+=4)p(this,e,e+3),p(this,e+1,e+2);return this},h.prototype.swap64=function(){var t=this.length;if(t%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var e=0;e<t;e+=8)p(this,e,e+7),p(this,e+1,e+6),p(this,e+2,e+5),p(this,e+3,e+4);return this},h.prototype.toString=function(){var t=0|this.length;return 0==t?"":0===arguments.length?b(this,0,t):e.apply(this,arguments)},h.prototype.equals=function(t){if(!h.isBuffer(t))throw new TypeError("Argument must be a Buffer");return this===t||0===h.compare(this,t)},h.prototype.inspect=function(){var t="",e=L.INSPECT_MAX_BYTES;return 0<this.length&&(t=this.toString("hex",0,e).match(/.{2}/g).join(" "),this.length>e&&(t+=" ... ")),"<Buffer "+t+">"},h.prototype.compare=function(t,e,n,r,i){if(!h.isBuffer(t))throw new TypeError("Argument must be a Buffer");if(void 0===e&&(e=0),void 0===n&&(n=t?t.length:0),void 0===r&&(r=0),void 0===i&&(i=this.length),e<0||n>t.length||r<0||i>this.length)throw new RangeError("out of range index");if(i<=r&&n<=e)return 0;if(i<=r)return-1;if(n<=e)return 1;if(this===t)return 0;for(var o=(i>>>=0)-(r>>>=0),a=(n>>>=0)-(e>>>=0),s=Math.min(o,a),l=this.slice(r,i),u=t.slice(e,n),c=0;c<s;++c)if(l[c]!==u[c]){o=l[c],a=u[c];break}return o<a?-1:a<o?1:0},h.prototype.includes=function(t,e,n){return-1!==this.indexOf(t,e,n)},h.prototype.indexOf=function(t,e,n){return g(this,t,e,n,!0)},h.prototype.lastIndexOf=function(t,e,n){return g(this,t,e,n,!1)},h.prototype.write=function(t,e,n,r){if(void 0===e)r="utf8",n=this.length,e=0;else if(void 0===n&&"string"==typeof e)r=e,n=this.length,e=0;else{if(!isFinite(e))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");e|=0,isFinite(n)?(n|=0,void 0===r&&(r="utf8")):(r=n,n=void 0)}var i=this.length-e;if((void 0===n||i<n)&&(n=i),0<t.length&&(n<0||e<0)||e>this.length)throw new RangeError("Attempt to write outside buffer bounds");r=r||"utf8";for(var o,a,s,l,u,c,h=!1;;)switch(r){case"hex":return function(t,e,n,r){n=Number(n)||0;var i=t.length-n;(!r||i<(r=Number(r)))&&(r=i);var o=e.length;if(o%2!=0)throw new TypeError("Invalid hex string");o/2<r&&(r=o/2);for(var a=0;a<r;++a){var s=parseInt(e.substr(2*a,2),16);if(isNaN(s))return a;t[n+a]=s}return a}(this,t,e,n);case"utf8":case"utf-8":return u=e,c=n,I(O(t,(l=this).length-u),l,u,c);case"ascii":return v(this,t,e,n);case"latin1":case"binary":return v(this,t,e,n);case"base64":return o=this,a=e,s=n,I(T(t),o,a,s);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return m(this,t,e,n);default:if(h)throw new TypeError("Unknown encoding: "+r);r=(""+r).toLowerCase(),h=!0}},h.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var w=4096;function x(t,e,n){if(t%1!=0||t<0)throw new RangeError("offset is not uint");if(n<t+e)throw new RangeError("Trying to access beyond buffer length")}function S(t,e,n,r,i,o){if(!h.isBuffer(t))throw new TypeError('"buffer" argument must be a Buffer instance');if(i<e||e<o)throw new RangeError('"value" argument is out of bounds');if(n+r>t.length)throw new RangeError("Index out of range")}function _(t,e,n,r){e<0&&(e=65535+e+1);for(var i=0,o=Math.min(t.length-n,2);i<o;++i)t[n+i]=(e&255<<8*(r?i:1-i))>>>8*(r?i:1-i)}function k(t,e,n,r){e<0&&(e=4294967295+e+1);for(var i=0,o=Math.min(t.length-n,4);i<o;++i)t[n+i]=e>>>8*(r?i:3-i)&255}function A(t,e,n,r){if(n+r>t.length)throw new RangeError("Index out of range");if(n<0)throw new RangeError("Index out of range")}function C(t,e,n,r,i){return i||A(t,0,n,4),o.write(t,e,n,r,23,4),n+4}function P(t,e,n,r,i){return i||A(t,0,n,8),o.write(t,e,n,r,52,8),n+8}h.prototype.slice=function(t,e){var n=this.length;if((t=~~t)<0?(t+=n)<0&&(t=0):n<t&&(t=n),(e=void 0===e?n:~~e)<0?(e+=n)<0&&(e=0):n<e&&(e=n),e<t&&(e=t),h.TYPED_ARRAY_SUPPORT)(i=this.subarray(t,e)).__proto__=h.prototype;else for(var r=e-t,i=new h(r,void 0),o=0;o<r;++o)i[o]=this[o+t];return i},h.prototype.readUIntLE=function(t,e,n){t|=0,e|=0,n||x(t,e,this.length);for(var r=this[t],i=1,o=0;++o<e&&(i*=256);)r+=this[t+o]*i;return r},h.prototype.readUIntBE=function(t,e,n){t|=0,e|=0,n||x(t,e,this.length);for(var r=this[t+--e],i=1;0<e&&(i*=256);)r+=this[t+--e]*i;return r},h.prototype.readUInt8=function(t,e){return e||x(t,1,this.length),this[t]},h.prototype.readUInt16LE=function(t,e){return e||x(t,2,this.length),this[t]|this[t+1]<<8},h.prototype.readUInt16BE=function(t,e){return e||x(t,2,this.length),this[t]<<8|this[t+1]},h.prototype.readUInt32LE=function(t,e){return e||x(t,4,this.length),(this[t]|this[t+1]<<8|this[t+2]<<16)+16777216*this[t+3]},h.prototype.readUInt32BE=function(t,e){return e||x(t,4,this.length),16777216*this[t]+(this[t+1]<<16|this[t+2]<<8|this[t+3])},h.prototype.readIntLE=function(t,e,n){t|=0,e|=0,n||x(t,e,this.length);for(var r=this[t],i=1,o=0;++o<e&&(i*=256);)r+=this[t+o]*i;return(i*=128)<=r&&(r-=Math.pow(2,8*e)),r},h.prototype.readIntBE=function(t,e,n){t|=0,e|=0,n||x(t,e,this.length);for(var r=e,i=1,o=this[t+--r];0<r&&(i*=256);)o+=this[t+--r]*i;return(i*=128)<=o&&(o-=Math.pow(2,8*e)),o},h.prototype.readInt8=function(t,e){return e||x(t,1,this.length),128&this[t]?-1*(255-this[t]+1):this[t]},h.prototype.readInt16LE=function(t,e){e||x(t,2,this.length);var n=this[t]|this[t+1]<<8;return 32768&n?4294901760|n:n},h.prototype.readInt16BE=function(t,e){e||x(t,2,this.length);var n=this[t+1]|this[t]<<8;return 32768&n?4294901760|n:n},h.prototype.readInt32LE=function(t,e){return e||x(t,4,this.length),this[t]|this[t+1]<<8|this[t+2]<<16|this[t+3]<<24},h.prototype.readInt32BE=function(t,e){return e||x(t,4,this.length),this[t]<<24|this[t+1]<<16|this[t+2]<<8|this[t+3]},h.prototype.readFloatLE=function(t,e){return e||x(t,4,this.length),o.read(this,t,!0,23,4)},h.prototype.readFloatBE=function(t,e){return e||x(t,4,this.length),o.read(this,t,!1,23,4)},h.prototype.readDoubleLE=function(t,e){return e||x(t,8,this.length),o.read(this,t,!0,52,8)},h.prototype.readDoubleBE=function(t,e){return e||x(t,8,this.length),o.read(this,t,!1,52,8)},h.prototype.writeUIntLE=function(t,e,n,r){t=+t,e|=0,n|=0,r||S(this,t,e,n,Math.pow(2,8*n)-1,0);var i=1,o=0;for(this[e]=255&t;++o<n&&(i*=256);)this[e+o]=t/i&255;return e+n},h.prototype.writeUIntBE=function(t,e,n,r){t=+t,e|=0,n|=0,r||S(this,t,e,n,Math.pow(2,8*n)-1,0);var i=n-1,o=1;for(this[e+i]=255&t;0<=--i&&(o*=256);)this[e+i]=t/o&255;return e+n},h.prototype.writeUInt8=function(t,e,n){return t=+t,e|=0,n||S(this,t,e,1,255,0),h.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),this[e]=255&t,e+1},h.prototype.writeUInt16LE=function(t,e,n){return t=+t,e|=0,n||S(this,t,e,2,65535,0),h.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8):_(this,t,e,!0),e+2},h.prototype.writeUInt16BE=function(t,e,n){return t=+t,e|=0,n||S(this,t,e,2,65535,0),h.TYPED_ARRAY_SUPPORT?(this[e]=t>>>8,this[e+1]=255&t):_(this,t,e,!1),e+2},h.prototype.writeUInt32LE=function(t,e,n){return t=+t,e|=0,n||S(this,t,e,4,4294967295,0),h.TYPED_ARRAY_SUPPORT?(this[e+3]=t>>>24,this[e+2]=t>>>16,this[e+1]=t>>>8,this[e]=255&t):k(this,t,e,!0),e+4},h.prototype.writeUInt32BE=function(t,e,n){return t=+t,e|=0,n||S(this,t,e,4,4294967295,0),h.TYPED_ARRAY_SUPPORT?(this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t):k(this,t,e,!1),e+4},h.prototype.writeIntLE=function(t,e,n,r){var i;t=+t,e|=0,r||S(this,t,e,n,(i=Math.pow(2,8*n-1))-1,-i);var o=0,a=1,s=0;for(this[e]=255&t;++o<n&&(a*=256);)t<0&&0===s&&0!==this[e+o-1]&&(s=1),this[e+o]=(t/a>>0)-s&255;return e+n},h.prototype.writeIntBE=function(t,e,n,r){var i;t=+t,e|=0,r||S(this,t,e,n,(i=Math.pow(2,8*n-1))-1,-i);var o=n-1,a=1,s=0;for(this[e+o]=255&t;0<=--o&&(a*=256);)t<0&&0===s&&0!==this[e+o+1]&&(s=1),this[e+o]=(t/a>>0)-s&255;return e+n},h.prototype.writeInt8=function(t,e,n){return t=+t,e|=0,n||S(this,t,e,1,127,-128),h.TYPED_ARRAY_SUPPORT||(t=Math.floor(t)),t<0&&(t=255+t+1),this[e]=255&t,e+1},h.prototype.writeInt16LE=function(t,e,n){return t=+t,e|=0,n||S(this,t,e,2,32767,-32768),h.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8):_(this,t,e,!0),e+2},h.prototype.writeInt16BE=function(t,e,n){return t=+t,e|=0,n||S(this,t,e,2,32767,-32768),h.TYPED_ARRAY_SUPPORT?(this[e]=t>>>8,this[e+1]=255&t):_(this,t,e,!1),e+2},h.prototype.writeInt32LE=function(t,e,n){return t=+t,e|=0,n||S(this,t,e,4,2147483647,-2147483648),h.TYPED_ARRAY_SUPPORT?(this[e]=255&t,this[e+1]=t>>>8,this[e+2]=t>>>16,this[e+3]=t>>>24):k(this,t,e,!0),e+4},h.prototype.writeInt32BE=function(t,e,n){return t=+t,e|=0,n||S(this,t,e,4,2147483647,-2147483648),t<0&&(t=4294967295+t+1),h.TYPED_ARRAY_SUPPORT?(this[e]=t>>>24,this[e+1]=t>>>16,this[e+2]=t>>>8,this[e+3]=255&t):k(this,t,e,!1),e+4},h.prototype.writeFloatLE=function(t,e,n){return C(this,t,e,!0,n)},h.prototype.writeFloatBE=function(t,e,n){return C(this,t,e,!1,n)},h.prototype.writeDoubleLE=function(t,e,n){return P(this,t,e,!0,n)},h.prototype.writeDoubleBE=function(t,e,n){return P(this,t,e,!1,n)},h.prototype.copy=function(t,e,n,r){if(n=n||0,r||0===r||(r=this.length),e>=t.length&&(e=t.length),e=e||0,0<r&&r<n&&(r=n),r===n)return 0;if(0===t.length||0===this.length)return 0;if(e<0)throw new RangeError("targetStart out of bounds");if(n<0||n>=this.length)throw new RangeError("sourceStart out of bounds");if(r<0)throw new RangeError("sourceEnd out of bounds");r>this.length&&(r=this.length),t.length-e<r-n&&(r=t.length-e+n);var i,o=r-n;if(this===t&&n<e&&e<r)for(i=o-1;0<=i;--i)t[i+e]=this[i+n];else if(o<1e3||!h.TYPED_ARRAY_SUPPORT)for(i=0;i<o;++i)t[i+e]=this[i+n];else Uint8Array.prototype.set.call(t,this.subarray(n,n+o),e);return o},h.prototype.fill=function(t,e,n,r){if("string"==typeof t){var i;if("string"==typeof e?(r=e,e=0,n=this.length):"string"==typeof n&&(r=n,n=this.length),1!==t.length||(i=t.charCodeAt(0))<256&&(t=i),void 0!==r&&"string"!=typeof r)throw new TypeError("encoding must be a string");if("string"==typeof r&&!h.isEncoding(r))throw new TypeError("Unknown encoding: "+r)}else"number"==typeof t&&(t&=255);if(e<0||this.length<e||this.length<n)throw new RangeError("Out of range index");if(n<=e)return this;if(e>>>=0,n=void 0===n?this.length:n>>>0,"number"==typeof(t=t||0))for(s=e;s<n;++s)this[s]=t;else for(var o=h.isBuffer(t)?t:O(new h(t,r).toString()),a=o.length,s=0;s<n-e;++s)this[s+e]=o[s%a];return this};var E=/[^+\/0-9A-Za-z-_]/g;function O(t,e){var n;e=e||1/0;for(var r=t.length,i=null,o=[],a=0;a<r;++a){if(55295<(n=t.charCodeAt(a))&&n<57344){if(!i){if(56319<n){-1<(e-=3)&&o.push(239,191,189);continue}if(a+1===r){-1<(e-=3)&&o.push(239,191,189);continue}i=n;continue}if(n<56320){-1<(e-=3)&&o.push(239,191,189),i=n;continue}n=65536+(i-55296<<10|n-56320)}else i&&-1<(e-=3)&&o.push(239,191,189);if(i=null,n<128){if(--e<0)break;o.push(n)}else if(n<2048){if((e-=2)<0)break;o.push(n>>6|192,63&n|128)}else if(n<65536){if((e-=3)<0)break;o.push(n>>12|224,n>>6&63|128,63&n|128)}else{if(!(n<1114112))throw new Error("Invalid code point");if((e-=4)<0)break;o.push(n>>18|240,n>>12&63|128,n>>6&63|128,63&n|128)}}return o}function T(t){return s.toByteArray(function(t){var e;if((t=((e=t).trim?e.trim():e.replace(/^\s+|\s+$/g,"")).replace(E,"")).length<2)return"";for(;t.length%4!=0;)t+="=";return t}(t))}function I(t,e,n,r){for(var i=0;i<r&&!(i+n>=e.length||i>=t.length);++i)e[i+n]=t[i];return i}}).call(this,M(26))},function(t,e,n){var r=n(4);t.exports=!r(function(){return 7!=Object.defineProperty({},1,{get:function(){return 7}})[1]})},function(t,e,n){var x;t.exports=(x=n(2),n(49),void(x.lib.Cipher||function(){var t=x,e=t.lib,n=e.Base,l=e.WordArray,r=e.BufferedBlockAlgorithm,i=t.enc,o=(i.Utf8,i.Base64),a=t.algo.EvpKDF,s=e.Cipher=r.extend({cfg:n.extend(),createEncryptor:function(t,e){return this.create(this._ENC_XFORM_MODE,t,e)},createDecryptor:function(t,e){return this.create(this._DEC_XFORM_MODE,t,e)},init:function(t,e,n){this.cfg=this.cfg.extend(n),this._xformMode=t,this._key=e,this.reset()},reset:function(){r.reset.call(this),this._doReset()},process:function(t){return this._append(t),this._process()},finalize:function(t){return t&&this._append(t),this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(r){return{encrypt:function(t,e,n){return u(e).encrypt(r,t,e,n)},decrypt:function(t,e,n){return u(e).decrypt(r,t,e,n)}}}});function u(t){return"string"==typeof t?w:m}e.StreamCipher=s.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var c,h=t.mode={},f=e.BlockCipherMode=n.extend({createEncryptor:function(t,e){return this.Encryptor.create(t,e)},createDecryptor:function(t,e){return this.Decryptor.create(t,e)},init:function(t,e){this._cipher=t,this._iv=e}}),d=h.CBC=((c=f.extend()).Encryptor=c.extend({processBlock:function(t,e){var n=this._cipher,r=n.blockSize;p.call(this,t,e,r),n.encryptBlock(t,e),this._prevBlock=t.slice(e,e+r)}}),c.Decryptor=c.extend({processBlock:function(t,e){var n=this._cipher,r=n.blockSize,i=t.slice(e,e+r);n.decryptBlock(t,e),p.call(this,t,e,r),this._prevBlock=i}}),c);function p(t,e,n){var r,i=this._iv;i?(r=i,this._iv=void 0):r=this._prevBlock;for(var o=0;o<n;o++)t[e+o]^=r[o]}var g=(t.pad={}).Pkcs7={pad:function(t,e){for(var n=4*e,r=n-t.sigBytes%n,i=r<<24|r<<16|r<<8|r,o=[],a=0;a<r;a+=4)o.push(i);var s=l.create(o,r);t.concat(s)},unpad:function(t){var e=255&t.words[t.sigBytes-1>>>2];t.sigBytes-=e}},y=(e.BlockCipher=s.extend({cfg:s.cfg.extend({mode:d,padding:g}),reset:function(){s.reset.call(this);var t,e=this.cfg,n=e.iv,r=e.mode;this._xformMode==this._ENC_XFORM_MODE?t=r.createEncryptor:(t=r.createDecryptor,this._minBufferSize=1),this._mode&&this._mode.__creator==t?this._mode.init(this,n&&n.words):(this._mode=t.call(r,this,n&&n.words),this._mode.__creator=t)},_doProcessBlock:function(t,e){this._mode.processBlock(t,e)},_doFinalize:function(){var t,e=this.cfg.padding;return this._xformMode==this._ENC_XFORM_MODE?(e.pad(this._data,this.blockSize),t=this._process(!0)):(t=this._process(!0),e.unpad(t)),t},blockSize:4}),e.CipherParams=n.extend({init:function(t){this.mixIn(t)},toString:function(t){return(t||this.formatter).stringify(this)}})),v=(t.format={}).OpenSSL={stringify:function(t){var e=t.ciphertext,n=t.salt;return(n?l.create([1398893684,1701076831]).concat(n).concat(e):e).toString(o)},parse:function(t){var e,n=o.parse(t),r=n.words;return 1398893684==r[0]&&1701076831==r[1]&&(e=l.create(r.slice(2,4)),r.splice(0,4),n.sigBytes-=16),y.create({ciphertext:n,salt:e})}},m=e.SerializableCipher=n.extend({cfg:n.extend({format:v}),encrypt:function(t,e,n,r){r=this.cfg.extend(r);var i=t.createEncryptor(n,r),o=i.finalize(e),a=i.cfg;return y.create({ciphertext:o,key:n,iv:a.iv,algorithm:t,mode:a.mode,padding:a.padding,blockSize:t.blockSize,formatter:r.format})},decrypt:function(t,e,n,r){return r=this.cfg.extend(r),e=this._parse(e,r.format),t.createDecryptor(n,r).finalize(e.ciphertext)},_parse:function(t,e){return"string"==typeof t?e.parse(t,this):t}}),b=(t.kdf={}).OpenSSL={execute:function(t,e,n,r){r=r||l.random(8);var i=a.create({keySize:e+n}).compute(t,r),o=l.create(i.words.slice(e),4*n);return i.sigBytes=4*e,y.create({key:i,iv:o,salt:r})}},w=e.PasswordBasedCipher=m.extend({cfg:m.cfg.extend({kdf:b}),encrypt:function(t,e,n,r){var i=(r=this.cfg.extend(r)).kdf.execute(n,t.keySize,t.ivSize);r.iv=i.iv;var o=m.encrypt.call(this,t,e,i.key,r);return o.mixIn(i),o},decrypt:function(t,e,n,r){r=this.cfg.extend(r),e=this._parse(e,r.format);var i=r.kdf.execute(n,t.keySize,t.ivSize,e.salt);return r.iv=i.iv,m.decrypt.call(this,t,e,i.key,r)}})}()))},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var r=n(11),i=n(198),o=n(16),a=n(54),s=Object.defineProperty;e.f=r?s:function(t,e,n){if(o(t),e=a(e,!0),o(n),i)try{return s(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){var r=n(13);t.exports=function(t){if(!r(t))throw TypeError(String(t)+" is not an object");return t}},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e,n){var r=n(11),i=n(15),o=n(42);t.exports=r?function(t,e,n){return i.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(34);t.exports=function(t){return Object(r(t))}},function(t,e,n){function r(d){var p=1==d,g=2==d,y=3==d,v=4==d,m=6==d,b=5==d||m;return function(t,e,n,r){for(var i,o,a=S(t),s=x(a),l=w(e,n,3),u=_(s.length),c=0,h=r||k,f=p?h(t,u):g?h(t,0):void 0;c<u;c++)if((b||c in s)&&(o=l(i=s[c],c,a),d))if(p)f[c]=o;else if(o)switch(d){case 3:return!0;case 5:return i;case 6:return c;case 2:A.call(f,i)}else if(v)return!1;return m?-1:y||v?v:f}}var w=n(96),x=n(92),S=n(19),_=n(8),k=n(206),A=[].push;t.exports={forEach:r(0),map:r(1),filter:r(2),some:r(3),every:r(4),find:r(5),findIndex:r(6)}},function(t,e,n){var r=n(181)("wks"),i=n(129),o=n(17).Symbol,a="function"==typeof o;(t.exports=function(t){return r[t]||(r[t]=a&&o[t]||(a?o:i)("Symbol."+t))}).store=r},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){t.exports=!n(52)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e,n){var s=n(3),l=n(18),u=n(14),c=n(137),r=n(138),i=n(35),o=i.get,h=i.enforce,f=String(String).split("String");(t.exports=function(t,e,n,r){var i=!!r&&!!r.unsafe,o=!!r&&!!r.enumerable,a=!!r&&!!r.noTargetGet;"function"==typeof n&&("string"!=typeof e||u(n,"name")||l(n,"name",e),h(n).source=f.join("string"==typeof e?e:"")),t!==s?(i?!a&&t[e]&&(o=!0):delete t[e],o?t[e]=n:l(t,e,n)):o?t[e]=n:c(e,n)})(Function.prototype,"toString",function(){return"function"==typeof this&&o(this).source||r(this)})},function(t,e,n){var r=n(29),i=n(254),o=n(175),a=Object.defineProperty;e.f=n(23)?Object.defineProperty:function(t,e,n){if(r(t),e=o(e,!0),r(n),i)try{return a(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e){var n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){var r=n(92),i=n(34);t.exports=function(t){return r(i(t))}},function(t,e,n){"use strict";var r=n(27),i=n(147),o=n(97),a=n(35),s=n(216),l="Array Iterator",u=a.set,c=a.getterFor(l);t.exports=s(Array,"Array",function(t,e){u(this,{type:l,target:r(t),index:0,kind:e})},function(){var t=c(this),e=t.target,n=t.kind,r=t.index++;return!e||r>=e.length?{value:t.target=void 0,done:!0}:"keys"==n?{value:r,done:!1}:"values"==n?{value:e[r],done:!1}:{value:[r,e[r]],done:!1}},"values"),o.Arguments=o.Array,i("keys"),i("values"),i("entries")},function(t,e,n){var r=n(22);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){function a(t){throw t}var s=n(11),l=n(4),u=n(14),c=Object.defineProperty,h={};t.exports=function(t,e){if(u(h,t))return h[t];var n=[][t],r=!!u(e=e||{},"ACCESSORS")&&e.ACCESSORS,i=u(e,0)?e[0]:a,o=u(e,1)?e[1]:void 0;return h[t]=!!n&&!l(function(){if(r&&!s)return!0;var t={length:-1};r?c(t,1,{enumerable:!0,get:a}):t[1]=1,n.call(t,i,o)})}},function(t,e,n){var r=n(150),i=n(24),o=n(328);r||i(Object.prototype,"toString",o,{unsafe:!0})},function(t,e,n){var o=n(101);t.exports=function(r,i,t){if(o(r),void 0===i)return r;switch(t){case 1:return function(t){return r.call(i,t)};case 2:return function(t,e){return r.call(i,t,e)};case 3:return function(t,e,n){return r.call(i,t,e,n)}}return function(){return r.apply(i,arguments)}}},function(t,e){t.exports=function(t){if(null==t)throw TypeError("Can't call method on "+t);return t}},function(t,e,n){var r,i,o,a,s,l,u,c,h=n(308),f=n(3),d=n(13),p=n(18),g=n(14),y=n(111),v=n(113),m=f.WeakMap;u=h?(r=new m,i=r.get,o=r.has,a=r.set,s=function(t,e){return a.call(r,t,e),e},l=function(t){return i.call(r,t)||{}},function(t){return o.call(r,t)}):(v[c=y("state")]=!0,s=function(t,e){return p(t,c,e),e},l=function(t){return g(t,c)?t[c]:{}},function(t){return g(t,c)}),t.exports={set:s,get:l,has:u,enforce:function(t){return u(t)?l(t):s(t,{})},getterFor:function(n){return function(t){var e;if(!d(t)||(e=l(t)).type!==n)throw TypeError("Incompatible receiver, "+n+" required");return e}}}},function(t,e,n){function r(t){return"function"==typeof t?t:void 0}var i=n(114),o=n(3);t.exports=function(t,e){return arguments.length<2?r(i[t])||r(o[t]):i[t]&&i[t][e]||o[t]&&o[t][e]}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(0<t?r:n)(t)}},function(t,e,n){var i=n(16),o=n(44),a=n(6)("species");t.exports=function(t,e){var n,r=i(t).constructor;return void 0===r||null==(n=i(r)[a])?e:o(n)}},function(a,t,s){"use strict";(function(t){var e,n=s(10),i=n.Buffer,r={};for(e in n)n.hasOwnProperty(e)&&"SlowBuffer"!==e&&"Buffer"!==e&&(r[e]=n[e]);var o=r.Buffer={};for(e in i)i.hasOwnProperty(e)&&"allocUnsafe"!==e&&"allocUnsafeSlow"!==e&&(o[e]=i[e]);if(r.Buffer.prototype=i.prototype,o.from&&o.from!==Uint8Array.from||(o.from=function(t,e,n){if("number"==typeof t)throw new TypeError('The "value" argument must not be of type number. Received type '+typeof t);if(t&&void 0===t.length)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof t);return i(t,e,n)}),o.alloc||(o.alloc=function(t,e,n){if("number"!=typeof t)throw new TypeError('The "size" argument must be of type number. Received type '+typeof t);if(t<0||2*(1<<30)<=t)throw new RangeError('The value "'+t+'" is invalid for option "size"');var r=i(t);return e&&0!==e.length?"string"==typeof n?r.fill(e,n):r.fill(e):r.fill(0),r}),!r.kStringMaxLength)try{r.kStringMaxLength=t.binding("buffer").kStringMaxLength}catch(t){}r.constants||(r.constants={MAX_LENGTH:r.kMaxLength},r.kStringMaxLength&&(r.constants.MAX_STRING_LENGTH=r.kStringMaxLength)),a.exports=r}).call(this,s(47))},function(t,e,n){(function(){var t,i=n(88).Number;e.resolveLength=function(t,e,n){var r;if("number"==typeof t?r=t:"function"==typeof t?r=t.call(n,n):n&&"string"==typeof t?r=n[t]:e&&t instanceof i&&(r=t.decode(e)),isNaN(r))throw new Error("Not a fixed size");return r},t=function(t){var e,n;for(e in null==t&&(t={}),this.enumerable=!0,this.configurable=!0,t)n=t[e],this[e]=n},e.PropertyDescriptor=t}).call(this)},function(t,e,n){var r=n(25),i=n(100);t.exports=n(23)?function(t,e,n){return r.f(t,e,i(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e,n){var r=n(37),i=Math.max,o=Math.min;t.exports=function(t,e){var n=r(t);return n<0?i(n+e,0):o(n,e)}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(String(t)+" is not a function");return t}},function(t,e,n){var i=n(16),o=n(317);t.exports=Object.setPrototypeOf||("__proto__"in{}?function(){var n,r=!1,t={};try{(n=Object.getOwnPropertyDescriptor(Object.prototype,"__proto__").set).call(t,[]),r=t instanceof Array}catch(t){}return function(t,e){return i(t),o(e),r?n.call(t,e):t.__proto__=e,t}}():void 0)},function(t,e,n){"use strict";var r=n(1),u=n(13),c=n(115),h=n(43),f=n(8),d=n(27),p=n(144),i=n(6),o=n(116),a=n(31),s=o("slice"),l=a("slice",{ACCESSORS:!0,0:0,1:2}),g=i("species"),y=[].slice,v=Math.max;r({target:"Array",proto:!0,forced:!s||!l},{slice:function(t,e){var n,r,i,o=d(this),a=f(o.length),s=h(t,a),l=h(void 0===e?a:e,a);if(c(o)&&(("function"==typeof(n=o.constructor)&&(n===Array||c(n.prototype))||u(n)&&null===(n=n[g]))&&(n=void 0),n===Array||void 0===n))return y.call(o,s,l);for(r=new(void 0===n?Array:n)(v(l-s,0)),i=0;s<l;s++,i++)s in o&&p(r,i,o[s]);return r.length=i,r}})},function(t,e){var n,r,i=t.exports={};function o(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function s(e){if(n===setTimeout)return setTimeout(e,0);if((n===o||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:o}catch(t){n=o}try{r="function"==typeof clearTimeout?clearTimeout:a}catch(t){r=a}}();var l,u=[],c=!1,h=-1;function f(){c&&l&&(c=!1,l.length?u=l.concat(u):h=-1,u.length&&d())}function d(){if(!c){var t=s(f);c=!0;for(var e=u.length;e;){for(l=u,u=[];++h<e;)l&&l[h].run();h=-1,e=u.length}l=null,c=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===a||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(t)}}function p(t,e){this.fun=t,this.array=e}function g(){}i.nextTick=function(t){var e=new Array(arguments.length-1);if(1<arguments.length)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];u.push(new p(t,e)),1!==u.length||c||s(d)},p.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=g,i.addListener=g,i.once=g,i.off=g,i.removeListener=g,i.removeAllListeners=g,i.emit=g,i.prependListener=g,i.prependOnceListener=g,i.listeners=function(t){return[]},i.binding=function(t){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(t){throw new Error("process.chdir is not supported")},i.umask=function(){return 0}},function(t,e,n){"use strict";var r=n(122),i=Object.keys||function(t){var e=[];for(var n in t)e.push(n);return e};t.exports=h;var o=Object.create(n(98));o.inherits=n(85);var a=n(240),s=n(164);o.inherits(h,a);for(var l=i(s.prototype),u=0;u<l.length;u++){var c=l[u];h.prototype[c]||(h.prototype[c]=s.prototype[c])}function h(t){if(!(this instanceof h))return new h(t);a.call(this,t),s.call(this,t),t&&!1===t.readable&&(this.readable=!1),t&&!1===t.writable&&(this.writable=!1),this.allowHalfOpen=!0,t&&!1===t.allowHalfOpen&&(this.allowHalfOpen=!1),this.once("end",f)}function f(){this.allowHalfOpen||this._writableState.ended||r.nextTick(d,this)}function d(t){t.end()}Object.defineProperty(h.prototype,"writableHighWaterMark",{enumerable:!1,get:function(){return this._writableState.highWaterMark}}),Object.defineProperty(h.prototype,"destroyed",{get:function(){return void 0!==this._readableState&&void 0!==this._writableState&&(this._readableState.destroyed&&this._writableState.destroyed)},set:function(t){void 0!==this._readableState&&void 0!==this._writableState&&(this._readableState.destroyed=t,this._writableState.destroyed=t)}}),h.prototype._destroy=function(t,e){this.push(null),this.end(),r.nextTick(e,t)}},function(t,e,n){var a;t.exports=(a=n(2),n(167),n(168),function(){var t=a,e=t.lib,n=e.Base,c=e.WordArray,r=t.algo,i=r.MD5,o=r.EvpKDF=n.extend({cfg:n.extend({keySize:4,hasher:i,iterations:1}),init:function(t){this.cfg=this.cfg.extend(t)},compute:function(t,e){for(var n=this.cfg,r=n.hasher.create(),i=c.create(),o=i.words,a=n.keySize,s=n.iterations;o.length<a;){l&&r.update(l);var l=r.update(t).finalize(e);r.reset();for(var u=1;u<s;u++)l=r.finalize(l),r.reset();i.concat(l)}return i.sigBytes=4*a,i}});t.EvpKDF=function(t,e,n){return o.create(n).compute(t,e)}}(),a.EvpKDF)},function(t,e,n){var r=n(172),i=n(173);t.exports=function(t){return r(i(t))}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){var r=n(11),i=n(110),o=n(42),a=n(27),s=n(54),l=n(14),u=n(198),c=Object.getOwnPropertyDescriptor;e.f=r?c:function(t,e){if(t=a(t),e=s(e,!0),u)try{return c(t,e)}catch(t){}if(l(t,e))return o(!i.f.call(t,e),t[e])}},function(t,e,n){var i=n(13);t.exports=function(t,e){if(!i(t))return t;var n,r;if(e&&"function"==typeof(n=t.toString)&&!i(r=n.call(t)))return r;if("function"==typeof(n=t.valueOf)&&!i(r=n.call(t)))return r;if(!e&&"function"==typeof(n=t.toString)&&!i(r=n.call(t)))return r;throw TypeError("Can't convert object to primitive value")}},function(t,e){t.exports=!1},function(t,e,n){var r=n(201),i=n(140).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,i)}},function(t,e,n){function r(){}function i(t){return"<script>"+t+"</"+p+">"}var o,a=n(16),s=n(310),l=n(140),u=n(113),c=n(203),h=n(136),f=n(111),d="prototype",p="script",g=f("IE_PROTO"),y=function(){try{o=document.domain&&new ActiveXObject("htmlfile")}catch(t){}var t,e;y=o?function(t){t.write(i("")),t.close();var e=t.parentWindow.Object;return t=null,e}(o):((e=h("iframe")).style.display="none",c.appendChild(e),e.src=String("javascript:"),(t=e.contentWindow.document).open(),t.write(i("document.F=Object")),t.close(),t.F);for(var n=l.length;n--;)delete y[d][l[n]];return y()};u[g]=!0,t.exports=Object.create||function(t,e){var n;return null!==t?(r[d]=a(t),n=new r,r[d]=null,n[g]=t):n=y(),void 0===e?n:s(n,e)}},function(t,e,n){"use strict";var r=n(4);t.exports=function(t,e){var n=[][t];return!!n&&r(function(){n.call(null,e||function(){throw 1},1)})}},function(t,e,n){var r=n(14),i=n(19),o=n(111),a=n(218),s=o("IE_PROTO"),l=Object.prototype;t.exports=a?Object.getPrototypeOf:function(t){return t=i(t),r(t,s)?t[s]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?l:null}},function(t,e,n){"use strict";var r=n(1),i=n(4),o=n(152),u=n(16),c=n(43),h=n(8),f=n(38),d=o.ArrayBuffer,p=o.DataView,g=d.prototype.slice;r({target:"ArrayBuffer",proto:!0,unsafe:!0,forced:i(function(){return!new d(2).slice(1,void 0).byteLength})},{slice:function(t,e){if(void 0!==g&&void 0===e)return g.call(u(this),t);for(var n=u(this).byteLength,r=c(t,n),i=c(void 0===e?n:e,n),o=new(f(this,d))(h(i-r)),a=new p(this),s=new p(o),l=0;r<i;)s.setUint8(l++,a.getUint8(r++));return o}})},function(t,e,n){n(236)("Uint8",function(r){return function(t,e,n){return r(this,t,e,n)}})},function(t,e,n){"use strict";var r=n(5),i=n(338),o=r.aTypedArray;(0,r.exportTypedArrayMethod)("copyWithin",function(t,e,n){return i.call(o(this),t,e,2<arguments.length?n:void 0)})},function(t,e,n){"use strict";var r=n(5),i=n(20).every,o=r.aTypedArray;(0,r.exportTypedArrayMethod)("every",function(t,e){return i(o(this),t,1<arguments.length?e:void 0)})},function(t,e,n){"use strict";var r=n(5),i=n(146),o=r.aTypedArray;(0,r.exportTypedArrayMethod)("fill",function(t){return i.apply(o(this),arguments)})},function(t,e,n){"use strict";var r=n(5),s=n(20).filter,l=n(38),u=r.aTypedArray,c=r.aTypedArrayConstructor;(0,r.exportTypedArrayMethod)("filter",function(t,e){for(var n=s(u(this),t,1<arguments.length?e:void 0),r=l(this,this.constructor),i=0,o=n.length,a=new(c(r))(o);i<o;)a[i]=n[i++];return a})},function(t,e,n){"use strict";var r=n(5),i=n(20).find,o=r.aTypedArray;(0,r.exportTypedArrayMethod)("find",function(t,e){return i(o(this),t,1<arguments.length?e:void 0)})},function(t,e,n){"use strict";var r=n(5),i=n(20).findIndex,o=r.aTypedArray;(0,r.exportTypedArrayMethod)("findIndex",function(t,e){return i(o(this),t,1<arguments.length?e:void 0)})},function(t,e,n){"use strict";var r=n(5),i=n(20).forEach,o=r.aTypedArray;(0,r.exportTypedArrayMethod)("forEach",function(t,e){i(o(this),t,1<arguments.length?e:void 0)})},function(t,e,n){"use strict";var r=n(5),i=n(93).includes,o=r.aTypedArray;(0,r.exportTypedArrayMethod)("includes",function(t,e){return i(o(this),t,1<arguments.length?e:void 0)})},function(t,e,n){"use strict";var r=n(5),i=n(93).indexOf,o=r.aTypedArray;(0,r.exportTypedArrayMethod)("indexOf",function(t,e){return i(o(this),t,1<arguments.length?e:void 0)})},function(t,e,n){"use strict";function r(){return u.call(f(this))}var i=n(3),o=n(5),a=n(28),s=n(6)("iterator"),l=i.Uint8Array,u=a.values,c=a.keys,h=a.entries,f=o.aTypedArray,d=o.exportTypedArrayMethod,p=l&&l.prototype[s],g=!!p&&("values"==p.name||null==p.name);d("entries",function(){return h.call(f(this))}),d("keys",function(){return c.call(f(this))}),d("values",r,!g),d(s,r,!g)},function(t,e,n){"use strict";var r=n(5),i=r.aTypedArray,o=r.exportTypedArrayMethod,a=[].join;o("join",function(t){return a.apply(i(this),arguments)})},function(t,e,n){"use strict";var r=n(5),i=n(339),o=r.aTypedArray;(0,r.exportTypedArrayMethod)("lastIndexOf",function(t){return i.apply(o(this),arguments)})},function(t,e,n){"use strict";var r=n(5),i=n(20).map,o=n(38),a=r.aTypedArray,s=r.aTypedArrayConstructor;(0,r.exportTypedArrayMethod)("map",function(t,e){return i(a(this),t,1<arguments.length?e:void 0,function(t,e){return new(s(o(t,t.constructor)))(e)})})},function(t,e,n){"use strict";var r=n(5),i=n(238).left,o=r.aTypedArray;(0,r.exportTypedArrayMethod)("reduce",function(t,e){return i(o(this),t,arguments.length,1<arguments.length?e:void 0)})},function(t,e,n){"use strict";var r=n(5),i=n(238).right,o=r.aTypedArray;(0,r.exportTypedArrayMethod)("reduceRight",function(t,e){return i(o(this),t,arguments.length,1<arguments.length?e:void 0)})},function(t,e,n){"use strict";var r=n(5),o=r.aTypedArray,i=r.exportTypedArrayMethod,a=Math.floor;i("reverse",function(){for(var t,e=this,n=o(e).length,r=a(n/2),i=0;i<r;)t=e[i],e[i++]=e[--n],e[n]=t;return e})},function(t,e,n){"use strict";var r=n(5),s=n(8),l=n(237),u=n(19),i=n(4),c=r.aTypedArray;(0,r.exportTypedArrayMethod)("set",function(t,e){c(this);var n=l(1<arguments.length?e:void 0,1),r=this.length,i=u(t),o=s(i.length),a=0;if(r<o+n)throw RangeError("Wrong length");for(;a<o;)this[n+a]=i[a++]},i(function(){new Int8Array(1).set({})}))},function(t,e,n){"use strict";var r=n(5),s=n(38),i=n(4),l=r.aTypedArray,u=r.aTypedArrayConstructor,o=r.exportTypedArrayMethod,c=[].slice;o("slice",function(t,e){for(var n=c.call(l(this),t,e),r=s(this,this.constructor),i=0,o=n.length,a=new(u(r))(o);i<o;)a[i]=n[i++];return a},i(function(){new Int8Array(1).slice()}))},function(t,e,n){"use strict";var r=n(5),i=n(20).some,o=r.aTypedArray;(0,r.exportTypedArrayMethod)("some",function(t,e){return i(o(this),t,1<arguments.length?e:void 0)})},function(t,e,n){"use strict";var r=n(5),i=r.aTypedArray,o=r.exportTypedArrayMethod,a=[].sort;o("sort",function(t){return a.call(i(this),t)})},function(t,e,n){"use strict";var r=n(5),o=n(8),a=n(43),s=n(38),l=r.aTypedArray;(0,r.exportTypedArrayMethod)("subarray",function(t,e){var n=l(this),r=n.length,i=a(t,r);return new(s(n,n.constructor))(n.buffer,n.byteOffset+i*n.BYTES_PER_ELEMENT,o((void 0===e?r:a(e,r))-i))})},function(t,e,n){"use strict";var r=n(3),i=n(5),o=n(4),a=r.Int8Array,s=i.aTypedArray,l=i.exportTypedArrayMethod,u=[].toLocaleString,c=[].slice,h=!!a&&o(function(){u.call(new a(1))});l("toLocaleString",function(){return u.apply(h?c.call(s(this)):s(this),arguments)},o(function(){return[1,2].toLocaleString()!=new a([1,2]).toLocaleString()})||!o(function(){a.prototype.toLocaleString.call([1,2])}))},function(t,e,n){"use strict";var r=n(5).exportTypedArrayMethod,i=n(4),o=n(3).Uint8Array,a=o&&o.prototype||{},s=[].toString,l=[].join;i(function(){s.call({})})&&(s=function(){return l.call(this)}),r("toString",s,a.toString!=s)},function(t,e){"function"==typeof Object.create?t.exports=function(t,e){e&&(t.super_=e,t.prototype=Object.create(e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}))}:t.exports=function(t,e){var n;e&&(t.super_=e,(n=function(){}).prototype=e.prototype,t.prototype=new n,t.prototype.constructor=t)}},function(t,e,n){var r;t.exports=(r=n(2),function(){var l=r.lib.WordArray;r.enc.Base64={stringify:function(t){var e=t.words,n=t.sigBytes,r=this._map;t.clamp();for(var i=[],o=0;o<n;o+=3)for(var a=(e[o>>>2]>>>24-o%4*8&255)<<16|(e[o+1>>>2]>>>24-(o+1)%4*8&255)<<8|e[o+2>>>2]>>>24-(o+2)%4*8&255,s=0;s<4&&o+.75*s<n;s++)i.push(r.charAt(a>>>6*(3-s)&63));var l=r.charAt(64);if(l)for(;i.length%4;)i.push(l);return i.join("")},parse:function(t){var e=t.length,n=this._map,r=this._reverseMap;if(!r){r=this._reverseMap=[];for(var i=0;i<n.length;i++)r[n.charCodeAt(i)]=i}var o,a=n.charAt(64);return!a||-1!==(o=t.indexOf(a))&&(e=o),function(t,e,n){for(var r,i,o=[],a=0,s=0;s<e;s++){s%4&&(r=n[t.charCodeAt(s-1)]<<s%4*2,i=n[t.charCodeAt(s)]>>>6-s%4*2,o[a>>>2]|=(r|i)<<24-a%4*8,a++)}return l.create(o,a)}(t,e,r)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}}(),r.enc.Base64)},function(t,e,n){var a;t.exports=(a=n(2),function(c){var t=a,e=t.lib,n=e.WordArray,r=e.Hasher,i=t.algo,C=[];!function(){for(var t=0;t<64;t++)C[t]=4294967296*c.abs(c.sin(t+1))|0}();var o=i.MD5=r.extend({_doReset:function(){this._hash=new n.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(t,e){for(var n=0;n<16;n++){var r=e+n,i=t[r];t[r]=16711935&(i<<8|i>>>24)|4278255360&(i<<24|i>>>8)}var o=this._hash.words,a=t[e+0],s=t[e+1],l=t[e+2],u=t[e+3],c=t[e+4],h=t[e+5],f=t[e+6],d=t[e+7],p=t[e+8],g=t[e+9],y=t[e+10],v=t[e+11],m=t[e+12],b=t[e+13],w=t[e+14],x=t[e+15],S=P(S=o[0],A=o[1],k=o[2],_=o[3],a,7,C[0]),_=P(_,S,A,k,s,12,C[1]),k=P(k,_,S,A,l,17,C[2]),A=P(A,k,_,S,u,22,C[3]);S=P(S,A,k,_,c,7,C[4]),_=P(_,S,A,k,h,12,C[5]),k=P(k,_,S,A,f,17,C[6]),A=P(A,k,_,S,d,22,C[7]),S=P(S,A,k,_,p,7,C[8]),_=P(_,S,A,k,g,12,C[9]),k=P(k,_,S,A,y,17,C[10]),A=P(A,k,_,S,v,22,C[11]),S=P(S,A,k,_,m,7,C[12]),_=P(_,S,A,k,b,12,C[13]),k=P(k,_,S,A,w,17,C[14]),S=E(S,A=P(A,k,_,S,x,22,C[15]),k,_,s,5,C[16]),_=E(_,S,A,k,f,9,C[17]),k=E(k,_,S,A,v,14,C[18]),A=E(A,k,_,S,a,20,C[19]),S=E(S,A,k,_,h,5,C[20]),_=E(_,S,A,k,y,9,C[21]),k=E(k,_,S,A,x,14,C[22]),A=E(A,k,_,S,c,20,C[23]),S=E(S,A,k,_,g,5,C[24]),_=E(_,S,A,k,w,9,C[25]),k=E(k,_,S,A,u,14,C[26]),A=E(A,k,_,S,p,20,C[27]),S=E(S,A,k,_,b,5,C[28]),_=E(_,S,A,k,l,9,C[29]),k=E(k,_,S,A,d,14,C[30]),S=O(S,A=E(A,k,_,S,m,20,C[31]),k,_,h,4,C[32]),_=O(_,S,A,k,p,11,C[33]),k=O(k,_,S,A,v,16,C[34]),A=O(A,k,_,S,w,23,C[35]),S=O(S,A,k,_,s,4,C[36]),_=O(_,S,A,k,c,11,C[37]),k=O(k,_,S,A,d,16,C[38]),A=O(A,k,_,S,y,23,C[39]),S=O(S,A,k,_,b,4,C[40]),_=O(_,S,A,k,a,11,C[41]),k=O(k,_,S,A,u,16,C[42]),A=O(A,k,_,S,f,23,C[43]),S=O(S,A,k,_,g,4,C[44]),_=O(_,S,A,k,m,11,C[45]),k=O(k,_,S,A,x,16,C[46]),S=T(S,A=O(A,k,_,S,l,23,C[47]),k,_,a,6,C[48]),_=T(_,S,A,k,d,10,C[49]),k=T(k,_,S,A,w,15,C[50]),A=T(A,k,_,S,h,21,C[51]),S=T(S,A,k,_,m,6,C[52]),_=T(_,S,A,k,u,10,C[53]),k=T(k,_,S,A,y,15,C[54]),A=T(A,k,_,S,s,21,C[55]),S=T(S,A,k,_,p,6,C[56]),_=T(_,S,A,k,x,10,C[57]),k=T(k,_,S,A,f,15,C[58]),A=T(A,k,_,S,b,21,C[59]),S=T(S,A,k,_,c,6,C[60]),_=T(_,S,A,k,v,10,C[61]),k=T(k,_,S,A,l,15,C[62]),A=T(A,k,_,S,g,21,C[63]),o[0]=o[0]+S|0,o[1]=o[1]+A|0,o[2]=o[2]+k|0,o[3]=o[3]+_|0},_doFinalize:function(){var t=this._data,e=t.words,n=8*this._nDataBytes,r=8*t.sigBytes;e[r>>>5]|=128<<24-r%32;var i=c.floor(n/4294967296),o=n;e[15+(64+r>>>9<<4)]=16711935&(i<<8|i>>>24)|4278255360&(i<<24|i>>>8),e[14+(64+r>>>9<<4)]=16711935&(o<<8|o>>>24)|4278255360&(o<<24|o>>>8),t.sigBytes=4*(e.length+1),this._process();for(var a=this._hash,s=a.words,l=0;l<4;l++){var u=s[l];s[l]=16711935&(u<<8|u>>>24)|4278255360&(u<<24|u>>>8)}return a},clone:function(){var t=r.clone.call(this);return t._hash=this._hash.clone(),t}});function P(t,e,n,r,i,o,a){var s=t+(e&n|~e&r)+i+a;return(s<<o|s>>>32-o)+e}function E(t,e,n,r,i,o,a){var s=t+(e&r|n&~r)+i+a;return(s<<o|s>>>32-o)+e}function O(t,e,n,r,i,o,a){var s=t+(e^n^r)+i+a;return(s<<o|s>>>32-o)+e}function T(t,e,n,r,i,o,a){var s=t+(n^(e|~r))+i+a;return(s<<o|s>>>32-o)+e}t.MD5=r._createHelper(o),t.HmacMD5=r._createHmacHelper(o)}(Math),a.MD5)},function(t,a,s){(function(){var t,e,n,i={}.hasOwnProperty;function r(t,e){this.type=t,this.endian=null!=e?e:"BE",this.fn=this.type,"8"!==this.type[this.type.length-1]&&(this.fn+=this.endian)}function o(t,e,n){null==n&&(n=t>>1),o.__super__.constructor.call(this,"Int"+t,e),this._point=1<<n}t=s(169),r.prototype.size=function(){return t.TYPES[this.type]},r.prototype.decode=function(t){return t["read"+this.fn]()},r.prototype.encode=function(t,e){return t["write"+this.fn](e)},n=r,a.Number=n,a.uint8=new n("UInt8"),a.uint16be=a.uint16=new n("UInt16","BE"),a.uint16le=new n("UInt16","LE"),a.uint24be=a.uint24=new n("UInt24","BE"),a.uint24le=new n("UInt24","LE"),a.uint32be=a.uint32=new n("UInt32","BE"),a.uint32le=new n("UInt32","LE"),a.int8=new n("Int8"),a.int16be=a.int16=new n("Int16","BE"),a.int16le=new n("Int16","LE"),a.int24be=a.int24=new n("Int24","BE"),a.int24le=new n("Int24","LE"),a.int32be=a.int32=new n("Int32","BE"),a.int32le=new n("Int32","LE"),a.floatbe=a.float=new n("Float","BE"),a.floatle=new n("Float","LE"),a.doublebe=a.double=new n("Double","BE"),a.doublele=new n("Double","LE"),function(t,e){for(var n in e)i.call(e,n)&&(t[n]=e[n]);function r(){this.constructor=t}r.prototype=e.prototype,t.prototype=new r,t.__super__=e.prototype}(o,n),o.prototype.decode=function(t){return o.__super__.decode.call(this,t)/this._point},o.prototype.encode=function(t,e){return o.__super__.encode.call(this,t,e*this._point|0)},e=o,a.Fixed=e,a.fixed16be=a.fixed16=new e(16,"BE"),a.fixed16le=new e(16,"LE"),a.fixed32be=a.fixed32=new e(32,"BE"),a.fixed32le=new e(32,"LE")}).call(this)},function(t,e,n){var r=n(173);t.exports=function(t){return Object(r(t))}},function(t,e,n){"use strict";var r=n(427)(!0);n(178)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})})},function(n,t,e){"use strict";(function(i,e){function t(){this.fileSystem={},this.dataSystem={}}function o(t){return 0===t.indexOf(e)&&(t=t.substring(e.length)),0===t.indexOf("/")&&(t=t.substring(1)),t}t.prototype.readFileSync=function(t,e){t=o(t);var n=this.dataSystem[t];if("string"==typeof n&&"utf8"===e)return n;if(n)return new i(n,"string"==typeof n?"base64":void 0);var r=this.fileSystem[t];if(r)return r;throw"File '"+t+"' not found in virtual file system"},t.prototype.writeFileSync=function(t,e){this.fileSystem[o(t)]=e},t.prototype.bindFS=function(t){this.dataSystem=t||{}},n.exports=new t}).call(this,e(10).Buffer,"/")},function(t,e,n){var r=n(4),i=n(30),o="".split;t.exports=r(function(){return!Object("z").propertyIsEnumerable(0)})?function(t){return"String"==i(t)?o.call(t,""):Object(t)}:Object},function(t,e,n){function r(s){return function(t,e,n){var r,i=l(t),o=u(i.length),a=c(n,o);if(s&&e!=e){for(;a<o;)if((r=i[a++])!=r)return!0}else for(;a<o;a++)if((s||a in i)&&i[a]===e)return s||a||0;return!s&&-1}}var l=n(27),u=n(8),c=n(43);t.exports={includes:r(!0),indexOf:r(!1)}},function(t,e,n){var r=n(201),i=n(140);t.exports=Object.keys||function(t){return r(t,i)}},function(t,e,n){var r=n(15).f,i=n(14),o=n(6)("toStringTag");t.exports=function(t,e,n){t&&!i(t=n?t:t.prototype,o)&&r(t,o,{configurable:!0,value:e})}},function(t,e,n){var o=n(44);t.exports=function(r,i,t){if(o(r),void 0===i)return r;switch(t){case 0:return function(){return r.call(i)};case 1:return function(t){return r.call(i,t)};case 2:return function(t,e){return r.call(i,t,e)};case 3:return function(t,e,n){return r.call(i,t,e,n)}}return function(){return r.apply(i,arguments)}}},function(t,e){t.exports={}},function(t,n,e){(function(t){function e(t){return Object.prototype.toString.call(t)}n.isArray=function(t){return Array.isArray?Array.isArray(t):"[object Array]"===e(t)},n.isBoolean=function(t){return"boolean"==typeof t},n.isNull=function(t){return null===t},n.isNullOrUndefined=function(t){return null==t},n.isNumber=function(t){return"number"==typeof t},n.isString=function(t){return"string"==typeof t},n.isSymbol=function(t){return"symbol"==typeof t},n.isUndefined=function(t){return void 0===t},n.isRegExp=function(t){return"[object RegExp]"===e(t)},n.isObject=function(t){return"object"==typeof t&&null!==t},n.isDate=function(t){return"[object Date]"===e(t)},n.isError=function(t){return"[object Error]"===e(t)||t instanceof Error},n.isFunction=function(t){return"function"==typeof t},n.isPrimitive=function(t){return null===t||"boolean"==typeof t||"number"==typeof t||"string"==typeof t||"symbol"==typeof t||void 0===t},n.isBuffer=t.isBuffer}).call(this,e(10).Buffer)},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){n(422);for(var r=n(17),i=n(41),o=n(103),a=n(21)("toStringTag"),s="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),l=0;l<s.length;l++){var u=s[l],c=r[u],h=c&&c.prototype;h&&!h[a]&&i(h,a,u),o[u]=o.Array}},function(t,e){t.exports={}},function(t,e){t.exports=!0},function(t,e,n){var r=n(258),i=n(182);t.exports=Object.keys||function(t){return r(t,i)}},function(t,e,n){var r=n(25).f,i=n(51),o=n(21)("toStringTag");t.exports=function(t,e,n){t&&!i(t=n?t:t.prototype,o)&&r(t,o,{configurable:!0,value:e})}},function(t,e,n){var f=n(33),d=n(265),p=n(266),g=n(29),y=n(128),v=n(183),m={},b={};(e=t.exports=function(t,e,n,r,i){var o,a,s,l,u=i?function(){return t}:v(t),c=f(n,r,e?2:1),h=0;if("function"!=typeof u)throw TypeError(t+" is not iterable!");if(p(u)){for(o=y(t.length);h<o;h++)if((l=e?c(g(a=t[h])[0],a[1]):c(t[h]))===m||l===b)return l}else for(s=u.call(t);!(a=s.next()).done;)if((l=d(s,c,a.value,e))===m||l===b)return l}).BREAK=m,e.RETURN=b},function(t,e,n){"use strict";function o(t,e,n,r){var i;e in t&&("function"!=typeof(i=r)||"[object Function]"!==l.call(i)||!r())||(h?c(t,e,{configurable:!0,enumerable:!1,value:n,writable:!0}):t[e]=n)}function r(t,e){var n=2<arguments.length?arguments[2]:{},r=a(e);s&&(r=u.call(r,Object.getOwnPropertySymbols(e)));for(var i=0;i<r.length;i+=1)o(t,r[i],e[r[i]],n[r[i]])}var a=n(272),s="function"==typeof Symbol&&"symbol"==typeof Symbol("foo"),l=Object.prototype.toString,u=Array.prototype.concat,c=Object.defineProperty,h=c&&function(){var t={};try{for(var e in c(t,"x",{enumerable:!1,value:t}),t)return!1;return t.x===t}catch(t){return!1}}();r.supportsDescriptors=!!h,t.exports=r},function(t,e,n){"use strict";function r(t){var n,r;this.promise=new t(function(t,e){if(void 0!==n||void 0!==r)throw TypeError("Bad Promise constructor");n=t,r=e}),this.resolve=i(n),this.reject=i(r)}var i=n(44);t.exports.f=function(t){return new r(t)}},function(t,e,n){"use strict";var r={}.propertyIsEnumerable,i=Object.getOwnPropertyDescriptor,o=i&&!r.call({1:2},1);e.f=o?function(t){var e=i(this,t);return!!e&&e.enumerable}:r},function(t,e,n){var r=n(139),i=n(112),o=r("keys");t.exports=function(t){return o[t]||(o[t]=i(t))}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol("+String(void 0===t?"":t)+")_"+(++n+r).toString(36)}},function(t,e){t.exports={}},function(t,e,n){var r=n(3);t.exports=r},function(t,e,n){var r=n(30);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,e,n){var r=n(4),i=n(6),o=n(145),a=i("species");t.exports=function(e){return 51<=o||!r(function(){var t=[];return(t.constructor={})[a]=function(){return{foo:1}},1!==t[e](Boolean).foo})}},function(t,e,n){var r=n(150),i=n(30),o=n(6)("toStringTag"),a="Arguments"==i(function(){return arguments}());t.exports=r?i:function(t){var e,n,r;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=function(t,e){try{return t[e]}catch(t){}}(e=Object(t),o))?n:a?i(e):"Object"==(r=i(e))&&"function"==typeof e.callee?"Arguments":r}},function(t,e,n){"use strict";var r=n(1),i=n(119);r({target:"RegExp",proto:!0,forced:/./.exec!==i},{exec:i})},function(t,e,n){"use strict";var r,i,h=n(228),o=n(329),f=RegExp.prototype.exec,d=String.prototype.replace,a=f,p=(r=/a/,i=/b*/g,f.call(r,"a"),f.call(i,"a"),0!==r.lastIndex||0!==i.lastIndex),g=o.UNSUPPORTED_Y||o.BROKEN_CARET,y=void 0!==/()??/.exec("")[1];(p||y||g)&&(a=function(t){var e,n,r,i,o=this,a=g&&o.sticky,s=h.call(o),l=o.source,u=0,c=t;return a&&(-1===(s=s.replace("y","")).indexOf("g")&&(s+="g"),c=String(t).slice(o.lastIndex),0<o.lastIndex&&(!o.multiline||o.multiline&&"\n"!==t[o.lastIndex-1])&&(l="(?: "+l+")",c=" "+c,u++),n=new RegExp("^(?:"+l+")",s)),y&&(n=new RegExp("^"+l+"$(?!\\s)",s)),p&&(e=o.lastIndex),r=f.call(a?n:o,c),a?r?(r.input=r.input.slice(u),r[0]=r[0].slice(u),r.index=o.lastIndex,o.lastIndex+=r[0].length):o.lastIndex=0:p&&r&&(o.lastIndex=o.global?r.index+r[0].length:e),y&&r&&1<r.length&&d.call(r[0],n,function(){for(i=1;i<arguments.length-2;i++)void 0===arguments[i]&&(r[i]=void 0)}),r}),t.exports=a},function(t,e,n){var r=n(3),i=n(239),o=n(28),a=n(18),s=n(6),l=s("iterator"),u=s("toStringTag"),c=o.values;for(var h in i){var f=r[h],d=f&&f.prototype;if(d){if(d[l]!==c)try{a(d,l,c)}catch(t){d[l]=c}if(d[u]||a(d,u,h),i[h])for(var p in o)if(d[p]!==o[p])try{a(d,p,o[p])}catch(t){d[p]=o[p]}}}},function(t,e,n){"use strict";var r,i="object"==typeof Reflect?Reflect:null,c=i&&"function"==typeof i.apply?i.apply:function(t,e,n){return Function.prototype.apply.call(t,e,n)};r=i&&"function"==typeof i.ownKeys?i.ownKeys:Object.getOwnPropertySymbols?function(t){return Object.getOwnPropertyNames(t).concat(Object.getOwnPropertySymbols(t))}:function(t){return Object.getOwnPropertyNames(t)};var o=Number.isNaN||function(t){return t!=t};function a(){a.init.call(this)}((t.exports=a).EventEmitter=a).prototype._events=void 0,a.prototype._eventsCount=0,a.prototype._maxListeners=void 0;var s=10;function l(t){if("function"!=typeof t)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof t)}function u(t){return void 0===t._maxListeners?a.defaultMaxListeners:t._maxListeners}function h(t,e,n,r){var i,o,a,s;return l(n),void 0===(o=t._events)?(o=t._events=Object.create(null),t._eventsCount=0):(void 0!==o.newListener&&(t.emit("newListener",e,n.listener?n.listener:n),o=t._events),a=o[e]),void 0===a?(a=o[e]=n,++t._eventsCount):("function"==typeof a?a=o[e]=r?[n,a]:[a,n]:r?a.unshift(n):a.push(n),0<(i=u(t))&&a.length>i&&!a.warned&&(a.warned=!0,(s=new Error("Possible EventEmitter memory leak detected. "+a.length+" "+String(e)+" listeners added. Use emitter.setMaxListeners() to increase limit")).name="MaxListenersExceededWarning",s.emitter=t,s.type=e,s.count=a.length,console&&console.warn)),t}function f(t,e,n){var r={fired:!1,wrapFn:void 0,target:t,type:e,listener:n},i=function(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}.bind(r);return i.listener=n,r.wrapFn=i}function d(t,e,n){var r=t._events;if(void 0===r)return[];var i=r[e];return void 0===i?[]:"function"==typeof i?n?[i.listener||i]:[i]:n?function(t){for(var e=new Array(t.length),n=0;n<e.length;++n)e[n]=t[n].listener||t[n];return e}(i):g(i,i.length)}function p(t){var e=this._events;if(void 0!==e){var n=e[t];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function g(t,e){for(var n=new Array(e),r=0;r<e;++r)n[r]=t[r];return n}Object.defineProperty(a,"defaultMaxListeners",{enumerable:!0,get:function(){return s},set:function(t){if("number"!=typeof t||t<0||o(t))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+t+".");s=t}}),a.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},a.prototype.setMaxListeners=function(t){if("number"!=typeof t||t<0||o(t))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+t+".");return this._maxListeners=t,this},a.prototype.getMaxListeners=function(){return u(this)},a.prototype.emit=function(t){for(var e=[],n=1;n<arguments.length;n++)e.push(arguments[n]);var r,i="error"===t,o=this._events;if(void 0!==o)i=i&&void 0===o.error;else if(!i)return!1;if(i){if(0<e.length&&(r=e[0]),r instanceof Error)throw r;var a=new Error("Unhandled error."+(r?" ("+r.message+")":""));throw a.context=r,a}var s=o[t];if(void 0===s)return!1;if("function"==typeof s)c(s,this,e);else for(var l=s.length,u=g(s,l),n=0;n<l;++n)c(u[n],this,e);return!0},a.prototype.addListener=function(t,e){return h(this,t,e,!1)},a.prototype.on=a.prototype.addListener,a.prototype.prependListener=function(t,e){return h(this,t,e,!0)},a.prototype.once=function(t,e){return l(e),this.on(t,f(this,t,e)),this},a.prototype.prependOnceListener=function(t,e){return l(e),this.prependListener(t,f(this,t,e)),this},a.prototype.removeListener=function(t,e){var n,r,i,o,a;if(l(e),void 0===(r=this._events))return this;if(void 0===(n=r[t]))return this;if(n===e||n.listener===e)0==--this._eventsCount?this._events=Object.create(null):(delete r[t],r.removeListener&&this.emit("removeListener",t,n.listener||e));else if("function"!=typeof n){for(i=-1,o=n.length-1;0<=o;o--)if(n[o]===e||n[o].listener===e){a=n[o].listener,i=o;break}if(i<0)return this;0===i?n.shift():function(t,e){for(;e+1<t.length;e++)t[e]=t[e+1];t.pop()}(n,i),1===n.length&&(r[t]=n[0]),void 0!==r.removeListener&&this.emit("removeListener",t,a||e)}return this},a.prototype.off=a.prototype.removeListener,a.prototype.removeAllListeners=function(t){var e,n=this._events;if(void 0===n)return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[t]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[t]),this;if(0===arguments.length){for(var r,i=Object.keys(n),o=0;o<i.length;++o)"removeListener"!==(r=i[o])&&this.removeAllListeners(r);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(e=n[t]))this.removeListener(t,e);else if(void 0!==e)for(o=e.length-1;0<=o;o--)this.removeListener(t,e[o]);return this},a.prototype.listeners=function(t){return d(this,t,!0)},a.prototype.rawListeners=function(t){return d(this,t,!1)},a.listenerCount=function(t,e){return"function"==typeof t.listenerCount?t.listenerCount(e):p.call(t,e)},a.prototype.listenerCount=p,a.prototype.eventNames=function(){return 0<this._eventsCount?r(this._events):[]}},function(t,e,n){"use strict";(function(s){void 0===s||!s.version||0===s.version.indexOf("v0.")||0===s.version.indexOf("v1.")&&0!==s.version.indexOf("v1.8.")?t.exports={nextTick:function(t,e,n,r){if("function"!=typeof t)throw new TypeError('"callback" argument must be a function');var i,o,a=arguments.length;switch(a){case 0:case 1:return s.nextTick(t);case 2:return s.nextTick(function(){t.call(null,e)});case 3:return s.nextTick(function(){t.call(null,e,n)});case 4:return s.nextTick(function(){t.call(null,e,n,r)});default:for(i=new Array(a-1),o=0;o<i.length;)i[o++]=arguments[o];return s.nextTick(function(){t.apply(null,i)})}}}:t.exports=s}).call(this,n(47))},function(t,e,n){var r=n(10),i=r.Buffer;function o(t,e){for(var n in t)e[n]=t[n]}function a(t,e,n){return i(t,e,n)}i.from&&i.alloc&&i.allocUnsafe&&i.allocUnsafeSlow?t.exports=r:(o(r,e),e.Buffer=a),o(i,a),a.from=function(t,e,n){if("number"==typeof t)throw new TypeError("Argument must not be a number");return i(t,e,n)},a.alloc=function(t,e,n){if("number"!=typeof t)throw new TypeError("Argument must be a number");var r=i(t);return void 0!==e?"string"==typeof n?r.fill(e,n):r.fill(e):r.fill(0),r},a.allocUnsafe=function(t){if("number"!=typeof t)throw new TypeError("Argument must be a number");return i(t)},a.allocUnsafeSlow=function(t){if("number"!=typeof t)throw new TypeError("Argument must be a number");return r.SlowBuffer(t)}},function(t,e,n){"use strict";var r="undefined"!=typeof Uint8Array&&"undefined"!=typeof Uint16Array&&"undefined"!=typeof Int32Array;e.assign=function(t){for(var e,n,r=Array.prototype.slice.call(arguments,1);r.length;){var i=r.shift();if(i){if("object"!=typeof i)throw new TypeError(i+"must be non-object");for(var o in i)e=i,n=o,Object.prototype.hasOwnProperty.call(e,n)&&(t[o]=i[o])}}return t},e.shrinkBuf=function(t,e){return t.length===e?t:t.subarray?t.subarray(0,e):(t.length=e,t)};var i={arraySet:function(t,e,n,r,i){if(e.subarray&&t.subarray)t.set(e.subarray(n,n+r),i);else for(var o=0;o<r;o++)t[i+o]=e[n+o]},flattenChunks:function(t){for(var e,n,r,i=0,o=0,a=t.length;o<a;o++)i+=t[o].length;for(r=new Uint8Array(i),o=e=0,a=t.length;o<a;o++)n=t[o],r.set(n,e),e+=n.length;return r}},o={arraySet:function(t,e,n,r,i){for(var o=0;o<r;o++)t[i+o]=e[n+o]},flattenChunks:function(t){return[].concat.apply([],t)}};e.setTyped=function(t){t?(e.Buf8=Uint8Array,e.Buf16=Uint16Array,e.Buf32=Int32Array,e.assign(e,i)):(e.Buf8=Array,e.Buf16=Array,e.Buf32=Array,e.assign(e,o))},e.setTyped(r)},function(t,e,n){var r;t.exports=(r=n(2),function(){var t=r.lib,i=t.Base,o=t.WordArray,e=r.x64={};e.Word=i.extend({init:function(t,e){this.high=t,this.low=e}}),e.WordArray=i.extend({init:function(t,e){t=this.words=t||[],this.sigBytes=null!=e?e:8*t.length},toX32:function(){for(var t=this.words,e=t.length,n=[],r=0;r<e;r++){var i=t[r];n.push(i.high),n.push(i.low)}return o.create(n,this.sigBytes)},clone:function(){for(var t=i.clone.call(this),e=t.words=this.words.slice(0),n=e.length,r=0;r<n;r++)e[r]=e[r].clone();return t}})}(),r)},function(t,e){e.f={}.propertyIsEnumerable},function(t,e,r){function i(){}var o=r(29),a=r(257),s=r(182),l=r(180)("IE_PROTO"),u="prototype",c=function(){var t,e=r(176)("iframe"),n=s.length;for(e.style.display="none",r(260).appendChild(e),e.src="javascript:",(t=e.contentWindow.document).open(),t.write("<script>document.F=Object<\/script>"),t.close(),c=t.F;n--;)delete c[u][s[n]];return c()};t.exports=Object.create||function(t,e){var n;return null!==t?(i[u]=o(t),n=new i,i[u]=null,n[l]=t):n=c(),void 0===e?n:a(n,e)}},function(t,e,n){var r=n(179),i=Math.min;t.exports=function(t){return 0<t?i(r(t),9007199254740991):0}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e,n){function r(t){s(t,i,{value:{i:"O"+ ++l,w:{}}})}var i=n(129)("meta"),o=n(22),a=n(51),s=n(25).f,l=0,u=Object.isExtensible||function(){return!0},c=!n(52)(function(){return u(Object.preventExtensions({}))}),h=t.exports={KEY:i,NEED:!1,fastKey:function(t,e){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!a(t,i)){if(!u(t))return"F";if(!e)return"E";r(t)}return t[i].i},getWeak:function(t,e){if(!a(t,i)){if(!u(t))return!0;if(!e)return!1;r(t)}return t[i].w},onFreeze:function(t){return c&&h.NEED&&u(t)&&!a(t,i)&&r(t),t}}},function(t,e){},function(t,e,n){n(236)("Uint32",function(r){return function(t,e,n){return r(this,t,e,n)}})},function(t,e){var l=0,o=-3;function n(){this.table=new Uint16Array(16),this.trans=new Uint16Array(288)}function a(t,e){this.source=t,this.sourceIndex=0,this.tag=0,this.bitcount=0,this.dest=e,this.destLen=0,this.ltree=new n,this.dtree=new n}var s=new n,u=new n,c=new Uint8Array(30),h=new Uint16Array(30),f=new Uint8Array(30),d=new Uint16Array(30),p=new Uint8Array([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),g=new n,y=new Uint8Array(320);function r(t,e,n,r){for(var i,o=0;o<n;++o)t[o]=0;for(o=0;o<30-n;++o)t[o+n]=o/n|0;for(i=r,o=0;o<30;++o)e[o]=i,i+=1<<t[o]}var v=new Uint16Array(16);function m(t,e,n,r){for(var i,o=0;o<16;++o)t.table[o]=0;for(o=0;o<r;++o)t.table[e[n+o]]++;for(o=i=t.table[0]=0;o<16;++o)v[o]=i,i+=t.table[o];for(o=0;o<r;++o)e[n+o]&&(t.trans[v[e[n+o]]++]=o)}function b(t,e,n){if(!e)return n;for(;t.bitcount<24;)t.tag|=t.source[t.sourceIndex++]<<t.bitcount,t.bitcount+=8;var r=t.tag&65535>>>16-e;return t.tag>>>=e,t.bitcount-=e,r+n}function w(t,e){for(;t.bitcount<24;)t.tag|=t.source[t.sourceIndex++]<<t.bitcount,t.bitcount+=8;for(var n=0,r=0,i=0,o=t.tag;r=2*r+(1&o),o>>>=1,++i,n+=e.table[i],0<=(r-=e.table[i]););return t.tag=o,t.bitcount-=i,e.trans[n+r]}function x(t,e,n){for(;;){var r=w(t,e);if(256===r)return l;if(r<256)t.dest[t.destLen++]=r;else for(var i,o=b(t,c[r-=257],h[r]),a=w(t,n),s=i=t.destLen-b(t,f[a],d[a]);s<i+o;++s)t.dest[t.destLen++]=t.dest[s]}}!function(t,e){for(var n=0;n<7;++n)t.table[n]=0;for(t.table[7]=24,t.table[8]=152,t.table[9]=112,n=0;n<24;++n)t.trans[n]=256+n;for(n=0;n<144;++n)t.trans[24+n]=n;for(n=0;n<8;++n)t.trans[168+n]=280+n;for(n=0;n<112;++n)t.trans[176+n]=144+n;for(n=0;n<5;++n)e.table[n]=0;for(e.table[5]=32,n=0;n<32;++n)e.trans[n]=n}(s,u),r(c,h,4,3),r(f,d,2,1),c[28]=0,h[28]=258,t.exports=function(t,e){var n,r,i=new a(t,e);do{switch(n=function(t){t.bitcount--||(t.tag=t.source[t.sourceIndex++],t.bitcount=7);var e=1&t.tag;return t.tag>>>=1,e}(i),b(i,2,0)){case 0:r=function(t){for(var e,n;8<t.bitcount;)t.sourceIndex--,t.bitcount-=8;if((e=256*t.source[t.sourceIndex+1]+t.source[t.sourceIndex])!==(65535&~(256*t.source[t.sourceIndex+3]+t.source[t.sourceIndex+2])))return o;for(t.sourceIndex+=4,n=e;n;--n)t.dest[t.destLen++]=t.source[t.sourceIndex++];return t.bitcount=0,l}(i);break;case 1:r=x(i,s,u);break;case 2:!function(t,e,n){for(var r,i=b(t,5,257),o=b(t,5,1),a=b(t,4,4),s=0;s<19;++s)y[s]=0;for(s=0;s<a;++s){var l=b(t,3,0);y[p[s]]=l}for(m(g,y,0,19),r=0;r<i+o;){var u=w(t,g);switch(u){case 16:for(var c=y[r-1],h=b(t,2,3);h;--h)y[r++]=c;break;case 17:for(h=b(t,3,3);h;--h)y[r++]=0;break;case 18:for(h=b(t,7,11);h;--h)y[r++]=0;break;default:y[r++]=u}}m(e,y,0,i),m(n,y,i,o)}(i,i.ltree,i.dtree),r=x(i,i.ltree,i.dtree);break;default:r=o}if(r!==l)throw new Error("Data error")}while(!n);return i.destLen<i.dest.length?"function"==typeof i.dest.slice?i.dest.slice(0,i.destLen):i.dest.subarray(0,i.destLen):i.dest}},function(t,e,n){function d(t,e){this.stopped=t,this.result=e}var p=n(16),g=n(148),y=n(8),v=n(96),m=n(149),b=n(214);(t.exports=function(t,e,n,r,i){var o,a,s,l,u,c,h,f=v(e,n,r?2:1);if(i)o=t;else{if("function"!=typeof(a=m(t)))throw TypeError("Target is not iterable");if(g(a)){for(s=0,l=y(t.length);s<l;s++)if((u=r?f(p(h=t[s])[0],h[1]):f(t[s]))&&u instanceof d)return u;return new d(!1)}o=a.call(t)}for(c=o.next;!(h=c.call(o)).done;)if("object"==typeof(u=b(o,f,h.value,r))&&u&&u instanceof d)return u;return new d(!1)}).stop=function(t){return new d(!0,t)}},function(t,e){t.exports=function(t){try{return{error:!1,value:t()}}catch(t){return{error:!0,value:t}}}},function(t,e,n){var r=n(3),i=n(13),o=r.document,a=i(o)&&i(o.createElement);t.exports=function(t){return a?o.createElement(t):{}}},function(t,e,n){var r=n(3),i=n(18);t.exports=function(e,n){try{i(r,e,n)}catch(t){r[e]=n}return n}},function(t,e,n){var r=n(199),i=Function.toString;"function"!=typeof r.inspectSource&&(r.inspectSource=function(t){return i.call(t)}),t.exports=r.inspectSource},function(t,e,n){var r=n(55),i=n(199);(t.exports=function(t,e){return i[t]||(i[t]=void 0!==e?e:{})})("versions",[]).push({version:"3.6.5",mode:r?"pure":"global",copyright:"Â© 2020 Denis Pushkarev (zloirock.ru)"})},function(t,e){t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){function r(t,e){var n=s[a(t)];return n==u||n!=l&&("function"==typeof e?i(e):!!e)}var i=n(4),o=/#|\.prototype\./,a=r.normalize=function(t){return String(t).replace(o,".").toLowerCase()},s=r.data={},l=r.NATIVE="N",u=r.POLYFILL="P";t.exports=r},function(t,e,n){var r=n(4);t.exports=!!Object.getOwnPropertySymbols&&!r(function(){return!String(Symbol())})},function(t,e,n){"use strict";var i=n(54),o=n(15),a=n(42);t.exports=function(t,e,n){var r=i(e);r in t?o.f(t,r,a(0,n)):t[r]=n}},function(t,e,n){var r,i,o=n(3),a=n(210),s=o.process,l=s&&s.versions,u=l&&l.v8;u?i=(r=u.split("."))[0]+r[1]:a&&(!(r=a.match(/Edge\/(\d+)/))||74<=r[1])&&(r=a.match(/Chrome\/(\d+)/))&&(i=r[1]),t.exports=i&&+i},function(t,e,n){"use strict";var u=n(19),c=n(43),h=n(8);t.exports=function(t,e,n){for(var r=u(this),i=h(r.length),o=arguments.length,a=c(1<o?e:void 0,i),s=2<o?n:void 0,l=void 0===s?i:c(s,i);a<l;)r[a++]=t;return r}},function(t,e,n){var r=n(6),i=n(57),o=n(15),a=r("unscopables"),s=Array.prototype;null==s[a]&&o.f(s,a,{configurable:!0,value:i(null)}),t.exports=function(t){s[a][t]=!0}},function(t,e,n){var r=n(6),i=n(97),o=r("iterator"),a=Array.prototype;t.exports=function(t){return void 0!==t&&(i.Array===t||a[o]===t)}},function(t,e,n){var r=n(117),i=n(97),o=n(6)("iterator");t.exports=function(t){if(null!=t)return t[o]||t["@@iterator"]||i[r(t)]}},function(t,e,n){var r={};r[n(6)("toStringTag")]="z",t.exports="[object z]"===String(r)},function(t,e,n){var i=n(6)("iterator"),o=!1;try{var r=0,a={next:function(){return{done:!!r++}},return:function(){o=!0}};a[i]=function(){return this},Array.from(a,function(){throw 2})}catch(t){}t.exports=function(t,e){if(!e&&!o)return!1;var n=!1;try{var r={};r[i]=function(){return{next:function(){return{done:n=!0}}}},t(r)}catch(t){}return n}},function(t,e,n){"use strict";function r(t){return[255&t]}function i(t){return[255&t,t>>8&255]}function o(t){return[255&t,t>>8&255,t>>16&255,t>>24&255]}function a(t){return t[3]<<24|t[2]<<16|t[1]<<8|t[0]}function s(t){return W(t,23,4)}function l(t){return W(t,52,8)}function u(t,e){C(t[B],e,{get:function(){return T(this)[e]}})}function c(t,e,n,r){var i=x(n),o=T(t);if(i+e>o.byteLength)throw j(R);var a=T(o.buffer).bytes,s=i+o.byteOffset,l=a.slice(s,s+e);return r?l:l.reverse()}function h(t,e,n,r,i,o){var a=x(n),s=T(t);if(a+e>s.byteLength)throw j(R);for(var l=T(s.buffer).bytes,u=a+s.byteOffset,c=r(+i),h=0;h<e;h++)l[u+h]=c[o?h:e-h-1]}var f=n(3),d=n(11),p=n(220),g=n(18),y=n(221),v=n(4),m=n(153),b=n(37),w=n(8),x=n(222),S=n(321),_=n(59),k=n(45),A=n(56).f,C=n(15).f,P=n(146),E=n(95),O=n(35),T=O.get,I=O.set,L="ArrayBuffer",M="DataView",B="prototype",R="Wrong index",F=f[L],D=F,z=f[M],N=z&&z[B],U=Object.prototype,j=f.RangeError,W=S.pack,V=S.unpack;if(p){if(!v(function(){F(1)})||!v(function(){new F(-1)})||v(function(){return new F,new F(1.5),new F(NaN),F.name!=L})){for(var G,H=(D=function(t){return m(this,D),new F(x(t))})[B]=F[B],q=A(F),Z=0;q.length>Z;)(G=q[Z++])in D||g(D,G,F[G]);H.constructor=D}k&&_(N)!==U&&k(N,U);var X=new z(new D(2)),Y=N.setInt8;X.setInt8(0,2147483648),X.setInt8(1,2147483649),!X.getInt8(0)&&X.getInt8(1)||y(N,{setInt8:function(t,e){Y.call(this,t,e<<24>>24)},setUint8:function(t,e){Y.call(this,t,e<<24>>24)}},{unsafe:!0})}else D=function(t){m(this,D,L);var e=x(t);I(this,{bytes:P.call(new Array(e),0),byteLength:e}),d||(this.byteLength=e)},z=function(t,e,n){m(this,z,M),m(t,D,M);var r=T(t).byteLength,i=b(e);if(i<0||r<i)throw j("Wrong offset");if(r<i+(n=void 0===n?r-i:w(n)))throw j("Wrong length");I(this,{buffer:t,byteLength:n,byteOffset:i}),d||(this.buffer=t,this.byteLength=n,this.byteOffset=i)},d&&(u(D,"byteLength"),u(z,"buffer"),u(z,"byteLength"),u(z,"byteOffset")),y(z[B],{getInt8:function(t){return c(this,1,t)[0]<<24>>24},getUint8:function(t){return c(this,1,t)[0]},getInt16:function(t,e){var n=c(this,2,t,1<arguments.length?e:void 0);return(n[1]<<8|n[0])<<16>>16},getUint16:function(t,e){var n=c(this,2,t,1<arguments.length?e:void 0);return n[1]<<8|n[0]},getInt32:function(t,e){return a(c(this,4,t,1<arguments.length?e:void 0))},getUint32:function(t,e){return a(c(this,4,t,1<arguments.length?e:void 0))>>>0},getFloat32:function(t,e){return V(c(this,4,t,1<arguments.length?e:void 0),23)},getFloat64:function(t,e){return V(c(this,8,t,1<arguments.length?e:void 0),52)},setInt8:function(t,e){h(this,1,t,r,e)},setUint8:function(t,e){h(this,1,t,r,e)},setInt16:function(t,e,n){h(this,2,t,i,e,2<arguments.length?n:void 0)},setUint16:function(t,e,n){h(this,2,t,i,e,2<arguments.length?n:void 0)},setInt32:function(t,e,n){h(this,4,t,o,e,2<arguments.length?n:void 0)},setUint32:function(t,e,n){h(this,4,t,o,e,2<arguments.length?n:void 0)},setFloat32:function(t,e,n){h(this,4,t,s,e,2<arguments.length?n:void 0)},setFloat64:function(t,e,n){h(this,8,t,l,e,2<arguments.length?n:void 0)}});E(D,L),E(z,M),t.exports={ArrayBuffer:D,DataView:z}},function(t,e){t.exports=function(t,e,n){if(!(t instanceof e))throw TypeError("Incorrect "+(n?n+" ":"")+"invocation");return t}},function(t,e,n){"use strict";var r=n(36),i=n(15),o=n(6),a=n(11),s=o("species");t.exports=function(t){var e=r(t),n=i.f;a&&e&&!e[s]&&n(e,s,{configurable:!0,get:function(){return this}})}},function(t,e,n){var r=n(11),i=n(15).f,o=Function.prototype,a=o.toString,s=/^\s*function ([^ (]*)/;!r||"name"in o||i(o,"name",{configurable:!0,get:function(){try{return a.call(this).match(s)[1]}catch(t){return""}}})},function(t,e,n){function r(s){return function(t,e){var n,r,i=String(u(t)),o=l(e),a=i.length;return o<0||a<=o?s?"":void 0:(n=i.charCodeAt(o))<55296||56319<n||o+1===a||(r=i.charCodeAt(o+1))<56320||57343<r?s?i.charAt(o):n:s?i.slice(o,o+2):r-56320+(n-55296<<10)+65536}}var l=n(37),u=n(34);t.exports={codeAt:r(!1),charAt:r(!0)}},function(t,e,n){"use strict";var i=n(156).charAt,r=n(35),o=n(216),a="String Iterator",s=r.set,l=r.getterFor(a);o(String,"String",function(t){s(this,{type:a,string:String(t),index:0})},function(){var t,e=l(this),n=e.string,r=e.index;return r>=n.length?{value:void 0,done:!0}:(t=i(n,r),e.index+=t.length,{value:t,done:!1})})},function(t,e,n){"use strict";var r=n(159),h=n(16),f=n(8),i=n(34),d=n(160),p=n(161);r("match",1,function(r,u,c){return[function(t){var e=i(this),n=null==t?void 0:t[r];return void 0!==n?n.call(t,e):new RegExp(t)[r](String(e))},function(t){var e=c(u,t,this);if(e.done)return e.value;var n=h(t),r=String(this);if(!n.global)return p(n,r);for(var i,o=n.unicode,a=[],s=n.lastIndex=0;null!==(i=p(n,r));){var l=String(i[0]);""===(a[s]=l)&&(n.lastIndex=d(r,f(n.lastIndex),o)),s++}return 0===s?null:a}]})},function(t,e,n){"use strict";n(118);var h=n(24),f=n(4),d=n(6),p=n(119),g=n(18),y=d("species"),v=!f(function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")}),m="$0"==="a".replace(/./,"$0"),r=d("replace"),b=!!/./[r]&&""===/./[r]("a","$0"),w=!f(function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2!==n.length||"a"!==n[0]||"b"!==n[1]});t.exports=function(n,t,e,r){var o,i,a,s,l=d(n),u=!f(function(){var t={};return t[l]=function(){return 7},7!=""[n](t)}),c=u&&!f(function(){var t=!1,e=/a/;return"split"===n&&((e={constructor:{}}).constructor[y]=function(){return e},e.flags="",e[l]=/./[l]),e.exec=function(){return t=!0,null},e[l](""),!t});u&&c&&("replace"!==n||v&&m&&!b)&&("split"!==n||w)||(o=/./[l],a=(i=e(l,""[n],function(t,e,n,r,i){return e.exec===p?u&&!i?{done:!0,value:o.call(e,n,r)}:{done:!0,value:t.call(n,e,r)}:{done:!1}},{REPLACE_KEEPS_$0:m,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:b}))[0],s=i[1],h(String.prototype,n,a),h(RegExp.prototype,l,2==t?function(t,e){return s.call(t,this,e)}:function(t){return s.call(t,this)})),r&&g(RegExp.prototype[l],"sham",!0)}},function(t,e,n){"use strict";var r=n(156).charAt;t.exports=function(t,e,n){return e+(n?r(t,e).length:1)}},function(t,e,n){var i=n(30),o=n(119);t.exports=function(t,e){var n=t.exec;if("function"==typeof n){var r=n.call(t,e);if("object"!=typeof r)throw TypeError("RegExp exec method returned something other than an Object or null");return r}if("RegExp"!==i(t))throw TypeError("RegExp#exec called on incompatible receiver");return o.call(t,e)}},function(t,e,n){t.exports=r;var c=n(121).EventEmitter;function r(){c.call(this)}n(85)(r,c),r.Readable=n(163),r.Writable=n(346),r.Duplex=n(347),r.Transform=n(348),r.PassThrough=n(349),(r.Stream=r).prototype.pipe=function(e,t){var n=this;function r(t){e.writable&&!1===e.write(t)&&n.pause&&n.pause()}function i(){n.readable&&n.resume&&n.resume()}n.on("data",r),e.on("drain",i),e._isStdio||t&&!1===t.end||(n.on("end",a),n.on("close",s));var o=!1;function a(){o||(o=!0,e.end())}function s(){o||(o=!0,"function"==typeof e.destroy&&e.destroy())}function l(t){if(u(),0===c.listenerCount(this,"error"))throw t}function u(){n.removeListener("data",r),e.removeListener("drain",i),n.removeListener("end",a),n.removeListener("close",s),n.removeListener("error",l),e.removeListener("error",l),n.removeListener("end",u),n.removeListener("close",u),e.removeListener("close",u)}return n.on("error",l),e.on("error",l),n.on("end",u),n.on("close",u),e.on("close",u),e.emit("pipe",n),e}},function(t,e,n){(((e=t.exports=n(240)).Stream=e).Readable=e).Writable=n(164),e.Duplex=n(48),e.Transform=n(243),e.PassThrough=n(345)},function(S,t,_){"use strict";(function(t,e){var v=_(122);function h(t){var e=this;this.next=null,this.entry=null,this.finish=function(){!function(t,e,n){var r=t.entry;t.entry=null;for(;r;){var i=r.callback;e.pendingcb--,i(n),r=r.next}e.corkedRequestsFree?e.corkedRequestsFree.next=t:e.corkedRequestsFree=t}(e,t)}}S.exports=c;var s,l=!t.browser&&-1<["v0.10","v0.9."].indexOf(t.version.slice(0,5))?setImmediate:v.nextTick;c.WritableState=u;var n=Object.create(_(98));n.inherits=_(85);var r={deprecate:_(344)},i=_(241),m=_(123).Buffer,b=e.Uint8Array||function(){};var o,a=_(242);function w(){}function u(t,e){s=s||_(48),t=t||{};var n=e instanceof s;this.objectMode=!!t.objectMode,n&&(this.objectMode=this.objectMode||!!t.writableObjectMode);var r=t.highWaterMark,i=t.writableHighWaterMark,o=this.objectMode?16:16384;this.highWaterMark=r||0===r?r:n&&(i||0===i)?i:o,this.highWaterMark=Math.floor(this.highWaterMark),this.finalCalled=!1,this.needDrain=!1,this.ending=!1,this.ended=!1,this.finished=!1;var a=(this.destroyed=!1)===t.decodeStrings;this.decodeStrings=!a,this.defaultEncoding=t.defaultEncoding||"utf8",this.length=0,this.writing=!1,this.corked=0,this.sync=!0,this.bufferProcessing=!1,this.onwrite=function(t){!function(t,e){var n=t._writableState,r=n.sync,i=n.writecb;{var o;(function(t){t.writing=!1,t.writecb=null,t.length-=t.writelen,t.writelen=0})(n),e?function(t,e,n,r,i){--e.pendingcb,n?(v.nextTick(i,r),v.nextTick(y,t,e),t._writableState.errorEmitted=!0,t.emit("error",r)):(i(r),t._writableState.errorEmitted=!0,t.emit("error",r),y(t,e))}(t,n,r,e,i):((o=p(n))||n.corked||n.bufferProcessing||!n.bufferedRequest||d(t,n),r?l(f,t,n,o,i):f(t,n,o,i))}}(e,t)},this.writecb=null,this.writelen=0,this.bufferedRequest=null,this.lastBufferedRequest=null,this.pendingcb=0,this.prefinished=!1,this.errorEmitted=!1,this.bufferedRequestCount=0,this.corkedRequestsFree=new h(this)}function c(t){if(s=s||_(48),!(o.call(c,this)||this instanceof s))return new c(t);this._writableState=new u(t,this),this.writable=!0,t&&("function"==typeof t.write&&(this._write=t.write),"function"==typeof t.writev&&(this._writev=t.writev),"function"==typeof t.destroy&&(this._destroy=t.destroy),"function"==typeof t.final&&(this._final=t.final)),i.call(this)}function x(t,e,n,r,i,o,a){e.writelen=r,e.writecb=a,e.writing=!0,e.sync=!0,n?t._writev(i,e.onwrite):t._write(i,o,e.onwrite),e.sync=!1}function f(t,e,n,r){var i,o;n||(i=t,0===(o=e).length&&o.needDrain&&(o.needDrain=!1,i.emit("drain"))),e.pendingcb--,r(),y(t,e)}function d(t,e){e.bufferProcessing=!0;var n=e.bufferedRequest;if(t._writev&&n&&n.next){var r=e.bufferedRequestCount,i=new Array(r),o=e.corkedRequestsFree;o.entry=n;for(var a=0,s=!0;n;)(i[a]=n).isBuf||(s=!1),n=n.next,a+=1;i.allBuffers=s,x(t,e,!0,e.length,i,"",o.finish),e.pendingcb++,e.lastBufferedRequest=null,o.next?(e.corkedRequestsFree=o.next,o.next=null):e.corkedRequestsFree=new h(e),e.bufferedRequestCount=0}else{for(;n;){var l=n.chunk,u=n.encoding,c=n.callback;if(x(t,e,!1,e.objectMode?1:l.length,l,u,c),n=n.next,e.bufferedRequestCount--,e.writing)break}null===n&&(e.lastBufferedRequest=null)}e.bufferedRequest=n,e.bufferProcessing=!1}function p(t){return t.ending&&0===t.length&&null===t.bufferedRequest&&!t.finished&&!t.writing}function g(e,n){e._final(function(t){n.pendingcb--,t&&e.emit("error",t),n.prefinished=!0,e.emit("prefinish"),y(e,n)})}function y(t,e){var n,r,i=p(e);return i&&(n=t,(r=e).prefinished||r.finalCalled||("function"==typeof n._final?(r.pendingcb++,r.finalCalled=!0,v.nextTick(g,n,r)):(r.prefinished=!0,n.emit("prefinish"))),0===e.pendingcb&&(e.finished=!0,t.emit("finish"))),i}n.inherits(c,i),u.prototype.getBuffer=function(){for(var t=this.bufferedRequest,e=[];t;)e.push(t),t=t.next;return e},function(){try{Object.defineProperty(u.prototype,"buffer",{get:r.deprecate(function(){return this.getBuffer()},"_writableState.buffer is deprecated. Use _writableState.getBuffer instead.","DEP0003")})}catch(t){}}(),"function"==typeof Symbol&&Symbol.hasInstance&&"function"==typeof Function.prototype[Symbol.hasInstance]?(o=Function.prototype[Symbol.hasInstance],Object.defineProperty(c,Symbol.hasInstance,{value:function(t){return!!o.call(this,t)||this===c&&(t&&t._writableState instanceof u)}})):o=function(t){return t instanceof this},c.prototype.pipe=function(){this.emit("error",new Error("Cannot pipe, not readable"))},c.prototype.write=function(t,e,n){var r,i,o,a,s,l,u,c,h,f,d,p=this._writableState,g=!1,y=!p.objectMode&&(r=t,m.isBuffer(r)||r instanceof b);return y&&!m.isBuffer(t)&&(i=t,t=m.from(i)),"function"==typeof e&&(n=e,e=null),e=y?"buffer":e||p.defaultEncoding,"function"!=typeof n&&(n=w),p.ended?(h=this,f=n,d=new Error("write after end"),h.emit("error",d),v.nextTick(f,d)):(y||(o=this,a=p,l=n,c=!(u=!0),null===(s=t)?c=new TypeError("May not write null values to stream"):"string"==typeof s||void 0===s||a.objectMode||(c=new TypeError("Invalid non-string/buffer chunk")),c&&(o.emit("error",c),v.nextTick(l,c),u=!1),u))&&(p.pendingcb++,g=function(t,e,n,r,i,o){{var a;n||(a=function(t,e,n){t.objectMode||!1===t.decodeStrings||"string"!=typeof e||(e=m.from(e,n));return e}(e,r,i),r!==a&&(n=!0,i="buffer",r=a))}var s=e.objectMode?1:r.length;e.length+=s;var l=e.length<e.highWaterMark;l||(e.needDrain=!0);{var u;e.writing||e.corked?(u=e.lastBufferedRequest,e.lastBufferedRequest={chunk:r,encoding:i,isBuf:n,callback:o,next:null},u?u.next=e.lastBufferedRequest:e.bufferedRequest=e.lastBufferedRequest,e.bufferedRequestCount+=1):x(t,e,!1,s,r,i,o)}return l}(this,p,y,t,e,n)),g},c.prototype.cork=function(){this._writableState.corked++},c.prototype.uncork=function(){var t=this._writableState;t.corked&&(t.corked--,t.writing||t.corked||t.finished||t.bufferProcessing||!t.bufferedRequest||d(this,t))},c.prototype.setDefaultEncoding=function(t){if("string"==typeof t&&(t=t.toLowerCase()),!(-1<["hex","utf8","utf-8","ascii","binary","base64","ucs2","ucs-2","utf16le","utf-16le","raw"].indexOf((t+"").toLowerCase())))throw new TypeError("Unknown encoding: "+t);return this._writableState.defaultEncoding=t,this},Object.defineProperty(c.prototype,"writableHighWaterMark",{enumerable:!1,get:function(){return this._writableState.highWaterMark}}),c.prototype._write=function(t,e,n){n(new Error("_write() is not implemented"))},c.prototype._writev=null,c.prototype.end=function(t,e,n){var r=this._writableState;"function"==typeof t?(n=t,e=t=null):"function"==typeof e&&(n=e,e=null),null!=t&&this.write(t,e),r.corked&&(r.corked=1,this.uncork()),r.ending||r.finished||function(t,e,n){e.ending=!0,y(t,e),n&&(e.finished?v.nextTick(n):t.once("finish",n));e.ended=!0,t.writable=!1}(this,r,n)},Object.defineProperty(c.prototype,"destroyed",{get:function(){return void 0!==this._writableState&&this._writableState.destroyed},set:function(t){this._writableState&&(this._writableState.destroyed=t)}}),c.prototype.destroy=a.destroy,c.prototype._undestroy=a.undestroy,c.prototype._destroy=function(t,e){this.end(),e(t)}}).call(this,_(47),_(26))},function(t,e,n){"use strict";var r=n(123).Buffer,i=r.isEncoding||function(t){switch((t=""+t)&&t.toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":case"raw":return!0;default:return!1}};function o(t){var e=function(t){if(!t)return"utf8";for(var e;;)switch(t){case"utf8":case"utf-8":return"utf8";case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return"utf16le";case"latin1":case"binary":return"latin1";case"base64":case"ascii":case"hex":return t;default:if(e)return;t=(""+t).toLowerCase(),e=!0}}(t);if("string"!=typeof e&&(r.isEncoding===i||!i(t)))throw new Error("Unknown encoding: "+t);return e||t}function a(t){var e;switch(this.encoding=o(t),this.encoding){case"utf16le":this.text=u,this.end=c,e=4;break;case"utf8":this.fillLast=l,e=4;break;case"base64":this.text=h,this.end=f,e=3;break;default:return this.write=d,void(this.end=p)}this.lastNeed=0,this.lastTotal=0,this.lastChar=r.allocUnsafe(e)}function s(t){return t<=127?0:t>>5==6?2:t>>4==14?3:t>>3==30?4:t>>6==2?-1:-2}function l(t){var e=this.lastTotal-this.lastNeed,n=function(t,e){if(128!=(192&e[0]))return t.lastNeed=0,"ï¿½";if(1<t.lastNeed&&1<e.length){if(128!=(192&e[1]))return t.lastNeed=1,"ï¿½";if(2<t.lastNeed&&2<e.length&&128!=(192&e[2]))return t.lastNeed=2,"ï¿½"}}(this,t);return void 0!==n?n:this.lastNeed<=t.length?(t.copy(this.lastChar,e,0,this.lastNeed),this.lastChar.toString(this.encoding,0,this.lastTotal)):(t.copy(this.lastChar,e,0,t.length),void(this.lastNeed-=t.length))}function u(t,e){if((t.length-e)%2!=0)return this.lastNeed=1,this.lastTotal=2,this.lastChar[0]=t[t.length-1],t.toString("utf16le",e,t.length-1);var n=t.toString("utf16le",e);if(n){var r=n.charCodeAt(n.length-1);if(55296<=r&&r<=56319)return this.lastNeed=2,this.lastTotal=4,this.lastChar[0]=t[t.length-2],this.lastChar[1]=t[t.length-1],n.slice(0,-1)}return n}function c(t){var e=t&&t.length?this.write(t):"";if(this.lastNeed){var n=this.lastTotal-this.lastNeed;return e+this.lastChar.toString("utf16le",0,n)}return e}function h(t,e){var n=(t.length-e)%3;return 0==n?t.toString("base64",e):(this.lastNeed=3-n,this.lastTotal=3,1==n?this.lastChar[0]=t[t.length-1]:(this.lastChar[0]=t[t.length-2],this.lastChar[1]=t[t.length-1]),t.toString("base64",e,t.length-n))}function f(t){var e=t&&t.length?this.write(t):"";return this.lastNeed?e+this.lastChar.toString("base64",0,3-this.lastNeed):e}function d(t){return t.toString(this.encoding)}function p(t){return t&&t.length?this.write(t):""}(e.StringDecoder=a).prototype.write=function(t){if(0===t.length)return"";var e,n;if(this.lastNeed){if(void 0===(e=this.fillLast(t)))return"";n=this.lastNeed,this.lastNeed=0}else n=0;return n<t.length?e?e+this.text(t,n):this.text(t,n):e||""},a.prototype.end=function(t){var e=t&&t.length?this.write(t):"";return this.lastNeed?e+"ï¿½":e},a.prototype.text=function(t,e){var n=function(t,e,n){var r=e.length-1;if(r<n)return 0;var i=s(e[r]);if(0<=i)return 0<i&&(t.lastNeed=i-1),i;if(--r<n||-2===i)return 0;if(0<=(i=s(e[r])))return 0<i&&(t.lastNeed=i-2),i;if(--r<n||-2===i)return 0;if(0<=(i=s(e[r])))return 0<i&&(2===i?i=0:t.lastNeed=i-3),i;return 0}(this,t,e);if(!this.lastNeed)return t.toString("utf8",e);this.lastTotal=n;var r=t.length-(n-this.lastNeed);return t.copy(this.lastChar,0,r),t.toString("utf8",e,r)},a.prototype.fillLast=function(t){if(this.lastNeed<=t.length)return t.copy(this.lastChar,this.lastTotal-this.lastNeed,0,this.lastNeed),this.lastChar.toString(this.encoding,0,this.lastTotal);t.copy(this.lastChar,this.lastTotal-this.lastNeed,0,t.length),this.lastNeed-=t.length}},function(t,P,E){(function(a){var e=Object.getOwnPropertyDescriptors||function(t){for(var e=Object.keys(t),n={},r=0;r<e.length;r++)n[e[r]]=Object.getOwnPropertyDescriptor(t,e[r]);return n},s=/%[sdj%]/g;P.format=function(t){if(!w(t)){for(var e=[],n=0;n<arguments.length;n++)e.push(l(arguments[n]));return e.join(" ")}for(var n=1,r=arguments,i=r.length,o=String(t).replace(s,function(t){if("%%"===t)return"%";if(i<=n)return t;switch(t){case"%s":return String(r[n++]);case"%d":return Number(r[n++]);case"%j":try{return JSON.stringify(r[n++])}catch(t){return"[Circular]"}default:return t}}),a=r[n];n<i;a=r[++n])m(a)||!u(a)?o+=" "+a:o+=" "+l(a);return o},P.deprecate=function(t,e){if(void 0!==a&&!0===a.noDeprecation)return t;if(void 0===a)return function(){return P.deprecate(t,e).apply(this,arguments)};var n=!1;return function(){if(!n){if(a.throwDeprecation)throw new Error(e);a.traceDeprecation,n=!0}return t.apply(this,arguments)}};var n,r={};function l(t,e){var n={seen:[],stylize:o};return 3<=arguments.length&&(n.depth=arguments[2]),4<=arguments.length&&(n.colors=arguments[3]),v(e)?n.showHidden=e:e&&P._extend(n,e),x(n.showHidden)&&(n.showHidden=!1),x(n.depth)&&(n.depth=2),x(n.colors)&&(n.colors=!1),x(n.customInspect)&&(n.customInspect=!0),n.colors&&(n.stylize=i),d(n,t,n.depth)}function i(t,e){var n=l.styles[e];return n?"["+l.colors[n][0]+"m"+t+"["+l.colors[n][1]+"m":t}function o(t,e){return t}function d(e,n,r){if(e.customInspect&&n&&A(n.inspect)&&n.inspect!==P.inspect&&(!n.constructor||n.constructor.prototype!==n)){var t=n.inspect(r,e);return w(t)||(t=d(e,t,r)),t}var i=function(t,e){if(x(e))return t.stylize("undefined","undefined");if(w(e)){var n="'"+JSON.stringify(e).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return t.stylize(n,"string")}if(b(e))return t.stylize(""+e,"number");if(v(e))return t.stylize(""+e,"boolean");if(m(e))return t.stylize("null","null")}(e,n);if(i)return i;var o,a=Object.keys(n),s=(o={},a.forEach(function(t,e){o[t]=!0}),o);if(e.showHidden&&(a=Object.getOwnPropertyNames(n)),k(n)&&(0<=a.indexOf("message")||0<=a.indexOf("description")))return p(n);if(0===a.length){if(A(n)){var l=n.name?": "+n.name:"";return e.stylize("[Function"+l+"]","special")}if(S(n))return e.stylize(RegExp.prototype.toString.call(n),"regexp");if(_(n))return e.stylize(Date.prototype.toString.call(n),"date");if(k(n))return p(n)}var u,c="",h=!1,f=["{","}"];return y(n)&&(h=!0,f=["[","]"]),A(n)&&(c=" [Function"+(n.name?": "+n.name:"")+"]"),S(n)&&(c=" "+RegExp.prototype.toString.call(n)),_(n)&&(c=" "+Date.prototype.toUTCString.call(n)),k(n)&&(c=" "+p(n)),0!==a.length||h&&0!=n.length?r<0?S(n)?e.stylize(RegExp.prototype.toString.call(n),"regexp"):e.stylize("[Object]","special"):(e.seen.push(n),u=h?function(e,n,r,i,t){for(var o=[],a=0,s=n.length;a<s;++a)C(n,String(a))?o.push(g(e,n,r,i,String(a),!0)):o.push("");return t.forEach(function(t){t.match(/^\d+$/)||o.push(g(e,n,r,i,t,!0))}),o}(e,n,r,s,a):a.map(function(t){return g(e,n,r,s,t,h)}),e.seen.pop(),function(t,e,n){if(60<t.reduce(function(t,e){return 0<=e.indexOf("\n")&&0,t+e.replace(/\u001b\[\d\d?m/g,"").length+1},0))return n[0]+(""===e?"":e+"\n ")+" "+t.join(",\n  ")+" "+n[1];return n[0]+e+" "+t.join(", ")+" "+n[1]}(u,c,f)):f[0]+c+f[1]}function p(t){return"["+Error.prototype.toString.call(t)+"]"}function g(t,e,n,r,i,o){var a,s,l=Object.getOwnPropertyDescriptor(e,i)||{value:e[i]};if(l.get?s=l.set?t.stylize("[Getter/Setter]","special"):t.stylize("[Getter]","special"):l.set&&(s=t.stylize("[Setter]","special")),C(r,i)||(a="["+i+"]"),s||(t.seen.indexOf(l.value)<0?-1<(s=m(n)?d(t,l.value,null):d(t,l.value,n-1)).indexOf("\n")&&(s=o?s.split("\n").map(function(t){return"  "+t}).join("\n").substr(2):"\n"+s.split("\n").map(function(t){return"   "+t}).join("\n")):s=t.stylize("[Circular]","special")),x(a)){if(o&&i.match(/^\d+$/))return s;a=(a=JSON.stringify(""+i)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)?(a=a.substr(1,a.length-2),t.stylize(a,"name")):(a=a.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'"),t.stylize(a,"string"))}return a+": "+s}function y(t){return Array.isArray(t)}function v(t){return"boolean"==typeof t}function m(t){return null===t}function b(t){return"number"==typeof t}function w(t){return"string"==typeof t}function x(t){return void 0===t}function S(t){return u(t)&&"[object RegExp]"===c(t)}function u(t){return"object"==typeof t&&null!==t}function _(t){return u(t)&&"[object Date]"===c(t)}function k(t){return u(t)&&("[object Error]"===c(t)||t instanceof Error)}function A(t){return"function"==typeof t}function c(t){return Object.prototype.toString.call(t)}P.debuglog=function(t){return x(n)&&(n=a.env.NODE_DEBUG||""),t=t.toUpperCase(),r[t]||(new RegExp("\\b"+t+"\\b","i").test(n)?(a.pid,r[t]=function(){P.format.apply(P,arguments)}):r[t]=function(){}),r[t]},(P.inspect=l).colors={bold:[1,22],italic:[3,23],underline:[4,24],inverse:[7,27],white:[37,39],grey:[90,39],black:[30,39],blue:[34,39],cyan:[36,39],green:[32,39],magenta:[35,39],red:[31,39],yellow:[33,39]},l.styles={special:"cyan",number:"yellow",boolean:"yellow",undefined:"grey",null:"bold",string:"green",date:"magenta",regexp:"red"},P.isArray=y,P.isBoolean=v,P.isNull=m,P.isNullOrUndefined=function(t){return null==t},P.isNumber=b,P.isString=w,P.isSymbol=function(t){return"symbol"==typeof t},P.isUndefined=x,P.isRegExp=S,P.isObject=u,P.isDate=_,P.isError=k,P.isFunction=A,P.isPrimitive=function(t){return null===t||"boolean"==typeof t||"number"==typeof t||"string"==typeof t||"symbol"==typeof t||void 0===t},P.isBuffer=E(352);function C(t,e){return Object.prototype.hasOwnProperty.call(t,e)}P.log=function(){},P.inherits=E(353),P._extend=function(t,e){if(!e||!u(e))return t;for(var n=Object.keys(e),r=n.length;r--;)t[n[r]]=e[n[r]];return t};var h="undefined"!=typeof Symbol?Symbol("util.promisify.custom"):void 0;function f(t,e){var n;return t||((n=new Error("Promise was rejected with a falsy value")).reason=t,t=n),e(t)}P.promisify=function(o){if("function"!=typeof o)throw new TypeError('The "original" argument must be of type Function');if(h&&o[h]){var t;if("function"!=typeof(t=o[h]))throw new TypeError('The "util.promisify.custom" argument must be of type Function');return Object.defineProperty(t,h,{value:t,enumerable:!1,writable:!1,configurable:!0}),t}function t(){for(var n,r,t=new Promise(function(t,e){n=t,r=e}),e=[],i=0;i<arguments.length;i++)e.push(arguments[i]);e.push(function(t,e){t?r(t):n(e)});try{o.apply(this,e)}catch(t){r(t)}return t}return Object.setPrototypeOf(t,Object.getPrototypeOf(o)),h&&Object.defineProperty(t,h,{value:t,enumerable:!1,writable:!1,configurable:!0}),Object.defineProperties(t,e(o))},P.promisify.custom=h,P.callbackify=function(o){if("function"!=typeof o)throw new TypeError('The "original" argument must be of type Function');function t(){for(var t=[],e=0;e<arguments.length;e++)t.push(arguments[e]);var n=t.pop();if("function"!=typeof n)throw new TypeError("The last argument must be of type Function");function r(){return n.apply(i,arguments)}var i=this;o.apply(this,t).then(function(t){a.nextTick(r,null,t)},function(t){a.nextTick(f,t,r)})}return Object.setPrototypeOf(t,Object.getPrototypeOf(o)),Object.defineProperties(t,e(o)),t}}).call(this,E(47))},function(t,e,n){var a;t.exports=(a=n(2),function(){var t=a,e=t.lib,n=e.WordArray,r=e.Hasher,i=t.algo,h=[],o=i.SHA1=r.extend({_doReset:function(){this._hash=new n.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(t,e){for(var n,r=this._hash.words,i=r[0],o=r[1],a=r[2],s=r[3],l=r[4],u=0;u<80;u++){u<16?h[u]=0|t[e+u]:(n=h[u-3]^h[u-8]^h[u-14]^h[u-16],h[u]=n<<1|n>>>31);var c=(i<<5|i>>>27)+l+h[u];c+=u<20?1518500249+(o&a|~o&s):u<40?1859775393+(o^a^s):u<60?(o&a|o&s|a&s)-1894007588:(o^a^s)-899497514,l=s,s=a,a=o<<30|o>>>2,o=i,i=c}r[0]=r[0]+i|0,r[1]=r[1]+o|0,r[2]=r[2]+a|0,r[3]=r[3]+s|0,r[4]=r[4]+l|0},_doFinalize:function(){var t=this._data,e=t.words,n=8*this._nDataBytes,r=8*t.sigBytes;return e[r>>>5]|=128<<24-r%32,e[14+(64+r>>>9<<4)]=Math.floor(n/4294967296),e[15+(64+r>>>9<<4)]=n,t.sigBytes=4*e.length,this._process(),this._hash},clone:function(){var t=r.clone.call(this);return t._hash=this._hash.clone(),t}});t.SHA1=r._createHelper(o),t.HmacSHA1=r._createHmacHelper(o)}(),a.SHA1)},function(t,e,n){var r;t.exports=(r=n(2),void function(){var t=r.lib.Base,u=r.enc.Utf8;r.algo.HMAC=t.extend({init:function(t,e){t=this._hasher=new t.init,"string"==typeof e&&(e=u.parse(e));var n=t.blockSize,r=4*n;e.sigBytes>r&&(e=t.finalize(e)),e.clamp();for(var i=this._oKey=e.clone(),o=this._iKey=e.clone(),a=i.words,s=o.words,l=0;l<n;l++)a[l]^=1549556828,s[l]^=909522486;i.sigBytes=o.sigBytes=r,this.reset()},reset:function(){var t=this._hasher;t.reset(),t.update(this._iKey)},update:function(t){return this._hasher.update(t),this},finalize:function(t){var e=this._hasher,n=e.finalize(t);return e.reset(),e.finalize(this._oKey.clone().concat(n))}})}())},function(e,t,n){(function(l){(function(){var t,s;try{s=n(170)}catch(t){}t=function(){var t;function r(t){this.buffer=t,this.pos=0,this.length=this.buffer.length}for(t in r.TYPES={UInt8:1,UInt16:2,UInt24:3,UInt32:4,Int8:1,Int16:2,Int24:3,Int32:4,Float:4,Double:8},l.prototype)"read"===t.slice(0,4)&&function(e){var n=r.TYPES[e.replace(/read|[BL]E/g,"")];r.prototype[e]=function(){var t=this.buffer[e](this.pos);return this.pos+=n,t}}(t);return r.prototype.readString=function(t,e){var n,r,i,o,a;switch(null==e&&(e="ascii"),e){case"utf16le":case"ucs2":case"utf8":case"ascii":return this.buffer.toString(e,this.pos,this.pos+=t);case"utf16be":for(i=o=0,a=(n=new l(this.readBuffer(t))).length-1;o<a;i=o+=2)r=n[i],n[i]=n[i+1],n[i+1]=r;return n.toString("utf16le");default:if(n=this.readBuffer(t),s)try{return s.decode(n,e)}catch(t){}return n}},r.prototype.readBuffer=function(t){return this.buffer.slice(this.pos,this.pos+=t)},r.prototype.readUInt24BE=function(){return(this.readUInt16BE()<<8)+this.readUInt8()},r.prototype.readUInt24LE=function(){return this.readUInt16LE()+(this.readUInt8()<<16)},r.prototype.readInt24BE=function(){return(this.readInt16BE()<<8)+this.readUInt8()},r.prototype.readInt24LE=function(){return this.readUInt16LE()+(this.readInt8()<<16)},r}(),e.exports=t}).call(this)}).call(this,n(10).Buffer)},function(t,e,a){"use strict";var n,s=a(39).Buffer,i=a(389),l=t.exports;l.encodings=null,l.defaultCharUnicode="ï¿½",l.defaultCharSingleByte="?",l.encode=function(t,e,n){t=""+(t||"");var r=l.getEncoder(e,n),i=r.write(t),o=r.end();return o&&0<o.length?s.concat([i,o]):i},l.decode=function(t,e,n){"string"==typeof t&&(l.skipDecodeWarning||(l.skipDecodeWarning=!0),t=s.from(""+(t||""),"binary"));var r=l.getDecoder(e,n),i=r.write(t),o=r.end();return o?i+o:i},l.encodingExists=function(t){try{return l.getCodec(t),!0}catch(t){return!1}},l.toEncoding=l.encode,l.fromEncoding=l.decode,l._codecDataCache={},l.getCodec=function(t){l.encodings||(l.encodings=a(390));for(var e=l._canonicalizeEncoding(t),n={};;){var r=l._codecDataCache[e];if(r)return r;var i=l.encodings[e];switch(typeof i){case"string":e=i;break;case"object":for(var o in i)n[o]=i[o];n.encodingName||(n.encodingName=e),e=i.type;break;case"function":return n.encodingName||(n.encodingName=e),r=new i(n,l),l._codecDataCache[n.encodingName]=r;default:throw new Error("Encoding not recognized: '"+t+"' (searched as: '"+e+"')")}}},l._canonicalizeEncoding=function(t){return(""+t).toLowerCase().replace(/:\d{4}$|[^0-9a-z]/g,"")},l.getEncoder=function(t,e){var n=l.getCodec(t),r=new n.encoder(e,n);return n.bomAware&&e&&e.addBOM&&(r=new i.PrependBOM(r,e)),r},l.getDecoder=function(t,e){var n=l.getCodec(t),r=new n.decoder(e,n);return!n.bomAware||e&&!1===e.stripBOM||(r=new i.StripBOM(r,e)),r},l.enableStreamingAPI=function(t){var e;l.supportsStreams||(e=a(405)(t),l.IconvLiteEncoderStream=e.IconvLiteEncoderStream,l.IconvLiteDecoderStream=e.IconvLiteDecoderStream,l.encodeStream=function(t,e){return new l.IconvLiteEncoderStream(l.getEncoder(t,e),e)},l.decodeStream=function(t,e){return new l.IconvLiteDecoderStream(l.getDecoder(t,e),e)},l.supportsStreams=!0)};try{n=a(406)}catch(t){}n&&n.Transform?l.enableStreamingAPI(n):l.encodeStream=l.decodeStream=function(){throw new Error("iconv-lite Streaming API is not enabled. Use iconv.enableStreamingAPI(require('stream')); to enable it.")}},function(t){t.exports=JSON.parse('[["0","\\u0000",127,"â‚¬"],["8140","ä¸‚ä¸„ä¸…ä¸†ä¸ä¸’ä¸—ä¸Ÿä¸ ä¸¡ä¸£ä¸¦ä¸©ä¸®ä¸¯ä¸±ä¸³ä¸µä¸·ä¸¼ä¹€ä¹ä¹‚ä¹„ä¹†ä¹Šä¹‘ä¹•ä¹—ä¹šä¹›ä¹¢ä¹£ä¹¤ä¹¥ä¹§ä¹¨ä¹ª",5,"ä¹²ä¹´",9,"ä¹¿",6,"äº‡äºŠ"],["8180","äºäº–äº—äº™äºœäºäºžäº£äºªäº¯äº°äº±äº´äº¶äº·äº¸äº¹äº¼äº½äº¾ä»ˆä»Œä»ä»ä»’ä»šä»›ä»œä» ä»¢ä»¦ä»§ä»©ä»­ä»®ä»¯ä»±ä»´ä»¸ä»¹ä»ºä»¼ä»¾ä¼€ä¼‚",6,"ä¼‹ä¼Œä¼’",4,"ä¼œä¼ä¼¡ä¼£ä¼¨ä¼©ä¼¬ä¼­ä¼®ä¼±ä¼³ä¼µä¼·ä¼¹ä¼»ä¼¾",4,"ä½„ä½…ä½‡",5,"ä½’ä½”ä½–ä½¡ä½¢ä½¦ä½¨ä½ªä½«ä½­ä½®ä½±ä½²ä½µä½·ä½¸ä½¹ä½ºä½½ä¾€ä¾ä¾‚ä¾…ä¾†ä¾‡ä¾Šä¾Œä¾Žä¾ä¾’ä¾“ä¾•ä¾–ä¾˜ä¾™ä¾šä¾œä¾žä¾Ÿä¾¡ä¾¢"],["8240","ä¾¤ä¾«ä¾­ä¾°",4,"ä¾¶",8,"ä¿€ä¿ä¿‚ä¿†ä¿‡ä¿ˆä¿‰ä¿‹ä¿Œä¿ä¿’",4,"ä¿™ä¿›ä¿ ä¿¢ä¿¤ä¿¥ä¿§ä¿«ä¿¬ä¿°ä¿²ä¿´ä¿µä¿¶ä¿·ä¿¹ä¿»ä¿¼ä¿½ä¿¿",11],["8280","å€‹å€Žå€å€‘å€“å€•å€–å€—å€›å€å€žå€ å€¢å€£å€¤å€§å€«å€¯",10,"å€»å€½å€¿å€åå‚å„å…å†å‰åŠå‹åå",4,"å–å—å˜å™å›å",7,"å¦",5,"å­",8,"å¸å¹åºå¼å½å‚å‚‚å‚ƒå‚„å‚†å‚‡å‚‰å‚Šå‚‹å‚Œå‚Ž",20,"å‚¤å‚¦å‚ªå‚«å‚­",4,"å‚³",6,"å‚¼"],["8340","å‚½",17,"åƒ",5,"åƒ—åƒ˜åƒ™åƒ›",10,"åƒ¨åƒ©åƒªåƒ«åƒ¯åƒ°åƒ±åƒ²åƒ´åƒ¶",4,"åƒ¼",9,"å„ˆ"],["8380","å„‰å„Šå„Œ",5,"å„“",13,"å„¢",28,"å…‚å…‡å…Šå…Œå…Žå…å…å…’å…“å…—å…˜å…™å…›å…",4,"å…£å…¤å…¦å…§å…©å…ªå…¯å…²å…ºå…¾å…¿å†ƒå†„å††å†‡å†Šå†‹å†Žå†å†å†‘å†“å†”å†˜å†šå†å†žå†Ÿå†¡å†£å†¦",4,"å†­å†®å†´å†¸å†¹å†ºå†¾å†¿å‡å‡‚å‡ƒå‡…å‡ˆå‡Šå‡å‡Žå‡å‡’",5],["8440","å‡˜å‡™å‡šå‡œå‡žå‡Ÿå‡¢å‡£å‡¥",5,"å‡¬å‡®å‡±å‡²å‡´å‡·å‡¾åˆ„åˆ…åˆ‰åˆ‹åˆŒåˆåˆåˆ“åˆ”åˆ•åˆœåˆžåˆŸåˆ¡åˆ¢åˆ£åˆ¥åˆ¦åˆ§åˆªåˆ¬åˆ¯åˆ±åˆ²åˆ´åˆµåˆ¼åˆ¾å‰„",5,"å‰‹å‰Žå‰å‰’å‰“å‰•å‰—å‰˜"],["8480","å‰™å‰šå‰›å‰å‰Ÿå‰ å‰¢å‰£å‰¤å‰¦å‰¨å‰«å‰¬å‰­å‰®å‰°å‰±å‰³",9,"å‰¾åŠ€åŠƒ",4,"åŠ‰",6,"åŠ‘åŠ’åŠ”",6,"åŠœåŠ¤åŠ¥åŠ¦åŠ§åŠ®åŠ¯åŠ°åŠ´",9,"å‹€å‹å‹‚å‹„å‹…å‹†å‹ˆå‹Šå‹Œå‹å‹Žå‹å‹‘å‹“å‹”å‹•å‹—å‹™",5,"å‹ å‹¡å‹¢å‹£å‹¥",10,"å‹±",7,"å‹»å‹¼å‹½åŒåŒ‚åŒƒåŒ„åŒ‡åŒ‰åŒŠåŒ‹åŒŒåŒŽ"],["8540","åŒ‘åŒ’åŒ“åŒ”åŒ˜åŒ›åŒœåŒžåŒŸåŒ¢åŒ¤åŒ¥åŒ§åŒ¨åŒ©åŒ«åŒ¬åŒ­åŒ¯",9,"åŒ¼åŒ½å€å‚å„å†å‹åŒååå”å˜å™å›åå¥å¨åªå¬å­å²å¶å¹å»å¼å½å¾åŽ€åŽåŽƒåŽ‡åŽˆåŽŠåŽŽåŽ"],["8580","åŽ",4,"åŽ–åŽ—åŽ™åŽ›åŽœåŽžåŽ åŽ¡åŽ¤åŽ§åŽªåŽ«åŽ¬åŽ­åŽ¯",6,"åŽ·åŽ¸åŽ¹åŽºåŽ¼åŽ½åŽ¾å€åƒ",4,"åŽååå’å“å•åšåœååžå¡å¢å§å´åºå¾å¿å€å‚å…å‡å‹å”å˜å™åšåœå¢å¤å¥åªå°å³å¶å·åºå½å¿å‘å‘‚å‘„å‘…å‘‡å‘‰å‘Œå‘å‘Žå‘å‘‘å‘šå‘",4,"å‘£å‘¥å‘§å‘©",7,"å‘´å‘¹å‘ºå‘¾å‘¿å’å’ƒå’…å’‡å’ˆå’‰å’Šå’å’‘å’“å’—å’˜å’œå’žå’Ÿå’ å’¡"],["8640","å’¢å’¥å’®å’°å’²å’µå’¶å’·å’¹å’ºå’¼å’¾å“ƒå“…å“Šå“‹å“–å“˜å“›å“ ",4,"å“«å“¬å“¯å“°å“±å“´",5,"å“»å“¾å”€å”‚å”ƒå”„å”…å”ˆå”Š",4,"å”’å”“å”•",5,"å”œå”å”žå”Ÿå”¡å”¥å”¦"],["8680","å”¨å”©å”«å”­å”²å”´å”µå”¶å”¸å”¹å”ºå”»å”½å•€å•‚å•…å•‡å•ˆå•‹",4,"å•‘å•’å•“å•”å•—",4,"å•å•žå•Ÿå• å•¢å•£å•¨å•©å•«å•¯",5,"å•¹å•ºå•½å•¿å–…å–†å–Œå–å–Žå–å–’å–“å–•å––å–—å–šå–›å–žå– ",6,"å–¨",8,"å–²å–´å–¶å–¸å–ºå–¼å–¿",4,"å—†å—‡å—ˆå—Šå—‹å—Žå—å—å—•å——",4,"å—žå— å—¢å—§å—©å—­å—®å—°å—±å—´å—¶å—¸",4,"å—¿å˜‚å˜ƒå˜„å˜…"],["8740","å˜†å˜‡å˜Šå˜‹å˜å˜",7,"å˜™å˜šå˜œå˜å˜ å˜¡å˜¢å˜¥å˜¦å˜¨å˜©å˜ªå˜«å˜®å˜¯å˜°å˜³å˜µå˜·å˜¸å˜ºå˜¼å˜½å˜¾å™€",11,"å™",4,"å™•å™–å™šå™›å™",4],["8780","å™£å™¥å™¦å™§å™­å™®å™¯å™°å™²å™³å™´å™µå™·å™¸å™¹å™ºå™½",7,"åš‡",6,"åšåš‘åš’åš”",14,"åš¤",10,"åš°",6,"åš¸åš¹åšºåš»åš½",12,"å›‹",8,"å›•å›–å›˜å›™å›œå›£å›¥",5,"å›¬å›®å›¯å›²å›³å›¶å›·å›¸å›»å›¼åœ€åœåœ‚åœ…åœ‡åœ‹",6],["8840","åœ’",9,"åœåœžåœ åœ¡åœ¢åœ¤åœ¥åœ¦åœ§åœ«åœ±åœ²åœ´",4,"åœ¼åœ½åœ¿ååƒå„å…å†åˆå‰å‹å’",4,"å˜å™å¢å£å¥å§å¬å®å°å±å²å´åµå¸å¹åºå½å¾å¿åž€"],["8880","åžåž‡åžˆåž‰åžŠåž",4,"åž”",6,"åžœåžåžžåžŸåž¥åž¨åžªåž¬åž¯åž°åž±åž³åžµåž¶åž·åž¹",8,"åŸ„",6,"åŸŒåŸåŸåŸ‘åŸ“åŸ–åŸ—åŸ›åŸœåŸžåŸ¡åŸ¢åŸ£åŸ¥",7,"åŸ®åŸ°åŸ±åŸ²åŸ³åŸµåŸ¶åŸ·åŸ»åŸ¼åŸ¾åŸ¿å å ƒå „å …å ˆå ‰å Šå Œå Žå å å ’å “å ”å –å —å ˜å šå ›å œå å Ÿå ¢å £å ¥",4,"å «",4,"å ±å ²å ³å ´å ¶",7],["8940","å ¾",5,"å¡…",6,"å¡Žå¡å¡å¡’å¡“å¡•å¡–å¡—å¡™",4,"å¡Ÿ",5,"å¡¦",4,"å¡­",16,"å¡¿å¢‚å¢„å¢†å¢‡å¢ˆå¢Šå¢‹å¢Œ"],["8980","å¢",4,"å¢”",4,"å¢›å¢œå¢å¢ ",7,"å¢ª",17,"å¢½å¢¾å¢¿å£€å£‚å£ƒå£„å£†",10,"å£’å£“å£”å£–",13,"å£¥",5,"å£­å£¯å£±å£²å£´å£µå£·å£¸å£º",7,"å¤ƒå¤…å¤†å¤ˆ",4,"å¤Žå¤å¤‘å¤’å¤“å¤—å¤˜å¤›å¤å¤žå¤ å¤¡å¤¢å¤£å¤¦å¤¨å¤¬å¤°å¤²å¤³å¤µå¤¶å¤»"],["8a40","å¤½å¤¾å¤¿å¥€å¥ƒå¥…å¥†å¥Šå¥Œå¥å¥å¥’å¥“å¥™å¥›",4,"å¥¡å¥£å¥¤å¥¦",12,"å¥µå¥·å¥ºå¥»å¥¼å¥¾å¥¿å¦€å¦…å¦‰å¦‹å¦Œå¦Žå¦å¦å¦‘å¦”å¦•å¦˜å¦šå¦›å¦œå¦å¦Ÿå¦ å¦¡å¦¢å¦¦"],["8a80","å¦§å¦¬å¦­å¦°å¦±å¦³",5,"å¦ºå¦¼å¦½å¦¿",6,"å§‡å§ˆå§‰å§Œå§å§Žå§å§•å§–å§™å§›å§ž",4,"å§¤å§¦å§§å§©å§ªå§«å§­",11,"å§ºå§¼å§½å§¾å¨€å¨‚å¨Šå¨‹å¨å¨Žå¨å¨å¨’å¨”å¨•å¨–å¨—å¨™å¨šå¨›å¨å¨žå¨¡å¨¢å¨¤å¨¦å¨§å¨¨å¨ª",6,"å¨³å¨µå¨·",4,"å¨½å¨¾å¨¿å©",4,"å©‡å©ˆå©‹",9,"å©–å©—å©˜å©™å©›",5],["8b40","å©¡å©£å©¤å©¥å©¦å©¨å©©å©«",8,"å©¸å©¹å©»å©¼å©½å©¾åª€",17,"åª“",6,"åªœ",13,"åª«åª¬"],["8b80","åª­",4,"åª´åª¶åª·åª¹",4,"åª¿å«€å«ƒ",5,"å«Šå«‹å«",4,"å«“å«•å«—å«™å«šå«›å«å«žå«Ÿå«¢å«¤å«¥å«§å«¨å«ªå«¬",4,"å«²",22,"å¬Š",11,"å¬˜",25,"å¬³å¬µå¬¶å¬¸",7,"å­",6],["8c40","å­ˆ",7,"å­’å­–å­žå­ å­¡å­§å­¨å­«å­­å­®å­¯å­²å­´å­¶å­·å­¸å­¹å­»å­¼å­¾å­¿å®‚å®†å®Šå®å®Žå®å®‘å®’å®”å®–å®Ÿå®§å®¨å®©å®¬å®­å®®å®¯å®±å®²å®·å®ºå®»å®¼å¯€å¯å¯ƒå¯ˆå¯‰å¯Šå¯‹å¯å¯Žå¯"],["8c80","å¯‘å¯”",8,"å¯ å¯¢å¯£å¯¦å¯§å¯©",4,"å¯¯å¯±",6,"å¯½å¯¾å°€å°‚å°ƒå°…å°‡å°ˆå°‹å°Œå°å°Žå°å°’å°“å°—å°™å°›å°žå°Ÿå° å°¡å°£å°¦å°¨å°©å°ªå°«å°­å°®å°¯å°°å°²å°³å°µå°¶å°·å±ƒå±„å±†å±‡å±Œå±å±’å±“å±”å±–å±—å±˜å±šå±›å±œå±å±Ÿå±¢å±¤å±§",6,"å±°å±²",6,"å±»å±¼å±½å±¾å²€å²ƒ",4,"å²‰å²Šå²‹å²Žå²å²’å²“å²•å²",4,"å²¤",4],["8d40","å²ªå²®å²¯å²°å²²å²´å²¶å²¹å²ºå²»å²¼å²¾å³€å³‚å³ƒå³…",5,"å³Œ",5,"å³“",5,"å³š",6,"å³¢å³£å³§å³©å³«å³¬å³®å³¯å³±",9,"å³¼",4],["8d80","å´å´„å´…å´ˆ",5,"å´",4,"å´•å´—å´˜å´™å´šå´œå´å´Ÿ",4,"å´¥å´¨å´ªå´«å´¬å´¯",4,"å´µ",7,"å´¿",7,"åµˆåµ‰åµ",10,"åµ™åµšåµœåµž",10,"åµªåµ­åµ®åµ°åµ±åµ²åµ³åµµ",12,"å¶ƒ",21,"å¶šå¶›å¶œå¶žå¶Ÿå¶ "],["8e40","å¶¡",21,"å¶¸",12,"å·†",6,"å·Ž",12,"å·œå·Ÿå· å·£å·¤å·ªå·¬å·­"],["8e80","å·°å·µå·¶å·¸",4,"å·¿å¸€å¸„å¸‡å¸‰å¸Šå¸‹å¸å¸Žå¸’å¸“å¸—å¸ž",7,"å¸¨",4,"å¸¯å¸°å¸²",4,"å¸¹å¸ºå¸¾å¸¿å¹€å¹å¹ƒå¹†",5,"å¹",6,"å¹–",4,"å¹œå¹å¹Ÿå¹ å¹£",14,"å¹µå¹·å¹¹å¹¾åºåº‚åºƒåº…åºˆåº‰åºŒåºåºŽåº’åº˜åº›åºåº¡åº¢åº£åº¤åº¨",4,"åº®",4,"åº´åººåº»åº¼åº½åº¿",6],["8f40","å»†å»‡å»ˆå»‹",5,"å»”å»•å»—å»˜å»™å»šå»œ",11,"å»©å»«",8,"å»µå»¸å»¹å»»å»¼å»½å¼…å¼†å¼‡å¼‰å¼Œå¼å¼Žå¼å¼’å¼”å¼–å¼™å¼šå¼œå¼å¼žå¼¡å¼¢å¼£å¼¤"],["8f80","å¼¨å¼«å¼¬å¼®å¼°å¼²",6,"å¼»å¼½å¼¾å¼¿å½",14,"å½‘å½”å½™å½šå½›å½œå½žå½Ÿå½ å½£å½¥å½§å½¨å½«å½®å½¯å½²å½´å½µå½¶å½¸å½ºå½½å½¾å½¿å¾ƒå¾†å¾å¾Žå¾å¾‘å¾“å¾”å¾–å¾šå¾›å¾å¾žå¾Ÿå¾ å¾¢",5,"å¾©å¾«å¾¬å¾¯",5,"å¾¶å¾¸å¾¹å¾ºå¾»å¾¾",4,"å¿‡å¿ˆå¿Šå¿‹å¿Žå¿“å¿”å¿•å¿šå¿›å¿œå¿žå¿Ÿå¿¢å¿£å¿¥å¿¦å¿¨å¿©å¿¬å¿¯å¿°å¿²å¿³å¿´å¿¶å¿·å¿¹å¿ºå¿¼æ€‡"],["9040","æ€ˆæ€‰æ€‹æ€Œæ€æ€‘æ€“æ€—æ€˜æ€šæ€žæ€Ÿæ€¢æ€£æ€¤æ€¬æ€­æ€®æ€°",4,"æ€¶",4,"æ€½æ€¾æ€æ„",6,"æŒæŽææ‘æ“æ”æ–æ—æ˜æ›æœæžæŸæ æ¡æ¥æ¦æ®æ±æ²æ´æµæ·æ¾æ‚€"],["9080","æ‚æ‚‚æ‚…æ‚†æ‚‡æ‚ˆæ‚Šæ‚‹æ‚Žæ‚æ‚æ‚‘æ‚“æ‚•æ‚—æ‚˜æ‚™æ‚œæ‚žæ‚¡æ‚¢æ‚¤æ‚¥æ‚§æ‚©æ‚ªæ‚®æ‚°æ‚³æ‚µæ‚¶æ‚·æ‚¹æ‚ºæ‚½",7,"æƒ‡æƒˆæƒ‰æƒŒ",4,"æƒ’æƒ“æƒ”æƒ–æƒ—æƒ™æƒ›æƒžæƒ¡",4,"æƒªæƒ±æƒ²æƒµæƒ·æƒ¸æƒ»",4,"æ„‚æ„ƒæ„„æ„…æ„‡æ„Šæ„‹æ„Œæ„",4,"æ„–æ„—æ„˜æ„™æ„›æ„œæ„æ„žæ„¡æ„¢æ„¥æ„¨æ„©æ„ªæ„¬",18,"æ…€",6],["9140","æ…‡æ…‰æ…‹æ…æ…æ…æ…’æ…“æ…”æ…–",6,"æ…žæ…Ÿæ… æ…¡æ…£æ…¤æ…¥æ…¦æ…©",6,"æ…±æ…²æ…³æ…´æ…¶æ…¸",18,"æ†Œæ†æ†",4,"æ†•"],["9180","æ†–",6,"æ†ž",8,"æ†ªæ†«æ†­",9,"æ†¸",5,"æ†¿æ‡€æ‡æ‡ƒ",4,"æ‡‰æ‡Œ",4,"æ‡“æ‡•",16,"æ‡§",13,"æ‡¶",8,"æˆ€",5,"æˆ‡æˆ‰æˆ“æˆ”æˆ™æˆœæˆæˆžæˆ æˆ£æˆ¦æˆ§æˆ¨æˆ©æˆ«æˆ­æˆ¯æˆ°æˆ±æˆ²æˆµæˆ¶æˆ¸",4,"æ‰‚æ‰„æ‰…æ‰†æ‰Š"],["9240","æ‰æ‰æ‰•æ‰–æ‰—æ‰™æ‰šæ‰œ",6,"æ‰¤æ‰¥æ‰¨æ‰±æ‰²æ‰´æ‰µæ‰·æ‰¸æ‰ºæ‰»æ‰½æŠæŠ‚æŠƒæŠ…æŠ†æŠ‡æŠˆæŠ‹",5,"æŠ”æŠ™æŠœæŠæŠžæŠ£æŠ¦æŠ§æŠ©æŠªæŠ­æŠ®æŠ¯æŠ°æŠ²æŠ³æŠ´æŠ¶æŠ·æŠ¸æŠºæŠ¾æ‹€æ‹"],["9280","æ‹ƒæ‹‹æ‹æ‹‘æ‹•æ‹æ‹žæ‹ æ‹¡æ‹¤æ‹ªæ‹«æ‹°æ‹²æ‹µæ‹¸æ‹¹æ‹ºæ‹»æŒ€æŒƒæŒ„æŒ…æŒ†æŒŠæŒ‹æŒŒæŒæŒæŒæŒ’æŒ“æŒ”æŒ•æŒ—æŒ˜æŒ™æŒœæŒ¦æŒ§æŒ©æŒ¬æŒ­æŒ®æŒ°æŒ±æŒ³",5,"æŒ»æŒ¼æŒ¾æŒ¿æ€ææ„æ‡æˆæŠæ‘æ’æ“æ”æ–",7,"æ æ¤æ¥æ¦æ¨æªæ«æ¬æ¯æ°æ²æ³æ´æµæ¸æ¹æ¼æ½æ¾æ¿æŽæŽƒæŽ„æŽ…æŽ†æŽ‹æŽæŽ‘æŽ“æŽ”æŽ•æŽ—æŽ™",6,"æŽ¡æŽ¤æŽ¦æŽ«æŽ¯æŽ±æŽ²æŽµæŽ¶æŽ¹æŽ»æŽ½æŽ¿æ€"],["9340","ææ‚æƒæ…æ‡æˆæŠæ‹æŒæ‘æ“æ”æ•æ—",6,"æŸæ¢æ¤",4,"æ«æ¬æ®æ¯æ°æ±æ³æµæ·æ¹æºæ»æ¼æ¾æƒæ„æ†",4,"ææŽæ‘æ’æ•",5,"ææŸæ¢æ£æ¤"],["9380","æ¥æ§æ¨æ©æ«æ®",5,"æµ",4,"æ»æ¼æ¾æ‘€æ‘‚æ‘ƒæ‘‰æ‘‹",6,"æ‘“æ‘•æ‘–æ‘—æ‘™",4,"æ‘Ÿ",7,"æ‘¨æ‘ªæ‘«æ‘¬æ‘®",9,"æ‘»",6,"æ’ƒæ’†æ’ˆ",8,"æ’“æ’”æ’—æ’˜æ’šæ’›æ’œæ’æ’Ÿ",4,"æ’¥æ’¦æ’§æ’¨æ’ªæ’«æ’¯æ’±æ’²æ’³æ’´æ’¶æ’¹æ’»æ’½æ’¾æ’¿æ“æ“ƒæ“„æ“†",6,"æ“æ“‘æ““æ“”æ“•æ“–æ“™æ“š"],["9440","æ“›æ“œæ“æ“Ÿæ“ æ“¡æ“£æ“¥æ“§",24,"æ”",7,"æ”Š",7,"æ”“",4,"æ”™",8],["9480","æ”¢æ”£æ”¤æ”¦",4,"æ”¬æ”­æ”°æ”±æ”²æ”³æ”·æ”ºæ”¼æ”½æ•€",4,"æ•†æ•‡æ•Šæ•‹æ•æ•Žæ•æ•’æ•“æ•”æ•—æ•˜æ•šæ•œæ•Ÿæ• æ•¡æ•¤æ•¥æ•§æ•¨æ•©æ•ªæ•­æ•®æ•¯æ•±æ•³æ•µæ•¶æ•¸",14,"æ–ˆæ–‰æ–Šæ–æ–Žæ–æ–’æ–”æ–•æ––æ–˜æ–šæ–æ–žæ– æ–¢æ–£æ–¦æ–¨æ–ªæ–¬æ–®æ–±",7,"æ–ºæ–»æ–¾æ–¿æ—€æ—‚æ—‡æ—ˆæ—‰æ—Šæ—æ—æ—‘æ—“æ—”æ—•æ—˜",7,"æ—¡æ—£æ—¤æ—ªæ—«"],["9540","æ—²æ—³æ—´æ—µæ—¸æ—¹æ—»",4,"æ˜æ˜„æ˜…æ˜‡æ˜ˆæ˜‰æ˜‹æ˜æ˜æ˜‘æ˜’æ˜–æ˜—æ˜˜æ˜šæ˜›æ˜œæ˜žæ˜¡æ˜¢æ˜£æ˜¤æ˜¦æ˜©æ˜ªæ˜«æ˜¬æ˜®æ˜°æ˜²æ˜³æ˜·",4,"æ˜½æ˜¿æ™€æ™‚æ™„",6,"æ™æ™Žæ™æ™‘æ™˜"],["9580","æ™™æ™›æ™œæ™æ™žæ™ æ™¢æ™£æ™¥æ™§æ™©",4,"æ™±æ™²æ™³æ™µæ™¸æ™¹æ™»æ™¼æ™½æ™¿æš€æšæšƒæš…æš†æšˆæš‰æšŠæš‹æšæšŽæšæšæš’æš“æš”æš•æš˜",4,"æšž",8,"æš©",4,"æš¯",4,"æšµæš¶æš·æš¸æšºæš»æš¼æš½æš¿",25,"æ›šæ›ž",7,"æ›§æ›¨æ›ª",5,"æ›±æ›µæ›¶æ›¸æ›ºæ›»æ›½æœæœ‚æœƒ"],["9640","æœ„æœ…æœ†æœ‡æœŒæœŽæœæœ‘æœ’æœ“æœ–æœ˜æœ™æœšæœœæœžæœ ",5,"æœ§æœ©æœ®æœ°æœ²æœ³æœ¶æœ·æœ¸æœ¹æœ»æœ¼æœ¾æœ¿ææ„æ…æ‡æŠæ‹ææ’æ”æ•æ—",4,"ææ¢æ£æ¤æ¦æ§æ«æ¬æ®æ±æ´æ¶"],["9680","æ¸æ¹æºæ»æ½æž€æž‚æžƒæž…æž†æžˆæžŠæžŒæžæžŽæžæž‘æž’æž“æž”æž–æž™æž›æžŸæž æž¡æž¤æž¦æž©æž¬æž®æž±æž²æž´æž¹",7,"æŸ‚æŸ…",9,"æŸ•æŸ–æŸ—æŸ›æŸŸæŸ¡æŸ£æŸ¤æŸ¦æŸ§æŸ¨æŸªæŸ«æŸ­æŸ®æŸ²æŸµ",7,"æŸ¾æ æ ‚æ ƒæ „æ †æ æ æ ’æ ”æ •æ ˜",4,"æ žæ Ÿæ  æ ¢",6,"æ «",6,"æ ´æ µæ ¶æ ºæ »æ ¿æ¡‡æ¡‹æ¡æ¡æ¡’æ¡–",5],["9740","æ¡œæ¡æ¡žæ¡Ÿæ¡ªæ¡¬",7,"æ¡µæ¡¸",8,"æ¢‚æ¢„æ¢‡",7,"æ¢æ¢‘æ¢’æ¢”æ¢•æ¢–æ¢˜",9,"æ¢£æ¢¤æ¢¥æ¢©æ¢ªæ¢«æ¢¬æ¢®æ¢±æ¢²æ¢´æ¢¶æ¢·æ¢¸"],["9780","æ¢¹",6,"æ£æ£ƒ",5,"æ£Šæ£Œæ£Žæ£æ£æ£‘æ£“æ£”æ£–æ£—æ£™æ£›",4,"æ£¡æ£¢æ£¤",9,"æ£¯æ£²æ£³æ£´æ£¶æ£·æ£¸æ£»æ£½æ£¾æ£¿æ¤€æ¤‚æ¤ƒæ¤„æ¤†",4,"æ¤Œæ¤æ¤‘æ¤“",11,"æ¤¡æ¤¢æ¤£æ¤¥",7,"æ¤®æ¤¯æ¤±æ¤²æ¤³æ¤µæ¤¶æ¤·æ¤¸æ¤ºæ¤»æ¤¼æ¤¾æ¥€æ¥æ¥ƒ",16,"æ¥•æ¥–æ¥˜æ¥™æ¥›æ¥œæ¥Ÿ"],["9840","æ¥¡æ¥¢æ¥¤æ¥¥æ¥§æ¥¨æ¥©æ¥ªæ¥¬æ¥­æ¥¯æ¥°æ¥²",4,"æ¥ºæ¥»æ¥½æ¥¾æ¥¿æ¦æ¦ƒæ¦…æ¦Šæ¦‹æ¦Œæ¦Ž",5,"æ¦–æ¦—æ¦™æ¦šæ¦",9,"æ¦©æ¦ªæ¦¬æ¦®æ¦¯æ¦°æ¦²æ¦³æ¦µæ¦¶æ¦¸æ¦¹æ¦ºæ¦¼æ¦½"],["9880","æ¦¾æ¦¿æ§€æ§‚",7,"æ§‹æ§æ§æ§‘æ§’æ§“æ§•",5,"æ§œæ§æ§žæ§¡",11,"æ§®æ§¯æ§°æ§±æ§³",9,"æ§¾æ¨€",9,"æ¨‹",11,"æ¨™",5,"æ¨ æ¨¢",5,"æ¨©æ¨«æ¨¬æ¨­æ¨®æ¨°æ¨²æ¨³æ¨´æ¨¶",6,"æ¨¿",4,"æ©…æ©†æ©ˆ",7,"æ©‘",6,"æ©š"],["9940","æ©œ",4,"æ©¢æ©£æ©¤æ©¦",10,"æ©²",6,"æ©ºæ©»æ©½æ©¾æ©¿æªæª‚æªƒæª…",8,"æªæª’",4,"æª˜",7,"æª¡",5],["9980","æª§æª¨æªªæª­",114,"æ¬¥æ¬¦æ¬¨",6],["9a40","æ¬¯æ¬°æ¬±æ¬³æ¬´æ¬µæ¬¶æ¬¸æ¬»æ¬¼æ¬½æ¬¿æ­€æ­æ­‚æ­„æ­…æ­ˆæ­Šæ­‹æ­",11,"æ­š",7,"æ­¨æ­©æ­«",13,"æ­ºæ­½æ­¾æ­¿æ®€æ®…æ®ˆ"],["9a80","æ®Œæ®Žæ®æ®æ®‘æ®”æ®•æ®—æ®˜æ®™æ®œ",4,"æ®¢",7,"æ®«",7,"æ®¶æ®¸",6,"æ¯€æ¯ƒæ¯„æ¯†",4,"æ¯Œæ¯Žæ¯æ¯‘æ¯˜æ¯šæ¯œ",4,"æ¯¢",7,"æ¯¬æ¯­æ¯®æ¯°æ¯±æ¯²æ¯´æ¯¶æ¯·æ¯¸æ¯ºæ¯»æ¯¼æ¯¾",6,"æ°ˆ",4,"æ°Žæ°’æ°—æ°œæ°æ°žæ° æ°£æ°¥æ°«æ°¬æ°­æ°±æ°³æ°¶æ°·æ°¹æ°ºæ°»æ°¼æ°¾æ°¿æ±ƒæ±„æ±…æ±ˆæ±‹",4,"æ±‘æ±’æ±“æ±–æ±˜"],["9b40","æ±™æ±šæ±¢æ±£æ±¥æ±¦æ±§æ±«",4,"æ±±æ±³æ±µæ±·æ±¸æ±ºæ±»æ±¼æ±¿æ²€æ²„æ²‡æ²Šæ²‹æ²æ²Žæ²‘æ²’æ²•æ²–æ²—æ²˜æ²šæ²œæ²æ²žæ² æ²¢æ²¨æ²¬æ²¯æ²°æ²´æ²µæ²¶æ²·æ²ºæ³€æ³æ³‚æ³ƒæ³†æ³‡æ³ˆæ³‹æ³æ³Žæ³æ³‘æ³’æ³˜"],["9b80","æ³™æ³šæ³œæ³æ³Ÿæ³¤æ³¦æ³§æ³©æ³¬æ³­æ³²æ³´æ³¹æ³¿æ´€æ´‚æ´ƒæ´…æ´†æ´ˆæ´‰æ´Šæ´æ´æ´æ´‘æ´“æ´”æ´•æ´–æ´˜æ´œæ´æ´Ÿ",5,"æ´¦æ´¨æ´©æ´¬æ´­æ´¯æ´°æ´´æ´¶æ´·æ´¸æ´ºæ´¿æµ€æµ‚æµ„æµ‰æµŒæµæµ•æµ–æµ—æµ˜æµ›æµæµŸæµ¡æµ¢æµ¤æµ¥æµ§æµ¨æµ«æµ¬æµ­æµ°æµ±æµ²æµ³æµµæµ¶æµ¹æµºæµ»æµ½",4,"æ¶ƒæ¶„æ¶†æ¶‡æ¶Šæ¶‹æ¶æ¶æ¶æ¶’æ¶–",4,"æ¶œæ¶¢æ¶¥æ¶¬æ¶­æ¶°æ¶±æ¶³æ¶´æ¶¶æ¶·æ¶¹",5,"æ·æ·‚æ·ƒæ·ˆæ·‰æ·Š"],["9c40","æ·æ·Žæ·æ·æ·’æ·“æ·”æ·•æ·—æ·šæ·›æ·œæ·Ÿæ·¢æ·£æ·¥æ·§æ·¨æ·©æ·ªæ·­æ·¯æ·°æ·²æ·´æ·µæ·¶æ·¸æ·ºæ·½",7,"æ¸†æ¸‡æ¸ˆæ¸‰æ¸‹æ¸æ¸’æ¸“æ¸•æ¸˜æ¸™æ¸›æ¸œæ¸žæ¸Ÿæ¸¢æ¸¦æ¸§æ¸¨æ¸ªæ¸¬æ¸®æ¸°æ¸±æ¸³æ¸µ"],["9c80","æ¸¶æ¸·æ¸¹æ¸»",7,"æ¹…",7,"æ¹æ¹æ¹‘æ¹’æ¹•æ¹—æ¹™æ¹šæ¹œæ¹æ¹žæ¹ ",10,"æ¹¬æ¹­æ¹¯",14,"æº€æºæº‚æº„æº‡æºˆæºŠ",4,"æº‘",6,"æº™æºšæº›æºæºžæº æº¡æº£æº¤æº¦æº¨æº©æº«æº¬æº­æº®æº°æº³æºµæº¸æº¹æº¼æº¾æº¿æ»€æ»ƒæ»„æ»…æ»†æ»ˆæ»‰æ»Šæ»Œæ»æ»Žæ»æ»’æ»–æ»˜æ»™æ»›æ»œæ»æ»£æ»§æ»ª",5],["9d40","æ»°æ»±æ»²æ»³æ»µæ»¶æ»·æ»¸æ»º",7,"æ¼ƒæ¼„æ¼…æ¼‡æ¼ˆæ¼Š",4,"æ¼æ¼‘æ¼’æ¼–",9,"æ¼¡æ¼¢æ¼£æ¼¥æ¼¦æ¼§æ¼¨æ¼¬æ¼®æ¼°æ¼²æ¼´æ¼µæ¼·",6,"æ¼¿æ½€æ½æ½‚"],["9d80","æ½ƒæ½„æ½…æ½ˆæ½‰æ½Šæ½Œæ½Ž",9,"æ½™æ½šæ½›æ½æ½Ÿæ½ æ½¡æ½£æ½¤æ½¥æ½§",5,"æ½¯æ½°æ½±æ½³æ½µæ½¶æ½·æ½¹æ½»æ½½",6,"æ¾…æ¾†æ¾‡æ¾Šæ¾‹æ¾",12,"æ¾æ¾žæ¾Ÿæ¾ æ¾¢",4,"æ¾¨",10,"æ¾´æ¾µæ¾·æ¾¸æ¾º",5,"æ¿æ¿ƒ",5,"æ¿Š",6,"æ¿“",10,"æ¿Ÿæ¿¢æ¿£æ¿¤æ¿¥"],["9e40","æ¿¦",7,"æ¿°",32,"ç€’",7,"ç€œ",6,"ç€¤",6],["9e80","ç€«",9,"ç€¶ç€·ç€¸ç€º",17,"ççŽç",13,"çŸ",11,"ç®ç±ç²ç³ç´ç·ç¹çºç»ç½ç‚ç‚‚ç‚ƒç‚„ç‚†ç‚‡ç‚ˆç‚‹ç‚Œç‚ç‚ç‚ç‚‘ç‚“ç‚—ç‚˜ç‚šç‚›ç‚ž",12,"ç‚°ç‚²ç‚´ç‚µç‚¶ç‚ºç‚¾ç‚¿çƒ„çƒ…çƒ†çƒ‡çƒ‰çƒ‹",12,"çƒš"],["9f40","çƒœçƒçƒžçƒ çƒ¡çƒ¢çƒ£çƒ¥çƒªçƒ®çƒ°",6,"çƒ¸çƒºçƒ»çƒ¼çƒ¾",10,"ç„‹",4,"ç„‘ç„’ç„”ç„—ç„›",10,"ç„§",7,"ç„²ç„³ç„´"],["9f80","ç„µç„·",13,"ç…†ç…‡ç…ˆç…‰ç…‹ç…ç…",12,"ç…ç…Ÿ",4,"ç…¥ç…©",4,"ç…¯ç…°ç…±ç…´ç…µç…¶ç…·ç…¹ç…»ç…¼ç…¾",5,"ç†…",4,"ç†‹ç†Œç†ç†Žç†ç†‘ç†’ç†“ç†•ç†–ç†—ç†š",4,"ç†¡",6,"ç†©ç†ªç†«ç†­",5,"ç†´ç†¶ç†·ç†¸ç†º",8,"ç‡„",9,"ç‡",4],["a040","ç‡–",9,"ç‡¡ç‡¢ç‡£ç‡¤ç‡¦ç‡¨",5,"ç‡¯",9,"ç‡º",11,"çˆ‡",19],["a080","çˆ›çˆœçˆž",9,"çˆ©çˆ«çˆ­çˆ®çˆ¯çˆ²çˆ³çˆ´çˆºçˆ¼çˆ¾ç‰€",6,"ç‰‰ç‰Šç‰‹ç‰Žç‰ç‰ç‰‘ç‰“ç‰”ç‰•ç‰—ç‰˜ç‰šç‰œç‰žç‰ ç‰£ç‰¤ç‰¥ç‰¨ç‰ªç‰«ç‰¬ç‰­ç‰°ç‰±ç‰³ç‰´ç‰¶ç‰·ç‰¸ç‰»ç‰¼ç‰½çŠ‚çŠƒçŠ…",4,"çŠŒçŠŽçŠçŠ‘çŠ“",11,"çŠ ",11,"çŠ®çŠ±çŠ²çŠ³çŠµçŠº",6,"ç‹…ç‹†ç‹‡ç‹‰ç‹Šç‹‹ç‹Œç‹ç‹‘ç‹“ç‹”ç‹•ç‹–ç‹˜ç‹šç‹›"],["a1a1","ã€€ã€ã€‚Â·Ë‰Ë‡Â¨ã€ƒã€…â€”ï½žâ€–â€¦â€˜â€™â€œâ€ã€”ã€•ã€ˆ",7,"ã€–ã€—ã€ã€‘Â±Ã—Ã·âˆ¶âˆ§âˆ¨âˆ‘âˆâˆªâˆ©âˆˆâˆ·âˆšâŠ¥âˆ¥âˆ âŒ’âŠ™âˆ«âˆ®â‰¡â‰Œâ‰ˆâˆ½âˆâ‰ â‰®â‰¯â‰¤â‰¥âˆžâˆµâˆ´â™‚â™€Â°â€²â€³â„ƒï¼„Â¤ï¿ ï¿¡â€°Â§â„–â˜†â˜…â—‹â—â—Žâ—‡â—†â–¡â– â–³â–²â€»â†’â†â†‘â†“ã€“"],["a2a1","â…°",9],["a2b1","â’ˆ",19,"â‘´",19,"â‘ ",9],["a2e5","ãˆ ",9],["a2f1","â… ",11],["a3a1","ï¼ï¼‚ï¼ƒï¿¥ï¼…",88,"ï¿£"],["a4a1","ã",82],["a5a1","ã‚¡",85],["a6a1","Î‘",16,"Î£",6],["a6c1","Î±",16,"Ïƒ",6],["a6e0","ï¸µï¸¶ï¸¹ï¸ºï¸¿ï¹€ï¸½ï¸¾ï¹ï¹‚ï¹ƒï¹„"],["a6ee","ï¸»ï¸¼ï¸·ï¸¸ï¸±"],["a6f4","ï¸³ï¸´"],["a7a1","Ð",5,"ÐÐ–",25],["a7d1","Ð°",5,"Ñ‘Ð¶",25],["a840","ËŠË‹Ë™â€“â€•â€¥â€µâ„…â„‰â†–â†—â†˜â†™âˆ•âˆŸâˆ£â‰’â‰¦â‰§âŠ¿â•",35,"â–",6],["a880","â–ˆ",7,"â–“â–”â–•â–¼â–½â—¢â—£â—¤â—¥â˜‰âŠ•ã€’ã€ã€ž"],["a8a1","ÄÃ¡ÇŽÃ Ä“Ã©Ä›Ã¨Ä«Ã­ÇÃ¬ÅÃ³Ç’Ã²Å«ÃºÇ”Ã¹Ç–Ç˜ÇšÇœÃ¼ÃªÉ‘"],["a8bd","Å„Åˆ"],["a8c0","É¡"],["a8c5","ã„…",36],["a940","ã€¡",8,"ãŠ£ãŽŽãŽãŽœãŽãŽžãŽ¡ã„ãŽã‘ã’ã•ï¸°ï¿¢ï¿¤"],["a959","â„¡ãˆ±"],["a95c","â€"],["a960","ãƒ¼ã‚›ã‚œãƒ½ãƒ¾ã€†ã‚ã‚žï¹‰",9,"ï¹”ï¹•ï¹–ï¹—ï¹™",8],["a980","ï¹¢",4,"ï¹¨ï¹©ï¹ªï¹«"],["a996","ã€‡"],["a9a4","â”€",75],["aa40","ç‹œç‹ç‹Ÿç‹¢",5,"ç‹ªç‹«ç‹µç‹¶ç‹¹ç‹½ç‹¾ç‹¿çŒ€çŒ‚çŒ„",5,"çŒ‹çŒŒçŒçŒçŒçŒ‘çŒ’çŒ”çŒ˜çŒ™çŒšçŒŸçŒ çŒ£çŒ¤çŒ¦çŒ§çŒ¨çŒ­çŒ¯çŒ°çŒ²çŒ³çŒµçŒ¶çŒºçŒ»çŒ¼çŒ½ç€",8],["aa80","ç‰çŠç‹çŒçŽçç‘ç“ç”ç•ç–ç˜",7,"ç¡",10,"ç®ç°ç±"],["ab40","ç²",11,"ç¿",4,"çŽ…çŽ†çŽˆçŽŠçŽŒçŽçŽçŽçŽ’çŽ“çŽ”çŽ•çŽ—çŽ˜çŽ™çŽšçŽœçŽçŽžçŽ çŽ¡çŽ£",5,"çŽªçŽ¬çŽ­çŽ±çŽ´çŽµçŽ¶çŽ¸çŽ¹çŽ¼çŽ½çŽ¾çŽ¿ççƒ",4],["ab80","ç‹çŒçŽç’",6,"çšç›çœççŸç¡ç¢ç£ç¤ç¦ç¨çªç«ç¬ç®ç¯ç°ç±ç³",4],["ac40","ç¸",10,"ç„ç‡çˆç‹çŒççŽç‘",8,"çœ",5,"ç£ç¤ç§ç©ç«ç­ç¯ç±ç²ç·",4,"ç½ç¾ç¿ç‘€ç‘‚",11],["ac80","ç‘Ž",6,"ç‘–ç‘˜ç‘ç‘ ",12,"ç‘®ç‘¯ç‘±",4,"ç‘¸ç‘¹ç‘º"],["ad40","ç‘»ç‘¼ç‘½ç‘¿ç’‚ç’„ç’…ç’†ç’ˆç’‰ç’Šç’Œç’ç’ç’‘",10,"ç’ç’Ÿ",7,"ç’ª",15,"ç’»",12],["ad80","ç“ˆ",9,"ç““",8,"ç“ç“Ÿç“¡ç“¥ç“§",6,"ç“°ç“±ç“²"],["ae40","ç“³ç“µç“¸",6,"ç”€ç”ç”‚ç”ƒç”…",7,"ç”Žç”ç”’ç””ç”•ç”–ç”—ç”›ç”ç”žç” ",4,"ç”¦ç”§ç”ªç”®ç”´ç”¶ç”¹ç”¼ç”½ç”¿ç•ç•‚ç•ƒç•„ç•†ç•‡ç•‰ç•Šç•ç•ç•‘ç•’ç•“ç••ç•–ç•—ç•˜"],["ae80","ç•",7,"ç•§ç•¨ç•©ç•«",6,"ç•³ç•µç•¶ç•·ç•º",4,"ç–€ç–ç–‚ç–„ç–…ç–‡"],["af40","ç–ˆç–‰ç–Šç–Œç–ç–Žç–ç–“ç–•ç–˜ç–›ç–œç–žç–¢ç–¦",4,"ç–­ç–¶ç–·ç–ºç–»ç–¿ç—€ç—ç—†ç—‹ç—Œç—Žç—ç—ç—‘ç—“ç——ç—™ç—šç—œç—ç—Ÿç— ç—¡ç—¥ç—©ç—¬ç—­ç—®ç—¯ç—²ç—³ç—µç—¶ç—·ç—¸ç—ºç—»ç—½ç—¾ç˜‚ç˜„ç˜†ç˜‡"],["af80","ç˜ˆç˜‰ç˜‹ç˜ç˜Žç˜ç˜‘ç˜’ç˜“ç˜”ç˜–ç˜šç˜œç˜ç˜žç˜¡ç˜£ç˜§ç˜¨ç˜¬ç˜®ç˜¯ç˜±ç˜²ç˜¶ç˜·ç˜¹ç˜ºç˜»ç˜½ç™ç™‚ç™„"],["b040","ç™…",6,"ç™Ž",5,"ç™•ç™—",4,"ç™ç™Ÿç™ ç™¡ç™¢ç™¤",6,"ç™¬ç™­ç™®ç™°",7,"ç™¹ç™ºç™¼ç™¿çš€çšçšƒçš…çš‰çšŠçšŒçšçšçšçš’çš”çš•çš—çš˜çššçš›"],["b080","çšœ",7,"çš¥",8,"çš¯çš°çš³çšµ",9,"ç›€ç›ç›ƒå•Šé˜¿åŸƒæŒ¨å“Žå”‰å“€çš‘ç™Œè”¼çŸ®è‰¾ç¢çˆ±éš˜éžæ°¨å®‰ä¿ºæŒ‰æš—å²¸èƒºæ¡ˆè‚®æ˜‚ç›Žå‡¹æ•–ç†¬ç¿±è¢„å‚²å¥¥æ‡Šæ¾³èŠ­æŒæ‰’å­å§ç¬†å…«ç–¤å·´æ‹”è·‹é¶æŠŠè€™åéœ¸ç½¢çˆ¸ç™½æŸç™¾æ‘†ä½°è´¥æ‹œç¨—æ–‘ç­æ¬æ‰³èˆ¬é¢æ¿ç‰ˆæ‰®æ‹Œä¼´ç“£åŠåŠžç»Šé‚¦å¸®æ¢†æ¦œè†€ç»‘æ£’ç£…èšŒé•‘å‚è°¤è‹žèƒžåŒ…è¤’å‰¥"],["b140","ç›„ç›‡ç›‰ç›‹ç›Œç›“ç›•ç›™ç›šç›œç›ç›žç› ",4,"ç›¦",7,"ç›°ç›³ç›µç›¶ç›·ç›ºç›»ç›½ç›¿çœ€çœ‚çœƒçœ…çœ†çœŠçœŒçœŽ",10,"çœ›çœœçœçœžçœ¡çœ£çœ¤çœ¥çœ§çœªçœ«"],["b180","çœ¬çœ®çœ°",4,"çœ¹çœ»çœ½çœ¾çœ¿ç‚ç„ç…ç†çˆ",7,"ç’",7,"çœè–„é›¹ä¿å ¡é¥±å®æŠ±æŠ¥æš´è±¹é²çˆ†æ¯ç¢‘æ‚²å‘åŒ—è¾ˆèƒŒè´é’¡å€ç‹ˆå¤‡æƒ«ç„™è¢«å¥”è‹¯æœ¬ç¬¨å´©ç»·ç”­æ³µè¹¦è¿¸é€¼é¼»æ¯”é„™ç¬”å½¼ç¢§è“–è”½æ¯•æ¯™æ¯–å¸åº‡ç—¹é—­æ•å¼Šå¿…è¾Ÿå£è‡‚é¿é™›éž­è¾¹ç¼–è´¬æ‰ä¾¿å˜åžè¾¨è¾©è¾«éæ ‡å½ªè†˜è¡¨é³–æ†‹åˆ«ç˜ªå½¬æ–Œæ¿’æ»¨å®¾æ‘ˆå…µå†°æŸ„ä¸™ç§‰é¥¼ç‚³"],["b240","ççžçŸç ç¤ç§ç©çªç­",11,"çºç»ç¼çžçž‚çžƒçž†",5,"çžçžçž“",11,"çž¡çž£çž¤çž¦çž¨çž«çž­çž®çž¯çž±çž²çž´çž¶",4],["b280","çž¼çž¾çŸ€",12,"çŸŽ",8,"çŸ˜çŸ™çŸšçŸ",4,"çŸ¤ç—…å¹¶çŽ»è æ’­æ‹¨é’µæ³¢åšå‹ƒæé“‚ç®”ä¼¯å¸›èˆ¶è„–è†Šæ¸¤æ³Šé©³æ•åœå“ºè¡¥åŸ ä¸å¸ƒæ­¥ç°¿éƒ¨æ€–æ“¦çŒœè£ææ‰è´¢ç¬è¸©é‡‡å½©èœè”¡é¤å‚èš•æ®‹æƒ­æƒ¨ç¿è‹èˆ±ä»“æ²§è—æ“ç³™æ§½æ›¹è‰åŽ•ç­–ä¾§å†Œæµ‹å±‚è¹­æ’å‰èŒ¬èŒ¶æŸ¥ç¢´æ½å¯Ÿå²”å·®è¯§æ‹†æŸ´è±ºæ€æŽºè‰é¦‹è°—ç¼ é“²äº§é˜é¢¤æ˜ŒçŒ–"],["b340","çŸ¦çŸ¨çŸªçŸ¯çŸ°çŸ±çŸ²çŸ´çŸµçŸ·çŸ¹çŸºçŸ»çŸ¼ç ƒ",5,"ç Šç ‹ç Žç ç ç “ç •ç ™ç ›ç žç  ç ¡ç ¢ç ¤ç ¨ç ªç «ç ®ç ¯ç ±ç ²ç ³ç µç ¶ç ½ç ¿ç¡ç¡‚ç¡ƒç¡„ç¡†ç¡ˆç¡‰ç¡Šç¡‹ç¡ç¡ç¡‘ç¡“ç¡”ç¡˜ç¡™ç¡š"],["b380","ç¡›ç¡œç¡ž",11,"ç¡¯",7,"ç¡¸ç¡¹ç¡ºç¡»ç¡½",6,"åœºå°å¸¸é•¿å¿è‚ åŽ‚æ•žç•…å”±å€¡è¶…æŠ„é’žæœå˜²æ½®å·¢åµç‚’è½¦æ‰¯æ’¤æŽ£å½»æ¾ˆéƒ´è‡£è¾°å°˜æ™¨å¿±æ²‰é™ˆè¶è¡¬æ’‘ç§°åŸŽæ©™æˆå‘ˆä¹˜ç¨‹æƒ©æ¾„è¯šæ‰¿é€žéª‹ç§¤åƒç—´æŒåŒ™æ± è¿Ÿå¼›é©°è€»é½¿ä¾ˆå°ºèµ¤ç¿…æ–¥ç‚½å……å†²è™«å´‡å® æŠ½é…¬ç•´è¸Œç¨ æ„ç­¹ä»‡ç»¸çž…ä¸‘è‡­åˆå‡ºæ©±åŽ¨èº‡é”„é›æ»é™¤æ¥š"],["b440","ç¢„ç¢…ç¢†ç¢ˆç¢Šç¢‹ç¢ç¢ç¢’ç¢”ç¢•ç¢–ç¢™ç¢ç¢žç¢ ç¢¢ç¢¤ç¢¦ç¢¨",7,"ç¢µç¢¶ç¢·ç¢¸ç¢ºç¢»ç¢¼ç¢½ç¢¿ç£€ç£‚ç£ƒç£„ç£†ç£‡ç£ˆç£Œç£ç£Žç£ç£‘ç£’ç£“ç£–ç£—ç£˜ç£š",9],["b480","ç£¤ç£¥ç£¦ç£§ç£©ç£ªç£«ç£­",4,"ç£³ç£µç£¶ç£¸ç£¹ç£»",5,"ç¤‚ç¤ƒç¤„ç¤†",6,"ç¡€å‚¨çŸ—æè§¦å¤„æ£å·ç©¿æ¤½ä¼ èˆ¹å–˜ä¸²ç–®çª—å¹¢åºŠé—¯åˆ›å¹ç‚Šæ¶é”¤åž‚æ˜¥æ¤¿é†‡å”‡æ·³çº¯è ¢æˆ³ç»°ç–µèŒ¨ç£é›Œè¾žæ…ˆç“·è¯æ­¤åˆºèµæ¬¡èªè‘±å›±åŒ†ä»Žä¸›å‡‘ç²—é†‹ç°‡ä¿ƒè¹¿ç¯¡çªœæ‘§å´”å‚¬è„†ç˜ç²¹æ·¬ç¿ æ‘å­˜å¯¸ç£‹æ’®æ“æŽªæŒ«é”™æ­è¾¾ç­”ç˜©æ‰“å¤§å‘†æ­¹å‚£æˆ´å¸¦æ®†ä»£è´·è¢‹å¾…é€®"],["b540","ç¤",5,"ç¤”",9,"ç¤Ÿ",4,"ç¤¥",14,"ç¤µ",4,"ç¤½ç¤¿ç¥‚ç¥ƒç¥„ç¥…ç¥‡ç¥Š",8,"ç¥”ç¥•ç¥˜ç¥™ç¥¡ç¥£"],["b580","ç¥¤ç¥¦ç¥©ç¥ªç¥«ç¥¬ç¥®ç¥°",6,"ç¥¹ç¥»",4,"ç¦‚ç¦ƒç¦†ç¦‡ç¦ˆç¦‰ç¦‹ç¦Œç¦ç¦Žç¦ç¦‘ç¦’æ€ è€½æ‹…ä¸¹å•éƒ¸æŽ¸èƒ†æ—¦æ°®ä½†æƒ®æ·¡è¯žå¼¹è›‹å½“æŒ¡å…šè¡æ¡£åˆ€æ£è¹ˆå€’å²›ç¥·å¯¼åˆ°ç¨»æ‚¼é“ç›—å¾·å¾—çš„è¹¬ç¯ç™»ç­‰çžªå‡³é‚“å ¤ä½Žæ»´è¿ªæ•Œç¬›ç‹„æ¶¤ç¿Ÿå«¡æŠµåº•åœ°è’‚ç¬¬å¸å¼Ÿé€’ç¼”é¢ æŽ‚æ»‡ç¢˜ç‚¹å…¸é›åž«ç”µä½ƒç”¸åº—æƒ¦å¥ æ·€æ®¿ç¢‰å¼é›•å‡‹åˆæŽ‰åŠé’“è°ƒè·Œçˆ¹ç¢Ÿè¶è¿­è°å "],["b640","ç¦“",6,"ç¦›",11,"ç¦¨",10,"ç¦´",4,"ç¦¼ç¦¿ç§‚ç§„ç§…ç§‡ç§ˆç§Šç§Œç§Žç§ç§ç§“ç§”ç§–ç§—ç§™",5,"ç§ ç§¡ç§¢ç§¥ç§¨ç§ª"],["b680","ç§¬ç§®ç§±",6,"ç§¹ç§ºç§¼ç§¾ç§¿ç¨ç¨„ç¨…ç¨‡ç¨ˆç¨‰ç¨Šç¨Œç¨",4,"ç¨•ç¨–ç¨˜ç¨™ç¨›ç¨œä¸ç›¯å®é’‰é¡¶é¼Žé”­å®šè®¢ä¸¢ä¸œå†¬è‘£æ‡‚åŠ¨æ ‹ä¾—æ«å†»æ´žå…œæŠ–æ–—é™¡è±†é€—ç—˜éƒ½ç£æ¯’çŠŠç‹¬è¯»å µç¹èµŒæœé•€è‚šåº¦æ¸¡å¦’ç«¯çŸ­é”»æ®µæ–­ç¼Žå †å…‘é˜Ÿå¯¹å¢©å¨è¹²æ•¦é¡¿å›¤é’ç›¾éæŽ‡å“†å¤šå¤ºåž›èº²æœµè·ºèˆµå‰æƒ°å •è›¾å³¨é¹…ä¿„é¢è®¹å¨¥æ¶åŽ„æ‰¼éé„‚é¥¿æ©è€Œå„¿è€³å°”é¥µæ´±äºŒ"],["b740","ç¨ç¨Ÿç¨¡ç¨¢ç¨¤",14,"ç¨´ç¨µç¨¶ç¨¸ç¨ºç¨¾ç©€",5,"ç©‡",9,"ç©’",4,"ç©˜",16],["b780","ç©©",6,"ç©±ç©²ç©³ç©µç©»ç©¼ç©½ç©¾çª‚çª…çª‡çª‰çªŠçª‹çªŒçªŽçªçªçª“çª”çª™çªšçª›çªžçª¡çª¢è´°å‘ç½šç­ä¼ä¹é˜€æ³•çè—©å¸†ç•ªç¿»æ¨ŠçŸ¾é’’ç¹å‡¡çƒ¦åè¿”èŒƒè´©çŠ¯é¥­æ³›åŠèŠ³æ–¹è‚ªæˆ¿é˜²å¦¨ä»¿è®¿çººæ”¾è²éžå•¡é£žè‚¥åŒªè¯½å è‚ºåºŸæ²¸è´¹èŠ¬é…šå©æ°›åˆ†çº·åŸç„šæ±¾ç²‰å¥‹ä»½å¿¿æ„¤ç²ªä¸°å°æž«èœ‚å³°é”‹é£Žç–¯çƒ½é€¢å†¯ç¼è®½å¥‰å‡¤ä½›å¦å¤«æ•·è‚¤å­µæ‰¶æ‹‚è¾å¹…æ°Ÿç¬¦ä¼ä¿˜æœ"],["b840","çª£çª¤çª§çª©çªªçª«çª®",4,"çª´",10,"ç«€",10,"ç«Œ",9,"ç«—ç«˜ç«šç«›ç«œç«ç«¡ç«¢ç«¤ç«§",5,"ç«®ç«°ç«±ç«²ç«³"],["b880","ç«´",4,"ç«»ç«¼ç«¾ç¬€ç¬ç¬‚ç¬…ç¬‡ç¬‰ç¬Œç¬ç¬Žç¬ç¬’ç¬“ç¬–ç¬—ç¬˜ç¬šç¬œç¬ç¬Ÿç¬¡ç¬¢ç¬£ç¬§ç¬©ç¬­æµ®æ¶ªç¦è¢±å¼—ç”«æŠšè¾…ä¿¯é‡œæ–§è„¯è…‘åºœè…èµ´å‰¯è¦†èµ‹å¤å‚…ä»˜é˜œçˆ¶è…¹è´Ÿå¯Œè®£é™„å¦‡ç¼šå’å™¶å˜Žè¯¥æ”¹æ¦‚é’™ç›–æº‰å¹²ç”˜æ†æŸ‘ç«¿è‚èµ¶æ„Ÿç§†æ•¢èµ£å†ˆåˆšé’¢ç¼¸è‚›çº²å²—æ¸¯æ ç¯™çš‹é«˜è†ç¾”ç³•æžé•ç¨¿å‘Šå“¥æ­Œææˆˆé¸½èƒ³ç–™å‰²é©è‘›æ ¼è›¤é˜éš”é“¬ä¸ªå„ç»™æ ¹è·Ÿè€•æ›´åºšç¾¹"],["b940","ç¬¯ç¬°ç¬²ç¬´ç¬µç¬¶ç¬·ç¬¹ç¬»ç¬½ç¬¿",5,"ç­†ç­ˆç­Šç­ç­Žç­“ç­•ç­—ç­™ç­œç­žç­Ÿç­¡ç­£",10,"ç­¯ç­°ç­³ç­´ç­¶ç­¸ç­ºç­¼ç­½ç­¿ç®ç®‚ç®ƒç®„ç®†",6,"ç®Žç®"],["b980","ç®‘ç®’ç®“ç®–ç®˜ç®™ç®šç®›ç®žç®Ÿç® ç®£ç®¤ç®¥ç®®ç®¯ç®°ç®²ç®³ç®µç®¶ç®·ç®¹",7,"ç¯‚ç¯ƒç¯„åŸ‚è€¿æ¢—å·¥æ”»åŠŸæ­é¾šä¾›èº¬å…¬å®«å¼“å·©æ±žæ‹±è´¡å…±é’©å‹¾æ²Ÿè‹Ÿç‹—åž¢æž„è´­å¤Ÿè¾œè‡å’•ç®ä¼°æ²½å­¤å§‘é¼“å¤è›Šéª¨è°·è‚¡æ•…é¡¾å›ºé›‡åˆ®ç“œå‰å¯¡æŒ‚è¤‚ä¹–æ‹æ€ªæ£ºå…³å®˜å† è§‚ç®¡é¦†ç½æƒ¯çŒè´¯å…‰å¹¿é€›ç‘°è§„åœ­ç¡…å½’é¾Ÿé—ºè½¨é¬¼è¯¡ç™¸æ¡‚æŸœè·ªè´µåˆ½è¾Šæ»šæ£é”…éƒ­å›½æžœè£¹è¿‡å“ˆ"],["ba40","ç¯…ç¯ˆç¯‰ç¯Šç¯‹ç¯ç¯Žç¯ç¯ç¯’ç¯”",4,"ç¯›ç¯œç¯žç¯Ÿç¯ ç¯¢ç¯£ç¯¤ç¯§ç¯¨ç¯©ç¯«ç¯¬ç¯­ç¯¯ç¯°ç¯²",4,"ç¯¸ç¯¹ç¯ºç¯»ç¯½ç¯¿",7,"ç°ˆç°‰ç°Šç°ç°Žç°",5,"ç°—ç°˜ç°™"],["ba80","ç°š",4,"ç° ",5,"ç°¨ç°©ç°«",12,"ç°¹",5,"ç±‚éª¸å­©æµ·æ°¦äº¥å®³éª‡é…£æ†¨é‚¯éŸ©å«æ¶µå¯’å‡½å–Šç½•ç¿°æ’¼ææ—±æ†¾æ‚ç„Šæ±—æ±‰å¤¯æ­èˆªå£•åšŽè±ªæ¯«éƒå¥½è€—å·æµ©å‘µå–è·èæ ¸ç¦¾å’Œä½•åˆç›’è²‰é˜‚æ²³æ¶¸èµ«è¤é¹¤è´ºå˜¿é»‘ç—•å¾ˆç‹ æ¨å“¼äº¨æ¨ªè¡¡æ’è½°å“„çƒ˜è™¹é¸¿æ´ªå®å¼˜çº¢å–‰ä¾¯çŒ´å¼åŽšå€™åŽå‘¼ä¹Žå¿½ç‘šå£¶è‘«èƒ¡è´ç‹ç³Šæ¹–"],["bb40","ç±ƒ",9,"ç±Ž",36,"ç±µ",5,"ç±¾",9],["bb80","ç²ˆç²Š",6,"ç²“ç²”ç²–ç²™ç²šç²›ç² ç²¡ç²£ç²¦ç²§ç²¨ç²©ç²«ç²¬ç²­ç²¯ç²°ç²´",4,"ç²ºç²»å¼§è™Žå”¬æŠ¤äº’æ²ªæˆ·èŠ±å“—åŽçŒ¾æ»‘ç”»åˆ’åŒ–è¯æ§å¾Šæ€€æ·®åæ¬¢çŽ¯æ¡“è¿˜ç¼“æ¢æ‚£å”¤ç—ªè±¢ç„•æ¶£å®¦å¹»è’æ…Œé»„ç£ºè—ç°§çš‡å‡°æƒ¶ç…Œæ™ƒå¹Œæè°Žç°æŒ¥è¾‰å¾½æ¢è›”å›žæ¯æ‚”æ…§å‰æƒ æ™¦è´¿ç§½ä¼šçƒ©æ±‡è®³è¯²ç»˜è¤æ˜å©šé­‚æµ‘æ··è±æ´»ä¼™ç«èŽ·æˆ–æƒ‘éœè´§ç¥¸å‡»åœ¾åŸºæœºç•¸ç¨½ç§¯ç®•"],["bc40","ç²¿ç³€ç³‚ç³ƒç³„ç³†ç³‰ç³‹ç³Ž",6,"ç³˜ç³šç³›ç³ç³žç³¡",6,"ç³©",5,"ç³°",7,"ç³¹ç³ºç³¼",13,"ç´‹",5],["bc80","ç´‘",14,"ç´¡ç´£ç´¤ç´¥ç´¦ç´¨ç´©ç´ªç´¬ç´­ç´®ç´°",6,"è‚Œé¥¥è¿¹æ¿€è®¥é¸¡å§¬ç»©ç¼‰å‰æžæ£˜è¾‘ç±é›†åŠæ€¥ç–¾æ±²å³å«‰çº§æŒ¤å‡ è„Šå·±è“ŸæŠ€å†€å­£ä¼Žç¥­å‰‚æ‚¸æµŽå¯„å¯‚è®¡è®°æ—¢å¿Œé™…å¦“ç»§çºªå˜‰æž·å¤¹ä½³å®¶åŠ èšé¢Šè´¾ç”²é’¾å‡ç¨¼ä»·æž¶é©¾å«æ­¼ç›‘åšå°–ç¬ºé—´ç…Žå…¼è‚©è‰°å¥¸ç¼„èŒ§æ£€æŸ¬ç¢±ç¡·æ‹£æ¡ç®€ä¿­å‰ªå‡èæ§›é‰´è·µè´±è§é”®ç®­ä»¶"],["bd40","ç´·",54,"çµ¯",7],["bd80","çµ¸",32,"å¥èˆ°å‰‘é¥¯æ¸æº…æ¶§å»ºåƒµå§œå°†æµ†æ±Ÿç–†è’‹æ¡¨å¥–è®²åŒ é…±é™è•‰æ¤’ç¤ç„¦èƒ¶äº¤éƒŠæµ‡éª„å¨‡åš¼æ…é“°çŸ«ä¾¥è„šç‹¡è§’é¥ºç¼´ç»žå‰¿æ•™é…µè½¿è¾ƒå«çª–æ­æŽ¥çš†ç§¸è¡—é˜¶æˆªåŠ«èŠ‚æ¡”æ°æ·ç«ç«­æ´ç»“è§£å§æˆ’è—‰èŠ¥ç•Œå€Ÿä»‹ç–¥è¯«å±Šå·¾ç­‹æ–¤é‡‘ä»Šæ´¥è¥Ÿç´§é”¦ä»…è°¨è¿›é³æ™‹ç¦è¿‘çƒ¬æµ¸"],["be40","ç¶™",12,"ç¶§",6,"ç¶¯",42],["be80","ç·š",32,"å°½åŠ²è†å…¢èŒŽç›æ™¶é²¸äº¬æƒŠç²¾ç²³ç»äº•è­¦æ™¯é¢ˆé™å¢ƒæ•¬é•œå¾„ç—‰é–ç«Ÿç«žå‡€ç‚¯çª˜æªç©¶çº çŽ–éŸ­ä¹…ç¸ä¹é…’åŽ©æ•‘æ—§è‡¼èˆ…å’Žå°±ç–šéž æ‹˜ç‹™ç–½å±…é©¹èŠå±€å’€çŸ©ä¸¾æ²®èšæ‹’æ®å·¨å…·è·è¸žé”¯ä¿±å¥æƒ§ç‚¬å‰§æé¹ƒå¨Ÿå€¦çœ·å·ç»¢æ’…æ”«æŠ‰æŽ˜å€”çˆµè§‰å†³è¯€ç»å‡èŒé’§å†›å›å³»"],["bf40","ç·»",62],["bf80","ç¸ºç¸¼",4,"ç¹‚",4,"ç¹ˆ",21,"ä¿Šç«£æµšéƒ¡éªå–€å’–å¡å’¯å¼€æ©æ¥·å‡¯æ…¨åˆŠå ªå‹˜åŽç çœ‹åº·æ…·ç³ æ‰›æŠ—äº¢ç‚•è€ƒæ‹·çƒ¤é å·è‹›æŸ¯æ£µç£•é¢—ç§‘å£³å’³å¯æ¸´å…‹åˆ»å®¢è¯¾è‚¯å•ƒåž¦æ³å‘å­ç©ºæå­”æŽ§æŠ å£æ‰£å¯‡æž¯å“­çªŸè‹¦é…·åº“è£¤å¤¸åž®æŒŽè·¨èƒ¯å—ç­·ä¾©å¿«å®½æ¬¾åŒ¡ç­ç‹‚æ¡†çŸ¿çœ¶æ—·å†µäºç›”å²¿çª¥è‘µå¥Žé­å‚€"],["c040","ç¹ž",35,"çºƒ",23,"çºœçºçºž"],["c080","çº®çº´çº»çº¼ç»–ç»¤ç»¬ç»¹ç¼Šç¼ç¼žç¼·ç¼¹ç¼»",6,"ç½ƒç½†",9,"ç½’ç½“é¦ˆæ„§æºƒå¤æ˜†æ†å›°æ‹¬æ‰©å»“é˜”åžƒæ‹‰å–‡èœ¡è…Šè¾£å•¦èŽ±æ¥èµ–è“å©ªæ æ‹¦ç¯®é˜‘å…°æ¾œè°°æ½è§ˆæ‡’ç¼†çƒ‚æ»¥ç…æ¦”ç‹¼å»ŠéƒŽæœ—æµªæžåŠ³ç‰¢è€ä½¬å§¥é…ªçƒ™æ¶å‹’ä¹é›·é•­è•¾ç£Šç´¯å„¡åž’æ“‚è‚‹ç±»æ³ªæ£±æ¥žå†·åŽ˜æ¢¨çŠé»Žç¯±ç‹¸ç¦»æ¼“ç†æŽé‡Œé²¤ç¤¼èŽ‰è”åæ —ä¸½åŽ‰åŠ±ç ¾åŽ†åˆ©å‚ˆä¾‹ä¿"],["c140","ç½–ç½™ç½›ç½œç½ç½žç½ ç½£",4,"ç½«ç½¬ç½­ç½¯ç½°ç½³ç½µç½¶ç½·ç½¸ç½ºç½»ç½¼ç½½ç½¿ç¾€ç¾‚",7,"ç¾‹ç¾ç¾",4,"ç¾•",4,"ç¾›ç¾œç¾ ç¾¢ç¾£ç¾¥ç¾¦ç¾¨",6,"ç¾±"],["c180","ç¾³",4,"ç¾ºç¾»ç¾¾ç¿€ç¿‚ç¿ƒç¿„ç¿†ç¿‡ç¿ˆç¿‰ç¿‹ç¿ç¿",4,"ç¿–ç¿—ç¿™",5,"ç¿¢ç¿£ç—¢ç«‹ç²’æ²¥éš¶åŠ›ç’ƒå“©ä¿©è”èŽ²è¿žé•°å»‰æ€œæ¶Ÿå¸˜æ•›è„¸é“¾æ‹ç‚¼ç»ƒç²®å‡‰æ¢ç²±è‰¯ä¸¤è¾†é‡æ™¾äº®è°…æ’©èŠåƒšç–—ç‡Žå¯¥è¾½æ½¦äº†æ’‚é•£å»–æ–™åˆ—è£‚çƒˆåŠ£çŒŽç³æž—ç£·éœ–ä¸´é‚»é³žæ·‹å‡›èµåæ‹ŽçŽ²è±é›¶é¾„é“ƒä¼¶ç¾šå‡Œçµé™µå²­é¢†å¦ä»¤æºœç‰æ¦´ç¡«é¦ç•™åˆ˜ç˜¤æµæŸ³å…­é¾™è‹å’™ç¬¼çª¿"],["c240","ç¿¤ç¿§ç¿¨ç¿ªç¿«ç¿¬ç¿­ç¿¯ç¿²ç¿´",6,"ç¿½ç¿¾ç¿¿è€‚è€‡è€ˆè€‰è€Šè€Žè€è€‘è€“è€šè€›è€è€žè€Ÿè€¡è€£è€¤è€«",5,"è€²è€´è€¹è€ºè€¼è€¾è€èè„è…è‡èˆè‰èŽèèè‘è“è•è–è—"],["c280","è™è›",13,"è«",5,"è²",11,"éš†åž„æ‹¢é™‡æ¥¼å¨„æ‚ç¯“æ¼é™‹èŠ¦å¢é¢…åºç‚‰æŽ³å¤è™é²éº“ç¢Œéœ²è·¯èµ‚é¹¿æ½žç¦„å½•é™†æˆ®é©´å•é“ä¾£æ—…å±¥å±¡ç¼•è™‘æ°¯å¾‹çŽ‡æ»¤ç»¿å³¦æŒ›å­ªæ»¦åµä¹±æŽ ç•¥æŠ¡è½®ä¼¦ä»‘æ²¦çº¶è®ºèèžºç½—é€»é”£ç®©éª¡è£¸è½æ´›éª†ç»œå¦ˆéº»çŽ›ç èš‚é©¬éª‚å˜›å—åŸ‹ä¹°éº¦å–è¿ˆè„‰çž’é¦’è›®æ»¡è”“æ›¼æ…¢æ¼«"],["c340","è¾è‚è‚‚è‚…è‚ˆè‚Šè‚",5,"è‚”è‚•è‚—è‚™è‚žè‚£è‚¦è‚§è‚¨è‚¬è‚°è‚³è‚µè‚¶è‚¸è‚¹è‚»èƒ…èƒ‡",4,"èƒ",6,"èƒ˜èƒŸèƒ èƒ¢èƒ£èƒ¦èƒ®èƒµèƒ·èƒ¹èƒ»èƒ¾èƒ¿è„€è„è„ƒè„„è„…è„‡è„ˆè„‹"],["c380","è„Œè„•è„—è„™è„›è„œè„è„Ÿ",12,"è„­è„®è„°è„³è„´è„µè„·è„¹",4,"è„¿è°©èŠ’èŒ«ç›²æ°“å¿™èŽ½çŒ«èŒ…é”šæ¯›çŸ›é“†å¯èŒ‚å†’å¸½è²Œè´¸ä¹ˆçŽ«æžšæ¢…é…¶éœ‰ç…¤æ²¡çœ‰åª’é•æ¯ç¾Žæ˜§å¯å¦¹åªšé—¨é—·ä»¬èŒè’™æª¬ç›Ÿé”°çŒ›æ¢¦å­Ÿçœ¯é†šé¡ç³œè¿·è°œå¼¥ç±³ç§˜è§…æ³Œèœœå¯†å¹‚æ£‰çœ ç»µå†•å…å‹‰å¨©ç¼…é¢è‹—æçž„è—ç§’æ¸ºåº™å¦™è”‘ç­æ°‘æŠ¿çš¿æ•æ‚¯é—½æ˜ŽèžŸé¸£é“­åå‘½è°¬æ‘¸"],["c440","è…€",5,"è…‡è…‰è…è…Žè…è…’è…–è…—è…˜è…›",4,"è…¡è…¢è…£è…¤è…¦è…¨è…ªè…«è…¬è…¯è…²è…³è…µè…¶è…·è…¸è†è†ƒ",4,"è†‰è†‹è†Œè†è†Žè†è†’",5,"è†™è†šè†ž",4,"è†¤è†¥"],["c480","è†§è†©è†«",7,"è†´",5,"è†¼è†½è†¾è†¿è‡„è‡…è‡‡è‡ˆè‡‰è‡‹è‡",6,"æ‘¹è˜‘æ¨¡è†œç£¨æ‘©é­”æŠ¹æœ«èŽ«å¢¨é»˜æ²«æ¼ å¯žé™Œè°‹ç‰ŸæŸæ‹‡ç‰¡äº©å§†æ¯å¢“æš®å¹•å‹Ÿæ…•æœ¨ç›®ç¦ç‰§ç©†æ‹¿å“ªå‘é’ é‚£å¨œçº³æ°–ä¹ƒå¥¶è€å¥ˆå—ç”·éš¾å›ŠæŒ è„‘æ¼é—¹æ·–å‘¢é¦å†…å«©èƒ½å¦®éœ“å€ªæ³¥å°¼æ‹Ÿä½ åŒ¿è…»é€†æººè”«æ‹ˆå¹´ç¢¾æ’µæ»å¿µå¨˜é…¿é¸Ÿå°¿æè‚å­½å•®é•Šé•æ¶…æ‚¨æŸ ç‹žå‡å®"],["c540","è‡”",14,"è‡¤è‡¥è‡¦è‡¨è‡©è‡«è‡®",4,"è‡µ",5,"è‡½è‡¿èˆƒèˆ‡",4,"èˆŽèˆèˆ‘èˆ“èˆ•",5,"èˆèˆ èˆ¤èˆ¥èˆ¦èˆ§èˆ©èˆ®èˆ²èˆºèˆ¼èˆ½èˆ¿"],["c580","è‰€è‰è‰‚è‰ƒè‰…è‰†è‰ˆè‰Šè‰Œè‰è‰Žè‰",7,"è‰™è‰›è‰œè‰è‰žè‰ ",7,"è‰©æ‹§æ³žç‰›æ‰­é’®çº½è„“æµ“å†œå¼„å¥´åŠªæ€’å¥³æš–è™ç–ŸæŒªæ‡¦ç³¯è¯ºå“¦æ¬§é¸¥æ®´è—•å‘•å¶æ²¤å•ªè¶´çˆ¬å¸•æ€•ç¶æ‹æŽ’ç‰Œå¾˜æ¹ƒæ´¾æ”€æ½˜ç›˜ç£ç›¼ç•”åˆ¤å›ä¹“åºžæ—è€ªèƒ–æŠ›å’†åˆ¨ç‚®è¢è·‘æ³¡å‘¸èƒšåŸ¹è£´èµ”é™ªé…ä½©æ²›å–·ç›†ç °æŠ¨çƒ¹æ¾Žå½­è“¬æ£šç¡¼ç¯·è†¨æœ‹é¹æ§ç¢°å¯ç ’éœ¹æ‰¹æŠ«åŠˆçµæ¯—"],["c640","è‰ªè‰«è‰¬è‰­è‰±è‰µè‰¶è‰·è‰¸è‰»è‰¼èŠ€èŠèŠƒèŠ…èŠ†èŠ‡èŠ‰èŠŒèŠèŠ“èŠ”èŠ•èŠ–èŠšèŠ›èŠžèŠ èŠ¢èŠ£èŠ§èŠ²èŠµèŠ¶èŠºèŠ»èŠ¼èŠ¿è‹€è‹‚è‹ƒè‹…è‹†è‹‰è‹è‹–è‹™è‹šè‹è‹¢è‹§è‹¨è‹©è‹ªè‹¬è‹­è‹®è‹°è‹²è‹³è‹µè‹¶è‹¸"],["c680","è‹ºè‹¼",4,"èŒŠèŒ‹èŒèŒèŒ’èŒ“èŒ–èŒ˜èŒ™èŒ",9,"èŒ©èŒªèŒ®èŒ°èŒ²èŒ·èŒ»èŒ½å•¤è„¾ç–²çš®åŒ¹ç—žåƒ»å±è­¬ç¯‡åç‰‡éª—é£˜æ¼‚ç“¢ç¥¨æ’‡çž¥æ‹¼é¢‘è´«å“è˜ä¹’åªè‹¹èå¹³å‡­ç“¶è¯„å±å¡æ³¼é¢‡å©†ç ´é­„è¿«ç²•å‰–æ‰‘é“ºä»†èŽ†è‘¡è©è’²åŸ”æœ´åœƒæ™®æµ¦è°±æ›ç€‘æœŸæ¬ºæ –æˆšå¦»ä¸ƒå‡„æ¼†æŸ’æ²å…¶æ£‹å¥‡æ­§ç•¦å´Žè„é½æ——ç¥ˆç¥éª‘èµ·å²‚ä¹žä¼å¯å¥‘ç Œå™¨æ°”è¿„å¼ƒæ±½æ³£è®«æŽ"],["c740","èŒ¾èŒ¿èè‚è„è…èˆèŠ",4,"è“è•",4,"èè¢è°",6,"è¹èºè¾",6,"èŽ‡èŽˆèŽŠèŽ‹èŽŒèŽèŽèŽèŽ‘èŽ”èŽ•èŽ–èŽ—èŽ™èŽšèŽèŽŸèŽ¡",6,"èŽ¬èŽ­èŽ®"],["c780","èŽ¯èŽµèŽ»èŽ¾èŽ¿è‚èƒè„è†èˆè‰è‹èèŽèè‘è’è“è•è—è™èšè›èžè¢è£è¤è¦è§è¨è«è¬è­æ°æ´½ç‰µæ‰¦é’Žé“…åƒè¿ç­¾ä»Ÿè°¦ä¹¾é»”é’±é’³å‰æ½œé£æµ…è°´å ‘åµŒæ¬ æ­‰æžªå‘›è…”ç¾Œå¢™è”·å¼ºæŠ¢æ©‡é”¹æ•²æ‚„æ¡¥çž§ä¹”ä¾¨å·§éž˜æ’¬ç¿˜å³­ä¿çªåˆ‡èŒ„ä¸”æ€¯çªƒé’¦ä¾µäº²ç§¦ç´å‹¤èŠ¹æ“’ç¦½å¯æ²é’è½»æ°¢å€¾å¿æ¸…æ“Žæ™´æ°°æƒ…é¡·è¯·åº†ç¼ç©·ç§‹ä¸˜é‚±çƒæ±‚å›šé…‹æ³…è¶‹åŒºè›†æ›²èº¯å±ˆé©±æ¸ "],["c840","è®è¯è³",4,"èºè»è¼è¾è¿è€è‚è…è‡èˆè‰èŠèè’",5,"è™èšè›èž",5,"è©",7,"è²",5,"è¹èºè»è¾",7,"è‘‡è‘ˆè‘‰"],["c880","è‘Š",6,"è‘’",4,"è‘˜è‘è‘žè‘Ÿè‘ è‘¢è‘¤",4,"è‘ªè‘®è‘¯è‘°è‘²è‘´è‘·è‘¹è‘»è‘¼å–å¨¶é¾‹è¶£åŽ»åœˆé¢§æƒé†›æ³‰å…¨ç—Šæ‹³çŠ¬åˆ¸åŠç¼ºç‚”ç˜¸å´é¹Šæ¦·ç¡®é›€è£™ç¾¤ç„¶ç‡ƒå†‰æŸ“ç“¤å£¤æ”˜åš·è®©é¥¶æ‰°ç»•æƒ¹çƒ­å£¬ä»äººå¿éŸ§ä»»è®¤åˆƒå¦Šçº«æ‰”ä»æ—¥æˆŽèŒ¸è“‰è£èžç†”æº¶å®¹ç»’å†—æ‰æŸ”è‚‰èŒ¹è •å„’å­ºå¦‚è¾±ä¹³æ±å…¥è¤¥è½¯é˜®è•Šç‘žé”é—°æ¶¦è‹¥å¼±æ’’æ´’è¨è…®é³ƒå¡žèµ›ä¸‰å"],["c940","è‘½",4,"è’ƒè’„è’…è’†è’Šè’è’",7,"è’˜è’šè’›è’è’žè’Ÿè’ è’¢",12,"è’°è’±è’³è’µè’¶è’·è’»è’¼è’¾è“€è“‚è“ƒè“…è“†è“‡è“ˆè“‹è“Œè“Žè“è“’è“”è“•è“—"],["c980","è“˜",4,"è“žè“¡è“¢è“¤è“§",4,"è“­è“®è“¯è“±",10,"è“½è“¾è”€è”è”‚ä¼žæ•£æ¡‘å—“ä¸§æ”éªšæ‰«å«‚ç‘Ÿè‰²æ¶©æ£®åƒ§èŽŽç ‚æ€åˆ¹æ²™çº±å‚»å•¥ç…žç­›æ™’çŠè‹«æ‰å±±åˆ ç…½è¡«é—ªé™•æ“…èµ¡è†³å–„æ±•æ‰‡ç¼®å¢’ä¼¤å•†èµæ™Œä¸Šå°šè£³æ¢¢æŽç¨çƒ§èŠå‹ºéŸ¶å°‘å“¨é‚µç»å¥¢èµŠè›‡èˆŒèˆèµ¦æ‘„å°„æ…‘æ¶‰ç¤¾è®¾ç ·ç”³å‘»ä¼¸èº«æ·±å¨ ç»…ç¥žæ²ˆå®¡å©¶ç”šè‚¾æ…Žæ¸—å£°ç”Ÿç”¥ç‰²å‡ç»³"],["ca40","è”ƒ",8,"è”è”Žè”è”è”’è””è”•è”–è”˜è”™è”›è”œè”è”žè” è”¢",8,"è”­",9,"è”¾",4,"è•„è•…è•†è•‡è•‹",10],["ca80","è•—è•˜è•šè•›è•œè•è•Ÿ",4,"è•¥è•¦è•§è•©",8,"è•³è•µè•¶è•·è•¸è•¼è•½è•¿è–€è–çœç››å‰©èƒœåœ£å¸ˆå¤±ç‹®æ–½æ¹¿è¯—å°¸è™±åçŸ³æ‹¾æ—¶ä»€é£Ÿèš€å®žè¯†å²çŸ¢ä½¿å±Žé©¶å§‹å¼ç¤ºå£«ä¸–æŸ¿äº‹æ‹­èª“é€åŠ¿æ˜¯å—œå™¬é€‚ä»•ä¾é‡Šé¥°æ°å¸‚æƒå®¤è§†è¯•æ”¶æ‰‹é¦–å®ˆå¯¿æŽˆå”®å—ç˜¦å…½è”¬æž¢æ¢³æ®ŠæŠ’è¾“å”èˆ’æ·‘ç–ä¹¦èµŽå­°ç†Ÿè–¯æš‘æ›™ç½²èœ€é»é¼ å±žæœ¯è¿°æ ‘æŸæˆç«–å¢…åº¶æ•°æ¼±"],["cb40","è–‚è–ƒè–†è–ˆ",6,"è–",10,"è–",6,"è–¥è–¦è–§è–©è–«è–¬è–­è–±",5,"è–¸è–º",6,"è—‚",6,"è—Š",4,"è—‘è—’"],["cb80","è—”è—–",5,"è—",6,"è—¥è—¦è—§è—¨è—ª",14,"æ•åˆ·è€æ‘”è¡°ç”©å¸…æ “æ‹´éœœåŒçˆ½è°æ°´ç¡ç¨Žå®çž¬é¡ºèˆœè¯´ç¡•æœ”çƒæ–¯æ’•å˜¶æ€ç§å¸ä¸æ­»è‚†å¯ºå—£å››ä¼ºä¼¼é¥²å·³æ¾è€¸æ€‚é¢‚é€å®‹è®¼è¯µæœè‰˜æ“žå—½è‹é…¥ä¿—ç´ é€Ÿç²Ÿåƒ³å¡‘æº¯å®¿è¯‰è‚ƒé…¸è’œç®—è™½éš‹éšç»¥é«“ç¢Žå²ç©—é‚éš§ç¥Ÿå­™æŸç¬‹è“‘æ¢­å”†ç¼©çç´¢é”æ‰€å¡Œä»–å®ƒå¥¹å¡”"],["cc40","è—¹è—ºè—¼è—½è—¾è˜€",4,"è˜†",10,"è˜’è˜“è˜”è˜•è˜—",15,"è˜¨è˜ª",13,"è˜¹è˜ºè˜»è˜½è˜¾è˜¿è™€"],["cc80","è™",11,"è™’è™“è™•",4,"è™›è™œè™è™Ÿè™ è™¡è™£",7,"ç­æŒžè¹‹è¸èƒŽè‹”æŠ¬å°æ³°é…žå¤ªæ€æ±°åæ‘Šè´ªç˜«æ»©å›æª€ç—°æ½­è°­è°ˆå¦æ¯¯è¢’ç¢³æŽ¢å¹ç‚­æ±¤å¡˜æªå ‚æ£ è†›å”ç³–å€˜èººæ·Œè¶Ÿçƒ«æŽæ¶›æ»”ç»¦è„æ¡ƒé€ƒæ·˜é™¶è®¨å¥—ç‰¹è—¤è…¾ç–¼èªŠæ¢¯å‰”è¸¢é”‘æé¢˜è¹„å•¼ä½“æ›¿åšæƒ•æ¶•å‰ƒå±‰å¤©æ·»å¡«ç”°ç”œæ¬èˆ”è…†æŒ‘æ¡è¿¢çœºè·³è´´é“å¸–åŽ…å¬çƒƒ"],["cd40","è™­è™¯è™°è™²",6,"èšƒ",6,"èšŽ",4,"èš”èš–",5,"èšž",4,"èš¥èš¦èš«èš­èš®èš²èš³èš·èš¸èš¹èš»",4,"è›è›‚è›ƒè›…è›ˆè›Œè›è›’è›“è›•è›–è›—è›šè›œ"],["cd80","è›è› è›¡è›¢è›£è›¥è›¦è›§è›¨è›ªè›«è›¬è›¯è›µè›¶è›·è›ºè›»è›¼è›½è›¿èœèœ„èœ…èœ†èœ‹èœŒèœŽèœèœèœ‘èœ”èœ–æ±€å»·åœäº­åº­æŒºè‰‡é€šæ¡é…®çž³åŒé“œå½¤ç«¥æ¡¶æ…ç­’ç»Ÿç—›å·æŠ•å¤´é€å‡¸ç§ƒçªå›¾å¾’é€”æ¶‚å± åœŸåå…”æ¹å›¢æŽ¨é¢“è…¿èœ•è¤ªé€€åžå±¯è‡€æ‹–æ‰˜è„±é¸µé™€é©®é©¼æ¤­å¦¥æ‹“å”¾æŒ–å“‡è›™æ´¼å¨ƒç“¦è¢œæ­ªå¤–è±Œå¼¯æ¹¾çŽ©é¡½ä¸¸çƒ·å®Œç¢—æŒ½æ™šçš–æƒ‹å®›å©‰ä¸‡è…•æ±ªçŽ‹äº¡æž‰ç½‘å¾€æ—ºæœ›å¿˜å¦„å¨"],["ce40","èœ™èœ›èœèœŸèœ èœ¤èœ¦èœ§èœ¨èœªèœ«èœ¬èœ­èœ¯èœ°èœ²èœ³èœµèœ¶èœ¸èœ¹èœºèœ¼èœ½è€",6,"èŠè‹èèèè‘è’è”è•è–è˜èš",5,"è¡è¢è¦",7,"è¯è±è²è³èµ"],["ce80","è·è¸è¹èºè¿èž€èžèž„èž†èž‡èž‰èžŠèžŒèžŽ",4,"èž”èž•èž–èž˜",6,"èž ",4,"å·å¾®å±éŸ¦è¿æ¡…å›´å”¯æƒŸä¸ºæ½ç»´è‹‡èŽå§”ä¼Ÿä¼ªå°¾çº¬æœªè”šå‘³ç•èƒƒå–‚é­ä½æ¸­è°“å°‰æ…°å«ç˜Ÿæ¸©èšŠæ–‡é—»çº¹å»ç¨³ç´Šé—®å—¡ç¿ç“®æŒèœ—æ¶¡çªæˆ‘æ–¡å§æ¡æ²ƒå·«å‘œé’¨ä¹Œæ±¡è¯¬å±‹æ— èŠœæ¢§å¾å´æ¯‹æ­¦äº”æ‚åˆèˆžä¼ä¾®åžæˆŠé›¾æ™¤ç‰©å‹¿åŠ¡æ‚Ÿè¯¯æ˜”ç†™æžè¥¿ç¡’çŸ½æ™°å˜»å¸é”¡ç‰º"],["cf40","èž¥èž¦èž§èž©èžªèž®èž°èž±èž²èž´èž¶èž·èž¸èž¹èž»èž¼èž¾èž¿èŸ",4,"èŸ‡èŸˆèŸ‰èŸŒ",4,"èŸ”",6,"èŸœèŸèŸžèŸŸèŸ¡èŸ¢èŸ£èŸ¤èŸ¦èŸ§èŸ¨èŸ©èŸ«èŸ¬èŸ­èŸ¯",9],["cf80","èŸºèŸ»èŸ¼èŸ½èŸ¿è €è è ‚è „",5,"è ‹",7,"è ”è —è ˜è ™è šè œ",4,"è £ç¨€æ¯å¸Œæ‚‰è†å¤•æƒœç†„çƒ¯æºªæ±çŠ€æª„è¢­å¸­ä¹ åª³å–œé“£æ´—ç³»éš™æˆç»†çžŽè™¾åŒ£éœžè¾–æš‡å³¡ä¾ ç‹­ä¸‹åŽ¦å¤å“æŽ€é”¨å…ˆä»™é²œçº¤å’¸è´¤è¡”èˆ·é—²æ¶Žå¼¦å«Œæ˜¾é™©çŽ°çŒ®åŽ¿è…ºé¦…ç¾¡å®ªé™·é™çº¿ç›¸åŽ¢é•¶é¦™ç®±è¥„æ¹˜ä¹¡ç¿”ç¥¥è¯¦æƒ³å“äº«é¡¹å··æ©¡åƒå‘è±¡è§ç¡éœ„å‰Šå“®åš£é”€æ¶ˆå®µæ·†æ™“"],["d040","è ¤",13,"è ³",5,"è ºè »è ½è ¾è ¿è¡è¡‚è¡ƒè¡†",5,"è¡Ž",5,"è¡•è¡–è¡˜è¡š",6,"è¡¦è¡§è¡ªè¡­è¡¯è¡±è¡³è¡´è¡µè¡¶è¡¸è¡¹è¡º"],["d080","è¡»è¡¼è¢€è¢ƒè¢†è¢‡è¢‰è¢Šè¢Œè¢Žè¢è¢è¢‘è¢“è¢”è¢•è¢—",4,"è¢",4,"è¢£è¢¥",5,"å°å­æ ¡è‚–å•¸ç¬‘æ•ˆæ¥”äº›æ­‡èŽéž‹åæŒŸæºé‚ªæ–œèƒè°å†™æ¢°å¸èŸ¹æ‡ˆæ³„æ³»è°¢å±‘è–ªèŠ¯é”Œæ¬£è¾›æ–°å¿»å¿ƒä¿¡è¡…æ˜Ÿè…¥çŒ©æƒºå…´åˆ‘åž‹å½¢é‚¢è¡Œé†’å¹¸ææ€§å§“å…„å‡¶èƒ¸åŒˆæ±¹é›„ç†Šä¼‘ä¿®ç¾žæœ½å—…é”ˆç§€è¢–ç»£å¢ŸæˆŒéœ€è™šå˜˜é¡»å¾è®¸è“„é…—å™æ—­åºç•œæ¤çµ®å©¿ç»ªç»­è½©å–§å®£æ‚¬æ—‹çŽ„"],["d140","è¢¬è¢®è¢¯è¢°è¢²",4,"è¢¸è¢¹è¢ºè¢»è¢½è¢¾è¢¿è£€è£ƒè£„è£‡è£ˆè£Šè£‹è£Œè£è£è£è£‘è£“è£–è£—è£š",4,"è£ è£¡è£¦è£§è£©",6,"è£²è£µè£¶è£·è£ºè£»è£½è£¿è¤€è¤è¤ƒ",5],["d180","è¤‰è¤‹",4,"è¤‘è¤”",4,"è¤œ",4,"è¤¢è¤£è¤¤è¤¦è¤§è¤¨è¤©è¤¬è¤­è¤®è¤¯è¤±è¤²è¤³è¤µè¤·é€‰ç™£çœ©ç»šé´è–›å­¦ç©´é›ªè¡€å‹‹ç†å¾ªæ—¬è¯¢å¯»é©¯å·¡æ®‰æ±›è®­è®¯é€Šè¿…åŽ‹æŠ¼é¸¦é¸­å‘€ä¸«èŠ½ç‰™èšœå´–è¡™æ¶¯é›…å“‘äºšè®¶ç„‰å’½é˜‰çƒŸæ·¹ç›ä¸¥ç ”èœ’å²©å»¶è¨€é¢œé˜Žç‚Žæ²¿å¥„æŽ©çœ¼è¡æ¼”è‰³å °ç‡•åŽŒç šé›å”å½¦ç„°å®´è°šéªŒæ®ƒå¤®é¸¯ç§§æ¨æ‰¬ä½¯ç–¡ç¾Šæ´‹é˜³æ°§ä»°ç—’å…»æ ·æ¼¾é‚€è…°å¦–ç‘¶"],["d240","è¤¸",8,"è¥‚è¥ƒè¥…",24,"è¥ ",5,"è¥§",19,"è¥¼"],["d280","è¥½è¥¾è¦€è¦‚è¦„è¦…è¦‡",26,"æ‘‡å°§é¥çª‘è°£å§šå’¬èˆ€è¯è¦è€€æ¤°å™Žè€¶çˆ·é‡Žå†¶ä¹Ÿé¡µæŽ–ä¸šå¶æ›³è…‹å¤œæ¶²ä¸€å£¹åŒ»æ–é“±ä¾ä¼Šè¡£é¢å¤·é—ç§»ä»ªèƒ°ç–‘æ²‚å®œå§¨å½æ¤…èšå€šå·²ä¹™çŸ£ä»¥è‰ºæŠ‘æ˜“é‚‘å±¹äº¿å½¹è‡†é€¸è‚„ç–«äº¦è£”æ„æ¯…å¿†ä¹‰ç›Šæº¢è¯£è®®è°Šè¯‘å¼‚ç¿¼ç¿Œç»ŽèŒµè«å› æ®·éŸ³é˜´å§»åŸé“¶æ·«å¯…é¥®å°¹å¼•éš"],["d340","è¦¢",30,"è§ƒè§è§“è§”è§•è§—è§˜è§™è§›è§è§Ÿè§ è§¡è§¢è§¤è§§è§¨è§©è§ªè§¬è§­è§®è§°è§±è§²è§´",6],["d380","è§»",4,"è¨",5,"è¨ˆ",21,"å°è‹±æ¨±å©´é¹°åº”ç¼¨èŽ¹è¤è¥è§è‡è¿Žèµ¢ç›ˆå½±é¢–ç¡¬æ˜ å“Ÿæ‹¥ä½£è‡ƒç—ˆåº¸é›è¸Šè›¹å’æ³³æ¶Œæ°¸æ¿å‹‡ç”¨å¹½ä¼˜æ‚ å¿§å°¤ç”±é‚®é“€çŠ¹æ²¹æ¸¸é…‰æœ‰å‹å³ä½‘é‡‰è¯±åˆå¹¼è¿‚æ·¤äºŽç›‚æ¦†è™žæ„šèˆ†ä½™ä¿žé€¾é±¼æ„‰æ¸æ¸”éš…äºˆå¨±é›¨ä¸Žå±¿ç¦¹å®‡è¯­ç¾½çŽ‰åŸŸèŠ‹éƒåé‡å–»å³ªå¾¡æ„ˆæ¬²ç‹±è‚²èª‰"],["d440","è¨ž",31,"è¨¿",8,"è©‰",21],["d480","è©Ÿ",25,"è©º",6,"æµ´å¯“è£•é¢„è±«é©­é¸³æ¸Šå†¤å…ƒåž£è¢åŽŸæ´è¾•å›­å‘˜åœ†çŒ¿æºç¼˜è¿œè‹‘æ„¿æ€¨é™¢æ›°çº¦è¶Šè·ƒé’¥å²³ç²¤æœˆæ‚¦é˜…è€˜äº‘éƒ§åŒ€é™¨å…è¿è•´é…æ™•éŸµå­•åŒç ¸æ‚æ ½å“‰ç¾å®°è½½å†åœ¨å’±æ”’æš‚èµžèµƒè„è‘¬é­ç³Ÿå‡¿è—»æž£æ—©æ¾¡èš¤èºå™ªé€ çš‚ç¶ç‡¥è´£æ‹©åˆ™æ³½è´¼æ€Žå¢žæ†Žæ›¾èµ æ‰Žå–³æ¸£æœ­è½§"],["d540","èª",7,"èª‹",7,"èª”",46],["d580","è«ƒ",32,"é“¡é—¸çœ¨æ …æ¦¨å’‹ä¹ç‚¸è¯ˆæ‘˜æ–‹å®…çª„å€ºå¯¨çž»æ¯¡è©¹ç²˜æ²¾ç›æ–©è¾—å´­å±•è˜¸æ ˆå æˆ˜ç«™æ¹›ç»½æ¨Ÿç« å½°æ¼³å¼ æŽŒæ¶¨æ–ä¸ˆå¸è´¦ä»—èƒ€ç˜´éšœæ‹›æ˜­æ‰¾æ²¼èµµç…§ç½©å…†è‚‡å¬é®æŠ˜å“²è›°è¾™è€…é”—è”—è¿™æµ™çæ–ŸçœŸç”„ç §è‡»è´žé’ˆä¾¦æž•ç–¹è¯Šéœ‡æŒ¯é•‡é˜µè’¸æŒ£çå¾ç‹°äº‰æ€”æ•´æ‹¯æ­£æ”¿"],["d640","è«¤",34,"è¬ˆ",27],["d680","è¬¤è¬¥è¬§",30,"å¸§ç—‡éƒ‘è¯èŠæžæ”¯å±èœ˜çŸ¥è‚¢è„‚æ±ä¹‹ç»‡èŒç›´æ¤æ®–æ‰§å€¼ä¾„å€æŒ‡æ­¢è¶¾åªæ—¨çº¸å¿—æŒšæŽ·è‡³è‡´ç½®å¸œå³™åˆ¶æ™ºç§©ç¨šè´¨ç‚™ç—”æ»žæ²»çª’ä¸­ç›…å¿ é’Ÿè¡·ç»ˆç§è‚¿é‡ä»²ä¼—èˆŸå‘¨å·žæ´²è¯Œç²¥è½´è‚˜å¸šå’’çš±å®™æ˜¼éª¤ç æ ªè››æœ±çŒªè¯¸è¯›é€ç«¹çƒ›ç…®æ‹„çž©å˜±ä¸»è‘—æŸ±åŠ©è›€è´®é“¸ç­‘"],["d740","è­†",31,"è­§",4,"è­­",25],["d780","è®‡",24,"è®¬è®±è®»è¯‡è¯è¯ªè°‰è°žä½æ³¨ç¥é©»æŠ“çˆªæ‹½ä¸“ç –è½¬æ’°èµšç¯†æ¡©åº„è£…å¦†æ’žå£®çŠ¶æ¤Žé”¥è¿½èµ˜å ç¼€è°†å‡†æ‰æ‹™å“æ¡Œç¢èŒé…Œå•„ç€ç¼æµŠå…¹å’¨èµ„å§¿æ»‹æ·„å­œç´«ä»”ç±½æ»“å­è‡ªæ¸å­—é¬ƒæ£•è¸ªå®—ç»¼æ€»çºµé‚¹èµ°å¥æç§Ÿè¶³å’æ—ç¥–è¯…é˜»ç»„é’»çº‚å˜´é†‰æœ€ç½ªå°Šéµæ˜¨å·¦ä½æŸžåšä½œååº§"],["d840","è°¸",8,"è±‚è±ƒè±„è±…è±ˆè±Šè±‹è±",7,"è±–è±—è±˜è±™è±›",5,"è±£",6,"è±¬",6,"è±´è±µè±¶è±·è±»",6,"è²ƒè²„è²†è²‡"],["d880","è²ˆè²‹è²",6,"è²•è²–è²—è²™",20,"äºä¸Œå…€ä¸å»¿å…ä¸•äº˜ä¸žé¬²å­¬å™©ä¸¨ç¦ºä¸¿åŒ•ä¹‡å¤­çˆ»å®æ°å›Ÿèƒ¤é¦—æ¯“ç¾é¼—ä¸¶äºŸé¼ä¹œä¹©äº“èŠˆå­›å•¬å˜ä»„åŽåŽåŽ£åŽ¥åŽ®é¥èµåŒšåµåŒ¦åŒ®åŒ¾èµœå¦å£åˆ‚åˆˆåˆŽåˆ­åˆ³åˆ¿å‰€å‰Œå‰žå‰¡å‰œè’¯å‰½åŠ‚åŠåŠåŠ“å†‚ç½”äº»ä»ƒä»‰ä»‚ä»¨ä»¡ä»«ä»žä¼›ä»³ä¼¢ä½¤ä»µä¼¥ä¼§ä¼‰ä¼«ä½žä½§æ”¸ä½šä½"],["d940","è²®",62],["d980","è³­",32,"ä½Ÿä½—ä¼²ä¼½ä½¶ä½´ä¾‘ä¾‰ä¾ƒä¾ä½¾ä½»ä¾ªä½¼ä¾¬ä¾”ä¿¦ä¿¨ä¿ªä¿…ä¿šä¿£ä¿œä¿‘ä¿Ÿä¿¸å€©åŒä¿³å€¬å€å€®å€­ä¿¾å€œå€Œå€¥å€¨å¾åƒå•åˆåŽå¬å»å‚¥å‚§å‚©å‚ºåƒ–å„†åƒ­åƒ¬åƒ¦åƒ®å„‡å„‹ä»æ°½ä½˜ä½¥ä¿Žé¾ æ±†ç±´å…®å·½é»‰é¦˜å†å¤”å‹¹åŒè¨‡åŒå‡«å¤™å…•äº å…–äº³è¡®è¢¤äºµè„”è£’ç¦€å¬´è ƒç¾¸å†«å†±å†½å†¼"],["da40","è´Ž",14,"è´ èµ‘èµ’èµ—èµŸèµ¥èµ¨èµ©èµªèµ¬èµ®èµ¯èµ±èµ²èµ¸",8,"è¶‚è¶ƒè¶†è¶‡è¶ˆè¶‰è¶Œ",4,"è¶’è¶“è¶•",9,"è¶ è¶¡"],["da80","è¶¢è¶¤",12,"è¶²è¶¶è¶·è¶¹è¶»è¶½è·€è·è·‚è·…è·‡è·ˆè·‰è·Šè·è·è·’è·“è·”å‡‡å†–å†¢å†¥è® è®¦è®§è®ªè®´è®µè®·è¯‚è¯ƒè¯‹è¯è¯Žè¯’è¯“è¯”è¯–è¯˜è¯™è¯œè¯Ÿè¯ è¯¤è¯¨è¯©è¯®è¯°è¯³è¯¶è¯¹è¯¼è¯¿è°€è°‚è°„è°‡è°Œè°è°‘è°’è°”è°•è°–è°™è°›è°˜è°è°Ÿè° è°¡è°¥è°§è°ªè°«è°®è°¯è°²è°³è°µè°¶å©åºé˜é˜¢é˜¡é˜±é˜ªé˜½é˜¼é™‚é™‰é™”é™Ÿé™§é™¬é™²é™´éšˆéšéš—éš°é‚—é‚›é‚é‚™é‚¬é‚¡é‚´é‚³é‚¶é‚º"],["db40","è·•è·˜è·™è·œè· è·¡è·¢è·¥è·¦è·§è·©è·­è·®è·°è·±è·²è·´è·¶è·¼è·¾",6,"è¸†è¸‡è¸ˆè¸‹è¸è¸Žè¸è¸‘è¸’è¸“è¸•",7,"è¸ è¸¡è¸¤",4,"è¸«è¸­è¸°è¸²è¸³è¸´è¸¶è¸·è¸¸è¸»è¸¼è¸¾"],["db80","è¸¿è¹ƒè¹…è¹†è¹Œ",4,"è¹“",5,"è¹š",11,"è¹§è¹¨è¹ªè¹«è¹®è¹±é‚¸é‚°éƒéƒ…é‚¾éƒéƒ„éƒ‡éƒ“éƒ¦éƒ¢éƒœéƒ—éƒ›éƒ«éƒ¯éƒ¾é„„é„¢é„žé„£é„±é„¯é„¹é…ƒé…†åˆå¥‚åŠ¢åŠ¬åŠ­åŠ¾å“¿å‹å‹–å‹°åŸç‡®çŸå»´å‡µå‡¼é¬¯åŽ¶å¼ç•šå·¯åŒåž©åž¡å¡¾å¢¼å£…å£‘åœ©åœ¬åœªåœ³åœ¹åœ®åœ¯åœåœ»å‚å©åž…å«åž†å¼å»å¨å­å¶å³åž­åž¤åžŒåž²åŸåž§åž´åž“åž åŸ•åŸ˜åŸšåŸ™åŸ’åž¸åŸ´åŸ¯åŸ¸åŸ¤åŸ"],["dc40","è¹³è¹µè¹·",4,"è¹½è¹¾èº€èº‚èºƒèº„èº†èºˆ",6,"èº‘èº’èº“èº•",6,"èºèºŸ",11,"èº­èº®èº°èº±èº³",6,"èº»",7],["dc80","è»ƒ",10,"è»",21,"å ‹å åŸ½åŸ­å €å žå ™å¡„å  å¡¥å¡¬å¢å¢‰å¢šå¢€é¦¨é¼™æ‡¿è‰¹è‰½è‰¿èŠèŠŠèŠ¨èŠ„èŠŽèŠ‘èŠ—èŠ™èŠ«èŠ¸èŠ¾èŠ°è‹ˆè‹Šè‹£èŠ˜èŠ·èŠ®è‹‹è‹Œè‹èŠ©èŠ´èŠ¡èŠªèŠŸè‹„è‹ŽèŠ¤è‹¡èŒ‰è‹·è‹¤èŒèŒ‡è‹œè‹´è‹’è‹˜èŒŒè‹»è‹“èŒ‘èŒšèŒ†èŒ”èŒ•è‹ è‹•èŒœè‘è›èœèŒˆèŽ’èŒ¼èŒ´èŒ±èŽ›èžèŒ¯èè‡èƒèŸè€èŒ—è èŒ­èŒºèŒ³è¦è¥"],["dd40","è»¥",62],["dd80","è¼¤",32,"è¨èŒ›è©è¬èªè­è®èŽ°è¸èŽ³èŽ´èŽ èŽªèŽ“èŽœèŽ…è¼èŽ¶èŽ©è½èŽ¸è»èŽ˜èŽžèŽ¨èŽºèŽ¼èèè¥è˜å ‡è˜è‹èè½è–èœè¸è‘è†è”èŸèèƒè¸è¹èªè…è€è¦è°è¡è‘œè‘‘è‘šè‘™è‘³è’‡è’ˆè‘ºè’‰è‘¸è¼è‘†è‘©è‘¶è’Œè’Žè±è‘­è“è“è“è“¦è’½è““è“Šè’¿è’ºè“ è’¡è’¹è’´è’—è“¥è“£è”Œç”è”¸è“°è”¹è”Ÿè”º"],["de40","è½…",32,"è½ªè¾€è¾Œè¾’è¾è¾ è¾¡è¾¢è¾¤è¾¥è¾¦è¾§è¾ªè¾¬è¾­è¾®è¾¯è¾²è¾³è¾´è¾µè¾·è¾¸è¾ºè¾»è¾¼è¾¿è¿€è¿ƒè¿†"],["de80","è¿‰",4,"è¿è¿’è¿–è¿—è¿šè¿ è¿¡è¿£è¿§è¿¬è¿¯è¿±è¿²è¿´è¿µè¿¶è¿ºè¿»è¿¼è¿¾è¿¿é€‡é€ˆé€Œé€Žé€“é€•é€˜è•–è”»è“¿è“¼è•™è•ˆè•¨è•¤è•žè•ºçž¢è•ƒè•²è•»è–¤è–¨è–‡è–è•¹è–®è–œè–…è–¹è–·è–°è—“è—è—œè—¿è˜§è˜…è˜©è˜–è˜¼å»¾å¼ˆå¤¼å¥è€·å¥•å¥šå¥˜åŒå°¢å°¥å°¬å°´æ‰Œæ‰ªæŠŸæŠ»æ‹Šæ‹šæ‹—æ‹®æŒ¢æ‹¶æŒ¹æ‹æƒæŽ­æ¶æ±æºæŽŽæŽ´æ­æŽ¬æŽŠæ©æŽ®æŽ¼æ²æ¸æ æ¿æ„æžæŽæ‘’æ†æŽ¾æ‘…æ‘æ‹æ›æ æŒæ¦æ¡æ‘žæ’„æ‘­æ’–"],["df40","é€™é€œé€£é€¤é€¥é€§",5,"é€°",4,"é€·é€¹é€ºé€½é€¿é€éƒé…é†éˆ",4,"éŽé”é•é–é™éšéœ",5,"é¤é¦é§é©éªé«é¬é¯",4,"é¶",6,"é¾é‚"],["df80","é‚„é‚…é‚†é‚‡é‚‰é‚Šé‚Œ",4,"é‚’é‚”é‚–é‚˜é‚šé‚œé‚žé‚Ÿé‚ é‚¤é‚¥é‚§é‚¨é‚©é‚«é‚­é‚²é‚·é‚¼é‚½é‚¿éƒ€æ‘ºæ’·æ’¸æ’™æ’ºæ“€æ“æ“—æ“¤æ“¢æ”‰æ”¥æ”®å¼‹å¿’ç”™å¼‘åŸå±å½å©å¨å»å’å–å†å‘‹å‘’å‘“å‘”å‘–å‘ƒå¡å‘—å‘™å£å²å’‚å’”å‘·å‘±å‘¤å’šå’›å’„å‘¶å‘¦å’å“å’­å“‚å’´å“’å’§å’¦å““å“”å‘²å’£å“•å’»å’¿å“Œå“™å“šå“œå’©å’ªå’¤å“å“å“žå”›å“§å” å“½å””å“³å”¢å”£å”å”‘å”§å”ªå•§å–å–µå•‰å•­å•å••å”¿å•å”¼"],["e040","éƒ‚éƒƒéƒ†éƒˆéƒ‰éƒ‹éƒŒéƒéƒ’éƒ”éƒ•éƒ–éƒ˜éƒ™éƒšéƒžéƒŸéƒ éƒ£éƒ¤éƒ¥éƒ©éƒªéƒ¬éƒ®éƒ°éƒ±éƒ²éƒ³éƒµéƒ¶éƒ·éƒ¹éƒºéƒ»éƒ¼éƒ¿é„€é„é„ƒé„…",19,"é„šé„›é„œ"],["e080","é„é„Ÿé„ é„¡é„¤",10,"é„°é„²",6,"é„º",8,"é…„å”·å•–å•µå•¶å•·å”³å”°å•œå–‹å—’å–ƒå–±å–¹å–ˆå–å–Ÿå•¾å—–å–‘å•»å—Ÿå–½å–¾å–”å–™å—ªå—·å—‰å˜Ÿå—‘å—«å—¬å—”å—¦å—å—„å—¯å—¥å—²å—³å—Œå—å—¨å—µå—¤è¾”å˜žå˜ˆå˜Œå˜å˜¤å˜£å—¾å˜€å˜§å˜­å™˜å˜¹å™—å˜¬å™å™¢å™™å™œå™Œå™”åš†å™¤å™±å™«å™»å™¼åš…åš“åš¯å›”å›—å›å›¡å›µå›«å›¹å›¿åœ„åœŠåœ‰åœœå¸å¸™å¸”å¸‘å¸±å¸»å¸¼"],["e140","é……é…‡é…ˆé…‘é…“é…”é…•é…–é…˜é…™é…›é…œé…Ÿé… é…¦é…§é…¨é…«é…­é…³é…ºé…»é…¼é†€",4,"é††é†ˆé†Šé†Žé†é†“",6,"é†œ",5,"é†¤",5,"é†«é†¬é†°é†±é†²é†³é†¶é†·é†¸é†¹é†»"],["e180","é†¼",10,"é‡ˆé‡‹é‡é‡’",9,"é‡",8,"å¸·å¹„å¹”å¹›å¹žå¹¡å²Œå±ºå²å²å²–å²ˆå²˜å²™å²‘å²šå²œå²µå²¢å²½å²¬å²«å²±å²£å³å²·å³„å³’å³¤å³‹å³¥å´‚å´ƒå´§å´¦å´®å´¤å´žå´†å´›åµ˜å´¾å´´å´½åµ¬åµ›åµ¯åµåµ«åµ‹åµŠåµ©åµ´å¶‚å¶™å¶è±³å¶·å·…å½³å½·å¾‚å¾‡å¾‰å¾Œå¾•å¾™å¾œå¾¨å¾­å¾µå¾¼è¡¢å½¡çŠ­çŠ°çŠ´çŠ·çŠ¸ç‹ƒç‹ç‹Žç‹ç‹’ç‹¨ç‹¯ç‹©ç‹²ç‹´ç‹·çŒç‹³çŒƒç‹º"],["e240","é‡¦",62],["e280","éˆ¥",32,"ç‹»çŒ—çŒ“çŒ¡çŒŠçŒžçŒçŒ•çŒ¢çŒ¹çŒ¥çŒ¬çŒ¸çŒ±ççç—ç ç¬ç¯ç¾èˆ›å¤¥é£§å¤¤å¤‚é¥£é¥§",5,"é¥´é¥·é¥½é¦€é¦„é¦‡é¦Šé¦é¦é¦‘é¦“é¦”é¦•åº€åº‘åº‹åº–åº¥åº åº¹åºµåº¾åº³èµ“å»’å»‘å»›å»¨å»ªè†ºå¿„å¿‰å¿–å¿æ€ƒå¿®æ€„å¿¡å¿¤å¿¾æ€…æ€†å¿ªå¿­å¿¸æ€™æ€µæ€¦æ€›æ€æ€æ€©æ€«æ€Šæ€¿æ€¡æ¸æ¹æ»æºæ‚"],["e340","é‰†",45,"é‰µ",16],["e380","éŠ†",7,"éŠ",24,"æªæ½æ‚–æ‚šæ‚­æ‚æ‚ƒæ‚’æ‚Œæ‚›æƒ¬æ‚»æ‚±æƒæƒ˜æƒ†æƒšæ‚´æ„ æ„¦æ„•æ„£æƒ´æ„€æ„Žæ„«æ…Šæ…µæ†¬æ†”æ†§æ†·æ‡”æ‡µå¿éš³é—©é—«é—±é—³é—µé—¶é—¼é—¾é˜ƒé˜„é˜†é˜ˆé˜Šé˜‹é˜Œé˜é˜é˜’é˜•é˜–é˜—é˜™é˜šä¸¬çˆ¿æˆ•æ°µæ±”æ±œæ±Šæ²£æ²…æ²æ²”æ²Œæ±¨æ±©æ±´æ±¶æ²†æ²©æ³æ³”æ²­æ³·æ³¸æ³±æ³—æ²²æ³ æ³–æ³ºæ³«æ³®æ²±æ³“æ³¯æ³¾"],["e440","éŠ¨",5,"éŠ¯",24,"é‹‰",31],["e480","é‹©",32,"æ´¹æ´§æ´Œæµƒæµˆæ´‡æ´„æ´™æ´Žæ´«æµæ´®æ´µæ´šæµæµ’æµ”æ´³æ¶‘æµ¯æ¶žæ¶ æµžæ¶“æ¶”æµœæµ æµ¼æµ£æ¸šæ·‡æ·…æ·žæ¸Žæ¶¿æ· æ¸‘æ·¦æ·æ·™æ¸–æ¶«æ¸Œæ¶®æ¸«æ¹®æ¹Žæ¹«æº²æ¹Ÿæº†æ¹“æ¹”æ¸²æ¸¥æ¹„æ»Ÿæº±æº˜æ» æ¼­æ»¢æº¥æº§æº½æº»æº·æ»—æº´æ»æºæ»‚æºŸæ½¢æ½†æ½‡æ¼¤æ¼•æ»¹æ¼¯æ¼¶æ½‹æ½´æ¼ªæ¼‰æ¼©æ¾‰æ¾æ¾Œæ½¸æ½²æ½¼æ½ºæ¿‘"],["e540","éŒŠ",51,"éŒ¿",10],["e580","éŠ",31,"é«æ¿‰æ¾§æ¾¹æ¾¶æ¿‚æ¿¡æ¿®æ¿žæ¿ æ¿¯ç€šç€£ç€›ç€¹ç€µççžå®€å®„å®•å®“å®¥å®¸ç”¯éªžæ´å¯¤å¯®è¤°å¯°è¹‡è¬‡è¾¶è¿“è¿•è¿¥è¿®è¿¤è¿©è¿¦è¿³è¿¨é€…é€„é€‹é€¦é€‘é€é€–é€¡é€µé€¶é€­é€¯é„é‘é’éé¨é˜é¢é›æš¹é´é½é‚‚é‚ˆé‚ƒé‚‹å½å½—å½–å½˜å°»å’«å±å±™å­±å±£å±¦ç¾¼å¼ªå¼©å¼­è‰´å¼¼é¬»å±®å¦å¦ƒå¦å¦©å¦ªå¦£"],["e640","é¬",34,"éŽ",27],["e680","éŽ¬",29,"é‹éŒéå¦—å§Šå¦«å¦žå¦¤å§’å¦²å¦¯å§—å¦¾å¨…å¨†å§å¨ˆå§£å§˜å§¹å¨Œå¨‰å¨²å¨´å¨‘å¨£å¨“å©€å©§å©Šå©•å¨¼å©¢å©µèƒ¬åªªåª›å©·å©ºåª¾å««åª²å«’å«”åª¸å« å«£å«±å«–å«¦å«˜å«œå¬‰å¬—å¬–å¬²å¬·å­€å°•å°œå­šå­¥å­³å­‘å­“å­¢é©µé©·é©¸é©ºé©¿é©½éª€éªéª…éªˆéªŠéªéª’éª“éª–éª˜éª›éªœéªéªŸéª éª¢éª£éª¥éª§çºŸçº¡çº£çº¥çº¨çº©"],["e740","éŽ",7,"é—",54],["e780","éŽ",32,"çº­çº°çº¾ç»€ç»ç»‚ç»‰ç»‹ç»Œç»ç»”ç»—ç»›ç» ç»¡ç»¨ç»«ç»®ç»¯ç»±ç»²ç¼ç»¶ç»ºç»»ç»¾ç¼ç¼‚ç¼ƒç¼‡ç¼ˆç¼‹ç¼Œç¼ç¼‘ç¼’ç¼—ç¼™ç¼œç¼›ç¼Ÿç¼¡",6,"ç¼ªç¼«ç¼¬ç¼­ç¼¯",4,"ç¼µå¹ºç•¿å·›ç”¾é‚•çŽŽçŽ‘çŽ®çŽ¢çŽŸçç‚ç‘çŽ·çŽ³ç€ç‰çˆç¥ç™é¡¼çŠç©ç§çžçŽºç²ççªç‘›ç¦ç¥ç¨ç°ç®ç¬"],["e840","é¯",14,"é¿",43,"é‘¬é‘­é‘®é‘¯"],["e880","é‘°",20,"é’‘é’–é’˜é“‡é“é““é“”é“šé“¦é“»é”œé” ç›çšç‘ç‘œç‘—ç‘•ç‘™ç‘·ç‘­ç‘¾ç’œç’Žç’€ç’ç’‡ç’‹ç’žç’¨ç’©ç’ç’§ç“’ç’ºéŸªéŸ«éŸ¬æŒæ“æžæˆæ©æž¥æž‡æªæ³æž˜æž§æµæž¨æžžæž­æž‹æ·æ¼æŸ°æ ‰æŸ˜æ ŠæŸ©æž°æ ŒæŸ™æžµæŸšæž³æŸæ €æŸƒæž¸æŸ¢æ ŽæŸæŸ½æ ²æ ³æ¡ æ¡¡æ¡Žæ¡¢æ¡„æ¡¤æ¢ƒæ æ¡•æ¡¦æ¡æ¡§æ¡€æ ¾æ¡Šæ¡‰æ ©æ¢µæ¢æ¡´æ¡·æ¢“æ¡«æ£‚æ¥®æ£¼æ¤Ÿæ¤ æ£¹"],["e940","é”§é”³é”½é•ƒé•ˆé•‹é••é•šé• é•®é•´é•µé•·",7,"é–€",42],["e980","é–«",32,"æ¤¤æ£°æ¤‹æ¤æ¥—æ££æ¤æ¥±æ¤¹æ¥ æ¥‚æ¥æ¦„æ¥«æ¦€æ¦˜æ¥¸æ¤´æ§Œæ¦‡æ¦ˆæ§Žæ¦‰æ¥¦æ¥£æ¥¹æ¦›æ¦§æ¦»æ¦«æ¦­æ§”æ¦±æ§æ§Šæ§Ÿæ¦•æ§ æ¦æ§¿æ¨¯æ§­æ¨—æ¨˜æ©¥æ§²æ©„æ¨¾æª æ©æ©›æ¨µæªŽæ©¹æ¨½æ¨¨æ©˜æ©¼æª‘æªæª©æª—æª«çŒ·ç’æ®æ®‚æ®‡æ®„æ®’æ®“æ®æ®šæ®›æ®¡æ®ªè½«è½­è½±è½²è½³è½µè½¶è½¸è½·è½¹è½ºè½¼è½¾è¾è¾‚è¾„è¾‡è¾‹"],["ea40","é—Œ",27,"é—¬é—¿é˜‡é˜“é˜˜é˜›é˜žé˜ é˜£",6,"é˜«é˜¬é˜­é˜¯é˜°é˜·é˜¸é˜¹é˜ºé˜¾é™é™ƒé™Šé™Žé™é™‘é™’é™“é™–é™—"],["ea80","é™˜é™™é™šé™œé™é™žé™ é™£é™¥é™¦é™«é™­",4,"é™³é™¸",12,"éš‡éš‰éšŠè¾è¾Žè¾è¾˜è¾šè»Žæˆ‹æˆ—æˆ›æˆŸæˆ¢æˆ¡æˆ¥æˆ¤æˆ¬è‡§ç“¯ç“´ç“¿ç”ç”‘ç”“æ”´æ—®æ—¯æ—°æ˜Šæ˜™æ²æ˜ƒæ˜•æ˜€ç‚…æ›·æ˜æ˜´æ˜±æ˜¶æ˜µè€†æ™Ÿæ™”æ™æ™æ™–æ™¡æ™—æ™·æš„æšŒæš§æšæš¾æ››æ›œæ›¦æ›©è´²è´³è´¶è´»è´½èµ€èµ…èµ†èµˆèµ‰èµ‡èµèµ•èµ™è§‡è§Šè§‹è§Œè§Žè§è§è§‘ç‰®çŠŸç‰ç‰¦ç‰¯ç‰¾ç‰¿çŠ„çŠ‹çŠçŠçŠ’æŒˆæŒ²æŽ°"],["eb40","éšŒéšŽéš‘éš’éš“éš•éš–éššéš›éš",9,"éš¨",7,"éš±éš²éš´éšµéš·éš¸éšºéš»éš¿é›‚é›ƒé›ˆé›Šé›‹é›é›‘é›“é›”é›–",9,"é›¡",6,"é›«"],["eb80","é›¬é›­é›®é›°é›±é›²é›´é›µé›¸é›ºé›»é›¼é›½é›¿éœ‚éœƒéœ…éœŠéœ‹éœŒéœéœ‘éœ’éœ”éœ•éœ—",4,"éœéœŸéœ æ¿æ“˜è€„æ¯ªæ¯³æ¯½æ¯µæ¯¹æ°…æ°‡æ°†æ°æ°•æ°˜æ°™æ°šæ°¡æ°©æ°¤æ°ªæ°²æ”µæ••æ•«ç‰ç‰’ç‰–çˆ°è™¢åˆ–è‚Ÿè‚œè‚“è‚¼æœŠè‚½è‚±è‚«è‚­è‚´è‚·èƒ§èƒ¨èƒ©èƒªèƒ›èƒ‚èƒ„èƒ™èƒèƒ—æœèƒèƒ«èƒ±èƒ´èƒ­è„è„Žèƒ²èƒ¼æœ•è„’è±šè„¶è„žè„¬è„˜è„²è…ˆè…Œè…“è…´è…™è…šè…±è… è…©è…¼è…½è…­è…§å¡åªµè†ˆè†‚è†‘æ»•è†£è†ªè‡Œæœ¦è‡Šè†»"],["ec40","éœ¡",8,"éœ«éœ¬éœ®éœ¯éœ±éœ³",4,"éœºéœ»éœ¼éœ½éœ¿",18,"é”é•é—é˜éšéœééŸé£é¤é¦é§é¨éª",7],["ec80","é²éµé·",4,"é½",7,"éž†",4,"éžŒéžŽéžéžéž“éž•éž–éž—éž™",4,"è‡è†¦æ¬¤æ¬·æ¬¹æ­ƒæ­†æ­™é£‘é£’é£“é£•é£™é£šæ®³å½€æ¯‚è§³æ–é½‘æ–“æ–¼æ—†æ—„æ—ƒæ—Œæ—Žæ—’æ—–ç‚€ç‚œç‚–ç‚ç‚»çƒ€ç‚·ç‚«ç‚±çƒ¨çƒŠç„ç„“ç„–ç„¯ç„±ç…³ç…œç…¨ç……ç…²ç…Šç…¸ç…ºç†˜ç†³ç†µç†¨ç† ç‡ ç‡”ç‡§ç‡¹çˆçˆ¨ç¬ç„˜ç…¦ç†¹æˆ¾æˆ½æ‰ƒæ‰ˆæ‰‰ç¤»ç¥€ç¥†ç¥‰ç¥›ç¥œç¥“ç¥šç¥¢ç¥—ç¥ ç¥¯ç¥§ç¥ºç¦…ç¦Šç¦šç¦§ç¦³å¿‘å¿"],["ed40","éžžéžŸéž¡éž¢éž¤",6,"éž¬éž®éž°éž±éž³éžµ",46],["ed80","éŸ¤éŸ¥éŸ¨éŸ®",4,"éŸ´éŸ·",23,"æ€¼ææšæ§ææ™æ£æ‚«æ„†æ„æ…æ†©æ†æ‡‹æ‡‘æˆ†è‚€è¿æ²“æ³¶æ·¼çŸ¶çŸ¸ç €ç ‰ç —ç ˜ç ‘æ–«ç ­ç œç ç ¹ç ºç »ç Ÿç ¼ç ¥ç ¬ç £ç ©ç¡Žç¡­ç¡–ç¡—ç ¦ç¡ç¡‡ç¡Œç¡ªç¢›ç¢“ç¢šç¢‡ç¢œç¢¡ç¢£ç¢²ç¢¹ç¢¥ç£”ç£™ç£‰ç£¬ç£²ç¤…ç£´ç¤“ç¤¤ç¤žç¤´é¾›é»¹é»»é»¼ç›±çœ„çœç›¹çœ‡çœˆçœšçœ¢çœ™çœ­çœ¦çœµçœ¸çç‘ç‡çƒçšç¨"],["ee40","é ",62],["ee80","é¡Ž",32,"ç¢ç¥ç¿çžç½çž€çžŒçž‘çžŸçž çž°çžµçž½ç”ºç•€ç•Žç•‹ç•ˆç•›ç•²ç•¹ç–ƒç½˜ç½¡ç½Ÿè©ˆç½¨ç½´ç½±ç½¹ç¾ç½¾ç›ç›¥è ²é’…é’†é’‡é’‹é’Šé’Œé’é’é’é’”é’—é’•é’šé’›é’œé’£é’¤é’«é’ªé’­é’¬é’¯é’°é’²é’´é’¶",4,"é’¼é’½é’¿é“„é“ˆ",6,"é“é“‘é“’é“•é“–é“—é“™é“˜é“›é“žé“Ÿé“ é“¢é“¤é“¥é“§é“¨é“ª"],["ef40","é¡¯",5,"é¢‹é¢Žé¢’é¢•é¢™é¢£é¢¨",37,"é£é£é£”é£–é£—é£›é£œé£é£ ",4],["ef80","é£¥é£¦é£©",30,"é“©é“«é“®é“¯é“³é“´é“µé“·é“¹é“¼é“½é“¿é”ƒé”‚é”†é”‡é”‰é”Šé”é”Žé”é”’",4,"é”˜é”›é”é”žé”Ÿé”¢é”ªé”«é”©é”¬é”±é”²é”´é”¶é”·é”¸é”¼é”¾é”¿é•‚é”µé•„é•…é•†é•‰é•Œé•Žé•é•’é•“é•”é•–é•—é•˜é•™é•›é•žé•Ÿé•é•¡é•¢é•¤",8,"é•¯é•±é•²é•³é”ºçŸ§çŸ¬é›‰ç§•ç§­ç§£ç§«ç¨†åµ‡ç¨ƒç¨‚ç¨žç¨”"],["f040","é¤ˆ",4,"é¤Žé¤é¤‘",28,"é¤¯",26],["f080","é¥Š",9,"é¥–",12,"é¥¤é¥¦é¥³é¥¸é¥¹é¥»é¥¾é¦‚é¦ƒé¦‰ç¨¹ç¨·ç©‘é»é¦¥ç©°çšˆçšŽçš“çš™çš¤ç“žç“ ç”¬é¸ é¸¢é¸¨",4,"é¸²é¸±é¸¶é¸¸é¸·é¸¹é¸ºé¸¾é¹é¹‚é¹„é¹†é¹‡é¹ˆé¹‰é¹‹é¹Œé¹Žé¹‘é¹•é¹—é¹šé¹›é¹œé¹žé¹£é¹¦",6,"é¹±é¹­é¹³ç–’ç–”ç––ç– ç–ç–¬ç–£ç–³ç–´ç–¸ç—„ç–±ç–°ç—ƒç—‚ç—–ç—ç—£ç—¨ç—¦ç—¤ç—«ç—§ç˜ƒç—±ç—¼ç—¿ç˜ç˜€ç˜…ç˜Œç˜—ç˜Šç˜¥ç˜˜ç˜•ç˜™"],["f140","é¦Œé¦Žé¦š",10,"é¦¦é¦§é¦©",47],["f180","é§™",32,"ç˜›ç˜¼ç˜¢ç˜ ç™€ç˜­ç˜°ç˜¿ç˜µç™ƒç˜¾ç˜³ç™ç™žç™”ç™œç™–ç™«ç™¯ç¿Šç«¦ç©¸ç©¹çª€çª†çªˆçª•çª¦çª çª¬çª¨çª­çª³è¡¤è¡©è¡²è¡½è¡¿è¢‚è¢¢è£†è¢·è¢¼è£‰è£¢è£Žè££è£¥è£±è¤šè£¼è£¨è£¾è£°è¤¡è¤™è¤“è¤›è¤Šè¤´è¤«è¤¶è¥è¥¦è¥»ç–‹èƒ¥çš²çš´çŸœè€’è€”è€–è€œè€ è€¢è€¥è€¦è€§è€©è€¨è€±è€‹è€µèƒè†èè’è©è±è¦ƒé¡¸é¢€é¢ƒ"],["f240","é§º",62],["f280","é¨¹",32,"é¢‰é¢Œé¢é¢é¢”é¢šé¢›é¢žé¢Ÿé¢¡é¢¢é¢¥é¢¦è™è™”è™¬è™®è™¿è™ºè™¼è™»èš¨èšèš‹èš¬èšèš§èš£èšªèš“èš©èš¶è›„èšµè›Žèš°èšºèš±èš¯è›‰è›èš´è›©è›±è›²è›­è›³è›èœ“è›žè›´è›Ÿè›˜è›‘èœƒèœ‡è›¸èœˆèœŠèœèœ‰èœ£èœ»èœžèœ¥èœ®èœšèœ¾èˆèœ´èœ±èœ©èœ·èœ¿èž‚èœ¢è½è¾è»è è°èŒè®èž‹è“è£è¼è¤è™è¥èž“èž¯èž¨èŸ’"],["f340","é©š",17,"é©²éªƒéª‰éªéªŽéª”éª•éª™éª¦éª©",6,"éª²éª³éª´éªµéª¹éª»éª½éª¾éª¿é«ƒé«„é«†",4,"é«é«Žé«é«é«’é«”é«•é«–é«—é«™é«šé«›é«œ"],["f380","é«é«žé« é«¢é«£é«¤é«¥é«§é«¨é«©é«ªé«¬é«®é«°",8,"é«ºé«¼",6,"é¬„é¬…é¬†èŸ†èžˆèž…èž­èž—èžƒèž«èŸ¥èž¬èžµèž³èŸ‹èŸ“èž½èŸ‘èŸ€èŸŠèŸ›èŸªèŸ èŸ®è –è “èŸ¾è Šè ›è ¡è ¹è ¼ç¼¶ç½‚ç½„ç½…èˆç«ºç«½ç¬ˆç¬ƒç¬„ç¬•ç¬Šç¬«ç¬ç­‡ç¬¸ç¬ªç¬™ç¬®ç¬±ç¬ ç¬¥ç¬¤ç¬³ç¬¾ç¬žç­˜ç­šç­…ç­µç­Œç­ç­ ç­®ç­»ç­¢ç­²ç­±ç®ç®¦ç®§ç®¸ç®¬ç®ç®¨ç®…ç®ªç®œç®¢ç®«ç®´ç¯‘ç¯ç¯Œç¯ç¯šç¯¥ç¯¦ç¯ªç°Œç¯¾ç¯¼ç°ç°–ç°‹"],["f440","é¬‡é¬‰",5,"é¬é¬‘é¬’é¬”",10,"é¬ é¬¡é¬¢é¬¤",10,"é¬°é¬±é¬³",7,"é¬½é¬¾é¬¿é­€é­†é­Šé­‹é­Œé­Žé­é­’é­“é­•",5],["f480","é­›",32,"ç°Ÿç°ªç°¦ç°¸ç±ç±€è‡¾èˆèˆ‚èˆ„è‡¬è¡„èˆ¡èˆ¢èˆ£èˆ­èˆ¯èˆ¨èˆ«èˆ¸èˆ»èˆ³èˆ´èˆ¾è‰„è‰‰è‰‹è‰è‰šè‰Ÿè‰¨è¡¾è¢…è¢ˆè£˜è£Ÿè¥žç¾ç¾Ÿç¾§ç¾¯ç¾°ç¾²ç±¼æ•‰ç²‘ç²ç²œç²žç²¢ç²²ç²¼ç²½ç³ç³‡ç³Œç³ç³ˆç³…ç³—ç³¨è‰®æš¨ç¾¿ç¿Žç¿•ç¿¥ç¿¡ç¿¦ç¿©ç¿®ç¿³ç³¸çµ·ç¶¦ç¶®ç¹‡çº›éº¸éº´èµ³è¶„è¶”è¶‘è¶±èµ§èµ­è±‡è±‰é…Šé…é…Žé…é…¤"],["f540","é­¼",62],["f580","é®»",32,"é…¢é…¡é…°é…©é…¯é…½é…¾é…²é…´é…¹é†Œé†…é†é†é†‘é†¢é†£é†ªé†­é†®é†¯é†µé†´é†ºè±•é¹¾è¶¸è·«è¸…è¹™è¹©è¶µè¶¿è¶¼è¶ºè·„è·–è·—è·šè·žè·Žè·è·›è·†è·¬è··è·¸è·£è·¹è·»è·¤è¸‰è·½è¸”è¸è¸Ÿè¸¬è¸®è¸£è¸¯è¸ºè¹€è¸¹è¸µè¸½è¸±è¹‰è¹è¹‚è¹‘è¹’è¹Šè¹°è¹¶è¹¼è¹¯è¹´èº…èºèº”èºèºœèºžè±¸è²‚è²Šè²…è²˜è²”æ–›è§–è§žè§šè§œ"],["f640","é¯œ",62],["f680","é°›",32,"è§¥è§«è§¯è¨¾è¬¦é“é›©é›³é›¯éœ†éœéœˆéœéœŽéœªéœ­éœ°éœ¾é¾€é¾ƒé¾…",5,"é¾Œé»¾é¼‹é¼éš¹éš¼éš½é›Žé›’çž¿é› éŠŽéŠ®é‹ˆéŒ¾éªéŠéŽé¾é‘«é±¿é²‚é²…é²†é²‡é²ˆç¨£é²‹é²Žé²é²‘é²’é²”é²•é²šé²›é²ž",5,"é²¥",4,"é²«é²­é²®é²°",7,"é²ºé²»é²¼é²½é³„é³…é³†é³‡é³Šé³‹"],["f740","é°¼",62],["f780","é±»é±½é±¾é²€é²ƒé²„é²‰é²Šé²Œé²é²“é²–é²—é²˜é²™é²é²ªé²¬é²¯é²¹é²¾",4,"é³ˆé³‰é³‘é³’é³šé³›é³ é³¡é³Œ",4,"é³“é³”é³•é³—é³˜é³™é³œé³é³Ÿé³¢é¼éž…éž‘éž’éž”éž¯éž«éž£éž²éž´éª±éª°éª·é¹˜éª¶éªºéª¼é«é«€é«…é«‚é«‹é«Œé«‘é­…é­ƒé­‡é­‰é­ˆé­é­‘é£¨é¤é¤®é¥•é¥”é«Ÿé«¡é«¦é«¯é««é«»é«­é«¹é¬ˆé¬é¬“é¬Ÿé¬£éº½éº¾ç¸»éº‚éº‡éºˆéº‹éº’é–éºéºŸé»›é»œé»é» é»Ÿé»¢é»©é»§é»¥é»ªé»¯é¼¢é¼¬é¼¯é¼¹é¼·é¼½é¼¾é½„"],["f840","é³£",62],["f880","é´¢",32],["f940","éµƒ",62],["f980","é¶‚",32],["fa40","é¶£",62],["fa80","é·¢",32],["fb40","é¸ƒ",27,"é¸¤é¸§é¸®é¸°é¸´é¸»é¸¼é¹€é¹é¹é¹’é¹“é¹”é¹–é¹™é¹é¹Ÿé¹ é¹¡é¹¢é¹¥é¹®é¹¯é¹²é¹´",9,"éº€"],["fb80","éºéºƒéº„éº…éº†éº‰éºŠéºŒ",5,"éº”",8,"éºžéº ",5,"éº§éº¨éº©éºª"],["fc40","éº«",8,"éºµéº¶éº·éº¹éººéº¼éº¿",4,"é»…é»†é»‡é»ˆé»Šé»‹é»Œé»é»’é»“é»•é»–é»—é»™é»šé»žé»¡é»£é»¤é»¦é»¨é»«é»¬é»­é»®é»°",8,"é»ºé»½é»¿",6],["fc80","é¼†",4,"é¼Œé¼é¼‘é¼’é¼”é¼•é¼–é¼˜é¼š",5,"é¼¡é¼£",8,"é¼­é¼®é¼°é¼±"],["fd40","é¼²",4,"é¼¸é¼ºé¼¼é¼¿",4,"é½…",10,"é½’",38],["fd80","é½¹",5,"é¾é¾‚é¾",11,"é¾œé¾é¾žé¾¡",4,"ï¤¬ï¥¹ï¦•ï§§ï§±"],["fe40","ï¨Œï¨ï¨Žï¨ï¨‘ï¨“ï¨”ï¨˜ï¨Ÿï¨ ï¨¡ï¨£ï¨¤ï¨§ï¨¨ï¨©"]]')},function(t,e,n){var r=n(99);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e){t.exports=function(t){if(null==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){var r=n(126),i=n(100),o=n(50),a=n(175),s=n(51),l=n(254),u=Object.getOwnPropertyDescriptor;e.f=n(23)?u:function(t,e){if(t=o(t),e=a(e,!0),l)try{return u(t,e)}catch(t){}if(s(t,e))return i(!r.f.call(t,e),t[e])}},function(t,e,n){var i=n(22);t.exports=function(t,e){if(!i(t))return t;var n,r;if(e&&"function"==typeof(n=t.toString)&&!i(r=n.call(t)))return r;if("function"==typeof(n=t.valueOf)&&!i(r=n.call(t)))return r;if(!e&&"function"==typeof(n=t.toString)&&!i(r=n.call(t)))return r;throw TypeError("Can't convert object to primitive value")}},function(t,e,n){var r=n(22),i=n(17).document,o=r(i)&&r(i.createElement);t.exports=function(t){return o?i.createElement(t):{}}},function(t,e,n){var i=n(9),o=n(7),a=n(52);t.exports=function(t,e){var n=(o.Object||{})[t]||Object[t],r={};r[t]=e(n),i(i.S+i.F*a(function(){n(1)}),"Object",r)}},function(t,e,n){"use strict";function b(){return this}var w=n(104),x=n(9),S=n(256),_=n(41),k=n(103),A=n(424),C=n(106),P=n(426),E=n(21)("iterator"),O=!([].keys&&"next"in[].keys()),T="values";t.exports=function(t,e,n,r,i,o,a){A(n,e,r);function s(t){if(!O&&t in p)return p[t];switch(t){case"keys":case T:return function(){return new n(this,t)}}return function(){return new n(this,t)}}var l,u,c,h=e+" Iterator",f=i==T,d=!1,p=t.prototype,g=p[E]||p["@@iterator"]||i&&p[i],y=g||s(i),v=i?f?s("entries"):y:void 0,m="Array"==e&&p.entries||g;if(m&&(c=P(m.call(new t)))!==Object.prototype&&c.next&&(C(c,h,!0),w||"function"==typeof c[E]||_(c,E,b)),f&&g&&g.name!==T&&(d=!0,y=function(){return g.call(this)}),w&&!a||!O&&!d&&p[E]||_(p,E,y),k[e]=y,k[h]=b,i)if(l={values:f?y:s(T),keys:o?y:s("keys"),entries:v},a)for(u in l)u in p||S(p,u,l[u]);else x(x.P+x.F*(O||d),e,l);return l}},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(0<t?r:n)(t)}},function(t,e,n){var r=n(181)("keys"),i=n(129);t.exports=function(t){return r[t]||(r[t]=i(t))}},function(t,e,n){var r=n(7),i=n(17),o="__core-js_shared__",a=i[o]||(i[o]={});(t.exports=function(t,e){return a[t]||(a[t]=void 0!==e?e:{})})("versions",[]).push({version:r.version,mode:n(104)?"pure":"global",copyright:"Â© 2019 Denis Pushkarev (zloirock.ru)"})},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,n){var r=n(184),i=n(21)("iterator"),o=n(103);t.exports=n(7).getIteratorMethod=function(t){if(null!=t)return t[i]||t["@@iterator"]||o[r(t)]}},function(t,e,n){var i=n(99),o=n(21)("toStringTag"),a="Arguments"==i(function(){return arguments}());t.exports=function(t){var e,n,r;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=function(t,e){try{return t[e]}catch(t){}}(e=Object(t),o))?n:a?i(e):"Object"==(r=i(e))&&"function"==typeof e.callee?"Arguments":r}},function(t,e,n){"use strict";e.__esModule=!0;var r=a(n(432)),i=a(n(434)),o="function"==typeof i.default&&"symbol"==typeof r.default?function(t){return typeof t}:function(t){return t&&"function"==typeof i.default&&t.constructor===i.default&&t!==i.default.prototype?"symbol":typeof t};function a(t){return t&&t.__esModule?t:{default:t}}e.default="function"==typeof i.default&&"symbol"===o(r.default)?function(t){return void 0===t?"undefined":o(t)}:function(t){return t&&"function"==typeof i.default&&t.constructor===i.default&&t!==i.default.prototype?"symbol":void 0===t?"undefined":o(t)}},function(t,e,n){e.f=n(21)},function(t,e,n){var r=n(17),i=n(7),o=n(104),a=n(186),s=n(25).f;t.exports=function(t){var e=i.Symbol||(i.Symbol=!o&&r.Symbol||{});"_"==t.charAt(0)||t in e||s(e,t,{value:a.f(t)})}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){var i=n(41);t.exports=function(t,e,n){for(var r in e)n&&t[r]?t[r]=e[r]:i(t,r,e[r]);return t}},function(t,e){t.exports=function(t,e,n,r){if(!(t instanceof e)||void 0!==r&&r in t)throw TypeError(n+": incorrect invocation!");return t}},function(t,e,n){var r=n(22);t.exports=function(t,e){if(!r(t)||t._t!==e)throw TypeError("Incompatible receiver, "+e+" required!");return t}},function(t,e,n){"use strict";var r=n(1),i=n(93).indexOf,o=n(58),a=n(31),s=[].indexOf,l=!!s&&1/[1].indexOf(1,-0)<0,u=o("indexOf"),c=a("indexOf",{ACCESSORS:!0,1:0});r({target:"Array",proto:!0,forced:l||!u||!c},{indexOf:function(t,e){return l?s.apply(this,arguments)||0:i(this,t,1<arguments.length?e:void 0)}})},function(t,e,n){"use strict";var i=n(101);function r(t){var n,r;this.promise=new t(function(t,e){if(void 0!==n||void 0!==r)throw TypeError("Bad Promise constructor");n=t,r=e}),this.resolve=i(n),this.reject=i(r)}t.exports.f=function(t){return new r(t)}},function(t,e,n){"use strict";var r=n(0).isString,i=n(0).isNumber,g=n(0).isObject,y=n(0).isArray,v=n(0).isUndefined,s=n(290),A=/^(\s)+/g,C=/(\s)+$/g;function o(t){this.fontProvider=t}function m(t,e){var n=[];if(t=t.replace(/\t/g,"    "),e)return n.push({text:t}),n;for(var r,i=new s(t),o=0;r=i.nextBreak();){var a=t.slice(o,r.position);r.required||a.match(/\r?\n$|\r$/)?(a=a.replace(/\r?\n$|\r$/,""),n.push({text:a,lineEnd:!0})):n.push({text:a}),o=r.position}return n}function b(t,e){for(var n in e=e||{},t=t||{})"text"!=n&&t.hasOwnProperty(n)&&(e[n]=t[n]);return e}function w(t){return null==t?"":!i(t)&&r(t)?t:t.toString()}function P(t,e,n,r){var i;return void 0!==t[n]&&null!==t[n]?t[n]:e?(e.auto(t,function(){i=e.getProperty(n)}),null!=i?i:r):r}function E(t,e,n,r,i){return e.widthOfString(t,n,i)+(r||0)*(t.length-1)}o.prototype.buildInlines=function(t,e){var n,r=function(_,t,k){var e=function(t,e){function n(t,e,n){if(v(e[t]))return null;if(e[t].lineEnd)return null;var r=e[t].text;if(n){var i=m(w(r),!1);if(v(i[i.length-1]))return null;r=i[i.length-1].text}return r}var r=[];y(t)||(t=[t]);t=function i(t){return t.reduce(function(t,e){var n=y(e.text)?i(e.text):e,r=[].concat(n).some(Array.isArray);return t.concat(r?i(n):n)},[])}(t);for(var i,o=null,a=0,s=t.length;a<s;a++){var l,u=t[a],c=null,h=P(u||{},e,"noWrap",!1);g(u)?(u._textRef&&u._textRef._textNodeRef.text&&(u.text=u._textRef._textNodeRef.text),i=m(w(u.text),h),c=b(u)):i=m(w(u),h),o&&i.length&&(l=n(0,i,h),1===m(w(o+l),!1).length&&(r[r.length-1].noNewLine=!0));for(var f=0,d=i.length;f<d;f++){var p={text:i[f].text};i[f].lineEnd&&(p.lineEnd=!0),b(c,p),r.push(p)}o=null,a+1<s&&(o=n(i.length-1,i,h))}return r}(t,k);{var n;!e.length||(n=P(e[0],k,"leadingIndent",0))&&(e[0].leadingCut=-n,e[0].leadingIndent=n)}return e.forEach(function(t){var e,n,r=P(t,k,"font","Roboto"),i=P(t,k,"fontSize",12),o=P(t,k,"fontFeatures",null),a=P(t,k,"bold",!1),s=P(t,k,"italics",!1),l=P(t,k,"color","black"),u=P(t,k,"decoration",null),c=P(t,k,"decorationColor",null),h=P(t,k,"decorationStyle",null),f=P(t,k,"background",null),d=P(t,k,"lineHeight",1),p=P(t,k,"characterSpacing",0),g=P(t,k,"link",null),y=P(t,k,"linkToPage",null),v=P(t,k,"linkToDestination",null),m=P(t,k,"noWrap",null),b=P(t,k,"preserveLeadingSpaces",!1),w=P(t,k,"preserveTrailingSpaces",!1),x=P(t,k,"opacity",1),S=_.provideFont(r,a,s);t.width=E(t.text,S,i,p,o),t.height=S.lineHeight(i)*d,t.leadingCut||(t.leadingCut=0),!b&&(e=t.text.match(A))&&(t.leadingCut+=E(e[0],S,i,p,o)),!w&&(n=t.text.match(C))?t.trailingCut=E(n[0],S,i,p,o):t.trailingCut=0,t.alignment=P(t,k,"alignment","left"),t.font=S,t.fontSize=i,t.fontFeatures=o,t.characterSpacing=p,t.color=l,t.decoration=u,t.decorationColor=c,t.decorationStyle=h,t.background=f,t.link=g,t.linkToPage=y,t.linkToDestination=v,t.noWrap=m,t.opacity=x}),e}(this.fontProvider,t,e),i=0,o=0;return r.forEach(function(t){var e;i=Math.max(i,t.width-t.leadingCut-t.trailingCut),(n=n||{width:0,leadingCut:t.leadingCut,trailingCut:0}).width+=t.width,n.trailingCut=t.trailingCut,o=Math.max(o,(e=n,Math.max(0,e.width-e.leadingCut-e.trailingCut))),t.lineEnd&&(n=null)}),P({},e,"noWrap",!1)&&(i=o),{items:r,minWidth:i,maxWidth:o}},o.prototype.sizeOfString=function(t,e){t=t?t.toString().replace(/\t/g,"    "):"";var n=P({},e,"font","Roboto"),r=P({},e,"fontSize",12),i=P({},e,"fontFeatures",null),o=P({},e,"bold",!1),a=P({},e,"italics",!1),s=P({},e,"lineHeight",1),l=P({},e,"characterSpacing",0),u=this.fontProvider.provideFont(n,o,a);return{width:E(t,u,r,l,i),height:u.lineHeight(r)*s,fontSize:r,lineHeight:s,ascender:u.ascender/1e3*r,descender:u.descender/1e3*r}},o.prototype.sizeOfRotatedText=function(t,e,n){var r=e*Math.PI/-180,i=this.sizeOfString(t,n);return{width:Math.abs(i.height*Math.sin(r))+Math.abs(i.width*Math.cos(r)),height:Math.abs(i.width*Math.sin(r))+Math.abs(i.height*Math.cos(r))}},o.prototype.widthOfString=E,t.exports=o},function(t,e,n){"use strict";var g=n(0).isString;function y(t){return"auto"===t.width}function v(t){return null===t.width||void 0===t.width||"*"===t.width||"star"===t.width}t.exports={buildColumnWidths:function(t,n){var e=[],r=0,i=0,o=[],a=0,s=0,l=[],u=n;t.forEach(function(t){y(t)?(e.push(t),r+=t._minWidth,i+=t._maxWidth):v(t)?(o.push(t),a=Math.max(a,t._minWidth),s=Math.max(s,t._maxWidth)):l.push(t)}),l.forEach(function(t){g(t.width)&&/\d+%/.test(t.width)&&(t.width=parseFloat(t.width)*u/100),t.width<t._minWidth&&t.elasticWidth?t._calcWidth=t._minWidth:t._calcWidth=t.width,n-=t._calcWidth});var c,h,f,d=r+a*o.length,p=i+s*o.length;n<=d?(e.forEach(function(t){t._calcWidth=t._minWidth}),o.forEach(function(t){t._calcWidth=a})):(p<n?e.forEach(function(t){t._calcWidth=t._maxWidth,n-=t._calcWidth}):(c=n-d,h=p-d,e.forEach(function(t){var e=t._maxWidth-t._minWidth;t._calcWidth=t._minWidth+e*c/h,n-=t._calcWidth})),0<o.length&&(f=n/o.length,o.forEach(function(t){t._calcWidth=f})))},measureMinMax:function(t){for(var e={min:0,max:0},n={min:0,max:0},r=0,i=0,o=t.length;i<o;i++){var a=t[i];v(a)?(n.min=Math.max(n.min,a._minWidth),n.max=Math.max(n.max,a._maxWidth),r++):y(a)?(e.min+=a._minWidth,e.max+=a._maxWidth):(e.min+=void 0!==a.width&&a.width||a._minWidth,e.max+=void 0!==a.width&&a.width||a._maxWidth)}return r&&(e.min+=r*n.min,e.max+=r*n.max),e},isAutoColumn:y,isStarColumn:v}},function(t,e){var n={}.toString;t.exports=Array.isArray||function(t){return"[object Array]"==n.call(t)}},function(t,e,n){"use strict";function i(t,e){var n=nt[t]=_(K[H]);return Z(n,{type:G,tag:t,description:e}),h||(n.description=e),n}function r(e,t){m(e);var n=w(t),r=k(n).concat(dt(n));return W(r,function(t){h&&!ft.call(n,t)||ht(e,t,n[t])}),e}function o(t,e){var n=w(t),r=x(e,!0);if(n!==Y||!g(nt,r)||g(rt,r)){var i=Q(n,r);return!i||!g(nt,r)||g(n,V)&&n[V][r]||(i.enumerable=!0),i}}function a(t){var e=tt(w(t)),n=[];return W(e,function(t){g(nt,t)||g(R,t)||n.push(t)}),n}var s=n(1),l=n(3),u=n(36),c=n(55),h=n(11),f=n(143),d=n(202),p=n(4),g=n(14),y=n(115),v=n(13),m=n(16),b=n(19),w=n(27),x=n(54),S=n(42),_=n(57),k=n(94),A=n(56),C=n(311),P=n(141),E=n(53),O=n(15),T=n(110),I=n(18),L=n(24),M=n(139),B=n(111),R=n(113),F=n(112),D=n(6),z=n(204),N=n(205),U=n(95),j=n(35),W=n(20).forEach,V=B("hidden"),G="Symbol",H="prototype",q=D("toPrimitive"),Z=j.set,X=j.getterFor(G),Y=Object[H],K=l.Symbol,J=u("JSON","stringify"),Q=E.f,$=O.f,tt=C.f,et=T.f,nt=M("symbols"),rt=M("op-symbols"),it=M("string-to-symbol-registry"),ot=M("symbol-to-string-registry"),at=M("wks"),st=l.QObject,lt=!st||!st[H]||!st[H].findChild,ut=h&&p(function(){return 7!=_($({},"a",{get:function(){return $(this,"a",{value:7}).a}})).a})?function(t,e,n){var r=Q(Y,e);r&&delete Y[e],$(t,e,n),r&&t!==Y&&$(Y,e,r)}:$,ct=d?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof K},ht=function(t,e,n){t===Y&&ht(rt,e,n),m(t);var r=x(e,!0);return m(n),g(nt,r)?(n.enumerable?(g(t,V)&&t[V][r]&&(t[V][r]=!1),n=_(n,{enumerable:S(0,!1)})):(g(t,V)||$(t,V,S(1,{})),t[V][r]=!0),ut(t,r,n)):$(t,r,n)},ft=function(t){var e=x(t,!0),n=et.call(this,e);return!(this===Y&&g(nt,e)&&!g(rt,e))&&(!(n||!g(this,e)||!g(nt,e)||g(this,V)&&this[V][e])||n)},dt=function(t){var e=t===Y,n=tt(e?rt:w(t)),r=[];return W(n,function(t){!g(nt,t)||e&&!g(Y,t)||r.push(nt[t])}),r};f||(L((K=function(t){if(this instanceof K)throw TypeError("Symbol is not a constructor");var e=arguments.length&&void 0!==t?String(t):void 0,n=F(e),r=function(t){this===Y&&r.call(rt,t),g(this,V)&&g(this[V],n)&&(this[V][n]=!1),ut(this,n,S(1,t))};return h&&lt&&ut(Y,n,{configurable:!0,set:r}),i(n,e)})[H],"toString",function(){return X(this).tag}),L(K,"withoutSetter",function(t){return i(F(t),t)}),T.f=ft,O.f=ht,E.f=o,A.f=C.f=a,P.f=dt,z.f=function(t){return i(D(t),t)},h&&($(K[H],"description",{configurable:!0,get:function(){return X(this).description}}),c||L(Y,"propertyIsEnumerable",ft,{unsafe:!0}))),s({global:!0,wrap:!0,forced:!f,sham:!f},{Symbol:K}),W(k(at),function(t){N(t)}),s({target:G,stat:!0,forced:!f},{for:function(t){var e=String(t);if(g(it,e))return it[e];var n=K(e);return it[e]=n,ot[n]=e,n},keyFor:function(t){if(!ct(t))throw TypeError(t+" is not a symbol");if(g(ot,t))return ot[t]},useSetter:function(){lt=!0},useSimple:function(){lt=!1}}),s({target:"Object",stat:!0,forced:!f,sham:!h},{create:function(t,e){return void 0===e?_(t):r(_(t),e)},defineProperty:ht,defineProperties:r,getOwnPropertyDescriptor:o}),s({target:"Object",stat:!0,forced:!f},{getOwnPropertyNames:a,getOwnPropertySymbols:dt}),s({target:"Object",stat:!0,forced:p(function(){P.f(1)})},{getOwnPropertySymbols:function(t){return P.f(b(t))}}),J&&s({target:"JSON",stat:!0,forced:!f||p(function(){var t=K();return"[null]"!=J([t])||"{}"!=J({a:t})||"{}"!=J(Object(t))})},{stringify:function(t,e,n){for(var r,i=[t],o=1;o<arguments.length;)i.push(arguments[o++]);if((v(r=e)||void 0!==t)&&!ct(t))return y(e)||(e=function(t,e){if("function"==typeof r&&(e=r.call(this,t,e)),!ct(e))return e}),i[1]=e,J.apply(null,i)}}),K[H][q]||I(K[H],q,K[H].valueOf),U(K,G),R[V]=!0},function(t,e,n){var r=n(11),i=n(4),o=n(136);t.exports=!r&&!i(function(){return 7!=Object.defineProperty(o("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){var r=n(3),i=n(137),o="__core-js_shared__",a=r[o]||i(o,{});t.exports=a},function(t,e,n){var s=n(14),l=n(309),u=n(53),c=n(15);t.exports=function(t,e){for(var n=l(e),r=c.f,i=u.f,o=0;o<n.length;o++){var a=n[o];s(t,a)||r(t,a,i(e,a))}}},function(t,e,n){var a=n(14),s=n(27),l=n(93).indexOf,u=n(113);t.exports=function(t,e){var n,r=s(t),i=0,o=[];for(n in r)!a(u,n)&&a(r,n)&&o.push(n);for(;e.length>i;)a(r,n=e[i++])&&(~l(o,n)||o.push(n));return o}},function(t,e,n){var r=n(143);t.exports=r&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},function(t,e,n){var r=n(36);t.exports=r("document","documentElement")},function(t,e,n){var r=n(6);e.f=r},function(t,e,n){var r=n(114),i=n(14),o=n(204),a=n(15).f;t.exports=function(t){var e=r.Symbol||(r.Symbol={});i(e,t)||a(e,t,{value:o.f(t)})}},function(t,e,n){var r=n(13),i=n(115),o=n(6)("species");t.exports=function(t,e){var n;return i(t)&&("function"==typeof(n=t.constructor)&&(n===Array||i(n.prototype))||r(n)&&null===(n=n[o]))&&(n=void 0),new(void 0===n?Array:n)(0===e?0:e)}},function(t,e,n){"use strict";var r,i,o,a,s,l,u=n(1),c=n(11),h=n(3),f=n(14),d=n(13),p=n(15).f,g=n(200),y=h.Symbol;!c||"function"!=typeof y||"description"in y.prototype&&void 0===y().description||(r={},g(i=function(t){var e=arguments.length<1||void 0===t?void 0:String(t),n=this instanceof i?new y(e):void 0===e?y():y(e);return""===e&&(r[n]=!0),n},y),(o=i.prototype=y.prototype).constructor=i,a=o.toString,s="Symbol(test)"==String(y("test")),l=/^Symbol\((.*)\)[^)]+$/,p(o,"description",{configurable:!0,get:function(){var t=d(this)?this.valueOf():this,e=a.call(t);if(f(r,t))return"";var n=s?e.slice(7,-1):e.replace(l,"$1");return""===n?void 0:n}}),u({global:!0,forced:!0},{Symbol:i}))},function(t,e,n){n(205)("iterator")},function(t,e,n){"use strict";var r=n(1),i=n(4),u=n(115),c=n(13),h=n(19),f=n(8),d=n(144),p=n(206),o=n(116),a=n(6),s=n(145),g=a("isConcatSpreadable"),y=9007199254740991,v="Maximum allowed index exceeded",l=51<=s||!i(function(){var t=[];return t[g]=!1,t.concat()[0]!==t}),m=o("concat");r({target:"Array",proto:!0,forced:!l||!m},{concat:function(t){for(var e,n,r,i=h(this),o=p(i,0),a=0,s=-1,l=arguments.length;s<l;s++)if(function(t){if(!c(t))return!1;var e=t[g];return void 0!==e?!!e:u(t)}(r=-1===s?i:arguments[s])){if(n=f(r.length),y<a+n)throw TypeError(v);for(e=0;e<n;e++,a++)e in r&&d(o,a,r[e])}else{if(y<=a)throw TypeError(v);d(o,a++,r)}return o.length=a,o}})},function(t,e,n){var r=n(36);t.exports=r("navigator","userAgent")||""},function(t,e,n){var r=n(1),i=n(146),o=n(147);r({target:"Array",proto:!0},{fill:i}),o("fill")},function(t,e,n){"use strict";var r=n(20).forEach,i=n(58),o=n(31),a=i("forEach"),s=o("forEach");t.exports=a&&s?[].forEach:function(t,e){return r(this,t,1<arguments.length?e:void 0)}},function(t,e,n){var r=n(1),i=n(315);r({target:"Array",stat:!0,forced:!n(151)(function(t){Array.from(t)})},{from:i})},function(t,e,n){var o=n(16);t.exports=function(e,t,n,r){try{return r?t(o(n)[0],n[1]):t(n)}catch(t){var i=e.return;throw void 0!==i&&o(i.call(e)),t}}},function(t,e,n){"use strict";var r=n(1),i=n(93).includes,o=n(147);r({target:"Array",proto:!0,forced:!n(31)("indexOf",{ACCESSORS:!0,1:0})},{includes:function(t,e){return i(this,t,1<arguments.length?e:void 0)}}),o("includes")},function(t,e,n){"use strict";function v(){return this}var m=n(1),b=n(316),w=n(59),x=n(45),S=n(95),_=n(18),k=n(24),r=n(6),A=n(55),C=n(97),i=n(217),P=i.IteratorPrototype,E=i.BUGGY_SAFARI_ITERATORS,O=r("iterator"),T="values";t.exports=function(t,e,n,r,i,o,a){b(n,e,r);function s(t){if(t===i&&g)return g;if(!E&&t in d)return d[t];switch(t){case"keys":case T:case"entries":return function(){return new n(this,t)}}return function(){return new n(this)}}var l,u,c,h=e+" Iterator",f=!1,d=t.prototype,p=d[O]||d["@@iterator"]||i&&d[i],g=!E&&p||s(i),y="Array"==e&&d.entries||p;if(y&&(l=w(y.call(new t)),P!==Object.prototype&&l.next&&(A||w(l)===P||(x?x(l,P):"function"!=typeof l[O]&&_(l,O,v)),S(l,h,!0,!0),A&&(C[h]=v))),i==T&&p&&p.name!==T&&(f=!0,g=function(){return p.call(this)}),A&&!a||d[O]===g||_(d,O,g),C[e]=g,i)if(u={values:s(T),keys:o?g:s("keys"),entries:s("entries")},a)for(c in u)!E&&!f&&c in d||k(d,c,u[c]);else m({target:e,proto:!0,forced:E||f},u);return u}},function(t,e,n){"use strict";var r,i,o,a=n(59),s=n(18),l=n(14),u=n(6),c=n(55),h=u("iterator"),f=!1;[].keys&&("next"in(o=[].keys())?(i=a(a(o)))!==Object.prototype&&(r=i):f=!0),null==r&&(r={}),c||l(r,h)||s(r,h,function(){return this}),t.exports={IteratorPrototype:r,BUGGY_SAFARI_ITERATORS:f}},function(t,e,n){var r=n(4);t.exports=!r(function(){function t(){}return t.prototype.constructor=null,Object.getPrototypeOf(new t)!==t.prototype})},function(t,e,n){"use strict";var r=n(1),i=n(92),o=n(27),a=n(58),s=[].join,l=i!=Object,u=a("join",",");r({target:"Array",proto:!0,forced:l||!u},{join:function(t){return s.call(o(this),void 0===t?",":t)}})},function(t,e){t.exports="undefined"!=typeof ArrayBuffer&&"undefined"!=typeof DataView},function(t,e,n){var i=n(24);t.exports=function(t,e,n){for(var r in e)i(t,r,e[r],n);return t}},function(t,e,n){var r=n(37),i=n(8);t.exports=function(t){if(void 0===t)return 0;var e=r(t),n=i(e);if(e!==n)throw RangeError("Wrong length or index");return n}},function(t,e,n){"use strict";function r(t){var e,n,r,i,o,a,s,l,u=h(t,!1);if("string"==typeof u&&2<u.length)if(43===(e=(u=v(u)).charCodeAt(0))||45===e){if(88===(n=u.charCodeAt(2))||120===n)return NaN}else if(48===e){switch(u.charCodeAt(1)){case 66:case 98:r=2,i=49;break;case 79:case 111:r=8,i=55;break;default:return+u}for(a=(o=u.slice(2)).length,s=0;s<a;s++)if((l=o.charCodeAt(s))<48||i<l)return NaN;return parseInt(o,r)}return+u}var i=n(11),o=n(3),a=n(142),s=n(24),l=n(14),u=n(30),c=n(224),h=n(54),f=n(4),d=n(57),p=n(56).f,g=n(53).f,y=n(15).f,v=n(225).trim,m="Number",b=o[m],w=b.prototype,x=u(d(w))==m;if(a(m,!b(" 0o1")||!b("0b1")||b("+0x1"))){for(var S,_=function(t){var e=arguments.length<1?0:t,n=this;return n instanceof _&&(x?f(function(){w.valueOf.call(n)}):u(n)!=m)?c(new b(r(e)),n,_):r(e)},k=i?p(b):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),A=0;k.length>A;A++)l(b,S=k[A])&&!l(_,S)&&y(_,S,g(b,S));(_.prototype=w).constructor=_,s(o,m,_)}},function(t,e,n){var o=n(13),a=n(45);t.exports=function(t,e,n){var r,i;return a&&"function"==typeof(r=e.constructor)&&r!==n&&o(i=r.prototype)&&i!==n.prototype&&a(t,i),t}},function(t,e,n){function r(n){return function(t){var e=String(i(t));return 1&n&&(e=e.replace(a,"")),2&n&&(e=e.replace(s,"")),e}}var i=n(34),o="["+n(226)+"]",a=RegExp("^"+o+o+"*"),s=RegExp(o+o+"*$");t.exports={start:r(1),end:r(2),trim:r(3)}},function(t,e){t.exports="\t\n\v\f\r Â áš€â€€â€â€‚â€ƒâ€„â€…â€†â€‡â€ˆâ€‰â€Šâ€¯âŸã€€\u2028\u2029\ufeff"},function(t,e,n){var r=n(1),i=n(19),o=n(94);r({target:"Object",stat:!0,forced:n(4)(function(){o(1)})},{keys:function(t){return o(i(t))}})},function(t,e,n){"use strict";var r=n(16);t.exports=function(){var t=r(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.dotAll&&(e+="s"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},function(t,e,n){"use strict";var r=n(24),i=n(16),o=n(4),a=n(228),s="toString",l=RegExp.prototype,u=l[s],c=o(function(){return"/a/b"!=u.call({source:"a",flags:"b"})}),h=u.name!=s;(c||h)&&r(RegExp.prototype,s,function(){var t=i(this),e=String(t.source),n=t.flags;return"/"+e+"/"+String(void 0===n&&t instanceof RegExp&&!("flags"in l)?a.call(t):n)},{unsafe:!0})},function(t,e,n){"use strict";var r=n(159),C=n(16),P=n(19),E=n(8),O=n(37),o=n(34),T=n(160),I=n(161),L=Math.max,M=Math.min,B=Math.floor,R=/\$([$&'`]|\d\d?|<[^>]*>)/g,F=/\$([$&'`]|\d\d?)/g;r("replace",2,function(i,x,S,t){var _=t.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE,k=t.REPLACE_KEEPS_$0,A=_?"$":"$0";return[function(t,e){var n=o(this),r=null==t?void 0:t[i];return void 0!==r?r.call(t,n,e):x.call(String(n),t,e)},function(t,e){if(!_&&k||"string"==typeof e&&-1===e.indexOf(A)){var n=S(x,t,this,e);if(n.done)return n.value}var r=C(t),i=String(this),o="function"==typeof e;o||(e=String(e));var a,s=r.global;s&&(a=r.unicode,r.lastIndex=0);for(var l=[];;){var u=I(r,i);if(null===u)break;if(l.push(u),!s)break;""===String(u[0])&&(r.lastIndex=T(i,E(r.lastIndex),a))}for(var c,h="",f=0,d=0;d<l.length;d++){u=l[d];for(var p=String(u[0]),g=L(M(O(u.index),i.length),0),y=[],v=1;v<u.length;v++)y.push(void 0===(c=u[v])?c:String(c));var m,b=u.groups,w=o?(m=[p].concat(y,g,i),void 0!==b&&m.push(b),String(e.apply(void 0,m))):function(o,a,s,l,u,t){var c=s+o.length,h=l.length,e=F;void 0!==u&&(u=P(u),e=R);return x.call(t,e,function(t,e){var n;switch(e.charAt(0)){case"$":return"$";case"&":return o;case"`":return a.slice(0,s);case"'":return a.slice(c);case"<":n=u[e.slice(1,-1)];break;default:var r=+e;if(0==r)return t;if(h<r){var i=B(r/10);return 0===i?t:i<=h?void 0===l[i-1]?e.charAt(1):l[i-1]+e.charAt(1):t}n=l[r-1]}return void 0===n?"":n})}(p,i,g,y,b,e);f<=g&&(h+=i.slice(f,g)+w,f=g+p.length)}return h+i.slice(f)}]})},function(t,e,n){"use strict";var r=n(159),h=n(332),b=n(16),f=n(34),w=n(38),x=n(160),S=n(8),_=n(161),d=n(119),i=n(4),p=[].push,k=Math.min,A=4294967295,C=!i(function(){return!RegExp(A,"y")});r("split",2,function(i,y,v){var m="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||1<".".split(/()()/).length||"".split(/.?/).length?function(t,e){var n=String(f(this)),r=void 0===e?A:e>>>0;if(0==r)return[];if(void 0===t)return[n];if(!h(t))return y.call(n,t,r);for(var i,o,a,s=[],l=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),u=0,c=new RegExp(t.source,l+"g");(i=d.call(c,n))&&!(u<(o=c.lastIndex)&&(s.push(n.slice(u,i.index)),1<i.length&&i.index<n.length&&p.apply(s,i.slice(1)),a=i[0].length,u=o,s.length>=r));)c.lastIndex===i.index&&c.lastIndex++;return u===n.length?!a&&c.test("")||s.push(""):s.push(n.slice(u)),s.length>r?s.slice(0,r):s}:"0".split(void 0,0).length?function(t,e){return void 0===t&&0===e?[]:y.call(this,t,e)}:y;return[function(t,e){var n=f(this),r=null==t?void 0:t[i];return void 0!==r?r.call(t,n,e):m.call(String(n),t,e)},function(t,e){var n=v(m,t,this,e,m!==y);if(n.done)return n.value;var r=b(t),i=String(this),o=w(r,RegExp),a=r.unicode,s=(r.ignoreCase?"i":"")+(r.multiline?"m":"")+(r.unicode?"u":"")+(C?"y":"g"),l=new o(C?r:"^(?:"+r.source+")",s),u=void 0===e?A:e>>>0;if(0==u)return[];if(0===i.length)return null===_(l,i)?[i]:[];for(var c=0,h=0,f=[];h<i.length;){l.lastIndex=C?h:0;var d,p=_(l,C?i:i.slice(h));if(null===p||(d=k(S(l.lastIndex+(C?0:h)),i.length))===c)h=x(i,h,a);else{if(f.push(i.slice(c,h)),f.length===u)return f;for(var g=1;g<=p.length-1;g++)if(f.push(p[g]),f.length===u)return f;h=c=d}}return f.push(i.slice(c)),f}]},!C)},function(t,e,n){"use strict";var r=n(1),i=n(225).trim;r({target:"String",proto:!0,forced:n(333)("trim")},{trim:function(){return i(this)}})},function(t,e,n){"use strict";var r=n(1),i=n(234);r({target:"String",proto:!0,forced:n(235)("link")},{link:function(t){return i(this,"a","href",t)}})},function(t,e,n){var a=n(34),s=/"/g;t.exports=function(t,e,n,r){var i=String(a(t)),o="<"+e;return""!==n&&(o+=" "+n+'="'+String(r).replace(s,"&quot;")+'"'),o+">"+i+"</"+e+">"}},function(t,e,n){var r=n(4);t.exports=function(e){return r(function(){var t=""[e]('"');return t!==t.toLowerCase()||3<t.split('"').length})}},function(t,e,n){"use strict";function p(t,e){for(var n=0,r=e.length,i=new(Z(t))(r);n<r;)i[n]=e[n++];return i}function r(t,e){D(t,e,{get:function(){return R(this)[e]}})}function g(t){var e;return t instanceof j||"ArrayBuffer"==(e=_(t))||"SharedArrayBuffer"==e}function i(t,e){return X(t)&&"symbol"!=typeof e&&e in t&&String(+e)==String(e)}function o(t,e){return i(t,e=d(e,!0))?f(2,t[e]):z(t,e)}function a(t,e,n){return!(i(t,e=d(e,!0))&&k(n)&&S(n,"value"))||S(n,"get")||S(n,"set")||n.configurable||S(n,"writable")&&!n.writable||S(n,"enumerable")&&!n.enumerable?D(t,e,n):(t[e]=n.value,t)}var l=n(1),u=n(3),s=n(11),y=n(335),c=n(5),h=n(152),v=n(153),f=n(42),m=n(18),b=n(8),w=n(222),x=n(237),d=n(54),S=n(14),_=n(117),k=n(13),A=n(57),C=n(45),P=n(56).f,E=n(337),O=n(20).forEach,T=n(154),I=n(15),L=n(53),M=n(35),B=n(224),R=M.get,F=M.set,D=I.f,z=L.f,N=Math.round,U=u.RangeError,j=h.ArrayBuffer,W=h.DataView,V=c.NATIVE_ARRAY_BUFFER_VIEWS,G=c.TYPED_ARRAY_TAG,H=c.TypedArray,q=c.TypedArrayPrototype,Z=c.aTypedArrayConstructor,X=c.isTypedArray,Y="BYTES_PER_ELEMENT",K="Wrong length";s?(V||(L.f=o,I.f=a,r(q,"buffer"),r(q,"byteOffset"),r(q,"byteLength"),r(q,"length")),l({target:"Object",stat:!0,forced:!V},{getOwnPropertyDescriptor:o,defineProperty:a}),t.exports=function(t,e,o){function c(t,i){D(t,i,{get:function(){return t=i,(e=R(this)).view[n](t*h+e.byteOffset,!0);var t,e},set:function(t){return e=i,n=t,r=R(this),o&&(n=(n=N(n))<0?0:255<n?255:255&n),void r.view[a](e*h+r.byteOffset,n,!0);var e,n,r},enumerable:!0})}var h=t.match(/\d+$/)[0]/8,f=t+(o?"Clamped":"")+"Array",n="get"+t,a="set"+t,i=u[f],d=i,r=d&&d.prototype,s={};V?y&&(d=e(function(t,e,n,r){return v(t,d,f),B(k(e)?g(e)?void 0!==r?new i(e,x(n,h),r):void 0!==n?new i(e,x(n,h)):new i(e):X(e)?p(d,e):E.call(d,e):new i(w(e)),t,d)}),C&&C(d,H),O(P(i),function(t){t in d||m(d,t,i[t])}),d.prototype=r):(d=e(function(t,e,n,r){v(t,d,f);var i,o,a,s=0,l=0;if(k(e)){if(!g(e))return X(e)?p(d,e):E.call(d,e);i=e,l=x(n,h);var u=e.byteLength;if(void 0===r){if(u%h)throw U(K);if((o=u-l)<0)throw U(K)}else if(u<(o=b(r)*h)+l)throw U(K);a=o/h}else a=w(e),i=new j(o=a*h);for(F(t,{buffer:i,byteOffset:l,byteLength:o,length:a,view:new W(i)});s<a;)c(t,s++)}),C&&C(d,H),r=d.prototype=A(q)),r.constructor!==d&&m(r,"constructor",d),G&&m(r,G,f),s[f]=d,l({global:!0,forced:d!=i,sham:!V},s),Y in d||m(d,Y,h),Y in r||m(r,Y,h),T(f)}):t.exports=function(){}},function(t,e,n){var r=n(336);t.exports=function(t,e){var n=r(t);if(n%e)throw RangeError("Wrong offset");return n}},function(t,e,n){function r(u){return function(t,e,n,r){c(e);var i=h(t),o=f(i),a=d(i.length),s=u?a-1:0,l=u?-1:1;if(n<2)for(;;){if(s in o){r=o[s],s+=l;break}if(s+=l,u?s<0:a<=s)throw TypeError("Reduce of empty array with no initial value")}for(;u?0<=s:s<a;s+=l)s in o&&(r=e(r,o[s],s,i));return r}}var c=n(44),h=n(19),f=n(92),d=n(8);t.exports={left:r(!1),right:r(!0)}},function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}},function(M,t,B){"use strict";(function(t,y){var v=B(122);M.exports=f;var a,m=B(196);f.ReadableState=o;function b(t,e){return t.listeners(e).length}B(121).EventEmitter;var i=B(241),u=B(123).Buffer,c=t.Uint8Array||function(){};var e=Object.create(B(98));e.inherits=B(85);var s,n=B(341),w=void 0,w=n&&n.debuglog?n.debuglog("stream"):function(){},l=B(342),r=B(242);e.inherits(f,i);var h=["error","close","destroy","pause","resume"];function o(t,e){t=t||{};var n=e instanceof(a=a||B(48));this.objectMode=!!t.objectMode,n&&(this.objectMode=this.objectMode||!!t.readableObjectMode);var r=t.highWaterMark,i=t.readableHighWaterMark,o=this.objectMode?16:16384;this.highWaterMark=r||0===r?r:n&&(i||0===i)?i:o,this.highWaterMark=Math.floor(this.highWaterMark),this.buffer=new l,this.length=0,this.pipes=null,this.pipesCount=0,this.flowing=null,this.ended=!1,this.endEmitted=!1,this.reading=!1,this.sync=!0,this.needReadable=!1,this.emittedReadable=!1,this.readableListening=!1,this.resumeScheduled=!1,this.destroyed=!1,this.defaultEncoding=t.defaultEncoding||"utf8",this.awaitDrain=0,this.readingMore=!1,this.decoder=null,this.encoding=null,t.encoding&&(s=s||B(165).StringDecoder,this.decoder=new s(t.encoding),this.encoding=t.encoding)}function f(t){if(a=a||B(48),!(this instanceof f))return new f(t);this._readableState=new o(t,this),this.readable=!0,t&&("function"==typeof t.read&&(this._read=t.read),"function"==typeof t.destroy&&(this._destroy=t.destroy)),i.call(this)}function d(t,e,n,r,i){var o,a,s,l=t._readableState;return null===e?(l.reading=!1,function(t,e){if(e.ended)return;{var n;!e.decoder||(n=e.decoder.end())&&n.length&&(e.buffer.push(n),e.length+=e.objectMode?1:n.length)}e.ended=!0,S(t)}(t,l)):(i||(o=function(t,e){var n;(function(t){return u.isBuffer(t)||t instanceof c})(e)||"string"==typeof e||void 0===e||t.objectMode||(n=new TypeError("Invalid non-string/buffer chunk"));return n}(l,e)),o?t.emit("error",o):l.objectMode||e&&0<e.length?("string"==typeof e||l.objectMode||Object.getPrototypeOf(e)===u.prototype||(a=e,e=u.from(a)),r?l.endEmitted?t.emit("error",new Error("stream.unshift() after end event")):p(t,l,e,!0):l.ended?t.emit("error",new Error("stream.push() after EOF")):(l.reading=!1,l.decoder&&!n?(e=l.decoder.write(e),l.objectMode||0!==e.length?p(t,l,e,!1):k(t,l)):p(t,l,e,!1))):r||(l.reading=!1)),!(s=l).ended&&(s.needReadable||s.length<s.highWaterMark||0===s.length)}function p(t,e,n,r){e.flowing&&0===e.length&&!e.sync?(t.emit("data",n),t.read(0)):(e.length+=e.objectMode?1:n.length,r?e.buffer.unshift(n):e.buffer.push(n),e.needReadable&&S(t)),k(t,e)}Object.defineProperty(f.prototype,"destroyed",{get:function(){return void 0!==this._readableState&&this._readableState.destroyed},set:function(t){this._readableState&&(this._readableState.destroyed=t)}}),f.prototype.destroy=r.destroy,f.prototype._undestroy=r.undestroy,f.prototype._destroy=function(t,e){this.push(null),e(t)},f.prototype.push=function(t,e){var n,r=this._readableState;return r.objectMode?n=!0:"string"==typeof t&&((e=e||r.defaultEncoding)!==r.encoding&&(t=u.from(t,e),e=""),n=!0),d(this,t,e,!1,n)},f.prototype.unshift=function(t){return d(this,t,null,!0,!1)},f.prototype.isPaused=function(){return!1===this._readableState.flowing},f.prototype.setEncoding=function(t){return s=s||B(165).StringDecoder,this._readableState.decoder=new s(t),this._readableState.encoding=t,this};var g=8388608;function x(t,e){return t<=0||0===e.length&&e.ended?0:e.objectMode?1:t!=t?e.flowing&&e.length?e.buffer.head.data.length:e.length:(t>e.highWaterMark&&(e.highWaterMark=(g<=(n=t)?n=g:(n--,n|=n>>>1,n|=n>>>2,n|=n>>>4,n|=n>>>8,n|=n>>>16,n++),n)),t<=e.length?t:e.ended?e.length:(e.needReadable=!0,0));var n}function S(t){var e=t._readableState;e.needReadable=!1,e.emittedReadable||(w("emitReadable",e.flowing),e.emittedReadable=!0,e.sync?v.nextTick(_,t):_(t))}function _(t){w("emit readable"),t.emit("readable"),E(t)}function k(t,e){e.readingMore||(e.readingMore=!0,v.nextTick(A,t,e))}function A(t,e){for(var n=e.length;!e.reading&&!e.flowing&&!e.ended&&e.length<e.highWaterMark&&(w("maybeReadMore read 0"),t.read(0),n!==e.length);)n=e.length;e.readingMore=!1}function C(t){w("readable nexttick read 0"),t.read(0)}function P(t,e){e.reading||(w("resume read 0"),t.read(0)),e.resumeScheduled=!1,e.awaitDrain=0,t.emit("resume"),E(t),e.flowing&&!e.reading&&t.read(0)}function E(t){var e=t._readableState;for(w("flow",e.flowing);e.flowing&&null!==t.read(););}function O(t,e){return 0===e.length?null:(e.objectMode?n=e.buffer.shift():!t||t>=e.length?(n=e.decoder?e.buffer.join(""):1===e.buffer.length?e.buffer.head.data:e.buffer.concat(e.length),e.buffer.clear()):n=function(t,e,n){var r;t<e.head.data.length?(r=e.head.data.slice(0,t),e.head.data=e.head.data.slice(t)):r=t===e.head.data.length?e.shift():(n?function(t,e){var n=e.head,r=1,i=n.data;t-=i.length;for(;n=n.next;){var o=n.data,a=t>o.length?o.length:t;if(a===o.length?i+=o:i+=o.slice(0,t),0===(t-=a)){a===o.length?(++r,n.next?e.head=n.next:e.head=e.tail=null):(e.head=n).data=o.slice(a);break}++r}return e.length-=r,i}:function(t,e){var n=u.allocUnsafe(t),r=e.head,i=1;r.data.copy(n),t-=r.data.length;for(;r=r.next;){var o=r.data,a=t>o.length?o.length:t;if(o.copy(n,n.length-t,0,a),0===(t-=a)){a===o.length?(++i,r.next?e.head=r.next:e.head=e.tail=null):(e.head=r).data=o.slice(a);break}++i}return e.length-=i,n})(t,e);return r}(t,e.buffer,e.decoder),n);var n}function T(t){var e=t._readableState;if(0<e.length)throw new Error('"endReadable()" called on non-empty stream');e.endEmitted||(e.ended=!0,v.nextTick(I,e,t))}function I(t,e){t.endEmitted||0!==t.length||(t.endEmitted=!0,e.readable=!1,e.emit("end"))}function L(t,e){for(var n=0,r=t.length;n<r;n++)if(t[n]===e)return n;return-1}f.prototype.read=function(t){w("read",t),t=parseInt(t,10);var e=this._readableState,n=t;if(0!==t&&(e.emittedReadable=!1),0===t&&e.needReadable&&(e.length>=e.highWaterMark||e.ended))return w("read: emitReadable",e.length,e.ended),(0===e.length&&e.ended?T:S)(this),null;if(0===(t=x(t,e))&&e.ended)return 0===e.length&&T(this),null;var r,i=e.needReadable;return w("need readable",i),(0===e.length||e.length-t<e.highWaterMark)&&w("length less than watermark",i=!0),e.ended||e.reading?w("reading or ended",i=!1):i&&(w("do read"),e.reading=!0,e.sync=!0,0===e.length&&(e.needReadable=!0),this._read(e.highWaterMark),e.sync=!1,e.reading||(t=x(n,e))),null===(r=0<t?O(t,e):null)?(e.needReadable=!0,t=0):e.length-=t,0===e.length&&(e.ended||(e.needReadable=!0),n!==t&&e.ended&&T(this)),null!==r&&this.emit("data",r),r},f.prototype._read=function(t){this.emit("error",new Error("_read() is not implemented"))},f.prototype.pipe=function(n,t){var r=this,i=this._readableState;switch(i.pipesCount){case 0:i.pipes=n;break;case 1:i.pipes=[i.pipes,n];break;default:i.pipes.push(n)}i.pipesCount+=1,w("pipe count=%d opts=%j",i.pipesCount,t);var e=(!t||!1!==t.end)&&n!==y.stdout&&n!==y.stderr?a:g;function o(t,e){w("onunpipe"),t===r&&e&&!1===e.hasUnpiped&&(e.hasUnpiped=!0,w("cleanup"),n.removeListener("close",d),n.removeListener("finish",p),n.removeListener("drain",l),n.removeListener("error",f),n.removeListener("unpipe",o),r.removeListener("end",a),r.removeListener("end",g),r.removeListener("data",h),u=!0,!i.awaitDrain||n._writableState&&!n._writableState.needDrain||l())}function a(){w("onend"),n.end()}i.endEmitted?v.nextTick(e):r.once("end",e),n.on("unpipe",o);var s,l=(s=r,function(){var t=s._readableState;w("pipeOnDrain",t.awaitDrain),t.awaitDrain&&t.awaitDrain--,0===t.awaitDrain&&b(s,"data")&&(t.flowing=!0,E(s))});n.on("drain",l);var u=!1;var c=!1;function h(t){w("ondata"),(c=!1)!==n.write(t)||c||((1===i.pipesCount&&i.pipes===n||1<i.pipesCount&&-1!==L(i.pipes,n))&&!u&&(w("false write response, pause",r._readableState.awaitDrain),r._readableState.awaitDrain++,c=!0),r.pause())}function f(t){w("onerror",t),g(),n.removeListener("error",f),0===b(n,"error")&&n.emit("error",t)}function d(){n.removeListener("finish",p),g()}function p(){w("onfinish"),n.removeListener("close",d),g()}function g(){w("unpipe"),r.unpipe(n)}return r.on("data",h),function(t,e,n){if("function"==typeof t.prependListener)return t.prependListener(e,n);t._events&&t._events[e]?m(t._events[e])?t._events[e].unshift(n):t._events[e]=[n,t._events[e]]:t.on(e,n)}(n,"error",f),n.once("close",d),n.once("finish",p),n.emit("pipe",r),i.flowing||(w("pipe resume"),r.resume()),n},f.prototype.unpipe=function(t){var e=this._readableState,n={hasUnpiped:!1};if(0===e.pipesCount)return this;if(1===e.pipesCount)return t&&t!==e.pipes||(t=t||e.pipes,e.pipes=null,e.pipesCount=0,e.flowing=!1,t&&t.emit("unpipe",this,n)),this;if(!t){var r=e.pipes,i=e.pipesCount;e.pipes=null,e.pipesCount=0,e.flowing=!1;for(var o=0;o<i;o++)r[o].emit("unpipe",this,n);return this}var a=L(e.pipes,t);return-1===a||(e.pipes.splice(a,1),--e.pipesCount,1===e.pipesCount&&(e.pipes=e.pipes[0]),t.emit("unpipe",this,n)),this},f.prototype.addListener=f.prototype.on=function(t,e){var n,r=i.prototype.on.call(this,t,e);return"data"===t?!1!==this._readableState.flowing&&this.resume():"readable"===t&&((n=this._readableState).endEmitted||n.readableListening||(n.readableListening=n.needReadable=!0,n.emittedReadable=!1,n.reading?n.length&&S(this):v.nextTick(C,this))),r},f.prototype.resume=function(){var t,e,n=this._readableState;return n.flowing||(w("resume"),n.flowing=!0,t=this,(e=n).resumeScheduled||(e.resumeScheduled=!0,v.nextTick(P,t,e))),this},f.prototype.pause=function(){return w("call pause flowing=%j",this._readableState.flowing),!1!==this._readableState.flowing&&(w("pause"),this._readableState.flowing=!1,this.emit("pause")),this},f.prototype.wrap=function(e){var n=this,r=this._readableState,i=!1;for(var t in e.on("end",function(){var t;w("wrapped end"),!r.decoder||r.ended||(t=r.decoder.end())&&t.length&&n.push(t),n.push(null)}),e.on("data",function(t){w("wrapped data"),r.decoder&&(t=r.decoder.write(t)),r.objectMode&&null==t||(r.objectMode||t&&t.length)&&(n.push(t)||(i=!0,e.pause()))}),e)void 0===this[t]&&"function"==typeof e[t]&&(this[t]=function(t){return function(){return e[t].apply(e,arguments)}}(t));for(var o=0;o<h.length;o++)e.on(h[o],this.emit.bind(this,h[o]));return this._read=function(t){w("wrapped _read",t),i&&(i=!1,e.resume())},this},Object.defineProperty(f.prototype,"readableHighWaterMark",{enumerable:!1,get:function(){return this._readableState.highWaterMark}}),f._fromList=O}).call(this,B(26),B(47))},function(t,e,n){t.exports=n(121).EventEmitter},function(t,e,n){"use strict";var o=n(122);function a(t,e){t.emit("error",e)}t.exports={destroy:function(t,e){var n=this,r=this._readableState&&this._readableState.destroyed,i=this._writableState&&this._writableState.destroyed;return r||i?e?e(t):!t||this._writableState&&this._writableState.errorEmitted||o.nextTick(a,this,t):(this._readableState&&(this._readableState.destroyed=!0),this._writableState&&(this._writableState.destroyed=!0),this._destroy(t||null,function(t){!e&&t?(o.nextTick(a,n,t),n._writableState&&(n._writableState.errorEmitted=!0)):e&&e(t)})),this},undestroy:function(){this._readableState&&(this._readableState.destroyed=!1,this._readableState.reading=!1,this._readableState.ended=!1,this._readableState.endEmitted=!1),this._writableState&&(this._writableState.destroyed=!1,this._writableState.ended=!1,this._writableState.ending=!1,this._writableState.finished=!1,this._writableState.errorEmitted=!1)}}},function(t,e,n){"use strict";t.exports=o;var r=n(48),i=Object.create(n(98));function o(t){if(!(this instanceof o))return new o(t);r.call(this,t),this._transformState={afterTransform:function(t,e){var n=this._transformState;n.transforming=!1;var r=n.writecb;if(!r)return this.emit("error",new Error("write callback called multiple times"));n.writechunk=null,(n.writecb=null)!=e&&this.push(e),r(t);var i=this._readableState;i.reading=!1,(i.needReadable||i.length<i.highWaterMark)&&this._read(i.highWaterMark)}.bind(this),needTransform:!1,transforming:!1,writecb:null,writechunk:null,writeencoding:null},this._readableState.needReadable=!0,this._readableState.sync=!1,t&&("function"==typeof t.transform&&(this._transform=t.transform),"function"==typeof t.flush&&(this._flush=t.flush)),this.on("prefinish",a)}function a(){var n=this;"function"==typeof this._flush?this._flush(function(t,e){s(n,t,e)}):s(this,null,null)}function s(t,e,n){if(e)return t.emit("error",e);if(null!=n&&t.push(n),t._writableState.length)throw new Error("Calling transform done when ws.length != 0");if(t._transformState.transforming)throw new Error("Calling transform done when still transforming");return t.push(null)}i.inherits=n(85),i.inherits(o,r),o.prototype.push=function(t,e){return this._transformState.needTransform=!1,r.prototype.push.call(this,t,e)},o.prototype._transform=function(t,e,n){throw new Error("_transform() is not implemented")},o.prototype._write=function(t,e,n){var r,i=this._transformState;i.writecb=n,i.writechunk=t,i.writeencoding=e,i.transforming||(r=this._readableState,(i.needTransform||r.needReadable||r.length<r.highWaterMark)&&this._read(r.highWaterMark))},o.prototype._read=function(t){var e=this._transformState;null!==e.writechunk&&e.writecb&&!e.transforming?(e.transforming=!0,this._transform(e.writechunk,e.writeencoding,e.afterTransform)):e.needTransform=!0},o.prototype._destroy=function(t,e){var n=this;r.prototype._destroy.call(this,t,function(t){e(t),n.emit("close")})}},function(t,E,O){"use strict";(function(i){var y=O(10).Buffer,a=O(162).Transform,s=O(350),t=O(166),v=O(245).ok,m=O(10).kMaxLength,b="Cannot create final Buffer. It would be larger than 0x"+m.toString(16)+" bytes";s.Z_MIN_WINDOWBITS=8,s.Z_MAX_WINDOWBITS=15,s.Z_DEFAULT_WINDOWBITS=15,s.Z_MIN_CHUNK=64,s.Z_MAX_CHUNK=1/0,s.Z_DEFAULT_CHUNK=16384,s.Z_MIN_MEMLEVEL=1,s.Z_MAX_MEMLEVEL=9,s.Z_DEFAULT_MEMLEVEL=8,s.Z_MIN_LEVEL=-1,s.Z_MAX_LEVEL=9,s.Z_DEFAULT_LEVEL=s.Z_DEFAULT_COMPRESSION;for(var e=Object.keys(s),n=0;n<e.length;n++){var r=e[n];r.match(/^Z/)&&Object.defineProperty(E,r,{enumerable:!0,value:s[r],writable:!1})}for(var o={Z_OK:s.Z_OK,Z_STREAM_END:s.Z_STREAM_END,Z_NEED_DICT:s.Z_NEED_DICT,Z_ERRNO:s.Z_ERRNO,Z_STREAM_ERROR:s.Z_STREAM_ERROR,Z_DATA_ERROR:s.Z_DATA_ERROR,Z_MEM_ERROR:s.Z_MEM_ERROR,Z_BUF_ERROR:s.Z_BUF_ERROR,Z_VERSION_ERROR:s.Z_VERSION_ERROR},l=Object.keys(o),u=0;u<l.length;u++){var c=l[u];o[o[c]]=c}function h(n,t,r){var i=[],o=0;function e(){for(var t;null!==(t=n.read());)i.push(t),o+=t.length;n.once("readable",e)}function a(){var t,e=null;m<=o?e=new RangeError(b):t=y.concat(i,o),i=[],n.close(),r(e,t)}n.on("error",function(t){n.removeListener("end",a),n.removeListener("readable",e),r(t)}),n.on("end",a),n.end(t),e()}function f(t,e){if("string"==typeof e&&(e=y.from(e)),!y.isBuffer(e))throw new TypeError("Not a string or buffer");var n=t._finishFlushFlag;return t._processChunk(e,n)}function d(t){if(!(this instanceof d))return new d(t);A.call(this,t,s.DEFLATE)}function p(t){if(!(this instanceof p))return new p(t);A.call(this,t,s.INFLATE)}function g(t){if(!(this instanceof g))return new g(t);A.call(this,t,s.GZIP)}function w(t){if(!(this instanceof w))return new w(t);A.call(this,t,s.GUNZIP)}function x(t){if(!(this instanceof x))return new x(t);A.call(this,t,s.DEFLATERAW)}function S(t){if(!(this instanceof S))return new S(t);A.call(this,t,s.INFLATERAW)}function _(t){if(!(this instanceof _))return new _(t);A.call(this,t,s.UNZIP)}function k(t){return t===s.Z_NO_FLUSH||t===s.Z_PARTIAL_FLUSH||t===s.Z_SYNC_FLUSH||t===s.Z_FULL_FLUSH||t===s.Z_FINISH||t===s.Z_BLOCK}function A(t,e){var n=this;if(this._opts=t=t||{},this._chunkSize=t.chunkSize||E.Z_DEFAULT_CHUNK,a.call(this,t),t.flush&&!k(t.flush))throw new Error("Invalid flush flag: "+t.flush);if(t.finishFlush&&!k(t.finishFlush))throw new Error("Invalid flush flag: "+t.finishFlush);if(this._flushFlag=t.flush||s.Z_NO_FLUSH,this._finishFlushFlag=void 0!==t.finishFlush?t.finishFlush:s.Z_FINISH,t.chunkSize&&(t.chunkSize<E.Z_MIN_CHUNK||t.chunkSize>E.Z_MAX_CHUNK))throw new Error("Invalid chunk size: "+t.chunkSize);if(t.windowBits&&(t.windowBits<E.Z_MIN_WINDOWBITS||t.windowBits>E.Z_MAX_WINDOWBITS))throw new Error("Invalid windowBits: "+t.windowBits);if(t.level&&(t.level<E.Z_MIN_LEVEL||t.level>E.Z_MAX_LEVEL))throw new Error("Invalid compression level: "+t.level);if(t.memLevel&&(t.memLevel<E.Z_MIN_MEMLEVEL||t.memLevel>E.Z_MAX_MEMLEVEL))throw new Error("Invalid memLevel: "+t.memLevel);if(t.strategy&&t.strategy!=E.Z_FILTERED&&t.strategy!=E.Z_HUFFMAN_ONLY&&t.strategy!=E.Z_RLE&&t.strategy!=E.Z_FIXED&&t.strategy!=E.Z_DEFAULT_STRATEGY)throw new Error("Invalid strategy: "+t.strategy);if(t.dictionary&&!y.isBuffer(t.dictionary))throw new Error("Invalid dictionary: it should be a Buffer instance");this._handle=new s.Zlib(e);var r=this;this._hadError=!1,this._handle.onerror=function(t,e){C(r),r._hadError=!0;var n=new Error(t);n.errno=e,n.code=E.codes[e],r.emit("error",n)};var i=E.Z_DEFAULT_COMPRESSION;"number"==typeof t.level&&(i=t.level);var o=E.Z_DEFAULT_STRATEGY;"number"==typeof t.strategy&&(o=t.strategy),this._handle.init(t.windowBits||E.Z_DEFAULT_WINDOWBITS,i,t.memLevel||E.Z_DEFAULT_MEMLEVEL,o,t.dictionary),this._buffer=y.allocUnsafe(this._chunkSize),this._offset=0,this._level=i,this._strategy=o,this.once("end",this.close),Object.defineProperty(this,"_closed",{get:function(){return!n._handle},configurable:!0,enumerable:!0})}function C(t,e){e&&i.nextTick(e),t._handle&&(t._handle.close(),t._handle=null)}function P(t){t.emit("close")}Object.defineProperty(E,"codes",{enumerable:!0,value:Object.freeze(o),writable:!1}),E.Deflate=d,E.Inflate=p,E.Gzip=g,E.Gunzip=w,E.DeflateRaw=x,E.InflateRaw=S,E.Unzip=_,E.createDeflate=function(t){return new d(t)},E.createInflate=function(t){return new p(t)},E.createDeflateRaw=function(t){return new x(t)},E.createInflateRaw=function(t){return new S(t)},E.createGzip=function(t){return new g(t)},E.createGunzip=function(t){return new w(t)},E.createUnzip=function(t){return new _(t)},E.deflate=function(t,e,n){return"function"==typeof e&&(n=e,e={}),h(new d(e),t,n)},E.deflateSync=function(t,e){return f(new d(e),t)},E.gzip=function(t,e,n){return"function"==typeof e&&(n=e,e={}),h(new g(e),t,n)},E.gzipSync=function(t,e){return f(new g(e),t)},E.deflateRaw=function(t,e,n){return"function"==typeof e&&(n=e,e={}),h(new x(e),t,n)},E.deflateRawSync=function(t,e){return f(new x(e),t)},E.unzip=function(t,e,n){return"function"==typeof e&&(n=e,e={}),h(new _(e),t,n)},E.unzipSync=function(t,e){return f(new _(e),t)},E.inflate=function(t,e,n){return"function"==typeof e&&(n=e,e={}),h(new p(e),t,n)},E.inflateSync=function(t,e){return f(new p(e),t)},E.gunzip=function(t,e,n){return"function"==typeof e&&(n=e,e={}),h(new w(e),t,n)},E.gunzipSync=function(t,e){return f(new w(e),t)},E.inflateRaw=function(t,e,n){return"function"==typeof e&&(n=e,e={}),h(new S(e),t,n)},E.inflateRawSync=function(t,e){return f(new S(e),t)},t.inherits(A,a),A.prototype.params=function(t,e,n){if(t<E.Z_MIN_LEVEL||t>E.Z_MAX_LEVEL)throw new RangeError("Invalid compression level: "+t);if(e!=E.Z_FILTERED&&e!=E.Z_HUFFMAN_ONLY&&e!=E.Z_RLE&&e!=E.Z_FIXED&&e!=E.Z_DEFAULT_STRATEGY)throw new TypeError("Invalid strategy: "+e);var r;this._level!==t||this._strategy!==e?(r=this).flush(s.Z_SYNC_FLUSH,function(){v(r._handle,"zlib binding closed"),r._handle.params(t,e),r._hadError||(r._level=t,r._strategy=e,n&&n())}):i.nextTick(n)},A.prototype.reset=function(){return v(this._handle,"zlib binding closed"),this._handle.reset()},A.prototype._flush=function(t){this._transform(y.alloc(0),"",t)},A.prototype.flush=function(t,e){var n=this,r=this._writableState;"function"!=typeof t&&(void 0!==t||e)||(e=t,t=s.Z_FULL_FLUSH),r.ended?e&&i.nextTick(e):r.ending?e&&this.once("end",e):r.needDrain?e&&this.once("drain",function(){return n.flush(t,e)}):(this._flushFlag=t,this.write(y.alloc(0),"",e))},A.prototype.close=function(t){C(this,t),i.nextTick(P,this)},A.prototype._transform=function(t,e,n){var r,i=this._writableState,o=(i.ending||i.ended)&&(!t||i.length===t.length);return null===t||y.isBuffer(t)?this._handle?(o?r=this._finishFlushFlag:(r=this._flushFlag,t.length>=i.length&&(this._flushFlag=this._opts.flush||s.Z_NO_FLUSH)),void this._processChunk(t,r,n)):n(new Error("zlib binding closed")):n(new Error("invalid input"))},A.prototype._processChunk=function(o,a,s){var l=o&&o.length,u=this._chunkSize-this._offset,c=0,h=this,f="function"==typeof s;if(!f){var e,d=[],p=0;this.on("error",function(t){e=t}),v(this._handle,"zlib binding closed");do{var t=this._handle.writeSync(a,o,c,l,this._buffer,this._offset,u)}while(!this._hadError&&g(t[0],t[1]));if(this._hadError)throw e;if(m<=p)throw C(this),new RangeError(b);var n=y.concat(d,p);return C(this),n}v(this._handle,"zlib binding closed");var r=this._handle.write(a,o,c,l,this._buffer,this._offset,u);function g(t,e){if(this&&(this.buffer=null,this.callback=null),!h._hadError){var n,r=u-e;if(v(0<=r,"have should not go down"),0<r&&(n=h._buffer.slice(h._offset,h._offset+r),h._offset+=r,f?h.push(n):(d.push(n),p+=n.length)),(0===e||h._offset>=h._chunkSize)&&(u=h._chunkSize,h._offset=0,h._buffer=y.allocUnsafe(h._chunkSize)),0===e){if(c+=l-t,l=t,!f)return!0;var i=h._handle.write(a,o,c,l,h._buffer,h._offset,h._chunkSize);return i.callback=g,void(i.buffer=o)}if(!f)return!1;s()}}r.buffer=o,r.callback=g},t.inherits(d,A),t.inherits(p,A),t.inherits(g,A),t.inherits(w,A),t.inherits(x,A),t.inherits(S,A),t.inherits(_,A)}).call(this,O(47))},function(S,t,_){"use strict";(function(e){var t=_(351);
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */function o(t,e){if(t===e)return 0;for(var n=t.length,r=e.length,i=0,o=Math.min(n,r);i<o;++i)if(t[i]!==e[i]){n=t[i],r=e[i];break}return n<r?-1:r<n?1:0}function a(t){return e.Buffer&&"function"==typeof e.Buffer.isBuffer?e.Buffer.isBuffer(t):!(null==t||!t._isBuffer)}var c=_(166),r=Object.prototype.hasOwnProperty,h=Array.prototype.slice,n="foo"===function(){}.name;function s(t){return Object.prototype.toString.call(t)}function l(t){if(!a(t)&&"function"==typeof e.ArrayBuffer){if("function"==typeof ArrayBuffer.isView)return ArrayBuffer.isView(t);if(t)return t instanceof DataView||!!(t.buffer&&t.buffer instanceof ArrayBuffer)}}var u=S.exports=y,i=/\s*function\s+([^\(\s]*)\s*/;function f(t){if(c.isFunction(t)){if(n)return t.name;var e=t.toString().match(i);return e&&e[1]}}function d(t,e){return"string"!=typeof t||t.length<e?t:t.slice(0,e)}function p(t){if(n||!c.isFunction(t))return c.inspect(t);var e=f(t);return"[Function"+(e?": "+e:"")+"]"}function g(t,e,n,r,i){throw new u.AssertionError({message:n,actual:t,expected:e,operator:r,stackStartFunction:i})}function y(t,e){t||g(t,!0,e,"==",u.ok)}function v(t,e,n,r){if(t===e)return!0;if(a(t)&&a(e))return 0===o(t,e);if(c.isDate(t)&&c.isDate(e))return t.getTime()===e.getTime();if(c.isRegExp(t)&&c.isRegExp(e))return t.source===e.source&&t.global===e.global&&t.multiline===e.multiline&&t.lastIndex===e.lastIndex&&t.ignoreCase===e.ignoreCase;if(null!==t&&"object"==typeof t||null!==e&&"object"==typeof e){if(l(t)&&l(e)&&s(t)===s(e)&&!(t instanceof Float32Array||t instanceof Float64Array))return 0===o(new Uint8Array(t.buffer),new Uint8Array(e.buffer));if(a(t)!==a(e))return!1;var i=(r=r||{actual:[],expected:[]}).actual.indexOf(t);return-1!==i&&i===r.expected.indexOf(e)||(r.actual.push(t),r.expected.push(e),function(t,e,n,r){if(null==t||null==e)return!1;if(c.isPrimitive(t)||c.isPrimitive(e))return t===e;if(n&&Object.getPrototypeOf(t)!==Object.getPrototypeOf(e))return!1;var i=m(t),o=m(e);if(i&&!o||!i&&o)return!1;if(i)return t=h.call(t),e=h.call(e),v(t,e,n);var a,s,l=x(t),u=x(e);if(l.length!==u.length)return!1;for(l.sort(),u.sort(),s=l.length-1;0<=s;s--)if(l[s]!==u[s])return!1;for(s=l.length-1;0<=s;s--)if(a=l[s],!v(t[a],e[a],n,r))return!1;return!0}(t,e,n,r))}return n?t===e:t==e}function m(t){return"[object Arguments]"==Object.prototype.toString.call(t)}function b(t,e){if(t&&e){if("[object RegExp]"==Object.prototype.toString.call(e))return e.test(t);try{if(t instanceof e)return 1}catch(t){}if(!Error.isPrototypeOf(e))return!0===e.call({},t)}}function w(t,e,n,r){var i;if("function"!=typeof e)throw new TypeError('"block" argument must be a function');"string"==typeof n&&(r=n,n=null),i=function(t){var e;try{t()}catch(t){e=t}return e}(e),r=(n&&n.name?" ("+n.name+").":".")+(r?" "+r:"."),t&&!i&&g(i,n,"Missing expected exception"+r);var o="string"==typeof r,a=!t&&i&&!n;if((!t&&c.isError(i)&&o&&b(i,n)||a)&&g(i,n,"Got unwanted exception"+r),t&&i&&n&&!b(i,n)||!t&&i)throw i}u.AssertionError=function(t){var e;this.name="AssertionError",this.actual=t.actual,this.expected=t.expected,this.operator=t.operator,t.message?(this.message=t.message,this.generatedMessage=!1):(this.message=d(p((e=this).actual),128)+" "+e.operator+" "+d(p(e.expected),128),this.generatedMessage=!0);var n,r,i,o,a,s=t.stackStartFunction||g;Error.captureStackTrace?Error.captureStackTrace(this,s):(n=new Error).stack&&(a=n.stack,r=f(s),0<=(i=a.indexOf("\n"+r))&&(o=a.indexOf("\n",i+1),a=a.substring(o+1)),this.stack=a)},c.inherits(u.AssertionError,Error),u.fail=g,u.ok=y,u.equal=function(t,e,n){t!=e&&g(t,e,n,"==",u.equal)},u.notEqual=function(t,e,n){t==e&&g(t,e,n,"!=",u.notEqual)},u.deepEqual=function(t,e,n){v(t,e,!1)||g(t,e,n,"deepEqual",u.deepEqual)},u.deepStrictEqual=function(t,e,n){v(t,e,!0)||g(t,e,n,"deepStrictEqual",u.deepStrictEqual)},u.notDeepEqual=function(t,e,n){v(t,e,!1)&&g(t,e,n,"notDeepEqual",u.notDeepEqual)},u.notDeepStrictEqual=function t(e,n,r){v(e,n,!0)&&g(e,n,r,"notDeepStrictEqual",t)},u.strictEqual=function(t,e,n){t!==e&&g(t,e,n,"===",u.strictEqual)},u.notStrictEqual=function(t,e,n){t===e&&g(t,e,n,"!==",u.notStrictEqual)},u.throws=function(t,e,n){w(!0,t,e,n)},u.doesNotThrow=function(t,e,n){w(!1,t,e,n)},u.ifError=function(t){if(t)throw t},u.strict=t(function t(e,n){e||g(e,!0,n,"==",t)},u,{equal:u.strictEqual,deepEqual:u.deepStrictEqual,notEqual:u.notStrictEqual,notDeepEqual:u.notDeepStrictEqual}),u.strict.strict=u.strict;var x=Object.keys||function(t){var e=[];for(var n in t)r.call(t,n)&&e.push(n);return e}}).call(this,_(26))},function(t,e,n){"use strict";t.exports=function(t,e,n,r){for(var i=65535&t|0,o=t>>>16&65535|0,a=0;0!==n;){for(n-=a=2e3<n?2e3:n;o=o+(i=i+e[r++]|0)|0,--a;);i%=65521,o%=65521}return i|o<<16|0}},function(t,e,n){"use strict";var s=function(){for(var t,e=[],n=0;n<256;n++){t=n;for(var r=0;r<8;r++)t=1&t?3988292384^t>>>1:t>>>1;e[n]=t}return e}();t.exports=function(t,e,n,r){var i=s,o=r+n;t^=-1;for(var a=r;a<o;a++)t=t>>>8^i[255&(t^e[a])];return-1^t}},function(t,e,n){var l;t.exports=(l=n(2),function(i){var t=l,e=t.lib,n=e.WordArray,r=e.Hasher,o=t.algo,a=[],b=[];!function(){function t(t){return 4294967296*(t-(0|t))|0}for(var e=2,n=0;n<64;)!function(t){for(var e=i.sqrt(t),n=2;n<=e;n++)if(!(t%n))return;return 1}(e)||(n<8&&(a[n]=t(i.pow(e,.5))),b[n]=t(i.pow(e,1/3)),n++),e++}();var w=[],s=o.SHA256=r.extend({_doReset:function(){this._hash=new n.init(a.slice(0))},_doProcessBlock:function(t,e){for(var n,r,i,o,a=this._hash.words,s=a[0],l=a[1],u=a[2],c=a[3],h=a[4],f=a[5],d=a[6],p=a[7],g=0;g<64;g++){g<16?w[g]=0|t[e+g]:(r=((n=w[g-15])<<25|n>>>7)^(n<<14|n>>>18)^n>>>3,o=((i=w[g-2])<<15|i>>>17)^(i<<13|i>>>19)^i>>>10,w[g]=r+w[g-7]+o+w[g-16]);var y=s&l^s&u^l&u,v=(s<<30|s>>>2)^(s<<19|s>>>13)^(s<<10|s>>>22),m=p+((h<<26|h>>>6)^(h<<21|h>>>11)^(h<<7|h>>>25))+(h&f^~h&d)+b[g]+w[g],p=d,d=f,f=h,h=c+m|0,c=u,u=l,l=s,s=m+(v+y)|0}a[0]=a[0]+s|0,a[1]=a[1]+l|0,a[2]=a[2]+u|0,a[3]=a[3]+c|0,a[4]=a[4]+h|0,a[5]=a[5]+f|0,a[6]=a[6]+d|0,a[7]=a[7]+p|0},_doFinalize:function(){var t=this._data,e=t.words,n=8*this._nDataBytes,r=8*t.sigBytes;return e[r>>>5]|=128<<24-r%32,e[14+(64+r>>>9<<4)]=i.floor(n/4294967296),e[15+(64+r>>>9<<4)]=n,t.sigBytes=4*e.length,this._process(),this._hash},clone:function(){var t=r.clone.call(this);return t._hash=this._hash.clone(),t}});t.SHA256=r._createHelper(s),t.HmacSHA256=r._createHmacHelper(s)}(Math),l.SHA256)},function(t,e,n){var l;t.exports=(l=n(2),n(125),function(){var t=l,e=t.lib.Hasher,n=t.x64,r=n.Word,i=n.WordArray,o=t.algo;function a(){return r.create.apply(r,arguments)}var wt=[a(1116352408,3609767458),a(1899447441,602891725),a(3049323471,3964484399),a(3921009573,2173295548),a(961987163,4081628472),a(1508970993,3053834265),a(2453635748,2937671579),a(2870763221,3664609560),a(3624381080,2734883394),a(310598401,1164996542),a(607225278,1323610764),a(1426881987,3590304994),a(1925078388,4068182383),a(2162078206,991336113),a(2614888103,633803317),a(3248222580,3479774868),a(3835390401,2666613458),a(4022224774,944711139),a(264347078,2341262773),a(604807628,2007800933),a(770255983,1495990901),a(1249150122,1856431235),a(1555081692,3175218132),a(1996064986,2198950837),a(2554220882,3999719339),a(2821834349,766784016),a(2952996808,2566594879),a(3210313671,3203337956),a(3336571891,1034457026),a(3584528711,2466948901),a(113926993,3758326383),a(338241895,168717936),a(666307205,1188179964),a(773529912,1546045734),a(1294757372,1522805485),a(1396182291,2643833823),a(1695183700,2343527390),a(1986661051,1014477480),a(2177026350,1206759142),a(2456956037,344077627),a(2730485921,1290863460),a(2820302411,3158454273),a(3259730800,3505952657),a(3345764771,106217008),a(3516065817,3606008344),a(3600352804,1432725776),a(4094571909,1467031594),a(275423344,851169720),a(430227734,3100823752),a(506948616,1363258195),a(659060556,3750685593),a(883997877,3785050280),a(958139571,3318307427),a(1322822218,3812723403),a(1537002063,2003034995),a(1747873779,3602036899),a(1955562222,1575990012),a(2024104815,1125592928),a(2227730452,2716904306),a(2361852424,442776044),a(2428436474,593698344),a(2756734187,3733110249),a(3204031479,2999351573),a(3329325298,3815920427),a(3391569614,3928383900),a(3515267271,566280711),a(3940187606,3454069534),a(4118630271,4000239992),a(116418474,1914138554),a(174292421,2731055270),a(289380356,3203993006),a(460393269,320620315),a(685471733,587496836),a(852142971,1086792851),a(1017036298,365543100),a(1126000580,2618297676),a(1288033470,3409855158),a(1501505948,4234509866),a(1607167915,987167468),a(1816402316,1246189591)],xt=[];!function(){for(var t=0;t<80;t++)xt[t]=a()}();var s=o.SHA512=e.extend({_doReset:function(){this._hash=new i.init([new r.init(1779033703,4089235720),new r.init(3144134277,2227873595),new r.init(1013904242,4271175723),new r.init(2773480762,1595750129),new r.init(1359893119,2917565137),new r.init(2600822924,725511199),new r.init(528734635,4215389547),new r.init(1541459225,327033209)])},_doProcessBlock:function(t,e){for(var n=this._hash.words,r=n[0],i=n[1],o=n[2],a=n[3],s=n[4],l=n[5],u=n[6],c=n[7],h=r.high,f=r.low,d=i.high,p=i.low,g=o.high,y=o.low,v=a.high,m=a.low,b=s.high,w=s.low,x=l.high,S=l.low,_=u.high,k=u.low,A=c.high,C=c.low,P=h,E=f,O=d,T=p,I=g,L=y,M=v,B=m,R=b,F=w,D=x,z=S,N=_,U=k,j=A,W=C,V=0;V<80;V++){var G,H,q,Z,X,Y,K,J,Q,$,tt,et,nt,rt,it,ot=xt[V];V<16?(it=ot.high=0|t[e+2*V],rt=ot.low=0|t[e+2*V+1]):(Z=((H=(G=xt[V-15]).high)>>>1|(q=G.low)<<31)^(H>>>8|q<<24)^H>>>7,X=(q>>>1|H<<31)^(q>>>8|H<<24)^(q>>>7|H<<25),Q=((K=(Y=xt[V-2]).high)>>>19|(J=Y.low)<<13)^(K<<3|J>>>29)^K>>>6,$=(J>>>19|K<<13)^(J<<3|K>>>29)^(J>>>6|K<<26),it=(it=(it=Z+(tt=xt[V-7]).high+((rt=X+tt.low)>>>0<X>>>0?1:0))+Q+((rt+=$)>>>0<$>>>0?1:0))+(et=xt[V-16]).high+((rt+=nt=et.low)>>>0<nt>>>0?1:0),ot.high=it,ot.low=rt);var at=R&D^~R&N,st=F&z^~F&U,lt=P&O^P&I^O&I,ut=E&T^E&L^T&L,ct=(P>>>28|E<<4)^(P<<30|E>>>2)^(P<<25|E>>>7),ht=(E>>>28|P<<4)^(E<<30|P>>>2)^(E<<25|P>>>7),ft=(R>>>14|F<<18)^(R>>>18|F<<14)^(R<<23|F>>>9),dt=(F>>>14|R<<18)^(F>>>18|R<<14)^(F<<23|R>>>9),pt=wt[V],gt=pt.high,yt=pt.low,vt=W+dt,mt=j+ft+(vt>>>0<W>>>0?1:0),bt=ht+ut,j=N,W=U,N=D,U=z,D=R,z=F,R=M+(mt=(mt=(mt=mt+at+((vt+=st)>>>0<st>>>0?1:0))+gt+((vt+=yt)>>>0<yt>>>0?1:0))+it+((vt+=rt)>>>0<rt>>>0?1:0))+((F=B+vt|0)>>>0<B>>>0?1:0)|0,M=I,B=L,I=O,L=T,O=P,T=E,P=mt+(ct+lt+(bt>>>0<ht>>>0?1:0))+((E=vt+bt|0)>>>0<vt>>>0?1:0)|0}f=r.low=f+E,r.high=h+P+(f>>>0<E>>>0?1:0),p=i.low=p+T,i.high=d+O+(p>>>0<T>>>0?1:0),y=o.low=y+L,o.high=g+I+(y>>>0<L>>>0?1:0),m=a.low=m+B,a.high=v+M+(m>>>0<B>>>0?1:0),w=s.low=w+F,s.high=b+R+(w>>>0<F>>>0?1:0),S=l.low=S+z,l.high=x+D+(S>>>0<z>>>0?1:0),k=u.low=k+U,u.high=_+N+(k>>>0<U>>>0?1:0),C=c.low=C+W,c.high=A+j+(C>>>0<W>>>0?1:0)},_doFinalize:function(){var t=this._data,e=t.words,n=8*this._nDataBytes,r=8*t.sigBytes;return e[r>>>5]|=128<<24-r%32,e[30+(128+r>>>10<<5)]=Math.floor(n/4294967296),e[31+(128+r>>>10<<5)]=n,t.sigBytes=4*e.length,this._process(),this._hash.toX32()},clone:function(){var t=e.clone.call(this);return t._hash=this._hash.clone(),t},blockSize:32});t.SHA512=e._createHelper(s),t.HmacSHA512=e._createHmacHelper(s)}(),l.SHA512)},function(t){t.exports=JSON.parse('[["a140","î“†",62],["a180","î”…",32],["a240","î”¦",62],["a280","î•¥",32],["a2ab","î¦",5],["a2e3","â‚¬î­"],["a2ef","î®î¯"],["a2fd","î°î±"],["a340","î–†",62],["a380","î—…",31,"ã€€"],["a440","î—¦",62],["a480","î˜¥",32],["a4f4","î²",10],["a540","î™†",62],["a580","îš…",32],["a5f7","î½",7],["a640","îš¦",62],["a680","î›¥",32],["a6b9","îž…",7],["a6d9","îž",6],["a6ec","îž”îž•"],["a6f3","îž–"],["a6f6","îž—",8],["a740","îœ†",62],["a780","î…",32],["a7c2","îž ",14],["a7f2","îž¯",12],["a896","îž¼",10],["a8bc","á¸¿"],["a8bf","Ç¹"],["a8c1","îŸ‰îŸŠîŸ‹îŸŒ"],["a8ea","îŸ",20],["a958","îŸ¢"],["a95b","îŸ£"],["a95d","îŸ¤îŸ¥îŸ¦"],["a989","ã€¾â¿°",11],["a997","îŸ´",12],["a9f0","î ",14],["aaa1","î€€",93],["aba1","îž",93],["aca1","î‚¼",93],["ada1","î„š",93],["aea1","î…¸",93],["afa1","î‡–",93],["d7fa","î ",4],["f8a1","îˆ´",93],["f9a1","îŠ’",93],["faa1","î‹°",93],["fba1","îŽ",93],["fca1","îŽ¬",93],["fda1","îŠ",93],["fe50","âºî –î —î ˜âº„ã‘³ã‘‡âºˆâº‹î žã–žã˜šã˜ŽâºŒâº—ã¥®ã¤˜î ¦ã§ã§Ÿã©³ã§î «î ¬ã­Žã±®ã³ âº§î ±î ²âºªä–ä…Ÿâº®äŒ·âº³âº¶âº·î »äŽ±äŽ¬âº»ää“–ä™¡ä™Œî¡ƒ"],["fe80","äœ£äœ©ä¼äžâ»Šä¥‡ä¥ºä¥½ä¦‚ä¦ƒä¦…ä¦†ä¦Ÿä¦›ä¦·ä¦¶î¡”î¡•ä²£ä²Ÿä² ä²¡ä±·ä²¢ä´“",6,"ä¶®î¡¤î‘¨",93],["8135f437","îŸ‡"]]')},function(t){t.exports=JSON.parse('[["0","\\u0000",127],["a140","ã€€ï¼Œã€ã€‚ï¼Žâ€§ï¼›ï¼šï¼Ÿï¼ï¸°â€¦â€¥ï¹ï¹‘ï¹’Â·ï¹”ï¹•ï¹–ï¹—ï½œâ€“ï¸±â€”ï¸³â•´ï¸´ï¹ï¼ˆï¼‰ï¸µï¸¶ï½›ï½ï¸·ï¸¸ã€”ã€•ï¸¹ï¸ºã€ã€‘ï¸»ï¸¼ã€Šã€‹ï¸½ï¸¾ã€ˆã€‰ï¸¿ï¹€ã€Œã€ï¹ï¹‚ã€Žã€ï¹ƒï¹„ï¹™ï¹š"],["a1a1","ï¹›ï¹œï¹ï¹žâ€˜â€™â€œâ€ã€ã€žâ€µâ€²ï¼ƒï¼†ï¼Šâ€»Â§ã€ƒâ—‹â—â–³â–²â—Žâ˜†â˜…â—‡â—†â–¡â– â–½â–¼ãŠ£â„…Â¯ï¿£ï¼¿Ëï¹‰ï¹Šï¹ï¹Žï¹‹ï¹Œï¹Ÿï¹ ï¹¡ï¼‹ï¼Ã—Ã·Â±âˆšï¼œï¼žï¼â‰¦â‰§â‰ âˆžâ‰’â‰¡ï¹¢",4,"ï½žâˆ©âˆªâŠ¥âˆ âˆŸâŠ¿ã’ã‘âˆ«âˆ®âˆµâˆ´â™€â™‚âŠ•âŠ™â†‘â†“â†â†’â†–â†—â†™â†˜âˆ¥âˆ£ï¼"],["a240","ï¼¼âˆ•ï¹¨ï¼„ï¿¥ã€’ï¿ ï¿¡ï¼…ï¼ â„ƒâ„‰ï¹©ï¹ªï¹«ã•ãŽœãŽãŽžãŽãŽ¡ãŽŽãŽã„Â°å…™å…›å…žå…å…¡å…£å—§ç“©ç³Žâ–",7,"â–â–Žâ–â–Œâ–‹â–Šâ–‰â”¼â”´â”¬â”¤â”œâ–”â”€â”‚â–•â”Œâ”â””â”˜â•­"],["a2a1","â•®â•°â•¯â•â•žâ•ªâ•¡â—¢â—£â—¥â—¤â•±â•²â•³ï¼",9,"â… ",9,"ã€¡",8,"åå„å…ï¼¡",25,"ï½",21],["a340","ï½—ï½˜ï½™ï½šÎ‘",16,"Î£",6,"Î±",16,"Ïƒ",6,"ã„…",10],["a3a1","ã„",25,"Ë™Ë‰ËŠË‡Ë‹"],["a3e1","â‚¬"],["a440","ä¸€ä¹™ä¸ä¸ƒä¹ƒä¹äº†äºŒäººå„¿å…¥å…«å‡ åˆ€åˆåŠ›åŒ•ååœåˆä¸‰ä¸‹ä¸ˆä¸Šä¸«ä¸¸å‡¡ä¹…ä¹ˆä¹Ÿä¹žäºŽäº¡å…€åˆƒå‹ºåƒå‰å£åœŸå£«å¤•å¤§å¥³å­å­‘å­“å¯¸å°å°¢å°¸å±±å·å·¥å·±å·²å·³å·¾å¹²å»¾å¼‹å¼“æ‰"],["a4a1","ä¸‘ä¸ä¸ä¸­ä¸°ä¸¹ä¹‹å°¹äºˆäº‘äº•äº’äº”äº¢ä»ä»€ä»ƒä»†ä»‡ä»ä»Šä»‹ä»„å…ƒå…å…§å…­å…®å…¬å†—å‡¶åˆ†åˆ‡åˆˆå‹»å‹¾å‹¿åŒ–åŒ¹åˆå‡å…åžåŽ„å‹åŠåå£¬å¤©å¤«å¤ªå¤­å­”å°‘å°¤å°ºå±¯å·´å¹»å»¿å¼”å¼•å¿ƒæˆˆæˆ¶æ‰‹æ‰Žæ”¯æ–‡æ–—æ–¤æ–¹æ—¥æ›°æœˆæœ¨æ¬ æ­¢æ­¹æ¯‹æ¯”æ¯›æ°æ°´ç«çˆªçˆ¶çˆ»ç‰‡ç‰™ç‰›çŠ¬çŽ‹ä¸™"],["a540","ä¸–ä¸•ä¸”ä¸˜ä¸»ä¹ä¹ä¹Žä»¥ä»˜ä»”ä»•ä»–ä»—ä»£ä»¤ä»™ä»žå……å…„å†‰å†Šå†¬å‡¹å‡ºå‡¸åˆŠåŠ åŠŸåŒ…åŒ†åŒ—åŒä»ŸåŠå‰å¡å å¯å®åŽ»å¯å¤å³å¬å®å©å¨å¼å¸åµå«å¦åªå²å±å°å¥å­å»å››å›šå¤–"],["a5a1","å¤®å¤±å¥´å¥¶å­•å®ƒå°¼å·¨å·§å·¦å¸‚å¸ƒå¹³å¹¼å¼å¼˜å¼—å¿…æˆŠæ‰“æ‰”æ‰’æ‰‘æ–¥æ—¦æœ®æœ¬æœªæœ«æœ­æ­£æ¯æ°‘æ°æ°¸æ±æ±€æ°¾çŠ¯çŽ„çŽ‰ç“œç“¦ç”˜ç”Ÿç”¨ç”©ç”°ç”±ç”²ç”³ç–‹ç™½çš®çš¿ç›®çŸ›çŸ¢çŸ³ç¤ºç¦¾ç©´ç«‹ä¸žä¸Ÿä¹’ä¹“ä¹©äº™äº¤äº¦äº¥ä»¿ä¼‰ä¼™ä¼Šä¼•ä¼ä¼ä¼‘ä¼ä»²ä»¶ä»»ä»°ä»³ä»½ä¼ä¼‹å…‰å…‡å…†å…ˆå…¨"],["a640","å…±å†å†°åˆ—åˆ‘åˆ’åˆŽåˆ–åŠ£åŒˆåŒ¡åŒ å°å±å‰ååŒåŠååå‹å„å‘ååˆåƒåŽå†å’å› å›žå›åœ³åœ°åœ¨åœ­åœ¬åœ¯åœ©å¤™å¤šå¤·å¤¸å¦„å¥¸å¦ƒå¥½å¥¹å¦‚å¦å­—å­˜å®‡å®ˆå®…å®‰å¯ºå°–å±¹å·žå¸†å¹¶å¹´"],["a6a1","å¼å¼›å¿™å¿–æˆŽæˆŒæˆæˆæ‰£æ‰›æ‰˜æ”¶æ—©æ—¨æ—¬æ—­æ›²æ›³æœ‰æœ½æœ´æœ±æœµæ¬¡æ­¤æ­»æ°–æ±æ±—æ±™æ±Ÿæ± æ±æ±•æ±¡æ±›æ±æ±Žç°ç‰Ÿç‰ç™¾ç«¹ç±³ç³¸ç¼¶ç¾Šç¾½è€è€ƒè€Œè€’è€³è¿è‚‰è‚‹è‚Œè‡£è‡ªè‡³è‡¼èˆŒèˆ›èˆŸè‰®è‰²è‰¾è™«è¡€è¡Œè¡£è¥¿é˜¡ä¸²äº¨ä½ä½ä½‡ä½—ä½žä¼´ä½›ä½•ä¼°ä½ä½‘ä¼½ä¼ºä¼¸ä½ƒä½”ä¼¼ä½†ä½£"],["a740","ä½œä½ ä¼¯ä½Žä¼¶ä½™ä½ä½ˆä½šå…Œå…‹å…å…µå†¶å†·åˆ¥åˆ¤åˆ©åˆªåˆ¨åŠ«åŠ©åŠªåŠ¬åŒ£å³åµåå­åžå¾å¦å‘Žå§å‘†å‘ƒå³å‘ˆå‘‚å›å©å‘Šå¹å»å¸å®åµå¶å å¼å‘€å±å«åŸå¬å›ªå›°å›¤å›«åŠå‘å€å"],["a7a1","å‡åŽåœ¾åååœ»å£¯å¤¾å¦å¦’å¦¨å¦žå¦£å¦™å¦–å¦å¦¤å¦“å¦Šå¦¥å­å­œå­šå­›å®Œå®‹å®å°¬å±€å±å°¿å°¾å²å²‘å²”å²Œå·«å¸Œåºåº‡åºŠå»·å¼„å¼Ÿå½¤å½¢å½·å½¹å¿˜å¿Œå¿—å¿å¿±å¿«å¿¸å¿ªæˆ’æˆ‘æŠ„æŠ—æŠ–æŠ€æ‰¶æŠ‰æ‰­æŠŠæ‰¼æ‰¾æ‰¹æ‰³æŠ’æ‰¯æŠ˜æ‰®æŠ•æŠ“æŠ‘æŠ†æ”¹æ”»æ”¸æ—±æ›´æŸæŽæææ‘æœæ–æžæ‰æ†æ "],["a840","æ“æ—æ­¥æ¯æ±‚æ±žæ²™æ²æ²ˆæ²‰æ²…æ²›æ±ªæ±ºæ²æ±°æ²Œæ±¨æ²–æ²’æ±½æ²ƒæ±²æ±¾æ±´æ²†æ±¶æ²æ²”æ²˜æ²‚ç¶ç¼ç½ç¸ç‰¢ç‰¡ç‰ ç‹„ç‹‚çŽ–ç”¬ç”«ç”·ç”¸çš‚ç›¯çŸ£ç§ç§€ç¦¿ç©¶ç³»ç½•è‚–è‚“è‚è‚˜è‚›è‚šè‚²è‰¯èŠ’"],["a8a1","èŠ‹èŠè¦‹è§’è¨€è°·è±†è±•è²èµ¤èµ°è¶³èº«è»Šè¾›è¾°è¿‚è¿†è¿…è¿„å·¡é‚‘é‚¢é‚ªé‚¦é‚£é…‰é‡†é‡Œé˜²é˜®é˜±é˜ªé˜¬ä¸¦ä¹–ä¹³äº‹äº›äºžäº«äº¬ä½¯ä¾ä¾ä½³ä½¿ä½¬ä¾›ä¾‹ä¾†ä¾ƒä½°ä½µä¾ˆä½©ä½»ä¾–ä½¾ä¾ä¾‘ä½ºå…”å…’å…•å…©å…·å…¶å…¸å†½å‡½åˆ»åˆ¸åˆ·åˆºåˆ°åˆ®åˆ¶å‰åŠ¾åŠ»å’å”å“å‘å¦å·å¸å¹å–å”å—å‘³å‘µ"],["a940","å’–å‘¸å’•å’€å‘»å‘·å’„å’’å’†å‘¼å’å‘±å‘¶å’Œå’šå‘¢å‘¨å’‹å‘½å’Žå›ºåžƒå·åªå©å¡å¦å¤å¼å¤œå¥‰å¥‡å¥ˆå¥„å¥”å¦¾å¦»å§”å¦¹å¦®å§‘å§†å§å§å§‹å§“å§Šå¦¯å¦³å§’å§…å­Ÿå­¤å­£å®—å®šå®˜å®œå®™å®›å°šå±ˆå±…"],["a9a1","å±†å²·å²¡å²¸å²©å²«å²±å²³å¸˜å¸šå¸–å¸•å¸›å¸‘å¹¸åºšåº—åºœåº•åº–å»¶å¼¦å¼§å¼©å¾€å¾å½¿å½¼å¿å¿ å¿½å¿µå¿¿æ€æ€”æ€¯æ€µæ€–æ€ªæ€•æ€¡æ€§æ€©æ€«æ€›æˆ–æˆ•æˆ¿æˆ¾æ‰€æ‰¿æ‹‰æ‹Œæ‹„æŠ¿æ‹‚æŠ¹æ‹’æ‹›æŠ«æ‹“æ‹”æ‹‹æ‹ˆæŠ¨æŠ½æŠ¼æ‹æ‹™æ‹‡æ‹æŠµæ‹šæŠ±æ‹˜æ‹–æ‹—æ‹†æŠ¬æ‹Žæ”¾æ–§æ–¼æ—ºæ˜”æ˜“æ˜Œæ˜†æ˜‚æ˜Žæ˜€æ˜æ˜•æ˜Š"],["aa40","æ˜‡æœæœ‹æ­æž‹æž•æ±æžœæ³æ·æž‡æžæž—æ¯æ°æ¿æž‰æ¾æžæµæžšæž“æ¼æªæ²æ¬£æ­¦æ­§æ­¿æ°“æ°›æ³£æ³¨æ³³æ²±æ³Œæ³¥æ²³æ²½æ²¾æ²¼æ³¢æ²«æ³•æ³“æ²¸æ³„æ²¹æ³æ²®æ³—æ³…æ³±æ²¿æ²»æ³¡æ³›æ³Šæ²¬æ³¯æ³œæ³–æ³ "],["aaa1","ç‚•ç‚Žç‚’ç‚Šç‚™çˆ¬çˆ­çˆ¸ç‰ˆç‰§ç‰©ç‹€ç‹Žç‹™ç‹—ç‹çŽ©çŽ¨çŽŸçŽ«çŽ¥ç”½ç–ç–™ç–šçš„ç›‚ç›²ç›´çŸ¥çŸ½ç¤¾ç¥€ç¥ç§‰ç§ˆç©ºç©¹ç«ºç³¾ç½”ç¾Œç¾‹è€…è‚ºè‚¥è‚¢è‚±è‚¡è‚«è‚©è‚´è‚ªè‚¯è‡¥è‡¾èˆèŠ³èŠèŠ™èŠ­èŠ½èŠŸèŠ¹èŠ±èŠ¬èŠ¥èŠ¯èŠ¸èŠ£èŠ°èŠ¾èŠ·è™Žè™±åˆè¡¨è»‹è¿Žè¿”è¿‘é‚µé‚¸é‚±é‚¶é‡‡é‡‘é•·é–€é˜œé™€é˜¿é˜»é™„"],["ab40","é™‚éš¹é›¨é’éžäºŸäº­äº®ä¿¡ä¾µä¾¯ä¾¿ä¿ ä¿‘ä¿ä¿ä¿ƒä¾¶ä¿˜ä¿Ÿä¿Šä¿—ä¾®ä¿ä¿„ä¿‚ä¿šä¿Žä¿žä¾·å…—å†’å†‘å† å‰Žå‰ƒå‰Šå‰å‰Œå‰‹å‰‡å‹‡å‹‰å‹ƒå‹åŒå—å»åŽšå›å’¬å“€å’¨å“Žå“‰å’¸å’¦å’³å“‡å“‚å’½å’ªå“"],["aba1","å“„å“ˆå’¯å’«å’±å’»å’©å’§å’¿å›¿åž‚åž‹åž åž£åž¢åŸŽåž®åž“å¥•å¥‘å¥å¥Žå¥å§œå§˜å§¿å§£å§¨å¨ƒå§¥å§ªå§šå§¦å¨å§»å­©å®£å®¦å®¤å®¢å®¥å°å±Žå±å±å±‹å³™å³’å··å¸å¸¥å¸Ÿå¹½åº åº¦å»ºå¼ˆå¼­å½¥å¾ˆå¾…å¾Šå¾‹å¾‡å¾Œå¾‰æ€’æ€æ€ æ€¥æ€Žæ€¨ææ°æ¨æ¢æ†æƒæ¬æ«æªæ¤æ‰æ‹œæŒ–æŒ‰æ‹¼æ‹­æŒæ‹®æ‹½æŒ‡æ‹±æ‹·"],["ac40","æ‹¯æ‹¬æ‹¾æ‹´æŒ‘æŒ‚æ”¿æ•…æ–«æ–½æ—¢æ˜¥æ˜­æ˜ æ˜§æ˜¯æ˜Ÿæ˜¨æ˜±æ˜¤æ›·æŸ¿æŸ“æŸ±æŸ”æŸæŸ¬æž¶æž¯æŸµæŸ©æŸ¯æŸ„æŸ‘æž´æŸšæŸ¥æž¸æŸæŸžæŸ³æž°æŸ™æŸ¢æŸæŸ’æ­ªæ®ƒæ®†æ®µæ¯’æ¯—æ°Ÿæ³‰æ´‹æ´²æ´ªæµæ´¥æ´Œæ´±æ´žæ´—"],["aca1","æ´»æ´½æ´¾æ´¶æ´›æ³µæ´¹æ´§æ´¸æ´©æ´®æ´µæ´Žæ´«ç‚«ç‚ºç‚³ç‚¬ç‚¯ç‚­ç‚¸ç‚®ç‚¤çˆ°ç‰²ç‰¯ç‰´ç‹©ç‹ ç‹¡çŽ·çŠçŽ»çŽ²çç€çŽ³ç”šç”­ç•ç•Œç•Žç•‹ç–«ç–¤ç–¥ç–¢ç–£ç™¸çš†çš‡çšˆç›ˆç›†ç›ƒç›…çœç›¹ç›¸çœ‰çœ‹ç›¾ç›¼çœ‡çŸœç ‚ç ”ç Œç ç¥†ç¥‰ç¥ˆç¥‡ç¦¹ç¦ºç§‘ç§’ç§‹ç©¿çªç«¿ç«½ç±½ç´‚ç´…ç´€ç´‰ç´‡ç´„ç´†ç¼¸ç¾Žç¾¿è€„"],["ad40","è€è€è€‘è€¶èƒ–èƒ¥èƒšèƒƒèƒ„èƒŒèƒ¡èƒ›èƒŽèƒžèƒ¤èƒè‡´èˆ¢è‹§èŒƒèŒ…è‹£è‹›è‹¦èŒ„è‹¥èŒ‚èŒ‰è‹’è‹—è‹±èŒè‹œè‹”è‹‘è‹žè‹“è‹Ÿè‹¯èŒ†è™è™¹è™»è™ºè¡è¡«è¦è§”è¨ˆè¨‚è¨ƒè²žè² èµ´èµ³è¶´è»è»Œè¿°è¿¦è¿¢è¿ªè¿¥"],["ada1","è¿­è¿«è¿¤è¿¨éƒŠéƒŽéƒéƒƒé…‹é…Šé‡é–‚é™é™‹é™Œé™é¢é©éŸ‹éŸ­éŸ³é é¢¨é£›é£Ÿé¦–é¦™ä¹˜äº³å€Œå€å€£ä¿¯å€¦å€¥ä¿¸å€©å€–å€†å€¼å€Ÿå€šå€’å€‘ä¿ºå€€å€”å€¨ä¿±å€¡å€‹å€™å€˜ä¿³ä¿®å€­å€ªä¿¾å€«å€‰å…¼å†¤å†¥å†¢å‡å‡Œå‡†å‡‹å‰–å‰œå‰”å‰›å‰åŒªå¿åŽŸåŽåŸå“¨å”å”å”·å“¼å“¥å“²å”†å“ºå””å“©å“­å“¡å”‰å“®å“ª"],["ae40","å“¦å”§å”‡å“½å”åœƒåœ„åŸ‚åŸ”åŸ‹åŸƒå ‰å¤å¥—å¥˜å¥šå¨‘å¨˜å¨œå¨Ÿå¨›å¨“å§¬å¨ å¨£å¨©å¨¥å¨Œå¨‰å­«å±˜å®°å®³å®¶å®´å®®å®µå®¹å®¸å°„å±‘å±•å±å³­å³½å³»å³ªå³¨å³°å³¶å´å³´å·®å¸­å¸«åº«åº­åº§å¼±å¾’å¾‘å¾æ™"],["aea1","æ£æ¥ææ•æ­æ©æ¯æ‚„æ‚Ÿæ‚šæ‚æ‚”æ‚Œæ‚…æ‚–æ‰‡æ‹³æŒˆæ‹¿æŽæŒ¾æŒ¯æ•æ‚æ†ææ‰æŒºææŒ½æŒªæŒ«æŒ¨ææŒæ•ˆæ•‰æ–™æ—æ—…æ™‚æ™‰æ™æ™ƒæ™’æ™Œæ™…æ™æ›¸æœ”æœ•æœ—æ ¡æ ¸æ¡ˆæ¡†æ¡“æ ¹æ¡‚æ¡”æ ©æ¢³æ —æ¡Œæ¡‘æ ½æŸ´æ¡æ¡€æ ¼æ¡ƒæ ªæ¡…æ “æ ˜æ¡æ®Šæ®‰æ®·æ°£æ°§æ°¨æ°¦æ°¤æ³°æµªæ¶•æ¶ˆæ¶‡æµ¦æµ¸æµ·æµ™æ¶“"],["af40","æµ¬æ¶‰æµ®æµšæµ´æµ©æ¶Œæ¶Šæµ¹æ¶…æµ¥æ¶”çƒŠçƒ˜çƒ¤çƒ™çƒˆçƒçˆ¹ç‰¹ç‹¼ç‹¹ç‹½ç‹¸ç‹·çŽ†ç­ç‰ç®ç çªçžç•”ç•ç•œç•šç•™ç–¾ç—…ç—‡ç–²ç–³ç–½ç–¼ç–¹ç—‚ç–¸çš‹çš°ç›Šç›ç›Žçœ©çœŸçœ çœ¨çŸ©ç °ç §ç ¸ç ç ´ç ·"],["afa1","ç ¥ç ­ç  ç Ÿç ²ç¥•ç¥ç¥ ç¥Ÿç¥–ç¥žç¥ç¥—ç¥šç§¤ç§£ç§§ç§Ÿç§¦ç§©ç§˜çª„çªˆç«™ç¬†ç¬‘ç²‰ç´¡ç´—ç´‹ç´Šç´ ç´¢ç´”ç´ç´•ç´šç´œç´ç´™ç´›ç¼ºç½Ÿç¾”ç¿…ç¿è€†è€˜è€•è€™è€—è€½è€¿èƒ±è„‚èƒ°è„…èƒ­èƒ´è„†èƒ¸èƒ³è„ˆèƒ½è„Šèƒ¼èƒ¯è‡­è‡¬èˆ€èˆèˆªèˆ«èˆ¨èˆ¬èŠ»èŒ«è’è”èŠèŒ¸èè‰èŒµèŒ´èèŒ²èŒ¹èŒ¶èŒ—è€èŒ±èŒ¨èƒ"],["b040","è™”èšŠèšªèš“èš¤èš©èšŒèš£èšœè¡°è¡·è¢è¢‚è¡½è¡¹è¨˜è¨è¨Žè¨Œè¨•è¨Šè¨—è¨“è¨–è¨è¨‘è±ˆè±ºè±¹è²¡è²¢èµ·èº¬è»’è»”è»è¾±é€é€†è¿·é€€è¿ºè¿´é€ƒè¿½é€…è¿¸é‚•éƒ¡éƒéƒ¢é…’é…é…Œé‡˜é‡é‡—é‡œé‡™é–ƒé™¢é™£é™¡"],["b0a1","é™›é™é™¤é™˜é™žéš»é£¢é¦¬éª¨é«˜é¬¥é¬²é¬¼ä¹¾åºå½åœå‡åƒåŒåšå‰å¥å¶åŽå•åµå´å·åå€å¯å­å…œå†•å‡°å‰ªå‰¯å‹’å‹™å‹˜å‹•åŒåŒåŒ™åŒ¿å€åŒ¾åƒæ›¼å•†å•ªå•¦å•„å•žå•¡å•ƒå•Šå”±å•–å•å••å”¯å•¤å”¸å”®å•œå”¬å•£å”³å•å•—åœˆåœ‹åœ‰åŸŸå …å Šå †åŸ åŸ¤åŸºå ‚å µåŸ·åŸ¹å¤ å¥¢å¨¶å©å©‰å©¦å©ªå©€"],["b140","å¨¼å©¢å©šå©†å©Šå­°å¯‡å¯…å¯„å¯‚å®¿å¯†å°‰å°ˆå°‡å± å±œå±å´‡å´†å´Žå´›å´–å´¢å´‘å´©å´”å´™å´¤å´§å´—å·¢å¸¸å¸¶å¸³å¸·åº·åº¸åº¶åºµåº¾å¼µå¼·å½—å½¬å½©å½«å¾—å¾™å¾žå¾˜å¾¡å¾ å¾œæ¿æ‚£æ‚‰æ‚ æ‚¨æƒ‹æ‚´æƒ¦æ‚½"],["b1a1","æƒ…æ‚»æ‚µæƒœæ‚¼æƒ˜æƒ•æƒ†æƒŸæ‚¸æƒšæƒ‡æˆšæˆ›æ‰ˆæŽ æŽ§æ²æŽ–æŽ¢æŽ¥æ·æ§æŽ˜æŽªæ±æŽ©æŽ‰æŽƒæŽ›æ«æŽ¨æŽ„æŽˆæŽ™æŽ¡æŽ¬æŽ’æŽæŽ€æ»æ©æ¨æºæ•æ•–æ•‘æ•™æ•—å•Ÿæ•æ•˜æ••æ•”æ–œæ–›æ–¬æ—æ—‹æ—Œæ—Žæ™æ™šæ™¤æ™¨æ™¦æ™žæ›¹å‹—æœ›æ¢æ¢¯æ¢¢æ¢“æ¢µæ¡¿æ¡¶æ¢±æ¢§æ¢—æ¢°æ¢ƒæ£„æ¢­æ¢†æ¢…æ¢”æ¢æ¢¨æ¢Ÿæ¢¡æ¢‚æ¬²æ®º"],["b240","æ¯«æ¯¬æ°«æ¶Žæ¶¼æ·³æ·™æ¶²æ·¡æ·Œæ·¤æ·»æ·ºæ¸…æ·‡æ·‹æ¶¯æ·‘æ¶®æ·žæ·¹æ¶¸æ··æ·µæ·…æ·’æ¸šæ¶µæ·šæ·«æ·˜æ·ªæ·±æ·®æ·¨æ·†æ·„æ¶ªæ·¬æ¶¿æ·¦çƒ¹ç„‰ç„Šçƒ½çƒ¯çˆ½ç‰½çŠçŒœçŒ›çŒ–çŒ“çŒ™çŽ‡ç…çŠçƒç†ç¾çç“ ç“¶"],["b2a1","ç“·ç”œç”¢ç•¥ç•¦ç•¢ç•°ç–ç—”ç—•ç–µç—Šç—çšŽç›”ç›’ç››çœ·çœ¾çœ¼çœ¶çœ¸çœºç¡«ç¡ƒç¡Žç¥¥ç¥¨ç¥­ç§»çª’çª•ç¬ ç¬¨ç¬›ç¬¬ç¬¦ç¬™ç¬žç¬®ç²’ç²—ç²•çµ†çµƒçµ±ç´®ç´¹ç´¼çµ€ç´°ç´³çµ„ç´¯çµ‚ç´²ç´±ç¼½ç¾žç¾šç¿Œç¿Žç¿’è€œèŠè†è„¯è„–è„£è„«è„©è„°è„¤èˆ‚èˆµèˆ·èˆ¶èˆ¹èŽŽèŽžèŽ˜è¸èŽ¢èŽ–èŽ½èŽ«èŽ’èŽŠèŽ“èŽ‰èŽ è·è»è¼"],["b340","èŽ†èŽ§è™•å½ªè›‡è›€èš¶è›„èšµè›†è›‹èš±èš¯è›‰è¡“è¢žè¢ˆè¢«è¢’è¢–è¢è¢‹è¦“è¦è¨ªè¨è¨£è¨¥è¨±è¨­è¨Ÿè¨›è¨¢è±‰è±šè²©è²¬è²«è²¨è²ªè²§èµ§èµ¦è¶¾è¶ºè»›è»Ÿé€™é€é€šé€—é€£é€Ÿé€é€é€•é€žé€ é€é€¢é€–é€›é€”"],["b3a1","éƒ¨éƒ­éƒ½é…—é‡Žé‡µé‡¦é‡£é‡§é‡­é‡©é–‰é™ªé™µé™³é™¸é™°é™´é™¶é™·é™¬é›€é›ªé›©ç« ç«Ÿé ‚é ƒé­šé³¥é¹µé¹¿éº¥éº»å‚¢å‚å‚…å‚™å‚‘å‚€å‚–å‚˜å‚šæœ€å‡±å‰²å‰´å‰µå‰©å‹žå‹å‹›åšåŽ¥å•»å–€å–§å•¼å–Šå–å–˜å–‚å–œå–ªå–”å–‡å–‹å–ƒå–³å–®å–Ÿå”¾å–²å–šå–»å–¬å–±å•¾å–‰å–«å–™åœå ¯å ªå ´å ¤å °å ±å ¡å å  å£¹å£ºå¥ "],["b440","å©·åªšå©¿åª’åª›åª§å­³å­±å¯’å¯Œå¯“å¯å°Šå°‹å°±åµŒåµå´´åµ‡å·½å¹…å¸½å¹€å¹ƒå¹¾å»Šå»å»‚å»„å¼¼å½­å¾©å¾ªå¾¨æƒ‘æƒ¡æ‚²æ‚¶æƒ æ„œæ„£æƒºæ„•æƒ°æƒ»æƒ´æ…¨æƒ±æ„Žæƒ¶æ„‰æ„€æ„’æˆŸæ‰‰æŽ£æŽŒææ€æ©æ‰æ†æ"],["b4a1","æ’æ£ææ¡æ–æ­æ®æ¶æ´æªæ›æ‘’æšæ¹æ•žæ•¦æ•¢æ•£æ–‘æ–æ–¯æ™®æ™°æ™´æ™¶æ™¯æš‘æ™ºæ™¾æ™·æ›¾æ›¿æœŸæœæ£ºæ£•æ£ æ£˜æ£—æ¤…æ£Ÿæ£µæ£®æ£§æ£¹æ£’æ£²æ££æ£‹æ£æ¤æ¤’æ¤Žæ£‰æ£šæ¥®æ£»æ¬¾æ¬ºæ¬½æ®˜æ®–æ®¼æ¯¯æ°®æ°¯æ°¬æ¸¯æ¸¸æ¹”æ¸¡æ¸²æ¹§æ¹Šæ¸ æ¸¥æ¸£æ¸›æ¹›æ¹˜æ¸¤æ¹–æ¹®æ¸­æ¸¦æ¹¯æ¸´æ¹æ¸ºæ¸¬æ¹ƒæ¸æ¸¾æ»‹"],["b540","æº‰æ¸™æ¹Žæ¹£æ¹„æ¹²æ¹©æ¹Ÿç„™ç„šç„¦ç„°ç„¡ç„¶ç…®ç„œç‰ŒçŠ„çŠ€çŒ¶çŒ¥çŒ´çŒ©çºçªç³ç¢ç¥çµç¶ç´ç¯ç›ç¦ç¨ç”¥ç”¦ç•«ç•ªç—¢ç—›ç—£ç—™ç—˜ç—žç— ç™»ç™¼çš–çš“çš´ç›œççŸ­ç¡ç¡¬ç¡¯ç¨ç¨ˆç¨‹ç¨…ç¨€çª˜"],["b5a1","çª—çª–ç«¥ç«£ç­‰ç­–ç­†ç­ç­’ç­”ç­ç­‹ç­ç­‘ç²Ÿç²¥çµžçµçµ¨çµ•ç´«çµ®çµ²çµ¡çµ¦çµ¢çµ°çµ³å–„ç¿”ç¿•è€‹è’è‚…è…•è…”è…‹è…‘è…Žè„¹è…†è„¾è…Œè…“è…´èˆ’èˆœè©èƒè¸èè è…è‹èè¯è±è´è‘—èŠè°èŒèŒè½è²èŠè¸èŽè„èœè‡è”èŸè™›è›Ÿè›™è›­è›”è››è›¤è›è›žè¡—è£è£‚è¢±è¦ƒè¦–è¨»è© è©•è©žè¨¼è©"],["b640","è©”è©›è©è©†è¨´è¨ºè¨¶è©–è±¡è²‚è²¯è²¼è²³è²½è³è²»è³€è²´è²·è²¶è²¿è²¸è¶Šè¶…è¶è·Žè·è·‹è·šè·‘è·Œè·›è·†è»»è»¸è»¼è¾œé€®é€µé€±é€¸é€²é€¶é„‚éƒµé„‰éƒ¾é…£é…¥é‡éˆ”éˆ•éˆ£éˆ‰éˆžéˆéˆéˆ‡éˆ‘é–”é–é–‹é–‘"],["b6a1","é–“é–’é–ŽéšŠéšŽéš‹é™½éš…éš†éšé™²éš„é›é›…é›„é›†é›‡é›¯é›²éŸŒé …é †é ˆé£§é£ªé£¯é£©é£²é£­é¦®é¦­é»ƒé»é»‘äº‚å‚­å‚µå‚²å‚³åƒ…å‚¾å‚¬å‚·å‚»å‚¯åƒ‡å‰¿å‰·å‰½å‹Ÿå‹¦å‹¤å‹¢å‹£åŒ¯å—Ÿå—¨å—“å—¦å—Žå—œå—‡å—‘å—£å—¤å—¯å—šå—¡å—…å—†å—¥å—‰åœ’åœ“å¡žå¡‘å¡˜å¡—å¡šå¡”å¡«å¡Œå¡­å¡Šå¡¢å¡’å¡‹å¥§å«å«‰å«Œåª¾åª½åª¼"],["b740","åª³å«‚åª²åµ©åµ¯å¹Œå¹¹å»‰å»ˆå¼’å½™å¾¬å¾®æ„šæ„æ…ˆæ„Ÿæƒ³æ„›æƒ¹æ„æ„ˆæ…Žæ…Œæ…„æ…æ„¾æ„´æ„§æ„æ„†æ„·æˆ¡æˆ¢æ“æ¾æžæªæ­æ½æ¬ææœæ”ææ¶æ–æ—æ†æ•¬æ–Ÿæ–°æš—æš‰æš‡æšˆæš–æš„æš˜æšæœƒæ¦”æ¥­"],["b7a1","æ¥šæ¥·æ¥ æ¥”æ¥µæ¤°æ¦‚æ¥Šæ¥¨æ¥«æ¥žæ¥“æ¥¹æ¦†æ¥æ¥£æ¥›æ­‡æ­²æ¯€æ®¿æ¯“æ¯½æº¢æº¯æ»“æº¶æ»‚æºæºæ»‡æ»…æº¥æº˜æº¼æººæº«æ»‘æº–æºœæ»„æ»”æºªæº§æº´ç…Žç…™ç…©ç…¤ç…‰ç…§ç…œç…¬ç…¦ç…Œç…¥ç…žç…†ç…¨ç…–çˆºç‰’çŒ·ç…çŒ¿çŒ¾ç‘¯ç‘šç‘•ç‘Ÿç‘žç‘ç¿ç‘™ç‘›ç‘œç•¶ç•¸ç˜€ç—°ç˜ç—²ç—±ç—ºç—¿ç—´ç—³ç›žç›Ÿç›ç«ç¦çžç£"],["b840","ç¹çªç¬çœç¥ç¨ç¢çŸ®ç¢Žç¢°ç¢—ç¢˜ç¢Œç¢‰ç¡¼ç¢‘ç¢“ç¡¿ç¥ºç¥¿ç¦è¬ç¦½ç¨œç¨šç¨ ç¨”ç¨Ÿç¨žçªŸçª ç­·ç¯€ç­ ç­®ç­§ç²±ç²³ç²µç¶“çµ¹ç¶‘ç¶ç¶çµ›ç½®ç½©ç½ªç½²ç¾©ç¾¨ç¾¤è–è˜è‚†è‚„è…±è…°è…¸è…¥è…®è…³è…«"],["b8a1","è…¹è…ºè…¦èˆ…è‰‡è’‚è‘·è½è±è‘µè‘¦è‘«è‘‰è‘¬è‘›è¼èµè‘¡è‘£è‘©è‘­è‘†è™žè™œè™Ÿè›¹èœ“èœˆèœ‡èœ€è›¾è›»èœ‚èœƒèœ†èœŠè¡™è£Ÿè£”è£™è£œè£˜è£è£¡è£Šè£•è£’è¦œè§£è©«è©²è©³è©¦è©©è©°èª‡è©¼è©£èª è©±èª…è©­è©¢è©®è©¬è©¹è©»è¨¾è©¨è±¢è²Šè²‰è³Šè³‡è³ˆè³„è²²è³ƒè³‚è³…è·¡è·Ÿè·¨è·¯è·³è·ºè·ªè·¤è·¦èº²è¼ƒè¼‰è»¾è¼Š"],["b940","è¾Ÿè¾²é‹éŠé“é‚é”é€¼é•éé‡ééŽéé‘é€¾éé„’é„—é…¬é…ªé…©é‡‰éˆ·é‰—éˆ¸éˆ½é‰€éˆ¾é‰›é‰‹é‰¤é‰‘éˆ´é‰‰é‰é‰…éˆ¹éˆ¿é‰šé–˜éš˜éš”éš•é›é›‹é›‰é›Šé›·é›»é›¹é›¶é–é´é¶é é ‘é “é Šé ’é Œé£¼é£´"],["b9a1","é£½é£¾é¦³é¦±é¦´é«¡é³©éº‚é¼Žé¼“é¼ åƒ§åƒ®åƒ¥åƒ–åƒ­åƒšåƒ•åƒåƒ‘åƒ±åƒŽåƒ©å…¢å‡³åŠƒåŠ‚åŒ±åŽ­å—¾å˜€å˜›å˜—å—½å˜”å˜†å˜‰å˜å˜Žå—·å˜–å˜Ÿå˜ˆå˜å—¶åœ˜åœ–å¡µå¡¾å¢ƒå¢“å¢Šå¡¹å¢…å¡½å£½å¤¥å¤¢å¤¤å¥ªå¥©å«¡å«¦å«©å«—å«–å«˜å«£å­µå¯žå¯§å¯¡å¯¥å¯¦å¯¨å¯¢å¯¤å¯Ÿå°å±¢å¶„å¶‡å¹›å¹£å¹•å¹—å¹”å»“å»–å¼Šå½†å½°å¾¹æ…‡"],["ba40","æ„¿æ…‹æ…·æ…¢æ…£æ…Ÿæ…šæ…˜æ…µæˆªæ’‡æ‘˜æ‘”æ’¤æ‘¸æ‘Ÿæ‘ºæ‘‘æ‘§æ´æ‘­æ‘»æ•²æ–¡æ——æ—–æš¢æš¨æšæ¦œæ¦¨æ¦•æ§æ¦®æ§“æ§‹æ¦›æ¦·æ¦»æ¦«æ¦´æ§æ§æ¦­æ§Œæ¦¦æ§ƒæ¦£æ­‰æ­Œæ°³æ¼³æ¼”æ»¾æ¼“æ»´æ¼©æ¼¾æ¼ æ¼¬æ¼æ¼‚æ¼¢"],["baa1","æ»¿æ»¯æ¼†æ¼±æ¼¸æ¼²æ¼£æ¼•æ¼«æ¼¯æ¾ˆæ¼ªæ»¬æ¼æ»²æ»Œæ»·ç†”ç†™ç…½ç†Šç†„ç†’çˆ¾çŠ’çŠ–ç„çç‘¤ç‘£ç‘ªç‘°ç‘­ç”„ç–‘ç˜§ç˜ç˜‹ç˜‰ç˜“ç›¡ç›£çž„ç½ç¿ç¡ç£ç¢Ÿç¢§ç¢³ç¢©ç¢£ç¦Žç¦ç¦ç¨®ç¨±çªªçª©ç«­ç«¯ç®¡ç®•ç®‹ç­µç®—ç®ç®”ç®ç®¸ç®‡ç®„ç²¹ç²½ç²¾ç¶»ç¶°ç¶œç¶½ç¶¾ç¶ ç·Šç¶´ç¶²ç¶±ç¶ºç¶¢ç¶¿ç¶µç¶¸ç¶­ç·’ç·‡ç¶¬"],["bb40","ç½°ç¿ ç¿¡ç¿Ÿèžèšè‚‡è…è†€è†è†ˆè†Šè…¿è†‚è‡§è‡ºèˆ‡èˆ”èˆžè‰‹è“‰è’¿è“†è“„è’™è’žè’²è’œè“‹è’¸è“€è““è’è’¼è“‘è“Šèœ¿èœœèœ»èœ¢èœ¥èœ´èœ˜è•èœ·èœ©è£³è¤‚è£´è£¹è£¸è£½è£¨è¤šè£¯èª¦èªŒèªžèª£èªèª¡èª“èª¤"],["bba1","èªªèª¥èª¨èª˜èª‘èªšèª§è±ªè²è²Œè³“è³‘è³’èµ«è¶™è¶•è·¼è¼”è¼’è¼•è¼“è¾£é é˜éœé£é™éžé¢éé›é„™é„˜é„žé…µé…¸é…·é…´é‰¸éŠ€éŠ…éŠ˜éŠ–é‰»éŠ“éŠœéŠ¨é‰¼éŠ‘é–¡é–¨é–©é–£é–¥é–¤éš™éšœéš›é›Œé›’éœ€é¼éž…éŸ¶é —é ˜é¢¯é¢±é¤ƒé¤…é¤Œé¤‰é§éª¯éª°é«¦é­é­‚é³´é³¶é³³éº¼é¼»é½Šå„„å„€åƒ»åƒµåƒ¹å„‚å„ˆå„‰å„…å‡œ"],["bc40","åŠ‡åŠˆåŠ‰åŠåŠŠå‹°åŽ²å˜®å˜»å˜¹å˜²å˜¿å˜´å˜©å™“å™Žå™—å™´å˜¶å˜¯å˜°å¢€å¢Ÿå¢žå¢³å¢œå¢®å¢©å¢¦å¥­å¬‰å«»å¬‹å«µå¬Œå¬ˆå¯®å¯¬å¯©å¯«å±¤å±¥å¶å¶”å¹¢å¹Ÿå¹¡å»¢å»šå»Ÿå»å»£å» å½ˆå½±å¾·å¾µæ…¶æ…§æ…®æ…æ…•æ†‚"],["bca1","æ…¼æ…°æ…«æ…¾æ†§æ†æ†«æ†Žæ†¬æ†šæ†¤æ†”æ†®æˆ®æ‘©æ‘¯æ‘¹æ’žæ’²æ’ˆæ’æ’°æ’¥æ’“æ’•æ’©æ’’æ’®æ’­æ’«æ’šæ’¬æ’™æ’¢æ’³æ•µæ•·æ•¸æš®æš«æš´æš±æ¨£æ¨Ÿæ§¨æ¨æ¨žæ¨™æ§½æ¨¡æ¨“æ¨Šæ§³æ¨‚æ¨…æ§­æ¨‘æ­æ­Žæ®¤æ¯…æ¯†æ¼¿æ½¼æ¾„æ½‘æ½¦æ½”æ¾†æ½­æ½›æ½¸æ½®æ¾Žæ½ºæ½°æ½¤æ¾—æ½˜æ»•æ½¯æ½ æ½Ÿç†Ÿç†¬ç†±ç†¨ç‰–çŠ›çŽç—ç‘©ç’‹ç’ƒ"],["bd40","ç‘¾ç’€ç•¿ç˜ ç˜©ç˜Ÿç˜¤ç˜¦ç˜¡ç˜¢çššçšºç›¤çžŽçž‡çžŒçž‘çž‹ç£‹ç£…ç¢ºç£Šç¢¾ç£•ç¢¼ç£ç¨¿ç¨¼ç©€ç¨½ç¨·ç¨»çª¯çª®ç®­ç®±ç¯„ç®´ç¯†ç¯‡ç¯ç® ç¯Œç³Šç· ç·´ç·¯ç·»ç·˜ç·¬ç·ç·¨ç·£ç·šç·žç·©ç¶žç·™ç·²ç·¹ç½µç½·ç¾¯"],["bda1","ç¿©è€¦è†›è†œè†è† è†šè†˜è”—è”½è”šè“®è”¬è”­è”“è”‘è”£è”¡è””è“¬è”¥è“¿è”†èž‚è´è¶è è¦è¸è¨è™è—èŒè“è¡›è¡è¤è¤‡è¤’è¤“è¤•è¤Šèª¼è«’è«‡è«„èª•è«‹è«¸èª²è«‰è«‚èª¿èª°è«–è«èª¶èª¹è«›è±Œè±Žè±¬è³ è³žè³¦è³¤è³¬è³­è³¢è³£è³œè³ªè³¡èµ­è¶Ÿè¶£è¸«è¸è¸è¸¢è¸è¸©è¸Ÿè¸¡è¸žèººè¼è¼›è¼Ÿè¼©è¼¦è¼ªè¼œè¼ž"],["be40","è¼¥é©é®é¨é­é·é„°é„­é„§é„±é†‡é†‰é†‹é†ƒé‹…éŠ»éŠ·é‹ªéŠ¬é‹¤é‹éŠ³éŠ¼é‹’é‹‡é‹°éŠ²é–­é–±éœ„éœ†éœ‡éœ‰é éžéž‹éžé ¡é «é œé¢³é¤Šé¤“é¤’é¤˜é§é§é§Ÿé§›é§‘é§•é§’é§™éª·é«®é«¯é¬§é­…é­„é­·é­¯é´†é´‰"],["bea1","é´ƒéº©éº¾é»Žå¢¨é½’å„’å„˜å„”å„å„•å†€å†ªå‡åŠ‘åŠ“å‹³å™™å™«å™¹å™©å™¤å™¸å™ªå™¨å™¥å™±å™¯å™¬å™¢å™¶å£å¢¾å£‡å£…å¥®å¬å¬´å­¸å¯°å°Žå½Šæ†²æ†‘æ†©æ†Šæ‡æ†¶æ†¾æ‡Šæ‡ˆæˆ°æ“…æ“æ“‹æ’»æ’¼æ“šæ“„æ“‡æ“‚æ“æ’¿æ“’æ“”æ’¾æ•´æ›†æ›‰æš¹æ›„æ›‡æš¸æ¨½æ¨¸æ¨ºæ©™æ©«æ©˜æ¨¹æ©„æ©¢æ©¡æ©‹æ©‡æ¨µæ©Ÿæ©ˆæ­™æ­·æ°…æ¿‚æ¾±æ¾¡"],["bf40","æ¿ƒæ¾¤æ¿æ¾§æ¾³æ¿€æ¾¹æ¾¶æ¾¦æ¾ æ¾´ç†¾ç‡‰ç‡ç‡’ç‡ˆç‡•ç†¹ç‡Žç‡™ç‡œç‡ƒç‡„ç¨ç’œç’£ç’˜ç’Ÿç’žç“¢ç”Œç”ç˜´ç˜¸ç˜ºç›§ç›¥çž çžžçžŸçž¥ç£¨ç£šç£¬ç£§ç¦¦ç©ç©Žç©†ç©Œç©‹çªºç¯™ç°‘ç¯‰ç¯¤ç¯›ç¯¡ç¯©ç¯¦ç³•ç³–ç¸Š"],["bfa1","ç¸‘ç¸ˆç¸›ç¸£ç¸žç¸ç¸‰ç¸ç½¹ç¾²ç¿°ç¿±ç¿®è€¨è†³è†©è†¨è‡»èˆˆè‰˜è‰™è•Šè•™è•ˆè•¨è•©è•ƒè•‰è•­è•ªè•žèžƒèžŸèžžèž¢èžè¡¡è¤ªè¤²è¤¥è¤«è¤¡è¦ªè¦¦è«¦è«ºè««è«±è¬€è«œè«§è«®è«¾è¬è¬‚è«·è«­è«³è«¶è«¼è±«è±­è²“è³´è¹„è¸±è¸´è¹‚è¸¹è¸µè¼»è¼¯è¼¸è¼³è¾¨è¾¦éµé´é¸é²é¼éºé„´é†’éŒ éŒ¶é‹¸éŒ³éŒ¯éŒ¢é‹¼éŒ«éŒ„éŒš"],["c040","éŒéŒ¦éŒ¡éŒ•éŒ®éŒ™é–»éš§éš¨éšªé›•éœŽéœ‘éœ–éœéœ“éœé›éœé¦éž˜é °é ¸é »é ·é ­é ¹é ¤é¤é¤¨é¤žé¤›é¤¡é¤šé§­é§¢é§±éª¸éª¼é«»é«­é¬¨é®‘é´•é´£é´¦é´¨é´’é´›é»˜é»”é¾é¾œå„ªå„Ÿå„¡å„²å‹µåšŽåš€åšåš…åš‡"],["c0a1","åšå£•å£“å£‘å£Žå¬°å¬ªå¬¤å­ºå°·å±¨å¶¼å¶ºå¶½å¶¸å¹«å½Œå¾½æ‡‰æ‡‚æ‡‡æ‡¦æ‡‹æˆ²æˆ´æ“Žæ“Šæ“˜æ“ æ“°æ“¦æ“¬æ“±æ“¢æ“­æ–‚æ–ƒæ›™æ›–æª€æª”æª„æª¢æªœæ«›æª£æ©¾æª—æªæª æ­œæ®®æ¯šæ°ˆæ¿˜æ¿±æ¿Ÿæ¿ æ¿›æ¿¤æ¿«æ¿¯æ¾€æ¿¬æ¿¡æ¿©æ¿•æ¿®æ¿°ç‡§ç‡Ÿç‡®ç‡¦ç‡¥ç‡­ç‡¬ç‡´ç‡ çˆµç‰†ç°ç²ç’©ç’°ç’¦ç’¨ç™†ç™‚ç™Œç›ªçž³çžªçž°çž¬"],["c140","çž§çž­çŸ¯ç£·ç£ºç£´ç£¯ç¤ç¦§ç¦ªç©—çª¿ç°‡ç°ç¯¾ç¯·ç°Œç¯ ç³ ç³œç³žç³¢ç³Ÿç³™ç³ç¸®ç¸¾ç¹†ç¸·ç¸²ç¹ƒç¸«ç¸½ç¸±ç¹…ç¹ç¸´ç¸¹ç¹ˆç¸µç¸¿ç¸¯ç½„ç¿³ç¿¼è±è²è°è¯è³è‡†è‡ƒè†ºè‡‚è‡€è†¿è†½è‡‰è†¾è‡¨èˆ‰è‰±è–ª"],["c1a1","è–„è•¾è–œè–‘è–”è–¯è–›è–‡è–¨è–Šè™§èŸ€èŸ‘èž³èŸ’èŸ†èž«èž»èžºèŸˆèŸ‹è¤»è¤¶è¥„è¤¸è¤½è¦¬è¬Žè¬—è¬™è¬›è¬Šè¬ è¬è¬„è¬è±è°¿è±³è³ºè³½è³¼è³¸è³»è¶¨è¹‰è¹‹è¹ˆè¹Šè½„è¼¾è½‚è½…è¼¿é¿é½é‚„é‚é‚‚é‚€é„¹é†£é†žé†œééŽ‚éŒ¨éµéŠé¥é‹éŒ˜é¾é¬é›é°éšé”é—Šé—‹é—Œé—ˆé—†éš±éš¸é›–éœœéœžéž éŸ“é¡†é¢¶é¤µé¨"],["c240","é§¿é®®é®«é®ªé®­é´»é´¿éº‹é»é»žé»œé»é»›é¼¾é½‹å¢åš•åš®å£™å£˜å¬¸å½æ‡£æˆ³æ“´æ“²æ“¾æ”†æ“ºæ“»æ“·æ–·æ›œæœ¦æª³æª¬æ«ƒæª»æª¸æ«‚æª®æª¯æ­Ÿæ­¸æ®¯ç€‰ç€‹æ¿¾ç€†æ¿ºç€‘ç€ç‡»ç‡¼ç‡¾ç‡¸ç·çµç’§ç’¿ç”•ç™–ç™˜"],["c2a1","ç™’çž½çž¿çž»çž¼ç¤Žç¦®ç©¡ç©¢ç© ç«„ç«…ç°«ç°§ç°ªç°žç°£ç°¡ç³§ç¹”ç¹•ç¹žç¹šç¹¡ç¹’ç¹™ç½ˆç¿¹ç¿»è·è¶è‡è‡èˆŠè—è–©è—è—è—‰è–°è–ºè–¹è–¦èŸ¯èŸ¬èŸ²èŸ è¦†è¦²è§´è¬¨è¬¹è¬¬è¬«è±è´…è¹™è¹£è¹¦è¹¤è¹Ÿè¹•è»€è½‰è½é‚‡é‚ƒé‚ˆé†«é†¬é‡éŽ”éŽŠéŽ–éŽ¢éŽ³éŽ®éŽ¬éŽ°éŽ˜éŽšéŽ—é—”é—–é—é—•é›¢é›œé›™é››é›žéœ¤éž£éž¦"],["c340","éž­éŸ¹é¡é¡é¡Œé¡Žé¡“é¢ºé¤¾é¤¿é¤½é¤®é¦¥é¨Žé«é¬ƒé¬†é­é­Žé­é¯Šé¯‰é¯½é¯ˆé¯€éµ‘éµéµ é» é¼•é¼¬å„³åš¥å£žå£Ÿå£¢å¯µé¾å»¬æ‡²æ‡·æ‡¶æ‡µæ”€æ”æ› æ›æ«¥æ«æ«šæ«“ç€›ç€Ÿç€¨ç€šç€ç€•ç€˜çˆ†çˆç‰˜çŠ¢ç¸"],["c3a1","çºç’½ç“Šç“£ç–‡ç–†ç™Ÿç™¡çŸ‡ç¤™ç¦±ç©«ç©©ç°¾ç°¿ç°¸ç°½ç°·ç±€ç¹«ç¹­ç¹¹ç¹©ç¹ªç¾…ç¹³ç¾¶ç¾¹ç¾¸è‡˜è—©è—è—ªè—•è—¤è—¥è—·èŸ»è …è èŸ¹èŸ¾è¥ è¥Ÿè¥–è¥žè­è­œè­˜è­‰è­šè­Žè­è­†è­™è´ˆè´Šè¹¼è¹²èº‡è¹¶è¹¬è¹ºè¹´è½”è½Žè¾­é‚Šé‚‹é†±é†®é¡é‘éŸéƒéˆéœéé–é¢éé˜é¤é—é¨é—œéš´é›£éœªéœ§é¡éŸœéŸ»é¡ž"],["c440","é¡˜é¡›é¢¼é¥…é¥‰é¨–é¨™é¬é¯¨é¯§é¯–é¯›é¶‰éµ¡éµ²éµªéµ¬éº’éº—éº“éº´å‹¸åš¨åš·åš¶åš´åš¼å£¤å­€å­ƒå­½å¯¶å·‰æ‡¸æ‡ºæ”˜æ””æ”™æ›¦æœ§æ«¬ç€¾ç€°ç€²çˆç»ç“ç™¢ç™¥ç¤¦ç¤ªç¤¬ç¤«ç«‡ç«¶ç±Œç±ƒç±ç³¯ç³°è¾®ç¹½ç¹¼"],["c4a1","çº‚ç½Œè€€è‡šè‰¦è—»è—¹è˜‘è—ºè˜†è˜‹è˜‡è˜Šè ”è •è¥¤è¦ºè§¸è­°è­¬è­¦è­¯è­Ÿè­«è´è´èº‰èºèº…èº‚é†´é‡‹é˜éƒé½é—¡éœ°é£„é¥’é¥‘é¦¨é¨«é¨°é¨·é¨µé°“é°é¹¹éºµé»¨é¼¯é½Ÿé½£é½¡å„·å„¸å›å›€å›‚å¤”å±¬å·æ‡¼æ‡¾æ”æ”œæ–•æ›©æ«»æ¬„æ«ºæ®²çŒçˆ›çŠ§ç“–ç“”ç™©çŸ“ç±çºçºŒç¾¼è˜—è˜­è˜šè £è ¢è ¡è Ÿè¥ªè¥¬è¦½è­´"],["c540","è­·è­½è´“èºŠèºèº‹è½Ÿè¾¯é†ºé®é³éµéºé¸é²é«é—¢éœ¸éœ¹éœ²éŸ¿é¡§é¡¥é¥—é©…é©ƒé©€é¨¾é«é­”é­‘é°­é°¥é¶¯é¶´é·‚é¶¸éºé»¯é¼™é½œé½¦é½§å„¼å„»å›ˆå›Šå›‰å­¿å·”å·’å½Žæ‡¿æ”¤æ¬Šæ­¡ç‘ç˜çŽ€ç“¤ç–Šç™®ç™¬"],["c5a1","ç¦³ç± ç±Ÿè¾è½è‡Ÿè¥²è¥¯è§¼è®€è´–è´—èº‘èº“è½¡é…ˆé‘„é‘‘é‘’éœ½éœ¾éŸƒéŸé¡«é¥•é©•é©é«’é¬šé±‰é°±é°¾é°»é·“é·—é¼´é½¬é½ªé¾”å›Œå·–æˆ€æ”£æ”«æ”ªæ›¬æ¬ç“šç«Šç±¤ç±£ç±¥çº“çº–çº”è‡¢è˜¸è˜¿è ±è®Šé‚é‚é‘£é‘ é‘¤é¨é¡¯é¥œé©šé©›é©—é«“é«”é«‘é±”é±—é±–é·¥éºŸé»´å›‘å£©æ”¬çžç™±ç™²çŸ—ç½ç¾ˆè ¶è ¹è¡¢è®“è®’"],["c640","è®–è‰·è´›é‡€é‘ªé‚éˆé„éŸ†é¡°é©Ÿé¬¢é­˜é±Ÿé·¹é·ºé¹¼é¹½é¼‡é½·é½²å»³æ¬–ç£ç±¬ç±®è »è§€èº¡é‡é‘²é‘°é¡±é¥žé«–é¬£é»Œç¤çŸšè®šé‘·éŸ‰é©¢é©¥çºœè®œèºªé‡…é‘½é‘¾é‘¼é±·é±¸é»·è±”é‘¿é¸šçˆ¨é©ªé¬±é¸›é¸žç±²"],["c940","ä¹‚ä¹œå‡µåŒšåŽ‚ä¸‡ä¸Œä¹‡äºå›—ï¨Œå±®å½³ä¸å†‡ä¸Žä¸®äº“ä»‚ä»‰ä»ˆå†˜å‹¼å¬åŽ¹åœ å¤ƒå¤¬å°å·¿æ—¡æ®³æ¯Œæ°”çˆ¿ä¸±ä¸¼ä»¨ä»œä»©ä»¡ä»ä»šåˆŒåŒœåŒåœ¢åœ£å¤—å¤¯å®å®„å°’å°»å±´å±³å¸„åº€åº‚å¿‰æˆ‰æ‰æ°•"],["c9a1","æ°¶æ±ƒæ°¿æ°»çŠ®çŠ°çŽŠç¦¸è‚Šé˜žä¼Žä¼˜ä¼¬ä»µä¼”ä»±ä¼€ä»·ä¼ˆä¼ä¼‚ä¼…ä¼¢ä¼“ä¼„ä»´ä¼’å†±åˆ“åˆ‰åˆåŠ¦åŒ¢åŒŸååŽŠå‡å›¡å›Ÿåœ®åœªåœ´å¤¼å¦€å¥¼å¦…å¥»å¥¾å¥·å¥¿å­–å°•å°¥å±¼å±ºå±»å±¾å·Ÿå¹µåº„å¼‚å¼šå½´å¿•å¿”å¿æ‰œæ‰žæ‰¤æ‰¡æ‰¦æ‰¢æ‰™æ‰ æ‰šæ‰¥æ—¯æ—®æœ¾æœ¹æœ¸æœ»æœºæœ¿æœ¼æœ³æ°˜æ±†æ±’æ±œæ±æ±Šæ±”æ±‹"],["ca40","æ±Œç±ç‰žçŠ´çŠµçŽŽç”ªç™¿ç©µç½‘è‰¸è‰¼èŠ€è‰½è‰¿è™è¥¾é‚™é‚—é‚˜é‚›é‚”é˜¢é˜¤é˜ é˜£ä½–ä¼»ä½¢ä½‰ä½“ä½¤ä¼¾ä½§ä½’ä½Ÿä½ä½˜ä¼­ä¼³ä¼¿ä½¡å†å†¹åˆœåˆžåˆ¡åŠ­åŠ®åŒ‰å£å²åŽŽåŽå°å·åªå‘”å‘…å™åœå¥å˜"],["caa1","å½å‘å‘å¨å¤å‘‡å›®å›§å›¥åå…åŒå‰å‹å’å¤†å¥€å¦¦å¦˜å¦ å¦—å¦Žå¦¢å¦å¦å¦§å¦¡å®Žå®’å°¨å°ªå²å²å²ˆå²‹å²‰å²’å²Šå²†å²“å²•å· å¸Šå¸Žåº‹åº‰åºŒåºˆåºå¼…å¼å½¸å½¶å¿’å¿‘å¿å¿­å¿¨å¿®å¿³å¿¡å¿¤å¿£å¿ºå¿¯å¿·å¿»æ€€å¿´æˆºæŠƒæŠŒæŠŽæŠæŠ”æŠ‡æ‰±æ‰»æ‰ºæ‰°æŠæŠˆæ‰·æ‰½æ‰²æ‰´æ”·æ—°æ—´æ—³æ—²æ—µæ…æ‡"],["cb40","æ™æ•æŒæˆæææšæ‹æ¯æ°™æ°šæ±¸æ±§æ±«æ²„æ²‹æ²æ±±æ±¯æ±©æ²šæ±­æ²‡æ²•æ²œæ±¦æ±³æ±¥æ±»æ²Žç´çºç‰£çŠ¿çŠ½ç‹ƒç‹†ç‹çŠºç‹…çŽ•çŽ—çŽ“çŽ”çŽ’ç”ºç”¹ç–”ç–•çšç¤½è€´è‚•è‚™è‚è‚’è‚œèŠèŠèŠ…èŠŽèŠ‘èŠ“"],["cba1","èŠŠèŠƒèŠ„è±¸è¿‰è¾¿é‚Ÿé‚¡é‚¥é‚žé‚§é‚ é˜°é˜¨é˜¯é˜­ä¸³ä¾˜ä½¼ä¾…ä½½ä¾€ä¾‡ä½¶ä½´ä¾‰ä¾„ä½·ä½Œä¾—ä½ªä¾šä½¹ä¾ä½¸ä¾ä¾œä¾”ä¾žä¾’ä¾‚ä¾•ä½«ä½®å†žå†¼å†¾åˆµåˆ²åˆ³å‰†åˆ±åŠ¼åŒŠåŒ‹åŒ¼åŽ’åŽ”å’‡å‘¿å’å’‘å’‚å’ˆå‘«å‘ºå‘¾å‘¥å‘¬å‘´å‘¦å’å‘¯å‘¡å‘ å’˜å‘£å‘§å‘¤å›·å›¹å¯å²å­å«å±å°å¶åž€åµå»å³å´å¢"],["cc40","å¨å½å¤Œå¥…å¦µå¦ºå§å§Žå¦²å§Œå§å¦¶å¦¼å§ƒå§–å¦±å¦½å§€å§ˆå¦´å§‡å­¢å­¥å®“å®•å±„å±‡å²®å²¤å² å²µå²¯å²¨å²¬å²Ÿå²£å²­å²¢å²ªå²§å²å²¥å²¶å²°å²¦å¸—å¸”å¸™å¼¨å¼¢å¼£å¼¤å½”å¾‚å½¾å½½å¿žå¿¥æ€­æ€¦æ€™æ€²æ€‹"],["cca1","æ€´æ€Šæ€—æ€³æ€šæ€žæ€¬æ€¢æ€æ€æ€®æ€“æ€‘æ€Œæ€‰æ€œæˆ”æˆ½æŠ­æŠ´æ‹‘æŠ¾æŠªæŠ¶æ‹ŠæŠ®æŠ³æŠ¯æŠ»æŠ©æŠ°æŠ¸æ”½æ–¨æ–»æ˜‰æ—¼æ˜„æ˜’æ˜ˆæ—»æ˜ƒæ˜‹æ˜æ˜…æ—½æ˜‘æ˜æ›¶æœŠæž…æ¬æžŽæž’æ¶æ»æž˜æž†æž„æ´æžæžŒæºæžŸæž‘æž™æžƒæ½æžæ¸æ¹æž”æ¬¥æ®€æ­¾æ¯žæ°æ²“æ³¬æ³«æ³®æ³™æ²¶æ³”æ²­æ³§æ²·æ³æ³‚æ²ºæ³ƒæ³†æ³­æ³²"],["cd40","æ³’æ³æ²´æ²Šæ²æ²€æ³žæ³€æ´°æ³æ³‡æ²°æ³¹æ³æ³©æ³‘ç‚”ç‚˜ç‚…ç‚“ç‚†ç‚„ç‚‘ç‚–ç‚‚ç‚šç‚ƒç‰ªç‹–ç‹‹ç‹˜ç‹‰ç‹œç‹’ç‹”ç‹šç‹Œç‹‘çŽ¤çŽ¡çŽ­çŽ¦çŽ¢çŽ çŽ¬çŽç“ç“¨ç”¿ç•€ç”¾ç–Œç–˜çš¯ç›³ç›±ç›°ç›µçŸ¸çŸ¼çŸ¹çŸ»çŸº"],["cda1","çŸ·ç¥‚ç¤¿ç§…ç©¸ç©»ç«»ç±µç³½è€µè‚è‚®è‚£è‚¸è‚µè‚­èˆ èŠ è‹€èŠ«èŠšèŠ˜èŠ›èŠµèŠ§èŠ®èŠ¼èŠžèŠºèŠ´èŠ¨èŠ¡èŠ©è‹‚èŠ¤è‹ƒèŠ¶èŠ¢è™°è™¯è™­è™®è±–è¿’è¿‹è¿“è¿è¿–è¿•è¿—é‚²é‚´é‚¯é‚³é‚°é˜¹é˜½é˜¼é˜ºé™ƒä¿ä¿…ä¿“ä¾²ä¿‰ä¿‹ä¿ä¿”ä¿œä¿™ä¾»ä¾³ä¿›ä¿‡ä¿–ä¾ºä¿€ä¾¹ä¿¬å‰„å‰‰å‹€å‹‚åŒ½å¼åŽ—åŽ–åŽ™åŽ˜å’ºå’¡å’­å’¥å“"],["ce40","å“ƒèŒå’·å’®å“–å’¶å“…å“†å’ å‘°å’¼å’¢å’¾å‘²å“žå’°åžµåžžåžŸåž¤åžŒåž—åžåž›åž”åž˜åžåž™åž¥åžšåž•å£´å¤å¥“å§¡å§žå§®å¨€å§±å§å§ºå§½å§¼å§¶å§¤å§²å§·å§›å§©å§³å§µå§ å§¾å§´å§­å®¨å±Œå³å³˜å³Œå³—å³‹å³›"],["cea1","å³žå³šå³‰å³‡å³Šå³–å³“å³”å³å³ˆå³†å³Žå³Ÿå³¸å·¹å¸¡å¸¢å¸£å¸ å¸¤åº°åº¤åº¢åº›åº£åº¥å¼‡å¼®å½–å¾†æ€·æ€¹æ”æ²æžæ…æ“æ‡æ‰æ›æŒæ€æ‚æŸæ€¤æ„æ˜æ¦æ®æ‰‚æ‰ƒæ‹æŒæŒ‹æ‹µæŒŽæŒƒæ‹«æ‹¹æŒæŒŒæ‹¸æ‹¶æŒ€æŒ“æŒ”æ‹ºæŒ•æ‹»æ‹°æ•æ•ƒæ–ªæ–¿æ˜¶æ˜¡æ˜²æ˜µæ˜œæ˜¦æ˜¢æ˜³æ˜«æ˜ºæ˜æ˜´æ˜¹æ˜®æœæœæŸæŸ²æŸˆæžº"],["cf40","æŸœæž»æŸ¸æŸ˜æŸ€æž·æŸ…æŸ«æŸ¤æŸŸæžµæŸæž³æŸ·æŸ¶æŸ®æŸ£æŸ‚æž¹æŸŽæŸ§æŸ°æž²æŸ¼æŸ†æŸ­æŸŒæž®æŸ¦æŸ›æŸºæŸ‰æŸŠæŸƒæŸªæŸ‹æ¬¨æ®‚æ®„æ®¶æ¯–æ¯˜æ¯ æ° æ°¡æ´¨æ´´æ´­æ´Ÿæ´¼æ´¿æ´’æ´Šæ³šæ´³æ´„æ´™æ´ºæ´šæ´‘æ´€æ´æµ‚"],["cfa1","æ´æ´˜æ´·æ´ƒæ´æµ€æ´‡æ´ æ´¬æ´ˆæ´¢æ´‰æ´ç‚·ç‚Ÿç‚¾ç‚±ç‚°ç‚¡ç‚´ç‚µç‚©ç‰ç‰‰ç‰Šç‰¬ç‰°ç‰³ç‰®ç‹Šç‹¤ç‹¨ç‹«ç‹Ÿç‹ªç‹¦ç‹£çŽ…çŒç‚çˆç…çŽ¹çŽ¶çŽµçŽ´ç«çŽ¿ç‡çŽ¾çƒç†çŽ¸ç‹ç“¬ç“®ç”®ç•‡ç•ˆç–§ç–ªç™¹ç›„çœˆçœƒçœ„çœ…çœŠç›·ç›»ç›ºçŸ§çŸ¨ç †ç ‘ç ’ç …ç ç ç Žç ‰ç ƒç “ç¥Šç¥Œç¥‹ç¥…ç¥„ç§•ç§ç§ç§–ç§Žçª€"],["d040","ç©¾ç«‘ç¬€ç¬ç±ºç±¸ç±¹ç±¿ç²€ç²ç´ƒç´ˆç´ç½˜ç¾‘ç¾ç¾¾è€‡è€Žè€è€”è€·èƒ˜èƒ‡èƒ èƒ‘èƒˆèƒ‚èƒèƒ…èƒ£èƒ™èƒœèƒŠèƒ•èƒ‰èƒèƒ—èƒ¦èƒè‡¿èˆ¡èŠ”è‹™è‹¾è‹¹èŒ‡è‹¨èŒ€è‹•èŒºè‹«è‹–è‹´è‹¬è‹¡è‹²è‹µèŒŒè‹»è‹¶è‹°è‹ª"],["d0a1","è‹¤è‹ è‹ºè‹³è‹­è™·è™´è™¼è™³è¡è¡Žè¡§è¡ªè¡©è§“è¨„è¨‡èµ²è¿£è¿¡è¿®è¿ éƒ±é‚½é‚¿éƒ•éƒ…é‚¾éƒ‡éƒ‹éƒˆé‡”é‡“é™”é™é™‘é™“é™Šé™Žå€žå€…å€‡å€“å€¢å€°å€›ä¿µä¿´å€³å€·å€¬ä¿¶ä¿·å€—å€œå€ å€§å€µå€¯å€±å€Žå…šå†”å†“å‡Šå‡„å‡…å‡ˆå‡Žå‰¡å‰šå‰’å‰žå‰Ÿå‰•å‰¢å‹åŒŽåŽžå”¦å“¢å”—å”’å“§å“³å“¤å”šå“¿å”„å”ˆå“«å”‘å”…å“±"],["d140","å”Šå“»å“·å“¸å“ å”Žå”ƒå”‹åœåœ‚åŸŒå ²åŸ•åŸ’åžºåŸ†åž½åž¼åž¸åž¶åž¿åŸ‡åŸåž¹åŸå¤Žå¥Šå¨™å¨–å¨­å¨®å¨•å¨å¨—å¨Šå¨žå¨³å­¬å®§å®­å®¬å°ƒå±–å±”å³¬å³¿å³®å³±å³·å´€å³¹å¸©å¸¨åº¨åº®åºªåº¬å¼³å¼°å½§ææšæ§"],["d1a1","ææ‚¢æ‚ˆæ‚€æ‚’æ‚æ‚æ‚ƒæ‚•æ‚›æ‚—æ‚‡æ‚œæ‚Žæˆ™æ‰†æ‹²æŒæ–æŒ¬æ„æ…æŒ¶æƒæ¤æŒ¹æ‹æŠæŒ¼æŒ©ææŒ´æ˜æ”æ™æŒ­æ‡æŒ³æšæ‘æŒ¸æ—æ€æˆæ•Šæ•†æ—†æ—ƒæ—„æ—‚æ™Šæ™Ÿæ™‡æ™‘æœ’æœ“æ Ÿæ šæ¡‰æ ²æ ³æ »æ¡‹æ¡æ –æ ±æ œæ µæ «æ ­æ ¯æ¡Žæ¡„æ ´æ æ ’æ ”æ ¦æ ¨æ ®æ¡æ ºæ ¥æ  æ¬¬æ¬¯æ¬­æ¬±æ¬´æ­­è‚‚æ®ˆæ¯¦æ¯¤"],["d240","æ¯¨æ¯£æ¯¢æ¯§æ°¥æµºæµ£æµ¤æµ¶æ´æµ¡æ¶’æµ˜æµ¢æµ­æµ¯æ¶‘æ¶æ·¯æµ¿æ¶†æµžæµ§æµ æ¶—æµ°æµ¼æµŸæ¶‚æ¶˜æ´¯æµ¨æ¶‹æµ¾æ¶€æ¶„æ´–æ¶ƒæµ»æµ½æµµæ¶çƒœçƒ“çƒ‘çƒçƒ‹ç¼¹çƒ¢çƒ—çƒ’çƒžçƒ çƒ”çƒçƒ…çƒ†çƒ‡çƒšçƒŽçƒ¡ç‰‚ç‰¸"],["d2a1","ç‰·ç‰¶çŒ€ç‹ºç‹´ç‹¾ç‹¶ç‹³ç‹»çŒç“ç™ç¥ç–çŽ¼ç§ç£ç©çœç’ç›ç”ççšç—ç˜ç¨ç“žç“Ÿç“´ç“µç”¡ç•›ç•Ÿç–°ç—ç–»ç—„ç—€ç–¿ç–¶ç–ºçšŠç›‰çœçœ›çœçœ“çœ’çœ£çœ‘çœ•çœ™çœšçœ¢çœ§ç £ç ¬ç ¢ç µç ¯ç ¨ç ®ç «ç ¡ç ©ç ³ç ªç ±ç¥”ç¥›ç¥ç¥œç¥“ç¥’ç¥‘ç§«ç§¬ç§ ç§®ç§­ç§ªç§œç§žç§çª†çª‰çª…çª‹çªŒçªŠçª‡ç«˜ç¬"],["d340","ç¬„ç¬“ç¬…ç¬ç¬ˆç¬Šç¬Žç¬‰ç¬’ç²„ç²‘ç²Šç²Œç²ˆç²ç²…ç´žç´ç´‘ç´Žç´˜ç´–ç´“ç´Ÿç´’ç´ç´Œç½œç½¡ç½žç½ ç½ç½›ç¾–ç¾’ç¿ƒç¿‚ç¿€è€–è€¾è€¹èƒºèƒ²èƒ¹èƒµè„èƒ»è„€èˆèˆ¯èˆ¥èŒ³èŒ­è„èŒ™è‘èŒ¥è–èŒ¿èèŒ¦èŒœèŒ¢"],["d3a1","è‚èŽèŒ›èŒªèŒˆèŒ¼èèŒ–èŒ¤èŒ èŒ·èŒ¯èŒ©è‡è…èŒè“èŒžèŒ¬è‹èŒ§èˆè™“è™’èš¢èš¨èš–èšèš‘èšžèš‡èš—èš†èš‹èššèš…èš¥èš™èš¡èš§èš•èš˜èšŽèšèšèš”è¡ƒè¡„è¡­è¡µè¡¶è¡²è¢€è¡±è¡¿è¡¯è¢ƒè¡¾è¡´è¡¼è¨’è±‡è±—è±»è²¤è²£èµ¶èµ¸è¶µè¶·è¶¶è»‘è»“è¿¾è¿µé€‚è¿¿è¿»é€„è¿¼è¿¶éƒ–éƒ éƒ™éƒšéƒ£éƒŸéƒ¥éƒ˜éƒ›éƒ—éƒœéƒ¤é…"],["d440","é…Žé…é‡•é‡¢é‡šé™œé™Ÿéš¼é££é«Ÿé¬¯ä¹¿å°åªå¡åžå å“å‹åå²åˆååå›åŠå¢å€•å…åŸå©å«å£å¤å†å€å®å³å—å‘å‡å‰«å‰­å‰¬å‰®å‹–å‹“åŒ­åŽœå•µå•¶å”¼å•å•å”´å”ªå•‘å•¢å”¶å”µå”°å•’å•…"],["d4a1","å”Œå”²å•¥å•Žå”¹å•ˆå”­å”»å•€å•‹åœŠåœ‡åŸ»å ”åŸ¢åŸ¶åŸœåŸ´å €åŸ­åŸ½å ˆåŸ¸å ‹åŸ³åŸå ‡åŸ®åŸ£åŸ²åŸ¥åŸ¬åŸ¡å ŽåŸ¼å åŸ§å å ŒåŸ±åŸ©åŸ°å å „å¥œå© å©˜å©•å©§å©žå¨¸å¨µå©­å©å©Ÿå©¥å©¬å©“å©¤å©—å©ƒå©å©’å©„å©›å©ˆåªŽå¨¾å©å¨¹å©Œå©°å©©å©‡å©‘å©–å©‚å©œå­²å­®å¯å¯€å±™å´žå´‹å´å´šå´ å´Œå´¨å´å´¦å´¥å´"],["d540","å´°å´’å´£å´Ÿå´®å¸¾å¸´åº±åº´åº¹åº²åº³å¼¶å¼¸å¾›å¾–å¾Ÿæ‚Šæ‚æ‚†æ‚¾æ‚°æ‚ºæƒ“æƒ”æƒæƒ¤æƒ™æƒæƒˆæ‚±æƒ›æ‚·æƒŠæ‚¿æƒƒæƒæƒ€æŒ²æ¥æŽŠæŽ‚æ½æŽ½æŽžæŽ­æŽæŽ—æŽ«æŽŽæ¯æŽ‡æŽæ®æŽ¯æµæŽœæ­æŽ®æ¼æŽ¤æŒ»æŽŸ"],["d5a1","æ¸æŽ…æŽæŽ‘æŽæ°æ•“æ—æ™¥æ™¡æ™›æ™™æ™œæ™¢æœ˜æ¡¹æ¢‡æ¢æ¢œæ¡­æ¡®æ¢®æ¢«æ¥–æ¡¯æ¢£æ¢¬æ¢©æ¡µæ¡´æ¢²æ¢æ¡·æ¢’æ¡¼æ¡«æ¡²æ¢ªæ¢€æ¡±æ¡¾æ¢›æ¢–æ¢‹æ¢ æ¢‰æ¢¤æ¡¸æ¡»æ¢‘æ¢Œæ¢Šæ¡½æ¬¶æ¬³æ¬·æ¬¸æ®‘æ®æ®æ®Žæ®Œæ°ªæ·€æ¶«æ¶´æ¶³æ¹´æ¶¬æ·©æ·¢æ¶·æ·¶æ·”æ¸€æ·ˆæ· æ·Ÿæ·–æ¶¾æ·¥æ·œæ·æ·›æ·´æ·Šæ¶½æ·­æ·°æ¶ºæ·•æ·‚æ·æ·‰"],["d640","æ·æ·²æ·“æ·½æ·—æ·æ·£æ¶»çƒºç„çƒ·ç„—çƒ´ç„Œçƒ°ç„„çƒ³ç„çƒ¼çƒ¿ç„†ç„“ç„€çƒ¸çƒ¶ç„‹ç„‚ç„Žç‰¾ç‰»ç‰¼ç‰¿çŒçŒ—çŒ‡çŒ‘çŒ˜çŒŠçŒˆç‹¿çŒçŒžçŽˆç¶ç¸çµç„çç½ç‡ç€çºç¼ç¿çŒç‹ç´çˆç•¤ç•£ç—Žç—’ç—"],["d6a1","ç—‹ç—Œç—‘ç—çšçš‰ç›“çœ¹çœ¯çœ­çœ±çœ²çœ´çœ³çœ½çœ¥çœ»çœµç¡ˆç¡’ç¡‰ç¡ç¡Šç¡Œç ¦ç¡…ç¡ç¥¤ç¥§ç¥©ç¥ªç¥£ç¥«ç¥¡ç¦»ç§ºç§¸ç§¶ç§·çªçª”çªç¬µç­‡ç¬´ç¬¥ç¬°ç¬¢ç¬¤ç¬³ç¬˜ç¬ªç¬ç¬±ç¬«ç¬­ç¬¯ç¬²ç¬¸ç¬šç¬£ç²”ç²˜ç²–ç²£ç´µç´½ç´¸ç´¶ç´ºçµ…ç´¬ç´©çµçµ‡ç´¾ç´¿çµŠç´»ç´¨ç½£ç¾•ç¾œç¾ç¾›ç¿Šç¿‹ç¿ç¿ç¿‘ç¿‡ç¿ç¿‰è€Ÿ"],["d740","è€žè€›è‡èƒèˆè„˜è„¥è„™è„›è„­è„Ÿè„¬è„žè„¡è„•è„§è„è„¢èˆ‘èˆ¸èˆ³èˆºèˆ´èˆ²è‰´èŽèŽ£èŽ¨èŽèºè³èŽ¤è´èŽèŽèŽ•èŽ™èµèŽ”èŽ©è½èŽƒèŽŒèŽèŽ›èŽªèŽ‹è¾èŽ¥èŽ¯èŽˆèŽ—èŽ°è¿èŽ¦èŽ‡èŽ®è¶èŽšè™™è™–èš¿èš·"],["d7a1","è›‚è›è›…èšºèš°è›ˆèš¹èš³èš¸è›Œèš´èš»èš¼è›ƒèš½èš¾è¡’è¢‰è¢•è¢¨è¢¢è¢ªè¢šè¢‘è¢¡è¢Ÿè¢˜è¢§è¢™è¢›è¢—è¢¤è¢¬è¢Œè¢“è¢Žè¦‚è§–è§™è§•è¨°è¨§è¨¬è¨žè°¹è°»è±œè±è±½è²¥èµ½èµ»èµ¹è¶¼è·‚è¶¹è¶¿è·è»˜è»žè»è»œè»—è» è»¡é€¤é€‹é€‘é€œé€Œé€¡éƒ¯éƒªéƒ°éƒ´éƒ²éƒ³éƒ”éƒ«éƒ¬éƒ©é…–é…˜é…šé…“é…•é‡¬é‡´é‡±é‡³é‡¸é‡¤é‡¹é‡ª"],["d840","é‡«é‡·é‡¨é‡®é•ºé–†é–ˆé™¼é™­é™«é™±é™¯éš¿éªé „é£¥é¦—å‚›å‚•å‚”å‚žå‚‹å‚£å‚ƒå‚Œå‚Žå‚å¨å‚œå‚’å‚‚å‚‡å…Ÿå‡”åŒ’åŒ‘åŽ¤åŽ§å–‘å–¨å–¥å–­å•·å™…å–¢å–“å–ˆå–å–µå–å–£å–’å–¤å•½å–Œå–¦å•¿å–•å–¡å–ŽåœŒå ©å ·"],["d8a1","å ™å žå §å £å ¨åŸµå¡ˆå ¥å œå ›å ³å ¿å ¶å ®å ¹å ¸å ­å ¬å »å¥¡åª¯åª”åªŸå©ºåª¢åªžå©¸åª¦å©¼åª¥åª¬åª•åª®å¨·åª„åªŠåª—åªƒåª‹åª©å©»å©½åªŒåªœåªåª“åªå¯ªå¯å¯‹å¯”å¯‘å¯Šå¯Žå°Œå°°å´·åµƒåµ«åµåµ‹å´¿å´µåµ‘åµŽåµ•å´³å´ºåµ’å´½å´±åµ™åµ‚å´¹åµ‰å´¸å´¼å´²å´¶åµ€åµ…å¹„å¹å½˜å¾¦å¾¥å¾«æƒ‰æ‚¹æƒŒæƒ¢æƒŽæƒ„æ„”"],["d940","æƒ²æ„Šæ„–æ„…æƒµæ„“æƒ¸æƒ¼æƒ¾æƒæ„ƒæ„˜æ„æ„æƒ¿æ„„æ„‹æ‰ŠæŽ”æŽ±æŽ°æŽæ¥æ¨æ¯æƒæ’æ³æŠæ æ¶æ•æ²æµæ‘¡æŸæŽ¾ææœæ„æ˜æ“æ‚æ‡æŒæ‹æˆæ°æ—æ™æ”²æ•§æ•ªæ•¤æ•œæ•¨æ•¥æ–Œæ–æ–žæ–®æ—æ—’"],["d9a1","æ™¼æ™¬æ™»æš€æ™±æ™¹æ™ªæ™²æœæ¤Œæ£“æ¤„æ£œæ¤ªæ£¬æ£ªæ£±æ¤æ£–æ£·æ£«æ£¤æ£¶æ¤“æ¤æ£³æ£¡æ¤‡æ£Œæ¤ˆæ¥°æ¢´æ¤‘æ£¯æ£†æ¤”æ£¸æ£æ£½æ£¼æ£¨æ¤‹æ¤Šæ¤—æ£Žæ£ˆæ£æ£žæ£¦æ£´æ£‘æ¤†æ£”æ£©æ¤•æ¤¥æ£‡æ¬¹æ¬»æ¬¿æ¬¼æ®”æ®—æ®™æ®•æ®½æ¯°æ¯²æ¯³æ°°æ·¼æ¹†æ¹‡æ¸Ÿæ¹‰æºˆæ¸¼æ¸½æ¹…æ¹¢æ¸«æ¸¿æ¹æ¹æ¹³æ¸œæ¸³æ¹‹æ¹€æ¹‘æ¸»æ¸ƒæ¸®æ¹ž"],["da40","æ¹¨æ¹œæ¹¡æ¸±æ¸¨æ¹ æ¹±æ¹«æ¸¹æ¸¢æ¸°æ¹“æ¹¥æ¸§æ¹¸æ¹¤æ¹·æ¹•æ¹¹æ¹’æ¹¦æ¸µæ¸¶æ¹šç„ ç„žç„¯çƒ»ç„®ç„±ç„£ç„¥ç„¢ç„²ç„Ÿç„¨ç„ºç„›ç‰‹ç‰šçŠˆçŠ‰çŠ†çŠ…çŠ‹çŒ’çŒ‹çŒ°çŒ¢çŒ±çŒ³çŒ§çŒ²çŒ­çŒ¦çŒ£çŒµçŒŒç®ç¬ç°ç«ç–"],["daa1","çšç¡ç­ç±ç¤ç£çç©ç ç²ç“»ç”¯ç•¯ç•¬ç—§ç—šç—¡ç—¦ç—ç—Ÿç—¤ç——çš•çš’ç›šç†ç‡ç„çç…çŠçŽç‹çŒçŸžçŸ¬ç¡ ç¡¤ç¡¥ç¡œç¡­ç¡±ç¡ªç¡®ç¡°ç¡©ç¡¨ç¡žç¡¢ç¥´ç¥³ç¥²ç¥°ç¨‚ç¨Šç¨ƒç¨Œç¨„çª™ç«¦ç«¤ç­Šç¬»ç­„ç­ˆç­Œç­Žç­€ç­˜ç­…ç²¢ç²žç²¨ç²¡çµ˜çµ¯çµ£çµ“çµ–çµ§çµªçµçµ­çµœçµ«çµ’çµ”çµ©çµ‘çµŸçµŽç¼¾ç¼¿ç½¥"],["db40","ç½¦ç¾¢ç¾ ç¾¡ç¿—è‘èèèƒ¾èƒ”è…ƒè…Šè…’è…è…‡è„½è…è„ºè‡¦è‡®è‡·è‡¸è‡¹èˆ„èˆ¼èˆ½èˆ¿è‰µèŒ»èè¹è£è€è¨è’è§è¤è¼è¶èè†èˆè«è£èŽ¿èèè¥è˜è¿è¡è‹èŽè–èµè‰è‰èèžè‘è†è‚è³"],["dba1","è•èºè‡è‘èªè“èƒè¬è®è„è»è—è¢è›è›è¾è›˜è›¢è›¦è›“è›£è›šè›ªè›è›«è›œè›¬è›©è›—è›¨è›‘è¡ˆè¡–è¡•è¢ºè£—è¢¹è¢¸è£€è¢¾è¢¶è¢¼è¢·è¢½è¢²è¤è£‰è¦•è¦˜è¦—è§è§šè§›è©Žè©è¨¹è©™è©€è©—è©˜è©„è©…è©’è©ˆè©‘è©Šè©Œè©è±Ÿè²è²€è²ºè²¾è²°è²¹è²µè¶„è¶€è¶‰è·˜è·“è·è·‡è·–è·œè·è·•è·™è·ˆè·—è·…è»¯è»·è»º"],["dc40","è»¹è»¦è»®è»¥è»µè»§è»¨è»¶è»«è»±è»¬è»´è»©é€­é€´é€¯é„†é„¬é„„éƒ¿éƒ¼é„ˆéƒ¹éƒ»é„é„€é„‡é„…é„ƒé…¡é…¤é…Ÿé…¢é… éˆéˆŠéˆ¥éˆƒéˆšéˆ¦éˆéˆŒéˆ€éˆ’é‡¿é‡½éˆ†éˆ„éˆ§éˆ‚éˆœéˆ¤éˆ™éˆ—éˆ…éˆ–é•»é–é–Œé–éš‡é™¾éšˆ"],["dca1","éš‰éšƒéš€é›‚é›ˆé›ƒé›±é›°é¬é°é®é ‡é¢©é£«é³¦é»¹äºƒäº„äº¶å‚½å‚¿åƒ†å‚®åƒ„åƒŠå‚´åƒˆåƒ‚å‚°åƒå‚ºå‚±åƒ‹åƒ‰å‚¶å‚¸å‡—å‰ºå‰¸å‰»å‰¼å—ƒå—›å—Œå—å—‹å—Šå—å—€å—”å—„å—©å–¿å—’å–å—å—•å—¢å—–å—ˆå—²å—å—™å—‚åœ”å¡“å¡¨å¡¤å¡å¡å¡‰å¡¯å¡•å¡Žå¡å¡™å¡¥å¡›å ½å¡£å¡±å£¼å«‡å«„å«‹åªºåª¸åª±åªµåª°åª¿å«ˆåª»å«†"],["dd40","åª·å«€å«Šåª´åª¶å«åª¹åªå¯–å¯˜å¯™å°Ÿå°³åµ±åµ£åµŠåµ¥åµ²åµ¬åµžåµ¨åµ§åµ¢å·°å¹å¹Žå¹Šå¹å¹‹å»…å»Œå»†å»‹å»‡å½€å¾¯å¾­æƒ·æ…‰æ…Šæ„«æ……æ„¶æ„²æ„®æ…†æ„¯æ…æ„©æ…€æˆ é…¨æˆ£æˆ¥æˆ¤æ…æ±æ«ææ’æ‰æ æ¤"],["dda1","æ³æ‘ƒæŸæ•æ˜æ¹æ·æ¢æ£æŒæ¦æ°æ¨æ‘æµæ¯æŠæšæ‘€æ¥æ§æ‹æ§æ›æ®æ¡æŽæ•¯æ–’æ—“æš†æšŒæš•æšæš‹æšŠæš™æš”æ™¸æœ æ¥¦æ¥Ÿæ¤¸æ¥Žæ¥¢æ¥±æ¤¿æ¥…æ¥ªæ¤¹æ¥‚æ¥—æ¥™æ¥ºæ¥ˆæ¥‰æ¤µæ¥¬æ¤³æ¤½æ¥¥æ£°æ¥¸æ¤´æ¥©æ¥€æ¥¯æ¥„æ¥¶æ¥˜æ¥æ¥´æ¥Œæ¤»æ¥‹æ¤·æ¥œæ¥æ¥‘æ¤²æ¥’æ¤¯æ¥»æ¤¼æ­†æ­…æ­ƒæ­‚æ­ˆæ­æ®›ï¨æ¯»æ¯¼"],["de40","æ¯¹æ¯·æ¯¸æº›æ»–æ»ˆæºæ»€æºŸæº“æº”æº æº±æº¹æ»†æ»’æº½æ»æºžæ»‰æº·æº°æ»æº¦æ»æº²æº¾æ»ƒæ»œæ»˜æº™æº’æºŽæºæº¤æº¡æº¿æº³æ»æ»Šæº—æº®æº£ç…‡ç…”ç…’ç…£ç… ç…ç…ç…¢ç…²ç…¸ç…ªç…¡ç…‚ç…˜ç…ƒç…‹ç…°ç…Ÿç…ç…“"],["dea1","ç…„ç…ç…šç‰çŠçŠŒçŠ‘çŠçŠŽçŒ¼ç‚çŒ»çŒºç€çŠç‰ç‘„ç‘Šç‘‹ç‘’ç‘‘ç‘—ç‘€ç‘ç‘ç‘Žç‘‚ç‘†ç‘ç‘”ç“¡ç“¿ç“¾ç“½ç”ç•¹ç•·æ¦ƒç—¯ç˜ç˜ƒç—·ç—¾ç—¼ç—¹ç—¸ç˜ç—»ç—¶ç—­ç—µç—½çš™çšµç›ç•çŸç ç’ç–çšç©ç§ç”ç™ç­çŸ ç¢‡ç¢šç¢”ç¢ç¢„ç¢•ç¢…ç¢†ç¢¡ç¢ƒç¡¹ç¢™ç¢€ç¢–ç¡»ç¥¼ç¦‚ç¥½ç¥¹ç¨‘ç¨˜ç¨™ç¨’ç¨—ç¨•ç¨¢ç¨“"],["df40","ç¨›ç¨çª£çª¢çªžç««ç­¦ç­¤ç­­ç­´ç­©ç­²ç­¥ç­³ç­±ç­°ç­¡ç­¸ç­¶ç­£ç²²ç²´ç²¯ç¶ˆç¶†ç¶€ç¶çµ¿ç¶…çµºç¶Žçµ»ç¶ƒçµ¼ç¶Œç¶”ç¶„çµ½ç¶’ç½­ç½«ç½§ç½¨ç½¬ç¾¦ç¾¥ç¾§ç¿›ç¿œè€¡è…¤è… è…·è…œè…©è…›è…¢è…²æœ¡è…žè…¶è…§è…¯"],["dfa1","è…„è…¡èˆè‰‰è‰„è‰€è‰‚è‰…è“±è¿è‘–è‘¶è‘¹è’è’è‘¥è‘‘è‘€è’†è‘§è°è‘è‘½è‘šè‘™è‘´è‘³è‘è”‡è‘žè·èºè´è‘ºè‘ƒè‘¸è²è‘…è©è™è‘‹è¯è‘‚è­è‘Ÿè‘°è¹è‘Žè‘Œè‘’è‘¯è“…è’Žè»è‘‡è¶è³è‘¨è‘¾è‘„è«è‘ è‘”è‘®è‘èœ‹èœ„è›·èœŒè›ºè›–è›µèè›¸èœŽèœ‰èœè›¶èœèœ…è£–è£‹è£è£Žè£žè£›è£šè£Œè£è¦…è¦›è§Ÿè§¥è§¤"],["e040","è§¡è§ è§¢è§œè§¦è©¶èª†è©¿è©¡è¨¿è©·èª‚èª„è©µèªƒèªè©´è©ºè°¼è±‹è±Šè±¥è±¤è±¦è²†è²„è²…è³Œèµ¨èµ©è¶‘è¶Œè¶Žè¶è¶è¶“è¶”è¶è¶’è·°è· è·¬è·±è·®è·è·©è·£è·¢è·§è·²è·«è·´è¼†è»¿è¼è¼€è¼…è¼‡è¼ˆè¼‚è¼‹é’é€¿"],["e0a1","é„é‰é€½é„é„é„é„‘é„–é„”é„‹é„Žé…®é…¯é‰ˆé‰’éˆ°éˆºé‰¦éˆ³é‰¥é‰žéŠƒéˆ®é‰Šé‰†é‰­é‰¬é‰é‰ é‰§é‰¯éˆ¶é‰¡é‰°éˆ±é‰”é‰£é‰é‰²é‰Žé‰“é‰Œé‰–éˆ²é–Ÿé–œé–žé–›éš’éš“éš‘éš—é›Žé›ºé›½é›¸é›µé³é·é¸é²é é é Žé¢¬é£¶é£¹é¦¯é¦²é¦°é¦µéª­éª«é­›é³ªé³­é³§éº€é»½åƒ¦åƒ”åƒ—åƒ¨åƒ³åƒ›åƒªåƒåƒ¤åƒ“åƒ¬åƒ°åƒ¯åƒ£åƒ "],["e140","å‡˜åŠ€åŠå‹©å‹«åŒ°åŽ¬å˜§å˜•å˜Œå˜’å—¼å˜å˜œå˜å˜“å˜‚å—ºå˜å˜„å—¿å—¹å¢‰å¡¼å¢å¢˜å¢†å¢å¡¿å¡´å¢‹å¡ºå¢‡å¢‘å¢Žå¡¶å¢‚å¢ˆå¡»å¢”å¢å£¾å¥«å«œå«®å«¥å«•å«ªå«šå«­å««å«³å«¢å« å«›å«¬å«žå«å«™å«¨å«Ÿå­·å¯ "],["e1a1","å¯£å±£å¶‚å¶€åµ½å¶†åµºå¶åµ·å¶Šå¶‰å¶ˆåµ¾åµ¼å¶åµ¹åµ¿å¹˜å¹™å¹“å»˜å»‘å»—å»Žå»œå»•å»™å»’å»”å½„å½ƒå½¯å¾¶æ„¬æ„¨æ…æ…žæ…±æ…³æ…’æ…“æ…²æ…¬æ†€æ…´æ…”æ…ºæ…›æ…¥æ„»æ…ªæ…¡æ…–æˆ©æˆ§æˆ«æ«æ‘æ‘›æ‘æ‘´æ‘¶æ‘²æ‘³æ‘½æ‘µæ‘¦æ’¦æ‘Žæ’‚æ‘žæ‘œæ‘‹æ‘“æ‘ æ‘æ‘¿æ¿æ‘¬æ‘«æ‘™æ‘¥æ‘·æ•³æ– æš¡æš æšŸæœ…æœ„æœ¢æ¦±æ¦¶æ§‰"],["e240","æ¦ æ§Žæ¦–æ¦°æ¦¬æ¦¼æ¦‘æ¦™æ¦Žæ¦§æ¦æ¦©æ¦¾æ¦¯æ¦¿æ§„æ¦½æ¦¤æ§”æ¦¹æ§Šæ¦šæ§æ¦³æ¦“æ¦ªæ¦¡æ¦žæ§™æ¦—æ¦æ§‚æ¦µæ¦¥æ§†æ­Šæ­æ­‹æ®žæ®Ÿæ® æ¯ƒæ¯„æ¯¾æ»Žæ»µæ»±æ¼ƒæ¼¥æ»¸æ¼·æ»»æ¼®æ¼‰æ½Žæ¼™æ¼šæ¼§æ¼˜æ¼»æ¼’æ»­æ¼Š"],["e2a1","æ¼¶æ½³æ»¹æ»®æ¼­æ½€æ¼°æ¼¼æ¼µæ»«æ¼‡æ¼Žæ½ƒæ¼…æ»½æ»¶æ¼¹æ¼œæ»¼æ¼ºæ¼Ÿæ¼æ¼žæ¼ˆæ¼¡ç†‡ç†ç†‰ç†€ç†…ç†‚ç†ç…»ç††ç†ç†—ç‰„ç‰“çŠ—çŠ•çŠ“çƒçç‘çŒç‘¢ç‘³ç‘±ç‘µç‘²ç‘§ç‘®ç”€ç”‚ç”ƒç•½ç–ç˜–ç˜ˆç˜Œç˜•ç˜‘ç˜Šç˜”çš¸çžç¼çž…çž‚ç®çž€ç¯ç¾çžƒç¢²ç¢ªç¢´ç¢­ç¢¨ç¡¾ç¢«ç¢žç¢¥ç¢ ç¢¬ç¢¢ç¢¤ç¦˜ç¦Šç¦‹ç¦–ç¦•ç¦”ç¦“"],["e340","ç¦—ç¦ˆç¦’ç¦ç¨«ç©Šç¨°ç¨¯ç¨¨ç¨¦çª¨çª«çª¬ç«®ç®ˆç®œç®Šç®‘ç®ç®–ç®ç®Œç®›ç®Žç®…ç®˜åŠ„ç®™ç®¤ç®‚ç²»ç²¿ç²¼ç²ºç¶§ç¶·ç·‚ç¶£ç¶ªç·ç·€ç·…ç¶ç·Žç·„ç·†ç·‹ç·Œç¶¯ç¶¹ç¶–ç¶¼ç¶Ÿç¶¦ç¶®ç¶©ç¶¡ç·‰ç½³ç¿¢ç¿£ç¿¥ç¿ž"],["e3a1","è€¤èèœè†‰è††è†ƒè†‡è†è†Œè†‹èˆ•è’—è’¤è’¡è’Ÿè’ºè“Žè“‚è’¬è’®è’«è’¹è’´è“è“è’ªè’šè’±è“è’è’§è’»è’¢è’”è“‡è“Œè’›è’©è’¯è’¨è“–è’˜è’¶è“è’ è“—è“”è“’è“›è’°è’‘è™¡èœ³èœ£èœ¨è«è€èœ®èœžèœ¡èœ™èœ›èƒèœ¬èèœ¾è†èœ èœ²èœªèœ­èœ¼èœ’èœºèœ±èœµè‚èœ¦èœ§èœ¸èœ¤èœšèœ°èœ‘è£·è£§è£±è£²è£ºè£¾è£®è£¼è£¶è£»"],["e440","è£°è£¬è£«è¦è¦¡è¦Ÿè¦žè§©è§«è§¨èª«èª™èª‹èª’èªèª–è°½è±¨è±©è³•è³è³—è¶–è¸‰è¸‚è·¿è¸è·½è¸Šè¸ƒè¸‡è¸†è¸…è·¾è¸€è¸„è¼è¼‘è¼Žè¼é„£é„œé„ é„¢é„Ÿé„é„šé„¤é„¡é„›é…ºé…²é…¹é…³éŠ¥éŠ¤é‰¶éŠ›é‰ºéŠ éŠ”éŠªéŠ"],["e4a1","éŠ¦éŠšéŠ«é‰¹éŠ—é‰¿éŠ£é‹®éŠŽéŠ‚éŠ•éŠ¢é‰½éŠˆéŠ¡éŠŠéŠ†éŠŒéŠ™éŠ§é‰¾éŠ‡éŠ©éŠéŠ‹éˆ­éšžéš¡é›¿é˜é½éºé¾éžƒéž€éž‚é»éž„éžé¿éŸŽéŸé –é¢­é¢®é¤‚é¤€é¤‡é¦é¦œé§ƒé¦¹é¦»é¦ºé§‚é¦½é§‡éª±é«£é«§é¬¾é¬¿é­ é­¡é­Ÿé³±é³²é³µéº§åƒ¿å„ƒå„°åƒ¸å„†å„‡åƒ¶åƒ¾å„‹å„Œåƒ½å„ŠåŠ‹åŠŒå‹±å‹¯å™ˆå™‚å™Œå˜µå™å™Šå™‰å™†å™˜"],["e540","å™šå™€å˜³å˜½å˜¬å˜¾å˜¸å˜ªå˜ºåœšå¢«å¢å¢±å¢ å¢£å¢¯å¢¬å¢¥å¢¡å£¿å«¿å«´å«½å«·å«¶å¬ƒå«¸å¬‚å«¹å¬å¬‡å¬…å¬å±§å¶™å¶—å¶Ÿå¶’å¶¢å¶“å¶•å¶ å¶œå¶¡å¶šå¶žå¹©å¹å¹ å¹œç·³å»›å»žå»¡å½‰å¾²æ†‹æ†ƒæ…¹æ†±æ†°æ†¢æ†‰"],["e5a1","æ†›æ†“æ†¯æ†­æ†Ÿæ†’æ†ªæ†¡æ†æ…¦æ†³æˆ­æ‘®æ‘°æ’–æ’ æ’…æ’—æ’œæ’æ’‹æ’Šæ’Œæ’£æ’Ÿæ‘¨æ’±æ’˜æ•¶æ•ºæ•¹æ•»æ–²æ–³æšµæš°æš©æš²æš·æšªæš¯æ¨€æ¨†æ¨—æ§¥æ§¸æ¨•æ§±æ§¤æ¨ æ§¿æ§¬æ§¢æ¨›æ¨æ§¾æ¨§æ§²æ§®æ¨”æ§·æ§§æ©€æ¨ˆæ§¦æ§»æ¨æ§¼æ§«æ¨‰æ¨„æ¨˜æ¨¥æ¨æ§¶æ¨¦æ¨‡æ§´æ¨–æ­‘æ®¥æ®£æ®¢æ®¦æ°æ°€æ¯¿æ°‚æ½æ¼¦æ½¾æ¾‡æ¿†æ¾’"],["e640","æ¾æ¾‰æ¾Œæ½¢æ½æ¾…æ½šæ¾–æ½¶æ½¬æ¾‚æ½•æ½²æ½’æ½æ½—æ¾”æ¾“æ½æ¼€æ½¡æ½«æ½½æ½§æ¾æ½“æ¾‹æ½©æ½¿æ¾•æ½£æ½·æ½ªæ½»ç†²ç†¯ç†›ç†°ç† ç†šç†©ç†µç†ç†¥ç†žç†¤ç†¡ç†ªç†œç†§ç†³çŠ˜çŠšç˜ç’çžçŸç çç›ç¡çšç™"],["e6a1","ç¢ç’‡ç’‰ç’Šç’†ç’ç‘½ç’…ç’ˆç‘¼ç‘¹ç”ˆç”‡ç•¾ç˜¥ç˜žç˜™ç˜ç˜œç˜£ç˜šç˜¨ç˜›çšœçšçšžçš›çžçžçž‰çžˆç£ç¢»ç£ç£Œç£‘ç£Žç£”ç£ˆç£ƒç£„ç£‰ç¦šç¦¡ç¦ ç¦œç¦¢ç¦›æ­¶ç¨¹çª²çª´çª³ç®·ç¯‹ç®¾ç®¬ç¯Žç®¯ç®¹ç¯Šç®µç³…ç³ˆç³Œç³‹ç··ç·›ç·ªç·§ç·—ç·¡ç¸ƒç·ºç·¦ç·¶ç·±ç·°ç·®ç·Ÿç½¶ç¾¬ç¾°ç¾­ç¿­ç¿«ç¿ªç¿¬ç¿¦ç¿¨è¤è§è†£è†Ÿ"],["e740","è†žè†•è†¢è†™è†—èˆ–è‰è‰“è‰’è‰è‰Žè‰‘è”¤è”»è”è”€è”©è”Žè”‰è”è”Ÿè”Šè”§è”œè“»è”«è“ºè”ˆè”Œè“´è”ªè“²è”•è“·è“«è“³è“¼è”’è“ªè“©è”–è“¾è”¨è”è”®è”‚è“½è”žè“¶è”±è”¦è“§è“¨è“°è“¯è“¹è”˜è” è”°è”‹è”™è”¯è™¢"],["e7a1","è–è£è¤è·èŸ¡è³è˜è”è›è’è¡èšè‘èžè­èªèèŽèŸèè¯è¬èºè®èœè¥èè»èµè¢è§è©è¡šè¤…è¤Œè¤”è¤‹è¤—è¤˜è¤™è¤†è¤–è¤‘è¤Žè¤‰è¦¢è¦¤è¦£è§­è§°è§¬è«è«†èª¸è«“è«‘è«”è«•èª»è«—èª¾è«€è«…è«˜è«ƒèªºèª½è«™è°¾è±è²è³¥è³Ÿè³™è³¨è³šè³è³§è¶ è¶œè¶¡è¶›è¸ è¸£è¸¥è¸¤è¸®è¸•è¸›è¸–è¸‘è¸™è¸¦è¸§"],["e840","è¸”è¸’è¸˜è¸“è¸œè¸—è¸šè¼¬è¼¤è¼˜è¼šè¼ è¼£è¼–è¼—é³é°é¯é§é«é„¯é„«é„©é„ªé„²é„¦é„®é†…é††é†Šé†é†‚é†„é†€é‹é‹ƒé‹„é‹€é‹™éŠ¶é‹é‹±é‹Ÿé‹˜é‹©é‹—é‹é‹Œé‹¯é‹‚é‹¨é‹Šé‹ˆé‹Žé‹¦é‹é‹•é‹‰é‹ é‹žé‹§é‹‘é‹“"],["e8a1","éŠµé‹¡é‹†éŠ´é•¼é–¬é–«é–®é–°éš¤éš¢é›“éœ…éœˆéœ‚éšéžŠéžŽéžˆéŸéŸé žé é ¦é ©é ¨é  é ›é §é¢²é¤ˆé£ºé¤‘é¤”é¤–é¤—é¤•é§œé§é§é§“é§”é§Žé§‰é§–é§˜é§‹é§—é§Œéª³é«¬é««é«³é«²é«±é­†é­ƒé­§é­´é­±é­¦é­¶é­µé­°é­¨é­¤é­¬é³¼é³ºé³½é³¿é³·é´‡é´€é³¹é³»é´ˆé´…é´„éºƒé»“é¼é¼å„œå„“å„—å„šå„‘å‡žåŒ´å¡å™°å™ å™®"],["e940","å™³å™¦å™£å™­å™²å™žå™·åœœåœ›å£ˆå¢½å£‰å¢¿å¢ºå£‚å¢¼å£†å¬—å¬™å¬›å¬¡å¬”å¬“å¬å¬–å¬¨å¬šå¬ å¬žå¯¯å¶¬å¶±å¶©å¶§å¶µå¶°å¶®å¶ªå¶¨å¶²å¶­å¶¯å¶´å¹§å¹¨å¹¦å¹¯å»©å»§å»¦å»¨å»¥å½‹å¾¼æ†æ†¨æ†–æ‡…æ†´æ‡†æ‡æ‡Œæ†º"],["e9a1","æ†¿æ†¸æ†Œæ“—æ“–æ“æ“æ“‰æ’½æ’‰æ“ƒæ“›æ“³æ“™æ”³æ•¿æ•¼æ–¢æ›ˆæš¾æ›€æ›Šæ›‹æ›æš½æš»æšºæ›Œæœ£æ¨´æ©¦æ©‰æ©§æ¨²æ©¨æ¨¾æ©æ©­æ©¶æ©›æ©‘æ¨¨æ©šæ¨»æ¨¿æ©æ©ªæ©¤æ©æ©æ©”æ©¯æ©©æ© æ¨¼æ©žæ©–æ©•æ©æ©Žæ©†æ­•æ­”æ­–æ®§æ®ªæ®«æ¯ˆæ¯‡æ°„æ°ƒæ°†æ¾­æ¿‹æ¾£æ¿‡æ¾¼æ¿Žæ¿ˆæ½žæ¿„æ¾½æ¾žæ¿Šæ¾¨ç€„æ¾¥æ¾®æ¾ºæ¾¬æ¾ªæ¿æ¾¿æ¾¸"],["ea40","æ¾¢æ¿‰æ¾«æ¿æ¾¯æ¾²æ¾°ç‡…ç‡‚ç†¿ç†¸ç‡–ç‡€ç‡ç‡‹ç‡”ç‡Šç‡‡ç‡ç†½ç‡˜ç†¼ç‡†ç‡šç‡›çŠçŠžç©ç¦ç§ç¬ç¥ç«çªç‘¿ç’šç’ ç’”ç’’ç’•ç’¡ç”‹ç–€ç˜¯ç˜­ç˜±ç˜½ç˜³ç˜¼ç˜µç˜²ç˜°çš»ç›¦çžšçžçž¡çžœçž›çž¢çž£çž•çž™"],["eaa1","çž—ç£ç£©ç£¥ç£ªç£žç££ç£›ç£¡ç£¢ç£­ç£Ÿç£ ç¦¤ç©„ç©ˆç©‡çª¶çª¸çªµçª±çª·ç¯žç¯£ç¯§ç¯ç¯•ç¯¥ç¯šç¯¨ç¯¹ç¯”ç¯ªç¯¢ç¯œç¯«ç¯˜ç¯Ÿç³’ç³”ç³—ç³ç³‘ç¸’ç¸¡ç¸—ç¸Œç¸Ÿç¸ ç¸“ç¸Žç¸œç¸•ç¸šç¸¢ç¸‹ç¸ç¸–ç¸ç¸”ç¸¥ç¸¤ç½ƒç½»ç½¼ç½ºç¾±ç¿¯è€ªè€©è¬è†±è†¦è†®è†¹è†µè†«è†°è†¬è†´è†²è†·è†§è‡²è‰•è‰–è‰—è•–è•…è•«è•è•“è•¡è•˜"],["eb40","è•€è•†è•¤è•è•¢è•„è•‘è•‡è•£è”¾è•›è•±è•Žè•®è•µè••è•§è• è–Œè•¦è•è•”è•¥è•¬è™£è™¥è™¤èž›èžèž—èž“èž’èžˆèžèž–èž˜è¹èž‡èž£èž…èžèž‘èžèž„èž”èžœèžšèž‰è¤žè¤¦è¤°è¤­è¤®è¤§è¤±è¤¢è¤©è¤£è¤¯è¤¬è¤Ÿè§±è« "],["eba1","è«¢è«²è«´è«µè«è¬”è«¤è«Ÿè«°è«ˆè«žè«¡è«¨è«¿è«¯è«»è²‘è²’è²è³µè³®è³±è³°è³³èµ¬èµ®è¶¥è¶§è¸³è¸¾è¸¸è¹€è¹…è¸¶è¸¼è¸½è¹è¸°è¸¿èº½è¼¶è¼®è¼µè¼²è¼¹è¼·è¼´é¶é¹é»é‚†éƒºé„³é„µé„¶é†“é†é†‘é†é†éŒ§éŒžéŒˆéŒŸéŒ†éŒéºéŒ¸éŒ¼éŒ›éŒ£éŒ’éŒé†éŒ­éŒŽéŒé‹‹éŒé‹ºéŒ¥éŒ“é‹¹é‹·éŒ´éŒ‚éŒ¤é‹¿éŒ©éŒ¹éŒµéŒªéŒ”éŒŒ"],["ec40","éŒ‹é‹¾éŒ‰éŒ€é‹»éŒ–é–¼é—é–¾é–¹é–ºé–¶é–¿é–µé–½éš©é›”éœ‹éœ’éœéž™éž—éž”éŸ°éŸ¸é µé ¯é ²é¤¤é¤Ÿé¤§é¤©é¦žé§®é§¬é§¥é§¤é§°é§£é§ªé§©é§§éª¹éª¿éª´éª»é«¶é«ºé«¹é«·é¬³é®€é®…é®‡é­¼é­¾é­»é®‚é®“é®’é®é­ºé®•"],["eca1","é­½é®ˆé´¥é´—é´ é´žé´”é´©é´é´˜é´¢é´é´™é´Ÿéºˆéº†éº‡éº®éº­é»•é»–é»ºé¼’é¼½å„¦å„¥å„¢å„¤å„ å„©å‹´åš“åšŒåšåš†åš„åšƒå™¾åš‚å™¿åšå£–å£”å£å£’å¬­å¬¥å¬²å¬£å¬¬å¬§å¬¦å¬¯å¬®å­»å¯±å¯²å¶·å¹¬å¹ªå¾¾å¾»æ‡ƒæ†µæ†¼æ‡§æ‡ æ‡¥æ‡¤æ‡¨æ‡žæ“¯æ“©æ“£æ“«æ“¤æ“¨æ–æ–€æ–¶æ—šæ›’æªæª–æªæª¥æª‰æªŸæª›æª¡æªžæª‡æª“æªŽ"],["ed40","æª•æªƒæª¨æª¤æª‘æ©¿æª¦æªšæª…æªŒæª’æ­›æ®­æ°‰æ¿Œæ¾©æ¿´æ¿”æ¿£æ¿œæ¿­æ¿§æ¿¦æ¿žæ¿²æ¿æ¿¢æ¿¨ç‡¡ç‡±ç‡¨ç‡²ç‡¤ç‡°ç‡¢ç³ç®ç¯ç’—ç’²ç’«ç’ç’ªç’­ç’±ç’¥ç’¯ç”ç”‘ç”’ç”ç–„ç™ƒç™ˆç™‰ç™‡çš¤ç›©çžµçž«çž²çž·çž¶"],["eda1","çž´çž±çž¨çŸ°ç£³ç£½ç¤‚ç£»ç£¼ç£²ç¤…ç£¹ç£¾ç¤„ç¦«ç¦¨ç©œç©›ç©–ç©˜ç©”ç©šçª¾ç«€ç«ç°…ç°ç¯²ç°€ç¯¿ç¯»ç°Žç¯´ç°‹ç¯³ç°‚ç°‰ç°ƒç°ç¯¸ç¯½ç°†ç¯°ç¯±ç°ç°Šç³¨ç¸­ç¸¼ç¹‚ç¸³é¡ˆç¸¸ç¸ªç¹‰ç¹€ç¹‡ç¸©ç¹Œç¸°ç¸»ç¸¶ç¹„ç¸ºç½…ç½¿ç½¾ç½½ç¿´ç¿²è€¬è†»è‡„è‡Œè‡Šè‡…è‡‡è†¼è‡©è‰›è‰šè‰œè–ƒè–€è–è–§è–•è– è–‹è–£è•»è–¤è–šè–ž"],["ee40","è•·è•¼è–‰è–¡è•ºè•¸è•—è–Žè––è–†è–è–™è–è–è–¢è–‚è–ˆè–…è•¹è•¶è–˜è–è–Ÿè™¨èž¾èžªèž­èŸ…èž°èž¬èž¹èžµèž¼èž®èŸ‰èŸƒèŸ‚èŸŒèž·èž¯èŸ„èŸŠèž´èž¶èž¿èž¸èž½èŸžèž²è¤µè¤³è¤¼è¤¾è¥è¥’è¤·è¥‚è¦­è¦¯è¦®è§²è§³è¬ž"],["eea1","è¬˜è¬–è¬‘è¬…è¬‹è¬¢è¬è¬’è¬•è¬‡è¬è¬ˆè¬†è¬œè¬“è¬šè±è±°è±²è±±è±¯è²•è²”è³¹èµ¯è¹Žè¹è¹“è¹è¹Œè¹‡è½ƒè½€é‚…é¾é„¸é†šé†¢é†›é†™é†Ÿé†¡é†é† éŽ¡éŽƒéŽ¯é¤é–é‡é¼é˜éœé¶é‰éé‘é é­éŽéŒéªé¹é—é•é’éé±é·é»é¡éžé£é§éŽ€éŽé™é—‡é—€é—‰é—ƒé—…é–·éš®éš°éš¬éœ éœŸéœ˜éœéœ™éžšéž¡éžœ"],["ef40","éžžéžéŸ•éŸ”éŸ±é¡é¡„é¡Šé¡‰é¡…é¡ƒé¤¥é¤«é¤¬é¤ªé¤³é¤²é¤¯é¤­é¤±é¤°é¦˜é¦£é¦¡é¨‚é§ºé§´é§·é§¹é§¸é§¶é§»é§½é§¾é§¼é¨ƒéª¾é«¾é«½é¬é«¼é­ˆé®šé®¨é®žé®›é®¦é®¡é®¥é®¤é®†é®¢é® é®¯é´³éµéµ§é´¶é´®é´¯é´±é´¸é´°"],["efa1","éµ…éµ‚éµƒé´¾é´·éµ€é´½ç¿µé´­éºŠéº‰éºéº°é»ˆé»šé»»é»¿é¼¤é¼£é¼¢é½”é¾ å„±å„­å„®åš˜åšœåš—åššåšåš™å¥°å¬¼å±©å±ªå·€å¹­å¹®æ‡˜æ‡Ÿæ‡­æ‡®æ‡±æ‡ªæ‡°æ‡«æ‡–æ‡©æ“¿æ”„æ“½æ“¸æ”æ”ƒæ“¼æ–”æ—›æ›šæ››æ›˜æ«…æª¹æª½æ«¡æ«†æªºæª¶æª·æ«‡æª´æª­æ­žæ¯‰æ°‹ç€‡ç€Œç€ç€ç€…ç€”ç€Žæ¿¿ç€€æ¿»ç€¦æ¿¼æ¿·ç€Šçˆç‡¿ç‡¹çˆƒç‡½ç¶"],["f040","ç’¸ç“€ç’µç“ç’¾ç’¶ç’»ç“‚ç””ç”“ç™œç™¤ç™™ç™ç™“ç™—ç™šçš¦çš½ç›¬çŸ‚çžºç£¿ç¤Œç¤“ç¤”ç¤‰ç¤ç¤’ç¤‘ç¦­ç¦¬ç©Ÿç°œç°©ç°™ç° ç°Ÿç°­ç°ç°¦ç°¨ç°¢ç°¥ç°°ç¹œç¹ç¹–ç¹£ç¹˜ç¹¢ç¹Ÿç¹‘ç¹ ç¹—ç¹“ç¾µç¾³ç¿·ç¿¸èµè‡‘è‡’"],["f0a1","è‡è‰Ÿè‰žè–´è—†è—€è—ƒè—‚è–³è–µè–½è—‡è—„è–¿è—‹è—Žè—ˆè—…è–±è–¶è—’è˜¤è–¸è–·è–¾è™©èŸ§èŸ¦èŸ¢èŸ›èŸ«èŸªèŸ¥èŸŸèŸ³èŸ¤èŸ”èŸœèŸ“èŸ­èŸ˜èŸ£èž¤èŸ—èŸ™è èŸ´èŸ¨èŸè¥“è¥‹è¥è¥Œè¥†è¥è¥‘è¥‰è¬ªè¬§è¬£è¬³è¬°è¬µè­‡è¬¯è¬¼è¬¾è¬±è¬¥è¬·è¬¦è¬¶è¬®è¬¤è¬»è¬½è¬ºè±‚è±µè²™è²˜è²—è³¾è´„è´‚è´€è¹œè¹¢è¹ è¹—è¹–è¹žè¹¥è¹§"],["f140","è¹›è¹šè¹¡è¹è¹©è¹”è½†è½‡è½ˆè½‹é„¨é„ºé„»é„¾é†¨é†¥é†§é†¯é†ªéŽµéŽŒéŽ’éŽ·éŽ›éŽéŽ‰éŽ§éŽŽéŽªéŽžéŽ¦éŽ•éŽˆéŽ™éŽŸéŽéŽ±éŽ‘éŽ²éŽ¤éŽ¨éŽ´éŽ£éŽ¥é—’é—“é—‘éš³é›—é›šå·‚é›Ÿé›˜é›éœ£éœ¢éœ¥éž¬éž®éž¨éž«éž¤éžª"],["f1a1","éž¢éž¥éŸ—éŸ™éŸ–éŸ˜éŸºé¡é¡‘é¡’é¢¸é¥é¤¼é¤ºé¨é¨‹é¨‰é¨é¨„é¨‘é¨Šé¨…é¨‡é¨†é«€é«œé¬ˆé¬„é¬…é¬©é¬µé­Šé­Œé­‹é¯‡é¯†é¯ƒé®¿é¯é®µé®¸é¯“é®¶é¯„é®¹é®½éµœéµ“éµéµŠéµ›éµ‹éµ™éµ–éµŒéµ—éµ’éµ”éµŸéµ˜éµšéºŽéºŒé»Ÿé¼é¼€é¼–é¼¥é¼«é¼ªé¼©é¼¨é½Œé½•å„´å„µåŠ–å‹·åŽ´åš«åš­åš¦åš§åšªåš¬å£šå£å£›å¤’å¬½å¬¾å¬¿å·ƒå¹°"],["f240","å¾¿æ‡»æ”‡æ”æ”æ”‰æ”Œæ”Žæ–„æ—žæ—æ›žæ«§æ« æ«Œæ«‘æ«™æ«‹æ«Ÿæ«œæ«æ««æ«æ«æ«žæ­ æ®°æ°Œç€™ç€§ç€ ç€–ç€«ç€¡ç€¢ç€£ç€©ç€—ç€¤ç€œç€ªçˆŒçˆŠçˆ‡çˆ‚çˆ…çŠ¥çŠ¦çŠ¤çŠ£çŠ¡ç“‹ç“…ç’·ç“ƒç”–ç™ çŸ‰çŸŠçŸ„çŸ±ç¤ç¤›"],["f2a1","ç¤¡ç¤œç¤—ç¤žç¦°ç©§ç©¨ç°³ç°¼ç°¹ç°¬ç°»ç³¬ç³ªç¹¶ç¹µç¹¸ç¹°ç¹·ç¹¯ç¹ºç¹²ç¹´ç¹¨ç½‹ç½Šç¾ƒç¾†ç¾·ç¿½ç¿¾è¸è‡—è‡•è‰¤è‰¡è‰£è—«è—±è—­è—™è—¡è—¨è—šè——è—¬è—²è—¸è—˜è—Ÿè—£è—œè—‘è—°è—¦è—¯è—žè—¢è €èŸºè ƒèŸ¶èŸ·è ‰è Œè ‹è †èŸ¼è ˆèŸ¿è Šè ‚è¥¢è¥šè¥›è¥—è¥¡è¥œè¥˜è¥è¥™è¦ˆè¦·è¦¶è§¶è­è­ˆè­Šè­€è­“è­–è­”è­‹è­•"],["f340","è­‘è­‚è­’è­—è±ƒè±·è±¶è²šè´†è´‡è´‰è¶¬è¶ªè¶­è¶«è¹­è¹¸è¹³è¹ªè¹¯è¹»è»‚è½’è½‘è½è½è½“è¾´é…€é„¿é†°é†­éžé‡éé‚éšéé¹é¬éŒé™éŽ©é¦éŠé”é®é£é•é„éŽé€é’é§é•½é—šé—›é›¡éœ©éœ«éœ¬éœ¨éœ¦"],["f3a1","éž³éž·éž¶éŸéŸžéŸŸé¡œé¡™é¡é¡—é¢¿é¢½é¢»é¢¾é¥ˆé¥‡é¥ƒé¦¦é¦§é¨šé¨•é¨¥é¨é¨¤é¨›é¨¢é¨ é¨§é¨£é¨žé¨œé¨”é«‚é¬‹é¬Šé¬Žé¬Œé¬·é¯ªé¯«é¯ é¯žé¯¤é¯¦é¯¢é¯°é¯”é¯—é¯¬é¯œé¯™é¯¥é¯•é¯¡é¯šéµ·é¶é¶Šé¶„é¶ˆéµ±é¶€éµ¸é¶†é¶‹é¶Œéµ½éµ«éµ´éµµéµ°éµ©é¶…éµ³éµ»é¶‚éµ¯éµ¹éµ¿é¶‡éµ¨éº”éº‘é»€é»¼é¼­é½€é½é½é½–é½—é½˜åŒ·åš²"],["f440","åšµåš³å££å­…å·†å·‡å»®å»¯å¿€å¿æ‡¹æ”—æ”–æ”•æ”“æ—Ÿæ›¨æ›£æ›¤æ«³æ«°æ«ªæ«¨æ«¹æ«±æ«®æ«¯ç€¼ç€µç€¯ç€·ç€´ç€±ç‚ç€¸ç€¿ç€ºç€¹ç€ç€»ç€³ççˆ“çˆ”çŠ¨ç½ç¼ç’ºçš«çšªçš¾ç›­çŸŒçŸŽçŸçŸçŸ²ç¤¥ç¤£ç¤§ç¤¨ç¤¤ç¤©"],["f4a1","ç¦²ç©®ç©¬ç©­ç«·ç±‰ç±ˆç±Šç±‡ç±…ç³®ç¹»ç¹¾çºçº€ç¾ºç¿¿è¹è‡›è‡™èˆ‹è‰¨è‰©è˜¢è—¿è˜è—¾è˜›è˜€è—¶è˜„è˜‰è˜…è˜Œè—½è ™è è ‘è —è “è –è¥£è¥¦è¦¹è§·è­ è­ªè­è­¨è­£è­¥è­§è­­è¶®èº†èºˆèº„è½™è½–è½—è½•è½˜è½šé‚é…ƒé…é†·é†µé†²é†³é‹é“é»é éé”é¾é•éé¨é™ééµé€é·é‡éŽé–é’éºé‰é¸éŠé¿"],["f540","é¼éŒé¶é‘é†é—žé— é—Ÿéœ®éœ¯éž¹éž»éŸ½éŸ¾é¡ é¡¢é¡£é¡Ÿé£é£‚é¥é¥Žé¥™é¥Œé¥‹é¥“é¨²é¨´é¨±é¨¬é¨ªé¨¶é¨©é¨®é¨¸é¨­é«‡é«Šé«†é¬é¬’é¬‘é°‹é°ˆé¯·é°…é°’é¯¸é±€é°‡é°Žé°†é°—é°”é°‰é¶Ÿé¶™é¶¤é¶é¶’é¶˜é¶é¶›"],["f5a1","é¶ é¶”é¶œé¶ªé¶—é¶¡é¶šé¶¢é¶¨é¶žé¶£é¶¿é¶©é¶–é¶¦é¶§éº™éº›éºšé»¥é»¤é»§é»¦é¼°é¼®é½›é½ é½žé½é½™é¾‘å„ºå„¹åŠ˜åŠ—å›ƒåš½åš¾å­ˆå­‡å·‹å·å»±æ‡½æ”›æ¬‚æ«¼æ¬ƒæ«¸æ¬€çƒç„çŠçˆç‰ç…ç†çˆçˆšçˆ™ç¾ç”—ç™ªçŸç¤­ç¤±ç¤¯ç±”ç±“ç³²çºŠçº‡çºˆçº‹çº†çºç½ç¾»è€°è‡è˜˜è˜ªè˜¦è˜Ÿè˜£è˜œè˜™è˜§è˜®è˜¡è˜ è˜©è˜žè˜¥"],["f640","è ©è è ›è  è ¤è œè «è¡Šè¥­è¥©è¥®è¥«è§ºè­¹è­¸è­…è­ºè­»è´è´”è¶¯èºŽèºŒè½žè½›è½é…†é…„é……é†¹é¿é»é¶é©é½é¼é°é¹éªé·é¬é‘€é±é—¥é—¤é—£éœµéœºéž¿éŸ¡é¡¤é£‰é£†é£€é¥˜é¥–é¨¹é¨½é©†é©„é©‚é©é¨º"],["f6a1","é¨¿é«é¬•é¬—é¬˜é¬–é¬ºé­’é°«é°é°œé°¬é°£é°¨é°©é°¤é°¡é¶·é¶¶é¶¼é·é·‡é·Šé·é¶¾é·…é·ƒé¶»é¶µé·Žé¶¹é¶ºé¶¬é·ˆé¶±é¶­é·Œé¶³é·é¶²é¹ºéºœé»«é»®é»­é¼›é¼˜é¼šé¼±é½Žé½¥é½¤é¾’äº¹å›†å›…å›‹å¥±å­‹å­Œå·•å·‘å»²æ”¡æ” æ”¦æ”¢æ¬‹æ¬ˆæ¬‰æ°ç•ç–ç—ç’çˆžçˆŸçŠ©ç¿ç“˜ç“•ç“™ç“—ç™­çš­ç¤µç¦´ç©°ç©±ç±—ç±œç±™ç±›ç±š"],["f740","ç³´ç³±çº‘ç½ç¾‡è‡žè‰«è˜´è˜µè˜³è˜¬è˜²è˜¶è ¬è ¨è ¦è ªè ¥è¥±è¦¿è¦¾è§»è­¾è®„è®‚è®†è®…è­¿è´•èº•èº”èºšèº’èºèº–èº—è½ è½¢é…‡é‘Œé‘é‘Šé‘‹é‘é‘‡é‘…é‘ˆé‘‰é‘†éœ¿éŸ£é¡ªé¡©é£‹é¥”é¥›é©Žé©“é©”é©Œé©é©ˆé©Š"],["f7a1","é©‰é©’é©é«é¬™é¬«é¬»é­–é­•é±†é±ˆé°¿é±„é°¹é°³é±é°¼é°·é°´é°²é°½é°¶é·›é·’é·žé·šé·‹é·é·œé·‘é·Ÿé·©é·™é·˜é·–é·µé·•é·éº¶é»°é¼µé¼³é¼²é½‚é½«é¾•é¾¢å„½åŠ™å£¨å£§å¥²å­å·˜è ¯å½æˆæˆƒæˆ„æ”©æ”¥æ––æ›«æ¬‘æ¬’æ¬æ¯Šç›çšçˆ¢çŽ‚çŽçŽƒç™°çŸ”ç±§ç±¦çº•è‰¬è˜ºè™€è˜¹è˜¼è˜±è˜»è˜¾è °è ²è ®è ³è¥¶è¥´è¥³è§¾"],["f840","è®Œè®Žè®‹è®ˆè±…è´™èº˜è½¤è½£é†¼é‘¢é‘•é‘é‘—é‘žéŸ„éŸ…é €é©–é©™é¬žé¬Ÿé¬ é±’é±˜é±é±Šé±é±‹é±•é±™é±Œé±Žé·»é··é·¯é·£é·«é·¸é·¤é·¶é·¡é·®é·¦é·²é·°é·¢é·¬é·´é·³é·¨é·­é»‚é»é»²é»³é¼†é¼œé¼¸é¼·é¼¶é½ƒé½"],["f8a1","é½±é½°é½®é½¯å›“å›å­Žå±­æ”­æ›­æ›®æ¬“çŸç¡çç çˆ£ç“›ç“¥çŸ•ç¤¸ç¦·ç¦¶ç±ªçº—ç¾‰è‰­è™ƒè ¸è ·è µè¡‹è®”è®•èºžèºŸèº èºé†¾é†½é‡‚é‘«é‘¨é‘©é›¥é†éƒé‡éŸ‡éŸ¥é©žé«•é­™é±£é±§é±¦é±¢é±žé± é¸‚é·¾é¸‡é¸ƒé¸†é¸…é¸€é¸é¸‰é·¿é·½é¸„éº é¼žé½†é½´é½µé½¶å›”æ”®æ–¸æ¬˜æ¬™æ¬—æ¬šç¢çˆ¦çŠªçŸ˜çŸ™ç¤¹ç±©ç±«ç³¶çºš"],["f940","çº˜çº›çº™è‡ è‡¡è™†è™‡è™ˆè¥¹è¥ºè¥¼è¥»è§¿è®˜è®™èº¥èº¤èº£é‘®é‘­é‘¯é‘±é‘³é‰é¡²é¥Ÿé±¨é±®é±­é¸‹é¸é¸é¸é¸’é¸‘éº¡é»µé¼‰é½‡é½¸é½»é½ºé½¹åœžç¦ç±¯è ¼è¶²èº¦é‡ƒé‘´é‘¸é‘¶é‘µé© é±´é±³é±±é±µé¸”é¸“é»¶é¼Š"],["f9a1","é¾¤ç¨ç¥ç³·è™ªè ¾è ½è ¿è®žè²œèº©è»‰é‹é¡³é¡´é£Œé¥¡é¦«é©¤é©¦é©§é¬¤é¸•é¸—é½ˆæˆ‡æ¬žçˆ§è™Œèº¨é’‚é’€é’é©©é©¨é¬®é¸™çˆ©è™‹è®Ÿé’ƒé±¹éº·ç™µé©«é±ºé¸ç©çªéº¤é½¾é½‰é¾˜ç¢éŠ¹è£å¢»æ’ç²§å«ºâ•”â•¦â•—â• â•¬â•£â•šâ•©â•â•’â•¤â••â•žâ•ªâ•¡â•˜â•§â•›â•“â•¥â•–â•Ÿâ•«â•¢â•™â•¨â•œâ•‘â•â•­â•®â•°â•¯â–“"]]')},function(e,t,n){(function(){var u,l;function t(t,e,n){this.type=t,this.length=e,this.lengthType=null!=n?n:"count"}u=n(88).Number,l=n(40),t.prototype.decode=function(t,e){var n,r,i,o=t.pos,a=[],s=e;if(null!=this.length&&(n=l.resolveLength(this.length,t,e)),this.length instanceof u&&(Object.defineProperties(a,{parent:{value:e},_startOffset:{value:o},_currentOffset:{value:0,writable:!0},_length:{value:n}}),s=a),null==n||"bytes"===this.lengthType)for(r=null!=n?t.pos+n:null!=e&&e._length?e._startOffset+e._length:t.length;t.pos<r;)a.push(this.type.decode(t,s));else for(i=0;i<n;i+=1)a.push(this.type.decode(t,s));return a},t.prototype.size=function(t,e){var n,r,i,o;if(!t)return this.type.size(null,e)*l.resolveLength(this.length,null,e);for(r=0,this.length instanceof u&&(r+=this.length.size(),e={parent:e}),i=0,o=t.length;i<o;i++)n=t[i],r+=this.type.size(n,e);return r},t.prototype.encode=function(t,e,n){var r,i,o,a,s,l=n;for(this.length instanceof u&&((l={pointers:[],startOffset:t.pos,parent:n}).pointerOffset=t.pos+this.size(e,l),this.length.encode(t,e.length)),a=0,s=e.length;a<s;a++)i=e[a],this.type.encode(t,i,l);if(this.length instanceof u)for(r=0;r<l.pointers.length;)(o=l.pointers[r++]).type.encode(t,o.val)},e.exports=t}).call(this)},function(e,t,n){(function(){var a;function t(t){this.fields=null!=t?t:{}}a=n(40),t.prototype.decode=function(t,e,n){var r,i;return null==n&&(n=0),r=this._setup(t,e,n),this._parseFields(t,r,this.fields),null!=(i=this.process)&&i.call(r,t),r},t.prototype._setup=function(t,e,n){var r={};return Object.defineProperties(r,{parent:{value:e},_startOffset:{value:t.pos},_currentOffset:{value:0,writable:!0},_length:{value:n}}),r},t.prototype._parseFields=function(t,e,n){var r,i,o;for(r in n)void 0!==(o="function"==typeof(i=n[r])?i.call(e,e):i.decode(t,e))&&(o instanceof a.PropertyDescriptor?Object.defineProperty(e,r,o):e[r]=o),e._currentOffset=t.pos-e._startOffset},t.prototype.size=function(t,e,n){var r,i,o,a,s;for(i in null==t&&(t={}),null==n&&(n=!0),r={parent:e,val:t,pointerSize:0},o=0,s=this.fields)null!=(a=s[i]).size&&(o+=a.size(t[i],r));return n&&(o+=r.pointerSize),o},t.prototype.encode=function(t,e,n){var r,i,o,a,s,l,u;for(o in null!=(l=this.preEncode)&&l.call(e,t),(r={pointers:[],startOffset:t.pos,parent:n,val:e,pointerSize:0}).pointerOffset=t.pos+this.size(e,r,!1),u=this.fields)null!=(s=u[o]).encode&&s.encode(t,e[o],r);for(i=0;i<r.pointers.length;)(a=r.pointers[i++]).type.encode(t,a.val,a.parent)},e.exports=t}).call(this)},function(t,e,n){t.exports=!n(23)&&!n(52)(function(){return 7!=Object.defineProperty(n(176)("div"),"a",{get:function(){return 7}}).a})},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){t.exports=n(41)},function(t,e,n){var a=n(25),s=n(29),l=n(105);t.exports=n(23)?Object.defineProperties:function(t,e){s(t);for(var n,r=l(e),i=r.length,o=0;o<i;)a.f(t,n=r[o++],e[n]);return t}},function(t,e,n){var a=n(51),s=n(50),l=n(425)(!1),u=n(180)("IE_PROTO");t.exports=function(t,e){var n,r=s(t),i=0,o=[];for(n in r)n!=u&&a(r,n)&&o.push(n);for(;e.length>i;)a(r,n=e[i++])&&(~l(o,n)||o.push(n));return o}},function(t,e,n){var r=n(179),i=Math.max,o=Math.min;t.exports=function(t,e){return(t=r(t))<0?i(t+e,0):o(t,e)}},function(t,e,n){var r=n(17).document;t.exports=r&&r.documentElement},function(t,e,n){var r=n(99);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,e,n){var r=n(258),i=n(182).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,i)}},function(t,e,n){t.exports={default:n(444),__esModule:!0}},function(t,e,n){"use strict";function a(t,e){var n,r=p(e);if("F"!==r)return t._i[r];for(n=t._f;n;n=n.n)if(n.k==e)return n}var s=n(25).f,l=n(127),u=n(189),c=n(33),h=n(190),f=n(107),r=n(178),i=n(255),o=n(267),d=n(23),p=n(130).fastKey,g=n(191),y=d?"_s":"size";t.exports={getConstructor:function(t,o,n,r){var i=t(function(t,e){h(t,i,o,"_i"),t._t=o,t._i=l(null),t._f=void 0,t._l=void 0,t[y]=0,null!=e&&f(e,n,t[r],t)});return u(i.prototype,{clear:function(){for(var t=g(this,o),e=t._i,n=t._f;n;n=n.n)n.r=!0,n.p&&(n.p=n.p.n=void 0),delete e[n.i];t._f=t._l=void 0,t[y]=0},delete:function(t){var e,n,r=g(this,o),i=a(r,t);return i&&(e=i.n,n=i.p,delete r._i[i.i],i.r=!0,n&&(n.n=e),e&&(e.p=n),r._f==i&&(r._f=e),r._l==i&&(r._l=n),r[y]--),!!i},forEach:function(t,e){g(this,o);for(var n,r=c(t,1<arguments.length?e:void 0,3);n=n?n.n:this._f;)for(r(n.v,n.k,this);n&&n.r;)n=n.p},has:function(t){return!!a(g(this,o),t)}}),d&&s(i.prototype,"size",{get:function(){return g(this,o)[y]}}),i},def:function(t,e,n){var r,i,o=a(t,e);return o?o.v=n:(t._l=o={i:i=p(e,!0),k:e,v:n,p:r=t._l,n:void 0,r:!1},t._f||(t._f=o),r&&(r.n=o),t[y]++,"F"!==i&&(t._i[i]=o)),t},getEntry:a,setStrong:function(t,n,e){r(t,n,function(t,e){this._t=g(t,n),this._k=e,this._l=void 0},function(){for(var t=this._k,e=this._l;e&&e.r;)e=e.p;return this._t&&(this._l=e=e?e.n:this._t._f)?i(0,"keys"==t?e.k:"values"==t?e.v:[e.k,e.v]):(this._t=void 0,i(1))},e?"entries":"values",!e,!0),o(n)}}},function(t,e,n){var o=n(29);t.exports=function(e,t,n,r){try{return r?t(o(n)[0],n[1]):t(n)}catch(t){var i=e.return;throw void 0!==i&&o(i.call(e)),t}}},function(t,e,n){var r=n(103),i=n(21)("iterator"),o=Array.prototype;t.exports=function(t){return void 0!==t&&(r.Array===t||o[i]===t)}},function(t,e,n){"use strict";var r=n(17),i=n(7),o=n(25),a=n(23),s=n(21)("species");t.exports=function(t){var e="function"==typeof i[t]?i[t]:r[t];a&&e&&!e[s]&&o.f(e,s,{configurable:!0,get:function(){return this}})}},function(t,e,n){"use strict";var h=n(17),f=n(9),d=n(130),p=n(52),g=n(41),y=n(189),v=n(107),m=n(190),b=n(22),w=n(106),x=n(25).f,S=n(451)(0),_=n(23);t.exports=function(n,t,e,r,i,o){var a=h[n],s=a,l=i?"set":"add",u=s&&s.prototype,c={};return _&&"function"==typeof s&&(o||u.forEach&&!p(function(){(new s).entries().next()}))?(s=t(function(t,e){m(t,s,n,"_c"),t._c=new a,null!=e&&v(e,i,t[l],t)}),S("add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON".split(","),function(r){var i="add"==r||"set"==r;r in u&&(!o||"clear"!=r)&&g(s.prototype,r,function(t,e){if(m(this,s,r),!i&&o&&!b(t))return"get"==r&&void 0;var n=this._c[r](0===t?0:t,e);return i?this:n})}),o||x(s.prototype,"size",{get:function(){return this._c.size}})):(s=r.getConstructor(t,n,i,l),y(s.prototype,e),d.NEED=!0),w(s,n),c[n]=s,f(f.G+f.W+f.F,c),o||r.setStrong(s,n,i),s}},function(t,e,n){var r=n(184),i=n(455);t.exports=function(t){return function(){if(r(this)!=t)throw TypeError(t+"#toJSON isn't generic");return i(this)}}},function(t,e,n){"use strict";var r=n(9);t.exports=function(t){r(r.S,t,{of:function(){for(var t=arguments.length,e=new Array(t);t--;)e[t]=arguments[t];return new this(e)}})}},function(t,e,n){"use strict";var r=n(9),l=n(101),u=n(33),c=n(107);t.exports=function(t){r(r.S,t,{from:function(t,e,n){var r,i,o,a,s=e;return l(this),(r=void 0!==s)&&l(s),null==t?new this:(i=[],r?(o=0,a=u(s,n,2),c(t,!1,function(t){i.push(a(t,o++))})):c(t,!1,i.push,i),new this(i))}})}},function(t,e,n){"use strict";var r=Array.prototype.slice,i=n(273),o=Object.keys,a=o?function(t){return o(t)}:n(471),s=Object.keys;a.shim=function(){return Object.keys?function(){var t=Object.keys(arguments);return t&&t.length===arguments.length}(1,2)||(Object.keys=function(t){return i(t)?s(r.call(t)):s(t)}):Object.keys=a,Object.keys||a},t.exports=a},function(t,e,n){"use strict";var r=Object.prototype.toString;t.exports=function(t){var e=r.call(t);return"[object Arguments]"===e||"[object Array]"!==e&&null!==t&&"object"==typeof t&&"number"==typeof t.length&&0<=t.length&&"[object Function]"===r.call(t.callee)}},function(t,e,n){"use strict";var r=n(275),i=n(475),o=i("%Function.prototype.apply%"),a=i("%Function.prototype.call%"),s=i("%Reflect.apply%",!0)||r.call(a,o);t.exports=function(){return s(r,a,arguments)},t.exports.apply=function(){return s(r,o,arguments)}},function(t,e,n){"use strict";var r=n(474);t.exports=Function.prototype.bind||r},function(r,t,i){"use strict";(function(t){var e=t.Symbol,n=i(476);r.exports=function(){return"function"==typeof e&&("function"==typeof Symbol&&("symbol"==typeof e("foo")&&("symbol"==typeof Symbol("bar")&&n())))}}).call(this,i(26))},function(t,e,n){"use strict";function r(t){return t!=t}t.exports=function(t,e){return 0===t&&0===e?1/t==1/e:t===e||!(!r(t)||!r(e))}},function(t,e,n){"use strict";var r=n(277);t.exports=function(){return"function"==typeof Object.is?Object.is:r}},function(t,e,n){"use strict";var r=Object,i=TypeError;t.exports=function(){if(null!=this&&this!==r(this))throw new i("RegExp.prototype.flags getter called on non-object");var t="";return this.global&&(t+="g"),this.ignoreCase&&(t+="i"),this.multiline&&(t+="m"),this.dotAll&&(t+="s"),this.unicode&&(t+="u"),this.sticky&&(t+="y"),t}},function(t,e,n){"use strict";var r=n(279),i=n(108).supportsDescriptors,o=Object.getOwnPropertyDescriptor,a=TypeError;t.exports=function(){if(!i)throw new a("RegExp.prototype.flags requires a true ES5 environment that supports property descriptors");if("gim"===/a/gim.flags){var t=o(RegExp.prototype,"flags");if(t&&"function"==typeof t.get&&"boolean"==typeof/a/.dotAll)return t.get}return r}},function(t,e,n){var o=n(21)("iterator"),a=!1;try{var r=[7][o]();r.return=function(){a=!0},Array.from(r,function(){throw 2})}catch(t){}t.exports=function(t,e){if(!e&&!a)return!1;var n=!1;try{var r=[7],i=r[o]();i.next=function(){return{done:n=!0}},r[o]=function(){return i},t(r)}catch(t){}return n}},function(t,e,n){var i=n(29),o=n(101),a=n(21)("species");t.exports=function(t,e){var n,r=i(t).constructor;return void 0===r||null==(n=i(r)[a])?e:o(n)}},function(t,e,n){function r(){var t,e=+this;b.hasOwnProperty(e)&&(t=b[e],delete b[e],t())}function i(t){r.call(t.data)}var o,a,s,l=n(33),u=n(514),c=n(260),h=n(176),f=n(17),d=f.process,p=f.setImmediate,g=f.clearImmediate,y=f.MessageChannel,v=f.Dispatch,m=0,b={},w="onreadystatechange";p&&g||(p=function(t){for(var e=[],n=1;n<arguments.length;)e.push(arguments[n++]);return b[++m]=function(){u("function"==typeof t?t:Function(t),e)},o(m),m},g=function(t){delete b[t]},"process"==n(99)(d)?o=function(t){d.nextTick(l(r,t,1))}:v&&v.now?o=function(t){v.now(l(r,t,1))}:y?(s=(a=new y).port2,a.port1.onmessage=i,o=l(s.postMessage,s,1)):f.addEventListener&&"function"==typeof postMessage&&!f.importScripts?(o=function(t){f.postMessage(t+"","*")},f.addEventListener("message",i,!1)):o=w in h("script")?function(t){c.appendChild(h("script"))[w]=function(){c.removeChild(this),r.call(t)}}:function(t){setTimeout(l(r,t,1),0)}),t.exports={set:p,clear:g}},function(t,e){t.exports=function(t){try{return{e:!1,v:t()}}catch(t){return{e:!0,v:t}}}},function(t,e,n){var r=n(29),i=n(22),o=n(193);t.exports=function(t,e){if(r(t),i(e)&&e.constructor===t)return e;var n=o.f(t);return(0,n.resolve)(e),n.promise}},function(t,e,n){var o=n(287).BrotliInput,a=n(287).BrotliOutput,bt=n(520),wt=n(288),xt=n(289).HuffmanCode,b=n(289).BrotliBuildHuffmanTable,St=n(524),_t=n(525),kt=n(526),w=8,x=16,At=256,Ct=704,Pt=26,Et=6,Ot=2,S=8,i=255,Tt=1080,_=18,k=new Uint8Array([1,2,3,4,0,5,17,6,16,7,8,9,10,11,12,13,14,15]),It=16,Lt=new Uint8Array([3,2,1,0,3,3,3,3,3,3,2,2,2,2,2,2]),Mt=new Int8Array([0,0,0,0,-1,1,-2,2,-3,3,-1,1,-2,2,-3,3]),r=new Uint16Array([256,402,436,468,500,534,566,598,630,662,694,726,758,790,822,854,886,920,952,984,1016,1048,1080]);function Bt(t){var e;return 0===t.readBits(1)?16:0<(e=t.readBits(3))?17+e:0<(e=t.readBits(3))?8+e:17}function Rt(t){if(t.readBits(1)){var e=t.readBits(3);return 0===e?1:t.readBits(e)+(1<<e)}return 0}function s(){this.meta_block_length=0,this.input_end=0,this.is_uncompressed=0,this.is_metadata=!1}function Ft(t){var e,n,r,i=new s;if(i.input_end=t.readBits(1),i.input_end&&t.readBits(1))return i;if(7===(e=t.readBits(2)+4)){if(i.is_metadata=!0,0!==t.readBits(1))throw new Error("Invalid reserved bit");if(0===(n=t.readBits(2)))return i;for(r=0;r<n;r++){var o=t.readBits(8);if(r+1===n&&1<n&&0===o)throw new Error("Invalid size byte");i.meta_block_length|=o<<8*r}}else for(r=0;r<e;++r){var a=t.readBits(4);if(r+1===e&&4<e&&0===a)throw new Error("Invalid size nibble");i.meta_block_length|=a<<4*r}return++i.meta_block_length,i.input_end||i.is_metadata||(i.is_uncompressed=t.readBits(1)),i}function Dt(t,e,n){var r;return n.fillBitWindow(),0<(r=t[e+=n.val_>>>n.bit_pos_&i].bits-S)&&(n.bit_pos_+=S,e+=t[e].value,e+=n.val_>>>n.bit_pos_&(1<<r)-1),n.bit_pos_+=t[e].bits,t[e].value}function zt(t,e,n,r){var i,o,a=new Uint8Array(t);if(r.readMoreInput(),1===(o=r.readBits(2))){for(var s=t-1,l=0,u=new Int32Array(4),c=r.readBits(2)+1;s;)s>>=1,++l;for(h=0;h<c;++h)u[h]=r.readBits(l)%t,a[u[h]]=2;switch(c){case a[u[0]]=1:break;case 3:if(u[0]===u[1]||u[0]===u[2]||u[1]===u[2])throw new Error("[ReadHuffmanCode] invalid symbols");break;case 2:if(u[0]===u[1])throw new Error("[ReadHuffmanCode] invalid symbols");a[u[1]]=1;break;case 4:if(u[0]===u[1]||u[0]===u[2]||u[0]===u[3]||u[1]===u[2]||u[1]===u[3]||u[2]===u[3])throw new Error("[ReadHuffmanCode] invalid symbols");r.readBits(1)?(a[u[2]]=3,a[u[3]]=3):a[u[0]]=2}}else{var h,f=new Uint8Array(_),d=32,p=0,g=[new xt(2,0),new xt(2,4),new xt(2,3),new xt(3,2),new xt(2,0),new xt(2,4),new xt(2,3),new xt(4,1),new xt(2,0),new xt(2,4),new xt(2,3),new xt(3,2),new xt(2,0),new xt(2,4),new xt(2,3),new xt(4,5)];for(h=o;h<_&&0<d;++h){var y,v=k[h],m=0;r.fillBitWindow(),m+=r.val_>>>r.bit_pos_&15,r.bit_pos_+=g[m].bits,y=g[m].value,0!==(f[v]=y)&&(d-=32>>y,++p)}if(1!==p&&0!==d)throw new Error("[ReadHuffmanCode] invalid num_codes or space");!function(t,e,n,r){for(var i=0,o=w,a=0,s=0,l=32768,u=[],c=0;c<32;c++)u.push(new xt(0,0));for(b(u,0,5,t,_);i<e&&0<l;){var h,f=0;if(r.readMoreInput(),r.fillBitWindow(),f+=r.val_>>>r.bit_pos_&31,r.bit_pos_+=u[f].bits,(h=255&u[f].value)<x)(a=0)!=(n[i++]=h)&&(l-=32768>>(o=h));else{var d,p,g=h-14,y=h===x?o:0;if(s!==y&&(a=0,s=y),0<(d=a)&&(a-=2,a<<=g),e<i+(p=(a+=r.readBits(g)+3)-d))throw new Error("[ReadHuffmanCodeLengths] symbol + repeat_delta > num_symbols");for(var v=0;v<p;v++)n[i+v]=s;i+=p,0!==s&&(l-=p<<15-s)}}if(0!==l)throw new Error("[ReadHuffmanCodeLengths] space = "+l);for(;i<e;i++)n[i]=0}(f,t,a,r)}if(0===(i=b(e,n,S,a,t)))throw new Error("[ReadHuffmanCode] BuildHuffmanTable failed: ");return i}function Nt(t,e,n){var r=Dt(t,e,n),i=_t.kBlockLengthPrefixCode[r].nbits;return _t.kBlockLengthPrefixCode[r].offset+n.readBits(i)}function c(t,e){for(var n=new Uint8Array(256),r=0;r<256;++r)n[r]=r;for(r=0;r<e;++r){var i=t[r];t[r]=n[i],i&&function(t,e){for(var n=t[e],r=e;r;--r)t[r]=t[r-1];t[0]=n}(n,i)}}function Ut(t,e){this.alphabet_size=t,this.num_htrees=e,this.codes=new Array(e+e*r[t+31>>>5]),this.htrees=new Uint32Array(e)}function jt(t,e){var n,r,i={num_htrees:null,context_map:null},o=0;e.readMoreInput();var a,s=i.num_htrees=Rt(e)+1,l=i.context_map=new Uint8Array(t);if(s<=1)return i;for(e.readBits(1)&&(o=e.readBits(4)+1),n=[],r=0;r<Tt;r++)n[r]=new xt(0,0);for(zt(s+o,n,0,e),r=0;r<t;){if(e.readMoreInput(),0===(a=Dt(n,0,e)))l[r]=0,++r;else if(a<=o)for(var u=1+(1<<a)+e.readBits(a);--u;){if(t<=r)throw new Error("[DecodeContextMap] i >= context_map_size");l[r]=0,++r}else l[r]=a-o,++r}return e.readBits(1)&&c(l,t),i}function Wt(t,e,n,r,i,o,a){var s=2*n,l=n,u=Dt(e,n*Tt,a),c=0===u?i[s+(1&o[l])]:1===u?i[s+(o[l]-1&1)]+1:u-2;t<=c&&(c-=t),r[n]=c,i[s+(1&o[l])]=c,++o[l]}function l(t){var e=new o(t),n=new bt(e);return Bt(n),Ft(n).meta_block_length}function u(t,e){for(var n,r,i,o,a,s=0,l=0,u=0,c=0,h=[16,15,11,4],f=0,d=0,p=0,g=[new Ut(0,0),new Ut(0,0),new Ut(0,0)],y=128+bt.READ_SIZE,v=new bt(t),m=(1<<(u=Bt(v)))-16,b=1<<u,w=b-1,x=new Uint8Array(b+y+wt.maxDictionaryWordLength),S=b,_=[],k=[],A=0;A<3*Tt;A++)_[A]=new xt(0,0),k[A]=new xt(0,0);for(;!l;){for(var C,P,E,O,T,I,L,M,B,R=0,F=[1<<28,1<<28,1<<28],D=[0],z=[1,1,1],N=[0,1,0,1,0,1],U=[0],j=null,W=null,V=null,G=0,H=0,q=0;q<3;++q)g[q].codes=null,g[q].htrees=null;v.readMoreInput();var Z,X=Ft(v);if(s+(R=X.meta_block_length)>e.buffer.length&&((Z=new Uint8Array(s+R)).set(e.buffer),e.buffer=Z),l=X.input_end,C=X.is_uncompressed,X.is_metadata)for(a=void 0,a=(o=v).bit_pos_+7&-8,o.readBits(a-o.bit_pos_);0<R;--R)v.readMoreInput(),v.readBits(8);else if(0!==R)if(C)v.bit_pos_=v.bit_pos_+7&-8,function(t,e,n,r,i,o){var a,s=i+1,l=n&i,u=o.pos_&bt.IBUF_MASK;if(e<8||o.bit_pos_+(e<<3)<o.bit_end_pos_)for(;0<e--;)o.readMoreInput(),r[l++]=o.readBits(8),l===s&&(t.write(r,s),l=0);else{if(o.bit_end_pos_<32)throw new Error("[CopyUncompressedBlockToOutput] br.bit_end_pos_ < 32");for(;o.bit_pos_<32;)r[l]=o.val_>>>o.bit_pos_,o.bit_pos_+=8,++l,--e;if(u+(a=o.bit_end_pos_-o.bit_pos_>>3)>bt.IBUF_MASK){for(var c=bt.IBUF_MASK+1-u,h=0;h<c;h++)r[l+h]=o.buf_[u+h];a-=c,l+=c,e-=c,u=0}for(h=0;h<a;h++)r[l+h]=o.buf_[u+h];if(e-=a,s<=(l+=a)){t.write(r,s),l-=s;for(h=0;h<l;h++)r[h]=r[s+h]}for(;s<=l+e;){if(a=s-l,o.input_.read(r,l,a)<a)throw new Error("[CopyUncompressedBlockToOutput] not enough bytes");t.write(r,s),e-=a,l=0}if(o.input_.read(r,l,e)<e)throw new Error("[CopyUncompressedBlockToOutput] not enough bytes");o.reset()}}(e,R,s,x,w,v),s+=R;else{for(q=0;q<3;++q)z[q]=Rt(v)+1,2<=z[q]&&(zt(z[q]+2,_,q*Tt,v),zt(Pt,k,q*Tt,v),F[q]=Nt(k,q*Tt,v),U[q]=1);for(v.readMoreInput(),O=(1<<(P=v.readBits(2)))-1,T=(E=It+(v.readBits(4)<<P))+(48<<P),j=new Uint8Array(z[0]),q=0;q<z[0];++q)v.readMoreInput(),j[q]=v.readBits(2)<<1;var Y,K,J,Q,$,tt,et,nt,rt,it,ot,at,st=jt(z[0]<<Et,v),lt=st.num_htrees,ut=st.context_map,ct=jt(z[2]<<Ot,v),ht=ct.num_htrees,ft=ct.context_map;for(g[0]=new Ut(At,lt),g[1]=new Ut(Ct,z[1]),g[2]=new Ut(T,ht),q=0;q<3;++q)g[q].decode(v);for(M=j[D[V=W=0]],G=St.lookupOffsets[M],H=St.lookupOffsets[M+1],B=g[1].htrees[0];0<R;){for(v.readMoreInput(),0===F[1]&&(Wt(z[1],_,1,D,N,U,v),F[1]=Nt(k,Tt,v),B=g[1].htrees[D[1]]),--F[1],at=2<=(K=(Y=Dt(g[1].codes,B,v))>>6)?(K-=2,-1):0,J=_t.kInsertRangeLut[K]+(Y>>3&7),Q=_t.kCopyRangeLut[K]+(7&Y),$=_t.kInsertLengthPrefixCode[J].offset+v.readBits(_t.kInsertLengthPrefixCode[J].nbits),tt=_t.kCopyLengthPrefixCode[Q].offset+v.readBits(_t.kCopyLengthPrefixCode[Q].nbits),d=x[s-1&w],p=x[s-2&w],nt=0;nt<$;++nt)v.readMoreInput(),0===F[0]&&(Wt(z[0],_,0,D,N,U,v),F[0]=Nt(k,0,v),W=D[0]<<Et,M=j[D[0]],G=St.lookupOffsets[M],H=St.lookupOffsets[M+1]),I=ut[W+(St.lookup[G+d]|St.lookup[H+p])],--F[0],p=d,d=Dt(g[0].codes,g[0].htrees[I],v),x[s&w]=d,(s&w)==w&&e.write(x,b),++s;if((R-=$)<=0)break;if(at<0&&(v.readMoreInput(),0===F[2]&&(Wt(z[2],_,2,D,N,U,v),F[2]=Nt(k,2*Tt,v),V=D[2]<<Ot),--F[2],L=ft[V+(255&(4<tt?3:tt-2))],E<=(at=Dt(g[2].codes,g[2].htrees[L],v))&&(ot=(at-=E)&O,at=E+((dt=(2+(1&(at>>=P))<<(it=1+(at>>1)))-4)+v.readBits(it)<<P)+ot)),r=h,i=f,(et=(n=at)<It?(i+=Lt[n],r[i&=3]+Mt[n]):n-It+1)<0)throw new Error("[BrotliDecompress] invalid distance");if(rt=s&w,(c=s<m&&c!==m?s:m)<et){if(!(tt>=wt.minDictionaryWordLength&&tt<=wt.maxDictionaryWordLength))throw new Error("Invalid backward reference. pos: "+s+" distance: "+et+" len: "+tt+" bytes left: "+R);var dt=wt.offsetsByLength[tt],pt=et-c-1,gt=wt.sizeBitsByLength[tt],yt=pt>>gt;if(dt+=(pt&(1<<gt)-1)*tt,!(yt<kt.kNumTransforms))throw new Error("Invalid backward reference. pos: "+s+" distance: "+et+" len: "+tt+" bytes left: "+R);var vt=kt.transformDictionaryWord(x,rt,dt,tt,yt);if(s+=vt,R-=vt,S<=(rt+=vt)){e.write(x,b);for(var mt=0;mt<rt-S;mt++)x[mt]=x[S+mt]}}else{if(0<at&&(h[3&f]=et,++f),R<tt)throw new Error("Invalid backward reference. pos: "+s+" distance: "+et+" len: "+tt+" bytes left: "+R);for(nt=0;nt<tt;++nt)x[s&w]=x[s-et&w],(s&w)==w&&e.write(x,b),++s,--R}d=x[s-1&w],p=x[s-2&w]}s&=1073741823}}e.write(x,s&w)}Ut.prototype.decode=function(t){for(var e=0,n=0;n<this.num_htrees;++n)this.htrees[n]=e,e+=zt(this.alphabet_size,this.codes,e,t)},e.BrotliDecompressedSize=l,e.BrotliDecompressBuffer=function(t,e){var n=new o(t);null==e&&(e=l(t));var r=new Uint8Array(e),i=new a(r);return u(n,i),i.pos<i.buffer.length&&(i.buffer=i.buffer.subarray(0,i.pos)),i.buffer},e.BrotliDecompress=u,wt.init()},function(t,e){function n(t){this.buffer=t,this.pos=0}function r(t){this.buffer=t,this.pos=0}n.prototype.read=function(t,e,n){this.pos+n>this.buffer.length&&(n=this.buffer.length-this.pos);for(var r=0;r<n;r++)t[e+r]=this.buffer[this.pos+r];return this.pos+=n,n},e.BrotliInput=n,r.prototype.write=function(t,e){if(this.pos+e>this.buffer.length)throw new Error("Output buffer is not large enough");return this.buffer.set(t.subarray(0,e),this.pos),this.pos+=e,e},e.BrotliOutput=r},function(t,e,n){var r=n(521);e.init=function(){e.dictionary=r.init()},e.offsetsByLength=new Uint32Array([0,0,0,0,0,4096,9216,21504,35840,44032,53248,63488,74752,87040,93696,100864,104704,106752,108928,113536,115968,118528,119872,121280,122016]),e.sizeBitsByLength=new Uint8Array([0,0,0,0,10,10,11,11,10,10,10,10,10,9,9,8,7,7,8,7,7,6,6,5,5]),e.minDictionaryWordLength=4,e.maxDictionaryWordLength=24},function(t,e){function m(t,e){this.bits=t,this.value=e}e.HuffmanCode=m;var b=15;function w(t,e){for(var n=1<<e-1;t&n;)n>>=1;return(t&n-1)+n}function x(t,e,n,r,i){for(;t[e+(r-=n)]=new m(i.bits,i.value),0<r;);}e.BrotliBuildHuffmanTable=function(t,e,n,r,i){for(var o,a,s,l,u,c,h,f,d=e,p=new Int32Array(b+1),g=new Int32Array(b+1),y=new Int32Array(i),v=0;v<i;v++)p[r[v]]++;for(g[1]=0,o=1;o<b;o++)g[o+1]=g[o]+p[o];for(v=0;v<i;v++)0!==r[v]&&(y[g[r[v]]++]=v);if(f=h=1<<n,1===g[b]){for(a=0;a<f;++a)t[e+a]=new m(0,65535&y[0]);return f}for(v=a=0,o=1,s=2;o<=n;++o,s<<=1)for(;0<p[o];--p[o])x(t,e+a,s,h,new m(255&o,65535&y[v++])),a=w(a,o);for(u=f-1,l=-1,o=n+1,s=2;o<=b;++o,s<<=1)for(;0<p[o];--p[o])(a&u)!==l&&(e+=h,f+=h=1<<(c=function(t,e,n){for(var r=1<<e-n;e<b&&!((r-=t[e])<=0);)++e,r<<=1;return e-n}(p,o,n)),t[d+(l=a&u)]=new m(c+n&255,e-d-l&65535)),x(t,e+(a>>n),s,h,new m(o-n&255,65535&y[v++])),a=w(a,o);return f}},function(t,e,n){"use strict";var r,i,o,a,s,l,u,c=n(527),h=n(528),f=n(529),d=f.BK,p=f.CR,g=f.LF,y=f.NL,v=f.CB,m=f.BA,b=f.SP,w=f.WJ;b=f.SP,d=f.BK,g=f.LF,y=f.NL,r=f.AI,i=f.AL,s=f.SA,l=f.SG,u=f.XX,o=f.CJ,f.ID,a=f.NS;function x(t){switch(t){case r:return i;case s:case l:case u:return i;case o:return a;default:return t}}function S(t){switch(t){case g:case y:return d;case v:return m;case b:return w;default:return t}}function _(t,e){void 0===e&&(e=!1),this.position=t,this.required=e}var k=n(530),A=k.DI_BRK,C=k.IN_BRK,P=k.CI_BRK,E=k.CP_BRK,O=(k.PR_BRK,k.pairTable),T=new c(h.toByteArray("AA4IAAAAAAAAAhqg5VV7NJtZvz7fTC8zU5deplUlMrQoWqmqahD5So0aipYWrUhVFSVBQ10iSTtUtW6nKDVF6k7d75eQfEUbFcQ9KiFS90tQEolcP23nrLPmO+esr/+f39rr/a293t/e7/P8nmfvlz0O6RvrBJADtbBNaD88IOKTOmOrCqhu9zE770vc1pBV/xL5dxj2V7Zj4FGSomFKStCWNlV7hG1VabZfZ1LaHbFrRwzzLjzPoi1UHDnlV/lWbhgIIJvLBp/pu7AHEdRnIY+ROdXxg4fNpMdTxVnnm08OjozejAVsBqwqz8kddGRlRxsd8c55dNZoPuex6a7Dt6L0NNb03sqgTlR2/OT7eTt0Y0WnpUXxLsp5SMANc4DsmX4zJUBQvznwexm9tsMH+C9uRYMPOd96ZHB29NZjCIM2nfO7tsmQveX3l2r7ft0N4/SRJ7kO6Y8ZCaeuUQ4gMTZ67cp7TgxvlNDsPgOBdZi2YTam5Q7m3+00l+XG7PrDe6YoPmHgK+yLih7fAR16ZFCeD9WvOVt+gfNW/KT5/M6rb/9KERt+N1lad5RneVjzxXHsLofuU+TvrEsr3+26sVz5WJh6L/svoPK3qepFH9bysDljWtD1F7KrxzW1i9r+e/NLxV/acts7zuo304J9+t3Pd6Y6u8f3EAqxNRgv5DZjaI3unyvkvHPya/v3mWVYOC38qBq11+yHZ2bAyP1HbkV92vdno7r2lxz9UwCdCJVfd14NLcpO2CadHS/XPJ9doXgz5vLv/1OBVS3gX0D9n6LiNIDfpilO9RsLgZ2W/wIy8W/Rh93jfoz4qmRV2xElv6p2lRXQdO6/Cv8f5nGn3u0wLXjhnvClabL1o+7yvIpvLfT/xsKG30y/sTvq30ia9Czxp9dr9v/e7Yn/O0QJXxxBOJmceP/DBFa1q1v6oudn/e6qc/37dUoNvnYL4plQ9OoneYOh/r8fOFm7yl7FETHY9dXd5K2n/qEc53dOEe1TTJcvCfp1dpTC334l0vyaFL6mttNEbFjzO+ZV2mLk0qc3BrxJ4d9gweMmjRorxb7vic0rSq6D4wzAyFWas1TqPE0sLI8XLAryC8tPChaN3ALEZSWmtB34SyZcxXYn/E4Tg0LeMIPhgPKD9zyHGMxxhxnDDih7eI86xECTM8zodUCdgffUmRh4rQ8zyA6ow/Aei+01a8OMfziQQ+GAEkhwN/cqUFYAVzA9ex4n6jgtsiMvXf5BtXxEU4hSphvx3v8+9au8eEekEEpkrkne/zB1M+HAPuXIz3paxKlfe8aDMfGWAX6Md6PuuAdKHFVH++Ed5LEji94Z5zeiJIxbmWeN7rr1/ZcaBl5/nimdHsHgIH/ssyLUXZ4fDQ46HnBb+hQqG8yNiKRrXL/b1IPYDUsu3dFKtRMcjqlRvONd4xBvOufx2cUHuk8pmG1D7PyOQmUmluisVFS9OWS8fPIe8LiCtjwJKnEC9hrS9uKmISI3Wa5+vdXUG9dtyfr7g/oJv2wbzeZU838G6mEvntUb3SVV/fBZ6H/sL+lElzeRrHy2Xbe7UWX1q5sgOQ81rv+2baej4fP4m5Mf/GkoxfDtT3++KP7do9Jn26aa6xAhCf5L9RZVfkWKCcjI1eYbm2plvTEqkDxKC402bGzXCYaGnuALHabBT1dFLuOSB7RorOPEhZah1NjZIgR/UFGfK3p1ElYnevOMBDLURdpIjrI+qZk4sffGbRFiXuEmdFjiAODlQCJvIaB1rW61Ljg3y4eS4LAcSgDxxZQs0DYa15wA032Z+lGUfpoyOrFo3mg1sRQtN/fHHCx3TrM8eTrldMbYisDLXbUDoXMLejSq0fUNuO1muX0gEa8vgyegkqiqqbC3W0S4cC9Kmt8MuS/hFO7Xei3f8rSvIjeveMM7kxjUixOrl6gJshe4JU7PhOHpfrRYvu7yoAZKa3Buyk2J+K5W+nNTz1nhJDhRUfDJLiUXxjxXCJeeaOe/r7HlBP/uURc/5efaZEPxr55Qj39rfTLkugUGyMrwo7HAglfEjDriehF1jXtwJkPoiYkYQ5aoXSA7qbCBGKq5hwtu2VkpI9xVDop/1xrC52eiIvCoPWx4lLl40jm9upvycVPfpaH9/o2D4xKXpeNjE2HPQRS+3RFaYTc4Txw7Dvq5X6JBRwzs9mvoB49BK6b+XgsZVJYiInTlSXZ+62FT18mkFVcPKCJsoF5ahb19WheZLUYsSwdrrVM3aQ2XE6SzU2xHDS6iWkodk5AF6F8WUNmmushi8aVpMPwiIfEiQWo3CApONDRjrhDiVnkaFsaP5rjIJkmsN6V26li5LNM3JxGSyKgomknTyyrhcnwv9Qcqaq5utAh44W30SWo8Q0XHKR0glPF4fWst1FUCnk2woFq3iy9fAbzcjJ8fvSjgKVOfn14RDqyQuIgaGJZuswTywdCFSa89SakMf6fe+9KaQMYQlKxiJBczuPSho4wmBjdA+ag6QUOr2GdpcbSl51Ay6khhBt5UXdrnxc7ZGMxCvz96A4oLocxh2+px+1zkyLacCGrxnPzTRSgrLKpStFpH5ppKWm7PgMKZtwgytKLOjbGCOQLTm+KOowqa1sdut9raj1CZFkZD0jbaKNLpJUarSH5Qknx1YiOxdA5L6d5sfI/unmkSF65Ic/AvtXt98Pnrdwl5vgppQ3dYzWFwknZsy6xh2llmLxpegF8ayLwniknlXRHiF4hzzrgB8jQ4wdIqcaHCEAxyJwCeGkXPBZYSrrGa4vMwZvNN9aK0F4JBOK9mQ8g8EjEbIQVwvfS2D8GuCYsdqwqSWbQrfWdTRUJMqmpnWPax4Z7E137I6brHbvjpPlfNZpF1d7PP7HB/MPHcHVKTMhLO4f3CZcaccZEOiS2DpKiQB5KXDJ+Ospcz4qTRCRxgrKEQIgUkKLTKKwskdx2DWo3bg3PEoB5h2nA24olwfKSR+QR6TAvEDi/0czhUT59RZmO1MGeKGeEfuOSPWfL+XKmhqpZmOVR9mJVNDPKOS49Lq+Um10YsBybzDMtemlPCOJEtE8zaXhsaqEs9bngSJGhlOTTMlCXly9Qv5cRN3PVLK7zoMptutf7ihutrQ/Xj7VqeCdUwleTTKklOI8Wep9h7fCY0kVtDtIWKnubWAvbNZtsRRqOYl802vebPEkZRSZc6wXOfPtpPtN5HI63EUFfsy7U/TLr8NkIzaY3vx4A28x765XZMzRZTpMk81YIMuwJ5+/zoCuZj1wGnaHObxa5rpKZj4WhT670maRw04w0e3cZW74Z0aZe2n05hjZaxm6urenz8Ef5O6Yu1J2aqYAlqsCXs5ZB5o1JJ5l3xkTVr8rJQ09NLsBqRRDT2IIjOPmcJa6xQ1R5yGP9jAsj23xYDTezdyqG8YWZ7vJBIWK56K+iDgcHimiQOTIasNSua1fOBxsKMMEKd15jxTl+3CyvGCR+UyRwuSI2XuwRIPoNNclPihfJhaq2mKkNijwYLY6feqohktukmI3KDvOpN7ItCqHHhNuKlxMfBAEO5LjW2RKh6lE5Hd1dtAOopac/Z4FdsNsjMhXz/ug8JGmbVJTA+VOBJXdrYyJcIn5+OEeoK8kWEWF+wdG8ZtZHKSquWDtDVyhFPkRVqguKFkLkKCz46hcU1SUY9oJ2Sk+dmq0kglqk4kqKT1CV9JDELPjK1WsWGkEXF87g9P98e5ff0mIupm/w6vc3kCeq04X5bgJQlcMFRjlFWmSk+kssXCAVikfeAlMuzpUvCSdXiG+dc6KrIiLxxhbEVuKf7vW7KmDQI95bZe3H9mN3/77F6fZ2Yx/F9yClllj8gXpLWLpd5+v90iOaFa9sd7Pvx0lNa1o1+bkiZ69wCiC2x9UIb6/boBCuNMB/HYR0RC6+FD9Oe5qrgQl6JbXtkaYn0wkdNhROLqyhv6cKvyMj1Fvs2o3OOKoMYTubGENLfY5F6H9d8wX1cnINsvz+wZFQu3zhWVlwJvwBEp69Dqu/ZnkBf3nIfbx4TK7zOVJH5sGJX+IMwkn1vVBn38GbpTg9bJnMcTOb5F6Ci5gOn9Fcy6Qzcu+FL6mYJJ+f2ZZJGda1VqruZ0JRXItp8X0aTjIcJgzdaXlha7q7kV4ebrMsunfsRyRa9qYuryBHA0hc1KVsKdE+oI0ljLmSAyMze8lWmc5/lQ18slyTVC/vADTc+SNM5++gztTBLz4m0aVUKcfgOEExuKVomJ7XQDZuziMDjG6JP9tgR7JXZTeo9RGetW/Xm9/TgPJpTgHACPOGvmy2mDm9fl09WeMm9sQUAXP3Su2uApeCwJVT5iWCXDgmcuTsFgU9Nm6/PusJzSbDQIMfl6INY/OAEvZRN54BSSXUClM51im6Wn9VhVamKJmzOaFJErgJcs0etFZ40LIF3EPkjFTjGmAhsd174NnOwJW8TdJ1Dja+E6Wa6FVS22Haj1DDA474EesoMP5nbspAPJLWJ8rYcP1DwCslhnn+gTFm+sS9wY+U6SogAa9tiwpoxuaFeqm2OK+uozR6SfiLCOPz36LiDlzXr6UWd7BpY6mlrNANkTOeme5EgnnAkQRTGo9T6iYxbUKfGJcI9B+ub2PcyUOgpwXbOf3bHFWtygD7FYbRhb+vkzi87dB0JeXl/vBpBUz93VtqZi7AL7C1VowTF+tGmyurw7DBcktc+UMY0E10Jw4URojf8NdaNpN6E1q4+Oz+4YePtMLy8FPRP")),I=function(){function t(t){this.string=t,this.pos=0,this.lastPos=0,this.curClass=null,this.nextClass=null}var e=t.prototype;return e.nextCodePoint=function(){var t=this.string.charCodeAt(this.pos++),e=this.string.charCodeAt(this.pos);return 55296<=t&&t<=56319&&56320<=e&&e<=57343?(this.pos++,1024*(t-55296)+(e-56320)+65536):t},e.nextCharClass=function(){return x(T.get(this.nextCodePoint()))},e.nextBreak=function(){for(null==this.curClass&&(this.curClass=S(this.nextCharClass()));this.pos<this.string.length;){this.lastPos=this.pos;var t=this.nextClass;if(this.nextClass=this.nextCharClass(),this.curClass===d||this.curClass===p&&this.nextClass!==g)return this.curClass=S(x(this.nextClass)),new _(this.lastPos,!0);var e=void 0;switch(this.nextClass){case b:e=this.curClass;break;case d:case g:case y:e=d;break;case p:e=p;break;case v:e=m}if(null==e){var n=!1;switch(O[this.curClass][this.nextClass]){case A:n=!0;break;case C:n=t===b;break;case P:if(!(n=t===b))continue;break;case E:if(t!==b)continue}if(this.curClass=this.nextClass,n)return new _(this.lastPos)}else if(this.curClass=e,this.nextClass===v)return new _(this.lastPos)}if(this.pos>=this.string.length)return this.lastPos<this.string.length?(this.lastPos=this.string.length,new _(this.string.length)):null},t}();t.exports=I},function(t,e,n){"use strict";function r(){this.events={}}r.prototype.startTracking=function(t,e){var n=this.events[t]||(this.events[t]=[]);n.indexOf(e)<0&&n.push(e)},r.prototype.stopTracking=function(t,e){var n,r=this.events[t];!r||0<=(n=r.indexOf(e))&&r.splice(n,1)},r.prototype.emit=function(t){var e=Array.prototype.slice.call(arguments,1),n=this.events[t];n&&n.forEach(function(t){t.apply(this,e)})},r.prototype.auto=function(t,e,n){this.startTracking(t,e),n(),this.stopTracking(t,e)},t.exports=r},function(t,e,n){"use strict";var a=n(0).isString,s=n(0).isArray,l=n(0).isUndefined,u=n(0).isNull;function r(t,e){this.defaultStyle=e||{},this.styleDictionary=t,this.styleOverrides=[]}r.prototype.clone=function(){var e=new r(this.styleDictionary,this.defaultStyle);return this.styleOverrides.forEach(function(t){e.styleOverrides.push(t)}),e},r.prototype.push=function(t){this.styleOverrides.push(t)},r.prototype.pop=function(t){for(t=t||1;0<t--;)this.styleOverrides.pop()},r.prototype.autopush=function(e){if(a(e))return 0;var t=[];e.style&&(t=s(e.style)?e.style:[e.style]);for(var n=0,r=t.length;n<r;n++)this.push(t[n]);var i={},o=!1;return["font","fontSize","fontFeatures","bold","italics","alignment","color","columnGap","fillColor","fillOpacity","decoration","decorationStyle","decorationColor","background","lineHeight","characterSpacing","noWrap","markerColor","leadingIndent"].forEach(function(t){l(e[t])||u(e[t])||(i[t]=e[t],o=!0)}),o&&this.push(i),t.length+(o?1:0)},r.prototype.auto=function(t,e){var n=this.autopush(t),r=e();return 0<n&&this.pop(n),r},r.prototype.getProperty=function(t){if(this.styleOverrides)for(var e=this.styleOverrides.length-1;0<=e;e--){var n=this.styleOverrides[e];if(a(n)){var r=this.styleDictionary[n];if(r&&!l(r[t])&&!u(r[t]))return r[t]}else if(!l(n[t])&&!u(n[t]))return n[t]}return this.defaultStyle&&this.defaultStyle[t]},t.exports=r},function(t,e,n){"use strict";var r=n(291),i=n(0).isString;function o(t,e){this.pages=[],this.pageMargins=e,this.x=e.left,this.availableWidth=t.width-e.left-e.right,this.availableHeight=0,this.page=-1,this.snapshots=[],this.endingCell=null,this.tracker=new r,this.backgroundLength=[],this.addPage(t)}o.prototype.beginColumnGroup=function(){this.snapshots.push({x:this.x,y:this.y,availableHeight:this.availableHeight,availableWidth:this.availableWidth,page:this.page,bottomMost:{x:this.x,y:this.y,availableHeight:this.availableHeight,availableWidth:this.availableWidth,page:this.page},endingCell:this.endingCell,lastColumnWidth:this.lastColumnWidth}),this.lastColumnWidth=0},o.prototype.beginColumn=function(t,e,n){var r=this.snapshots[this.snapshots.length-1];this.calculateBottomMost(r),this.endingCell=n,this.page=r.page,this.x=this.x+this.lastColumnWidth+(e||0),this.y=r.y,this.availableWidth=t,this.availableHeight=r.availableHeight,this.lastColumnWidth=t},o.prototype.calculateBottomMost=function(t){this.endingCell?(this.saveContextInEndingCell(this.endingCell),this.endingCell=null):t.bottomMost=function(t,e){var n;n=t.page>e.page||!(e.page>t.page)&&t.y>e.y?t:e;return{page:n.page,x:n.x,y:n.y,availableHeight:n.availableHeight,availableWidth:n.availableWidth}}(this,t.bottomMost)},o.prototype.markEnding=function(t){this.page=t._columnEndingContext.page,this.x=t._columnEndingContext.x,this.y=t._columnEndingContext.y,this.availableWidth=t._columnEndingContext.availableWidth,this.availableHeight=t._columnEndingContext.availableHeight,this.lastColumnWidth=t._columnEndingContext.lastColumnWidth},o.prototype.saveContextInEndingCell=function(t){t._columnEndingContext={page:this.page,x:this.x,y:this.y,availableHeight:this.availableHeight,availableWidth:this.availableWidth,lastColumnWidth:this.lastColumnWidth}},o.prototype.completeColumnGroup=function(t){var e=this.snapshots.pop();this.calculateBottomMost(e),this.endingCell=null,this.x=e.x;var n=e.bottomMost.y;t&&(e.page===e.bottomMost.page?e.y+t>n&&(n=e.y+t):n+=t),this.y=n,this.page=e.bottomMost.page,this.availableWidth=e.availableWidth,this.availableHeight=e.bottomMost.availableHeight,t&&(this.availableHeight-=n-e.bottomMost.y),this.lastColumnWidth=e.lastColumnWidth},o.prototype.addMargin=function(t,e){this.x+=t,this.availableWidth-=t+(e||0)},o.prototype.moveDown=function(t){return this.y+=t,this.availableHeight-=t,0<this.availableHeight},o.prototype.initializePage=function(){this.y=this.pageMargins.top,this.availableHeight=this.getCurrentPage().pageSize.height-this.pageMargins.top-this.pageMargins.bottom,this.pageSnapshot().availableWidth=this.getCurrentPage().pageSize.width-this.pageMargins.left-this.pageMargins.right},o.prototype.pageSnapshot=function(){return this.snapshots[0]?this.snapshots[0]:this},o.prototype.moveTo=function(t,e){null!=t&&(this.x=t,this.availableWidth=this.getCurrentPage().pageSize.width-this.x-this.pageMargins.right),null!=e&&(this.y=e,this.availableHeight=this.getCurrentPage().pageSize.height-this.y-this.pageMargins.bottom)},o.prototype.moveToRelative=function(t,e){null!=t&&(this.x=this.x+t),null!=e&&(this.y=this.y+e)},o.prototype.beginDetachedBlock=function(){this.snapshots.push({x:this.x,y:this.y,availableHeight:this.availableHeight,availableWidth:this.availableWidth,page:this.page,endingCell:this.endingCell,lastColumnWidth:this.lastColumnWidth})},o.prototype.endDetachedBlock=function(){var t=this.snapshots.pop();this.x=t.x,this.y=t.y,this.availableWidth=t.availableWidth,this.availableHeight=t.availableHeight,this.page=t.page,this.endingCell=t.endingCell,this.lastColumnWidth=t.lastColumnWidth};function l(t,e){var n,r;return n=e,r=t.pageSize.orientation,(e=void 0===n?r:i(n)&&"landscape"===n.toLowerCase()?"landscape":"portrait")!==t.pageSize.orientation?{orientation:e,width:t.pageSize.height,height:t.pageSize.width}:{orientation:t.pageSize.orientation,width:t.pageSize.width,height:t.pageSize.height}}o.prototype.moveToNextPage=function(t){var e,n,r,i=this.page+1,o=this.page,a=this.y,s=i>=this.pages.length;return s?(e=this.availableWidth,n=this.getCurrentPage().pageSize.orientation,r=l(this.getCurrentPage(),t),this.addPage(r),n===r.orientation&&(this.availableWidth=e)):(this.page=i,this.initializePage()),{newPageCreated:s,prevPage:o,prevY:a,y:this.y}},o.prototype.addPage=function(t){var e={items:[],pageSize:t};return this.pages.push(e),this.backgroundLength.push(0),this.page=this.pages.length-1,this.initializePage(),this.tracker.emit("pageAdded"),e},o.prototype.getCurrentPage=function(){return this.page<0||this.page>=this.pages.length?null:this.pages[this.page]},o.prototype.getCurrentPosition=function(){var t=this.getCurrentPage().pageSize,e=t.height-this.pageMargins.top-this.pageMargins.bottom,n=t.width-this.pageMargins.left-this.pageMargins.right;return{pageNumber:this.page+1,pageOrientation:t.orientation,pageInnerHeight:e,pageInnerWidth:n,left:this.x,top:this.y,verticalRatio:(this.y-this.pageMargins.top)/e,horizontalRatio:(this.x-this.pageMargins.left)/n}},t.exports=o},function(t,e,n){"use strict";function r(t){this.maxWidth=t,this.leadingCut=0,this.trailingCut=0,this.inlineWidths=0,this.inlines=[]}r.prototype.getAscenderHeight=function(){var e=0;return this.inlines.forEach(function(t){e=Math.max(e,t.font.ascender/1e3*t.fontSize)}),e},r.prototype.hasEnoughSpaceForInline=function(t,e){if(e=e||[],0===this.inlines.length)return!0;if(this.newLineForced)return!1;var n=t.width,r=t.trailingCut||0;if(t.noNewLine)for(var i=0,o=e.length;i<o;i++){var a=e[i];if(n+=a.width,r+=a.trailingCut||0,!a.noNewLine)break}return this.inlineWidths+n-this.leadingCut-r<=this.maxWidth},r.prototype.addInline=function(t){0===this.inlines.length&&(this.leadingCut=t.leadingCut||0),this.trailingCut=t.trailingCut||0,t.x=this.inlineWidths-this.leadingCut,this.inlines.push(t),this.inlineWidths+=t.width,t.lineEnd&&(this.newLineForced=!0)},r.prototype.getWidth=function(){return this.inlineWidths-this.leadingCut-this.trailingCut},r.prototype.getAvailableWidth=function(){return this.maxWidth-this.getWidth()},r.prototype.getHeight=function(){var e=0;return this.inlines.forEach(function(t){e=Math.max(e,t.height||0)}),e},t.exports=r},function(t,e,n){var r=n(3);t.exports=r.Promise},function(t,e,n){function r(t){var e;k.hasOwnProperty(t)&&(e=k[t],delete k[t],e())}function i(t){return function(){r(t)}}function o(t){r(t.data)}function a(t){c.postMessage(t+"",v.protocol+"//"+v.host)}var s,l,u,c=n(3),h=n(4),f=n(30),d=n(96),p=n(203),g=n(136),y=n(297),v=c.location,m=c.setImmediate,b=c.clearImmediate,w=c.process,x=c.MessageChannel,S=c.Dispatch,_=0,k={},A="onreadystatechange";m&&b||(m=function(t){for(var e=[],n=1;n<arguments.length;)e.push(arguments[n++]);return k[++_]=function(){("function"==typeof t?t:Function(t)).apply(void 0,e)},s(_),_},b=function(t){delete k[t]},"process"==f(w)?s=function(t){w.nextTick(i(t))}:S&&S.now?s=function(t){S.now(i(t))}:x&&!y?(u=(l=new x).port2,l.port1.onmessage=o,s=d(u.postMessage,u,1)):!c.addEventListener||"function"!=typeof postMessage||c.importScripts||h(a)||"file:"===v.protocol?s=A in g("script")?function(t){p.appendChild(g("script"))[A]=function(){p.removeChild(this),r(t)}}:function(t){setTimeout(i(t),0)}:(s=a,c.addEventListener("message",o,!1))),t.exports={set:m,clear:b}},function(t,e,n){var r=n(210);t.exports=/(iphone|ipod|ipad).*applewebkit/i.test(r)},function(t,e,n){var r=n(16),i=n(13),o=n(109);t.exports=function(t,e){if(r(t),i(e)&&e.constructor===t)return e;var n=o.f(t);return(0,n.resolve)(e),n.promise}},function(t,e,n){"use strict";var r=n(1),u=n(44),i=n(109),o=n(135),c=n(134);r({target:"Promise",stat:!0},{allSettled:function(t){var s=this,e=i.f(s),l=e.resolve,n=e.reject,r=o(function(){var r=u(s.resolve),i=[],o=0,a=1;c(t,function(t){var e=o++,n=!1;i.push(void 0),a++,r.call(s,t).then(function(t){n||(n=!0,i[e]={status:"fulfilled",value:t},--a||l(i))},function(t){n||(n=!0,i[e]={status:"rejected",reason:t},--a||l(i))})}),--a||l(i)});return r.error&&n(r.value),e.promise}})},function(t,e,n){var r=n(301),i=n(560);void 0===i.pdfMake&&(i.pdfMake=r),t.exports=r},function(t,e,c){"use strict";(function(i,o){var a=c(0).isFunction,r=c(0).isUndefined,s=(c(0).isNull,c(304).saveAs),l={Roboto:{normal:"Roboto-Regular.ttf",bold:"Roboto-Medium.ttf",italics:"Roboto-Italic.ttf",bolditalics:"Roboto-MediumItalic.ttf"}};function u(t,e,n,r){this.docDefinition=t,this.tableLayouts=e||null,this.fonts=n||l,this.vfs=r}u.prototype._createDoc=function(e,n){e=e||{},this.tableLayouts&&(e.tableLayouts=this.tableLayouts);var r=new(c(305))(this.fonts);if(c(91).bindFS(this.vfs),!a(n))return r.createPdfKitDocument(this.docDefinition,e);var t=new(c(546))(c(91));for(var i in this.fonts)this.fonts.hasOwnProperty(i)&&(this.fonts[i].normal&&t.resolve(this.fonts[i].normal),this.fonts[i].bold&&t.resolve(this.fonts[i].bold),this.fonts[i].italics&&t.resolve(this.fonts[i].italics),this.fonts[i].bolditalics&&t.resolve(this.fonts[i].bolditalics));var o=this;t.resolved().then(function(){var t=r.createPdfKitDocument(o.docDefinition,e);n(t)},function(t){throw t})},u.prototype._flushDoc=function(e,t){var n,r=[];e.on("readable",function(){for(var t;null!==(t=e.read(9007199254740991));)r.push(t)}),e.on("end",function(){n=i.concat(r),t(n,e._pdfMakePages)}),e.end()},u.prototype._getPages=function(t,n){if(!n)throw"_getPages is an async method and needs a callback argument";var e=this;this._createDoc(t,function(t){e._flushDoc(t,function(t,e){n(e)})})},u.prototype._bufferToBlob=function(e){var n,r;try{n=new Blob([e],{type:"application/pdf"})}catch(t){"InvalidStateError"===t.name&&(r=new Uint8Array(e),n=new Blob([r.buffer],{type:"application/pdf"}))}if(!n)throw"Could not generate blob";return n},u.prototype._openWindow=function(){var t=window.open("","_blank");if(null===t)throw"Open PDF in new window blocked by browser";return t},u.prototype._openPdf=function(t,n){n=n||this._openWindow();try{this.getBlob(function(t){var e=(window.URL||window.webkitURL).createObjectURL(t);n.location.href=e},t)}catch(t){throw n.close(),t}},u.prototype.open=function(t,e){(t=t||{}).autoPrint=!1,e=e||null,this._openPdf(t,e)},u.prototype.print=function(t,e){(t=t||{}).autoPrint=!0,e=e||null,this._openPdf(t,e)},u.prototype.download=function(e,n,t){a(e)&&(r(n)||(t=n),n=e,e=null),e=e||"file.pdf",this.getBlob(function(t){s(t,e),a(n)&&n()},t)},u.prototype.getBase64=function(e,t){if(!e)throw"getBase64 is an async method and needs a callback argument";this.getBuffer(function(t){e(t.toString("base64"))},t)},u.prototype.getDataUrl=function(e,t){if(!e)throw"getDataUrl is an async method and needs a callback argument";this.getBuffer(function(t){e("data:application/pdf;base64,"+t.toString("base64"))},t)},u.prototype.getBlob=function(n,t){if(!n)throw"getBlob is an async method and needs a callback argument";var r=this;this.getBuffer(function(t){var e=r._bufferToBlob(t);n(e)},t)},u.prototype.getBuffer=function(e,t){if(!e)throw"getBuffer is an async method and needs a callback argument";var n=this;this._createDoc(t,function(t){n._flushDoc(t,function(t){e(t)})})},u.prototype.getStream=function(t,e){if(!a(e))return this._createDoc(t);this._createDoc(t,function(t){e(t)})},t.exports={createPdf:function(t,e,n,r){if(!Object.keys||"undefined"==typeof Uint16Array)throw"Your browser does not provide the level of support needed";return new u(t,e||o.pdfMake.tableLayouts,n||o.pdfMake.fonts,r||o.pdfMake.vfs)}}}).call(this,c(10).Buffer,c(26))},function(t,e,n){"use strict";e.byteLength=function(t){var e=h(t),n=e[0],r=e[1];return 3*(n+r)/4-r},e.toByteArray=function(t){var e,n,r=h(t),i=r[0],o=r[1],a=new c(function(t,e){return 3*(t+e)/4-e}(i,o)),s=0,l=0<o?i-4:i;for(n=0;n<l;n+=4)e=u[t.charCodeAt(n)]<<18|u[t.charCodeAt(n+1)]<<12|u[t.charCodeAt(n+2)]<<6|u[t.charCodeAt(n+3)],a[s++]=e>>16&255,a[s++]=e>>8&255,a[s++]=255&e;2===o&&(e=u[t.charCodeAt(n)]<<2|u[t.charCodeAt(n+1)]>>4,a[s++]=255&e);1===o&&(e=u[t.charCodeAt(n)]<<10|u[t.charCodeAt(n+1)]<<4|u[t.charCodeAt(n+2)]>>2,a[s++]=e>>8&255,a[s++]=255&e);return a},e.fromByteArray=function(t){for(var e,n=t.length,r=n%3,i=[],o=0,a=n-r;o<a;o+=16383)i.push(function(t,e,n){for(var r,i=[],o=e;o<n;o+=3)r=(t[o]<<16&16711680)+(t[o+1]<<8&65280)+(255&t[o+2]),i.push(function(t){return s[t>>18&63]+s[t>>12&63]+s[t>>6&63]+s[63&t]}(r));return i.join("")}(t,o,a<o+16383?a:o+16383));1==r?(e=t[n-1],i.push(s[e>>2]+s[e<<4&63]+"==")):2==r&&(e=(t[n-2]<<8)+t[n-1],i.push(s[e>>10]+s[e>>4&63]+s[e<<2&63]+"="));return i.join("")};for(var s=[],u=[],c="undefined"!=typeof Uint8Array?Uint8Array:Array,r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",i=0,o=r.length;i<o;++i)s[i]=r[i],u[r.charCodeAt(i)]=i;function h(t){var e=t.length;if(0<e%4)throw new Error("Invalid string. Length must be a multiple of 4");var n=t.indexOf("=");return-1===n&&(n=e),[n,n===e?0:4-n%4]}u["-".charCodeAt(0)]=62,u["_".charCodeAt(0)]=63},function(t,e){e.read=function(t,e,n,r,i){var o,a,s=8*i-r-1,l=(1<<s)-1,u=l>>1,c=-7,h=n?i-1:0,f=n?-1:1,d=t[e+h];for(h+=f,o=d&(1<<-c)-1,d>>=-c,c+=s;0<c;o=256*o+t[e+h],h+=f,c-=8);for(a=o&(1<<-c)-1,o>>=-c,c+=r;0<c;a=256*a+t[e+h],h+=f,c-=8);if(0===o)o=1-u;else{if(o===l)return a?NaN:1/0*(d?-1:1);a+=Math.pow(2,r),o-=u}return(d?-1:1)*a*Math.pow(2,o-r)},e.write=function(t,e,n,r,i,o){var a,s,l,u=8*o-i-1,c=(1<<u)-1,h=c>>1,f=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,d=r?0:o-1,p=r?1:-1,g=e<0||0===e&&1/e<0?1:0;for(e=Math.abs(e),isNaN(e)||e===1/0?(s=isNaN(e)?1:0,a=c):(a=Math.floor(Math.log(e)/Math.LN2),e*(l=Math.pow(2,-a))<1&&(a--,l*=2),2<=(e+=1<=a+h?f/l:f*Math.pow(2,1-h))*l&&(a++,l/=2),c<=a+h?(s=0,a=c):1<=a+h?(s=(e*l-1)*Math.pow(2,i),a+=h):(s=e*Math.pow(2,h-1)*Math.pow(2,i),a=0));8<=i;t[n+d]=255&s,d+=p,s/=256,i-=8);for(a=a<<i|s,u+=i;0<u;t[n+d]=255&a,d+=p,a/=256,u-=8);t[n+d-p]|=128*g}},function(l,i,t){(function(t){var e,n,r;n=[],void 0===(r="function"==typeof(e=function(){"use strict";function i(t,e){return"undefined"==typeof e?e={autoBom:!1}:"object"!=typeof e&&(console.warn("Deprecated: Expected third argument to be a object"),e={autoBom:!e}),e.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type)?new Blob(["\ufeff",t],{type:t.type}):t}function c(t,e,n){var r=new XMLHttpRequest;r.open("GET",t),r.responseType="blob",r.onload=function(){s(r.response,e,n)},r.onerror=function(){console.error("could not download file")},r.send()}function o(t){var e=new XMLHttpRequest;e.open("HEAD",t,!1);try{e.send()}catch(t){}return 200<=e.status&&299>=e.status}function a(e){try{e.dispatchEvent(new MouseEvent("click"))}catch(t){var n=document.createEvent("MouseEvents");n.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),e.dispatchEvent(n)}}var h="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof t&&t.global===t?t:void 0,s=h.saveAs||("object"!=typeof window||window!==h?function(){}:typeof HTMLAnchorElement!=="undefined"&&"download"in HTMLAnchorElement.prototype?function(t,e,n){var r=h.URL||h.webkitURL,i=document.createElement("a");e=e||t.name||"download",i.download=e,i.rel="noopener","string"==typeof t?(i.href=t,i.origin===location.origin?a(i):o(i.href)?c(t,e,n):a(i,i.target="_blank")):(i.href=r.createObjectURL(t),setTimeout(function(){r.revokeObjectURL(i.href)},4e4),setTimeout(function(){a(i)},0))}:"msSaveOrOpenBlob"in navigator?function(t,e,n){if(e=e||t.name||"download","string"!=typeof t)navigator.msSaveOrOpenBlob(i(t,n),e);else if(o(t))c(t,e,n);else{var r=document.createElement("a");r.href=t,r.target="_blank",setTimeout(function(){a(r)})}}:function(t,e,n,r){if(r=r||open("","_blank"),r&&(r.document.title=r.document.body.innerText="downloading..."),"string"==typeof t)return c(t,e,n);var i="application/octet-stream"===t.type,o=/constructor/i.test(h.HTMLElement)||h.safari,a=/CriOS\/[\d]+/.test(navigator.userAgent);if((a||i&&o)&&"object"==typeof FileReader){var s=new FileReader;s.onloadend=function(){var t=s.result;t=a?t:t.replace(/^data:[^;]*;/,"data:attachment/file;"),r?r.location.href=t:location=t,r=null},s.readAsDataURL(t)}else{var l=h.URL||h.webkitURL,u=l.createObjectURL(t);r?r.location=u:location.href=u,r=null,setTimeout(function(){l.revokeObjectURL(u)},4e4)}});h.saveAs=s.saveAs=s,true&&(l.exports=s)})?e.apply(i,n):e)||(l.exports=r)}).call(this,t(26))},function(t,e,n){"use strict";var d=n(306),p=n(532),g=n(533),y=n(540),v=n(541),m=n(542),b=n(543),w=n(194),x=n(0).isFunction,S=n(0).isString,_=n(0).isNumber,k=n(0).isBoolean,r=n(0).isArray,A=n(0).isUndefined,C=function(){try{return n(544)}catch(t){throw new Error("Please install svg-to-pdfkit to enable svg nodes")}},P=function(t,e,n){for(var r=0;r<e.length;r++){var i=e[r].toLowerCase();for(var o in t)if(o.toLowerCase()===i)return o}return n};function i(t){this.fontDescriptors=t}function E(t){if(_(t))t={left:t,right:t,top:t,bottom:t};else if(r(t))if(2===t.length)t={left:t[0],top:t[1],right:t[0],bottom:t[1]};else{if(4!==t.length)throw"Invalid pageMargins definition";t={left:t[0],top:t[1],right:t[2],bottom:t[3]}}return t}i.prototype.createPdfKitDocument=function(t,e){e=e||{},t.version=t.version||"1.3",t.compress=!k(t.compress)||t.compress,t.images=t.images||{},t.pageMargins=void 0!==t.pageMargins&&null!==t.pageMargins?t.pageMargins:40;var n=function(t,e){t&&"auto"===t.height&&(t.height=1/0);var n=function(t){if(S(t)){var e=y[t.toUpperCase()];if(!e)throw"Page size "+t+" not recognized";return{width:e[0],height:e[1]}}return t}(t||"A4");!function(t){return S(t)&&("portrait"===(t=t.toLowerCase())&&n.width>n.height||"landscape"===t&&n.width<n.height)}(e)||(n={width:n.height,height:n.width});return n.orientation=n.width>n.height?"landscape":"portrait",n}(t.pageSize,t.pageOrientation),r={size:[n.width,n.height],pdfVersion:t.version,compress:t.compress,userPassword:t.userPassword,ownerPassword:t.ownerPassword,permissions:t.permissions,fontLayoutCache:!k(e.fontLayoutCache)||e.fontLayoutCache,bufferPages:e.bufferPages||!1,autoFirstPage:!1,font:null};this.pdfKitDoc=d.createPdfDocument(r),function(t,e){if(e.info.Producer="pdfmake",e.info.Creator="pdfmake",t.info)for(var n in t.info){var r=t.info[n];r&&(n=function(t){var e=t.charAt(0).toUpperCase()+t.slice(1);return-1!==["Title","Author","Subject","Keywords","Creator","Producer","CreationDate","ModDate","Trapped"].indexOf(e)?e:t.replace(/\s+/g,"")}(n),e.info[n]=r)}}(t,this.pdfKitDoc),this.fontProvider=new p(this.fontDescriptors,this.pdfKitDoc);var i=new g(n,E(t.pageMargins),new v(this.pdfKitDoc,t.images),new m);i.registerTableLayouts({noBorders:{hLineWidth:function(t){return 0},vLineWidth:function(t){return 0},paddingLeft:function(t){return t?4:0},paddingRight:function(t,e){return t<e.table.widths.length-1?4:0}},headerLineOnly:{hLineWidth:function(t,e){return 0!==t&&t!==e.table.body.length&&t===e.table.headerRows?2:0},vLineWidth:function(t){return 0},paddingLeft:function(t){return 0===t?0:8},paddingRight:function(t,e){return t===e.table.widths.length-1?0:8}},lightHorizontalLines:{hLineWidth:function(t,e){return 0===t||t===e.table.body.length?0:t===e.table.headerRows?2:1},vLineWidth:function(t){return 0},hLineColor:function(t){return 1===t?"black":"#aaa"},paddingLeft:function(t){return 0===t?0:8},paddingRight:function(t,e){return t===e.table.widths.length-1?0:8}}}),e.tableLayouts&&i.registerTableLayouts(e.tableLayouts);var o,a,s,l,u,c,h=i.layoutDocument(t.content,this.fontProvider,t.styles||{},t.defaultStyle||{fontSize:12,font:"Roboto"},t.background,t.header,t.footer,t.images,t.watermark,t.pageBreakBefore),f=t.maxPagesNumber||-1;return _(f)&&-1<f&&(h=h.slice(0,f)),n.height===1/0&&(a=h,s=t.pageMargins,l=E(s||40),u=l.top,a.forEach(function(t){t.items.forEach(function(t){var e,n,r,i=(n=(e=t).item.y,r=function(t){return x(t.item.getHeight)?t.item.getHeight():t.item._height?t.item._height:0}(e),n+r);u<i&&(u=i)})}),o=u+=l.bottom,this.pdfKitDoc.options.size=[n.width,o]),function(t,e,n,r){n._pdfMakePages=t,n.addPage();var i=0;r&&t.forEach(function(t){i+=t.items.length});var o=0;r=r||function(){};for(var a=0;a<t.length;a++){0<a&&(function(t,e){var n=e.options.size[0]>e.options.size[1]?"landscape":"portrait";{var r,i;t.pageSize.orientation!==n&&(r=e.options.size[0],i=e.options.size[1],e.options.size=[i,r])}}(t[a],n),n.addPage(n.options));for(var s=t[a],l=0,u=s.items.length;l<u;l++){var c=s.items[l];switch(c.type){case"vector":!function(t,e){e.lineWidth(t.lineWidth||1),t.dash?e.dash(t.dash.length,{space:t.dash.space||t.dash.length,phase:t.dash.phase||0}):e.undash();e.lineJoin(t.lineJoin||"miter"),e.lineCap(t.lineCap||"butt");var n=null;switch(t.type){case"ellipse":e.ellipse(t.x,t.y,t.r1,t.r2),t.linearGradient&&(n=e.linearGradient(t.x-t.r1,t.y,t.x+t.r1,t.y));break;case"rect":t.r?e.roundedRect(t.x,t.y,t.w,t.h,t.r):e.rect(t.x,t.y,t.w,t.h),t.linearGradient&&(n=e.linearGradient(t.x,t.y,t.x+t.w,t.y));break;case"line":e.moveTo(t.x1,t.y1),e.lineTo(t.x2,t.y2);break;case"polyline":if(0===t.points.length)break;e.moveTo(t.points[0].x,t.points[0].y);for(var r,i,o=1,a=t.points.length;o<a;o++)e.lineTo(t.points[o].x,t.points[o].y);1<t.points.length&&(r=t.points[0],i=t.points[t.points.length-1],(t.closePath||r.x===i.x&&r.y===i.y)&&e.closePath());break;case"path":e.path(t.d)}if(t.linearGradient&&n){for(var s=1/(t.linearGradient.length-1),o=0;o<t.linearGradient.length;o++)n.stop(o*s,t.linearGradient[o]);t.color=n}var l=_(t.fillOpacity)?t.fillOpacity:1,u=_(t.strokeOpacity)?t.strokeOpacity:1;t.color&&t.lineColor?(e.fillColor(t.color,l),e.strokeColor(t.lineColor,u),e.fillAndStroke()):t.color?(e.fillColor(t.color,l),e.fill()):(e.strokeColor(t.lineColor||"black",u),e.stroke())}(c.item,n);break;case"line":!function(t,e,n,r){function i(t,e){var n,r,i=new w(null);if(A(t.positions))throw"Page reference id not found";var o=t.positions[0].pageNumber.toString();switch(e.text=o,n=i.widthOfString(e.text,e.font,e.fontSize,e.characterSpacing,e.fontFeatures),r=e.width-n,e.width=n,e.alignment){case"right":e.x+=r;break;case"center":e.x+=r/2}}t._pageNodeRef&&i(t._pageNodeRef,t.inlines[0]);e=e||0,n=n||0;var o=t.getHeight(),a=t.getAscenderHeight(),s=o-a;b.drawBackground(t,e,n,r);for(var l=0,u=t.inlines.length;l<u;l++){var c=t.inlines[l],h=o-c.font.ascender/1e3*c.fontSize-s;c._pageNodeRef&&i(c._pageNodeRef,c);var f={lineBreak:!1,textWidth:c.width,characterSpacing:c.characterSpacing,wordCount:1,link:c.link};c.linkToDestination&&(f.goTo=c.linkToDestination),t.id&&0===l&&(f.destination=t.id),c.fontFeatures&&(f.features=c.fontFeatures);var d=_(c.opacity)?c.opacity:1;r.opacity(d),r.fill(c.color||"black"),r._font=c.font,r.fontSize(c.fontSize),r.text(c.text,e+c.x,n+h,f),c.linkToPage&&(r.ref({Type:"Action",S:"GoTo",D:[c.linkToPage,0,0]}).end(),r.annotate(e+c.x,n+h,c.width,c.height,{Subtype:"Link",Dest:[c.linkToPage-1,"XYZ",null,null,null]}))}b.drawDecorations(t,e,n,r)}(c.item,c.item.x,c.item.y,n);break;case"image":!function(t,e){var n=_(t.opacity)?t.opacity:1;e.opacity(n),e.image(t.image,t.x,t.y,{width:t._width,height:t._height}),t.link&&e.link(t.x,t.y,t._width,t._height,t.link);t.linkToPage&&(e.ref({Type:"Action",S:"GoTo",D:[t.linkToPage,0,0]}).end(),e.annotate(t.x,t.y,t._width,t._height,{Subtype:"Link",Dest:[t.linkToPage-1,"XYZ",null,null,null]}));t.linkToDestination&&e.goTo(t.x,t.y,t._width,t._height,t.linkToDestination)}(c.item,(c.item.x,c.item.y,n));break;case"svg":!function(s,t,l){var e=Object.assign({width:s._width,height:s._height,assumePt:!0},s.options);e.fontCallback=function(t,e,n){var r=t.split(",").map(function(t){return t.trim().replace(/('|")/g,"")}),i=P(l.fonts,r,s.font||"Roboto"),o=l.getFontFile(i,e,n);if(null!==o)return o;var a=l.getFontType(e,n);throw new Error("Font '"+i+"' in style '"+a+"' is not defined in the font section of the document definition.")},C()(t,s.svg,s.x,s.y,e)}(c.item,(c.item.x,c.item.y,n),e);break;case"beginClip":!function(t,e){e.save(),e.addContent(t.x+" "+t.y+" "+t.width+" "+t.height+" re"),e.clip()}(c.item,n);break;case"endClip":n.restore()}r(++o/i)}s.watermark&&function(t,e){var n=t.watermark;e.fill(n.color),e.opacity(n.opacity),e.save(),e.rotate(n.angle,{origin:[e.page.width/2,e.page.height/2]});var r=e.page.width/2-n._size.size.width/2,i=e.page.height/2-n._size.size.height/2;e._font=n.font,e.fontSize(n.fontSize),e.text(n.text,r,i,{lineBreak:!1}),e.restore()}(s,n)}}(h,this.fontProvider,this.pdfKitDoc,e.progressCallback),e.autoPrint&&(c=this.pdfKitDoc.ref({Type:"Action",S:"Named",N:"Print"}),(this.pdfKitDoc._root.data.OpenAction=c).end()),this.pdfKitDoc},t.exports=i},function(t,e,n){"use strict";var r,i=(r=n(307))&&"object"==typeof r&&"default"in r?r.default:r;t.exports={getEngineInstance:function(){return i},createPdfDocument:function(t){return new i(t=t||{})}}},function(t,re,ie){"use strict";(function(g,t){ie(197),ie(207),ie(208),ie(209),ie(312),ie(211),ie(313),ie(314),ie(213),ie(215),ie(28),ie(219),ie(318),ie(46),ie(319),ie(320),ie(60),ie(155),ie(223),ie(322),ie(324),ie(326),ie(227),ie(327),ie(32),ie(118),ie(229),ie(330),ie(331),ie(157),ie(158),ie(230),ie(231),ie(232),ie(233),ie(334),ie(61),ie(62),ie(63),ie(64),ie(65),ie(66),ie(67),ie(68),ie(69),ie(70),ie(71),ie(72),ie(73),ie(74),ie(75),ie(76),ie(77),ie(78),ie(79),ie(80),ie(81),ie(82),ie(83),ie(84),ie(340),ie(120),Object.defineProperty(re,"__esModule",{value:!0}),re.default=void 0;var e=i(ie(162)),f=i(ie(244)),z=i(ie(362)),o=i(ie(386)),n=ie(121),p=i(ie(290)),r=i(ie(531));function i(t){return t&&t.__esModule?t:{default:t}}var s=ie(91);function u(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function c(t,e,n){return e&&a(t.prototype,e),n&&a(t,n),t}function h(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&l(t,e)}function d(t){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function l(t,e){return(l=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function y(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function v(t,e){return!e||"object"!=typeof e&&"function"!=typeof e?y(t):e}function W(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){if(!(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t)))return;var n=[],r=!0,i=!1,o=void 0;try{for(var a,s=t[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!e||n.length!==e);r=!0);}catch(t){i=!0,o=t}finally{try{r||null==s.return||s.return()}finally{if(i)throw o}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function V(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function m(t,e){return(Array(e+1).join("0")+t).slice(-e)}var b=function(){function t(){u(this,t)}return c(t,[{key:"toString",value:function(){throw new Error("Must be implemented by subclasses")}}]),t}(),w=function(){function t(){u(this,t),this._items={}}return c(t,[{key:"add",value:function(t,e){return this._items[t]=e}},{key:"get",value:function(t){return this._items[t]}},{key:"toString",value:function(){var t,e,n=Object.keys(this._items).sort(function(t,e){return t.localeCompare(e)}),r=["<<"];1<n.length&&(t=n[0],e=n[n.length-1],r.push("  /Limits ".concat(_.convert([new String(t),new String(e)])))),r.push("  /Names [");var i=!0,o=!1,a=void 0;try{for(var s,l=n[Symbol.iterator]();!(i=(s=l.next()).done);i=!0){var u=s.value;r.push("    ".concat(_.convert(new String(u))," ").concat(_.convert(this._items[u])))}}catch(t){o=!0,a=t}finally{try{i||null==l.return||l.return()}finally{if(o)throw a}}return r.push("]"),r.push(">>"),r.join("\n")}}]),t}(),x=/[\n\r\t\b\f\(\)\\]/g,S={"\n":"\\n","\r":"\\r","\t":"\\t","\b":"\\b","\f":"\\f","\\":"\\\\","(":"\\(",")":"\\)"},_=function(){function d(){u(this,d)}return c(d,null,[{key:"convert",value:function(t,e){var n=1<arguments.length&&void 0!==e?e:null;if("string"==typeof t)return"/".concat(t);if(t instanceof String){for(var r,i=t,o=!1,a=0,s=i.length;a<s;a++)if(127<i.charCodeAt(a)){o=!0;break}return r=o?function(t){var e=t.length;if(1&e)throw new Error("Buffer length must be even");for(var n=0,r=e-1;n<r;n+=2){var i=t[n];t[n]=t[n+1],t[n+1]=i}return t}(g.from("\ufeff".concat(i),"utf16le")):g.from(i.valueOf(),"ascii"),i=(i=n?n(r).toString("binary"):r.toString("binary")).replace(x,function(t){return S[t]}),"(".concat(i,")")}if(g.isBuffer(t))return"<".concat(t.toString("hex"),">");if(t instanceof b||t instanceof w)return t.toString();if(t instanceof Date){var l="D:".concat(m(t.getUTCFullYear(),4))+m(t.getUTCMonth()+1,2)+m(t.getUTCDate(),2)+m(t.getUTCHours(),2)+m(t.getUTCMinutes(),2)+m(t.getUTCSeconds(),2)+"Z";return n&&(l=(l=n(new g(l,"ascii")).toString("binary")).replace(x,function(t){return S[t]})),"(".concat(l,")")}if(Array.isArray(t)){var u=t.map(function(t){return d.convert(t,n)}).join(" ");return"[".concat(u,"]")}if("[object Object]"!=={}.toString.call(t))return"number"==typeof t?d.number(t):"".concat(t);var c=["<<"];for(var h in t){var f=t[h];c.push("/".concat(h," ").concat(d.convert(f,n)))}return c.push(">>"),c.join("\n")}},{key:"number",value:function(t){if(-1e21<t&&t<1e21)return Math.round(1e6*t)/1e6;throw new Error("unsupported number: ".concat(t))}}]),d}(),k=function(){function i(t,e){var n,r=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{};return u(this,i),(n=v(this,d(i).call(this))).document=t,n.id=e,n.data=r,n.gen=0,n.compress=n.document.compress&&!n.data.Filter,n.uncompressedLength=0,n.buffer=[],n}return h(i,b),c(i,[{key:"write",value:function(t){if(g.isBuffer(t)||(t=new g(t+"\n","binary")),this.uncompressedLength+=t.length,null==this.data.Length&&(this.data.Length=0),this.buffer.push(t),this.data.Length+=t.length,this.compress)return this.data.Filter="FlateDecode"}},{key:"end",value:function(t){return t&&this.write(t),this.finalize()}},{key:"finalize",value:function(){this.offset=this.document._offset;var t=this.document._security?this.document._security.getEncryptFn(this.id,this.gen):null;this.buffer.length&&(this.buffer=g.concat(this.buffer),this.compress&&(this.buffer=f.default.deflateSync(this.buffer)),t&&(this.buffer=t(this.buffer)),this.data.Length=this.buffer.length),this.document._write("".concat(this.id," ").concat(this.gen," obj")),this.document._write(_.convert(this.data,t)),this.buffer.length&&(this.document._write("stream"),this.document._write(this.buffer),this.buffer=[],this.document._write("\nendstream")),this.document._write("endobj"),this.document._refEnd(this)}},{key:"toString",value:function(){return"".concat(this.id," ").concat(this.gen," R")}}]),i}(),A={top:72,left:72,bottom:72,right:72},C={"4A0":[4767.87,6740.79],"2A0":[3370.39,4767.87],A0:[2383.94,3370.39],A1:[1683.78,2383.94],A2:[1190.55,1683.78],A3:[841.89,1190.55],A4:[595.28,841.89],A5:[419.53,595.28],A6:[297.64,419.53],A7:[209.76,297.64],A8:[147.4,209.76],A9:[104.88,147.4],A10:[73.7,104.88],B0:[2834.65,4008.19],B1:[2004.09,2834.65],B2:[1417.32,2004.09],B3:[1000.63,1417.32],B4:[708.66,1000.63],B5:[498.9,708.66],B6:[354.33,498.9],B7:[249.45,354.33],B8:[175.75,249.45],B9:[124.72,175.75],B10:[87.87,124.72],C0:[2599.37,3676.54],C1:[1836.85,2599.37],C2:[1298.27,1836.85],C3:[918.43,1298.27],C4:[649.13,918.43],C5:[459.21,649.13],C6:[323.15,459.21],C7:[229.61,323.15],C8:[161.57,229.61],C9:[113.39,161.57],C10:[79.37,113.39],RA0:[2437.8,3458.27],RA1:[1729.13,2437.8],RA2:[1218.9,1729.13],RA3:[864.57,1218.9],RA4:[609.45,864.57],SRA0:[2551.18,3628.35],SRA1:[1814.17,2551.18],SRA2:[1275.59,1814.17],SRA3:[907.09,1275.59],SRA4:[637.8,907.09],EXECUTIVE:[521.86,756],FOLIO:[612,936],LEGAL:[612,1008],LETTER:[612,792],TABLOID:[792,1224]},P=function(){function r(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};u(this,r),this.document=t,this.size=e.size||"letter",this.layout=e.layout||"portrait","number"==typeof e.margin?this.margins={top:e.margin,left:e.margin,bottom:e.margin,right:e.margin}:this.margins=e.margins||A;var n=Array.isArray(this.size)?this.size:C[this.size.toUpperCase()];this.width=n["portrait"===this.layout?0:1],this.height=n["portrait"===this.layout?1:0],this.content=this.document.ref(),this.resources=this.document.ref({ProcSet:["PDF","Text","ImageB","ImageC","ImageI"]}),this.dictionary=this.document.ref({Type:"Page",Parent:this.document._root.data.Pages,MediaBox:[0,0,this.width,this.height],Contents:this.content,Resources:this.resources})}return c(r,[{key:"maxY",value:function(){return this.height-this.margins.bottom}},{key:"write",value:function(t){return this.content.write(t)}},{key:"end",value:function(){return this.dictionary.end(),this.resources.end(),this.content.end()}},{key:"fonts",get:function(){var t=this.resources.data;return null!=t.Font?t.Font:t.Font={}}},{key:"xobjects",get:function(){var t=this.resources.data;return null!=t.XObject?t.XObject:t.XObject={}}},{key:"ext_gstates",get:function(){var t=this.resources.data;return null!=t.ExtGState?t.ExtGState:t.ExtGState={}}},{key:"patterns",get:function(){var t=this.resources.data;return null!=t.Pattern?t.Pattern:t.Pattern={}}},{key:"annotations",get:function(){var t=this.dictionary.data;return null!=t.Annots?t.Annots:t.Annots=[]}}]),r}();function E(t,e){if(t<e[0])return!1;for(var n=0,r=e.length/2;n<=r;){var i=Math.floor((n+r)/2),o=2*i;if(t>=e[o]&&t<=e[1+o])return!0;t>e[1+o]?n=i+1:r=i-1}return!1}var O=[545,545,564,591,686,687,751,767,848,863,880,883,886,889,891,893,895,899,907,907,909,909,930,930,975,975,1015,1023,1159,1159,1231,1231,1270,1271,1274,1279,1296,1328,1367,1368,1376,1376,1416,1416,1419,1424,1442,1442,1466,1466,1477,1487,1515,1519,1525,1547,1549,1562,1564,1566,1568,1568,1595,1599,1622,1631,1774,1775,1791,1791,1806,1806,1837,1839,1867,1919,1970,2304,2308,2308,2362,2363,2382,2383,2389,2391,2417,2432,2436,2436,2445,2446,2449,2450,2473,2473,2481,2481,2483,2485,2490,2491,2493,2493,2501,2502,2505,2506,2510,2518,2520,2523,2526,2526,2532,2533,2555,2561,2563,2564,2571,2574,2577,2578,2601,2601,2609,2609,2612,2612,2615,2615,2618,2619,2621,2621,2627,2630,2633,2634,2638,2648,2653,2653,2655,2661,2677,2688,2692,2692,2700,2700,2702,2702,2706,2706,2729,2729,2737,2737,2740,2740,2746,2747,2758,2758,2762,2762,2766,2767,2769,2783,2785,2789,2800,2816,2820,2820,2829,2830,2833,2834,2857,2857,2865,2865,2868,2869,2874,2875,2884,2886,2889,2890,2894,2901,2904,2907,2910,2910,2914,2917,2929,2945,2948,2948,2955,2957,2961,2961,2966,2968,2971,2971,2973,2973,2976,2978,2981,2983,2987,2989,2998,2998,3002,3005,3011,3013,3017,3017,3022,3030,3032,3046,3059,3072,3076,3076,3085,3085,3089,3089,3113,3113,3124,3124,3130,3133,3141,3141,3145,3145,3150,3156,3159,3167,3170,3173,3184,3201,3204,3204,3213,3213,3217,3217,3241,3241,3252,3252,3258,3261,3269,3269,3273,3273,3278,3284,3287,3293,3295,3295,3298,3301,3312,3329,3332,3332,3341,3341,3345,3345,3369,3369,3386,3389,3396,3397,3401,3401,3406,3414,3416,3423,3426,3429,3440,3457,3460,3460,3479,3481,3506,3506,3516,3516,3518,3519,3527,3529,3531,3534,3541,3541,3543,3543,3552,3569,3573,3584,3643,3646,3676,3712,3715,3715,3717,3718,3721,3721,3723,3724,3726,3731,3736,3736,3744,3744,3748,3748,3750,3750,3752,3753,3756,3756,3770,3770,3774,3775,3781,3781,3783,3783,3790,3791,3802,3803,3806,3839,3912,3912,3947,3952,3980,3983,3992,3992,4029,4029,4045,4046,4048,4095,4130,4130,4136,4136,4139,4139,4147,4149,4154,4159,4186,4255,4294,4303,4345,4346,4348,4351,4442,4446,4515,4519,4602,4607,4615,4615,4679,4679,4681,4681,4686,4687,4695,4695,4697,4697,4702,4703,4743,4743,4745,4745,4750,4751,4783,4783,4785,4785,4790,4791,4799,4799,4801,4801,4806,4807,4815,4815,4823,4823,4847,4847,4879,4879,4881,4881,4886,4887,4895,4895,4935,4935,4955,4960,4989,5023,5109,5120,5751,5759,5789,5791,5873,5887,5901,5901,5909,5919,5943,5951,5972,5983,5997,5997,6001,6001,6004,6015,6109,6111,6122,6143,6159,6159,6170,6175,6264,6271,6314,7679,7836,7839,7930,7935,7958,7959,7966,7967,8006,8007,8014,8015,8024,8024,8026,8026,8028,8028,8030,8030,8062,8063,8117,8117,8133,8133,8148,8149,8156,8156,8176,8177,8181,8181,8191,8191,8275,8278,8280,8286,8292,8297,8306,8307,8335,8351,8370,8399,8427,8447,8507,8508,8524,8530,8580,8591,9167,9215,9255,9279,9291,9311,9471,9471,9748,9749,9752,9752,9854,9855,9866,9984,9989,9989,9994,9995,10024,10024,10060,10060,10062,10062,10067,10069,10071,10071,10079,10080,10133,10135,10160,10160,10175,10191,10220,10223,11008,11903,11930,11930,12020,12031,12246,12271,12284,12287,12352,12352,12439,12440,12544,12548,12589,12592,12687,12687,12728,12783,12829,12831,12868,12880,12924,12926,13004,13007,13055,13055,13175,13178,13278,13279,13311,13311,19894,19967,40870,40959,42125,42127,42183,44031,55204,55295,64046,64047,64107,64255,64263,64274,64280,64284,64311,64311,64317,64317,64319,64319,64322,64322,64325,64325,64434,64466,64832,64847,64912,64913,64968,64975,65021,65023,65040,65055,65060,65071,65095,65096,65107,65107,65127,65127,65132,65135,65141,65141,65277,65278,65280,65280,65471,65473,65480,65481,65488,65489,65496,65497,65501,65503,65511,65511,65519,65528,65536,66303,66335,66335,66340,66351,66379,66559,66598,66599,66638,118783,119030,119039,119079,119081,119262,119807,119893,119893,119965,119965,119968,119969,119971,119972,119975,119976,119981,119981,119994,119994,119996,119996,120001,120001,120004,120004,120070,120070,120075,120076,120085,120085,120093,120093,120122,120122,120127,120127,120133,120133,120135,120137,120145,120145,120484,120487,120778,120781,120832,131069,173783,194559,195102,196605,196608,262141,262144,327677,327680,393213,393216,458749,458752,524285,524288,589821,589824,655357,655360,720893,720896,786429,786432,851965,851968,917501,917504,917504,917506,917535,917632,983037],T=function(t){return E(t,O)},I=[173,173,847,847,6150,6150,6155,6155,6156,6156,6157,6157,8203,8203,8204,8204,8205,8205,8288,8288,65024,65024,65025,65025,65026,65026,65027,65027,65028,65028,65029,65029,65030,65030,65031,65031,65032,65032,65033,65033,65034,65034,65035,65035,65036,65036,65037,65037,65038,65038,65039,65039,65279,65279],L=[160,160,5760,5760,8192,8192,8193,8193,8194,8194,8195,8195,8196,8196,8197,8197,8198,8198,8199,8199,8200,8200,8201,8201,8202,8202,8203,8203,8239,8239,8287,8287,12288,12288],M=[128,159,1757,1757,1807,1807,6158,6158,8204,8204,8205,8205,8232,8232,8233,8233,8288,8288,8289,8289,8290,8290,8291,8291,8298,8303,65279,65279,65529,65532,119155,119162],B=[64976,65007,65534,65535,131070,131071,196606,196607,262142,262143,327678,327679,393214,393215,458750,458751,524286,524287,589822,589823,655358,655359,720894,720895,786430,786431,851966,851967,917502,917503,983038,983039,1114110,1114111],R=[0,31,127,127,832,832,833,833,8206,8206,8207,8207,8234,8234,8235,8235,8236,8236,8237,8237,8238,8238,8298,8298,8299,8299,8300,8300,8301,8301,8302,8302,8303,8303,12272,12283,55296,57343,57344,63743,65529,65529,65530,65530,65531,65531,65532,65532,65533,65533,917505,917505,917536,917631,983040,1048573,1048576,1114109],F=function(t){return E(t,L)||E(t,R)||E(t,M)||E(t,B)},D=[1470,1470,1472,1472,1475,1475,1488,1514,1520,1524,1563,1563,1567,1567,1569,1594,1600,1610,1645,1647,1649,1749,1757,1757,1765,1766,1786,1790,1792,1805,1808,1808,1810,1836,1920,1957,1969,1969,8207,8207,64285,64285,64287,64296,64298,64310,64312,64316,64318,64318,64320,64321,64323,64324,64326,64433,64467,64829,64848,64911,64914,64967,65008,65020,65136,65140,65142,65276],N=function(t){return E(t,D)},U=[65,90,97,122,170,170,181,181,186,186,192,214,216,246,248,544,546,563,592,685,688,696,699,705,720,721,736,740,750,750,890,890,902,902,904,906,908,908,910,929,931,974,976,1013,1024,1154,1162,1230,1232,1269,1272,1273,1280,1295,1329,1366,1369,1375,1377,1415,1417,1417,2307,2307,2309,2361,2365,2368,2377,2380,2384,2384,2392,2401,2404,2416,2434,2435,2437,2444,2447,2448,2451,2472,2474,2480,2482,2482,2486,2489,2494,2496,2503,2504,2507,2508,2519,2519,2524,2525,2527,2529,2534,2545,2548,2554,2565,2570,2575,2576,2579,2600,2602,2608,2610,2611,2613,2614,2616,2617,2622,2624,2649,2652,2654,2654,2662,2671,2674,2676,2691,2691,2693,2699,2701,2701,2703,2705,2707,2728,2730,2736,2738,2739,2741,2745,2749,2752,2761,2761,2763,2764,2768,2768,2784,2784,2790,2799,2818,2819,2821,2828,2831,2832,2835,2856,2858,2864,2866,2867,2870,2873,2877,2878,2880,2880,2887,2888,2891,2892,2903,2903,2908,2909,2911,2913,2918,2928,2947,2947,2949,2954,2958,2960,2962,2965,2969,2970,2972,2972,2974,2975,2979,2980,2984,2986,2990,2997,2999,3001,3006,3007,3009,3010,3014,3016,3018,3020,3031,3031,3047,3058,3073,3075,3077,3084,3086,3088,3090,3112,3114,3123,3125,3129,3137,3140,3168,3169,3174,3183,3202,3203,3205,3212,3214,3216,3218,3240,3242,3251,3253,3257,3262,3262,3264,3268,3271,3272,3274,3275,3285,3286,3294,3294,3296,3297,3302,3311,3330,3331,3333,3340,3342,3344,3346,3368,3370,3385,3390,3392,3398,3400,3402,3404,3415,3415,3424,3425,3430,3439,3458,3459,3461,3478,3482,3505,3507,3515,3517,3517,3520,3526,3535,3537,3544,3551,3570,3572,3585,3632,3634,3635,3648,3654,3663,3675,3713,3714,3716,3716,3719,3720,3722,3722,3725,3725,3732,3735,3737,3743,3745,3747,3749,3749,3751,3751,3754,3755,3757,3760,3762,3763,3773,3773,3776,3780,3782,3782,3792,3801,3804,3805,3840,3863,3866,3892,3894,3894,3896,3896,3902,3911,3913,3946,3967,3967,3973,3973,3976,3979,4030,4037,4039,4044,4047,4047,4096,4129,4131,4135,4137,4138,4140,4140,4145,4145,4152,4152,4160,4183,4256,4293,4304,4344,4347,4347,4352,4441,4447,4514,4520,4601,4608,4614,4616,4678,4680,4680,4682,4685,4688,4694,4696,4696,4698,4701,4704,4742,4744,4744,4746,4749,4752,4782,4784,4784,4786,4789,4792,4798,4800,4800,4802,4805,4808,4814,4816,4822,4824,4846,4848,4878,4880,4880,4882,4885,4888,4894,4896,4934,4936,4954,4961,4988,5024,5108,5121,5750,5761,5786,5792,5872,5888,5900,5902,5905,5920,5937,5941,5942,5952,5969,5984,5996,5998,6e3,6016,6070,6078,6085,6087,6088,6100,6106,6108,6108,6112,6121,6160,6169,6176,6263,6272,6312,7680,7835,7840,7929,7936,7957,7960,7965,7968,8005,8008,8013,8016,8023,8025,8025,8027,8027,8029,8029,8031,8061,8064,8116,8118,8124,8126,8126,8130,8132,8134,8140,8144,8147,8150,8155,8160,8172,8178,8180,8182,8188,8206,8206,8305,8305,8319,8319,8450,8450,8455,8455,8458,8467,8469,8469,8473,8477,8484,8484,8486,8486,8488,8488,8490,8493,8495,8497,8499,8505,8509,8511,8517,8521,8544,8579,9014,9082,9109,9109,9372,9449,12293,12295,12321,12329,12337,12341,12344,12348,12353,12438,12445,12447,12449,12538,12540,12543,12549,12588,12593,12686,12688,12727,12784,12828,12832,12867,12896,12923,12927,12976,12992,13003,13008,13054,13056,13174,13179,13277,13280,13310,13312,19893,19968,40869,40960,42124,44032,55203,55296,64045,64048,64106,64256,64262,64275,64279,65313,65338,65345,65370,65382,65470,65474,65479,65482,65487,65490,65495,65498,65500,66304,66334,66336,66339,66352,66378,66560,66597,66600,66637,118784,119029,119040,119078,119082,119142,119146,119154,119171,119172,119180,119209,119214,119261,119808,119892,119894,119964,119966,119967,119970,119970,119973,119974,119977,119980,119982,119993,119995,119995,119997,12e4,120002,120003,120005,120069,120071,120074,120077,120084,120086,120092,120094,120121,120123,120126,120128,120132,120134,120134,120138,120144,120146,120483,120488,120777,131072,173782,194560,195101,983040,1048573,1048576,1114109],j=function(t){return E(t,U)},G=function(t){return E(t,L)},H=function(t){return E(t,I)},q=function(t){return t.codePointAt(0)},Z=function(t){return t[0]},X=function(t){return t[t.length-1]};function Y(t){for(var e=[],n=t.length,r=0;r<n;r+=1){var i=t.charCodeAt(r);if(55296<=i&&i<=56319&&r+1<n){var o=t.charCodeAt(r+1);if(56320<=o&&o<=57343){e.push(1024*(i-55296)+o-56320+65536),r+=1;continue}}e.push(i)}return e}var K=function(){function D(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};if(u(this,D),!e.ownerPassword&&!e.userPassword)throw new Error("None of owner password and user password is defined.");this.document=t,this._setupEncryption(e)}return c(D,null,[{key:"generateFileID",value:function(t){var e=0<arguments.length&&void 0!==t?t:{},n="".concat(e.CreationDate.getTime(),"\n");for(var r in e)e.hasOwnProperty(r)&&(n+="".concat(r,": ").concat(e[r],"\n"));return et(z.default.MD5(n))}},{key:"generateRandomWordArray",value:function(t){return z.default.lib.WordArray.random(t)}},{key:"create",value:function(t,e){var n=1<arguments.length&&void 0!==e?e:{};return n.ownerPassword||n.userPassword?new D(t,n):null}}]),c(D,[{key:"_setupEncryption",value:function(t){switch(t.pdfVersion){case"1.4":case"1.5":this.version=2;break;case"1.6":case"1.7":this.version=4;break;case"1.7ext3":this.version=5;break;default:this.version=1}var e={Filter:"Standard"};switch(this.version){case 1:case 2:case 4:this._setupEncryptionV1V2V4(this.version,e,t);break;case 5:this._setupEncryptionV5(e,t)}this.dictionary=this.document.ref(e)}},{key:"_setupEncryptionV1V2V4",value:function(t,e,n){var r,i;switch(t){case 1:r=2,this.keyBits=40,i=function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=-64;t.printing&&(e|=4);t.modifying&&(e|=8);t.copying&&(e|=16);t.annotating&&(e|=32);return e}(n.permissions);break;case 2:r=3,this.keyBits=128,i=J(n.permissions);break;case 4:r=4,this.keyBits=128,i=J(n.permissions)}var o,a,s=Q(n.userPassword),l=n.ownerPassword?Q(n.ownerPassword):s,u=function(t,e,n,r){for(var i=r,o=3<=t?51:1,a=0;a<o;a++)i=z.default.MD5(i);var s=i.clone();s.sigBytes=e/8;var l=n;o=3<=t?20:1;for(var u=0;u<o;u++){for(var c=Math.ceil(s.sigBytes/4),h=0;h<c;h++)s.words[h]=i.words[h]^(u|u<<8|u<<16|u<<24);l=z.default.RC4.encrypt(l,s).ciphertext}return l}(r,this.keyBits,s,l);this.encryptionKey=function(t,e,n,r,i,o){for(var a=r.clone().concat(i).concat(z.default.lib.WordArray.create([tt(o)],4)).concat(z.default.lib.WordArray.create(n)),s=3<=t?51:1,l=0;l<s;l++)(a=z.default.MD5(a)).sigBytes=e/8;return a}(r,this.keyBits,this.document._id,s,u,i),o=2===r?(a=this.encryptionKey,z.default.RC4.encrypt(Q(),a).ciphertext):function(t,e){for(var n=e.clone(),r=z.default.MD5(Q().concat(z.default.lib.WordArray.create(t))),i=0;i<20;i++){for(var o=Math.ceil(n.sigBytes/4),a=0;a<o;a++)n.words[a]=e.words[a]^(i|i<<8|i<<16|i<<24);r=z.default.RC4.encrypt(r,n).ciphertext}return r.concat(z.default.lib.WordArray.create(null,16))}(this.document._id,this.encryptionKey),2<=(e.V=t)&&(e.Length=this.keyBits),4===t&&(e.CF={StdCF:{AuthEvent:"DocOpen",CFM:"AESV2",Length:this.keyBits/8}},e.StmF="StdCF",e.StrF="StdCF"),e.R=r,e.O=et(u),e.U=et(o),e.P=i}},{key:"_setupEncryptionV5",value:function(t,e){this.keyBits=256;var n=J(e),r=$(e.userPassword),i=e.ownerPassword?$(e.ownerPassword):r;this.encryptionKey=(0,D.generateRandomWordArray)(32);var o,a,s,l,u,c,h,f,d,p,g,y,v,m,b,w,x,S,_,k,A,C,P,E,O,T=(o=r,s=(a=D.generateRandomWordArray)(8),l=a(8),z.default.SHA256(o.clone().concat(s)).concat(s).concat(l)),I=z.default.lib.WordArray.create(T.words.slice(10,12),8),L=(u=r,c=I,h=this.encryptionKey,f=z.default.SHA256(u.clone().concat(c)),d={mode:z.default.mode.CBC,padding:z.default.pad.NoPadding,iv:z.default.lib.WordArray.create(null,16)},z.default.AES.encrypt(h,f,d).ciphertext),M=(p=i,g=T,v=(y=D.generateRandomWordArray)(8),m=y(8),z.default.SHA256(p.clone().concat(v).concat(g)).concat(v).concat(m)),B=z.default.lib.WordArray.create(M.words.slice(10,12),8),R=(b=i,w=B,x=T,S=this.encryptionKey,_=z.default.SHA256(b.clone().concat(w).concat(x)),k={mode:z.default.mode.CBC,padding:z.default.pad.NoPadding,iv:z.default.lib.WordArray.create(null,16)},z.default.AES.encrypt(S,_,k).ciphertext),F=(A=n,C=this.encryptionKey,P=D.generateRandomWordArray,E=z.default.lib.WordArray.create([tt(A),4294967295,1415668834],12).concat(P(4)),O={mode:z.default.mode.ECB,padding:z.default.pad.NoPadding},z.default.AES.encrypt(E,C,O).ciphertext);t.V=5,t.Length=this.keyBits,t.CF={StdCF:{AuthEvent:"DocOpen",CFM:"AESV3",Length:this.keyBits/8}},t.StmF="StdCF",t.StrF="StdCF",t.R=5,t.O=et(M),t.OE=et(R),t.U=et(T),t.UE=et(L),t.P=n,t.Perms=et(F)}},{key:"getEncryptFn",value:function(t,e){var n,r;if(this.version<5&&(n=this.encryptionKey.clone().concat(z.default.lib.WordArray.create([(255&t)<<24|(65280&t)<<8|t>>8&65280|255&e,(65280&e)<<16],5))),1===this.version||2===this.version){var i=z.default.MD5(n);return i.sigBytes=Math.min(16,this.keyBits/8+5),function(t){return et(z.default.RC4.encrypt(z.default.lib.WordArray.create(t),i).ciphertext)}}r=4===this.version?z.default.MD5(n.concat(z.default.lib.WordArray.create([1933667412],4))):this.encryptionKey;var o=D.generateRandomWordArray(16),a={mode:z.default.mode.CBC,padding:z.default.pad.Pkcs7,iv:o};return function(t){return et(o.clone().concat(z.default.AES.encrypt(z.default.lib.WordArray.create(t),r,a).ciphertext))}}},{key:"end",value:function(){this.dictionary.end()}}]),D}();function J(t){var e=0<arguments.length&&void 0!==t?t:{},n=-3904;return"lowResolution"===e.printing&&(n|=4),"highResolution"===e.printing&&(n|=2052),e.modifying&&(n|=8),e.copying&&(n|=16),e.annotating&&(n|=32),e.fillingForms&&(n|=256),e.contentAccessibility&&(n|=512),e.documentAssembly&&(n|=1024),n}function Q(t){for(var e=0<arguments.length&&void 0!==t?t:"",n=new g(32),r=e.length,i=0;i<r&&i<32;){var o=e.charCodeAt(i);if(255<o)throw new Error("Password contains one or more invalid characters.");n[i]=o,i++}for(;i<32;)n[i]=ut[i-r],i++;return z.default.lib.WordArray.create(n)}function $(t){for(var e=0<arguments.length&&void 0!==t?t:"",e=unescape(encodeURIComponent(function(t,e){var n=1<arguments.length&&void 0!==e?e:{};if("string"!=typeof t)throw new TypeError("Expected string.");if(0===t.length)return"";var r=Y(t).map(function(t){return G(t)?32:t}).filter(function(t){return!H(t)}),i=String.fromCodePoint.apply(null,r).normalize("NFKC"),o=Y(i);if(o.some(F))throw new Error("Prohibited character, see https://tools.ietf.org/html/rfc4013#section-2.3");if(!0!==n.allowUnassigned&&o.some(T))throw new Error("Unassigned code point, see https://tools.ietf.org/html/rfc4013#section-2.5");var a=o.some(N),s=o.some(j);if(a&&s)throw new Error("String must not contain RandALCat and LCat at the same time, see https://tools.ietf.org/html/rfc3454#section-6");var l=N(q(Z(i))),u=N(q(X(i)));if(a&&(!l||!u))throw new Error("Bidirectional RandALCat character must be the first and the last character of the string, see https://tools.ietf.org/html/rfc3454#section-6");return i}(e))),n=Math.min(127,e.length),r=new g(n),i=0;i<n;i++)r[i]=e.charCodeAt(i);return z.default.lib.WordArray.create(r)}function tt(t){return(255&t)<<24|(65280&t)<<8|t>>8&65280|t>>24&255}function et(t){for(var e=[],n=0;n<t.sigBytes;n++)e.push(t.words[Math.floor(n/4)]>>8*(3-n%4)&255);return g.from(e)}function nt(t){return"0000".concat(t.toString(16)).slice(-4)}function rt(t){Object.assign(ne.prototype,t)}var it,ot,at,st,lt,ut=[40,191,78,94,78,117,138,65,100,0,78,86,255,250,1,8,46,46,0,182,208,104,62,128,47,12,169,254,100,83,105,122],ct=_.number,ht=function(){function e(t){u(this,e),this.doc=t,this.stops=[],this.embedded=!1,this.transform=[1,0,0,1,0,0]}return c(e,[{key:"stop",value:function(t,e,n){if(null==n&&(n=1),e=this.doc._normalizeColor(e),0===this.stops.length)if(3===e.length)this._colorSpace="DeviceRGB";else if(4===e.length)this._colorSpace="DeviceCMYK";else{if(1!==e.length)throw new Error("Unknown color space");this._colorSpace="DeviceGray"}else if("DeviceRGB"===this._colorSpace&&3!==e.length||"DeviceCMYK"===this._colorSpace&&4!==e.length||"DeviceGray"===this._colorSpace&&1!==e.length)throw new Error("All gradient stops must use the same color space");return n=Math.max(0,Math.min(1,n)),this.stops.push([t,e,n]),this}},{key:"setTransform",value:function(t,e,n,r,i,o){return this.transform=[t,e,n,r,i,o],this}},{key:"embed",value:function(t){var e,n=this.stops.length;if(0!==n){this.embedded=!0,this.matrix=t;var r=this.stops[n-1];r[0]<1&&this.stops.push([1,r[1],r[2]]);for(var i=[],o=[],a=[],s=0;s<n-1;s++)o.push(0,1),s+2!==n&&i.push(this.stops[s+1][0]),e=this.doc.ref({FunctionType:2,Domain:[0,1],C0:this.stops[s+0][1],C1:this.stops[s+1][1],N:1}),a.push(e),e.end();1===n?e=a[0]:(e=this.doc.ref({FunctionType:3,Domain:[0,1],Functions:a,Bounds:i,Encode:o})).end(),this.id="Sh".concat(++this.doc._gradCount);var l=this.shader(e);l.end();var u=this.doc.ref({Type:"Pattern",PatternType:2,Shading:l,Matrix:this.matrix.map(ct)});if(u.end(),this.stops.some(function(t){return t[2]<1})){var c=this.opacityGradient(),h=!0,f=!(c._colorSpace="DeviceGray"),d=void 0;try{for(var p,g=this.stops[Symbol.iterator]();!(h=(p=g.next()).done);h=!0){var y=p.value;c.stop(y[0],[y[2]])}}catch(t){f=!0,d=t}finally{try{h||null==g.return||g.return()}finally{if(f)throw d}}c=c.embed(this.matrix);var v=[0,0,this.doc.page.width,this.doc.page.height],m=this.doc.ref({Type:"XObject",Subtype:"Form",FormType:1,BBox:v,Group:{Type:"Group",S:"Transparency",CS:"DeviceGray"},Resources:{ProcSet:["PDF","Text","ImageB","ImageC","ImageI"],Pattern:{Sh1:c}}});m.write("/Pattern cs /Sh1 scn"),m.end("".concat(v.join(" ")," re f"));var b=this.doc.ref({Type:"ExtGState",SMask:{Type:"Mask",S:"Luminosity",G:m}});b.end();var w=this.doc.ref({Type:"Pattern",PatternType:1,PaintType:1,TilingType:2,BBox:v,XStep:v[2],YStep:v[3],Resources:{ProcSet:["PDF","Text","ImageB","ImageC","ImageI"],Pattern:{Sh1:u},ExtGState:{Gs1:b}}});w.write("/Gs1 gs /Pattern cs /Sh1 scn"),w.end("".concat(v.join(" ")," re f")),this.doc.page.patterns[this.id]=w}else this.doc.page.patterns[this.id]=u;return u}}},{key:"apply",value:function(t){var e=W(this.doc._ctm,6),n=e[0],r=e[1],i=e[2],o=e[3],a=e[4],s=e[5],l=W(this.transform,6),u=l[0],c=l[1],h=l[2],f=l[3],d=l[4],p=l[5],g=[n*u+i*c,r*u+o*c,n*h+i*f,r*h+o*f,n*d+i*p+a,r*d+o*p+s];return this.embedded&&g.join(" ")===this.matrix.join(" ")||this.embed(g),this.doc.addContent("/".concat(this.id," ").concat(t))}}]),e}(),ft={PDFGradient:ht,PDFLinearGradient:function(){function a(t,e,n,r,i){var o;return u(this,a),(o=v(this,d(a).call(this,t))).x1=e,o.y1=n,o.x2=r,o.y2=i,o}return h(a,ht),c(a,[{key:"shader",value:function(t){return this.doc.ref({ShadingType:2,ColorSpace:this._colorSpace,Coords:[this.x1,this.y1,this.x2,this.y2],Function:t,Extend:[!0,!0]})}},{key:"opacityGradient",value:function(){return new a(this.doc,this.x1,this.y1,this.x2,this.y2)}}]),a}(),PDFRadialGradient:function(){function l(t,e,n,r,i,o,a){var s;return u(this,l),(s=v(this,d(l).call(this,t))).doc=t,s.x1=e,s.y1=n,s.r1=r,s.x2=i,s.y2=o,s.r2=a,s}return h(l,ht),c(l,[{key:"shader",value:function(t){return this.doc.ref({ShadingType:3,ColorSpace:this._colorSpace,Coords:[this.x1,this.y1,this.r1,this.x2,this.y2,this.r2],Function:t,Extend:[!0,!0]})}},{key:"opacityGradient",value:function(){return new l(this.doc,this.x1,this.y1,this.r1,this.x2,this.y2,this.r2)}}]),l}()},dt=ft.PDFGradient,pt=ft.PDFLinearGradient,gt=ft.PDFRadialGradient,yt={initColor:function(){return this._opacityRegistry={},this._opacityCount=0,this._gradCount=0},_normalizeColor:function(t){return t instanceof dt?t:("string"==typeof t&&("#"===t.charAt(0)?(4===t.length&&(t=t.replace(/#([0-9A-F])([0-9A-F])([0-9A-F])/i,"#$1$1$2$2$3$3")),t=[(e=parseInt(t.slice(1),16))>>16,e>>8&255,255&e]):vt[t]&&(t=vt[t])),Array.isArray(t)?(3===t.length?t=t.map(function(t){return t/255}):4===t.length&&(t=t.map(function(t){return t/100})),t):null);var e},_setColor:function(t,e){if(!(t=this._normalizeColor(t)))return!1;var n,r=e?"SCN":"scn";return t instanceof dt?(this._setColorSpace("Pattern",e),t.apply(r)):(n=4===t.length?"DeviceCMYK":"DeviceRGB",this._setColorSpace(n,e),t=t.join(" "),this.addContent("".concat(t," ").concat(r))),!0},_setColorSpace:function(t,e){var n=e?"CS":"cs";return this.addContent("/".concat(t," ").concat(n))},fillColor:function(t,e){return this._setColor(t,!1)&&this.fillOpacity(e),this._fillColor=[t,e],this},strokeColor:function(t,e){return this._setColor(t,!0)&&this.strokeOpacity(e),this},opacity:function(t){return this._doOpacity(t,t),this},fillOpacity:function(t){return this._doOpacity(t,null),this},strokeOpacity:function(t){return this._doOpacity(null,t),this},_doOpacity:function(t,e){if(null!=t||null!=e){null!=t&&(t=Math.max(0,Math.min(1,t))),null!=e&&(e=Math.max(0,Math.min(1,e)));var n,r,i,o,a="".concat(t,"_").concat(e);return this._opacityRegistry[a]?(r=(n=W(this._opacityRegistry[a],2))[0],i=n[1]):(r={Type:"ExtGState"},null!=t&&(r.ca=t),null!=e&&(r.CA=e),(r=this.ref(r)).end(),o=++this._opacityCount,i="Gs".concat(o),this._opacityRegistry[a]=[r,i]),this.page.ext_gstates[i]=r,this.addContent("/".concat(i," gs"))}},linearGradient:function(t,e,n,r){return new pt(this,t,e,n,r)},radialGradient:function(t,e,n,r,i,o){return new gt(this,t,e,n,r,i,o)}},vt={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],grey:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]},mt=it=ot=at=st=lt=0,bt={A:7,a:7,C:6,c:6,H:1,h:1,L:2,l:2,M:2,m:2,Q:4,q:4,S:4,s:4,T:2,t:2,V:1,v:1,Z:0,z:0},wt={M:function(t,e){return mt=e[0],it=e[1],ot=at=null,st=mt,lt=it,t.moveTo(mt,it)},m:function(t,e){return mt+=e[0],it+=e[1],ot=at=null,st=mt,lt=it,t.moveTo(mt,it)},C:function(t,e){return mt=e[4],it=e[5],ot=e[2],at=e[3],t.bezierCurveTo.apply(t,V(e))},c:function(t,e){return t.bezierCurveTo(e[0]+mt,e[1]+it,e[2]+mt,e[3]+it,e[4]+mt,e[5]+it),ot=mt+e[2],at=it+e[3],mt+=e[4],it+=e[5]},S:function(t,e){return null===ot&&(ot=mt,at=it),t.bezierCurveTo(mt-(ot-mt),it-(at-it),e[0],e[1],e[2],e[3]),ot=e[0],at=e[1],mt=e[2],it=e[3]},s:function(t,e){return null===ot&&(ot=mt,at=it),t.bezierCurveTo(mt-(ot-mt),it-(at-it),mt+e[0],it+e[1],mt+e[2],it+e[3]),ot=mt+e[0],at=it+e[1],mt+=e[2],it+=e[3]},Q:function(t,e){return ot=e[0],at=e[1],mt=e[2],it=e[3],t.quadraticCurveTo(e[0],e[1],mt,it)},q:function(t,e){return t.quadraticCurveTo(e[0]+mt,e[1]+it,e[2]+mt,e[3]+it),ot=mt+e[0],at=it+e[1],mt+=e[2],it+=e[3]},T:function(t,e){return at=null===ot?(ot=mt,it):(ot=mt-(ot-mt),it-(at-it)),t.quadraticCurveTo(ot,at,e[0],e[1]),ot=mt-(ot-mt),at=it-(at-it),mt=e[0],it=e[1]},t:function(t,e){return at=null===ot?(ot=mt,it):(ot=mt-(ot-mt),it-(at-it)),t.quadraticCurveTo(ot,at,mt+e[0],it+e[1]),mt+=e[0],it+=e[1]},A:function(t,e){return xt(t,mt,it,e),mt=e[5],it=e[6]},a:function(t,e){return e[5]+=mt,e[6]+=it,xt(t,mt,it,e),mt=e[5],it=e[6]},L:function(t,e){return mt=e[0],it=e[1],ot=at=null,t.lineTo(mt,it)},l:function(t,e){return mt+=e[0],it+=e[1],ot=at=null,t.lineTo(mt,it)},H:function(t,e){return mt=e[0],ot=at=null,t.lineTo(mt,it)},h:function(t,e){return mt+=e[0],ot=at=null,t.lineTo(mt,it)},V:function(t,e){return it=e[0],ot=at=null,t.lineTo(mt,it)},v:function(t,e){return it+=e[0],ot=at=null,t.lineTo(mt,it)},Z:function(t){return t.closePath(),mt=st,it=lt},z:function(t){return t.closePath(),mt=st,it=lt}},xt=function(t,e,n,r){var i=W(r,7),o=i[0],a=i[1],s=i[2],l=i[3],u=i[4],c=i[5],h=i[6],f=St(c,h,o,a,l,u,s,e,n),d=!0,p=!1,g=void 0;try{for(var y,v=f[Symbol.iterator]();!(d=(y=v.next()).done);d=!0){var m=y.value,b=_t.apply(void 0,V(m));t.bezierCurveTo.apply(t,V(b))}}catch(t){p=!0,g=t}finally{try{d||null==v.return||v.return()}finally{if(p)throw g}}},St=function(t,e,n,r,i,o,a,s,l){var u=a*(Math.PI/180),c=Math.sin(u),h=Math.cos(u);n=Math.abs(n),r=Math.abs(r);var f=(ot=h*(s-t)*.5+c*(l-e)*.5)*ot/(n*n)+(at=h*(l-e)*.5-c*(s-t)*.5)*at/(r*r);1<f&&(n*=f=Math.sqrt(f),r*=f);var d=h/n,p=c/n,g=-c/r,y=h/r,v=d*s+p*l,m=g*s+y*l,b=d*t+p*e,w=g*t+y*e,x=1/((b-v)*(b-v)+(w-m)*(w-m))-.25;x<0&&(x=0);var S=Math.sqrt(x);o===i&&(S=-S);var _=.5*(v+b)-S*(w-m),k=.5*(m+w)+S*(b-v),A=Math.atan2(m-k,v-_),C=Math.atan2(w-k,b-_)-A;C<0&&1===o?C+=2*Math.PI:0<C&&0===o&&(C-=2*Math.PI);for(var P=Math.ceil(Math.abs(C/(.5*Math.PI+.001))),E=[],O=0;O<P;O++){var T=A+O*C/P,I=A+(O+1)*C/P;E[O]=[_,k,T,I,n,r,c,h]}return E},_t=function(t,e,n,r,i,o,a,s){var l=s*i,u=-a*o,c=a*i,h=s*o,f=.5*(r-n),d=8/3*Math.sin(.5*f)*Math.sin(.5*f)/Math.sin(f),p=t+Math.cos(n)-d*Math.sin(n),g=e+Math.sin(n)+d*Math.cos(n),y=t+Math.cos(r),v=e+Math.sin(r),m=y+d*Math.sin(r),b=v-d*Math.cos(r);return[l*p+u*g,c*p+h*g,l*m+u*b,c*m+h*b,l*y+u*v,c*y+h*v]},kt=function(){function t(){u(this,t)}return c(t,null,[{key:"apply",value:function(t,e){!function(t,e){for(var n=mt=it=ot=at=st=lt=0;n<t.length;n++){var r=t[n];"function"==typeof wt[r.cmd]&&wt[r.cmd](e,r.args)}}(function(t){var e,n=[],r=[],i="",o=!1,a=0,s=!0,l=!1,u=void 0;try{for(var c,h=t[Symbol.iterator]();!(s=(c=h.next()).done);s=!0){var f=c.value;if(null!=bt[f])a=bt[f],e&&(0<i.length&&(r[r.length]=+i),n[n.length]={cmd:e,args:r},i="",o=!(r=[])),e=f;else if([" ",","].includes(f)||"-"===f&&0<i.length&&"e"!==i[i.length-1]||"."===f&&o){if(0===i.length)continue;r.length===a?(n[n.length]={cmd:e,args:r},r=[+i],"M"===e&&(e="L"),"m"===e&&(e="l")):r[r.length]=+i,o="."===f,i=["-","."].includes(f)?f:""}else i+=f,"."===f&&(o=!0)}}catch(t){l=!0,u=t}finally{try{s||null==h.return||h.return()}finally{if(l)throw u}}return 0<i.length&&(r.length===a?(n[n.length]={cmd:e,args:r},r=[+i],"M"===e&&(e="L"),"m"===e&&(e="l")):r[r.length]=+i),n[n.length]={cmd:e,args:r},n}(e),t)}}]),t}(),At=_.number,Ct=(Math.sqrt(2)-1)/3*4,Pt={initVector:function(){return this._ctm=[1,0,0,1,0,0],this._ctmStack=[]},save:function(){return this._ctmStack.push(this._ctm.slice()),this.addContent("q")},restore:function(){return this._ctm=this._ctmStack.pop()||[1,0,0,1,0,0],this.addContent("Q")},closePath:function(){return this.addContent("h")},lineWidth:function(t){return this.addContent("".concat(At(t)," w"))},_CAP_STYLES:{BUTT:0,ROUND:1,SQUARE:2},lineCap:function(t){return"string"==typeof t&&(t=this._CAP_STYLES[t.toUpperCase()]),this.addContent("".concat(t," J"))},_JOIN_STYLES:{MITER:0,ROUND:1,BEVEL:2},lineJoin:function(t){return"string"==typeof t&&(t=this._JOIN_STYLES[t.toUpperCase()]),this.addContent("".concat(t," j"))},miterLimit:function(t){return this.addContent("".concat(At(t)," M"))},dash:function(t,e){var n=1<arguments.length&&void 0!==e?e:{},r=t;if(Array.isArray(t)||(t=[t,n.space||t]),!t.every(function(t){return Number.isFinite(t)&&0<t}))throw new Error("dash(".concat(JSON.stringify(r),", ").concat(JSON.stringify(n),") invalid, lengths must be numeric and greater than zero"));return t=t.map(At).join(" "),this.addContent("[".concat(t,"] ").concat(At(n.phase||0)," d"))},undash:function(){return this.addContent("[] 0 d")},moveTo:function(t,e){return this.addContent("".concat(At(t)," ").concat(At(e)," m"))},lineTo:function(t,e){return this.addContent("".concat(At(t)," ").concat(At(e)," l"))},bezierCurveTo:function(t,e,n,r,i,o){return this.addContent("".concat(At(t)," ").concat(At(e)," ").concat(At(n)," ").concat(At(r)," ").concat(At(i)," ").concat(At(o)," c"))},quadraticCurveTo:function(t,e,n,r){return this.addContent("".concat(At(t)," ").concat(At(e)," ").concat(At(n)," ").concat(At(r)," v"))},rect:function(t,e,n,r){return this.addContent("".concat(At(t)," ").concat(At(e)," ").concat(At(n)," ").concat(At(r)," re"))},roundedRect:function(t,e,n,r,i){null==i&&(i=0);var o=(i=Math.min(i,.5*n,.5*r))*(1-Ct);return this.moveTo(t+i,e),this.lineTo(t+n-i,e),this.bezierCurveTo(t+n-o,e,t+n,e+o,t+n,e+i),this.lineTo(t+n,e+r-i),this.bezierCurveTo(t+n,e+r-o,t+n-o,e+r,t+n-i,e+r),this.lineTo(t+i,e+r),this.bezierCurveTo(t+o,e+r,t,e+r-o,t,e+r-i),this.lineTo(t,e+i),this.bezierCurveTo(t,e+o,t+o,e,t+i,e),this.closePath()},ellipse:function(t,e,n,r){null==r&&(r=n);var i=n*Ct,o=r*Ct,a=(t-=n)+2*n,s=(e-=r)+2*r,l=t+n,u=e+r;return this.moveTo(t,u),this.bezierCurveTo(t,u-o,l-i,e,l,e),this.bezierCurveTo(l+i,e,a,u-o,a,u),this.bezierCurveTo(a,u+o,l+i,s,l,s),this.bezierCurveTo(l-i,s,t,u+o,t,u),this.closePath()},circle:function(t,e,n){return this.ellipse(t,e,n)},arc:function(t,e,n,r,i,o){null==o&&(o=!1);var a=2*Math.PI,s=.5*Math.PI,l=i-r;Math.abs(l)>a?l=a:0!==l&&o!==l<0&&(l=(o?-1:1)*a+l);var u=Math.ceil(Math.abs(l)/s),c=l/u,h=c/s*Ct*n,f=r,d=-Math.sin(f)*h,p=Math.cos(f)*h,g=t+Math.cos(f)*n,y=e+Math.sin(f)*n;this.moveTo(g,y);for(var v=0;v<u;v++){var m=g+d,b=y+p;f+=c,g=t+Math.cos(f)*n,y=e+Math.sin(f)*n;var w=g-(d=-Math.sin(f)*h),x=y-(p=Math.cos(f)*h);this.bezierCurveTo(m,b,w,x,g,y)}return this},polygon:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];this.moveTo.apply(this,V(e.shift()||[]));for(var r=0,i=e;r<i.length;r++){var o=i[r];this.lineTo.apply(this,V(o||[]))}return this.closePath()},path:function(t){return kt.apply(this,t),this},_windingRule:function(t){return/even-?odd/.test(t)?"*":""},fill:function(t,e){return/(even-?odd)|(non-?zero)/.test(t)&&(e=t,t=null),t&&this.fillColor(t),this.addContent("f".concat(this._windingRule(e)))},stroke:function(t){return t&&this.strokeColor(t),this.addContent("S")},fillAndStroke:function(t,e,n){null==e&&(e=t);var r=/(even-?odd)|(non-?zero)/;return r.test(t)&&(n=t,t=null),r.test(e)&&(n=e,e=t),t&&(this.fillColor(t),this.strokeColor(e)),this.addContent("B".concat(this._windingRule(n)))},clip:function(t){return this.addContent("W".concat(this._windingRule(t)," n"))},transform:function(t,e,n,r,i,o){var a=this._ctm,s=W(a,6),l=s[0],u=s[1],c=s[2],h=s[3],f=s[4],d=s[5];a[0]=l*t+c*e,a[1]=u*t+h*e,a[2]=l*n+c*r,a[3]=u*n+h*r,a[4]=l*i+c*o+f,a[5]=u*i+h*o+d;var p=[t,e,n,r,i,o].map(function(t){return At(t)}).join(" ");return this.addContent("".concat(p," cm"))},translate:function(t,e){return this.transform(1,0,0,1,t,e)},rotate:function(t,e){var n,r,i,o=1<arguments.length&&void 0!==e?e:{},a=t*Math.PI/180,s=Math.cos(a),l=Math.sin(a),u=r=0;return null!=o.origin&&(i=(u=(n=W(o.origin,2))[0])*l+(r=n[1])*s,u-=u*s-r*l,r-=i),this.transform(s,l,-l,s,u,r)},scale:function(t,e,n){var r=2<arguments.length&&void 0!==n?n:{};null==e&&(e=t),"object"==typeof e&&(r=e,e=t);var i,o,a=o=0;return null!=r.origin&&(a=(i=W(r.origin,2))[0],o=i[1],a-=t*a,o-=e*o),this.transform(t,0,0,e,a,o)}},Et={402:131,8211:150,8212:151,8216:145,8217:146,8218:130,8220:147,8221:148,8222:132,8224:134,8225:135,8226:149,8230:133,8364:128,8240:137,8249:139,8250:155,710:136,8482:153,338:140,339:156,732:152,352:138,353:154,376:159,381:142,382:158},Ot=".notdef       .notdef        .notdef        .notdef\n.notdef       .notdef        .notdef        .notdef\n.notdef       .notdef        .notdef        .notdef\n.notdef       .notdef        .notdef        .notdef\n.notdef       .notdef        .notdef        .notdef\n.notdef       .notdef        .notdef        .notdef\n.notdef       .notdef        .notdef        .notdef\n.notdef       .notdef        .notdef        .notdef\n  \nspace         exclam         quotedbl       numbersign\ndollar        percent        ampersand      quotesingle\nparenleft     parenright     asterisk       plus\ncomma         hyphen         period         slash\nzero          one            two            three\nfour          five           six            seven\neight         nine           colon          semicolon\nless          equal          greater        question\n  \nat            A              B              C\nD             E              F              G\nH             I              J              K\nL             M              N              O\nP             Q              R              S\nT             U              V              W\nX             Y              Z              bracketleft\nbackslash     bracketright   asciicircum    underscore\n  \ngrave         a              b              c\nd             e              f              g\nh             i              j              k\nl             m              n              o\np             q              r              s\nt             u              v              w\nx             y              z              braceleft\nbar           braceright     asciitilde     .notdef\n  \nEuro          .notdef        quotesinglbase florin\nquotedblbase  ellipsis       dagger         daggerdbl\ncircumflex    perthousand    Scaron         guilsinglleft\nOE            .notdef        Zcaron         .notdef\n.notdef       quoteleft      quoteright     quotedblleft\nquotedblright bullet         endash         emdash\ntilde         trademark      scaron         guilsinglright\noe            .notdef        zcaron         ydieresis\n  \nspace         exclamdown     cent           sterling\ncurrency      yen            brokenbar      section\ndieresis      copyright      ordfeminine    guillemotleft\nlogicalnot    hyphen         registered     macron\ndegree        plusminus      twosuperior    threesuperior\nacute         mu             paragraph      periodcentered\ncedilla       onesuperior    ordmasculine   guillemotright\nonequarter    onehalf        threequarters  questiondown\n  \nAgrave        Aacute         Acircumflex    Atilde\nAdieresis     Aring          AE             Ccedilla\nEgrave        Eacute         Ecircumflex    Edieresis\nIgrave        Iacute         Icircumflex    Idieresis\nEth           Ntilde         Ograve         Oacute\nOcircumflex   Otilde         Odieresis      multiply\nOslash        Ugrave         Uacute         Ucircumflex\nUdieresis     Yacute         Thorn          germandbls\n  \nagrave        aacute         acircumflex    atilde\nadieresis     aring          ae             ccedilla\negrave        eacute         ecircumflex    edieresis\nigrave        iacute         icircumflex    idieresis\neth           ntilde         ograve         oacute\nocircumflex   otilde         odieresis      divide\noslash        ugrave         uacute         ucircumflex\nudieresis     yacute         thorn          ydieresis".split(/\s+/),Tt=function(){function n(t){u(this,n),this.contents=t,this.attributes={},this.glyphWidths={},this.boundingBoxes={},this.kernPairs={},this.parse(),this.charWidths=new Array(256);for(var e=0;e<=255;e++)this.charWidths[e]=this.glyphWidths[Ot[e]];this.bbox=this.attributes.FontBBox.split(/\s+/).map(function(t){return+t}),this.ascender=+(this.attributes.Ascender||0),this.descender=+(this.attributes.Descender||0),this.xHeight=+(this.attributes.XHeight||0),this.capHeight=+(this.attributes.CapHeight||0),this.lineGap=this.bbox[3]-this.bbox[1]-(this.ascender-this.descender)}return c(n,null,[{key:"open",value:function(t){return new n(s.readFileSync(t,"utf8"))}}]),c(n,[{key:"parse",value:function(){var t="",e=!0,n=!1,r=void 0;try{for(var i,o=this.contents.split("\n")[Symbol.iterator]();!(e=(i=o.next()).done);e=!0){var a,s,l=i.value;if(a=l.match(/^Start(\w+)/))t=a[1];else if(a=l.match(/^End(\w+)/))t="";else switch(t){case"FontMetrics":var u=(a=l.match(/(^\w+)\s+(.*)/))[1],c=a[2];(s=this.attributes[u])?(Array.isArray(s)||(s=this.attributes[u]=[s]),s.push(c)):this.attributes[u]=c;break;case"CharMetrics":if(!/^CH?\s/.test(l))continue;var h=l.match(/\bN\s+(\.?\w+)\s*;/)[1];this.glyphWidths[h]=+l.match(/\bWX\s+(\d+)\s*;/)[1];break;case"KernPairs":(a=l.match(/^KPX\s+(\.?\w+)\s+(\.?\w+)\s+(-?\d+)/))&&(this.kernPairs[a[1]+"\0"+a[2]]=parseInt(a[3]))}}}catch(t){n=!0,r=t}finally{try{e||null==o.return||o.return()}finally{if(n)throw r}}}},{key:"encodeText",value:function(t){for(var e=[],n=0,r=t.length;n<r;n++){var i=t.charCodeAt(n),i=Et[i]||i;e.push(i.toString(16))}return e}},{key:"glyphsForString",value:function(t){for(var e=[],n=0,r=t.length;n<r;n++){var i=t.charCodeAt(n);e.push(this.characterToGlyph(i))}return e}},{key:"characterToGlyph",value:function(t){return Ot[Et[t]||t]||".notdef"}},{key:"widthOfGlyph",value:function(t){return this.glyphWidths[t]||0}},{key:"getKernPair",value:function(t,e){return this.kernPairs[t+"\0"+e]||0}},{key:"advancesForGlyphs",value:function(t){for(var e=[],n=0;n<t.length;n++){var r=t[n],i=t[n+1];e.push(this.widthOfGlyph(r)+this.getKernPair(r,i))}return e}}]),n}(),It=function(){function t(){u(this,t)}return c(t,[{key:"encode",value:function(){throw new Error("Must be implemented by subclasses")}},{key:"widthOfString",value:function(){throw new Error("Must be implemented by subclasses")}},{key:"ref",value:function(){return null!=this.dictionary?this.dictionary:this.dictionary=this.document.ref()}},{key:"finalize",value:function(){if(!this.embedded&&null!=this.dictionary)return this.embed(),this.embedded=!0}},{key:"embed",value:function(){throw new Error("Must be implemented by subclasses")}},{key:"lineHeight",value:function(t,e){null==e&&(e=!1);var n=e?this.lineGap:0;return(this.ascender+n-this.descender)/1e3*t}}]),t}(),Lt={Courier:function(){return s.readFileSync(t+"/data/Courier.afm","utf8")},"Courier-Bold":function(){return s.readFileSync(t+"/data/Courier-Bold.afm","utf8")},"Courier-Oblique":function(){return s.readFileSync(t+"/data/Courier-Oblique.afm","utf8")},"Courier-BoldOblique":function(){return s.readFileSync(t+"/data/Courier-BoldOblique.afm","utf8")},Helvetica:function(){return s.readFileSync(t+"/data/Helvetica.afm","utf8")},"Helvetica-Bold":function(){return s.readFileSync(t+"/data/Helvetica-Bold.afm","utf8")},"Helvetica-Oblique":function(){return s.readFileSync(t+"/data/Helvetica-Oblique.afm","utf8")},"Helvetica-BoldOblique":function(){return s.readFileSync(t+"/data/Helvetica-BoldOblique.afm","utf8")},"Times-Roman":function(){return s.readFileSync(t+"/data/Times-Roman.afm","utf8")},"Times-Bold":function(){return s.readFileSync(t+"/data/Times-Bold.afm","utf8")},"Times-Italic":function(){return s.readFileSync(t+"/data/Times-Italic.afm","utf8")},"Times-BoldItalic":function(){return s.readFileSync(t+"/data/Times-BoldItalic.afm","utf8")},Symbol:function(){return s.readFileSync(t+"/data/Symbol.afm","utf8")},ZapfDingbats:function(){return s.readFileSync(t+"/data/ZapfDingbats.afm","utf8")}},Mt=function(){function o(t,e,n){var r;u(this,o),(r=v(this,d(o).call(this))).document=t,r.name=e,r.id=n,r.font=new Tt(Lt[r.name]());var i=r.font;return r.ascender=i.ascender,r.descender=i.descender,r.bbox=i.bbox,r.lineGap=i.lineGap,r.xHeight=i.xHeight,r.capHeight=i.capHeight,r}return h(o,It),c(o,[{key:"embed",value:function(){return this.dictionary.data={Type:"Font",BaseFont:this.name,Subtype:"Type1",Encoding:"WinAnsiEncoding"},this.dictionary.end()}},{key:"encode",value:function(t){for(var e=this.font.encodeText(t),n=this.font.glyphsForString("".concat(t)),r=this.font.advancesForGlyphs(n),i=[],o=0;o<n.length;o++){var a=n[o];i.push({xAdvance:r[o],yAdvance:0,xOffset:0,yOffset:0,advanceWidth:this.font.widthOfGlyph(a)})}return[e,i]}},{key:"widthOfString",value:function(t,e){var n=this.font.glyphsForString("".concat(t)),r=this.font.advancesForGlyphs(n),i=0,o=!0,a=!1,s=void 0;try{for(var l,u=r[Symbol.iterator]();!(o=(l=u.next()).done);o=!0){i+=l.value}}catch(t){a=!0,s=t}finally{try{o||null==u.return||u.return()}finally{if(a)throw s}}return i*(e/1e3)}}],[{key:"isStandardFont",value:function(t){return t in Lt}}]),o}(),Bt=function(){function i(t,e,n){var r;return u(this,i),(r=v(this,d(i).call(this))).document=t,r.font=e,r.id=n,r.subset=r.font.createSubset(),r.unicode=[[0]],r.widths=[r.font.getGlyph(0).advanceWidth],r.name=r.font.postscriptName,r.scale=1e3/r.font.unitsPerEm,r.ascender=r.font.ascent*r.scale,r.descender=r.font.descent*r.scale,r.xHeight=r.font.xHeight*r.scale,r.capHeight=r.font.capHeight*r.scale,r.lineGap=r.font.lineGap*r.scale,r.bbox=r.font.bbox,!1!==t.options.fontLayoutCache&&(r.layoutCache=Object.create(null)),r}return h(i,It),c(i,[{key:"layoutRun",value:function(t,e){for(var n=this.font.layout(t,e),r=0;r<n.positions.length;r++){var i=n.positions[r];for(var o in i)i[o]*=this.scale;i.advanceWidth=n.glyphs[r].advanceWidth*this.scale}return n}},{key:"layoutCached",value:function(t){if(!this.layoutCache)return this.layoutRun(t);var e;if(e=this.layoutCache[t])return e;var n=this.layoutRun(t);return this.layoutCache[t]=n}},{key:"layout",value:function(t,e,n){if(e)return this.layoutRun(t,e);for(var r,i,o=n?null:[],a=n?null:[],s=0,l=0,u=0;u<=t.length;){u===t.length&&l<u||(r=t.charAt(u),[" ","\t"].includes(r))?(i=this.layoutCached(t.slice(l,++u)),n||(o=o.concat(i.glyphs),a=a.concat(i.positions)),s+=i.advanceWidth,l=u):u++}return{glyphs:o,positions:a,advanceWidth:s}}},{key:"encode",value:function(t,e){for(var n=this.layout(t,e),r=n.glyphs,i=n.positions,o=[],a=0;a<r.length;a++){var s=r[a],l=this.subset.includeGlyph(s.id);o.push("0000".concat(l.toString(16)).slice(-4)),null==this.widths[l]&&(this.widths[l]=s.advanceWidth*this.scale),null==this.unicode[l]&&(this.unicode[l]=s.codePoints)}return[o,i]}},{key:"widthOfString",value:function(t,e,n){return this.layout(t,n,!0).advanceWidth*(e/1e3)}},{key:"embed",value:function(){var e=this,t=null!=this.subset.cff,n=this.document.ref();t&&(n.data.Subtype="CIDFontType0C"),this.subset.encodeStream().on("data",function(t){return n.write(t)}).on("end",function(){return n.end()});var r=((null!=this.font["OS/2"]?this.font["OS/2"].sFamilyClass:void 0)||0)>>8,i=0;this.font.post.isFixedPitch&&(i|=1),1<=r&&r<=7&&(i|=2),i|=4,10==r&&(i|=8),this.font.head.macStyle.italic&&(i|=64);var o=[1,2,3,4,5,6].map(function(t){return String.fromCharCode((e.id.charCodeAt(t)||74)+16)}).join("")+"+"+this.font.postscriptName,a=this.font.bbox,s=this.document.ref({Type:"FontDescriptor",FontName:o,Flags:i,FontBBox:[a.minX*this.scale,a.minY*this.scale,a.maxX*this.scale,a.maxY*this.scale],ItalicAngle:this.font.italicAngle,Ascent:this.ascender,Descent:this.descender,CapHeight:(this.font.capHeight||this.font.ascent)*this.scale,XHeight:(this.font.xHeight||0)*this.scale,StemV:0});t?s.data.FontFile3=n:s.data.FontFile2=n,s.end();var l={Type:"Font",Subtype:"CIDFontType0",BaseFont:o,CIDSystemInfo:{Registry:new String("Adobe"),Ordering:new String("Identity"),Supplement:0},FontDescriptor:s,W:[0,this.widths]};t||(l.Subtype="CIDFontType2",l.CIDToGIDMap="Identity");var u=this.document.ref(l);return u.end(),this.dictionary.data={Type:"Font",Subtype:"Type0",BaseFont:o,Encoding:"Identity-H",DescendantFonts:[u],ToUnicode:this.toUnicodeCmap()},this.dictionary.end()}},{key:"toUnicodeCmap",value:function(){var t=this.document.ref(),e=[],n=!0,r=!1,i=void 0;try{for(var o,a=this.unicode[Symbol.iterator]();!(n=(o=a.next()).done);n=!0){var s=o.value,l=[],u=!0,c=!1,h=void 0;try{for(var f,d=s[Symbol.iterator]();!(u=(f=d.next()).done);u=!0){var p=f.value;65535<p&&(p-=65536,l.push(nt(p>>>10&1023|55296)),p=56320|1023&p),l.push(nt(p))}}catch(t){c=!0,h=t}finally{try{u||null==d.return||d.return()}finally{if(c)throw h}}e.push("<".concat(l.join(" "),">"))}}catch(t){r=!0,i=t}finally{try{n||null==a.return||a.return()}finally{if(r)throw i}}return t.end("/CIDInit /ProcSet findresource begin\n12 dict begin\nbegincmap\n/CIDSystemInfo <<\n  /Registry (Adobe)\n  /Ordering (UCS)\n  /Supplement 0\n>> def\n/CMapName /Adobe-Identity-UCS def\n/CMapType 2 def\n1 begincodespacerange\n<0000><ffff>\nendcodespacerange\n1 beginbfrange\n<0000> <".concat(nt(e.length-1),"> [").concat(e.join(" "),"]\nendbfrange\nendcmap\nCMapName currentdict /CMap defineresource pop\nend\nend")),t}}]),i}(),Rt=function(){function t(){u(this,t)}return c(t,null,[{key:"open",value:function(t,e,n,r){var i;if("string"==typeof e){if(Mt.isStandardFont(e))return new Mt(t,e,r);e=s.readFileSync(e)}if(g.isBuffer(e)?i=o.default.create(e,n):e instanceof Uint8Array?i=o.default.create(new g(e),n):e instanceof ArrayBuffer&&(i=o.default.create(new g(new Uint8Array(e)),n)),null==i)throw new Error("Not a supported font format or standard PDF font.");return new Bt(t,i,r)}}]),t}(),Ft={initFonts:function(t){var e=0<arguments.length&&void 0!==t?t:"Helvetica";this._fontFamilies={},this._fontCount=0,this._fontSize=12,this._font=null,this._registeredFonts={},e&&this.font(e)},font:function(t,e,n){var r,i,o;if("number"==typeof e&&(n=e,e=null),"string"==typeof t&&this._registeredFonts[t]?(r=t,t=(o=this._registeredFonts[t]).src,e=o.family):"string"!=typeof(r=e||t)&&(r=null),null!=n&&this.fontSize(n),i=this._fontFamilies[r])return this._font=i,this;var a="F".concat(++this._fontCount);return this._font=Rt.open(this,t,e,a),(i=this._fontFamilies[this._font.name])?this._font=i:(r&&(this._fontFamilies[r]=this._font),this._font.name&&(this._fontFamilies[this._font.name]=this._font)),this},fontSize:function(t){return this._fontSize=t,this},currentLineHeight:function(t){return null==t&&(t=!1),this._font.lineHeight(this._fontSize,t)},registerFont:function(t,e,n){return this._registeredFonts[t]={src:e,family:n},this}},Dt=function(){function r(t,e){var n;return u(this,r),(n=v(this,d(r).call(this))).document=t,n.indent=e.indent||0,n.characterSpacing=e.characterSpacing||0,n.wordSpacing=0===e.wordSpacing,n.columns=e.columns||1,n.columnGap=null!=e.columnGap?e.columnGap:18,n.lineWidth=(e.width-n.columnGap*(n.columns-1))/n.columns,n.spaceLeft=n.lineWidth,n.startX=n.document.x,n.startY=n.document.y,n.column=1,n.ellipsis=e.ellipsis,n.continuedX=0,n.features=e.features,null!=e.height?(n.height=e.height,n.maxY=n.startY+e.height):n.maxY=n.document.page.maxY(),n.on("firstLine",function(t){var e=n.continuedX||n.indent;return n.document.x+=e,n.lineWidth-=e,n.once("line",function(){if(n.document.x-=e,n.lineWidth+=e,t.continued&&!n.continuedX&&(n.continuedX=n.indent),!t.continued)return n.continuedX=0})}),n.on("lastLine",function(t){var e=t.align;return"justify"===e&&(t.align="left"),n.lastLine=!0,n.once("line",function(){return n.document.y+=t.paragraphGap||0,t.align=e,n.lastLine=!1})}),n}return h(r,n.EventEmitter),c(r,[{key:"wordWidth",value:function(t){return this.document.widthOfString(t,this)+this.characterSpacing+this.wordSpacing}},{key:"eachWord",value:function(t,e){for(var n,r=new p.default(t),i=null,o=Object.create(null);n=r.nextBreak();){var a,s=t.slice((null!=i?i.position:void 0)||0,n.position),l=null!=o[s]?o[s]:o[s]=this.wordWidth(s);if(l>this.lineWidth+this.continuedX)for(var u,c,h=i,f={};s.length;){l>this.spaceLeft?(u=Math.ceil(this.spaceLeft/(l/s.length)),c=(l=this.wordWidth(s.slice(0,u)))<=this.spaceLeft&&u<s.length):u=s.length;for(var d=l>this.spaceLeft&&0<u;d||c;)d?d=(l=this.wordWidth(s.slice(0,--u)))>this.spaceLeft&&0<u:(d=(l=this.wordWidth(s.slice(0,++u)))>this.spaceLeft&&0<u,c=l<=this.spaceLeft&&u<s.length);if(0===u&&this.spaceLeft===this.lineWidth&&(u=1),f.required=n.required||u<s.length,a=e(s.slice(0,u),l,f,h),h={required:!1},s=s.slice(u),l=this.wordWidth(s),!1===a)break}else a=e(s,l,n,i);if(!1===a)break;i=n}}},{key:"wrap",value:function(t,o){var a=this;null!=o.indent&&(this.indent=o.indent),null!=o.characterSpacing&&(this.characterSpacing=o.characterSpacing),null!=o.wordSpacing&&(this.wordSpacing=o.wordSpacing),null!=o.ellipsis&&(this.ellipsis=o.ellipsis);var e=this.document.y+this.document.currentLineHeight(!0);(this.document.y>this.maxY||e>this.maxY)&&this.nextSection();function s(){return o.textWidth=u+a.wordSpacing*(c-1),o.wordCount=c,o.lineWidth=a.lineWidth,r=a.document.y,a.emit("line",l,o,a),n++}var l="",u=0,c=0,n=0,r=this.document.y;return this.emit("sectionStart",o,this),this.eachWord(t,function(t,e,n,r){if(null!=r&&!r.required||(a.emit("firstLine",o,a),a.spaceLeft=a.lineWidth),e<=a.spaceLeft&&(l+=t,u+=e,c++),n.required||e>a.spaceLeft){var i=a.document.currentLineHeight(!0);if(null!=a.height&&a.ellipsis&&a.document.y+2*i>a.maxY&&a.column>=a.columns){for(!0===a.ellipsis&&(a.ellipsis="â€¦"),l=l.replace(/\s+$/,""),u=a.wordWidth(l+a.ellipsis);l&&u>a.lineWidth;)l=l.slice(0,-1).replace(/\s+$/,""),u=a.wordWidth(l+a.ellipsis);u<=a.lineWidth&&(l+=a.ellipsis),u=a.wordWidth(l)}if(n.required&&(e>a.spaceLeft&&(s(),l=t,u=e,c=1),a.emit("lastLine",o,a)),s(),a.document.y+i>a.maxY)if(!a.nextSection())return c=0,l="",!1;return c=n.required?(a.spaceLeft=a.lineWidth,l="",u=0):(a.spaceLeft=a.lineWidth-e,l=t,u=e,1)}return a.spaceLeft-=e}),0<c&&(this.emit("lastLine",o,this),s()),this.emit("sectionEnd",o,this),!0===o.continued?(1<n&&(this.continuedX=0),this.continuedX+=o.textWidth||0,this.document.y=r):this.document.x=this.startX}},{key:"nextSection",value:function(t){if(this.emit("sectionEnd",t,this),++this.column>this.columns){if(null!=this.height)return!1;var e;this.document.addPage(),this.column=1,this.startY=this.document.page.margins.top,this.maxY=this.document.page.maxY(),this.document.x=this.startX,this.document._fillColor&&(e=this.document).fillColor.apply(e,V(this.document._fillColor)),this.emit("pageBreak",t,this)}else this.document.x+=this.lineWidth+this.columnGap,this.document.y=this.startY,this.emit("columnBreak",t,this);return this.emit("sectionStart",t,this),!0}}]),r}(),zt=_.number,Nt={initText:function(){return this._line=this._line.bind(this),this.x=0,this.y=0,this._lineGap=0},lineGap:function(t){return this._lineGap=t,this},moveDown:function(t){return null==t&&(t=1),this.y+=this.currentLineHeight(!0)*t+this._lineGap,this},moveUp:function(t){return null==t&&(t=1),this.y-=this.currentLineHeight(!0)*t+this._lineGap,this},_text:function(t,e,n,r,i){if(r=this._initOptions(e,n,r),t=null==t?"":"".concat(t),r.wordSpacing&&(t=t.replace(/\s{2,}/g," ")),r.width){var o=this._wrapper;o||(o=new Dt(this,r)).on("line",i),this._wrapper=r.continued?o:null,this._textOptions=r.continued?r:null,o.wrap(t,r)}else{var a=!0,s=!1,l=void 0;try{for(var u,c=t.split("\n")[Symbol.iterator]();!(a=(u=c.next()).done);a=!0){i(u.value,r)}}catch(t){s=!0,l=t}finally{try{a||null==c.return||c.return()}finally{if(s)throw l}}}return this},text:function(t,e,n,r){return this._text(t,e,n,r,this._line)},widthOfString:function(t,e){var n=1<arguments.length&&void 0!==e?e:{};return this._font.widthOfString(t,this._fontSize,n.features)+(n.characterSpacing||0)*(t.length-1)},heightOfString:function(t,e){var n=this,r=this.x,i=this.y;(e=this._initOptions(e)).height=1/0;var o=e.lineGap||this._lineGap||0;this._text(t,this.x,this.y,e,function(){return n.y+=n.currentLineHeight(!0)+o});var a=this.y-i;return this.x=r,this.y=i,a},list:function(t,e,n,r,i){var o=this,a=(r=this._initOptions(e,n,r)).listType||"bullet",s=Math.round(this._font.ascender/1e3*this._fontSize),l=s/2,u=r.bulletRadius||s/3,c=r.textIndent||("bullet"===a?5*u:2*s),h=r.bulletIndent||("bullet"===a?8*u:2*s),f=1,d=[],p=[],g=[];!function t(e){for(var n=1,r=0;r<e.length;r++){var i=e[r];Array.isArray(i)?(f++,t(i),f--):(d.push(i),p.push(f),"bullet"!==a&&g.push(n++))}}(t);(i=new Dt(this,r)).on("line",this._line),f=1;var y=0;return i.on("firstLine",function(){var t,e;switch((t=p[y++])!==f&&(e=h*(t-f),o.x+=e,i.lineWidth-=e,f=t),a){case"bullet":return o.circle(o.x-c+u,o.y+l,u),o.fill();case"numbered":case"lettered":var n=function(t){switch(a){case"numbered":return"".concat(t,".");case"lettered":var e=String.fromCharCode((t-1)%26+65),n=Math.floor((t-1)/26+1),r=Array(n+1).join(e);return"".concat(r,".")}}(g[y-1]);return o._fragment(n,o.x-c,o.y,r)}}),i.on("sectionStart",function(){var t=c+h*(f-1);return o.x+=t,i.lineWidth-=t}),i.on("sectionEnd",function(){var t=c+h*(f-1);return o.x-=t,i.lineWidth+=t}),i.wrap(d.join("\n"),r),this},_initOptions:function(t,e,n){var r=0<arguments.length&&void 0!==t?t:{},i=1<arguments.length?e:void 0,o=2<arguments.length&&void 0!==n?n:{};"object"==typeof r&&(o=r,r=null);var a=Object.assign({},o);if(this._textOptions)for(var s in this._textOptions){var l=this._textOptions[s];"continued"!==s&&void 0===a[s]&&(a[s]=l)}return null!=r&&(this.x=r),null!=i&&(this.y=i),!1!==a.lineBreak&&(null==a.width&&(a.width=this.page.width-this.x-this.page.margins.right),a.width=Math.max(a.width,0)),a.columns||(a.columns=0),null==a.columnGap&&(a.columnGap=18),a},_line:function(t,e,n){var r=1<arguments.length&&void 0!==e?e:{},i=2<arguments.length?n:void 0;this._fragment(t,this.x,this.y,r);var o=r.lineGap||this._lineGap||0;return i?this.y+=this.currentLineHeight(!0)+o:this.x+=this.widthOfString(t)},_fragment:function(t,e,n,r){var i,o,a,s=this;if(0!==(t="".concat(t).replace(/\n/g,"")).length){var l=r.align||"left",u=r.wordSpacing||0,c=r.characterSpacing||0;if(r.width)switch(l){case"right":o=this.widthOfString(t.replace(/\s+$/,""),r),e+=r.lineWidth-o;break;case"center":e+=r.lineWidth/2-r.textWidth/2;break;case"justify":a=t.trim().split(/\s+/),o=this.widthOfString(t.replace(/\s+/g,""),r);var h=this.widthOfString(" ")+c,u=Math.max(0,(r.lineWidth-o)/Math.max(1,a.length-1)-h)}if("number"==typeof r.baseline)i=-r.baseline;else{switch(r.baseline){case"svg-middle":i=.5*this._font.xHeight;break;case"middle":case"svg-central":i=.5*(this._font.descender+this._font.ascender);break;case"bottom":case"ideographic":i=this._font.descender;break;case"alphabetic":i=0;break;case"mathematical":i=.5*this._font.ascender;break;case"hanging":i=.8*this._font.ascender;break;case"top":i=this._font.ascender;break;default:i=this._font.ascender}i=i/1e3*this._fontSize}var f,d,p,g,y=r.textWidth+u*(r.wordCount-1)+c*(t.length-1);null!=r.link&&this.link(e,n,y,this.currentLineHeight(),r.link),null!=r.goTo&&this.goTo(e,n,y,this.currentLineHeight(),r.goTo),null!=r.destination&&this.addNamedDestination(r.destination,"XYZ",e,n,null),(r.underline||r.strike)&&(this.save(),r.stroke||this.strokeColor.apply(this,V(this._fillColor||[])),f=this._fontSize<10?.5:Math.floor(this._fontSize/10),this.lineWidth(f),d=r.underline?1:2,p=n+this.currentLineHeight()/d,r.underline&&(p-=f),this.moveTo(e,p),this.lineTo(e+y,p),this.stroke(),this.restore()),this.save(),r.oblique&&(g="number"==typeof r.oblique?-Math.tan(r.oblique*Math.PI/180):-.25,this.transform(1,0,0,1,e,n),this.transform(1,0,g,1,-g*i,0),this.transform(1,0,0,1,-e,-n)),this.transform(1,0,0,-1,0,this.page.height),n=this.page.height-n-i,null==this.page.fonts[this._font.id]&&(this.page.fonts[this._font.id]=this._font.ref()),this.addContent("BT"),this.addContent("1 0 0 1 ".concat(zt(e)," ").concat(zt(n)," Tm")),this.addContent("/".concat(this._font.id," ").concat(zt(this._fontSize)," Tf"));var v=r.fill&&r.stroke?2:r.stroke?1:0;if(v&&this.addContent("".concat(v," Tr")),c&&this.addContent("".concat(zt(c)," Tc")),u){a=t.trim().split(/\s+/),u+=this.widthOfString(" ")+c,u*=1e3/this._fontSize,P=[];var m=!0,b=!(E=[]),w=void 0;try{for(var x,S=a[Symbol.iterator]();!(m=(x=S.next()).done);m=!0){var _=x.value,k=W(this._font.encode(_,r.features),2),A=k[0],C=k[1],P=P.concat(A),E=E.concat(C),O={},T=E[E.length-1];for(var I in T){var L=T[I];O[I]=L}O.xAdvance+=u,E[E.length-1]=O}}catch(t){b=!0,w=t}finally{try{m||null==S.return||S.return()}finally{if(b)throw w}}}else{var M=W(this._font.encode(t,r.features),2);P=M[0],E=M[1]}for(var B=this._fontSize/1e3,R=[],F=0,D=!1,z=function(t){var e,n;return F<t&&(e=P.slice(F,t).join(""),n=E[t-1].xAdvance-E[t-1].advanceWidth,R.push("<".concat(e,"> ").concat(zt(-n)))),F=t},N=function(t){if(z(t),0<R.length)return s.addContent("[".concat(R.join(" "),"] TJ")),R.length=0},U=0;U<E.length;U++){var j=E[U];j.xOffset||j.yOffset?(N(U),this.addContent("1 0 0 1 ".concat(zt(e+j.xOffset*B)," ").concat(zt(n+j.yOffset*B)," Tm")),N(U+1),D=!0):(D&&(this.addContent("1 0 0 1 ".concat(zt(e)," ").concat(zt(n)," Tm")),D=!1),j.xAdvance-j.advanceWidth!=0&&z(U+1)),e+=j.xAdvance*B}return N(U),this.addContent("ET"),this.restore()}}},Ut=[65472,65473,65474,65475,65477,65478,65479,65480,65481,65482,65483,65484,65485,65486,65487],jt={1:"DeviceGray",3:"DeviceRGB",4:"DeviceCMYK"},Wt=function(){function o(t,e){var n;if(u(this,o),this.data=t,this.label=e,65496!==this.data.readUInt16BE(0))throw"SOI not found in JPEG";for(var r=2;r<this.data.length&&(n=this.data.readUInt16BE(r),r+=2,!Ut.includes(n));)r+=this.data.readUInt16BE(r);if(!Ut.includes(n))throw"Invalid JPEG.";r+=2,this.bits=this.data[r++],this.height=this.data.readUInt16BE(r),r+=2,this.width=this.data.readUInt16BE(r),r+=2;var i=this.data[r++];this.colorSpace=jt[i],this.obj=null}return c(o,[{key:"embed",value:function(t){if(!this.obj)return this.obj=t.ref({Type:"XObject",Subtype:"Image",BitsPerComponent:this.bits,Width:this.width,Height:this.height,ColorSpace:this.colorSpace,Filter:"DCTDecode"}),"DeviceCMYK"===this.colorSpace&&(this.obj.data.Decode=[1,0,1,0,1,0,1,0]),this.obj.end(this.data),this.data=null}}]),o}(),Vt=function(){function n(t,e){u(this,n),this.label=e,this.image=new r.default(t),this.width=this.image.width,this.height=this.image.height,this.imgData=this.image.imgData,this.obj=null}return c(n,[{key:"embed",value:function(t){var e=!1;if(this.document=t,!this.obj){var n,r,i=this.image.hasAlphaChannel,o=1===this.image.interlaceMethod;if(this.obj=this.document.ref({Type:"XObject",Subtype:"Image",BitsPerComponent:i?8:this.image.bits,Width:this.width,Height:this.height,Filter:"FlateDecode"}),i||(n=this.document.ref({Predictor:o?1:15,Colors:this.image.colors,BitsPerComponent:this.image.bits,Columns:this.width}),(this.obj.data.DecodeParms=n).end()),0===this.image.palette.length?this.obj.data.ColorSpace=this.image.colorSpace:((r=this.document.ref()).end(new g(this.image.palette)),this.obj.data.ColorSpace=["Indexed","DeviceRGB",this.image.palette.length/3-1,r]),null!=this.image.transparency.grayscale){var a=this.image.transparency.grayscale;this.obj.data.Mask=[a,a]}else if(this.image.transparency.rgb){var s=this.image.transparency.rgb,l=[],u=!0,c=!1,h=void 0;try{for(var f,d=s[Symbol.iterator]();!(u=(f=d.next()).done);u=!0){var p=f.value;l.push(p,p)}}catch(t){c=!0,h=t}finally{try{u||null==d.return||d.return()}finally{if(c)throw h}}this.obj.data.Mask=l}else{if(this.image.transparency.indexed)return e=!0,this.loadIndexedAlphaChannel();if(i)return e=!0,this.splitAlphaChannel()}if(o&&!e)return this.decodeData();this.finalize()}}},{key:"finalize",value:function(){var t;return this.alphaChannel&&((t=this.document.ref({Type:"XObject",Subtype:"Image",Height:this.height,Width:this.width,BitsPerComponent:8,Filter:"FlateDecode",ColorSpace:"DeviceGray",Decode:[0,1]})).end(this.alphaChannel),this.obj.data.SMask=t),this.obj.end(this.imgData),this.image=null,this.imgData=null}},{key:"splitAlphaChannel",value:function(){var h=this;return this.image.decodePixels(function(t){for(var e,n,r=h.image.colors,i=h.width*h.height,o=new g(i*r),a=new g(i),s=n=e=0,l=t.length,u=16===h.image.bits?1:0;s<l;){for(var c=0;c<r;c++)o[n++]=t[s++],s+=u;a[e++]=t[s++],s+=u}return h.imgData=f.default.deflateSync(o),h.alphaChannel=f.default.deflateSync(a),h.finalize()})}},{key:"loadIndexedAlphaChannel",value:function(){var o=this,a=this.image.transparency.indexed;return this.image.decodePixels(function(t){for(var e=new g(o.width*o.height),n=0,r=0,i=t.length;r<i;r++)e[n++]=a[t[r]];return o.alphaChannel=f.default.deflateSync(e),o.finalize()})}},{key:"decodeData",value:function(){var e=this;this.image.decodePixels(function(t){e.imgData=f.default.deflateSync(t),e.finalize()})}}]),n}(),Gt=function(){function t(){u(this,t)}return c(t,null,[{key:"open",value:function(t,e){var n,r;if(g.isBuffer(t))n=t;else if(t instanceof ArrayBuffer)n=new g(new Uint8Array(t));else{if(r=/^data:.+;base64,(.*)$/.exec(t))n=new g(r[1],"base64");else if(!(n=s.readFileSync(t)))return}if(255===n[0]&&216===n[1])return new Wt(n,e);if(137===n[0]&&"PNG"===n.toString("ascii",1,4))return new Vt(n,e);throw new Error("Unknown image format.")}}]),t}(),Ht={initImages:function(){return this._imageRegistry={},this._imageCount=0},image:function(t,e,n){var r,i,o,a=3<arguments.length&&void 0!==arguments[3]?arguments[3]:{};"object"==typeof e&&(a=e,e=null),e=null!=(i=null!=e?e:a.x)?i:this.x,n=null!=(o=null!=n?n:a.y)?o:this.y,"string"==typeof t&&(r=this._imageRegistry[t]),r=r||(t.width&&t.height?t:this.openImage(t)),r.obj||r.embed(this),null==this.page.xobjects[r.label]&&(this.page.xobjects[r.label]=r.obj);var s,l,u,c,h,f,d,p=a.width||r.width,g=a.height||r.height;return a.width&&!a.height?(s=p/r.width,p=r.width*s,g=r.height*s):a.height&&!a.width?(l=g/r.height,p=r.width*l,g=r.height*l):a.scale?(p=r.width*a.scale,g=r.height*a.scale):a.fit?(c=(u=W(a.fit,2))[0])/(h=u[1])<(f=r.width/r.height)?g=(p=c)/f:p=(g=h)*f:a.cover&&((c=(d=W(a.cover,2))[0])/(h=d[1])<(f=r.width/r.height)?p=(g=h)*f:g=(p=c)/f),(a.fit||a.cover)&&("center"===a.align?e=e+c/2-p/2:"right"===a.align&&(e=e+c-p),"center"===a.valign?n=n+h/2-g/2:"bottom"===a.valign&&(n=n+h-g)),null!=a.link&&this.link(e,n,p,g,a.link),null!=a.goTo&&this.goTo(e,n,p,g,a.goTo),null!=a.destination&&this.addNamedDestination(a.destination,"XYZ",e,n,null),this.y===n&&(this.y+=g),this.save(),this.transform(p,0,0,-g,e,n+g),this.addContent("/".concat(r.label," Do")),this.restore(),this},openImage:function(t){var e;return"string"==typeof t&&(e=this._imageRegistry[t]),e||(e=Gt.open(t,"I".concat(++this._imageCount)),"string"==typeof t&&(this._imageRegistry[t]=e)),e}},qt={annotate:function(t,e,n,r,i){for(var o in i.Type="Annot",i.Rect=this._convertRect(t,e,n,r),i.Border=[0,0,0],"Link"===i.Subtype&&void 0===i.F&&(i.F=4),"Link"!==i.Subtype&&null==i.C&&(i.C=this._normalizeColor(i.color||[0,0,0])),delete i.color,"string"==typeof i.Dest&&(i.Dest=new String(i.Dest)),i){var a=i[o];i[o[0].toUpperCase()+o.slice(1)]=a}var s=this.ref(i);return this.page.annotations.push(s),s.end(),this},note:function(t,e,n,r,i,o){var a=5<arguments.length&&void 0!==o?o:{};return a.Subtype="Text",a.Contents=new String(i),a.Name="Comment",null==a.color&&(a.color=[243,223,92]),this.annotate(t,e,n,r,a)},goTo:function(t,e,n,r,i,o){var a=5<arguments.length&&void 0!==o?o:{};return a.Subtype="Link",a.A=this.ref({S:"GoTo",D:new String(i)}),a.A.end(),this.annotate(t,e,n,r,a)},link:function(t,e,n,r,i,o){var a=5<arguments.length&&void 0!==o?o:{};if(a.Subtype="Link","number"==typeof i){var s=this._root.data.Pages.data;if(!(0<=i&&i<s.Kids.length))throw new Error("The document has no page ".concat(i));a.A=this.ref({S:"GoTo",D:[s.Kids[i],"XYZ",null,null,null]}),a.A.end()}else a.A=this.ref({S:"URI",URI:new String(i)}),a.A.end();return this.annotate(t,e,n,r,a)},_markup:function(t,e,n,r,i){var o=4<arguments.length&&void 0!==i?i:{},a=W(this._convertRect(t,e,n,r),4),s=a[0],l=a[1],u=a[2],c=a[3];return o.QuadPoints=[s,c,u,c,s,l,u,l],o.Contents=new String,this.annotate(t,e,n,r,o)},highlight:function(t,e,n,r,i){var o=4<arguments.length&&void 0!==i?i:{};return o.Subtype="Highlight",null==o.color&&(o.color=[241,238,148]),this._markup(t,e,n,r,o)},underline:function(t,e,n,r,i){var o=4<arguments.length&&void 0!==i?i:{};return o.Subtype="Underline",this._markup(t,e,n,r,o)},strike:function(t,e,n,r,i){var o=4<arguments.length&&void 0!==i?i:{};return o.Subtype="StrikeOut",this._markup(t,e,n,r,o)},lineAnnotation:function(t,e,n,r,i){var o=4<arguments.length&&void 0!==i?i:{};return o.Subtype="Line",o.Contents=new String,o.L=[t,this.page.height-e,n,this.page.height-r],this.annotate(t,e,n,r,o)},rectAnnotation:function(t,e,n,r,i){var o=4<arguments.length&&void 0!==i?i:{};return o.Subtype="Square",o.Contents=new String,this.annotate(t,e,n,r,o)},ellipseAnnotation:function(t,e,n,r,i){var o=4<arguments.length&&void 0!==i?i:{};return o.Subtype="Circle",o.Contents=new String,this.annotate(t,e,n,r,o)},textAnnotation:function(t,e,n,r,i,o){var a=5<arguments.length&&void 0!==o?o:{};return a.Subtype="FreeText",a.Contents=new String(i),a.DA=new String,this.annotate(t,e,n,r,a)},_convertRect:function(t,e,n,r){var i=e;e+=r;var o=t+n,a=W(this._ctm,6),s=a[0],l=a[1],u=a[2],c=a[3],h=a[4],f=a[5];return[t=s*t+u*e+h,e=l*t+c*e+f,o=s*o+u*i+h,l*o+c*i+f]}},Zt=function(){function o(t,e,n,r){var i=4<arguments.length&&void 0!==arguments[4]?arguments[4]:{expanded:!1};u(this,o),this.document=t,this.options=i,this.outlineData={},null!==r&&(this.outlineData.Dest=[r.dictionary,"Fit"]),null!==e&&(this.outlineData.Parent=e),null!==n&&(this.outlineData.Title=new String(n)),this.dictionary=this.document.ref(this.outlineData),this.children=[]}return c(o,[{key:"addItem",value:function(t,e){var n=1<arguments.length&&void 0!==e?e:{expanded:!1},r=new o(this.document,this.dictionary,t,this.document.page,n);return this.children.push(r),r}},{key:"endOutline",value:function(){if(0<this.children.length){this.options.expanded&&(this.outlineData.Count=this.children.length);var t=this.children[0],e=this.children[this.children.length-1];this.outlineData.First=t.dictionary,this.outlineData.Last=e.dictionary;for(var n=0,r=this.children.length;n<r;n++){var i=this.children[n];0<n&&(i.outlineData.Prev=this.children[n-1].dictionary),n<this.children.length-1&&(i.outlineData.Next=this.children[n+1].dictionary),i.endOutline()}}return this.dictionary.end()}}]),o}(),Xt={initOutline:function(){return this.outline=new Zt(this,null,null,null)},endOutline:function(){if(this.outline.endOutline(),0<this.outline.children.length)return this._root.data.Outlines=this.outline.dictionary,this._root.data.PageMode="UseOutlines"}},Yt={readOnly:1,required:2,noExport:4,multiline:4096,password:8192,toggleToOffButton:16384,radioButton:32768,pushButton:65536,combo:131072,edit:262144,sort:524288,multiSelect:2097152,noSpell:4194304},Kt={left:0,center:1,right:2},Jt={value:"V",defaultValue:"DV"},Qt={zip:"0",zipPlus4:"1",zip4:"1",phone:"2",ssn:"3"},$t={nDec:0,sepComma:!1,negStyle:"MinusBlack",currency:"",currencyPrepend:!0},te={nDec:0,sepComma:!1},ee={initForm:function(){if(!this._font)throw new Error("Must set a font before calling initForm method");this._acroform={fonts:{},defaultFont:this._font.name},this._acroform.fonts[this._font.id]=this._font.ref();var t={Fields:[],NeedAppearances:!0,DA:new String("/".concat(this._font.id," 0 Tf 0 g")),DR:{Font:{}}};t.DR.Font[this._font.id]=this._font.ref();var e=this.ref(t);return this._root.data.AcroForm=e,this},endAcroForm:function(){var e=this;if(this._root.data.AcroForm){if(!Object.keys(this._acroform.fonts).length&&!this._acroform.defaultFont)throw new Error("No fonts specified for PDF form");var n=this._root.data.AcroForm.data.DR.Font;Object.keys(this._acroform.fonts).forEach(function(t){n[t]=e._acroform.fonts[t]}),this._root.data.AcroForm.data.Fields.forEach(function(t){e._endChild(t)}),this._root.data.AcroForm.end()}return this},_endChild:function(t){var e=this;return Array.isArray(t.data.Kids)&&(t.data.Kids.forEach(function(t){e._endChild(t)}),t.end()),this},formField:function(t,e){var n=1<arguments.length&&void 0!==e?e:{},r=this._fieldDict(t,null,n),i=this.ref(r);return this._addToParent(i),i},formAnnotation:function(t,e,n,r,i,o,a){var s=6<arguments.length&&void 0!==a?a:{},l=this._fieldDict(t,e,s);l.Subtype="Widget",void 0===l.F&&(l.F=4),this.annotate(n,r,i,o,l);var u=this.page.annotations[this.page.annotations.length-1];return this._addToParent(u)},formText:function(t,e,n,r,i,o){var a=5<arguments.length&&void 0!==o?o:{};return this.formAnnotation(t,"text",e,n,r,i,a)},formPushButton:function(t,e,n,r,i,o){var a=5<arguments.length&&void 0!==o?o:{};return this.formAnnotation(t,"pushButton",e,n,r,i,a)},formCombo:function(t,e,n,r,i,o){var a=5<arguments.length&&void 0!==o?o:{};return this.formAnnotation(t,"combo",e,n,r,i,a)},formList:function(t,e,n,r,i,o){var a=5<arguments.length&&void 0!==o?o:{};return this.formAnnotation(t,"list",e,n,r,i,a)},formRadioButton:function(t,e,n,r,i,o){var a=5<arguments.length&&void 0!==o?o:{};return this.formAnnotation(t,"radioButton",e,n,r,i,a)},formCheckbox:function(t,e,n,r,i,o){var a=5<arguments.length&&void 0!==o?o:{};return this.formAnnotation(t,"checkbox",e,n,r,i,a)},_addToParent:function(t){var e=t.data.Parent;return e?(e.data.Kids||(e.data.Kids=[]),e.data.Kids.push(t)):this._root.data.AcroForm.data.Fields.push(t),this},_fieldDict:function(t,e,n){var r=2<arguments.length&&void 0!==n?n:{};if(!this._acroform)throw new Error("Call document.initForms() method before adding form elements to document");var i=Object.assign({},r);return null!==e&&(i=this._resolveType(e,r)),i=this._resolveFlags(i),i=this._resolveJustify(i),i=this._resolveFont(i),i=this._resolveStrings(i),i=this._resolveColors(i),(i=this._resolveFormat(i)).T=new String(t),i.parent&&(i.Parent=i.parent,delete i.parent),i},_resolveType:function(t,e){if("text"===t)e.FT="Tx";else if("pushButton"===t)e.FT="Btn",e.pushButton=!0;else if("radioButton"===t)e.FT="Btn",e.radioButton=!0;else if("checkbox"===t)e.FT="Btn";else if("combo"===t)e.FT="Ch",e.combo=!0;else{if("list"!==t)throw new Error("Invalid form annotation type '".concat(t,"'"));e.FT="Ch"}return e},_resolveFormat:function(t){var e,n,r,i,o,a,s=t.format;return s&&s.type&&(r="",void 0!==Qt[s.type]?(o="AFSpecial_Keystroke",a="AFSpecial_Format",r=Qt[s.type]):(e=s.type.charAt(0).toUpperCase()+s.type.slice(1),o="AF".concat(e,"_Keystroke"),a="AF".concat(e,"_Format"),"date"===s.type?(o+="Ex",r=String(s.param)):"time"===s.type?r=String(s.param):"number"===s.type?(n=Object.assign({},$t,s),r=String([String(n.nDec),n.sepComma?"0":"1",'"'+n.negStyle+'"',"null",'"'+n.currency+'"',String(n.currencyPrepend)].join(","))):"percent"===s.type&&(i=Object.assign({},te,s),r=String([String(i.nDec),i.sepComma?"0":"1"].join(",")))),t.AA=t.AA?t.AA:{},t.AA.K={S:"JavaScript",JS:new String("".concat(o,"(").concat(r,");"))},t.AA.F={S:"JavaScript",JS:new String("".concat(a,"(").concat(r,");"))}),delete t.format,t},_resolveColors:function(t){var e=this._normalizeColor(t.backgroundColor);return e&&(t.MK||(t.MK={}),t.MK.BG=e),(e=this._normalizeColor(t.borderColor))&&(t.MK||(t.MK={}),t.MK.BC=e),delete t.backgroundColor,delete t.borderColor,t},_resolveFlags:function(e){var n=0;return Object.keys(e).forEach(function(t){Yt[t]&&(n|=Yt[t],delete e[t])}),0!==n&&(e.Ff=e.Ff?e.Ff:0,e.Ff|=n),e},_resolveJustify:function(t){var e=0;return void 0!==t.align&&("number"==typeof Kt[t.align]&&(e=Kt[t.align]),delete t.align),0!==e&&(t.Q=e),t},_resolveFont:function(t){return null===this._acroform.fonts[this._font.id]&&(this._acroform.fonts[this._font.id]=this._font.ref()),this._acroform.defaultFont!==this._font.name&&(t.DR={Font:{}},t.DR.Font[this._font.id]=this._font.ref(),t.DA=new String("/".concat(this._font.id," 0 Tf 0 g"))),t},_resolveStrings:function(e){var n=[];function t(t){if(Array.isArray(t))for(var e=0;e<t.length;e++)"string"==typeof t[e]?n.push(new String(t[e])):n.push(t[e])}return t(e.Opt),e.select&&(t(e.select),delete e.select),n.length&&(e.Opt=n),e.value||e.defaultValue,Object.keys(Jt).forEach(function(t){void 0!==e[t]&&(e[Jt[t]]=e[t],delete e[t])}),["V","DV"].forEach(function(t){"string"==typeof e[t]&&(e[t]=new String(e[t]))}),e.MK&&e.MK.CA&&(e.MK.CA=new String(e.MK.CA)),e.label&&(e.MK=e.MK?e.MK:{},e.MK.CA=new String(e.label),delete e.label),e}},ne=function(){function a(){var t,e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};switch(u(this,a),((t=v(this,d(a).call(this,e))).options=e).pdfVersion){case"1.4":t.version=1.4;break;case"1.5":t.version=1.5;break;case"1.6":t.version=1.6;break;case"1.7":case"1.7ext3":t.version=1.7;break;default:t.version=1.3}t.compress=null==t.options.compress||t.options.compress,t._pageBuffer=[],t._pageBufferStart=0,t._offsets=[],t._waiting=0,t._ended=!1,t._offset=0;var n=t.ref({Type:"Pages",Count:0,Kids:[]}),r=t.ref({Dests:new w});if(t._root=t.ref({Type:"Catalog",Pages:n,Names:r}),t.page=null,t.initColor(),t.initVector(),t.initFonts(e.font),t.initText(),t.initImages(),t.initOutline(),t.info={Producer:"PDFKit",Creator:"PDFKit",CreationDate:new Date},t.options.info)for(var i in t.options.info){var o=t.options.info[i];t.info[i]=o}return t._id=K.generateFileID(t.info),t._security=K.create(y(t),e),t._write("%PDF-".concat(t.version)),t._write("%Ã¿Ã¿Ã¿Ã¿"),!1!==t.options.autoFirstPage&&t.addPage(),t}return h(a,e.default.Readable),c(a,[{key:"addPage",value:function(t){null==t&&(t=this.options),this.options.bufferPages||this.flushPages(),this.page=new P(this,t),this._pageBuffer.push(this.page);var e=this._root.data.Pages.data;return e.Kids.push(this.page.dictionary),e.Count++,this.x=this.page.margins.left,this.y=this.page.margins.top,this._ctm=[1,0,0,1,0,0],this.transform(1,0,0,-1,0,this.page.height),this.emit("pageAdded"),this}},{key:"bufferedPageRange",value:function(){return{start:this._pageBufferStart,count:this._pageBuffer.length}}},{key:"switchToPage",value:function(t){var e;if(!(e=this._pageBuffer[t-this._pageBufferStart]))throw new Error("switchToPage(".concat(t,") out of bounds, current buffer covers pages ").concat(this._pageBufferStart," to ").concat(this._pageBufferStart+this._pageBuffer.length-1));return this.page=e}},{key:"flushPages",value:function(){var t=this._pageBuffer;this._pageBuffer=[],this._pageBufferStart+=t.length;var e=!0,n=!1,r=void 0;try{for(var i,o=t[Symbol.iterator]();!(e=(i=o.next()).done);e=!0){i.value.end()}}catch(t){n=!0,r=t}finally{try{e||null==o.return||o.return()}finally{if(n)throw r}}}},{key:"addNamedDestination",value:function(t){for(var e=arguments.length,n=new Array(1<e?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];0===n.length&&(n=["XYZ",null,null,null]),"XYZ"===n[0]&&null!==n[2]&&(n[2]=this.page.height-n[2]),n.unshift(this.page.dictionary),this._root.data.Names.data.Dests.add(t,n)}},{key:"addNamedJavaScript",value:function(t,e){this._root.data.Names.data.JavaScript||(this._root.data.Names.data.JavaScript=new w);var n={JS:new String(e),S:"JavaScript"};this._root.data.Names.data.JavaScript.add(t,n)}},{key:"ref",value:function(t){var e=new k(this,this._offsets.length+1,t);return this._offsets.push(null),this._waiting++,e}},{key:"_read",value:function(){}},{key:"_write",value:function(t){return g.isBuffer(t)||(t=new g(t+"\n","binary")),this.push(t),this._offset+=t.length}},{key:"addContent",value:function(t){return this.page.write(t),this}},{key:"_refEnd",value:function(t){if(this._offsets[t.id-1]=t.offset,0==--this._waiting&&this._ended)return this._finalize(),this._ended=!1}},{key:"write",value:function(t,e){new Error("PDFDocument#write is deprecated, and will be removed in a future version of PDFKit. Please pipe the document into a Node stream.");return this.pipe(s.createWriteStream(t)),this.end(),this.once("end",e)}},{key:"end",value:function(){for(var t in this.flushPages(),this._info=this.ref(),this.info){var e=this.info[t];"string"==typeof e&&(e=new String(e));var n=this.ref(e);n.end(),this._info.data[t]=n}for(var r in this._info.end(),this._fontFamilies){this._fontFamilies[r].finalize()}return this.endOutline(),this._root.end(),this._root.data.Pages.end(),this._root.data.Names.end(),this.endAcroForm(),this._security&&this._security.end(),0===this._waiting?this._finalize():this._ended=!0}},{key:"_finalize",value:function(){var t=this._offset;this._write("xref"),this._write("0 ".concat(this._offsets.length+1)),this._write("0000000000 65535 f ");var e=!0,n=!1,r=void 0;try{for(var i,o=this._offsets[Symbol.iterator]();!(e=(i=o.next()).done);e=!0){var a=i.value,a="0000000000".concat(a).slice(-10);this._write(a+" 00000 n ")}}catch(t){n=!0,r=t}finally{try{e||null==o.return||o.return()}finally{if(n)throw r}}var s={Size:this._offsets.length+1,Root:this._root,Info:this._info,ID:[this._id,this._id]};return this._security&&(s.Encrypt=this._security.dictionary),this._write("trailer"),this._write(_.convert(s)),this._write("startxref"),this._write("".concat(t)),this._write("%%EOF"),this.push(null)}},{key:"toString",value:function(){return"[object PDFDocument]"}}]),a}();rt(yt),rt(Pt),rt(Ft),rt(Nt),rt(Ht),rt(qt),rt(Xt),rt(ee),re.default=ne}).call(this,ie(10).Buffer,"/")},function(t,e,n){var r=n(3),i=n(138),o=r.WeakMap;t.exports="function"==typeof o&&/native code/.test(i(o))},function(t,e,n){var r=n(36),i=n(56),o=n(141),a=n(16);t.exports=r("Reflect","ownKeys")||function(t){var e=i.f(a(t)),n=o.f;return n?e.concat(n(t)):e}},function(t,e,n){var r=n(11),a=n(15),s=n(16),l=n(94);t.exports=r?Object.defineProperties:function(t,e){s(t);for(var n,r=l(e),i=r.length,o=0;o<i;)a.f(t,n=r[o++],e[n]);return t}},function(t,e,n){var r=n(27),i=n(56).f,o={}.toString,a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];t.exports.f=function(t){return a&&"[object Window]"==o.call(t)?function(t){try{return i(t)}catch(t){return a.slice()}}(t):i(r(t))}},function(t,e,n){"use strict";var r=n(1),i=n(20).every,o=n(58),a=n(31),s=o("every"),l=a("every");r({target:"Array",proto:!0,forced:!s||!l},{every:function(t,e){return i(this,t,1<arguments.length?e:void 0)}})},function(t,e,n){"use strict";var r=n(1),i=n(20).filter,o=n(116),a=n(31),s=o("filter"),l=a("filter");r({target:"Array",proto:!0,forced:!s||!l},{filter:function(t,e){return i(this,t,1<arguments.length?e:void 0)}})},function(t,e,n){"use strict";var r=n(1),i=n(212);r({target:"Array",proto:!0,forced:[].forEach!=i},{forEach:i})},function(t,e,n){"use strict";var y=n(96),v=n(19),m=n(214),b=n(148),w=n(8),x=n(144),S=n(149);t.exports=function(t,e,n){var r,i,o,a,s,l,u=v(t),c="function"==typeof this?this:Array,h=arguments.length,f=1<h?e:void 0,d=void 0!==f,p=S(u),g=0;if(d&&(f=y(f,2<h?n:void 0,2)),null==p||c==Array&&b(p))for(i=new c(r=w(u.length));g<r;g++)l=d?f(u[g],g):u[g],x(i,g,l);else for(s=(a=p.call(u)).next,i=new c;!(o=s.call(a)).done;g++)l=d?m(a,f,[o.value,g],!0):o.value,x(i,g,l);return i.length=g,i}},function(t,e,n){"use strict";function i(){return this}var o=n(217).IteratorPrototype,a=n(57),s=n(42),l=n(95),u=n(97);t.exports=function(t,e,n){var r=e+" Iterator";return t.prototype=a(o,{next:s(1,n)}),l(t,r,!1,!0),u[r]=i,t}},function(t,e,n){var r=n(13);t.exports=function(t){if(!r(t)&&null!==t)throw TypeError("Can't set "+String(t)+" as a prototype");return t}},function(t,e,n){"use strict";var r=n(1),i=n(20).map,o=n(116),a=n(31),s=o("map"),l=a("map");r({target:"Array",proto:!0,forced:!s||!l},{map:function(t,e){return i(this,t,1<arguments.length?e:void 0)}})},function(t,e,n){"use strict";var r=n(1),i=n(20).some,o=n(58),a=n(31),s=o("some"),l=a("some");r({target:"Array",proto:!0,forced:!s||!l},{some:function(t,e){return i(this,t,1<arguments.length?e:void 0)}})},function(t,e,n){"use strict";var r=n(1),i=n(3),o=n(152),a=n(154),s="ArrayBuffer",l=o[s];r({global:!0,forced:i[s]!==l},{ArrayBuffer:l}),a(s)},function(t,e){var d=Math.abs,p=Math.pow,g=Math.floor,y=Math.log,v=Math.LN2;t.exports={pack:function(t,e,n){var r,i,o,a=new Array(n),s=8*n-e-1,l=(1<<s)-1,u=l>>1,c=23===e?p(2,-24)-p(2,-77):0,h=t<0||0===t&&1/t<0?1:0,f=0;for((t=d(t))!=t||t===1/0?(i=t!=t?1:0,r=l):(r=g(y(t)/v),t*(o=p(2,-r))<1&&(r--,o*=2),2<=(t+=1<=r+u?c/o:c*p(2,1-u))*o&&(r++,o/=2),l<=r+u?(i=0,r=l):1<=r+u?(i=(t*o-1)*p(2,e),r+=u):(i=t*p(2,u-1)*p(2,e),r=0));8<=e;a[f++]=255&i,i/=256,e-=8);for(r=r<<e|i,s+=e;0<s;a[f++]=255&r,r/=256,s-=8);return a[--f]|=128*h,a},unpack:function(t,e){var n,r=t.length,i=8*r-e-1,o=(1<<i)-1,a=o>>1,s=i-7,l=r-1,u=t[l--],c=127&u;for(u>>=7;0<s;c=256*c+t[l],l--,s-=8);for(n=c&(1<<-s)-1,c>>=-s,s+=e;0<s;n=256*n+t[l],l--,s-=8);if(0===c)c=1-a;else{if(c===o)return n?NaN:u?-1/0:1/0;n+=p(2,e),c-=a}return(u?-1:1)*n*p(2,c-e)}}},function(t,e,n){n(1)({target:"Number",stat:!0},{isFinite:n(323)})},function(t,e,n){var r=n(3).isFinite;t.exports=Number.isFinite||function(t){return"number"==typeof t&&r(t)}},function(t,e,n){var r=n(1),i=n(325);r({target:"Object",stat:!0,forced:Object.assign!==i},{assign:i})},function(t,e,n){"use strict";var f=n(11),r=n(4),d=n(94),p=n(141),g=n(110),y=n(19),v=n(92),i=Object.assign,o=Object.defineProperty;t.exports=!i||r(function(){if(f&&1!==i({b:1},i(o({},"a",{enumerable:!0,get:function(){o(this,"b",{value:3,enumerable:!1})}}),{b:2})).b)return!0;var t={},e={},n=Symbol(),r="abcdefghijklmnopqrst";return t[n]=7,r.split("").forEach(function(t){e[t]=t}),7!=i({},t)[n]||d(i({},e)).join("")!=r})?function(t,e){for(var n=y(t),r=arguments.length,i=1,o=p.f,a=g.f;i<r;)for(var s,l=v(arguments[i++]),u=o?d(l).concat(o(l)):d(l),c=u.length,h=0;h<c;)s=u[h++],f&&!a.call(l,s)||(n[s]=l[s]);return n}:i},function(t,e,n){var r=n(1),i=n(4),o=n(19),a=n(59),s=n(218);r({target:"Object",stat:!0,forced:i(function(){a(1)}),sham:!s},{getPrototypeOf:function(t){return a(o(t))}})},function(t,e,n){n(1)({target:"Object",stat:!0},{setPrototypeOf:n(45)})},function(t,e,n){"use strict";var r=n(150),i=n(117);t.exports=r?{}.toString:function(){return"[object "+i(this)+"]"}},function(t,e,n){"use strict";var r=n(4);function i(t,e){return RegExp(t,e)}e.UNSUPPORTED_Y=r(function(){var t=i("a","y");return t.lastIndex=2,null!=t.exec("abcd")}),e.BROKEN_CARET=r(function(){var t=i("^r","gy");return t.lastIndex=2,null!=t.exec("str")})},function(t,e,n){"use strict";var r=n(1),i=n(156).codeAt;r({target:"String",proto:!0},{codePointAt:function(t){return i(this,t)}})},function(t,e,n){var r=n(1),o=n(43),a=String.fromCharCode,i=String.fromCodePoint;r({target:"String",stat:!0,forced:!!i&&1!=i.length},{fromCodePoint:function(t){for(var e,n=[],r=arguments.length,i=0;i<r;){if(e=+arguments[i++],o(e,1114111)!==e)throw RangeError(e+" is not a valid code point");n.push(e<65536?a(e):a(55296+((e-=65536)>>10),e%1024+56320))}return n.join("")}})},function(t,e,n){var r=n(13),i=n(30),o=n(6)("match");t.exports=function(t){var e;return r(t)&&(void 0!==(e=t[o])?!!e:"RegExp"==i(t))}},function(t,e,n){var r=n(4),i=n(226);t.exports=function(t){return r(function(){return!!i[t]()||"â€‹Â…á Ž"!="â€‹Â…á Ž"[t]()||i[t].name!==t})}},function(t,e,n){"use strict";var r=n(1),i=n(234);r({target:"String",proto:!0,forced:n(235)("strike")},{strike:function(){return i(this,"strike","","")}})},function(t,e,n){var r=n(3),i=n(4),o=n(151),a=n(5).NATIVE_ARRAY_BUFFER_VIEWS,s=r.ArrayBuffer,l=r.Int8Array;t.exports=!a||!i(function(){l(1)})||!i(function(){new l(-1)})||!o(function(t){new l,new l(null),new l(1.5),new l(t)},!0)||i(function(){return 1!==new l(new s(2),1,void 0).length})},function(t,e,n){var r=n(37);t.exports=function(t){var e=r(t);if(e<0)throw RangeError("The argument can't be less than 0");return e}},function(t,e,n){var p=n(19),g=n(8),y=n(149),v=n(148),m=n(96),b=n(5).aTypedArrayConstructor;t.exports=function(t,e,n){var r,i,o,a,s,l,u=p(t),c=arguments.length,h=1<c?e:void 0,f=void 0!==h,d=y(u);if(null!=d&&!v(d))for(l=(s=d.call(u)).next,u=[];!(a=l.call(s)).done;)u.push(a.value);for(f&&2<c&&(h=m(h,n,2)),i=g(u.length),o=new(b(this))(i),r=0;r<i;r++)o[r]=f?h(u[r],r):u[r];return o}},function(t,e,n){"use strict";var c=n(19),h=n(43),f=n(8),d=Math.min;t.exports=[].copyWithin||function(t,e,n){var r=c(this),i=f(r.length),o=h(t,i),a=h(e,i),s=2<arguments.length?n:void 0,l=d((void 0===s?i:h(s,i))-a,i-o),u=1;for(a<o&&o<a+l&&(u=-1,a+=l-1,o+=l-1);0<l--;)a in r?r[o]=r[a]:delete r[o],o+=u,a+=u;return r}},function(t,e,n){"use strict";var o=n(27),a=n(37),s=n(8),r=n(58),i=n(31),l=Math.min,u=[].lastIndexOf,c=!!u&&1/[1].lastIndexOf(1,-0)<0,h=r("lastIndexOf"),f=i("indexOf",{ACCESSORS:!0,1:0}),d=c||!h||!f;t.exports=d?function(t,e){if(c)return u.apply(this,arguments)||0;var n=o(this),r=s(n.length),i=r-1;for(1<arguments.length&&(i=l(i,a(e))),i<0&&(i=r+i);0<=i;i--)if(i in n&&n[i]===t)return i||0;return-1}:u},function(t,e,n){var r=n(3),i=n(239),o=n(212),a=n(18);for(var s in i){var l=r[s],u=l&&l.prototype;if(u&&u.forEach!==o)try{a(u,"forEach",o)}catch(t){u.forEach=o}}},function(t,e){},function(t,e,n){"use strict";var s=n(123).Buffer,r=n(343);function i(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,i),this.head=null,this.tail=null,this.length=0}t.exports=(i.prototype.push=function(t){var e={data:t,next:null};0<this.length?this.tail.next=e:this.head=e,this.tail=e,++this.length},i.prototype.unshift=function(t){var e={data:t,next:this.head};0===this.length&&(this.tail=e),this.head=e,++this.length},i.prototype.shift=function(){if(0!==this.length){var t=this.head.data;return 1===this.length?this.head=this.tail=null:this.head=this.head.next,--this.length,t}},i.prototype.clear=function(){this.head=this.tail=null,this.length=0},i.prototype.join=function(t){if(0===this.length)return"";for(var e=this.head,n=""+e.data;e=e.next;)n+=t+e.data;return n},i.prototype.concat=function(t){if(0===this.length)return s.alloc(0);if(1===this.length)return this.head.data;for(var e,n,r,i=s.allocUnsafe(t>>>0),o=this.head,a=0;o;)e=o.data,n=i,r=a,e.copy(n,r),a+=o.data.length,o=o.next;return i},i),r&&r.inspect&&r.inspect.custom&&(t.exports.prototype[r.inspect.custom]=function(){var t=r.inspect({length:this.length});return this.constructor.name+" "+t})},function(t,e){},function(t,e,n){(function(n){function r(t){try{if(!n.localStorage)return}catch(t){return}var e=n.localStorage[t];return null!=e&&"true"===String(e).toLowerCase()}t.exports=function(t,e){if(r("noDeprecation"))return t;var n=!1;return function(){if(!n){if(r("throwDeprecation"))throw new Error(e);r("traceDeprecation"),n=!0}return t.apply(this,arguments)}}}).call(this,n(26))},function(t,e,n){"use strict";t.exports=o;var r=n(243),i=Object.create(n(98));function o(t){if(!(this instanceof o))return new o(t);r.call(this,t)}i.inherits=n(85),i.inherits(o,r),o.prototype._transform=function(t,e,n){n(null,t)}},function(t,e,n){t.exports=n(164)},function(t,e,n){t.exports=n(48)},function(t,e,n){t.exports=n(163).Transform},function(t,e,n){t.exports=n(163).PassThrough},function(t,f,r){"use strict";(function(u,c){var h=r(245),o=r(354),a=r(355),s=r(358),t=r(361);for(var e in t)f[e]=t[e];f.NONE=0,f.DEFLATE=1,f.INFLATE=2,f.GZIP=3,f.GUNZIP=4,f.DEFLATERAW=5,f.INFLATERAW=6,f.UNZIP=7;function n(t){if("number"!=typeof t||t<f.DEFLATE||t>f.UNZIP)throw new TypeError("Bad argument");this.dictionary=null,this.err=0,this.flush=0,this.init_done=!1,this.level=0,this.memLevel=0,this.mode=t,this.strategy=0,this.windowBits=0,this.write_in_progress=!1,this.pending_close=!1,this.gzip_id_bytes_read=0}n.prototype.close=function(){this.write_in_progress?this.pending_close=!0:(this.pending_close=!1,h(this.init_done,"close before init"),h(this.mode<=f.UNZIP),this.mode===f.DEFLATE||this.mode===f.GZIP||this.mode===f.DEFLATERAW?a.deflateEnd(this.strm):this.mode!==f.INFLATE&&this.mode!==f.GUNZIP&&this.mode!==f.INFLATERAW&&this.mode!==f.UNZIP||s.inflateEnd(this.strm),this.mode=f.NONE,this.dictionary=null)},n.prototype.write=function(t,e,n,r,i,o,a){return this._write(!0,t,e,n,r,i,o,a)},n.prototype.writeSync=function(t,e,n,r,i,o,a){return this._write(!1,t,e,n,r,i,o,a)},n.prototype._write=function(t,e,n,r,i,o,a,s){if(h.equal(arguments.length,8),h(this.init_done,"write before init"),h(this.mode!==f.NONE,"already finalized"),h.equal(!1,this.write_in_progress,"write already in progress"),h.equal(!1,this.pending_close,"close is pending"),this.write_in_progress=!0,h.equal(!1,void 0===e,"must provide flush value"),this.write_in_progress=!0,e!==f.Z_NO_FLUSH&&e!==f.Z_PARTIAL_FLUSH&&e!==f.Z_SYNC_FLUSH&&e!==f.Z_FULL_FLUSH&&e!==f.Z_FINISH&&e!==f.Z_BLOCK)throw new Error("Invalid flush value");if(null==n&&(n=u.alloc(0),r=i=0),this.strm.avail_in=i,this.strm.input=n,this.strm.next_in=r,this.strm.avail_out=s,this.strm.output=o,this.strm.next_out=a,this.flush=e,!t)return this._process(),this._checkError()?this._afterSync():void 0;var l=this;return c.nextTick(function(){l._process(),l._after()}),this},n.prototype._afterSync=function(){var t=this.strm.avail_out,e=this.strm.avail_in;return this.write_in_progress=!1,[e,t]},n.prototype._process=function(){var t=null;switch(this.mode){case f.DEFLATE:case f.GZIP:case f.DEFLATERAW:this.err=a.deflate(this.strm,this.flush);break;case f.UNZIP:switch(0<this.strm.avail_in&&(t=this.strm.next_in),this.gzip_id_bytes_read){case 0:if(null===t)break;if(31!==this.strm.input[t]){this.mode=f.INFLATE;break}if(t++,(this.gzip_id_bytes_read=1)===this.strm.avail_in)break;case 1:if(null===t)break;139===this.strm.input[t]?(this.gzip_id_bytes_read=2,this.mode=f.GUNZIP):this.mode=f.INFLATE;break;default:throw new Error("invalid number of gzip magic number bytes read")}case f.INFLATE:case f.GUNZIP:case f.INFLATERAW:for(this.err=s.inflate(this.strm,this.flush),this.err===f.Z_NEED_DICT&&this.dictionary&&(this.err=s.inflateSetDictionary(this.strm,this.dictionary),this.err===f.Z_OK?this.err=s.inflate(this.strm,this.flush):this.err===f.Z_DATA_ERROR&&(this.err=f.Z_NEED_DICT));0<this.strm.avail_in&&this.mode===f.GUNZIP&&this.err===f.Z_STREAM_END&&0!==this.strm.next_in[0];)this.reset(),this.err=s.inflate(this.strm,this.flush);break;default:throw new Error("Unknown mode "+this.mode)}},n.prototype._checkError=function(){switch(this.err){case f.Z_OK:case f.Z_BUF_ERROR:if(0!==this.strm.avail_out&&this.flush===f.Z_FINISH)return this._error("unexpected end of file"),!1;break;case f.Z_STREAM_END:break;case f.Z_NEED_DICT:return null==this.dictionary?this._error("Missing dictionary"):this._error("Bad dictionary"),!1;default:return this._error("Zlib error"),!1}return!0},n.prototype._after=function(){var t,e;this._checkError()&&(t=this.strm.avail_out,e=this.strm.avail_in,this.write_in_progress=!1,this.callback(e,t),this.pending_close&&this.close())},n.prototype._error=function(t){this.strm.msg&&(t=this.strm.msg),this.onerror(t,this.err),this.write_in_progress=!1,this.pending_close&&this.close()},n.prototype.init=function(t,e,n,r,i){h(4===arguments.length||5===arguments.length,"init(windowBits, level, memLevel, strategy, [dictionary])"),h(8<=t&&t<=15,"invalid windowBits"),h(-1<=e&&e<=9,"invalid compression level"),h(1<=n&&n<=9,"invalid memlevel"),h(r===f.Z_FILTERED||r===f.Z_HUFFMAN_ONLY||r===f.Z_RLE||r===f.Z_FIXED||r===f.Z_DEFAULT_STRATEGY,"invalid strategy"),this._init(e,t,n,r,i),this._setDictionary()},n.prototype.params=function(){throw new Error("deflateParams Not supported")},n.prototype.reset=function(){this._reset(),this._setDictionary()},n.prototype._init=function(t,e,n,r,i){switch(this.level=t,this.windowBits=e,this.memLevel=n,this.strategy=r,this.flush=f.Z_NO_FLUSH,this.err=f.Z_OK,this.mode!==f.GZIP&&this.mode!==f.GUNZIP||(this.windowBits+=16),this.mode===f.UNZIP&&(this.windowBits+=32),this.mode!==f.DEFLATERAW&&this.mode!==f.INFLATERAW||(this.windowBits=-1*this.windowBits),this.strm=new o,this.mode){case f.DEFLATE:case f.GZIP:case f.DEFLATERAW:this.err=a.deflateInit2(this.strm,this.level,f.Z_DEFLATED,this.windowBits,this.memLevel,this.strategy);break;case f.INFLATE:case f.GUNZIP:case f.INFLATERAW:case f.UNZIP:this.err=s.inflateInit2(this.strm,this.windowBits);break;default:throw new Error("Unknown mode "+this.mode)}this.err!==f.Z_OK&&this._error("Init error"),this.dictionary=i,this.write_in_progress=!1,this.init_done=!0},n.prototype._setDictionary=function(){if(null!=this.dictionary){switch(this.err=f.Z_OK,this.mode){case f.DEFLATE:case f.DEFLATERAW:this.err=a.deflateSetDictionary(this.strm,this.dictionary)}this.err!==f.Z_OK&&this._error("Failed to set dictionary")}},n.prototype._reset=function(){switch(this.err=f.Z_OK,this.mode){case f.DEFLATE:case f.DEFLATERAW:case f.GZIP:this.err=a.deflateReset(this.strm);break;case f.INFLATE:case f.INFLATERAW:case f.GUNZIP:this.err=s.inflateReset(this.strm)}this.err!==f.Z_OK&&this._error("Failed to reset stream")},f.Zlib=n}).call(this,r(10).Buffer,r(47))},function(t,e,n){"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var l=Object.getOwnPropertySymb
