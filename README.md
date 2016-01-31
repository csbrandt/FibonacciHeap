[![NPM](https://nodei.co/npm/fibonacciheap.png?downloads=true&stars=true)](https://nodei.co/npm/fibonacciheap/)

**WARNING:** This module is now deprecated. Please replace with @tyriar/fibonacci-heap

| Algorithm               | clear  | decreaseKey | delete     | extractMinimum | findMinimum | insert   | isEmpty | size | union    |
|------------------------|--------|-------------|------------|----------------|-------------|----------|---------|------|----------|
| [Fibonacci heap](https://en.wikipedia.org/wiki/Fibonacci_heap)  | Θ(1)\* | Θ(1)\*      | O(log n)\* | O(log n)\*     | Θ(1)        | Θ(1)     | Θ(1)    | Θ(n) | Θ(1)    |

\* amortised

Installation
-------------
    $ npm install fibonacciheap

Methods
--------
    clear()
> Clears the heap's data, making it an empty heap.
>

    decreaseKey(node, newKey)
> **node**:  *Node*, the node to be decreased
>
> **newKey**:  *number*, the new key value
>

    delete(node)
> **node**:  *Node*, the node to remove from the heap
>

    extractMinimum()
> **Returns**
>
> *Node*, the node with the smallest key

    findMinimum()
> **Returns**
>
> *Node*, the node with the smallest key

    insert(key, value)
> **key**:  *number*,  
>
> **value**:  *object*, any value associated with the node to insert
>
> **Returns**
>
> *Node*, the node that was inserted

    isEmpty()
> **Returns**
>
> *boolean*, true if the heap is empty

    size()  
> **Returns**
>
> *number*, the amount of nodes in the heap

    union(other)
> **other**:  *FibonacciHeap*, the FibonacciHeap to union with this one
>

    compare(a, b)  
> **a**:  *Node*, a node to compare
>
> **b**:  *Node*, a node to compare
>
> **Returns**
>
> *number*, 1 if `a` has a larger key than `b`, -1 if `b` has a larger key than `a` and 0 if they are equal

Running Tests
--------------
Install the development dependencies:

    $ npm install

Then run the tests:

    $ npm test

Code Coverage
--------------
Install the development dependencies:

    $ npm install

Then run coverage

    $ npm run coverage

View coverage reports

    $ firefox coverage/lcov-report/index.html

Browser Bundle
---------------
    $ npm run build
