const User = require('../models/user');
const redis = require('redis');

const client = redis.createClient({
    port: 15190,
    host: 'redis-15190.c8.us-east-1-4.ec2.cloud.redislabs.com',
    password: '321321321Renato+-',
});

module.exports = {
    async consultaCache(req, res) {
        client.get(req.params.name, async function (error, value) {
            if (value === null) {
                let user = await User.findOne({ name: req.params.name });

                if (user === null) {
                    console.log('Esse registro não existe no banco de dados!');
                    return res.json('Esse registro não existe no banco de dados!')
                } else {
                    client.set(req.params.name, JSON.stringify(user), function (err, result) {
                        if (err) {
                            console.log('nao foi adicionado ' + err);
                            throw err;
                        } else {
                            console.log('Seu cache foi atualizado ' + result);
                            return res.json(user);
                        }
                    });
                }
            } else {
                console.log(value);
                return res.json(JSON.parse(value));
            }
        });
    },

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

    async delUser(req, res) {
        const user = await User.findOne({ name: req.params.name });

        await User.deleteOne(user);

        return res.send(user);
    },

    async listaUser(req, res) {
        const { page = 1 } = req.query;
        const user = await User.paginate({}, { page, limit: 10 });

        return res.json(user);
    }
};