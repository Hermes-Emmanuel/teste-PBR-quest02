const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

/**
 * Definindo esquema para o mongoose
 */

const Post = new Schema({
    tittle:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    }   
},
{
    timestamps: true,
});

mongoose.model('post',Post)