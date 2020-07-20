var OrgChart = function (t, e) {
    var r = this;
    if (
        ((this.element = t),
        (this.config = {
            lazyLoading: !0,
            enableDragDrop: !1,
            enableSearch: !0,
            enableTouch: !1,
            nodeMenu: null,
            nodeContextMenu: null,
            menu: null,
            toolbar: !1,
            sticky: !0,
            nodeMouseClick: OrgChart.action.details,
            nodeMouseDbClick: OrgChart.none,
            mouseScrool: OrgChart.action.zoom,
            showXScroll: OrgChart.none,
            showYScroll: OrgChart.none,
            template: "ana",
            tags: {},
            nodeBinding: {},
            linkBinding: {},
            searchFields: [],
            nodes: [],
            clinks: [],
            slinks: [],
            levelSeparation: 60,
            siblingSeparation: 20,
            subtreeSeparation: 40,
            mixedHierarchyNodesSeparation: 15,
            assistantSeparation: 100,
            columns: 10,
            padding: 30,
            orientation: OrgChart.orientation.top,
            layout: OrgChart.normal,
            scaleInitial: 1,
            scaleMin: 0.1,
            scaleMax: 5,
            orderBy: null,
            editUI: null,
            searchUI: null,
            xScrollUI: null,
            yScrollUI: null,
            nodeMenuUI: null,
            nodeContextMenuUI: null,
            toolbarUI: null,
            notifierUI: null,
            menuUI: null,
            exportUrl: "https://balkangraph.com/export",
            collapse: {},
            expand: {},
            align: OrgChart.CENTER,
            UI: null,
            anim: { func: OrgChart.anim.outPow, duration: 200 },
            zoom: { speed: 120, smooth: 12 },
            roots: null,
            onUpdate: "",
            onRemove: "",
            onAdd: "",
            onRedraw: "",
            onImageUploaded: "",
            onUpdateTags: "",
            onClick: "",
            onDbClick: "",
            onExpCollClick: "",
            onExportStart: "",
            onExportEnd: "",
            onSearchClick: "",
            onReady: "",
        }),
        e)
    )
        for (var i in this.config) "object" != typeof e[i] || Array.isArray(e[i]) ? void 0 !== e[i] && (this.config[i] = e[i]) : (this.config[i] = OrgChart._mergeObject(this.config[i], e[i]));
    if (
        ((this._layoutConfigs = {
            base: {
                orientation: this.config.orientation,
                levelSeparation: this.config.levelSeparation,
                mixedHierarchyNodesSeparation: this.config.mixedHierarchyNodesSeparation,
                assistantSeparation: this.config.assistantSeparation,
                subtreeSeparation: this.config.subtreeSeparation,
                siblingSeparation: this.config.siblingSeparation,
                layout: this.config.layout,
                columns: this.config.columns,
                collapse: this.config.collapse,
            },
        }),
        this.config.tags)
    )
        for (var a in this.config.tags) {
            var n = this.config.tags[a];
            null != n.subTreeConfig &&
                (this._layoutConfigs[a] = {
                    orientation: null != n.subTreeConfig.orientation ? n.subTreeConfig.orientation : this.config.orientation,
                    levelSeparation: null != n.subTreeConfig.levelSeparation ? n.subTreeConfig.levelSeparation : this.config.levelSeparation,
                    mixedHierarchyNodesSeparation: null != n.subTreeConfig.mixedHierarchyNodesSeparation ? n.subTreeConfig.mixedHierarchyNodesSeparation : this.config.mixedHierarchyNodesSeparation,
                    assistantSeparation: null != n.subTreeConfig.assistantSeparation ? n.subTreeConfig.assistantSeparation : this.config.assistantSeparation,
                    subtreeSeparation: null != n.subTreeConfig.subtreeSeparation ? n.subTreeConfig.subtreeSeparation : this.config.subtreeSeparation,
                    siblingSeparation: null != n.subTreeConfig.siblingSeparation ? n.subTreeConfig.siblingSeparation : this.config.siblingSeparation,
                    layout: null != n.subTreeConfig.layout ? n.subTreeConfig.layout : this.config.layout,
                    columns: null != n.subTreeConfig.columns ? n.subTreeConfig.columns : this.config.columns,
                    collapse: null != n.subTreeConfig.collapse ? n.subTreeConfig.collapse : this.config.collapse,
                });
        }
    (this._event_id = OrgChart._guid()),
        OrgChart._validateConfig(this.config) &&
            ((this.server = null),
            (this._vScroll = {}),
            this.config.ui || (this.ui = OrgChart.ui),
            this.config.editUI ? (this.editUI = this.config.editUI) : (this.editUI = new OrgChart.editUI()),
            this.editUI.init(this),
            null === this.server && (this.server = new OrgChart.server(this.config, this._layoutConfigs)),
            this.config.searchUI ? (this.searchUI = this.config.searchUI) : (this.searchUI = new OrgChart.searchUI()),
            this.searchUI.init(this),
            this.config.nodeMenuUI ? (this.nodeMenuUI = this.config.nodeMenuUI) : (this.nodeMenuUI = new OrgChart.menuUI()),
            this.nodeMenuUI.init(this, this.config.nodeMenu),
            this.config.nodeContextMenuUI ? (this.nodeContextMenuUI = this.config.nodeContextMenuUI) : (this.nodeContextMenuUI = new OrgChart.menuUI()),
            this.nodeContextMenuUI.init(this, this.config.nodeContextMenu),
            this.config.toolbarUI ? (this.toolbarUI = this.config.toolbarUI) : (this.toolbarUI = new OrgChart.toolbarUI()),
            this.config.notifierUI ? (this.notifierUI = this.config.notifierUI) : (this.notifierUI = new OrgChart.notifierUI()),
            this.notifierUI.init(this),
            this.config.menuUI ? (this.menuUI = this.config.menuUI) : (this.menuUI = new OrgChart.menuUI()),
            this.menuUI.init(this, this.config.menu),
            this.config.xScrollUI ||
                (this.xScrollUI = new OrgChart.xScrollUI(
                    this.element,
                    this.config,
                    function () {
                        return { boundary: r.response.boundary, scale: r.getScale(), viewBox: r.getViewBox(), padding: r.config.padding };
                    },
                    function (t) {
                        r.setViewBox(t);
                    },
                    function () {
                        r._draw(!0, OrgChart.action.xScroll);
                    }
                )),
            this.config.yScrollUI ||
                (this.yScrollUI = new OrgChart.yScrollUI(
                    this.element,
                    this.config,
                    function () {
                        return { boundary: r.response.boundary, scale: r.getScale(), viewBox: r.getViewBox(), padding: r.config.padding };
                    },
                    function (t) {
                        r.setViewBox(t);
                    },
                    function () {
                        r._draw(!0, OrgChart.action.xScroll);
                    }
                )),
            (this._gragStartedId = null),
            (this._timeout = null),
            (this._touch = null),
            (this._initialized = !1),
            (this._moveInterval = null),
            (this._movePosition = null),
            (this.response = null),
            (this.nodes = null),
            this._setInitialSizeIfNotSet(),
            0 < this.config.nodes.length && this._draw(!1, OrgChart.action.init));
};
(OrgChart.prototype.load = function (t) {
    return (this.config.nodes = t), this._draw(!1, OrgChart.action.init), this;
}),
    (OrgChart.prototype.loadXML = function (t) {
        var e = OrgChart._xml2json(t);
        this.load(e);
    }),
    (OrgChart.prototype.getXML = function () {
        return OrgChart._json2xml(this.config.nodes);
    }),
    (OrgChart.prototype.on = function (t, e) {
        return OrgChart.events.on(t, e, this._event_id), this;
    }),
    (OrgChart.prototype.draw = function (t, e, r) {
        null == t && (t = OrgChart.action.update), this._draw(!1, t, e, r);
    }),
    (OrgChart.prototype._draw = function (t, C, y, v) {
        var x = this;
        this._hideBeforeAnimationCompleted = !1;
        var e = C == OrgChart.action.init ? null : this.getViewBox();
        this.server.read(
            t,
            this.width(),
            this.height(),
            e,
            C,
            y,
            function (t) {
                C != OrgChart.action.exporting && (x.nodes = t.nodes), (x.editUI.fields = t.allFields);
                var e = { defs: "" };
                OrgChart.events.publish("renderdefs", [x, e]);
                var r = x.ui.defs(e.defs),
                    i = x.getScale(t.viewBox);
                r += x.ui.pointer(x.config, C, i);
                var a = x.getViewBox(),
                    n = t.viewBox;
                e = { content: r, res: t };
                OrgChart.events.publish("prerender", [x, e]), (r = e.content);
                for (var o = 0; o < t.visibleNodeIds.length; o++) {
                    var l = t.nodes[t.visibleNodeIds[o]],
                        s = x._get(l.id);
                    r += x.ui.node(l, s, t.animations, x.config, void 0, void 0, void 0, C, i, x);
                }
                for (o = 0; o < t.visibleNodeIds.length; o++) {
                    (l = t.nodes[t.visibleNodeIds[o]]), (s = x._get(l.id));
                    (r += x.ui.link(l, x, i)), (r += x.ui.expandCollapseBtn(x, l, x._layoutConfigs, C, i));
                }
                e = { content: r, res: t };
                if ((OrgChart.events.publish("render", [x, e]), (r = e.content), (r += x.ui.lonely(x.config)), C !== OrgChart.action.exporting)) {
                    (C !== OrgChart.action.centerNode && C !== OrgChart.action.insert && C !== OrgChart.action.expand && C !== OrgChart.action.collapse && C !== OrgChart.action.update) || (n = a),
                        C === OrgChart.action.init && null != a && (n = a),
                        (x.response = t);
                    m = x.ui.svg(x.width(), x.height(), n, x.config, r);
                    if (x._initialized) {
                        var h = x.getSvg(),
                            c = h.parentNode;
                        c.removeChild(h), c.insertAdjacentHTML("afterbegin", m), x._attachEventHandlers(), x.xScrollUI.addListener(x.getSvg()), x.yScrollUI.addListener(x.getSvg()), x.xScrollUI.setPosition(), x.yScrollUI.setPosition();
                    } else
                        (x.element.innerHTML = x.ui.css() + x.ui.exportMenuButton(x.config) + m),
                            x._attachInitEventHandlers(),
                            x._attachEventHandlers(),
                            x.xScrollUI.create(x.width(), x.config.padding),
                            x.xScrollUI.setPosition(),
                            x.xScrollUI.addListener(x.getSvg()),
                            x.yScrollUI.create(x.height(), x.config.padding),
                            x.yScrollUI.setPosition(),
                            x.yScrollUI.addListener(x.getSvg()),
                            x.config.enableSearch && x.searchUI.addSearchControl(),
                            x.toolbarUI.init(x, x.config.toolbar);
                    var d = !1;
                    x.notifierUI.show(t.notif);
                    var g = x.response.animations;
                    if (0 < g[0].length) {
                        x._hideBeforeAnimation(g[0].length);
                        for (o = 0; o < g[0].length; o++) g[0][o] = x.getNodeElement(g[0][o]);
                        OrgChart.anim(g[0], g[1], g[2], x.config.anim.duration, x.config.anim.func, function () {
                            d || (v && v(), OrgChart.events.publish("redraw", [x]), x._showAfterAnimation(), (d = !0));
                        });
                    }
                    C === OrgChart.action.centerNode
                        ? OrgChart.anim(
                              x.getSvg(),
                              { viewbox: a },
                              { viewbox: x.response.viewBox },
                              x.config.anim.duration,
                              x.config.anim.func,
                              function () {
                                  x.ripple(y.options.rippleId), d || (v && v(), OrgChart.events.publish("redraw", [x]), x._showAfterAnimation(), (d = !0));
                              },
                              function () {
                                  x.xScrollUI.setPosition(), x.yScrollUI.setPosition();
                              }
                          )
                        : !a ||
                          !x.response ||
                          (a[0] == x.response.viewBox[0] && a[1] == x.response.viewBox[1] && a[2] == x.response.viewBox[2] && a[3] == x.response.viewBox[3]) ||
                          (C !== OrgChart.action.insert && C !== OrgChart.action.expand && C !== OrgChart.action.collapse && C !== OrgChart.action.update && C !== OrgChart.action.init)
                        ? 0 == g[0].length && (d || (v && v(), OrgChart.events.publish("redraw", [x]), (d = !0)))
                        : OrgChart.anim(x.getSvg(), { viewbox: a }, { viewbox: x.response.viewBox }, 500, OrgChart.anim.inOutPow, function () {
                              x.xScrollUI.setPosition(), x.yScrollUI.setPosition(), d || (v && v(), OrgChart.events.publish("redraw", [x]), (d = !0));
                          }),
                        x._initialized || ((x._initialized = !0), OrgChart.events.publish("init", [x]));
                } else {
                    var p = t.boundary,
                        f = p.maxX - p.minX,
                        u = p.maxY - p.minY,
                        m = x.ui.svg(f, u, [p.minX, p.minY, f, u], x.config, r, i);
                    v(m);
                }
            },
            function (t) {
                OrgChart.events.publish("ready", [x, t]);
            }
        );
    }),
    (OrgChart.prototype._setInitialSizeIfNotSet = function () {
        (this.element.style.overflow = "hidden"),
            (this.element.style.position = "relative"),
            0 == this.element.offsetHeight && ((this.element.style.height = "100%"), 0 == this.element.offsetHeight && (this.element.style.height = "700px")),
            0 == this.element.offsetWidth && ((this.element.style.width = "100%"), 0 == this.element.offsetWidth && (this.element.style.width = "700px"));
    }),
    (OrgChart.prototype.getViewBox = function () {
        var t = this.getSvg(),
            e = null;
        return t ? ((e = (e = "[" + (e = t.getAttribute("viewBox")) + "]").replace(/\ /g, ",")), (e = JSON.parse(e))) : null;
    }),
    (OrgChart.prototype.setViewBox = function (t) {
        this.getSvg().setAttribute("viewBox", t.toString());
    }),
    (OrgChart.prototype.width = function () {
        return this.element.offsetWidth;
    }),
    (OrgChart.prototype.height = function () {
        return this.element.offsetHeight;
    }),
    (OrgChart.prototype.getScale = function (t) {
        return t || (t = this.getViewBox()), OrgChart.getScale(t, this.width(), this.height(), this.config.scaleInitial, this.config.scaleMax, this.config.scaleMin);
    }),
    (OrgChart.prototype.ripple = function (t, e, r) {
        var i = this.getNode(t);
        if (null != i) {
            var a = this.getNodeElement(t);
            if (null != a) {
                var n = this.getScale(),
                    o = i.w / 2,
                    l = i.h / 2;
                if (void 0 !== e && void 0 !== r) {
                    var s = a.getBoundingClientRect();
                    (o = e / n - s.left / n), (l = r / n - s.top / n);
                }
                var h = i.w,
                    c = i.h,
                    d = o < h - o ? h - o : o,
                    g = l < c - l ? c - l : l,
                    p = (g = g) < (d = d) ? d : g,
                    f = document.createElementNS("http://www.w3.org/2000/svg", "g"),
                    u = document.createElementNS("http://www.w3.org/2000/svg", "clipPath"),
                    m = document.createElementNS("http://www.w3.org/2000/svg", "rect"),
                    C = document.createElementNS("http://www.w3.org/2000/svg", "circle"),
                    y = OrgChart.randomId();
                u.setAttribute("id", y);
                var v = OrgChart.t(i.templateName, i.min, this.getScale());
                m.setAttribute("x", v.ripple.rect ? v.ripple.rect.x : 0),
                    m.setAttribute("y", v.ripple.rect ? v.ripple.rect.y : 0),
                    m.setAttribute("width", v.ripple.rect ? v.ripple.rect.width : i.w),
                    m.setAttribute("height", v.ripple.rect ? v.ripple.rect.height : i.h),
                    m.setAttribute("rx", v.ripple.radius),
                    m.setAttribute("ry", v.ripple.radius),
                    C.setAttribute("clip-path", "url(#" + y + ")"),
                    C.setAttribute("cx", o),
                    C.setAttribute("cy", l),
                    C.setAttribute("r", 0),
                    C.setAttribute("fill", v.ripple.color),
                    C.setAttribute("class", "ripple"),
                    u.appendChild(m),
                    f.appendChild(u),
                    f.appendChild(C),
                    a.appendChild(f),
                    OrgChart.anim(C, { r: 0, opacity: 1 }, { r: p, opacity: 0 }, 500, OrgChart.anim.outPow, function () {
                        a.removeChild(f);
                    });
            }
        }
    }),
    (OrgChart.prototype.center = function (t, e, r) {
        var i,
            a,
            n = t,
            o = !0,
            l = !0;
        e && null != e.parentState && (i = e.parentState),
            e && null != e.childrenState && (a = e.childrenState),
            e && null != e.rippleId && (n = e.rippleId),
            e && null != e.vertical && (o = e.vertical),
            e && null != e.horizontal && (l = e.horizontal);
        var s = { parentState: i, childrenState: a, rippleId: n, vertical: o, horizontal: l };
        this._draw(!1, OrgChart.action.centerNode, { id: t, options: s }, r);
    }),
    (OrgChart.prototype.fit = function (t) {
        (this.config.scaleInitial = OrgChart.match.boundary), this._draw(!0, OrgChart.action.init, void 0, t);
    }),
    (OrgChart.prototype.toggleFullScreen = function () {
        var t = document.querySelector("[data-tlbr='fullScreen']");
        document.fullscreenElement == this.element || document.webkitFullscreenElement == this.element || document.mozFullScreenElement == this.element || document.msFullscreenElement == this.element
            ? (document.exitFullscreen
                  ? document.exitFullscreen()
                  : document.mozCancelFullScreen
                  ? document.mozCancelFullScreen()
                  : document.webkitExitFullscreen
                  ? document.webkitExitFullscreen()
                  : document.msExitFullscreen && document.msExitFullscreen(),
              t && (t.innerHTML = OrgChart.toolbarUI.openFullScreenIcon))
            : (this.element.requestFullscreen
                  ? this.element.requestFullscreen()
                  : this.element.mozRequestFullScreen
                  ? this.element.mozRequestFullScreen()
                  : this.element.webkitRequestFullscreen
                  ? this.element.webkitRequestFullscreen()
                  : this.element.msRequestFullscreen && this.element.msRequestFullscreen(),
              t && (t.innerHTML = OrgChart.toolbarUI.closeFullScreenIcon));
    }),
    (OrgChart.prototype.getNode = function (t) {
        return this.nodes[t];
    }),
    (OrgChart.prototype.setLayout = function (t, e) {
        e || (e = "base"), (this._layoutConfigs[e].layout = t), this._draw(!1, OrgChart.action.update);
    }),
    (OrgChart.prototype.setOrientation = function (t, e) {
        e || (e = "base"), (this._layoutConfigs[e].orientation = t), this._draw(!1, OrgChart.action.update);
    }),
    (OrgChart.prototype.find = function (t) {
        return this.server.find(t);
    }),
    (OrgChart.prototype._hideBeforeAnimation = function (t) {
        if (1 != this._hideBeforeAnimationCompleted && !(t && t < OrgChart.ANIM_THRESHOLD)) {
            var e = this.element.getElementsByTagName("text");
            if (e.length > OrgChart.TEXT_THRESHOLD) for (var r = 0; r < e.length; r++) e[r].style.display = "none";
            var i = this.element.getElementsByTagName("image");
            if (i.length > OrgChart.IMAGES_THRESHOLD) for (r = 0; r < i.length; r++) i[r].style.display = "none";
            var a = this.element.querySelectorAll("[link-id]");
            if (a.length > OrgChart.LINKS_THRESHOLD) for (r = 0; r < a.length; r++) a[r].style.display = "none";
            var n = this.element.querySelectorAll("[control-expcoll-id]");
            if (n.length > OrgChart.EXPCOLL_THRESHOLD) for (r = 0; r < n.length; r++) n[r].style.display = "none";
            this._hideBeforeAnimationCompleted = !0;
        }
    }),
    (OrgChart.prototype._showAfterAnimation = function () {
        for (var t = this.element.getElementsByTagName("text"), e = 0; e < t.length; e++) t[e].style.display = "";
        var r = this.element.getElementsByTagName("image");
        for (e = 0; e < r.length; e++) r[e].style.display = "";
        var i = this.element.querySelectorAll("[link-id]");
        for (e = 0; e < i.length; e++) i[e].style.display = "";
        var a = this.element.querySelectorAll("[control-expcoll-id]");
        for (e = 0; e < a.length; e++) a[e].style.display = "";
        this._hideBeforeAnimationCompleted = !1;
    }),
    (OrgChart.prototype.isChild = function (t, e) {
        for (var r = this.getNode(e); r; ) {
            if (r.id == t) return !0;
            r = r.parent ? r.parent : r.stParent;
        }
        return !1;
    }),
    (OrgChart.prototype.getCollapsedIds = function (t) {
        for (var e = [], r = 0; r < t.childrenIds.length; r++) {
            var i = this.getNode(t.childrenIds[r]);
            1 == i.collapsed && e.push(i.id);
        }
        return e;
    }),
    (OrgChart.prototype.destroy = function () {
        this._removeEvent(window, "resize"), OrgChart.events.removeForEventId(this._event_id), (this.element.innerHTML = null);
    }),
    (OrgChart.prototype._canUpdateLink = function (t, e) {
        return null != e && null != e && null != t && null != t && t != e && !this.isChild(t, e);
    }),
    (OrgChart.prototype.updateNode = function (t, e, r) {
        var i = this,
            a = this.get(t.id);
        if (!0 === r && !1 === OrgChart.events.publish("update", [this, a, t])) return !1;
        this.update(t);
        var n = t.pid;
        null == n && (n = t.stpid),
            this._draw(!1, OrgChart.action.update, { id: n }, function () {
                i.ripple(t.id), e && e(), OrgChart.events.publish("updated", [this, a, t]);
            });
    }),
    (OrgChart.prototype.update = function (t) {
        for (var e = 0; e < this.config.nodes.length; e++)
            if (this.config.nodes[e].id == t.id) {
                this.config.nodes[e] = t;
                break;
            }
        return this;
    }),
    (OrgChart.prototype.removeNode = function (t, e, r) {
        var i = this;
        if (!0 === r && !1 === OrgChart.events.publish("remove", [this, t])) return !1;
        var a = [];
        return (
            this.remove(t, a),
            this._draw(!1, OrgChart.action.update, null, function () {
                i.config.sticky && OrgChart._moveToBoundaryArea(i.getSvg(), i.getViewBox(), i.response.boundary), e && e(), OrgChart.events.publish("removed", [i, a]);
            }),
            !0
        );
    }),
    (OrgChart.prototype.remove = function (t, e) {
        var r = this.get(t);
        if ((e || (e = []), r))
            for (var i = this.config.nodes.length - 1; 0 <= i; i--)
                (this.config.nodes[i].pid != t && this.config.nodes[i].stpid != t) || ((this.config.nodes[i].pid = r.pid), (this.config.nodes[i].stpid = r.stpid), e.push(this.config.nodes[i].id)),
                    this.config.nodes[i].id == t && this.config.nodes.splice(i, 1);
        return this;
    }),
    (OrgChart.prototype.addNode = function (t, e, r) {
        var i = this;
        if (!0 === r && !1 === OrgChart.events.publish("add", [this, t])) return !1;
        this.add(t),
            i._draw(!1, OrgChart.action.insert, { id: t.pid, insertedNodeId: t.id }, function () {
                i.ripple(t.id), e && e(), OrgChart.events.publish("added", [i, t.id]);
            });
    }),
    (OrgChart.prototype.add = function (t) {
        return null == t.id && console.error("Call addNode without id"), this.config.nodes.push(t), this;
    }),
    (OrgChart.prototype._get = function (t) {
        for (var e = 0; e < this.config.nodes.length; e++) if (this.config.nodes[e].id == t) return this.config.nodes[e];
        return null;
    }),
    (OrgChart.prototype.get = function (t) {
        for (var e = 0; e < this.config.nodes.length; e++) if (this.config.nodes[e].id == t) return JSON.parse(JSON.stringify(this.config.nodes[e]));
        return null;
    }),
    void 0 === OrgChart && (OrgChart = {}),
    (OrgChart._ajax = function (t, e, r, i, a) {
        null == i && (i = "arraybuffer");
        var n = new XMLHttpRequest();
        (n.onload = function (t) {
            n.readyState == XMLHttpRequest.DONE && 200 === this.status && a(t.target.response);
        }),
            (n.onerror = function (t) {
                a({ error: t });
            }),
            n.open(e, t),
            (n.responseType = i),
            n.setRequestHeader("Content-Type", "application/json"),
            null == r ? n.send() : n.send(r);
    }),
    void 0 === OrgChart && (OrgChart = {}),
    (OrgChart.anim = function (d, g, p, f, u, m, C) {
        var y,
            v = 1,
            x = f / 10 + 1;
        document.getElementsByTagName("g");
        Array.isArray(d) || (d = [d]),
            Array.isArray(g) || (g = [g]),
            Array.isArray(p) || (p = [p]),
            (y = setInterval(function () {
                for (var t = 0; t < d.length; t++)
                    for (var e in p[t]) {
                        var r = OrgChart._arrayContains(["top", "left", "right", "bottom", "width", "height"], e.toLowerCase()) ? "px" : "";
                        switch (e.toLowerCase()) {
                            case "d":
                                var a = u((10 * v - 10) / f) * (p[t][e][0] - g[t][e][0]) + g[t][e][0],
                                    n = u((10 * v - 10) / f) * (p[t][e][1] - g[t][e][1]) + g[t][e][1];
                                d[t].setAttribute("d", d[t].getAttribute("d") + " L" + a + " " + n);
                                break;
                            case "r":
                                var o = u((10 * v - 10) / f) * (p[t][e] - g[t][e]) + g[t][e];
                                d[t].setAttribute("r", o);
                                break;
                            case "transform":
                                if (p[t][e]) {
                                    var l = g[t][e],
                                        s = p[t][e],
                                        h = [0, 0, 0, 0, 0, 0];
                                    for (i in l) h[i] = u((10 * v - 10) / f) * (s[i] - l[i]) + l[i];
                                    d[t].hasAttribute("transform") ? d[t].setAttribute("transform", "matrix(" + h.toString() + ")") : (d[t].style.transform = "matrix(" + h.toString() + ")");
                                }
                                break;
                            case "viewbox":
                                if (p[t][e]) {
                                    for (i in ((l = g[t][e]), (s = p[t][e]), (h = [0, 0, 0, 0]), l)) h[i] = u((10 * v - 10) / f) * (s[i] - l[i]) + l[i];
                                    d[t].setAttribute("viewBox", h.toString());
                                }
                                break;
                            case "margin":
                                if (p[t][e]) {
                                    for (i in ((l = g[t][e]), (s = p[t][e]), (h = [0, 0, 0, 0]), l)) h[i] = u((10 * v - 10) / f) * (s[i] - l[i]) + l[i];
                                    var c = "";
                                    for (i = 0; i < h.length; i++) c += parseInt(h[i]) + "px ";
                                    d[t] && d[t].style && (d[t].style[e] = c);
                                }
                                break;
                            default:
                                (o = u((10 * v - 10) / f) * (p[t][e] - g[t][e]) + g[t][e]), d[t] && d[t].style && (d[t].style[e] = o + r);
                        }
                    }
                C && C(), 1 + x < (v += 1) && (clearInterval(y), m && m(d));
            }, 10));
    }),
    (OrgChart.anim.inPow = function (t) {
        return t < 0 ? 0 : 1 < t ? 1 : Math.pow(t, 2);
    }),
    (OrgChart.anim.outPow = function (t) {
        if (t < 0) return 0;
        if (1 < t) return 1;
        return -1 * (Math.pow(t - 1, 2) + -1);
    }),
    (OrgChart.anim.inOutPow = function (t) {
        if (t < 0) return 0;
        if (1 < t) return 1;
        if ((t *= 2) < 1) return OrgChart.anim.inPow(t, 2) / 2;
        return -0.5 * (Math.pow(t - 2, 2) + -2);
    }),
    (OrgChart.anim.inSin = function (t) {
        return t < 0 ? 0 : 1 < t ? 1 : 1 - Math.cos(t * (Math.PI / 2));
    }),
    (OrgChart.anim.outSin = function (t) {
        return t < 0 ? 0 : 1 < t ? 1 : Math.sin(t * (Math.PI / 2));
    }),
    (OrgChart.anim.inOutSin = function (t) {
        return t < 0 ? 0 : 1 < t ? 1 : -0.5 * (Math.cos(Math.PI * t) - 1);
    }),
    (OrgChart.anim.inExp = function (t) {
        return t < 0 ? 0 : 1 < t ? 1 : Math.pow(2, 10 * (t - 1));
    }),
    (OrgChart.anim.outExp = function (t) {
        return t < 0 ? 0 : 1 < t ? 1 : 1 - Math.pow(2, -10 * t);
    }),
    (OrgChart.anim.inOutExp = function (t) {
        return t < 0 ? 0 : 1 < t ? 1 : t < 0.5 ? 0.5 * Math.pow(2, 10 * (2 * t - 1)) : 0.5 * (2 - Math.pow(2, 10 * (-2 * t + 1)));
    }),
    (OrgChart.anim.inCirc = function (t) {
        return t < 0 ? 0 : 1 < t ? 1 : -(Math.sqrt(1 - t * t) - 1);
    }),
    (OrgChart.anim.outCirc = function (t) {
        return t < 0 ? 0 : 1 < t ? 1 : Math.sqrt(1 - (t - 1) * (t - 1));
    }),
    (OrgChart.anim.inOutCirc = function (t) {
        return t < 0 ? 0 : 1 < t ? 1 : t < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - (2 * t - 2) * (2 * t - 2)) + 1);
    }),
    (OrgChart.anim.rebound = function (t) {
        return t < 0
            ? 0
            : 1 < t
            ? 1
            : t < 1 / 2.75
            ? 1 - 7.5625 * t * t
            : t < 2 / 2.75
            ? 1 - (7.5625 * (t - 1.5 / 2.75) * (t - 1.5 / 2.75) + 0.75)
            : t < 2.5 / 2.75
            ? 1 - (7.5625 * (t - 2.25 / 2.75) * (t - 2.25 / 2.75) + 0.9375)
            : 1 - (7.5625 * (t - 2.625 / 2.75) * (t - 2.625 / 2.75) + 0.984375);
    }),
    (OrgChart.anim.inBack = function (t) {
        return t < 0 ? 0 : 1 < t ? 1 : t * t * (2.70158 * t - 1.70158);
    }),
    (OrgChart.anim.outBack = function (t) {
        return t < 0 ? 0 : 1 < t ? 1 : (t - 1) * (t - 1) * (2.70158 * (t - 1) + 1.70158) + 1;
    }),
    (OrgChart.anim.inOutBack = function (t) {
        return t < 0 ? 0 : 1 < t ? 1 : t < 0.5 ? 4 * t * t * (7.1898 * t - 2.5949) * 0.5 : 0.5 * ((2 * t - 2) * (2 * t - 2) * (3.5949 * (2 * t - 2) + 2.5949) + 2);
    }),
    (OrgChart.anim.impulse = function (t) {
        var e = 2 * t;
        return e * Math.exp(1 - e);
    }),
    (OrgChart.anim.expPulse = function (t) {
        return Math.exp(-2 * Math.pow(t, 2));
    }),
    void 0 === OrgChart && (OrgChart = {}),
    (OrgChart.prototype._attachInitEventHandlers = function (t) {
        this._addEvent(window, "resize", this._resizeHandler);
    }),
    (OrgChart.prototype._attachEventHandlers = function (t) {
        t = this.getSvg();
        this.config.enableTouch || /Mobi/i.test(navigator.userAgent) || /Android/i.test(navigator.userAgent)
            ? (this._addEvent(t, "touchstart", this._globalMouseDownHandler), this._addEvent(t, "touchend", this._globalClickHandler))
            : (this._addEvent(t, "mousedown", this._globalMouseDownHandler),
              this._addEvent(t, "click", this._globalClickHandler),
              this._addEvent(t, "contextmenu", this._globalContextHandler),
              this._addEvent(t, "dblclick", this._globalDbClickHandler),
              (this.config.mouseScrool != OrgChart.action.zoom && this.config.mouseScrool != OrgChart.action.ctrlZoom) ||
                  (this._addEvent(t, "DOMMouseScroll", this._mouseScrollHandler), this._addEvent(t, "mousewheel", this._mouseScrollHandler)));
        var e = this.getExportMenuButton();
        e && this._addEvent(e, "click", this._exportMenuClickHandler);
    }),
    (OrgChart.prototype._addEvent = function (e, t, r, i) {
        var a, n;
        (i || (i = ""), e.getListenerList || (e.getListenerList = {}), e.getListenerList[t + i]) ||
            ((a = this),
            (n = r),
            (r = function () {
                if (n) return n.apply(a, [this, arguments[0]]);
            }),
            e.addEventListener
                ? "mousewheel" == t
                    ? e.addEventListener(t, o, { passive: !1 })
                    : e.addEventListener(t, o, !1)
                : e.attachEvent("on" + t, function () {
                      var t = r.call(e, window.event);
                      return !1 === t && ((window.event.returnValue = !1), (window.event.cancelBubble = !0)), t;
                  }),
            (e.getListenerList[t + i] = o));
        function o(t) {
            var e = r.apply(this, arguments);
            return !1 === e && (t.stopPropagation(), t.preventDefault()), e;
        }
    }),
    (OrgChart.prototype._removeEvent = function (t, e) {
        if (t.getListenerList[e]) {
            var r = t.getListenerList[e];
            t.removeEventListener(e, r, !1), delete t.getListenerList[e];
        }
    }),
    void 0 === OrgChart && (OrgChart = {}),
    (OrgChart.VERSION = "7.0.1"),
    (OrgChart.orientation = {}),
    (OrgChart.orientation.top = 0),
    (OrgChart.orientation.bottom = 1),
    (OrgChart.orientation.right = 2),
    (OrgChart.orientation.left = 3),
    (OrgChart.orientation.top_left = 4),
    (OrgChart.orientation.bottom_left = 5),
    (OrgChart.orientation.right_top = 6),
    (OrgChart.orientation.left_top = 7),
    (OrgChart.CENTER = 8),
    (OrgChart.ORIENTATION = 9),
    (OrgChart.TEXT_THRESHOLD = 250),
    (OrgChart.IMAGES_THRESHOLD = 70),
    (OrgChart.LINKS_THRESHOLD = 150),
    (OrgChart.EXPCOLL_THRESHOLD = 40),
    (OrgChart.ANIM_THRESHOLD = 50),
    (OrgChart.ID = "id"),
    (OrgChart.PID = "pid"),
    (OrgChart.STPID = "stpid"),
    (OrgChart.TAGS = "tags"),
    (OrgChart.NODES = "nodes"),
    (OrgChart.ELASTIC = "elastic"),
    (OrgChart.MAX_DEPTH = 200),
    (OrgChart.SCALE_FACTOR = 1.44),
    (OrgChart.LAZY_LOADING_FACTOR = 500),
    (OrgChart.action = {}),
    (OrgChart.action.expand = 0),
    (OrgChart.action.collapse = 1),
    (OrgChart.action.maximize = 101),
    (OrgChart.action.minimize = 102),
    (OrgChart.action.expandCollapse = 501),
    (OrgChart.action.edit = 1),
    (OrgChart.action.zoom = 2),
    (OrgChart.action.ctrlZoom = 22),
    (OrgChart.action.scroll = 41),
    (OrgChart.action.xScroll = 3),
    (OrgChart.action.yScroll = 4),
    (OrgChart.action.none = 5),
    (OrgChart.action.init = 6),
    (OrgChart.action.update = 7),
    (OrgChart.action.pan = 8),
    (OrgChart.action.centerNode = 9),
    (OrgChart.action.resize = 10),
    (OrgChart.action.insert = 11),
    (OrgChart.action.insertfirst = 12),
    (OrgChart.action.details = 13),
    (OrgChart.action.exporting = 14),
    (OrgChart.none = 400001),
    (OrgChart.scroll = {}),
    (OrgChart.scroll.visible = 1),
    (OrgChart.scroll.smooth = 12),
    (OrgChart.scroll.speed = 120),
    (OrgChart.scroll.safari = { smooth: 12, speed: 250 }),
    (OrgChart.match = {}),
    (OrgChart.match.height = 100001),
    (OrgChart.match.width = 100002),
    (OrgChart.match.boundary = 100003),
    (OrgChart.COLLAPSE_PARENT_NEIGHBORS = 1),
    (OrgChart.COLLAPSE_SUB_CHILDRENS = 2),
    (OrgChart.normal = 0),
    (OrgChart.mixed = 1),
    (OrgChart.tree = 2),
    (OrgChart.treeLeftOffset = 3),
    (OrgChart.treeRightOffset = 4),
    (OrgChart.nodeOpenTag = '<g node-id="{id}" style="opacity: {opacity}" transform="matrix(1,0,0,1,{x},{y})" class="{class}" level="{level}" {lcn}>'),
    (OrgChart.linkOpenTag = '<g link-id="[{id}][{child-id}]" class="{class}" level="{level}">'),
    (OrgChart.expcollOpenTag = '<g control-expcoll-id="{id}" transform="matrix(1,0,0,1,{x},{y})"  style="cursor:pointer;">'),
    (OrgChart.linkFieldsOpenTag = '<g transform="matrix(1,0,0,1,{x},{y}) rotate({rotate})">'),
    (OrgChart.grCloseTag = "</g>"),
    (OrgChart.IT_IS_LONELY_HERE = '<g transform="translate(-100, 0)" style="cursor:pointer;"  control-add="control-add"><text fill="#039be5">{link}</text></g>'),
    (OrgChart.RES = {}),
    (OrgChart.RES.IT_IS_LONELY_HERE_LINK = "It's lonely here, add your first node"),
    (OrgChart.MAX_NODES_MESS = "The trial has expired or 200 nodes limit was reached! <br /><a style='color: #039BE5;' target='_blank' href='https://balkangraph.com/OrgChartJS/Docs/Evaluation'>See more</a>"),
    (OrgChart.OFFLINE_MESS = "The evaluation version requires intermet connection! <br /><a style='color: #039BE5;' target='_blank' href='https://balkangraph.com/OrgChartJS/Docs/Evaluation'>See more</a>"),
    (OrgChart.SEARCH_PLACEHOLDER = "Search"),
    (OrgChart.A4w = 595),
    (OrgChart.A4h = 842),
    (OrgChart.A3w = 842),
    (OrgChart.A3h = 1191),
    (OrgChart.A2w = 1191),
    (OrgChart.A2h = 1684),
    (OrgChart.A1w = 1684),
    (OrgChart.A1h = 2384),
    (OrgChart.Letterw = 612),
    (OrgChart.Letterh = 791),
    (OrgChart.Legalw = 612),
    (OrgChart.Legalh = 1009),
    (OrgChart.MOVE_STEP = 5),
    (OrgChart.MOVE_INTERVAL = 25),
    (OrgChart.MIXED_LAYOUT_ALL_NODES = !0),
    (OrgChart.CLINK_CURVE = 1),
    (OrgChart.SEARCH_RESULT_LIMIT = 10),
    "undefined" != typeof module && (module.exports = OrgChart),
    (OrgChart.input = function (t, e, r, i, a, n) {
        null == i && (i = !1);
        var o = document.createElement("div"),
            l = document.createElement("div"),
            s = document.createElement("input"),
            h = document.createElement("hr"),
            c = document.createElement("button");
        if (
            ((c.innerHTML = "Upload"),
            (c.style.position = "absolute"),
            (c.style.right = 0),
            (o.style.margin = "14px 14px 7px 14px"),
            (o.style.textAlign = "left"),
            (o.style.position = "relative"),
            o.setAttribute("data-field-name", t),
            (h.style.border = "1px solid #d7d7d7"),
            (h.style.backgroundColor = "#d7d7d7"),
            (h.style.display = "block"),
            (h.style.width = "100%"),
            (l.style.color = "#bcbcbc"),
            (s.style.border = "none"),
            (s.style.outline = "none"),
            (s.style.width = "100%"),
            s.setAttribute("val", ""),
            a && (s.style.width = "80%"),
            (s.style.fontSize = "16px"),
            (s.readOnly = i),
            null != e && null != e && (s.value = e),
            null != r && null != r && (s.placeholder = r),
            null != t && null != t && (l.innerHTML = t),
            l.setAttribute("lbl", ""),
            (s.style.color = "#7a7a7a"),
            i ||
                s.addEventListener("focus", function () {
                    var t = this.parentNode.getElementsByTagName("hr")[0];
                    (t.style.border = "1px solid #039BE5"), OrgChart.anim(t, { width: 10 }, { width: o.clientWidth }, 250, OrgChart.anim.inOutSin);
                }),
            c.addEventListener("click", function () {
                var e = this,
                    t = document.createElement("INPUT");
                t.setAttribute("type", "file"),
                    (t.style.display = "none"),
                    (t.onchange = function () {
                        var t = this.files[0];
                        OrgChart.events.publish("imageuploaded", [n, t, e.parentNode.querySelector("input")]);
                    }),
                    document.body.appendChild(t),
                    t.click();
            }),
            s.addEventListener("blur", function () {
                this.parentNode.getElementsByTagName("hr")[0].style.border = "1px solid #d7d7d7";
            }),
            o.appendChild(l),
            o.appendChild(s),
            a && o.appendChild(c),
            o.appendChild(h),
            OrgChart.addValidation)
        ) {
            var d = { wrapper: o, label: l, input: s, hr: h };
            OrgChart.addValidation(t, e, d);
        }
        return o;
    }),
    (OrgChart._intersects = function (t, e, r) {
        var i = t.x - r.siblingSeparation / 4,
            a = t.y,
            n = t.x + t.w + r.siblingSeparation / 4,
            o = t.y;
        switch (r.orientation) {
            case OrgChart.orientation.right:
            case OrgChart.orientation.right_top:
            case OrgChart.orientation.left:
            case OrgChart.orientation.left_top:
                (i = t.x), (a = t.y - r.siblingSeparation / 4), (n = t.x), (o = t.y + t.h + r.siblingSeparation / 4);
        }
        var l,
            s,
            h,
            c = e.p,
            d = e.q,
            g = e.r,
            p = e.s;
        return 0 != (l = (n - i) * (p - d) - (g - c) * (o - a)) && ((s = ((a - o) * (g - i) + (n - i) * (p - a)) / l), 0 < (h = ((p - d) * (g - i) + (c - g) * (p - a)) / l) && h < 1 && 0 < s && s < 1);
    }),
    (OrgChart._addPoint = function (t, e, r, i, a) {
        switch (r.orientation) {
            case OrgChart.orientation.top:
            case OrgChart.orientation.top_left:
                return OrgChart._addPointTop(t, e, r, i, a);
            case OrgChart.orientation.bottom:
            case OrgChart.orientation.bottom_left:
                return OrgChart._addPointBottom(t, e, r, i, a);
            case OrgChart.orientation.left:
            case OrgChart.orientation.left_top:
                return OrgChart._addPointLeft(t, e, r, i, a);
            case OrgChart.orientation.right:
            case OrgChart.orientation.right_top:
                return OrgChart._addPointRight(t, e, r, i, a);
        }
    }),
    (OrgChart._addPointTop = function (t, e, r, i, a) {
        var n, o, l;
        return (
            "left" == a
                ? (n = t.leftNeighbor ? t.x + (t.leftNeighbor.x + t.leftNeighbor.w - t.x) / 2 : t.x - r.siblingSeparation / 2)
                : "right" == a && (n = t.rightNeighbor ? t.x + t.w + (t.rightNeighbor.x - (t.x + t.w)) / 2 : t.x + t.w + r.siblingSeparation / 2),
            e.push([n, e[e.length - 1][1]]),
            e.push([n, t.y - r.levelSeparation / 3]),
            (o = e[e.length - 1][1]),
            (l = n),
            (i.p = n),
            (i.q = o),
            (i.r = l),
            i
        );
    }),
    (OrgChart._addPointBottom = function (t, e, r, i, a) {
        var n, o, l;
        return (
            "left" == a
                ? (n = t.leftNeighbor ? t.x + (t.leftNeighbor.x + t.leftNeighbor.w - t.x) / 2 : t.x - r.siblingSeparation / 2)
                : "right" == a && (n = t.rightNeighbor ? t.x + t.w + (t.rightNeighbor.x - (t.x + t.w)) / 2 : t.x + t.w + r.siblingSeparation / 2),
            e.push([n, e[e.length - 1][1]]),
            e.push([n, t.y + t.h + r.levelSeparation / 3]),
            (o = e[e.length - 1][1]),
            (l = n),
            (i.p = n),
            (i.q = o),
            (i.r = l),
            i
        );
    }),
    (OrgChart._addPointLeft = function (t, e, r, i, a) {
        var n,
            o = e[e.length - 1][0];
        return (
            "bottom" == a
                ? (n = t.rightNeighbor ? t.y + t.h + (t.rightNeighbor.y - (t.y + t.h)) / 2 : t.y + t.h + r.siblingSeparation / 2)
                : "top" == a && (n = t.leftNeighbor ? t.y + (t.leftNeighbor.y + t.leftNeighbor.h - t.y) / 2 : t.y - r.siblingSeparation / 2),
            e.push([e[e.length - 1][0], n]),
            e.push([t.x - r.levelSeparation / 3, n]),
            (o = e[e.length - 1][0]),
            (s = n),
            (i.p = o),
            (i.q = n),
            (i.s = s),
            i
        );
    }),
    (OrgChart._addPointRight = function (t, e, r, i, a) {
        var n,
            o = e[e.length - 1][0];
        return (
            "bottom" == a
                ? (n = t.rightNeighbor ? t.y + t.h + (t.rightNeighbor.y - (t.y + t.h)) / 2 : t.y + t.h + r.siblingSeparation / 2)
                : "top" == a && (n = t.leftNeighbor ? t.y + (t.leftNeighbor.y + t.leftNeighbor.h - t.y) / 2 : t.y - r.siblingSeparation / 2),
            e.push([e[e.length - 1][0], n]),
            e.push([t.x + t.w + r.levelSeparation / 3, n]),
            (o = e[e.length - 1][0]),
            (s = n),
            (i.p = o),
            (i.q = n),
            (i.s = s),
            i
        );
    }),
    (OrgChart.editUI = function () {}),
    (OrgChart.editUI.prototype.init = function (t) {
        (this.obj = t), (this.fields = null), (this.node = null), (this._event_id = OrgChart._guid());
    }),
    (OrgChart.editUI.prototype.on = function (t, e) {
        return OrgChart.events.on(t, e, this._event_id), this;
    }),
    (OrgChart.editUI.prototype.show = function (t, e) {
        if ((this.hide(), !1 === OrgChart.events.publish("show", [this, t]))) return !1;
        (this.node = this.obj.getNode(t)),
            (this.wrapperElement = document.getElementById("bgEditForm")),
            this.wrapperElement && this.obj.element.removeChild(this.wrapperElement),
            (this.wrapperElement = document.createElement("div")),
            (this.wrapperElement.className = "edit-wrapper");
        var r = document.createElement("div");
        r.className = "edit-view";
        var i = document.createElement("div");
        i.className = "details-view";
        var a = "400px";
        window.matchMedia("(max-width: 1150px)").matches && (a = "100%"),
            Object.assign(this.wrapperElement.style, { width: a, position: "absolute", top: 0, right: "-150px", opacity: 0, "border-left": "1px solid #d7d7d7", "text-align": "left", height: "100%", "background-color": "#ffffff" }),
            e ? this._createDetailsView(this.node, i) : this._createEditView(this.node, r);
    }),
    (OrgChart.editUI.prototype._createDetailsView = function (t, e) {
        var r = this,
            i = document.createElement("div");
        i.className = "edit-photo";
        var a = document.createElement("div"),
            n = document.createElement("div");
        n.className = "edit-fields";
        var o = document.createElement("div");
        (o.className = "edit-tags"),
            (a.innerHTML =
                '<svg style="width: 34px; height: 34px;"><path style="fill:#ffffff;" d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111 C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587 c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z"></path></svg>'),
            Object.assign(a.style, { cursor: "pointer", width: "34px", height: "34px", position: "absolute", top: "7px", right: "7px" }),
            Object.assign(n.style, { "overflow-x": "hidden", "overflow-y": "auto" }),
            Object.assign(i.style, { "background-color": "#039BE5", "min-height": "50px", textAlign: "center", position: "relative" }),
            Object.assign(o.style, { margin: "12px" }),
            this.wrapperElement.appendChild(e),
            e.appendChild(i),
            e.appendChild(n),
            n.appendChild(o),
            i.appendChild(a),
            OrgChart.htmlRipple(i);
        for (var l = this.fields, s = this.obj._get(t.id), h = 0; h < l.length; h++) {
            var c = s[l[h]];
            if (OrgChart._fieldIsImg(this.obj.config, l[h])) {
                var d = document.createElement("img");
                (d.src = c), (d.style.width = "100px"), (d.style.margin = "10px"), (d.style.borderRadius = "50px"), this._addField(i, d, l[h], "details");
            } else if ("tags" == l[h]) {
                if (c)
                    for (var g = 0; g < c.length; g++) {
                        var p = document.createElement("span");
                        Object.assign(p.style, { "background-color": "#F57C00", color: "#ffffff", margin: "2px", padding: "2px 12px", "border-radius": "10px", display: "inline-block", border: "1px solid #FFCA28", "user-select": "none" }),
                            (p.innerHTML = c[g]),
                            this._addField(o, p, c[g], "details-tag");
                    }
            } else this._addField(n, OrgChart.input(l[h], c, null, !0, void 0, r), l[h], "details");
        }
        this.obj.element.appendChild(this.wrapperElement),
            i.addEventListener("click", function () {
                r.hide(!1);
            }),
            this.obj._hideBeforeAnimation(),
            OrgChart.anim(this.wrapperElement, { right: -150, opacity: 0 }, { right: 0, opacity: 0.9 }, 300, OrgChart.anim.inOutSin, function () {
                r.obj._showAfterAnimation(), (n.style.height = r.obj.element.offsetHeight - i.offsetHeight + "px");
            });
    }),
    (OrgChart.editUI.prototype._addField = function (t, e, r, i) {
        var a = { name: r, field: e, type: i };
        !1 !== OrgChart.events.publish("field", [this, a]) && t.appendChild(a.field);
    }),
    (OrgChart.editUI.prototype._createEditView = function (t, e) {
        var i = this,
            r = document.createElement("div");
        r.className = "edit-photo";
        var a = document.createElement("div"),
            n = document.createElement("div"),
            o = document.createElement("div");
        o.className = "edit-fields";
        var l = document.createElement("div");
        (l.className = "edit-assistant-button-content"),
            (a.innerHTML =
                '<svg style="width: 34px; height: 34px;"><path style="fill:#ffffff;" d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111 C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587 c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z"></path></svg>'),
            (this.wrapperElement.id = "bgEditForm"),
            Object.assign(a.style, { cursor: "pointer", width: "34px", height: "34px", position: "absolute", top: "7px", right: "7px" }),
            Object.assign(o.style, { "overflow-x": "hidden", "overflow-y": "auto" }),
            Object.assign(r.style, { "background-color": "#039BE5", "min-height": "50px", textAlign: "center", position: "relative" }),
            Object.assign(n.style, { margin: "14px 14px 7px", color: "#4285F4", cursor: "pointer" }),
            Object.assign(l.style, { margin: "14px 14px 7px", color: "rgb(188, 188, 188)" }),
            (n.innerHTML = "Add new field");
        var s = OrgChart._arrayContains(this.node.tags, "assistant") ? "checked" : "";
        l.setAttribute("data-field-name", "isAssistant"),
            (l.innerHTML = '<div style="margin-top: 10px;display:inline-block;">Assistant</div><label class="bg-switch"><input val type="checkbox" ' + s + '><span class="bg-slider round"></span></label>'),
            this.wrapperElement.appendChild(e),
            e.appendChild(r),
            e.appendChild(o),
            r.appendChild(a),
            OrgChart.htmlRipple(r);
        for (var h = this.fields, c = this.obj._get(t.id), d = 0; d < h.length; d++) {
            var g = c[h[d]];
            if ("tags" != h[d])
                if (OrgChart._fieldIsImg(this.obj.config, h[d])) {
                    if (g) {
                        var p = document.createElement("img");
                        (p.src = g), (p.style.width = "100px"), (p.style.margin = "10px"), (p.style.borderRadius = "50px"), r.appendChild(p);
                    }
                    this._addField(o, OrgChart.input(h[d], g, null, !1, !0, i), h[d], "edit");
                } else this._addField(o, OrgChart.input(h[d], g, null, !1, void 0, i), h[d], "edit");
        }
        0 == t.childrenIds.length && t.parent && this._addField(o, l, "isAssistant", "edit"),
            this._addField(o, n, "Add new field", "edit"),
            this.obj.element.appendChild(this.wrapperElement),
            r.addEventListener("click", function () {
                i.hide(!0);
            }),
            n.addEventListener("click", function () {
                if ("Save" == n.innerHTML)
                    OrgChart.anim(n, { opacity: 1 }, { opacity: 0 }, 200, OrgChart.anim.inSin, function () {
                        (n.innerHTML = "Add new field"), (n.style.textAlign = "left");
                        var t = document.getElementById("bgNewField"),
                            e = t.getElementsByTagName("input")[0].value;
                        if ((o.removeChild(t), e && !OrgChart._arrayContains(i.fields, e))) {
                            var r = OrgChart.input(e);
                            (r.style.opacity = 0),
                                o.insertBefore(r, n),
                                OrgChart.anim(r, { opacity: 0 }, { opacity: 1 }, 200, OrgChart.anim.inSin, function () {
                                    r.getElementsByTagName("input")[0].focus();
                                });
                        }
                        OrgChart.anim(n, { opacity: 0 }, { opacity: 1 }, 200, OrgChart.anim.inSin);
                    });
                else {
                    OrgChart.anim(n, { opacity: 1 }, { opacity: 0 }, 200, OrgChart.anim.inSin, function () {
                        (n.innerHTML = "Save"), (n.style.textAlign = "right"), OrgChart.anim(n, { opacity: 0 }, { opacity: 1 }, 200, OrgChart.anim.inSin);
                    });
                    var t = OrgChart.input(null, null, "Field name");
                    (t.style.opacity = 0),
                        (t.id = "bgNewField"),
                        o.appendChild(t),
                        OrgChart.anim(t, { opacity: 0 }, { opacity: 1 }, 200, OrgChart.anim.inSin, function () {
                            t.getElementsByTagName("input")[0].focus();
                        });
                }
            }),
            this.obj._hideBeforeAnimation(),
            OrgChart.anim(this.wrapperElement, { right: -150, opacity: 0 }, { right: 0, opacity: 0.9 }, 300, OrgChart.anim.inOutSin, function () {
                i.obj._showAfterAnimation(), (o.style.height = i.obj.element.offsetHeight - r.offsetHeight + "px"), 1 < i.wrapperElement.getElementsByTagName("input").length && i.wrapperElement.getElementsByTagName("input")[0].focus();
            });
    }),
    (OrgChart.editUI.prototype.hide = function (t) {
        if (this.wrapperElement) {
            if (!1 === OrgChart.events.publish("hide", [this])) return !1;
            var e = this.obj.get(this.node.id);
            if (t) {
                for (var r = this.wrapperElement.querySelectorAll("[data-field-name]"), i = 0; i < r.length; i++) {
                    var a = r[i].getAttribute("data-field-name");
                    if (a) {
                        var n = r[i].querySelector("[val]").value;
                        if (a === OrgChart.TAGS) e.tags = n.split(",");
                        else if ("isAssistant" === a) {
                            var o = r[i].querySelector("[val]").checked;
                            o && e.tags
                                ? OrgChart._arrayContains(this.node.tags, "assistant") || e.tags.push("assistant")
                                : o && !e.tags
                                ? (e.tags = ["assistant"])
                                : !o && e.tags && -1 != this.node.tags.indexOf("assistant") && e.tags.splice(e.tags.indexOf("assistant"), 1);
                        } else null != e[a] ? (e[a] = n) : "" != n && (e[a] = n);
                    }
                }
                var l = this;
                this.obj._hideBeforeAnimation(),
                    OrgChart.anim(l.wrapperElement, { right: 0, opacity: 1 }, { right: -150, opacity: 0 }, 300, OrgChart.anim.inOutSin, function () {
                        l.obj._showAfterAnimation(), l.obj.updateNode(e, null, !0), l.obj.element.removeChild(l.wrapperElement), (l.wrapperElement = null);
                    });
            } else this.obj.element.removeChild(this.wrapperElement), (this.wrapperElement = null);
        }
    }),
    (OrgChart.prototype.getSvg = function () {
        var t = this.element.getElementsByTagName("svg");
        return t && t.length ? t[0] : null;
    }),
    (OrgChart.prototype.getPointerElement = function () {
        return this.element.querySelector("g[data-pointer]");
    }),
    (OrgChart.prototype.getNodeElement = function (t) {
        return this.element.querySelector("g[node-id='" + t + "']");
    }),
    (OrgChart.prototype.getExportMenuButton = function () {
        return this.element.querySelector("[control-export-menu]");
    }),
    (OrgChart.menuUI = function () {}),
    (OrgChart.menuUI.prototype.init = function (t, e) {
        (this.obj = t), (this.wrapper = null), (this.menu = e), (this._event_id = OrgChart._guid());
    }),
    (OrgChart.menuUI.prototype.showStickIn = function (t, e, r, i) {
        this._show(t, null, e, r, i);
    }),
    (OrgChart.menuUI.prototype.show = function (t, e, r, i, a) {
        this._show(t, e, r, i, a);
    }),
    (OrgChart.menuUI.prototype._show = function (t, e, n, o, l) {
        var s = this;
        this.hide();
        var r = "";
        l || (l = this.menu);
        var i = { firstNodeId: n, secondNodeId: o, menu: l };
        if (!1 === OrgChart.events.publish("show", [this, i])) return !1;
        for (var a in (l = i.menu)) {
            var h = l[a].icon,
                c = l[a].text;
            void 0 === h && (h = OrgChart.icon[a](24, 24, "#7A7A7A")),
                "function" == typeof c && (c = c()),
                "function" == typeof h && (h = h()),
                (r += '<div data-item="' + a + '" style="border-bottom: 1px solid #D7D7D7; padding: 7px 10px;color: #7A7A7A;">' + h + "<span>&nbsp;&nbsp;" + c + "</span></div>");
        }
        if ("" != r) {
            if (
                ((this.wrapper = document.createElement("div")),
                Object.assign(this.wrapper.style, {
                    opacity: 0,
                    "background-color": "#FFFEFF",
                    "box-shadow": "#DCDCDC 0px 1px 2px 0px",
                    display: "inline-block",
                    border: "1px solid #D7D7D7;border-radius:5px",
                    "z-index": 1e3,
                    position: "absolute",
                    "text-align": "left",
                    "user-select": "none",
                }),
                (this.wrapper.className = "chart-menu"),
                (this.wrapper.style.left = "-99999px"),
                (this.wrapper.style.top = "-99999px"),
                (this.wrapper.innerHTML = r),
                this.obj.element.appendChild(this.wrapper),
                null == e)
            ) {
                var d = OrgChart._menuPosition(t, this.wrapper, this.obj.getSvg());
                (t = d.x), (e = d.y);
            }
            var g = t + 45;
            (this.wrapper.style.left = g + "px"), (this.wrapper.style.top = e + "px"), (this.wrapper.style.left = g - this.wrapper.offsetWidth + "px");
            var p = t - this.wrapper.offsetWidth;
            OrgChart.anim(this.wrapper, { opacity: 0, left: g - this.wrapper.offsetWidth }, { opacity: 1, left: p }, 300, OrgChart.anim.inOutPow);
            for (var f = this.wrapper.getElementsByTagName("div"), u = 0; u < f.length; u++) {
                (a = f[u]).addEventListener("mouseover", function () {
                    this.style.backgroundColor = "#F0F0F0";
                }),
                    a.addEventListener("mouseleave", function () {
                        this.style.backgroundColor = "#FFFFFF";
                    }),
                    a.addEventListener("click", function (t) {
                        var e,
                            r = this.getAttribute("data-item");
                        if (void 0 === l[r].onClick)
                            if ("add" === r) {
                                var i = { id: OrgChart.randomId(), pid: n };
                                s.obj.addNode(i, null, !0);
                            } else if ("edit" === r) {
                                var a = s.obj.getNode(n);
                                s.obj.editUI.show(a.id);
                            } else if ("details" === r) {
                                a = s.obj.getNode(n);
                                s.obj.editUI.show(a.id, !0);
                            } else
                                "remove" === r
                                    ? s.obj.removeNode(n, null, !0)
                                    : "svg" === r
                                    ? s.obj.exportSVG({ filename: "OrgChart.svg", expandChildren: !1, nodeId: n })
                                    : "pdf" === r
                                    ? s.obj.exportPDF({ filename: "OrgChart.pdf", expandChildren: !1, nodeId: n })
                                    : "png" === r
                                    ? s.obj.exportPNG({ filename: "OrgChart.png", expandChildren: !1, nodeId: n })
                                    : "csv" === r
                                    ? s.obj.exportCSV()
                                    : "xml" === r && s.obj.exportXML();
                        else e = l[r].onClick.call(s.obj, n, o);
                        0 != e && s.hide();
                    });
            }
        }
    }),
    (OrgChart.menuUI.prototype.hide = function () {
        null != this.wrapper && (this.obj.element.removeChild(this.wrapper), (this.wrapper = null));
    }),
    (OrgChart.menuUI.prototype.on = function (t, e) {
        return OrgChart.events.on(t, e, this._event_id), this;
    }),
    void 0 === OrgChart && (OrgChart = {}),
    (OrgChart.idb = { version: 1, dbName: "balkangraph", tableName: "orgchart-js", keyPath: "id" }),
    (OrgChart.idb.db = null),
    (OrgChart.idb._open = function (e) {
        if ((0 < navigator.userAgent.toLowerCase().indexOf("safari") || 0 < navigator.userAgent.toLowerCase().indexOf("firefox")) && window.location !== window.parent.location) e && e(!1);
        else {
            if (!window.indexedDB) return console.error("Your browser doesn't support a stable version of IndexedDB."), void (e && e(!1));
            if (null == OrgChart.idb.db) {
                var t = indexedDB.open(OrgChart.idb.dbName, OrgChart.idb.version);
                (t.onerror = function (t) {
                    console.error("Cannot open database!"), e && e(!1);
                }),
                    (t.onsuccess = function (t) {
                        (OrgChart.idb.db = t.target.result), e && e(!0);
                    }),
                    (t.onupgradeneeded = function (t) {
                        var e = t.target.result;
                        e.objectStoreNames.contains(OrgChart.idb.tableName) && e.deleteObjectStore(OrgChart.idb.tableName);
                        e.createObjectStore(OrgChart.idb.tableName, { keyPath: OrgChart.idb.keyPath });
                    });
            } else e && e(!0);
        }
    }),
    (OrgChart.idb.read = function (r, i) {
        OrgChart.idb._open(function (t) {
            if (t) {
                var e = OrgChart.idb.db.transaction([OrgChart.idb.tableName]).objectStore(OrgChart.idb.tableName).get(r);
                (e.onerror = function (t) {
                    console.error("Unable to retrieve data from database!"), i && i(!1);
                }),
                    (e.onsuccess = function (t) {
                        e.result ? i && i(!0, e.result) : i && i(null);
                    });
            } else i && i(!1);
        });
    }),
    (OrgChart.idb.write = function (r, i) {
        OrgChart.idb.read(r.id, function (t) {
            if (null == t) {
                var e = OrgChart.idb.db.transaction([OrgChart.idb.tableName], "readwrite").objectStore(OrgChart.idb.tableName).add(r);
                (e.onerror = function (t) {
                    console.error("Unable to add data to database!"), i && i(!1);
                }),
                    (e.onsuccess = function (t) {
                        i && i(!0);
                    });
            } else i && i(t);
        });
    }),
    (OrgChart.toolbarUI = function () {}),
    (OrgChart.toolbarUI.expandAllIcon =
        '<svg style="margin-bottom:7px;box-shadow: 0px 1px 4px rgba(0,0,0,0.3); border: 1px solid #cacaca;background-color: #f9f9f9;display: block;cursor: pointer;" width="32px" height="32px"><marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#757575" /></marker><line x1="11" y1="11" x2="6" y2="6" stroke="#757575" stroke-width="2" marker-end="url(#arrow)" /><line x1="21" y1="11" x2="26" y2="6" stroke="#757575" stroke-width="2" marker-end="url(#arrow)" /><line x1="21" y1="21" x2="26" y2="26" stroke="#757575" stroke-width="2" marker-end="url(#arrow)" /><line x1="11" y1="21" x2="6" y2="26" stroke="#757575" stroke-width="2" marker-end="url(#arrow)" /><rect x="12" y="12" width="8" height="8" fill="#757575"></rect></svg>'),
    (OrgChart.toolbarUI.fitIcon =
        '<svg  style="margin-bottom:7px;box-shadow: 0px 1px 4px rgba(0,0,0,0.3); border: 1px solid #cacaca;background-color: #f9f9f9;display: block;cursor: pointer;" width="32px" height="32px"><path stroke-width="3" fill="none" stroke="#757575" d="M4,11 L4,4 L11,4"></path><path stroke-width="3" fill="none" stroke="#757575" d="M28,11 L28,4 L21,4"></path><path stroke-width="3" fill="none" stroke="#757575" d="M28,21 L28,28 L21,28"></path><path stroke-width="3" fill="none" stroke="#757575" d="M4,21 L4,28 L11,28"></path><circle cx="16" cy="16" r="5" fill="#757575"></circle></svg>'),
    (OrgChart.toolbarUI.openFullScreenIcon =
        '<svg  style="margin-bottom:7px;box-shadow: 0px 1px 4px rgba(0,0,0,0.3); border: 1px solid #cacaca;background-color: #f9f9f9;display: block;cursor: pointer;" width="32px" height="32px"><path stroke-width="3" fill="none" stroke="#757575" d="M4,11 L4,4 L11,4"></path><path stroke-width="3" fill="none" stroke="#757575" d="M28,11 L28,4 L21,4"></path><path stroke-width="3" fill="none" stroke="#757575" d="M28,21 L28,28 L21,28"></path><path stroke-width="3" fill="none" stroke="#757575" d="M4,21 L4,28 L11,28"></path><line x1="5" y1="5" x2="27" y2="27" stroke-width="3" stroke="#757575"></line><line x1="5" y1="27" x2="27" y2="5" stroke-width="3" stroke="#757575"></line></svg>'),
    (OrgChart.toolbarUI.closeFullScreenIcon =
        '<svg  style="margin-bottom:7px;box-shadow: 0px 1px 4px rgba(0,0,0,0.3); border: 1px solid #cacaca;background-color: #f9f9f9;display: block;cursor: pointer;" width="32px" height="32px"><path stroke-width="3" fill="none" stroke="#757575" d="M4,11 L4,4 L11,4"></path><path stroke-width="3" fill="none" stroke="#757575" d="M28,11 L28,4 L21,4"></path><path stroke-width="3" fill="none" stroke="#757575" d="M28,21 L28,28 L21,28"></path><path stroke-width="3" fill="none" stroke="#757575" d="M4,21 L4,28 L11,28"></path><rect x="11" y="11" width="10" height="10" stroke-width="3" fill="none" stroke="#757575" ></rect></svg>'),
    (OrgChart.toolbarUI.zoomInIcon =
        '<svg style="box-shadow: 0px 1px 4px rgba(0,0,0,0.3); border-left: 1px solid #cacaca; border-right: 1px solid #cacaca; border-top: 1px solid #cacaca; background-color: #f9f9f9;display: block; cursor: pointer;" width="32px" height="32px" ><g><rect fill="#f9f9f9" x="0" y="0" width="32" height="32" ></rect><line x1="8" y1="16" x2="24" y2="16" stroke-width="3" stroke="#757575"></line><line x1="16" y1="8" x2="16" y2="24" stroke-width="3" stroke="#757575"></line></g><line x1="4" y1="32" x2="28" y2="32" stroke-width="1" stroke="#cacaca"></line></svg>'),
    (OrgChart.toolbarUI.zoomOutIcon =
        '<svg style="box-shadow: 0px 1px 4px rgba(0,0,0,0.3); margin-bottom:7px; border-left: 1px solid #cacaca; border-right: 1px solid #cacaca; border-bottom: 1px solid #cacaca; background-color: #f9f9f9;display: block; cursor: pointer;" width="32px" height="32px" ><g><rect fill="#f9f9f9" x="0" y="0" width="32" height="32" ></rect><line x1="8" y1="16" x2="24" y2="16" stroke-width="3" stroke="#757575"></line></g></svg>'),
    (OrgChart.toolbarUI.layoutIcon =
        '<svg data-tlbr="layout" style="box-shadow: 0px 1px 4px rgba(0,0,0,0.3); border: 1px solid #cacaca;background-color: #f9f9f9;display: block;cursor: pointer;" width="32px" height="32px"><path stroke-width="3" fill="none" stroke="#757575" d="M8,24 L16,14 L24,24"></path><path stroke-width="3" fill="none" stroke="#757575" d="M8,16 L16,8 L24,16"></path></svg>'),
    (OrgChart.toolbarUI.prototype.init = function (t, e) {
        if (e) {
            (this.obj = t),
                (this.toolbar = e),
                (this._visible = !1),
                (this.div = document.createElement("div")),
                this.div.classList.add("bg-toolbar-container"),
                Object.assign(this.div.style, { position: "absolute", padding: "3px", right: this.obj.config.padding + "px", bottom: this.obj.config.padding + "px" }),
                e.expandAll && (this.div.innerHTML += '<div data-tlbr="expand">' + OrgChart.toolbarUI.expandAllIcon + "</div>"),
                e.fit && (this.div.innerHTML += '<div data-tlbr="fit">' + OrgChart.toolbarUI.fitIcon + "</div>"),
                e.zoom && ((this.div.innerHTML += '<div data-tlbr="plus">' + OrgChart.toolbarUI.zoomInIcon + "</div>"), (this.div.innerHTML += '<div data-tlbr="minus">' + OrgChart.toolbarUI.zoomOutIcon + "</div>")),
                e.layout &&
                    ((this.div.innerHTML += '<div data-tlbr="layout">' + OrgChart.toolbarUI.layoutIcon + "</div>"),
                    (this.layouts = document.createElement("div")),
                    (this.layouts.innerHTML =
                        '<svg data-layout="normal" style="cursor: pointer;" width="110" height="100"><rect fill="#039BE5" x="35" y="0" width="50" height="27"></rect><rect fill="#F57C00" x="7" y="41" width="50" height="27"></rect><rect fill="#F57C00" x="63" y="41" width="50" height="27"></rect><line stroke="#000000" x1="60" x2="60" y1="27" y2="35" stroke-width="1"></line><line stroke="#000000" x1="32" x2="88" y1="35" y2="35" stroke-width="1"></line><line stroke="#000000" x1="32" x2="32" y1="35" y2="41" stroke-width="1"></line><line stroke="#000000" x1="88" x2="88" y1="35" y2="41" stroke-width="1"></line></svg><svg data-layout="treeRightOffset" style="cursor: pointer;" width="110" height="100"><rect fill="#039BE5" x="35" y="0" width="50" height="27"></rect><rect fill="#F57C00" x="40" y="41" width="50" height="27"></rect><rect fill="#F57C00" x="40" y="73" width="50" height="27"></rect><line stroke="#000000" x1="60" x2="60" y1="27" y2="35" stroke-width="1"></line><line stroke="#000000" x1="60" x2="35" y1="35" y2="35" stroke-width="1"></line><line stroke="#000000" x1="35" x2="35" y1="35" y2="86" stroke-width="1"></line><line stroke="#000000" x1="35" x2="40" y1="86" y2="86" stroke-width="1"></line><line stroke="#000000" x1="35" x2="40" y1="54" y2="54" stroke-width="1"></line></svg><svg data-layout="treeLeftOffset" style="cursor: pointer;" width="110" height="100"><rect fill="#039BE5" x="35" y="0" width="50" height="27"></rect><rect fill="#F57C00" x="30" y="41" width="50" height="27"></rect><rect fill="#F57C00" x="30" y="73" width="50" height="27"></rect><line stroke="#000000" x1="60" x2="60" y1="27" y2="35" stroke-width="1"></line><line stroke="#000000" x1="60" x2="85" y1="35" y2="35" stroke-width="1"></line><line stroke="#000000" x1="85" x2="85" y1="35" y2="86" stroke-width="1"></line><line stroke="#000000" x1="80" x2="85" y1="86" y2="86" stroke-width="1"></line><line stroke="#000000" x1="80" x2="85" y1="54" y2="54" stroke-width="1"></line></svg><svg data-layout="mixed" style="cursor: pointer;" width="110" height="100"><rect fill="#039BE5" x="35" y="0" width="50" height="27"></rect><rect fill="#F57C00" x="35" y="41" width="50" height="27"></rect><rect fill="#F57C00" x="35" y="73" width="50" height="27"></rect><line stroke="#000000" x1="60" x2="60" y1="27" y2="41" stroke-width="1"></line><line stroke="#000000" x1="60" x2="60" y1="68" y2="73" stroke-width="1"></line></svg><svg data-layout="tree" style="cursor: pointer;" width="110" height="100"><rect fill="#039BE5" x="35" y="0" width="50" height="27"></rect><rect fill="#F57C00" x="7" y="41" width="50" height="27"></rect><rect fill="#F57C00" x="7" y="73" width="50" height="27"></rect><rect fill="#F57C00" x="63" y="41" width="50" height="27"></rect><rect fill="#F57C00" x="63" y="73" width="50" height="27"></rect><line stroke="#000000" x1="60" x2="60" y1="27" y2="86" stroke-width="1"></line><line stroke="#000000" x1="57" x2="63" y1="54" y2="54" stroke-width="1"></line><line stroke="#000000" x1="57" x2="63" y1="86" y2="86" stroke-width="1"></line></svg>'),
                    this.obj.element.appendChild(this.layouts),
                    Object.assign(this.layouts.style, {
                        position: "absolute",
                        width: "100%",
                        left: "0",
                        bottom: "-145px",
                        "box-shadow": "0px 1px 4px rgba(0,0,0,0.3)",
                        "background-color": "#f9f9f9",
                        height: "123px",
                        "padding-top": "20px",
                        "border-top": "1px solid #cacaca",
                    })),
                e.fullScreen && (this.div.innerHTML += '<div data-tlbr="fullScreen">' + OrgChart.toolbarUI.openFullScreenIcon + "</div>"),
                this.obj.element.appendChild(this.div),
                (this.layoutBtn = this.div.querySelector('[data-tlbr="layout"]'));
            var r = this.div.querySelector('[data-tlbr="plus"]'),
                i = this.div.querySelector('[data-tlbr="minus"]'),
                a = this.div.querySelector('[data-tlbr="fit"]'),
                n = this.div.querySelector('[data-tlbr="fullScreen"]'),
                o = this.div.querySelector('[data-tlbr="expand"]'),
                l = this;
            r &&
                r.addEventListener("click", function () {
                    l.obj.zoom(!0, null, !0);
                }),
                i &&
                    i.addEventListener("click", function () {
                        l.obj.zoom(!1, null, !0);
                    }),
                a &&
                    a.addEventListener("click", function () {
                        l.obj.fit();
                    }),
                n &&
                    n.addEventListener("click", function () {
                        l.obj.toggleFullScreen();
                    }),
                o &&
                    o.addEventListener("click", function () {
                        l.obj.expand(null, "all");
                    }),
                this.layoutBtn &&
                    this.layoutBtn.addEventListener("click", function () {
                        l._visible ? l.hideLayout() : l.showLayout();
                    }),
                this.layouts &&
                    this.layouts.addEventListener("click", function (t) {
                        for (var e = t.target; e; ) {
                            if (e.hasAttribute && e.hasAttribute("data-layout")) {
                                (e = e.getAttribute("data-layout")), l.obj.setLayout(OrgChart[e]);
                                break;
                            }
                            e = e.parentNode;
                        }
                    });
        }
    }),
    (OrgChart.toolbarUI.prototype.showLayout = function () {
        (this._visible = !0),
            (this.layoutBtn.style.transform = "rotate(180deg) translateX(0px) translateY(0px)"),
            OrgChart.anim(this.div, { bottom: this.obj.config.padding }, { bottom: this.obj.config.padding + 145 }, this.obj.config.anim.duration, this.obj.config.anim.func),
            OrgChart.anim(this.layouts, { bottom: -145 }, { bottom: 0 }, this.obj.config.anim.duration, this.obj.config.anim.func);
    }),
    (OrgChart.toolbarUI.prototype.hideLayout = function () {
        (this._visible = !1),
            (this.layoutBtn.style.transform = "rotate(0deg) translateX(0px) translateY(0px)"),
            OrgChart.anim(this.div, { bottom: this.obj.config.padding + 145 }, { bottom: this.obj.config.padding }, this.obj.config.anim.duration, this.obj.config.anim.func),
            OrgChart.anim(this.layouts, { bottom: 0 }, { bottom: -145 }, this.obj.config.anim.duration, this.obj.config.anim.func);
    }),
    (OrgChart.notifierUI = function () {}),
    (OrgChart.notifierUI.prototype.init = function (t) {
        this.obj = t;
    }),
    (OrgChart.notifierUI.prototype.show = function (t, e) {
        if (null != t) {
            1 == t && ((t = OrgChart.MAX_NODES_MESS), (e = "#FFCA28")), 2 == t && ((t = OrgChart.OFFLINE_MESS), (e = "#FFCA28"));
            var r = document.createElement("div");
            (r.innerHTML = t),
                Object.assign(r.style, { position: "absolute", "background-color": e, color: "#ffffff", padding: "15px", "border-radius": "40px", opacity: 0, overflow: "hidden", "white-space": "nowrap", "text-align": "center" }),
                this.obj.element.appendChild(r);
            var i = this.obj.width() / 2 - r.offsetWidth / 2,
                a = this.obj.height() / 2 - r.offsetHeight / 2;
            (r.style.left = i + "px"), (r.style.top = a + "px");
            var n = r.offsetWidth;
            (r.style.width = "20px"), OrgChart.anim(r, { opacity: 0, width: 10 }, { opacity: 1, width: n }, this.obj.config.anim.duration, this.obj.config.anim.func);
        }
    }),
    (OrgChart.icon = {}),
    (OrgChart.icon.png = function (t, e, r) {
        return (
            '<svg width="' +
            t +
            '" height="' +
            e +
            '" viewBox="0 0 550.801 550.801"><path fill="' +
            r +
            '" d="M146.747,276.708c0-13.998-9.711-22.352-26.887-22.352c-6.99,0-11.726,0.675-14.204,1.355v44.927 c2.932,0.676,6.539,0.896,11.52,0.896C135.449,301.546,146.747,292.28,146.747,276.708z"/><path fill="' +
            r +
            '" d="M488.426,197.019H475.2v-63.816c0-0.398-0.063-0.799-0.116-1.202c-0.021-2.534-0.827-5.023-2.562-6.995L366.325,3.694 c-0.032-0.031-0.063-0.042-0.085-0.076c-0.633-0.707-1.371-1.295-2.151-1.804c-0.231-0.155-0.464-0.285-0.706-0.419 c-0.676-0.369-1.393-0.675-2.131-0.896c-0.2-0.056-0.38-0.138-0.58-0.19C359.87,0.119,359.037,0,358.193,0H97.2 c-11.918,0-21.6,9.693-21.6,21.601v175.413H62.377c-17.049,0-30.873,13.818-30.873,30.873v160.545 c0,17.043,13.824,30.87,30.873,30.87h13.224V529.2c0,11.907,9.682,21.601,21.6,21.601h356.4c11.907,0,21.6-9.693,21.6-21.601 V419.302h13.226c17.044,0,30.871-13.827,30.871-30.87v-160.54C519.297,210.838,505.47,197.019,488.426,197.019z M97.2,21.605 h250.193v110.513c0,5.967,4.841,10.8,10.8,10.8h95.407v54.108H97.2V21.605z M234.344,335.86v45.831h-31.601V229.524h40.184 l31.611,55.759c9.025,16.031,18.064,34.983,24.825,52.154h0.675c-2.257-20.103-2.933-40.643-2.933-63.44v-44.473h31.614v152.167 h-36.117l-32.516-58.703c-9.049-16.253-18.971-35.892-26.438-53.727l-0.665,0.222C233.906,289.58,234.344,311.027,234.344,335.86z M71.556,381.691V231.56c10.613-1.804,25.516-3.159,46.506-3.159c21.215,0,36.353,4.061,46.509,12.192 c9.698,7.673,16.255,20.313,16.255,35.219c0,14.897-4.959,27.549-13.999,36.123c-11.738,11.063-29.123,16.031-49.441,16.031 c-4.522,0-8.593-0.231-11.736-0.675v54.411H71.556V381.691z M453.601,523.353H97.2V419.302h356.4V523.353z M485.652,374.688 c-10.61,3.607-30.713,8.585-50.805,8.585c-27.759,0-47.872-7.003-61.857-20.545c-13.995-13.1-21.684-32.97-21.452-55.318 c0.222-50.569,37.03-79.463,86.917-79.463c19.644,0,34.783,3.829,42.219,7.446l-7.214,27.543c-8.369-3.617-18.752-6.55-35.458-6.55 c-28.656,0-50.341,16.256-50.341,49.22c0,31.382,19.649,49.892,47.872,49.892c7.895,0,14.218-0.901,16.934-2.257v-31.835h-23.493 v-26.869h56.679V374.688z"/></svg>'
        );
    }),
    (OrgChart.icon.pdf = function (t, e, r) {
        return (
            '<svg width="' +
            t +
            '" height="' +
            e +
            '" viewBox="0 0 550.801 550.801"><path fill="' +
            r +
            '" d="M160.381,282.225c0-14.832-10.299-23.684-28.474-23.684c-7.414,0-12.437,0.715-15.071,1.432V307.6 c3.114,0.707,6.942,0.949,12.192,0.949C148.419,308.549,160.381,298.74,160.381,282.225z"/><path fill="' +
            r +
            '" d="M272.875,259.019c-8.145,0-13.397,0.717-16.519,1.435v105.523c3.116,0.729,8.142,0.729,12.69,0.729 c33.017,0.231,54.554-17.946,54.554-56.474C323.842,276.719,304.215,259.019,272.875,259.019z"/><path fill="' +
            r +
            '" d="M488.426,197.019H475.2v-63.816c0-0.398-0.063-0.799-0.116-1.202c-0.021-2.534-0.827-5.023-2.562-6.995L366.325,3.694 c-0.032-0.031-0.063-0.042-0.085-0.076c-0.633-0.707-1.371-1.295-2.151-1.804c-0.231-0.155-0.464-0.285-0.706-0.419 c-0.676-0.369-1.393-0.675-2.131-0.896c-0.2-0.056-0.38-0.138-0.58-0.19C359.87,0.119,359.037,0,358.193,0H97.2 c-11.918,0-21.6,9.693-21.6,21.601v175.413H62.377c-17.049,0-30.873,13.818-30.873,30.873v160.545 c0,17.043,13.824,30.87,30.873,30.87h13.224V529.2c0,11.907,9.682,21.601,21.6,21.601h356.4c11.907,0,21.6-9.693,21.6-21.601 V419.302h13.226c17.044,0,30.871-13.827,30.871-30.87v-160.54C519.297,210.838,505.47,197.019,488.426,197.019z M97.2,21.605 h250.193v110.513c0,5.967,4.841,10.8,10.8,10.8h95.407v54.108H97.2V21.605z M362.359,309.023c0,30.876-11.243,52.165-26.82,65.333 c-16.971,14.117-42.82,20.814-74.396,20.814c-18.9,0-32.297-1.197-41.401-2.389V234.365c13.399-2.149,30.878-3.346,49.304-3.346 c30.612,0,50.478,5.508,66.039,17.226C351.828,260.69,362.359,280.547,362.359,309.023z M80.7,393.499V234.365 c11.241-1.904,27.042-3.346,49.296-3.346c22.491,0,38.527,4.308,49.291,12.928c10.292,8.131,17.215,21.534,17.215,37.328 c0,15.799-5.25,29.198-14.829,38.285c-12.442,11.728-30.865,16.996-52.407,16.996c-4.778,0-9.1-0.243-12.435-0.723v57.67H80.7 V393.499z M453.601,523.353H97.2V419.302h356.4V523.353z M484.898,262.127h-61.989v36.851h57.913v29.674h-57.913v64.848h-36.593 V232.216h98.582V262.127z"/></svg>'
        );
    }),
    (OrgChart.icon.svg = function (t, e, r) {
        return (
            '<svg width="' +
            t +
            '" height="' +
            e +
            '" viewBox="0 0 550.801 550.801"><path fill="' +
            r +
            '" d="M488.426,197.019H475.2v-63.816c0-0.398-0.063-0.799-0.116-1.202c-0.021-2.534-0.827-5.023-2.562-6.995L366.325,3.694 c-0.032-0.031-0.063-0.042-0.085-0.076c-0.633-0.707-1.371-1.295-2.151-1.804c-0.231-0.155-0.464-0.285-0.706-0.419 c-0.676-0.369-1.393-0.675-2.131-0.896c-0.2-0.056-0.38-0.138-0.58-0.19C359.87,0.119,359.037,0,358.193,0H97.2 c-11.918,0-21.6,9.693-21.6,21.601v175.413H62.377c-17.049,0-30.873,13.818-30.873,30.873v160.545 c0,17.043,13.824,30.87,30.873,30.87h13.224V529.2c0,11.907,9.682,21.601,21.6,21.601h356.4c11.907,0,21.6-9.693,21.6-21.601 V419.302h13.226c17.044,0,30.871-13.827,30.871-30.87v-160.54C519.297,210.838,505.47,197.019,488.426,197.019z M97.2,21.605 h250.193v110.513c0,5.967,4.841,10.8,10.8,10.8h95.407v54.108H97.2V21.605z M338.871,225.672L284.545,386.96h-42.591 l-51.69-161.288h39.967l19.617,68.196c5.508,19.143,10.531,37.567,14.36,57.67h0.717c4.061-19.385,9.089-38.527,14.592-56.953 l20.585-68.918h38.77V225.672z M68.458,379.54l7.415-30.153c9.811,5.021,24.888,10.051,40.439,10.051 c16.751,0,25.607-6.935,25.607-17.465c0-10.052-7.662-15.795-27.05-22.734c-26.8-9.328-44.263-24.168-44.263-47.611 c0-27.524,22.971-48.579,61.014-48.579c18.188,0,31.591,3.823,41.159,8.131l-8.126,29.437c-6.465-3.116-17.945-7.657-33.745-7.657 c-15.791,0-23.454,7.183-23.454,15.552c0,10.296,9.089,14.842,29.917,22.731c28.468,10.536,41.871,25.365,41.871,48.094 c0,27.042-20.812,50.013-65.09,50.013C95.731,389.349,77.538,384.571,68.458,379.54z M453.601,523.353H97.2V419.302h356.4V523.353z M488.911,379.54c-11.243,3.823-32.537,9.103-53.831,9.103c-29.437,0-50.73-7.426-65.57-21.779 c-14.839-13.875-22.971-34.942-22.738-58.625c0.253-53.604,39.255-84.235,92.137-84.235c20.81,0,36.852,4.073,44.74,7.896 l-7.657,29.202c-8.859-3.829-19.849-6.95-37.567-6.95c-30.396,0-53.357,17.233-53.357,52.173c0,33.265,20.81,52.882,50.73,52.882 c8.375,0,15.072-0.96,17.94-2.395v-33.745h-24.875v-28.471h60.049V379.54L488.911,379.54z" /></svg>'
        );
    }),
    (OrgChart.icon.csv = function (t, e, r) {
        return (
            '<svg width="' +
            t +
            '" height="' +
            e +
            '" viewBox="0 0 548.29 548.291" ><path fill="' +
            r +
            '" d="M486.2,196.121h-13.164V132.59c0-0.399-0.064-0.795-0.116-1.2c-0.021-2.52-0.824-5-2.551-6.96L364.656,3.677 c-0.031-0.034-0.064-0.044-0.085-0.075c-0.629-0.707-1.364-1.292-2.141-1.796c-0.231-0.157-0.462-0.286-0.704-0.419 c-0.672-0.365-1.386-0.672-2.121-0.893c-0.199-0.052-0.377-0.134-0.576-0.188C358.229,0.118,357.4,0,356.562,0H96.757 C84.893,0,75.256,9.649,75.256,21.502v174.613H62.093c-16.972,0-30.733,13.756-30.733,30.73v159.81 c0,16.966,13.761,30.736,30.733,30.736h13.163V526.79c0,11.854,9.637,21.501,21.501,21.501h354.777 c11.853,0,21.502-9.647,21.502-21.501V417.392H486.2c16.966,0,30.729-13.764,30.729-30.731v-159.81 C516.93,209.872,503.166,196.121,486.2,196.121z M96.757,21.502h249.053v110.006c0,5.94,4.818,10.751,10.751,10.751h94.973v53.861 H96.757V21.502z M258.618,313.18c-26.68-9.291-44.063-24.053-44.063-47.389c0-27.404,22.861-48.368,60.733-48.368 c18.107,0,31.447,3.811,40.968,8.107l-8.09,29.3c-6.43-3.107-17.862-7.632-33.59-7.632c-15.717,0-23.339,7.149-23.339,15.485 c0,10.247,9.047,14.769,29.78,22.632c28.341,10.479,41.681,25.239,41.681,47.874c0,26.909-20.721,49.786-64.792,49.786 c-18.338,0-36.449-4.776-45.497-9.77l7.38-30.016c9.772,5.014,24.775,10.006,40.264,10.006c16.671,0,25.488-6.908,25.488-17.396 C285.536,325.789,277.909,320.078,258.618,313.18z M69.474,302.692c0-54.781,39.074-85.269,87.654-85.269 c18.822,0,33.113,3.811,39.549,7.149l-7.392,28.816c-7.38-3.084-17.632-5.939-30.491-5.939c-28.822,0-51.206,17.375-51.206,53.099 c0,32.158,19.051,52.4,51.456,52.4c10.947,0,23.097-2.378,30.241-5.238l5.483,28.346c-6.672,3.34-21.674,6.919-41.208,6.919 C98.06,382.976,69.474,348.424,69.474,302.692z M451.534,520.962H96.757v-103.57h354.777V520.962z M427.518,380.583h-42.399 l-51.45-160.536h39.787l19.526,67.894c5.479,19.046,10.479,37.386,14.299,57.397h0.709c4.048-19.298,9.045-38.352,14.526-56.693 l20.487-68.598h38.599L427.518,380.583z" /></svg>'
        );
    }),
    (OrgChart.icon.excel = function (t, e, r) {
        return (
            '<svg width="' +
            t +
            '" height="' +
            e +
            '" viewBox="0 0 512 512"><path fill="#ECEFF1" d="M496,432.011H272c-8.832,0-16-7.168-16-16s0-311.168,0-320s7.168-16,16-16h224 c8.832,0,16,7.168,16,16v320C512,424.843,504.832,432.011,496,432.011z" /><path fill="' +
            r +
            '" d="M336,176.011h-64c-8.832,0-16-7.168-16-16s7.168-16,16-16h64c8.832,0,16,7.168,16,16 S344.832,176.011,336,176.011z" /><path fill="' +
            r +
            '" d="M336,240.011h-64c-8.832,0-16-7.168-16-16s7.168-16,16-16h64c8.832,0,16,7.168,16,16 S344.832,240.011,336,240.011z" /><path fill="' +
            r +
            '" d="M336,304.011h-64c-8.832,0-16-7.168-16-16s7.168-16,16-16h64c8.832,0,16,7.168,16,16 S344.832,304.011,336,304.011z" /><path fill="' +
            r +
            '" d="M336,368.011h-64c-8.832,0-16-7.168-16-16s7.168-16,16-16h64c8.832,0,16,7.168,16,16 S344.832,368.011,336,368.011z" /><path fill="' +
            r +
            '" d="M432,176.011h-32c-8.832,0-16-7.168-16-16s7.168-16,16-16h32c8.832,0,16,7.168,16,16 S440.832,176.011,432,176.011z" /><path fill="' +
            r +
            '" d="M432,240.011h-32c-8.832,0-16-7.168-16-16s7.168-16,16-16h32c8.832,0,16,7.168,16,16 S440.832,240.011,432,240.011z" /><path fill="' +
            r +
            '" d="M432,304.011h-32c-8.832,0-16-7.168-16-16s7.168-16,16-16h32c8.832,0,16,7.168,16,16 S440.832,304.011,432,304.011z" /><path fill="' +
            r +
            '" d="M432,368.011h-32c-8.832,0-16-7.168-16-16s7.168-16,16-16h32c8.832,0,16,7.168,16,16 S440.832,368.011,432,368.011z" /><path fill="' +
            r +
            '"  d="M282.208,19.691c-3.648-3.04-8.544-4.352-13.152-3.392l-256,48C5.472,65.707,0,72.299,0,80.011v352 c0,7.68,5.472,14.304,13.056,15.712l256,48c0.96,0.192,1.952,0.288,2.944,0.288c3.712,0,7.328-1.28,10.208-3.68 c3.68-3.04,5.792-7.584,5.792-12.32v-448C288,27.243,285.888,22.731,282.208,19.691z" /><path fill="#FAFAFA" d="M220.032,309.483l-50.592-57.824l51.168-65.792c5.44-6.976,4.16-17.024-2.784-22.464 c-6.944-5.44-16.992-4.16-22.464,2.784l-47.392,60.928l-39.936-45.632c-5.856-6.72-15.968-7.328-22.56-1.504 c-6.656,5.824-7.328,15.936-1.504,22.56l44,50.304L83.36,310.187c-5.44,6.976-4.16,17.024,2.784,22.464 c2.944,2.272,6.432,3.36,9.856,3.36c4.768,0,9.472-2.112,12.64-6.176l40.8-52.48l46.528,53.152 c3.168,3.648,7.584,5.504,12.032,5.504c3.744,0,7.488-1.312,10.528-3.968C225.184,326.219,225.856,316.107,220.032,309.483z" /></svg>'
        );
    }),
    (OrgChart.icon.edit = function (t, e, r) {
        return (
            '<svg width="' +
            t +
            '" height="' +
            e +
            '" viewBox="0 0 528.899 528.899"><path fill="' +
            r +
            '" d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981 c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611 C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069 L27.473,390.597L0.3,512.69z" /></svg>'
        );
    }),
    (OrgChart.icon.details = function (t, e, r) {
        return (
            '<svg width="' +
            t +
            '" height="' +
            e +
            '" viewBox="0 0 512 512"><path fill="' +
            r +
            '" d="M447.933,103.629c-0.034-3.076-1.224-6.09-3.485-8.352L352.683,3.511c-0.004-0.004-0.007-0.005-0.011-0.008 C350.505,1.338,347.511,0,344.206,0H89.278C75.361,0,64.04,11.32,64.04,25.237v461.525c0,13.916,11.32,25.237,25.237,25.237 h333.444c13.916,0,25.237-11.32,25.237-25.237V103.753C447.96,103.709,447.937,103.672,447.933,103.629z M356.194,40.931 l50.834,50.834h-49.572c-0.695,0-1.262-0.567-1.262-1.262V40.931z M423.983,486.763c0,0.695-0.566,1.261-1.261,1.261H89.278 c-0.695,0-1.261-0.566-1.261-1.261V25.237c0-0.695,0.566-1.261,1.261-1.261h242.94v66.527c0,13.916,11.322,25.239,25.239,25.239 h66.527V486.763z"/><path fill="' +
            r +
            '" d="M362.088,164.014H149.912c-6.62,0-11.988,5.367-11.988,11.988c0,6.62,5.368,11.988,11.988,11.988h212.175 c6.62,0,11.988-5.368,11.988-11.988C374.076,169.381,368.707,164.014,362.088,164.014z"/><path fill="' +
            r +
            '" d="M362.088,236.353H149.912c-6.62,0-11.988,5.368-11.988,11.988c0,6.62,5.368,11.988,11.988,11.988h212.175 c6.62,0,11.988-5.368,11.988-11.988C374.076,241.721,368.707,236.353,362.088,236.353z"/><path fill="' +
            r +
            '" d="M362.088,308.691H149.912c-6.62,0-11.988,5.368-11.988,11.988c0,6.621,5.368,11.988,11.988,11.988h212.175 c6.62,0,11.988-5.367,11.988-11.988C374.076,314.06,368.707,308.691,362.088,308.691z"/><path fill="' +
            r +
            '" d="M256,381.031H149.912c-6.62,0-11.988,5.368-11.988,11.988c0,6.621,5.368,11.988,11.988,11.988H256 c6.62,0,11.988-5.367,11.988-11.988C267.988,386.398,262.62,381.031,256,381.031z"/></svg>'
        );
    }),
    (OrgChart.icon.remove = function (t, e, r) {
        return (
            '<svg width="' +
            t +
            '" height="' +
            e +
            '"  viewBox="0 0 900.5 900.5"><path fill="' +
            r +
            '" d="M176.415,880.5c0,11.046,8.954,20,20,20h507.67c11.046,0,20-8.954,20-20V232.487h-547.67V880.5L176.415,880.5z M562.75,342.766h75v436.029h-75V342.766z M412.75,342.766h75v436.029h-75V342.766z M262.75,342.766h75v436.029h-75V342.766z"/><path fill="' +
            r +
            '" d="M618.825,91.911V20c0-11.046-8.954-20-20-20h-297.15c-11.046,0-20,8.954-20,20v71.911v12.5v12.5H141.874 c-11.046,0-20,8.954-20,20v50.576c0,11.045,8.954,20,20,20h34.541h547.67h34.541c11.046,0,20-8.955,20-20v-50.576 c0-11.046-8.954-20-20-20H618.825v-12.5V91.911z M543.825,112.799h-187.15v-8.389v-12.5V75h187.15v16.911v12.5V112.799z"/></svg>'
        );
    }),
    (OrgChart.icon.add = function (t, e, r) {
        return (
            '<svg width="' +
            t +
            '" height="' +
            e +
            '"   viewBox="0 0 922 922"><path fill="' +
            r +
            '" d="M922,453V81c0-11.046-8.954-20-20-20H410c-11.045,0-20,8.954-20,20v149h318c24.812,0,45,20.187,45,45v198h149 C913.046,473.001,922,464.046,922,453z" /><path fill="' +
            r +
            '" d="M557,667.001h151c11.046,0,20-8.954,20-20v-174v-198c0-11.046-8.954-20-20-20H390H216c-11.045,0-20,8.954-20,20v149h194 h122c24.812,0,45,20.187,45,45v4V667.001z" /><path fill="' +
            r +
            '" d="M0,469v372c0,11.046,8.955,20,20,20h492c11.046,0,20-8.954,20-20V692v-12.501V667V473v-4c0-11.046-8.954-20-20-20H390H196 h-12.5H171H20C8.955,449,0,457.955,0,469z" /></svg>'
        );
    }),
    (OrgChart.icon.search = function (t, e) {
        return (
            '<svg width="' +
            t +
            '" height="' +
            e +
            '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 485.213 485.213"><path fill="#757575" d="M471.882,407.567L360.567,296.243c-16.586,25.795-38.536,47.734-64.331,64.321l111.324,111.324 c17.772,17.768,46.587,17.768,64.321,0C489.654,454.149,489.654,425.334,471.882,407.567z" /><path fill="#757575" d="M363.909,181.955C363.909,81.473,282.44,0,181.956,0C81.474,0,0.001,81.473,0.001,181.955s81.473,181.951,181.955,181.951 C282.44,363.906,363.909,282.437,363.909,181.955z M181.956,318.416c-75.252,0-136.465-61.208-136.465-136.46 c0-75.252,61.213-136.465,136.465-136.465c75.25,0,136.468,61.213,136.468,136.465 C318.424,257.208,257.206,318.416,181.956,318.416z" /><path fill="#757575" d="M75.817,181.955h30.322c0-41.803,34.014-75.814,75.816-75.814V75.816C123.438,75.816,75.817,123.437,75.817,181.955z" /></svg>'
        );
    }),
    (OrgChart.icon.xml = function (t, e, r) {
        return (
            '<svg width="' +
            t +
            '" height="' +
            e +
            '" viewBox="0 0 550.801 550.801"><path fill="' +
            r +
            '"  d="M488.426,197.019H475.2v-63.816c0-0.401-0.063-0.799-0.116-1.205c-0.021-2.534-0.827-5.023-2.562-6.992L366.325,3.691 c-0.032-0.031-0.063-0.042-0.085-0.073c-0.633-0.707-1.371-1.298-2.151-1.804c-0.231-0.158-0.464-0.287-0.706-0.422 c-0.676-0.366-1.393-0.675-2.131-0.896c-0.2-0.053-0.38-0.135-0.58-0.19C359.87,0.119,359.037,0,358.193,0H97.2 c-11.918,0-21.6,9.693-21.6,21.601v175.413H62.377c-17.049,0-30.873,13.818-30.873,30.87v160.542 c0,17.044,13.824,30.876,30.873,30.876h13.224V529.2c0,11.907,9.682,21.601,21.6,21.601h356.4c11.907,0,21.6-9.693,21.6-21.601 V419.302h13.226c17.044,0,30.871-13.827,30.871-30.87V227.89C519.297,210.838,505.47,197.019,488.426,197.019z M97.2,21.605 h250.193v110.51c0,5.967,4.841,10.8,10.8,10.8h95.407v54.108H97.2V21.605z M369.531,374.53h-32.058l-2.156-55.519 c-0.644-17.434-1.298-38.518-1.298-59.611h-0.633c-4.514,18.516-10.547,39.166-16.137,56.162l-17.645,56.601h-25.618 l-15.494-56.157c-4.725-16.996-9.671-37.658-13.123-56.6h-0.43c-0.854,19.585-1.508,41.961-2.586,60.038l-2.576,55.086h-30.343 l9.26-145.035h43.677l14.207,48.421c4.517,16.774,9.041,34.847,12.258,51.843h0.654c4.081-16.77,9.038-35.923,13.774-52.064 l15.493-48.199h42.82L369.531,374.53z M69.992,374.53l41.955-73.385l-40.444-71.65h37.655l12.688,26.465 c4.316,8.828,7.533,15.928,10.99,24.092h0.422c3.438-9.242,6.23-15.694,9.893-24.092l12.274-26.465h37.434l-40.89,70.796 l43.044,74.239h-37.866l-13.134-26.257c-5.376-10.108-8.817-17.639-12.909-26.04h-0.433c-3.009,8.401-6.674,15.932-11.19,26.04 l-12.042,26.257H69.992z M453.601,523.353H97.2V419.302h356.4V523.353z M485.325,374.53h-90.608V229.495h32.933v117.497h57.682 v27.538H485.325z"/></svg>'
        );
    }),
    (OrgChart.prototype.exportPDF = function (t, e) {
        (t = this._defaultExportOptions(t, "pdf")), this._export(t, e);
    }),
    (OrgChart.prototype.exportPNG = function (t, e) {
        (t = this._defaultExportOptions(t, "png")), this._export(t, e);
    }),
    (OrgChart.prototype.exportSVG = function (t, e) {
        (t = this._defaultExportOptions(t, "svg")), this._export(t, e);
    }),
    (OrgChart.prototype._defaultExportOptions = function (t, e) {
        return (
            null == t && (t = {}),
            "svg" == e ? ((t.ext = "svg"), (t.mime = "image/svg+xml")) : "pdf" == e ? ((t.mime = "application/pdf"), (t.ext = "pdf")) : "png" == e && ((t.mime = "image/png"), (t.ext = "png")),
            null == t.margin && (t.margin = [50, 40, 50, 40]),
            null == t.landscape && (t.landscape = !1),
            null == t.filename && (t.filename = "OrgChart." + t.ext),
            null == t.scale && (t.scale = "fit"),
            null == t.format && (t.format = "fit"),
            null == t.header && (t.header = ""),
            null == t.footer && (t.footer = "Page {current-page} of {total-pages}"),
            null == t.openInNewTab && (t.openInNewTab = !1),
            t
        );
    }),
    (OrgChart.prototype._export = function (a, n) {
        var o = this,
            t = { id: a.nodeId, expandChildren: a.expandChildren };
        this._draw(!1, OrgChart.action.exporting, t, function (t) {
            var r = document.createElement("div");
            if (((r.innerHTML = t), "svg" == a.ext))
                if (n) n(a, r.innerHTML);
                else {
                    var e = { content: r.innerHTML, options: a, styles: "" },
                        i = OrgChart.events.publish("exportstart", [o, e]);
                    if ((e.styles && (r.childNodes[0].insertAdjacentHTML("afterbegin", e.styles), (e.content = r.innerHTML)), !1 === i)) return !1;
                    if ((OrgChart._downloadFile(a.mime, e.content, e.options.filename, e.options.openInNewTab), !1 === (i = OrgChart.events.publish("exportend", [o, e])))) return !1;
                }
            else
                o._pages(a, r.querySelector("svg"), function (t) {
                    var e = { content: r.innerHTML, options: a, pages: t, styles: "" };
                    if (!1 === OrgChart.events.publish("exportstart", [o, e])) return !1;
                    n || OrgChart.loading.show(o),
                        n
                            ? n(o, e, r.querySelector("svg"))
                            : ((e = JSON.stringify(e)),
                              OrgChart._ajax(o.config.exportUrl + "/v3", "POST", e, "arraybuffer", function (t) {
                                  if (!1 === OrgChart.events.publish("exportend", [o, t])) return !1;
                                  OrgChart.loading.hide(o), OrgChart._downloadFile(a.mime, t, a.filename, a.openInNewTab);
                              }));
                });
        });
    }),
    (OrgChart.prototype.exportCSV = function (t) {
        t || (t = "OrgChart.csv");
        var e = { ext: "csv", filename: t, nodes: JSON.parse(JSON.stringify(this.config.nodes)) };
        if (!1 === OrgChart.events.publish("exportstart", [this, e])) return !1;
        var r = OrgChart._json2csv(e.nodes),
            i = { ext: e.ext, filename: e.filename, nodes: e.nodes, content: r };
        if (!1 === OrgChart.events.publish("exportend", [this, i])) return !1;
        OrgChart._downloadFile("text/csv;charset=utf-8;", "\ufeff" + i.content, i.filename, i.openInNewTab);
    }),
    (OrgChart.prototype.exportXML = function (t) {
        t || (t = "OrgChart.xml");
        var e = { ext: "xml", filename: t, nodes: JSON.parse(JSON.stringify(this.config.nodes)) };
        if (!1 === OrgChart.events.publish("exportstart", [this, e])) return !1;
        var r = OrgChart._json2xml(e.nodes),
            i = { ext: e.ext, filename: e.filename, nodes: e.nodes, content: r };
        if (!1 === OrgChart.events.publish("exportend", [this, i])) return !1;
        OrgChart._downloadFile("application/xml", i.content, i.filename, i.openInNewTab);
    }),
    (OrgChart.prototype._pages = function (t, e, r) {
        ("A4" == t.format && "fit" != t.scale) ||
        ("A3" == t.format && "fit" != t.scale) ||
        ("A2" == t.format && "fit" != t.scale) ||
        ("A1" == t.format && "fit" != t.scale) ||
        ("Letter" == t.format && "fit" != t.scale) ||
        ("Legal" == t.format && "fit" != t.scale)
            ? r(this._pagesA100(t, e, t.scale))
            : ("A4" == t.format && "fit" == t.scale) ||
              ("A3" == t.format && "fit" == t.scale) ||
              ("A2" == t.format && "fit" == t.scale) ||
              ("A1" == t.format && "fit" == t.scale) ||
              ("Letter" == t.format && "fit" == t.scale) ||
              ("Legal" == t.format && "fit" == t.scale)
            ? r(this._pagesAfit(t, e))
            : "fit" == t.format && r(this._pagesFit(t, e));
    }),
    (OrgChart.prototype._pagesFit = function (t, e) {
        var r = e.getAttribute("width"),
            i = e.getAttribute("height"),
            a = OrgChart.pdfPrevUI._getViewBox(e),
            n = { w: parseFloat(r), h: parseFloat(i) };
        return [{ vb: a, size: { w: n.w + (t.margin[1] + t.margin[3]), h: n.h + (t.margin[0] + t.margin[2]) }, innerSize: n }];
    }),
    (OrgChart.prototype._pagesAfit = function (t, e) {
        var r = e.getAttribute("width"),
            i = 0,
            a = 0;
        switch (t.format) {
            case "A4":
                (i = OrgChart.A4w), (a = OrgChart.A4h);
                break;
            case "A3":
                (i = OrgChart.A3w), (a = OrgChart.A3h);
                break;
            case "A2":
                (i = OrgChart.A2w), (a = OrgChart.A2h);
                break;
            case "A1":
                (i = OrgChart.A1w), (a = OrgChart.A1h);
                break;
            case "Letter":
                (i = OrgChart.Letterw), (a = OrgChart.Letterh);
                break;
            case "Legal":
                (i = OrgChart.Legalw), (a = OrgChart.Legalh);
        }
        var n = t.landscape ? a - (t.margin[1] + t.margin[3]) : i - (t.margin[1] + t.margin[3]),
            o = (t.landscape ? (t.margin[0], t.margin[2]) : (t.margin[0], t.margin[2]), n / r);
        return this._pagesA100(t, e, 100 * o);
    }),
    (OrgChart.prototype._pagesA100 = function (t, e, r) {
        var i = OrgChart.pdfPrevUI._getViewBox(e),
            a = 0,
            n = 0;
        switch (t.format) {
            case "A4":
                (a = OrgChart.A4w), (n = OrgChart.A4h);
                break;
            case "A3":
                (a = OrgChart.A3w), (n = OrgChart.A3h);
                break;
            case "A2":
                (a = OrgChart.A2w), (n = OrgChart.A2h);
                break;
            case "A1":
                (a = OrgChart.A1w), (n = OrgChart.A1h);
                break;
            case "Letter":
                (a = OrgChart.Letterw), (n = OrgChart.Letterh);
                break;
            case "Legal":
                (a = OrgChart.Legalw), (n = OrgChart.Legalh);
        }
        var o = i[0],
            l = i[1],
            s = i[2],
            h = i[3],
            c = { w: t.landscape ? n - (t.margin[1] + t.margin[3]) : a - (t.margin[1] + t.margin[3]), h: t.landscape ? a - (t.margin[0] + t.margin[2]) : n - (t.margin[0] + t.margin[2]) },
            d = { w: t.landscape ? n : a, h: t.landscape ? a : n };
        e.setAttribute("preserveAspectRatio", "xMinYMin slice"), e.setAttribute("width", c.w), e.setAttribute("height", c.h);
        for (var g = o, p = l, f = c.w * (100 / r) - o, u = c.h * (100 / r), m = []; g < s - 1; ) {
            for (; p < h - 1; ) {
                var C = [g, p, g + f, u];
                (C = C.join()), m.push({ vb: C, innerSize: c, size: d }), (p += u - l);
            }
            (g += f), (p = l);
        }
        return m;
    }),
    void 0 === OrgChart && (OrgChart = {}),
    (OrgChart.events = (function () {
        var o = {};
        return {
            on: function (t, e, r) {
                Array.isArray(o[t]) || (o[t] = []), o[t].push({ listener: e, event_id: r });
            },
            removeAll: function (t) {
                Array.isArray(o[t]) || (o[t] = []), (o[t] = []);
            },
            removeForEventId: function (t) {
                for (var e in o) if (Array.isArray(o[e])) for (var r = o[e].length - 1; 0 <= r; r--) o[e][r].event_id == t && o[e].splice(r, 1);
            },
            publish: function (t, e) {
                if (o[t]) {
                    for (var r = [], i = 0; i < o[t].length; i++) {
                        var a = o[t][i];
                        (null != a.event_id && a.event_id != e[0]._event_id) || r.push(a.listener);
                    }
                    if (0 < r.length) {
                        var n = !0;
                        for (i = 0; i < r.length; i++)
                            1 == e.length
                                ? (n = r[i](e[0]) && n)
                                : 2 == e.length
                                ? (n = r[i](e[0], e[1]) && n)
                                : 3 == e.length
                                ? (n = r[i](e[0], e[1], e[2]) && n)
                                : 4 == e.length
                                ? (n = r[i](e[0], e[1], e[2], e[3]) && n)
                                : 5 == e.length && (n = r[i](e[0], e[1], e[2], e[3], e[4]) && n);
                        return n;
                    }
                }
            },
        };
    })()),
    (OrgChart.prototype.importCSV = function () {
        var h = this,
            t = document.createElement("INPUT");
        t.setAttribute("type", "file"),
            t.setAttribute("accept", ".csv"),
            (t.style.display = "none"),
            (t.onchange = function (t) {
                var e = t.target,
                    s = new FileReader();
                (s.onload = function () {
                    for (var t = s.result, e = OrgChart._csvToArray(t, ","), r = [], i = 1; i < e.length; i++) {
                        for (var a = {}, n = 0; n < e[i].length; n++) {
                            var o = e[0][n],
                                l = e[i][n];
                            if ("tags" == o && "" != l) l = l.split(",");
                            else if ("tags" == o && "" == l) continue;
                            a[o] = l;
                        }
                        "" != a.id.trim() && r.push(a);
                    }
                    0 != OrgChart.events.publish("import", [h, r]) && ((h.config.nodes = r), h.draw());
                }),
                    s.readAsText(e.files[0]);
            }),
            t.click();
    }),
    (OrgChart.prototype.importXML = function () {
        var i = this,
            t = document.createElement("INPUT");
        t.setAttribute("type", "file"),
            t.setAttribute("accept", ".xml"),
            (t.style.display = "none"),
            (t.onchange = function (t) {
                var e = t.target,
                    r = new FileReader();
                (r.onload = function () {
                    var t = r.result,
                        e = OrgChart._xml2json(t);
                    0 != OrgChart.events.publish("import", [i, e]) && ((i.config.nodes = e), i.draw());
                }),
                    r.readAsText(e.files[0]);
            }),
            t.click();
    }),
    (OrgChart.prototype.expand = function (t, e, r) {
        var i = { id: t, ids: e };
        this._draw(!1, OrgChart.action.expand, i, r);
    }),
    (OrgChart.prototype.collapse = function (t, e, r) {
        var i = { id: t, ids: e };
        this._draw(!1, OrgChart.action.collapse, i, r);
    }),
    (OrgChart.prototype.expandCollapseToLevel = function (t, e, r, i) {
        (this.config.collapse = e), null == r && (r = {}), (this.config.expand = r);
        var a = { id: t, method: "expandCollapseToLevel" };
        this._draw(!1, OrgChart.action.collapse, a, i);
    }),
    (OrgChart.prototype.maximize = function (t, e, r, i) {
        var a = this,
            n = { id: t, options: {} };
        (n.options.horizontal = !1),
            (n.options.vertical = !1),
            e && (n.options.horizontal = e),
            r && (n.options.vertical = r),
            this._draw(!1, OrgChart.action.maximize, n, function () {
                a.ripple(t), i && i();
            });
    }),
    (OrgChart.prototype.minimize = function (t, e) {
        var r = this,
            i = { id: t };
        this._draw(!1, OrgChart.action.minimize, i, function () {
            r.ripple(t), e && e();
        });
    }),
    (OrgChart.prototype._expCollHandler = function (t) {
        this.nodeMenuUI.hide(), this.nodeContextMenuUI.hide(), this.menuUI.hide();
        var e = this.getNode(t),
            r = this.getCollapsedIds(e);
        if (r.length) {
            if (!1 === OrgChart.events.publish("expcollclick", [this, !1, t, r])) return !1;
            this.expand(t, r, !1);
        } else {
            if (!1 === OrgChart.events.publish("expcollclick", [this, !0, t, e.childrenIds])) return !1;
            this.collapse(t, e.childrenIds, !1);
        }
    }),
    (String.prototype.replaceAll = function (t, e) {
        return this.replace(new RegExp(t, "g"), e);
    }),
    (String.prototype.splice = function (t, e, r) {
        return this.slice(0, t) + r + this.slice(t + Math.abs(e));
    }),
    "function" != typeof Object.assign &&
        Object.defineProperty(Object, "assign", {
            value: function (t, e) {
                "use strict";
                if (null == t) throw new TypeError("Cannot convert undefined or null to object");
                for (var r = Object(t), i = 1; i < arguments.length; i++) {
                    var a = arguments[i];
                    if (null != a) for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (r[n] = a[n]);
                }
                return r;
            },
            writable: !0,
            configurable: !0,
        }),
    "function" != typeof String.prototype.endsWith &&
        (String.prototype.endsWith = function (t) {
            return -1 !== this.indexOf(t, this.length - t.length);
        }),
    (OrgChart.prototype._globalMouseDownHandler = function (t, e) {
        var r = { move: "mousemove", up: "mouseup", leave: "mouseleave" };
        if (
            (-1 != e.type.indexOf("touch") && (1 == e.touches.length ? (this._touch = { x: e.touches[0].clientX, y: e.touches[0].clientY }) : (this._touch = null), (r = { move: "touchmove", up: "touchend", touchstart: "touchstart" })),
            t == e.target)
        )
            return e.stopPropagation(), e.preventDefault(), void this._mouseDownHandler(t, e, r);
        if (this.config.nodeMouseClick == OrgChart.action.pan) {
            for (var i = e.target; i != t && !i.hasAttribute("control-expcoll-id"); ) i = i.parentNode;
            if (!i.hasAttribute("control-expcoll-id")) return e.stopPropagation(), e.preventDefault(), void this._mouseDownHandler(t, e, r);
        }
        for (var a = e.target; a != t; ) {
            if (a.hasAttribute("node-id")) return e.stopPropagation(), e.preventDefault(), void this._nodeMouseDownHandler(a, e, r);
            a = a.parentNode;
        }
    }),
    (OrgChart.prototype._globalClickHandler = function (t, e) {
        if (-1 != e.type.indexOf("touch") && this._touch && 1 == e.changedTouches.length) {
            if (e.changedTouches.length) {
                var r = e.changedTouches[0].clientX,
                    i = e.changedTouches[0].clientY,
                    a = OrgChart.t(this.config.template, !1, this.getScale()).size,
                    n = this.getScale(),
                    o = Math.abs(r - this._touch.x) / n,
                    l = Math.abs(i - this._touch.y) / n;
                if (((this._touch = null), o > a[0] / 10)) return;
                if (l > a[1] / 10) return;
            }
        } else if (-1 != e.type.indexOf("touch") && null == this._touch) return;
        for (var s = e.target; s != t; ) {
            if (s.hasAttribute("control-expcoll-id")) {
                var h = s.getAttribute("control-expcoll-id"),
                    c = this.getNode(h);
                return void this._expCollHandler(c.id);
            }
            if (s.hasAttribute("node-id")) {
                (h = s.getAttribute("node-id")), (c = this.getNode(h));
                return void this._nodeClickHandler(c.id, e);
            }
            if (s.hasAttribute("control-node-menu-id")) {
                (h = s.getAttribute("control-node-menu-id")), (c = this.getNode(h));
                return void this._nodeMenuClickHandler(c.id, s, e);
            }
            if (s.hasAttribute("control-add")) return void this._lonelyButtonHandler();
            s = s.parentNode;
        }
    }),
    (OrgChart.prototype._globalContextHandler = function (t, e) {
        for (var r = e.target; r != t; ) {
            if (r.hasAttribute("node-id")) {
                var i = r.getAttribute("node-id"),
                    a = this.getNode(i);
                return void this._nodeContextHandler(a.id, e);
            }
            r = r.parentNode;
        }
    }),
    (OrgChart.prototype._nodeContextHandler = function (t, e) {
        e.preventDefault(), this.searchUI.hide(), this.nodeMenuUI.hide(), this.nodeContextMenuUI.hide(), this.menuUI.hide();
        var r = this.get(t),
            i = null;
        if (null != r && Array.isArray(r.tags))
            for (var a = 0; a < r.tags.length; a++) {
                var n = r.tags[a];
                this.config.tags[n] && this.config.tags[n].nodeContextMenu && (i = this.config.tags[n].nodeContextMenu);
            }
        this.nodeContextMenuUI.show(e.pageX, e.pageY, t, null, i);
    }),
    (OrgChart.prototype._globalDbClickHandler = function (t, e) {
        for (var r = e.target; r != t; ) {
            if (r.hasAttribute("node-id")) {
                var i = r.getAttribute("node-id"),
                    a = this.getNode(i);
                return void this._nodeDbClickHandler(a.id, e);
            }
            r = r.parentNode;
        }
    }),
    (OrgChart.prototype._mouseScrollHandler = function (t, e) {
        if (this.config.mouseScrool != OrgChart.action.ctrlZoom || e.ctrlKey) {
            var r = this,
                i = !1,
                a = this.config.zoom.speed,
                n = this.config.zoom.smooth,
                o = 0,
                l = this.getScale(),
                s = OrgChart._centerPointInPercent(r.getSvg(), e.pageX, e.pageY),
                h =
                    window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    function (t) {
                        setTimeout(t, 20);
                    };
            e.preventDefault();
            var c = e.delta || e.wheelDelta;
            void 0 === c && (c = -e.detail),
                (c = Math.max(-1, Math.min(1, c))),
                (o += -c * a),
                i ||
                    (function t() {
                        i = !0;
                        var e = (o - l) / n;
                        0 < e ? e++ : e--, (l += e), r.zoom(1 - e / 12 / 50, s), parseInt(l) == parseInt(o) ? (i = !1) : h(t);
                    })();
        }
    }),
    (OrgChart.prototype._nodeMouseDownHandler = function (t, e, i) {
        if (this.config.enableDragDrop) {
            var r = OrgChart._getClientXY(e),
                a = t.getAttribute("node-id"),
                y = this.getNode(a);
            if (!1 !== OrgChart.events.publish("drag", [this, a])) {
                var v = null,
                    x = null;
                (this._gragStartedId = a), (document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = "none");
                var O = this,
                    b = this.getSvg(),
                    w = { x: r.x, y: r.y },
                    k = OrgChart._getTransform(t),
                    _ = k[4],
                    S = k[5],
                    A = O.getScale(),
                    I = t.cloneNode(!0);
                b.insertBefore(I, b.firstChild), (I.style.opacity = 0.7);
                var M = function (t, e) {
                        if (null != t) {
                            e.style.opacity = 1;
                            for (var r = O.getNode(v), i = OrgChart.getStParentNodes(r), a = 0; a < i.length; a++) {
                                var n = O.getNodeElement(i[a].id);
                                n && (n.style.opacity = 1);
                            }
                        }
                    },
                    n = function (t) {
                        if (w) {
                            var e = OrgChart._getClientXY(t),
                                r = document.elementFromPoint(e.x, e.y),
                                i = OrgChart._getOffsetXY(O.element, t),
                                a = { left: O.width() - (i.x + O.config.padding) < 0, right: i.x - O.config.padding < 0, down: O.height() - (i.y + O.config.padding) < 0, up: i.y - O.config.padding < 0 };
                            if (a.left || a.right || a.up || a.down) {
                                b.classList.remove("cursor-grab"), b.classList.add("cursor-move"), b.classList.remove("cursor-nodrop"), b.classList.remove("cursor-copy");
                                var n = k[4],
                                    o = k[5],
                                    l = w.x,
                                    s = w.y,
                                    h = e.x,
                                    c = e.y;
                                O.startMove(a, function (t) {
                                    (k[4] = n + t.x),
                                        (k[5] = o + t.y),
                                        (w.x = l - t.xWithoutScale),
                                        (w.y = s - t.yWithoutScale),
                                        (e.x = h - t.xWithoutScale),
                                        (e.y = c - t.yWithoutScale),
                                        I.setAttribute("transform", "matrix(" + k.toString() + ")");
                                });
                            } else {
                                if ((O.stopMove(), b.classList.add("cursor-grab"), b.classList.remove("cursor-move"), b.classList.remove("cursor-nodrop"), b.classList.remove("cursor-copy"), M(v, x), (x = v = null), O.config.enableDragDrop))
                                    for (; null != r && r != b; ) {
                                        if (r.hasAttribute && r.hasAttribute("node-id")) {
                                            var d = r.getAttribute("node-id");
                                            if (O._gragStartedId && d != O._gragStartedId) {
                                                (v = d), (x = r);
                                                break;
                                            }
                                        }
                                        r = r.parentNode;
                                    }
                                if (null != v) {
                                    x.style.opacity = 0.5;
                                    for (var g = O.getNode(v), p = OrgChart.getStParentNodes(g), f = 0; f < p.length; f++) {
                                        var u = O.getNodeElement(p[f].id);
                                        u && (u.style.opacity = 0.1);
                                    }
                                    O._canUpdateLink(y.id, v)
                                        ? (b.classList.remove("cursor-grab"), b.classList.remove("cursor-move"), b.classList.add("cursor-copy"), b.classList.remove("cursor-nodrop"))
                                        : (b.classList.remove("cursor-grab"), b.classList.remove("cursor-move"), b.classList.remove("cursor-copy"), b.classList.add("cursor-nodrop"));
                                }
                                var m = (e.x - w.x) / A,
                                    C = (e.y - w.y) / A;
                                (k[4] = _ + m), (k[5] = S + C), I.setAttribute("transform", "matrix(" + k.toString() + ")");
                            }
                        }
                    },
                    o = function (t) {
                        if (
                            (O.stopMove(),
                            b.classList.remove("cursor-grab"),
                            b.classList.remove("cursor-move"),
                            b.classList.remove("cursor-nodrop"),
                            b.classList.remove("cursor-copy"),
                            b.removeEventListener(i.move, n),
                            b.removeEventListener(i.up, o),
                            i.leave && b.removeEventListener(i.leave, o),
                            y.id == v || null == v)
                        )
                            return b.removeChild(I), void (O._gragStartedId = null);
                        var e = O.getNode(v);
                        if (!1 === OrgChart.events.publish("drop", [O, y.id, e.id])) return M(v, x), b.removeChild(I), void (O._gragStartedId = null);
                        if (O._canUpdateLink(y.id, v)) {
                            var r = O.get(y.id);
                            (r.pid = v), (r.stpid = null), O.updateNode(r, null, !0);
                        } else b.removeChild(I), M(v, x);
                        O._gragStartedId = null;
                    };
                b.addEventListener(i.move, n), b.addEventListener(i.up, o), i.leave && b.addEventListener(i.leave, o);
            }
        }
    }),
    (OrgChart.prototype._resizeHandler = function (t, e) {
        var r = this.getViewBox(),
            i = this.getSvg(),
            a = i.getAttribute("width"),
            n = i.getAttribute("height"),
            o = a / r[2],
            l = n / r[3],
            s = l < o ? l : o;
        i.setAttribute("width", this.width()),
            i.setAttribute("height", this.height()),
            (r[2] = this.width() / s),
            (r[3] = this.height() / s),
            this.setViewBox(r),
            this.xScrollUI.create(this.width()),
            this.yScrollUI.create(this.height()),
            this._draw(!1, OrgChart.action.resize);
    }),
    (OrgChart.prototype._nodeDbClickHandler = function (t, e) {
        if (!1 === OrgChart.events.publish("dbclick", [this, this.get(t)])) return !1;
        this._commonClickHandler(t, e, this.config.nodeMouseDbClick);
    }),
    (OrgChart.prototype._nodeClickHandler = function (t, e) {
        if (!1 === OrgChart.events.publish("click", [this, { node: this.getNode(t), event: e }])) return !1;
        this._commonClickHandler(t, e, this.config.nodeMouseClick);
    }),
    (OrgChart.prototype._commonClickHandler = function (t, e, r) {
        this.searchUI.hide(), this.nodeMenuUI.hide(), this.nodeContextMenuUI.hide(), this.menuUI.hide();
        var i = this.getNode(t);
        if (r == OrgChart.action.expandCollapse) {
            var a = this.getCollapsedIds(i);
            if (a.length) {
                if (!1 === OrgChart.events.publish("expcollclick", [this, !1, t, a])) return !1;
                this.expand(t, a, !1);
            } else {
                if (!1 === OrgChart.events.publish("expcollclick", [this, !0, t, i.childrenIds])) return !1;
                this.collapse(t, i.childrenIds, !1);
            }
            this.ripple(i.id, e.clientX, e.clientY);
        }
        r == OrgChart.action.edit && (this.editUI.show(i.id), this.ripple(i.id, e.clientX, e.clientY)), r == OrgChart.action.details && (this.editUI.show(i.id, !0), this.ripple(i.id, e.clientX, e.clientY));
    }),
    (OrgChart.prototype._menuHandlerMouseDownHandler = function (t, e) {
        e.stopPropagation(), e.preventDefault();
    }),
    (OrgChart.prototype._nodeMenuClickHandler = function (t, e, r) {
        this.searchUI.hide(), this.nodeMenuUI.hide(), this.nodeContextMenuUI.hide(), this.menuUI.hide();
        var i = this.getNode(t),
            a = null;
        if (Array.isArray(i.tags))
            for (var n = 0; n < i.tags.length; n++) {
                var o = i.tags[n];
                this.config.tags[o] && this.config.tags[o].nodeMenu && (a = this.config.tags[o].nodeMenu);
            }
        this.nodeMenuUI.showStickIn(e, t, null, a);
    }),
    (OrgChart.prototype._exportMenuClickHandler = function (t, e) {
        e.stopPropagation(), e.preventDefault(), this.nodeMenuUI.hide(), this.nodeContextMenuUI.hide(), this.menuUI.show(t.offsetLeft, t.offsetTop);
    }),
    (OrgChart.prototype._lonelyButtonHandler = function () {
        var t = new OrgChart.node(OrgChart.randomId(), null, [], this.config.template);
        !1 !== this.addNode(t, null, !0) && this.center(t.id);
    }),
    (OrgChart.prototype._move = function (t, e, r) {
        (r[0] = e), (r[1] = t), this.setViewBox(r), this.xScrollUI.setPosition(), this.yScrollUI.setPosition();
    }),
    (OrgChart.prototype.startMove = function (t, e) {
        if (t) {
            if (((this._movePosition = t), !this._moveInterval)) {
                var r = this,
                    i = this.getViewBox().slice(0),
                    a = this.getScale(),
                    n = 0,
                    o = 0;
                this._moveInterval = setInterval(function () {
                    var t = { x: 0, y: 0, xWithoutScale: 0, yWithoutScale: 0 };
                    r._movePosition.left && (n++, (t.x = (n * OrgChart.MOVE_STEP) / a), (t.xWithoutScale = n * OrgChart.MOVE_STEP)),
                        r._movePosition.right && (n++, (t.x = (-n * OrgChart.MOVE_STEP) / a), (t.xWithoutScale = -n * OrgChart.MOVE_STEP)),
                        r._movePosition.up && (o++, (t.y = (-o * OrgChart.MOVE_STEP) / a), (t.yWithoutScale = -o * OrgChart.MOVE_STEP)),
                        r._movePosition.down && (o++, (t.y = (o * OrgChart.MOVE_STEP) / a), (t.yWithoutScale = o * OrgChart.MOVE_STEP)),
                        r.setViewBox([i[0] + t.x, i[1] + t.y, i[2], i[3]]),
                        r.xScrollUI.setPosition(),
                        r.yScrollUI.setPosition(),
                        e && e(t);
                }, OrgChart.MOVE_INTERVAL);
            }
        } else console.error("movePosition parameter not defined");
    }),
    (OrgChart.prototype.stopMove = function () {
        this._moveInterval && (clearInterval(this._moveInterval), (this._moveInterval = null), (this._movePosition = null));
    }),
    void 0 === OrgChart && (OrgChart = {}),
    (OrgChart.node = function (t, e, r, i) {
        (this.templateName = i),
            (this.id = t),
            (this.pid = e),
            (this.children = []),
            (this.childrenIds = []),
            (this.parent = null),
            (this.stpid = null),
            (this.stParent = null),
            (this.stChildren = []),
            (this.stChildrenIds = []),
            (this.tags = r),
            this.tags || (this.tags = []);
    });
