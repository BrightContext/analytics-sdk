!function() {
    "use strict";
    function a(b) {
        return b ? (b ^ 16 * Math.random() >> b / 4).toString(16) : ([ 1e7 ] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, a);
    }
    function b(a) {
        var b, c;
        return b = document.cookie.match("(?:" + a + "=)([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})"), 
        b && b.length > 1 ? (c = b[1], c && (c = c.replace(/^\s+|\s+$/gm, "")), "" === c ? null : c) : null;
    }
    function c() {
        var c = b(y);
        return c || (c = a(), d(c)), c;
    }
    function d(a) {
        document.cookie = y + "=" + a;
    }
    function e(a) {
        if (!a) return {};
        var b, c, d, e, f, g = {};
        b = a.target, g.tagName = b.tagName, g.offsetLeft = b.offsetLeft, g.offsetTop = b.offsetTop;
        for (c in b.attributes) c && (d = b.attributes[c], e = "attr" + d.name, f = d.value, 
        g[e] = f);
        return g;
    }
    function f(a) {
        return a ? void 0 !== a.pageX ? a.pageX : void 0 !== a.clientX && document.documentElement ? a.clientX + document.documentElement.scrollLeft : 0 : 0;
    }
    function g(a) {
        return a ? void 0 !== a.pageY ? a.pageY : void 0 !== a.clientY && document.documentElement ? a.clientY + document.documentElement.scrollTop : 0 : 0;
    }
    function h() {
        return v.performance && window.performance ? window.performance : {};
    }
    function i(a, b, c) {
        a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c);
    }
    function j(a, b, c) {
        var d, e, f = document.querySelectorAll(a);
        for (d in f) d && (e = f[d], i(e, b, c));
    }
    function k(a, b) {
        if (a) try {
            var c, d = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
            c = JSON.stringify(b), d.open("POST", a, !0), d.setRequestHeader("Content-Type", "application/json"), 
            d.send(c);
        } catch (e) {}
    }
    function l() {
        var a = document.querySelectorAll('link[rel="canonical"]');
        return a && a.length && "href" in a[0] && "" !== a[0].href ? a[0].href : window.location.href;
    }
    function m() {
        var a = 0;
        i(window, "scroll", function() {
            a += 1;
        }), setInterval(function() {
            z.scroll = a;
            var b = 0 !== z.scroll || 0 === z.scroll && 0 !== z.prevscroll;
            b && k(w, {
                type: "scroll",
                milestonename: "",
                milestoneobj: {},
                baseurl: B.canonical,
                fullurl: window.location.href,
                pagename: B.name,
                tags: B.tags,
                fullref: document.referrer || "",
                userid: A.id,
                userobj: A.details,
                element: {},
                mousex: 0,
                mousey: 0,
                scrollspeed: z.scroll,
                performobj: h()
            }), z.prevscroll = a, a = 0;
        }, 5e3);
    }
    function n() {
        j("body", "click", function(a) {
            k(w, {
                type: "click",
                milestonename: "",
                milestoneobj: {},
                baseurl: B.canonical,
                fullurl: window.location.href,
                pagename: B.name,
                tags: B.tags,
                fullref: document.referrer || "",
                userid: A.id,
                userobj: A.details,
                element: e(a),
                mousex: f(a),
                mousey: g(a),
                scrollspeed: 0,
                performobj: h()
            });
        });
    }
    function o() {
        var a, b;
        j("body", "click", function(c) {
            c.target && (a = c.target.getAttribute("data-bcc-milestone-name"), b = c.target.getAttribute("data-bcc-milestone-details") || {}, 
            a && r(a, b, c));
        });
    }
    function p() {
        return window.location.href.replace(/:\/\/.*/, "");
    }
    function q(a, b) {
        v = b, b.environment && (x = b.environment), w = p() + "://" + x + "/da/" + a, i(document, "DOMContentLoaded", function() {
            B.canonical = l(), A.id = c(), n(), o(), b && (b.movement && m(), b.environment && (x = b.environment), 
            t(b.page), u(b.tags), k(w, {
                type: "pageload",
                milestonename: "",
                milestoneobj: {},
                baseurl: B.canonical,
                fullurl: window.location.href,
                pagename: B.name,
                tags: B.tags,
                fullref: document.referrer || "",
                userid: A.id,
                userobj: A.details,
                element: {},
                mousex: 0,
                mousey: 0,
                scrollspeed: 0,
                performobj: h()
            }));
        });
    }
    function r(a, b, c) {
        k(w, {
            type: "milestone",
            milestonename: a,
            milestoneobj: b || {},
            baseurl: B.canonical,
            fullurl: window.location.href,
            pagename: B.name,
            tags: B.tags,
            fullref: document.referrer || "",
            userid: A.id,
            userobj: A.details,
            element: e(c),
            mousex: f(c),
            mousey: g(c),
            scrollspeed: 0,
            performobj: h()
        });
    }
    function s(a) {
        return void 0 !== a && (A.details = a), A.details;
    }
    function t(a) {
        return void 0 !== a && (B.name = a || ""), B.name;
    }
    function u(a) {
        return void 0 !== a && (B.tags = a || []), B.tags;
    }
    var v, w, x = "pub.brightcontext.com", y = "bcau", z = {
        url: "",
        prevscroll: 0,
        scroll: 0
    }, A = {}, B = {};
    document.querySelectorAll || (document.querySelectorAll = function(a) {
        var b, c = document.createElement("style"), d = [];
        for (document.documentElement.firstChild.appendChild(c), document._qsa = [], c.styleSheet.cssText = a + "{x-qsa:expression(document._qsa && document._qsa.push(this))}", 
        window.scrollBy(0, 0), c.parentNode.removeChild(c); document._qsa.length; ) b = document._qsa.shift(), 
        b.style.removeAttribute("x-qsa"), d.push(b);
        return document._qsa = null, d;
    }), "JSON" in window || (window.JSON = {}), window.JSON.stringify || (JSON.stringify = function(a) {
        var b, c, d, e = [], f = a && a.constructor === Array;
        if (b = typeof a, "object" !== b || null === a) return "string" === b && (a = '"' + a + '"'), 
        String(a);
        for (c in a) c && (d = a[c], b = typeof d, "string" === b ? d = '"' + d + '"' : "object" === b && null !== d && (d = JSON.stringify(d)), 
        e.push((f ? "" : '"' + c + '":') + String(d)));
        return (f ? "[" : "{") + String(e) + (f ? "]" : "}");
    }), window.BCC || (window.BCC = {}), window.BCC.Analytics || (window.BCC.Analytics = {}), 
    window.BCC.Analytics.init = q, window.BCC.Analytics.track = r, window.BCC.Analytics.identify = s, 
    window.BCC.Analytics.page = t, window.BCC.Analytics.tags = u;
}();