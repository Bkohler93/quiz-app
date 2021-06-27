(function () {
  var template = Handlebars.template,
    templates = (Handlebars.templates = Handlebars.templates || {});
  templates["answerCard"] = template({
    compiler: [8, ">= 4.3.0"],
    main: function (container, depth0, helpers, partials, data) {
      return (
        '<div class="ans">\n  <input type="radio" name="ans" class="ansRadio" />\n  <label id="ans-one" for="ans-one">' +
        container.escapeExpression(container.lambda(depth0, depth0)) +
        "</label>\n</div>"
      );
    },
    useData: true,
  });
})();
