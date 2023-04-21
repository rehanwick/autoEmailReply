const { imap } = require("./config/imap.config");
const kafkaSendemail = require("./handlers/email-reply");



function openInbox(cb) {
  imap.openBox("INBOX", true, cb);
}

imap.once("ready", function () {
  openInbox(function (err, box) {
    if (err) throw err;
    imap.on("mail", function () {
      var f = imap.seq.fetch(box.messages.total + ":*", {
        bodies: ["HEADER.FIELDS (FROM)"],
      });
      f.on("message", function (msg, seqno) {
        msg.on("body", function (stream, info) {
          var buffer;
          stream.on("data", function (chunk) {
            buffer = chunk.toString("utf8");
          });
          stream.once("end", function () {
            const email = buffer.match(/<([^>]+)>/)[1];
            const name = buffer.match(/([^<]+)</)[1].trim();
            //   console.log({name , email });
            kafkaSendemail( JSON.stringify({ name, email }));
          });
        });
      });
    });
  });
});

imap.once("error", function (err) {
  console.error(err);
});

imap.once("end", function () {
  console.log("Connection ended");
});

imap.connect();
