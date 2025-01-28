import { Helmet } from "react-helmet";
import PropTypes from "prop-types";

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
  );
};

MetaData.propTypes = {
  title: PropTypes.string.isRequired,
};

export default MetaData;
