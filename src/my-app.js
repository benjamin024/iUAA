(function (customElements) {
    'use strict';

    class MyApp extends Polymer.Element {
        static get is() {
            return 'my-app';
        }

        static get properties() {
            return {
                areas: {
                    type: Array,
                    value: []
                },
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
            this.set('areas', response.areas);
        }

        toggle(event) {
            this.$.collapse.toggle();
            let places = JSON.parse(event.target.dataset.item);
            this.set('places', places);
        }
    }

    customElements.define(MyApp.is, MyApp);
})(window.customElements);

