const { Thought, User } = require('../models');

const ThoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughts => res.json(dbThoughts))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
        .then(dbThoughts => res.json(dbThoughts))
        .catch(err => {
            console.log(err);
            res.status(400).json(err); 
        })
    },

    createThought({ params, body }, res) {
        Thought.create(body)
        .then(({ _id }) => {
            return URLSearchParams.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id } },
                { new: true }
            )
        })
        .then(dbThoughts => {
            if (!dbThoughts) {
                res.status(404).json({ message: 'No thought found with thid ID.'});
                return;
            }
            res.json(dbThoughts);
        })
        .catch(err => res.json(err));
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body,
            { new: true }
            )
            .then(dbThoughts => {
                if(!dbThoughts) {
                    res.status(404).json({ message: 'No thought found with thid ID.'});
                    return;
                }
                res.json(dbThoughts);
            })
            .catch(err => res.json(err));
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughts => {
                if(!dbThoughts) {
                    res.status(404).json({ message: 'No thought found with thid ID.'});
                    return;
                }
                res.json(dbThoughts);
            })
            .catch(err => res.json(err));
    },

    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
            )
            .then(dbThoughts => {
                if(!dbThoughts) {
                    res.status(404).json({ message: 'No thought found with thid ID.'});
                    return;
                }
                res.json(dbThoughts);
            })
            .catch(err => res.json(err));
    },

    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId },
            { $push: { reactions: body}},
            { new: true, runValidators: true })
            .then(dbThoughts => {
                if(!dbThoughts) {
                    res.status(404).json({ message: 'No thought found with thid ID.'});
                    return;
                }
                res.json(dbThoughts);
            })
            .catch(err => res.json(err));
    },
};

module.exports = ThoughtController;