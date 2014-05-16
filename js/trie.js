// Defines the node object
var Node = function(options) {
  options || (options = {});
  this.parent = options.parent;
  this.children = options.children || {};
  this.value = options.value;
  this.stop = options.stop;
};

var Trie = function() {
  this.head = new Node();

  // Inserts string into the Trie.
  this.insert = function(string) {
    this._insert(string, this.head)
  };

  this._insert = function(string, node) {
    var char = string.slice(0,1)
    var newNode = node.children[char]
    if (!newNode) {
      var opt = { value: char, parent: node }
      newNode = new Node(opt);
      node.children[char] = newNode
    }
    if (string.length == 1) {
      newNode.stop = true
    } else {
      this._insert(string.slice(1),newNode)
    }
  };

  // Returns true if string is in the trie. Returns false otherwise.
  this.includes = function(string) {
    if (string && string.length > 0) {
      return this._includes(string, this.head)
    }
  };

  // Recursive function. Returns true if string is in the trie. Returns false
  // otherwise.
  this._includes = function(substring, node) {
    var char = substring.slice(0,1)
    var child = node.children[char]
    if (!child) {
      return false
    } else {
      if (substring.length == 1 && child.stop) {
        return true
      } else if (substring.length == 1) {
        return false
      } else {
        return this._includes(substring.slice(1), child)
      }
    }
  };

  // Search for all strings that have 'prefix' as the prefix.
  //
  // Returns Array of Strings.
  this.search = function(prefix) {
    return this._search(this.head, prefix)
  };

  this._search = function(node, prefix) {
    if (typeof prefix != "string") {
      prefix = ""
    }
    if (prefix.length == 0) {
      return this.iterate(node);
    }
    var char = prefix.slice(0,1);
    var child = node.children[char];
    if (child) {
      var sol = this._search(child, prefix.slice(1))
      if (sol.length > 0 && node != this.head) {
        for (var i = 0; i < sol.length; i++) {
          sol[i] = (node.value + sol[i])
        }
      }
      return sol
    } else {
      return []
    }
  }

  // Find the node that correspond to the last character in the string.
  //
  // Returns Node.
  this.findLastNode = function(string) {
    if (!string) {
      return this.head
    }
    if (string == "") {
      return this.head
    } else {
      return this._findLastNode(string, this.head)
    }
  };

  // Recursive function.
  //
  // Base case:
  //   - No children nodes to continue traversal. Must mean string does not
  //     exist.
  //   - At the end of the string. Node exists, so return the current node.
  //
  // Recursive case:
  //   - Go down the correct child node.
  //
  this._findLastNode = function(string, node) {
    var char = string.slice(0,1)
    var child = node.children[char]
    if (!child) {
      return null
    } else if (string.length == 1) {
      return child
    } else {
      return this._findLastNode(string.slice(1), child)
    }
  }

  // Given a node, return all the strings that are part of this node.
  //
  // Returns Array of Strings.
  this.iterate = function(node) {
    if (!node) {
      return []
    } else {
      return this._iterate(node)
    }
  };

  // Recursive helper function for .iterate
  this._iterate = function(node) {
    var sol = []
    for(var child in node.children) {
      sol = sol.concat(this._iterate(node.children[child]))
    }
    if (node.value) {
      for (var i = 0; i < sol.length; i++) {
        sol[i] = (node.value + sol[i])
      }
    }
    if (node.stop) {
      sol.push(node.value)
    }
    return sol
  };

  // You may find this function useful for implementing iterate().
  //
  // Returns true if object is empty. False otherwise.
  this.isEmpty = function (object) {
    for(var i in object) {
      return false;
    }
    return true;
  }
};

