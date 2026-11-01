import { WBDataViewer as v } from "@wbc-ui/dataviewer";
import { resolveComponent as r, openBlock as u, createBlock as p, normalizeStyle as F, withCtx as n, createVNode as i, createTextVNode as c, toDisplayString as f, createElementVNode as N, mergeProps as V, createElementBlock as D, Fragment as M, renderList as O, createCommentVNode as h } from "vue";
const j = (t, o) => {
  const l = t.__vccOpts || t;
  for (const [m, e] of o)
    l[m] = e;
  return l;
};
function z() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
}
function G(t) {
  if (typeof t == "string") return t;
  if (t === void 0) return "undefined";
  if (typeof t == "function") return t.name ? `function ${t.name}()` : "function()";
  if (typeof t == "symbol" || typeof t == "bigint") return t.toString();
  try {
    const o = /* @__PURE__ */ new WeakSet();
    return JSON.stringify(t, function(m, e) {
      if (typeof e == "bigint") return e.toString();
      if (typeof e == "object" && e !== null) {
        if (o.has(e)) return "[Circular]";
        o.add(e);
      }
      return e;
    });
  } catch {
    return String(t);
  }
}
function R(t, o = 60) {
  const l = G(t);
  return l.length <= o ? l : l.slice(0, o) + "…";
}
const J = {
  name: "WBAlert",
  components: {
    WBDataViewer: v
  },
  props: {
    title: {
      type: String,
      default: "WBC Alert"
    },
    items: {
      default: () => [],
      validator: () => !0
    },
    layout: {
      type: Object,
      default: () => null
    },
    mode: {
      type: String,
      default: "prod"
    }
  },
  emits: ["close"],
  data() {
    return {
      isClosed: !1,
      isExpanded: !0,
      float: !0,
      rColor: z(),
      randomLeft: Math.floor(Math.random() * 10) + "%"
    };
  },
  computed: {
    resolvedItems() {
      return Array.isArray(this.items) ? this.items : this.items != null ? [this.items] : [];
    },
    computedStyle() {
      const t = {
        position: "fixed",
        top: "0%",
        left: this.randomLeft,
        zIndex: 10,
        height: this.isExpanded ? "60%" : "15%",
        width: "auto",
        maxWidth: "520px",
        padding: "0",
        transition: "height 0.25s ease"
      }, o = this.layout && this.layout.style ? this.layout.style : {}, l = this.float ? {} : { position: "relative" };
      return { ...t, ...o, ...l };
    }
  },
  methods: {
    handleClose() {
      this.isClosed = !0, this.$emit("close");
    },
    shouldRenderItem(t) {
      return !(typeof t == "string" && t.startsWith("%c"));
    },
    truncateLabel: R
  }
};
function P(t, o, l, m, e, s) {
  const S = r("VToolbarTitle"), g = r("VSpacer"), _ = r("VIcon"), y = r("VBtn"), C = r("VTooltip"), b = r("VToolbar"), k = r("VListItemTitle"), w = r("VListItem"), E = r("WBDataViewer"), I = r("VListGroup"), T = r("VList"), B = r("VExpandTransition"), L = r("VContainer"), W = r("VCard");
  return !e.isClosed && s.resolvedItems.length > 0 ? (u(), p(W, {
    key: 0,
    color: e.rColor,
    style: F(s.computedStyle),
    class: "wb-alert"
  }, {
    default: n(() => [
      i(b, {
        density: "compact",
        color: e.rColor,
        variant: "flat"
      }, {
        default: n(() => [
          i(S, { class: "text-subtitle-2" }, {
            default: n(() => [
              c(f(l.title), 1)
            ]),
            _: 1
          }),
          i(g),
          i(C, { location: "bottom" }, {
            activator: n(({ props: a }) => [
              i(y, V({ icon: "" }, a, {
                "aria-label": e.float ? "Switch to Fixed" : "Switch to Float",
                onClick: o[0] || (o[0] = (d) => e.float = !e.float)
              }), {
                default: n(() => [
                  i(_, null, {
                    default: n(() => [...o[2] || (o[2] = [
                      c("mdi-drag-variant", -1)
                    ])]),
                    _: 1
                  })
                ]),
                _: 1
              }, 16, ["aria-label"])
            ]),
            default: n(() => [
              N("span", null, f(e.float ? "Switch to Fixed" : "Switch to Float"), 1)
            ]),
            _: 1
          }),
          i(y, {
            icon: "",
            "aria-label": "Close",
            onClick: s.handleClose
          }, {
            default: n(() => [
              i(_, null, {
                default: n(() => [...o[3] || (o[3] = [
                  c("mdi-close", -1)
                ])]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["onClick"])
        ]),
        _: 1
      }, 8, ["color"]),
      i(L, {
        fluid: "",
        class: "pa-2"
      }, {
        default: n(() => [
          i(B, null, {
            default: n(() => [
              e.isExpanded ? (u(), p(T, {
                key: 0,
                density: "compact",
                opened: e.isExpanded ? s.resolvedItems.map((a, d) => "item-" + d) : []
              }, {
                default: n(() => [
                  (u(!0), D(M, null, O(s.resolvedItems, (a, d) => (u(), p(I, {
                    key: "alert-item-" + d,
                    value: "item-" + d
                  }, {
                    activator: n(({ props: A }) => [
                      i(w, V({ ref_for: !0 }, A), {
                        default: n(() => [
                          i(k, { class: "text-caption font-weight-medium text-truncate" }, {
                            default: n(() => [
                              c(f(s.truncateLabel(a, 60)), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1040)
                    ]),
                    default: n(() => [
                      s.shouldRenderItem(a) ? (u(), p(E, {
                        key: 0,
                        value: a
                      }, null, 8, ["value"])) : h("", !0)
                    ]),
                    _: 2
                  }, 1032, ["value"]))), 128))
                ]),
                _: 1
              }, 8, ["opened"])) : h("", !0)
            ]),
            _: 1
          }),
          i(y, {
            variant: "text",
            block: "",
            onClick: o[1] || (o[1] = (a) => e.isExpanded = !e.isExpanded)
          }, {
            default: n(() => [
              i(_, null, {
                default: n(() => [
                  c(f(e.isExpanded ? "mdi-chevron-up" : "mdi-chevron-down"), 1)
                ]),
                _: 1
              }),
              c(" " + f(e.isExpanded ? "Collapse" : "Expand"), 1)
            ]),
            _: 1
          })
        ]),
        _: 1
      })
    ]),
    _: 1
  }, 8, ["color", "style"])) : h("", !0);
}
const q = /* @__PURE__ */ j(J, [["render", P]]), x = /* @__PURE__ */ new WeakSet(), H = function(t, o = {}) {
  x.has(t) || (x.add(t), t.component("WBAlert", q));
}, U = { install: H };
export {
  q as WBAlert,
  U as default
};
