import { withTimer } from './util';

type JsonMinifyMethod = 'jsonpack' | 'lzw';

type StatResult = {
  size: number;
  compressTime: number;
  decompressTime: number;
};

type Stat = Record<JsonMinifyMethod, StatResult>;

const methods: JsonMinifyMethod[] = ['jsonpack', 'lzw'];

const _compress = withTimer((method: JsonMinifyMethod) => {
  switch (method) {
    case 'jsonpack':
      break;
    case 'lzw':
      break;
  }
});

const _decompress = withTimer((method: JsonMinifyMethod) => {
  switch (method) {
    case 'jsonpack':
      break;
    case 'lzw':
      break;
  }
});

export default class JsonStat {
  private stat: Stat = {} as any;
  benchmark(obj: Record<string, any> | string) {
    obj = typeof obj === 'string' ? obj : JSON.stringify(obj);
    console.log(obj);
    methods.forEach(method => {
      const cStat = this.compress(method);
      const pStat = this.decompress(method);
      this.stat[method] = { ...cStat, ...pStat } as any;
    });
    return this.stat;
  }
  compress(method: JsonMinifyMethod): Partial<StatResult> {
    return {};
  }
  decompress(method: JsonMinifyMethod): Partial<StatResult> {
    return {};
  }
}
