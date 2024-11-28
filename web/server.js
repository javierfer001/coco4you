var express = require('express'),
    bodyParser = require("body-parser"),
    Twig = require("twig"),
    // bunyan = require('bunyan');
    // nodemailer = require('nodemailer'),
    app = express();


app.use('/assets', express.static(__dirname + '/assets'))

app.set('views', __dirname + '/views');
app.set('view engine', 'twig');
app.set("twig options", {
    strict_variables: false
});

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app_global = require('./app_global.json');
// type of enviroment (deploy and developement)
main_config = require('./main_config.json');
//
config = require('./config/dev_config.json');
if(!main_config.debug) {
    /**
     * Deploy configuration
     */
    config = require('./config/prod_config.json');
}
// This section is optional and can be used to configure twig.
//app.set('twig options', {
//    strict_variables: false
//});


// Router
app.get('/', function (req, res) {
    req.params.page = "index";
    res.render('./page/index', {
        app_global: app_global,
        params: req.params
    });
});

app.get('/:page', function (req, res) {
    var page = req.params.page;

    var map = new Object();
    map['about-us'] = "aboutus";
    map['franchises'] = "franchises";
    map['privacy'] = "privacy";
    map['contact-us'] = "contactus";
    page = map[page] ? map[page] : '404';
    if (page == '404') {
        res.status(404);
    }
    res.render('./page/' + page + ".twig", {
        app_global: app_global,
        params: req.params
    });
});
/**
 * Send email
app.post('/send/:type', function (req, res) {
    if (!req.body.Name || !req.body.Email || !req.body.Phone) {
        res.send({
            data: 'error'
        });
        return;
    }
    var subject = req.params.type == 'contactus' ? "Coco 4 You Contact Us" : "Coco 4 You Franchise";

    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: config.email.user,
            pass: config.email.password
        },
        logger: bunyan.createLogger({
            name: 'nodemailer'
        }),
        debug: true // include SMTP traffic in the logs
    }, {
        from: req.body.Name + '<' + req.body.Email + '>',
        headers: {
            'X-Laziness-level': 1000 // just an example header, no need to use this
        }
    });

    let franshiseText = req.body.address ?
        (req.Type == 'contactus' ? "" : " <br><strong>Franshise Location: </strong>" + req.body.address) : "";


    // Message object
    let message = {
        // Comma separated list of recipients
        to: config.email.to,
        // Subject of the message
        subject: subject, //
        // plaintext body
        text: '' +
            'From: ' + req.body.Name + ' ' + req.body.Email + ' ' +
            'phone number:  ' + req.body.Phone +
            'Message: ' + req.body.Message +
            (req.Type == 'contactus' ? "" : " Franshise Location: " + req.body.address) +
            "",
        // HTML body
        html: '<div>' +
            '<strong>From: </strong> ' + req.body.Name +
            '<br><strong>email:</strong> <a href="mailto:' + req.body.Email + '">' + req.body.Email + '</a>' +
            '<br><strong>phone number: </strong> ' + req.body.Phone +
            '<br><strong>Message: </strong>' + req.body.Message + franshiseText +
            "</div>"
    };

    console.log('Sending Mail');
    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log('Error occurred');
            console.log(error.message);
            return;
        }
        console.log('Message sent successfully!');
        transporter.close();
    });

    if (req.Type != 'contactus') {
        // Send confirm franchise email
        let message = {
            // Comma separated list of recipients
            to: req.body.Email,
            // Subject of the message
            subject: "Your Email have been received successfully.", //
            // HTML body
            html: '<p>Your Email have been received successfully. Thank you for contacting Coco 4 you Franchise department. ' +
            'It is a pleasure for us your interest in our products and services. We are delighted that you are considering our company as your next  business opportunity!</p>' +
            '<p>Franchisees should possess a passion for the brand and desire to help more consumers lead a healthier lifestyle. While restaurant experience is not required, ' +
            'the ideal candidate should have an entrepreneurial spirit, as well as sales, marketing, restaurant and/or retail experience.</p>' +
            '<p>Next steps to follow:</p><br>' +
            '<p>1. You will receive an Email with more information about the Franchise as well as also a brief electronic interview.</p>' +
            '<p>2. In order to begin the process, you must first fill our franchise request form. Upon confidential review of your information and preliminary approval, you will be notified of our mutual interest.</p>' +
            '<p>3. The application takes three to four weeks to be analyzed.</p>' +
            '<p>4. If you are approved,A Franchise Development Representative will schedule an interview with you at our Home Office in Miami, Fl. During this visit, you will get an in-depth introduction to the Coco 4 You operation and training facilities, meet our executive staff and management team and have the opportunity to visit existing franchise locations.</p>' +
            '<p>5. If you are not approved, you will received an Email, and your information will be storage for one year period.</p>' +
            '<p>All information contained in this process is confidential and details will not be divulged to any person or firm other than the franchisor and financier [if applicable], without authority</p>'
        };

        transporter.sendMail(message, (error, info) => {
            if (error) {
                console.log('Error occurred');
                console.log(error.message);
                return;
            }
            console.log('Message sent successfully!');
            transporter.close();
        });
    }
    res.send(JSON.stringify({
        data: 'success'
    }));
});
*/

// taskkill /im node.exe
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Init...')
    console.log('app listening at http://%s:%s', host, port);

});

module.exports = app;
