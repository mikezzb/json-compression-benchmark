# json-compression-benchmark

Benchmark of [lzw](https://www.npmjs.com/package/lzw-compressor) and [jsonpack](https://www.npmjs.com/package/jsonpack) algorithms in JSON compression.

### Example Benchmark Result

> Compression of `package.json`

```json
{
  "lzw": {
    "size": 1035,
    "percentage": 0.688622754491018,
    "correctness": true,
    "compressTime": 0.7999999970197678,
    "decompressTime": 0.20000000298023224
  },
  "jsonpack": {
    "size": 1299,
    "percentage": 0.8642714570858283,
    "correctness": true,
    "compressTime": 0.19999998807907104,
    "decompressTime": 0.10000000894069672
  }
}
```
