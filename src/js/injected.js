/*
 WaterlooWorksPlus browser extension
 Copyright (C) 2017  Ze Hao (Kevin) Xiao

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
