(function() {
  var FibonacciHeap, expect, heapHeavyTests, heapTests;

  expect = require('expect.js');

  heapTests = require('./helpers/heap-tests.js');

  heapHeavyTests = require('./helpers/heap-heavy-tests.js');

  FibonacciHeap = require('../');

  describe('fibonacci-heap', function() {
    'use strict';
    heapTests(FibonacciHeap);
    heapHeavyTests(FibonacciHeap);
    describe('calling insert 1000 times', function() {
      var heap;
      heap = null;
      beforeEach(function() {
        var i, num, results;
        heap = new FibonacciHeap();
        results = [];
        for (num = i = 0; i <= 999; num = ++i) {
          results.push(heap.insert(num, num));
        }
        return results;
      });
      it('should have a nodelist of length 1000', function() {
        var count, node;
        count = 0;
        node = heap.minNode;
        while (true) {
          count++;
          node = node.next;
          if (node === heap.minNode) {
            break;
          }
        }
        return expect(count).to.be(1000);
      });
      it('should have a nodelist of length 1000 (searching backwards)', function() {
        var count, node;
        count = 0;
        node = heap.minNode;
        while (true) {
          count++;
          node = node.prev;
          if (node === heap.minNode) {
            break;
          }
        }
        return expect(count).to.be(1000);
      });
      it('should have a nodelist with no parents or children', function() {
        var childCount, node, parentCount;
        childCount = 0;
        parentCount = 0;
        node = heap.minNode;
        while (true) {
          if (node.child) {
            childCount++;
          }
          if (node.parent) {
            parentCount++;
          }
          node = node.next;
          if (node === heap.minNode) {
            break;
          }
        }
        expect(childCount).to.be(0);
        return expect(parentCount).to.be(0);
      });
      it('should contain correct key-value pairs', function() {
        var invalidCount, node;
        invalidCount = 0;
        node = heap.minNode;
        while (true) {
          if (node.key !== node.value) {
            invalidCount++;
          }
          node = node.prev;
          if (node === heap.minNode) {
            break;
          }
        }
        return expect(invalidCount).to.be(0);
      });
      return describe('calling extractMinimum twice', function() {
        return it('should return the correct elements', function() {
          expect(heap.extractMinimum().key).to.be(0);
          return expect(heap.extractMinimum().key).to.be(1);
        });
      });
    });
    return describe('given a heap with a tree of degree 3', function() {
      var heap, node5, node6;
      heap = null;
      node5 = null;
      node6 = null;
      beforeEach(function() {
        heap = new FibonacciHeap();
        heap.insert(1);
        heap.insert(2);
        heap.insert(4);
        node5 = heap.insert(5);
        node6 = heap.insert(6);
        heap.insert(7);
        heap.insert(8);
        heap.insert(9);
        heap.insert(10);
        heap.extractMinimum();
        expect(heap.minNode.key).to.be(2);
        expect(heap.minNode.degree).to.be(3);
        expect(heap.minNode.prev).to.be(heap.minNode.prev);
        return expect(heap.minNode.next).to.be(heap.minNode.next);
      });
      describe('calling decreaseKey on a node to make it the minimum', function() {
        beforeEach(function() {
          return heap.decreaseKey(node6, 0);
        });
        it('should make the node the minimum', function() {
          return expect(heap.minNode.key).to.be(0);
        });
        return it('should cut the node from the tree', function() {
          expect(heap.minNode.prev.key).to.be(2);
          return expect(heap.minNode.next.key).to.be(2);
        });
      });
      describe('calling decreaseKey on a node to a value less than its parent (the condition to cut)', function() {
        beforeEach(function() {
          return heap.decreaseKey(node6, 3);
        });
        it('should retain the same minimum node', function() {
          return expect(heap.minNode.key).to.be(2);
        });
        it('should cut the node from the tree', function() {
          expect(heap.minNode.prev.key).to.be(3);
          return expect(heap.minNode.next.key).to.be(3);
        });
        return it('should not contain any cycles (regression test)', function() {
          return expect(heap.size()).to.be(8);
        });
      });
      return describe('calling delete on a node with children (the condition to cut)', function() {
        beforeEach(function() {
          return heap["delete"](node5);
        });
        it('should retain the same minimum node', function() {
          return expect(heap.minNode.key).to.be(2);
        });
        return it('should move its children on to the root list', function() {
          expect(heap.minNode.prev.key).not.to.be(heap.minNode.key);
          return expect(heap.minNode.next.key).not.to.be(heap.minNode.key);
        });
      });
    });
  });

}).call(this);
