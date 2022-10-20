import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import User from './models/user';
import Book from './models/book';
import Request from './models/request'
import zanr from './models/zanr';





const app = express();

app.use(cors())
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

mongoose.connect("mongodb://localhost:27017/library");

const conn = mongoose.connection;


var days = 14;
var idBook = 0;
var bookOfTheDay;
//za promenu knjige dana
// timeToMidnight


function getBookOfTheDay(){
    Book.aggregate([{ $sample: { size: 1 } }], (err, res) => {
        if(err) console.log(err)
        else{
            bookOfTheDay = res[0];
        }
    })
}

const schedule = require('node-schedule');

const job = schedule.scheduleJob('10 0 * * *', function(){
  getBookOfTheDay()
});

conn.once('open',()=>{
    console.log('Uspesna konekcija');
    Book.find({}).select({'id':1}).sort({'id':-1}).limit(1).exec((err, doc)=>{
        idBook = doc[0].id
        console.log(idBook)
        getBookOfTheDay()
        // newBookAtMidnight();

        // console.log("Out of func:",bookOfTheDay)
    })
    
});

const router = express.Router();

router.route('/login').post((req, res)=>{
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({"username":username, "password": password}, (err, user)=>{
        if(err) console.log(err);
        else res.json(user);
    })
});

router.route('/requestregistration').post((req, res)=>{
    let username = req.body.username;
    let password = req.body.password;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let address = req.body.address;
    let email = req.body.email;
    let phoneNumber = req.body.phoneNumber
    let image = req.body.image;




    var newUser = new Request({
        username: username,
        password: password,
        firstname: firstname,
        lastname: lastname,
        address: address,
        phoneNumber: phoneNumber,
        email:email,
        image: 'image',
    })

    User.findOne({'username': username}, (err, user)=>{
        console.log(user);
        if (user == null){   
            newUser.save((err, resp)=>{
                if (err) {
                    console.error(err);
                    res.status(400).json({"message": "error"})
                } else {
                    console.log(newUser.username + " saved request.");
                    res.json({"message": "ok"})
                }
            })
        }
        else{
            res.json({"message": "username"})
        }
    })
            
})


router.route('/acceptRegistration').post((req, res)=>{
    console.log("registurjem nekoga")
    let username = req.body.username;

    Request.findOneAndDelete({'username': username}, (err, request)=>{
        // console.log(request)
        if(err) console.log(err)
        else {
            let password = request.password;
            let firstname = request.firstname;
            let lastname = request.lastname;
            let address = request.address;
            let phoneNumber = request.phoneNumber;
            let email = request.email
            let image = request.image;
            var newUser = new User({
                    username: username,
                    password: password,
                    firstname: firstname,
                    lastname: lastname,
                    address: address,
                    phoneNumber: phoneNumber,
                    image: 'image',
                    type: "user",
                    email: email,
                    pastBorrowing: [],
                    borrowing: []
                })
            newUser.save((err, resp)=>{
                if (err) {
                    console.error(err);
                    res.status(400).json({"message": "error"})
                } else {
                    console.log(newUser.username + " saved to bookstore collection.");
                    res.json({"message": "ok"})
                }
            })
        }
    })
})

router.route('/denyRegistration').post((req, res)=>{
    let username = req.body.username;
    Request.deleteOne({'username':username}, (err, resp)=>{
        if(err) console.log(err)
        else res.json({'message': 'ok'})
    })
})

router.route('/changepassword').post((req, res)=>{
    let username = req.body.username;
    let passwordOld = req.body.passwordOld;
    let passwordNew = req.body.passwordNew;
    User.updateOne({"username":username, "password": passwordOld}, {$set: {'password':passwordNew}}, (err, user)=>{
        if(err) { 
            console.log(err);
            res.status(400).json({"message": "error"})
        } else res.json({'message': 'ok'})
    })
})

