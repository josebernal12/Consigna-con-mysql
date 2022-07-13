const database = require('./db');


class Contenedor {
    constructor(tabla) {
        this.database = database
        this.tabla = tabla


    }

    async save() {
        try {
            if (!this.database) {
                await this.database.schema.createTable(`${this.tabla}`, (articulo) => {
                    articulo.increments("id").primary();
                    articulo.string("nombre", 20).notNullable();
                    articulo.float("price");
                    articulo.string("thumbnail", 20).notNullable();

                })
                console.log('table created');
                database.destroy()

            } else {
                await this.database(`${this.tabla}`).insert(objeto);
                console.log("object inserted inside container")
                database.destroy()
            }

        } catch (error) {
            console.log(`there was a mistake ${error}`)

        }

    }
    async getByid(id) {
        try {

            const result = await this.database.from(`${this.tabla}`).where("id", "=", id)

            if (result.length === 0) {
                console.log(`there are not products with that: ${id}`)
                database.destroy()
            } else {
                console.log(result)
                database.destroy()
            }


        } catch (error) {
            console.log(`there was a mistake ${error}`)
            database.destroy()
        }


    }
    async getAll() {
        try {
            const cars = await this.database.from(`${this.tabla}`).select('nombre', 'price', 'thumbnail');

            cars.forEach((car) => {
                console.log(`
                    Nombre: ${car.nombre}
                    Precio: ${car.price}
                    Thumbnail: ${car.thumbnail}
                   
                `)
            });

            database.destroy()
        } catch (error) {
            console.log(`there was a mistake ${error}`)
            database.destroy()
        }
    }
    async deleteById(id) {
        try {
            await this.database.from(`${this.tabla}`).where("id", "=", id).del()
            console.log('id deleted')
            database.destroy()



        } catch (error) {
            console.log(`there was a mistake ${error}`)
            database.destroy()
        }
    }



    async deleteAll() {
        try {
            await this.database.from(`${this.tabla}`).select('*').truncate()
            console.log('all deleted')
            database.destroy()

        } catch (error) {
            console.log(`there was a mistake ${error}`)
        }


    }
}

const productos = new Contenedor('Contenedor')
const objeto = [{ nombre: 'borrador', price: 5, thumbnail: 'google.com/borrador' }, { nombre: 'lapiz', price: 10, thumbnail: 'google.com/lapiz' }, { nombre: 'cuaderno', price: 20, thumbnail: 'google.com/cuaderno', }]


const test = async () => {
    await productos.save(objeto)

    // await productos.getByid(7)    LOS HABIA PUESTO JUNTOS Y ME MARCABA ERROR, POR
    //await productos.getAll(objeto)
    //await productos.deleteById(3)
    //await productos.deleteAll()
}
const get = async () => {
    await productos.getByid(2)

}
const getall = async () => {
    await productos.getAll()

}
const delet = async () => {
    await productos.deleteById(3)

}
const deleteall = async () => {
    await productos.deleteAll()

}
test()
get()
getall()
delet()
deleteall()