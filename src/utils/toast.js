import {Position, Toaster, Intent} from '@blueprintjs/core'

export function successToast(message) {
  Toaster
    .create({position: Position.TOP})
    .show({iconName: 'tick', intent: Intent.SUCCESS, message})
}

export function errorToast(message) {
  Toaster
    .create({position: Position.TOP})
    .show({iconName: 'error', intent: Intent.DANGER, message: message})
}
