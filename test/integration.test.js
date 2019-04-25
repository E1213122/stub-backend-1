'use strict';

var server = require('../lib/server');
var chai = require('chai');
var request = require('supertest');

var expect = chai.expect;

describe('stub backend project', () => {
    describe('without Authentication', () => {
        describe('#get', () => {
            it('returns a valid reponse for Nathan id', (done) => {
                request(server)
                    .get('/stories/Nathan/person')
                    .end((err, res) => {
                        expect(res.status).to.equal(200);
                        expect(res.body).to.deep.equal({
                            "name": "Nathan"
                        });
                        done();
                    });
            });

            it('returns a valid reponse for Mark id', (done) => {
                request(server)
                    .get('/stories/mark/person')
                    .end((err, res) => {
                        expect(res.status).to.equal(200);
                        expect(res.body).to.deep.equal({
                            "name": "Mark"
                        });
                        done();
                    });
            });

            it('return 404 when is not finding the scenario', (done) => {
                request(server)
                    .get('/stories/Nathan/age')
                    .end((err, res) => {
                        expect(res.status).to.equal(404);
                        expect(res.body).to.deep.equal({
                            errorCode: 404,
                            message: 'Scenario not found in db.json! :('
                        });
                        done();
                    });
            });
        });
    });

    describe('with Authentication', () => {
        describe('#get', () => {
            it('returns a valid reponse', (done) => {
                request(server)
                    .get('/stories/Nathan/budget')
                    .set({ Authorization: 'PLACE_YOUR_TOKEN_HERE', id: 'MY_ID' })
                    .end((err, res) => {
                        expect(res.status).to.equal(200);
                        expect(res.body).to.deep.equal({
                            "name": "Nathan"
                        });
                        done();
                    });
            });

            it('returns 404 when it is not finding the scenario', (done) => {
                request(server)
                    .get('/stories/Nathan/age')
                    .set({ Authorization: 'PLACE_YOUR_TOKEN_HERE' })
                    .end((err, res) => {
                        expect(res.status).to.equal(404);
                        expect(res.body).to.deep.equal({
                            errorCode: 404,
                            message: 'Scenario not found in db.json! :('
                        });
                        done();
                    });
            });

            describe('headers',()=>{
                it('returns 401 when it authorization header is not there and the request requires authentication', (done) => {
                    request(server)
                        .get('/stories/nathan/budget')
                        .end((err, res) => {
                            expect(res.status).to.equal(401);
                            expect(res.body).to.deep.equal({
                                errorCode: 401,
                                message: 'Header not found! :('
                            });
                            done();
                        });
                });

                it('returns 401 when it id header is not there and the request requires the header', (done) => {
                    request(server)
                        .get('/stories/smith/budget')
                        .end((err, res) => {
                            expect(res.status).to.equal(401);
                            expect(res.body).to.deep.equal({
                                errorCode: 401,
                                message: 'Header not found! :('
                            });
                            done();
                        });
                });
            });
        });
    });
});



