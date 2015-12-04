var _ = require('lodash');
var ig = require('instagram-node').instagram();

var globalPickResult = {
    users: {
        fields: {
            'id': 'id',
            'full_name': 'full_name',
            'profile_picture': 'profile_picture',
            'username': 'username'
        }
    }
};

module.exports = {

    /**
     * Set acess token.
     *
     * @param dexter
     */
    authParams: function (dexter, spotifyApi) {

        if (dexter.environment('instagram_access_token')) {

            ig.use({access_token: dexter.environment('instagram_access_token')});
        } else {

            this.fail('A [instagram_access_token] environment is Required.');
        }
    },

    prepareStringInputs: function (inputs) {
        var result = {};

        _.map(inputs, function (inputValue, inputKey) {

            result[inputKey] = _(inputValue).toString();
        });

        return result;
    },

    /**
     * The main entry point for the Dexter module
     *
     * @param {AppStep} step Accessor for the configuration for the step using this module.  Use step.input('{key}') to retrieve input data.
     * @param {AppData} dexter Container for all data used in this workflow.
     */
    run: function(step, dexter) {

        var mediaId = step.input('mediaId').first();

        if (!mediaId) {

            this.fail('A [mediaId] is Required.');
        }

        this.authParams(dexter);

        ig.likes(mediaId, function (err) {

            if (err) {

                this.fail(err);
            } else {

                this.complete({success: true});
            }
        }.bind(this));
    }
};
