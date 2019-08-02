module.exports = {
  /**
   * Perform a runtime check about an instance type. It returns true if all the specified keys are
   * different from undefined
   * @param {*} instance The instance to be checked
   * @param {string|string[]} keys The keys that must be defined while checking the instance type
   */
  is(instance, keys) {
    if (instance === undefined || instance === null) {
      return false;
    }
    if(!Array.isArray(keys)) {
      keys = [keys];
    }

    for(let i = 0, n = keys.length; i < n; i++) {
      if(instance[keys[i]] === undefined) {
        return false;
      }
    }
    return true;
  }
}
