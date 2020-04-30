class Usuario {
    constructor(dbtemp) {
        this.dbtemp = dbtemp
    }
    createTable() {
        const sql = `
    CREATE TABLE IF NOT EXISTS usuario (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT, pass TEXT)`
        console.log("Tabla Usuario creada");
        return this.dbtemp.run(sql)
    }

    insert(name, pass) {
        return this.dbtemp.run(
            'INSERT INTO usuario (name,pass) VALUES (?,?)',
            [name, pass])
    }

    update(id, name, pass) {
        return this.dbtemp.run(
            'UPDATE usuario SET name = ? , pass = ? WHERE id = ?',
            [name, pass, id]
        )
    }

    getByName(name) {
        return this.dbtemp.get(
            'SELECT * FROM usuario WHERE name = ?',
            [name])
    }

    getAll() {
        return this.dbtemp.all(
            'SELECT * FROM usuario')
    }

    delete(id) {
        return this.dbtemp.run(
            'DELETE FROM usuario WHERE id = ?',
            [id])
    }
}

module.exports = Usuario;