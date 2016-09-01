import moment from 'moment'

export function guessType(value){
  if ((typeof value) === 'string'){
    if (value.match(/^http(s)?:\/\/[^ ]+(bmp|png|jpg|jpeg|gif)$/)
    || value.match(/^\/[^ ]+(bmp|png|jpg|jpeg|gif)$/)){
      return "image"
    } else if (value.match(/^http(s)?:\/\/[^ ]+$/)){
      return "url"
    } else if (value.match(/^<[a-z]+>.*<[a-z]+\/>/)){
      return "richtext"
    } else if (value.match(/^[0-9]+(\.[0-9]*)?$/)){
      return "number"
    } else if (moment(value, [
        moment.ISO_8601,   
        "YYYY-MM-DD",
        "YYYY/MM/DD",
        "DD/MM/YYYY"
      ], true).isValid()){
      return "date"
    } else {
      return "string"
    }
  } else if ((typeof value) === 'number'){
    return "number"
  } else {
    return "unknown"
  }
}

function unify(type1, type2){
  if (!type1) return type2
  if (type1 == type2) return type1
  if (type1 == "richtext" && type2 == "string") return "richtext"
  if (type1 == "string" && type2 == "richtext") return "richtext"
  // if ((type1 == "string") && (type2 != "string")){
  //   return "string"
  // }
  return "string"
}

export function guessTypeFromValues(values){
  const nonEmptyValues = values.filter(s => ((typeof s) != 'string') || s.length > 0)
  if (nonEmptyValues.length == 0) return "string"
  // console.log("guessTypeFromValues", values)
  const type = nonEmptyValues.map(guessType).reduce(unify, false)
  // console.log(" => ", type)
  return type
}