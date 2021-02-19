
let checksRun = 0

/**
 * health check
 */
async function check () {
  checksRun += 1
  return { checksRun }
}

module.exports = {
  check
}