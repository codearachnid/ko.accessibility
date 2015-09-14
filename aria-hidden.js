ko.bindingHandlers.accessibility_AriaHidden = {
  update: function (element, valueAccessor) {
    var value = valueAccessor();
    if( typeof(value) == 'function'){
      value = valueAccessor()();
    }
    if( typeof(value) == 'undefined' || value > 0 || value === true ){
      value = false;
    } else {
      value = true;
    }
    element.setAttribute( "aria-hidden", (value).toString() );
  }
};

ko.bindingHandlers['visible'].preprocess = function(value, name, addBinding) {
  addBinding('accessibility_AriaHidden', value);
  return value.toString();
};
