const jwt = require("jsonwebtoken")

const generateToken = (user) =>{
    return jwt.sign(
        {
            id: user._id,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email_address
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "30d",
        }
    )
}

module.exports = generateToken;

// music-
// https://res.cloudinary.com/dnvycge1x/video/upload/v1674651832/beat_store/lonely-girl-beat-9522_i4uqj7.mp3
//https://res.cloudinary.com/dnvycge1x/video/upload/v1674651908/beat_store/edm-deep-house-ish-female-vocal-112184_p1kjbo.mp3
//https://res.cloudinary.com/dnvycge1x/video/upload/v1680500546/beat_store/tomorrow-114848_fqqxob.mp3

//pics-
// https://res.cloudinary.com/dnvycge1x/image/upload/v1680500497/beat_store/artist-dazzling-on-stage_sag5nm.jpg
// https://res.cloudinary.com/dnvycge1x/image/upload/v1680500494/beat_store/wooden-guitar_lxrlsj.jpg
// https://res.cloudinary.com/dnvycge1x/image/upload/v1680500493/beat_store/woman-listening-to-music_gchthc.jpg
// https://res.cloudinary.com/dnvycge1x/image/upload/v1680500492/beat_store/vinyl_nik9s7.jpg
// https://res.cloudinary.com/dnvycge1x/image/upload/v1680500489/beat_store/producer-cooking_awgvp5.jpg
// https://res.cloudinary.com/dnvycge1x/image/upload/v1680500480/beat_store/black-girl-in-da-bush_mxexvz.jpg