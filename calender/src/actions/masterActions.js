export function viewAction(data) {
    return{
        type: "VIEW",
        payload: data
    }
}

export function yearChangeAction(data) {
    return{
        type: "YEAR",
        payload: data
    }
}

export function monthChangeAction(data) {
    return{
        type: "MONTH",
        payload: data
    }
}

export function weekChangeAction(data) {
    return{
        type: "WEEK",
        payload: data
    }
}

export function selectedDateAction(data) {
    return{
        type: "SELECTDDATE",
        payload: data
    }
}

export function addEventAction(data) {
    return{
        type: "ADDEVENT",
        payload: data
    }
}

export function showEventsAction(data) {
    return{
        type: "SHOWEVENT",
        payload: data
    }
}

export function showHolidaysAction(data) {
    return{
        type: "SHOWHOLIDAY",
        payload: data
    }
}

export function checkBoxesAction(data) {
    return{
        type: "CHECKBOX",
        payload: data
    }
}