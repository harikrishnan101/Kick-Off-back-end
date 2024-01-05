
const COURT=require('../Models/CourtSchema')
const multer = require('multer');
const { response } = require('../app');
const courtSchedules = require('../Models/courtTimingSchema');
const RegisterNewCourt = (req, res) => {

    
    try {
        const fileStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, "public/venderCourts");
            },
            filename: (req, file, cb) => {
                cb(null, Date.now() + "-" + file.originalname);
            }
        });
    
        const upload = multer({ storage: fileStorage }).single("image");
    
        upload(req, res, (err) => {
    
           
            COURT({
                name: req.query.name,
                location: req.query.location,
                userId: req.userId,
                cost: req.query.cost,
                image: req?.file?.filename || 'defaultimage.jpg'
            }).save()
                .then(response => {
                    
                    res.status(200).json({ message: "court registration successfull" })
                })
                .catch(res => {
                    
                    res.status(403).json({ message: "court registration failed" })
                })
        })
    } catch (error) {
        
    }
}

const getMyCourtData=(req,res)=>{
    
try {
    COURT.find({userId:req.userId}).then((response)=>{
        
       
        res.status(200).json({data:response})
    })
} catch (error) {
    
}

}

const getSingleCourtData=(req,res)=>{
   try {
     COURT.findOne({_id:req.query.courtId}).then((response)=>{
     
         
         res.status(200).json({data:response})
     })
   } catch (error) {
    
   }
}
const addCourtTiming = (req, res) => {
    try {
       

        let currentDate = new Date(req.body.date.startDate);
        const endDate = new Date(req.body.date.endDate);
        const timingObjectArray = [];

        while (currentDate <= endDate) {
            
            for (i = 0; i < req.body.schedules.length; i++) {

                timingObjectArray.push({
                    date: JSON.parse(JSON.stringify(currentDate)), // Change 'data' to 'date'
                    slot: {
                        name: req.body.schedules[i].name,
                        id: req.body.schedules[i].id
                    },
                    cost: req.body.cost,
                    courtId: req.body.courtId
                });
            }

            currentDate.setDate(currentDate.getDate() + 1);
        }

        courtSchedules.insertMany(timingObjectArray)
            .then((resp) => {
                res.status(200).json({ message: "Schedule added successfully" });
            })
    } catch (error) {
        res.status(500).json(error)
    }

}

const getLatestUpdateDate = (req, res) => {
    try {
        courtSchedules.find({ courtId: req?.query?.courtId }).sort({ date: 1 }).limit(1).select('date').then((resp) => {

          
            let latestDate = new Date(resp[0]?.date)
            res.status(200).json({ minDate: latestDate })
        })
    } catch (error) {
        res.status(500).json(error)
    }
}
module.exports={RegisterNewCourt,getMyCourtData,getSingleCourtData,addCourtTiming,getLatestUpdateDate} 