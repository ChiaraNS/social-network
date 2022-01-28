const { User } = require('../models');

const UserController = {
    getAllUsers(req, res) {
        User.find({})
            .then(dbUsers => res.json(dbUsers))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .then(dbUsers => res.json(dbUsers))
        .catch(err => {
            console.log(err);
            res.status(400).json(err); 
        })
    },

    createUser({ params, body }, res) {
        User.create(body)
        .then(dbUsers => res.json(dbUsers))
        .catch(err => res.json(err));
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body,
            { new: true, runValidators: true }
            )
            .then(dbUsers => {
                if(!dbUsers) {
                    res.status(404).json({ message: 'No User found with thid ID.'});
                    return;
                }
                res.json(dbUsers);
            })
            .catch(err => res.json(err));
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUsers => {
                if(!dbUsers) {
                    res.status(404).json({ message: 'No User found with thid ID.'});
                    return;
                }
                res.json(dbUsers);
            })
            .catch(err => res.json(err));
    },

    addFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id },
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true }
            )
            .then(dbUsers => {
                if(!dbUsers) {
                    res.status(404).json({ message: 'No friend found with thid ID.'});
                    return;
                }
                res.json(dbUsers);
            })
            .catch(err => res.json(err));
    },

    deleteFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id },
            { $push: { friends: params.friendId }},
            { new: true })
            .then(dbUsers => {
                if(!dbUsers) {
                    res.status(404).json({ message: 'No friend found with thid ID.'});
                    return;
                }
                res.json(dbUsers);
            })
            .catch(err => res.json(err));
    },
};

module.exports = UserController;