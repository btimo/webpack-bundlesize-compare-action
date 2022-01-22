import getStatsDiff from '../src/get-stats-diff'
import {
  printAssetTablesByGroup,
  printTotalAssetTable
} from '../src/print-markdown'

import {test, expect} from '@jest/globals'

test('Shows stats when files are removed', () => {
  const statsDiff = getStatsDiff(
    require('./__mocks__/old-stats-assets.json'),
    require('./__mocks__/new-stats-assets.json')
  )
  expect(statsDiff).toEqual({
    added: [],
    bigger: [
      {
        diff: 260452,
        diffPercentage: 23.90567,
        name: 'app.bundle.js',
        new: {gzipSize: NaN, size: 1349951},
        old: {gzipSize: 304515, size: 1089499}
      }
    ],
    removed: [
      {
        diff: -127558,
        diffPercentage: -100,
        name: '296.chunk.js',
        new: {gzipSize: 0, size: 0},
        old: {gzipSize: 35889, size: 127558}
      },
      {
        diff: -58610,
        diffPercentage: -100,
        name: '288.chunk.js',
        new: {gzipSize: 0, size: 0},
        old: {gzipSize: 16720, size: 58610}
      },
      {
        diff: -56302,
        diffPercentage: -100,
        name: '920.chunk.js',
        new: {gzipSize: 0, size: 0},
        old: {gzipSize: 17495, size: 56302}
      },
      {
        diff: -45438,
        diffPercentage: -100,
        name: '912.chunk.js',
        new: {gzipSize: 0, size: 0},
        old: {gzipSize: 14657, size: 45438}
      },
      {
        diff: -27026,
        diffPercentage: -100,
        name: '699.chunk.js',
        new: {gzipSize: 0, size: 0},
        old: {gzipSize: 6287, size: 27026}
      }
    ],
    smaller: [
      {
        diff: -460,
        diffPercentage: -83.48457,
        name: 'manifest.json',
        new: {gzipSize: NaN, size: 91},
        old: {gzipSize: 151, size: 551}
      }
    ],
    total: {
      diff: -54942,
      diffPercentage: -3.91051,
      name: '7 -> 2',
      new: {gzipSize: NaN, size: 1350042},
      old: {gzipSize: 395714, size: 1404984}
    },
    unchanged: []
  })

  expect(printTotalAssetTable(statsDiff)).toEqual(`**Total**

Files count | Total bundle size | % Changed
----------- | ----------------- | ---------
7 -> 2 | 1.34 MB (gz: 386.44 KB) -> 1.29 MB (-53.65 KB) | -3.91%`)
  expect(printAssetTablesByGroup(statsDiff)).toEqual(`**Added**

No assets were added

**Removed**

Asset | File Size | % Changed
----- | --------- | ---------
296.chunk.js | 124.57 KB (gz: 35.05 KB) -> 0 Bytes (-124.57 KB) | -100%
288.chunk.js | 57.24 KB (gz: 16.33 KB) -> 0 Bytes (-57.24 KB) | -100%
920.chunk.js | 54.98 KB (gz: 17.08 KB) -> 0 Bytes (-54.98 KB) | -100%
912.chunk.js | 44.37 KB (gz: 14.31 KB) -> 0 Bytes (-44.37 KB) | -100%
699.chunk.js | 26.39 KB (gz: 6.14 KB) -> 0 Bytes (-26.39 KB) | -100%

**Bigger**

Asset | File Size | % Changed
----- | --------- | ---------
app.bundle.js | 1.04 MB (gz: 297.38 KB) -> 1.29 MB (+254.35 KB) | +23.91%

**Smaller**

Asset | File Size | % Changed
----- | --------- | ---------
manifest.json | 551 Bytes (gz: 151 Bytes) -> 91 Bytes (-460 Bytes) | -83.48%

**Unchanged**

No assets were unchanged`)
})

