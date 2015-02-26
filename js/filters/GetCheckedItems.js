app.filter('getCheckedItems', function() {
  return function (data) {
    var items = [];
    data.forEach(function (item) {
    	// console.log('item getCheckedItems:', item);
        // if (item.Checked || item.DocID === 111) items.push(item);
        if (item.Checked === true) items.push(item);
    });
    return items;
  }
});



// app.filter('unMatchedDocs', function() {
//   return function (data) {
//     var items = [];
//     data.forEach(function (item) {
//     	console.log('item unMatchedDocs:', item);
//         if (item.DocID === 111) items.push(item);
//     });
//     return items;
//   }
// });