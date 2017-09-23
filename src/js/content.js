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

// For injecting js to modify listeners in a non-sandboxed environment
function injectJs(script) {
  var s = document.createElement('script');
  s.src = script;
  (document.head || document.documentElement).appendChild(s);
  s.onload = function () {
    s.parentNode.removeChild(s);
  };
}

// Scroll to top of page in 300ms
function scrollTop() {
  $('body,html').animate({ scrollTop: 0 }, 300);
}

// Add paginator to bottom of job postings table
function addScrollTop() {
  var postingsTable = $('#postingsTablePlaceholder');
  postingsTable
      .append($('<div>').addClass('scroll-top')
      .append($('<a>', { text: 'Back to top', href: ' ' }).click(function (event) {
        event.preventDefault();
        scrollTop();
      })));
}

// For orbis header "Back Buttons"
function relocateButtons() {
  var orbisHeader = $('.orbisModuleHeader');
  var pager = orbisHeader.find('.pager');
  pager.remove();
  orbisHeader.append(pager);
}

// Update job postings table, called every time mutation is observed
function updateJobPostings() {
  // Suppress click listeners for job postings
  injectJs(chrome.extension.getURL('inject_job_table.js'));
  // Shorten some table header names
  var postingsTableRow = $('#postingsTable').find('thead').find('tr');
  postingsTableRow.find('th:nth-child(6)').find('a').text('Openings');
  postingsTableRow.find('th:nth-child(7)').find('a').text('Status');
  postingsTableRow.find('th:nth-child(11)').find('a').text('# of Apps');
  addScrollTop();
}

// "Default" implementation of new tabs by storing buildForm script in anchor href as hash in url
var hash = window.location.hash;
if (hash.startsWith('#orbisApp.buildForm(') && (hash.endsWith(').submit();') || hash.endsWith(').submit()'))) {
  window.location.hash = '';
  chrome.runtime.sendMessage({ buildForm: hash.slice(1), url: window.location.href });
}

// Mutate page
relocateButtons();

// Add job posting table modifications only if table exists
if (document.getElementById('postingsTablePlaceholder')) {
  // Paginator DOM watcher
  var aaaa = document.getElementsByClassName('aaaa');
  if (aaaa.length > 0) {
    var target = aaaa[0];
    var config = { attributes: false, childList: true, characterData: true, subtree: true };
    var observer = new MutationObserver(function () {
      // Temporarily remove mutation observer
      observer.disconnect();

      // Mutate job posting table
      updateJobPostings();

      // Re-add mutation observer
      observer.observe(target, config);
    });

    // First time modification init
    updateJobPostings();
    observer.observe(target, config);
  }
}

if (document.getElementById('dashboard_userCommonMyMessagesTableID')) {
  injectJs(chrome.extension.getURL('inject_message_table.js'));
}
