const Imap = require('imap');

const imap = new Imap({
  user: 'sender.listed@outlook.com',
  password: 'Hurairah@123',
  host: 'outlook.office365.com',
  port: 993,
  tls: true
});


module.exports = {imap } ; 