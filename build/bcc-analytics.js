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
        var c = b(K);
        return c || (c = a(), d(c)), c;
    }
    function d(a) {
        document.cookie = K + "=" + a;
    }
    function e(a, b) {
        var c, d, e = -1, f = a.nodeName.toLowerCase();
        for (c = 0; c !== b.length; ++c) if (d = b[c], d.nodeName.toLowerCase() === f && (++e, 
        d === a)) return e;
        return -1;
    }
    function f(a, b) {
        var c, d, g;
        return b = b || "", c = a.parentElement, c ? (g = a.nodeName.toLowerCase(), d = e(a, c.children) + 1, 
        f(c, "/" + g + "[" + d + "]" + b)) : "//html[1]" + b;
    }
    function g(a) {
        if (!a) return {};
        var b, c = {};
        return b = a.srcElement || a.originalTarget || a.target, c.tagName = b.nodeName.toLowerCase(), 
        c.srcPath = f(b), c.srcX = b.offsetLeft, c.srcY = b.offsetTop, c.srcWidth = b.offsetWidth, 
        c.srcHeight = b.offsetHeight, c.pageX = a.pageX, c.pageY = a.pageY, c.screenX = a.screenX, 
        c.screenY = a.screenY, c.clientX = a.clientX, c.clientY = a.clientY, c;
    }
    function h(a) {
        return a ? void 0 !== a.pageX ? a.pageX : void 0 !== a.clientX && document.documentElement ? a.clientX + document.documentElement.scrollLeft : 0 : 0;
    }
    function i(a) {
        return a ? void 0 !== a.pageY ? a.pageY : void 0 !== a.clientY && document.documentElement ? a.clientY + document.documentElement.scrollTop : 0 : 0;
    }
    function j() {
        return H.performance && window.performance ? window.performance : {};
    }
    function k(a, b, c) {
        a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c);
    }
    function l(a, b, c) {
        var d, e, f = document.querySelectorAll(a);
        for (d in f) d && (e = f[d], k(e, b, c));
    }
    function m(a, b) {
        try {
            var c = new XMLHttpRequest();
            return "withCredentials" in c ? c.open(a, b, !0) : "undefined" != typeof XDomainRequest ? (c = new XDomainRequest(), 
            c.open(a, b)) : c = null, c && c.setRequestHeader("Content-Type", "application/json"), 
            c;
        } catch (d) {
            return console.log(d), null;
        }
    }
    function n(a, b) {
        if (a) try {
            var c = JSON.stringify(b), d = m("POST", a);
            d ? (console.log(c), d.send(c)) : console.error("cors not available");
        } catch (e) {}
    }
    function o() {
        var a = document.querySelectorAll('link[rel="canonical"]');
        return a && a.length && "href" in a[0] && "" !== a[0].href ? a[0].href : window.location.href;
    }
    function p() {
        return document.referrer || "";
    }
    function q() {
        var a = document.querySelectorAll("title");
        return a && a.length ? a[0].innerHTML : "";
    }
    function r(a, b) {
        var c = document.querySelectorAll(a);
        return c && c.length && b in c[0] ? c[0][b] : 0;
    }
    function s() {
        return r("body", "scrollHeight");
    }
    function t() {
        return r("body", "scrollWidth");
    }
    function u() {
        return r("body", "scrollTop");
    }
    function v() {
        return r("body", "scrollTop") + window.innerHeight;
    }
    function w() {
        return r("body", "scrollLeft");
    }
    function x() {
        return r("body", "scrollLeft") + window.innerWidth;
    }
    function y() {
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
                pageheight: s(),
                pagewidth: t(),
                viewabletop: u(),
                viewablebottom: v(),
                viewableleft: w(),
                viewableright: x()
            }, c = b.pageheight !== a.pageheight || b.pagewidth !== a.pagewidth || b.viewabletop !== a.viewabletop || b.viewablebottom !== a.viewablebottom || b.viewableleft !== a.viewableleft || b.viewableright !== a.viewableright;
            c && n(I, {
                type: "position",
                milestonename: "",
                milestoneobj: {},
                baseurl: M.canonical,
                fullurl: window.location.href,
                pagename: M.name,
                tags: M.tags,
                fullref: p(),
                userid: L.id,
                userobj: L.details,
                element: {},
                mousex: 0,
                mousey: 0,
                pagetitle: q(),
                pageheight: s(),
                pagewidth: t(),
                viewabletop: u(),
                viewablebottom: v(),
                viewableleft: w(),
                viewableright: x(),
                performobj: j()
            }), a = b;
        }, 5e3);
    }
    function z() {
        l("body", "click", function(a) {
            n(I, {
                type: "click",
                milestonename: "",
                milestoneobj: {},
                baseurl: M.canonical,
                fullurl: window.location.href,
                pagename: M.name,
                tags: M.tags,
                fullref: p(),
                userid: L.id,
                userobj: L.details,
                element: g(a),
                mousex: h(a),
                mousey: i(a),
                pagetitle: q(),
                pageheight: s(),
                pagewidth: t(),
                viewabletop: u(),
                viewablebottom: v(),
                viewableleft: w(),
                viewableright: x(),
                performobj: j()
            });
        });
    }
    function A() {
        var a, b;
        l("body", "click", function(c) {
            c.target && (a = c.target.getAttribute("data-bcc-milestone-name"), b = c.target.getAttribute("data-bcc-milestone-details") || {}, 
            a && D(a, b, c));
        });
    }
    function B() {
        return window.location.href.replace(/:\/\/.*/, "");
    }
    function C(a, b) {
        H = b, b.environment && (J = b.environment), I = B() + "://" + J + "/da/" + a, k(document, "DOMContentLoaded", function() {
            M.canonical = o(), L.id = c(), z(), A(), b && (b.movement && y(), b.environment && (J = b.environment), 
            F(b.page), G(b.tags), n(I, {
                type: "pageload",
                milestonename: "",
                milestoneobj: {},
                baseurl: M.canonical,
                fullurl: window.location.href,
                pagename: M.name,
                tags: M.tags,
                fullref: p(),
                userid: L.id,
                userobj: L.details,
                element: {},
                mousex: 0,
                mousey: 0,
                pagetitle: q(),
                pageheight: s(),
                pagewidth: t(),
                viewabletop: u(),
                viewablebottom: v(),
                viewableleft: w(),
                viewableright: x(),
                performobj: j()
            }));
        });
    }
    function D(a, b, c) {
        n(I, {
            type: "milestone",
            milestonename: a,
            milestoneobj: b || {},
            baseurl: M.canonical,
            fullurl: window.location.href,
            pagename: M.name,
            tags: M.tags,
            fullref: p(),
            userid: L.id,
            userobj: L.details,
            element: g(c),
            mousex: h(c),
            mousey: i(c),
            pagetitle: q(),
            pageheight: s(),
            pagewidth: t(),
            viewabletop: u(),
            viewablebottom: v(),
            viewableleft: w(),
            viewableright: x(),
            performobj: j()
        });
    }
    function E(a) {
        return void 0 !== a && (L.details = a), L.details;
    }
    function F(a) {
        return void 0 !== a && (M.name = a || ""), M.name;
    }
    function G(a) {
        return void 0 !== a && (M.tags = a || []), M.tags;
    }
    var H, I, J = "pub.brightcontext.com", K = "bcau", L = {}, M = {};
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
    window.BCC.Analytics.init = C, window.BCC.Analytics.track = D, window.BCC.Analytics.identify = E, 
    window.BCC.Analytics.page = F, window.BCC.Analytics.tags = G;
}();