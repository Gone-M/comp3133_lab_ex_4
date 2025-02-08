const fs = require('fs');
const mongoose = require('mongoose');
const User = require('./models/User'); // Kullanıcı modelini içe aktar
require('dotenv').config();

// MongoDB'ye bağlan
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// JSON dosyasını oku
const users = JSON.parse(fs.readFileSync('./UsersData.json', 'utf-8'));

// JSON verisini MongoDB'ye ekle
const importData = async () => {
    try {
        await User.insertMany(users.map(user => ({
            username: user.username,
            email: user.email,
            city: user.address.city,
            website: user.website,
            zip_code: user.address.zipcode,
            phone: user.phone
        })));

        console.log('Data imported successfully!');
        process.exit();
    } catch (error) {
        console.error('Error importing data:', error);
        process.exit(1);
    }
};

importData();
