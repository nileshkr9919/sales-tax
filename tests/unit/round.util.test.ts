import assert from 'assert';
import {roundUpToNearest005} from '../../src/utils/round.util';

describe('roundUpToNearest005', function () {
  it('rounds up to the nearest 0.05', function () {
    assert.strictEqual(roundUpToNearest005(0.562), 0.6);
    assert.strictEqual(roundUpToNearest005(1.0), 1.0);
    assert.strictEqual(roundUpToNearest005(1.01), 1.05);
    assert.strictEqual(roundUpToNearest005(1.06), 1.1);
    assert.strictEqual(roundUpToNearest005(0), 0);
  });
});
