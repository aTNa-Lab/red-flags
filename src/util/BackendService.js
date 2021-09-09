import axios from 'axios';
const API_URL = 'https://fifth-reality-325409.uc.r.appspot.com';
// const API_URL = 'http://127.0.0.1:8000';


export default class BackendService{

    baseMethod = (page, offset) => {
        let url = `${API_URL}/api/v1/${page}/`;
        if (offset) {
            url = `${API_URL}/api/v1/${page}/?offset=${offset}`;
        }

        return axios.get(url).then(response => response.data);
    };
    
    getIrregularities = offset => this.baseMethod('irregularities', offset);

    getFlags = offset => this.baseMethod('flags', offset);

    getTenders = offset => this.baseMethod('tenders', offset);

    getEntities = offset => this.baseMethod('entities', offset);
}