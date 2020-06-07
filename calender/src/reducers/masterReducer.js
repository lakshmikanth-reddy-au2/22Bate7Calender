const initialState = {
    date: new Date(),
    selectedDate: null,
    view: "month",
    year: null,
    month: null,
    week: null,
    showEvents: true,
    showHolidays: true,
    checkboxes: {
        "events": true,
        "holidays": true
    },
    events: [{
        "7-5-2020":[ {
            "name": "Bday party",
            "date": 1591519482
        }],
        "8-11-2020":[ {
            "name": "Assignment submission",
            "date": 1591519482
        }],
        "1-8-2020":[ {
            "name": "Event handler",
            "date": 1591519482
        }],
        "12-5-2020":[ {
            "name": "Piano class",
            "date": 1591950600
        }],
        "17-5-2020":[ {
            "name": "Play cricket",
            "date": 1591519482
        }],

    }],
    holidays: {
        "7-5-2020":[ {
            "name": "Diwali",
            "date": 1591519482
        }],
        "12-11-2020":[ {
            "name": "Dussera",
            "date": 1591519482
        }],
        "11-8-2020":[ {
            "name": "Ugadhi",
            "date": 1591519482
        }],
        "12-6-2020":[ {
            "name": "Eykadashi",
            "date": 1591519482
        }],
        "15-7-2020":[ {
            "name": "Independence Day",
            "date": 1591519482
        }],

    }
}

export default function masterDataReducer(state = initialState, action){
    switch (action.type){
        case 'DATA':
            return {...state, data: 1}
        case 'VIEW':
            return {...state, view: action['payload']}
        case 'YEAR':
            return {...state, year: action['payload']}
        case 'MONTH':
            return {...state, month: action['payload']}
        case 'WEEK':
            return {...state, week: action['payload']}
        case 'SELECTDDATE':
            return {...state, selectedDate: action['payload']}
        case 'ADDEVENT':
            return {...state, events: action['payload']}
        case 'SHOWEVENT':
            return {...state, showEvents: action['payload']}
        case 'SHOWHOLIDAY':
            return {...state, showHolidays: action['payload']}
        case 'CHECKBOX':
            return {...state, checkboxes: action['payload']}
        default: 
            return state
    }
}