const mongoose = require('mongoose')
const dateString = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getUTCFullYear()}`

const investSchema = mongoose.Schema({
    open: {
        type: Date,
        require:true
    },
    close: {
        type: Date,
        require:true
    }
})