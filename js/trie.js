// Defines the node object
var Node = function(options) {
  options || (options = {});  // If there are no options, set options to an empty hash
  this.parent = options.parent; // Set the parent of the node
  this.children = options.children || {}; // If children, set the children. Otherwise, create an empty hash
  this.value = options.value; // Set the value of the node
  this.stop = options.stop;  // Set the node as a stop node if needed
};

var Trie = function() {
  this.head = new Node();  // Create the empty head node of the trie

  // Inserts string into the Trie.
  this.insert = function(string) {
    this._insert(string, this.head); // No setup needed, call the recursive function
  };

  this._insert = function(substring, node) {  // Takes in the remaining string and the node to add a child to
    var char = substring.slice(0,1);  // Grab the first character of the string. NOTE! Slice does not change the value of string
    var newNode = node.children[char]; // See if the node to be created already exists
    if (!newNode) {  // If the node to be created doesn't exist yet
      newNode = new Node({ value: char, parent: node });  // Create the node with a value and set the parent
      node.children[char] = newNode;  // Set the child of the parent as the newly created node
    }
    if (substring.length == 1) { // If the string length is 1 (i.e. we're at the last node to create)
      newNode.stop = true; // Set the stop value to true
    } else { // If the string has more characters remaining
      this._insert(substring.slice(1),newNode); // Recursive call for the newly created node. Note the string.slice(1) to pass in the smaller string
    }
  };

  // Returns true if string is in the trie. Returns false otherwise.
  this.includes = function(string) {
    if (string && string.length > 0) { // Check to see if the string exists and isn't empty
      return this._includes(string, this.head);  // No other setup needed, start with the string and the head node
    }
  };

  // Recursive function. Returns true if string is in the trie. Returns false
  // otherwise.
  this._includes = function(substring, node) { // Takes in the remaining string and the node to check the children of
    var char = substring.slice(0,1); // Grab the first character of the string
    var child = node.children[char]; // Grab the child if it exists
    if (!child) {  // If the child doesn't exist
      return false;  // Basecase, return false
    } else { // Otherwise, the child does exist
      if (substring.length == 1 && child.stop) { // Check to see if we're at the end of the string and the child node is a stop node
        return true; // Basecase, return true, we found the string!
      } else if (substring.length == 1) {  // Check to see if we're at the end of the string
        return false;  // Basecase, the child exists but isn't a stop node, return false
      } else { // Otherwise the string isn't at the end and the child exists
        return this._includes(substring.slice(1), child);  // Recursive call for the child node with the remaining string
      }
    }
  };

  // Search for all strings that have 'prefix' as the prefix.
  //
  // Returns Array of Strings.
  this.search = function(prefix) {  // Uses the findLastNode and iterate methods for easier solving
    if (typeof prefix != "string") { // If the prefix isn't a string
      prefix = ""  // Set prefix to an empty string
    }
    sol = this.iterate(this.findLastNode(prefix)); // Call the iterate function on the node that is returned from the findLastNode function.
    prefixWithoutLastLetter = prefix.slice(0,prefix.length - 1); // Remove the last letter of the prefix for appending purposes

    for (var i = 0; i < sol.length; i++) { // Run through all the elements in the sol array
      sol[i] = (prefixWithoutLastLetter + sol[i]);  // For each element, which is a string, append the prefix to the front of the string
    }
    return sol;
  };

  // Find the node that correspond to the last character in the string.
  //
  // Returns Node.
  this.findLastNode = function(string) {
    if (!string || string == "") { // If there is no string or the string is empty
      return this.head;  // Basecase, return the head node
    } else { // Otherwise there is a string
      return this._findLastNode(string, this.head);  // Call the recursive function
    }
  };

  // Recursive helper function for .findLastNode
  this._findLastNode = function(string, node) {  // Take in the remaining string and the node to check the children of
    var char = string.slice(0,1); // Grab the first character of the string
    var child = node.children[char]; // Grab the child of the node if there is one with a key of char
    if (!child) { // If there is no child
      return null;  // Basecase, return null
    } else if (string.length == 1) { // If the string is at the end (and the child exists)
      return child; // Basecase, return the child
    } else { // Otherwise the string has more than 1 char and the child exists
      return this._findLastNode(string.slice(1), child); // Recursive call on the child node with the remaining string
    }
  }

  // Given a node, return all the strings that are part of this node.
  //
  // Returns Array of Strings.
  this.iterate = function(node) {
    if (!node) {  // If there is no node
      return [];  // Return an empty array
    } else {
      return this._iterate(node); //Call the recursive function
    }
  };

  // Recursive helper function for .iterate
  this._iterate = function(node) {  // Take in the node to grab the children of and return the value if it is a stop node
    var sol = [] // Set an empty solution hash
    for (var child in node.children) {  // For each child the node has (This is also the base case, will not have a recursive call if the node has no children)
      sol = sol.concat(this._iterate(node.children[child]));  // Recursive call on the child node, concat the result to the sol array
    }
    if (node.value) { // If the node has a value (i.e., isn't the head node)
      for (var i = 0; i < sol.length; i++) { // For every element in the sol array
        sol[i] = (node.value + sol[i]); // Append the current nodes value to the beginning of the element
      }
    }
    if (node.stop) {  // If the node is a stop node,
      sol.push(node.value); // Add the current node's value to the sol array
    }
    return sol; // Return the sol array
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

