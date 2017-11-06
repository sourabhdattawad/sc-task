import fs from 'fs';
import http from 'http';
import https from 'https';
import promise from 'bluebird';
import helper from '../helpers/helper';
import sharp from 'sharp';
import logger from '../utils/logger';
import validUrl from 'valid-url';


/**
 * Image download handler
 * @param {string} url URL of the request image.
 * @returns {object} Resized image url 
 */


function download_image(url) {

    return new Promise((resolve, reject) => {

        //If invalid url reject the promise

        if (!(validUrl.isWebUri(url))) {
            reject({
                error: true,
                message: 'Invalid URL requested!'
            });
        }
        //Check for HTTP or HTTPS
        logger.debug('Creating promise for image downloading..');
        let connection_type = url.substring(0, 5);
        let connection = http;
        if (connection_type == 'https') {
            connection = https;
        }

        let responseSent = false; // flag to make sure that response is sent only once.
        connection.get(url, response => {
            let headers = response.headers['content-type'];
            let req_file_type = headers.split('/');
            console.log(req_file_type);
            console.log(response.statusCode);

            let uid = helper.generate_unique_id();
            let file_name = uid + '.' + req_file_type[1];

            let req_file_path = 'public/images/request/' + file_name;
            let resize_file_path = 'public/images/resize/' + file_name;
            let file = fs.createWriteStream(req_file_path);

            if (response.statusCode === 200 && image_handler_services.isvalid_file(req_file_type[1])) {
                response.pipe(file);

                logger.debug('Downloaded successfully...');

                file.on('finish', () => {

                    //'on' - finish call image-resizer
                    image_handler_services.image_resizer(50, 50, req_file_path, resize_file_path).then(() => {
                        logger.info('Successfully created thumbnail. Resolving promise...');
                        //return resized image
                        resolve({
                            error: false,
                            file_name: file_name
                        });
                    });
                });
            } else {
                //reject if any errors
                logger.error('Error creating thumbnail. Rejecting promise...');
                reject({
                    error: true,
                    message: "File doesn't exist or invalid file type!"
                });
            }

        }).on('error', err => {
            if (responseSent) return;
            responseSent = true;
            //reject if any errors
            logger.error('Error creating thumbnail. Rejecting promise...');
            reject(err);
        });
    });
}

/**
 * Image validation handler
 * @param {string} type Type of the image.
 * @returns {boolean} true if the type is supported, else false
 */

function isvalid_file(type) {
    let supported_type = { 'jpg': true, 'png': true, 'jpeg': true };
    return supported_type[type] === true;
}

/**
 * Image resize handler
 * @param {number}width Width of thumbnail.
 * @param {number}height Height of thumbnail.
 * @param {string}request Request image path.
 * @param {string}resize Resize image path.
 * @returns {object} resolves if successfull.
 */

function image_resizer(width, height, req_file, resize_file) {

    return new Promise((resolve, reject) => {
        console.log('Requesting image resizer');
        sharp(req_file)
            .resize(width, height)
            .toFile(resize_file, (err, info) => {
                logger.debug('Image resized successfully...');
                resolve();
            });
    });
}

let image_handler_services = {

    download_image: download_image,

    isvalid_file: isvalid_file,

    image_resizer: image_resizer


};

export default { download_image, isvalid_file, image_resizer };