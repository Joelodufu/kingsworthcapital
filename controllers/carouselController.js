const Carousel = require('../models/carousel');
const multer = require('multer');

module.exports = {
    getCarousel: (req, res, next) => {
        Carousel
            .find()
            .exec()
            .then(corousels => {
                const response = {
                    count: corousels.length,
                    carouse: Carousels.map(carousel => {
                        return {
                            name: carousel.name,
                            description: carousel.description,
                            image: carousel.image,
                            date: carousel.image
                        }
                    })
                }
                res.render('default/index', response)
            })
            .catch()
    }
}