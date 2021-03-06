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
// 1. Define Return Type
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
  // 3. Return Helper function
  return helper(root).isBalanced;
};

// 2. Define Helper function
/**
 * 
 * @param {TreeNode} node 
 * @return {ReturnType}
 */
const helper = function(node) {
  // 4. Base Case
  if (node === null) {
    return new ReturnType(true, 0);
  }

  // 5. Recursive Case
  // 5.1 Find left subtree
  // left is ReturnType, not a TreeNode
  let left = helper(node.left);
  // 5.2 Find right subtree
  // right is ReturnType, not a TreeNode
  let right = helper(node.right);

  // 5.3 Handle false cases
  if (!left.isBalanced || !right.isBalanced) return new ReturnType(false, -1);

  if (Math.abs(left.maxDepth - right.maxDepth) > 1) return new ReturnType(false, -1);

  // 5.4 Handle true case
  return new ReturnType(true, Math.max(left.maxDepth, right.maxDepth) + 1);
};

/**
 * Leetcode Fundamental: 11/14 Update
 * Failure:
 * 1. Fail to use isbalanced property in Command
 * 2. Fail to find the position to update maxHeight
 * 3. Fail to use a recursion helper function
 * 4. Fail to compare left subtree and right subtree and generate false
 * 
 * Runtime: 68 ms
 */
const isBalanced = function(root) {
  return helper(root).isBalanced;
};

const helper = (node) => {
  if (node === null) return Command(true, 0);

  let left = helper(node.left);
  let right = helper(node.right);

  // Handle false case
  if (!left.isBalanced || !right.isBalanced) return Command(false, -1);

  // Generate false case
  if (Math.abs(left.maxHeight - right.maxHeight) > 1) return Command(false, -1);
  
  // Handle true case
  return Command(true, Math.max(left.maxHeight, right.maxHeight) + 1);
};

function Command(isBalanced, maxHeight) {
  return {
    isBalanced,
    maxHeight
  }
}