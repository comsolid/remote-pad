
export const initialState = {
    player: 'alice',
    pad: {
        enabled: false,
        type: 'race'
    },
    mqtt: {
        hostname: window.location.hostname,
        port: 1884
    },
    accelerationSensibility: 4,
    profile: 'default',
    message: {
        text: '',
        type: '',
        show: false
    }
}
