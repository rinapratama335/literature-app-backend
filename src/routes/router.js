const express = require("express");
const router = express.Router();

const { auth, authAdmin } = require("../middlewares/authentication");

const {
  register: registration,
  login,
  checkAuth,
} = require("../controllers/auth");
const { upload } = require("../middlewares/uploadAvatar");
const { uploadFile } = require("../middlewares/uploadFile");
const { editAvatar, getAllUsers, deleteUser } = require("../controllers/user");
const {
  getApprovedLiteratures,
  getDetailLiterature,
  getLiteratureByKey,
  getLiteratureByKeyAndPublication,
  getLiteraturesByUser,
  addLiterature,
  listsLiteratures,
  editLiterature,
  getLiteraturesBySearch,
} = require("../controllers/literature");
const {
  addToMyCollections,
  getMyCollections,
  deleteItemCollection,
} = require("../controllers/mycollection");

router.post("/register", upload.single("avatar"), registration);
router.post("/login", login);
router.get("/auth", auth, checkAuth);
router.get("/users", auth, getAllUsers);
router.delete("/user/:id", auth, deleteUser);

router.patch("/edit-avatar", auth, upload.single("avatar"), editAvatar);

router.get("/search-literatures", auth, getLiteraturesBySearch);
// router.get("/literatures", auth, getLiteratureByKeyAndPublication);
router.get("/all-literatures", auth, getApprovedLiteratures);
router.get("/detail-literature/:id", auth, getDetailLiterature);
router.get("/my-literatures", auth, getLiteraturesByUser);
router.post("/add-literature", auth, uploadFile, addLiterature);
router.get("/literature/:id", auth, getDetailLiterature);
router.get("/list-literatures", auth, authAdmin, listsLiteratures);
router.patch("/edit-literature/:id", auth, authAdmin, editLiterature);

router.post("/mycollection/:id", auth, addToMyCollections);
router.get("/mycollections", auth, getMyCollections);
router.delete(
  "/mycollection/:userId/:literatureId",
  auth,
  deleteItemCollection
);

module.exports = router;
