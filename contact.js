const fs = require('fs');

var getContact = () => {
    try {
        var contacts = fs.readFileSync('directorio.json');
        return JSON.parse(contacts);
    } catch (e) {
        return [];
    }
};

var saveName = (names) => {
    fs.writeFileSync('directorio.json', JSON.stringify(names));
};

var addContact = (name, phone) => {
    var names = getContact();
    var newContact = {name,phone};
    var contactosDuplicados = names.filter((e) => e.name === name);

    if (contactosDuplicados.length === 0) {
        names.push(newContact);
        saveName(names);
        return newContact;
    }
};

var getAll = () => {
    return getContact();
};

var getName= (name) => {
    let names = getContact();
    let contactosFiltrados = names.filter((e) => e.name === name);
    return contactosFiltrados[0];
};

var deleteContact = (name) => {
    let names = getContact();
    let contactosFiltrados = names.filter((e) => e.name !== name);
    saveName(contactosFiltrados);

    return names.length !== contactosFiltrados.length;
};

module.exports = {
    addContact,
    getAll,
    getName,
    deleteContact,
};
