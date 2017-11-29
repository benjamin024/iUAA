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
                },
                results: {
                    type: Array,
                    value: []
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
            this.$.map.innerHTML = "<img src='./assets/img/map/map_"+img+".svg' height='200%' width='auto' />";
            this.$.drawer.close();
            setTimeout(() => {
                this.$.containerMap.scroll(px,py);
            }, 500);
        }

        searchPlaces(){
            let p = this.$.placesForm.value;
            let auxArray = new Array();
            let i = 0;
            p = p.toLowerCase();
            p = p.replace(/[^a-zA-Z0-9]/g, '');
            if(p != "") {
                this.$.drawer.open();
                this.$.results.style.display = 'block';
                this.$.principal.style.display = 'none';
                this.$.es.style.display = 'none';
                this.$.en.style.display = 'none';
                this.$.fr.style.display = 'none';
                this.$.de.style.display = 'none';
                this.$.pt.style.display = 'none';
                this.$.it.style.display = 'none';
                for(let area of this.areas){
                    for(let place of area.places){
                        let auxName = place.name;
                        auxName = auxName.toLowerCase();
                        auxName = auxName.replace(/[^a-zA-Z0-9]/g, '');
                        let auxDescription = place.description;
                        let auxBuilding = place.building;
                        if(auxName.indexOf(p) > -1 || auxDescription.indexOf(p) > -1 || auxBuilding == p){
                            auxArray.push(place);
                        }
                    }
                }
                this.set('results', auxArray);
            }

        }

        backToPrincipal() {
            this.$.results.style.display = 'none';
            this.$.principal.style.display = 'block';
            this.$.es.style.display = 'block';
            this.$.en.style.display = 'block';
            this.$.fr.style.display = 'block';
            this.$.de.style.display = 'block';
            this.$.pt.style.display = 'block';
            this.$.it.style.display = 'block';
            this.set('results', []);
        }
    }

    customElements.define(IUAAApp.is, IUAAApp);
})(window.customElements);
