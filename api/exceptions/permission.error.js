class PermissionError extends Error {
  constructor(message) {
    super(message)
    Error.captureStackTrace(this, this.constructor)

    this.name = 'PermissionError'
    this.message = message
  }
}

module.exports = PermissionError
