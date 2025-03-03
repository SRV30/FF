import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

const MetaData = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
};

MetaData.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.string.isRequired,
};

MetaData.defaultProps = {
  title: "Nandani Jewellers - Exquisite Gold & Diamond Jewelry",
  description:
    "Discover the latest fashion trends, accessories, and best-selling products at Faith AND Fast. Shop now for exclusive deals!",
  keywords:
    "fashion, accessories, Faith AND Fast, trending fashion, online shopping",
};

export default MetaData;
