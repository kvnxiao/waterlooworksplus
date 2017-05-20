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

// Extension start
console.log('WaterlooWorksPlus started!');

// Listener for newly loaded WaterlooWorks pages
function onMsgListener(request, sender) {
  if (request.buildForm) {
    chrome.tabs.executeScript(sender.tab.id, { code: decodeURI(request.buildForm) });
  }
}

// Register listener
chrome.runtime.onMessage.addListener(onMsgListener);
