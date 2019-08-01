const User = require('../models/user');
const redis = require('redis');

const client = redis.createClient({
    port: 15190,
    host: 'redis-15190.c8.us-east-1-4.ec2.cloud.redislabs.com',
    password: '321321321Renato+-',
});

module.exports = {

    async addRate(req, res) {
        var user = await User.findOne({ name: req.params.name });

        if (user === null) {
            var newUser = {
                name: req.params.name,
                rate: req.body.rate
            }

            user = await User.create(newUser);

        } else {

            user.rate += req.body.rate;

            await user.save();

        };

        return res.json(user);
    },

    async deleteUser(req, res) {
        const user = await User.findOne({ name: req.params.name });

        await User.deleteOne(user);

        return res.send(user);
    },

    async listaUser(req, res) {
        const { page = 1 } = req.query;
        const user = await User.paginate({}, { page, limit: 10 });
        // const user = await User.find();

        return res.json(user);
    },

    async consultaCache(req, res) {
        client.get(req.params.name, function (error, value) {
            if (value === null) {
                let user = User.findOne({ name: req.params.name });

                client.set(req.params.name, JSON.stringify(user), function (err, result) {
                    if (err) {
                        console.log('nao foi adicionado ' + err);
                        throw err;
                    } else {
                        console.log('Seu cache foi atualizado ');
                    }
                });
            } else {
                console.log('Resultado = ' + value);
                return res.json(value);
            }
        });
    },
}