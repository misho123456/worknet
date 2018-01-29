class RecordError extends Error {
  constructor(message, statusCode) {
    super(message)
    Error.captureStackTrace(this, this.constructor)

    this.name = 'RecordError'
    this.message = message
    this.statusCode = statusCode || 400
  }
}

module.exports = RecordError
