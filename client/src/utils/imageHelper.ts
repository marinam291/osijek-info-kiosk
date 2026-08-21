import { ImageSourcePropType } from "react-native";

export const getImage = (
  imageName: string | undefined,
): ImageSourcePropType => {
  const images: Record<string, ImageSourcePropType> = {
    "tvrda.jpg": require("../../assets/images/tvrda.jpg"),
    "katedrala.jpg": require("../../assets/images/katedrala.jpg"),
    "promenada.jpg": require("../../assets/images/promenada.jpg"),
    "zoo.jpg": require("../../assets/images/zoo.jpg"),
    "mso.jpg": require("../../assets/images/mso.jpg"),
    "arheoloski.png": require("../../assets/images/arheoloski.png"),
    "mlu.jpg": require("../../assets/images/mlu.jpg"),
    "oljk1.jpg": require("../../assets/images/oljk1.jpg"),
    "pannonian1.jpg": require("../../assets/images/pannonian1.jpg"),
    "advent1.jpg": require("../../assets/images/advent1.jpg"),
    "hitna.png": require("../../assets/images/hitna.png"),
    "domzdravlja.jpg": require("../../assets/images/domzdravlja.jpg"),
    "ljekarna.jpg": require("../../assets/images/ljekarna.jpg"),
    "kbc.jpg": require("../../assets/images/kbc.jpg"),
    "gpp.jpg": require("../../assets/images/gpp.jpg"),
    "hz.jpg": require("../../assets/images/hz.jpg"),
    "emobi.jpg": require("../../assets/images/emobi.jpg"),
    "tzgo.jpg": require("../../assets/images/tzgo.jpg"),
    "mup.jpg": require("../../assets/images/mup.jpg"),
    "hotelosijek.png": require("../../assets/images/hotelosijek.png"),
    "hotelwaldinger.jpg": require("../../assets/images/hotelwaldinger.jpg"),
    "apartmanitvrda.jpeg": require("../../assets/images/apartmanitvrda.jpeg"),
    "apartmanicentar.png": require("../../assets/images/apartmanicentar.png"),
    "hostelstreet.jpg": require("../../assets/images/hostelstreet.jpg"),
    "hostelos.jpg": require("../../assets/images/hostelos.jpg"),
    "portanova.jpg": require("../../assets/images/portanova.jpg"),
    "mall.jpg": require("../../assets/images/mall.jpg"),
    "trznica.jpg": require("../../assets/images/trznica.jpg"),
  };

  if (imageName && images[imageName]) {
    return images[imageName];
  }

  return require("../../assets/images/default.jpg");
};
