export const mapOrder = (originalArray, orderArray, key) => {
  if (!originalArray || !orderArray || !key) return []

  return orderArray.map((id) => originalArray.find((item) => item[key] === id))
}

/**
 * Example:

const originalItems = [
  { id: 'id-1', name: 'One' },
  { id: 'id-2', name: 'Two' },
  { id: 'id-3', name: 'Three' },
  { id: 'id-4', name: 'Four' },
  { id: 'id-5', name: 'Five' }
]
const itemOrderIds = ['id-5', 'id-4', 'id-2', 'id-3', 'id-1']
const key = 'id'

const orderedArray = mapOrder(originalItems, itemOrderIds, key)
console.log('Original:', originalItems)
console.log('Ordered:', orderedArray)
/**
   * Results:
   *
   * Original: Of course, nothing changes =))
   *
   * Ordered:
   *  [
        { id: 'id-5', name: 'Five' },
        { id: 'id-4', name: 'Four' },
        { id: 'id-2', name: 'Two' },
        { id: 'id-3', name: 'Three' },
        { id: 'id-1', name: 'One' }
    * ]
   */
