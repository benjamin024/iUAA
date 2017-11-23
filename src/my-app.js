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
            let areas = response.areas.map(area => {
                area.customClass = '';
                return area;
            });
            this.set('areas', areas);
        }

        toggle(event) {
            this.$.collapse.toggle();
            let places = JSON.parse(event.target.dataset.item);
            this.set('places', places);
            let collapseOpen = this.$.collapse.opened;
            for (let index = 0; index < this.areas.length; index++) {
                let classStyle = '';
                if (collapseOpen) {
                    let areaTemp = this.get(['areas', index, 'name']);
                    if (areaTemp !== event.model.area.name) {
                        classStyle = 'button-hidden';
                    }
                } else {
                    classStyle = '';
                }
                this.set(['areas', index, 'customClass'], classStyle);
            }

        }
    }

    customElements.define(MyApp.is, MyApp);
})(window.customElements);

