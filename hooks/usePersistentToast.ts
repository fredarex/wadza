import { useState } from 'react'
import { toast, TypeOptions } from 'react-toastify'

/**
 * @param  {string} message - Message to display.
 * @param  {string} [type='default'] - Type of toast to display (success, error, warning, info, default).
 * @returns {[Function, Function]} { trigger, dismiss }
 */
const usePersistentToast = (
  message = '',
  type: TypeOptions = 'default',
) => {
  const [persistentToastID, setPersistentToastID] = useState<React.ReactText>()

  /**
   * Dismisses the current toast and triggers a new one. If no toast is active, it will trigger a new one.
   */
  const trigger = () => {
    toast.dismiss(persistentToastID)
    const toastID = toast(message, {
      type,
      autoClose: false,
      closeButton: false,
    })
    setPersistentToastID(toastID)
  }

  /**
   * Dismisses the current toast.
   */
  const dismiss = () => {
    setPersistentToastID(undefined)
    toast.dismiss(persistentToastID)
  }

  return { trigger, dismiss }
}

export default usePersistentToast
