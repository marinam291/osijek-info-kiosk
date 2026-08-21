import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database.js";
import Item from "./Item.js";

class ItemGallery extends Model {}

ItemGallery.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    imagePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "ItemGallery",
    tableName: "item_galleries",
  },
);

Item.hasMany(ItemGallery, { foreignKey: "itemId", onDelete: "CASCADE" });
ItemGallery.belongsTo(Item, { foreignKey: "itemId" });

export default ItemGallery;
