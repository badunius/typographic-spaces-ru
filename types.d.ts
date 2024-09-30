declare module "typographic-spaces-ru" {
  export function fixSpaces(options: {
    /** HTML element to inspect and fix spaces */
    root?: HTMLElement;
    /** list of particles that has to have an nbsp _after_ them */
    fixAfter?: string[];
    /** list of particles that has to have an nbsp _before_ them */
    fixBefore?: string[];
  }): void;
}
