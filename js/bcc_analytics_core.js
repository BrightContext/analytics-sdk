/*global
  document,
  window,
  JSON,
  ActiveXObject,
  XMLHttpRequest,
  XDomainRequest,
  setInterval,
  console
*/

(function () {

  'use strict';

  var
    settings,
    environment = 'pub.brightcontext.com',
    user_id_cookie_name = 'bcau',
    rest_input,
    current_stats = {
      url: '',
      prevscroll: 0,
      scroll: 0
    },
    user = {},
    page_info = {}
  ;

  ////////////////////////////////////////////////////////////////////////////////
  // polyfills
  ////////////////////////////////////////////////////////////////////////////////

  //
  // Selectors API Level 1 (http://www.w3.org/TR/selectors-api/)
  // http://ajaxian.com/archives/creating-a-queryselector-for-ie-that-runs-at-native-speed
  //
  if (!document.querySelectorAll) {
    document.querySelectorAll = function (selectors) {
      var style = document.createElement('style'), elements = [], element;
      document.documentElement.firstChild.appendChild(style);
      document._qsa = [];

      style.styleSheet.cssText = selectors
        + '{x-qsa:expression(document._qsa && document._qsa.push(this))}'
      ;
      window.scrollBy(0, 0);
      style.parentNode.removeChild(style);

      while (document._qsa.length) {
        element = document._qsa.shift();
        element.style.removeAttribute('x-qsa');
        elements.push(element);
      }
      document._qsa = null;
      return elements;
    };
  }

  // http://www.sitepoint.com/javascript-json-serialization/
  if (!('JSON' in window)) {
    window.JSON = {};
  }

  if (!window.JSON.stringify) {
    JSON.stringify = function (obj) {
      var t, n, v, json = [], arr = (obj && obj.constructor === Array);

      t = typeof (obj);
      if (t !== 'object' || obj === null) {

        // simple data type
        if (t === 'string') {
          obj = '"'+obj+'"';
        }

        return String(obj);
      } else {
        // recurse array or object
        for (n in obj) {
          if (n) {
            v = obj[n];
            t = typeof(v);

            if (t === 'string') {
              v = '"' + v + '"';
            } else if (t === 'object' && v !== null) {
              v = JSON.stringify(v);
            }

            json.push((arr ? '' : '"' + n + '":') + String(v));
          }
        }

        return (arr ? '[' : '{') + String(json) + (arr ? ']' : '}');
      }
    };
  }

  ////////////////////////////////////////////////////////////////////////////////
  // cookies
  ////////////////////////////////////////////////////////////////////////////////

  // https://gist.github.com/jed/982883
  function id (a) {
    return a           // if the placeholder was passed, return
      ? (              // a random number from 0 to 15
        a ^            // unless b is 8,
        Math.random()  // in which case
        * 16           // a random number from
        >> a/4         // 8 to 11
        ).toString(16) // in hexadecimal
      : (              // or otherwise a concatenated string:
        [1e7] +        // 10000000 +
        -1e3 +         // -1000 +
        -4e3 +         // -4000 +
        -8e3 +         // -80000000 +
        -1e11          // -100000000000,
        ).replace(     // replacing
          /[018]/g,    // zeroes, ones, and eights with
          id           // random hex digits
        );
  }

  function readCookie (name) {
    var matches, cookie_value;

    matches = document.cookie.match('(?:'
      + name
      + '=)([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})')
    ;

    if (matches && matches.length > 1) {
      cookie_value = matches[1];
      if (cookie_value) {
        cookie_value = cookie_value.replace(/^\s+|\s+$/gm, '');
      }

      return ('' === cookie_value)  ? null : cookie_value;
    }

    return null;
  }

  function readUid () {
    var user_id = readCookie(user_id_cookie_name);

    // console.log('read user ' + user_id);

    if (!user_id) {
      user_id = id();
      saveUid(user_id);
    }

    return user_id;
  }

  function saveUid (user_id) {
    // console.log('save user ' + user_id);
    document.cookie = user_id_cookie_name + '=' + user_id;
  }

  ////////////////////////////////////////////////////////////////////////////////
  // element parsing
  ////////////////////////////////////////////////////////////////////////////////

  function elementMap (event) {
    if (!event) {
      return {};
    }

    var o = {}, e, i, a, k, v;

    e = event.target;
    o.tagName = e.tagName;
    o.offsetLeft = e.offsetLeft;
    o.offsetTop = e.offsetTop;

    for (i in e.attributes) {
      if (i) {
        a = e.attributes[i];
        k = 'attr'+a.name;
        v = a.value;
        o[k] = v;
      }
    }

    return o;
  }

  function mouseX (event) {
    if (event) {
      if (undefined !== event.pageX) {
        return event.pageX;
      } else if (undefined !== event.clientX && document.documentElement) {
        // http://msdn.microsoft.com/en-us/library/ie/ff974655(v=vs.85).aspx
        return event.clientX + document.documentElement.scrollLeft;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }

  function mouseY (event) {
    if (event) {
      if (undefined !== event.pageY) {
        return event.pageY;
      } else if (undefined !== event.clientY && document.documentElement) {
        // http://msdn.microsoft.com/en-us/library/ie/ff974656(v=vs.85).aspx
        return event.clientY + document.documentElement.scrollTop;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }

  function perf () {
    if (settings.performance && window.performance) {
      return window.performance;
    } else {
      return {};
    }
  }

  function hook (elem, type, fn) {
    if (elem.addEventListener) {
      elem.addEventListener(type, fn, false);
    } else if ( elem.attachEvent ) {
      elem.attachEvent('on' + type, fn);
    }
  }

  function bind (selector, type, fn) {
    var i, elem, elements = document.querySelectorAll(selector);
    for (i in elements) {
      if (i) {
        elem = elements[i];
        hook(elem, type, fn);
      }
    }
  }

  function req (method, url) {
    try {

      var xhr = new XMLHttpRequest();
      if ('withCredentials' in xhr) {
        xhr.open(method, url, true);
      } else if (typeof XDomainRequest !== 'undefined') {
        xhr = new XDomainRequest();
        xhr.open(method, url);
      } else {
        xhr = null;
      }

      if (xhr) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }

      return xhr;
    } catch (ex) {
      console.log(ex);
      return null;
    }
  }

  function post (url, payload) {
    if (!url) {
      return;
    }

    try {
      var
        post_body = JSON.stringify(payload),
        xhr = req('POST', url)
      ;

      if (xhr) {
        console.log(post_body);
        xhr.send(post_body);
      } else {
        console.error('cors not available');
      }

    } catch (ex) {
      // if (console && console.error) {
      //   console.error(ex);
      // }
    }
  }

  function canon () {
    var element = document.querySelectorAll('link[rel="canonical"]');

    return (
      element
      &&
      element.length
      &&
      ('href' in element[0])
      &&
      ('' !== element[0].href)
    )
      ? element[0].href
      : window.location.href
    ;
  }

  function bindscroll () {
    var scrollAccumulation = 0;

    hook(window, 'scroll', function (/*scrollevent*/) {
      scrollAccumulation += 1;
    });

    setInterval(function () {
      current_stats.scroll = scrollAccumulation;

      var send_scroll_event = (
        (0 !== current_stats.scroll)
        ||
        ((0 === current_stats.scroll) && (0 !== current_stats.prevscroll))
      );

      if (send_scroll_event) {
        post(rest_input, {
          type: 'scroll',
          milestonename: '',
          milestoneobj: {},
          baseurl: page_info.canonical,
          fullurl: window.location.href,
          pagename: page_info.name,
          tags: page_info.tags,
          fullref: document.referrer || '',
          userid: user.id,
          userobj: user.details,
          element: {},
          mousex: 0,
          mousey: 0,
          scrollspeed: current_stats.scroll,
          performobj: perf()
        });
      }

      current_stats.prevscroll = scrollAccumulation;
      scrollAccumulation = 0;

    }, 5e3);
  }

  function bindclicks () {
    bind('body', 'click', function (event) {
      post(rest_input, {
        type: 'click',
        milestonename: '',
        milestoneobj: {},
        baseurl: page_info.canonical,
        fullurl: window.location.href,
        pagename: page_info.name,
        tags: page_info.tags,
        fullref: document.referrer || '',
        userid: user.id,
        userobj: user.details,
        element: elementMap(event),
        mousex: mouseX(event),
        mousey: mouseY(event),
        scrollspeed: 0,
        performobj: perf()
      });
    });
  }

  function bindmilestones () {
    var milestone_name, milestone_details;

    bind('body', 'click', function (event) {
      if (event.target) {
        milestone_name = event.target.getAttribute('data-bcc-milestone-name');
        milestone_details = event.target.getAttribute('data-bcc-milestone-details') || {};

        if (milestone_name) {
          track(milestone_name, milestone_details, event);
        }
      }
    });
  }

  function protocol () {
    return window.location.href.replace(/:\/\/.*/, '');
  }

  ////////////////////////////////////////////////////////////////////////////////
  // public
  ////////////////////////////////////////////////////////////////////////////////

  function init (hook_id, options) {
    settings = options;

    if (options.environment) {
      environment = options.environment;
    }

    rest_input = protocol() + '://' + environment + '/da/' + hook_id;

    hook(document, 'DOMContentLoaded', function () {
      page_info.canonical = canon();

      user.id = readUid();

      bindclicks();
      bindmilestones();

      if (options) {
        if (options.movement) {
          bindscroll();
        }

        if (options.environment) {
          environment = options.environment;
        }

        page(options.page);
        tags(options.tags);

        post(rest_input, {
          type: 'pageload',
          milestonename: '',
          milestoneobj: {},
          baseurl: page_info.canonical,
          fullurl: window.location.href,
          pagename: page_info.name,
          tags: page_info.tags,
          fullref: document.referrer || '',
          userid: user.id,
          userobj: user.details,
          element: {},
          mousex: 0,
          mousey: 0,
          scrollspeed: 0,
          performobj: perf()
        });
      }
    });
  }

  function track (name, details, event) {
    // console.dir(details);

    post(rest_input, {
      type: 'milestone',
      milestonename: name,
      milestoneobj: details || {},
      baseurl: page_info.canonical,
      fullurl: window.location.href,
      pagename: page_info.name,
      tags: page_info.tags,
      fullref: document.referrer || '',
      userid: user.id,
      userobj: user.details,
      element: elementMap(event),
      mousex: mouseX(event),
      mousey: mouseY(event),
      scrollspeed: 0,
      performobj: perf()
    });
  }

  function identify (user_details) {
    if (undefined !== user_details) {
      user.details = user_details;
    }
    return user.details;
  }

  function page (page_name) {
    if (undefined !== page_name) {
      page_info.name = page_name || '';
    }
    return page_info.name;
  }

  function tags (tag_array) {
    if (undefined !== tag_array) {
      page_info.tags = tag_array || [];
    }
    return page_info.tags;
  }

  ////////////////////////////////////////////////////////////////////////////////
  // exports
  ////////////////////////////////////////////////////////////////////////////////

  if (!window.BCC) {
    window.BCC = {};
  }

  if (!window.BCC.Analytics) {
    window.BCC.Analytics = {};
  }

  window.BCC.Analytics.init = init;
  window.BCC.Analytics.track = track;
  window.BCC.Analytics.identify = identify;
  window.BCC.Analytics.page = page;
  window.BCC.Analytics.tags = tags;

}());