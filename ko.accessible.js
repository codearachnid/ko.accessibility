// requires use of Knockout.JS

ko.bindingHandlers.accessible = {};

ko.bindingHandlers['accessible'].attribute = function(element, valueAccessor, allBindingsAccessor, data, vmContext, context) {
    var value = ko.utils.unwrapObservable(valueAccessor);
    var attributeKey = {
        "label": function() {
            return 'aria-label';
        },
        "selected": function() {
            element.setAttribute('role', 'button');
            return 'aria-selected';
        },
        "controls": function() {
            return 'aria-controls';
        }
    };
    if (typeof attributeKey[context.type] === 'function') {
        element.setAttribute(attributeKey[context.type](), (value).toString());
    }
};

ko.bindingHandlers['accessible'].hidden = function(element, valueAccessor, allBindingsAccessor, data, vmContext) {
    var value = ko.utils.unwrapObservable(valueAccessor);
    if (typeof(value) == 'undefined' || value > 0 || value === true) {
        value = false;
    } else {
        value = true;
    }
    element.setAttribute("aria-hidden", (value).toString());
};

ko.bindingHandlers['accessible'].update = function(element, valueAccessor, allBindingsAccessor, data, vmContext) {
    var value = ko.utils.unwrapObservable(valueAccessor);
    if (value !== null && typeof value === 'function') {
        for (key in value()) {
            var accessibleHandler = {
                "label": function() {
                    return {
                        'method': 'attribute',
                        'context': {
                            'type': 'label'
                        }
                    };
                },
                "hidden": function() {
                    return {
                        'method': 'hidden',
                        'context': null
                    };
                },
                "selected": function() {
                    return {
                        'method': 'attribute',
                        'context': {
                            'type': 'selected'
                        }
                    };
                },
                "controls": function() {
                    return {
                        'method': 'attribute',
                        'context': {
                            'type': 'controls'
                        }
                    };
                }
            };
            if (typeof accessibleHandler[key] === 'function') {
                // console.log(accessibleHandler[key](), value(), value()[key]);
                ko.bindingHandlers['accessible'][accessibleHandler[key]().method](element, value()[key], allBindingsAccessor, data, vmContext, accessibleHandler[key]().context);
            }
        }
    }
};


ko.bindingHandlers.accessible_AriaHidden = {
    update: function(element, valueAccessor) {
        ko.bindingHandlers['accessible'].hidden(element, valueAccessor);
    }
};

ko.bindingHandlers['visible'].preprocess = function(value, name, addBinding) {
    addBinding('accessible_AriaHidden', value);
    return value.toString();
};
