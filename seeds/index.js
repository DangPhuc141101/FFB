const mongoose = require('mongoose');

const Field = require('../models/fields');
const Account = require('../models/accounts');
const connectDB = require('../configs/dbConfig');
connectDB();

const n = 20;

const getTime = (start, end) => {
    const result = [];
    const startHour = start.split(':')[0], startMinute = start.split(':')[1];
    const endHour = end.split(':')[0], endMinute = end.split(':')[1];
    for (let i = parseInt(startHour); i != parseInt(endHour); i++)
    {
        const hour = (i) % 24;
        const strHour = (hour>=10) ? hour.toString() : '0'+hour.toString();
        const temp = ((hour+1)>=10) ? (hour+1).toString() : '0'+(hour+1).toString();
        if (hour + 1 == parseInt(endHour)) {
            if (parseInt(startMinute) <= parseInt(endMinute)) result.push(`${strHour}:${startMinute} - ${endHour}:${startMinute}`);
        }
        else result.push(`${strHour}:${startMinute} - ${temp}:${startMinute}`);
    }
    return result;
}

module.exports.createFakeData = async(n) => {
    Field.deleteMany({})
        .then(() => {
            console.log("sucess!")
        });
    await Account.deleteMany({});
    const email = 'admin@gmail.com', username = '012345', password = 'admin';
    const user = new Account({ email, phone : username, username, accountType : 'Admin' });
    const registerUser = await Account.register(user, password);
    await user.save();
    const prices = [
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
    ]
    const times = [];
    for (let i = 0; i<prices.length; i++)
    {
        const time = getTime(prices[i].start, prices[i].end);
        times.push(...time);
    }
    const lastTime = [... new Set(times)];

    for (let i = 0; i < 20; i++) {
        const field = new Field({
            name: 'Chuyen Viet Field',
            prices : prices,
            times : [...lastTime],
            category: '7',
            address: '37 Nguyen Huu Tho Da Nang Thanh Khe',
            description: 'Tọa lạc tại vị trí đắc địa ngay trung tâm Đà Nẵng',
            images: [
                {
                    url: 'https://res.cloudinary.com/duy-t-n/image/upload/v1648345004/FieldFootBall/tp5ubbxl7jwnzds1spvs.jpg',
                    filename: 'FieldFootBall/tp5ubbxl7jwnzds1spvs',
                  },
                  {
                    url: 'https://res.cloudinary.com/duy-t-n/image/upload/v1648344478/FieldFootBall/ylamtjcpx0mvbuzzwavb.jpg',
                    filename: 'FieldFootBall/ylamtjcpx0mvbuzzwavb',
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

// createFakeData();