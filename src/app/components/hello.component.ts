import { Component, html, css, CustomElement } from '@readymade/core';

@Component({
    selector: 'hello-world',
    template:`
    <span>{{hello}}</span>
    `,
})
class HelloComponent extends CustomElement {
  state: {
    hello: string;
  }
  constructor() {
      super();
      this.state.hello = 'Hello World'
  }
}

customElements.define('hello-world', HelloComponent);

export { HelloComponent }