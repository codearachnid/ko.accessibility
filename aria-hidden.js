ko.bindingHandlers.accessibility_AriaHidden = {
  init: function (element, valueAccessor, allBindingsAccessor, viewModel) {
    element.setAttribute( "aria-hidden", (!valueAccessor()).toString() );
  },
  update: function (element, valueAccessor) {
    element.setAttribute( "aria-hidden", (!valueAccessor()).toString() );
  }
};

ko.bindingHandlers['visible'].preprocess = function(value, name, addBinding) {
  addBinding('accessibility_AriaHidden', value);
  return value.toString();
};