var node = new OrgChart.node();
(OrgChart.prototype._mouseDownHandler = function (t, e, r) {
    var s = this;
    (document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = "none"), this.editUI.hide(), this.searchUI.hide(), this.nodeMenuUI.hide(), this.nodeContextMenuUI.hide(), this.menuUI.hide();
    var h = this.getViewBox(),
        c = this.getScale(),
        i = OrgChart._getClientTouchesXY(e, 0),
        a = OrgChart._getClientTouchesXY(e, 1),
        d = { diffX: 0, diffY: 0, x0: i.x, y0: i.y, type: "pan", viewBoxLeft: h[0], viewBoxTop: h[1] };
    e.touches && 1 < e.touches.length && ((d.type = "pinch"), (d.dist = Math.sqrt((i.x - a.x) * (i.x - a.x) + (i.y - a.y) * (i.y - a.y))));
    var n = this.getPointerElement();
    if ("pan" == d.type) {
        this._hideBeforeAnimation();
        var o = OrgChart._getOffsetXY(this.element, e),
            l = o.x / c + h[0] - 16 / c,
            g = o.y / c + h[1] - 16 / c;
        (n.style.display = "inherit"),
            n.setAttribute("transform", "matrix(0,0,0,0," + l + "," + g + ")"),
            OrgChart.anim(n, { transform: [0, 0, 0, 0, l, g], opacity: 0 }, { transform: [1 / c, 0, 0, 1 / c, l, g], opacity: 1 }, 300, OrgChart.anim.outBack);
    }
    var p = function (t) {
            var e = OrgChart._getClientTouchesXY(t, 0);
            if (d && "pan" == d.type) {
                s._hideBeforeAnimation(), (d.diffX = e.x - d.x0), (d.diffY = e.y - d.y0);
                var r = -d.diffY / c + d.viewBoxTop,
                    i = -d.diffX / c + d.viewBoxLeft;
                s._move(r, i, h);
            } else if (d && "pinch" == d.type) {
                var a = OrgChart._getClientTouchesXY(t, 1),
                    n = Math.sqrt((e.x - a.x) * (e.x - a.x) + (e.y - a.y) * (e.y - a.y)),
                    o = 1 + (n - d.dist) / (d.dist / 100) / 100;
                d.dist = n;
                var l = OrgChart._pinchMiddlePointInPercent(s.element, s.width(), s.height(), t);
                s.zoom(o, l);
            }
        },
        f = function () {
            "pan" == d.type && s.config.sticky
                ? OrgChart._moveToBoundaryArea(t, s.getViewBox(), s.response.boundary, function () {
                      s._draw(!0, OrgChart.action.pan);
                  })
                : "pan" != d.type || s.config.sticky || s._draw(!0, OrgChart.action.pan),
                (d = null),
                (n.style.display = "none"),
                t.removeEventListener(r.move, p),
                t.removeEventListener(r.up, f),
                r.leave && t.removeEventListener(r.leave, f),
                r.touchstart && t.removeEventListener(r.touchstart, f);
        };
    t.addEventListener(r.move, p), t.addEventListener(r.up, f), r.leave && t.addEventListener(r.leave, f), r.touchstart && t.addEventListener(r.touchstart, f);
}),
    void 0 === OrgChart && (OrgChart = {}),
    void 0 === OrgChart.remote && (OrgChart.remote = {}),
    (OrgChart.LIMIT_NODES = !0),
    (OrgChart.remote._fromResDTO = function (t, e, r, i, a) {
        var n = e[t.id];
        (t.x = n.p[0]), (t.y = n.p[1]), (t.w = n.p[2]), (t.h = n.p[3]), null != n.ln && (t.leftNeighbor = a[n.ln]), null != n.rn && (t.rightNeighbor = a[n.rn]);
        for (var o = 0; o < t.stChildren.length; o++) OrgChart.remote._fromResDTO(t.stChildren[o], e, r, i, a);
        for (o = 0; o < t.children.length; o++) OrgChart.remote._fromResDTO(t.children[o], e, r, i, a);
    }),
    (OrgChart.remote._toReqDTO = function (t, e) {
        var r = { p: [t.id, null != t.parent ? t.parent.id : null, null != t.stParent ? t.stParent.id : null, t.w, t.h] };
        0 < t.children.length && (r.c = OrgChart.remote._convertToIdArray(t.children)),
            0 < t.stChildren.length && (r.v = OrgChart.remote._convertToIdArray(t.stChildren)),
            null != t.layout && 0 != t.layout && (r.l = t.layout),
            t.isAssistant && (r.a = 1),
            t.isSplit && (r.s = t.isSplit),
            t.padding && (r.q = t.padding),
            t.lcn && (r.k = t.lcn),
            t.stContainerNodes && (r.b = OrgChart.remote._convertToIdArray(t.stContainerNodes)),
            t._m && (r.m = t._m.id),
            e.push(r);
        for (var i = 0; i < t.stChildren.length; i++) OrgChart.remote._toReqDTO(t.stChildren[i], e);
        for (i = 0; i < t.children.length; i++) OrgChart.remote._toReqDTO(t.children[i], e);
    }),
    (OrgChart.remote._toReqLayoutConfigsDTO = function (t) {
        var e = {};
        for (var r in t) {
            var i = t[r];
            e[r] || (e[r] = []),
                (e[r][0] = i.orientation),
                (e[r][1] = i.levelSeparation),
                (e[r][2] = i.mixedHierarchyNodesSeparation),
                (e[r][3] = i.subtreeSeparation),
                (e[r][4] = i.siblingSeparation),
                (e[r][5] = i.layout),
                (e[r][6] = i.columns),
                (e[r][7] = i.collapse),
                (e[r][8] = i.assistantSeparation);
        }
        return e;
    }),
    (OrgChart.remote._convertToIdArray = function (t) {
        for (var e = [], r = 0; r < t.length; r++) e.push(t[r].id);
        return e;
    }),
    (OrgChart.remote._setPositions = function (r, t, i, a) {
        for (var e = [], n = [], o = OrgChart.remote._toReqLayoutConfigsDTO(t), l = 0; l < r.length; l++) n.push(r[l].id), OrgChart.remote._toReqDTO(r[l], e);
        var s = { n: e, c: o, r: n, v: "7.0.0" };
        OrgChart.LIMIT_NODES || (s.l = !0),
            null != OrgChart.remote._fromReqDTO
                ? OrgChart.remote._fromReqDTO(s.n, s.r, s.c, function (t) {
                      for (var e = 0; e < r.length; e++) OrgChart.remote._fromResDTO(r[e], t, 0, r, a);
                      i();
                  })
                : ((s = JSON.stringify(s)),
                  OrgChart.idb.read(s, function (t, e) {
                      t
                          ? OrgChart.remote._proceed(r, e.res, a, i)
                          : OrgChart.remote._findRegion(function (t) {
                                OrgChart._ajax(t, "post", s, "json", function (t) {
                                    t.error ? i(2) : (OrgChart.remote._proceed(r, t, a, i), OrgChart.idb.write({ id: s, res: t }));
                                });
                            });
                  }));
    }),
    (OrgChart.remote._proceed = function (t, e, r, i) {
        if (("string" == typeof e && (e = JSON.parse(e)), e.limit && 1 == e.limit)) i(e.limit);
        else {
            for (var a = 0; a < t.length; a++) OrgChart.remote._fromResDTO(t[a], e, 0, t, r);
            i();
        }
    }),
    (OrgChart.remote.getItem = function (t) {
        return OrgChart._browser().msie || OrgChart._browser().edge ? OrgChart.remote[t] : localStorage.getItem(t);
    }),
    (OrgChart.remote.setItem = function (t, e) {
        OrgChart._browser().msie || OrgChart._browser().edge ? (OrgChart.remote[t] = e) : localStorage.setItem(t, e);
    }),
    (OrgChart.remote._findRegion = function (r) {
        var t = OrgChart.remote.getItem("funcUrl");
        if (t) r(t);
        else {
            for (
                var i = ["au-e", "au-se", "brs", "ca", "ca-e", "easia", "eus-2", "eus", "fr", "ind", "jp-e", "jp-w", "kr", "n-eu", "se-asia", "s-ind", "uk-s", "uk-w", "us", "us-n-c", "us-s-c", "w-c-us", "w-eu", "w-ind", "w-us-2", "wus"],
                    a = [],
                    n = 0;
                n < i.length;
                n++
            )
                a.push(new XMLHttpRequest());
            for (n = 0; n < i.length; n++)
                !(function () {
                    var e = "https://" + i[n] + "-balkangraph.azurewebsites.net/api/OrgChartJS",
                        t = a[n];
                    (t.onreadystatechange = function () {
                        if (4 == this.readyState && 200 == this.status) {
                            OrgChart.remote.setItem("funcUrl", e), r(e);
                            for (var t = 0; t < a.length; t++) a[t].abort();
                        }
                    }),
                        t.open("GET", e, !0),
                        t.send();
                })();
        }
    }),
    (OrgChart.searchUI = function () {}),
    (OrgChart.searchUI.prototype.init = function (t) {
        this.obj = t;
    }),
    (OrgChart.searchUI.prototype.hide = function () {
        var t = this.obj.element.querySelector('[data-id="search"]');
        if (t) {
            var e = t.querySelector('[data-id="cell-1"]'),
                r = this.obj.element.getElementsByTagName("input")[0],
                i = this.obj.element.querySelector('[data-id="container"]');
            (r.value = ""),
                (i.innerHTML = ""),
                "none" != e.style.display &&
                    "none" != t.style.display &&
                    OrgChart.anim(e, { opacity: e.style.opacity }, { opacity: 0 }, 200, OrgChart.anim.inOutSin, function () {
                        (e.style.display = "none"),
                            OrgChart.anim(t, { width: 300, opacity: 1 }, { width: 50, opacity: 0 }, 300, OrgChart.anim.inBack, function () {
                                t.style.display = "none";
                            });
                    });
        }
    }),
    (OrgChart.searchUI.prototype.show = function (t) {
        var e = this.obj.element.querySelector('[data-id="search"]'),
            r = e.querySelector('[data-id="cell-1"]');
        (r.style.display = "none"),
            (e.style.width = "50px"),
            (e.style.display = "block"),
            (e.style.opacity = 0),
            OrgChart.anim(e, { width: 50, opacity: 0 }, { width: 300, opacity: 1 }, 300, OrgChart.anim.outBack, function () {
                (r.style.display = "inherit"), (r.style.opacity = 0), OrgChart.anim(r, { opacity: 0 }, { opacity: 1 }, 200, OrgChart.anim.inOutSin), t && t();
            });
    }),
    (OrgChart.searchUI.prototype.addSearchControl = function () {
        var i = this,
            t = document.createElement("div");
        (t.innerHTML = OrgChart.searchUI.createSearchIcon(this.obj.config.padding)), (t.innerHTML += OrgChart.searchUI.createInputField(this.obj.config.padding)), this.obj.element.appendChild(t);
        var e = this.obj.element.querySelector('[data-id="search-icon"]'),
            a = this.obj.element.querySelector('[data-id="search"]'),
            r = this.obj.element.getElementsByTagName("input")[0];
        e.addEventListener("mouseover", function () {
            i.show();
        }),
            a.addEventListener("mouseleave", function () {
                document.activeElement != r && i.hide();
            }),
            a.addEventListener("click", function () {
                r.focus();
            }),
            r.addEventListener("keypress", function (t) {
                13 == t.keyCode && t.preventDefault();
            }),
            r.addEventListener("keyup", function (t) {
                40 == t.keyCode ? n() : 38 == t.keyCode ? o() : 13 == t.keyCode ? l() : 27 == t.keyCode ? i.hide() : i._serverSearch(this.value);
            });
        var n = function () {
                var t = a.querySelectorAll("[data-search-item-id]"),
                    e = a.querySelector('[data-selected="yes"]');
                null == e && 0 < t.length
                    ? (t[0].setAttribute("data-selected", "yes"), (t[0].style.backgroundColor = "#F0F0F0"))
                    : 0 < t.length && e.nextSibling && (e.setAttribute("data-selected", "no"), (e.style.backgroundColor = "inherit"), e.nextSibling.setAttribute("data-selected", "yes"), (e.nextSibling.style.backgroundColor = "#F0F0F0"));
            },
            o = function () {
                var t = a.querySelectorAll("[data-search-item-id]"),
                    e = a.querySelector('[data-selected="yes"]');
                null == e && 0 < t.length
                    ? (t[t.length - 1].setAttribute("data-selected", "yes"), (t[t.length - 1].style.backgroundColor = "#F0F0F0"))
                    : 0 < t.length &&
                      e.previousSibling &&
                      (e.setAttribute("data-selected", "no"), (e.style.backgroundColor = "inherit"), e.previousSibling.setAttribute("data-selected", "yes"), (e.previousSibling.style.backgroundColor = "#F0F0F0"));
            },
            l = function () {
                var t = a.querySelector('[data-selected="yes"]');
                if (t) {
                    var e = t.getAttribute("data-search-item-id"),
                        r = OrgChart.events.publish("searchclick", [i.obj, e]);
                    (null != r && 1 != r) || i.obj.center(e);
                }
            };
    }),
    (OrgChart.searchUI.prototype.find = function (e) {
        var r = this;
        this.show(function () {
            var t = r.obj.element.getElementsByTagName("input")[0];
            (t.value = e), r._serverSearch(e), t.focus();
        });
    }),
    (OrgChart.searchUI.prototype._serverSearch = function (t) {
        for (var e = this, r = this.obj.element.querySelector('[data-id="container"]'), i = this.obj.element.querySelector('[data-id="search"]'), a = this.obj.server.find(t), n = "", o = 0; o < a.length; o++) {
            var l = a[o],
                s = "";
            l.img && (s = '<img style="padding: 2px 0px  2px 7px;width:32px;height:32px;" src="' + l.img + '" / >'), (n += OrgChart.searchUI.createItem(s, l));
        }
        r.innerHTML = n;
        var h = i.querySelectorAll("[data-search-item-id]");
        for (o = 0; o < h.length; o++)
            h[o].addEventListener("click", function () {
                var t = OrgChart.events.publish("searchclick", [e.obj, this.getAttribute("data-search-item-id")]);
                (null != t && 1 != t) || e.obj.center(this.getAttribute("data-search-item-id"));
            }),
                h[o].addEventListener("mouseover", function () {
                    this.setAttribute("data-selected", "yes"), (this.style.backgroundColor = "#F0F0F0");
                }),
                h[o].addEventListener("mouseleave", function () {
                    (this.style.backgroundColor = "inherit"), this.setAttribute("data-selected", "no");
                });
    }),
    (OrgChart.searchUI.createInputField = function (t) {
        return (
            '<div data-id="search" style="display:none;border-radius: 20px 20px;padding:5px; box-shadow: #808080 0px 1px 2px 0px; font-family:Roboto-Regular, Helvetica;color:#7a7a7a;font-size:14px;border:1px solid #d7d7d7;width:300px;position:absolute;top:' +
            t +
            "px;left:" +
            t +
            'px;background-color:#ffffff;"><div><div style="float:left;">' +
            OrgChart.icon.search(32, 32) +
            '</div><div data-id="cell-1" style="float:right; width:83%"><input placeholder="' +
            OrgChart.SEARCH_PLACEHOLDER +
            '" style="font-size:14px;font-family:Roboto-Regular, Helvetica;color:#7a7a7a;width:100%;border:none;outline:none; padding-top:10px;" type="text" /></div><div style="clear:both;"></div></div><div data-id="container"></div></div>'
        );
    }),
    (OrgChart.searchUI.createItem = function (t, e) {
        return (
            '<div data-search-item-id="' +
            e.id +
            '" style="border-top:1px solid #d7d7d7; padding: 7px 0 7px 0;cursor:pointer;"><div style="float:left;">' +
            t +
            '</div><div style="float:right; width:83%"><div style="overflow:hidden; white-space: nowrap;text-overflow:ellipsis;text-align:left;">' +
            e.textId +
            '</div><div style="overflow:hidden; white-space: nowrap;text-overflow:ellipsis;text-align:left;">' +
            e.textInNode +
            '</div></div><div style="clear:both;"></div></div>'
        );
    }),
    (OrgChart.searchUI.createSearchIcon = function (t) {
        return '<div data-id="search-icon" style="padding:5px; position:absolute;top:' + t + "px;left:" + t + 'px;border:1px solid transparent;"><div><div style="float:left;">' + OrgChart.icon.search(32, 32) + "</div></div></div>";
    }),
    void 0 === OrgChart && (OrgChart = {}),
    (OrgChart.server = function (t, e) {
        (this.config = t),
            (this.layoutConfigs = e),
            (this.visibleNodeIds = []),
            (this.viewBox = null),
            (this.action = null),
            (this.actionParams = null),
            (this.nodes = {}),
            (this.oldNodes = {}),
            (this.maxX = null),
            (this.maxY = null),
            (this.minX = null),
            (this.minY = null),
            (this.roots = null);
    }),
    (OrgChart.server.prototype.read = function (t, r, i, e, a, n, o, l) {
        var s = this;
        (this.viewBox = e), (this.action = a), (this.actionParams = n);
        var h = this.maxX,
            c = this.maxY,
            d = this.minX,
            g = this.minY,
            p = this.roots,
            f = this.nodes;
        if (t) {
            var u = OrgChart.server._getResponse(r, i, this.visibleNodeIds, this.config, h, c, d, g, this.viewBox, p, this.action, this.actionParams, f, this.oldNodes);
            a != OrgChart.action.exporting && ((this.maxX = h), (this.maxY = c), (this.minX = d), (this.minY = g), (this.roots = p), (this.nodes = f), (this.visibleNodeIds = u.visibleNodeIds)), o(u);
        } else
            (this.oldNodes = f || null),
                this._read(function (t) {
                    (h = t.maxX), (c = t.maxY), (d = t.minX), (g = t.minY), (p = t.roots), (f = t.nodes);
                    var e = OrgChart.server._getResponse(r, i, s.visibleNodeIds, s.config, h, c, d, g, s.viewBox, p, s.action, s.actionParams, f, s.oldNodes);
                    (e.notif = t.limit), a != OrgChart.action.exporting && ((s.maxX = h), (s.maxY = c), (s.minX = d), (s.minY = g), (s.roots = p), (s.nodes = f), (s.visibleNodeIds = e.visibleNodeIds)), o(e);
                }, l);
    }),
    (OrgChart.server.prototype._read = function (i, t) {
        var a = this,
            e = OrgChart.server._createNodes(this.config, this.layoutConfigs, this.action, this.actionParams, this.oldNodes);
        t(e);
        var n = e.nodes,
            o = e.roots,
            r = OrgChart.remote;
        null == r && (r = OrgChart.local),
            r._setPositions(
                o,
                this.layoutConfigs,
                function (t) {
                    OrgChart.server._doNotChangePositionOfClickedNodeIfAny(o, n, a.action, a.actionParams, a.oldNodes, a.config.orientation);
                    for (var e = { minX: null, minY: null, maxX: null, maxY: null }, r = 0; r < o.length; r++) OrgChart.server._setMinMaxXYIterate(o[r], e);
                    i({ minX: e.minX, minY: e.minY, maxX: e.maxX, maxY: e.maxY, nodes: n, roots: o, limit: t });
                },
                n
            );
    }),
    (OrgChart.server._setMinMaxXYIterate = function (t, e) {
        OrgChart._setMinMaxXY(t, e);
        for (var r = 0; r < t.stChildren.length; r++) OrgChart.server._setMinMaxXYIterate(t.stChildren[r], e);
        for (r = 0; r < t.children.length; r++) OrgChart.server._setMinMaxXYIterate(t.children[r], e);
    }),
    (OrgChart.server.prototype.find = function (t) {
        var r = this;
        if (null == t || null == t || "" == t) return [];
        t = OrgChart.accentFold(t);
        for (
            var e,
                i,
                a,
                n = function (t) {
                    for (var e in r.config.nodeBinding) if (r.config.nodeBinding[e] == t) return !0;
                    return !1;
                },
                o = [],
                l = [],
                s = 0;
            s < this.config.nodes.length;
            s++
        ) {
            var h = this.config.nodes[s];
            for (var c in h) {
                var d = h[c];
                (0 < this.config.searchFields.length && -1 == this.config.searchFields.indexOf(c)) ||
                    (d &&
                        -1 != OrgChart.accentFold(d).indexOf(t) &&
                        !OrgChart._fieldIsImg(this.config, c) &&
                        o.push({ id: h.id, propertyName: c, isId: c == OrgChart.ID, isNodeParam: n(c), weight: OrgChart.accentFold(d).indexOf(t), data: h }));
            }
        }
        o.sort(function (t, e) {
            return 1 == t.isId && 0 == e.isId ? -1 : 1 == e.isId && 0 == t.isId ? 1 : 1 == t.isNodeParam && 0 == e.isNodeParam ? -1 : 1 == e.isNodeParam && 0 == t.isNodeParam ? 1 : t.weight < e.weight ? -1 : t.weight > e.weight ? 1 : 0;
        });
        for (s = 0; s < o.length && s != OrgChart.SEARCH_RESULT_LIMIT; s++) {
            for (var g = !1, p = 0; p < l.length; p++)
                if (l[p].id == o[s].id) {
                    g = !0;
                    break;
                }
            if (!g) {
                var f = "",
                    u = "",
                    m = "",
                    C = "",
                    y = Object.getOwnPropertyNames(o[s].data);
                0 < this.config.searchFields.length && (y = this.config.searchFields);
                for (p = 0; p < y.length; p++) {
                    (c = y[p]), (d = o[s].data[c]);
                    c === o[s].propertyName &&
                        ((e = d),
                        (i = t),
                        void 0,
                        (a = OrgChart.accentFold(e).indexOf(i)),
                        (d = e
                            .toString()
                            .splice(a + i.length, 0, "</mark>")
                            .splice(a, 0, "<mark>"))),
                        c != OrgChart.TAGS &&
                            (c == OrgChart.ID
                                ? (u = u + d + ", ")
                                : OrgChart._fieldIsImg(this.config, c)
                                ? (C = d)
                                : n(c) && !OrgChart._fieldIsImg(this.config, c)
                                ? (f = f + d + ", ")
                                : OrgChart._fieldIsImg(this.config, c) || (m = m + d + ", "));
                }
                (u = u.slice(0, u.length - 2)), (f = f.slice(0, f.length - 2)), (m = m.slice(0, m.length - 2));
                var v = OrgChart._getTemplate(o[s].tags, this.config.tags, this.config.template);
                l.push({ id: o[s].id, node: new OrgChart.node(o[s], null, [], v), textId: u, textInNode: f, text: m, img: C });
            }
        }
        return l;
    }),
    void 0 === OrgChart && (OrgChart = {}),
    (OrgChart.server._initDinamicNode = function (t, e, r) {
        e && (t.lcn = e), r && (t.isAssistant = !0);
        var i = OrgChart.t(t.templateName);
        (t.w = i && i.size ? i.size[0] : 0), (t.h = i && i.size ? i.size[1] : 0), (t.isSplit = "split" == t.templateName);
    }),
    (OrgChart.server._initNode = function (t, e, r, i, a, n, o, l, s) {
        for (var h = n[r || "base"], c = 0; c < t.childrenIds.length; c++) {
            null == (d = e[t.childrenIds[c]]).collapsed && h.collapse && h.collapse.allChildren ? (d.collapsed = !0) : null == d.collapsed && (d.collapsed = !1),
                a == OrgChart.action.expand && -1 != s.ids.indexOf(d.id) && (d.collapsed = !1),
                a == OrgChart.action.collapse && -1 != s.ids.indexOf(d.id) && (d.collapsed = !0),
                a == OrgChart.action.expand && "all" == s.ids && (d.collapsed = !1),
                a == OrgChart.action.init ? (d.collapsed = h.collapse && i >= h.collapse.level - 1 && -1 == l.indexOf(d.id)) : a == OrgChart.action.centerNode && -1 != l.indexOf(d.id) && (d.collapsed = !1),
                d.collapsed || (d.parent = t).children.push(d);
        }
        if (
            (null == t.min && (t.min = !1),
            a == OrgChart.action.init && (t.min = OrgChart._getMin(t, o.tags)),
            t.min || a != OrgChart.action.minimize || s.id != t.id || (t.min = !0),
            !0 === t.min && a == OrgChart.action.maximize && s.id == t.id && (t.min = !1),
            !t.min)
        )
            for (c = 0; c < t.stChildrenIds.length; c++) {
                var d;
                ((d = e[t.stChildrenIds[c]]).stParent = t).stChildren.push(d);
            }
        var g = OrgChart.t(t.templateName, t.min);
        (t.w = g && g.size ? g.size[0] : 0), (t.h = g && g.size ? g.size[1] : 0), (t.padding = g && g.padding ? g.padding : [0, 0, 0, 0]), null != i && (t.level = i), r && (t.lcn = r);
        var p = OrgChart._getSubLevels(t.tags, o.tags);
        0 < p && (t.subLevels = p), -1 != t.tags.indexOf("assistant") && (t.isAssistant = !0);
    }),
    (OrgChart.server._iterate = function (t, e, r, i, a, n, o, l, s, h, c, d, g, p) {
        if (
            (OrgChart.server._initNode(e, r, s, i, d, h, c, g, p), e.isAssistant && (n[e.pid] || (n[e.pid] = []), n[e.pid].push(e.id)), 0 < e.subLevels && o.push(e.id), !e.isAssistant && 0 == e.childrenIds.length && e.parent && !l[e.pid])
        ) {
            for (var f = [], u = 0, m = 0; m < e.parent.children.length; m++) {
                var C = e.parent.children[m];
                C.isAssistant || 0 != C.childrenIds.length ? C.isAssistant && u++ : f.push(C.id);
            }
            OrgChart.MIXED_LAYOUT_ALL_NODES && 1 < f.length && f.length == e.parent.childrenIds.length - u ? (l[e.pid] = f) : !OrgChart.MIXED_LAYOUT_ALL_NODES && 1 < f.length && (l[e.pid] = f);
        }
        e.stChildren.length && (t.stContainerNodes || (t.stContainerNodes = []), t.stContainerNodes.push(e));
        for (var y = 0; y < e.stChildren.length; y++) {
            var v = "";
            for (m = 0; m < e.tags.length; m++)
                if (h[e.tags[m]]) {
                    v = e.tags[m];
                    break;
                }
            a.push(e.stChildren[y].id), OrgChart.server._iterate(t, e.stChildren[y], r, 0, a, n, o, l, v, h, c, d, g, p);
        }
        i++;
        for (y = 0; y < e.children.length; y++) OrgChart.server._iterate(t, e.children[y], r, i, a, n, o, l, s, h, c, d, g, p);
    }),
    (OrgChart.server._createNodes = function (a, t, e, r, i) {
        for (var n = a.nodes, o = {}, l = [], s = [], h = 0; h < n.length; h++) {
            var c = n[h],
                d = Array.isArray(c.tags) ? c.tags.slice(0) : [],
                g = OrgChart._getTemplate(d, a.tags, a.template),
                p = new OrgChart.node(c.id, c.pid, d, g);
            null != a.roots && -1 != a.roots.indexOf(p.id) && (p.pid = null), c.stpid && (p.stpid = c.stpid), null != a.orderBy && (p.order = OrgChart.server._getOrderFieldValue(c, a.orderBy)), (o[c.id] = p), l.push(c.id);
        }
        null != a.orderBy &&
            l.sort(function (t, e) {
                var r = o[t].order,
                    i = o[e].order;
                return "number" == typeof r || "number" == typeof i
                    ? (null == r && (r = -1), null == i && (i = -1), a.orderBy.desc ? i - r : r - i)
                    : "string" == typeof r || "string" == typeof i
                    ? (null == r && (r = ""), null == i && (i = ""), a.orderBy.desc ? i.localeCompare(r) : r.localeCompare(i))
                    : void 0;
            });
        for (h = 0; h < l.length; h++) {
            var f = l[h],
                p = o[f],
                u = i ? i[f] : null,
                m = o[p.stpid],
                C = o[p.pid];
            if ((m || (p.stpid = null), C || (p.pid = null), m)) {
                var y = i ? i[m.id] : null;
                y && (m.min = y.min), m.stChildrenIds.push(p.id);
            } else C ? (u && (p.collapsed = u.collapsed), C.childrenIds.push(p.id)) : s.push(p);
        }
        e == OrgChart.action.exporting && null != r.id && (p = o[r.id]) && ((p.pid = null), (s = [p]));
        var v = [];
        if (e == OrgChart.action.init && a.expand && a.expand.nodes)
            for (h = 0; h < a.expand.nodes.length; h++) for (p = o[a.expand.nodes[h]]; p; ) v.push(p.id), null == p.pid && null != p.stpid ? ((p = o[p.stpid]).min = !1) : (p = o[p.pid]);
        else if (e == OrgChart.action.centerNode) {
            for (var x = o[r.id]; x; ) {
                if ((v.push(x.id), r.options.parentState === OrgChart.COLLAPSE_PARENT_NEIGHBORS && x))
                    for (h = 0; h < x.childrenIds.length; h++) {
                        (V = o[x.childrenIds[h]]).collapsed = !0;
                    }
                null == x.pid && null != x.stpid ? ((x = o[x.stpid]).min = !1) : (x = o[x.pid]);
            }
            x = o[r.id];
            if (r.options.childrenState === OrgChart.COLLAPSE_SUB_CHILDRENS)
                for (h = 0; h < x.childrenIds.length; h++) {
                    var O = o[x.childrenIds[h]];
                    O.collapsed = !1;
                    for (var b = 0; b < O.childrenIds.length; b++) {
                        o[O.childrenIds[b]].collapsed = !0;
                    }
                }
        }
        var w = [],
            k = {},
            _ = [],
            S = {};
        for (h = 0; h < s.length; h++) OrgChart.server._iterate(s[h], s[h], o, 0, w, k, _, S, "", t, a, e, v, r);
        for (h = 0; h < _.length; h++)
            for (p = o[_[h]], b = 0; b < p.subLevels; b++) {
                var A = new OrgChart.node(p.id + "_sub_level_index_" + b, p.pid, [], "subLevel");
                if ((OrgChart.server._initDinamicNode(A, p.lcn), (C = p.parent))) {
                    var I = C.children.indexOf(p);
                    -1 < I && (C.children.splice(I, 1), C.children.splice(I, 0, A)), A.children.push(p), (A.parent = C), (p.parent = A), (o[A.id] = A);
                }
            }
        for (var M in k) {
            (C = o[M]), (A = new OrgChart.node(C.id + "_split_0", C.id, ["assistant"], "split"));
            OrgChart.server._initDinamicNode(A, C.lcn, !0), (o[A.id] = A);
            var L = [];
            for (b = C.children.length - 1; 0 <= b; b--) {
                (V = C.children[b]).isAssistant ? ((V.parent = null), C.children.splice(b, 1), L.splice(0, 0, V.id)) : ((V.parent = A).children.unshift(V), C.children.splice(b, 1));
            }
            if (L.length % 2) {
                var E = o[L[L.length - 1]],
                    N = new OrgChart.node(E.id + "_mirror", E.pid, [], "mirror");
                OrgChart.server._initDinamicNode(N, E.lcn, !0), (E._m = N.id), (N.isAssistant = !0), (N.w = E.w), (N.h = E.h), (o[N.id] = N), L.splice(L.length - 1, 0, N.id);
            }
            var T = 1;
            for (b = L.length - 1; 0 <= b; b--)
                if (b % 2 && b != L.length - 1) {
                    var B = new OrgChart.node(C.id + "_split_" + T, null, [], "split");
                    OrgChart.server._initDinamicNode(B, C.lcn, !0), (o[B.id] = B), L.splice(b, 0, B.id), T++;
                } else b % 2 && L.splice(b, 0, A.id);
            for (b = 0; b < L.length; b += 3) {
                var z = null;
                z = 0 == b ? C : o[L[b - 2]];
                var F = o[L[b]],
                    H = o[L[b + 1]],
                    U = o[L[b + 2]];
                (F.parent = z), (H.parent = z), (U.parent = z).children.push(F), z.children.push(H), z.children.push(U);
            }
        }
        var P = !1;
        for (var j in t) {
            if ((q = t[j]).layout == OrgChart.mixed) {
                P = !0;
                break;
            }
        }
        if (P)
            for (var M in S) {
                if ((q = t[(C = o[M]).lcn ? C.lcn : "base"]).layout == OrgChart.mixed) {
                    var D = S[M];
                    for (h = D.length - 1; 0 <= h; h--) {
                        if (((C = (V = o[D[h]]).parent), (V.layout = OrgChart.mixed), 0 < h)) {
                            for (b = C.children.length - 1; 0 <= b; b--) V.id == C.children[b].id && C.children.splice(b, 1);
                            var R = o[D[h - 1]];
                            (V.parent = R), (V.layout = OrgChart.mixed), R.children.push(V);
                        }
                    }
                }
            }
        var Y = !1;
        for (var j in t) {
            if ((q = t[j]).layout == OrgChart.tree || q.layout == OrgChart.treeRightOffset || q.layout == OrgChart.treeLeftOffset) {
                Y = !0;
                break;
            }
        }
        if (Y)
            for (var M in S) {
                var q;
                if ((q = t[(C = o[S[M][0]].parent).lcn ? C.lcn : "base"]).layout == OrgChart.tree || q.layout == OrgChart.treeRightOffset || q.layout == OrgChart.treeLeftOffset) {
                    A = new OrgChart.node(C.id + "_split_0", C.id, [], "split");
                    OrgChart.server._initDinamicNode(A, C.lcn), ((o[A.id] = A).layout = OrgChart.tree);
                    var X = [];
                    for (h = S[M].length - 1; 0 <= h; h--) {
                        var V = o[S[M][h]];
                        for (b = 0; b < C.children.length; b++) C.children[b].id == V.id && C.children.splice(b, 1);
                        if (((V.parent = null), (V.layout = OrgChart.tree), q.layout == OrgChart.treeRightOffset && X.splice(0, 0, V.id), q.layout == OrgChart.treeLeftOffset || q.layout == OrgChart.treeRightOffset)) {
                            var W = new OrgChart.node(V.id + "_mirror", null, [], "mirror");
                            OrgChart.server._initDinamicNode(W, V.lcn), (W.layout = OrgChart.tree), (o[W.id] = W), X.splice(0, 0, W.id);
                        }
                        q.layout != OrgChart.treeRightOffset && X.splice(0, 0, V.id);
                    }
                    for (T = 1, b = X.length - 1; 0 <= b; b--)
                        if (b % 2 && b != X.length - 1) {
                            B = new OrgChart.node(C.id + "_split_" + T, null, [], "split");
                            OrgChart.server._initDinamicNode(B, C.lcn), (B.layout = OrgChart.tree), (o[B.id] = B), X.splice(b, 0, B.id), T++;
                        } else b % 2 && X.splice(b, 0, A.id);
                    for (b = 0; b < X.length; b += 3) {
                        z = null;
                        0 == b && (z = C);
                        (F = o[X[b]]), (H = o[X[b + 1]]), (U = o[X[b + 2]]);
                        0 != b && (z = o[X[b - 3]]),
                            0 == b || H || (z = o[X[b - 2]]),
                            (F.parent = z).children.push(F),
                            H && (0 != b && (z = o[X[b - 2]]), (H.parent = z).children.push(H)),
                            U && (0 != b && (z = o[X[b - 1]]), (U.parent = z).children.push(U));
                    }
                }
            }
        return { nodes: o, roots: s };
    }),
    (OrgChart.server._getOrderFieldValue = function (t, e) {
        var r = e;
        return e.field && (r = e.field), t[r];
    }),
    (OrgChart.server._getNodeWidth = function (t, e) {
        switch (e.orientation) {
            case OrgChart.orientation.top:
            case OrgChart.orientation.top_left:
            case OrgChart.orientation.bottom:
            case OrgChart.orientation.bottom_left:
                return t.w;
            case OrgChart.orientation.right:
            case OrgChart.orientation.right_top:
            case OrgChart.orientation.left:
            case OrgChart.orientation.left_top:
                return t.h;
        }
        return 0;
    }),
    (OrgChart.server._isVisible = function (t, e, r, i) {
        if (null != t.x && null != t.y) {
            if (e.lazyLoading && i !== OrgChart.action.exporting) {
                function a(t, e) {
                    var r = t.x,
                        i = t.y,
                        a = t.w,
                        n = t.h,
                        o = e[0] - OrgChart.LAZY_LOADING_FACTOR,
                        l = e[2] + OrgChart.LAZY_LOADING_FACTOR + e[0],
                        s = e[1] - OrgChart.LAZY_LOADING_FACTOR,
                        h = e[3] + OrgChart.LAZY_LOADING_FACTOR + e[1],
                        c = o < r + a && r < l;
                    return c && (c = s < i + n && i < h), c;
                }
                if (a(t, r)) return !0;
                for (var n = 0; n < t.children.length; n++) if (a(t.children[n], r)) return !0;
                return !1;
            }
            return !0;
        }
    }),
    (OrgChart.server.getAllFields = function (t) {
        var e = [OrgChart.TAGS];
        for (var r in t.nodeBinding) e.push(t.nodeBinding[r]);
        for (r = 0; r < t.nodes.length; r++)
            for (var i in t.nodes[r]) i !== OrgChart.ID && i !== OrgChart.TAGS && i !== OrgChart.NODES && i !== OrgChart.PID && i !== OrgChart.STPID && (t.nodeBinding[i] || OrgChart._arrayContains(e, i) || e.push(i));
        return e;
    }),
    (OrgChart.server._doNotChangePositionOfClickedNodeIfAny = function (t, e, r, i, a, n) {
        if (r == OrgChart.action.expand || r == OrgChart.action.collapse || r == OrgChart.action.minimize || r == OrgChart.action.maximize || r == OrgChart.action.centerNode || r == OrgChart.action.update || r == OrgChart.action.insert) {
            if (r == OrgChart.action.update && (!i || null == i.id)) {
                if (!t || !t.length) return;
                i = { id: t[0].id };
            }
            if (null != i.id) {
                var o = i.id;
                ((r == OrgChart.action.minimize && e[o].parent) || (r == OrgChart.action.maximize && e[o].parent)) && (o = e[o].pid);
                var l = e[o],
                    s = a[o];
                if (s) {
                    var h = (s.x ? s.x : 0) - l.x,
                        c = (s.y ? s.y : 0) - l.y;
                    for (var o in e)
                        switch (n) {
                            case OrgChart.orientation.top:
                            case OrgChart.orientation.top_left:
                            case OrgChart.orientation.bottom:
                            case OrgChart.orientation.bottom_left:
                                e[o].x += h;
                                break;
                            case OrgChart.orientation.right:
                            case OrgChart.orientation.right_top:
                            case OrgChart.orientation.left:
                            case OrgChart.orientation.left_top:
                                e[o].y += c;
                        }
                }
            }
        }
    }),
    (OrgChart.server._getMostDeepChild = function (t) {
        if (t) {
            var i = t;
            return (
                (function t(e) {
                    e.level > i.level && (i = e);
                    for (var r = 0; r < e.children.length; r++) t(e.children[r]);
                })(t),
                i
            );
        }
    }),
    (OrgChart.server._getResponse = function (t, e, r, i, a, n, o, l, s, h, c, d, g, p) {
        var f = h[0],
            u = [],
            m = { top: null, left: null, bottom: null, right: null, minX: null, maxX: null, minY: null, maxY: null },
            C = [[], [], []],
            y = a - o + 2 * i.padding,
            v = n - l + 2 * i.padding,
            x = OrgChart.getScale(s, t, e, i.scaleInitial, i.scaleMax, i.scaleMin, y, v);
        if (((m.top = l - i.padding), (m.left = o - i.padding), (m.bottom = n + i.padding - e / x), (m.right = a + i.padding - t / x), (m.maxX = a), (m.minX = o), (m.maxY = n), (m.minY = l), null == s && i.align == OrgChart.CENTER)) {
            var O = Math.ceil(t / x),
                b = Math.ceil(e / x),
                w = 0,
                k = 0;
            if (O - 2 * i.padding >= a - o)
                switch (((w = (a + o) / 2 - O / 2), i.orientation)) {
                    case OrgChart.orientation.right:
                    case OrgChart.orientation.right_top:
                        w = (o - a) / 2 - O / 2;
                }
            else
                switch (((w = f.x - O / 2 + OrgChart.server._getNodeWidth(f, i) / 2), i.orientation)) {
                    case OrgChart.orientation.right:
                    case OrgChart.orientation.right_top:
                        (w = -(O / 2 - (o - a) / 2)) < i.padding - O && (w = i.padding - O);
                        break;
                    case OrgChart.orientation.left:
                    case OrgChart.orientation.bottom_left:
                    case OrgChart.orientation.top_left:
                    case OrgChart.orientation.left_top:
                        (w = -(O / 2 - (a - o) / 2)) > -i.padding && (w = -i.padding);
                }
            if (b - 2 * i.padding >= n - l)
                switch (((k = (n + l) / 2 - b / 2), i.orientation)) {
                    case OrgChart.orientation.bottom:
                    case OrgChart.orientation.bottom_left:
                        k = (l - n) / 2 - b / 2;
                }
            else
                switch (((k = -(b / 2 - (n - l) / 2)) > -i.padding && (k = -i.padding), i.orientation)) {
                    case OrgChart.orientation.bottom:
                    case OrgChart.orientation.bottom_left:
                        (k = -(b / 2 - (l - n) / 2)) < i.padding - b && (k = i.padding - b);
                        break;
                    case OrgChart.orientation.left:
                    case OrgChart.orientation.right:
                        k = f.y - b / 2 + OrgChart.server._getNodeWidth(f, i) / 2;
                }
            s = [w, k, O, b];
        } else if (null == s && i.align == OrgChart.ORIENTATION) {
            (O = Math.ceil(t / x)), (b = Math.ceil(e / x)), (w = 0), (k = 0);
            switch (i.orientation) {
                case OrgChart.orientation.top:
                    (w = f.x - O / 2 + OrgChart.server._getNodeWidth(f, i) / 2), (k = -i.padding);
                    break;
                case OrgChart.orientation.bottom:
                    (w = f.x - O / 2 + OrgChart.server._getNodeWidth(f, i) / 2), (k = i.padding - b);
                    break;
                case OrgChart.orientation.left:
                    (w = -i.padding), (k = f.y - b / 2 + OrgChart.server._getNodeWidth(f, i) / 2);
                    break;
                case OrgChart.orientation.right:
                    (w = i.padding - O), (k = f.y - b / 2 + OrgChart.server._getNodeWidth(f, i) / 2);
                    break;
                case OrgChart.orientation.top_left:
                    (w = -i.padding), (k = -i.padding);
                    break;
                case OrgChart.orientation.right_top:
                    (w = i.padding - O), (k = -i.padding);
                    break;
                case OrgChart.orientation.left_top:
                    (w = -i.padding), (k = -i.padding);
                    break;
                case OrgChart.orientation.bottom_left:
                    (w = -i.padding), (k = i.padding - b);
            }
            s = [w, k, O, b];
        }
        if (c == OrgChart.action.centerNode || c == OrgChart.action.maximize) {
            var _ = g[d.id];
            1 == d.options.horizontal && (s[0] = _.x + _.w / 2 - s[2] / 2),
                1 == d.options.vertical && (s[1] = _.y + _.h / 2 - s[3] / 2),
                i.sticky &&
                    (s[0] < m.left && s[0] < m.right && (s[0] = m.left > m.right ? m.right : m.left),
                    s[0] > m.right && s[0] > m.left && (s[0] = m.left > m.right ? m.left : m.right),
                    s[1] < m.top && s[1] < m.bottom && (s[1] = m.top > m.bottom ? m.bottom : m.top),
                    s[1] > m.bottom && s[1] > m.top && (s[1] = m.top > m.bottom ? m.top : m.bottom));
        }
        if (c == OrgChart.action.insert || c == OrgChart.action.expand || c == OrgChart.action.collapse || c == OrgChart.action.update || c == OrgChart.action.centerNode || c == OrgChart.action.maximize) {
            var S = null;
            if (c == OrgChart.action.insert && d && null != d.insertedNodeId && null != d.insertedNodeId) S = g[d.insertedNodeId];
            else if (c == OrgChart.action.update && d && null != d.visId && null != d.visId) S = g[d.visId];
            else if ((c != OrgChart.action.expand && c != OrgChart.action.collapse && c != OrgChart.action.maximize) || !d || null == d.id || null == d.id) {
                if (c == OrgChart.action.centerNode || c == OrgChart.action.maximize) {
                    switch (i.orientation) {
                        case OrgChart.orientation.top:
                        case OrgChart.orientation.top_left:
                        case OrgChart.orientation.bottom:
                        case OrgChart.orientation.bottom_left:
                            d.options.vertical || (S = g[d.id]);
                            break;
                        case OrgChart.orientation.right:
                        case OrgChart.orientation.right_top:
                        case OrgChart.orientation.left:
                        case OrgChart.orientation.left_top:
                            d.options.horizontal || (S = g[d.id]);
                    }
                    S && (S = OrgChart.server._getMostDeepChild(S, g));
                }
            } else (S = g[d.id]), (S = OrgChart.server._getMostDeepChild(S, g));
            if (S)
                switch (i.orientation) {
                    case OrgChart.orientation.top:
                    case OrgChart.orientation.top_left:
                        var A = S.y + S.h - s[3] + i.padding;
                        s[1] < A && (s[1] = A);
                        break;
                    case OrgChart.orientation.bottom:
                    case OrgChart.orientation.bottom_left:
                        A = S.y - i.padding;
                        s[1] > A && (s[1] = A);
                        break;
                    case OrgChart.orientation.right:
                    case OrgChart.orientation.right_top:
                        A = S.x - i.padding;
                        s[0] > A && (s[0] = A);
                        break;
                    case OrgChart.orientation.left:
                    case OrgChart.orientation.left_top:
                        A = S.x + S.w - s[2] + i.padding;
                        s[0] < A && (s[0] = A);
                }
        }
        for (var I = 0; I < h.length; I++) OrgChart.server._iterate2(h[I], g, i, s, c, d, u, p, r, C);
        return { animations: C, boundary: m, viewBox: s, visibleNodeIds: u, nodes: g, allFields: OrgChart.server.getAllFields(i) };
    }),
    (OrgChart.server._iterate2 = function (t, e, r, i, a, n, o, l, s, h) {
        if (OrgChart.server._isVisible(t, r, i, a)) {
            o.push(t.id);
            var c = null;
            if ((a == OrgChart.action.expand || a == OrgChart.action.collapse || a == OrgChart.action.maximize) && l && l[t.id] && "expandCollapseToLevel" == n.method) {
                if (((c = { x: (u = l[t.id]).x, y: u.y }), u)) {
                    c = { x: u.x, y: u.y };
                    for (var d = t, g = null; null != d; ) l[d.id] && l[d.id].collapsed && (g = d), (d = d.parent);
                    g && g.parent && (c = { x: g.parent.x, y: g.parent.y });
                }
                if ((p = e[n.id])) {
                    for (d = t.parent; null != d; ) d = d.parent;
                    d && (c = { x: p.x + p.w / 2 - t.w / 2, y: p.y + p.h / 2 - t.h / 2 });
                }
            } else if ((a == OrgChart.action.expand || a == OrgChart.action.collapse) && l && l[t.id]) {
                var p;
                if (((c = { x: (u = l[t.id]).x, y: u.y }), "all" == n.ids && u)) {
                    c = { x: u.x, y: u.y };
                    for (d = t, g = null; null != d; ) l[d.id] && l[d.id].collapsed && (g = d), (d = d.parent);
                    g && g.parent && (c = { x: g.parent.x, y: g.parent.y });
                }
                if ((p = e[n.id])) {
                    for (d = t.parent; null != d && -1 == n.ids.indexOf(t.id) && -1 == n.ids.indexOf(d.id); ) d = d.parent;
                    d && (c = { x: p.x + p.w / 2 - t.w / 2, y: p.y + p.h / 2 - t.h / 2 });
                }
            } else if (a == OrgChart.action.centerNode && l && l[t.id]) {
                if ((null != (u = l[t.id]).x && null != u.y && (c = { x: u.x, y: u.y }), (f = e[n.id]) && f == t)) (d = t.parent) && d.id == n.id && (c = { x: f.x + f.w / 2 - t.w / 2, y: f.y + f.h / 2 - t.h / 2 });
            } else if (a == OrgChart.action.maximize && l && l[t.id]) {
                var f;
                if ((null != (u = l[t.id]).x && null != u.y && (c = { x: u.x, y: u.y }), (f = e[n.id]) && f == t)) (d = t.parent) && d.id == n.id && (c = { x: f.x + f.w / 2 - t.w / 2, y: f.y + f.h / 2 - t.h / 2 });
            } else if (a == OrgChart.action.minimize && l && l[t.id]) {
                c = { x: (u = l[t.id]).x, y: u.y };
            } else if (a == OrgChart.action.insert && n && n.insertedNodeId == t.id && t.parent) c = { x: t.parent.x, y: t.parent.y };
            else if ((a == OrgChart.action.update || a == OrgChart.action.insert) && l && l[t.id]) {
                var u;
                c = { x: (u = l[t.id]).x, y: u.y };
            } else a !== OrgChart.action.exporting && -1 == s.indexOf(t.id) && (h[0].push(t.id), h[1].push({ opacity: 0 }), h[2].push({ opacity: 1 }));
            null != c && null != c.x && null != c.y && ((c.x == t.x && c.y == t.y) || (h[0].push(t.id), h[1].push({ transform: [1, 0, 0, 1, c.x, c.y] }), h[2].push({ transform: [1, 0, 0, 1, t.x, t.y] })));
        }
        for (var m = 0; m < t.stChildren.length; m++) OrgChart.server._iterate2(t.stChildren[m], e, r, i, a, n, o, l, s, h);
        for (m = 0; m < t.children.length; m++) OrgChart.server._iterate2(t.children[m], e, r, i, a, n, o, l, s, h);
    }),
    void 0 === OrgChart && (OrgChart = {}),
    (OrgChart.templates = {}),
    (OrgChart.templates.base = {
        defs: "",
        size: [250, 120],
        expandCollapseSize: 30,
        linkAdjuster: { fromX: 0, fromY: 0, toX: 0, toY: 0 },
        ripple: { radius: 0, color: "#e6e6e6", rect: null },
        assistanseLink: '<path stroke-linejoin="round" stroke="#aeaeae" stroke-width="2px" fill="none" d="M{xa},{ya} {xb},{yb} {xc},{yc} {xd},{yd} L{xe},{ye}"/>',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display:block;" width="{w}" height="{h}" viewBox="{viewBox}">{content}</svg>',
        link: '<path stroke-linejoin="round" stroke="#aeaeae" stroke-width="1px" fill="none" d="M{xa},{ya} {xb},{yb} {xc},{yc} L{xd},{yd}"/>',
        pointer:
            '<g data-pointer="pointer" transform="matrix(0,0,0,0,100,100)"><radialGradient id="pointerGradient"><stop stop-color="#ffffff" offset="0" /><stop stop-color="#C1C1C1" offset="1" /></radialGradient><circle cx="16" cy="16" r="16" stroke-width="1" stroke="#acacac" fill="url(#pointerGradient)"></circle></g>',
        node: '<rect x="0" y="0" height="120" width="250" fill="none" stroke-width="1" stroke="#aeaeae"></rect>',
        plus:
            '<circle cx="15" cy="15" r="15" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle><line x1="4" y1="15" x2="26" y2="15" stroke-width="1" stroke="#aeaeae"></line><line x1="15" y1="4" x2="15" y2="26" stroke-width="1" stroke="#aeaeae"></line>',
        minus: '<circle cx="15" cy="15" r="15" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle><line x1="4" y1="15" x2="26" y2="15" stroke-width="1" stroke="#aeaeae"></line>',
        nodeMenuButton:
            '<g style="cursor:pointer;" transform="matrix(1,0,0,1,225,105)" control-node-menu-id="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#ffffff"></circle><circle cx="7" cy="0" r="2" fill="#ffffff"></circle><circle cx="14" cy="0" r="2" fill="#ffffff"></circle></g>',
        exportMenuButton:
            '<div style="position:absolute;right:{p}px;top:{p}px; width:40px;height:50px;cursor:pointer;" control-export-menu=""><hr style="background-color: #7A7A7A; height: 3px; border: none;"><hr style="background-color: #7A7A7A; height: 3px; border: none;"><hr style="background-color: #7A7A7A; height: 3px; border: none;"></div>',
        img_0: '<clipPath id="{randId}"><circle cx="60" cy="60" r="40"></circle></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="20" y="20"  width="80" height="80"></image>',
        link_field_0: '<text text-anchor="middle" fill="#aeaeae" width="290" x="0" y="0" style="font-size:10px;">{val}</text>',
    }),
    (OrgChart.templates.ana = {
        defs: "",
        size: [250, 120],
        linkAdjuster: { fromX: 0, fromY: 0, toX: 0, toY: 0 },
        ripple: { radius: 0, color: "#e6e6e6", rect: null },
        expandCollapseSize: 30,
        svg: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"  style="display:block;" width="{w}" height="{h}" viewBox="{viewBox}">{content}</svg>',
        link: '<path stroke-linejoin="round" stroke="#aeaeae" stroke-width="1px" fill="none" d="M{xa},{ya} {xb},{yb} {xc},{yc} L{xd},{yd}" />',
        assistanseLink: '<path stroke-linejoin="round" stroke="#aeaeae" stroke-width="2px" fill="none" d="M{xa},{ya} {xb},{yb} {xc},{yc} {xd},{yd} L{xe},{ye}"/>',
        pointer:
            '<g data-pointer="pointer" transform="matrix(0,0,0,0,100,100)"><radialGradient id="pointerGradient"><stop stop-color="#ffffff" offset="0" /><stop stop-color="#C1C1C1" offset="1" /></radialGradient><circle cx="16" cy="16" r="16" stroke-width="1" stroke="#acacac" fill="url(#pointerGradient)"></circle></g>',
        node: '<rect x="0" y="0" height="{h}" width="{w}" fill="#039BE5" stroke-width="1" stroke="#aeaeae" rx="5" ry="5"></rect>',
        plus:
            '<circle cx="15" cy="15" r="15" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle><line x1="4" y1="15" x2="26" y2="15" stroke-width="1" stroke="#aeaeae"></line><line x1="15" y1="4" x2="15" y2="26" stroke-width="1" stroke="#aeaeae"></line>',
        minus: '<circle cx="15" cy="15" r="15" fill="#ffffff" stroke="#aeaeae" stroke-width="1"></circle><line x1="4" y1="15" x2="26" y2="15" stroke-width="1" stroke="#aeaeae"></line>',
        nodeMenuButton:
            '<g style="cursor:pointer;" transform="matrix(1,0,0,1,225,105)" control-node-menu-id="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#ffffff"></circle><circle cx="7" cy="0" r="2" fill="#ffffff"></circle><circle cx="14" cy="0" r="2" fill="#ffffff"></circle></g>',
        exportMenuButton:
            '<div style="position:absolute;right:{p}px;top:{p}px; width:40px;height:50px;cursor:pointer;" control-export-menu=""><hr style="background-color: #7A7A7A; height: 3px; border: none;"><hr style="background-color: #7A7A7A; height: 3px; border: none;"><hr style="background-color: #7A7A7A; height: 3px; border: none;"></div>',
        img_0: '<clipPath id="{randId}"><circle cx="50" cy="30" r="40"></circle></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="10" y="-10"  width="80" height="80"></image>',
        link_field_0: '<text text-anchor="middle" fill="#aeaeae" width="290" x="0" y="0" style="font-size:10px;">{val}</text>',
        field_0: '<text width="230" style="font-size: 18px;" fill="#ffffff" x="125" y="95" text-anchor="middle">{val}</text>',
        field_1: '<text width="130" text-overflow="multiline" style="font-size: 14px;" fill="#ffffff" x="230" y="30" text-anchor="end">{val}</text>',
        padding: [50, 20, 35, 20],
    }),
    (OrgChart.templates.split = Object.assign({}, OrgChart.templates.ana)),
    (OrgChart.templates.split.size = [10, 10]),
    (OrgChart.templates.split.node = '<circle cx="5" cy="5" r="5" fill="none" stroke-width="1" stroke="#aeaeae"></circle>'),
    (OrgChart.templates.group = Object.assign({}, OrgChart.templates.ana)),
    (OrgChart.templates.group.size = [250, 120]),
    (OrgChart.templates.group.node = '<rect rx="50" ry="50" x="0" y="0" height="{h}" width="{w}" fill="#f2f2f2" stroke-width="0"></rect>'),
    (OrgChart.templates.group.link = '<path stroke="#aeaeae" stroke-width="1px" fill="none" d="M{xa},{ya} C{xb},{yb} {xc},{yc} {xd},{yd}"/>'),
    (OrgChart.templates.group.nodeMenuButton =
        '<g style="cursor:pointer;" transform="matrix(1,0,0,1,{ew},25)" control-node-menu-id="{id}"><g transform="matrix(1,0,0,1,-22,-8)"><rect x="0" y="0" fill="red" fill-opacity="0" width="18" height="22"></rect><line x1="0" y1="2" x2="9" y2="2" stroke="#aeaeae" stroke-width="1"></line><line x1="0" y1="9" x2="18" y2="9" stroke="#aeaeae" stroke-width="1"></line><line x1="0" y1="16" x2="22" y2="16" stroke="#aeaeae" stroke-width="1"></line></g></g>'),
    (OrgChart.templates.group.field_0 = '<text width="230" style="font-size: 18px;" fill="#aeaeae" x="{cw}" y="30" text-anchor="middle">{val}</text>'),
    (OrgChart.templates.group.field_1 = ""),
    (OrgChart.templates.group.ripple = { radius: 50, color: "#aeaeae" }),
    (OrgChart.templates.invisibleGroup = Object.assign({}, OrgChart.templates.group)),
    (OrgChart.templates.invisibleGroup.node = ""),
    (OrgChart.templates.invisibleGroup.padding = [0, 0, 0, 0]),
    (OrgChart.templates.invisibleGroup.field_0 = ""),
    (OrgChart.templates.invisibleGroup.nodeMenuButton = ""),
    (OrgChart.templates.mirror = { linkAdjuster: {}, link: "", node: "", nodeMenuButton: "", size: [0, 0] }),
    (OrgChart.templates.ula = Object.assign({}, OrgChart.templates.ana)),
    (OrgChart.templates.ula.field_0 = '<text width="145" style="font-size: 18px;" fill="#039BE5" x="100" y="55">{val}</text>'),
    (OrgChart.templates.ula.field_1 = '<text width="145" text-overflow="multiline" style="font-size: 14px;" fill="#afafaf" x="100" y="76">{val}</text>'),
    (OrgChart.templates.ula.node = '<rect x="0" y="0" height="{h}" width="{w}" fill="#ffffff" stroke-width="1" stroke="#aeaeae"></rect><line x1="0" y1="0" x2="250" y2="0" stroke-width="2" stroke="#039BE5"></line>'),
    (OrgChart.templates.ula.img_0 =
        '<clipPath id="{randId}"><circle cx="50" cy="60" r="40"></circle></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="10" y="20" width="80" height="80" ></image>'),
    (OrgChart.templates.ula.menu =
        '<g style="cursor:pointer;" transform="matrix(1,0,0,1,225,12)" control-node-menu-id="{id}"><rect x="-4" y="-10" fill="#ffffff" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#039BE5"></circle><circle cx="7" cy="0" r="2" fill="#039BE5"></circle><circle cx="14" cy="0" r="2" fill="#039BE5"></circle></g>'),
    (OrgChart.templates.ula.nodeMenuButton =
        '<g style="cursor:pointer;" transform="matrix(1,0,0,1,225,105)" control-node-menu-id="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#AEAEAE"></circle><circle cx="7" cy="0" r="2" fill="#AEAEAE"></circle><circle cx="14" cy="0" r="2" fill="#AEAEAE"></circle></g>'),
    (OrgChart.templates.olivia = Object.assign({}, OrgChart.templates.ana)),
    (OrgChart.templates.olivia.field_0 = '<text width="145" style="font-size: 18px;" fill="#757575" x="100" y="55">{val}</text>'),
    (OrgChart.templates.olivia.field_1 = '<text width="145" style="font-size: 14px;" fill="#757575" x="100" y="76">{val}</text>'),
    (OrgChart.templates.olivia.defs =
        '<linearGradient id="{randId}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#FDFDFD;stop-opacity:1" /><stop offset="100%" style="stop-color:#C0C0C0;stop-opacity:1" /></linearGradient>'),
    (OrgChart.templates.olivia.node = '<rect fill="url(#{randId})" x="0" y="0" height="{h}" width="{w}" stroke-width="1" stroke="#aeaeae" rx="5" ry="5"></rect>'),
    (OrgChart.templates.olivia.img_0 =
        '<clipPath id="{randId}"><circle cx="50" cy="60" r="40"></circle></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="10" y="20" width="80" height="80" ></image>'),
    (OrgChart.templates.belinda = Object.assign({}, OrgChart.templates.ana)),
    (OrgChart.templates.belinda.size = [180, 180]),
    (OrgChart.templates.belinda.ripple = { radius: 90, color: "#e6e6e6", rect: null }),
    (OrgChart.templates.belinda.node = '<circle cx="90" cy="90" r="90" fill="#039BE5" stroke-width="1" stroke="#aeaeae"></circle>'),
    (OrgChart.templates.belinda.img_0 =
        '<clipPath id="{randId}"><circle cx="90" cy="45" r="40"></circle></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="50" y="5" width="80" height="80" ></image>'),
    (OrgChart.templates.belinda.field_0 = '<text width="170" style="font-size: 18px;" text-anchor="middle" fill="#ffffff"  x="90" y="105">{val}</text>'),
    (OrgChart.templates.belinda.field_1 = '<text width="160" style="font-size: 14px;" text-anchor="middle" fill="#ffffff"  x="90" y="125">{val}</text>'),
    (OrgChart.templates.belinda.link = '<path stroke="#aeaeae" stroke-width="1px" fill="none" d="M{xa},{ya} C{xb},{yb} {xc},{yc} {xd},{yd}"/>'),
    (OrgChart.templates.belinda.nodeMenuButton =
        '<g style="cursor:pointer;" transform="matrix(1,0,0,1,79,5)" control-node-menu-id="{id}"><rect x="0" y="0" fill="#000000" fill-opacity="0" width="22" height="22"></rect><line stroke-width="2" stroke="#000" x1="0" y1="3" x2="22" y2="3"></line><line stroke-width="2" stroke="#000" x1="0" y1="9" x2="22" y2="9"></line><line stroke-width="2" stroke="#000" x1="0" y1="15" x2="22" y2="15"></line></g>'),
    (OrgChart.templates.rony = Object.assign({}, OrgChart.templates.ana)),
    (OrgChart.templates.rony.svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="background-color:#E8E8E8;display:block;" width="{w}" height="{h}" viewBox="{viewBox}">{content}</svg>'),
    (OrgChart.templates.rony.defs =
        '<filter id="{randId}" x="0" y="0" width="200%" height="200%"><feOffset result="offOut" in="SourceAlpha" dx="5" dy="5"></feOffset><feGaussianBlur result="blurOut" in="offOut" stdDeviation="5"></feGaussianBlur><feBlend in="SourceGraphic" in2="blurOut" mode="normal"></feBlend></filter>'),
    (OrgChart.templates.rony.size = [180, 250]),
    (OrgChart.templates.rony.ripple = { color: "#F57C00", radius: 5, rect: null }),
    (OrgChart.templates.rony.img_0 =
        '<clipPath id="{randId}"><circle cx="90" cy="160" r="60"></circle></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="30" y="100"  width="120" height="120"></image>'),
    (OrgChart.templates.rony.node = '<rect filter="url(#{randId})" x="0" y="0" height="250" width="180" fill="#ffffff" stroke-width="0" rx="5" ry="5"></rect>'),
    (OrgChart.templates.rony.field_0 = '<text width="165" style="font-size: 18px;" fill="#039BE5" x="90" y="40" text-anchor="middle">{val}</text>'),
    (OrgChart.templates.rony.field_1 = '<text width="165" style="font-size: 14px;" fill="#F57C00" x="90" y="60" text-anchor="middle">{val}</text>'),
    (OrgChart.templates.rony.field_2 = '<text width="165" style="font-size: 14px;" fill="#FFCA28" x="90" y="80" text-anchor="middle">{val}</text>'),
    (OrgChart.templates.rony.link = '<path stroke="#039BE5" stroke-width="1px" fill="none" d="M{xa},{ya} {xb},{yb} {xc},{yc} L{xd},{yd}"/>'),
    (OrgChart.templates.rony.plus =
        '<circle cx="15" cy="15" r="15" fill="#ffffff" stroke="#039BE5" stroke-width="1"></circle><line x1="4" y1="15" x2="26" y2="15" stroke-width="1" stroke="#039BE5"></line><line x1="15" y1="4" x2="15" y2="26" stroke-width="1" stroke="#039BE5"></line>'),
    (OrgChart.templates.rony.minus = '<circle cx="15" cy="15" r="15" fill="#ffffff" stroke="#039BE5" stroke-width="1"></circle><line x1="4" y1="15" x2="26" y2="15" stroke-width="1" stroke="#039BE5"></line>'),
    (OrgChart.templates.rony.nodeMenuButton =
        '<g style="cursor:pointer;" transform="matrix(1,0,0,1,155,235)" control-node-menu-id="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#F57C00"></circle><circle cx="7" cy="0" r="2" fill="#F57C00"></circle><circle cx="14" cy="0" r="2" fill="#F57C00"></circle></g>'),
    (OrgChart.templates.mery = Object.assign({}, OrgChart.templates.ana)),
    (OrgChart.templates.mery.ripple = { color: "#e6e6e6", radius: 50, rect: null }),
    (OrgChart.templates.mery.node = '<rect x="0" y="0" height="120" width="250" fill="#ffffff" stroke-width="1" stroke="#686868" rx="50" ry="50"></rect><rect x="0" y="45" height="30" width="250" fill="#039BE5" stroke-width="1"></rect>'),
    (OrgChart.templates.mery.link = '<path stroke="#aeaeae" stroke-width="1px" fill="none" d="M{xa},{ya} C{xb},{yb} {xc},{yc} {xd},{yd}" />'),
    (OrgChart.templates.mery.img_0 =
        '<clipPath id="{randId}"><circle cx="125" cy="60" r="24"></circle></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="95" y="33"  width="60" height="60"></image>'),
    (OrgChart.templates.mery.field_0 = '<text width="220" style="font-size: 18px;" fill="#039BE5" x="125" y="30" text-anchor="middle">{val}</text>'),
    (OrgChart.templates.mery.field_1 = '<text width="220" style="font-size: 14px;" fill="#039BE5" x="125" y="100" text-anchor="middle">{val}</text>'),
    (OrgChart.templates.mery.nodeMenuButton =
        '<g style="cursor:pointer;" transform="matrix(1,0,0,1,225,60)" control-node-menu-id="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#ffffff"></circle><circle cx="7" cy="0" r="2" fill="#ffffff"></circle><circle cx="14" cy="0" r="2" fill="#ffffff"></circle></g>'),
    (OrgChart.templates.polina = Object.assign({}, OrgChart.templates.ana)),
    (OrgChart.templates.polina.size = [300, 80]),
    (OrgChart.templates.polina.ripple = { color: "#e6e6e6", radius: 40, rect: null }),
    (OrgChart.templates.polina.node = '<rect x="0" y="0" height="80" width="300" fill="#039BE5" stroke-width="1" stroke="#686868" rx="40" ry="40"></rect>'),
    (OrgChart.templates.polina.img_0 =
        '<clipPath id="{randId}"><circle  cx="40" cy="40" r="35"></circle></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="0" y="0"  width="80" height="80"></image>'),
    (OrgChart.templates.polina.field_0 = '<text width="210" style="font-size: 18px;" fill="#ffffff" x="80" y="30" text-anchor="start">{val}</text>'),
    (OrgChart.templates.polina.field_1 = '<text width="210" style="font-size: 14px;" fill="#ffffff" x="80" y="55" text-anchor="start">{val}</text>'),
    (OrgChart.templates.polina.link = '<path stroke="#686868" stroke-width="1px" fill="none" d="M{xa},{ya} C{xb},{yb} {xc},{yc} {xd},{yd}" />'),
    (OrgChart.templates.polina.nodeMenuButton =
        '<g style="cursor:pointer;" transform="matrix(1,0,0,1,285,33)" control-node-menu-id="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#ffffff"></circle><circle cx="0" cy="7" r="2" fill="#ffffff"></circle><circle cx="0" cy="14" r="2" fill="#ffffff"></circle></g>'),
    (OrgChart.templates.mila = Object.assign({}, OrgChart.templates.ana)),
    (OrgChart.templates.mila.node =
        '<rect x="0" y="0" height="120" width="250" fill="#039BE5" stroke-width="1" stroke="#aeaeae"></rect><rect x="-5" y="70" height="30" width="260" fill="#ffffff" stroke-width="1" stroke="#039BE5"></rect><line x1="-5" x2="0" y1="100" y2="105" stroke-width="1" stroke="#039BE5"/><line x1="255" x2="250" y1="100" y2="105" stroke-width="1" stroke="#039BE5"/>'),
    (OrgChart.templates.mila.img_0 = '<image preserveAspectRatio="xMidYMid slice" xlink:href="{val}" x="20" y="5"  width="64" height="64"></image>'),
    (OrgChart.templates.mila.field_0 = '<text width="240" style="font-size: 18px;" fill="#039BE5" x="125" y="92" text-anchor="middle">{val}</text>'),
    (OrgChart.templates.mila.nodeMenuButton =
        '<g style="cursor:pointer;" transform="matrix(1,0,0,1,225,110)" control-node-menu-id="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#ffffff"></circle><circle cx="7" cy="0" r="2" fill="#ffffff"></circle><circle cx="14" cy="0" r="2" fill="#ffffff"></circle></g>'),
    (OrgChart.templates.diva = Object.assign({}, OrgChart.templates.ana)),
    (OrgChart.templates.diva.size = [200, 170]),
    (OrgChart.templates.diva.node = '<rect x="0" y="80" height="90" width="200" fill="#039BE5"></rect><circle cx="100" cy="50" fill="#ffffff" r="50" stroke="#039BE5" stroke-width="2"></circle>'),
    (OrgChart.templates.diva.img_0 =
        '<clipPath id="{randId}"><circle cx="100" cy="50" r="45"></circle></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="50" y="0"  width="100" height="100"></image>'),
    (OrgChart.templates.diva.field_0 = '<text width="185" style="font-size: 18px;" fill="#ffffff" x="100" y="125" text-anchor="middle">{val}</text>'),
    (OrgChart.templates.diva.field_1 = '<text width="185" style="font-size: 14px;" fill="#ffffff" x="100" y="145" text-anchor="middle">{val}</text>'),
    (OrgChart.templates.diva.pointer =
        '<g data-pointer="pointer" transform="matrix(0,0,0,0,100,100)"><radialGradient id="pointerGradient"><stop stop-color="#ffffff" offset="0" /><stop stop-color="#039BE5" offset="1" /></radialGradient><circle cx="16" cy="16" r="16" stroke-width="1" stroke="#acacac" fill="url(#pointerGradient)"></circle></g>'),
    (OrgChart.templates.diva.nodeMenuButton =
        '<g style="cursor:pointer;" transform="matrix(1,0,0,1,175,155)" control-node-menu-id="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#ffffff"></circle><circle cx="7" cy="0" r="2" fill="#ffffff"></circle><circle cx="14" cy="0" r="2" fill="#ffffff"></circle></g>'),
    (OrgChart.templates.luba = Object.assign({}, OrgChart.templates.ana)),
    (OrgChart.templates.luba.svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display:block;background-color: #2E2E2E;" width="{w}" height="{h}" viewBox="{viewBox}">{content}</svg>'),
    (OrgChart.templates.luba.defs =
        '<linearGradient id="{randId}" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style="stop-color:#646464;stop-opacity:1" /><stop offset="100%" style="stop-color:#363636;stop-opacity:1" /></linearGradient>'),
    (OrgChart.templates.luba.node = '<rect fill="url(#{randId})" x="0" y="0" height="120" width="250" stroke-width="1" stroke="#aeaeae" rx="5" ry="5"></rect>'),
    (OrgChart.templates.luba.img_0 =
        '<clipPath id="{randId}"><circle cx="50" cy="25" r="40"></circle></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="10" y="-15"  width="80" height="80"></image>'),
    (OrgChart.templates.luba.nodeMenuButton =
        '<g style="cursor:pointer;" transform="matrix(1,0,0,1,225,105)" control-node-menu-id="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#aeaeae"></circle><circle cx="7" cy="0" r="2" fill="#aeaeae"></circle><circle cx="14" cy="0" r="2" fill="#aeaeae"></circle></g>'),
    (OrgChart.templates.luba.field_0 = '<text width="235" style="font-size: 18px;" fill="#aeaeae" x="125" y="90" text-anchor="middle">{val}</text>'),
    (OrgChart.templates.luba.field_1 = '<text width="140" style="font-size: 14px;" fill="#aeaeae" x="240" y="30" text-anchor="end">{val}</text>'),
    (OrgChart.templates.luba.plus =
        '<rect x="0" y="0" width="36" height="36" rx="12" ry="12" fill="#2E2E2E" stroke="#aeaeae" stroke-width="1"></rect><line x1="4" y1="18" x2="32" y2="18" stroke-width="1" stroke="#aeaeae"></line><line x1="18" y1="4" x2="18" y2="32" stroke-width="1" stroke="#aeaeae"></line>'),
    (OrgChart.templates.luba.minus = '<rect x="0" y="0" width="36" height="36" rx="12" ry="12" fill="#2E2E2E" stroke="#aeaeae" stroke-width="1"></rect><line x1="4" y1="18" x2="32" y2="18" stroke-width="1" stroke="#aeaeae"></line>'),
    (OrgChart.templates.luba.expandCollapseSize = 36),
    (OrgChart.templates.derek = Object.assign({}, OrgChart.templates.ana)),
    (OrgChart.templates.derek.link = '<path stroke="#aeaeae" stroke-width="1px" fill="none" d="M{xa},{ya} C{xb},{yb} {xc},{yc} {xd},{yd}"/>'),
    (OrgChart.templates.derek.field_0 = '<text width="235" style="font-size: 24px;" fill="#aeaeae" x="125" y="90" text-anchor="middle">{val}</text>'),
    (OrgChart.templates.derek.field_1 = '<text width="130" style="font-size: 16px;" fill="#aeaeae" x="230" y="30" text-anchor="end">{val}</text>'),
    (OrgChart.templates.derek.node =
        '<rect x="0" y="0" height="120" width="250" fill="#ffffff" stroke-width="0" stroke="none" rx="5" ry="5"></rect><path d="M1.0464172536455116 0.43190469224125483 C53.84241668202045 -0.788936709486018, 103.41786516460891 -0.7020837047025514, 252.36637077877316 2.5880308844586395 M2.9051048929845287 1.416953777798454 C94.33574460557007 1.0012759229446266, 189.39715875173388 0.6456731199982935, 252.78978918302985 2.4201778360648074 M253.62699063660838 2.9193391477217157 C249.73034548542307 47.55931231380586, 252.87525930998083 91.26715478378368, 253.10179184315842 121.7440626272514 M251.37132919216776 1.8733470844542213 C252.2809675089866 32.73212950193807, 251.34402714677282 62.11470833534073, 251.87050951184997 121.58550827952904 M253.33945599552268 122.05611967964798 C171.36076589155192 123.47737863766969, 88.83808249906167 125.27259840604118, 3.1999393565128846 121.26868651191393 M252.26165120810887 122.5938901158243 C192.76996487394138 123.44664377223289, 131.37122563794998 122.94880221756583, 1.2373006891045732 121.88999197324904 M2.223863211672736 121.04511533445009 C1.4438124377596486 86.38398979211773, 2.8540468486809294 55.805566409478374, 3.8890451480896644 1.7483404843613926 M2.244347335490432 122.60147677858153 C2.100672267495622 92.31058899219087, 1.6261027388218166 64.160806803772, 1.6325734600065367 1.1945909353588222" stroke="#aeaeae" ></path>'),
    (OrgChart.templates.derek.defs = ' <filter id="grayscale"><feColorMatrix type="matrix" values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0"/></filter>'),
    (OrgChart.templates.derek.img_0 =
        '<clipPath id="{randId}"><circle cx="60" cy="30" r="36"></circle></clipPath><path d="M59.27394950148486 -8.301766751084706 C67.69473471187919 -8.865443566034696, 80.29031463018414 -4.859224005049532, 87.18598909426663 0.33238763875740673 C94.08166355834912 5.523999282564345, 98.98110545022442 14.745947814116153, 100.64799628597981 22.847903111756924 C102.31488712173521 30.949858409397695, 101.71467046207992 41.576461864335656, 97.187334108799 48.944119424602036 C92.65999775551809 56.311776984868416, 82.03610997730354 64.08326918912249, 73.48397816629435 67.05384847335519 C64.93184635528516 70.02442775758789, 54.01035575000908 69.7708463163516, 45.874543242743854 66.76759512999827 C37.738730735478626 63.76434394364495, 29.04872278114092 56.18846598822666, 24.669103122702957 49.034341355235284 C20.289483464264993 41.88021672224391, 18.158053754175985 31.830144088547545, 19.596825292116065 23.84284733205002 C21.035596830056146 15.855550575552495, 25.795252700735308 6.49424361294595, 33.30173235034344 1.1105608162501355 C40.80821199995158 -4.273121980445679, 58.92971347412665 -7.0427741956040295, 64.63570318976488 -8.459249448124865 C70.34169290540312 -9.8757247006457, 67.62192977382313 -7.857597534262704, 67.53767064417285 -7.388290698874876 M62.748378255307365 -8.335850348284236 C71.26603403676657 -8.411982637093757, 83.3134559967999 -3.2332675886967737, 89.65944437868365 2.387927626929269 C96.00543276056739 8.00912284255531, 99.8018539626104 17.389209313563462, 100.82430854660979 25.39132094547202 C101.84676313060918 33.39343257738058, 100.69202080288338 43.23907526327184, 95.79417188267999 50.40059741838061 C90.8963229624766 57.56211957348938, 80.19607375493683 65.6933432424228, 71.43721502538948 68.36045387612462 C62.678356295842114 71.02756450982645, 51.31858275833087 70.03148525422704, 43.241019505395826 66.40326122059156 C35.16345625246078 62.775037186956084, 26.840434236544123 54.120081952867466, 22.971835507779204 46.59110967431175 C19.103236779014285 39.06213739575604, 17.94937086132579 28.992694575765086, 20.029427132806305 21.22942754925726 C22.10948340428682 13.466160522749433, 28.239699334668693 5.033316212766326, 35.452173136662296 0.011507515264803203 C42.6646469386559 -5.010301182236719, 59.029629541347575 -7.774813789367088, 63.30426994476793 -8.901424635751876 C67.57891034818829 -10.028035482136666, 61.20261013623477 -7.6019933587127815, 61.10001555718443 -6.748157563043929" style="stroke: #aeaeae; stroke-width: 2; fill: none;"></path><image filter="url(#grayscale)" preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="20" y="-10"  width="80" height="80"></image>'),
    (OrgChart.templates.derek.minus =
        '<circle cx="15" cy="15" r="15" fill="#ffffff" stroke-width="0"></circle><path d="M17.23891044927774 1.1814294501322902 C20.29160626452551 1.030769196657948, 23.947970993006972 3.1719335544839753, 26.394853759110717 5.588671983418923 C28.84173652521446 8.005410412353871, 31.246576051221126 12.511831935158815, 31.920207045900206 15.681860023741976 C32.593838040579286 18.85188811232514, 32.286699675240925 21.948848714186923, 30.436639727185195 24.60884051491789 C28.586579779129462 27.268832315648858, 24.05246578668338 30.675892912089505, 20.819847357565806 31.64181082812777 C17.58722892844823 32.60772874416604, 13.992479948405318 31.588687222722193, 11.040929152479746 30.404348011147484 C8.089378356554175 29.220008799572774, 4.476346434761303 27.363985211380037, 3.110542582012373 24.535775558679525 C1.7447387292634435 21.707565905979013, 2.0125141957866703 16.770753327135857, 2.8461060359861694 13.435090094944405 C3.6796978761856685 10.099426862752953, 4.99838568665378 6.33816589513267, 8.112093623209367 4.521796165530812 C11.225801559764953 2.7054264359289544, 18.764666760207586 2.8505106971937155, 21.528353655319687 2.5368717173332556 C24.29204055043179 2.2232327374727956, 24.87088035867136 2.534909813412478, 24.69421499388197 2.6399622863680516 M17.281640595209783 0.19007885243722633 C20.364244435145494 -0.11577004716725742, 25.135133405402318 3.2303746945812075, 27.855952721223584 5.7353294427454955 C30.57677203704485 8.240284190909783, 33.34617538156587 11.802005102645245, 33.606556490137386 15.219807341422953 C33.8669375987089 18.637609580200664, 31.337125602828454 23.632355493641384, 29.418239372652685 26.24214287541175 C27.499353142476917 28.85193025718212, 25.044077583504755 30.13224182494988, 22.093239109082777 30.87853163204516 C19.1424006346608 31.62482143914044, 14.787723024669972 31.933646092018286, 11.713208526120809 30.719881717983426 C8.638694027571646 29.506117343948567, 5.1333408130933655 26.55826769548724, 3.6461521177877945 23.595945387835997 C2.1589634224822234 20.633623080184755, 1.9785010696309286 16.25773192692332, 2.7900763542873843 12.945947872075987 C3.60165163894384 9.634163817228652, 5.999109831161897 5.87039683716568, 8.51560382572653 3.7252410587519886 C11.032097820291161 1.5800852803382974, 16.377503419445155 0.40900388408914673, 17.88904032167518 0.0750132015938405 C19.400577223905202 -0.2589774809014657, 17.448582822593046 1.2406055078364167, 17.584825239106664 1.7212969637801514" style="stroke: rgb(174, 174, 174); stroke-width: 1; fill: none;"></path><path d="M8.571186416504453 17.64803469305822 C12.085276840999553 15.452815349785006, 19.337130848197884 16.101685575250833, 26.855223350440756 18.889299472836626 M7.857231507904164 16.840024354210055 C15.011849298914942 18.06824852479784, 22.352469730756894 17.800410681835732, 26.732355140012178 16.88515873797708" style="stroke: #aeaeae; stroke-width: 1; fill: none;"></path>'),
    (OrgChart.templates.derek.plus =
        '<circle cx="15" cy="15" r="15" fill="#ffffff" stroke-width="0"></circle><path d="M12.257463787262992 2.40166003616363 C15.548960627027807 1.1768586505919105, 20.323768339136134 1.874732142276981, 23.661947633240565 3.0864861053786417 C27.000126927344997 4.298240068480302, 30.703811226452725 6.729324000523814, 32.286539551889575 9.672183814773595 C33.86926787732643 12.615043629023376, 33.788018167397944 17.557781915741554, 33.158317585861674 20.743644990877332 C32.528617004325405 23.92950806601311, 31.137543762406274 26.899980401737224, 28.508336062671955 28.787362265588257 C25.879128362937635 30.67474412943929, 21.064677192956335 31.99302804642975, 17.383071387455747 32.06793617398354 C13.701465581955157 32.14284430153733, 9.342085269075854 31.17242931287016, 6.418701229668416 29.236811030911003 C3.4953171902609785 27.301192748951845, 0.29124975331190645 23.792422306170057, -0.15723284898887968 20.454226482228595 C-0.6057154512896659 17.116030658287134, 1.5769138742615705 12.178626667602387, 3.7278056158636996 9.207636087262241 C5.878697357465828 6.236645506922095, 10.970632450860041 3.8471017540469195, 12.748117600623896 2.6282830001877198 C14.525602750387751 1.4094642463285199, 14.289563699001825 1.9470094191022314, 14.392716514446832 1.894723564107041 M22.43549828180672 1.2256088400576157 C25.69018250895055 1.7704365119039576, 29.24546322166512 4.979269460398017, 31.051492912414023 8.188373611713667 C32.85752260316293 11.397477763029316, 33.67207918890526 17.17514768034262, 33.27167642630015 20.480233747951512 C32.871273663695035 23.785319815560406, 31.41050911947538 25.966765564166938, 28.649076336783356 28.01889001736704 C25.887643554091333 30.07101447056714, 20.094058835586818 32.38500719321419, 16.70307973014802 32.79298046715211 C13.31210062470922 33.20095374109003, 10.940906263905317 32.367748192606626, 8.303201704150565 30.46672966099454 C5.665497144395813 28.565711129382457, 2.097338248187536 24.641108687248686, 0.8768523716195098 21.386869277479594 C-0.34363350494851663 18.132629867710502, -0.763694313917872 14.0433435213021, 0.980286444742406 10.941293202379995 C2.7242672034026842 7.83924288345789, 7.945090366802328 4.317959037402062, 11.340736923581177 2.774567363946959 C14.736383480360027 1.231175690491856, 19.39979547907987 1.5862021443476335, 21.354165785415507 1.6809431616493775 C23.308536091751144 1.7756841789511215, 22.887857886273373 3.132249638930103, 23.06695876159499 3.343013467757423" style="stroke: rgb(174, 174, 174); stroke-width: 1; fill: none;"></path><path d="M7.0048103933165935 18.109075284628886 C12.152504846776358 18.486044066779655, 15.926735549928488 18.85477711845977, 26.641287664541796 15.553207106118496 M6.796084928139555 16.174781745374535 C14.085050058006614 16.53898319893461, 19.579209483395115 16.725914747038104, 27.441803598385356 17.277875712554966" style="stroke: #aeaeae; stroke-width: 1; fill: none;"></path><path d="M16.293755471804 6.234638030793387 C17.448668211406996 11.453666045700338, 16.27043554943843 18.842895411477887, 16.90423703847114 28.952046969222806 M17.809777051185264 7.011866752183222 C17.599122858612276 13.07833796918755, 16.995204905243295 18.587342115968614, 17.888568853882067 26.844926419317094" style="stroke: #aeaeae; stroke-width: 1; fill: none;"></path>'),
    (OrgChart.templates.derek.nodeMenuButton =
        '<g style="cursor:pointer;" transform="matrix(1,0,0,1,210,80)" control-node-menu-id="{id}"><rect x="-4" y="-4" fill="#000000" fill-opacity="0" width="30" height="30"></rect><path d="M28.28024041166867 10.015533059199505 C16.45705393905741 10.81309700412131, 9.85276157405196 9.87162723980281, 3.5441213169168515 7.075531655648353 M27.551825308513525 8.923800642512257 C18.159502224784205 9.337153563754718, 7.451197502628936 9.284728719203128, 1.8548423867425456 8.753004894810802 M27.907104120536573 17.662200828300364 C18.343063985797404 18.998694042201137, 6.69417200021006 18.568117962359516, 2.7668346274558218 17.84920936843539 M26.99365966559525 17.444217688828093 C18.288291344549645 16.258053076066645, 10.047008592341617 16.913684103209345, 2.1772395910449567 17.55258716848472 M25.754130110044443 24.79648729629354 C19.716463597004157 24.059273917380096, 12.571903015673474 24.723484329803995, 1.2709092686545498 25.961416660790483 M26.031268385778997 24.853114475295413 C16.16958752624931 25.047162545233455, 7.4039608372111765 23.9169859615211, 1.4736400026930716 24.342985647697336" style="stroke: rgb(174, 174, 174); stroke-width: 1; fill: none;"></path></g>'),
    (OrgChart.templates.isla = Object.assign({}, OrgChart.templates.ana)),
    (OrgChart.templates.isla.defs =
        '<filter x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox" id="isla-shadow"><feOffset dx="0" dy="4" in="SourceAlpha" result="shadowOffsetOuter1" /><feGaussianBlur stdDeviation="10" in="shadowOffsetOuter1" result="shadowBlurOuter1" /><feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.2 0" in="shadowBlurOuter1" type="matrix" result="shadowMatrixOuter1" /><feMerge><feMergeNode in="shadowMatrixOuter1" /><feMergeNode in="SourceGraphic" /></feMerge></filter>'),
    (OrgChart.templates.isla.size = [180, 120]),
    (OrgChart.templates.isla.node =
        '<rect filter="url(#isla-shadow)" x="0" y="20" rx="5" ry="5" height="100" width="180" fill="#FFF" stroke-width="1" stroke="#039BE5" ></rect><rect x="25" y="75" rx="10" ry="10" height="20" width="130" fill="#039BE5" stroke-width="3" stroke="#039BE5"></rect><rect fill="#ffffff" stroke="#039BE5" stroke-width="1" x="70" y="0" rx="13" ry="13" width="40" height="40"></rect><circle stroke="#FFCA28" stroke-width="3" fill="none" cx="90" cy="12" r="8"></circle><path d="M75,34 C75,17 105,17 105,34" stroke="#FFCA28" stroke-width="3" fill="none"></path>'),
    (OrgChart.templates.isla.field_0 = '<text width="120" style="font-size: 12px;" fill="#fff" x="90" y="90" text-anchor="middle">{val}</text>'),
    (OrgChart.templates.isla.field_1 = '<text width="160" style="font-size: 13px;" fill="#039BE5" x="90" y="64" text-anchor="middle">{val}</text>'),
    (OrgChart.templates.isla.img_0 =
        '<clipPath id="{randId}"><rect filter="url(#isla-shadow)" fill="#ffffff" stroke="#039BE5" stroke-width="1" x="70" y="0" rx="13" ry="13" width="40" height="40"></rect></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="70" y="0"  width="40" height="40"></image>'),
    (OrgChart.templates.isla.minus = '<circle cx="15" cy="15" r="15" fill="#F57C00" stroke="#F57C00" stroke-width="1"></circle><line x1="8" y1="15" x2="22" y2="15" stroke-width="1" stroke="#ffffff"></line>'),
    (OrgChart.templates.isla.plus =
        '<circle cx="15" cy="15" r="15" fill="#ffffff" stroke="#039BE5" stroke-width="1"></circle><line x1="4" y1="15" x2="26" y2="15" stroke-width="1" stroke="#039BE5"></line><line x1="15" y1="4" x2="15" y2="26" stroke-width="1" stroke="#039BE5"></line>'),
    (OrgChart.templates.isla.nodeMenuButton =
        '<g style="cursor:pointer;" transform="matrix(1,0,0,1,83,45)" control-node-menu-id="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#F57C00"></circle><circle cx="7" cy="0" r="2" fill="#F57C00"></circle><circle cx="14" cy="0" r="2" fill="#F57C00"></circle></g>'),
    (OrgChart.templates.isla.ripple = { radius: 0, color: "#F57C00", rect: { x: 0, y: 20, width: 180, height: 100 } }),
    (OrgChart.templates.deborah = Object.assign({}, OrgChart.templates.polina)),
    (OrgChart.templates.deborah.size = [150, 150]),
    (OrgChart.templates.deborah.node = '<rect x="0" y="0" height="150" width="150" fill="#039BE5" stroke-width="1" stroke="#686868" rx="15" ry="15"></rect>'),
    (OrgChart.templates.deborah.img_0 =
        '<clipPath id="{randId}"><rect fill="#ffffff" stroke="#039BE5" stroke-width="1" x="5" y="5" rx="15" ry="15" width="140" height="140"></rect></clipPath><image preserveAspectRatio="xMidYMid slice" clip-path="url(#{randId})" xlink:href="{val}" x="5" y="5"  width="140" height="140"></image><rect x="3" y="5" height="30" width="144" fill="#039BE5" opacity="0.5" rx="3" ry="3"></rect><rect x="3" y="115" height="30" width="144" fill="#039BE5" opacity="0.5" rx="3" ry="3"></rect>'),
    (OrgChart.templates.deborah.field_0 = '<text width="125" text-overflow="ellipsis" style="font-size: 18px;" fill="#ffffff" x="15" y="25" text-anchor="start">{val}</text>'),
    (OrgChart.templates.deborah.field_1 = '<text width="105" text-overflow="ellipsis" style="font-size: 11px;" fill="#ffffff" x="15" y="135" text-anchor="start">{val}</text>'),
    (OrgChart.templates.deborah.nodeMenuButton =
        '<g style="cursor:pointer;" transform="matrix(1,0,0,1,125,130)" control-node-menu-id="{id}"><rect x="-4" y="-10" fill="#000000" fill-opacity="0" width="22" height="22"></rect><circle cx="0" cy="0" r="2" fill="#ffffff"></circle><circle cx="7" cy="0" r="2" fill="#ffffff"></circle><circle cx="14" cy="0" r="2" fill="#ffffff"></circle></g>'),
    (OrgChart.templates.subLevel = Object.assign({}, OrgChart.templates.base)),
    (OrgChart.templates.subLevel.size = [0, 0]),
    (OrgChart.templates.subLevel.node = ""),
    (OrgChart.templates.subLevel.plus = ""),
    (OrgChart.templates.subLevel.minus = ""),
    (OrgChart.templates.subLevel.nodeMenuButton = ""),
    (OrgChart.ui = {
        _defsIds: {},
        defs: function (t) {
            var e = "";
            for (var r in OrgChart.templates) {
                var i = OrgChart.templates[r];
                i.defs ? ((OrgChart.ui._defsIds[r] = OrgChart.randomId()), (e += i.defs.replace("{randId}", OrgChart.ui._defsIds[r]))) : (e += i.defs);
            }
            return "<defs>" + e + t + "</defs>";
        },
        css: function () {
            return '<style>.bg-ripple-container {position: absolute; top: 0; right: 0; bottom: 0; left: 0; } .bg-ripple-container span {transform: scale(0);border-radius:100%;position:absolute;opacity:0.75;background-color:#fff;animation: bg-ripple 1000ms; }@-moz-keyframes bg-ripple {to {opacity: 0;transform: scale(2);}}@-webkit-keyframes bg-ripple {to {opacity: 0;transform: scale(2);}}@-o-keyframes bg-ripple {to {opacity: 0;transform: scale(2);}}@keyframes bg-ripple {to {opacity: 0;transform: scale(2);}}.bg-switch {position:relative;display:inline-block;width:60px;height:24px;float:right;}.bg-switch input {opacity:0;width:0;height:0;}.bg-slider {position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background-color: #ccc;-webkit-transition:.4s;transition: .4s;}.bg-slider:before {position:absolute;content:"";height:16px;width:16px;left:4px;bottom:4px;background-color:white;-webkit-transition:.4s;transition:.4s;}input:checked + .bg-slider {background-color:#2196F3;}input:focus + .bg-slider {box-shadow:0 0 1px #2196F3;}input:checked + .bg-slider:before {-webkit-transform:translateX(34px);-ms-transform:translateX(34px);transform:translateX(34px);}.bg-slider.round {border-radius:24px;}.bg-slider.round:before {border-radius:50%;}svg text:hover {cursor:default;}svg.cursor-grab, svg.cursor-grab text:hover {cursor:grab;}svg.cursor-nodrop, svg.cursor-nodrop text:hover {cursor:no-drop;}svg.cursor-copy, svg.cursor-copy text:hover {cursor:copy;}svg.cursor-move, svg.cursor-move text:hover  {cursor:move;}</style>';
        },
        lonely: function (t) {
            return t.nodes && t.nodes.length ? "" : OrgChart.IT_IS_LONELY_HERE.replace("{link}", OrgChart.RES.IT_IS_LONELY_HERE_LINK);
        },
        pointer: function (t, e, r) {
            return e === OrgChart.action.exporting ? "" : OrgChart.t(t.template, !1, r).pointer;
        },
        node: function (t, e, r, i, a, n, o, l, s, h) {
            var c = OrgChart.t(t.templateName, t.min, s),
                d = c.node.replaceAll("{w}", t.w).replaceAll("{h}", t.h);
            for (var g in (c.defs && (d = d.replace("{randId}", OrgChart.ui._defsIds[t.templateName])), null == o && (o = i.nodeBinding), o)) {
                var p = o[g];
                if (e) {
                    var f = e[p];
                    if (("function" == typeof p && (f = p(h, t)), null != f && null != f && null != c[g]))
                        d += (OrgChart._lblIsImg(i, g) || "string" != typeof f || (f = OrgChart.wrapText(f, c[g])), c[g].replace("{val}", f))
                            .replaceAll("{ew}", t.w - (t.padding ? t.padding[1] : 0))
                            .replaceAll("{cw}", t.w / 2)
                            .replaceAll("{randId}", OrgChart.randomId())
                            .replaceAll("{randId2}", OrgChart.randomId());
                }
            }
            var u = OrgChart._getPosition(r, t, a, n),
                m = "node";
            Array.isArray(t.tags) && t.tags.length && (m += " " + t.tags.join(" ")), t.layout && (m += " tree-layout");
            var C = "";
            t.lcn && (C = 'lcn="' + t.lcn + '"');
            var y = OrgChart.nodeOpenTag.replace("{lcn}", C).replace("{id}", t.id).replace("{class}", m).replace("{level}", t.level).replace("{x}", u.x).replace("{y}", u.y),
                v = OrgChart._getOpacity(r, t);
            ((y = y.replace("{opacity}", v)), null != i.nodeMenu && "split" != t.templateName && l !== OrgChart.action.exporting) &&
                (d += c.nodeMenuButton
                    .replace("{id}", t.id)
                    .replace("{cw}", t.w / 2)
                    .replace("{ew}", t.w - (t.padding ? t.padding[1] : 0)));
            return (d = y + d + OrgChart.grCloseTag);
        },
        expandCollapseBtn: function (t, e, r, i, a) {
            if (i === OrgChart.action.exporting) return "";
            if (0 == e.childrenIds.length) return "";
            if ("split" == e.templateName) return "";
            var n = r[e.lcn ? e.lcn : "base"],
                o = "",
                l = 0,
                s = 0,
                h = OrgChart.t(e.templateName, e.min, a);
            switch (n.orientation) {
                case OrgChart.orientation.top:
                case OrgChart.orientation.top_left:
                    (l = e.x + e.w / 2), (s = e.y + e.h);
                    break;
                case OrgChart.orientation.bottom:
                case OrgChart.orientation.bottom_left:
                    (l = e.x + e.w / 2), (s = e.y);
                    break;
                case OrgChart.orientation.right:
                case OrgChart.orientation.right_top:
                    (l = e.x), (s = e.y + e.h / 2);
                    break;
                case OrgChart.orientation.left:
                case OrgChart.orientation.left_top:
                    (l = e.x + e.w), (s = e.y + e.h / 2);
            }
            if (
                ((l -= h.expandCollapseSize / 2),
                (s -= h.expandCollapseSize / 2),
                t.getCollapsedIds(e).length
                    ? ((o += OrgChart.expcollOpenTag.replace("{id}", e.id).replace("{x}", l).replace("{y}", s)), (o += h.plus))
                    : ((o += OrgChart.expcollOpenTag.replace("{id}", e.id).replace("{x}", l).replace("{y}", s)), (o += h.minus)),
                (o += OrgChart.grCloseTag).indexOf("{collapsed-children-count}"))
            ) {
                var c = OrgChart.collapsedChildrenCount(t, e);
                o = o.replace("{collapsed-children-count}", c);
            }
            return o;
        },
        link: function (t, e, r) {
            var i = t.lcn ? t.lcn : "base",
                a = e._layoutConfigs[i],
                n = OrgChart.t(t.templateName, t.min, r),
                o = [],
                l = a.levelSeparation / 2;
            (t.layout != OrgChart.mixed && t.layout != OrgChart.tree) || (l = a.mixedHierarchyNodesSeparation / 2);
            for (var s = 0; s < t.children.length; s++) {
                var h = t.children[s],
                    c = { xa: 0, ya: 0, xb: 0, yb: 0, xc: 0, yc: 0, xd: 0, yd: 0, x: 0, y: 0, rotate: 0 },
                    d = (n = OrgChart.t(h.templateName, h.min, r)).link;
                if ((h.isAssistant || 2 == h.layout) && h.rightNeighbor && h.rightNeighbor.isSplit)
                    switch (a.orientation) {
                        case OrgChart.orientation.top:
                        case OrgChart.orientation.top_left:
                            c = OrgChart.ui._linkRightToLeft(h.rightNeighbor, h, n, l);
                            break;
                        case OrgChart.orientation.bottom:
                        case OrgChart.orientation.bottom_left:
                            c = OrgChart.ui._linkRightToLeft(h.rightNeighbor, h, n, l);
                            break;
                        case OrgChart.orientation.right:
                        case OrgChart.orientation.right_top:
                            c = OrgChart.ui._linkBottomToTop(h.rightNeighbor, h, n, l);
                            break;
                        case OrgChart.orientation.left:
                        case OrgChart.orientation.left_top:
                            c = OrgChart.ui._linkBottomToTop(h.rightNeighbor, h, n, l);
                    }
                else if ((h.isAssistant || 2 == h.layout) && h.leftNeighbor && h.leftNeighbor.isSplit)
                    switch (a.orientation) {
                        case OrgChart.orientation.top:
                        case OrgChart.orientation.top_left:
                            c = OrgChart.ui._linkLeftToRight(h.leftNeighbor, h, n, l);
                            break;
                        case OrgChart.orientation.bottom:
                        case OrgChart.orientation.bottom_left:
                            c = OrgChart.ui._linkLeftToRight(h.leftNeighbor, h, n, l);
                            break;
                        case OrgChart.orientation.right:
                        case OrgChart.orientation.right_top:
                            c = OrgChart.ui._linkTopToBottom(h.leftNeighbor, h, n, l);
                            break;
                        case OrgChart.orientation.left:
                        case OrgChart.orientation.left_top:
                            c = OrgChart.ui._linkTopToBottom(h.leftNeighbor, h, n, l);
                    }
                else
                    switch (a.orientation) {
                        case OrgChart.orientation.top:
                        case OrgChart.orientation.top_left:
                            c = OrgChart.ui._linkTopToBottom(t, h, n, l);
                            break;
                        case OrgChart.orientation.bottom:
                        case OrgChart.orientation.bottom_left:
                            c = OrgChart.ui._linkBottomToTop(t, h, n, l);
                            break;
                        case OrgChart.orientation.right:
                        case OrgChart.orientation.right_top:
                            c = OrgChart.ui._linkRightToLeft(t, h, n, l);
                            break;
                        case OrgChart.orientation.left:
                        case OrgChart.orientation.left_top:
                            c = OrgChart.ui._linkLeftToRight(t, h, n, l);
                    }
                (d = d.replaceAll("{xa}", c.xa).replaceAll("{ya}", c.ya).replaceAll("{xb}", c.xb).replaceAll("{yb}", c.yb).replaceAll("{xc}", c.xc).replaceAll("{yc}", c.yc).replaceAll("{xd}", c.xd).replaceAll("{yd}", c.yd)),
                    o.push(
                        OrgChart.linkOpenTag
                            .replace("{id}", t.id)
                            .replace("{class}", "link " + h.tags.join(" "))
                            .replace("{level}", t.level)
                            .replace("{child-id}", h.id)
                    ),
                    o.push(d);
                var g = "";
                for (var p in e.config.linkBinding) {
                    var f = e.config.linkBinding[p],
                        u = e._get(h.id);
                    if (u) {
                        var m = u[f];
                        null != m && null != m && null != n[p] && (g += n[p].replace("{val}", m));
                    }
                }
                "" != g && ((g = OrgChart.linkFieldsOpenTag.replace("{x}", c.x).replace("{y}", c.y).replace("{rotate}", 0) + g + OrgChart.grCloseTag), o.push(g)), o.push(OrgChart.grCloseTag);
            }
            return o.join("");
        },
        svg: function (t, e, r, i, a, n) {
            return OrgChart.t(i.template, !1, n).svg.replace("{w}", t).replace("{h}", e).replace("{viewBox}", r).replace("{content}", a);
        },
        exportMenuButton: function (t) {
            return null == t.menu ? "" : OrgChart.t(t.template, !1).exportMenuButton.replaceAll("{p}", t.padding);
        },
        _linkTopToBottom: function (t, e, r, i) {
            var a,
                n,
                o,
                l,
                s,
                h,
                c,
                d = 0;
            return (
                (a = t.x + t.w / 2 + r.linkAdjuster.toX),
                (n = t.y + t.h + r.linkAdjuster.toY),
                (s = l = e.x + e.w / 2 + r.linkAdjuster.fromX),
                (h = e.y + r.linkAdjuster.fromY),
                {
                    xa: (o = a),
                    ya: n,
                    xb: o,
                    yb: (d =
                        t.rightNeighbor && t.rightNeighbor.isAssistant && "split" == e.templateName
                            ? t.rightNeighbor.y + t.rightNeighbor.h + i
                            : "split" != t.templateName || (!e.isAssistant && 2 != e.layout)
                            ? "split" == e.templateName
                                ? n + i
                                : h - i
                            : h),
                    xc: (c = l),
                    yc: d,
                    xd: s,
                    yd: h,
                    x: c,
                    y: d + 16,
                    rotate: 0,
                }
            );
        },
        _linkBottomToTop: function (t, e, r, i) {
            var a,
                n,
                o,
                l,
                s,
                h,
                c,
                d = 0;
            return (
                (a = t.x + t.w / 2 + r.linkAdjuster.toX),
                (n = t.y + r.linkAdjuster.toY),
                (s = l = e.x + e.w / 2 + r.linkAdjuster.fromX),
                (h = e.y + e.h + r.linkAdjuster.fromY),
                {
                    xa: (o = a),
                    ya: n,
                    xb: o,
                    yb: (d =
                        t.rightNeighbor && t.rightNeighbor.isAssistant && "split" == e.templateName ? t.rightNeighbor.y - i : "split" != t.templateName || (!e.isAssistant && 2 != e.layout) ? ("split" == e.templateName ? n - i : h + i) : h),
                    xc: (c = l),
                    yc: d,
                    xd: s,
                    yd: h,
                    x: c,
                    y: d - 14,
                    rotate: 0,
                }
            );
        },
        _linkRightToLeft: function (t, e, r, i) {
            var a,
                n,
                o,
                l,
                s,
                h,
                c,
                d = 0;
            return (
                (a = t.x + r.linkAdjuster.toX),
                (n = t.y + t.h / 2 + r.linkAdjuster.toY),
                (s = e.x + e.w + r.linkAdjuster.fromX),
                (h = l = e.y + e.h / 2 + r.linkAdjuster.fromY),
                {
                    xa: a,
                    ya: (o = n),
                    xb: (d =
                        t.rightNeighbor && t.rightNeighbor.isAssistant && "split" == e.templateName ? t.rightNeighbor.x - i : "split" != t.templateName || (!e.isAssistant && 2 != e.layout) ? ("split" == e.templateName ? a - i : s + i) : s),
                    yb: o,
                    xc: d,
                    yc: (c = l),
                    xd: s,
                    yd: h,
                    x: d - 16,
                    y: c,
                    rotate: 90,
                }
            );
        },
        _linkLeftToRight: function (t, e, r, i) {
            var a,
                n,
                o,
                l,
                s,
                h,
                c,
                d = 0;
            return (
                (a = t.x + t.w + r.linkAdjuster.toX),
                (n = t.y + t.h / 2 + r.linkAdjuster.toY),
                (s = e.x + r.linkAdjuster.fromX),
                (h = l = e.y + e.h / 2 + r.linkAdjuster.fromY),
                {
                    xa: a,
                    ya: (o = n),
                    xb: (d =
                        t.rightNeighbor && t.rightNeighbor.isAssistant && "split" == e.templateName
                            ? t.rightNeighbor.x + t.rightNeighbor.w + i
                            : "split" != t.templateName || (!e.isAssistant && 2 != e.layout)
                            ? "split" == e.templateName
                                ? a + i
                                : s - i
                            : s),
                    yb: o,
                    xc: d,
                    yc: (c = l),
                    xd: s,
                    yd: h,
                    x: d + 14,
                    y: c,
                    rotate: 270,
                }
            );
        },
    }),
    void 0 === OrgChart && (OrgChart = {}),
    (OrgChart._validateConfig = function (t) {
        return !!t || (console.error("config is not defined"), !1);
    }),
    (OrgChart._arrayContains = function (t, e) {
        if (t && Array.isArray(t)) for (var r = t.length; r--; ) if (t[r] === e) return !0;
        return !1;
    }),
    (OrgChart._interceptions = function (t, e) {
        if (!t) return [];
        if (!e) return [];
        var r = [];
        if (Array.isArray(t) && Array.isArray(e)) for (var i in t) for (var a in e) t[i] == e[a] && r.push(t[i]);
        else if (Array.isArray(t) && !Array.isArray(e)) for (var i in t) for (var a in e) t[i] == a && r.push(t[i]);
        else if (!Array.isArray(t) && Array.isArray(e)) for (var i in t) for (var a in e) i == e[a] && r.push(e[a]);
        return r;
    }),
    (OrgChart._getTags = function (t) {
        return t.tags && !Array.isArray(t.tags) ? t.tags.split(",") : t.tags && Array.isArray(t.tags) ? t.tags : [];
    }),
    (OrgChart._centerPointInPercent = function (t, e, r) {
        var i = t.getBoundingClientRect(),
            a = e - i.left,
            n = r - i.top;
        return [a / (i.width / 100), n / (i.height / 100)];
    }),
    (OrgChart._trim = function (t) {
        return t.replace(/^\s+|\s+$/g, "");
    }),
    (OrgChart._getTransform = function (t) {
        var e = t.getAttribute("transform");
        return (e = e.replace("matrix", "").replace("(", "").replace(")", "")), OrgChart._browser().msie && (e = e.replace(/ /g, ",")), (e = "[" + (e = OrgChart._trim(e)) + "]"), (e = JSON.parse(e));
    }),
    (OrgChart.getScale = function (t, e, r, i, a, n, o, l) {
        var s = 1;
        if (t || i !== OrgChart.match.boundary)
            if (t || i !== OrgChart.match.width)
                if (t || i !== OrgChart.match.height)
                    if (t) {
                        var h,
                            c = e / t[2];
                        s = (h = r / t[3]) < c ? h : c;
                    } else s = i;
                else s = r / l;
            else s = e / o;
        else s = (h = r / l) < (c = e / o) ? h : c;
        return s && a < s && (s = a), s && s < n && (s = n), s;
    }),
    (OrgChart._mergeObject = function (t, e) {
        var r = {};
        for (var i in t) r[i] = t[i];
        for (i in e) r[i] = e[i];
        return r;
    }),
    (OrgChart._lblIsImg = function (t, e) {
        return !(!t.nodeBinding || -1 == e.indexOf("img") || !t.nodeBinding[e]);
    }),
    (OrgChart._fieldIsImg = function (t, e) {
        if (t.nodeBinding) for (var r in t.nodeBinding) if (t.nodeBinding[r] == e) return OrgChart._lblIsImg(t, r);
        return !1;
    }),
    (OrgChart._guid = function () {
        function t() {
            return Math.floor(65536 * (1 + Math.random()))
                .toString(16)
                .substring(1);
        }
        return t() + t() + "-" + t() + "-" + t() + "-" + t() + "-" + t() + t() + t();
    }),
    (OrgChart.htmlRipple = function (o) {
        var t = document.createElement("style");
        (t.type = "text/css"),
            (t.innerHTML =
                " .bg-ripple-container {position: absolute; top: 0; right: 0; bottom: 0; left: 0; } .bg-ripple-container span {transform: scale(0);border-radius:100%;position:absolute;opacity:0.75;background-color:#fff;animation: bg-ripple 1000ms; }@-moz-keyframes bg-ripple {to {opacity: 0;transform: scale(2);}}@-webkit-keyframes bg-ripple {to {opacity: 0;transform: scale(2);}}@-o-keyframes bg-ripple {to {opacity: 0;transform: scale(2);}}@keyframes bg-ripple {to {opacity: 0;transform: scale(2);}}"),
            document.head.appendChild(t);
        var r,
            i,
            a,
            e = document.createElement("div");
        (e.className = "bg-ripple-container"),
            o.addEventListener("mousedown", function (t) {
                var e, r, i, a, n;
                return (
                    (r = document.createElement("span")),
                    (i = this.offsetWidth),
                    (e = this.getBoundingClientRect()),
                    (n = t.pageX - e.left - i / 2),
                    (a = "top:" + (t.pageY - e.top - i / 2) + "px; left: " + n + "px; height: " + i + "px; width: " + i + "px;"),
                    o.rippleContainer.appendChild(r),
                    r.setAttribute("style", a)
                );
            }),
            o.addEventListener(
                "mouseup",
                ((r = function () {
                    for (; this.rippleContainer.firstChild; ) this.rippleContainer.removeChild(this.rippleContainer.firstChild);
                }),
                (i = 2e3),
                (a = void 0),
                function () {
                    var t, e;
                    return (
                        (e = this),
                        (t = arguments),
                        clearTimeout(a),
                        (a = setTimeout(function () {
                            return r.apply(e, t);
                        }, i))
                    );
                })
            ),
            (o.rippleContainer = e),
            o.appendChild(e);
    }),
    (OrgChart._moveToBoundaryArea = function (t, e, r, i) {
        var a = e.slice(0);
        e[0] < r.left && e[0] < r.right && (a[0] = r.left > r.right ? r.right : r.left),
            e[0] > r.right && e[0] > r.left && (a[0] = r.left > r.right ? r.left : r.right),
            e[1] < r.top && e[1] < r.bottom && (a[1] = r.top > r.bottom ? r.bottom : r.top),
            e[1] > r.bottom && e[1] > r.top && (a[1] = r.top > r.bottom ? r.top : r.bottom),
            e[0] !== a[0] || e[1] !== a[1]
                ? OrgChart.anim(t, { viewBox: e }, { viewBox: a }, 300, OrgChart.anim.outPow, function () {
                      i && i();
                  })
                : i && i();
    }),
    (OrgChart.randomId = function () {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }),
    (OrgChart._getClientXY = function (t) {
        return -1 == t.type.indexOf("touch") ? { x: t.clientX, y: t.clientY } : t.changedTouches.length ? { x: t.changedTouches[0].clientX, y: t.changedTouches[0].clientY } : void 0;
    }),
    (OrgChart._getClientTouchesXY = function (t, e) {
        return -1 != t.type.indexOf("touch") ? (t.touches.length < e + 1 ? { x: null, y: null } : { x: t.touches[e].clientX, y: t.touches[e].clientY }) : { x: t.clientX, y: t.clientY };
    }),
    (OrgChart._getOffset = function (t, e) {
        t && ((e.x += t.offsetLeft), (e.y += t.offsetTop), OrgChart._getOffset(t.offsetParent, e));
    }),
    (OrgChart._getTopLeft = function (t) {
        var e = { x: 0, y: 0 };
        return OrgChart._getOffset(t, e), e;
    }),
    (OrgChart._getOffsetXY = function (t, e) {
        if (-1 == e.type.indexOf("touch")) return { x: e.offsetX, y: e.offsetY };
        if (e.touches.length) {
            var r = OrgChart._getTopLeft(t);
            return { x: e.touches[0].pageX - r.x, y: e.touches[0].pageY - r.y };
        }
        if (e.changedTouches.length) {
            r = OrgChart._getTopLeft(t);
            return { x: e.changedTouches[0].pageX - r.x, y: e.changedTouches[0].pageY - r.y };
        }
    }),
    (OrgChart._pinchMiddlePointInPercent = function (t, e, r, i) {
        var a = OrgChart._getTopLeft(t),
            n = i.touches[0].pageX - a.x,
            o = i.touches[0].pageY - a.y,
            l = i.touches[1].pageX - a.x,
            s = i.touches[1].pageY - a.y;
        return [((n - l) / 2 + l) / (e / 100), ((o - s) / 2 + s) / (r / 100)];
    }),
    (OrgChart._browser = function () {
        var t = (!!window.opr && !!opr.addons) || !!window.opera || 0 <= navigator.userAgent.indexOf(" OPR/"),
            e = "undefined" != typeof InstallTrigger,
            r = /constructor/i.test(window.HTMLElement) || "[object SafariRemoteNotification]" === (!window.safari || ("undefined" != typeof safari && safari.pushNotification)).toString(),
            i = !!document.documentMode,
            a = !i && !!window.StyleMedia,
            n = !(!window.chrome || (!window.chrome.webstore && !window.chrome.runtime));
        return { opera: t, firefox: e, safari: r, msie: i, edge: a, chrome: n, blink: (n || t) && !!window.CSS };
    }),
    (OrgChart._menuPosition = function (t, e, r) {
        var i = t.getBoundingClientRect(),
            a = r.getBoundingClientRect(),
            n = e.getBoundingClientRect(),
            o = i.left - a.left,
            l = i.top - a.top;
        return i.top + n.height > a.top + a.height && (l -= n.height), i.left - n.width < a.left && (o += n.width), { x: o, y: l };
    }),
    (OrgChart._getTemplate = function (t, e, r) {
        if (Array.isArray(t))
            for (var i = 0; i < t.length; i++) {
                var a = e[t[i]];
                if (a && a.template) return a.template;
            }
        return r;
    }),
    (OrgChart._getMin = function (t, e) {
        OrgChart.t(t.templateName);
        if (t.tags && t.tags.length)
            for (var r = 0; r < t.tags.length; r++) {
                var i = e[t.tags[r]];
                if (i && !0 === i.min) return !0;
            }
        return !1;
    }),
    (OrgChart._getSubLevels = function (t, e) {
        if (t && t.length)
            for (var r = 0; r < t.length; r++) {
                var i = e[t[r]];
                if (i && i.subLevels) return i.subLevels;
            }
        return 0;
    }),
    (OrgChart._isHTML = function (t) {
        var e = document.createElement("div");
        e.innerHTML = t;
        for (var r = e.childNodes, i = r.length; i--; ) if (1 == r[i].nodeType) return !0;
        return !1;
    }),
    (OrgChart._getTestDiv = function () {
        var t = document.getElementById("orgchart_js_test_div");
        return t || (((t = document.createElement("div")).id = "orgchart_js_test_div"), (t.style.position = "fixed"), (t.style.top = "-10000px"), (t.style.left = "-10000px"), document.body.appendChild(t)), t;
    }),
    (OrgChart._getLabelSize = function (t) {
        var e = OrgChart._getTestDiv();
        return (e.innerHTML = "<svg>" + t + "</svg>"), e.querySelector("text").getBoundingClientRect();
    }),
    (OrgChart.wrapText = function (t, e) {
        if (-1 == e.indexOf("<text")) return t;
        if (-1 == e.indexOf("width")) return t;
        if (OrgChart._isHTML(t)) return t;
        var r = OrgChart._getTestDiv();
        (e = e.replaceAll("{cw}", 0)), (r.innerHTML = "<svg>" + e + "</svg>");
        var i = new DOMParser().parseFromString(e, "text/xml").getElementsByTagName("text")[0],
            a = parseFloat(i.getAttribute("x")),
            n = parseFloat(i.getAttribute("y")),
            o = i.getAttribute("text-anchor"),
            l = i.getAttribute("width"),
            s = i.getAttribute("text-overflow"),
            h = "http://www.w3.org/2000/svg",
            c = r.getElementsByTagName("svg")[0].getElementsByTagName("text")[0],
            d = parseFloat(i.getAttribute("text-overflow-lines"));
        if ((d || (d = 0), !l)) return t;
        if (((l = parseFloat(l)), a || (a = 0), n || (n = 0), a || (o = "start"), s || (s = "ellipsis"), "ellipsis" == s)) {
            c.removeChild(c.firstChild), (c.textContent = t);
            for (var g = c.getComputedTextLength(), p = 2; l < g; ) (c.textContent = t.substring(0, t.length - p)), (c.textContent += "..."), (g = c.getComputedTextLength()), p++;
            return 2 < p ? "<title>" + t + "</title>" + c.textContent : t;
        }
        if ("multiline" == s) {
            var f = t.split(" "),
                u = c.getBBox().height;
            c.textContent = "";
            var m = document.createElementNS(h, "tspan"),
                C = document.createTextNode(f[0]);
            m.setAttributeNS(null, "x", a), m.setAttributeNS(null, "y", n), m.setAttributeNS(null, "text-anchor", o), m.appendChild(C), c.appendChild(m);
            p = 1;
            for (var y = 1, v = 1; v < f.length; v++) {
                var x = m.firstChild.data.length;
                if (((m.firstChild.data += " " + f[v]), m.getComputedTextLength() > l)) {
                    if (((m.firstChild.data = m.firstChild.data.slice(0, x)), y++, 0 !== d && d < y)) break;
                    (m = document.createElementNS(h, "tspan")).setAttributeNS(null, "x", a),
                        m.setAttributeNS(null, "y", n + u * p),
                        m.setAttributeNS(null, "text-anchor", o),
                        (C = document.createTextNode(f[v])),
                        m.appendChild(C),
                        c.appendChild(m),
                        p++;
                }
            }
            var O = "";
            if (null != c.innerHTML) (O = c.innerHTML), (c.innerHTML = "");
            else {
                var b = "";
                for (v = c.childNodes.length - 1; 0 <= v; v--) (b = XMLSerializer().serializeToString(c.childNodes[v]) + b), c.removeChild(c.childNodes[v]);
                O = b;
            }
            return O;
        }
    }),
    (OrgChart._downloadFile = function (t, e, r, i) {
        var a = new Blob([e], { type: t });
        if (1 == i) {
            var n = URL.createObjectURL(a);
            window.open(n, "_blank").focus();
        } else if (navigator.msSaveBlob) navigator.msSaveBlob(a, r);
        else {
            var o = document.createElement("a");
            if (void 0 !== o.download) {
                n = URL.createObjectURL(a);
                o.setAttribute("href", n), o.setAttribute("download", r), (o.style.visibility = "hidden"), document.body.appendChild(o), o.click(), document.body.removeChild(o);
            }
        }
    }),
    (OrgChart._getPosition = function (t, e, r, i) {
        var a = { x: e.x, y: e.y };
        if ((null != r && (a.x = r), null != i && (a.y = r), t && 3 == t.length)) {
            var n = t[0].indexOf(e.id);
            -1 != n && null != t[1][n].transform && (null == r && (a.x = t[1][n].transform[4]), null == i && (a.y = t[1][n].transform[5]));
        }
        return a;
    }),
    (OrgChart._getOpacity = function (t, e) {
        var r = 1;
        if (t && 3 == t.length) {
            var i = t[0].indexOf(e.id);
            -1 != i && null != t[1][i].opacity && (r = t[1][i].opacity);
        }
        return r;
    }),
    (OrgChart.t = function (t, e, r) {
        var i = OrgChart.templates[t],
            a = null;
        if (null != r && i.scaleLessThen) {
            var n = [];
            for (var o in i.scaleLessThen) {
                var l = parseFloat(o);
                r < l && n.push(l);
            }
            if (0 < n.length) {
                n.sort(function (t, e) {
                    return t - e;
                });
                var s = i.scaleLessThen[n[0]];
                for (var h in s) null == a && (a = Object.assign({}, i)), (a[h] = s[h]);
            }
        }
        return e ? (null == a ? (i.min ? i.min : i) : a.min ? a.min : a) : null == a ? i : a;
    }),
    (OrgChart.setNodeSize = function (t) {
        var e = OrgChart.t(t.templateName, t.min);
        (t.w = e && e.size ? e.size[0] : 0), (t.h = e && e.size ? e.size[1] : 0);
    }),
    (OrgChart._imgs2base64 = function (t, e, i, a) {
        var n = t.getElementsByTagName(e),
            o = n.length;
        0 == o && a();
        for (var l = 0; l < o; l++)
            !(function () {
                var e = l,
                    r = n[e];
                OrgChart._getDataUri(r.getAttribute(i), function (t) {
                    t.success && r.setAttribute(i, t.result), e == o - 1 && a();
                });
            })();
    }),
    (OrgChart._getDataUri = function (t, e) {
        if (-1 != t.indexOf("base64")) e({ success: !1 });
        else {
            var r = new XMLHttpRequest();
            r.open("GET", t),
                (r.responseType = "blob"),
                (r.onload = function () {
                    200 === r.status ? i.readAsDataURL(r.response) : 404 === r.status && e({ success: !1, result: r.status });
                });
            var i = new FileReader();
            (i.onloadend = function () {
                e({ success: !0, result: i.result });
            }),
                r.send();
        }
    }),
    (OrgChart._csvToArray = function (t, e) {
        e = e || ",";
        for (var r = new RegExp("(\\" + e + '|\\r?\\n|\\r|^)(?:"([^"]*(?:""[^"]*)*)"|([^"\\' + e + "\\r\\n]*))", "gi"), i = [[]], a = null; (a = r.exec(t)); ) {
            var n,
                o = a[1];
            o.length && o !== e && i.push([]), (n = a[2] ? a[2].replace(new RegExp('""', "g"), '"') : a[3]), i[i.length - 1].push(n);
        }
        return i;
    }),
    (OrgChart._json2xml = function (t) {
        for (var e = document.implementation.createDocument("", "", null), r = e.createElement("nodes"), i = 0; i < t.length; i++) {
            var a = e.createElement("node"),
                n = t[i];
            for (var o in n) {
                var l = n[o];
                "tags" == o && (l = l.join()), a.setAttribute(o, l);
            }
            r.appendChild(a);
        }
        return e.appendChild(r), '<?xml version="1.0" encoding="utf-8" ?>' + new XMLSerializer().serializeToString(e.documentElement);
    }),
    (OrgChart._xml2json = function (t) {
        for (var e = new DOMParser().parseFromString(t, "text/xml").getElementsByTagName("node"), r = [], i = 0; i < e.length; i++) {
            for (var a = e[i], n = {}, o = 0; o < a.attributes.length; o++) {
                var l = a.attributes[o],
                    s = l.value;
                "tags" == l.name && (s = s.split(",")), (n[l.name] = s);
            }
            r.push(n);
        }
        return r;
    }),
    (OrgChart._json2csv = function (t) {
        for (
            var n = [],
                e = function (t) {
                    for (var e = "", r = 0; r < n.length; r++) {
                        var i;
                        (i = "reportsTo" == n[r] ? null : null == t[n[r]] ? "" : t[n[r]]) instanceof Date && (i = i.toLocaleString());
                        var a = (i = null === i ? "" : i.toString()).replace(/"/g, '""');
                        0 <= a.search(/("|,|\n)/g) && (a = '"' + a + '"'), 0 < r && (e += ","), (e += a);
                    }
                    return e + "\n";
                },
                r = "",
                i = 0;
            i < t.length;
            i++
        )
            for (var a in t[i]) OrgChart._arrayContains(n, a) || (n.push(a), (r += a + ","));
        r += "\n";
        for (i = 0; i < t.length; i++) r += e(t[i]);
        return r;
    }),
    (OrgChart.accentFold = function (t) {
        return (t = t.toString().toLowerCase()).replace(/([àáâãäå])|([ç])|([èéêë])|([ìíîï])|([ñ])|([òóôõöø])|([ß])|([ùúûü])|([ÿ])|([æ])/g, function (t, e, r, i, a, n, o, l, s, h, c) {
            return e ? "a" : r ? "c" : i ? "e" : a ? "i" : n ? "n" : o ? "o" : l ? "s" : s ? "u" : h ? "y" : c ? "ae" : void 0;
        });
    }),
    (OrgChart.copy = function (t) {
        if (null === t || "object" != typeof t || "isActiveClone" in t) return t;
        if (t instanceof Date) var e = new t.constructor();
        else e = t.constructor();
        for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && ((t.isActiveClone = null), (e[r] = OrgChart.copy(t[r])), delete t.isActiveClone);
        return e;
    }),
    (OrgChart._getScrollSensitivity = function () {
        var t = OrgChart._browser();
        return t.msie && OrgChart.scroll.ie
            ? OrgChart.scroll.ie
            : t.edge && OrgChart.scroll.edge
            ? OrgChart.scroll.edge
            : t.safari && OrgChart.scroll.safari
            ? OrgChart.scroll.safari
            : t.chrome && OrgChart.scroll.chrome
            ? OrgChart.scroll.chrome
            : t.firefox && OrgChart.scroll.firefox
            ? OrgChart.scroll.firefox
            : t.opera && OrgChart.scroll.opera
            ? OrgChart.scroll.opera
            : { smooth: OrgChart.scroll.smooth, speed: OrgChart.scroll.speed };
    }),
    (OrgChart.isTrial = function () {
        return void 0 !== OrgChart.remote;
    }),
    (OrgChart.childrenCount = function (t, e, r) {
        null == r && (r = 0);
        for (var i = 0; i < e.childrenIds.length; i++) {
            var a = t.nodes[e.childrenIds[i]];
            a && (r++, OrgChart.childrenCount(t, a, r));
        }
        return r;
    }),
    (OrgChart.collapsedChildrenCount = function (t, e, r) {
        null == r && (r = 0);
        for (var i = 0; i < e.childrenIds.length; i++) {
            var a = t.nodes[e.childrenIds[i]];
            a && (!0 === a.collapsed && r++, OrgChart.collapsedChildrenCount(t, a, r));
        }
        return r;
    }),
    (OrgChart._setMinMaxXY = function (t, e) {
        (null == e.minX || (null != t.x && t.x < e.minX)) && (e.minX = t.x),
            (null == e.minY || (null != t.y && t.y < e.minY)) && (e.minY = t.y),
            (null == e.maxX || (null != t.x && t.x + t.w > e.maxX)) && (e.maxX = t.x + t.w),
            (null == e.maxY || (null != t.y && t.y + t.h > e.maxY)) && (e.maxY = t.y + t.h);
    }),
    (OrgChart.getStParentNodes = function (t, e) {
        for (e || (e = []); t.parent; ) t = t.parent;
        return t.stParent && (e.push(t.stParent), OrgChart.getStParentNodes(t.stParent, e)), e;
    }),
    (OrgChart.xScrollUI = function (t, e, r, i, a) {
        (this.element = t), (this.requestParams = r), (this.config = e), (this.onSetViewBoxCallback = i), (this.onDrawCallback = a), (this.pos = 0);
    }),
    (OrgChart.xScrollUI.prototype.addListener = function (t) {
        var o = this;
        if ((this.config.mouseScrool == OrgChart.action.xScroll || this.config.mouseScrool == OrgChart.action.scroll) && this.bar) {
            var e = OrgChart._getScrollSensitivity();
            !(function (t, i, e) {
                var a = !1;
                function n() {
                    a = !0;
                    var t = (o.pos - o.bar.scrollLeft) / e;
                    0 < t ? t++ : t--, (o.bar.scrollLeft += t), o.bar.scrollLeft == o.pos ? (a = !1) : r(n);
                }
                t.addEventListener(
                    "wheel",
                    function (t) {
                        var e = 0;
                        if (o.config.mouseScrool == OrgChart.action.xScroll) (e = t.deltaX || t.wheelDeltaX) || (e = t.deltaY || t.wheelDeltaY);
                        else if (o.config.mouseScrool == OrgChart.action.scroll && !(e = t.shiftKey ? t.deltaY || t.wheelDeltaY : t.deltaX || t.wheelDeltaX)) return;
                        (e = -e), t.preventDefault(), (e = Math.max(-1, Math.min(1, e))), (o.pos += -e * i);
                        var r = parseFloat(o.innerBar.clientWidth) - parseFloat(o.bar.clientWidth);
                        o.pos < 0 && (o.pos = 0), o.pos > r && (o.pos = r), a || n();
                    },
                    !1
                );
                var r =
                    window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    function (t) {
                        setTimeout(t, 20);
                    };
            })(t, e.speed, e.smooth);
        }
    }),
    (OrgChart.xScrollUI.prototype.create = function (t) {
        if (this.config.showXScroll === OrgChart.scroll.visible || this.config.mouseScrool === OrgChart.action.scroll || this.config.mouseScrool === OrgChart.action.xScroll) {
            var a = this;
            this.bar && this.bar.parentNode.removeChild(this.bar),
                (this.bar = document.createElement("div")),
                this.config.showXScroll !== OrgChart.scroll.visible && (this.bar.style.visibility = "hidden"),
                (this.innerBar = document.createElement("div"));
            this.requestParams();
            (this.innerBar.innerHTML = "&nbsp"),
                Object.assign(this.bar.style, { position: "absolute", left: 0, bottom: 0, width: t + "px", "overflow-x": "scroll", height: "20px" }),
                this.element.appendChild(this.bar),
                this.bar.appendChild(this.innerBar),
                this.bar.addEventListener("scroll", function () {
                    if (this.ignore) this.ignore = !1;
                    else {
                        var t = a.requestParams(),
                            e = (parseFloat(a.innerBar.clientWidth) - parseFloat(a.bar.clientWidth)) / 100,
                            r = this.scrollLeft / e,
                            i = (t.boundary.right - t.boundary.left) / 100;
                        (t.viewBox[0] = r * i + t.boundary.left),
                            a.onSetViewBoxCallback(t.viewBox),
                            clearTimeout(this._timeout),
                            (this._timeout = setTimeout(function () {
                                a.onDrawCallback();
                            }, 500));
                    }
                });
        }
    }),
    (OrgChart.xScrollUI.prototype.setPosition = function () {
        if (this.bar) {
            var t = this.requestParams(),
                e = Math.abs(t.boundary.maxX - t.boundary.minX) * t.scale;
            switch (this.config.orientation) {
                case OrgChart.orientation.bottom:
                case OrgChart.orientation.bottom_left:
                    innerHeight = Math.abs(t.boundary.minY * t.scale);
                    break;
                case OrgChart.orientation.right:
                case OrgChart.orientation.right_top:
                    e = Math.abs(t.boundary.minX * t.scale);
            }
            this.innerBar.style.width = e + "px";
            var r = (t.boundary.right - t.boundary.left) / 100,
                i = (t.viewBox[0] - t.boundary.left) / r;
            i < 0 ? (i = 0) : 100 < i && (i = 100);
            var a = (parseFloat(this.innerBar.clientWidth) - parseFloat(this.bar.clientWidth)) / 100,
                n = i * a;
            (this.bar.ignore = !0), (this.bar.scrollLeft = n), (this.pos = this.bar.scrollLeft), (this.bar.style.visibility = a <= 0 ? "hidden" : "");
        }
    }),
    (OrgChart.yScrollUI = function (t, e, r, i, a) {
        (this.element = t), (this.requestParams = r), (this.config = e), (this.onSetViewBoxCallback = i), (this.onDrawCallback = a), (this.pos = 0);
    }),
    (OrgChart.yScrollUI.prototype.addListener = function (t) {
        var o = this;
        if (this.config.mouseScrool == OrgChart.action.yScroll || this.config.mouseScrool == OrgChart.action.scroll) {
            var e = OrgChart._getScrollSensitivity();
            !(function (t, i, e) {
                var a = !1;
                function n() {
                    a = !0;
                    var t = (o.pos - o.bar.scrollTop) / e;
                    0 < t ? t++ : t--, (o.bar.scrollTop += t), o.bar.scrollTop == o.pos ? (a = !1) : r(n);
                }
                t.addEventListener(
                    "wheel",
                    function (t) {
                        var e = 0;
                        if (o.config.mouseScrool == OrgChart.action.yScroll) (e = t.deltaY || t.wheelDeltaY) || (e = t.deltaX || t.wheelDeltaX);
                        else if (o.config.mouseScrool == OrgChart.action.scroll && !(e = t.shiftKey ? t.deltaX || t.wheelDeltaX : t.deltaY || t.wheelDeltaY)) return;
                        (e = -e), t.preventDefault(), (e = Math.max(-1, Math.min(1, e))), (o.pos += -e * i);
                        var r = parseFloat(o.innerBar.clientHeight) - parseFloat(o.bar.clientHeight);
                        o.pos < 0 && (o.pos = 0), o.pos > r && (o.pos = r), a || n();
                    },
                    !1
                );
                var r =
                    window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame ||
                    function (t) {
                        setTimeout(t, 20);
                    };
            })(t, e.speed, e.smooth);
        }
    }),
    (OrgChart.yScrollUI.prototype.create = function (t) {
        if (this.config.showYScroll === OrgChart.scroll.visible || this.config.mouseScrool === OrgChart.action.scroll || this.config.mouseScrool === OrgChart.action.yScroll) {
            var a = this;
            this.bar && this.bar.parentNode.removeChild(this.bar),
                (this.bar = document.createElement("div")),
                this.config.showYScroll !== OrgChart.scroll.visible && (this.bar.style.visibility = "hidden"),
                (this.innerBar = document.createElement("div")),
                (this.innerBar.innerHTML = "&nbsp"),
                Object.assign(this.bar.style, { position: "absolute", right: 0, bottom: 0, height: t + "px", "overflow-y": "scroll", width: "20px" }),
                this.element.appendChild(this.bar),
                this.bar.appendChild(this.innerBar),
                this.bar.addEventListener("scroll", function () {
                    if (this.ignore) this.ignore = !1;
                    else {
                        var t = a.requestParams(),
                            e = (parseFloat(a.innerBar.clientHeight) - parseFloat(a.bar.clientHeight)) / 100,
                            r = this.scrollTop / e,
                            i = (t.boundary.bottom - t.boundary.top) / 100;
                        (t.viewBox[1] = r * i + t.boundary.top),
                            a.onSetViewBoxCallback(t.viewBox),
                            clearTimeout(this._timeout),
                            (this._timeout = setTimeout(function () {
                                a.onDrawCallback();
                            }, 500));
                    }
                });
        }
    }),
    (OrgChart.yScrollUI.prototype.setPosition = function () {
        if (this.bar) {
            var t = this.requestParams(),
                e = t.boundary.maxY * t.scale;
            switch (this.config.orientation) {
                case OrgChart.orientation.bottom:
                case OrgChart.orientation.bottom_left:
                    e = Math.abs(t.boundary.minY * t.scale);
                    break;
                case OrgChart.orientation.right:
                case OrgChart.orientation.right_top:
                    innerWidth = Math.abs(t.boundary.minX * t.scale);
            }
            this.innerBar.style.height = e + "px";
            var r = (t.boundary.bottom - t.boundary.top) / 100,
                i = (t.viewBox[1] - t.boundary.top) / Math.abs(r);
            i < 0 ? (i = 0) : 100 < i && (i = 100);
            var a = (parseFloat(this.innerBar.clientHeight) - parseFloat(this.bar.clientHeight)) / 100,
                n = i * a;
            (this.bar.ignore = !0), (this.bar.scrollTop = n), (this.pos = this.bar.scrollTop), (this.bar.style.visibility = a <= 0 ? "hidden" : "");
        }
    }),
    (OrgChart.prototype.zoom = function (t, e, r) {
        var i = this.getViewBox().slice(0),
            a = i,
            n = i[2],
            o = i[3];
        !0 === t ? ((i[2] = i[2] / OrgChart.SCALE_FACTOR), (i[3] = i[3] / OrgChart.SCALE_FACTOR)) : !1 === t ? ((i[2] = i[2] * OrgChart.SCALE_FACTOR), (i[3] = i[3] * OrgChart.SCALE_FACTOR)) : ((i[2] = i[2] / t), (i[3] = i[3] / t)),
            e || (e = [50, 50]),
            (i[0] = a[0] - (i[2] - n) / (100 / e[0])),
            (i[1] = a[1] - (i[3] - o) / (100 / e[1]));
        var l = this.getScale(i);
        if (((i[2] = this.width() / l), (i[3] = this.height() / l), (!0 === t && l < this.config.scaleMax) || (!1 === t && l > this.config.scaleMin) || (0 != t && 1 != t && l < this.config.scaleMax && l > this.config.scaleMin))) {
            this._hideBeforeAnimation();
            var s = this;
            r
                ? (clearTimeout(s._timeout),
                  OrgChart.anim(this.getSvg(), { viewbox: this.getViewBox() }, { viewbox: i }, this.config.anim.duration, this.config.anim.func, function () {
                      clearTimeout(s._timeout),
                          (s._timeout = setTimeout(function () {
                              s._draw(!0, OrgChart.action.zoom);
                          }, 500));
                  }))
                : (this.setViewBox(i),
                  clearTimeout(s._timeout),
                  (s._timeout = setTimeout(function () {
                      s._draw(!0, OrgChart.action.zoom);
                  }, 500)));
        }
    }),
    (OrgChart.loading = {}),
    (OrgChart.loading.show = function (t) {
        var e = document.createElement("div");
        (e.id = "bg-loading"),
            (e.innerHTML =
                '<style>@-webkit-keyframes dot-keyframes {0% { opacity: .4; -webkit-transform: scale(1, 1);transform: scale(1, 1);}50% {opacity: 1;-webkit-transform: scale(1.2, 1.2);transform: scale(1.2, 1.2);}100% {opacity: .4;-webkit-transform: scale(1, 1);transform: scale(1, 1);}}@keyframes dot-keyframes {0% {opacity: .4;-webkit-transform: scale(1, 1);transform: scale(1, 1);}50% {opacity: 1;-webkit-transform: scale(1.2, 1.2);transform: scale(1.2, 1.2);}100% {opacity: .4;-webkit-transform: scale(1, 1);transform: scale(1, 1);}}.bg-loading-dots div {margin: 10px;}      .bg-dot-1 {background-color: #039BE5;}.bg-dot-2 {background-color: #F57C00;}.bg-dot-3 {background-color: #FFCA28;}      .bg-loading-dots {text-align: center;width: 100%; position: absolute; top: 0;}.bg-loading-dots--dot {-webkit-animation: dot-keyframes 1.5s infinite ease-in-out;animation: dot-keyframes 1.5s infinite ease-in-out;        border-radius: 10px;display: inline-block;height: 10px;width: 10px;}.bg-loading-dots--dot:nth-child(2) {-webkit-animation-delay: .5s;animation-delay: .5s;}.bg-loading-dots--dot:nth-child(3) {-webkit-animation-delay: 1s;animation-delay: 1s;}</style><div class="bg-loading-dots"><div class="bg-loading-dots--dot bg-dot-1"></div><div class="bg-loading-dots--dot bg-dot-2"></div><div class="bg-loading-dots--dot bg-dot-3"></div></div>'),
            t.element.appendChild(e);
    }),
    (OrgChart.loading.hide = function (t) {
        var e = t.element.querySelector("#bg-loading");
        e && e.parentNode.removeChild(e);
    }),
    (OrgChart.pdfPrevUI = {}),
    OrgChart.loc || (OrgChart.loc = {}),
    (OrgChart.loc.ppdfCmdTitle = "PDF Preview"),
    (OrgChart.loc.ppdfSave = "Save"),
    (OrgChart.loc.ppdfCancel = "Cancel"),
    (OrgChart.loc.ppdfFormat = "Format"),
    (OrgChart.loc.ppdfFitToDrwaing = "Fit"),
    (OrgChart.loc.ppdfA4 = "A4"),
    (OrgChart.loc.ppdfA3 = "A3"),
    (OrgChart.loc.ppdfA2 = "A2"),
    (OrgChart.loc.ppdfA1 = "A1"),
    (OrgChart.loc.ppdfLetter = "Letter"),
    (OrgChart.loc.ppdfLegal = "Legal"),
    (OrgChart.loc.ppdfLayout = "Layout"),
    (OrgChart.loc.ppdfPortrait = "Portrait"),
    (OrgChart.loc.ppdfLandscape = "Landscape"),
    (OrgChart.loc.ppdfFittopagewidth = "Fit to page width"),
    (OrgChart.loc.ppdfMargin = "Margin"),
    (OrgChart.loc.ppdfHeader = "Header"),
    (OrgChart.loc.ppdfFooter = "Footer"),
    (OrgChart.loc.ppdfScale = "Scale"),
    (OrgChart.pdfPrevUI.show = function (r, i) {
        i = r._defaultExportOptions(i, "pdf");
        var t = document.createElement("div");
        (t.id = "bg-ppdf-btns"),
            Object.assign(t.style, {
                position: "absolute",
                top: 0,
                left: 0,
                "background-color": "#fff",
                "z-index": 5,
                margin: "0 0 0 -250px",
                "box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
                width: "250px",
                height: "100%",
                "font-family": "Roboto,Helvetica",
                color: "#757575",
                "text-align": "right",
                padding: "10px",
            }),
            r.element.appendChild(t),
            (t.innerHTML =
                "<h1>" +
                OrgChart.loc.ppdfCmdTitle +
                '</h1><div><button type="button" id="bg-prev-save" style="font-size: 14px; width: 90px;">' +
                OrgChart.loc.ppdfSave +
                '</button>&nbsp;<button type="button" id="bg-prev-cancel" style="width: 90px;font-size: 14px;">' +
                OrgChart.loc.ppdfCancel +
                '</button></div><div style="margin-top:30px; height:10px;border-bottom:1px solid #eeeeee;"></div><div style="padding-top:30px;"><label for="bg-size">' +
                OrgChart.loc.ppdfFormat +
                ': </label><select id="bg-ppdf-size" style="color: #757575; width: 150px; font-size: 14px;" id="bg-size"><option value="fit">' +
                OrgChart.loc.ppdfFitToDrwaing +
                '</option><option value="A4">' +
                OrgChart.loc.ppdfA4 +
                '</option><option value="A3">' +
                OrgChart.loc.ppdfA3 +
                '</option><option value="A2">' +
                OrgChart.loc.ppdfA2 +
                '</option><option value="A1">' +
                OrgChart.loc.ppdfA1 +
                '</option><option value="Letter">' +
                OrgChart.loc.ppdfLetter +
                '</option><option value="Legal">' +
                OrgChart.loc.ppdfLegal +
                '</option></select></div><div style="padding-top:10px;"><label for="bg-ppdf-layout">' +
                OrgChart.loc.ppdfLayout +
                ': </label><select id="bg-ppdf-layout" style="color: #757575; width: 150px;font-size: 14px;" ><option value="false">' +
                OrgChart.loc.ppdfPortrait +
                '</option><option value="true">' +
                OrgChart.loc.ppdfLandscape +
                '</option></select></div><div style="padding-top:10px;"><label for="bg-scale">' +
                OrgChart.loc.ppdfScale +
                ': </label><select id="bg-ppdf-scale" style="color: #757575; width: 150px;font-size: 14px;" id="bg-scale"><option value="fit">' +
                OrgChart.loc.ppdfFittopagewidth +
                '</option><option value="10">10%</option><option value="20">20%</option><option value="30">30%</option><option value="40">40%</option><option value="50">50%</option><option value="60">60%</option><option value="70">70%</option><option value="80">80%</option><option value="90">90%</option><option value="100">100%</option><option value="110">110%</option><option value="120">120%</option><option value="130">130%</option><option value="140">140%</option><option value="150">150%</option><option value="160">160%</option><option value="170">170%</option><option value="180">180%</option><option value="190">190%</option><option value="200">200%</option></select></div><div style="margin-top:10px;margin-bottom:10px; height:10px;border-bottom:1px solid #eeeeee;"></div><div style="padding-top:10px;"><label for="bg-ppdf-header">' +
                OrgChart.loc.ppdfHeader +
                ': </label><input id="bg-ppdf-header" type="text" style="color: #757575; width: 100px;font-size: 14px;" ></div><div style="padding-top:10px;"><label for="bg-ppdf-footer">' +
                OrgChart.loc.ppdfFooter +
                ': </label><input id="bg-ppdf-footer" type="text" style="color: #757575; width: 100px;font-size: 14px;" ></div><div style="padding-top:10px;"><label for="bg-ppdf-margin">' +
                OrgChart.loc.ppdfMargin +
                ': </label><input id="bg-ppdf-margin" type="text" style="color: #757575; width: 100px;font-size: 14px;" ></div>');
        var e = document.createElement("div");
        (e.id = "bg-ppdf-wrapper"),
            Object.assign(e.style, { "overflow-y": "scroll", position: "absolute", top: 0, left: "270px", "background-color": "#eee", width: r.width() - 270 + "px", height: "100%" }),
            r.element.appendChild(e),
            (e.innerHTML = '<div id="bg-ppdf-content" style="width: 100%;margin-top:10px;margin-bottom:10px;opacity:0;"></div>');
        var a,
            n,
            o,
            l = r.element.querySelector("#bg-ppdf-size"),
            s = r.element.querySelector("#bg-ppdf-layout"),
            h = r.element.querySelector("#bg-ppdf-scale"),
            c = r.element.querySelector("#bg-ppdf-margin"),
            d = r.element.querySelector("#bg-ppdf-header"),
            g = r.element.querySelector("#bg-ppdf-footer");
        (l.value = i.format),
            (s.value = i.landscape),
            (h.value = i.scale),
            (c.value = i.margin),
            (d.value = i.header),
            (g.value = i.footer),
            OrgChart.anim(r.element.querySelector("#bg-ppdf-btns"), { margin: [0, 0, 0, -250] }, { margin: [0, 0, 0, 0] }, 300, OrgChart.anim.outSin, function () {
                r.exportPDF(i, OrgChart.pdfPrevUI._handler);
            }),
            r.element.querySelector("#bg-prev-cancel").addEventListener("click", function () {
                OrgChart.pdfPrevUI.hide(r);
            }),
            r.element.querySelector("#bg-prev-save").addEventListener("click", function () {
                r.exportPDF(i), OrgChart.pdfPrevUI.hide(r);
            }),
            OrgChart.pdfPrevUI._showHide(l, s, h),
            l.addEventListener("change", function () {
                OrgChart.anim(r.element.querySelector("#bg-ppdf-content"), { opacity: 1 }, { opacity: 0 }, 300, OrgChart.anim.inSin, function () {
                    (r.element.querySelector("#bg-ppdf-content").innerHTML = ""), (i.format = l.value), r.exportPDF(i, OrgChart.pdfPrevUI._handler), OrgChart.pdfPrevUI._showHide(l, s, h);
                });
            }),
            s.addEventListener("change", function () {
                OrgChart.anim(r.element.querySelector("#bg-ppdf-content"), { opacity: 1 }, { opacity: 0 }, 300, OrgChart.anim.inSin, function () {
                    (r.element.querySelector("#bg-ppdf-content").innerHTML = ""), (i.landscape = "true" == s.value), r.exportPDF(i, OrgChart.pdfPrevUI._handler), OrgChart.pdfPrevUI._showHide(l, s, h);
                });
            }),
            h.addEventListener("change", function () {
                OrgChart.anim(r.element.querySelector("#bg-ppdf-content"), { opacity: 1 }, { opacity: 0 }, 300, OrgChart.anim.inSin, function () {
                    (r.element.querySelector("#bg-ppdf-content").innerHTML = ""), (i.scale = h.value), r.exportPDF(i, OrgChart.pdfPrevUI._handler), OrgChart.pdfPrevUI._showHide(l, s, h);
                });
            }),
            c.addEventListener("keyup", function () {
                clearTimeout(a),
                    (a = setTimeout(function () {
                        OrgChart.anim(r.element.querySelector("#bg-ppdf-content"), { opacity: 1 }, { opacity: 0 }, 300, OrgChart.anim.inSin, function () {
                            r.element.querySelector("#bg-ppdf-content").innerHTML = "";
                            var t = c.value.split(",");
                            if (4 == t.length) {
                                for (var e = 0; e < t.length; e++) t[e] = parseInt(t[e]);
                                (i.margin = t), r.exportPDF(i, OrgChart.pdfPrevUI._handler);
                            }
                        });
                    }, 1e3));
            }),
            d.addEventListener("keyup", function () {
                clearTimeout(n),
                    (n = setTimeout(function () {
                        OrgChart.anim(r.element.querySelector("#bg-ppdf-content"), { opacity: 1 }, { opacity: 0 }, 300, OrgChart.anim.inSin, function () {
                            (r.element.querySelector("#bg-ppdf-content").innerHTML = ""), (i.header = d.value), r.exportPDF(i, OrgChart.pdfPrevUI._handler);
                        });
                    }, 1e3));
            }),
            g.addEventListener("keyup", function () {
                clearTimeout(o),
                    (o = setTimeout(function () {
                        OrgChart.anim(r.element.querySelector("#bg-ppdf-content"), { opacity: 1 }, { opacity: 0 }, 300, OrgChart.anim.inSin, function () {
                            (r.element.querySelector("#bg-ppdf-content").innerHTML = ""), (i.footer = g.value), r.exportPDF(i, OrgChart.pdfPrevUI._handler);
                        });
                    }, 1e3));
            });
    }),
    (OrgChart.pdfPrevUI._showHide = function (t, e, r) {
        "A4" == t.value || "A3" == t.value || "A2" == t.value || "A1" == t.value || "Letter" == t.value || "Legal" == t.value
            ? ((e.parentNode.style.display = "block"), (r.parentNode.style.display = "block"))
            : ((e.parentNode.style.display = "none"), (r.parentNode.style.display = "none"));
    }),
    (OrgChart.pdfPrevUI._handler = function (t, e, r) {
        var i = e.options,
            a = e.pages,
            n = i.margin[0],
            o = i.margin[2],
            l = document.createElement("div");
        l.innerHTML = r.outerHTML;
        for (var s = l.querySelector("svg"), h = t.element.querySelector("#bg-ppdf-content"), c = 0; c < a.length; c++) {
            var d = document.createElement("iframe");
            Object.assign(d.style, { display: "block", margin: "10px auto", border: "1px solid #eeeeee", "box-shadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }),
                h.appendChild(d),
                s && s.style.backgroundColor ? (d.style.backgroundColor = s.style.backgroundColor) : (d.style.backgroundColor = "#fff");
            var g = d.contentWindow.document;
            g.open(), (d.style.width = a[c].size.w + "px"), (d.style.height = a[c].size.h + "px"), (d.style.margin = "10 auto"), a[c].backgroundColor && (d.style.backgroundColor = a[c].backgroundColor);
            var p = i.header;
            a[c].header && (p = a[c].header), p && (p = p.replace("{current-page}", c + 1).replace("{total-pages}", a.length));
            var f = i.footer;
            a[c].footer && (f = a[c].footer),
                f && (f = f.replace("{current-page}", c + 1).replace("{total-pages}", a.length)),
                a[c].html
                    ? g.write(OrgChart._exportHtml(a[c].html + e.styles, i, a[c].innerSize.w, a[c].innerSize.h, p, f))
                    : (s.setAttribute("viewBox", a[c].vb), g.write(OrgChart._exportHtml(l.innerHTML + e.styles, i, a[c].innerSize.w, a[c].innerSize.h, p, f)));
            var u = g.getElementById("bg-header"),
                m = g.getElementById("bg-footer");
            if (u) {
                var C = n - u.offsetHeight - 7;
                u.style.top = C + "px";
            }
            if (m) {
                var y = o - m.offsetHeight - 7;
                m.style.bottom = y + "px";
            }
            g.close();
        }
        var v = t.element.querySelector("#bg-ppdf-content");
        OrgChart.anim(v, { opacity: 0 }, { opacity: 1 }, 300, OrgChart.anim.outSin);
    }),
    (OrgChart.pdfPrevUI._getViewBox = function (t) {
        var e = null;
        return t ? ((e = (e = "[" + (e = t.getAttribute("viewBox")) + "]").replace(/\ /g, ",")), (e = JSON.parse(e))) : null;
    }),
    (OrgChart._exportHtml = function (t, e, r, i, a, n) {
        for (var o = "", l = 0; l < e.margin.length; l++) o += e.margin[l] + "px ";
        var s = '<!DOCTYPE html><html style="margin:0;padding:0;"><head></head><body style="margin:0; padding:0;"><div style="margin: ' + o + ";overflow:hidden;width:" + r + "px;height:" + i + 'px">';
        return (
            a && (s += '<div id="bg-header" style="width:' + r + "px;color:#757575;position:absolute;left:" + e.margin[3] + 'px;top:0;">' + a + "</div>"),
            (s += t),
            n && (s += '<div id="bg-footer" style="width:' + r + "px;color:#757575;position:absolute;left:" + e.margin[3] + 'px;bottom:0;">' + n + "</div>"),
            (s += "</div>"),
            (s += "</body></html>")
        );
    }),
    (OrgChart.pdfPrevUI.hide = function (e) {
        var r = e.element.querySelector("#bg-ppdf-wrapper");
        r &&
            OrgChart.anim(r, { opacity: 1 }, { opacity: 0 }, 300, OrgChart.anim.inSin, function () {
                r.parentNode.removeChild(r);
                var t = e.element.querySelector("#bg-ppdf-btns");
                OrgChart.anim(t, { margin: [0, 0, 0, 0] }, { margin: [0, 0, 0, -280] }, 300, OrgChart.anim.inSin, function () {
                    t.parentNode.removeChild(t);
                });
            });
    }),
    void 0 === OrgChart && (OrgChart = {}),
    OrgChart.events.on("renderdefs", function (t, e) {
        for (var r = 0; r < t.config.clinks.length; r++) {
            var i = t.config.clinks[r].template;
            i || (i = "orange");
            var a = OrgChart.clinkTemplates[i];
            e.defs += a.defs;
        }
    }),
    OrgChart.events.on("render", function (t, e) {
        t._clink(t, e);
    }),
    (OrgChart.prototype._clink = function (t, e) {
        for (var r, i, a, n, o, l = "", s = 0; s < this.config.clinks.length; s++) {
            var h = this.config.clinks[s];
            if (-1 != e.res.visibleNodeIds.indexOf(h.from) && -1 != e.res.visibleNodeIds.indexOf(h.to)) {
                var c = t.getNode(h.from),
                    d = t.getNode(h.to),
                    g = c.x,
                    p = c.y,
                    f = d.x,
                    u = d.y,
                    m = {},
                    C = {},
                    y = g + c.w / 2,
                    v = f + d.w / 2,
                    x = p + c.h / 2,
                    O = u + d.h / 2,
                    b = 1;
                switch (this.config.orientation) {
                    case OrgChart.orientation.top:
                    case OrgChart.orientation.top_left:
                        y <= v ? ((b = 1), (m.x = y + c.w / 10), (C.x = v - d.w / 10)) : ((b = -1), (m.x = y - c.w / 10), (C.x = v + d.w / 10)),
                            p == u ? ((b = 1), (m.y = p), (C.y = u)) : u < p ? ((m.y = p), (C.y = u + d.h)) : ((m.y = p + c.h), (C.y = u));
                        break;
                    case OrgChart.orientation.bottom:
                    case OrgChart.orientation.bottom_left:
                        (m.x = y <= v ? ((b = -1), y + c.w / 10) : ((b = 1), y - c.w / 10)), (C.x = v + d.w / 10), p == u ? ((b = -1), (m.y = p + c.h), (C.y = u + d.h)) : u < p ? ((m.y = p), (C.y = u + d.h)) : ((m.y = p + c.h), (C.y = u));
                        break;
                    case OrgChart.orientation.left:
                    case OrgChart.orientation.left_top:
                        (m.y = x <= O ? ((b = -1), x + c.h / 5) : ((b = 1), x - c.h / 5)), (C.y = O + d.h / 5), g == f ? ((b = -1), (m.x = g), (C.x = f)) : f < g ? ((m.x = g), (C.x = f + d.w)) : ((m.x = g + c.w), (C.x = f));
                        break;
                    case OrgChart.orientation.right:
                    case OrgChart.orientation.right_top:
                        (m.y = x <= O ? ((b = 1), x + c.h / 5) : ((b = -1), x - c.h / 5)), (C.y = O + d.h / 5), g == f ? ((b = 1), (m.x = g + c.w), (C.x = f + d.w)) : f < g ? ((m.x = g), (C.x = f + d.w)) : ((m.x = g + c.w), (C.x = f));
                }
                var w = A(m, C, b),
                    k = h.template;
                k || (k = "orange");
                var _ = OrgChart.clinkTemplates[k];
                l +=
                    '<g c-link-from="{from}" c-link-to="{to}">'.replace("{from}", c.id).replace("{to}", d.id) +
                    _.link
                        .replaceAll("{d}", "M{a.x},{a.y} C{a.x},{a.y} {c.x},{c.y} {b.x},{b.y}")
                        .replaceAll("{b.x}", C.x)
                        .replaceAll("{b.y}", C.y)
                        .replaceAll("{a.x}", m.x)
                        .replaceAll("{a.y}", m.y)
                        .replaceAll("{c.x}", w.x)
                        .replaceAll("{c.y}", w.y);
                var S = ((r = m), (a = w), void 0, (n = ((i = C).x - r.x) / 2 + r.x), (o = (i.y - r.y) / 2 + r.y), { x: (n - a.x) / 2 + a.x, y: (o - a.y) / 2 + a.y });
                h.label && (l += _.label.replace("{x}", S.x).replace("{y}", S.y).replace("{val}", h.label)), (l += OrgChart.grCloseTag);
            }
            function A(t, e, r) {
                null == r && (r = 1);
                var i = e.x - t.x,
                    a = e.y - t.y,
                    n = Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2)) / 3;
                return (n = (n / (Math.sqrt(i * i + a * a) * r)) * OrgChart.CLINK_CURVE), { x: t.x + i / 2 - a * n, y: t.y + a / 2 + i * n };
            }
        }
        e.content += l;
    }),
    (OrgChart.prototype.addClink = function (t, e, r, i) {
        return this.removeClink(t, e), this.config.clinks.push({ from: t, to: e, label: r, template: i }), this;
    }),
    (OrgChart.prototype.removeClink = function (t, e) {
        for (var r = this.config.clinks.length - 1; 0 <= r; r--) {
            var i = this.config.clinks[r];
            i.from == t && i.to == e && this.config.clinks.splice(r, 1);
        }
        return this;
    }),
    (OrgChart.clinkTemplates = {}),
    (OrgChart.clinkTemplates.orange = {
        defs:
            '<marker id="arrowOrange" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path fill="#F57C00" d="M 0 0 L 10 5 L 0 10 z" /></marker><marker id="dotOrange" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5"> <circle cx="5" cy="5" r="5" fill="#F57C00" /></marker>',
        link: '<path marker-start="url(#dotOrange)" marker-end="url(#arrowOrange)" stroke="#F57C00" stroke-width="2" fill="none" d="{d}" />',
        label: '<text fill="#F57C00" text-anchor="middle" x="{x}" y="{y}">{val}</text>',
    }),
    (OrgChart.clinkTemplates.blue = {
        defs:
            '<marker id="arrowBlue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path fill="#039BE5" d="M 0 0 L 10 5 L 0 10 z" /></marker><marker id="dotBlue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5"> <circle cx="5" cy="5" r="5" fill="#039BE5" /></marker>',
        link: '<path marker-start="url(#dotBlue)" marker-end="url(#arrowBlue)" stroke="#039BE5" stroke-width="2" fill="none" d="{d}" />',
        label: '<text fill="#039BE5"  text-anchor="middle" x="{x}" y="{y}">{val}</text>',
    }),
    (OrgChart.clinkTemplates.yellow = {
        defs:
            '<marker id="arrowYellow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path fill="#FFCA28" d="M 0 0 L 10 5 L 0 10 z" /></marker><marker id="dotYellow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5"> <circle cx="5" cy="5" r="5" fill="#FFCA28" /></marker>',
        link: '<path marker-start="url(#dotYellow)" marker-end="url(#arrowYellow)" stroke="#FFCA28" stroke-width="2" fill="none" d="{d}" />',
        label: '<text fill="#FFCA28"  text-anchor="middle" x="{x}" y="{y}">{val}</text>',
    }),
    void 0 === OrgChart && (OrgChart = {}),
    OrgChart.events.on("renderdefs", function (t, e) {
        for (var r = 0; r < t.config.slinks.length; r++) {
            var i = t.config.slinks[r].template;
            i || (i = "orange");
            var a = OrgChart.slinkTemplates[i];
            e.defs += a.defs;
        }
    }),
    OrgChart.events.on("render", function (t, e) {
        t._slinks(t, e);
    }),
    (OrgChart.prototype._slinks = function (S, A) {
        var I = "",
            M = this.getScale(),
            L = A.res.boundary;
        function t(t, e, r) {
            var i = [],
                a = null,
                n = "left",
                o = t.lcn ? t.lcn : "base",
                l = S._layoutConfigs[o];
            switch (l.orientation) {
                case OrgChart.orientation.top:
                case OrgChart.orientation.top_left:
                case OrgChart.orientation.bottom:
                case OrgChart.orientation.bottom_left:
                    e.x > t.x && (n = "right");
                    break;
                case OrgChart.orientation.left:
                case OrgChart.orientation.left_top:
                case OrgChart.orientation.right:
                case OrgChart.orientation.right_top:
                    (n = "top"), e.y > t.y && (n = "bottom");
            }
            var s = OrgChart.t(t.templateName, t.min, M),
                h = l.levelSeparation;
            ((t.parent && t.parent.layout == OrgChart.mixed) || (t.parent && t.parent.layout == OrgChart.tree)) && (h = l.mixedHierarchyNodesSeparation);
            var c = { p: t.x + t.w / 2 + s.expandCollapseSize, q: t.y, r: t.x + t.w / 2 + s.expandCollapseSize, s: L.minY + h };
            if (t.level == e.level)
                switch (((a = e), l.orientation)) {
                    case OrgChart.orientation.top:
                    case OrgChart.orientation.top_left:
                        i.push([c.p, c.q]), i.push([c.p, c.q - h / 3]), (s = OrgChart.t(a.templateName, a.min, M)), i.push([a.x + a.w / 2 + s.expandCollapseSize, i[i.length - 1][1]]), i.push([i[i.length - 1][0], a.y]);
                        break;
                    case OrgChart.orientation.bottom:
                    case OrgChart.orientation.bottom_left:
                        (c.q = t.y + t.h),
                            (c.s = L.maxY - h),
                            i.push([c.p, c.q]),
                            i.push([c.r, t.y + t.h + h / 3]),
                            (s = OrgChart.t(a.templateName, a.min, M)),
                            i.push([a.x + a.w / 2 + s.expandCollapseSize, i[i.length - 1][1]]),
                            i.push([i[i.length - 1][0], a.y + a.h]);
                        break;
                    case OrgChart.orientation.left:
                    case OrgChart.orientation.left_top:
                        (c.p = t.x),
                            (c.q = t.y + t.h / 2 + s.expandCollapseSize),
                            (c.r = L.minX - h),
                            (c.s = t.y + t.h / 2 + s.expandCollapseSize),
                            i.push([c.p, c.q]),
                            i.push([t.x - h / 3, c.q]),
                            (s = OrgChart.t(a.templateName, a.min, M)),
                            i.push([i[i.length - 1][0], a.y + a.h / 2 + s.expandCollapseSize]),
                            i.push([a.x, i[i.length - 1][1]]);
                        break;
                    case OrgChart.orientation.right:
                    case OrgChart.orientation.right_top:
                        (c.p = t.x + t.w),
                            (c.q = t.y + t.h / 2 + s.expandCollapseSize),
                            (c.r = L.maxX + h),
                            (c.s = t.y + t.h / 2 + s.expandCollapseSize),
                            i.push([c.p, c.q]),
                            i.push([t.x + t.w + h / 3, c.q]),
                            (s = OrgChart.t(a.templateName, a.min, M)),
                            i.push([i[i.length - 1][0], a.y + a.h / 2 + s.expandCollapseSize]),
                            i.push([a.x + a.w, i[i.length - 1][1]]);
                }
            else {
                switch (l.orientation) {
                    case OrgChart.orientation.top:
                    case OrgChart.orientation.top_left:
                        i.push([c.p, c.q]), i.push([c.r, t.y - h / 3]);
                        break;
                    case OrgChart.orientation.bottom:
                    case OrgChart.orientation.bottom_left:
                        (c.q = t.y + t.h), (c.s = L.maxY - h), i.push([c.p, c.q]), i.push([c.r, t.y + t.h + h / 3]);
                        break;
                    case OrgChart.orientation.left:
                    case OrgChart.orientation.left_top:
                        (c.p = t.x), (c.q = t.y + t.h / 2 + s.expandCollapseSize), (c.r = L.minX - h), (c.s = t.y + t.h / 2 + s.expandCollapseSize), i.push([c.p, c.q]), i.push([t.x - h / 3, c.q]);
                        break;
                    case OrgChart.orientation.right:
                    case OrgChart.orientation.right_top:
                        (c.p = t.x + t.w), (c.q = t.y + t.h / 2 + s.expandCollapseSize), (c.r = L.maxX + h), (c.s = t.y + t.h / 2 + s.expandCollapseSize), i.push([c.p, c.q]), i.push([t.x + t.w + h / 3, c.q]);
                }
                for (var d = t; null == a; ) {
                    var g = !1,
                        p = d.parent,
                        f = p.leftNeighbor,
                        u = p.rightNeighbor;
                    if ((p.id == e.id ? (a = p) : OrgChart._intersects(p, c, S.config) && ((c = OrgChart._addPoint(p, i, S.config, c, n)), (g = !0)), p.id != e.id)) {
                        for (; f; ) {
                            if (f.id == e.id) {
                                a = f;
                                break;
                            }
                            OrgChart._intersects(f, c, S.config) && ((c = OrgChart._addPoint(f, i, S.config, c, n)), (g = !0)), (f = f.leftNeighbor);
                        }
                        for (; u; ) {
                            if (u.id == e.id) {
                                a = u;
                                break;
                            }
                            OrgChart._intersects(u, c, S.config) && ((c = OrgChart._addPoint(u, i, S.config, c, n)), (g = !0)), (u = u.rightNeighbor);
                        }
                    }
                    if (!g) {
                        var m = i[i.length - 1][0],
                            C = 0;
                        if (p.parent)
                            switch (((h = l.levelSeparation), (p.parent.layout != OrgChart.mixed && p.parent.layout != OrgChart.tree) || (h = l.mixedHierarchyNodesSeparation), l.orientation)) {
                                case OrgChart.orientation.top:
                                case OrgChart.orientation.top_left:
                                    C = p.parent.y + p.parent.h + h * (2 / 3);
                                    break;
                                case OrgChart.orientation.bottom:
                                case OrgChart.orientation.bottom_left:
                                    C = p.parent.y - h * (2 / 3);
                                    break;
                                case OrgChart.orientation.left:
                                case OrgChart.orientation.left_top:
                                    (m = p.parent.x + p.parent.w + h * (2 / 3)), (C = i[i.length - 1][1]);
                                    break;
                                case OrgChart.orientation.right:
                                case OrgChart.orientation.right_top:
                                    (m = p.parent.x - h * (2 / 3)), (C = i[i.length - 1][1]);
                            }
                        i.push([m, C]);
                    }
                    d = p;
                }
                switch (((s = OrgChart.t(a.templateName, a.min, M)), i.splice(i.length - 1, 1), l.orientation)) {
                    case OrgChart.orientation.top:
                    case OrgChart.orientation.top_left:
                        i.push([a.x + a.w / 2 + s.expandCollapseSize, i[i.length - 1][1]]), i.push([i[i.length - 1][0], a.y + a.h]);
                        break;
                    case OrgChart.orientation.bottom:
                    case OrgChart.orientation.bottom_left:
                        i.push([a.x + a.w / 2 + s.expandCollapseSize, i[i.length - 1][1]]), i.push([i[i.length - 1][0], a.y]);
                        break;
                    case OrgChart.orientation.left:
                    case OrgChart.orientation.left_top:
                        i.push([i[i.length - 1][0], a.y + a.h / 2 + s.expandCollapseSize]), i.push([a.x + a.w, i[i.length - 1][1]]);
                        break;
                    case OrgChart.orientation.right:
                    case OrgChart.orientation.right_top:
                        i.push([i[i.length - 1][0], a.y + a.h / 2 + s.expandCollapseSize]), i.push([a.x, i[i.length - 1][1]]);
                }
            }
            var y = E.template;
            y || (y = "orange");
            var v = null;
            switch ((s = OrgChart.slinkTemplates[y]).labelPosition) {
                case "start":
                    v = { x: i[1][0], y: i[1][1] };
                    break;
                case "middle":
                    var x = Math.ceil(i.length / 2);
                    v = (function (t, e) {
                        return { x: (t[0] + e[0]) / 2, y: (t[1] + e[1]) / 2 };
                    })(i[x], i[x - 1]);
                    break;
                case "end":
                    v = { x: i[i.length - 2][0], y: i[i.length - 2][1] };
            }
            r && (i = i.reverse()), (i[0] = "M" + i[0].join(","));
            for (var O = 1; O < i.length; O++) i[O] = "L" + i[O].join(",");
            var b = i.join(" ");
            if (((I += '<g c-link-from="{from}" c-link-to="{to}">'.replace("{from}", t.id).replace("{to}", e.id) + s.link.replaceAll("{d}", b)), E.label)) {
                var w = s.label.replace("{x}", v.x).replace("{y}", v.y).replace("{val}", E.label),
                    k = OrgChart._getLabelSize(w),
                    _ = -k.height / 2;
                switch (l.orientation) {
                    case OrgChart.orientation.bottom:
                    case OrgChart.orientation.bottom_left:
                        _ = k.height;
                }
                I += s.label
                    .replace("{x}", v.x)
                    .replace("{y}", v.y + _)
                    .replace("{val}", E.label);
            }
            (I += OrgChart.grCloseTag), (A.content += I);
        }
        for (var e = 0; e < this.config.slinks.length; e++) {
            var E = this.config.slinks[e];
            if (-1 != A.res.visibleNodeIds.indexOf(E.from) && -1 != A.res.visibleNodeIds.indexOf(E.to)) {
                var r = S.getNode(E.from),
                    i = S.getNode(E.to);
                r.level >= i.level ? t(r, i, !1) : t(i, r, !0);
            }
        }
    }),
    (OrgChart.prototype.addSlink = function (t, e, r, i) {
        return this.removeClink(t, e), this.config.slinks.push({ from: t, to: e, label: r, template: i }), this;
    }),
    (OrgChart.prototype.removeSlink = function (t, e) {
        for (var r = this.config.slinks.length - 1; 0 <= r; r--) {
            var i = this.config.slinks[r];
            i.from == t && i.to == e && this.config.slinks.splice(r, 1);
        }
        return this;
    }),
    (OrgChart.slinkTemplates = {}),
    (OrgChart.slinkTemplates.orange = {
        defs:
            '<marker id="arrowSlinkOrange" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path fill="#F57C00" d="M 0 0 L 10 5 L 0 10 z" /></marker><marker id="dotSlinkOrange" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5"> <circle cx="5" cy="5" r="5" fill="#F57C00" /></marker>',
        link: '<path stroke-dasharray="4, 2" marker-start="url(#dotSlinkOrange)" marker-end="url(#arrowSlinkOrange)" stroke-linejoin="round" stroke="#F57C00" stroke-width="2" fill="none" d="{d}" />',
        label: '<text dominant-baseline="middle" fill="#F57C00" alignment-baseline="middle" text-anchor="middle" x="{x}" y="{y}">{val}</text>',
        labelPosition: "middle",
    }),
    (OrgChart.slinkTemplates.blue = {
        defs:
            '<marker id="arrowSlinkBlue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path fill="#039BE5" d="M 0 0 L 10 5 L 0 10 z" /></marker><marker id="dotSlinkBlue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5"> <circle cx="5" cy="5" r="5" fill="#039BE5" /></marker>',
        link: '<path stroke-dasharray="4, 2" marker-start="url(#dotSlinkBlue)" marker-end="url(#arrowSlinkBlue)" stroke-linejoin="round" stroke="#039BE5" stroke-width="2" fill="none" d="{d}" />',
        label: '<text fill="#039BE5" text-anchor="middle" x="{x}" y="{y}">{val}</text>',
        labelPosition: "middle",
    }),
    (OrgChart.slinkTemplates.yellow = {
        defs:
            '<marker id="arrowSlinkYellow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path fill="#FFCA28" d="M 0 0 L 10 5 L 0 10 z" /></marker><marker id="dotSlinkYellow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5"> <circle cx="5" cy="5" r="5" fill="#FFCA28" /></marker>',
        link: '<path stroke-dasharray="4, 2" marker-start="url(#dotSlinkYellow)" marker-end="url(#arrowSlinkYellow)" stroke-linejoin="round" stroke="#FFCA28" stroke-width="2" fill="none" d="{d}" />',
        label: '<text  fill="#FFCA28" text-anchor="middle" x="{x}" y="{y}">{val}</text>',
        labelPosition: "middle",
    });
