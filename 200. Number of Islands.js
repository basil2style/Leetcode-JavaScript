/**
Given a 2d grid map of '1's (land) and '0's (water), count the number of islands. 
An island is surrounded by water and is formed by connecting adjacent lands 
horizontally or vertically. You may assume all four edges of the grid are all 
surrounded by water.

Example 1:

Input:
11110
11010
11000
00000

Output: 1
Example 2:

Input:
11000
11000
00100
00011

Output: 3
 */
/**
 * Algorithm: DFS on Matrix
 */
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
  if (grid.length === 0 || grid[0].length === 0 || grid === null) {
    return 0;
  }

  let m = grid.length;
  let n = grid[0].length;
  let result = 0;
  const direction = [ [-1, 0], [0, 1], [1, 0], [0, -1]];

  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (grid[i][j] === '1') {
        result += 1;
        traverse(i, j);
      }
    }
  }

  return result;

  /**
   * Mark all neighbor grids
   * 
   * @param {Number} i 
   * @param {Number} j 
   */
  function traverse(i, j) {
    if (i < 0 || i >= m || j < 0 || j >= n) return;

    if (grid[i][j] === '1') {
      grid[i][j] = '2';

      for (let dir of direction) {
        let next_i = i + dir[0];
        let next_j = j + dir[1];
        traverse(next_i, next_j);
      }
    }
  }
};

const test1 = [ ['1', '1', '0', '0', '0'],
                ['1', '1', '0', '0', '0'],
                ['0', '0', '1', '0', '0'],
                ['0', '0', '0', '1', '1'] ];

const test2 = [["1","1","1"],["0","1","0"],["1","1","1"]]

/**
 * Leetcode Fundamental: 11/21 Update
 * 
 * Flood Fill
 * Failure:
 * 1. Fail to wrap recursive call in if (grid[i][j] === '1')
 *    Recursive call should handle cases from all inputs
 *    Should not depends on condition in for loops
 * 
 * T: O(mn)
 * 
 * Runtime: 68 ms
 */
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands2 = function(grid) {
  if (grid === undefined || grid.length === 0 || grid[0].length === 0) return 0;

  let m = grid.length;
  let n = grid[0].length;

  let result = 0;
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      if (grid[i][j] === '1') {
        result += 1;
        findConnected(grid, i, j); // grid easy to typo
      }
    }
  }

  return result;
};

const findConnected = (grid, i, j) => {
  if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length || grid[i][j] === '2') return;

  // check for recursion call:
  // 1. if cell is 1: mark visited cell as 2
  // 2. recursive call
  if (grid[i][j] === '1') {
    grid[i][j] = '2';

    let dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // up right down left
    for (let d of dirs) {
      let nextI = i + d[0];
      let nextJ = j + d[1];
      findConnected(grid, nextI, nextJ);
    }
  }
};

console.log(numIslands2(test1)); // 3
console.log(numIslands2(test2)); // 1
