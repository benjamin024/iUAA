(function (customElements) {
    'use strict';
    class MyApp extends Polymer.Element {
        static get is() {
            return 'my-app';
        }

        static get properties() {
            return {
                places: {
                    type: Array,
                    value: []
                }
            };
        }

        connectedCallback() {
            super.connectedCallback();
            this.$.ironAjax.generateRequest();
        }

        handleResponse() {
            let response = this.$.ironAjax.lastResponse;
            this.set('places', response.places);
        }
    }
    customElements.define(MyApp.is, MyApp);
})(window.customElements);