const mongoose = require('mongoose');

const Field = require('../models/fields');
const Account = require('../models/accounts');
const connectDB = require('../configs/dbConfig');
connectDB();

const n = 20;

const createFakeData = async(n) => {
    Field.deleteMany({})
        .then(() => {
            console.log("sucess!")
        });
    await Account.deleteMany({});
    const email = 'admin@gmail.com', username = '012345', password = 'admin';
    const user = new Account({ email, phone : username, username });
    const registerUser = await Account.register(user, password);
    await user.save();
    for (let i = 0; i < 20; i++) {
        const field = new Field({
            name: 'Chuyen Viet Field',
            prices: [
                {
                    start: '16:30',
                    end: '18:30',
                    price: 200000
                },
                {
                    start: '18:30',
                    end: '20:30',
                    price: 800000
                }
            ],
            category: '7',
            address: '37 Nguyen Huu Tho Da Nang Thanh Khe',
            description: 'Tọa lạc tại vị trí đắc địa ngay trung tâm Đà Nẵng',
            images: [
                {
                    url: 'https://res.cloudinary.com/duy-t-n/image/upload/v1637834390/YelpCamp/b9qfhvaaiyrcwf6adoev.jpg',
                    filename: 'YelpCamp/b9qfhvaaiyrcwf6adoev',
                  },
                  {
                    url: 'https://res.cloudinary.com/duy-t-n/image/upload/v1637834398/YelpCamp/jskii6ieit1nzt2egpkd.jpg',
                    filename: 'YelpCamp/jskii6ieit1nzt2egpkd',
                  }
            ],
            utilities: 'Wifi, Giày',
            geometry : {
                type : 'Point',
                coordinates : [16.0372021, 108.2129164]
            },
            author : user._id
        })
        field.save()
            .then(() => {
                console.log("save one");
            })
            .catch(e => {
                console.log("err, ", e);
            })
    }
}

createFakeData();