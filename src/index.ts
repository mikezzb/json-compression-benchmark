import { byteCount, perc, withTimer } from './util';
import jsonpack from 'jsonpack';
import lzwCompress from 'lzwcompress';

type JsonMinifyMethod = 'jsonpack' | 'lzw';

type StatResult = {
  percentage: number;
  size: number;
  compressTime: number;
  decompressTime: number;
};

type Stat = Record<JsonMinifyMethod, StatResult>;

type CompressedMap = Record<JsonMinifyMethod, string>;

type BenchmarkResult = {
  stat: Stat;
  compressed: CompressedMap;
  originalSize: number;
};

const methods: JsonMinifyMethod[] = ['jsonpack', 'lzw'];

const packageMap = {
  jsonpack: jsonpack,
  lzw: lzwCompress,
};

const _compress = withTimer<string>(
  (jsonStr: string, method: JsonMinifyMethod) => {
    switch (method) {
      default:
        const pkg = packageMap[method];
        return pkg.pack(jsonStr);
    }
  }
);

const _decompress = withTimer(
  (compressed: string, method: JsonMinifyMethod) => {
    switch (method) {
      default:
        const pkg = packageMap[method];
        return pkg.unpack(compressed);
    }
  }
);

export default class JsonStat {
  private stat: Stat = {} as any;
  private compressed: CompressedMap = {} as any;
  private jsonStr = '';
  benchmark(
    obj: Record<string, any> | string,
    verbose = false,
    size?: number
  ): BenchmarkResult {
    this.jsonStr = typeof obj === 'string' ? obj : JSON.stringify(obj);
    const originalSize = size || byteCount(this.jsonStr);
    methods.forEach(method => {
      const [compressed, cStat] = this.compress(method);
      const pStat = this.decompress(compressed, method);
      const newSize = byteCount(compressed);
      this.stat[method] = Object.assign(
        {
          size: newSize,
          percentage: perc(originalSize, newSize),
        },
        cStat,
        pStat
      ) as any;
      this.compressed[method] = compressed as any;
    });
    const result = {
      stat: this.stat,
      compressed: this.compressed,
      originalSize,
    };
    if (verbose) console.log(result);
    return result;
  }
  compress(method: JsonMinifyMethod): [string, Partial<StatResult>] {
    const { result: jsonMinStr, time } = _compress(this.jsonStr, method);
    return [
      jsonMinStr,
      {
        compressTime: time,
      },
    ];
  }
  decompress(
    compressed: string,
    method: JsonMinifyMethod
  ): Partial<StatResult> {
    const { time } = _decompress(compressed, method);
    return {
      decompressTime: time,
    };
  }
}
