import { byteCount, perChange, withTimer } from './util';

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

const _compress = withTimer<string>(
  (jsonStr: string, method: JsonMinifyMethod) => {
    switch (method) {
      case 'jsonpack':
        break;
      case 'lzw':
        break;
    }
  }
);

const _decompress = withTimer((jsonStr: string, method: JsonMinifyMethod) => {
  switch (method) {
    case 'jsonpack':
      break;
    case 'lzw':
      break;
  }
});

export default class JsonStat {
  private stat: Stat = {} as any;
  private compressed: CompressedMap = {} as any;
  private jsonStr?: string;
  benchmark(
    obj: Record<string, any> | string,
    verbose = false
  ): BenchmarkResult {
    this.jsonStr = typeof obj === 'string' ? obj : JSON.stringify(obj);
    const originalSize = byteCount(this.jsonStr);
    methods.forEach(method => {
      const [compressed, cStat] = this.compress(method);
      const pStat = this.decompress(method);
      const newSize = byteCount(compressed);
      this.stat[method] = Object.assign(
        {
          size: newSize,
          percentage: perChange(originalSize, newSize),
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
  decompress(method: JsonMinifyMethod): Partial<StatResult> {
    const { time } = _decompress(this.jsonStr, method);
    return {
      decompressTime: time,
    };
  }
}
