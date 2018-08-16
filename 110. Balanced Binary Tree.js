/**
Given a binary tree, determine if it is height-balanced.

For this problem, a height-balanced binary tree is defined as:

a binary tree in which the depth of the two subtrees of every node never differ by more than 1.

Example 1:

Given the following tree [3,9,20,null,null,15,7]:

    3
   / \
  9  20
    /  \
   15   7
Return true.

Example 2:

Given the following tree [1,2,2,3,3,null,null,4,4]:

       1
      / \
     2   2
    / \
   3   3
  / \
 4   4
Return false.
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * ReturnType class used for maintain multiple values for each level
 */
class ReturnType {
  constructor(isBalanced, maxDepth) {
    this.isBalanced = isBalanced;
    this.maxDepth = maxDepth;
  }
}
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
const isBalanced = function(root) {
  return helper(root).isBalanced;
};

const helper = function(node) {
  // Base Case
  if (node === null) {
    return new ReturnType(true, 0);
  }

  // Recursive Case
  // Find left subtree
  let left = helper(node.left);
  // Find right subtree
  let right = helper(node.right);

  // Handle false cases
  if (!left.isBalanced || !right.isBalanced) return new ReturnType(false, -1);

  if (Math.abs(left.maxDepth - right.maxDepth) > 1) return new ReturnType(false, -1);

  // Handle true case
  return new ReturnType(true, Math.max(left.maxDepth, right.maxDepth) + 1);
};