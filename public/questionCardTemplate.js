(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['questionCard'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"question-card hidden\">\n  <h3>Question <span id=\"questNum\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"number") || (depth0 != null ? lookupProperty(depth0,"number") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"number","hash":{},"data":data,"loc":{"start":{"line":2,"column":35},"end":{"line":2,"column":45}}}) : helper)))
    + "</span> of</h3>\n  <p id=\"question\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"text") || (depth0 != null ? lookupProperty(depth0,"text") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data,"loc":{"start":{"line":3,"column":19},"end":{"line":3,"column":27}}}) : helper)))
    + "</p>\n  <div class=\"ans-container\">\n    <div class=\"ans\">\n      <input type=\"radio\" name=\"ans\" class=\"a\" />\n      <label id=\"ans-one\" for=\"ans-one\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"A") || (depth0 != null ? lookupProperty(depth0,"A") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"A","hash":{},"data":data,"loc":{"start":{"line":7,"column":40},"end":{"line":7,"column":45}}}) : helper)))
    + "</label>\n    </div>\n    <div class=\"ans\">\n      <input type=\"radio\" name=\"ans\" class=\"b\" />\n      <label id=\"ans-two\" for=\"ans-two\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"B") || (depth0 != null ? lookupProperty(depth0,"B") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"B","hash":{},"data":data,"loc":{"start":{"line":11,"column":40},"end":{"line":11,"column":45}}}) : helper)))
    + "</label>\n    </div>\n    <div class=\"ans\">\n      <input type=\"radio\" name=\"ans\" class=\"c\" />\n      <label id=\"ans-three\" for=\"ans-three\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"C") || (depth0 != null ? lookupProperty(depth0,"C") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"C","hash":{},"data":data,"loc":{"start":{"line":15,"column":44},"end":{"line":15,"column":49}}}) : helper)))
    + "</label>\n    </div>\n    <div class=\"ans\">\n      <input type=\"radio\" name=\"ans\" class=\"d\" />\n      <label id=\"ans-four\" for=\"ans-four\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"D") || (depth0 != null ? lookupProperty(depth0,"D") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"D","hash":{},"data":data,"loc":{"start":{"line":19,"column":42},"end":{"line":19,"column":47}}}) : helper)))
    + "</label>\n    </div>\n  </div>\n</div>";
},"useData":true});
})();