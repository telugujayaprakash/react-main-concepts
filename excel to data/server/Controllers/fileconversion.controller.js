const xlsx = require('xlsx')
const Movies = require('../models/MovieSchema')

async function fileconvert(req, res) {
    try {
        console.log('File conversion Started')
        const workbook = xlsx.readFile(req.file.path)
        const sheet_name_list = workbook.SheetNames //here it will get all sheets
        // const sheet_name_list = workbook.SheetNames['sheet1'] // when we want to store particular sheet
        const jsonData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]) //it will store 1st sheet
        //send json data to database
        const formattedData = jsonData.map(item => ({           // }
            title: item.names,                                  // }
            genre: item.genre,                                  // }  here we are mapping json data to movie schema
            lang: item.lang                                     // }
        }));                                                    // }
        await Movies.insertMany(formattedData)
        res.status(200).json({ message: "File conversion & uploaded Successfully", data: formattedData })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error processing file', error: err.message });
    }
}

module.exports = { fileconvert }