const isEmpty = require('lodash/isEmpty')
const isObject = require('lodash/isObject')
const traverse = require('traverse')
const first = require('lodash/first')

const cleanOutput = obj =>
  traverse(obj).map(function (value) {
    if (value === null) this.delete()
    if (value === undefined) this.delete()
    if (Array.isArray(value || isObject(value)) && isEmpty(value)) {
      this.delete()
    }
    if (this.key === 'propertiesNotUsedByUi') this.delete()
    if (first(this.path) === 'attachments') this.delete()
  })

module.exports = cleanOutput
