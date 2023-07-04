/*  Event Routes
    /api/events
*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');
const router = Router();

router.use(validarJWT);

// Obtener eventos
router.get('/', getEvents);

// Crear eventos
router.post(
    '/', 
    [
        check('title', 'El titulo es obligatorio.').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria.').custom( isDate ),
        check('end', 'Fecha de finalización es obligatoria.').custom( isDate ),
        validarCampos
    ],
    createEvent
);

// Actualizar eventos
router.put('/:id', updateEvent);

// Borrar eventos
router.delete('/:id', deleteEvent);

module.exports = router;