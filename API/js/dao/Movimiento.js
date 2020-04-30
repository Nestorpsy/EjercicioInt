class Movimiento {
    constructor(dbtemp) {
        this.dbtemp = dbtemp
    }

    createTable() {
        const sql = `
      CREATE TABLE IF NOT EXISTS movimiento (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        importe NUMERIC,
        clienteId INTEGER,
        CONSTRAINT movimiento_fk_clienteId FOREIGN KEY (clienteId)
          REFERENCES cliente(id) ON UPDATE CASCADE ON DELETE CASCADE)`
        console.log("Tabla Movimiento creada");
        return this.dbtemp.run(sql)
    }

    insert(name, description, importe, clienteId) {
        return this.dbtemp.run(
            'INSERT INTO movimiento (name, description, importe, clienteId) VALUES (?,?,?,?)',
            [name, description, importe, clienteId])
    }

    update(name, description, importe, id) {
        return this.dbtemp.run(
            'UPDATE movimiento SET name = ? , description = ? , importe = ? WHERE id = ?',
            [name, description, importe, id])
    }

    delete(id) {
        return this.dbtemp.run(
            'DELETE FROM movimiento WHERE id = ?',
            [id])
    }

    getByCustomer(clienteId) {
        return this.dbtemp.get(
            'SELECT * FROM movimiento WHERE clienteId = ?',
            [clienteId])
    }

    getById(id) {
        return this.dbtemp.get(
            'SELECT * FROM movimiento WHERE id = ?',
            [id])
    }

    delete(id) {
        return this.dbtemp.run(
            'DELETE FROM movimiento WHERE id = ?',
            [id])
    }

}

module.exports = Movimiento;