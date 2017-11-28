(function (customElements) {
    'use strict';

    class IUAAApp extends Polymer.Element {
        static get is() {
            return 'iuaa-app';
        }

        static get properties() {
            return {
                language: {
                    type: String,
                    value: 'es',
                    observer: 'renderLanguage'
                },
                labels: {
                    type: Object,
                    value: {}
                },
                areas: {
                    type: Array,
                    value: []
                },
                places: {
                    type: Array,
                    value: []
                },
                collapseOpenedClass: {
                    type: String,
                    value: ''
                }
            };
        }

        connectedCallback() {
            super.connectedCallback();
            this.$.ironAjax.generateRequest();
            this.$.languageService.generateRequest();
            setTimeout(() => {
                this.$.containerMap.scroll(540,620);
            }, 500);
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
            if (collapseOpen) {
                this.set('collapseOpenedClass', 'hidden');
            } else {
                this.set('collapseOpenedClass', '');
            }
            for (let index = 0; index < this.areas.length; index++) {
                let classStyle = '';
                if (collapseOpen) {
                    let areaTemp = this.get(['areas', index, 'name']);
                    if (areaTemp !== event.model.area.name) {
                        classStyle = 'hidden';
                    }
                } else {
                    classStyle = '';
                }
                this.set(['areas', index, 'customClass'], classStyle);
            }

        }

        changeLanguage(event) {
            let lang = event.target.getAttribute('data-lang');
            this.set('language', lang);
            this.$.ironAjax.generateRequest();
            this.$.languageService.generateRequest();
        }

        renderLanguage() {
            let response = this.$.languageService.lastResponse;
            this.set('labels', response);
        }

        updateMapPosition(event) {
            let px = event.target.getAttribute('data-px');
            let py = event.target.getAttribute('data-py');
            let img = event.target.getAttribute('data-img');
            console.log("("+px+","+py+")");
            console.log("IMG: " +img);
            this.$.map.innerHTML = "<img src='../../assets/img/map/map_"+img+".svg' height='200%' width='auto' />";
            this.$.drawer.close();
            setTimeout(() => {
                this.$.containerMap.scroll(px,py);
            }, 500);
        }
    }

    customElements.define(IUAAApp.is, IUAAApp);
})(window.customElements);
