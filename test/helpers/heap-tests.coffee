expect = require('expect.js')

module.exports = (Heap) ->
  'use strict'

  heap = null

  beforeEach ->
    heap = new Heap()

  describe 'insert', ->
    it 'should insert items into the heap', ->
      heap.insert(1, null)
      heap.insert(2, null)
      heap.insert(3, null)
      heap.insert(4, null)
      heap.insert(5, null)
      expect(heap.size()).to.be(5)

    it 'should return the inserted node', ->
      ret = heap.insert 1, { 'foo': 'bar' }
      expect(ret.key).to.equal(1)
      expect(ret.value).to.eql({ 'foo': 'bar'})

  describe 'extractMinimum', ->
    describe 'given an empty heap',->
      it 'should return undefined', ->
        expect(heap.extractMinimum()).to.be(undefined)

    it 'should extract the minimum item from a heap', ->
      node5 = heap.insert(5, null)
      node3 = heap.insert(3, null)
      node4 = heap.insert(4, null)
      node1 = heap.insert(1, null)
      node2 = heap.insert(2, null)
      expect(heap.extractMinimum().key).to.equal(node1.key)
      expect(heap.extractMinimum().key).to.equal(node2.key)
      expect(heap.extractMinimum().key).to.equal(node3.key)
      expect(heap.extractMinimum().key).to.equal(node4.key)
      expect(heap.extractMinimum().key).to.equal(node5.key)

    it 'should extract the minimum item from a jumbled heap', ->
      node1 = heap.insert(1, null)
      node4 = heap.insert(4, null)
      node3 = heap.insert(3, null)
      node5 = heap.insert(5, null)
      node2 = heap.insert(2, null)
      expect(heap.extractMinimum().key).to.equal(node1.key)
      expect(heap.extractMinimum().key).to.equal(node2.key)
      expect(heap.extractMinimum().key).to.equal(node3.key)
      expect(heap.extractMinimum().key).to.equal(node4.key)
      expect(heap.extractMinimum().key).to.equal(node5.key)

    it 'should extract the minimum item from a heap containing negative items', ->
      node1 = heap.insert(-9, null)
      node4 = heap.insert(6, null)
      node3 = heap.insert(3, null)
      node5 = heap.insert(10, null)
      node2 = heap.insert(-4, null)
      expect(heap.extractMinimum().key).to.equal(node1.key)
      expect(heap.extractMinimum().key).to.equal(node2.key)
      expect(heap.extractMinimum().key).to.equal(node3.key)
      expect(heap.extractMinimum().key).to.equal(node4.key)
      expect(heap.extractMinimum().key).to.equal(node5.key)

  describe 'findMinimum', ->
    it 'should return the minimum item from the heap', ->
      heap.insert(5, null)
      heap.insert(3, null)
      heap.insert(1, null)
      heap.insert(4, null)
      heap.insert(2, null)
      expect(heap.findMinimum().key).to.be(1)

  describe 'isEmpty', ->
    it 'should return whether the heap is empty', ->
      expect(heap.isEmpty()).to.be(true)
      heap.insert(1, null)
      expect(heap.isEmpty()).to.be(false)
      heap.extractMinimum()
      expect(heap.isEmpty()).to.be(true)

  # binomial heap does not implement
  if Heap.prototype.decreaseKey
    describe 'decreaseKey', ->
      describe 'given a non-existent node', ->
        it 'should throw an exception', ->
          expect ->
            heap.decreaseKey(undefined, 2)
            .toThrow('Cannot decrease key of non-existent node')

      describe 'given a new key larger than the old key', ->
        it 'should throw an exception', ->
          expect ->
            node = heap.insert(1, null)
            heap.decreaseKey(node, 2)
            .toThrow('New key is larger than old key')

      it 'should decrease the minimum node', ->
        node1 = heap.insert(1, null)
        heap.insert(2, null)
        heap.decreaseKey(node1, -3)
        key = heap.findMinimum().key
        expect(key).to.equal(node1.key)
        expect(key).to.be(-3)

      it 'should decrease and bubble up a non-minimum node', ->
        heap.insert(1, null)
        node2 = heap.insert(2, null)
        heap.decreaseKey(node2, -3)
        key = heap.findMinimum().key
        expect(key).to.equal(node2.key)
        expect(key).to.equal(-3)

      it 'should decrease and bubble up a non-minimum node in a large heap', ->
        heap.insert(13, null)
        heap.insert(26, null)
        heap.insert(3, null)
        heap.insert(-6, null)
        node5 = heap.insert(27, null)
        heap.insert(88, null)
        heap.insert(59, null)
        heap.insert(-10, null)
        heap.insert(16, null)
        heap.decreaseKey(node5, -11)
        expect(heap.findMinimum().key).to.equal(node5.key)

      it 'should leave a valid tree', ->
        heap.insert(13, null)
        heap.insert(26, null)
        heap.insert(3, null)
        heap.insert(-6, null)
        heap.insert(27, null)
        node6 = heap.insert(88, null)
        heap.insert(59, null)
        heap.insert(-10, null)
        heap.insert(16, null)
        heap.decreaseKey(node6, -8)
        expect(heap.extractMinimum().key).to.equal(-10)
        expect(heap.extractMinimum().key).to.equal(-8)
        expect(heap.extractMinimum().key).to.equal(-6)
        expect(heap.extractMinimum().key).to.equal(3)
        expect(heap.extractMinimum().key).to.equal(13)
        expect(heap.extractMinimum().key).to.equal(16)
        expect(heap.extractMinimum().key).to.equal(26)
        expect(heap.extractMinimum().key).to.equal(27)
        expect(heap.extractMinimum().key).to.equal(59)

  # binomial heap does not implement
  if Heap.prototype.delete
    describe 'delete', ->
      it 'should delete the head of the heap', ->
        node1 = heap.insert(1, null)
        node2 = heap.insert(2, null)
        heap.delete(node1)
        expect(heap.extractMinimum()).to.equal(node2)
        expect(heap.isEmpty()).to.be(true)

      it 'should delete a node in the middle of the heap', ->
        node3 = heap.insert(13, null)
        node4 = heap.insert(26, null)
        node2 = heap.insert(3, null)
        node1 = heap.insert(-6, null)
        node5 = heap.insert(27, null)
        expect(heap.size()).to.be(5)
        heap.delete(node3)
        expect(heap.size()).to.be(4)
        expect(heap.extractMinimum().key).to.equal(node1.key)
        expect(heap.extractMinimum().key).to.equal(node2.key)
        expect(heap.extractMinimum().key).to.equal(node4.key)
        expect(heap.extractMinimum().key).to.equal(node5.key)
        expect(heap.isEmpty()).to.be(true)

  # only binary search tree implements
  if Heap.prototype.buildHeap
    describe 'buildHeap', ->
      describe 'given invalid arguments', ->
        it 'should throw an exception', ->
          expect ->
            heap.buildHeap([1, 2, 3], [4, 5])
            .toThrow('Key array must be the same length as value array')

      describe 'given valid arguments', ->
        it 'should replace old heap with new array', ->
          heap.insert(2, null)
          heap.insert(3, null)
          heap.insert(1, null)
          expect(heap.size()).to.be(3)
          heap.buildHeap([9,8,7,6,5,4], [null,null,null,null,null,null])
          expect(heap.size()).to.be(6)
          expect(heap.extractMinimum().key).to.be(4)
          expect(heap.extractMinimum().key).to.be(5)
          expect(heap.extractMinimum().key).to.be(6)
          expect(heap.extractMinimum().key).to.be(7)
          expect(heap.extractMinimum().key).to.be(8)
          expect(heap.extractMinimum().key).to.be(9)
          expect(heap.isEmpty()).to.be(true)

  describe 'union', ->
    describe 'given 2 heaps of size 5 with overlapping elements added in order together', ->
      other = null

      beforeEach ->
        heap.insert(0, null)
        heap.insert(2, null)
        heap.insert(4, null)
        heap.insert(6, null)
        heap.insert(8, null)
        other = new Heap()
        other.insert(1, null)
        other.insert(3, null)
        other.insert(5, null)
        other.insert(7, null)
        other.insert(9, null)
        expect(heap.size()).to.be(5)
        expect(other.size()).to.be(5)

      it 'should union the 2 heaps together', ->
        heap.union(other)
        expect(heap.size()).to.be(10)
        for i in [0..9]
          expect(heap.extractMinimum().key).to.be(i)
        expect(heap.isEmpty()).to.be(true)

    describe 'given 2 heaps of size 5 with overlapping elements added in reverse order together', ->
      other = null

      beforeEach ->
        heap.insert(9, null)
        heap.insert(7, null)
        heap.insert(5, null)
        heap.insert(3, null)
        heap.insert(1, null)
        other = new Heap()
        other.insert(8, null)
        other.insert(6, null)
        other.insert(4, null)
        other.insert(2, null)
        other.insert(0, null)
        expect(heap.size()).to.be(5)
        expect(other.size()).to.be(5)

      it 'should union the 2 heaps together', ->
        heap.union(other)
        expect(heap.size()).to.be(10)
        for i in [0..9]
          expect(heap.extractMinimum().key).to.be(i)
        expect(heap.isEmpty()).to.be(true)

    describe 'given 2 heaps of size 5 with overlapping elements added in jumbled order together', ->
      other = null

      beforeEach ->
        heap.insert(9, null)
        heap.insert(2, null)
        heap.insert(6, null)
        heap.insert(1, null)
        heap.insert(3, null)
        other = new Heap()
        other.insert(4, null)
        other.insert(8, null)
        other.insert(5, null)
        other.insert(7, null)
        other.insert(0, null)
        expect(heap.size()).to.be(5)
        expect(other.size()).to.be(5)

      it 'should union the 2 heaps together', ->
        heap.union(other)
        expect(heap.size()).to.be(10)
        for i in [0..9]
          expect(heap.extractMinimum().key).to.be(i)
        expect(heap.isEmpty()).to.be(true)

      it 'should union the 2 heaps together after extracting the minimum from each', ->
        expect(heap.extractMinimum().key).to.be(1)
        expect(other.extractMinimum().key).to.be(0)
        heap.union(other)
        expect(heap.size()).to.be(8)
        for i in [2..9]
          expect(heap.extractMinimum().key).to.be(i)
        expect(heap.isEmpty()).to.be(true)

  describe 'clear', ->
    it 'should set the heap\'s size to 0', ->
      heap.insert(1, null)
      heap.insert(2, null)
      heap.insert(3, null)
      heap.clear()
      expect(heap.size()).to.be(0)

    it 'should set the heap\'s minimum node to undefined', ->
      heap.insert(1, null)
      heap.insert(2, null)
      heap.insert(3, null)
      heap.clear()
      expect(heap.findMinimum()).to.be(undefined)

  describe 'with non-reverse customCompare', ->
    it 'should give a min heap', ->
      heap = new Heap (a, b) ->
        return a.key - b.key

      node3 = heap.insert(13, null)
      node4 = heap.insert(26, null)
      node2 = heap.insert(3, null)
      node1 = heap.insert(-6, null)
      node5 = heap.insert(27, null)
      expect(heap.size()).to.be(5)
      expect(heap.extractMinimum().key).to.equal(node1.key)
      expect(heap.extractMinimum().key).to.equal(node2.key)
      expect(heap.extractMinimum().key).to.equal(node3.key)
      expect(heap.extractMinimum().key).to.equal(node4.key)
      expect(heap.extractMinimum().key).to.equal(node5.key)
      expect(heap.isEmpty()).to.be(true)

  describe 'with reverse customCompare', ->
    it 'should give a max heap', ->
      heap = new Heap (a, b) ->
        return b.key - a.key

      node3 = heap.insert(13, null)
      node4 = heap.insert(26, null)
      node2 = heap.insert(3, null)
      node1 = heap.insert(-6, null)
      node5 = heap.insert(27, null)
      expect(heap.size()).to.be(5)
      expect(heap.extractMinimum().key).to.equal(node5.key)
      expect(heap.extractMinimum().key).to.equal(node4.key)
      expect(heap.extractMinimum().key).to.equal(node3.key)
      expect(heap.extractMinimum().key).to.equal(node2.key)
      expect(heap.extractMinimum().key).to.equal(node1.key)
      expect(heap.isEmpty()).to.be(true)

  it 'should work with string keys', ->
    node3 = heap.insert('f', null)
    node4 = heap.insert('o', null)
    node2 = heap.insert('c', null)
    node1 = heap.insert('a', null)
    node5 = heap.insert('q', null)
    expect(heap.size()).to.be(5)
    expect(heap.extractMinimum().key).to.equal(node1.key)
    expect(heap.extractMinimum().key).to.equal(node2.key)
    expect(heap.extractMinimum().key).to.equal(node3.key)
    expect(heap.extractMinimum().key).to.equal(node4.key)
    expect(heap.extractMinimum().key).to.equal(node5.key)
    expect(heap.isEmpty()).to.be(true)
