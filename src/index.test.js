/**
 * @jest-environment node
 */
const { readFileSync } = require("fs");
const builder = require("./build/build");
const path = require('path')

const inputPath = path.resolve(__dirname, './main.wat')
const outputPath = path.resolve(__dirname, './main.wasm')

const instantiate = async () => {
  const buffer = readFileSync(outputPath);
  const module = await WebAssembly.compile(buffer);
  const instance = await WebAssembly.instantiate(module, {
    console: {
      log: (x, y) => console.log(x, y),
    },
  });
  return instance.exports;
};

const setAllCells = (value) => {
  for (let x = 0; x < 50; x++) {
    for (let y = 0; y < 50; y++) {
      wasm.setCell(x, y, value);
    }
  }
};

let wasm;

beforeAll(() => {
  builder.then((build) => build(inputPath, outputPath))
});

beforeEach(async () => {
  wasm = await instantiate();
  return
});

test("hello world returns 42", async () => {
  await expect(wasm.helloWorld()).toBe(42);
});

test("increment 1 returns 2", async () => {
  await expect(wasm.increment(1)).toBe(2);
});

test("double 2 returns 4", async () => {
  await expect(wasm.double(2)).toBe(4);
});
