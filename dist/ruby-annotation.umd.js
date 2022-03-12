(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global["ruby-annotation"] = factory());
})(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  var Ruby = /*#__PURE__*/function () {
    function Ruby(_ref) {
      var api = _ref.api;

      _classCallCheck(this, Ruby);

      this.api = api;
      this.button = null;
      this._state = false;
      this.baseTag = 'RUBY';
      this.subTag = 'RT';
      this.baseClass = 'cdx-ruby';
      this.subClass = 'cdx-rt';
    }

    _createClass(Ruby, [{
      key: "render",
      value: function render() {
        // called when user selected text
        this.button = document.createElement('button');
        this.button.type = 'button';
        this.button.textContent = '読'; // this.button.innerHTML = '<svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.2762 0L17 5.58621L8.54696 15L0 5.58621L3.00552 0H5.8232H8.64088H11.4586H14.2762Z" fill="#D3493F"/><path d="M14.2762 0L17 5.58621H11.4116H5.8232H0L3.00552 0L5.8232 5.58621L8.64088 0L11.4116 5.58621L14.2762 0Z" fill="#EC5F59"/><path d="M17 5.58618L8.54696 15L0 5.58618H5.8232L8.54696 15L11.4116 5.58618H17Z" fill="#B63831"/></svg>';

        this.button.classList.add(this.api.styles.inlineToolButton);
        this.button.classList.add('cdx-ruby__button');
        return this.button;
      }
    }, {
      key: "surround",
      value: function surround(range) {
        //called when user pressed the button
        if (this.state) {
          this.unwrap(range);
          return;
        }

        this.wrap(range);
      }
    }, {
      key: "wrap",
      value: function wrap(range) {
        var selectedText = range.extractContents();
        var ruby = document.createElement(this.baseTag);
        var rt = document.createElement(this.subTag);
        ruby.classList.add(this.baseClass);
        ruby.appendChild(selectedText);
        rt.appendChild(document.createTextNode('')); //temp

        rt.classList.add(this.subClass);
        ruby.appendChild(rt);
        range.insertNode(ruby);
        this.api.selection.expandToTag(ruby);
      }
    }, {
      key: "unwrap",
      value: function unwrap(range) {
        var foundTag = this.api.selection.findParentTag(this.baseTag, this.baseClass) || this.api.selection.findParentTag(this.subTag, this.subClass);

        if (foundTag.tagName === this.baseTag) {
          var rt = foundTag.querySelector('rt');
          if (rt) rt.remove();
          var text = foundTag.textContent;
          foundTag.remove();
          range.insertNode(document.createTextNode(text));
        } else {
          var ruby = foundTag.parentElement;
          foundTag.remove();
          var _text = ruby.textContent;
          ruby.remove();
          range.insertNode(_text);
        }
      }
    }, {
      key: "renderActions",
      value: function renderActions() {
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('cdx-wrap-input');
        var hintText = document.createElement('span');
        hintText.classList.add('cdx-hint');
        hintText.innerText = '読み方:';
        this.wrapper.appendChild(hintText);
        this.subTextInput = document.createElement('input');
        this.subTextInput.type = 'text';
        this.subTextInput.placeholder = 'なになに';
        this.subTextInput.classList.add('cdx-rt__text');
        this.wrapper.append(this.subTextInput);
        this.wrapper.hidden = true;
        return this.wrapper;
      }
    }, {
      key: "showActions",
      value: function showActions(foundTag) {
        var _this = this;

        if (foundTag.tagName === this.baseTag) {
          var rt = foundTag.querySelector('rt');
          this.subTextInput.value = rt.textContent || '';

          this.subTextInput.oninput = function () {
            rt.textContent = _this.subTextInput.value;
          };
        } else if (foundTag.tagName === this.subTag) {
          this.subTextInput.oninput = function () {
            foundTag.textContent = _this.subTextInput.value;
          };
        }

        this.wrapper.hidden = false;
        this.subTextInput.focus();
      }
    }, {
      key: "hideActions",
      value: function hideActions() {
        this.subTextInput.oninput = null;
        this.wrapper.hidden = true;
      }
    }, {
      key: "checkState",
      value: function checkState() {
        // called when user selected text, to check if the format is on
        var foundTag = this.api.selection.findParentTag(this.baseTag) || this.api.selection.findParentTag(this.subTag);
        this.state = !!foundTag;

        if (this.state) {
          this.showActions(foundTag);
        }
      }
    }], [{
      key: "isInline",
      get: function get() {
        return true;
      }
    }, {
      key: "state",
      get: function get() {
        return this._state;
      },
      set: function set(newState) {
        this._state = newState;
        this.button.classList.toggle(this.api.styles.inlineToolButtonActive, this._state);
      }
    }, {
      key: "sanitize",
      get: function get() {
        return {
          ruby: {
            class: 'cdx-ruby'
          },
          rt: {
            class: 'cdx-rt'
          }
        };
      }
    }, {
      key: "shortcut",
      get: function get() {
        return 'CMD+r';
      }
    }]);

    return Ruby;
  }();

  return Ruby;

}));
