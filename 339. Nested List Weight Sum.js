/**
 * Given a nested list of integers, return the sum of all integers in the list weighted by their depth.

Each element is either an integer, or a list -- whose elements may also be integers or other lists.

Example 1:
Given the list [[1,1],2,[1,1]], return 10. (four 1's at depth 2, one 2 at depth 1)

Example 2:
Given the list [1,[4,[6]]], return 27. (one 1 at depth 1, one 4 at depth 2, and one 6 at depth 3; 1 + 4*2 + 6*3 = 27)
 */
/**
 * // This is the interface that allows for creating nested lists.
 * // You should not implement it, or speculate about its implementation
 * function NestedInteger() {
 *
 *     Return true if this NestedInteger holds a single integer, rather than a nested list.
 *     @return {boolean}
 *     this.isInteger = function() {
 *         ...
 *     };
 *
 *     Return the single integer that this NestedInteger holds, if it holds a single integer
 *     Return null if this NestedInteger holds a nested list
 *     @return {integer}
 *     this.getInteger = function() {
 *         ...
 *     };
 *
 *     Set this NestedInteger to hold a single integer equal to value.
 *     @return {void}
 *     this.setInteger = function(value) {
 *         ...
 *     };
 *
 *     Set this NestedInteger to hold a nested list and adds a nested integer elem to it.
 *     @return {void}
 *     this.add = function(elem) {
 *         ...
 *     };
 *
 *     Return the nested list that this NestedInteger holds, if it holds a nested list
 *     Return null if this NestedInteger holds a single integer
 *     @return {NestedInteger[]}
 *     this.getList = function() {
 *         ...
 *     };
 * };
 */
/**
 * @param {NestedInteger[]} nestedList
 * @return {number}
 */
 function depthSum(nestedList) {
    if (nestedList.length === 0) {
        return 0;
    }

    let stack = [];
    let sumValue = 0;

    for (let i = 0; i < nestedList.length; i += 1) {
        const nestListNode = { nextElem: nestedList[i], depth: 1};
        stack.push(nestListNode);
    }

    while (stack.length) {
        let curr = stack.pop();
        if (curr.nextElem.isInteger()) {
            sumValue += curr.nextElem.getInteger() * curr.depth;
        }
        else {
            let newNestedList = curr.nextElem.getList();
            for (let j = 0; j < newNestedList.length; j += 1) {
                const nextListNode = { nextElem: newNestedList[j], depth: curr.depth + 1};
                stack.push(nextListNode);
            }
        }
    }

    return sumValue;
 }
