class Cliente {
    constructor(dbtemp) {
        this.dbtemp = dbtemp
    }

    createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS cliente (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT, lastName TEXT, direccion TEXT, email TEXT)`
        console.log("Tabla Clientes creada");
        return this.dbtemp.run(sql)
    }

    insert(name, lastName, direccion, email) {
        return this.dbtemp.run(
            'INSERT INTO cliente (name, lastName, direccion, email) VALUES (?,?,?,?)',
            [name, lastName, direccion, email])
    }

    update(name, lastName, direccion, email, id) {
        return this.dbtemp.run(
            'UPDATE cliente SET name = ? , lastName = ? , direccion = ?, email = ? WHERE id = ?',
            [name, lastName, direccion, email, id])
    }

    findById(id) {
        return this.dbtemp.run(
            'SELECT * FROM cliente WHERE id = ?',
            [id])
    }

    findByName(name) {
        return this.dbtemp.run(
            'SELECT * FROM cliente WHERE name = ?',
            [name])
    }

    delete(id) {
        return this.dbtemp.run(
            'DELETE FROM cliente WHERE id = ?',
            [id])
    }
}

module.exports = Cliente;