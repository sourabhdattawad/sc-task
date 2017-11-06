import express from 'express';
import json_patch_service from '../lib/json_patch.service';
import image_handler_service from '../lib/image_handler.service';
import logger from '../utils/logger';
import _ from 'underscore';


const router = express.Router();



router.get('/', (req, res) => {
    logger.info('/GET admin requested');
    res.json(req.decoded);
});

router.post('/', (req, res) => {
    res.json(req.decoded);
});

router.post('/json-patch', (req, res) => {

    let doc;
    let patch;
    let patched_doc;

    logger.info('/POST json-patch');
    logger.debug('Trying to patch json...');

    //Convert to string data-type for uniform parsing
    if (!(_.isString(req.body.json_object))) {
        req.body.json_object = JSON.stringify(req.body.json_object);

    }
    if (!(_.isString(req.body.json_patch))) {
        req.body.json_patch = JSON.stringify(req.body.json_patch);

    }

    try {
        doc = JSON.parse(req.body.json_object);
        patch = JSON.parse(req.body.json_patch);
        patched_doc = json_patch_service.apply_patch(doc, patch);
        logger.info('Successfully patched');
        //return the patched doc
        res.json({
            'error': false,
            'patched_doc': patched_doc
        });

    } catch (err) {
        if (err instanceof SyntaxError) {
            err = String(err);
        }

        logger.error('Error patching json..');
        //return error and message
        res.json({
            'error': true,
            'message': err
        });
    }

});

router.post('/create-thumbnail', (req, res) => {

    logger.info('/POST create-thumbnail');
    logger.debug('Creating thumbnail..');

    //call image handler services

    image_handler_service.download_image(req.body.image_url).then(value => {
        //return host-relative url as json response
        value.resize_file_url = req.protocol + '://' + req.get('host') + '/images/resize/' + value.file_name;
        logger.info('Successfully created thumbnail.');
        res.json(value);

    }).catch(err => {
        //response error if any error
        logger.error('Error creating thumbnail.', err);
        res.json(err);

    });

});



export default router;