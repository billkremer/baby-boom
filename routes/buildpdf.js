var verbose = true; // for turning off console.logs

var Pdf = require('pdfkit');
// var fs = require('fs');

var createPdf = function(pdfObject) {




doc = new Pdf()

doc.pipe fs.createWriteStream('/pdf/newpdf.pdf')


doc.fontSize(64)
doc.text()


doc.fontSize(14);


 // write to PDF
//? doc.pipe res

doc.end()
}
