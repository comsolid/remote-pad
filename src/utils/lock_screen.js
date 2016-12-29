const call = function (object, fnNames) {
    Array.prototype.forEach.call(fnNames, function (fn) {
        if (fn in object) {
            object[fn]()
            return false
        }
    })
}

/**
 * Request to go Fullscreen, that is, orientation landscape-primary locked
 */
export default function lockScreen () {
    call(document.documentElement, [
        'requestFullscreen',
        'mozRequestFullScreen',
        'webkitRequestFullscreen',
        'msRequestFullscreen'
    ])

    window.screen.orientation.lock(window.screen.orientation.type)
}