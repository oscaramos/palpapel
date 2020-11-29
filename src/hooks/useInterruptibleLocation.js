import useLocation from "wouter/use-location"
import { createContext, useContext } from "react"

// using examples at this:
// https://github.com/molefrog/wouter/issues/105
// https://github.com/molefrog/wouter/issues/39
// https://codesandbox.io/s/wouter-interruptible-transition-2v7hs

const defaultMessage = "¿Esta seguro de cambiar de pagina, podría perder información si lo hace?"

const LockContext = createContext({
  lock: false,
  message: defaultMessage,
})

export function useInterruptibleLocationMessage() {
  const context = useContext(LockContext)

  const enable = (message) => {
    context.message = message || defaultMessage
    context.lock = true
  }

  const disable = () => {
    context.message = ""
    context.lock = false
  }

  return { enable, disable }
}

export function useInterruptibleLocation() {
  const context = useContext(LockContext)
  const [location, setLocation] = useLocation()

  const changeLocation = (newLocation) => {
    if (context.lock) {
      const performNavigation = window.confirm(context.message)
      if (performNavigation) {
        setLocation(newLocation)
        // disable futures message
        context.message = ""
        context.lock = false
      }
    } else {
      setLocation(newLocation)
    }
  }

  return [location, changeLocation]
}
