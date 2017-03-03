/**
* Useful async functions
**/

function asyncLoop(max, iteration, func, callback) {
  if (max <= iteration) {
    return callback(null)
  }
  new Promise( (fulfill, reject) => {
    func(iteration, () {
      fulfill()
    })
  }, () => {
    iteration++
    asyncLoop(max, iteration, func, callback)
  })
}

module.exports.asyncLoop = asyncLoop
