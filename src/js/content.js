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
  $('body').animate({ scrollTop: 0 }, 300);
}

// Add paginator to bottom of job postings table
function clonePaginator() {
  var postingsTable = $('#postingsTablePlaceholder');
  var paginator = postingsTable.children('.orbis-posting-actions');
  if (paginator.length < 2) {
    postingsTable
        .append(paginator.clone())
        .append(
            $('<div>').addClass('scroll-top')
                .append($('<a>', { text: 'Back to top', href: ' ' })
                    .click(function (event) {
                      event.preventDefault();
                      scrollTop();
                    })));
  }
}

// For orbis header "Back Buttons"
function relocateButtons() {
  var orbisHeader = $('.orbisModuleHeader');
  var pager = orbisHeader.find('.pager');
  pager.remove();
  orbisHeader.append(pager);
}

function updateJobPostings() {
  injectJs(chrome.extension.getURL('js/injected.js'));
  clonePaginator();
}

// "Default" implementation of new tabs by storing buildForm script in anchor href as hash in url
var hash = window.location.hash;
if (hash.startsWith('#orbisApp.buildForm(') && hash.endsWith(').submit();')) {
  window.location.hash = '';
  chrome.runtime.sendMessage({ buildForm: hash.slice(1), url: window.location.href });
} else {
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
}

