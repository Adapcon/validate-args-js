const { expect } = require('chai')
const sinon = require('sinon')

const checkArgs = require('../index')

const DEFAULT_ERROR_OBJECT_NOT_DEFINED = 'object is not defined!';
const DEFAULT_ERROR_ARG_OBJECT = 'arg can\'t be a object';
const DEFAULT_ERROR_OPTIONS_NOT_DEFINED = 'accept.options is not defined!';
const DEFAULT_ERROR_OPTIONS_NOT_ARRAY = 'accept.options is not Array!';
const DEFAULT_OBJECT_ERROR = 'one argument has not been defined!';
const DEFAULT_ACCEPT_ERROR = 'one argument has not been accepted!';
const CUSTOM_OBJECT_ERROR = 'test object error';
const CUSTOM_ACCEPT_ERROR = 'test accept error';


describe('import', async () => {
    it('should return a function when importing the module', async () => {
        expect(checkArgs).to.be.an('function');
    })
})

describe('throw if required parameters are not defined', async () => {
    it('should if object is not defined', async () => {
        let fn = () => checkArgs()

        expect(fn)
            .to.throw()
            .to.have.property('message', DEFAULT_ERROR_OBJECT_NOT_DEFINED)
    })

    it('should if object.arg is object', async () => {
        let fn = () => checkArgs({
            arg: {
                test: 'test'
            },
            err: 'test err'
        })

        expect(fn)
            .to.throw()
            .to.have.property('message', DEFAULT_ERROR_ARG_OBJECT)
    })

    it('should if object.accept is defined and object.accept.options is not defined', async () => {
        let fn = () => checkArgs({
            arg: 'test arg',
            err: 'test err',
            accept: {}
        });

        expect(fn)
            .to.throw()
            .to.have.property('message', DEFAULT_ERROR_OPTIONS_NOT_DEFINED)
    })

    it('should if object.accept is defined and object.accept.options is not Array', async () => {
        let fn = () => checkArgs({
            arg: 'test arg',
            err: 'test err',
            accept: {
                options: 'test'
            }
        });

        expect(fn)
            .to.throw()
            .to.have.property('message', DEFAULT_ERROR_OPTIONS_NOT_ARRAY)
    })
})

describe('execution', async () => {
    describe('without using an accept feature', async () => {
        it('should use a string for arg and string for err ', async () => {
            let fn = () => checkArgs({
                arg: 'test name',
                err: CUSTOM_OBJECT_ERROR
            });

            expect(fn).to.not.throw()
        })

        it('should use a undefined for arg and string for err', async () => {
            let fn = () => checkArgs({
                arg: undefined,
                err: CUSTOM_OBJECT_ERROR
            });

            expect(fn).to.throw().to.have.property('message', CUSTOM_OBJECT_ERROR)
        })

        it('should use a undefined for arg and undefined for err', async () => {
            let fn = () => checkArgs({
                arg: undefined,
                err: undefined
            });

            expect(fn)
                .to.throw()
                .to.have.property('message', DEFAULT_OBJECT_ERROR)
        })
    })

    describe('using an accept feature', async () => {
        describe('test string', async () => {
            it('should use \'3\' for arg, [\'1\',\'2\'] for accept.object and default for accept.err', async () => {
                let fn = () => checkArgs({
                    arg: '3',
                    err: CUSTOM_OBJECT_ERROR,
                    accept: {
                        options: ['1', '2']
                    }
                });

                expect(fn)
                    .to.throw()
                    .to.have.property('message', DEFAULT_ACCEPT_ERROR)
            })

            it('should use \'3\' for arg, [\'1\',\'2\'] for accept.object and string for accept.err', async () => {
                let fn = () => checkArgs({
                    arg: '3',
                    err: CUSTOM_OBJECT_ERROR,
                    accept: {
                        options: ['1', '2'],
                        err: CUSTOM_ACCEPT_ERROR,
                    }
                });

                expect(fn)
                    .to.throw()
                    .to.have.property('message', CUSTOM_ACCEPT_ERROR)
            })

            it('should use \'1\' for arg, [\'1\',\'2\'] for accept.options', async () => {
                let fn = () => checkArgs({
                    arg: '1',
                    err: CUSTOM_OBJECT_ERROR,
                    accept: {
                        options: ['1', '2'],
                        err: CUSTOM_ACCEPT_ERROR,
                    }
                });

                expect(fn)
                    .to.not.throw()
            })
        })

        describe('test number', async () => {
            it('should use 1 for arg, [1, 2] for accept.options', async () => {
                let fn = () => checkArgs({
                    arg: 1,
                    err: CUSTOM_OBJECT_ERROR,
                    accept: {
                        options: [1, 2],
                        err: CUSTOM_ACCEPT_ERROR,
                    }
                });
    
                expect(fn)
                    .to.not.throw()
            })
        })

        describe('test case sensitive', async () => {
            it('should use \'m\' for arg, [\'M\', \'F\'] for accept.options', async () => {
                let fn = () => checkArgs({
                    arg: 'm',
                    err: CUSTOM_OBJECT_ERROR,
                    accept: {
                        options: ['M', 'F'],
                        err: CUSTOM_ACCEPT_ERROR,
                    }
                });
    
                expect(fn)
                    .to.not.throw()
            })

            it('should use \'M\' for arg, [\'m\', \'f\'] for accept.options', async () => {
                let fn = () => checkArgs({
                    arg: 'M',
                    err: CUSTOM_OBJECT_ERROR,
                    accept: {
                        options: ['m', 'f'],
                        err: CUSTOM_ACCEPT_ERROR,
                    }
                });
    
                expect(fn)
                    .to.not.throw()
            })
        })
        
        describe('test random', async () => {
            it('should use 1 for arg, [\'M\', 1, \'f\'] for accept.options', async () => {
                let fn = () => checkArgs({
                    arg: 1,
                    err: CUSTOM_OBJECT_ERROR,
                    accept: {
                        options: ['M', 1, 'f'],
                        err: CUSTOM_ACCEPT_ERROR,
                    }
                });
    
                expect(fn)
                    .to.not.throw()
            })

            it('should use \'f\' for arg, [\'f\', \'M\', 1] for accept.options', async () => {
                let fn = () => checkArgs({
                    arg: 'f',
                    err: CUSTOM_OBJECT_ERROR,
                    accept: {
                        options: ['f', 'M', 1],
                        err: CUSTOM_ACCEPT_ERROR,
                    }
                });
    
                expect(fn)
                    .to.not.throw()
            })
        })
    })
})