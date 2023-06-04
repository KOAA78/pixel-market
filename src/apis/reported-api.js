import axios from '@/utils/request.js';

const reportedApi = {
    getReportedList(currentPage) {
        return axios.get('reported/admin/getReport',
            {
                params: {
                    cp: currentPage,
                }
            });
    },
    reporetMerchandise(reportedForm){
        return axios.post('reported/user/report',reportedForm)
    },

    handleReported(action){
        return axios.post("reported/admin/handle",action)
    }

};

export default reportedApi;