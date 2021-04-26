const {
    cookieParser,
    logger,
    cors,
    express,
    path
} = require('./config/headersConst');

const notesRouter = require('./routes/notes');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/notes', notesRouter);  

module.exports = app;
