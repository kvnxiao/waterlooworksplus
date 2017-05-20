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

// Adds clickable subject links for message dashboard table (can be opened in new tab)
var dashTable = $('#dashboard_userCommonMyMessagesTableID');
dashTable.find('tbody tr td:nth-child(6)').each(function (_, d) {
  var td = $(d);
  var text = td.html();
  var onclick = td.parent().find('td:first-child a').attr('onclick');
  var link = $('<a>').attr('href', '#' + onclick).html(text);
  td.text('').append(link);

  link.click(function (event) {
    if (event.which === 1 && !event.ctrlKey) {
      eval(onclick);
    }
  });
});

// Shorten 'Acknowledgement Required' to 'Ack. Required'
dashTable.find('thead tr th:nth-child(3) a').text('Ack. Required');
