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
            response.map(area => {
                area.foo = "button-showed";
            });
            this.set('areas', response.areas);
        }

        toggle(event) {
            this.$.collapse.toggle();
            let places = JSON.parse(event.target.dataset.item);
            this.set('places', places);
            let open = this.$.collapse.opened;
            if(open) {
                // Change the actual button to visible and set the others to hidden.
                this.set('foo', 'button-hidden');
            } else {
                // Change all buttons to visible
            }
        }
    }

    customElements.define(MyApp.is, MyApp);
})(window.customElements);

