import { config } from "dotenv"
config();

export default{
    port: process.env.PORT || 3000,
    DBuser: process.env.DB_USER || '',
    DBpassword: process.env.DB_PASSWORD || '',
    DBserver: process.env.DB_SERVER || '',
    DBdatabase: process.env.DB_DATABASE || '',
	EndpointFrond: process.env.END_POINT_FRONTEND || ''
}