router.route('/addbook').post((req, res)=>{
    let name = req.body.name;
    let authors = req.body.authors;
    let category = req.body.categories;
    let publisher = req.body.publisher;
    let year = req.body.year;
    let language = req.body.language;
    let image = req.body.image;
    let count = req.body.count;
    let comments = [];
    let grades = [];
    
    var newBook = new Book({
        id: ++idBook,
        name: name,
        authors: authors,
        category: category,
        publisher: publisher,
        year: year,
        language: language,
        image: image,
        count: count,
        comments: comments,
        grades: grades
    
    })

    newBook.save((err, resp)=>{
        if (err) {
            console.error(err);
            res.status(400).json({"message": "error"})
        } else {
            console.log(newBook.name + " saved to bookstore collection.");
            res.json({"message": "ok"})
        }
    })
})


router.route('/fetchbook').post((req, res)=>{
    let id = req.body.id
    Book.findOne({'id':id}, (err, book)=>{
        if(err) console.log(err);
        else res.json(book);
    })
})

router.route('/fetchuser').post((req, res)=>{
    let username = req.body.username
    User.findOne({'username':username}, (err, user)=>{
        if(err) console.log(err);
        else res.json(user);
    })
})


router.route('/addcomment').post((req, res)=>{
    let id = req.body.id
    let comment = req.body.comment
    let username = req.body.username
    const newComment = {
        comment: comment,
        username: username
    }

    Book.updateOne({'id':id}, {$push: { 'comments': {'comment': comment, 'username':username}}}, (err, resp)=>{
        if(err) console.log(err)
        else {
            res.json({'message': 'ok'})
        }
    })
})

router.route('/vote').post((req, res)=>{
    let id = req.body.id
    let num = req.body.num
    let username = req.body.username
    Book.find({'id':id, 'grades':{$elemMatch:{'username' : username}}}, (err, book)=>{
        if(err) console.log(err)
        else {
            //nema ove ocene 
            if(Object.keys(book).length == 0){
                Book.updateOne({'id':id}, {$push: { 'grades': {'rating': num, 'username':username}}}, (err, resp)=>{
                    if(err) console.log(err)
                    else {
                        res.json({'message': 'ok'})
                    }
                })
            } else{
                Book.updateOne({'id':id, 'grades.username':username}, {$set:{'grades.$.rating':num}}, (err, resp)=>{
                    if(err) console.log(err)
                    else {
                        res.json({'message': 'ok'})
                    }
                })
            }
        }
    })
})

router.route('/rating').post((req, res)=>{
    console.log("rating")
    let id = req.body.id
    let sum = 0;
    Book.findOne({'id':id }, (err, book)=>{
        console.log(book)
        if(err) console.log(err)
        else{
            if(book.grades.length !=0){
                book.grades.forEach(e => {
                sum += Number(e.rating)
                });
                sum = sum/book.grades.length
                res.json({'message': sum.toString()})
                console.log(sum, book.grades.length)
            }
        }
    })
})

router.route('/borrowBook').post((req, res)=>{
    let id = req.body.id
    let username = req.body.username
    console.log('borrow')

    Book.updateOne({'id':id}, {$inc: {'count': -1}},(err, resp)=>{if(err) console.log(err)})
    User.findOneAndUpdate({'username': username}, {$push: {'borrowing':{'id':id, 'date': new Date()}}}, (err, resp)=>{
        if(err) console.log(err)
    })
})

router.route('/returnbook').post((req, res)=>{
    let id = String(req.body.id)
    let username = req.body.username

    console.log('return')
    Book.updateOne({'id':id}, {$inc: {'count': 1}},(err, resp)=>{if(err) console.log(err)})
    User.findOneAndUpdate({'username': username, 'borrowing.id': id}, {$pull: {'borrowing': {'id':id}}}, (err, user)=>{
        if(err) console.log(err)
        else{
            const result = Object.entries(user.borrowing).reduce((acc, curr) => {
                const [key, val] = curr;
                acc.push({
                    ...(Object)(val)
                });
                return acc;
            }, []);

            let t = result.find(element => Number(element.id) == Number(id))
            const returnedBook = {
                id:t.id,
                dateB: t.date,
                dateR: new Date()
            }
            User.updateOne({'username': username}, {$push: {'pastBorrowing': returnedBook}}, (err, resp)=>{
                if(err) console.log(err)
                else res.json({'message': 'ok'})
            })
        }
    })
})

// router.route('/getPasstBorrowing').post((req, res)=>{
//     let username = req.body.username
//     let orderby = req.body.orderby
//     User.find({'username':username})
// })

