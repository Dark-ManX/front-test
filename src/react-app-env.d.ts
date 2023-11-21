/// <reference types="react-scripts" />

declare const shortid: ShortId;

export = shortid;

interface ShortId {
  (): string;
  generate: () => string;
}
