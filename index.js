const throwIfMissing = arg => {
  throw new Error(`${arg} is not defined!`)
}

module.exports.one = function ({ arg, err, accept } = throwIfMissing`object`) {
  if (accept && !accept.options) throwIfMissing`accept.options`;
  else if (accept && !Array.isArray(accept.options)) throw new Error('accept.options is not Array!')

  //Check exist argument
  if (!arg) throw new Error(err || 'one argument has not been defined!')
  if (typeof arg === 'object') throw new Error('arg can\'t be a object')

  //Check if argument is accepted
  if (accept && accept.options) {
    if (!accept.options.find(i => {
      if (typeof i === 'string') i = i.toLowerCase();
      if (typeof arg === 'string') arg = arg.toLowerCase();
      return i === arg
    })) {
      throw new Error(accept.err || 'one argument has not been accepted!')
    }
  }
}

module.exports.list = function (array = throwIfMissing`array`) {
  array.map(i => this.one(i))
}