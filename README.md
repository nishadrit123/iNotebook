Save your notes on cloud

MERN stack has been used to develop this website.

User authentication is done using JWT (JSON Web Token)

The User route consists of 3 endpoints:

    1) createuser
    2) login  
    3) getuser
    
The Notes route consists of 4 endpoints:

    1) fetchallnotes
    2) addnote
    3) updatenote
    4) deletenote
    
iNotebook database in MongoDB has 2 collections:

    1) users
    2) notes
    
Both server (port 5000) and React app (port 3000) use 'concurrently' package to run both client and server together instead of running them seperately

Type: 'npm run both' to start the app
