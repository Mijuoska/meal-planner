const config = {


 weekdays: [{
        value: "monday",
    },
    {
        value: "tuesday",
    },
    {
        value: "wednesday",
    },
    {
        value: "thursday",
    },
    {
        value: "friday",
    },
    {
        value: "saturday",
    },
    {
        value: "sunday",
    },
],

meals: [{
        value: "lunch",
    },
    {
        value: "dinner",
    },
],
_getLabels: function (prop) {
        return this[prop].map((obj) => {
            obj['label'] = obj.value.replace(/^\w{1}/, obj.value[0].toUpperCase())
            return obj
        });
    },

    get weekdayLabels() {
        return this._getLabels('weekdays');
    },

    get mealLabels() {
        return this._getLabels('meals');
    },
}

export default config