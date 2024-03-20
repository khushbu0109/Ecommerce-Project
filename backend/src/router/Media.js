const express = require("express");
const Mediamodel = require("../models/media");
const router = express.Router();
const path = require("path");
const fetchUser = require("../middleware/fetchtoken");
const sharp = require("sharp");

async function getmeta() {
  try {
    let newpath = path.join (
      process.cwd(),
      "static/image",
      "1691678347947_IMG_7362.png"
    );
    const metadata = await sharp(newpath).metadata();
    console.log(metadata);
  } catch (error) {
    console.log(error);
  }
}

router.get("/asdf", async (req, res) => {
  getmeta();
  res.status(200).json({ status: "asdf" });
});

router.get("/", async (req, res) => {
  try {
    const oldMedia = await Mediamodel.find().sort({ _id: -1 });
    res
      .status(200)
      .json({ status: "Success", message: "Data found", data: oldMedia });
  } catch (error) {
    res.status(202).json({
      status: "Failed",
      message: "Server internal error",
      err: error.message,
    });
  }
});

/* For Create*/
router.post("/uploadmedia", async (req, res) => {
  try {
    let insertstatus = false;
    let data = [];
    console.log(req.files);
    if (req.files.file.length > 0) {
      for (let i = 0; i < req.files.file.length; i++) {
        const element = req.files.file[i];
        let filename = Date.now() + "_" + element.name;
        let newpath = path.join(process.cwd(), "static/image", filename);
        const imagepath =
          req.protocol + "://" + req.get("host") + "/media/image/" + filename;
        element.mv(newpath);
        const media = new Mediamodel({
          m_type: element.mimetype,
          m_url: imagepath,
          m_size: element.size,
        });

        const med = await media.save();
        if (med) {
          insertstatus = true;
          data.push(med);
        } else {
          insertstatus = false;
        }
      }
    } else {
      const element = req.files.file;
      let filename = Date.now() + "_" + element.name;
      let newpath = path.join(process.cwd(), "static/image", filename);
      const imagepath =
        req.protocol + "://" + req.get("host") + "/media/image/" + filename;
      element.mv(newpath);

      getPath(filename);



      const media = new Mediamodel({
        m_type: element.mimetype,
        m_url: imagepath,
        m_size: element.size,
      });
      const med = await media.save();
      data.push(med);
      if (med) {
        insertstatus = true;
      } else {
        insertstatus = false;
      }
    }
    if (insertstatus) {
      res.status(200).json({
        status: "success",
        message: "file upload successfully",
        data: data,
      });
    } else {
      res.status(202).json({ status: "failed", message: "file is not upload" });
    }
  } catch (error) {
    res.status(202).json({
      status: "failed",
      message: "server internal error",
      error: error.message,
    });
  }
});

async function getPath(filename) {
  let newpath = path.join(process.cwd(), "static/image", filename);
  const sizedata = [
    {
      width: 1024,
      height: 500,
    },
    {
      width: 50,
      height: 50,
    },
    {
      width: 800,
      height: 300,
    },
  ];

  const imagemeta = await sharp(newpath).metadata();

  console.log(imagemeta);

  for (let i = 0; i < sizedata.length; i++) {
    const element = sizedata[i];

    let newfilename = filename.replace(".", "")+"_"+element.width+"X"+element.height+"."+imagemeta.format;
    let r_path = path.join(process.cwd(), "static/image", newfilename);
    const resize = await sharp(newpath)
    .resize({
      width: element.width,
      height: element.height,
    })
    .toFormat("jpeg", { mozjpeg: true })
    .toFile(r_path);
    console.log(resize);
  }





  return newpath;
}

router.delete("/deleteMedia/:id", async (req, res) => {
  const { id } = req.params;
  const oldMedia = await Mediamodel.findById(id);
  if (!oldMedia) {
    return res
      .status(201)
      .json({ status: "Failed", message: "Media not found" });
  }
  const result = await Mediamodel.findByIdAndDelete(id);
  res
    .status(200)
    .json({ status: "Success", message: "Media has been Deleted" });
});

module.exports = router;
