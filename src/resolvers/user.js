//const User = require('../models');
 const models = require("../models");

// module.exports = {
//     Query: {
//         users: () => { return models.User.findAll() },
//         user: (_, { id }) => { return models.User.findOne({ where: { id } }) },
//     },
//     Mutation: {
//         createUser: (_, { name, email }) => { return models.User.create({ name, email }) },
//         updateUser: (_, { name, email, id}) => { return models.User.update({ name, email}, {where: {id}})},
//         deleteUser: (_, { id }) => { return models.User.destroy({where: {id}})}
//     }
// }


const resolvers = {
    Query: {
        async user(root, { id }, { models }) {
            return models.User.findByPk(id)
        },
        async users(root, args, { models }) {
            return models.User.findAll()
        }
    },
    Mutation: {
        // async createUser(root, { name, email }, { models }) {
        //     return models.User.create({ name, email })
        // },
        createUser: async (_, { name, email }, { models }) => {
            const user = await models.User.findOne({ where: { email } });
            if (!user){
              return await models.User.create({ name, email });
            }
          },
      // createUser: (_, { name, email }) => { return models.User.create({ name, email }) },
        updateUser: (_, { id, name, email}) => { return models.User.update({ name, email }, {where: {id}})},
        deleteUser: (_, { id }) => { return models.User.destroy({where: {id}})}
    }

}

module.exports = resolvers
