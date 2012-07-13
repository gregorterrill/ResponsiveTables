/*
* Responsive Table Script
* 2012 @GregorTerrill
*/
(function($){

	var breakpoint = 500,								//pixel width where tables toggle 
		vw = $(window).width(),							//viewport width
		originalTable = $('.responsiveTable').clone(); 	//original desktop tables

	var responsiveTables = function(vw) {

		if (vw < breakpoint) { 
			//swap all desktop tables with mobile versions
			$('.responsiveTable').each(function() {

				//label the table as mobile and change the subheading color
				$(this).removeClass('responsiveTable').addClass('responsiveTableMobile').css('width','100%');
				$(this).find('th[scope="rowgroup"]').addClass('altColor');
				
				//remove the header for the whole table and prep the row to add to each item later
				var thead = $(this).children('thead');
				var colHeaders = thead.children('tr');
				thead.hide();

				//get a list of all items (subheading rows don't have <td>s, so they will be excluded)
				var itemRows = $(this).find('tbody > tr:has(td)');

				//for each item, move the item description to its own row (spanning the whole table) and insert a copy of the column headers below it		
				itemRows.each(function() {

					//make the item's <th> span the whole table and wrap it in a <tr>, 
					//then select that <tr>, move it above the item row and give it a new class
					$(this).children('th').attr('colspan','100').wrap('<tr>').closest('tr').insertBefore($(this)).addClass('itemDescRow');

					//copy the table header <tr> and add it before the item row with the class itemColHeaders,
					//then remove <td>s as they would be empty cells
					colHeaders.clone().insertBefore($(this)).addClass('itemColHeaders').children('td').remove();
				});
			});
		} else {
			//swap mobile tables back to the desktop versions
			$('.responsiveTableMobile').each(function(i) {
				var orig = $(originalTable[i]).clone();
				$(this).replaceWith(orig);
			});
		};
	};

	//immediately check if original tables need to be swapped with mobile versions
	responsiveTables(vw);

	//check again on any window resize
	$(window).on("debouncedresize", function() { 
		vw = $(window).width();
		responsiveTables(vw);
	});

})(jQuery);