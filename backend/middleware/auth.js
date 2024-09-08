const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token'); // Token'ı alın

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' }); // Token yoksa hata döndür
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Token'ı doğrulayın
        req.userId = decoded.userId; // Kullanıcı ID'sini ekleyin
        next(); // Middleware'i geçin
    } catch (err) {
        console.error('Token verification error:', err); // Hata loglama
        res.status(401).json({ msg: 'Invalid token' }); // Token geçersizse hata döndür
    }
};
