
const COURT=require('../Models/CourtSchema')
const multer = require('multer');
const { response } = require('../app');
const RegisterNewCourt = (req, res) => {

    
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
                console.log(response,'vghavbhjknx');
                res.status(200).json({ message: "court registration successfull" })
            })
            .catch(res => {
                
                res.status(403).json({ message: "court registration failed" })
            })
    })
}

const getMyCourtData=(req,res)=>{
    console.log(req.userId);
COURT.find({userId:req.userId}).then((response)=>{
    
    console.log(response,"ffffffffffffffffff");
    res.status(200).json({data:response})
})

}

const getSingleCourtData=(req,res)=>{
    COURT.findOne({_id:req.query.courtId}).then((response)=>{
    
        // console.log(response,"ffffffffffffffffff");
        res.status(200).json({data:response})
    })
}
module.exports={RegisterNewCourt,getMyCourtData,getSingleCourtData} 