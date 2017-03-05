/**
* Useful async functions
**/

function asyncLoop(max, iteration, func, callback) {
  new Promise( (fulfill, reject) => {
    func(iteration, (err) => {
      if (err) reject(err)
      fulfill()
    })
  }).then( () => {
    iteration++
    if (iteration < max) {
      return asyncLoop(max, iteration, func, callback)
    }
    return callback(null)
  }).catch( (err) => {
    return callback(err)
  })
}

module.exports.asyncLoop = asyncLoop
