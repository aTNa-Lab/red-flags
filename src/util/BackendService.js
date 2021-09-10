import axios from 'axios';
const API_URL = 'https://fifth-reality-325409.uc.r.appspot.com';
// const API_URL = 'http://127.0.0.1:8000';


export default class BackendService{

    baseMethod = (page, offset, id) => {
        let url = `${API_URL}/api/v1/${page}/`;
        if (offset) {
            url = `${API_URL}/api/v1/${page}/?offset=${offset}`;
        }
        if (id) {
            url = `${API_URL}/api/v1/${page}/${id}/`;
        }
        console.log(url)

        return axios.get(url).then(response => response.data);
    };
    
    getIrregularities = offset => this.baseMethod('irregularities', offset);

    getFlags = offset => this.baseMethod('flags', offset);

    getTenders = offset => this.baseMethod('tenders', offset);

    getEntities = offset => this.baseMethod('entities', offset);

    getDetails = (page, id) => this.baseMethod(page, null, id);
}