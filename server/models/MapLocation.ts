import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";

class MapLocation extends Model {}

MapLocation.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    nazivHr: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nazivEn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    opisHr: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    opisEn: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    vrijemeHodaHr: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vrijemeHodaEn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    googleMapsUrl: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "MapLocation",
    tableName: "map_locations",
  },
);

export default MapLocation;
