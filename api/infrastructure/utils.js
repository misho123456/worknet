function toObject(elasticHit) {
  let object = elasticHit._source

  object.id = elasticHit.id

  return object
}

module.exports = {
  toObject
}
