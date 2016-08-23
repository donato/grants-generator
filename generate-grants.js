let _ = require('lodash');
let YAML = require('yamljs');

let Products = YAML.load('./yaml/products.yml');
let Users = YAML.load('./yaml/users.yml');
let Roles = YAML.load('./yaml/roles.yml');


function printUserPermissions(grants, db, table) {
    let txt =
        '            -\n' +
        '                grant: ' + grants.join(',') + '\n' +
        '                database: ' + db + '\n' +
        '                table: \''+ table +'\'';
    console.log(txt);
    return txt;
}
    


console.log('mysql_grants:');
console.log('    mdb-analytics-vpc-01:');
_.each(Users, (user, userName) => {
    console.log('        ' + userName + ':');
    _.each(user.roles, (roleName) => {
        _.each(Roles[roleName], (role) => {
            _.each(role.products, (productName) => {
                _.each(Products[productName], (product) => {
                    _.each(product.table, (table) => {
                        printUserPermissions(role.grant, product.database, table)
                    });
                });
            });
        });
    });
});
