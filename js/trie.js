// Defines the node object
var Node = function() {

};

var Trie = function() {
  this.head = new Node();

  // Inserts string into the Trie.
  this.insert = function(string) {

  };

  this._insert = function(string, index, node) {

  };

  // Returns true if string is in the trie. Returns false otherwise.
  this.includes = function(string) {

  };

  // Recursive function. Returns true if string is in the trie. Returns false
  // otherwise.
  this._includes = function(substring, node) {

  };

  // Search for all strings that have 'prefix' as the prefix.
  //
  // Returns Array of Strings.
  this.search = function(prefix) {

  };

  // Find the node that correspond to the last character in the string.
  //
  // Returns Node.
  this.findLastNode = function(string) {

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
    if (!node) {

  }

  // Given a node, return all the strings that are part of this node.
  //
  // Returns Array of Strings.
  this.iterate = function(node) {

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

