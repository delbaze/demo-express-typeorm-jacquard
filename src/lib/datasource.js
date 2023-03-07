import { DataSource } from "typeorm";
import WilderEntity from "../entity/Wilder.entity";
export default new DataSource({
    type: "sqlite",
    database: "./wildersdb.sqlite",
    synchronize: true,
    entities: [WilderEntity],
    logging: ["query", "error"]
})