module.exports = {
    checkForDoubleClickEvent
}

function checkForDoubleClickEvent(e, events, previousEvent, doubleClickDelay) {
    if (!events.includes('dblclick') || previousEvent.type !== 'click' || e.type !== 'click') return e;
    if ((new Date()).getTime() - previousEvent.time > doubleClickDelay) {
        return e;
    }
    return {
        type: 'dblclick',
        target: e.target,
        isTrusted: e.isTrusted,
        currentTarget: e.currentTarget,
        childNodes: e.childNodes,
        children: e.children,
        offsetX: e.offsetX,
        offsetY: e.offsetY,
        pageX: e.pageX,
        pageY: e.pageY,
        screenX: e.screenX,
        screenY: e.screenY,
        shiftKey: e.shiftKey,
        metaKey: e.metaKey,
        ctrlKey: e.ctrlKey,
        x: e.x,
        y: e.y,
        srcElement: e.srcElement
    };
}