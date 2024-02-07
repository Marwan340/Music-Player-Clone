*Added an event listener with DOMcontentloaded function to make the page load easily (loading JS code before HTML) and since we're outputting/fetchig data from XML.
*const getdata/productinput/table to add/get data to the table or get data from search field etc.
*Added an event listener for the button upon clicking and added a const that equals the value that's written in the search field.
*Added return to avoid having to refresh the web page.

*response.text since the fetched file is of XML extension.
*Added constants to parse the value from the brackets in the XML file, defining what we're parsing (text/xml), and getting the info below the tag name (product).
*Gived constants for earch criterium (I tried textContent instead of firstChild.nodeValue, which also worked).

*Added an If statement to ensure fiding the product without the search being case sensitive.
*Added constants for table data, and creating cells for each one, thereafter inserting the name/price etc in the cell by using innerhtml.

*Written a function to clear the row after each search, and created a call before fetching to remove the result before making a search.