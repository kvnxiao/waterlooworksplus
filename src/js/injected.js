// Suppress click listeners for job postings
$('#postingsTable').find('tbody tr td:nth-child(3) a').each(function (_, a) {
  var currLink = $(a);
  currLink
      .attr('onclick-org', currLink.attr('onclick'))
      .attr('href', '#' + currLink.attr('onclick-org'))
      .removeAttr('onclick').off('click');

  // Load page directly on left click
  currLink.click(function (event) {
    if (event.which === 1 && !event.ctrlKey) {
      eval(currLink.attr('onclick-org'));
    }
  });
});
