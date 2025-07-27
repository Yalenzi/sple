// Storage utilities to handle localStorage safely

export const clearOldStorage = () => {
  try {
    // Clear old storage keys that might be causing quota issues
    const keysToRemove = [
      'pharmaquest-questions',
      'pharmaquest-store',
    ]
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key)
    })
    
    console.log('Old storage cleared successfully')
  } catch (error) {
    console.error('Error clearing old storage:', error)
  }
}

export const getStorageSize = () => {
  try {
    let total = 0
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length
      }
    }
    return total
  } catch (error) {
    console.error('Error calculating storage size:', error)
    return 0
  }
}

export const isStorageAvailable = () => {
  try {
    const test = '__storage_test__'
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch (error) {
    return false
  }
}
