import { DataSource } from "typeorm";


export default new DataSource({
    type: "sqlite",
    database: "./wildersdb.sqlite",
    synchronize: true,
    entities: [],
    logging: ["query", "error"]
})