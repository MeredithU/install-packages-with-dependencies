const { fetchInstallationOrder } = require('./package-installer')

/**
 * Package and dependency data
 */
const INPUT_DATA =  [
  "React: JavaScript",
  "Redux: React",
  "JavaScript: ",
  "ES6: Babel",
  "Webpack: React",
  "Node: "
]

// const INPUT_DATA =  [
//   "React: Redux",
//   "ES6: Babel",
//   "Babel: Webpack",
//   "Redux: ",
//   "Webpack: ES6",
//   "Node: "
// ]

// const INPUT_DATA = [ "React: JavaScript", "JavaScript: " ]

const installationOrder = fetchInstallationOrder(INPUT_DATA)

console.log(installationOrder)
