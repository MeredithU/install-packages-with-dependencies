/**
 * Build a data structure from the data.
 *
 * @param {object} allDependencies
 * @param {array} input
 * @return {object}
 */
const fetchData = (allDependencies, input) => {
  let colonIndex,
      dependency,
      packageModule

  input.map(packageData => {
    let dependencies = {}
    colonIndex = packageData.indexOf(':')
    packageModule = packageData.substring(0, colonIndex)
    dependency = packageData.substring(colonIndex + 2)
    dependencies = {
      'package': packageModule,
      'dependency': dependency
    }
    allDependencies.set(packageModule, dependencies)
  })

  return allDependencies
}

/**
 * Determine whether a dependency is required.
 *
 * @param {object} allDependencies
 * @param {string} packageModule
 * @return {array}
 */
const findDependency = (allDependencies, packageModule) => {
  const dependencyOrder = []
  let nextPackage

  /**
   * Build an ordered list of packages that have dependencies.
   *
   * @param {string} key
   */
  const findAllDependencies = (key) => {
    const found = [...allDependencies].find(module => {
      return module[0] === key
    })

    /**
     * If package was found in allDependencies list, search for any dependencies it may have.
     *
     * If there are dependencies, take that dependency and search for whether it has any dependencies of its own.
     */
    if (found) {
      if (found[1].dependency.length !== 0) {
        nextPackage = found[1].dependency
        dependencyOrder.unshift(key)
        allDependencies.delete(key)
        findAllDependencies(nextPackage)
      } else {
        dependencyOrder.unshift(key)
        allDependencies.delete(key)
      }
    } else {
      dependencyOrder.unshift(key)
      allDependencies.delete(key)
    }
  }
  findAllDependencies(packageModule)

  return dependencyOrder

}

/**
 * Build and fetch dependency order of installation.
 *
 * @param {array} input
 * @return {string}
 */
const fetchInstallationOrder = (input) => {
  const installationOrder = []
  const allDependencies = new Map()

  fetchData(allDependencies, input)

  /**
   * Loop through allDependencies and build the installation order list.
   */
  allDependencies.forEach((value, key) => {
    const foundDependencies = findDependency(allDependencies, key)

    /**
     * If a cycle has been returned, throw an error.
     */
    if (foundDependencies.length > 1 && foundDependencies[0] === foundDependencies[foundDependencies.length - 1]) {
      throw new Error(`Cannot have a package installation that contains a cycle.`)
      return
    } else {
      foundDependencies.map(item => {
        if (installationOrder.indexOf(item) === -1) {
          installationOrder.push(item)
        }
      })
    }
  })

  return installationOrder.join(', ')
}


module.exports = {
  fetchData,
  fetchInstallationOrder,
  findDependency
}
