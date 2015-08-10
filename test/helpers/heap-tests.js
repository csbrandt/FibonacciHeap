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
    describe('insert', function() {
      it('should insert items into the heap', function() {
        heap.insert(1, null);
        heap.insert(2, null);
        heap.insert(3, null);
        heap.insert(4, null);
        heap.insert(5, null);
        return expect(heap.size()).to.be(5);
      });
      return it('should return the inserted node', function() {
        var ret;
        ret = heap.insert(1, {
          'foo': 'bar'
        });
        expect(ret.key).to.equal(1);
        return expect(ret.value).to.eql({
          'foo': 'bar'
        });
      });
    });
    describe('extractMinimum', function() {
      describe('given an empty heap', function() {
        return it('should return undefined', function() {
          return expect(heap.extractMinimum()).to.be(void 0);
        });
      });
      it('should extract the minimum item from a heap', function() {
        var node1, node2, node3, node4, node5;
        node5 = heap.insert(5, null);
        node3 = heap.insert(3, null);
        node4 = heap.insert(4, null);
        node1 = heap.insert(1, null);
        node2 = heap.insert(2, null);
        expect(heap.extractMinimum().key).to.equal(node1.key);
        expect(heap.extractMinimum().key).to.equal(node2.key);
        expect(heap.extractMinimum().key).to.equal(node3.key);
        expect(heap.extractMinimum().key).to.equal(node4.key);
        return expect(heap.extractMinimum().key).to.equal(node5.key);
      });
      it('should extract the minimum item from a jumbled heap', function() {
        var node1, node2, node3, node4, node5;
        node1 = heap.insert(1, null);
        node4 = heap.insert(4, null);
        node3 = heap.insert(3, null);
        node5 = heap.insert(5, null);
        node2 = heap.insert(2, null);
        expect(heap.extractMinimum().key).to.equal(node1.key);
        expect(heap.extractMinimum().key).to.equal(node2.key);
        expect(heap.extractMinimum().key).to.equal(node3.key);
        expect(heap.extractMinimum().key).to.equal(node4.key);
        return expect(heap.extractMinimum().key).to.equal(node5.key);
      });
      return it('should extract the minimum item from a heap containing negative items', function() {
        var node1, node2, node3, node4, node5;
        node1 = heap.insert(-9, null);
        node4 = heap.insert(6, null);
        node3 = heap.insert(3, null);
        node5 = heap.insert(10, null);
        node2 = heap.insert(-4, null);
        expect(heap.extractMinimum().key).to.equal(node1.key);
        expect(heap.extractMinimum().key).to.equal(node2.key);
        expect(heap.extractMinimum().key).to.equal(node3.key);
        expect(heap.extractMinimum().key).to.equal(node4.key);
        return expect(heap.extractMinimum().key).to.equal(node5.key);
      });
    });
    describe('findMinimum', function() {
      return it('should return the minimum item from the heap', function() {
        heap.insert(5, null);
        heap.insert(3, null);
        heap.insert(1, null);
        heap.insert(4, null);
        heap.insert(2, null);
        return expect(heap.findMinimum().key).to.be(1);
      });
    });
    describe('isEmpty', function() {
      return it('should return whether the heap is empty', function() {
        expect(heap.isEmpty()).to.be(true);
        heap.insert(1, null);
        expect(heap.isEmpty()).to.be(false);
        heap.extractMinimum();
        return expect(heap.isEmpty()).to.be(true);
      });
    });
    if (Heap.prototype.decreaseKey) {
      describe('decreaseKey', function() {
        describe('given a non-existent node', function() {
          return it('should throw an exception', function() {
            return expect(function() {
              return heap.decreaseKey(void 0, 2).toThrow('Cannot decrease key of non-existent node');
            });
          });
        });
        describe('given a new key larger than the old key', function() {
          return it('should throw an exception', function() {
            return expect(function() {
              var node;
              node = heap.insert(1, null);
              return heap.decreaseKey(node, 2).toThrow('New key is larger than old key');
            });
          });
        });
        it('should decrease the minimum node', function() {
          var key, node1;
          node1 = heap.insert(1, null);
          heap.insert(2, null);
          heap.decreaseKey(node1, -3);
          key = heap.findMinimum().key;
          expect(key).to.equal(node1.key);
          return expect(key).to.be(-3);
        });
        it('should decrease and bubble up a non-minimum node', function() {
          var key, node2;
          heap.insert(1, null);
          node2 = heap.insert(2, null);
          heap.decreaseKey(node2, -3);
          key = heap.findMinimum().key;
          expect(key).to.equal(node2.key);
          return expect(key).to.equal(-3);
        });
        it('should decrease and bubble up a non-minimum node in a large heap', function() {
          var node5;
          heap.insert(13, null);
          heap.insert(26, null);
          heap.insert(3, null);
          heap.insert(-6, null);
          node5 = heap.insert(27, null);
          heap.insert(88, null);
          heap.insert(59, null);
          heap.insert(-10, null);
          heap.insert(16, null);
          heap.decreaseKey(node5, -11);
          return expect(heap.findMinimum().key).to.equal(node5.key);
        });
        return it('should leave a valid tree', function() {
          var node6;
          heap.insert(13, null);
          heap.insert(26, null);
          heap.insert(3, null);
          heap.insert(-6, null);
          heap.insert(27, null);
          node6 = heap.insert(88, null);
          heap.insert(59, null);
          heap.insert(-10, null);
          heap.insert(16, null);
          heap.decreaseKey(node6, -8);
          expect(heap.extractMinimum().key).to.equal(-10);
          expect(heap.extractMinimum().key).to.equal(-8);
          expect(heap.extractMinimum().key).to.equal(-6);
          expect(heap.extractMinimum().key).to.equal(3);
          expect(heap.extractMinimum().key).to.equal(13);
          expect(heap.extractMinimum().key).to.equal(16);
          expect(heap.extractMinimum().key).to.equal(26);
          expect(heap.extractMinimum().key).to.equal(27);
          return expect(heap.extractMinimum().key).to.equal(59);
        });
      });
    }
    if (Heap.prototype["delete"]) {
      describe('delete', function() {
        it('should delete the head of the heap', function() {
          var node1, node2;
          node1 = heap.insert(1, null);
          node2 = heap.insert(2, null);
          heap["delete"](node1);
          expect(heap.extractMinimum()).to.equal(node2);
          return expect(heap.isEmpty()).to.be(true);
        });
        return it('should delete a node in the middle of the heap', function() {
          var node1, node2, node3, node4, node5;
          node3 = heap.insert(13, null);
          node4 = heap.insert(26, null);
          node2 = heap.insert(3, null);
          node1 = heap.insert(-6, null);
          node5 = heap.insert(27, null);
          expect(heap.size()).to.be(5);
          heap["delete"](node3);
          expect(heap.size()).to.be(4);
          expect(heap.extractMinimum().key).to.equal(node1.key);
          expect(heap.extractMinimum().key).to.equal(node2.key);
          expect(heap.extractMinimum().key).to.equal(node4.key);
          expect(heap.extractMinimum().key).to.equal(node5.key);
          return expect(heap.isEmpty()).to.be(true);
        });
      });
    }
    if (Heap.prototype.buildHeap) {
      describe('buildHeap', function() {
        describe('given invalid arguments', function() {
          return it('should throw an exception', function() {
            return expect(function() {
              return heap.buildHeap([1, 2, 3], [4, 5]).toThrow('Key array must be the same length as value array');
            });
          });
        });
        return describe('given valid arguments', function() {
          return it('should replace old heap with new array', function() {
            heap.insert(2, null);
            heap.insert(3, null);
            heap.insert(1, null);
            expect(heap.size()).to.be(3);
            heap.buildHeap([9, 8, 7, 6, 5, 4], [null, null, null, null, null, null]);
            expect(heap.size()).to.be(6);
            expect(heap.extractMinimum().key).to.be(4);
            expect(heap.extractMinimum().key).to.be(5);
            expect(heap.extractMinimum().key).to.be(6);
            expect(heap.extractMinimum().key).to.be(7);
            expect(heap.extractMinimum().key).to.be(8);
            expect(heap.extractMinimum().key).to.be(9);
            return expect(heap.isEmpty()).to.be(true);
          });
        });
      });
    }
    describe('union', function() {
      describe('given 2 heaps of size 5 with overlapping elements added in order together', function() {
        var other;
        other = null;
        beforeEach(function() {
          heap.insert(0, null);
          heap.insert(2, null);
          heap.insert(4, null);
          heap.insert(6, null);
          heap.insert(8, null);
          other = new Heap();
          other.insert(1, null);
          other.insert(3, null);
          other.insert(5, null);
          other.insert(7, null);
          other.insert(9, null);
          expect(heap.size()).to.be(5);
          return expect(other.size()).to.be(5);
        });
        return it('should union the 2 heaps together', function() {
          var i, j;
          heap.union(other);
          expect(heap.size()).to.be(10);
          for (i = j = 0; j <= 9; i = ++j) {
            expect(heap.extractMinimum().key).to.be(i);
          }
          return expect(heap.isEmpty()).to.be(true);
        });
      });
      describe('given 2 heaps of size 5 with overlapping elements added in reverse order together', function() {
        var other;
        other = null;
        beforeEach(function() {
          heap.insert(9, null);
          heap.insert(7, null);
          heap.insert(5, null);
          heap.insert(3, null);
          heap.insert(1, null);
          other = new Heap();
          other.insert(8, null);
          other.insert(6, null);
          other.insert(4, null);
          other.insert(2, null);
          other.insert(0, null);
          expect(heap.size()).to.be(5);
          return expect(other.size()).to.be(5);
        });
        return it('should union the 2 heaps together', function() {
          var i, j;
          heap.union(other);
          expect(heap.size()).to.be(10);
          for (i = j = 0; j <= 9; i = ++j) {
            expect(heap.extractMinimum().key).to.be(i);
          }
          return expect(heap.isEmpty()).to.be(true);
        });
      });
      return describe('given 2 heaps of size 5 with overlapping elements added in jumbled order together', function() {
        var other;
        other = null;
        beforeEach(function() {
          heap.insert(9, null);
          heap.insert(2, null);
          heap.insert(6, null);
          heap.insert(1, null);
          heap.insert(3, null);
          other = new Heap();
          other.insert(4, null);
          other.insert(8, null);
          other.insert(5, null);
          other.insert(7, null);
          other.insert(0, null);
          expect(heap.size()).to.be(5);
          return expect(other.size()).to.be(5);
        });
        it('should union the 2 heaps together', function() {
          var i, j;
          heap.union(other);
          expect(heap.size()).to.be(10);
          for (i = j = 0; j <= 9; i = ++j) {
            expect(heap.extractMinimum().key).to.be(i);
          }
          return expect(heap.isEmpty()).to.be(true);
        });
        return it('should union the 2 heaps together after extracting the minimum from each', function() {
          var i, j;
          expect(heap.extractMinimum().key).to.be(1);
          expect(other.extractMinimum().key).to.be(0);
          heap.union(other);
          expect(heap.size()).to.be(8);
          for (i = j = 2; j <= 9; i = ++j) {
            expect(heap.extractMinimum().key).to.be(i);
          }
          return expect(heap.isEmpty()).to.be(true);
        });
      });
    });
    describe('clear', function() {
      it('should set the heap\'s size to 0', function() {
        heap.insert(1, null);
        heap.insert(2, null);
        heap.insert(3, null);
        heap.clear();
        return expect(heap.size()).to.be(0);
      });
      return it('should set the heap\'s minimum node to undefined', function() {
        heap.insert(1, null);
        heap.insert(2, null);
        heap.insert(3, null);
        heap.clear();
        return expect(heap.findMinimum()).to.be(void 0);
      });
    });
    describe('with non-reverse customCompare', function() {
      return it('should give a min heap', function() {
        var node1, node2, node3, node4, node5;
        heap = new Heap(function(a, b) {
          return a.key - b.key;
        });
        node3 = heap.insert(13, null);
        node4 = heap.insert(26, null);
        node2 = heap.insert(3, null);
        node1 = heap.insert(-6, null);
        node5 = heap.insert(27, null);
        expect(heap.size()).to.be(5);
        expect(heap.extractMinimum().key).to.equal(node1.key);
        expect(heap.extractMinimum().key).to.equal(node2.key);
        expect(heap.extractMinimum().key).to.equal(node3.key);
        expect(heap.extractMinimum().key).to.equal(node4.key);
        expect(heap.extractMinimum().key).to.equal(node5.key);
        return expect(heap.isEmpty()).to.be(true);
      });
    });
    describe('with reverse customCompare', function() {
      return it('should give a max heap', function() {
        var node1, node2, node3, node4, node5;
        heap = new Heap(function(a, b) {
          return b.key - a.key;
        });
        node3 = heap.insert(13, null);
        node4 = heap.insert(26, null);
        node2 = heap.insert(3, null);
        node1 = heap.insert(-6, null);
        node5 = heap.insert(27, null);
        expect(heap.size()).to.be(5);
        expect(heap.extractMinimum().key).to.equal(node5.key);
        expect(heap.extractMinimum().key).to.equal(node4.key);
        expect(heap.extractMinimum().key).to.equal(node3.key);
        expect(heap.extractMinimum().key).to.equal(node2.key);
        expect(heap.extractMinimum().key).to.equal(node1.key);
        return expect(heap.isEmpty()).to.be(true);
      });
    });
    return it('should work with string keys', function() {
      var node1, node2, node3, node4, node5;
      node3 = heap.insert('f', null);
      node4 = heap.insert('o', null);
      node2 = heap.insert('c', null);
      node1 = heap.insert('a', null);
      node5 = heap.insert('q', null);
      expect(heap.size()).to.be(5);
      expect(heap.extractMinimum().key).to.equal(node1.key);
      expect(heap.extractMinimum().key).to.equal(node2.key);
      expect(heap.extractMinimum().key).to.equal(node3.key);
      expect(heap.extractMinimum().key).to.equal(node4.key);
      expect(heap.extractMinimum().key).to.equal(node5.key);
      return expect(heap.isEmpty()).to.be(true);
    });
  };

}).call(this);
