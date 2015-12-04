var _ = require('lodash');
var ig = require('instagram-node').instagram();

module.exports = {

    /**
     * Set acess token.
     *
     * @param dexter
     */
    authParams: function (dexter) {

        if (dexter.environment('instagram_access_token')) {

            ig.use({access_token: dexter.environment('instagram_access_token')});
        } else {

            this.fail('A [instagram_access_token] environment is Required.');
        }
    },

    /**
     * The main entry point for the Dexter module
     *
     * @param {AppStep} step Accessor for the configuration for the step using this module.  Use step.input('{key}') to retrieve input data.
     * @param {AppData} dexter Container for all data used in this workflow.
     */
    run: function(step, dexter) {

        var mediaId = step.input('mediaId').first();

        if (_.isEmpty(mediaId)) {

            this.fail('A [mediaId] is Required.');
        } else {

            this.authParams(dexter);

            ig.add_like(mediaId, function (err) {

                if (err) {

                    this.fail(err);
                } else {

                    this.complete({success: true});
                }
            }.bind(this));
        }
    }
};
