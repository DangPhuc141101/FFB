const mongoose = require('mongoose');

const Field = require('../models/fields');

const connectDB = require('../configs/dbConfig');
connectDB();
const n = 20;

const createFakeData = (n) =>{
    Field.deleteMany({})
        .then(()=>{
            console.log("sucess!")
        });
    for (let i=0; i<20; i++)
    {
        const field = new Field({
            name: 'Chuyen Viet Field',
            price: [
                {
                    start: '16:30',
                    end: '18:30',
                    price: 200000
                }
            ],
            category: '7',
            address: {
                streetAddreess: '37 Nguyen Huu Tho',
                city: 'Da Nang',
                district: 'Thanh Khe'
            },
            description: 'Tọa lạc tại vị trí đắc địa ngay trung tâm Đà Nẵng',
        })
        field.save()
            .then(()=>{
                //console.log("save one");
            })
            .catch(e =>{
                console.log("err, ", e);
            })
    }
}

createFakeData();