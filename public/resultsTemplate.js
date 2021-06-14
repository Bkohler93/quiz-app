(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['results'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"answers\">You scored "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"numCorrect") || (depth0 != null ? lookupProperty(depth0,"numCorrect") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"numCorrect","hash":{},"data":data,"loc":{"start":{"line":1,"column":32},"end":{"line":1,"column":46}}}) : helper)))
    + "</div>";
},"useData":true});
})();