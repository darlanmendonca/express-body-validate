module.exports = validate


function validate(modelName) {
  return async (req, res, next) => {
    const model = require('mongoose').model(modelName)
    const schema = model.schema.obj
    const errors = []

    // delete invalid
    const fields = Object.keys(schema)
    Object
      .keys(req.body)
      .forEach(key => {
        const valid = fields.some(item => item === key)
        if (!valid) {
          delete req.body[key]
        }
      })

    // validate required
    const requireds = fields.filter(field => schema[field].required && !req.body[field])
    if (requireds.length) {
      errors.push(...requireds.map(field => `${field} is required`))
    }

    // uniques
    const uniques = fields.filter(field => schema[field].unique)
    if (uniques.length) {
      let queries = []
      uniques.forEach(key => {
        const query = {}
        query[key] = req.body[key]
        queries.push(query)
      })
      const data = await model.find({$or: queries})
      const uniqueErrors = uniques
        .filter(key => data.some(item => item[key] === req.body[key]))
        .map(key => `${key} already used (${req.body[key]})`)

      errors.push(...uniqueErrors)
    }

    if (errors.length) {
      return res
        .status(400)
        .json({errors})
    }

    return next()
  }
}