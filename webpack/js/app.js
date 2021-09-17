import { Tooltip, Dropdown, Carousel } from 'bootstrap';
import '../scss/app.scss'

var tooltips = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltips.map(function (el) {
  return new Tooltip(el)
})

// import all assets in ./assets
function importAll(r) {
  return r.keys().map(r);
}
importAll(require.context('../imgs', false, /\.(png|jpe?g|svg|ico)$/));

/*
$(document).ready(function () {
    var window_width = $(window).width();
    // Github Latest Commit
    $.ajax({
      url: "https://api.github.com/repos/sh4nks/flaskbb/commits/master",
      dataType: "json",
      success: function (data) {
        var sha = data.sha,
            date = $.timeago(data.commit.author.date);
        if (window_width < 1120) {
          sha = sha.substring(0,7);
        }
        $('.github-commit').find('.date').html(date);
        $('.github-commit').find('.sha').html(sha).attr('href', data.html_url);
      }
    });

    // Open Issues and Pull Requests
    $.ajax({
      url: "https://api.github.com/repos/sh4nks/flaskbb/issues",
      dataType: "json",
      success: function (data) {
        var issues = 0;
        var pull_requests = 0;

        for(key in data)
        {
          if(data[key].pull_request === undefined) {
            issues++;
          } else {
            pull_requests++;
          }
        }

        $('.open-issues').html(issues);
        $('.pull-requests').html(pull_requests);
      }
    });
})
*/