test('Shows stats when files are added', () => {
  const statsDiff = getStatsDiff(
    require('./__mocks__/new-stats-assets.json'),
    require('./__mocks__/old-stats-assets.json')
  )
  expect(statsDiff).toEqual({
    added: [
      {
        diff: 127558,
        diffPercentage: Infinity,
        name: '296.chunk.js',
        new: {gzipSize: 35889, size: 127558},
        old: {gzipSize: 0, size: 0}
      },
      {
        diff: 58610,
        diffPercentage: Infinity,
        name: '288.chunk.js',
        new: {gzipSize: 16720, size: 58610},
        old: {gzipSize: 0, size: 0}
      },
      {
        diff: 56302,
        diffPercentage: Infinity,
        name: '920.chunk.js',
        new: {gzipSize: 17495, size: 56302},
        old: {gzipSize: 0, size: 0}
      },
      {
        diff: 45438,
        diffPercentage: Infinity,
        name: '912.chunk.js',
        new: {gzipSize: 14657, size: 45438},
        old: {gzipSize: 0, size: 0}
      },
      {
        diff: 27026,
        diffPercentage: Infinity,
        name: '699.chunk.js',
        new: {gzipSize: 6287, size: 27026},
        old: {gzipSize: 0, size: 0}
      }
    ],
    bigger: [
      {
        diff: 460,
        diffPercentage: 505.49451,
        name: 'manifest.json',
        new: {gzipSize: 151, size: 551},
        old: {gzipSize: NaN, size: 91}
      }
    ],
    removed: [],
    smaller: [
      {
        diff: -260452,
        diffPercentage: -19.29344,
        name: 'app.bundle.js',
        new: {gzipSize: 304515, size: 1089499},
        old: {gzipSize: NaN, size: 1349951}
      }
    ],
    total: {
      diff: 54942,
      diffPercentage: 4.06965,
      name: '2 -> 7',
      new: {gzipSize: 395714, size: 1404984},
      old: {gzipSize: NaN, size: 1350042}
    },
    unchanged: []
  })

  expect(printTotalAssetTable(statsDiff)).toEqual(`**Total**

Files count | Total bundle size | % Changed
----------- | ----------------- | ---------
2 -> 7 | 1.29 MB -> 1.34 MB (gz: 386.44 KB) (+53.65 KB) | +4.07%`)
  expect(printAssetTablesByGroup(statsDiff)).toEqual(`**Added**

Asset | File Size | % Changed
----- | --------- | ---------
296.chunk.js | 0 Bytes -> 124.57 KB (gz: 35.05 KB) (+124.57 KB) | -
288.chunk.js | 0 Bytes -> 57.24 KB (gz: 16.33 KB) (+57.24 KB) | -
920.chunk.js | 0 Bytes -> 54.98 KB (gz: 17.08 KB) (+54.98 KB) | -
912.chunk.js | 0 Bytes -> 44.37 KB (gz: 14.31 KB) (+44.37 KB) | -
699.chunk.js | 0 Bytes -> 26.39 KB (gz: 6.14 KB) (+26.39 KB) | -

**Removed**

No assets were removed

**Bigger**

Asset | File Size | % Changed
----- | --------- | ---------
manifest.json | 91 Bytes -> 551 Bytes (gz: 151 Bytes) (+460 Bytes) | +505.49%

**Smaller**

Asset | File Size | % Changed
----- | --------- | ---------
app.bundle.js | 1.29 MB -> 1.04 MB (gz: 297.38 KB) (-254.35 KB) | -19.29%

**Unchanged**

No assets were unchanged`)
})

test('Shows stats when files are unchanged', () => {
  const statsDiff = getStatsDiff(
    require('./__mocks__/old-stats-assets.json'),
    require('./__mocks__/old-stats-assets.json')
  )
  expect(statsDiff).toEqual({
    added: [],
    bigger: [],
    removed: [],
    smaller: [],
    total: {
      diff: 0,
      diffPercentage: 0,
      name: '7',
      new: {gzipSize: 395714, size: 1404984},
      old: {gzipSize: 395714, size: 1404984}
    },
    unchanged: [
      {
        diff: 0,
        diffPercentage: 0,
        name: 'app.bundle.js',
        new: {gzipSize: 304515, size: 1089499},
        old: {gzipSize: 304515, size: 1089499}
      },
      {
        diff: 0,
        diffPercentage: 0,
        name: '296.chunk.js',
        new: {gzipSize: 35889, size: 127558},
        old: {gzipSize: 35889, size: 127558}
      },
      {
        diff: 0,
        diffPercentage: 0,
        name: '288.chunk.js',
        new: {gzipSize: 16720, size: 58610},
        old: {gzipSize: 16720, size: 58610}
      },
      {
        diff: 0,
        diffPercentage: 0,
        name: '920.chunk.js',
        new: {gzipSize: 17495, size: 56302},
        old: {gzipSize: 17495, size: 56302}
      },
      {
        diff: 0,
        diffPercentage: 0,
        name: '912.chunk.js',
        new: {gzipSize: 14657, size: 45438},
        old: {gzipSize: 14657, size: 45438}
      },
      {
        diff: 0,
        diffPercentage: 0,
        name: '699.chunk.js',
        new: {gzipSize: 6287, size: 27026},
        old: {gzipSize: 6287, size: 27026}
      },
      {
        diff: 0,
        diffPercentage: 0,
        name: 'manifest.json',
        new: {gzipSize: 151, size: 551},
        old: {gzipSize: 151, size: 551}
      }
    ]
  })

  expect(printTotalAssetTable(statsDiff)).toEqual(`**Total**

Files count | Total bundle size | % Changed
----------- | ----------------- | ---------
7 | 1.34 MB (gz: 386.44 KB) | 0%`)
  expect(printAssetTablesByGroup(statsDiff)).toEqual(`**Added**

No assets were added

**Removed**

No assets were removed

**Bigger**

No assets were bigger

**Smaller**

No assets were smaller

**Unchanged**

Asset | File Size | % Changed
----- | --------- | ---------
app.bundle.js | 1.04 MB (gz: 297.38 KB) | 0%
296.chunk.js | 124.57 KB (gz: 35.05 KB) | 0%
288.chunk.js | 57.24 KB (gz: 16.33 KB) | 0%
920.chunk.js | 54.98 KB (gz: 17.08 KB) | 0%
912.chunk.js | 44.37 KB (gz: 14.31 KB) | 0%
699.chunk.js | 26.39 KB (gz: 6.14 KB) | 0%
manifest.json | 551 Bytes (gz: 151 Bytes) | 0%`)
})
