import axios from 'axios';

const API_URL = 'https://fifth-reality-325409.uc.r.appspot.com';
// const API_URL = 'http://127.0.0.1:8000';


export default class BackendService {

    baseMethod = (page, offset, id, filter) => {
        let url = `${API_URL}/api/v1/${page}/`;
        if (id) {
            url = `${API_URL}/api/v1/${page}/${id}/`;
        }
        if (offset) {
            url = `${url}?offset=${offset}`;
        }
        if (filter) {
            let irregularity="", tender="", entity="";
            if (filter.irregularity) {
                irregularity = filter.irregularity
            }
            if (filter.tender) {
                tender = filter.tender
            }
            if (filter.entity) {
                entity = filter.entity
            }
            if (offset) {
                url = `${url}&irregularity=${irregularity}&tender=${tender}&tender__procuring_entity=${entity}`
            } else {
                url = `${url}?irregularity=${irregularity}&tender=${tender}&tender__procuring_entity=${entity}`
            }
        }
        console.log(url)

        return axios.get(url).then(response => response.data);
    };

    getIrregularities = offset => this.baseMethod('irregularities', offset);

    getFlags = (offset, filter) => this.baseMethod('flags', offset, null, filter);

    getTenders = offset => this.baseMethod('tenders', offset);

    getEntities = offset => this.baseMethod('entities', offset);

    getDetails = (page, id) => this.baseMethod(page, null, id);

    getFilteredData = (page, filter) => this.baseMethod(page, null, null, filter);
}