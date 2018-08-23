/**
 * 1. Construct instance variables 
 *      array
 *      compareFunc
 * 2. Initiate functions 3P + S
 *      peek()
 *      push(node)
 *      pop()
 *      size()
 * 3. Push(node): 
 *      a. push node to the array
 *      b. bubbleUp (swap currNode and parrentNode until compareFunc(parentNode, currNode) <= 0)
 * 4. Pop():
 *      a. if len == 0: return null
 *      b. get array[0] as min
 *      c. array[0] = array[len-1]
 *      d. array.pop()
 *      e. sinkDown (choose the smaller child as swapNode, swap currNode and swapNode until swapIdx == null)
 *      f. return min
 * 5. Remove(val):
 *      a. Find removeIdx
 *      b. If removeIdx == undefined: return 
 *      c. Swap(removeIdx, lastIdx)
 *      d. result = array.pop()
 *      e. bubbleUp(removeIdx)
 *      f. sinkDown(removeIdx)
 *      g. return result
 * 5. Helper functions:
 *      swap(idx1, Idx2)
 *      bubbleUp(startIdx)
 *      sinkDown(startIdx)
 * Note: 
 * 1. find parrent node index formula: 
 *      let parentIdx = Math.floor((currIdx + 1) / 2) - 1;
 * 2. Find children nodes index formula:
 *      let childRIdx = (currIdx + 1) * 2;
 *      let childLIdx = childRIdx - 1;
 */
class Heap {
    constructor(compareFunc) {
        this.array = [];
        // Default Min Heap
        this.compareFunc = compareFunc || function(a, b) {return a - b};
    }

    peek() {
        return this.array[0] || null;
    }

    push(node) {
        let arr = this.array;
        arr.push(node);
        // Bubble up start from last index
        this.bubbleUp(arr.length - 1);
    }

    pop() {
        let arr = this.array;
        let len = arr.length;
  
        if(len === 0) {
            return null;
        }
  
        let min = arr[0];
        arr[0] = arr[len - 1] // swap the last value with min value
  
        arr.pop();
  
        // Sink Down start from root
        this.sinkDown(0);
  
        return min;
    }

    size() {
        return this.array.length;
    }

    remove(val) {
        let arr = this.array;
        let removeIdx = null;

        // Linear time approach
        for (let i = 0; i < arr.length; i += 1) {
            if (this.compareFunc(arr[i], val) === 0) removeIdx = i;
        }

        if (removeIdx === null) return;

        this.swap(removeIdx, arr.length - 1);
        let result = arr.pop();

        // Handle if the removeIdx is the last index
        if (removeIdx < arr.length) {
            this.bubbleUp(removeIdx);
            this.sinkDown(removeIdx);
        }

        return result;
    }

    /**
     * Swap function 
     * Swap values in array must pass indecies in, because values are copied after passed in
     * 
     * @param {number} i
     * @param {number} j
     */
    swap(i, j) {
        let arr = this.array;
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  
    /**
     * To fix bubbleUp and sinkDown
     * 
     */
    bubbleUp(currIdx) {
        let arr = this.array;

        while(currIdx > 0) {
            /**
             * [1,2,3] 1 as root 2 as left child and 3 as right child      
             * 2 has idx = 1 and 3 has idx = 2    
             * 1/2 will result in parent idx = 0 and 2/2 will result in parent idx = 1. 
             * So we need to add one to them and -1 at the end
             */
            let parentIdx = Math.floor((currIdx + 1) / 2) - 1; 
            if(this.compareFunc(arr[parentIdx], arr[currIdx]) <= 0) {
                break;
            }
  
            this.swap(currIdx, parentIdx);
            currIdx = parentIdx;
        } 
    }
  
    sinkDown(currIdx) {
        let arr = this.array;
        let len = arr.length;
        let val = arr[currIdx]
  
        while(true) {
            let swapIdx = null;
            let childRIdx = (currIdx + 1) * 2; // root = 0 right child idx is (0 + 1)*2 = 2
            let childLIdx = childRIdx - 1; // right child idx - 1 = 1 for root's left child

            // Swap the parent node with smaller child node
            if(childLIdx < len && this.compareFunc(arr[childLIdx], val) < 0) {
                swapIdx = childLIdx;
            }
  
            if(childRIdx < len && this.compareFunc(arr[childRIdx], val) < 0 && this.compareFunc(arr[childRIdx], arr[childLIdx]) < 0) {
                swapIdx = childRIdx;
            }
  
            if(swapIdx === null) {
                break;
            }
  
            this.swap(currIdx, swapIdx);
            currIdx = swapIdx;
        }  
    }
}
  
let heap = new Heap((a, b) => b - a); // default min heap
heap.push(2);
heap.push(1);
heap.push(3);
heap.push(5);
heap.push(4);

console.log(heap.size()); // 5
console.log(heap.remove(3)); // 3
console.log(heap.pop()); // 5
console.log(heap.pop()); // 4
console.log(heap.pop()); // 2
console.log(heap.pop()); // 1
console.log(heap.pop()); // null
console.log(heap.size()); // 0