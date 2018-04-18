let check = require('./index')

check.args([
    { 
        arg: 1, 
        err: 'err value',
        accept: {
            options: [1,2,3],
            err: 'err accept value'
        }
    },
    { 
        arg: 4, 
        err: 'err value 2',
        accept: {
            options: [1,2,3],
            err: 'err accept value 2'
        }
    }
])