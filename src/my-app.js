(function (customElements) {
    'use strict';
    class MyApp extends Polymer.Element {
        static get is() {
            return 'my-app';
        }

        static get properties() {
            return {
                areas: {
                    type: Object,
                    value: {}
                }
            };
        }

        connectedCallback() {
            super.connectedCallback();
            this.$.ironAjax.generateRequest();
        }

        handleResponse() {
            let response = this.$.ironAjax.lastResponse;
            this.set('areas', response.areas);
        }

        toggle() {
            this.$.collapse.toggle();
        }
    }
    customElements.define(MyApp.is, MyApp);
})(window.customElements);

