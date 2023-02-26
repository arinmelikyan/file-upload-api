const File = require('../models/file');

// GET ALL
exports.getAll = async (req, res) => {
  try {
    const files = await File.findAll();

    if(!files) {
      return res.status(400).json({ message: 'No files data.' });
    }

    return res.status(200).json(files);
  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
}

// GET BY ID
exports.getOne = async (req, res) => {
  const id = req.params.id;

  try {
    const file = await File.findByPk(id);
    
    if(!file) {
      return res.status(400).json({ message: 'File not found.' });
    }

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// CREATE 
exports.create = async (req, res) => {
  try {
    const file = req.files?.file;

    if (!file) {
      return res.status(400).send('No files were uploaded.');
    }

    const { fileName, userName } = req.body;

    const newFile = new File({ fileName, userName, file });

    const savedFile = await newFile.save();
    if(savedFile) {
      res.status(200).send({message: 'File successfully saved'})
    }
  } catch (err) {
    return res.status(500).json({ message: `Something went wrong, ${err.message}` });
  }
}

// UPDATE BY ID
exports.updateOne = async (req, res) => {
  const id = req.params.id;
  const { fileName } = req.body;
 
  try {
    const updatedFile = await File.update({ fileName }, {
      where: { id }
    });

    if(!updatedFile) {
      return res.status(404).json({ message: 'Failed to update file.'})
    }

    res.status(200).json({ message: 'Updated file successfully.' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

}

// DELETE BY ID
exports.deleteOne = async (req, res) => {
  const id = req.params.id;

  try {
     const deleteFile = await File.destroy({
      where: {id: id}
     });

     if(!deleteFile) {
      return res.status(400).json({ message: 'Failed to delete file.' })
     }

     return res.status(200).json("File has been deleted successfully");

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

}