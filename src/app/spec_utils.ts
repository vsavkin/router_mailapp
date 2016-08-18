import { tick, ComponentFixture } from '@angular/core/testing';

export function addMatchers() {
  jasmine.addMatchers({
    toHaveText: () => {
      return {
        compare: function (actual: any, expectedText: string) {
          const actualText = elementText(actual);
          return {
            pass: actualText.indexOf(expectedText) > -1,
            get message() { return 'Expected ' + actualText + ' to be equal to ' + expectedText; }
          };
        }
      };
    }
  });
}

function elementText(n: any): string {
  var hasNodes = (n: any) => {
    const children = n.childNodes;
    return children && children.length > 0;
  };

  if (n instanceof Array) {
    return n.map(elementText).join('');
  }

  if (n.nodeType === Node.COMMENT_NODE) {
    return '';
  }

  if (n.nodeType === Node.ELEMENT_NODE && n.hasChildNodes()) {
    return elementText(Array.prototype.slice.call(n.childNodes));
  }

  return n.textContent;
}

export function advance(f: ComponentFixture<any>): void {
  tick();
  f.detectChanges();
}