export function setupCounter(element) {
    var counter = 0;
    var setCounter = function (count) {
        counter = count;
        element.innerHTML = "count is ".concat(counter);
    };
    element.addEventListener('click', function () { return setCounter(++counter); });
    setCounter(0);
}
