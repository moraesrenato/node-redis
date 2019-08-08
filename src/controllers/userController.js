const func = require('../conf/func');

module.exports = {

    async addRate(req, res) {
        func.addRate(req, res);
    },

    async deleteUser(req, res) {
        func.delUser(req, res);
    },

    async listaUser(req, res) {
        func.listaUser(req, res);
    },

    async consultaCache(req, res) {
        func.consultaCache(req, res);
    },
}