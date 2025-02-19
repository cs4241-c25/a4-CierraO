import express from 'express'
import session from 'express-session'
import mongodb from 'mongodb'
import passport from 'passport'
import passport_github from 'passport-github'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express(),
      MongoClient = mongodb.MongoClient,
      ObjectId = mongodb.ObjectId,
      GitHubStrategy = passport_github.Strategy,
      __filename = fileURLToPath(import.meta.url),
      __dirname = dirname(__filename),
      port = 3000;    


app.use(express.static('src'));
app.use(express.json());
app.use(session({
    secret: 'cool secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    }
}));
app.use(passport.initialize());
app.use(passport.session());


const url = "mongodb+srv://cierra:RiC9tHbe0FHHEPga@cluster0.qzbsl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const dbconnect = new MongoClient(url);
let collection = null;
let users = null;

async function run() {
    await dbconnect.connect().then(() => console.log("Connected to database!"));
    collection = await dbconnect.db("ScoutingApp").collection("MatchPlay");
    users = await dbconnect.db("ScoutingApp").collection("Users");
    
    passport.serializeUser(function(user, cb) {
                           cb(null, user.id);
                           });
    
    passport.deserializeUser(function(id, cb) {
                           cb(null, id);
                           });
    
    passport.use(new GitHubStrategy({
        clientID: 'Ov23lidbNxNLSF47UQMc',
        clientSecret: 'f6a7b2205d90ed32452143f83241820e7329f487',
        callbackURL: "https://a4-cierrao.vercel.app/auth/github/callback"
      },
      async function(accessToken, refreshToken, profile, cb) {
        await users.findOneAndUpdate(
            {githubId: profile.id},
            { $set: {githubId: profile.id} },
            {upsert: true}
        );
        cb(null, profile);
      }
    ));
    
    app.get('/auth/github', 
        passport.authenticate('github'));
    
    app.get('/auth/github/callback', 
        passport.authenticate('github', { failureRedirect: '/login' }),
        function(req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
    });
    
    
    
    app.get('/api/login', (req, res) => {
        if (req.user) {
            return res.redirect('/');
        }
        
        res.sendFile(__dirname + "/src/login.html");
    });
    
    app.get('/api/logout', (req, res) => {
        req.logOut(() => res.redirect("/login"));
    });
    
    app.get('/api/data', isAuth, async (req, res) => {
        const results = await collection.find({_user: req.user}).toArray();
        res.json(results);
    });

    app.post('/api/submit', isAuth, async (req, res) => {
        const data = req.body;

        // add user to data
        data._user = req.user;
        
        //generate alliance color
        if (data.startingpos.includes("Red")) {
            data.alliance = "red";
        }
        else {
            data.alliance = "blue";
        }

        console.log(data);
        const results = await collection.insertOne(data);
        console.log(results);
        const allData = await collection.find({_user: req.user}).toArray();
        res.json(allData);
    });
    
    app.put('/api/:id', async (req, res) => {
       const data = req.body;
        
        // add user to data
        data._user = req.user;
        
        //generate alliance color
        if (data.startingpos.includes("Red")) {
            data.alliance = "red";
        }
        else {
            data.alliance = "blue";
        }
        
        const results = await collection.replaceOne({ _id: new ObjectId(req.params.id) }, data);
        console.log(results);
        const allData = await collection.find({_user: req.user}).toArray();
        res.json(allData);
    });

    app.delete('/api/:id', async (req, res) => {
        const result = await collection.deleteMany({ _id: new ObjectId(req.params.id) });
        console.log("Deleted document: ", result);
        
        const allData = await collection.find({_user: req.user}).toArray();
        res.json(allData);
    });
    
}

const isAuth = (req, res, next) => {
    if(req.user) {
        next();
    } else {
        return res.redirect("/login");
    }
};


const appRun = run();

// process.env.PORT references the port that Glitch uses
// the following line will either use the Glitch port or one that we provided
app.listen( process.env.PORT || port );

