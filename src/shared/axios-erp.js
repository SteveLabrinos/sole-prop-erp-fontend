import axios from 'axios';

/**
 * @author Stavros Lamprinos [stalab at linuxmail.org] on 20/2/2021.
 */

const instance = axios.create({
    baseURL: 'http://localhost:9002/msc/ais/soleerp/api/'
});

export default instance;