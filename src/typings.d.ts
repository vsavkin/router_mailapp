/// <reference path="../typings/browser.d.ts" />

declare var module: {id: string};

declare namespace jasmine {
  interface Matchers {
    toHaveText(expected: string): void;
  }
}