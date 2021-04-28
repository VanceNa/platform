const compose = (first, second, ...rest) => {
  return composeInner('', first, second, ...rest)
}

const composeInner = (key, first, second, ...rest) => {
  if (!first) {
    return second
  }
  if (!second) {
    return first
  }
  if (
    typeof first !== typeof second ||
    (typeof first === typeof second && typeof first !== 'object')
  ) {
    throw new Error(
      `Invalid Store combination of '${first}' and '${second}' at key: ${key}`
    )
  }

  const keys = Array.from(
    new Set(Object.keys(first).concat(Object.keys(second)))
  )
  const combined = keys.reduce((acc, curr) => {
    acc[curr] = composeInner(key + '.' + curr, first[curr], second[curr])
    return acc
  }, {})

  if (!rest) {
    return combined
  } else {
    return composeInner(key, combined, ...rest)
  }
}

// console.log(
//   compose(
//     { a: 1 },
//     { a: 2 }
//   )
// )

// console.log(
//   compose(
//     {
//       state: { a: 1, ex: { a: 1 } },
//       mutations: { b: 2 },
//     },

//     {
//       mutations: { a: 2, tb: 12 },
//     },

//     {
//       state: { b: 2, ex: { g: 1 } },
//       //   mutations: { t: 123 },
//     },

//     {
//       state: { g: 2 },
//       mutations: { t: 3 },
//     }
//   )
// )
export default compose
// module.exports = compose
