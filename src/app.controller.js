import cors from 'cors';
import connectDB from './DB/connectionDB.js';
import registrationRouter from './modules/registration/registration.controller.js';

const corsOptions = {
    origin: true, 
    credentials: true
};

const port = process.env.PORT || 5000;

const bootstrapApp = (app, express) => {
    connectDB();
    app.use(cors(corsOptions));
    app.use(express.json());

    app.use("/registration", registrationRouter); 

    app.get('/', (req, res) => {
        res.send('Welcome to the IEEE Recruitment API');
    });

    app.use((req, res) => {
        res.status(404).json({ message: "Route not found" });
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

export default bootstrapApp;