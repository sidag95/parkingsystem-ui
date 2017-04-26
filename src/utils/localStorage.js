export function getItemFromLocalStorage(itemName) {
  return window.localStorage.getItem(itemName)
}

export function setItemToLocalStorage(itemName, itemValue) {
  window.localStorage.setItem(itemName, itemValue)
  return
}
