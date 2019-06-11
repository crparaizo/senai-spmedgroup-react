import axios from 'axios';

//Serviço genérico para fazer as chamadas para api
export default {

    call(endpoint) {
        let urlApi = `http://192.168.4.252:5000/api/${endpoint}`;

        //192.168.3.151 - NoteSenai

        //192.168.4.252 - PCSenai

        const auth = "bearer " + localStorage.getItem('usuario-spmedgroup'); //Armazenando o token em uma constante

        return {
            getOne: ({ id }) => axios.get(`${urlApi}/${id}`),
            getAll: () => axios.get(`${urlApi}`, {
                headers: {
                    Authorization: auth
                }
            }),
            update: (toUpdate) => axios.put(urlApi, toUpdate),
            create: (toCreate) => axios.post(urlApi, toCreate, {
                headers: {
                    Authorization: auth
                }
            }),
            delete: ({ id }) => axios.delete(`${urlApi}/${id}`),
            deleteAll: () => axios.delete(`${urlApi}`)
        }
    }
}

// getAll: () => axios.get(`${urlApi}`, {
//     headers: {
//         Authorization: "bearer " + localStorage.getItem('usuario-spmedgroup'),
//         "Content-Type": "application/json"
//     }
// }),