import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: String,
    description: String,
    modules: [
      {
        moduleName: String,
        videos: [
          {
            title: String,
            url: String,
          },
        ],
      },
    ],
  },
  { versionKey: false }
);

const model = mongoose.model("subDocument", schema);

export const connectDatabase = () => {
  console.log("Database Connected");
  mongoose.connect("mongodb://127.0.0.1/Octopi");
};

const insertNew = (req) => {
  const { title, description, moduleName, videoTitle, url } = req.body;

  return {
    title,
    description,
    modules: [
      {
        moduleName,
        videos: [
          {
            title: videoTitle,
            url,
          },
        ],
      },
    ],
  };
};

export const insertModules = async (req) => {
  try {
    const { title, description, moduleName, videoTitle, url } = req.body;
    let data = await model.findOne({ title, description });

    if (data !== null) {
      data.modules.push({
        moduleName,
        videos: [
          {
            title: videoTitle,
            url,
          },
        ],
      });
    } else {
      data = await model(insertNew(req));
    }

    console.log(data);
    data.save();
    // console.log("insert Modules request :", req.body);
  } catch (error) {
    console.log("insert module error :", error.message);
  }
};

export const insertVideos = async (req) => {
  try {
    const { title, description, moduleName, videoTitle, url } = req.body;
    let data = await model.findOne({ title, description });

    if (data !== null) {
      for (let i = 0; i < data.modules.length; ++i) {
        if (data.modules[i].moduleName === moduleName) {
          data.modules[i].videos.push({
            title,
            url,
          });
          break;
        }
      }
    } else {
      data = await model(insertNew(req));
    }

    console.log(data);
    data.save();
  } catch (error) {
    console.log("insert video error :", error.message);
  }
};

export const updateModulesAndVideos = async (req) => {
  try {
    const { title, description, moduleName, videoTitle, url } = req.body;
    let data = await model.findOne({ title, description });

    let i = data.modules.findIndex((value) => value.moduleName === moduleName);

    data.modules[i].videos[0].title = videoTitle;
    data.modules[i].videos[0].url = url;

    data.save();
  } catch (error) {
    console.log("update module error :", error.message);
  }
};

export const deleteModules = async (req) => {
  try {
    const { title, description, moduleName, videoTitle, url } = req.body;
    let data = await model.findOne({ title, description });

    data.modules.pop();
    data.save();
  } catch (error) {
    console.log("delete module error :", error.message);
  }
};

export const deleteVideos = async (req) => {
  try {
    const { title, description, moduleName, videoTitle, url } = req.body;
    let data = await model.findOne({ title, description });

    let i = data.modules.findIndex((value) => value.moduleName === moduleName);

    data.modules[i].videos.pop();

    data.save();
  } catch (error) {
    console.log("update module error :", error.message);
  }
};
