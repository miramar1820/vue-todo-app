
export const throttle = (callback, time) => {
    let throttleTimer = null;
    
    return function perform(...args) {
        // console.log();
        if (throttleTimer) return;
        throttleTimer = setTimeout(() => {
            callback(...args);
            clearTimeout(throttleTimer)
            throttleTimer = null
        }, time);
    }
}