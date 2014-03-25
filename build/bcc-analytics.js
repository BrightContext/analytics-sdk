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
        var c = b(I);
        return c || (c = a(), d(c)), c;
    }
    function d(a) {
        document.cookie = I + "=" + a;
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
        return F.performance && window.performance ? window.performance : {};
    }
    function i(a, b, c) {
        a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c);
    }
    function j(a, b, c) {
        var d, e, f = document.querySelectorAll(a);
        for (d in f) d && (e = f[d], i(e, b, c));
    }
    function k(a, b) {
        try {
            var c = new XMLHttpRequest();
            return "withCredentials" in c ? c.open(a, b, !0) : "undefined" != typeof XDomainRequest ? (c = new XDomainRequest(), 
            c.open(a, b)) : c = null, c && c.setRequestHeader("Content-Type", "application/json"), 
            c;
        } catch (d) {
            return console.log(d), null;
        }
    }
    function l(a, b) {
        if (a) try {
            var c = JSON.stringify(b), d = k("POST", a);
            d ? (console.log(c), d.send(c)) : console.error("cors not available");
        } catch (e) {}
    }
    function m() {
        var a = document.querySelectorAll('link[rel="canonical"]');
        return a && a.length && "href" in a[0] && "" !== a[0].href ? a[0].href : window.location.href;
    }
    function n() {
        return document.referrer || "";
    }
    function o() {
        var a = document.querySelectorAll("title");
        return a && a.length ? a[0].innerHTML : "";
    }
    function p(a, b) {
        var c = document.querySelectorAll(a);
        return c && c.length && b in c[0] ? c[0][b] : 0;
    }
    function q() {
        return p("body", "scrollHeight");
    }
    function r() {
        return p("body", "scrollWidth");
    }
    function s() {
        return p("body", "scrollTop");
    }
    function t() {
        return p("body", "scrollTop") + window.innerHeight;
    }
    function u() {
        return p("body", "scrollLeft");
    }
    function v() {
        return p("body", "scrollLeft") + window.innerWidth;
    }
    function w() {
        var a = {
            pageheight: 0,
            pagewidth: 0,
            viewabletop: 0,
            viewablebottom: 0,
            viewableleft: 0,
            viewableright: 0
        };
        setInterval(function() {
            var b = {
                pageheight: q(),
                pagewidth: r(),
                viewabletop: s(),
                viewablebottom: t(),
                viewableleft: u(),
                viewableright: v()
            }, c = b.pageheight !== a.pageheight || b.pagewidth !== a.pagewidth || b.viewabletop !== a.viewabletop || b.viewablebottom !== a.viewablebottom || b.viewableleft !== a.viewableleft || b.viewableright !== a.viewableright;
            c && l(G, {
                type: "position",
                milestonename: "",
                milestoneobj: {},
                baseurl: K.canonical,
                fullurl: window.location.href,
                pagename: K.name,
                tags: K.tags,
                fullref: n(),
                userid: J.id,
                userobj: J.details,
                element: {},
                mousex: 0,
                mousey: 0,
                pagetitle: o(),
                pageheight: q(),
                pagewidth: r(),
                viewabletop: s(),
                viewablebottom: t(),
                viewableleft: u(),
                viewableright: v(),
                performobj: h()
            }), a = b;
        }, 5e3);
    }
    function x() {
        j("body", "click", function(a) {
            l(G, {
                type: "click",
                milestonename: "",
                milestoneobj: {},
                baseurl: K.canonical,
                fullurl: window.location.href,
                pagename: K.name,
                tags: K.tags,
                fullref: n(),
                userid: J.id,
                userobj: J.details,
                element: e(a),
                mousex: f(a),
                mousey: g(a),
                pagetitle: o(),
                pageheight: q(),
                pagewidth: r(),
                viewabletop: s(),
                viewablebottom: t(),
                viewableleft: u(),
                viewableright: v(),
                performobj: h()
            });
        });
    }
    function y() {
        var a, b;
        j("body", "click", function(c) {
            c.target && (a = c.target.getAttribute("data-bcc-milestone-name"), b = c.target.getAttribute("data-bcc-milestone-details") || {}, 
            a && B(a, b, c));
        });
    }
    function z() {
        return window.location.href.replace(/:\/\/.*/, "");
    }
    function A(a, b) {
        F = b, b.environment && (H = b.environment), G = z() + "://" + H + "/da/" + a, i(document, "DOMContentLoaded", function() {
            K.canonical = m(), J.id = c(), x(), y(), b && (b.movement && w(), b.environment && (H = b.environment), 
            D(b.page), E(b.tags), l(G, {
                type: "pageload",
                milestonename: "",
                milestoneobj: {},
                baseurl: K.canonical,
                fullurl: window.location.href,
                pagename: K.name,
                tags: K.tags,
                fullref: n(),
                userid: J.id,
                userobj: J.details,
                element: {},
                mousex: 0,
                mousey: 0,
                pagetitle: o(),
                pageheight: q(),
                pagewidth: r(),
                viewabletop: s(),
                viewablebottom: t(),
                viewableleft: u(),
                viewableright: v(),
                performobj: h()
            }));
        });
    }
    function B(a, b, c) {
        l(G, {
            type: "milestone",
            milestonename: a,
            milestoneobj: b || {},
            baseurl: K.canonical,
            fullurl: window.location.href,
            pagename: K.name,
            tags: K.tags,
            fullref: n(),
            userid: J.id,
            userobj: J.details,
            element: e(c),
            mousex: f(c),
            mousey: g(c),
            pagetitle: o(),
            pageheight: q(),
            pagewidth: r(),
            viewabletop: s(),
            viewablebottom: t(),
            viewableleft: u(),
            viewableright: v(),
            performobj: h()
        });
    }
    function C(a) {
        return void 0 !== a && (J.details = a), J.details;
    }
    function D(a) {
        return void 0 !== a && (K.name = a || ""), K.name;
    }
    function E(a) {
        return void 0 !== a && (K.tags = a || []), K.tags;
    }
    var F, G, H = "pub.brightcontext.com", I = "bcau", J = {}, K = {};
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
    window.BCC.Analytics.init = A, window.BCC.Analytics.track = B, window.BCC.Analytics.identify = C, 
    window.BCC.Analytics.page = D, window.BCC.Analytics.tags = E;
}();