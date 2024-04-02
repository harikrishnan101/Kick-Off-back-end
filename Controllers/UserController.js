
const COURT = require('../Models/CourtSchema')
const multer = require('multer');
const mongoose = require('mongoose')
// const { response } = require('../app');
const courtSchedules = require('../Models/courtTimingSchema');
// const { response } = require('../app');
const ObjectId = require('mongoose').Types.ObjectId
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

const getMyCourtData = (req, res) => {

    try {
        COURT.find({ userId: req.userId }).then((response) => {


            res.status(200).json({ data: response })
        })
    } catch (error) {

    }

}

const getSingleCourtData = (req, res) => {
    try {
        COURT.findOne({ _id: req.query.courtId }).then((response) => {


            res.status(200).json({ data: response })
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
const getAllCourtData = (req, res) => {
    try {
        if (req.query.searchText) {
            COURT.find({
                $or: [
                    { name: { $regex: req.query.searchText, $options: 'i' } },
                    { location: { $regex: req.query.searchText, $options: 'i' } }
                ]
            }).then((resp) => {
                res.status(200).json({ court: resp })
            })
                .catch((err) => {
                    res.status(400).json({ message: "something wrong" })
                })

        } else {
            COURT.find().then((resp) => {
                res.status(200).json({ court: resp })
            })
                .catch((err) => {
                    res.status(400).json({ message: "something wrong" })
                })
        }
    } catch (error) {

    }
}


const getslotData = (req, res) => {
    try {

        
        courtSchedules.aggregate([
            {
                $match: {
                    courtId: new ObjectId(req.query.courtId),
                    date: new Date(req.query.date.split("T")[0]),
                    "slot.id": { $gt: parseInt(req.query.currentHour) }
                }
            },
            {
                $lookup: {
                    from: "courts",
                    localField: 'courtId',
                    foreignField: '_id',
                    as: "courts"
                }
            },
            {
                $project: {
                    _id: 1,
                    date: 1,
                    slot: 1,
                    cost: 1,
                    bookedBY: 1,
                    courts: { $arrayElemAt: ['$courts', 0] }
                }
            },
            {
                $sort:{
                    date:1
                }
            }

        ])
            .then((resp) => {
                res.status(200).json(resp)
            })
            .catch(err => {

            })
    } catch (error) {

    }

}
const getMyBookings = (req, res) => {
    try {
        const currentDate = new Date()
        const slotId = currentDate.getHours()

        currentDate.setUTCHours(7, 0, 0, 0)
      
        

       
        
        courtSchedules.aggregate([
            {
                $match: {
                    bookedBY: new ObjectId(req.userId),
                    $expr: {
                        $or: [
                            { $gt: ['&date', currentDate] },
                            {
                                $and: [
                                    { $eq: ["$date", currentDate] },
                                    { $gt: ["$slot.id", slotId] },
                                ],
                            },
                        ],
                    },
                },
            },
            {
                $lookup: {
                    from: "courts",
                    localField: 'courtId',
                    foreignField: '_id',
                    as: "courts"
                }
            },
            {
                $project: {
                    _id: 1,
                    date: 1,
                    slot: 1,
                    courts: { $arrayElemAt: ['$courts', 0] }
                }
            }
        ]).then((resp) => {
            
        })
    } catch (error) {

    }
}
const getCourtTimeData=(req,res)=>{
    courtSchedules.aggregate([
        {$match:{
            courtId:new ObjectId(req.query.courtId),
            date:{$gt:new Date()}
        }

        },
        {$group:{_id:"$date",slotsData:{$push:{slot:"$slot",cost:'$cost',_id:"$_id",courtId:"$courtId"}}}

        },
        {
            $sort:{
                _id:1
            }
        }
    ]).then((response)=>{
        res.json(response)
       
    })
}

module.exports = { RegisterNewCourt, getMyCourtData, getSingleCourtData, addCourtTiming, getLatestUpdateDate, getslotData, getAllCourtData, getMyBookings,getCourtTimeData } 