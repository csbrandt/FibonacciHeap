expect = require('expect.js')

module.exports = (Heap) ->
  'use strict'

  heap = null

  beforeEach ->
    heap = new Heap()

  describe 'when inserting 1000 in-order elements', ->
    beforeEach ->
      for i in [0..999]
        heap.insert(i, i)

    describe 'then extracting 1000 elements', ->
      beforeEach ->
        for i in [0..999]
          heap.extractMinimum()

      it 'should give an empty heap', ->
        expect(heap.isEmpty()).to.be(true)

  describe 'when inserting 1000 reversed elements', ->
    beforeEach ->
      for i in [0..999]
        heap.insert(i, i)

    describe 'then extracting 1000 elements', ->
      beforeEach ->
        for i in [0..999]
          heap.extractMinimum()

      it 'should give an empty heap', ->
        expect(heap.isEmpty()).to.be(true)

  describe 'when inserting 1000 pseudo-randomised elements', ->
    beforeEach ->
      for i in [0..999]
        if i % 2 is 0
          heap.insert(i, i)
        else
          heap.insert(999 - i, 999 - i)

    describe 'then extracting 1000 elements', ->
      beforeEach ->
        for i in [0..999]
          heap.extractMinimum()

      describe 'then extracting 1000 elements', ->
        beforeEach ->

        it 'should give an empty heap', ->
          expect(heap.isEmpty()).to.be(true)

  if Heap.prototype.decreaseKey
    describe 'when inserting, decreasing a key, then extracting', ->
      it 'should be able to remove all elements', ->
        nodes = []
        for i in [0..999]
          nodes.push(heap.insert(i, i))

        heap.decreaseKey(nodes[20], -10)

        for i in [500..1499]
          heap.insert(i, i)

        for i in [0..1999]
          heap.extractMinimum()
        expect(heap.isEmpty()).to.be(true)

    describe 'when inserting, decreasing multiple keys, then extracting', ->
      it 'should be able to remove all elements', ->
        nodes = []
        for i in [0..999]
          nodes.push(heap.insert(i, i))

        i = 0
        while true
          heap.decreaseKey(nodes[i], -i - 5)
          i += 50
          break unless i < 1000

        for i in [500..1499]
          heap.insert(i, i)

        for i in [0..1999]
          heap.extractMinimum()
        expect(heap.isEmpty()).to.be(true)

  it 'should handle 1000 shuffled elements', ->
    i
    input = []
    for i in [0..999]
      input.push(i)
    # shuffle
    for i in [0..999]
      swapWith = Math.floor(Math.random() * 1000)
      temp = input[i]
      input[i] = input[swapWith]
      input[swapWith] = temp
    # insert
    for i in [0..999]
      heap.insert(input[i], null)
    # extract
    output = []
    errorReported = false
    counter = 0
    while not heap.isEmpty()
      output.push(heap.extractMinimum().key)
      if not errorReported and counter isnt output[output.length - 1]
        expect('the heap property was not maintained').to.be('0, 1, 2, ..., 997, 998, 999')
        errorReported = true
      counter++

    expect(output.length).to.be(1000)
