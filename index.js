var _ = require('lodash'),
    util = require('./util.js'),
    instagram = require('instagram-node').instagram();

var pickInputs = {
        'mediaId': { key: 'mediaId', validate: { req: true } }
    };

module.exports = {
    /**
     * The main entry point for the Dexter module
     *
     * @param {AppStep} step Accessor for the configuration for the step using this module.  Use step.input('{key}') to retrieve input data.
     * @param {AppData} dexter Container for all data used in this workflow.
     */
    run: function(step, dexter) {
        var credentials = dexter.provider('instagram').credentials(),
            cdlidateErrors = util.checkValidateErrors(inputs, pickInputs);

        // check params.
        if (validateErrors)
            return this.fail(validateErrors);

        instagram.use({ access_token: _.get(credentials, 'access_token') });
        instagram.add_like(inputs.mediaId, function (error) {

            error? this.fail(error) : this.complete({ success: true });
        }.bind(this));
    }
};
