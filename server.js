const  yargs = require('yargs');
const contact = require('./contact.js');

const nameOptions = {
    describe: 'Nombre de la persona',
    demand: true,
    alias: 'n'
};
const phoneOptions = {
    describe: 'Número de telefono de la persona',
    demand: true,
    alias: 'p'
};

const argv = yargs
                .command('add', 'Añadir un nuevo contacto', {
                    Name: nameOptions,
                    Phone: phoneOptions
                })
                .command('list', 'Listar todos los contactos')
                .command('read', 'Obtener informacion de un contacto', {
                    Name: nameOptions,
                })
                .command('delete', 'Eliminar un contacto', {
                    Name: nameOptions
                })
                .help()
                .argv
var command = argv._[0];

var name = argv.Name;

if (command === 'add') {

    var phone = argv.Phone;
    console.log(name, phone);
    var contacts = contact.addContact(name, phone);

    if (contacts) {
        console.log('Contact created');

    } else {
        console.log('Contact existing');
    }

} else if (command === 'list') {
    var allContacts = contact.getAll();
    console.log(`Printing ${allContacts.length} contact(s).`);
    allContacts.forEach((e,index) => console.log(index+1 +" name:"+e.name+"\tphone;"+e.phone));

} else if (command === 'read') {
        let busc = contact.getName(name);

        if (busc) {
        console.log('Contact found');
        console.log(`name: ${busc.name}\tphone ${busc.phone}`);
        } else {
        console.log('Contact not found');
        }

} else if (command === 'delete') {
        let busc = contact.deleteContact(name);
        var message = busc ? 'Contact deleted' : 'Contact not found';
        console.log(message);

} else {
    console.log('Unrecognized command');
}
