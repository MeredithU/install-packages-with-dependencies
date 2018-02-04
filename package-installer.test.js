import {
  fetchData,
  fetchInstallationOrder,
  findDependency
} from './package-installer'

describe('fetchData', () => {

  const allDependencies = new Map()
  const expected = new Map()
  const input = ['React: JavaScript', 'JavaScript: ']

  expected.set('React', { 'package': 'React', 'dependency': 'JavaScript' })
  expected.set('JavaScript', { 'package': 'JavaScript', 'dependency': '' })

  test('returns a Map object', () => {
    expect(fetchData(allDependencies, input)).toEqual(expected)
  })

})

describe('findDependency', () => {

  const allDependencies = new Map()
  const findPackage = 'React'
  const expected = ['JavaScript', 'React']

  allDependencies.set('React', { 'package': 'React', 'dependency': 'JavaScript' })
  allDependencies.set('JavaScript', { 'package': 'JavaScript', 'dependency': '' })

  test('returns dependency order if dependency is found', () => {
    expect(findDependency(allDependencies, findPackage)).toEqual(expected)
  })

})

describe('fetchDependencyInstallationOrder', () => {

  const input = [
    "React: JavaScript",
    "Redux: React",
    "JavaScript: ",
    "ES6: Babel",
    "Webpack: React",
    "Node: "
  ]
  const cycledInput = [
    "React: Redux",
    "ES6: Babel",
    "Babel: Webpack",
    "Redux: ",
    "Webpack: ES6",
    "Node: "
  ]
  const emptyInput = []
  const expected = 'JavaScript, React, Redux, Babel, ES6, Webpack, Node'

  function checkInput() {
    fetchInstallationOrder(cycledInput)
  }

  test('returns an empty string', () => {
    expect(fetchInstallationOrder(emptyInput)).toBe('')
  })

  test('returns dependency order', () => {
    expect(fetchInstallationOrder(input)).toEqual(expected)
  })

  test('throws an error when a cycle is found', () => {
    expect(checkInput).toThrowError(`Cannot have a package installation that contains a cycle.`)
  })
})
