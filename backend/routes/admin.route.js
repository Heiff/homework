const { Router } = require('express')
const { ExpertsDelete,ExpertsGet,ExpertsPost,ExpertsUpdate,CoursesDelete,CoursesGet,CoursesPost,CoursesUpdate } = require('../controllers/admin.controller');
const { Auth } = require('../controllers/auth.comtroller');
const router = Router()

router.post('/api/cards/post',Auth,ExpertsPost)
router.get('/api/cards/get',Auth ,ExpertsGet)
router.delete('/api/cards/delete/:id',Auth,ExpertsDelete)
router.put('/api/cards/put',Auth,ExpertsUpdate)
router.post('/api/course/post',Auth,CoursesPost)
router.get('/api/course/get',Auth ,CoursesGet)
router.delete('/api/course/delete/:id',Auth,CoursesDelete)
router.put('/api/course/put',Auth,CoursesUpdate)


module.exports = router