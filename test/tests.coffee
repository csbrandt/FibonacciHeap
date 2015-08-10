expect = require('expect.js')
heapTests = require('./helpers/heap-tests.js')
heapHeavyTests = require('./helpers/heap-heavy-tests.js')
FibonacciHeap = require('../')

describe 'fibonacci-heap', ->
  'use strict'

  heapTests(FibonacciHeap)
  heapHeavyTests(FibonacciHeap)

  describe 'calling insert 1000 times', ->
    heap = null

    beforeEach ->
      heap = new FibonacciHeap()
      for num in [0..999]
        heap.insert(num, num)

    it 'should have a nodelist of length 1000', ->
      count = 0
      node = heap.minNode
      while true
        count++
        node = node.next
        break unless node isnt heap.minNode
      expect(count).to.be(1000)

    it 'should have a nodelist of length 1000 (searching backwards)', ->
      count = 0
      node = heap.minNode
      while true
        count++
        node = node.prev
        break unless node isnt heap.minNode
      expect(count).to.be(1000)

    it 'should have a nodelist with no parents or children', ->
      childCount = 0
      parentCount = 0
      node = heap.minNode
      while true
        if node.child
          childCount++

        if node.parent
          parentCount++

        node = node.next
        break unless node isnt heap.minNode
      expect(childCount).to.be(0)
      expect(parentCount).to.be(0)

    it 'should contain correct key-value pairs', ->
      invalidCount = 0
      node = heap.minNode
      while true
        if node.key isnt node.value
          invalidCount++

        node = node.prev
        break unless node isnt heap.minNode
      expect(invalidCount).to.be(0)

    describe 'calling extractMinimum twice', ->
      it 'should return the correct elements', ->
        expect(heap.extractMinimum().key).to.be(0)
        expect(heap.extractMinimum().key).to.be(1)

  describe 'given a heap with a tree of degree 3', ->
    heap = null
    node5 = null
    node6 = null

    beforeEach ->
      heap = new FibonacciHeap()
      heap.insert(1)
      heap.insert(2)
      heap.insert(4)
      node5 = heap.insert(5)
      node6 = heap.insert(6)
      heap.insert(7)
      heap.insert(8)
      heap.insert(9)
      heap.insert(10)
      # consolidate the heap (removing 1)
      heap.extractMinimum()
      expect(heap.minNode.key).to.be(2)
      expect(heap.minNode.degree).to.be(3)
      expect(heap.minNode.prev).to.be(heap.minNode.prev)
      expect(heap.minNode.next).to.be(heap.minNode.next)

    describe 'calling decreaseKey on a node to make it the minimum', ->
      beforeEach ->
        heap.decreaseKey(node6, 0)

      it 'should make the node the minimum', ->
        expect(heap.minNode.key).to.be(0)

      it 'should cut the node from the tree', ->
        expect(heap.minNode.prev.key).to.be(2)
        expect(heap.minNode.next.key).to.be(2)

    describe 'calling decreaseKey on a node to a value less than its parent (the condition to cut)', ->
      beforeEach ->
        heap.decreaseKey(node6, 3)

      it 'should retain the same minimum node', ->
        expect(heap.minNode.key).to.be(2)

      it 'should cut the node from the tree', ->
        expect(heap.minNode.prev.key).to.be(3)
        expect(heap.minNode.next.key).to.be(3)

      it 'should not contain any cycles (regression test)', ->
        expect(heap.size()).to.be(8)

    describe 'calling delete on a node with children (the condition to cut)', ->
      beforeEach ->
        heap.delete(node5)

      it 'should retain the same minimum node', ->
        expect(heap.minNode.key).to.be(2)

      it 'should move its children on to the root list', ->
        expect(heap.minNode.prev.key).not.to.be(heap.minNode.key)
        expect(heap.minNode.next.key).not.to.be(heap.minNode.key)
