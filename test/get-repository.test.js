'use strict';

var GetRespository = require('./../lib/app/components/get/get.repository');
var chai = require('chai');

var expect = chai.expect;

describe('get repository', () => {
    it('returns the context path and id when it is found', () => {
        const contextPath = 'stories/Nathan/person';
        const body = GetRespository.findData(contextPath);
        expect(body).to.deep.equal({
            id_: 'Nathan',
            auth_: false,
            description_: 'Get person details related to Nathan without authentication',
            body_: {
                name: 'Nathan'
            }
          });
    });

    it('returns context path and id as null when it is not found', () => {
        const contextPath = 'stories/Nathan/age';

        const body = GetRespository.findData(contextPath);
        expect(body).to.be.null;
    });
});