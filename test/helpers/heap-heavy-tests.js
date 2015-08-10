(function() {
  var expect;

  expect = require('expect.js');

  module.exports = function(Heap) {
    'use strict';
    var heap;
    heap = null;
    beforeEach(function() {
      return heap = new Heap();
    });
    describe('when inserting 1000 in-order elements', function() {
      beforeEach(function() {
        var i, j, results;
        results = [];
        for (i = j = 0; j <= 999; i = ++j) {
          results.push(heap.insert(i, i));
        }
        return results;
      });
      return describe('then extracting 1000 elements', function() {
        beforeEach(function() {
          var i, j, results;
          results = [];
          for (i = j = 0; j <= 999; i = ++j) {
            results.push(heap.extractMinimum());
          }
          return results;
        });
        return it('should give an empty heap', function() {
          return expect(heap.isEmpty()).to.be(true);
        });
      });
    });
    describe('when inserting 1000 reversed elements', function() {
      beforeEach(function() {
        var i, j, results;
        results = [];
        for (i = j = 0; j <= 999; i = ++j) {
          results.push(heap.insert(i, i));
        }
        return results;
      });
      return describe('then extracting 1000 elements', function() {
        beforeEach(function() {
          var i, j, results;
          results = [];
          for (i = j = 0; j <= 999; i = ++j) {
            results.push(heap.extractMinimum());
          }
          return results;
        });
        return it('should give an empty heap', function() {
          return expect(heap.isEmpty()).to.be(true);
        });
      });
    });
    describe('when inserting 1000 pseudo-randomised elements', function() {
      beforeEach(function() {
        var i, j, results;
        results = [];
        for (i = j = 0; j <= 999; i = ++j) {
          if (i % 2 === 0) {
            results.push(heap.insert(i, i));
          } else {
            results.push(heap.insert(999 - i, 999 - i));
          }
        }
        return results;
      });
      return describe('then extracting 1000 elements', function() {
        beforeEach(function() {
          var i, j, results;
          results = [];
          for (i = j = 0; j <= 999; i = ++j) {
            results.push(heap.extractMinimum());
          }
          return results;
        });
        return describe('then extracting 1000 elements', function() {
          beforeEach(function() {});
          return it('should give an empty heap', function() {
            return expect(heap.isEmpty()).to.be(true);
          });
        });
      });
    });
    if (Heap.prototype.decreaseKey) {
      describe('when inserting, decreasing a key, then extracting', function() {
        return it('should be able to remove all elements', function() {
          var i, j, k, l, nodes;
          nodes = [];
          for (i = j = 0; j <= 999; i = ++j) {
            nodes.push(heap.insert(i, i));
          }
          heap.decreaseKey(nodes[20], -10);
          for (i = k = 500; k <= 1499; i = ++k) {
            heap.insert(i, i);
          }
          for (i = l = 0; l <= 1999; i = ++l) {
            heap.extractMinimum();
          }
          return expect(heap.isEmpty()).to.be(true);
        });
      });
      describe('when inserting, decreasing multiple keys, then extracting', function() {
        return it('should be able to remove all elements', function() {
          var i, j, k, l, nodes;
          nodes = [];
          for (i = j = 0; j <= 999; i = ++j) {
            nodes.push(heap.insert(i, i));
          }
          i = 0;
          while (true) {
            heap.decreaseKey(nodes[i], -i - 5);
            i += 50;
            if (!(i < 1000)) {
              break;
            }
          }
          for (i = k = 500; k <= 1499; i = ++k) {
            heap.insert(i, i);
          }
          for (i = l = 0; l <= 1999; i = ++l) {
            heap.extractMinimum();
          }
          return expect(heap.isEmpty()).to.be(true);
        });
      });
    }
    return it('should handle 1000 shuffled elements', function() {
      i;
      var counter, errorReported, i, input, j, k, l, output, swapWith, temp;
      input = [];
      for (i = j = 0; j <= 999; i = ++j) {
        input.push(i);
      }
      for (i = k = 0; k <= 999; i = ++k) {
        swapWith = Math.floor(Math.random() * 1000);
        temp = input[i];
        input[i] = input[swapWith];
        input[swapWith] = temp;
      }
      for (i = l = 0; l <= 999; i = ++l) {
        heap.insert(input[i], null);
      }
      output = [];
      errorReported = false;
      counter = 0;
      while (!heap.isEmpty()) {
        output.push(heap.extractMinimum().key);
        if (!errorReported && counter !== output[output.length - 1]) {
          expect('the heap property was not maintained').to.be('0, 1, 2, ..., 997, 998, 999');
          errorReported = true;
        }
        counter++;
      }
      return expect(output.length).to.be(1000);
    });
  };

}).call(this);