router.route('/fetchAllRequests').post((req, res) =>{
    Request.find((err, resp)=>{
        if(err) console.log(err)
        else res.json(resp)
    })
})

router.route('/topBooks').post((req, res)=>{
    User.find((err, users)=>{
        if(err) console.log(err)
        else{
            var bookCount = []
            for(var i = 0; i < idBook; i++)
                bookCount.push(0)
            users.forEach(elem => {
                elem.pastBorrowing.forEach(e =>{
                    bookCount[e.id-1]++
                })
            })
            var topBooks = [idBook, idBook -1, idBook - 2]
            for(var i = 0; i < bookCount.length; i++){
                if(bookCount[i] >= bookCount[topBooks[0]-1]){
                    topBooks[2] = topBooks[1]
                    topBooks[1] = topBooks [0]
                    topBooks[0] = i + 1
                }
                else if(bookCount[i] >= bookCount[topBooks[1]-1]){
                    topBooks[2] = topBooks[1]
                    topBooks[1] = i + 1
                }
                else if(bookCount[i] >= bookCount[topBooks[2]-1]){
                    topBooks[2] = i + 1
                }
                
            }
            res.json(topBooks)
        }
    })
})

router.route('/fetchAllUsers').post((req, res)=>{
    User.find((err,resp)=>{
        if(err) console.log(err)
        else res.json(resp)
    })
})

router.route('/fetchAllBooks').post((req, res)=>{
    Book.find((err,resp)=>{
        if(err) console.log(err)
        else res.json(resp)
    })
})

router.route('/deleteUser').post((req, res)=>{
    let username = req.body.username

    User.deleteOne({'username':username}, (err,resp)=>{
        if(err) console.log(err)
        else res.json('ok')
    })
})

router.route('/deleteBook').post((req, res)=>{
    let id = req.body.id

    Book.deleteOne({'id': id}, (err,resp)=>{
        if(err) console.log(err)
        else res.json('ok')
    })
})

router.route('/updateUser').post((req, res)=>{
    let user = req.body.user
    console.log(user)
    User.updateOne({'username':user.username}, {'password':user.pasword, 'firstname':user.firstname, 'lastname':user.lastname, 'email':user.email, 'image':user.image, 'address':user.address, 'phoneNumber':user.phoneNumber}, (err, resp)=>{
        console.log(resp)
        if(err) console.log(err)
        else res.json('ok')
    })
})

router.route('/updateBook').post((req, res)=>{
    let book = req.body.book
    console.log("This book:",book)
    Book.updateOne({'id':book.id}, {'name':book.name, 'authors':book.authors, 'category':book.categories, 'publisher':book.publisher, 'year':book.year, 'language':book.language, 'image':book.image, 'comments':book.comments, 'grades':book.grades, 'count':book.count}, (err, resp)=>{
        console.log(resp)
        if(err) console.log(err)
        else res.json('ok')
    })
})

// router.route('/topThreeBooks').post((req, res)=>{
//     //uzmem sve pozajmice
//     User.find({}, (err, resp)=>{
//         var book : number[];
//         for(let i = 0; i < idBook; i++)
//             book.push(0);
        
//     })

// })

router.route('/search').post((req, res)=>{
    console.log(bookOfTheDay)
    let param = req.body.param;
    Book.find({
        "$or": [
            { name: { '$regex': param, '$options': 'i' } },
            { authors: { '$regex': param, '$options': 'i' } }
        ]
    }).then((books) => {
        res.json(books);
    });
})
router.route('/bookoftheday').post((req, res)=>{
    res.json(bookOfTheDay);
})
router.route('/getdays').post((req, res) => {
    res.json(days);
});
router.route('/setdays').post((req, res) => {
    let day = req.body.day
    days = Number(day);
    console.log(days)
});

router.route('/deleteComment').post((req, res) => {
    let id = req.body.id;
    let username = req.body.username;
    console.log('delete', id, username)
    Book.findOneAndUpdate({'id': id, "comments.username": username}, {$pull: {"comments": {'username':username}}}, (err, res)=>{

    })
    
})
router.route('/getZanr').post((req, res)=>{
    zanr.find({}, (err, zanr)=>{
        if(err) console.log(err)
        else{
            res.json(zanr);
        }
    })
})


app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));