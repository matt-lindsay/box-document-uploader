// File System to access files on this machine.
var fs = require('fs');

// Box SDK.
var BoxSDK = require('box-node-sdk');

// Setup the Box SDK.
var sdk = new BoxSDK({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret
});

// Instantiate a Box client (basic).
var client = sdk.getBasicClient(process.env.token);

// Process Id for logging each document upload from start to finish.
var i = 0;

// Initial folder to add content to.
var rootFolder = 14274812032;

// Read the document directory and start the process.
fs.readdir('./docs/', function (err, files) {
    if (err) throw err;
    files.forEach(function (item) {
        console.log('Process: ' + i + ', Document: ' + item);
        // Compile the log record.
        var data = 'Process: ' + i + ', Document: ' + item + '\n';
        // Send the log record to the logger.
        logger(data);
        createFolder(rootFolder, item, i);
        i++;
    });
});

// Called function to create the case folder.
function createFolder (parentId, docName, procid) {
    var folderName = docName.replace('.pdf', '');
    client.folders.create(parentId, folderName, function (err, response) {
        if (err) throw err;
        // Compile the log record.
        var data = 'Process: ' + procid + ', createFolder Response: ' + response.id + ', Folder Name: ' + response.name + '\n';
        // Send the log record to the logger.
        logger(data);
        createSubFolder(response.id, docName, procid);
    });
}

// Called function to create a sub folder.
function createSubFolder (folderId, docName, procid) {
     client.folders.create(folderId, 'ORIGINAL', function (err, response) {
        if (err) throw err;
        // Compile the log record.
        var data = 'Process: ' + procid + ', createSubFolder Response: ' + response.id + ', Folder Name: ' + response.name + '\n';
        // Send the log record to the logger.
        logger(data);
        uploadDocument(response.id, docName, procid);
    });
}

// Called function to upload a document.
function uploadDocument (parentId, docName, procid) {
    // Set a stream up to the file system.
    var stream = fs.createReadStream('./docs/' + docName);
    client.files.uploadFile(parentId, docName, stream, function (err, response) {
        if (err) throw err;
        // Compile the log record.
        var data = 'Process: ' + procid + ', uploadDocument Response: ' + response.entries[0].id + ', Document Name: ' + response.entries[0].name + '\n';
        // Send the log record to the logger.
        logger(data);
    });
}

// Called function to write a log record out.
function logger (data) {
    fs.appendFile('./logs/contentLog.csv', data, 'utf8', function (err) {
        if (err) throw err;
    });
}