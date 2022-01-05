"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tree = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Tree = /*#__PURE__*/function () {
  function Tree() {
    var _this = this;

    _classCallCheck(this, Tree);

    this.createNewNode = function (value) {
      return {
        value: value
      };
    };

    this.InsertIntoCurrentNode = function (currentNode) {
      var value = currentNode.value;

      var traverse = function traverse(node) {
        if (value > node.value) {
          if (!node.right) node.right = currentNode;else traverse(node.right);
        } else {
          if (!node.left) node.left = currentNode;else traverse(node.left);
        }
      };

      traverse(_this.root);
    };
  }

  _createClass(Tree, [{
    key: "getRoot",
    value: function getRoot() {
      return this.root;
    }
  }, {
    key: "insert",
    value: function insert(value) {
      var currentNode = this.createNewNode(value);

      if (!this.root) {
        this.root = currentNode;
      } else {
        this.InsertIntoCurrentNode(currentNode);
      }
    }
  }, {
    key: "contains",
    value: function contains(value) {
      var travers = function travers(node) {
        if (!node) return false;else if (value === node.value) {
          return true;
        } else if (value < node.value) {
          return travers(node.left);
        } else if (value > node.value) {
          return travers(node.right);
        }
        return false;
      };

      return travers(this.root);
    }
  }, {
    key: "findMin",
    value: function findMin() {
      var node = this.root;

      while (node) {
        if (!node.left) {
          return node.value;
        } else node = node.left;
      }

      return undefined;
    }
  }, {
    key: "findMax",
    value: function findMax() {
      var node = this.root;

      while (node) {
        if (!node.right) {
          return node.value;
        } else node = node.right;
      }

      return undefined;
    }
  }, {
    key: "preOrder",
    value: function preOrder() {
      var results = [];

      var traverse = function traverse(node) {
        results.push(node.value);
        node.left && traverse(node.left);
        node.right && traverse(node.right);
      };

      this.root && traverse(this.root);
      return results;
    }
  }, {
    key: "inOrder",
    value: function inOrder() {
      var results = [];

      var traverse = function traverse(node) {
        node.left && traverse(node.left);
        results.push(node.value);
        node.right && traverse(node.right);
      };

      this.root && traverse(this.root);
      return results;
    }
  }, {
    key: "postOrder",
    value: function postOrder() {
      var results = [];

      var traverse = function traverse(node) {
        node.left && traverse(node.left);
        node.right && traverse(node.right);
        results.push(node.value);
      };

      this.root && traverse(this.root);
      return results;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.root = undefined;
    }
  }]);

  return Tree;
}();

exports.Tree = Tree;