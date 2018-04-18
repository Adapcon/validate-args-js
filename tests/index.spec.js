const { expect } = require('chai')
const sinon = require('sinon')

const check = require('../index')

const DEFAULT_ERROR_OBJECT_NOT_DEFINED = 'object is not defined!';
const DEFAULT_ERROR_ARRAY_NOT_DEFINED = 'array is not defined!';
const DEFAULT_ERROR_ARG_OBJECT = 'arg can\'t be a object';
const DEFAULT_ERROR_OPTIONS_NOT_DEFINED = 'accept.options is not defined!';
const DEFAULT_ERROR_OPTIONS_NOT_ARRAY = 'accept.options is not Array!';
const DEFAULT_OBJECT_ERROR = 'one argument has not been defined!';
const DEFAULT_ACCEPT_ERROR = 'one argument has not been accepted!';
const CUSTOM_OBJECT_ERROR = 'test object error';
const CUSTOM_ACCEPT_ERROR = 'test accept error';


describe('import', async () => {
    it('should return a function when importing the module', async () => {
        expect(check.arg).to.be.an('function');
        expect(check.args).to.be.an('function');
    })
})

describe('throw if required parameters are not defined', async () => {
    describe('one', async () => {
        it('should if object is not defined', async () => {
            let fn = () => check.arg()
    
            expect(fn)
                .to.throw()
                .to.have.property('message', DEFAULT_ERROR_OBJECT_NOT_DEFINED)
        })
    
        it('should if object.arg is object', async () => {
            let fn = () => check.arg({
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
            let fn = () => check.arg({
                arg: 'test arg',
                err: 'test err',
                accept: {}
            });
    
            expect(fn)
                .to.throw()
                .to.have.property('message', DEFAULT_ERROR_OPTIONS_NOT_DEFINED)
        })
    
        it('should if object.accept is defined and object.accept.options is not Array', async () => {
            let fn = () => check.arg({
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
    describe('list', async () => {
        it('should if object is not defined', async () => {
            let fn = () => check.args()
    
            expect(fn)
                .to.throw()
                .to.have.property('message', DEFAULT_ERROR_ARRAY_NOT_DEFINED)
        })
    
        it('should if object.arg is object', async () => {
            let fn = () => check.args([{
                arg: {
                    test: 'test'
                },
                err: 'test err'
            }])
    
            expect(fn)
                .to.throw()
                .to.have.property('message', DEFAULT_ERROR_ARG_OBJECT)
        })
    
        it('should if object.accept is defined and object.accept.options is not defined', async () => {
            let fn = () => check.args([{
                arg: 'test arg',
                err: 'test err',
                accept: {}
            }]);
    
            expect(fn)
                .to.throw()
                .to.have.property('message', DEFAULT_ERROR_OPTIONS_NOT_DEFINED)
        })
    
        it('should if object.accept is defined and object.accept.options is not Array', async () => {
            let fn = () => check.args([{
                arg: 'test arg',
                err: 'test err',
                accept: {
                    options: 'test'
                }
            }]);
    
            expect(fn)
                .to.throw()
                .to.have.property('message', DEFAULT_ERROR_OPTIONS_NOT_ARRAY)
        })
    })
})

describe('execution', async () => {
    describe('one', async () => {
        describe('without using an accept feature', async () => {
            it('should use a string for arg and string for err ', async () => {
                let fn = () => check.arg({
                    arg: 'test name',
                    err: CUSTOM_OBJECT_ERROR
                });

                expect(fn).to.not.throw()
            })

            it('should use a undefined for arg and string for err', async () => {
                let fn = () => check.arg({
                    arg: undefined,
                    err: CUSTOM_OBJECT_ERROR
                });

                expect(fn).to.throw().to.have.property('message', CUSTOM_OBJECT_ERROR)
            })

            it('should use a undefined for arg and undefined for err', async () => {
                let fn = () => check.arg({
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
                    let fn = () => check.arg({
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
                    let fn = () => check.arg({
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
                    let fn = () => check.arg({
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
                    let fn = () => check.arg({
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
                    let fn = () => check.arg({
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
                    let fn = () => check.arg({
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
                    let fn = () => check.arg({
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
                    let fn = () => check.arg({
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

            describe('test null', async () => {
                it('should use \"null\" for arg, [1, \'f\'] for accept.options', async () => {
                    let fn = () => check.arg({
                        arg: null,
                        err: CUSTOM_OBJECT_ERROR,
                        accept: {
                            options: [1, 'f'],
                            err: CUSTOM_ACCEPT_ERROR,
                        }
                    });

                    expect(fn)
                        .to.throw()
                        .to.have.property('message', CUSTOM_OBJECT_ERROR)
                })
            })
        })
    })

    describe('list', async () => {
        describe('without using an accept feature', async () => {
            it('should use a string for arg and string for err ', async () => {
                let fn = () => check.args([{
                    arg: 'test name',
                    err: CUSTOM_OBJECT_ERROR
                }]);

                expect(fn).to.not.throw()
            })

            it('should use a undefined for arg and string for err', async () => {
                let fn = () => check.args([{
                    arg: undefined,
                    err: CUSTOM_OBJECT_ERROR
                }]);

                expect(fn).to.throw().to.have.property('message', CUSTOM_OBJECT_ERROR)
            })

            it('should use a undefined for arg and undefined for err', async () => {
                let fn = () => check.args([{
                    arg: undefined,
                    err: undefined
                }]);

                expect(fn)
                    .to.throw()
                    .to.have.property('message', DEFAULT_OBJECT_ERROR)
            })
        })

        describe('using an accept feature', async () => {
            describe('test string', async () => {
                it('should use \'3\' for arg, [\'1\',\'2\'] for accept.object and default for accept.err', async () => {
                    let fn = () => check.args([{
                        arg: '3',
                        err: CUSTOM_OBJECT_ERROR,
                        accept: {
                            options: ['1', '2']
                        }
                    }]);

                    expect(fn)
                        .to.throw()
                        .to.have.property('message', DEFAULT_ACCEPT_ERROR)
                })

                it('should use \'3\' for arg, [\'1\',\'2\'] for accept.object and string for accept.err', async () => {
                    let fn = () => check.args([{
                        arg: '3',
                        err: CUSTOM_OBJECT_ERROR,
                        accept: {
                            options: ['1', '2'],
                            err: CUSTOM_ACCEPT_ERROR,
                        }
                    }]);

                    expect(fn)
                        .to.throw()
                        .to.have.property('message', CUSTOM_ACCEPT_ERROR)
                })

                it('should use \'1\' for arg, [\'1\',\'2\'] for accept.options', async () => {
                    let fn = () => check.args([{
                        arg: '1',
                        err: CUSTOM_OBJECT_ERROR,
                        accept: {
                            options: ['1', '2'],
                            err: CUSTOM_ACCEPT_ERROR,
                        }
                    }]);

                    expect(fn)
                        .to.not.throw()
                })
            })

            describe('test number', async () => {
                it('should use 1 for arg, [1, 2] for accept.options', async () => {
                    let fn = () => check.args([{
                        arg: 1,
                        err: CUSTOM_OBJECT_ERROR,
                        accept: {
                            options: [1, 2],
                            err: CUSTOM_ACCEPT_ERROR,
                        }
                    }]);

                    expect(fn)
                        .to.not.throw()
                })
            })

            describe('test case sensitive', async () => {
                it('should use \'m\' for arg, [\'M\', \'F\'] for accept.options', async () => {
                    let fn = () => check.args([{
                        arg: 'm',
                        err: CUSTOM_OBJECT_ERROR,
                        accept: {
                            options: ['M', 'F'],
                            err: CUSTOM_ACCEPT_ERROR,
                        }
                    }]);

                    expect(fn)
                        .to.not.throw()
                })

                it('should use \'M\' for arg, [\'m\', \'f\'] for accept.options', async () => {
                    let fn = () => check.args([{
                        arg: 'M',
                        err: CUSTOM_OBJECT_ERROR,
                        accept: {
                            options: ['m', 'f'],
                            err: CUSTOM_ACCEPT_ERROR,
                        }
                    }]);

                    expect(fn)
                        .to.not.throw()
                })
            })

            describe('test random', async () => {
                it('should use 1 for arg, [\'M\', 1, \'f\'] for accept.options', async () => {
                    let fn = () => check.args([{
                        arg: 1,
                        err: CUSTOM_OBJECT_ERROR,
                        accept: {
                            options: ['M', 1, 'f'],
                            err: CUSTOM_ACCEPT_ERROR,
                        }
                    }]);

                    expect(fn)
                        .to.not.throw()
                })

                it('should use \'f\' for arg, [\'f\', \'M\', 1] for accept.options', async () => {
                    let fn = () => check.args([{
                        arg: 'f',
                        err: CUSTOM_OBJECT_ERROR,
                        accept: {
                            options: ['f', 'M', 1],
                            err: CUSTOM_ACCEPT_ERROR,
                        }
                    }]);

                    expect(fn)
                        .to.not.throw()
                })
            })

            describe('test null', async () => {
                it('should use \"null\" for arg, [1, \'f\'] for accept.options', async () => {
                    let fn = () => check.args([{
                        arg: null,
                        err: CUSTOM_OBJECT_ERROR,
                        accept: {
                            options: [1, 'f'],
                            err: CUSTOM_ACCEPT_ERROR,
                        }
                    }]);

                    expect(fn)
                        .to.throw()
                        .to.have.property('message', CUSTOM_OBJECT_ERROR)
                })
            })
        })
    })
})