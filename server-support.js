"use strict"

function closePr(github, data, reject) {
  console.log("close PR", data, reject);

  github.issues.edit({
    user: data.repository.owner.login, // 'fbsamples'
    repo: data.repository.name, // 'bot-testing'
    number: data.pull_request.number, // 23
    state: 'closed'
  }, function(err) {
    if (err) {
      if (typeof reject === 'function') {
        return reject(err);
      }
    }
  })
}

module.exports = {
  closePr
}
